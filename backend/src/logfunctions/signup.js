const fs = require("fs");

const signupLog = (data) => {
  fs.writeFile(`./src/logs/hai.txt`, data, (err) => {
    console.log(err);
  });
};

module.exports = { signupLog };
