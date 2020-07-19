const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Building Team 
class Team {
    constructor() {
        this.teamSize = 0;
        this.team = [];
    }
    start() {
        if (this.teamSize === 0) {
            this.managerPrompt()
        } else {
            this.addNewMember()
        }
    }

    // Inquirer Manager Prompt
    managerPrompt() {
        inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Manager's Name:"
        },
        {
            type: "input",
            name: "id",
            message: "Manager's ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Manager's Email Address:"

        },
        {
            type: "input",
            name: "officeNumber",
            message: "Manager's Office Number:"
        }
        ]).then(val => {
            const manager = new Manager(val.name, val.id, val.email, val.officeNumber);
            this.teamSize += 1;
            this.team.push(manager);
            this.addNewMember()
        });
    };

    // Inquirer Add New Member to Team Prompt
    addNewMember() {
        inquirer.prompt([{
            type: "input",
            name: "type",
            message: "Would you like to add an Engineer or Intern? If neither type 'No'."
        },
        ]).then(val => {
            if (val.type === "Engineer") {
                this.engineerPrompt()
            } else if (val.type === "Intern") {
                this.internPrompt()
            } else if (val.type === "No") {
                this.renderList()
            } else {
                this.addNewMember()
            }
        });
    };

    // Inquirer Engineer Prompt
    engineerPrompt() {
        inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Engineer's Name:"
        },
        {
            type: "input",
            name: "id",
            message: "Manager's ID:"
        },
        {

            type: "input",
            name: "email",
            message: "Engineer's Email Address:"
        },
        {
            type: "input",
            name: "github",
            message: "Engineer's GitHub URL:"
        }]).then(val => {
            const engineer = new Engineer(val.name, val.id, val.email, val.github);
            this.teamSize += 1;
            this.team.push(engineer);
            this.addNewMember()
        });
    };

    // Inquirer Intern Prompt
    internPrompt() {
        inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Intern's Name:"
        },
        {
            type: "input",
            name: "id",
            message: "Intern's ID:"
        },
        {

            type: "input",
            name: "email",
            message: "Intern's Email Address:"
        },
        {
            type: "input",
            name: "school",
            message: "Intern's School:"
        }]).then(val => {
            const intern = new Intern(val.name, val.id, val.email, val.school);
            this.teamSize += 1;
            this.team.push(intern);
            this.addNewMember()
        });
    };

    // Render Function to writeFile
    renderList() {
        fs.writeFile(outputPath, render(this.team), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!")
        });
    };

};


let team = new Team();
team.start();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
