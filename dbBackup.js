/* eslint-disable no-undef */
const { exec } = require("child_process");
const moment = require("moment");
const { uploadFileToSlack } = require("./uploadFunction");
const path = require("path");

exports.executeBackup = () => {
  const filename = `${moment().format("MM-Do-YYYY-h:mm")}.sql`;
  process.env.PGPASSWORD = 
  console.log("filename", filename);

  const commandToRun = `pg_dump --host=${process.env.HOST}  --username=${process.env.DBUSER}  --dbname=${process.env.DB} --file=${filename}`;
  exec(commandToRun, (error, stdout, stderr) => {
    delete process.env.PGPASSWORD;
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }

    const currentDirectory = process.cwd();

    // Construct the full path to the file
    const filePath = path.join(currentDirectory, filename);
    uploadFileToSlack(filePath, filename);

    console.log(`Command output: ${stdout}`);
  });
};
