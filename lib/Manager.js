const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.title = "Manager";
        this.officeNumber = officeNumber;
    }
    getRole() {
        return this.title;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;
