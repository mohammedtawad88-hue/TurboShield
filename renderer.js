// Bilingual Localization Dictionary
const i18n = {
  en: {
    statusProtected: "Active Shield: Protected",
    tagline: "Next-Gen Cybersecurity",
    navScanner: "Threat Scanner",
    navUsb: "USB Doctor",
    navProcesses: "Process Hunter",
    navNetwork: "Network Shield",
    navAbout: "About & License",
    badgeHot: "HOT",
    badgeFree: "100% Free & Open Source",
    scannerTitle: "System Protection Active",
    scannerDesc: "Deep heuristic and signature file audit for Trojans, Ransomware, and Malicious Scripts.",
    metricScanned: "Files Scanned:",
    metricThreats: "Threats Detected:",
    btnQuickScan: "Run Quick Scan",
    btnCustomScan: "Scan Specific Folder",
    scanningNow: "Scanning files in high-risk locations...",
    threatsFoundTitle: "Scan Results",
    badgeClean: "Ready",
    emptyScanTitle: "Your PC is Protected",
    emptyScanSub: "Click Quick Scan to verify high-risk directories and startup locations.",
    usbTitle: "USB Shortcut Virus Doctor",
    usbSubtitle: "1-Click Shortcut Virus cleaner, hidden files recovery, and Autorun immunity.",
    btnRefresh: "Refresh Drives",
    selectUsbDrive: "Select Removable USB Drive:",
    noUsbDetected: "No USB drives detected. Insert USB drive and click Refresh.",
    driveLetter: "Letter:",
    driveLabel: "Name:",
    driveFree: "Free Space:",
    usbScanCardTitle: "Audit USB Drive",
    usbScanCardDesc: "Scans drive for malicious .lnk shortcuts, hidden VBS scripts, and suspicious autoruns.",
    btnScanUsb: "Audit USB",
    usbCleanCardTitle: "Clean, Unhide & Immunize",
    usbCleanCardDesc: "Kills shortcut virus scripts, restores all hidden files/folders, and locks autorun against reinfection.",
    btnCleanUsb: "Clean & Restore USB",
    usbResultsTitle: "USB Treatment Summary",
    statThreatsDeleted: "Threats Removed",
    statFilesRestored: "Files Unhidden",
    statImmunized: "Autorun Shield",
    processTitle: "Live Process & Miner Hunter",
    processSubtitle: "Audits running tasks for crypto-miners, rogue masquerading services, and hidden spyware.",
    btnAuditProcesses: "Audit Processes Now",
    thProcess: "Process",
    thPid: "PID",
    thReason: "Threat Indication",
    thSeverity: "Severity",
    thAction: "Action",
    emptyProcessTitle: "No Audits Run Yet",
    emptyProcessSub: "Click 'Audit Processes Now' to inspect active background execution trees.",
    networkTitle: "System & Network Shield",
    networkSubtitle: "Protect DNS resolvers and verify HOSTS file integrity against browser hijackers.",
    hostsTitle: "Windows HOSTS File Integrity",
    hostsDesc: "Verifies that malware has not added fake redirects to intercept your search engines or block antivirus updates.",
    metricTotalEntries: "Active Entries:",
    metricSuspicious: "Suspicious Redirects:",
    btnRestoreHosts: "Restore Clean HOSTS File",
    dnsTitle: "DNS Resolver & Cache",
    dnsDesc: "Flushes poisoned local DNS cache records and displays active network adapter DNS servers.",
    badgeOptimal: "Optimal",
    btnFlushDns: "Flush DNS Cache",
    aboutDescription: "Built as a modern, bloatware-free alternative to greedy commercial antivirus tools. TurboShield will never nag you for subscriptions, never display intrusive ad popups, and never slow down your gaming sessions.",
    viewOnGithub: "View on GitHub (Open Source)",
    btnQuarantine: "Quarantine",
    btnKill: "Kill Process",
    threatCleanSuccess: "Threat quarantined successfully"
  },
  ar: {
    statusProtected: "الدرع النشط: محمي وآمن",
    tagline: "الجيل الجديد للأمن السيبراني",
    navScanner: "فاحص التهديدات",
    navUsb: "طبيب الفلاشات (USB)",
    navProcesses: "صياد العمليات والتعدين",
    navNetwork: "درع الشبكة والهوست",
    navAbout: "حول البرنامج والترخيص",
    badgeHot: "مميز",
    badgeFree: "مجاني 100% ومفتوح المصدر",
    scannerTitle: "حماية النظام نشطة",
    scannerDesc: "فحص سلوكي وتوقيعي عميق لكشف التروجان، الفدية، وسكربتات الاختراق المشبوهة.",
    metricScanned: "الملفات المفحوصة:",
    metricThreats: "التهديدات المكتشفة:",
    btnQuickScan: "فحص سريع للنظام",
    btnCustomScan: "فحص مجلد مخصص",
    scanningNow: "جاري فحص الملفات في المسارات عالية الخطورة...",
    threatsFoundTitle: "نتائج الفحص",
    badgeClean: "جاهز",
    emptyScanTitle: "جهازك نظيف ومحمي",
    emptyScanSub: "اضغط على الفحص السريع للتأكد من خلو ملفات الإقلاع والـ Temp من أي برمجيات خبيثة.",
    usbTitle: "طبيب فلاشات USB ومُبيد فيروس الشورت كت",
    usbSubtitle: "حذف فيروس الـ Shortcut بضغطة زر، إظهار الملفات والمجلدات المخفية، وتحصين الفلاشة.",
    btnRefresh: "تحديث الأقراص",
    selectUsbDrive: "اختر قرص الـ USB المتصل:",
    noUsbDetected: "لم يتم العثور على فلاشة USB. يرجى توصيل الفلاشة والضغط على تحديث.",
    driveLetter: "الحرف:",
    driveLabel: "اسم الفلاشة:",
    driveFree: "المساحة الفارغة:",
    usbScanCardTitle: "فحص الفلاشة",
    usbScanCardDesc: "يفحص الفلاشة بحثاً عن اختصارات .lnk المزيفة وسكربتات VBS المخفية.",
    btnScanUsb: "بدء فحص الفلاشة",
    usbCleanCardTitle: "تنظيف، استرجاع الملفات وتحصين",
    usbCleanCardDesc: "يحذف فيروس الشورت كت نهائياً، يفك إخفاء الملفات الحقيقية، ويقفل الـ Autorun لمنع عودة الفيروس.",
    btnCleanUsb: "تنظيف واستعادة الفلاشة",
    usbResultsTitle: "تقرير معالجة الفلاشة",
    statThreatsDeleted: "تهديدات محذوفة",
    statFilesRestored: "الملفات المسترجعة",
    statImmunized: "درع التحصين",
    processTitle: "صياد برامج التعدين والعمليات الخفية",
    processSubtitle: "يفحص العمليات النشطة ويكشف أي تعدين خفي للعملات الرقمية أو برامج تجسس تتخفى بأسماء نظام.",
    btnAuditProcesses: "فحص العمليات النشطة الآن",
    thProcess: "العملية",
    thPid: "PID",
    thReason: "نوع التهديد المكتشف",
    thSeverity: "الخطورة",
    thAction: "الإجراء",
    emptyProcessTitle: "لم يتم إجراء فحص بعد",
    emptyProcessSub: "اضغط على 'فحص العمليات النشطة الآن' لمسح شجرة المهام في الخلفية.",
    networkTitle: "درع النظام وحماية المتصفحات",
    networkSubtitle: "حماية ملف الـ HOSTS ومخازن الـ DNS من التلاعب وتوجيه الروابط الاحتيالية.",
    hostsTitle: "سلامة ملف ويندوز HOSTS",
    hostsDesc: "يتأكد من عدم قيام فيروس بإضافة تحويلات احتيالية لمحركات البحث أو حظر تحديثات الحماية.",
    metricTotalEntries: "المدخلات النشطة:",
    metricSuspicious: "تحويلات مشبوهة:",
    btnRestoreHosts: "استعادة ملف HOSTS الأصلي النظيف",
    dnsTitle: "مخزن ومخدمات الـ DNS",
    dnsDesc: "تفريغ كاش الـ DNS المسموم وعرض مخدمات الـ DNS النشطة لمحولات الشبكة.",
    badgeOptimal: "سليم",
    btnFlushDns: "تفريغ كاش الـ DNS (Flush)",
    aboutDescription: "تم تطوير TurboShield ليكون البديل العراقي العصري المجاني لبرامج الحماية التجارية الجشعة. لن يطلب منك البرنامج اشتراكاً، ولن يزعجك بنوافذ إعلانات وهمية، ولن يؤثر على أداء ألعابك أبداً.",
    viewOnGithub: "عرض على GitHub (مفتوح المصدر)",
    btnQuarantine: "عزل / حذف",
    btnKill: "إنهاء العملية",
    threatCleanSuccess: "تم عزل التهديد بنجاح"
  }
};

