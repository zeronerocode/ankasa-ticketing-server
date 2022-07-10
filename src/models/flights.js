const pool = require("../config/db");

const flightsModel = {
  getAllProduct: (
    limit, 
    offset, 
    transit,
    airline,
    sortBy
    ) =>
    new Promise((resolve, reject) => {
      let sql = `SELECT flights.id, flights.airline_id, flights.departure_city, flights.arrival_city, flights.departure_time,
                  flights.arrival_time, flights.code, flights.class, flights.departure_date, flights.direct,
                  flights.transit, flights.more_transit, flights.lugage, flights.meal, flights.wifi, flights.gate,
                  flights.terminal, flights.price, flights.stock, flights.is_active, airlines.name AS airline_name, airlines.image AS airline_image
                   FROM flights INNER JOIN airlines ON flights.airline_id
                  = airlines.id WHERE flights.stock >= ${1}`;
      if (transit === '0') {
        sql += ` AND flights.direct = ${1}`;
      }
      if (transit == 1) {
        sql += ` AND flights.transit = ${transit}`;
      }

      if (transit >= 2) {
        sql += ` AND flights.more_transit = ${1}`;
      }

      if(airline){
        sql += ` AND airlines.name ILIKE '${airline}'`
      }

      if(sortBy === 'price') {
        sql += ` ORDER BY flights.price ASC`
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
  countFlights: (transit,
    airline) =>
    new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(*) AS total FROM flights INNER JOIN airlines ON flights.airline_id = airlines.id WHERE flights.stock >= ${1}`;

      if (transit === '0') {
        sql += ` AND flights.direct = ${1}`;
      }
      if (transit == 1) {
        sql += ` AND flights.transit = ${transit}`;
      }

      if (transit > 1) {
        sql += ` AND flights.more_transit = ${transit}`;
      }

      if(airline){
        sql += ` AND airlines.name ILIKE '${airline}'`
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
