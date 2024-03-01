
//importaciones
import express from 'express'
import { config } from "dotenv"
import userR from '../src/user/user.routes.js'
import companyR from '../src/company/company.routes.js'
import categoryR from '../src/category/category.routes.js'

//Configuracion
const app = express()
config()
const port = process.env.PORT || 2689


//configuracion del server
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//No olvidar Declaración de rutas xd
app.use('/user',userR)
app.use('/company', companyR)
app.use('/category', categoryR)

//Levanta el server
export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}
