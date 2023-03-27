const express = require('express')
const { consulta } = require('../helpers/fetchImdb')
const { validarJwt } = require('../middleware/validarJwt')
const {addMovieConnect}  = require('../models/users')


const getIndex = async (req, res,) => {


      res.render('index', {
      titulo: 'Proyecto intermedio',
      msg: 'Haz login para comenzar'
    })

}

const getSignup = (req, res) => {
  res.render('signup', {
    titulo: 'Crear usuario',
    msg: 'Crea tu usuario en la API de MLE, son ya mas de quinientos billones!'
  })
}
//falta gestión de errores, y no repetir peliculas. Y corregir el redirect
const addMovie =async  (req,res) => {
  console.log(req.header.id,'el idé')
  const idMovie=req.params.id
  const idUsers = req.header.id

  const peticion = await consulta(null, idMovie)
  
  const {title, image, genres, year, runtimeStr, directors} = peticion
  const data = await addMovieConnect(idMovie, idUsers,title, image, genres, year, runtimeStr, directors)

  res.redirect('http://localhost:3000/search/?pag=1&query=matrix')
}



const getSearch = async (req, res) => {
  const busqueda = req.query.query
  const pag = req.query.pag //esto hay que ponerlo bien
  if (busqueda) {
    const peticion = await consulta(busqueda)

    if (peticion) {
      const paginas = Math.ceil(peticion.results.length / 12)
      const primerCorte = (pag - 1) * 12
      const segundoCorte = (pag * 12)
  
      const miniPeticion = peticion.results.slice(primerCorte, segundoCorte);

      

      res.render('search', {
        titulo: `Resultados de ${busqueda}`,
        msg: `Se han encontrado ${peticion.results.length} resultados`,
        query: true,
        data: miniPeticion,
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
      query: false
    })
  }
}

module.exports = {
  getIndex,
  getSignup,
  getSearch,
  addMovie
}