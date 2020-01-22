const Helpers = require("../lib/Helpers");

test("Can instantiate Helpers instance", () => {
    const e = new Helpers();
    expect(typeof(e)).toBe("object");
  });