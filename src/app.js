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

app.use("/api", newsQueryRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
