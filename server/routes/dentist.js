const express = require('express');
const dentistController = require('../controllers/dentistsController');
const router = express.Router();

// router.get("/", (req, res) => {
//     res.json("hello world")
// })

// router.get('/getPatients', dentistController.getDentistPatients)
router.route('/patients')
    .get(dentistController.getDentistPatients)

router.route('/appointments')
    .get(dentistController.getDentistAppointments)

router.route('/diagnose')
    .post(dentistController.diagnoseAndPrescribe)


module.exports = router;