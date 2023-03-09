const express = require('express');
const historyController = require('../controllers/history');

const routerHistory = express.Router();

routerHistory.post('/history', historyController.create)
routerHistory.get('/history', historyController.getAll)
routerHistory.delete('/history', historyController.removeAll)



module.exports = routerHistory