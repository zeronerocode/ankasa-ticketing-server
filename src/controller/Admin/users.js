const createError = require('http-errors')
const { response } = require('../../helper/response')
const { getAllUser, detailUsers, deleteUsers, activate, deactivate } = require('../../models/Admin/users')

const usersControler = {
    getAllUser: async(req,res,next) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 12
            const offset = (page - 1) * 12
            const data = {
                page,
                offset,
                limit
            }
            const {rows: result} = await getAllUser(data)
            response(res, result, 200, 'success', page)
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    deleteUsers: async(req, res, next) =>{
        try {
            const {id} = req.params
            const {rows ,rowCount} = await detailUsers(id)
            if(!rowCount){
                req.status(403).json({
                    message: 'Data doesnt exist'
                })
            }else {
                await deleteUsers(id)
                response(res, rows, 200, 'Data has been deleted')
            }
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    detailUsers: async(req, res, next) => {
        try {
            const {id} = req.params
            const {rows, rowCount} = await detailUsers(id)
            if(!rowCount){
                res.status(403).json({
                    message: 'Data doesnt exist'
                })
            }else{
                delete rows.password
                response(res, rows, 200, 'success')
            }
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    updateUsers: async(req, res, next) => {
        try {
            const {id} = req.params
            const {rows: [result], rowCount} = await detailUsers(id)
            if(!rowCount){
                res.status(403).json({
                    message: 'Account doesnt exist'
                })
            }
            if(!result.is_active || result.is_active === null) {
                await activate(id)
                const {rows} = await detailUsers(id)
                response(res, rows[0], 200, 'Account activated')
            }else{
                await deactivate(id)
                const {rows} = await detailUsers(id)
                response(res, rows[0], 200, 'Account deactivated')
            }
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    }
}

module.exports = usersControler