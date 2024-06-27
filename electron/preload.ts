import { ipcRenderer, contextBridge } from 'electron';

// Экспонируем API для взаимодействия с ipcRenderer
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on(channel: string, listener: (...args: any[]) => void) {
      ipcRenderer.on(channel, (event, ...args) => listener(...args));
    },
    off(channel: string, listener: (...args: any[]) => void) {
      ipcRenderer.off(channel, listener);
    },
    send(channel: string, ...args: any[]) {
      ipcRenderer.send(channel, ...args);
    },
    invoke(channel: string, ...args: any[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
  },
  ping: () => ipcRenderer.invoke('ping'),
  launchMinecraft: () => ipcRenderer.invoke('launch-minecraft')
});
