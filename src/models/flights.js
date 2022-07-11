const pool = require("../config/db");

const flightsModel = {
  getAllProduct: (limit, offset, transit, airline, sortBy, origin, destination) =>
    new Promise((resolve, reject) => {
      let sql = `SELECT flights.id, flights.airline_id, to_char(flights.departure_time, 'HH:mm') AS departure_time,
      to_char(flights.arrival_time, 'HH:mm') AS arrival_time, flights.code, flights.class, flights.departure_date, flights.direct,
      flights.transit, flights.more_transit, flights.lugage, flights.meal, flights.wifi, flights.gate,
      flights.terminal, flights.price, flights.stock, flights.is_active, airlines.name AS airline_name, airlines.image AS airline_image,
      origin.city_name AS origin, destination.city_name AS destination
      FROM flights 
      INNER JOIN airlines ON flights.airline_id = airlines.id
      INNER JOIN countries AS origin ON flights.departure_city = origin.id
      INNER JOIN countries AS destination ON flights.arrival_city = destination.id
      WHERE flights.stock >= ${1}`;
      if (transit === "0") {
        sql += ` AND flights.direct = ${1}`;
      }
      if (transit == 1) {
        sql += ` AND flights.transit = ${transit}`;
      }

      if (transit >= 2) {
        sql += ` AND flights.more_transit = ${1}`;
      }

      if (airline) {
        sql += ` AND airlines.name ILIKE '${airline}'`;
      }

      if (origin) {
        sql += ` AND origin.city_name ILIKE '${origin}'`;
      }

      if (destination) {
        sql += ` AND destination.city_name ILIKE '${destination}'`;
      }

      if (sortBy === "price") {
        sql += ` ORDER BY flights.price`;
      }

      // console.log(sql);

      sql += ` LIMIT ${limit} OFFSET ${offset}`;

      console.log(sql);
      pool.query(sql, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          // console.log(err);
          reject(err);
        }
      });
    }),
    flightDetail: (id) => new Promise((resolve, reject) => {
      let sql = `SELECT flights.id, flights.airline_id, flights.departure_time,
      flights.arrival_time, flights.code, flights.class, flights.departure_date, flights.direct,
      flights.transit, flights.more_transit, flights.lugage, flights.meal, flights.wifi, flights.gate,
      flights.terminal, flights.price, flights.stock, flights.is_active, airlines.name AS airline_name, airlines.image AS airline_image,
      origin.city_name AS origin, destination.city_name AS destination
      FROM flights 
      INNER JOIN airlines ON flights.airline_id = airlines.id
      INNER JOIN countries AS origin ON flights.departure_city = origin.id
      INNER JOIN countries AS destination ON flights.arrival_city = destination.id
      WHERE flights.id = '${id}'`

      pool.query(sql, (err, result)=> {
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
    ,
  countFlights: (transit, airline, origin, destination) =>
    new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(*) AS total FROM flights 
      INNER JOIN airlines ON flights.airline_id = airlines.id
      INNER JOIN countries AS origin ON flights.departure_city = origin.id
      INNER JOIN countries AS destination ON flights.arrival_city = destination.id
      WHERE flights.stock >= ${1}`;

      if (transit === "0") {
        sql += ` AND flights.direct = ${1}`;
      }
      if (transit == 1) {
        sql += ` AND flights.transit = ${transit}`;
      }

      if (transit > 1) {
        sql += ` AND flights.more_transit = ${transit}`;
      }

      if (airline) {
        sql += ` AND airlines.name ILIKE '${airline}'`;
      }

      if (origin) {
        sql += ` AND origin.city_name ILIKE '${origin}'`;
      }

      if (destination) {
        sql += ` AND destination.city_name ILIKE '${destination}'`;
      }

      pool.query(sql, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    }),
};

module.exports = flightsModel;
