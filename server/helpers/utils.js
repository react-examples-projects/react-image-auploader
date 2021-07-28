const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../config/variables").SERVER.API;
const message = {
  success(str) {
    console.log(chalk.greenBright(`[✔️] ${str}`) + "\n");
  },

  error(str, err = null) {
    console.log(chalk.redBright(`[❌] ${str}`) + "\n");
    err && console.log(chalk.redBright(`[❌] Error message: ${err}`) + "\n");
  },

  warn(str) {
    console.log(chalk.yellowBright(`[⚠️] ${str}`) + "\n");
  },
};

function getTokenInfo(token) {
  return jwt.verify(token, SECRET_TOKEN, (err, payload) => ({
    isValid: !err,
    payload,
  }));
}

module.exports = { message, getTokenInfo };
