const fs = require('fs');
const path = require('path');

const directory = './frontend';

const colorMapping = {
  // Backgrounds
  'bg-slate-50': 'bg-bg-0',
  'bg-white': 'bg-bg-100',
  'bg-slate-100': 'bg-bg-200',
  'bg-slate-200': 'bg-bg-300',
  'bg-slate-900': 'bg-text-100',
  // Text
  'text-slate-900': 'text-text-100',
  'text-slate-800': 'text-text-200',
  'text-slate-700': 'text-text-200',
  'text-slate-600': 'text-text-200',
  'text-slate-500': 'text-text-300',
  'text-slate-400': 'text-text-400',
  'text-slate-300': 'text-text-500',
  'text-white': 'text-bg-0',
  // Borders
  'border-slate-200': 'border-bg-300',
  'border-slate-300': 'border-bg-300',
  // Hover
  'hover:text-slate-800': 'hover:text-text-100',
  'hover:text-slate-600': 'hover:text-text-200',
  'hover:bg-slate-900': 'hover:bg-text-100'
};

function processFile(filePath) {
  if (filePath.includes('claude-style-chat-input')) return; // skip the new component
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const [key, value] of Object.entries(colorMapping)) {
    // Replace whole words to avoid partial matches
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    content = content.replace(regex, value);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', '.next', 'ui'].includes(file)) {
        traverse(fullPath);
      }
    } else {
      processFile(fullPath);
    }
  }
}

traverse(directory);
console.log('Done scanning colors.');
