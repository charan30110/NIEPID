const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const port = 4001

const loginRoutes = require('./routes/login.routes')
const adminRoutes = require('./routes/admin.routes')
const principleRoutes = require('./routes/principal.routes')
const teacherRoutes = require('./routes/teacher.routes')
const studentRoutes = require('./routes/student.routes')

const {verifyToken,isAdmin,isStudent,isTeacher,isPrinciple}=require('./middlewares/authorization')

app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/niepid")
    .then((res) => { console.log("connected successfully") })
    .catch((err) => { console.log(err) })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/login',loginRoutes)
app.use('/student',verifyToken,isStudent,studentRoutes)
app.use('/teacher',verifyToken,isTeacher,teacherRoutes)
app.use('/principle',verifyToken,isPrinciple,principleRoutes)
app.use('/admin',verifyToken,isAdmin,adminRoutes)

app.get('/', (req, res) => {
    res.status(200).send("hello page")
})

//server connection
app.listen(port, () => { console.log(`server is listening at port ${port}`) })