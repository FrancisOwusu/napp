
module.exports = app => {
app.use('/',require('./welcomeRoute'));
app.use('/users',require('./userRoute'));
app.use('/roles',require('./roleRoute'))
app.use("*", (_req, res) => res.status(404).json({ message: "route not found" }));
};