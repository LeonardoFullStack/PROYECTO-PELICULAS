const { createUserConnect, getUserConnect, getAllUsersConnect, deleteUserConnect, updateUserConnect } = require('../models/users')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const { generarJwt } = require('../helpers/jwt')
const { consulta } = require('../helpers/fetchImdb')
const express = require('express')
const app = express()

app.use(cookieParser())


const checkLogin = async (req, res) => {
    let userData, passwordOk, token
    try {
        userData = await getUserConnect(req.body.email)


        passwordOk = bcrypt.compareSync(req.body.password, userData[0].password)
       



    } catch (error) {
        res.render('index', {
            titulo: 'Error al identificar',
            msg: 'Prueba otra vez'
        })
    }

    if (passwordOk) {

        token = await generarJwt(userData[0].id, userData[0].name)
        
        
        res.cookie('xtoken', token)

        res.render('dashboard', {
            titulo: 'Login correcto',
            msg: `Bienvenido ${userData[0].name}`,
            data:userData,
            
        })

    } else if (!passwordOk) {
        res.render('index', {
            titulo: 'Error al identificar',
            msg: 'Prueba otra vez'
        })
    }



}

const logout = (req,res) => {
    res.cookie('x-token', '')
    res.render('index', {
        titulo: 'Sesión cerrada',
        msg: 'Haz login para comenzar'
    })

}

const getUserByEmail = async (req, res) => {
    let data, msg
    try {
        let email = req.query.email
        if (email) {
            data = await getUserConnect(email)
            msg = `datos del usuario ${email}`
        } else {
            data = await getAllUsersConnect()
            msg = 'Todos los usuarios'
        }
        res.status(200).json({
            ok: true,
            msg,
            data
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador'
        })
    }
}

const viewMovie =async (req,res) => {
    const idMovie = req.params.id
    const peticion = await consulta(null, idMovie)
    console.log(peticion)
    res.render('viewOne', {
        titulo: `${peticion.title}`,
        msg: 'Vista al detalle de la película',
        data:peticion
      })
}



const createUser = async (req, res) => {
    let { name, password, email, image } = req.body
    let salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt)
    console.log(password)

    try {
        const data = await createUserConnect(name, password, email, image)
        const userData = await getUserConnect(email)
        token = await generarJwt(userData[0].id, userData[0].name)

        res.cookie('xtoken', token)
        
        res.render('dashboard', {
            titulo: 'usuario creado.Bienvenido!',
            msg: 'Mi perfil',
            data: userData
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error al crear el usuario'
        })
    }
}

const deleteUser = async (req, res) => {
    console.log('holi?')
    try {
        const data = await deleteUserConnect(req.params.email)
        res.status(200).json({
            ok: true,
            msg: `El usuario con email ${req.params.email} ha sido borrado`
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al borrar el usuario'
        })
    }
}

const updateUser = async (req, res) => {
    let { name, password, email, image } = req.body
    const oldMail = req.params.email
    let salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt)
    try {
        const data = await updateUserConnect(oldMail, name, password, email, image)
        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado',
            data: {
                name,
                password,
                email,
                image
            }
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al actualizar el usuario'
        })
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    deleteUser,
    updateUser,
    checkLogin,
    logout,
    viewMovie
}