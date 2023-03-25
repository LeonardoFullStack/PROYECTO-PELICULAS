const {createUserConnect, getUserConnect, getAllUsersConnect, deleteUserConnect, updateUserConnect} = require('../models/users')
const bcrypt = require('bcryptjs')

const checkLogin =async (req,res) => {

    const userData = await getUserConnect(req.body.email)
    

    const passwordOk = bcrypt.compareSync(req.body.password, userData[0].password)
    console.log(passwordOk)
    res.render('index', {
      titulo: 'Proyecto intermedio',
      msg: 'Haz login para comenzar'
    })
}

const getUserByEmail  =async (req,res) => {
    let data,msg
    try {
        let  email = req.query.email
        if (email) {
            data = await  getUserConnect(email)
            msg = `datos del usuario ${email}`
        } else {
            data= await getAllUsersConnect()
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



const createUser =async (req,res) => {
    let { name, password, email, image, isAdmin } = req.body
    let salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt)
    console.log(password)

    try {
        const data = await createUserConnect(name, password, email, image, isAdmin)
        res.status(200).json({
            ok: true,
            msg: `el usuario ${name} ha sido creado`,
            data: {
                name,
                email,
                image
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error al crear el usuario'
        })
    }
}

const deleteUser = async(req,res) => {
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

const updateUser =async (req,res) => {
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
    checkLogin
}