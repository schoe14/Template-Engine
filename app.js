const fs = require("fs");
const inquirer = require("inquirer");
const hbs = require("handlebars");

const Helpers = require("./lib/Helpers");
const EmployeeArr = require("./lib/EmployeeArr");

// Instantiates EmployeeArr class (helper class to collect objects depending on the user input)
const employeeArr = new EmployeeArr();

// Variable and function to use to validate the number of manager that can exist in the team
let isManagerPresent = false;

function findManager() {
    return isManagerPresent;
}

// Prompts users to see if they would like to add more information (used for recursive prompts)
const promptUser1 = () => {
    return inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Add new employee information?",
        },
    ])
}

// Prompts users to provide information needed. Each question has own validation.
const promptUser2 = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is the person's role?",
            choices: ["Manager", "Engineer", "Intern"],
            when: findManager() == false
        },
        {
            type: "list",
            name: "role",
            message: "What is the person's role?",
            choices: ["Engineer", "Intern"],
            when: findManager() == true
        },
        {
            type: "input",
            name: "empName",
            message: "What is the person's name?",
            validate: function (value) {
                const pass = value.match(/^[a-zA-Z ]{2,30}$/);
                if (pass) {
                    return true;
                } else {
                    return "Please enter a valid name. Press upwards arrow to re-enter your value";
                }
            },
            filter: function (value) {
                if (value.includes(" ")) {
                    return value.split(" ").map(function (val) { return val.charAt(0).toUpperCase() + val.substring(1); }).join(" ");
                } else if (value.length > 1) return value.charAt(0).toUpperCase() + value.substring(1);
                else { return value.charAt(0).toUpperCase(); }
            }
        },
        {
            type: "input",
            name: "empId",
            message: "What is the person's id?",
            validate: function (value) {
                const valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number without dash. Press upwards arrow to re-enter your value";
            },
            filter: Number
        },
        {
            type: "input",
            name: "email",
            message: "What is the person's email?",
            validate: function (value) {
                const pass = value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
                if (pass) {
                    return true;
                } else {
                    return "Please enter a valid email address (Format: xxx@xxx.com). Press upwards arrow to re-enter your value";
                }
            }
        },
        {
            type: "input",
            name: "extraInfo",
            message: "What is the person's office number?",
            when: function (answers) {
                return answers.role === "Manager";
            },
            validate: function (value) {
                const valid = !isNaN(parseFloat(value));
                isManagerPresent = true;
                return valid || "Please enter a number without dash. Press upwards arrow to re-enter your value";
            },
            filter: Number
        },
        {
            type: "input",
            name: "extraInfo",
            message: "What is the person's GitHub user name?",
            when: function (answers) {
                return answers.role === "Engineer";
            },
            validate: function (value) {
                const pass = value.match(/^[0-9a-zA-Z]+$/);
                if (pass) {
                    return true;
                } else {
                    return "Please enter a valid user name (letters or numbers). Press upwards arrow to re-enter your value";
                }
            }
        },
        {
            type: "input",
            name: "extraInfo",
            message: "What is the person's school?",
            when: function (answers) {
                return answers.role === "Intern";
            },
            validate: function (value) {
                const pass = value.match(/^[a-zA-Z ]+$/);
                if (pass) {
                    return true;
                } else {
                    return "Please enter a valid school name (letters). Press upwards arrow to re-enter your value";
                }
            }
        }
    ])
}

// Compiles templates and objects
function render(filename, data) {
    const source = fs.readFileSync(filename, 'utf8').toString();
    const template = hbs.compile(source);
    const output = template(data);
    return output;
}

// Writes HTML file using compiled data
function writeHTML(filename, combinedData) {
    fs.writeFileSync(`./output/${filename}.html`, combinedData, "utf8");
    console.log(`Successfully generated ${filename}.html!`)
}

(async function () {
    try {
        while (await (await promptUser1()).confirm == true) {
            const userInput = await promptUser2();

            // Instantiates Helpers class that returns corresponding objects (Manager, Engineer or Intern) to user input
            const userInfo = new Helpers(userInput.role, userInput.empName, userInput.empId, userInput.email, userInput.extraInfo).employeeInfo();

            // EmployeeArr class function that adds the object to an array
            employeeArr.addEmployee(userInfo);
        }

        // EmployeeArr class function that returns array with stored objects
        const employeesAdded = employeeArr.getEmployees();

        const templates = ['./templates/main.html', './templates/manager.html', './templates/engineer.html',
            './templates/intern.html'];

        const results = templates.map(function (template) {
            // Compiles each element of templates array and object array
            const result = render(template, employeesAdded);
            return result;
        })

        writeHTML("team", results.join(''));

    } catch (e) {
        console.log('error', e);
    }
})();
