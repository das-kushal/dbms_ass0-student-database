import express from "express";
import bodyParser from "body-parser";
import { getAllStudents, getStudentByRoll, createStudent, getDepartments, updateStudent, deleteStudent } from "./database.js";
const app = express();


app.set('view engine', 'ejs');
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


/* HOME SECTION */

app.get('/', (req, res) => { res.render('index') });

/* SEARCH SECTION */

let searchStudents = []

app.get('/search', (req, res) => {
    res.render('search');
})

app.post('/search', async (req, res) => {
    const studentRoll = req.body.roll;
    console.log(studentRoll);
    searchStudents = await getStudentByRoll(studentRoll);
    if (JSON.stringify(searchStudents) === '[]') {
        console.log('Not found');
        res.send("<h1 style='color: rgba(0, 0, 0, .6); display: flex;\
         width: 100vw; height: 100vh; justify-content: center;\
          align-items: center;'>No Student Found!!</h1>"
        )
    }
    else {
        res.render('studentFound', { searchStudents });
    }
});

/* SEARCH SECTION END */

/* UPDATE SECTION */
app.get('/search/update', (req, res) => {
    console.log(searchStudents);
    res.render('update', { searchStudents })
})

app.post("/search/update", async (req, res) => {
    const oldName = searchStudents[0].name
    const oldAddress = searchStudents[0].address
    const oldDepart = searchStudents[0].dept_code
    const oldPhone = searchStudents[0].phone
    const roll = searchStudents[0].roll
    console.log('Old', oldName, oldDepart, oldAddress, oldPhone);
    let { name, dept_code, address, phone } = req.body
    console.log('New data', name, dept_code, address, phone);
    if (name === '') name = oldName
    if (dept_code === '') dept_code = oldDepart
    if (address === '') address = oldAddress
    if (phone === '') phone = oldPhone
    console.log('New data', name, dept_code, address, phone);
    const updatedEntry = await updateStudent(roll, dept_code, name, address, phone)
    res.send('<h1 style="color:rgba(0,0,0,.6);display:flex;\
            width:100vw;height:100vh;justify-content:center;\
            align-items:center;">Student Updated SuccessFully!!</h1>'
    )

})

/* UPDATE SECTION END */

/* DELETE SECTION */

app.get('/search/delete', async (req, res) => {
    const delStudent = await deleteStudent(searchStudents[0].roll)
    res.status(201).send(
        `<h3 style="color:rgba(0,0,0,.6);display:flex;\
            width:100vw;height:100vh;justify-content:center;\
            align-items:center;">Student ${JSON.stringify(searchStudents[0])} is deleted successfully!! </h3>`
    )
})

/* DELETE SECTION END */

/* ADD SECTION */
app.get("/add", async (req, res) => {
    const depts = await getDepartments();
    res.render('add', { depts })
})

app.post('/add', async (req, res) => {
    const data = req.body;
    const { name, roll, address, phone, dept_code } = req.body;
    console.log(data);

    const student = await getStudentByRoll(roll);
    if (JSON.stringify(student) === '[]') {
        const newStudent = await createStudent(roll, dept_code, name, address, phone)
        console.log(newStudent);
        res.status(201).send('<h1 style="color:rgba(0,0,0,.6);display:flex;\
            width:100vw;height:100vh;justify-content:center;\
            align-items:center;">New Student Added!!</h1>')
    } else {
        res.status(201).send(
            '<h1 style="color:rgba(0,0,0,.6);display:flex;\
            width:100vw;height:100vh;justify-content:center;\
            align-items:center;">Roll Number is Duplicate!!</h1>'
        )
    }
})

/* ADD SECTION END */

/* ALL STUDENTS SECTION */
app.get('/allstudents', async (req, res) => {
    const students = await getAllStudents();
    res.render('allstudents', { students: students });
})


/* ALL STUDENTS SECTION END */



// err handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something broke!');
})

app.listen(3000, () => console.log('App is listening on port 3000'));
