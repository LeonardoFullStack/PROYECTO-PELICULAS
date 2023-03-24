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
  const pag = req.query.pag //esto hay que ponerlo bien
  if (busqueda) {
    const peticion = await consulta(busqueda, pag)

    if (peticion) {
        const paginas = Math.ceil(peticion.totalResults / 10)
      
      console.log(peticion.Search)

      res.render('search', {
        titulo: `Resultados de ${busqueda}`,
        msg: `Se han encontrado ${peticion.totalResults} resultados`,
        query:true,
        data: peticion.Search,
        paginas,
        busqueda
      })

    } else {
      res.render('error', {
        error: 'Error',
        msg: 'Error al obtener los resultados'
      })
    }


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