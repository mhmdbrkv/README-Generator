const aiRoute = require("./ai.route");

module.exports = (app) => {
  app.use("/ai", aiRoute);
};
