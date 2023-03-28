const express = require('express')
const {conexion}=require('./helpers/dbConnect')
const cookieParser = require('cookie-parser')


var cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
app.use(cors())


//*SETEAR CARPETA ESTATICA

app.use(express.static( __dirname+'/public'));


//* ESTABLECER TEMPLATE ENGINE
app.set('view engine' , 'ejs')
app.set("views",__dirname + "/views");


//* BODY PARSET
//* parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


//* parse application/json

app.use(express.json());
app.use(cookieParser())

//*CONEXION

conexion()

//* RUTAS
app.use('/',require('./routers/routerFront'))
app.use('/admin',require('./routers/routerAdmin'))
app.use('/signup',require('./routers/routerFront'))





app.use('/api/peliculas',require('./routers/routerApi'))
app.use('/api/apiUsers',require('./routers/routerUsers'))



app.use((req,res) => {
    res.status(404).render("404",{
        error:404,
        msg:"pagina no encontrada"
    })
})


app.listen(port, () => {
    console.log(`servidor a la escucha del puerto ${port}`);
})









