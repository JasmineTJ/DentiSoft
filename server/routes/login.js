const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get("/", (req, res) => {
    res.json("hello world")
})

router.post('/', authController.handleLogin);

module.exports = router