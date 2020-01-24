const Helpers = require("../lib/Helpers");
const Manager = require("../lib/Manager");

test("Can instantiate Helpers instance", () => {
  const e = new Helpers();
  expect(typeof (e)).toBe("object");
});

test("Can set role via constructor arguments", () => {
  const role = "Manager";
  const e = new Helpers(role);
  expect(e.role).toBe(role);
});

test("Can get employeeInfo via constructor arguments", () => {
  const result = new Manager();
  const e = new Helpers("Manager");
  expect(e.employeeInfo()).toStrictEqual(result);
});

test("Can get extraInfo via getExtraInfo()", () => {
  const testValue = new Manager().getOfficeNumber();
  const e = new Helpers("Manager");
  expect(e.getExtraInfo()).toBe(testValue);
});