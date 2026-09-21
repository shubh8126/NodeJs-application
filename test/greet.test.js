const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { greet } = require("../src/greet");

describe("greet", () => {
  it("returns a default greeting when name is missing", () => {
    assert.equal(greet(), "Hello, world");
    assert.equal(greet(""), "Hello, world");
    assert.equal(greet("   "), "Hello, world");
    assert.equal(greet(null), "Hello, world");
  });

  it("returns a personalized greeting", () => {
    assert.equal(greet("Ada"), "Hello, Ada");
    assert.equal(greet("  Ada  "), "Hello, Ada");
  });
});
