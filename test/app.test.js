const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("../src/app");

function request(app, method, path) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      fetch(`http://127.0.0.1:${port}${path}`, { method })
        .then(async (res) => {
          const body = await res.json();
          server.close();
          resolve({ status: res.status, body });
        })
        .catch((err) => {
          server.close();
          reject(err);
        });
    });
  });
}

describe("API", () => {
  it("GET / returns a welcome message", async () => {
    const app = createApp();
    const res = await request(app, "GET", "/");
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { message: "Welcome to my app" });
  });

  it("GET /health returns ok", async () => {
    const app = createApp();
    const res = await request(app, "GET", "/health");
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { status: "ok" });
  });

  it("GET /api/hello returns default message", async () => {
    const app = createApp();
    const res = await request(app, "GET", "/api/hello");
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { message: "Hello, world" });
  });

  it("GET /api/hello?name=Ada personalizes the message", async () => {
    const app = createApp();
    const res = await request(app, "GET", "/api/hello?name=Ada");
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { message: "Hello, Ada" });
  });
});
