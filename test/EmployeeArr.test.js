const EmployeeArr = require("../lib/EmployeeArr");

test("Can instantiate EmployeeArr instance", () => {
    const e = new EmployeeArr();
    expect(typeof (e)).toBe("object");
});

test("Can set employees array via constructor", () => {
    const employeesArray = [];
    const e = new EmployeeArr();
    expect(e.employees).toStrictEqual(employeesArray);
});

test("Can add employee via addEmployee()", () => {
    const testValue = [{ "Object": { "name": "Alice" } }];
    const e = new EmployeeArr();
    e.addEmployee({ name: "Alice" });
    expect(e.employees).toStrictEqual(testValue);
});

test("Can get employees array via getEmployees()", () => {
    const testValue = [{ "Object": { "name": "Alice" } }];
    const e = new EmployeeArr();
    e.addEmployee({ name: "Alice" });
    expect(e.getEmployees()).toStrictEqual(testValue);
});
