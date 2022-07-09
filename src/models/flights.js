const pool = require("../config/db");

const flightsModel = {
  getAllProduct: (limit, offset) =>
    new Promise((resolve, reject) => {
      let sql = `SELECT flights.id, flights.airline_id, flights.departure_city, flights.arrival_city, flights.departure_time,
                  flights.arrival_time, flights.code, flights.class, flights.departure_date, flights.direct,
                  flights.transit, flights.more_transit, flights.lugage, flights.meal, flights.wifi, flights.gate,
                  flights.terminal, flights.price, flights.stock, flights.is_active, airlines.name, airlines.image FROM flights INNER JOIN airlines ON flights.airline_id
                  = airlines.id WHERE flights.stock >= ${1}`;

      sql += ` LIMIT ${limit} OFFSET ${offset}`;
    //   console.log(sql);
      
    //   console.log('apakah ini jalan');
    //   console.log(offset);
      pool.query(sql, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
            // console.log(err);
          reject(err);
        }
      });
    }),
  countFlights: () =>
    new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(*) AS total FROM flights INNER JOIN airlines ON flights.airline_id = airlines.id WHERE flights.stock >= ${1}`;
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
