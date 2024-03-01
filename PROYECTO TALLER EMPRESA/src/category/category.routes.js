import express from 'express'
import { addCategory, deleteCategory, findCategoryID, getCategories,  updatedCategory } from './category.controller.js'
const api = express.Router()

api.post('/add', addCategory)
api.put('/update/:id', updatedCategory)
api.delete('/delete/:id', deleteCategory)
api.get('/getCompany',  getCategories)
api.get('/find/:id',  findCategoryID )

export default api