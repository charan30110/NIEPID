const express = require('express')
const multer = require('multer')
const routes = express.Router()
const { downloadExcel, registerBulkTeacher } = require('../controllers/admin.controller')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

routes.get('/downloadExcel', downloadExcel)
routes.post('/registerBulkTeacher', upload.single('file'), registerBulkTeacher)

module.exports = routes