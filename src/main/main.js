import { app, BrowserWindow, ipcMain, session, dialog } from 'electron';
import { handleFileOpen, ipcGetsomething } from './ipc-handlers/ipc-handlers';
import { join } from 'path';
import { fork } from 'child_process';
import log from 'electron-log';
log.transports.file.resolvePathFn = () => 'logs/main.log';

// 获取应用程序的根目录
const appPath = app.getAppPath();
const staticPath = join(appPath, 'static');

// // log.info('icon', join(staticPath, 'icon.ico'));

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: join(staticPath, 'icon.ico'),
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('message', (event, message) => {
  console.log(message);
})

ipcMain.on('openSomething', (event, message) => {
  console.log(message);
})

ipcMain.handle('dialog:openFile', handleFileOpen);
ipcMain.handle('ipcinvoke:ipcGetsomething', ipcGetsomething);
