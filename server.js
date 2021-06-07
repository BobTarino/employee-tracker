const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
// const roleQuery = 'SELECT * from role; SELECT CONCAT (e.first_name," ",e.last_name) AS full_name FROM employee e';

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

    let query = 'SELECT * FROM department'

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

    let query = 'SELECT * FROM employee'

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
        .then((answer) => {
            let sql = 'INSERT INTO department (name) VALUES (?)';

            db.query(sql, answer.addDepartment, (err, res) => {
                if (err) throw err;
                console.log('');

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
                message: "What is the salary of the new role?"
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
    ]).then(async function (res) {
        db.query(
            "INSERT INTO employee SET ?",
            {
                first_name: res.firstname,
                last_name: res.lastname,
                role_id: res.role,
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


optionsPrompt();



