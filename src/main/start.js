const { app, BrowserWindow } = require('electron');
const path = require('path');
require('bytenode');

app.on('ready', () => {
    require(path.join(__dirname, 'main.jsc'));
});