const crypto = require("crypto");
const constants = require("../config");
const apiSecret = constants.apiSecret;

function generateSignature(source, regions, date) {
  const stringToSign = `${apiSecret}${source}${JSON.stringify(regions)}${date}`;
  return crypto.createHash("md5").update(stringToSign).digest("hex");
}
module.exports = generateSignature;
