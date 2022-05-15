const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Kiky0!@#",
  database: "employee_trackerDB"
});

connection.connect(function (err) {
  if (err) throw err;
  mainMenu();
});

function mainMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "mainMenu",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "View all Departments",
        "View all Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Exit"
      ]
    })

    .then(function (answer) {
      switch (answer.mainMenu) {
        case "View all Employees":
          viewAllEmployees();
          break;

        case "View all Departments":
          viewAllDepts();
          break;

        case "View all Roles":
          viewAllRoles();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Department":
          addDept();
          break;

        case "Add Role":
          addRole();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function viewAllEmployees() {
  var query = "Select employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
  connection.query(query, function (err, res) {
    console.table(res);
    mainMenu();
  });
}

function viewAllDepts() {
  var query = "Select * FROM department"
  connection.query(query, function (err, res) {
    console.table(res);
    mainMenu();
  });
}

function viewAllRoles() {
  var query = "Select * FROM role"
  connection.query(query, function (err, res) {
    console.table(res);
    mainMenu();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's first name",
        name: "firstName"
      },
      {
        type: "input",
        message: "Enter the employee's last name",
        name: "lastName"
      },
      {
        type: "input",
        message: "Enter the employee's role id",
        name: "addEmployeeRoleID"
      },
      {
        type: "input",
        message: "Enter the employee's manager id",
        name: "addEmployeeManagerID"
      },
    ])

    .then(function (res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const employeeRoleID = res.addEmployeeRole;
      const employeeManagerID = res.addEmployeeManager;
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employeeRoleID}", "${employeeManagerID})`;
      connection.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        mainMenu();
      });
    });
}

function addDept() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter the name of the new department",
      name: "newDept"
    })

    .then(function (res) {
      const newDepartment = res.newDept;
      const query = `INSERT INTO department (department_name) VALUES ("${newDepartment})`;
      connection.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        mainMenu();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's title",
        name: "roleTitle"
      },
      {
        type: "input",
        message: "Enter the employee's salary",
        name: "roleSalary"
      },
      {
        type: "input",
        message: "Enter the employee's department id",
        name: "roleDept"
      },
    ])

    .then(function (res) {
      const title = res.roleTitle;
      const salary = res.roleSalary;
      const departmentID = res.roleDept;
      const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
      connection.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        mainMenu();
      });
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([{
      type: "input",
      message: "Enter the employee's id you want to update",
      name: "updateEmployeeID"
    },
    {
      type: "input",
      message: "Enter the employee's new role id",
      name: "new role"
    },
    ])

    .then(function (res) {
      const updateEmployeeRole = res.updateEmployeeRole;
      const newRole = res.newRole;
      const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmployeeRole}"`;
      connection.query(queryUpdate, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        mainMenu();
      });
    });
}