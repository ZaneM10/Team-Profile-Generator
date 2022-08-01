const inq = require("inquirer");
const Manager = require("./lib/manger");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const employees = [];
const fs = require('fs');

const addIntern = () => {
  inq
    .prompt([
      {
        message: "What is the intern's name ",
        type: "input",
        name: "firstName",
      },
      {
        message: "What is the intern's Id",
        type: "input",
        name: "employeeId",
      },
      {
        message: "What is the intern's email address",
        type: "input",
        name: "email",
      },
      {
        message: "What is the intern's School?",
        type: "input",
        name: "school",
      },
    ])
    .then((answers) => {
      // Make Intern class from answers
      const intern = new Intern(
        answers.firstName,
        answers.employeeId,
        answers.email,
        answers.school
      );
      employees.push(intern);
      promtForNextEmployee();
    });
};

const addEngineer = () => {
  inq
    .prompt([
      {
        message: "What is the Engineer's name ",
        type: "input",
        name: "firstName",
      },
      {
        message: "What is the Engineer's Id",
        type: "input",
        name: "employeeId",
      },
      {
        message: "What is the Engineer's email address",
        type: "input",
        name: "email",
      },
      {
        message: "What is the Engineer's Github?",
        type: "input",
        name: "githubUsername",
      },
    ])
    .then((answers) => {
      // Make engineer class from asnwers
      const engineer = new Engineer(
        answers.firstName,
        answers.employeeId,
        answers.email,
        answers.githubUsername
      );
      employees.push(engineer);
      promtForNextEmployee();
    });
};
const generateHtml = (employee) => {
 let additionalField;
 let additionalFieldValue;

 if(employee.getRole() === 'Manager') {
  additionalField = 'Office Number';
  additionalFieldValue = employee.getOfficeNumber()
 }else if (employee.getRole() === 'Engineer') {
  additionalField = 'Github';
  additionalFieldValue = employee.getGithub()
 } else {
  additionalField = 'School';
  additionalFieldValue = employee.getSchool()
 }

 return `      <div class="col s6 offset-s3">
 <div class="card blue-grey darken-1">
   <div class="card-content white-text z-depth-4">
     <span class="card-title">${employee.getName()}</span>
     <p><i class="fa-solid fa-mug-hot"></i>${employee.getRole()}</p>
   </div>
   <div class="card-action z-depth-4">
     <p>ID: <a href="#" target="_blank">100</a></p>
   </div>
   <div class="card-action z-depth-4">
     <p>Email: <a href="" target="_blank">${employee.getEmail()}</a> </p>
   </div>
   <div class="card-action z-depth-4">
     <p>${additionalField}: ${additionalFieldValue} </p>
   </div>
 </div>
</div>`
}
function getHtmlTemplate (htmlStr) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.i" />
      <title>Team Profile Generator</title>
      <!-- materialize cdn -->
      <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
    />
    </head>
    <body>
        <!-- header  -->
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo center">Team Profile</a>
        </div>
      </nav>
      <div class="row">             
  ${htmlStr}
      </div>
  <!-- font awesome cdn -->
    <script src="https://use.fontawesome.com/e9219c1b6e.js"></script>
  </body>
</html>
`
}
const promtForNextEmployee = () => {
  inq
    .prompt([
      {
        message: "Who would you like to add to your team",
        type: "list",
        choices: ["Engineer", "Intern", "Done"],
        name: "nextOperation",
      },
    ])
    .then((answers) => {
      switch (answers.nextOperation) {
        case "Engineer": {
          // Add Engineer;
          addEngineer();
          break;
        }

        case "Intern": {
          // Add intern;
          addIntern();
          break;
        }

        case "Done": {
          // Move to the next step (GENERATE HTML)
          console.log(employees);
          let htmlStr = ''
          for (const employee of employees) {
            htmlStr += generateHtml(employee);
          }
          console.log(htmlStr);
          const html = getHtmlTemplate(htmlStr);
          fs.writeFileSync('result.html', html)
          break;
        }
      }
    });
};

inq
  .prompt([
    {
      message: "What is your name?",
      type: "input",
      name: "firstName",
    },
    {
      message: "What is your employee ID?",
      type: "input",
      name: "employeeId",
    },
    {
      message: "What is your email address?",
      type: "input",
      name: "email",
    },
    {
      message: "What is your office number?",
      type: "input",
      name: "officeNumber",
    },
  ])
  .then((answers) => {
    // Make a manger using answers
    const manger = new Manager(
      answers.firstName,
      answers.employeeId,
      answers.email,
      answers.officeNumber
    );
    employees.push(manger);
    promtForNextEmployee();
  });
