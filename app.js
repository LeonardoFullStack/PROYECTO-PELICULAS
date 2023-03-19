const express = require('express')
const app = express()
const port = process.env.port
require('dotenv').config();





app.listen(port,() => {
    console.log(`servidor a la escusha del ${port}`)
})