const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/login');

const prisma = new PrismaClient()

const handleLogin = async (req, res) => {
    // console.log("logged in")
    const {data, person} = req.body
    const { userName, password } = req.body.data;
    // if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' })

    const foundUser = await prisma.profileLogin.findFirst({ where: {username: userName }})
    if (!foundUser) return res.sendStatus(401) //Unauthorized 
    // if (!foundUser) return res.json("didn't find user") //Unauthorized 
    // evaluate password 
    console.log("Plaintext Password:", data);
    console.log("Plaintext username:", userName);
    console.log("Plaintext person:", person);
    console.log("Hashed Password from DB:", foundUser.password);
    console.log("Password:", password);
    const match = await bcrypt.compare(password, foundUser.password)
    // // if (!match) res.sendStatus(401)
    if (!match) return res.json("wrong combination")
    if (foundUser.userType != person) return res.json("Unauthorized")
    let user
    if (foundUser.userType === "patient"){
        user = await prisma.patient.findFirst({where: {patientID: foundUser.patientId}})
    }else if(foundUser.userType === "doctor"){
        user = await prisma.dentist.findFirst({where: {DentistSSN: foundUser.dentistSsn}})
    }else{
        user = await prisma.employee.findFirst({where: {EmployeeSSN: foundUser.employeeSsn}})
    }
    console.log(user)
    res.json(user)
    
    
    // const accessToken = jwt.sign({username: foundUser.username, id: person=="patient"? foundUser.patientId:person=="doctor"? foundUser.dentistSsn:foundUser.employeeSsn}, "importantSecret")        
    // res.json(accessToken)
    // if (match) {
    //     const roles = Object.values(foundUser.roles).filter(Boolean)
    //     // create JWTs
    //     const accessToken = jwt.sign(
    //         {
    //             "UserInfo": {
    //                 "username": foundUser.username,
    //                 "roles": roles
    //             }
    //         },
    //         process.env.ACCESS_TOKEN_SECRET,
    //         { expiresIn: '10s' }
    //     );
    //     const refreshToken = jwt.sign(
    //         { "username": foundUser.username },
    //         process.env.REFRESH_TOKEN_SECRET,
    //         { expiresIn: '1d' }
    //     );
    //     // Saving refreshToken with current user
    //     foundUser.refreshToken = refreshToken
    //     const result = await foundUser.save()
    //     console.log(result)
    //     console.log(roles)

    //     // Creates Secure Cookie with refresh token
    //     res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

    //     // Send authorization roles and access token to user
    //     res.json({ roles, accessToken })

    // } else {
    //     res.sendStatus(401)
    // }
}

module.exports = { handleLogin }
