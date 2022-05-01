const fs = require("fs");
const path = require("path");

const TOKEN_PATH = path.join(__dirname,"..", "db", "refresh_token_db.json");

const getTokens = () => {
  return JSON.parse(fs.readFileSync(TOKEN_PATH, {encoding: "utf-8"}))
}

const addToken = (refreshToken) => {
  const tokens = getTokens();
  tokens.push(refreshToken)
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens))
}

module.exports = {getTokens, addToken}