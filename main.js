const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

const scanner = require('./engine/scanner');
const usbDoctor = require('./engine/usbDoctor');
const processHunter = require('./engine/processHunter');
const networkShield = require('./engine/networkShield');

let mainWindow = null;

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(createWindow);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1040,
    height: 720,
    minWidth: 960,
    minHeight: 640,
    frame: false,
    show: false,
    backgroundColor: '#060d16',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Window Controls
ipcMain.on('window-minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
  if (!mainWindow) return;
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on('window-close', () => {
  if (mainWindow) mainWindow.close();
});

// Scanner Handlers
ipcMain.handle('scanner:quick-scan', async () => {
  const paths = scanner.getQuickScanPaths();
  return await scanner.scanDirectories(paths, (progress) => {
    if (mainWindow) mainWindow.webContents.send('scanner:progress', progress);
  });
});

ipcMain.handle('scanner:custom-scan', async (_event, folderPath) => {
  return await scanner.scanDirectories([folderPath], (progress) => {
    if (mainWindow) mainWindow.webContents.send('scanner:progress', progress);
  });
});

ipcMain.handle('scanner:select-folder', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

ipcMain.handle('scanner:quarantine', async (_event, filePath) => {
  return scanner.quarantineThreat(filePath);
});

// USB Doctor Handlers
ipcMain.handle('usb:detect', async () => {
  return await usbDoctor.detectUsbDrives();
});

ipcMain.handle('usb:scan', async (_event, letter) => {
  return await usbDoctor.scanUsbDrive(letter);
});

ipcMain.handle('usb:clean', async (_event, letter) => {
  return await usbDoctor.cleanUsbDrive(letter);
});

// Process Hunter Handlers
ipcMain.handle('process:scan', async () => {
  return await processHunter.scanRunningProcesses();
});

ipcMain.handle('process:kill', async (_event, pid) => {
  return await processHunter.killProcess(pid);
});

ipcMain.handle('process:quarantine', async (_event, pid, filePath) => {
  return await processHunter.quarantineProcessFile(pid, filePath);
});

// Network Shield Handlers
ipcMain.handle('network:inspect-hosts', async () => {
  return networkShield.inspectHostsFile();
});

ipcMain.handle('network:restore-hosts', async () => {
  return await networkShield.restoreCleanHostsFile();
});

ipcMain.handle('network:flush-dns', async () => {
  return await networkShield.flushDnsCache();
});

ipcMain.handle('network:get-dns', async () => {
  return await networkShield.getDnsInfo();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
