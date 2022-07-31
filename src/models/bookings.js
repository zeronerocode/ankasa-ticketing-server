const pool = require('../config/db')

const bookingsModel = {
    createBooking : (data) => new Promise((resolve, reject) => {
        console.log(data);
        pool.query(`
            INSERT INTO bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, payment_status, total_payment, totalorder)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `, [data.id, data.user_id, data.flight_id, data.title, data.fullname, data.nationality,
            data.travel_insurance, data.payment_status, data.totalPayment, data.totalorder], (err,result)=>{
                if(!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
    }),

    getCustomerBookings: (id) => new Promise((resolve, reject)=>{
        pool.query(`
        SELECT flights.departure_date, to_char(flights.departure_time, 'HH:mm') AS departure_time, origin.city_name AS origin, destination.city_name AS destination, flights.terminal,
        flights.gate, bookings.id, bookings.payment_status, airlines.name AS airline_name
        FROM bookings
        INNER JOIN flights ON flights.id = bookings.flight_id
        INNER JOIN airlines ON flights.airline_id = airlines.id
        INNER JOIN countries AS origin ON flights.departure_city = origin.id
        INNER JOIN countries AS destination on flights.arrival_city = destination.id
        WHERE bookings.user_id = '${id}'
        `, (err, result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    }),

    getDetailBooking: (id) => new Promise((resolve, reject)=>{
        pool.query(
            `SELECT bookings.full_name, flights.departure_date, to_char(flights.departure_time, 'HH:mm') AS departure_time,
            flights.gate, flights.class, flights.terminal, bookings.totalorder, origin.city_name AS origin, destination.city_name AS destination,
            airlines.image FROM bookings
            INNER JOIN flights ON bookings.flight_id = flights.id
            INNER JOIN airlines ON flights.airline_id = airlines.id
            INNER JOIN countries AS origin ON flights.departure_city = origin.id
            INNER JOIN countries AS destination ON flights.arrival_city = destination.id WHERE bookings.id ='${id}'`
            , (err, result)=>{
                if(!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            }
        )
    })

}

module.exports = bookingsModel