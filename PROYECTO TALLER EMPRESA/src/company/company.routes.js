import express  from "express"
import { addCompany, generateExcel, getAZ, getCompaniesCategory, getCompany, getExperiences, getZA, updateCompany } from "./company.controller.js"


const api = express.Router()

api.post('/addCompany',addCompany)
api.put('/updateCompany/:id', updateCompany)
api.get('/getAllCompanies', getCompany )
api.get('/getCompaniesExperiences', getExperiences )
api.get('/getCompaniesCategory/:id',  getCompaniesCategory)
api.get('/getCompaniesAZ',  getAZ )
api.get('/getCompaniesZA', getZA )
api.get('/generateExcel', generateExcel )

export default api