const pool = require('../../config/db')

const tiketModul = {
    getFlight: (data) =>{
        return pool.query('SELECT flights.id, flights.airline_id, airlines.name,  origin.city_name AS origin_city, origin.name AS origin_country, destination.city_name AS destination_city, destination.name AS destination_country, flights.departure_time, flights.arrival_time, flights.code, flights.class, flights.departure_date, flights.transit, flights.lugage, flights.meal, flights.wifi, flights.gate, flights.terminal, flights.price, flights.stock, flights.duration, flights.is_active, flights.created_at, flights.updated_at FROM flights LEFT JOIN airlines ON flights.airline_id = airlines.id INNER JOIN countries AS origin ON flights.departure_city = origin.id INNER JOIN countries AS destination ON flights.arrival_city = destination.id LIMIT $1 OFFSET $2', [data.limit, data.offset])
    },
    detailFlight: (data) =>{
        return pool.query('SELECT flights.id, flights.airline_id, airlines.name,  origin.city_name AS origin_city, origin.name AS origin_country, destination.city_name AS destination_city, destination.name AS destination_country, flights.departure_time, flights.arrival_time, flights.code, flights.class, flights.departure_date, flights.transit, flights.lugage, flights.meal, flights.wifi, flights.gate, flights.terminal, flights.price, flights.stock, flights.duration, flights.is_active, flights.created_at, flights.updated_at FROM flights LEFT JOIN airlines ON flights.airline_id = airlines.id INNER JOIN countries AS origin ON flights.departure_city = origin.id INNER JOIN countries AS destination ON flights.arrival_city = destination.id WHERE flights.id = $1', [data])
    },
    createNewFlight: (data) => {
        return pool.query('INSERT INTO flights (id, airline_id, departure_city, arrival_city, departure_time, arrival_time, code, class, departure_date, transit, lugage, meal, wifi, gate, terminal, price, stock, is_active, created_at, duration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)', [data.id, data.airline_id, data.departure_city, data.arrival_city, data.departure_time, data.arrival_time, data.code, data.classF, data.departure_date, data.transit, data.lugage, data.meal, data.wifi, data.gate, data.terminal, data.price, data.stock, data.is_active, data.created_at, data.duration])
    },
    deleteFlights: (id) => {
        return pool.query('DELETE FROM flights WHERE id = $1', [id])
    },
    updateFlights: (data) => {
        return pool.query('UPDATE flights SET airline_id = COALESCE($1, airline_id), departure_city = COALESCE($2, departure_city), arrival_city = COALESCE($3, arrival_city), departure_time = COALESCE($4, departure_time), arrival_time = COALESCE($5, arrival_time), code = COALESCE($6, code), class = COALESCE($7, class), departure_date = COALESCE($8, departure_date), transit = COALESCE($9, transit), lugage = COALESCE($10, lugage), meal = COALESCE($11, meal), wifi = COALESCE($12, wifi), gate = COALESCE($13, gate), terminal = COALESCE($14,terminal), price = COALESCE($15, price), stock = COALESCE($16, stock), updated_at = $17, duration = COALESCE($18, duration) WHERE id = $19 ', [data.airline_id, data.departure_city, data.arrival_city, data.departure_time, data.arrival_time, data.code, data.classF, data.departure_date, data.transit, data.lugage, data.meal, data.wifi, data.gate, data.terminal, data.price, data.stock, data.updated_at, data.duration, data.id])
    },
    activate: (id) => {
        return pool.query('UPDATE flights SET is_active = 1 WHERE id = $1', [id])
    },
    deactive: (id) => {
        return pool.query('UPDATE flights SET is_active = 0 WHERE id = $1', [id])
    }
}

module.exports = tiketModul