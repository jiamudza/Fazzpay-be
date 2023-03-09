require("dotenv").config();
const express = require('express');
const app = express()
const routerProfile = require('./src/routes/profile');
const bodyParser = require('body-parser');
const routerHistory = require('./src/routes/history');
const routerAuth = require('./src/routes/auth')
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.use('/api/auth', routerAuth)
app.use('/api', routerProfile)
app.use('/api', routerHistory)

app.get('/*', (req,res) => {
    res.json({
        message: 404,
        reason: "page not found"
    })
})

app.listen(5000, () => {
    console.log("server is running on port 5000")
})