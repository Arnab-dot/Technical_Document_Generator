from typing import List

def chunk_code(code: str, max_tokens: int) -> List[str]:
    """
    Splits code into chunks that respect the max_tokens limit.
    Attempts to split at blank lines between top-level definitions 
    to avoid splitting in the middle of a function or class.
    Assumes 1 token ~ 4 characters for estimation.
    """
    max_chars = max_tokens * 4
    lines = code.splitlines(keepends=True)
    
    blocks = []
    current_block = []
    
    for i, line in enumerate(lines):
        current_block.append(line)
        
        # We consider a split point if the current line is blank
        if not line.strip():
            # Check the next non-empty line
            next_non_empty = None
            for j in range(i + 1, len(lines)):
                if lines[j].strip():
                    next_non_empty = lines[j]
                    break
            
            # If the next non-empty line has no indentation (and isn't a closing brace),
            # it's likely a new top-level definition.
            if next_non_empty:
                # starts with non-whitespace
                if not next_non_empty[0].isspace() and not next_non_empty.startswith("}"):
                    blocks.append("".join(current_block))
                    current_block = []
            else:
                # EOF reached, we can split here
                blocks.append("".join(current_block))
                current_block = []
                
    if current_block:
        blocks.append("".join(current_block))
        
    # Group blocks into chunks based on max_chars
    chunks = []
    current_chunk = []
    current_length = 0
    
    for block in blocks:
        block_len = len(block)
        # If adding this block exceeds max_chars and we already have content in current_chunk,
        # we finish the current chunk and start a new one.
        if current_length + block_len > max_chars and current_chunk:
            chunks.append("".join(current_chunk))
            current_chunk = [block]
            current_length = block_len
        else:
            current_chunk.append(block)
            current_length += block_len
            
    if current_chunk:
        chunks.append("".join(current_chunk))
        
    # Add header comments showing which part of the file it represents
    total_parts = len(chunks)
    final_chunks = []
    for i, chunk in enumerate(chunks, 1):
        # Using a universal comment `#` that works for Python, Bash, Ruby, YAML, etc.
        # It is also generally understood by LLMs regardless of language.
        header = f"# Part {i} of {total_parts}\n\n"
        final_chunks.append(header + chunk)
        
    return final_chunks


def clean_git_patch(patch: str) -> str:
    """
    Extracts only the added and modified lines from a git diff patch string,
    stripping diff metadata, and returns the cleaned code as a single string.
    """
    cleaned_lines = []
    for line in patch.splitlines():
        if line.startswith('+++'):
            # Skip the diff file metadata line
            continue
        if line.startswith('+'):
            # Keep added/modified lines, stripping the leading '+'
            cleaned_lines.append(line[1:])
            
    return "\n".join(cleaned_lines)
