import express from "express";
import newsService from "../services/newsService.js";
const router = express.Router();

router.post("/push/api/news/query", (req, res) => {
  // 验证请求头的Content-Type
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).json({
      code: "400",
      msg: "Invalid Content-Type",
    });
    return;
  }

  const requestBody = req.body;
  // 在这里进行参数的验证和业务逻辑处理，例如验证签名是否正确等操作
  const newsData = newsService.getNewsData(
    requestBody.source,
    requestBody.regions,
    requestBody.date
  );
  res.json({
    code: "200",
    msg: "Success",
    data: newsData,
  });
});

export default router;
