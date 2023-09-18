INSERT INTO department (name)
VALUES ("Marketing"),
       ("IT"),
       ("Human Resources"),
       ("Accounting"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ('Executive', 95000,1),
       ('Analyst', 75000,2),
       ('Director', 80000,3),
       ('Auditor', 97000,4),
       ('Predictive Analyst', 85000,5),
       ('Commercial_Assistant', 75000,1),
       ('Team_Lead_II', 115000,2),
       ('Executive_Assistant', 100000,3),
       ('Supply_Chain_Accountant', 110000,4),
       ('Statistical_Operations_Analyst', 120000,5),
       ('Marketing_Manager', 105000,1),
       ('Cybersecurity_Manager', 145000,2),
       ('HR_Manager', 115000,3),
       ('Internal_Audit_Manager', 125000,4),
       ('Finance_Manager', 105000,5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('David', 'Park',1, NULL),
       ('Jane', '75000',2, NULL),
       ('Amber', 80000,3, NULL),
       ('Issac', 97000,4, NULL),
       ('Oscar ', 85000,5, NULL),
      --  ('Commercial_Assistant', 75000,6,NULL),
      --  ('Team_Lead_II', 115000,7, NULL),
      --  ('Executive_Assistant', 100000,8, NULL),
      --  ('Supply_Chain_Accountant', 110000,9, NULL),
      --  ('Statistical_Operations_Analyst', 120000,10, NULL),
       ('Marketing_Manager', 105000,1, 1);
      --  ('Cybersecurity_Manager', 145000,2),
      --  ('HR_Manager', 115000,3),
      --  ('Internal_Audit_Manager', 125000,4),
      --  ('Finance_Manager', 105000,5);
      
