import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message: string) => ipcRenderer.send('message', message),
  openSomething: (message: string) => ipcRenderer.send('openSomething', message),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
