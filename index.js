const os = require('os');

function getStorageInfo() {
  const totalStorageGB = os.totalmem() / 1024 / 1024 / 1024;
  const freeStorageGB = os.freemem() / 1024 / 1024 / 1024;
  const usedStorageGB = totalStorageGB - freeStorageGB;

  const usedStoragePercentage = (usedStorageGB / totalStorageGB) * 100;

  return {
    'Used Storage (%)': usedStoragePercentage.toFixed(2) + '%',
    'Free Storage (%)': (100 - usedStoragePercentage).toFixed(2) + '%',
  };
}

function getRAMInfo() {
  const totalRAMGB = os.totalmem() / 1024 / 1024 / 1024;
  const freeRAMGB = os.freemem() / 1024 / 1024 / 1024;
  const usedRAMGB = totalRAMGB - freeRAMGB;

  const usedRAMPercentage = (usedRAMGB / totalRAMGB) * 100;

  return {
    'Used RAM (%)': usedRAMPercentage.toFixed(2) + '%',
    'Free RAM (%)': (100 - usedRAMPercentage).toFixed(2) + '%',
  };
}

function getCPUInfo() {
    const numCPUCores = os.cpus().length;
    const cpuUsage = os.loadavg()[0]; // Get the 1-minute load average
  
    return {
      'CPU Cores': numCPUCores,
      'CPU Usage (%)': ((cpuUsage / numCPUCores * 100)/numCPUCores).toFixed(2) + '%',
    };
  }

console.log('System Resource Information:');
console.log('----------------------------');
console.log('Storage Information:');
const storageInfo = getStorageInfo();
for (const key in storageInfo) {
  console.log(`${key}: ${storageInfo[key]}`);
}

console.log('\nRAM Information:');
const ramInfo = getRAMInfo();
for (const key in ramInfo) {
  console.log(`${key}: ${ramInfo[key]}`);
}

console.log('\nCPU Information:');
const cpuInfo = getCPUInfo();
for (const key in cpuInfo) {
  console.log(`${key}: ${cpuInfo[key]}`);
}
