// npx electron .\npx.test.js
const processVersions = process.versions;
console.log('Node.js version:', processVersions.node);
console.log('Electron version:', processVersions.electron);
console.log('Chromium version:', processVersions.chrome);

// console.log(process)