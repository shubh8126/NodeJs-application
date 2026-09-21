const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { loadConfig } = require("../src/config");

describe("loadConfig", () => {
  it("uses defaults when env vars are missing", () => {
    assert.deepEqual(loadConfig({}), {
      port: 3000,
      host: "0.0.0.0",
      nodeEnv: "development",
    });
  });

  it("reads PORT, HOST, and NODE_ENV", () => {
    assert.deepEqual(
      loadConfig({ PORT: "8080", HOST: "127.0.0.1", NODE_ENV: "production" }),
      { port: 8080, host: "127.0.0.1", nodeEnv: "production" }
    );
  });

  it("trims HOST and NODE_ENV", () => {
    const config = loadConfig({ HOST: "  0.0.0.0  ", NODE_ENV: "  production  " });
    assert.equal(config.host, "0.0.0.0");
    assert.equal(config.nodeEnv, "production");
  });

  it("rejects invalid PORT values", () => {
    assert.throws(() => loadConfig({ PORT: "abc" }), /Invalid PORT/);
    assert.throws(() => loadConfig({ PORT: "0" }), /Invalid PORT/);
    assert.throws(() => loadConfig({ PORT: "70000" }), /Invalid PORT/);
  });
});
