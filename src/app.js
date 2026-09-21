const express = require("express");
const { greet } = require("./greet");

function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.json({ message: "Welcome to my first app" });
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/hello", (req, res) => {
    const name = req.query.name;
    res.json({ message: greet(name) });
  });

  return app;
}

module.exports = { createApp };
