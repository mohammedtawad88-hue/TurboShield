const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

function runPowerShell(cmd) {
  return new Promise((resolve) => {
    exec(`powershell -NoProfile -ExecutionPolicy Bypass -Command "${cmd.replace(/"/g, '\\"')}"`, { maxBuffer: 15 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        resolve({ success: false, error: stderr || err.message, output: '' });
      } else {
        resolve({ success: true, output: stdout.trim() });
      }
    });
  });
}

function calculateFileHash(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
  } catch (e) {
    return null;
  }
}

/**
 * Scan a specific file or list of directories for threats and suspicious patterns.
 * @param {string[]} targetPaths
 * @param {Function} onProgress
 */
async function scanDirectories(targetPaths, onProgress) {
  const threats = [];
  let scannedFiles = 0;

  const doubleExtensionRegex = /\.(pdf|docx|xlsx|pptx|jpg|png|mp4|zip|rar)\.(exe|vbs|js|scr|cmd|bat|pif)$/i;
  const suspiciousExtensions = ['.scr', '.pif', '.hta', '.vbs', '.wsf', '.jse'];
  const dangerousStrings = ['vssadmin delete shadows', 'bcdedit /set {default} bootstatuspolicy ignoreallfailures', 'certutil -urlcache -split -f'];

  for (const root of targetPaths) {
    if (!fs.existsSync(root)) continue;

    const stack = [root];
    while (stack.length > 0) {
      const currentDir = stack.pop();
      let entries = [];
      try {
        entries = fs.readdirSync(currentDir, { withFileTypes: true });
      } catch (err) {
        continue;
      }

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          // Skip node_modules or system volume information to avoid recursion loop
          if (entry.name !== 'node_modules' && entry.name !== '$Recycle.Bin') {
            stack.push(fullPath);
          }
        } else if (entry.isFile()) {
          scannedFiles++;
          if (scannedFiles % 50 === 0 && typeof onProgress === 'function') {
            onProgress({ scannedFiles, currentFile: fullPath });
          }

          const lowerName = entry.name.toLowerCase();
          const ext = path.extname(lowerName);

          let isThreat = false;
          let threatName = '';
          let severity = 'Medium';

          // 1. Double extension trick (e.g., photo.jpg.exe)
          if (doubleExtensionRegex.test(lowerName)) {
            isThreat = true;
            threatName = 'Deceptive Double-Extension Trojan Executable';
            severity = 'Critical';
          }
          // 2. Suspicious standalone screensaver/script in temp/downloads
          else if (suspiciousExtensions.includes(ext) && (fullPath.includes('Temp') || fullPath.includes('Downloads'))) {
            isThreat = true;
            threatName = 'Unsafe Script / Executable Payload in Temporary Folder';
            severity = 'High';
          }
          // 3. Suspicious batch/cmd file contents
          else if (ext === '.bat' || ext === '.cmd' || ext === '.ps1') {
            try {
              const content = fs.readFileSync(fullPath, 'utf8').toLowerCase();
              for (const danger of dangerousStrings) {
                if (content.includes(danger)) {
                  isThreat = true;
                  threatName = 'Ransomware / Malicious Dropper Command Detected';
                  severity = 'Critical';
                  break;
                }
              }
            } catch (e) {}
          }

          if (isThreat) {
            let stats = null;
            try { stats = fs.statSync(fullPath); } catch (e) {}
            threats.push({
              path: fullPath,
              name: entry.name,
              threatName,
              severity,
              size: stats ? stats.size : 0,
              hash: calculateFileHash(fullPath)
            });
          }
        }
      }
    }
  }

  return { scannedFiles, threats };
}

/**
 * Get Quick Scan Paths (high-risk areas).
 */
function getQuickScanPaths() {
  const home = os.homedir();
  return [
    path.join(home, 'AppData', 'Local', 'Temp'),
    path.join(process.env.SystemRoot || 'C:\\Windows', 'Temp'),
    path.join(home, 'Downloads'),
    path.join(home, 'Desktop'),
    path.join(home, 'AppData', 'Roaming', 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup'),
    path.join(home, 'AppData', 'Roaming')
  ].filter(p => fs.existsSync(p));
}

/**
 * Quarantine a threat file.
 */
function quarantineThreat(filePath) {
  try {
    if (!fs.existsSync(filePath)) return { success: false, error: 'File does not exist' };
    const quarantineDir = path.join(os.homedir(), 'AppData', 'Local', 'TurboShield', 'Quarantine');
    if (!fs.existsSync(quarantineDir)) {
      fs.mkdirSync(quarantineDir, { recursive: true });
    }
    const fileName = path.basename(filePath);
    const dest = path.join(quarantineDir, `${fileName}_${Date.now()}.locked`);
    fs.renameSync(filePath, dest);
    return { success: true, destination: dest };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * Run native Windows Defender MpCmdRun scan on a target path if available.
 */
async function runDefenderEngineScan(targetPath) {
  const mpCmdRun = 'C:\\Program Files\\Windows Defender\\MpCmdRun.exe';
  if (!fs.existsSync(mpCmdRun)) {
    return { available: false, threatsFound: false };
  }

  const ps = `& "${mpCmdRun}" -Scan -ScanType 3 -File "${targetPath}"`;
  const res = await runPowerShell(ps);
  const threatsFound = res.output.includes('Threat') || res.output.includes('found');
  return {
    available: true,
    threatsFound,
    log: res.output
  };
}

module.exports = {
  scanDirectories,
  getQuickScanPaths,
  quarantineThreat,
  runDefenderEngineScan
};
