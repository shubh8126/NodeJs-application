function greet(name) {
  const trimmed = typeof name === "string" ? name.trim() : "";
  if (!trimmed) {
    return "Hello, world";
  }
  return `Hello, ${trimmed}`;
}

module.exports = { greet };
