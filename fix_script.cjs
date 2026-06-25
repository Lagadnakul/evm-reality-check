const fs = require('fs');
const path = 'D:/VS CODE/evm-reality-check/src/sections/InsideTheMachine.jsx';

// Read the file
let content = fs.readFileSync(path, 'utf8');

// Fix 1: Remove overlapping text
console.log('Fixing overlapping text...');
const oldText = 'Educational concept visualization. </motion.span>{\' \'} This is an educational concept visualization. This is not an exact replica of any real election system.';
const newText = 'Educational concept visualization. This is not an exact replica of any real election system.';

// Simple string replacement
content = content.replace(
  'Educational concept visualization. </motion.span>{\' \'} This is an educational concept visualization.',
  'Educational concept visualization. This is not an exact replica'
);

// Fix the closing tag
content = content.replace(
  'All explanations are neutral and educational. </motion.p>',
  'All explanations are neutral and educational.</motion.span> </motion.p>'
);

console.log('Replacements done');

// Write back
fs.writeFileSync(path, content, 'utf8');
console.log('File updated successfully');