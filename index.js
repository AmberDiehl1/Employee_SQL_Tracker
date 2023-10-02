// Try to add some additional functionality to your application, such as the ability to do the following:

// Update employee managers.
// View employees by manager.
// View employees by department.
//  Delete departments, roles, and employees.
// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.

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
          addRole();
          break
        case "Quit":
          process.exit();
      }
    }
  )
}


// I am presented with a formatted table showing department names and department ids
function viewDept() {
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

// I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewRole() {
  db.query(`SELECT role.id, role.title, role.salary, role.department_id, department.id, department.name  FROM role LEFT JOIN department ON role.department_id = department.id`,
    function (err, answers) {
      if (err) {
        console.log(err);
      }
      console.table(answers);
      startMenu();
    }
  )
}

// I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmploy() {
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
function addEmploy() {

  db.query(`SELECT role.id, role.title FROM role`, function (err, results) {
    const roleTitles = results.map(function (role) {
      return {
        name: role.title,
        value: role.id
      }
    })
    db.query(`SELECT employee.first_name, employee.last_name,employee.manager_id FROM employee`, function (err, results) {
      const managerNames = [];
      for (let index = 0; index < results.length; index++) {
        if (results[index].manager_id) {
          managerNames.push(
            {
              name: results[index].first_name + " " + results[index].last_name,
              value: results[index].manager_id
            }
          )
        }
      }
      
      console.log(managerNames);
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
          name: 'role_id',
          message: "What is the employee's role?",
          choices: roleTitles,
        },
        {
          type: 'list',
          name: 'manager_id',
          message: "Who is the employee's manager?",
          choices: managerNames,
        }
        ]
      ).then(
        results => {
          console.log(results);
          const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
          const params = [results.role_id, results.employ_id];

          db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err)
              return;
            }
            console.log('The Role has been updated within the database');
            startMenu();
          });
        });
    }
    )
  });

}

// update Employee Roles
// I am prompted to select an employee to update and their new role and this information is updated in the database
function updateEmployRoles() {

  db.query(`SELECT * FROM employee`, function (err, results) {
    const employeeTitles = results.map(function (employee) {
      return {
        name: employee.first_name + " " + employee.last_name,
        value: employee.id
      }
    })
    db.query(`SELECT role.id, role.title FROM role`, function (err, results) {
      const roleTitles = results.map(function (role) {
        return {
          name: role.title,
          value: role.id
        }
      })

      inquirer.prompt(
        [{
          type: 'list',
          name: 'employee_id',
          message: "Which employee's role do you want to update?",
          choices: employeeTitles,
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Which role do you want to assign the selected employee?',
          choices: roleTitles,
        }]
      ).then(
        results => {
          console.log(results);
          // order matters first question mark means first value in the params array to be answered and the 2nd ? is for the 2nd value etc. you have to add a question mark each time you want to update a larger param or table.
          const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
          const params = [results.role_id, results.employee_id];

          db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err)
              return;
            }
            console.log("Updated employees's role")
            startMenu();
          });
        }
      )
    });
  });
}

function addDept() {
  inquirer.prompt(
    [{
      type: 'input',
      name: 'name',
      message: 'What is the name of the Department?',
    }]
  ).then(
    results => {
      console.log(results);
      const sql = `INSERT INTO department SET ?`;
      const params = results;

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err)
          return;
        }
        console.log('Added the Department to the database');
        startMenu();
      });
    }
  )
}

function addRole() {

  db.query(`SELECT * FROM department`, function (err, results) {
    const deptTitles = results.map(function (department) {
      return {
        name: department.name,
        value: department.id
      }

    })

    inquirer.prompt(
      [{
        type: 'input',
        name: 'title',
        message: 'What is the name of the role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Which department does the role belong to?',
        choices: deptTitles,
      }]
    ).then(
      results => {
        console.log(results);
        // order matters first question mark means first value in the params array to be answered and the 2nd ? is for the 2nd value etc. you have to add a question mark each time you want to update a larger param or table.
        const sql = `INSERT INTO role SET ?`;
        const params = results

        db.query(sql, params, (err, result) => {
          if (err) {
            console.log(err)
            return;
          }
          console.log('The Role has been updated within the database');
          startMenu();
        });
      }
    )
  });
}

startMenu();