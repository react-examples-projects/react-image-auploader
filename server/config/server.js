const { SERVER } = require("./variables");
const wrapServerErrors = require("../middlewares/errorsHandling");
const { message } = require("../helpers/utils");
const { connectDb, closeDb } = require("../config/connection");

async function startServer(app) {
  try {
    wrapServerErrors(app);

    app.listen(SERVER.PORT, async () => {
      await connectDb();
      message.success(`Server has started in http://localhost:${SERVER.PORT}/`);
      process.on("SIGINT", closeDb);
      process.on("SIGTERM", closeDb);
    });
  } catch (err) {
    message.error("Ocurred in a error while starting the server", err);
  }
}

module.exports = startServer;
