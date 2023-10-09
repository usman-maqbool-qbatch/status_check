/* eslint-disable no-undef */
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();
const FormData = require("form-data");

const slackToken = process.env.SLACK_API_TOKEN;

function bytesToMB(bytes) {
  if (!bytes) return "";
  return `${bytes / (1024 * 1024)} MB`;
}

exports.uploadFileToSlack = (filePath, filename) => {
  let data = new FormData();

  // TODO
  // backup from db from node,
  // send file to me
  // run job
  data.append("file", fs.createReadStream(filePath));
  data.append("initial_comment", `Sahelha db backup ${filename}`);
  data.append("channels", process.env.CAHNNELS);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://slack.com/api/files.upload",
    headers: {
      Authorization: `Bearer ${slackToken}`,
      ...data.getHeaders(),
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
      if (response.data?.ok) {
        console.log("File Upload Success");
        console.log("File Size:", bytesToMB(response?.data?.file?.size));
      } else {
        console.log("File Upload Failed");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
