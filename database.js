import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()



export const getAllStudents = async () => {
    const [rows] = await pool.query(`
    select *
    from students
    `)
    return rows
}

export const getStudentByRoll = async (roll) => {
    const [rows] = await pool.query(`
    select *
    from students
    where roll = ?
    `, [roll])
    return rows
}



export const createStudent = async (roll, dept_code, name, address, phone) => {
    const [result] = await pool.query(`
    insert into students (roll,dept_code,name,address,phone)
    values (?,?,?,?,?)
    `, [roll, dept_code, name, address, phone])
    return result
}

export const updateStudent = async (roll, dept_code, name, address, phone) => {
    const [result] = await pool.query(`
    update students
    set dept_code = ?,
    name = ?,
    address = ?,
    phone = ?
    where roll = ?
    `, [dept_code, name, address, phone, roll])
    return result
}


export const deleteStudent = async (roll) => {
    const [result] = await pool.query(`
    delete from students
    where roll = ?
    `, [roll])
    return result
}





export const getDepartments = async () => {
    const [rows] = await pool.query(`
    select * 
    from departments
    `)
    return rows
}

export const getDepartment = async (id) => {
    const [row] = await pool.query(`
    select * 
    from departments
     where dept_code= ?  
    `, [id]) // to prevent the sql injection
    return row
}


export const createDepartment = async (dept_code, name) => {
    const [result] = await pool.query(`
    insert into departments (dept_code,name)
    values (?,?)
    `, [dept_code, name])
    return result
}
