const jwt = require('jsonwebtoken')


const validarJwt = (req,res,next) => {
    const token = req.header.xtoken
    
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
         
        const payload =jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(payload.uid)
        req.headers.id = payload.uid
        req.headers.name = payload.name 

    } catch (error) {
        return res.status(401).json({ //aqui hay que poner un render en vez del return mejor
            ok: false,
            msg: 'Token no válido'
        })
    }

    next()
   
}

module.exports = {
    validarJwt
}