const newsService = require("../services/newsService.js");
const generateSignature = require("../utils/signatureUtils.js");
const express = require("express");

const router = express.Router();

// 合并后的中间件函数
const validateRequest = (req, res, next) => {
  // 验证请求头的Content - Type
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

  const requestId = req.headers["requestId"];
  if (!requestId) {
    res.status(400).json({
      code: "400",
      msg: "Missing requestId",
    });
    return;
  }

  const requestBody = req.body;
  // 验证source是否为"Taboola"
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

  // 生成签名
  const signature = generateSignature(
    requestBody.source,
    requestBody.regions,
    requestBody.date
  );

  // 假设请求体中带有签名，这里验证签名
  if (requestBody.signature !== signature) {
    res.status(400).json({
      code: "400",
      msg: "Invalid signature",
    });
    return;
  }

  next();
};

router.post("/push/api/news/query", validateRequest, async (req, res) => {
  try {
    const newsData = await newsService.getNewsData(
      req.body.regions,
      req.body.date
    );
    res.json({
      code: "200",
      msg: "Success",
      data: newsData,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
