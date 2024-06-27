/// <reference types="vite/client" />

interface IElectron {
  ipcRenderer: {
    on(channel: string, listener: (...args: any[]) => void): void;
    off(channel: string, listener: (...args: any[]) => void): void;
    send(channel: string, ...args: any[]): void;
    invoke(channel: string, ...args: any[]): Promise<any>;
  };
  launchMinecraft(): Promise<any>;
  ping(): Promise<any>;
}

interface Window {
  electron: IElectron;
}
