import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const require = createRequire(import.meta.url);
const { launchMinecraft } = require('../src/modules/minecraftLauncher.cjs');
const fs = require('fs');
const { autoUpdater } = require('electron-updater');

//const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'main')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null
let updateWindow: BrowserWindow | null

function createUpdateWindow() {
  updateWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  updateWindow.loadFile(path.join(__dirname, 'update.html'));
}

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 600,
    minHeight: 600,
    minWidth: 1100,
    frame: false,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, './preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('launch-minecraft', async () => {
  try {
    const result = await launchMinecraft();
    return result;
  } catch (error) {
    console.error('Failed to launch Minecraft:', error);
    throw error;
  }
});

ipcMain.on('progress-update', (progress) => {
  if (win) {
    win.webContents.send('progress-update', progress);
  }
});

ipcMain.on('hide', () => {
  if (win) {
    win.webContents.send('progress-update', null);
    win.hide()
  }
});

ipcMain.on('show', () => {
  if (win) {
    win.show()
  }
});

ipcMain.handle('maximize-window', () => {
  if (win?.isMaximized()) {
    win.unmaximize();
  } else {
    win?.maximize();
  }
});

ipcMain.handle('close-window', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

ipcMain.handle('minimize-window', () => {
  win?.minimize();
});

ipcMain.handle('get-image', (event, name) => {
  const imagePath = path.join(__dirname, `../src/assets/${name}.svg`); // Путь к изображению, предположим, что это SVG

  // Проверяем, существует ли файл
  if (fs.existsSync(imagePath)) {
    // Читаем файл и возвращаем его содержимое как base64
    const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
    const imageDataURI = `data:image/svg+xml;base64,${imageBase64}`;
    return imageDataURI;
  } else {
    throw new Error(`Image ${name}.svg not found`);
  }
});

ipcMain.handle('ping', () => 'pong')

app.whenReady().then(() => {
  createUpdateWindow();

  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-not-available', () => {
    updateWindow?.close();
    createWindow();
  });

  autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
  });
})