const { Pool } = require('pg')
const queries = require('../helpers/queries')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'usersPelis',
    password: 'admin'
})

const getUserConnect = async (email) => {
    let client, result
    try {
        client = await pool.connect()
        const data = await client.query(queries.getUserEmail, [email])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    return result
}

const getAllUsersConnect = async () => {
    let client, result
    try {
        client = await pool.connect()
        const data = await client.query(queries.getAllUsers)
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    return result
}

const createUserConnect = async (name, password, email, image) => {
    let client, respuesta;
    const isAdmin = false;
    try {
        client = await pool.connect()
        const data = await client.query(queries.createUser, [name, password, email, image, isAdmin])
        respuesta = data.rows
    } catch (error) {
        throw error
    } finally {
        client.release()
    }
    return respuesta
}

const deleteUserConnect = async (email) => {
    let data, client
    try {
        client = await pool.connect()
        data = await client.query(queries.deleteUser, [email])
    } catch (error) {
        throw error
    } finally {

        client.release()
    }
}

const updateUserConnect = async (emailViejo, name, password, email, image) => {
    let data, client
    try {
        client = await pool.connect()
        data = await client.query(queries.updateUser, [emailViejo, name, password, email, image])

    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    return data.rows
}

const checkMovie = async (idUser, idfilm) => {
    let client, data
    try {
        client = await pool.connect()
        data = await client.query(queries.checkMovie, [idUser, idfilm])

    } catch (error) {
        throw error
    } finally {
        client.release()
    }
    return data.rows
}

const addMovieConnect = async (idMovie, idUsers, title, image, genres, year, runtimeStr, directors) => {
    let data, client
    try {
        client = await pool.connect()

        data = await client.query(queries.addMovie, [idMovie, idUsers, title, image, genres, year, runtimeStr, directors])
    } catch (error) {
        throw error
    } finally {

        client.release()
    }
    return data
}

const checkMyMovies =async (id) => {
    let data,client
    try {
        client = await pool.connect()

        data = await client.query(queries.myMovies, [id])

    } catch (error) {
        throw error
    }finally{
        client.release()
    }
    
    return data.rows
}

const removeMovieConnect =async (idUser, idMovie) => {
    let data,client
    try {
        client = await pool.connect()

        data = await client.query(queries.removeMovie, [idUser, idMovie])

    } catch (error) {
        throw error
    }finally {
        client.release()
    }
    
    return data.rows
}


module.exports = {
    createUserConnect,
    getUserConnect,
    getAllUsersConnect,
    deleteUserConnect,
    updateUserConnect,
    addMovieConnect,
    checkMovie,
    checkMyMovies,
    removeMovieConnect
}