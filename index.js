/* eslint-disable no-undef */
const os = require("os");
require("dotenv").config();
const axios = require("axios");

function getStorageInfo() {
  const totalStorageGB = os.totalmem() / 1024 / 1024 / 1024;
  const freeStorageGB = os.freemem() / 1024 / 1024 / 1024;
  const usedStorageGB = totalStorageGB - freeStorageGB;

  const usedStoragePercentage = (usedStorageGB / totalStorageGB) * 100;

  return {
    "Used Storage (%)": usedStoragePercentage.toFixed(2) + "%",
    "Free Storage (%)": (100 - usedStoragePercentage).toFixed(2) + "%",
  };
}

function getRAMInfo() {
  const totalRAMGB = os.totalmem() / 1024 / 1024 / 1024;
  const freeRAMGB = os.freemem() / 1024 / 1024 / 1024;
  const usedRAMGB = totalRAMGB - freeRAMGB;

  const usedRAMPercentage = (usedRAMGB / totalRAMGB) * 100;

  return {
    "Used RAM (%)": usedRAMPercentage.toFixed(2) + "%",
    "Free RAM (%)": (100 - usedRAMPercentage).toFixed(2) + "%",
  };
}

function getCPUInfo() {
  const numCPUCores = os.cpus().length;
  const cpuUsage = os.loadavg()[0]; // Get the 1-minute load average

  return {
    "CPU Cores": numCPUCores,
    "CPU Usage (%)":
      (((cpuUsage / numCPUCores) * 100) / numCPUCores).toFixed(2) + "%",
  };
}

console.log("System Resource Information:");
console.log("----------------------------");
console.log("Storage Information:");
const storageInfo = getStorageInfo();
for (const key in storageInfo) {
  console.log(`${key}: ${storageInfo[key]}`);
}

console.log("\nRAM Information:");
const ramInfo = getRAMInfo();
for (const key in ramInfo) {
  console.log(`${key}: ${ramInfo[key]}`);
}

console.log("\nCPU Information:");
const cpuInfo = getCPUInfo();
for (const key in cpuInfo) {
  console.log(`${key}: ${cpuInfo[key]}`);
}

const slackHook = async (text) => {
  try {
    await axios.post(
      `https://hooks.slack.com/services/${process.env.FIRST_KEY}/${process.env.API_ID}/${process.env.API_KEY}`,
    
      {
        text,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
};

( async() => {
  const storageInfo = getStorageInfo();
  const ramInfo = getRAMInfo();
  const cpuInfo = getCPUInfo();

  const text = `System Resource Information:
  ----------------------------
      Storage Information:
      Used Storage (%): ${storageInfo["Used Storage (%)"]}
      Free Storage (%): ${storageInfo["Free Storage (%)"]}

      RAM Information:
      Used RAM (%): ${ramInfo["Used RAM (%)"]}
      Free RAM (%): ${ramInfo["Free RAM (%)"]}

      CPU Information:
      CPU Cores: ${cpuInfo["CPU Cores"]}
      CPU Usage (%): ${cpuInfo["CPU Usage (%)"]}`;

 await slackHook(text);
})();
