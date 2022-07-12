const pool = require('../../config/db')

const bookingModule = {
    getBooking: (data) => {
        return pool.query('SELECT * FROM bookings LIMIT $1 OFFSET $2', [data.limit, data.offset])
    },
    detailBooking: (id) => {
        return pool.query('SELECT * FROM bookings WHERE id = $1', [id])
    },
    updateBooking: (data) => {
        return pool.query('UPDATE bookings SET title = COALESCE($1, title), full_name = COALESCE($2, full_name), nationality = COALESCE($3, nationality), travel_insurance = COALESCE($4, travel_insurance), payment_status = COALESCE($5, payment_status), total_payment = COALESCE($6, total_payment), updated_at = $7 WHERE id = $8', [data.title, data.full_name, data.nationality, data.insurance, data.payment_status, data.total_payment, data.Updated_at, data.id])
    },
    deleteBooking: (data) =>{
        return pool.query('DELETE FROM bookings WHERE id = $1', [data.id])
    }
}

module.exports = bookingModule