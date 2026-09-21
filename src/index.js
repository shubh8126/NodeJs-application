const { createApp } = require("./app");
const { loadConfig } = require("./config");

const { port, host } = loadConfig();
const app = createApp();

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
