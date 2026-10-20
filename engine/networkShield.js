const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

function runPowerShell(cmd) {
  return new Promise((resolve) => {
    exec(`powershell -NoProfile -ExecutionPolicy Bypass -Command "${cmd.replace(/"/g, '\\"')}"`, (err, stdout, stderr) => {
      if (err) {
        resolve({ success: false, error: stderr || err.message, output: '' });
      } else {
        resolve({ success: true, output: stdout.trim() });
      }
    });
  });
}

const HOSTS_PATH = 'C:\\Windows\\System32\\drivers\\etc\\hosts';

/**
 * Inspect the Windows HOSTS file for unauthorized redirections or hijacks.
 */
function inspectHostsFile() {
  if (!fs.existsSync(HOSTS_PATH)) {
    return { status: 'Clean', totalEntries: 0, suspiciousEntries: [], content: '' };
  }

  try {
    const rawContent = fs.readFileSync(HOSTS_PATH, 'utf8');
    const lines = rawContent.split(/\r?\n/);
    const suspiciousEntries = [];
    let totalEntries = 0;

    const criticalDomains = ['microsoft.com', 'windowsupdate.com', 'google.com', 'kaspersky.com', 'bitdefender.com', 'virustotal.com', 'avast.com', 'malwarebytes.com'];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      totalEntries++;
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 2) {
        const ip = parts[0];
        const domain = parts[1].toLowerCase();

        // Check if a security or update domain is blocked or redirected
        for (const crit of criticalDomains) {
          if (domain.includes(crit)) {
            suspiciousEntries.push({ ip, domain, reason: `Hijacked / Blocked Security Domain: ${domain}` });
            break;
          }
        }
      }
    }

    return {
      status: suspiciousEntries.length > 0 ? 'Threat Detected' : 'Protected',
      totalEntries,
      suspiciousEntries,
      content: rawContent
    };
  } catch (e) {
    return { status: 'Error', totalEntries: 0, suspiciousEntries: [], error: e.message };
  }
}

/**
 * Restore standard clean Windows HOSTS file.
 */
async function restoreCleanHostsFile() {
  const cleanHostsContent = `# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# See localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost
`;

  const backupDir = path.join(os.homedir(), 'AppData', 'Local', 'TurboShield', 'Backups');
  try {
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    if (fs.existsSync(HOSTS_PATH)) {
      fs.copyFileSync(HOSTS_PATH, path.join(backupDir, `hosts_backup_${Date.now()}.txt`));
    }
    fs.writeFileSync(HOSTS_PATH, cleanHostsContent, 'utf8');
    return { success: true };
  } catch (e) {
    // Attempt via PowerShell with elevation
    const ps = `Set-Content -Path '${HOSTS_PATH}' -Value @"
${cleanHostsContent}
"@ -Force`;
    const res = await runPowerShell(ps);
    return { success: res.success, error: res.error };
  }
}

/**
 * Flush Windows DNS Resolver Cache.
 */
async function flushDnsCache() {
  const res = await runPowerShell('Clear-DnsClientCache; ipconfig /flushdns');
  return res.success;
}

/**
 * Get active network DNS servers to verify no rogue DNS hijacker is configured.
 */
async function getDnsInfo() {
  const ps = `
    Get-DnsClientServerAddress -AddressFamily IPv4 | Where-Object { $_.ServerAddresses.Count -gt 0 } | ForEach-Object {
      [PSCustomObject]@{
        interface = $_.InterfaceAlias
        dnsServers = ($_.ServerAddresses -join ", ")
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

module.exports = {
  inspectHostsFile,
  restoreCleanHostsFile,
  flushDnsCache,
  getDnsInfo
};
