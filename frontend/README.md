# DocDraft AI — React Frontend

This is the React + Vite frontend workspace for DocDraft AI (Technical Documentation Generator). The user interface is designed with a premium, responsive glassmorphic aesthetic using standard Vanilla CSS.

For full system information, setup guides, and backend setup instructions, please see the root [README.md](../README.md).

---

## Technical Features

- **Responsive Multi-Panel Layout**:
  - **Left Panel (Input)**: Switchable tabs for paste-and-go code generation or GitHub Pull Request links.
  - **Right Panel (Output)**: Beautiful markdown presentation with tabbed lists for multi-file PR results, code block syntax highlighting, skeleton loading views, and robust error boundaries.
- **Client-Side Bulk Downloader**: Compresses all generated markdown files into a single `.zip` file using `JSZip` and downloads it to the client machine using `file-saver`.
- **Dynamic CSS Aesthetic System**:
  - Custom floating atmospheric particle animations.
  - Glassmorphic panels featuring backing filters (`backdrop-filter: blur()`).
  - Subtle interactive micro-animations and button transitions.

---

## Directory Overview

```text
frontend/
├── src/
│   ├── components/
│   │   ├── app/                # Main dashboard controls
│   │   │   ├── AppPage.jsx     # Main workspace state manager
│   │   │   ├── InputPanel.jsx  # PR/Code inputs form
│   │   │   └── OutputPanel.jsx # Tabbed list, copy/download toolbar, markdown renderer
│   │   ├── landing/            # Landing page sections
│   │   │   ├── Navbar.jsx      # Navigation header
│   │   │   ├── HeroSection.jsx # Floating particles and CTA triggers
│   │   │   ├── LiveDemo.jsx    # Visual presentation section
│   │   │   └── ...             # HowItWorks, TechStack, CTAs
│   │   └── shared/             # Atomic styling layout layers
│   │       ├── GlassCard.jsx   # Backdrop blur wrapper
│   │       └── ScrollReveal.jsx# IntersectionObserver-based animations
│   ├── api.js                  # Axios/Fetch backend integrations
│   ├── App.jsx                 # Routing configuration
│   └── index.css               # Base CSS stylesheet & theme tokens
├── package.json                # Dependencies and project scripts
└── vite.config.js              # Vite server & proxy configurations
```

---

## Available NPM Scripts

Install dependencies first using `npm install`.

### `npm run dev`
Runs the app in local development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser. The page will reload if you make edits.

### `npm run build`
Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`
Locally previews the production build created by `npm run build`.

### `npm run lint`
Runs ESLint analysis across files to enforce style rules.
