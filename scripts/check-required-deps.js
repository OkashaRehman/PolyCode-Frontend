const fs = require('fs');
const path = require('path');

const requiredModules = ['tweetnacl', 'tweetnacl-util'];
const projectRoot = path.resolve(__dirname, '..');
const nodeModulesDir = path.join(projectRoot, 'node_modules');

const missing = requiredModules.filter((moduleName) => {
  try {
    require.resolve(path.join(nodeModulesDir, moduleName));
    return false;
  } catch (_error) {
    return true;
  }
});

if (missing.length > 0) {
  console.error('\nMissing required frontend dependencies:');
  console.error(missing.map((name) => ` - ${name}`).join('\n'));
  console.error('');
  console.error('Run: npm install');
  console.error('Then retry your build/start command.\n');
  process.exit(1);
}

console.log('Required frontend dependencies are installed.');
