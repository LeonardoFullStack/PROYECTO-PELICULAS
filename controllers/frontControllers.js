const express = require('express')
const { consulta } = require('../helpers/fetchImdb')


const getIndex = async (req, res,) => {



  res.render('index', {
    titulo: 'Proyecto intermedio',
    msg: 'Haz login para comenzar'
  })
}

const getSearch = async (req, res) => {
  const busqueda = req.query.query
  if (busqueda) {
    const peticion = await consulta(busqueda)
    console.log(peticion)
    res.render('search', {
      titulo: `Resultados de ${busqueda}`,
      msg: `Se han encontrado ${peticion.results.length} resultados`,
      query:true,
      data: peticion.results
    })
  } else {
    res.render('search', {
      titulo: `Búsqueda de películas`,
      msg: `Haz aquí tu búsqueda`,
      query:false
    })
  }
}

module.exports = {
  getIndex,
  getSearch
}