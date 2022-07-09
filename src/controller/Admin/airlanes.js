/* eslint-disable no-unused-vars */

const { response } = require("../../helper/response")
const { getAirlanes, newAirlanesWImg, newAirlanesWOImg, detailAirlanes, activate, deactivate, updateWOImg, updateWImg, deleteAirlanes } = require("../../models/Admin/airlanes")
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('../../helper/cloudinary')

const airlanesControler = {
    getAirlanes: async (req, res, next) => {
        try {
            console.log('get airlanes start');
            const page = parseInt(req.query.page) ||1
        const limit = parseInt(req.query.limit) || 12
        const offset = (page - 1) * limit;
        const data = {
            page,
            limit,
            offset
        }
        console.log('getAirlanesModule start');
        const {rows: result} = await getAirlanes(data)
        console.log('response start');
        response(res, result, 200, 'success', page)
        console.log('get airlanes end');
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    detailAirlanes: async(req, res, next) =>{
        try {
            const {id} = req.params;
            const {rows: result, rowCount} = await detailAirlanes(id)
            if (!rowCount) {
                const results = {}
                response(res,results, 401, 'Data doesnt exist')
            }
            response(res, result[0], 200, 'success')
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    newAirlanes: async (req, res, next) =>{
        try {
            console.log('masuk new airlines');
            console.log(req.body);
            const { name } = req.body
            const file = req.file
            if(file){
                const img = await cloudinary.uploader.upload(req.file.path)
            const data = {
                id: uuidv4(),
                name,
                img: img.secure_url,
                is_active: 0
            }
                await newAirlanesWImg(data)
                const {rows: result} = await detailAirlanes(data.id)
                response(res, result[0], 200, 'success')
            }else{
                const data = {
                    id: uuidv4(),
                    name,
                    is_active: false
                }
                const {rows: result} = await newAirlanesWOImg(data)
                response(res, result, 200, 'success')
            }           
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    activate: async(req,res,next)=>{
        try {
            const {id} = req.params
            const {rows: [detail]} = await detailAirlanes(id)
            console.log(detail);
            if(detail.is_active === 1){
                console.log('masuk deactivated');
                await deactivate(id)
                const {rows: details} = await detailAirlanes(id)
                response(res, details[0], 200, 'This Airlanes is already inactivated')
            }else{
                console.log('masuk activated');
                await activate(id)
                const {rows: details} = await detailAirlanes(id)
                response(res, details[0], 200, 'This Airlanes is already activated')
            }
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    updateAirlanes: async (req, res, next) =>{
        try {
            const {id} = req.params
            const {name} = req.body
            const file = req.file
            const {rowCount} = await detailAirlanes(id)
            if (!rowCount) {
                res.status(401).json({
                    message: 'Data doesnt exist'
                })
            }
            if(!file){
                const data = {
                    name,
                    update_at: new Date()
                }
                const { rows: result } = await updateWOImg(data)
                const {rows} = await detailAirlanes(id)
                response(res, rows[0], 200, 'Data has been updated without updating image')
            }else{
                const image = await cloudinary.uploader.upload(req.file.path)
                const data = {
                    name,
                    image: image.secure_url,
                    update_at: new Date()
                }
                const {rows: result} = await updateWImg(data)
                const {rows} = await detailAirlanes(id)
                response(res, rows[0], 200, 'Data has been updated')
            }
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    deleteAirlanes: async (req, res, next) => {
        try {
            const {id} = req.params
            const {rows ,rowCount} = await detailAirlanes(id)
            if (!rowCount) {
                res.status(401).json({
                    message: 'Data doesnt exist'
                })
            }else{
                await deleteAirlanes(id)
                response(res, rows[0], 200, 'Data has been deleted')
            }
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    }
}


module.exports = airlanesControler