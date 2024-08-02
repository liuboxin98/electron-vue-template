import { app, BrowserWindow, ipcMain, session, dialog } from 'electron';
import { join } from 'path';
import { fork } from 'child_process';
import log from 'electron-log';
log.transports.file.resolvePathFn = () => 'logs/main.log';

// 获取应用程序的根目录
const appPath = app.getAppPath();

export async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openFile'] })
    if (!canceled) {
        return filePaths[0]
    }
}

export async function ipcGetsomething(event, params) {
    return new Promise((resolve, reject) => {        // 动态构建 addon 的路径
        const addonPath = join(appPath, 'static', 'win_tools_node.node');
        log.info('addonPath:', addonPath);

        var getsomethingPath = join(__dirname, '../nodedll', 'getsomething.js');
        var worker_dns_process = fork(getsomethingPath, []);

        worker_dns_process.send({ path: addonPath, params: params });
        worker_dns_process.on('message', function (res) {
            log.info('ipcGetsomething res:', res);
            if (res.code === 0) {
                resolve(res);
            } else {
                reject(new Error('Error code: ' + res.code));
            }
        });

        worker_dns_process.on('error', (err) => {
            reject(err);
        });

        worker_dns_process.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error('Process exited with code: ' + code));
            }
        });

    })

}