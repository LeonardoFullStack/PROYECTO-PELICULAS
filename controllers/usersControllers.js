const express = require('express')

const goDashboard = (req,res) => {
    console.log(req.header.id)
    res.render('index', {
        titulo: 'hola desde godashboard',
        msg: 'cállate'
      })
}

module.exports = {
    goDashboard
}