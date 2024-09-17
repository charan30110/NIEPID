const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/")
    .then((res) => { console.log("connected successfully") })
    .catch((err) => { console.log(err) })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).send("hello page")
})

//server connection
app.listen(4000, () => { console.log(`server is listening at port 4000`) })