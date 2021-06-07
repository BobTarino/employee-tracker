DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role; 
DROP TABLE IF EXISTS employee;


CREATE TABLE manager (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES manager(id)
);