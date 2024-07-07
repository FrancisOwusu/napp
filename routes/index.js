module.exports = (app) => {
  app.use("/", require("./welcomeRoute"));
  app.use("/users", require("./userRoute"));
  app.use("/roles", require("./roleRoute"));
  app.use("/permissions", require("./permissionRoute"));
  app.use("/roleusers", require("./roleUserRoute"));
  app.use("/userpermissions", require("./userPermissionRoute"));
  app.use("/priorities",require("./priorityRoute"));
  app.use("/tickets",require("./ticketRoute"));
  app.use("*", (_req, res) => res.status(404).json({ message: "route not found" })
  );
};
