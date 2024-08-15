"use strict"
const authenticate = require("../middleware/authenticate");
module.exports = (app) => {
  app.use("/", require("./welcomeRoute"));
  app.use("/auth",require("./authRoute"));
  app.use("/users", require("./userRoute"));
  app.use("/roles", require("./roleRoute"));
  app.use("/categories", require("./categoryRoute"));
  app.use("/permissions", require("./permissionRoute"));
  app.use("/roleusers", require("./roleUserRoute"));
  app.use("/userpermissions", require("./userPermissionRoute"));
  app.use("/priorities",require("./priorityRoute"));
  app.use("/tickets",authenticate,require("./ticketRoute"));
  app.use("/dashboard",authenticate,require("./dashboardRoute"));
 app.use("/ticket/statuses",require("./ticketStatusRoute"))
  app.use("*", (_req, res) => res.status(404).json({ message: "route not found" })
  );
};
