const fs = require("fs");
let logData;
const getAllLogs = async (req, res, next) => {
  fs.readFile("./src/logs/hai.txt", "utf-8", (err, res) => {
    logData = res;
  });
  res.success(200, "success", logData);
};

module.exports = { getAllLogs };