let currentLang = 'en';

// Switch Language
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);

  const langText = document.getElementById('lang-text');
  if (langText) {
    langText.textContent = lang === 'ar' ? 'English 🌐' : 'العربية 🇮🇶';
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Window Controls
  document.getElementById('btn-min').addEventListener('click', () => window.api.window.minimize());
  document.getElementById('btn-max').addEventListener('click', () => window.api.window.maximize());
  document.getElementById('btn-close').addEventListener('click', () => window.api.window.close());

  // Lang Toggle
  document.getElementById('lang-btn').addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'ar' : 'en');
  });

  // Tab Navigation
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      document.getElementById(target).classList.add('active');

      if (target === 'tab-usb') loadUsbDrives();
      if (target === 'tab-network') loadNetworkShield();
    });
  });

  // Github Button
  document.getElementById('btn-open-github').addEventListener('click', () => {
    window.open('https://github.com/mohammedtawad88-hue/TurboShield', '_blank');
  });

  initScanner();
  initUsbDoctor();
  initProcessHunter();
  initNetworkShield();
});

// ========================
// 1. SCANNER ENGINE
// ========================
function initScanner() {
  const btnQuick = document.getElementById('btn-quick-scan');
  const btnCustom = document.getElementById('btn-custom-scan');
  const progressBox = document.getElementById('scan-progress-box');
  const counterEl = document.getElementById('scan-progress-counter');
  const currentFileEl = document.getElementById('scan-current-file');
  const metricScanned = document.getElementById('metric-scanned-count');
  const metricThreats = document.getElementById('metric-threats-count');
  const resultsBadge = document.getElementById('results-badge');
  const threatsList = document.getElementById('threats-list');

  window.api.scanner.onProgress((data) => {
    counterEl.textContent = `${data.scannedFiles} files`;
    currentFileEl.textContent = data.currentFile || '';
    metricScanned.textContent = data.scannedFiles;
  });

  async function handleScan(scanPromise) {
    btnQuick.disabled = true;
    btnCustom.disabled = true;
    progressBox.style.display = 'block';
    resultsBadge.className = 'badge badge-clean';
    resultsBadge.textContent = 'Scanning...';
    threatsList.innerHTML = '';

    try {
      const result = await scanPromise;
      metricScanned.textContent = result.scannedFiles;
      metricThreats.textContent = result.threats.length;

      if (result.threats.length === 0) {
        resultsBadge.className = 'badge badge-clean';
        resultsBadge.textContent = 'Clean & Safe';
        threatsList.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">🛡️</div>
            <div class="empty-title">${currentLang === 'ar' ? 'لم يتم العثور على أي تهديدات' : 'No Threats Detected'}</div>
            <div class="empty-sub">${currentLang === 'ar' ? 'جميع الملفات المفحوصة سليمة وآمنة 100%.' : 'All scanned files are verified clean and safe.'}</div>
          </div>
        `;
      } else {
        resultsBadge.className = 'badge badge-danger';
        resultsBadge.textContent = `${result.threats.length} Threats Found!`;
        threatsList.innerHTML = result.threats.map(t => `
          <div class="threat-item">
            <div class="threat-info">
              <h4>
                <span class="badge badge-danger">${t.severity}</span>
                ${t.threatName}
              </h4>
              <div class="threat-path">${t.path}</div>
            </div>
            <button class="btn btn-danger btn-sm" onclick="quarantineItem('${t.path.replace(/\\/g, '\\\\')}', this)">
              ${i18n[currentLang].btnQuarantine}
            </button>
          </div>
        `).join('');
      }
    } catch (e) {
      alert('Scan error: ' + e.message);
    } finally {
      progressBox.style.display = 'none';
      btnQuick.disabled = false;
      btnCustom.disabled = false;
    }
  }

  btnQuick.addEventListener('click', () => handleScan(window.api.scanner.startQuickScan()));

  btnCustom.addEventListener('click', async () => {
    const folder = await window.api.scanner.selectFolder();
    if (folder) {
      handleScan(window.api.scanner.startCustomScan(folder));
    }
  });
}

window.quarantineItem = async function(filePath, btn) {
  btn.disabled = true;
  btn.textContent = 'Quarantining...';
  const res = await window.api.scanner.quarantine(filePath);
  if (res.success) {
    btn.parentElement.style.opacity = '0.5';
    btn.textContent = 'Quarantined';
  } else {
    alert('Error: ' + res.error);
    btn.disabled = false;
  }
};

// ========================
// 2. USB DOCTOR ENGINE
// ========================
let detectedDrives = [];

async function loadUsbDrives() {
  const select = document.getElementById('usb-drive-select');
  const details = document.getElementById('usb-drive-details');
  select.innerHTML = '<option value="">Detecting USB drives...</option>';

  detectedDrives = await window.api.usbDoctor.detectDrives();
  if (detectedDrives.length === 0) {
    select.innerHTML = `<option value="">${i18n[currentLang].noUsbDetected}</option>`;
    details.style.display = 'none';
    return;
  }

  select.innerHTML = detectedDrives.map(d => `
    <option value="${d.letter}">${d.letter} [${d.label}] - ${(d.freeBytes / (1024**3)).toFixed(1)} GB Free</option>
  `).join('');

  updateUsbDriveDetails(detectedDrives[0]);
}

function updateUsbDriveDetails(drive) {
  const details = document.getElementById('usb-drive-details');
  if (!drive) {
    details.style.display = 'none';
    return;
  }
  details.style.display = 'flex';
  document.getElementById('usb-det-letter').textContent = drive.letter;
  document.getElementById('usb-det-label').textContent = drive.label;
  document.getElementById('usb-det-free').textContent = `${(drive.freeBytes / (1024**3)).toFixed(1)} GB`;
}

function initUsbDoctor() {
  const select = document.getElementById('usb-drive-select');
  const btnRefresh = document.getElementById('btn-refresh-drives');
  const btnScan = document.getElementById('btn-scan-usb');
  const btnClean = document.getElementById('btn-clean-usb');
  const resultsBox = document.getElementById('usb-results-box');

  btnRefresh.addEventListener('click', loadUsbDrives);

  select.addEventListener('change', () => {
    const d = detectedDrives.find(x => x.letter === select.value);
    updateUsbDriveDetails(d);
  });

  btnScan.addEventListener('click', async () => {
    const letter = select.value;
    if (!letter) {
      alert(currentLang === 'ar' ? 'يرجى اختيار فلاشة USB أولاً' : 'Please select a USB drive first');
      return;
    }
    btnScan.disabled = true;
    btnScan.textContent = 'Auditing...';
    try {
      const res = await window.api.usbDoctor.scanDrive(letter);
      resultsBox.style.display = 'block';
      document.getElementById('usb-stat-threats').textContent = res.threatCount;
      document.getElementById('usb-stat-unhidden').textContent = `${res.hiddenFilesCount} Hidden`;
      document.getElementById('usb-stat-immunized').textContent = 'READY';
      document.getElementById('usb-status-message').textContent = currentLang === 'ar'
        ? `اكتمل فحص الفلاشة. تم العثور على ${res.threatCount} تهديدات و ${res.hiddenFilesCount} ملف مخفي.`
        : `Audit finished. Detected ${res.threatCount} threats and ${res.hiddenFilesCount} hidden files.`;
    } finally {
      btnScan.disabled = false;
      btnScan.textContent = i18n[currentLang].btnScanUsb;
    }
  });

  btnClean.addEventListener('click', async () => {
    const letter = select.value;
    if (!letter) {
      alert(currentLang === 'ar' ? 'يرجى اختيار فلاشة USB أولاً' : 'Please select a USB drive first');
      return;
    }
    btnClean.disabled = true;
    btnClean.textContent = 'Cleaning & Unhiding...';
    try {
      const res = await window.api.usbDoctor.cleanDrive(letter);
      resultsBox.style.display = 'block';
      document.getElementById('usb-stat-threats').textContent = res.deletedThreats;
      document.getElementById('usb-stat-unhidden').textContent = 'RESTORED';
      document.getElementById('usb-stat-immunized').textContent = res.immunized ? 'LOCKED' : 'ACTIVE';
      document.getElementById('usb-status-message').textContent = currentLang === 'ar'
        ? `تم تنظيف الفلاشة بنجاح، فك إخفاء كافة الملفات، وتحصين ملف الـ Autorun لمنع عودة الفيروس!`
        : `USB Drive treated successfully! Deleted threats, restored hidden files, and immunized Autorun.`;
    } finally {
      btnClean.disabled = false;
      btnClean.textContent = i18n[currentLang].btnCleanUsb;
    }
  });
}

// ========================
// 3. PROCESS HUNTER ENGINE
// ========================
function initProcessHunter() {
  const btnAudit = document.getElementById('btn-scan-processes');
  const tbody = document.getElementById('processes-tbody');

  btnAudit.addEventListener('click', async () => {
    btnAudit.disabled = true;
    btnAudit.textContent = 'Auditing Processes...';
    tbody.innerHTML = `
      <tr><td colspan="5" style="text-align:center; padding: 24px;">Inspecting running process trees & memory...</td></tr>
    `;

    try {
      const list = await window.api.processHunter.scanProcesses();
      if (list.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="5" class="table-empty">
              <div class="empty-state">
                <div class="empty-icon">🛡️</div>
                <div class="empty-title text-green">${currentLang === 'ar' ? 'جميع العمليات النشطة سليمة' : 'All Running Tasks Clean'}</div>
                <div class="empty-sub">${currentLang === 'ar' ? 'لم يتم العثور على أي برامج تعدين أو خدمات مشبوهة.' : 'No crypto miners or masquerading services detected.'}</div>
              </div>
            </td>
          </tr>
        `;
      } else {
        tbody.innerHTML = list.map(p => `
          <tr>
            <td><strong>${p.name}</strong><br><small style="color:#94a3b8">${p.path || ''}</small></td>
            <td><code>${p.pid}</code></td>
            <td>${p.threatReason}</td>
            <td><span class="badge badge-danger">${p.severity}</span></td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="killProcessRow(${p.pid}, '${(p.path || '').replace(/\\/g, '\\\\')}', this)">
                ${i18n[currentLang].btnKill}
              </button>
            </td>
          </tr>
        `).join('');
      }
    } finally {
      btnAudit.disabled = false;
      btnAudit.textContent = i18n[currentLang].btnAuditProcesses;
    }
  });
}

