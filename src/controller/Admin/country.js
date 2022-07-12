const createError = require('http-errors');
const { response } = require('../../helper/response');
const { getCountry, detailCountry, createCountryWImg, createCountryWoImg, updateCountry, updateCountryWOImg, deleteCountry } = require('../../models/Admin/country');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('../../helper/cloudinary')

const countryControler = {
    getCountry: async(req,res,next) => {
        try {
            const page = parseInt(req.query.page) ||1
        const limit = parseInt(req.query.limit) || 12
        const offset = (page - 1) * limit;
        const data = {
            page,
            limit,
            offset
        }
        const {rows: result} = await getCountry(data)
        response(res, result, 200, 'success',page)
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    detailCountry: async(req, res, next) => {
        try {
            const {id} = req.params
            const {rows: result} = await detailCountry(id)
            response(res, result[0], 200, 'success')
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    createCountry: async(req, res, next) => {
        try {
            const {name, alias, city_name} = req.body
            const file = req.file
            if(file){
                const img = await cloudinary.uploader.upload(file.path)
                const data = {
                    id: uuidv4(),
                    name,
                    alias,
                    city_name,
                    city_image: img.secure_url,
                    created_at: new Date()
                }
                await createCountryWImg(data)
                console.log(data);
                response(res, data, 200, 'data has been created')
            }else{
                const data = {
                    id: uuidv4(),
                    name,
                    alias,
                    city_name,
                    created_at: new Date()
                }
                await createCountryWoImg(data)
                response(res, data[0], 200, 'data has been created')
            }
        } catch (error) {
            console.log(error)
            next(createError[500]())
        }
    },
    updateCountry: async(req, res, next) => {
        try {
            const {id} = req.params
            const {name, alias, city_name} = req.body
            const file = req.file
            if(file){
                const img = cloudinary.uploader.upload(file.path)
                const data = {
                    id,
                    name,
                    alias,
                    city_name,
                    city_image: (await img).secure_url,
                    updated_at: new Date()
                }
                await updateCountry(data)
                response(res, data, 200, 'updated')
            }else{
                const data = {
                    id,
                    name,
                    alias,
                    city_name,
                    updated_at: new Date()
                }
                await updateCountryWOImg(data)
                response(res, data, 200, 'updated')
            }
        } catch (error) {
            console.log(error)
            next(createError[500]())
        }
    },
    deleteCountry: async(req, res, next) => {
        try {
            const {id} = req.params
            const {rowCount, rows} = await detailCountry(id)
            if(!rowCount) {
                res.status(403).json({
                    message: 'Data doesnt exist'
                })
            }else{
                await deleteCountry(id)
                response(res, rows[0], 200, 'Data deleted')
            }
        } catch (error) {
            console.log(error)
            next(createError[500]())
        }
    }
}

module.exports =countryControler