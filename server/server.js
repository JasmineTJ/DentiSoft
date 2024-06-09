const express = require('express')
const app = express()
const cors = require('cors');
const bcrypt = require("bcrypt")
const PORT = 3001
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

// Function to create Dentist records
async function createDentists() {
  try {
    // Create Dentist records
    await prisma.dentist.createMany({
      data: [
        {
          DentistSSN: "1",
          fName: "Jon",
          lName: "Snow",
          birthDate: new Date("1989-03-15"),
          age: 35,
          gender: "Male",
          address: "Winterfell, Castle Black",
          phone: "(665)121-5454",
          email: "jonsnow@gmail.com",
          specialization: "General Dentistry",
          // workingHours: "9am - 5pm",
          yearsOfExperience: 10,
        },
        {
          DentistSSN: "2",
          fName: "Cersei",
          lName: "Lannister",
          birthDate: new Date("1982-07-03"),
          age: 42,
          gender: "Female",
          address: "King's Landing, Red Keep",
          phone: "(421)314-2288",
          email: "cerseilannister@gmail.com",
          specialization: "Orthodontics",
          // workingHours: "8am - 4pm",
          yearsOfExperience: 20,
        },
        // Add other Dentist records...
      ],
    });
    console.log('Dentist records created successfully.');
  } catch (error) {
    console.error('Error creating Dentist records:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}

// Call the function to create Dentist records
// createDentists();


async function createPatients() {
  try {
    // Patient data
    const patients = [
      {
        PatientSSN: '123456789',
        fName: 'John',
        lName: 'Doe',
        birthDate: new Date('1990-05-25'),
        age: 31,
        gender: 'Male',
        address: 'New York 123 Main St',
        phone: '(123) 456-7890',
        email: 'john.doe@gmail.com',
        bloodGroup: "O+",
        Smoker: true,
        alcoholIntake: false,
      },
      {
        PatientSSN: '987654321',
        fName: 'Jane',
        lName: 'Smith',
        birthDate: new Date('1985-10-12'),
        age: 36,
        gender: 'Female',
        address: 'Los Angeles 456 Elm St',
        phone: '(987) 654-3210',
        email: 'jane.smith@gmail.com',
        bloodGroup: "A+",
        Smoker: false,
        alcoholIntake: true,
      },
      {
        PatientSSN: '456123789',
        fName: 'Michael',
        lName: 'Johnson',
        birthDate: new Date('1978-07-30'),
        age: 43,
        gender: 'Male',
        address: 'Chicago 789 Oak St',
        phone: '(456) 123-7890',
        email: 'michael.johnson@gmail.com',
        bloodGroup: "AB+",
        Smoker: false,
        alcoholIntake: false,
      },
      {
        PatientSSN: '789123456',
        fName: 'Emily',
        lName: 'Williams',
        birthDate: new Date('1995-03-15'),
        age: 27,
        gender: 'Female',
        address: 'Houston 101 Pine St',
        phone: '(789) 123-4560',
        email: 'emily.williams@gmail.com',
        bloodGroup: "B-",
        Smoker: true,
        alcoholIntake: true,
      },
      {
        PatientSSN: '654987321',
        fName: 'David',
        lName: 'Brown',
        birthDate: new Date('1980-12-05'),
        age: 41,
        gender: 'Male',
        address: 'Miami 202 Cedar St',
        phone: '(654) 987-3210',
        email: 'david.brown@gmail.com',
        bloodGroup: "A-",
        Smoker: true,
        alcoholIntake: true,
      },
    ];

    // Create the patients
    for (const patient of patients) {
      await prisma.patient.create({
        data: patient,
      });
    }

    console.log('Patients created successfully');
  } catch (error) {
    console.error('Error creating patients:', error);
  } finally {
    await prisma.$disconnect();
  }
}
// createPatients(); 

async function createProfileLoginsForPatients() {
    try {
      // Get all patients
      const patients = await prisma.patient.findMany();
  
      // Filter patients that don't have profile logins
      const patientsWithoutProfileLogins = patients.filter(patient => !patient.profileLogin);
  
      // Create profile logins for patients without them
      for (const patient of patientsWithoutProfileLogins) {
        const hashedPassword = await bcrypt.hash("password" + patient.patientID, 10);
        await prisma.profileLogin.create({
          data: {
            username: `${patient.fName.toLowerCase()}_${patient.lName.toLowerCase()}`,
            password: hashedPassword,
            userType: 'patient',
            patientId: patient.patientID,
          },
        });
      }
  
      console.log('Profile logins created for patients without them');
    } catch (error) {
      console.error('Error creating profile logins:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  // createProfileLoginsForPatients();

// const lastCreatedPatient = await prisma.patient.findFirst({
//     orderBy: { patientID: 'desc' } // Order by patientID in descending order
//   });
// const result = prisma.patient.delete({patientID: 6})
// Find the last created patient
async function lastCreatedPatient(){
    const patient = await prisma.patient.findFirst({
    orderBy: { patientID: 'desc' } // Order by patientID in descending order to get the last created patient
  });
  
  if (patient) {
    // Delete the last created patient
    await prisma.patient.delete({
      where: {
        patientID: patient.patientID // Delete patient based on their patientID
      }
    });
    console.log("Last created patient deleted successfully.");
  } else {
    console.log("No patients found to delete.");
  }}
  
// lastCreatedPatient()
async function deletePatientProfile(){
const loginIDToDelete = 5;

// Find the profile with the specified loginID
const profileToDelete = await prisma.profileLogin.findFirst({
  where: {
    LoginId: loginIDToDelete
  }
});

if (profileToDelete) {
  // Delete the profile
  await prisma.profileLogin.delete({
    where: {
        LoginId: profileToDelete.LoginId
    }
  });
  console.log(`Profile with login ID ${loginIDToDelete} has been deleted successfully.`);
} else {
  console.log(`No profile found with login ID ${loginIDToDelete}.`);
}}
// deletePatientProfile()

async function main() {

  // Create two diagnoses for each patient
  // await prisma.diagnosis.createMany({
  //   data: [
  //     { patientId: 1, AffectedArea: 'Maxillary Anterior', diagnosis: 'Dental Caries', Description: 'Description of diagnosis 1', DentistSsn: "123776789" },
  //     { patientId: 2, AffectedArea: 'Mandibular Molars', diagnosis: 'Gingivitis', Description: 'Description of diagnosis 2', DentistSsn: "234567890" },
  //     { patientId: 3, AffectedArea: 'Right Premolars', diagnosis: 'Periodontitis', Description: 'Description of diagnosis 3', DentistSsn: "345678901" },
  //     { patientId: 4, AffectedArea: 'Left Canines', diagnosis: 'Malocclusion', Description: 'Description of diagnosis 4', DentistSsn: "456789012" }
  //   ]
  // });

  // Create two treatments for each patient
  // await prisma.treatment.createMany({
  //   data: [
  //     { patientId: 1, TreatmentType: 'Fillings', Description: 'Description of treatment 1', Cost: 100.00, StartDate: new Date(), EndDate: new Date(), Status: "Ongoing", DentistSsn: "123776789", diagnosisId: 5},
  //     { patientId: 2, TreatmentType: 'Extractions', Description: 'Description of treatment 2', Cost: 150.00, StartDate: new Date(), EndDate: new Date(), Status: "Ongoing", DentistSsn: "234567890", diagnosisId: 6 },
  //     { patientId: 3, TreatmentType: 'Cleanings', Description: 'Description of treatment 3', Cost: 80.00, StartDate: new Date(), EndDate: new Date(), Status: "Ongoing", DentistSsn: "345678901", diagnosisId: 7 },
  //     { patientId: 4, TreatmentType: 'Orthodontics', Description: 'Description of treatment 4', Cost: 2000.00, StartDate: new Date(), EndDate: new Date(), Status: "Ongoing", DentistSsn: "456789012", diagnosisId: 8 }
  //   ]
  // });

  // Create two medications for each treatment
  await prisma.medications.createMany({
    data: [
      { TreatmentId: 5, name: 'Medication 1', dosage: 1.5, DosageUnit: 'ml', frequency: '3 times a day' },
      { TreatmentId: 6, name: 'Medication 2', dosage: 100, DosageUnit: 'mg', frequency: 'Once daily' },
      { TreatmentId: 7, name: 'Medication 3', dosage: 2, DosageUnit: 'pills', frequency: '2 times a day' },
      { TreatmentId: 8, name: 'Medication 4', dosage: 50, DosageUnit: 'mg', frequency: 'As needed' }
    ]
  });

  // Create two imaging results for each patient
  await prisma.imagingResults.createMany({
    data: [
      { patientId: 1, date: new Date(), type: 'Periapical', imageUrl: '../../assts/x-ray/img1.jpeg', DentistComments: 'Comments on imaging result 1', DiagnosisId: 5 },
      { patientId: 2, date: new Date(), type: 'Bitewing', imageUrl: '../../assts/x-ray/img2.jpeg', DentistComments: 'Comments on imaging result 2', DiagnosisId: 6 },
      { patientId: 3, date: new Date(), type: 'CBCT', imageUrl: '../../assts/x-ray/img3.jpeg', DentistComments: 'Comments on imaging result 3', DiagnosisId: 7 },
      { patientId: 4, date: new Date(), type: 'Panoramic', imageUrl: '../../assts/x-ray/img4.jpeg', DentistComments: 'Comments on imaging result 4', DiagnosisId: 8 }
    ]
  });
}

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

async function createDentists() {
  // Create 5 fake dentists
  await prisma.dentist.createMany({
    data: [
      {
        DentistSSN: '123776789',
        fName: 'Jon',
        lName: 'Snow',
        birthDate: new Date('1980-01-01'),
        age: 42,
        gender: 'Male',
        address: '123 Main St, City, Country',
        phone: '+1234567890',
        email: 'jon.snow@example.com',
        specialization: 'General Dentistry',
        degree:" ",
        yearsOfExperience: 10,
        personalImageURL: 'doctor_1.jpg'
      },
      {
        DentistSSN: '234567890',
        fName: 'Alice',
        lName: 'Smith',
        birthDate: new Date('1985-05-15'),
        age: 37,
        gender: 'Female',
        address: '456 Elm St, City, Country',
        phone: '+1987654321',
        email: 'alice.smith@example.com',
        specialization: 'Orthodontics',
        degree:" ",
        yearsOfExperience: 8,
        personalImageURL: 'doctor_4.jpg'
      },
      // Add more dentists here
      {
        DentistSSN: '345678901',
        fName: 'Michael',
        lName: 'Johnson',
        birthDate: new Date('1976-11-30'),
        age: 45,
        gender: 'Male',
        address: '789 Oak St, City, Country',
        phone: '+1122334455',
        email: 'michael.johnson@example.com',
        specialization: 'Pediatric Dentistry',
        degree:" ",
        yearsOfExperience: 15,
        personalImageURL: 'doctor_2.jpg'
      },
      {
        DentistSSN: '456789012',
        fName: 'Emily',
        lName: 'Brown',
        birthDate: new Date('1990-07-20'),
        age: 31,
        gender: 'Female',
        address: '321 Pine St, City, Country',
        phone: '+9876543210',
        email: 'emily.brown@example.com',
        specialization: 'Endodontics',
        degree:" ",
        yearsOfExperience: 6,
        personalImageURL: 'doctor_3.jpg'
      },
      {
        DentistSSN: '567890123',
        fName: 'David',
        lName: 'Lee',
        birthDate: new Date('1988-03-25'),
        age: 34,
        gender: 'Male',
        address: '987 Cedar St, City, Country',
        phone: '+1357924680',
        email: 'david.lee@example.com',
        specialization: 'Oral Surgery',
        degree:" ",
        yearsOfExperience: 12,
        personalImageURL: 'doctor_5.jpg'
      },
    ]
  });
}

// createDentists()

//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

async function mainw() {
  const workingHoursData = [
    { DentistSsn: '567890123', shift: '9am - 5pm' },
    { DentistSsn: '456789012', shift: '8am - 4pm' },
    { DentistSsn: '345678901', shift: '10am - 6pm' },
    { DentistSsn: '234567890', shift: '9am - 5pm' },
    { DentistSsn: '123776789', shift: '8am - 4pm' },
  ];

  for (const workingHour of workingHoursData) {
    await prisma.dentistWorkingHours.create({
      data: workingHour,
    });
  }
}

// mainw()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

async function createFakeData() {
  try {
    // Create fake diagnoses
    const diagnoses = [];
    // // for (let i = 0; i < 2; i++) {
      const diagnosis = await prisma.diagnosis.create({
        data: {
          AffectedArea: 'Maxillary Anterior',
          diagnosis: 'Dental Caries (Cavity)',
          Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          diagnosedDate: new Date(),
          MedicalConditions: { connect: { patientID: (3) } },
          Diagnose: { connect: { DentistSSN: "345678901" } },
        },
      });
      diagnoses.push(diagnosis);
    // }

    // Create fake treatments
    const treatments = [];
    // for (let i = 0; i < 2; i++) {
      const treatment = await prisma.treatment.create({
        data: {
          TreatmentType: 'Fillings',
          Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          Cost: 500,
          StartDate: new Date(2022, 10, 1),
          EndDate: new Date(2022, 10, 15),
          Status: 'Completed',
          Medications: {
            create: [
              {
                name: 'Medication1',
                dosage: 10,
                DosageUnit: 'ml',
                frequency: '3 times a day',
              },
            ],
          },
          TreatmentPlans: { connect: { patientID: (1) } },
          prescribe: { connect: { DentistSSN: "123456789" } },
          diagnosis: { connect: { DiagnosisID: 1 } },
        },
        include: {
          Medications: true,
        },
      });
      treatments.push(treatment);
    // }

    console.log('Fake data created successfully!');
  } catch (error) {
    console.error('Error creating fake data:', error);
  } finally {
    await prisma.$disconnect();
  }
}
// createFakeData();
async function deletetreat() {await prisma.medications.deleteMany(); await prisma.treatment.deleteMany();}
async function deleteDent() {await prisma.dentist.delete({where: {DentistSSN:'12345678988'}})}
// deleteDent()
// async function deletetreat() {await prisma.treatment.deleteMany()}

// deletetreat()
async function createServices(){
  try {
      await prisma.servicesProvided.createMany({data: [{ServiceId: 1,ServiceName: "Examination", ServiceCost: 600.0}, {ServiceId: 2, ServiceName: "Consultation", ServiceCost: 500.0}, {ServiceId: 3,ServiceName: "Surgery", ServiceCost: 1000.0}]})

    console.log('Service created successfully!');
  } catch (error) {
    console.error('Error creating fake data:', error);
  } finally {
    await prisma.$disconnect();
  }
}
// createServices()

async function main() {
  await prisma.allergies.createMany({
    data: [
      { allergySource: 'Peanuts', patientId: 1 },
      // { allergySource: 'Dust', patientId: 1 },
      // { allergySource: 'Penicillin', patientId: 1 },
    ],
  });

  await prisma.chronicDisease.createMany({
    data: [
      { disease: 'Diabetes', patientId: 1 },
      // { disease: 'Hypertension', patientId: 1 },
      // { disease: 'Asthma', patientId: 1 },
    ],
  });
}

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// async function createVisit() {
//   const newVisit = await prisma.visit.create({
//     data: {
//       date: new Date(),
//       time: "11:00",
//       status: "Completed",
//       patientId: 1,
//       dentistSsn: "123776789",
//       serviceId: 1,
//       diagnosisId: 5
//     }
//   });

//   console.log(newVisit);
// }

// createVisit()
//   .catch(e => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

async function deleteVisit() {
  const newMedication = await prisma.visit.delete({where: {id:4}
  });

  console.log(newMedication);
}
// deleteVisit()
async function createMedication() {
  const newMedication = await prisma.medications.create({
    data: {
      name: "Medication 1",
      dosage: 2.5,
      DosageUnit: "ml",
      frequency: "3 times a day",
      TreatmentId: 5
    }
  });

  console.log(newMedication);
}

async function createDentistsProfiles() {await prisma.profileLogin.createMany({
  data: [
    {
      username: 'jon_snow',
      password: await bcrypt.hash('password1', 10), // hashed password
      userType: 'doctor',
      dentistSsn: '123776789'
    },
    {
      username: 'alice',
      password: await bcrypt.hash('password1', 10), // hashed password
      userType: 'doctor',
      dentistSsn: '234567890'
    },
    {
      username: 'michael',
      password: await bcrypt.hash('password1', 10), // hashed password
      userType: 'doctor',
      dentistSsn: '345678901'
    },
  ]
})}
// createDentistsProfiles()

// createMedication()
//   .catch(e => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

async function createProfileLoginsForEmployees() {
  try {
    // Get all employees
    const employees = await prisma.employee.findMany();

    // Filter employees that don't have profile logins
    const employeesWithoutProfileLogins = employees.filter(employee => !employee.profileLogin);

    // Create profile logins for employees without them
    for (const employee of employeesWithoutProfileLogins) {
      const hashedPassword = await bcrypt.hash("password2", 10);
      await prisma.profileLogin.create({
        data: {
          username: `${employee.fName.toLowerCase()}_${employee.lName.toLowerCase()}`,
          password: hashedPassword,
          userType: 'admin',
          employeeSsn: employee.EmployeeSSN,
        },
      });
    }

    console.log('Profile logins created for employees without them');
  } catch (error) {
    console.error('Error creating profile logins:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Example usage
// createProfileLoginsForEmployees();


app.use(cors())
app.use(express.json());

app.use('/login', require('./routes/login'));
app.use('/login/register', require('./routes/register'));
app.use('/login/register/patient', require('./routes/register'));

app.use('/login/patient', require('./routes/patient' ))

app.use('/login/patient/bookAppointment', require('./routes/patient'))
app.use('/login/patient/editAppointment', require('./routes/patient'))
app.use('/login/patient/appointments', require('./routes/patient'))
app.use('/login/patient/appointments/cancelAppointment', require('./routes/patient'))
app.use('/login/patient/appointments/deleteAppointment', require('./routes/patient'))

app.use('/login/patient/records', require('./routes/patient'))

app.use('/login/patient/prescriptions', require('./routes/patient'))

app.use('/login/patient/invoices', require('./routes/patient'))

app.use('/login/patient/exportReports', require('./routes/patient'))

app.use('/login/patient/patientSettings', require('./routes/patient'))
// app.use('/login/patient/profileSettings', require('./routes/patient'))

app.use('/admin', require('./routes/admin'));

app.use('/dentist', require('./routes/dentist'))
// app.use('/login/dentist/getPatients', require('./routes/dentist' ))
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

app.listen(PORT)