"use strict";
const authenticate = require("../middleware/authenticate");
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('../swagger');

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use("/", require("./welcomeRoute"));
  app.use("/auth", require("./authRoute"));
  app.use("/users", require("./userRoute"));
  app.use("/roles", require("./roleRoute"));
  app.use("/categories", require("./categoryRoute"));
  app.use("/permissions", require("./permissionRoute"));
  app.use("/roleusers", require("./roleUserRoute"));
  app.use("/userpermissions", require("./userPermissionRoute"));
  app.use("/priorities", require("./priorityRoute"));
  app.use("/tickets", authenticate, require("./ticketRoute"));
  app.use("/dashboard", require("./dashboardRoute"));
  app.use("/statuses", require("./ticketStatusRoute"));
  app.use("*", (_req, res) =>
    res.status(404).json({ message: "route not found" })
  );
};
