// const { functions } = require('lodash');
const db = require('./db/connection');
const inquirer = require('inquirer');

function startMenu() {
  inquirer.prompt(
    [{
      type: 'list',
      name: 'menu',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add an Employee', 'Update Employee Role', 'View All Departments', 'Add Department', 'View All Roles', 'Add Role', 'Quit'],
    }]
  ).then(
    results => {
      console.log(results);
      switch (results.menu) {
        case "View All Employees":
          viewEmploy();
          break
        case "Add an Employee":
          addEmploy();
          break
        case "Update Employee Role":
          updateEmployRoles();
          break
        case "View All Departments":
          viewDept();
          break
        case "Add Department":
          addDept();
          break
        case "View All Roles":
          viewRole();
          break
        case "Add Role":
          updateRoles();
          break
        // case "Quit":
        //   viewEmploy();
        //   break
      }
    }
  )
}

function viewDept(params) {
  db.query(`SELECT * FROM department`,
    function (err, answers) {
      if (err) {
        console.log(err);
      }
      console.table(answers);
      startMenu();
    }
  )
}

function viewRole(params) {
  db.query(`SELECT * FROM role`,
    function (err, answers) {
      if (err) {
        console.log(err);
      }
      console.table(answers);
      startMenu();
    }
  )
}
// need the salary for the employee table so need to add custom join on table
function viewEmploy(params) {
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.salary FROM employee LEFT JOIN role ON role.id = employee.role_id`,
    function (err, answers) {
      if (err) {
        console.log(err);
      }
      console.table(answers);
      startMenu();
    }
  )
}

// I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmploy(params) {
  inquirer.prompt(
    [{
      type: 'input',
      name: 'first_name',
      message: "What is the employee's first name?",
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What is the employee's last name?",
    },
    {
      type: 'list',
      name: 'role',
      message: "What is the employee's role?",
      choices: ["fgy"],
    },
    {
      type: 'list',
      name: 'role',
      message: "Who is the employee's manager?",
      choices: [""],
    }
    ]
  ).then(
    results => {
      console.log(results);
    }
  )
}

// update Employee Roles
function updateEmployRoles(params) {
  inquirer.prompt(
    [{
      type: 'input',
      name: 'employ_id',
      message: 'Please type in the id of the employee',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Please type in the role id?',
    }]
  ).then(
    results => {
      console.log(results);
      // order matters first question mark means first value in the params array to be answered and the 2nd ? is for the 2nd value etc. you have to add a question mark each time you want to update a larger param or table.
      const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
      const params = [results.role_id, results.employ_id];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err)
          return;
        }
        console.log('The Role has been updated within the database')
      });
    }
  )
}

// I am prompted to enter the name, salary, and department for the role and that role is added to the database
function updateRoles(params) {
  inquirer.prompt(
    [{
      type: 'input',
      name: 'employ_id',
      message: 'Please type in the id of the employee',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Please type in the role id?',
    }]
  ).then(
    results => {
      console.log(results);
      // order matters first question mark means first value in the params array to be answered and the 2nd ? is for the 2nd value etc. you have to add a question mark each time you want to update a larger param or table.
      const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
      const params = [results.role_id, results.employ_id];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err)
          return;
        }
        console.log('The Role has been updated within the database')
      });
    }
  )
}

// I am prompted to enter the name of the department and that department is added to the database
function addDept(params) {
  inquirer.prompt(
    [{
      type: 'input',
      name: '',
      message: 'Please write a short description of your project',
    }]
  ).then(
    results => {
      console.log(results);
    }
  )
}


startMenu();