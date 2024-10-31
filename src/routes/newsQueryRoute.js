const newsService = require("../services/newsService.js");
const generateSignature = require("../utils/signatureUtils.js");
const express = require("express");

const router = express.Router();

router.post("/push/api/news/query", async (req, res) => {
  // 验证请求头的Content - Type
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).json({
      code: "400",
      msg: "Invalid Content - Type",
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

  try {
    const newsData = await newsService.getNewsData(
      requestBody.regions,
      requestBody.date
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
