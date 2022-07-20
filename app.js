const express = require("express");
const bodyParser = require("body-parser");
const expressCrowdsecBouncer = require("@crowdsec/express-bouncer");
const expressMiddleware = require("./index.js");

(async () => {
  // Configure CrowdSec Middleware.
  const crowdsecMiddleware = await expressCrowdsecBouncer({
    url: "http://127.0.0.1:8080",
    apiKey: "7e968b497ec970d2e3213d9379d9fbd3",
  });

  // Configure Express server
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(crowdsecMiddleware);

  // Create an example route.
  app.all("/", function (req, res) {
    res.status(200).send(`The way is clear!`);
  });

  // Start server.
  app.listen(9000);
  console.log(`Express server configured with Crowdsec middleware available here: http://127.0.0.1:9000`);
})();
