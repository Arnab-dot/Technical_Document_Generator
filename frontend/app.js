document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const prTabBtn = document.querySelector('[data-tab="pr-tab"]');
    const codeTabBtn = document.querySelector('[data-tab="code-tab"]');
    const prTabContent = document.getElementById('pr-tab');
    const codeTabContent = document.getElementById('code-tab');
    const resetBtn = document.getElementById('reset-btn');
    
    const prUrlInput = document.getElementById('pr-url');
    const filenameInput = document.getElementById('filename');
    const rawCodeInput = document.getElementById('raw-code');
    
    const generatePrBtn = document.getElementById('generate-pr-btn');
    const generateCodeBtn = document.getElementById('generate-code-btn');
    
    const loadingIndicator = document.getElementById('loading-indicator');
    const loadingMessage = document.getElementById('loading-message');
    const errorBanner = document.getElementById('error-banner');
    
    const resultsSection = document.getElementById('results-section');
    const fileList = document.getElementById('file-list');
    const docPanelHeader = document.querySelector('.doc-panel-header');
    const currentDocTitle = document.getElementById('current-doc-title');
    const docContent = document.getElementById('doc-content');
    
    const copyDocBtn = document.getElementById('copy-doc-btn');
    const copyConfirm = document.getElementById('copy-confirm');
    const downloadAllBtn = document.getElementById('download-all-btn');

    // State
    let generatedDocs = []; // Array of { filename, markdown }
    let currentSelectedFile = null;

    const API_BASE_URL = 'http://localhost:8000';

    // Tab Switching
    function switchTab(tabId) {
        prTabBtn.classList.remove('active');
        codeTabBtn.classList.remove('active');
        prTabContent.classList.add('hidden');
        prTabContent.classList.remove('active');
        codeTabContent.classList.add('hidden');
        codeTabContent.classList.remove('active');

        if (tabId === 'pr-tab') {
            prTabBtn.classList.add('active');
            prTabContent.classList.remove('hidden');
            prTabContent.classList.add('active');
        } else {
            codeTabBtn.classList.add('active');
            codeTabContent.classList.remove('hidden');
            codeTabContent.classList.add('active');
        }
    }

    prTabBtn.addEventListener('click', () => switchTab('pr-tab'));
    codeTabBtn.addEventListener('click', () => switchTab('code-tab'));

    // UI Helpers
    function showError(message) {
        errorBanner.textContent = message;
        errorBanner.classList.remove('hidden');
        hideLoading();
    }

    function hideError() {
        errorBanner.classList.add('hidden');
        errorBanner.textContent = '';
    }

    function showLoading(message) {
        loadingMessage.textContent = message;
        loadingIndicator.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        hideError();
    }

    function hideLoading() {
        loadingIndicator.classList.add('hidden');
    }

    function resetApp() {
        prUrlInput.value = '';
        filenameInput.value = '';
        rawCodeInput.value = '';
        hideError();
        hideLoading();
        resultsSection.classList.add('hidden');
        generatedDocs = [];
        currentSelectedFile = null;
        fileList.innerHTML = '';
        docContent.innerHTML = '';
        currentDocTitle.textContent = 'Select a file';
        copyDocBtn.classList.add('hidden');
        copyConfirm.classList.add('hidden');
    }

    resetBtn.addEventListener('click', resetApp);

    // API Calls
    async function generateFromPR() {
        const prUrl = prUrlInput.value.trim();
        if (!prUrl) {
            showError('Please enter a GitHub Pull Request URL.');
            return;
        }

        showLoading('Fetching PR files and generating docs...');
        
        try {
            const response = await fetch(`${API_BASE_URL}/generate/from-pr`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pr_url: prUrl })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.detail || `Server error: ${response.status}`);
            }

            const data = await response.json();
            handleSuccess(data);
        } catch (error) {
            showError(error.message || 'Failed to connect to the backend server.');
        }
    }

    async function generateFromCode() {
        const filename = filenameInput.value.trim() || 'untitled.txt';
        const code = rawCodeInput.value.trim();
        
        if (!code) {
            showError('Please paste some code to generate documentation.');
            return;
        }

        showLoading(`Generating docs for ${filename}...`);

        try {
            const response = await fetch(`${API_BASE_URL}/generate/from-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code, filename: filename })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.detail || `Server error: ${response.status}`);
            }

            const data = await response.json();
            handleSuccess(data);
        } catch (error) {
            showError(error.message || 'Failed to connect to the backend server.');
        }
    }

    generatePrBtn.addEventListener('click', generateFromPR);
    generateCodeBtn.addEventListener('click', generateFromCode);

    // Results Handling
    function handleSuccess(data) {
        hideLoading();
        generatedDocs = data;
        
        if (!generatedDocs || generatedDocs.length === 0) {
            showError('No documentation generated. The PR might not contain supported code files.');
            return;
        }

        renderFileList();
        resultsSection.classList.remove('hidden');
        
        // Select first file by default
        selectFile(0);
    }

    function renderFileList() {
        fileList.innerHTML = '';
        generatedDocs.forEach((doc, index) => {
            const li = document.createElement('li');
            li.textContent = doc.filename;
            li.dataset.index = index;
            li.addEventListener('click', () => selectFile(index));
            fileList.appendChild(li);
        });
    }

    function selectFile(index) {
        if (index < 0 || index >= generatedDocs.length) return;
        
        // Update selection UI
        const items = fileList.querySelectorAll('li');
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');

        currentSelectedFile = generatedDocs[index];
        currentDocTitle.textContent = currentSelectedFile.filename;
        
        // Render Markdown
        docContent.innerHTML = marked.parse(currentSelectedFile.markdown);
        
        // Apply syntax highlighting
        docContent.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });

        copyDocBtn.classList.remove('hidden');
    }

    // Copy to Clipboard
    copyDocBtn.addEventListener('click', async () => {
        if (!currentSelectedFile) return;

        try {
            await navigator.clipboard.writeText(currentSelectedFile.markdown);
            copyConfirm.classList.remove('hidden');
            setTimeout(() => {
                copyConfirm.classList.add('hidden');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy to clipboard.');
        }
    });

    // Download All as ZIP
    downloadAllBtn.addEventListener('click', async () => {
        if (!generatedDocs || generatedDocs.length === 0) return;

        try {
            const zip = new JSZip();
            
            generatedDocs.forEach(doc => {
                // Ensure filename has .md extension and replace forward slashes to avoid directory issues if unwanted,
                // but usually JSZip handles paths well. We'll just append .md.
                let safeName = doc.filename.split('/').pop();
                if (!safeName.endsWith('.md')) {
                    safeName += '.md';
                }
                zip.file(safeName, doc.markdown);
            });

            const blob = await zip.generateAsync({ type: 'blob' });
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'technical-documentation.zip';
            document.body.appendChild(a);
            a.click();
            
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Zip generation failed', error);
            showError('Failed to generate zip file.');
        }
    });

    // Initialize marked options if needed (optional)
    marked.setOptions({
        breaks: true,
        gfm: true
    });
});
