const express = require('express')
const {consulta} = require('../helpers/fetchImdb')


const getIndex =async (req, res,) => {



    res.render('index', {
      titulo: 'Práctica node',
      msg: 'Haz login para comenzar'
    })
}

const getSearch =async (req, res) => {
  const busqueda = req.query.query
  console.log(busqueda)

  const peticion =await consulta(busqueda)
  console.log(peticion.results.length)
  res.render('search', {
    titulo: `Resultados de ${busqueda}`,
    msg: `Se han encontrado ${peticion.results.length} resultados`,
    data: peticion.results
  })
}

module.exports = {
    getIndex,
    getSearch
}