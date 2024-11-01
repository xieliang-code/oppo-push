const getNewsData = require("../services/newsService.js");
const express = require("express");
const validateRequest = require("../middlewares/validateRequest.js");

const router = express.Router();

router.post("/push/api/news/query", validateRequest, async (req, res) => {
  try {
    const newsData = await getNewsData(req.body.regions, req.body.date);
    if (newsData === undefined) {
      res.status(500).json({
        code: "500",
        msg: "Internal Server Error",
        error: "No valid news data retrieved",
      });
    } else {
      res.json({
        code: "200",
        msg: "Success",
        data: newsData,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      code: "500",
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
