const userModel = require('../models/user.model')
const teacherModel = require('../models/teacher.model')
const studentModel = require('../models/student.model')
const studentDetailsModel = require('../models/studentDetails.model')
const classModel = require('../models/class.model')

const path = require('path')
const xlsx = require('xlsx')
const { json } = require('express')

const downloadExcel = async (req, res) => {
    const file = await path.join(__dirname, '..', 'samplesheets', 'sampleDataTeacher.xlsx')
    res.download(file, (err) => {
        if (err) {
            res.status(404).send("File not found");
        }
    })
}

const registerBulkTeacher = async (req, res) => {
    try {
        const data = req.file.buffer
        const workbook = xlsx.read(data, { type: 'buffer' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const headers = ['teacherId', 'teacherName', 'teacherMNo', 'email', 'classId'];

        let jsonData = xlsx.utils.sheet_to_json(worksheet, {
            header: headers,
            range: 0,
            defval: ''
        });
        jsonData = jsonData.slice(1)
        let dataRows = jsonData.length
        let uploaded = 0
        let arr = []

        const mobileRegex = /[0-9]{10}$/
        const emailRegex = /^[A-Za-z0-9._-]+@gmail\.com$/

        for (const row in jsonData) {
            const teacher = {
                teacherId: jsonData[row].teacherId,
                teacherName: jsonData[row].teacherName,
                teacherMNo: String(jsonData[row].teacherMNo),
                email: jsonData[row].email,
                classId: jsonData[row].classId.split(',').map(val => val.trim())
            }

            if (!teacher.teacherId || !teacher.teacherName || !teacher.teacherMNo || !teacher.email || !teacher.classId) {
                // console.log(`1 => ${teacher.teacherId} - ${teacher.teacherName} - ${teacher.teacherMNo} - ${teacher.email} - ${teacher.classId}`)
                arr.push(0)
                continue
            } else if (!teacher.teacherId.trim() || !teacher.teacherName.trim() || !teacher.teacherMNo.trim() || !teacher.email.trim() || !teacher.classId.length) {
                // console.log(`2 => ${teacher.teacherId} - ${teacher.teacherName} - ${teacher.teacherMNo} - ${teacher.email} - ${teacher.classId}`)
                arr.push(0)
                continue
            } else if (!mobileRegex.test(teacher.teacherMNo.trim())) {
                // console.log(`3 => ${teacher.teacherMNo}`)
                arr.push(0)
                continue
            } else if (!emailRegex.test(teacher.email.trim())) {
                // console.log(`4 => ${teacher.email}`)
                arr.push(0)
                continue
            }

            const isUser = await userModel.findOne({ 'id': teacher.teacherId })
            if (isUser) {
                // console.log(`User already exists \n ${teacher}`)
                arr.push(0)
                continue
            } else {
                let err = 0
                for (const cls of teacher.classId) {
                    const isClass = await classModel.findOne({ 'classId': cls })
                    if (!['preprimary-1', 'preprimary-2', 'preprimary-3', 'primary1-1', 'primary1-2', 'primary1-3', 'primary2-1', 'primary2-2', 'primary2-3'].includes(cls)) {
                        err = 1
                        break
                    }
                    else if (isClass) {
                        err = 1
                        break
                    }
                }
                if (err) {
                    // console.log(`Class already exists \n ${teacher}`)
                    arr.push(0)
                    continue
                } else {
                    const isTeacher = await teacherModel.findOne({ 'teacherId': teacher.teacherId })
                    if (isTeacher) {
                        // console.log(`Teacher already exists \n ${teacher}`)
                        arr.push(0)
                        continue
                    }
                }
            }
            arr.push(1)
        }

        for (const row in jsonData) {
            if (arr[row]) {
                const teacher = {
                    teacherId: jsonData[row].teacherId,
                    teacherName: jsonData[row].teacherName,
                    teacherMNo: String(jsonData[row].teacherMNo),
                    email: jsonData[row].email,
                    classId: jsonData[row].classId.split(',').map(val => val.trim())
                }
                const user = {
                    id: teacher.teacherId,
                    password: teacher.teacherId,
                    role: 'teacher'
                }
                await userModel.create(user)
                await teacherModel.create(teacher)
                for (const cls of teacher.classId) {
                    const demoClass = {
                        classId: cls,
                        teacherId: teacher.teacherId,
                        section: cls.split('-')[0],
                        year: cls.split('-')[1],
                        student: []
                    };
                    await classModel.create(demoClass)
                }
                uploaded++;
            }
        }
        res.status(200).json({ noOfRows: dataRows, uploaded: uploaded, data: "Upload Successfull" })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error reading File' + error)
    }
}

module.exports = {
    downloadExcel,
    registerBulkTeacher
}