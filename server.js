const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const optionsPrompt = () => {
    return inquirer
        .prompt(
            {
                type: 'list',
                name: 'options',
                message: 'Select an option?',
                choices: [

                    'View All Departments',
                    'View All Job Roles',
                    'View All Employees',
                    'Add A Department',
                    'Add A Job Role',
                    'Add Employee',
                    'Update Employee Info',
                    'Exit']
            },
        )

        .then(async function ({ options }) {
            switch (options) {

                case 'View All Departments':
                    viewDepartments()
                    break;

                case 'View All Job Roles':
                    viewRoles()
                    break;

                case 'View All Employees':
                    viewEmployees()
                    break;

                case 'Add A Department':
                    addDepartment()
                    break;


                case 'Add A Job Role':
                    addRole()
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Update Employee Info':
                    updateEmployee();
                    break;

                case 'Exit':
                    exit();
                    break;
            }
        })
        .catch();
}

async function viewDepartments() {

    let query = 'SELECT * FROM department '

    db.query(query, async function (err, res) {
        if (err) throw err;

        console.table(res);
        optionsPrompt();

    })
};

async function viewRoles() {

    let query = 'SELECT * FROM role'

    db.query(query, async function (err, res) {
        if (err) throw err;

        console.table(res);
        optionsPrompt();

    })
};

async function viewEmployees() {

    let query = 'select * from employee LEFT JOIN manager ON manager.manager_id = employee.manager_id;'

    db.query(query, async function (err, res) {
        if (err) throw err;

        console.table(res);
        optionsPrompt();
    })
};

async function addDepartment() {


    return inquirer
        .prompt([
            {
                type: 'input',
                name: "addDepartment",
                message: "What is the name of the department you want to add?"
            }
        ])
        .then((res) => {
            let sql = 'INSERT INTO department (name) VALUES (?)';

            db.query(sql, res.addDepartment, (err, res) => {
                if (err) throw err;
                console.table(res);
                optionsPrompt()
            });
        });
};


async function addRole() {
    db.query("SELECT role.title AS title, role.salary AS salary FROM role", async function (err, res) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: "What is the title of the new role?"
            },
            {
                type: 'input',
                name: 'salary',
                message: "Please enter role salary:"
            }
        ]).then(async function (res) {
            db.query(
                "INSERT INTO role SET ?",
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: 1,
                },
                async function (err) {
                    if (err) throw err
                    console.table(res);
                    optionsPrompt();
                }
            )

        });
    });
}


async function addEmployee() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: "Please enter First Name:"
        },
        {
            type: 'input',
            name: 'lastname',
            message: "Please enter Last Name:"
        },
        {
            type: 'input',
            name: 'roleid',
            message: 'Please enter the role id of the employee you want to add'
        },
        {
            type: 'input',
            name: 'managername',
            message: 'Please enter the manager id (#1-8) for the manager of the employee you want to add:'
        }
    ]).then(async function (res) {
        db.query(
            "INSERT INTO employee SET ? ",
            {
                first_name: res.firstname,
                last_name: res.lastname,
                role_id: res.roleid,
                manager_id: res.managername

            },
            async function (err) {
                if (err) throw err
                console.table(res);
                optionsPrompt();
            }
        )

    });
};

//Update Employee Function 
async function updateEmployee() {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
                FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
    db.query(sql, (error, response) => {
      if (error) throw error;
      let employeeNamesArray = [];
      response.forEach((employee) => {employeeNamesArray.push(`${employee.id} ${employee.first_name} ${employee.last_name}`);});

      let sql = `SELECT role.id, role.title FROM role`;
      db.query(sql, (error, response) => {
        if (error) throw error;
        let rolesArray = [];
        response.forEach((role) => {rolesArray.push(`${role.id} ${role.title}`);});

        inquirer
          .prompt([
            {
              name: 'chosenEmployee',
              type: 'list',
              message: 'Which employee has a new role?',
              choices: employeeNamesArray
            },
            {
              name: 'chosenRole',
              type: 'list',
              message: 'What is their new role?',
              choices: rolesArray
            }
          ])
          .then(function(answer) {
            
            const updatedId = answer.chosenEmployee.slice(0, 1);
            const updatedRoleId = answer.chosenRole.slice(0, 1);

            db.query('UPDATE employee SET role_id = ? WHERE id = ?',[updatedRoleId, updatedId],function(err, res) {
              if (err) throw err;
              console.table(res);
              optionsPrompt();
            });
          });
      });
    });
};



optionsPrompt();



