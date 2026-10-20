const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

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

/**
 * Scan running processes for crypto-miners, rogue masquerading services, and hidden spyware.
 */
async function scanRunningProcesses() {
  const ps = `
    $knownMiners = @("xmrig", "minerd", "ethminer", "cpuminer", "nicehash", "nbminer", "phoenixminer", "t-rex", "lolminer", "nanominer", "teamredminer", "gminer", "wildrig");
    $systemBinaries = @("svchost.exe", "csrss.exe", "lsass.exe", "services.exe", "winlogon.exe", "smss.exe");
    $windowsDir = $env:SystemRoot.ToLower();
    $system32Dir = (Join-Path $env:SystemRoot "system32").ToLower();
    $tempDir = [System.IO.Path]::GetTempPath().ToLower().TrimEnd('\\');
    $appData = $env:APPDATA.ToLower();
    $localAppData = $env:LOCALAPPDATA.ToLower();
    $publicDir = $env:PUBLIC.ToLower();
    
    $results = @();
    
    Get-CimInstance Win32_Process | ForEach-Object {
      $p = $_;
      $pName = if ($p.Name) { $p.Name.ToLower() } else { "" };
      $pPath = if ($p.ExecutablePath) { $p.ExecutablePath.ToLower() } else { "" };
      $pCmd = if ($p.CommandLine) { $p.CommandLine.ToLower() } else { "" };
      
      $isSuspicious = $false;
      $threatReason = "";
      $severity = "Low";
      
      # 1. Check known cryptominer names
      foreach ($miner in $knownMiners) {
        if ($pName -like "*$miner*" -or $pCmd -like "*$miner*" -or $pCmd -like "*stratum+tcp://*") {
          $isSuspicious = $true;
          $threatReason = "Hidden Cryptocurrency Miner ($miner)";
          $severity = "Critical";
          break;
        }
      }
      
      # 2. Check masquerading system binaries
      if (-not $isSuspicious -and ($pName -in $systemBinaries)) {
        if ($pPath -and -not ($pPath.StartsWith($system32Dir) -or $pPath.StartsWith($windowsDir))) {
          $isSuspicious = $true;
          $threatReason = "Masquerading System Process (Fake System Service running from non-Windows directory)";
          $severity = "Critical";
        }
      }
      
      # 3. Check suspicious execution locations (running from Temp, Public, or root AppData)
      if (-not $isSuspicious -and $pPath) {
        if ($pPath.StartsWith($tempDir) -or $pPath.StartsWith($publicDir)) {
          $isSuspicious = $true;
          $threatReason = "Untrusted Executable running from Temporary / Public directory";
          $severity = "High";
        } elseif ($pCmd -like "*powershell*-enc*" -or $pCmd -like "*powershell*-w hidden*") {
          $isSuspicious = $true;
          $threatReason = "Hidden Obfuscated PowerShell Execution";
          $severity = "High";
        }
      }
      
      if ($isSuspicious) {
        $results += [PSCustomObject]@{
          pid = $p.ProcessId
          name = $p.Name
          path = $p.ExecutablePath
          commandLine = $p.CommandLine
          threatReason = $threatReason
          severity = $severity
        }
      }
    }
    
    $results | ConvertTo-Json -Depth 2 -Compress
  `;

  const res = await runPowerShell(ps);
  if (!res.success || !res.output) return [];
  try {
    const parsed = JSON.parse(res.output);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    return [];
  }
}

/**
 * Terminate a malicious process.
 */
async function killProcess(pid) {
  const ps = `Stop-Process -Id ${parseInt(pid, 10)} -Force -ErrorAction SilentlyContinue`;
  const res = await runPowerShell(ps);
  return res.success;
}

/**
 * Quarantine a malicious executable: kill process, move file to Quarantine folder with .locked extension.
 */
async function quarantineProcessFile(pid, filePath) {
  if (pid) {
    await killProcess(pid);
  }
  
  if (!filePath || !fs.existsSync(filePath)) {
    return { success: true, message: 'Process terminated' };
  }

  const quarantineDir = path.join(os.homedir(), 'AppData', 'Local', 'TurboShield', 'Quarantine');
  try {
    if (!fs.existsSync(quarantineDir)) {
      fs.mkdirSync(quarantineDir, { recursive: true });
    }
    const fileName = path.basename(filePath);
    const dest = path.join(quarantineDir, `${fileName}_${Date.now()}.locked`);
    fs.renameSync(filePath, dest);
    return { success: true, quarantinedPath: dest };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

module.exports = {
  scanRunningProcesses,
  killProcess,
  quarantineProcessFile
};