window.killProcessRow = async function(pid, pPath, btn) {
  btn.disabled = true;
  btn.textContent = 'Killing...';
  await window.api.processHunter.quarantineProcess(pid, pPath);
  btn.parentElement.parentElement.style.opacity = '0.4';
  btn.textContent = 'Killed';
};

// ========================
// 4. NETWORK & HOSTS SHIELD
// ========================
async function loadNetworkShield() {
  const hosts = await window.api.networkShield.inspectHosts();
  const hostsBadge = document.getElementById('hosts-status-badge');
  const entriesCount = document.getElementById('hosts-entries-count');
  const suspCount = document.getElementById('hosts-suspicious-count');

  entriesCount.textContent = hosts.totalEntries || 0;
  suspCount.textContent = (hosts.suspiciousEntries || []).length;

  if ((hosts.suspiciousEntries || []).length > 0) {
    hostsBadge.className = 'badge badge-danger';
    hostsBadge.textContent = 'Threat Detected';
    suspCount.className = 'text-red';
  } else {
    hostsBadge.className = 'badge badge-clean';
    hostsBadge.textContent = 'Protected';
    suspCount.className = 'text-green';
  }

  const dnsList = await window.api.networkShield.getDnsInfo();
  const dnsContainer = document.getElementById('dns-servers-list');
  if (dnsList.length === 0) {
    dnsContainer.innerHTML = '<div class="dns-item">No active network interfaces found.</div>';
  } else {
    dnsContainer.innerHTML = dnsList.map(item => `
      <div class="dns-item"><strong>${item.interface}:</strong> ${item.dnsServers}</div>
    `).join('');
  }
}

function initNetworkShield() {
  const btnRestore = document.getElementById('btn-restore-hosts');
  const btnFlush = document.getElementById('btn-flush-dns');

  btnRestore.addEventListener('click', async () => {
    btnRestore.disabled = true;
    btnRestore.textContent = 'Restoring...';
    try {
      const res = await window.api.networkShield.restoreHosts();
      if (res.success) {
        alert(currentLang === 'ar' ? 'تمت استعادة ملف HOSTS الأصلي النظيف بنجاح!' : 'HOSTS file restored to clean default successfully!');
        loadNetworkShield();
      } else {
        alert('Error: ' + res.error);
      }
    } finally {
      btnRestore.disabled = false;
      btnRestore.textContent = i18n[currentLang].btnRestoreHosts;
    }
  });

  btnFlush.addEventListener('click', async () => {
    btnFlush.disabled = true;
    btnFlush.textContent = 'Flushing...';
    try {
      await window.api.networkShield.flushDns();
      alert(currentLang === 'ar' ? 'تم تفريغ كاش الـ DNS بنجاح!' : 'DNS Cache cleared successfully!');
    } finally {
      btnFlush.disabled = false;
      btnFlush.textContent = i18n[currentLang].btnFlushDns;
    }
  });
}
