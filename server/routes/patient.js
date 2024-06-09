const express = require('express');
const patientsController = require('../controllers/patientsController');
const router = express.Router();

// router.get("/", (req, res) => {
//     res.json("hello world")
// })

router.post('/bookAppointment', patientsController.bookAppointment);
router.get('/bookAppointment', patientsController.bookAppointmentDentistsOptions);
router.get('/editAppointment', patientsController.bookAppointmentDentistsOptions);
router.post('/editAppointment', patientsController.editAppointments);
router.get('/appointments', patientsController.getAppointments);
router.delete('/appointments/cancelAppointment/:id', patientsController.cancelAppointment)
router.delete('/appointments/deleteAppointment/:id', patientsController.deleteAppointment)

router.get('/records', patientsController.getMedicalRecords)
router.get('/prescriptions', patientsController.getPrescriptions)
router.get('/invoices', patientsController.getInvoices)

router.patch('/patientSettings/:patientId', patientsController.updatePatient)
router.get('/profileSettings', patientsController.getPatientProfile)

router.post('/exportReports', patientsController.exportReports)

module.exports = router