INSERT INTO department (name)
VALUES
    ('Design'),
    ('Art'),
    ('Production');
    ('Programming'),
    ('Marketing'),
    ('Distribution'),
    ('Legal'),
    ('Management');


 INSERT INTO role (title, salary, department_id)
 VALUES
    ('Manager', 120000, 7),
    ('Programmer', 72000, 8),
    ('Developer', 90000, 3),
    ('Video Game Designer', 62000, 1),
    ('Social Media Director', 61000, 5),
    ('Artist', 50000, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Alpert','Claudia', 1, 1),
    ('Mistofolees', 'Andre', 2, NULL),
    ('Lawrence', 'Bobby', 1, NULL);