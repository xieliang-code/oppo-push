const express = require("express");
const newsQueryRoute = require("./routes/newsQueryRoute.js");
const { requestLogger } = require("./utils/logger.js");

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  const { headers, body } = req;
  requestLogger.info({ headers, body });
  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Service is running" });
});

app.use("/api", newsQueryRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
