function loadConfig(env = process.env) {
  const port = Number.parseInt(env.PORT ?? "3000", 10);
  const host = (env.HOST || "0.0.0.0").trim() || "0.0.0.0";
  const nodeEnv = (env.NODE_ENV || "development").trim() || "development";

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT: ${env.PORT}`);
  }

  return { port, host, nodeEnv };
}

module.exports = { loadConfig };
