const express = require('express')

const goDashboard = (req,res) => {

    res.render('index', {
        titulo: 'hola desde godashboard',
        msg: 'cállate'
      })
}

module.exports = {
    goDashboard
}