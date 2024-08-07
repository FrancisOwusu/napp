const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();
const path = require('path')
const dbConnect = require("./config/db");
const { application } = require("./config/app");
const routes = require("./routes");
const { myLogger, accessControl, authMiddleware } = require("./middleware");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(myLogger);
// app.use(accessControl);
// app.use(authMiddleware);
// Define __basedir
global.__basedir = path.resolve(__dirname);
// Routes
routes(app);

// Database connection
dbConnect.sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


app.listen(application.PORT, () => {
  console.log(`Example app listening on port ${application.PORT}`);
});
