const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const roleQuery = 'SELECT * from role; SELECT CONCAT (e.first_name," ",e.last_name) AS full_name FROM employee e';

const optionsPrompt= () => {
    return inquirer
        .prompt(
            {
                type: 'list',
                name: 'options',
                message: 'Select an option?',
                choices: [

                'View all departments', 
                'View all roles',
                'View all employees',
                'Add department',
                'Add role',
                'Add employee',
                'Update employee',
                'Exit']
            },
        )
    
            .then(function({options}) {
                switch(options) {

                    case 'View all departments':
                    viewDepartments()
                    break;

                    case 'View all roles':
                    viewRoles()
                    break;

                    case 'View all employees':
                    viewEmployees()
                    break;

                    case 'Add department':
                    addDepartment()
                    break;
                    
                    
                    case 'Add role':
                    addRole()
                    break;

                    case 'Add employee':
                    addEmployee();
                    break;

                    case 'Update employee':
                    updateEmployee();
                    break;

                    case 'Exit':
                    exit();
                    break;
                }
            })
            .catch();
}
function viewDepartments() {
    
    var query = 'SELECT * FROM department'

    db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Department viewed!");  
    optionsPrompt();

})
};

function viewRoles() {
    
    var query = 'SELECT * FROM role'

    db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Roles viewed!");  
    optionsPrompt();

})
};

function viewEmployees() {
    
    var query = 'SELECT * FROM employee'

    db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Roles viewed!");  
    optionsPrompt();
})
};

function addDepartment() {


    return inquirer
    .prompt([
        {
            type: 'input',
            name: "addDepartment",
            message: "What is the name of the department you want to add?"
        }
    ])
    .then((answer) => {
        let sql = 'INSERT INTO department (name) VALUES (?)';
        
            db.query(sql, answer.addDepartment, (err, res) => {
            if (err) throw err;
            console.log('');

            optionsPrompt()
    });
    });
};


function addRole() { 
    db.query("SELECT role.title AS title, role.salary AS salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: "What is the title of the new role?"
          },
          {
            type: 'input',
            name: 'salary',
            message: "What is the salary of the new role?"
          } 
      ]).then(function(res) {
          db.query(
              "INSERT INTO role SET ?",
              {
                title: res.title,
                salary: res.salary,
                department_id: 1,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  optionsPrompt();
              }
          )
  
      });
    });
    }   

    
function addEmployee() {
    
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstname',
                message: "What is the first name of the employee you want to add?"
            },
            {
                type: 'input',
                name: 'lastname',
                message: "What is the last name of the employee you want to add?"
            },
            {
                type: 'input',
                name: 'roleid',
                message: 'Please enter the role id of the employee you want to add'
            },
            {
                type: 'input',
                name: 'managername',
                message: 'Please enter the manager name of the employee you want to add'
            } 
        ]).then(function(res) {
            db.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: res.firstname,
                  last_name: res.lastname,
                  role_id: res.role,
                  manager_id: res.managername
            
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    optionsPrompt();
                }
            )
    
        });
};


          

      


optionsPrompt();




// Connect to database // variable db holds connection

