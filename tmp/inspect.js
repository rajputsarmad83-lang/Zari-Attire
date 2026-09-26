const fs = require('fs');
const code = fs.readFileSync('/tmp/kpra.js', 'utf8');

// Find all currentView === 'something'
const matches = code.match(/currentView\s*===\s*["']([^"']+)["']/g);
console.log('Matches:', matches ? [...new Set(matches)] : 'none');

// Find all navigateTo calls
const navs = code.match(/navigateTo\(\s*["']([^"']+)["']/g);
console.log('Navs:', navs ? [...new Set(navs)] : 'none');

// Find component names or titles
const titles = code.match(/Khaas Atelier[^<"]*/g);
console.log('Titles:', titles ? [...new Set(titles)].slice(0, 10) : 'none');
