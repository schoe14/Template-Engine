const fs = require("fs");
const inquirer = require("inquirer");
const hbs = require("handlebars");
// const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
const Helpers = require("./lib/Helpers");
const EmployeeArr = require("./lib/EmployeeArr");

const employeeArr = new EmployeeArr();

const promptUser1 = () => {
    return inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Add new employee information?",
        },
    ])
}

const promptUser2 = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is the person's role?",
            choices: ["Manager", "Engineer", "Intern"],
        },
        {
            type: "input",
            name: "empName",
            message: "What is the person's name?",
        },
        {
            type: "input",
            name: "empId",
            message: "What is the person's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the person's email?",
        },
        {
            type: "input",
            name: "extraInfo",
            message: "What is the person's office number?",
            when: function (answers) {
                return answers.role === "Manager";
            }
        },
        {
            type: "input",
            name: "extraInfo",
            message: "What is the person's GitHub user name?",
            when: function (answers) {
                return answers.role === "Engineer";
            }
        },
        {
            type: "input",
            name: "extraInfo",
            message: "What is the person's school?",
            when: function (answers) {
                return answers.role === "Intern";
            }
        }
    ])
}

function render(filename, data) {
    var source = fs.readFileSync(filename, 'utf8').toString();
    var template = hbs.compile(source);
    var output = template(data);
    return output;
}

function writeHTML(filename, combinedData) {
    fs.writeFileSync(`./output/${filename}.html`, combinedData, "utf8");
    console.log(`Successfully generated ${filename}.html!`)
}

(async function () {
    try {
        while (await (await promptUser1()).confirm == true) {
            const userInput = await promptUser2();
            const userInfo = new Helpers(userInput.role, userInput.empName, userInput.empId, userInput.email, userInput.extraInfo).employeeInfo();
            employeeArr.addEmployee(userInfo);
        }

        const employeesAdded = employeeArr.getEmployees();
        // console.log(employeesAdded);

        // const mainHTML = fs.readFileSync('./templates/main.html', 'utf8').toString();

        const mainResult = await render('./templates/main.html', employeesAdded);
        const managerResult = await render('./templates/manager.html', employeesAdded);
        const engineerResult = await render('./templates/engineer.html', employeesAdded);
        const internResult = await render('./templates/intern.html', employeesAdded);

        const combinedResult = mainResult + managerResult + engineerResult + internResult;

        await writeHTML("team", combinedResult);

    } catch (e) {
        console.log('error', e);
    }
})();
