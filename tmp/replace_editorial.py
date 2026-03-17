import os
import re

dir_path = r"c:\Users\DELL\OneDrive\Desktop\gsoc project\reflection-engine\frontend"

replacements = {
    r'\bbg-slate-50\b': 'bg-editorial-bg',
    r'\bbg-white\b': 'bg-transparent', # Let the parent or default background shine
    r'\bbg-slate-100\b': 'bg-editorial-bg-alt',
    r'\bbg-slate-200\b': 'bg-editorial-border',
    r'\bbg-slate-900\b': 'bg-editorial-text',
    
    r'\btext-slate-900\b': 'text-editorial-text',
    r'\btext-slate-800\b': 'text-editorial-text',
    r'\btext-slate-700\b': 'text-editorial-text-light',
    r'\btext-slate-600\b': 'text-editorial-text-light',
    r'\btext-slate-500\b': 'text-editorial-text-lighter',
    r'\btext-slate-400\b': 'text-editorial-text-lighter',
    r'\btext-white\b': 'text-editorial-bg',
    
    r'\bborder-slate-200\b': 'border-editorial-border',
    r'\bborder-slate-300\b': 'border-editorial-border',
    
    r'\bhover:text-slate-800\b': 'hover:text-editorial-text',
    r'\bhover:text-slate-600\b': 'hover:text-editorial-text-light',
    r'\bhover:bg-slate-900\b': 'hover:bg-editorial-text',
    r'\bhover:bg-slate-700\b': 'hover:bg-editorial-text-light',
    
    r'\bring-slate-400\b': 'ring-editorial-accent',
}

def process_file(filepath):
    if "node_modules" in filepath or ".next" in filepath or "ui\\" in filepath:
        return
    if not filepath.endswith(".tsx") and not filepath.endswith(".ts"):
        return
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    orig_content = content
    for pattern, replacement in replacements.items():
        content = re.sub(pattern, replacement, content)
        
    if content != orig_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(dir_path):
    for file in files:
        process_file(os.path.join(root, file))

print("Done")
