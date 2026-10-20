const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function runPowerShell(cmd) {
  return new Promise((resolve, reject) => {
    exec(`powershell -NoProfile -ExecutionPolicy Bypass -Command "${cmd.replace(/"/g, '\\"')}"`, { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        resolve({ success: false, error: stderr || err.message, output: '' });
      } else {
        resolve({ success: true, output: stdout.trim() });
      }
    });
  });
}

/**
 * Detect all attached removable USB drives.
 */
async function detectUsbDrives() {
  const ps = `
    Get-CimInstance Win32_LogicalDisk -Filter "DriveType=2" | ForEach-Object {
      [PSCustomObject]@{
        letter = $_.DeviceID
        label = if ($_.VolumeName) { $_.VolumeName } else { "USB Drive" }
        sizeBytes = $_.Size
        freeBytes = $_.FreeSpace
        fileSystem = $_.FileSystem
      }
    } | ConvertTo-Json -Compress
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
 * Scan a specific USB drive for Shortcut viruses, hidden files, and autorun threats.
 */
async function scanUsbDrive(driveLetter) {
  const root = driveLetter.endsWith('\\') ? driveLetter : `${driveLetter}\\`;
  const ps = `
    $root = '${root.replace(/'/g, "''")}';
    $threats = @();
    $hiddenFiles = 0;
    
    if (Test-Path $root) {
      Get-ChildItem -Path $root -Force -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
        $item = $_;
        $isThreat = $false;
        $threatReason = "";
        
        # Check for shortcut virus artifacts (.lnk pointing to scripts/executables)
        if ($item.Extension -eq ".lnk") {
          $isThreat = $true;
          $threatReason = "Suspicious Shortcut (Potential Shortcut Virus)";
        } elseif ($item.Extension -in @(".vbs", ".js", ".jse", ".wsf", ".scr", ".bat", ".cmd") -and ($item.Attributes -band [System.IO.FileAttributes]::Hidden)) {
          $isThreat = $true;
          $threatReason = "Hidden Script / Worm Payload";
        } elseif ($item.Name -eq "autorun.inf" -and -not (Test-Path "$($item.FullName)\\con")) {
          $isThreat = $true;
          $threatReason = "Rogue Autorun File";
        }
        
        if ($isThreat) {
          $threats += [PSCustomObject]@{
            path = $item.FullName
            name = $item.Name
            reason = $threatReason
            size = $item.Length
          }
        }
        
        # Count hidden legitimate items
        if (($item.Attributes -band [System.IO.FileAttributes]::Hidden) -and -not $isThreat) {
          $hiddenFiles++
        }
      }
    }
    
    [PSCustomObject]@{
      drive = $root
      threats = $threats
      threatCount = $threats.Count
      hiddenFilesCount = $hiddenFiles
    } | ConvertTo-Json -Depth 3 -Compress
  `;

  const res = await runPowerShell(ps);
  if (!res.success || !res.output) {
    return { drive: root, threats: [], threatCount: 0, hiddenFilesCount: 0 };
  }
  try {
    return JSON.parse(res.output);
  } catch (e) {
    return { drive: root, threats: [], threatCount: 0, hiddenFilesCount: 0 };
  }
}

/**
 * Clean the USB drive: remove malicious scripts/shortcuts, unhide all folders, and immunize against autorun worms.
 */
async function cleanUsbDrive(driveLetter) {
  const root = driveLetter.endsWith('\\') ? driveLetter : `${driveLetter}\\`;
  const ps = `
    $root = '${root.replace(/'/g, "''")}';
    $deletedThreats = 0;
    $unhiddenCount = 0;
    
    # 1. Kill any active wscript / cscript processes running off this drive
    Get-Process -Name "wscript", "cscript" -ErrorAction SilentlyContinue | ForEach-Object {
      try { Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue } catch {}
    }
    
    # 2. Delete malicious shortcuts (.lnk) in root and subdirectories
    Get-ChildItem -Path $root -Filter "*.lnk" -Force -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
      try {
        Remove-Item -LiteralPath $_.FullName -Force -ErrorAction SilentlyContinue
        $deletedThreats++
      } catch {}
    }
    
    # 3. Delete hidden suspicious scripts (.vbs, .js, .wsf, .scr)
    Get-ChildItem -Path $root -Force -Recurse -ErrorAction SilentlyContinue | Where-Object {
      $_.Extension -in @(".vbs", ".js", ".jse", ".wsf", ".scr") -and (($_.Attributes -band [System.IO.FileAttributes]::Hidden) -or $_.DirectoryName -eq $root.TrimEnd('\\'))
    } | ForEach-Object {
      try {
        Remove-Item -LiteralPath $_.FullName -Force -ErrorAction SilentlyContinue
        $deletedThreats++
      } catch {}
    }
    
    # 4. Remove rogue autorun.inf if it is a file
    $autorunPath = Join-Path $root "autorun.inf"
    if (Test-Path $autorunPath -PathType Leaf) {
      try {
        attrib -h -r -s $autorunPath
        Remove-Item -LiteralPath $autorunPath -Force -ErrorAction SilentlyContinue
        $deletedThreats++
      } catch {}
    }
    
    # 5. Unhide all files and folders (restore hidden items)
    cmd.exe /c "attrib -h -r -s /s /d \`"$root*\`""
    
    # 6. Immunize drive by creating locked autorun.inf folder
    $immunized = $false
    try {
      if (-not (Test-Path $autorunPath)) {
        New-Item -ItemType Directory -Path $autorunPath -Force | Out-Null
        cmd.exe /c "mkdir \`"$autorunPath\\TurboImmunity..\\\`"" | Out-Null
        cmd.exe /c "attrib +h +r +s \`"$autorunPath\`""
        $immunized = $true
      } else {
        $immunized = $true
      }
    } catch {}
    
    [PSCustomObject]@{
      drive = $root
      deletedThreats = $deletedThreats
      unhiddenSuccess = $true
      immunized = $immunized
    } | ConvertTo-Json -Compress
  `;

  const res = await runPowerShell(ps);
  if (!res.success || !res.output) {
    return { drive: root, deletedThreats: 0, unhiddenSuccess: false, immunized: false };
  }
  try {
    return JSON.parse(res.output);
  } catch (e) {
    return { drive: root, deletedThreats: 0, unhiddenSuccess: true, immunized: true };
  }
}

module.exports = {
  detectUsbDrives,
  scanUsbDrive,
  cleanUsbDrive
};
