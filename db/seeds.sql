use employee_trackerDB;

INSERT INTO department (department_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal"), ("Administration");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 150000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 200000, 2),
("Software Engineer", 150000, 2),
("Account Manager", 125000, 3),
("Accountant", 150000, 3),
("Lawyer", 250000, 4),
("Paralegal", 125000, 4),
("Office Manager", 150000, 5),
("Secretary", 90000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Barney", "Stinson", 1, 3),
("Ted", "Mosby", 2, 1),
("Marshall", "Eriksen", 3, 6),
("Lily", "Aldrin", 5, 7),
("Robin", "Scherbatsky", 4, null);

