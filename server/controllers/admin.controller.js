const userModel = require('../models/user.model')
const teacherModel = require('../models/teacher.model')
const studentModel = require('../models/student.model')
const studentDetailsModel = require('../models/studentDetails.model')
const classModel = require('../models/class.model')

const path = require('path')

const downloadExcel = async (req, res) => {
    const file = await path.join(__dirname, '..', 'samplesheets', 'sampleDataTeacher.xlsx')
    res.download(file, (err) => {
        if (err) {
            res.status(404).send("File not found");
        }
    })
}

const registerBulkTeacher = async (req, res) => {

}

module.exports = {
    downloadExcel
}