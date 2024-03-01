'use strict'

import {hash, compare} from 'bcrypt'


//Encriptar la contraseña
export const encrypt = (password)=>{
    try {
        return hash(password, 10)
    } catch (error) {
        console.error(error)
        return error
    }
}

//Validar la contraseña
export const checkPassword = async(password, hash)=>{
    try {
        return await compare(password, hash)
    } catch (error) {
        console.error(error)
        return error
    }
}




