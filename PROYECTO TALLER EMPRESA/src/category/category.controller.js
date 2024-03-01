'use strict'

import Category from './category.model.js'



export const addCategory = async (req, res) =>{
    try {
        //Capturar la data
        let data = req.body
        console.log(data)
        //Crear la instancia
        let category = new Category(data)
        //Guardar
        await category.save()
        //Responde si funciono
        return res.send({message: `Registered successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Faild add category '})
        
    }
}

export const updatedCategory = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updatedCategory = await Category.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
            )
        if(!updatedCategory) return res.status(404).send({message: ' Category not found'})
        return res.send({message: 'Category  updated'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Faild update'})
    }
}

export const getCategories = async (req, res) => {
    try {
        let category = await Category.find()
    return res.send({category})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'not found'})
    }
}

export const findCategoryID = async (req, res) => {
    try {
        let { id } = req.params
        let category = await Category.find(
            {_id: id}
        )
    return res.send({category})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: ' Category not found'})
    }
}

export const deleteCategory = async (req, res) =>{
    try {
        let{id} = req.params
        let deletedCategory =  await Category.findOneAndDelete({_id: id})
        if(!deletedCategory) return res.status(404).send({message: 'Category not found'})
        return res.send({message: `Category deleted successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Faild delete Category'})
    }

}

