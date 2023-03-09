const express = require('express');
const authController = require('../controllers/auth.js');

const routerAuth = express.Router();

routerAuth.post('/login', authController.login)
routerAuth.post('/register', authController.register)
// routerAuth.delete('/Auth', AuthController.removeAll)



module.exports = routerAuth