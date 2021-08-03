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
const { SERVER } = require("./config/variables");
const startServer = require("./config/server");

app.use(morgan("dev"));
app.use(express.static("./uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Security middlewares
app.use(helmet());
app.use(hpp());
app.use(cors({ origin: SERVER.API.ALLOWED_DOMAINS }));
app.use(rateLimit(SERVER.API.RATE_LIMITS));
app.use("/api", routers);
startServer(app);
