INSERT INTO department (name)
VALUES ("Marketing"),
       ("IT"),
       ("Human Resources"),
       ("Accounting"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ('SEO Specialist', 70000,1),
       ('Copywriter', 85000,1),
       ('Marketing Specialist', 75000,1),
       ('Web Developer', 97000,2),
       ('Technical Support', 95000,2),
       ('Cyber Security Analyst', 125000,2),
       ('Recruiter', 75000,3),
       ('Executive Assistant', 60000,3),
       ('Benefits Coordinator', 80000,3),
       ('Internal Auditor', 120000,4),
       ('Cost Accountant', 105000,4),
       ('Supply Chain Cost Analyst', 85000,4),
       ('Predictive Analytics Analyst', 110000,5),
       ('Financial Analyst', 105000,5),
       ('Actuary', 135000,5);
       ('Marketing Director', 115000,1),
       ('IT Manager', 145000,2),
       ('HR Director', 100000,3),
       ('Accounting Manager', 155000,4),
       ('Finance Manager', 145000,5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('David', 'Johnson',1, NULL),
       ('Jane', 'Smith',2, NULL),
       ('Brian', 'St.Patrick',3, NULL),
       ('Issac', 'Lawson',4, NULL),
       ('Oscar ', 'Proud',5, NULL),
       ('Jasmine', 'Lewis',6, NULL),
       ('Daniel', 'Greene',7, NULL),
       ('Kelly', 'Prenny',8, NULL),
       ('Issa', 'Dees',9, NULL),
       ('Lawrence','Walker',10, NULL),
       ('Jeremy', 'Rhodes',11, NULL),
       ('Bianca', 'Neal',12, NULL),
       ('Sarah', 'Carter',13, NULL),
       ('Amber', 'Lee',14, NULL),
       ('Fran','Scott',15, NULL),
       ('Samantha','Jones',16, 1),
       ('Tyler', 'Peterson',17, 2),
       ('Dylan', 'Hayes',18, 3),
       ('Alexis', 'Greenwood',19, 4),
       ('Mark ','Wilks',20, 5),
      
      
