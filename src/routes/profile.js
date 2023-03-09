const express = require('express');
const userController = require('../controllers/profile');

const routerProfile = express.Router();

routerProfile.get('/users', userController.get)
routerProfile.get('/users/:id', userController.getDetail)
routerProfile.patch('/users/:id', userController.update)
routerProfile.post('/users', userController.add)
routerProfile.delete('/users/:id', userController.remove)


module.exports = routerProfile;