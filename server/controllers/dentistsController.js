const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const getAllDentists = async (req, res) => {
    const dentists = await prisma.dentist.findMany();
    if (!dentists) return res.status(204).json({ 'message': 'No dentist found.' });
    res.json(dentists);
}
const getDentist = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Dentist ID required.' });

    const dentist = await prisma.dentist.findOne({ _id: req.params.id }).exec();
    if (!dentist) {
        return res.status(204).json({ "message": `No dentist matches ID ${req.params.id}.` });
    }
    res.json(dentist);
}

const createNewDentist = async (req, res) => {
    // if (!req?.body?.firstname || !req?.body?.lastname) {
    //     return res.status(400).json({ 'message': 'First and last names are required' });
    // }

    try {
        const result = await prisma.dentist.create({
            data: {
                DentistSSN: req.body.DentistSSN,
                fName: req.body.fName,
                lName: req.body.lName,        
                birthDate: req.body.birthDate,     
                age: getAge(req.body.age),
                gender: req.body.gender,            
                city: req.body.city,              
                street: req.body.street,            
                phone: req.body.phone,             
                email: req.body.email,             
                specialization: req.body.specialization,    
                dentistProfile: req.body.dentistProfile, 
                workingDays: req.body.workingDays,      //(e.g., "Monday", "Tuesday", etc.).
                workingHours: req.body.workingHours,    //"9:00 AM - 1:00 PM", "2:00 PM - 6:00 PM", etc
                // yearsOfExperience: req.body.yearsOfExperience,
                visits: [],     
                procedures: [],       
                diagnosis: [],         
                prescription: []      
            }
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateDentist = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
}

const deleteDentist = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    const result = await employee.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getDentistPatients = async (req, res) => {
    const dentist = JSON.parse(req.query.dentist)
    console.log(dentist)
    // console.log(typeof(dentist))
    try {
      const visits = await prisma.visit.findMany({where: {dentistSsn:dentist.DentistSSN}, select: { patientId: true} })
    //   console.log(visits)
      const patientIds = [...new Set(visits.map(visit => visit.patientId))];
    //   console.log(patientIds)
      const patients = await prisma.patient.findMany({
        where: {
          patientID: {
            in: patientIds
          }
        }
      });

      if (patients.length === 0) {
        return res.status(400).json({ 'message': 'No patients found' });
    }

    // Fetch the last completed appointment for each patient
    for (let patient of patients) {
        const lastCompletedAppointment = await prisma.visit.findFirst({
            where: { 
                patientId: patient.patientID,
                status: 'Completed'
            },
            orderBy: [
                { date: 'desc' },
                { time: 'desc' }
            ],
            include: {
                Service: true
            }
        });

        // Add the service of the last completed appointment to the patient object
        patient.lastVisitServiceDone = lastCompletedAppointment ? lastCompletedAppointment.Service.ServiceName : null;

        // Format birthDate
        const birthDate = new Date(patient.birthDate);
        patient.birthDate = birthDate.toISOString().split('T')[0];
    }
        console.log(patients)

        res.json(patients);
        // console.log(patients)      
    //   if (!patients) return res.status(204).json({ 'message': 'No patient found.' });
    //   res.json(patients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch patients" });
    }
  } 

const getDentistAppointments = async (req, res) => {
    const dentist = JSON.parse(req.query.dentist)
    // console.log(dentist)
    // console.log(typeof(dentist))
    try {
        const appointments = await prisma.visit.findMany({ where: {dentistSsn: dentist.DentistSSN},
            include: {
                Reserve: {
                    select: {
                        fName: true,
                        lName: true,
                        email: true,
                        gender: true,
                        phone: true,
                    },
                },
                Sets: {
                    select: {
                        fName: true,
                        lName: true,
                    },
                },
                Service: {
                    select: {
                        ServiceName: true,
                    },
                },
            },
        });
    
        if (appointments.length === 0) {
            return res.status(400).json({ 'message': 'No appointments found' });
        }
    
        // Format the appointments data
        const formattedAppointments = appointments.map(appointment => ({
            ID: appointment.id,
            patientName: `${appointment.Reserve.fName} ${appointment.Reserve.lName}`,
            email: appointment.Reserve.email,
            // Gender: appointment.Reserve.gender,
            dateTime: `${new Date(appointment.date).toISOString().split('T')[0]}, ${appointment.time}`,
            // Time: appointment.time,
            mobile: appointment.Reserve.phone,
            // 'Doctor Name': `${appointment.Sets.fName} ${appointment.Sets.lName}`,
            disease: appointment.Service.ServiceName,
        }));

        console.log(formattedAppointments)
    
        res.json(formattedAppointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch patients" });
    }
  } 

const diagnoseAndPrescribe = async (req, res) => {
    const patientID = JSON.parse(req.query.patientID)
    const dentist = JSON.parse(req.query.dentist)
    const {treatmentType, treatmentEndDate, treatmentDescription, medicationName, dosageFreq, diagnosis, diagnoseDescription, affectedArea, Dosage} = req.body
    console.log(patientID)
    // console.log(dentist)
    console.log(new Date().toISOString())
    try {
        console.log("here")
    // Create fake diagnoses
      const diagnose = await prisma.diagnosis.create({
        data: {
          AffectedArea: affectedArea,
          diagnosis: diagnosis,
          Description: diagnoseDescription,
          diagnosedDate: new Date().toISOString(),
          patientId: 5,
          DentistSsn: dentist.DentistSSN,

        //   MedicalConditions: { connect: { patientID: patientID } },
        //   Diagnose: { connect: { DentistSSN: dentist.DentistSSN } },
        },
      });


    // Create fake treatments
      const treatment = await prisma.treatment.create({
        data: {
          TreatmentType: treatmentType,
          Description: treatmentDescription,
        //   Cost: 500,
          StartDate: new Date(),
          EndDate: (new Date(treatmentEndDate)),
          Status: 'Ongoing',
          patientId: 5,
          dentistSsn: dentist.DentistSSN,
          diagnosisId: 20,
          Medications: {
            create: [
              {
                name: medicationName,
                dosage: Dosage.split(" ")[0],
                DosageUnit: Dosage.split(" ")[1],
                frequency: dosageFreq,
              },
            ],
          },
        //   TreatmentPlans: { connect: { patientID: 5 } },
        //   prescribe: { connect: { DentistSSN: dentist.DentistSSN} },
        //   diagnosis: { connect: { DiagnosisID:20} },
        },
        include: {
          Medications: true,
        },
      });

    //     console.log(formattedAppointments)
    
        res.json(true);
    } catch (error) {
        res.status(500).json({ error: "Failed to create diagnosis and treatment", details: error.message });
    //   res.status(500).json({ error: "Failed to fetch patients" });
    }
  } 

module.exports = {
    getAllDentists,
    getDentist,
    createNewDentist,
    deleteDentist,
    updateDentist,
    getDentistPatients,
    getDentistAppointments,
    diagnoseAndPrescribe
}