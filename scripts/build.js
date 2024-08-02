const Path = require('path');
const Chalk = require('chalk');
const FileSystem = require('fs');
const Vite = require('vite');
const compileTs = require('./private/tsc');
const babel = require('./private/babel');
const ChildProcess = require('child_process');
const Electron = require('electron');
const { EOL } = require('os');
const bytenode = require('bytenode');

function buildRenderer() {
    return Vite.build({
        configFile: Path.join(__dirname, '..', 'vite.config.js'),
        base: './',
        mode: 'production'
    });
}

async function buildMain() {
    const mainPath = Path.join(__dirname, '..', 'src', 'main');
    const outputPath = Path.resolve(mainPath, '../../build/main');


    // 使用 Babel 编译
    await babel(mainPath);


    // 编译main.js
    // compileMainToBytecode(outputPath);

    // Babel 编译完成后，编译为字节码
    // compileToBytecode(outputPath);
}

/**
 * 1.编译main.js 为 main.jsc
 * 2.生成main.js 读取 main.jsc
 * @param {*} directory 
 * @returns 
 */
function compileMainToBytecode(directory) {
    const filePath = Path.join(directory, 'main.js');
    const bytecodeFilePath = filePath.replace('.js', '.jsc');
    bytenode.compileFile({
        filename: filePath,
        output: bytecodeFilePath
    });

    let str = `require('bytenode');require("./main.jsc");`
    FileSystem.writeFileSync(filePath, str);
}


function compileToBytecode(directory) {
    return new Promise((resolve, reject) => {
        FileSystem.readdir(directory, (err, files) => {
            if (err) {
                return reject(err);
            }

            const jsFiles = files.filter(file => file.endsWith('.js'));
            const compilePromises = jsFiles.map(file => {
                const filePath = Path.join(directory, file);
                const bytecodeFilePath = filePath.replace('.js', '.jsc');
                return bytenode.compileFile({
                    filename: filePath,
                    output: bytecodeFilePath
                });
            });

            Promise.all(compilePromises)
                .then(() => {
                    console.log(`Compiled all files in ${directory} to bytecode`);
                    resolve();
                })
                .catch(reject);
        });
    });
}

FileSystem.rmSync(Path.join(__dirname, '..', 'build'), {
    recursive: true,
    force: true,
})

console.log(Chalk.blueBright('Transpiling renderer & main...'));

Promise.allSettled([
    buildRenderer(),
    buildMain(),
]).then(() => {
    console.log(Chalk.greenBright('Renderer & main successfully transpiled! (ready to be built with electron-builder)'));
});
