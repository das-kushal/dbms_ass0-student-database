create database student_dept;

use student_dept;

show DATABASES;


-- list of departments (dept code and name), list of students (roll, dept code,
-- name, address and phone)


show tables;


CREATE TABLE Departments (
	dept_code char(20) PRIMARY KEY,
    name VARCHAR(50) not null
);


create table Students (
	roll INT PRIMARY KEY,
    dept_code char(20),
    name VARCHAR(50) not null,
    address VARCHAR(100),
    phone text,
    FOREIGN KEY(dept_code) REFERENCES Departments(dept_code) ON DELETE CASCADE
);

insert into Departments (dept_code,name) 
Values
('D_CSE','CSE'), 
('D_ETCE','ETCE'), 
('D_IT','IT');


-- D_CSE Kushal Das,Amit Das,Soumen Konar
-- D_ETCE Anshu Banerjee,Parth Khandelwal
-- D_IT Soumen Banerjee,Kunal Singh

insert into Students (roll,dept_code,name,address,phone)
values 
(10,'D_CSE','Kushal Das','Test Road','8737876429'),
(15,'D_CSE','Amit Das','Salt Lake 711302','9876552424'),
(42,'D_IT','Soumen Banerjee','To be Deleted','87239781987'),
(45,'D_ETCE','Anshu Banerjee','45/12 Andan Road','87239765487'),
(23,'D_CSE','Soumen Konar','Maharana Road, Delhi','87243281987'),
(89,'D_IT','Kunal Singh','66/6 Hash Road','98239781987'),
(09,'D_ETCE','Parth Khandelwal','98/45 Mango Road','875673781987');


drop table Students;
drop table Departments;