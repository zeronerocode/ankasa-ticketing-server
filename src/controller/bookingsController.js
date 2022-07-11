const createError = require("http-errors");
const errorMessage = new createError.InternalServerError();
const { v4: uuid } = require('uuid')
const moment = require('moment')

const { response } = require("../helper/response");
const bookingsModel = require("../models/bookings");

const bookingsController = {
    createBooking: async (req, res, next) => {
        try {
            const id = uuid();
            console.log(req.body);
            const setData = {
                id,
                flight_id: req.body.flight_id,
                user_id: 'user_2',
                title: req.body.title,
                fullname: req.body.fullname,
                nationality: req.body.nationality,
                travel_insurance: req.body.travel_insurance || '',
                payment_status: req.body.payment_status || 0,
                totalorder: req.body.totalorder,
                totalPayment: req.body.totalPayment
            }

            await bookingsModel.createBooking(setData)

            return response(res, setData, 200, 'Create Booking succes')
        } catch (error) {
            console.log(error);
            next(errorMessage)
        }
    },

    getCustomerBookings: async (req, res, next) => {
        try {
            const userId = 'ristUser'
            const bookings = await bookingsModel.getCustomerBookings(userId)
            const newData = bookings.rows.map((item)=>{
                return {
                    ...item,
                    departure_date: moment(item.departure_date).format('dddd, d MMMM YY')
                }
            })
            response(res, newData, 200, 'Get Bookings, success')

        } catch (error) {
            console.log(error);
            next(errorMessage) 
        }
    }
}

module.exports = bookingsController