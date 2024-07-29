import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message) => ipcRenderer.send('message', message),
  openSomething: (message) => ipcRenderer.send('openSomething', message),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
