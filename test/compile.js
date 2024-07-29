const ChildProcess = require('child_process');
const Chalk = require('chalk');
const Path = require('path');


function compile(directory) {
    return new Promise((resolve, reject) => {

        const outputPath = Path.resolve(directory, '../../test/finally');
        console.log(`Compiling files from ${directory} to ${outputPath}`);

        const babelCommand = [
            'npx babel',
            directory,
            `--out-dir ${outputPath}`,
            '--ignore static',
            '--presets @babel/preset-env'
        ].join(' ');

        const babelProcess = ChildProcess.exec(babelCommand, {
            cwd: directory,
        });

        babelProcess.stdout.on('data', data =>
            process.stdout.write(Chalk.yellowBright(`[babel] `) + Chalk.white(data.toString()))
        );

        babelProcess.on('exit', exitCode => {
            if (exitCode > 0) {
                reject(exitCode);
            } else {
                resolve();
            }
        });

    });
}

function start() {
    const sourcePath = Path.join(__dirname, '..', 'test', 'source');
    compile(sourcePath)
        .then(() => {
            console.log('Compilation complete');
        })
        .catch(exitCode => {
            console.error(`Compilation failed with exit code ${exitCode}`);
        });
}


start();