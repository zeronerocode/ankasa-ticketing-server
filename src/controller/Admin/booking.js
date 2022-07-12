const createError = require('http-errors');
const { response } = require('../../helper/response');
const { getBooking, detailBooking, deleteBooking, updateBooking } = require('../../models/Admin/booking');

const bookingControler = {
    getBooking: async(req, res, next) => {
        try {
            const page = parseInt(req.query.page) ||1
        const limit = parseInt(req.query.limit) || 12
        const offset = (page - 1) * limit;
        const data = {
            page,
            limit,
            offset
        }
        const {rows: result} = await getBooking(data)
        response(res, result, 200, 'success', page)
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    detailBooking: async(req, res, next) => {
        try {
            const {id} = req.params
            const {rows: result, rowCount} = await detailBooking(id)
            if(!rowCount){
                response(res, result[0], 200, 'data doesnt exist')
            }else{
                response(res, result[0], 200, 'success')
            }
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    deleteBooking: async(req, res, next) => {
        try {
            console.log('masuk deleteBooking');
            const {id} = req.params
            const {rows: result, rowCount} = await detailBooking(id)
            if(!rowCount){ 
                res.status(200).json({
                    message: 'data doesnt exist'
                })
            }else{
                console.log('masuk else');
                await deleteBooking(id)
            response(res, result[0], 200, 'data has been deleted')
            }
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    updateBooking: async(req, res, next) => {
        try {
            const {id} = req.params
            const {title, fullname, nationality, insurance, payment_status, total_payment} = req.body
            const data = {
                id,
                title,
                fullname,
                nationality,
                insurance,
                payment_status,
                total_payment,
                updated_at: new Date()
            }
            console.log(data);
            await updateBooking(data)
            const {rows: result} = await detailBooking(id)
            response(res, result[0], 200, 'updated')
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    }
}

module.exports = bookingControler