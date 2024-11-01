const express = require("express");
const getNewsData = require("../services/newsService.js");
const validateRequest = require("../middlewares/validateRequest.js");
const { successLogger, errorLogger } = require("../utils/logger.js");

const router = express.Router();

router.post("/push/api/news/query", validateRequest, async (req, res) => {
  try {
    const newsData = await getNewsData(req.body.regions, req.body.date);
    if (newsData === undefined) {
      errorLogger.error(`Failed to retrieve news data. Date: ${req.body.date}. Regions: [${req.body.regions}]`);
      res.status(500).json({
        code: "500",
        msg: "Internal Server Error",
        error: "No valid news data retrieved",
      });
    } else {
      successLogger.info(
        `Successfully retrieved news data. Date: ${req.body.date}. Regions: [${req.body.regions}]`
      );
      res.json({
        code: "200",
        msg: "Success",
        data: newsData,
      });
    }
  } catch (error) {
    errorLogger.error(
      `An error occurred while processing the request. Date: ${req.body.date}. Regions: [${req.body.regions}]`,
      error
    );
    console.log(error.message);
    res.status(500).json({
      code: "500",
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
