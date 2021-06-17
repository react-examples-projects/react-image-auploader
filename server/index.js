const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const routers = require("./routers");
const startServer = require("./config/server");

app.use(cors());
app.use(morgan("dev"));
app.use(express.static("./uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api", routers);
startServer(app);
