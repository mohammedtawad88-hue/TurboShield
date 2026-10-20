const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  window: {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close')
  },
  scanner: {
    startQuickScan: () => ipcRenderer.invoke('scanner:quick-scan'),
    startCustomScan: (folder) => ipcRenderer.invoke('scanner:custom-scan', folder),
    selectFolder: () => ipcRenderer.invoke('scanner:select-folder'),
    quarantine: (filePath) => ipcRenderer.invoke('scanner:quarantine', filePath),
    onProgress: (callback) => {
      ipcRenderer.removeAllListeners('scanner:progress');
      ipcRenderer.on('scanner:progress', (_event, data) => callback(data));
    }
  },
  usbDoctor: {
    detectDrives: () => ipcRenderer.invoke('usb:detect'),
    scanDrive: (letter) => ipcRenderer.invoke('usb:scan', letter),
    cleanDrive: (letter) => ipcRenderer.invoke('usb:clean', letter)
  },
  processHunter: {
    scanProcesses: () => ipcRenderer.invoke('process:scan'),
    killProcess: (pid) => ipcRenderer.invoke('process:kill', pid),
    quarantineProcess: (pid, path) => ipcRenderer.invoke('process:quarantine', pid, path)
  },
  networkShield: {
    inspectHosts: () => ipcRenderer.invoke('network:inspect-hosts'),
    restoreHosts: () => ipcRenderer.invoke('network:restore-hosts'),
    flushDns: () => ipcRenderer.invoke('network:flush-dns'),
    getDnsInfo: () => ipcRenderer.invoke('network:get-dns')
  }
});
