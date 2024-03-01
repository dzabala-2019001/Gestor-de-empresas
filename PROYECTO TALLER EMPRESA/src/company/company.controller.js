'use strict'

import Company from "./company.model.js"
import ExcelJS from 'exceljs'

//Agregar
export const addCompany = async (req, res) => {
    try {
        let data = req.body
        let company = new Company(data)
        await company.save()
        return res.send({ message: `Company created succesfully` })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'FAIL ADD COMPANY' })
    }
}

//Actualizar
export const updateCompany = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updatedCompany = await Company.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedCompany) return res.status(404).send({message: 'Company not updated'})
        return res.send({message: `Company ${updatedCompany.nameCompany}  updated`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Faild update comnpany'})
    }
}

//Obtener 
export const getCompany = async (req, res) => {
    try {
        let companies = await Company.find()
        return res.send({companies})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'company not found'})
    }
}

//Experiencia
export const getExperiences = async (req, res) => {
    try {
        let data = req.body
        let companyYears = await Company.find({experienceYears: data.experienceYears})
        return res.send({companyYears})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Companies not found'})
    }
}

//Busca empresas por categoria
export const getCompaniesCategory = async (req, res) => {
    try {
        let { id } = req.body
        let company = await Company.find({_category: id}).populate('category', ['name'])
        if (!company) return res.status(404).send({message: 'Companies not exist'});
        return res.send({company});
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'Companies not found'});
    }
}

//Ordena en orden de A a Z
export const getAZ = async (req, res) => {
    try {
        let az = await Company.find().sort({nameCompany: +1})
        return res.send({az});
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Not found companies' });
    }
}

//Ordena en orden de Z a A
export const getZA = async (req, res) => {
    try {
        let za = await Company.find().sort({nameCompany: -1})
        return res.send({za})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: ' Not found companies'})
    }
}

// no jala :(
// Ya jalo siuu
export const generateExcel = async (req, res) => {
    try {
        // busca todas las empresas en la base de datos y pobla los campos de referencia 'category'
        let companies = await Company.find().populate('category', ['nameCategory', 'description']);
        //crea el exel
        let book = new ExcelJS.Workbook();
        // Agrega una hoja llamada Companies
        let worksheet = book.addWorksheet('Companies');
        // esto define las columnas de exel
        worksheet.columns = [
            { header: 'name', key: 'nameCompany', width: 20 },
            { header: 'category', key: 'nameCategory', width: 20 },
            { header: 'Description', key: 'description', width: 40 }
        ];

         // itera sobre las empresas y agrega una fila para cada una en la hoja de trabajo
        companies.forEach(company => {
            worksheet.addRow({
                nameCompany: company.nameCompany,
                nameCategory: company.category.nameCategory, 
                description: company.category.description 
            });
        });

        // escribe el libro de Excel en un archivo llamado CompanyExcel
        let filePath = 'CompanyExcel.xlsx';
        await book.xlsx.writeFile(filePath);
        // establece la cabecera de la respuesta HTTP para que el navegador descargue el archivo Excel
        res.attachment(filePath);
        // esto envia el exel como respuesta 
        res.send();
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error generating Excel', error: error });
    }
}

