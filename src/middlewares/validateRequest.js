const generateSignature = require("../utils/signatureUtils.js");

const validateRequest = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).json({
      code: "400",
      msg: "Invalid Content-Type",
    });
    return;
  }

  const apiKey = req.headers["apikey"];
  const validApiKey = "8f5JoVbbi50CkcgC0gG88Wo0S";
  if (apiKey !== validApiKey) {
    res.status(400).json({
      code: "400",
      msg: "Invalid API key",
    });
    return;
  }
  const requestid = req.headers["requestid"];
  if (requestid !== "36eu298d10a00") {
    res.status(400).json({
      code: "400",
      msg: "Missing requestId",
    });
    return;
  }

  const requestBody = req.body;
  if (requestBody.source !== "Taboola") {
    res.status(400).json({
      code: "400",
      msg: "Invalid source",
    });
    return;
  }

  if (
    !Array.isArray(requestBody.regions) ||
    requestBody.regions.some((region) => typeof region !== "string")
  ) {
    res.status(400).json({
      code: "400",
      msg: "Invalid regions format",
    });
    return;
  }

  const date = requestBody.date;
  if (isNaN(date) || !Number.isInteger(date)) {
    res.status(400).json({
      code: "400",
      msg: "Invalid date format",
    });
    return;
  }

  const signature = generateSignature(
    requestBody.source,
    requestBody.regions,
    requestBody.date
  );

  if (requestBody.signature !== signature) {
    res.status(400).json({
      code: "400",
      msg: "Invalid signature",
    });
    return;
  }

  next();
};

module.exports = validateRequest;
