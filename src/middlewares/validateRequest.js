const generateSignature = require("../utils/signatureUtils.js");
const { errorLogger, requestLogger } = require("../utils/logger");

const validateRequest = (req, res, next) => {
  const apiKey = req.headers["apikey"];
  const validApiKey = "bbdedea82872c8c2f24ca23a64a159dc";
  if (apiKey !== validApiKey) {
    errorLogger.error("Invalid API key.");
    res.status(400).json({
      code: "400",
      msg: "Invalid API key",
    });
    return;
  }
  const requestid = req.headers["requestid"];
  requestLogger.info(requestid);
  if (!requestid) {
    errorLogger.error("Invalid requestId.");
    res.status(400).json({
      code: "400",
      msg: "Missing requestId",
    });
    return;
  }

  const requestBody = req.body;
  if (requestBody.source !== "Taboola") {
    errorLogger.error("Invalid source.");
    res.status(400).json({
      code: "400",
      msg: "Invalid source",
    });
    return;
  }

  if (
    !Array.isArray(requestBody.regions) ||
    requestBody.regions.some(
      (region) => typeof region !== "string" || region === ""
    )
  ) {
    errorLogger.error("Invalid regions format.");
    res.status(400).json({
      code: "400",
      msg: "Invalid regions format",
    });
    return;
  }

  const date = requestBody.date;
  if (isNaN(date) || !Number.isInteger(date)) {
    errorLogger.error("Invalid date format.");
    res.status(400).json({
      code: "400",
      msg: "Invalid date format",
    });
    return;
  }

  const sign = generateSignature(
    requestBody.source,
    requestBody.regions,
    requestBody.date
  );

  if (requestBody.sign !== sign) {
    errorLogger.error("Invalid signature.");
    res.status(400).json({
      code: "400",
      msg: "Invalid signature",
    });
    return;
  }

  next();
};

module.exports = validateRequest;
