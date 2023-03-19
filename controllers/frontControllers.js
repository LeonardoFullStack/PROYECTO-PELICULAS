const express = require('express')

const getIndex = (req, res,) => {

    res.render('index', {
      titulo: 'Práctica node',
      msg: 'Haz login para comenzar'
    })
}

module.exports = {
    getIndex
}