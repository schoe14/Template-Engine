const path = require("path");
const fs = require("fs");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

class Helpers {
    constructor(role, empName, empId, email, extraInfo) {
        this.role = role;
        this.employeeInfo = () => {
            if (this.role == "Manager") {
                return new Manager(empName, empId, email, extraInfo);
            }
            else if (this.role == "Engineer") {
                return new Engineer(empName, empId, email, extraInfo);
            }
            else return new Intern(empName, empId, email, extraInfo);
        }
    }
    getExtraInfo() {
        if (this.employeeInfo() instanceof Manager) return this.employeeInfo().getOfficeNumber();
        else if (this.employeeInfo() instanceof Engineer) return this.employeeInfo().getGithub();
        else return this.employeeInfo().getSchool();
    }
}

module.exports = Helpers;