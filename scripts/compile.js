const Path = require('path');
const Chalk = require('chalk');
const FileSystem = require('fs');
const babel = require('./private/babel');
const bytenode = require('bytenode');

async function buildMain() {
    const mainPath = Path.join(__dirname, '..', 'src', 'main');
    const outputPath = Path.resolve(mainPath, '../../build/main');


    // 使用 Babel 编译
    await babel(mainPath);


    // 编译main.js
    compileMainToBytecode(outputPath);

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

    // let str = `require('bytenode');require("./main.jsc");`
    // FileSystem.writeFileSync(filePath, str);
}


FileSystem.rmSync(Path.join(__dirname, '..', 'build'), {
    recursive: true,
    force: true,
})

console.log(Chalk.blueBright('Transpiling renderer & main...'));

Promise.allSettled([
    buildMain(),
]).then(() => {
    console.log(Chalk.greenBright('Renderer & main successfully transpiled! (ready to be built with electron-builder)'));
});
