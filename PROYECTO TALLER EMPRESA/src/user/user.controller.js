
import User from './user.model.js'
import { generarjwt } from '../utils/jwt.js'
import { encrypt, checkPassword} from '../utils/validator.js'


export const register = async(req, res) =>{
    try {
        //captura los datos
        let data = req.body
        console.log(data)
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        let user = new User(data)
        //guarda en la db
        await user.save()
        //respuesta
        return res.send({message: `Registered successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error Register'})
    }

}


export const login = async (req, res) =>{
    try {
        //captura los datos
        let data = req.body
        let log = await User.findOne({ $or: [{ username: data.username }, { email: data.email }] })
        if (log || await checkPassword(data.password, log.password)){
            let loggedUser = {
                uid: log._id,
                username: log.username,
                name: log.name
            }
            //generar token
            let token = await generarjwt(loggedUser)
            return res.send({ message: `Welcome ${loggedUser.name}`, loggedUser, token })
        }
        if (!log) return res.status(404).send({ message: 'error Login' })
    } catch (error){
        console.error(error)
        return res.status(500).send({ message: 'Error login user' })
    }

}
