/* eslint-disable no-undef */
const os = require("os");
require("dotenv").config();
const axios = require("axios");
const { executeBackup } = require('./dbBackup');

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

const resourcesAlert = async () => {
  let msg =
    "System Resource Information:\n----------------------------\n\nStorage Information:\n";

  const storageInfo = getStorageInfo();
  for (const key in storageInfo) {
    msg += `${key}: ${storageInfo[key]}\n`;
    console.log(`${key}: ${storageInfo[key]}\n`);
  }
  msg += "\nRAM Information:\n";
  const ramInfo = getRAMInfo();
  for (const key in ramInfo) {
    msg += `${key}: ${ramInfo[key]}\n`;
    console.log(`${key}: ${ramInfo[key]}\n`);
  }

  msg += "\nCPU Information:";
  const cpuInfo = getCPUInfo();
  for (const key in cpuInfo) {
    msg += `${key}: ${cpuInfo[key]}\n`;

    console.log(`${key}: ${cpuInfo[key]}\n`);
  }

  console.log(msg);
  await slackHook(msg);
  console.log("Resource Alert Completed")
};



(async () => {
    resourcesAlert()
    executeBackup()
})();
