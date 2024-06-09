const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patientsController')

router.post('/', patientController.registerNewPatient)
router.post('/patient', patientController.createNewPatientRegistered)


module.exports = router