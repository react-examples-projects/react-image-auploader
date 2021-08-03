const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const express = require("express");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
const routers = require("./routers");
const startServer = require("./config/server");

// Security middlewares
app.use(cors({ origin: "*" }));
app.use(helmet({}));
app.use(hpp());
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50, // limit each IP to 100 requests per windowMs
  })
);

app.use(morgan("dev"));
app.use(express.static("./uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api", routers);
startServer(app);
