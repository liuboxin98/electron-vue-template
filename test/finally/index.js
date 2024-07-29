"use strict";

var _electron = require("electron");
require("./test1");
var _path = require("path");
function createWindow() {
  var mainWindow = new _electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: (0, _path.join)(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  if (process.env.NODE_ENV === 'development') {
    var rendererPort = process.argv[2];
    mainWindow.loadURL("http://localhost:".concat(rendererPort));
  } else {
    mainWindow.loadFile((0, _path.join)(_electron.app.getAppPath(), 'renderer', 'index.html'));
  }
}
createWindow();