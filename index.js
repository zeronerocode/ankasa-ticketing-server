const express = require("express");
require("dotenv").config();

const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = process.env.PORT || 5001;

const app = express();
const routeNavigation = require("./src/routes");

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("img", express.static(path.join(__dirname, "./uploads")));
app.use("/v1", routeNavigation);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const messError = err.message || "Internal Server Error";
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: messError,
  });
});
app.listen(port, () => console.log(`Server running at on Port: ${port}! `));