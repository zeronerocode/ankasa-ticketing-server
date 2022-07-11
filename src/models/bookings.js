const pool = require('../config/db')

const bookingsModel = {
    createBooking : (data) => new Promise((resolve, reject) => {
        console.log(data);
        pool.query(`
            INSERT INTO bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, payment_status, total_payment, totalorder)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `, [data.id, data.user_id, data.flight_id, data.title, data.fullname, data.nationality,
            data.travel_insurance, data.payment_status, data.total_payment, data.totalorder], (err,result)=>{
                if(!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
    }),

}

module.exports = bookingsModel