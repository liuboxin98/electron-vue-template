const ChildProcess = require('child_process');
const Chalk = require('chalk');
const Path = require('path');

function compile(directory) {
    return new Promise((resolve, reject) => {
        const outputPath = Path.resolve(directory, '../../build/main');
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

module.exports = compile;