const jwt = require('jsonwebtoken')


const validarJwt = (req, res, next) => {

        const token = req.header.xtoken


        if (!token) {
            return res.render('index', {
                titulo: 'No has iniciado sesión',
                msg: 'Inicia sesión para continuar'
            })
        }

        try {

            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(payload.uid)
            req.header.id = payload.uid
            req.header.name = payload.name

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