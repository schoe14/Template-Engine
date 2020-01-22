class EmployeeArr {
    constructor() {
        this.managerCapa = 1;
        this.employees = [];
    }

    addEmployee(employee) {
        const objName = employee.constructor.name;
        this.employees.push({[objName] : employee});
    }

    getEmployees() {
        return this.employees;
    }
}

module.exports = EmployeeArr;