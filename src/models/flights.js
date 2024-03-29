const pool = require("../config/db");

// let op = 'AND';

const flightsModel = {
  getAllProduct: (
    limit,
    offset,
    transit,
    airline,
    sortBy,
    origin,
    destination,
    departure,
    arrival,
    fasilitas,
    type, 
    date,
    min,
    max
    ) =>
    new Promise((resolve, reject) => {
      let sql = `SELECT flights.id, flights.airline_id, flights.departure_time, flights.duration,
      flights.arrival_time, flights.code, flights.class, flights.departure_date, flights.direct,
      flights.transit, flights.more_transit, flights.lugage, flights.meal, flights.wifi, flights.gate,
      flights.terminal, flights.price, flights.stock, flights.is_active, airlines.name AS airline_name, airlines.image AS airline_image,
      origin.city_name AS origin, destination.city_name AS destination
      FROM flights 
      INNER JOIN airlines ON flights.airline_id = airlines.id
      INNER JOIN countries AS origin ON flights.departure_city = origin.id
      INNER JOIN countries AS destination ON flights.arrival_city = destination.id
      WHERE flights.stock >= ${1} AND flights.is_active = ${1}`;
      // if (transit === "0") {
      //   sql += ` AND flights.direct = ${1}`;
      // }
      // if (transit == 1) {
      //   sql += ` AND flights.transit = ${transit}`;
      // }

      // if (transit >= 2) {
      //   sql += ` AND flights.more_transit = ${1}`;
      // }

      // if (airline) {
      //   sql += ` AND airlines.name ILIKE '${airline}'`;
      // }

      let operator = ''
      console.log(transit);
      if (transit.length > 0) {
        operator = 'AND'
        let kurungBuka = '('
        for (let i = 0; i < transit.length; i++) {
          if (transit[i] == 1) {
            // console.log('cek jalan');
            // console.log(typeof(transit[i]));
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.direct = ${transit[i]}`
            operator = 'OR'
          } else if (transit[i] == 2) {
            // op = 'OR'
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.transit = ${transit[i] - 1}`
            operator = 'OR'
          } else {
            if (transit[i] == 3) {
              sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.more_transit = ${transit[i] - 2}`
              operator = 'OR'
            }

          }
        }
        sql += `)`
      }

      if (airline.length > 0) {
        console.log(airline);
        operator = 'AND'
        let kurungBuka = '('
        for (let i = 0; i < airline.length; i++) {
          if (airline[i].toLowerCase() == 'garudaindonesia') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } airlines.name ILIKE '%garuda indonesia%'`
            operator = 'OR'
          } else if (airline[i].toLowerCase() == 'america') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } airlines.name ILIKE '%america%'`
            operator = 'OR'
          } else {
            if (airline[i].toLowerCase() == 'batikair') {
              sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } airlines.name ILIKE '%Batik Air%'`
              operator = 'OR'
            }

          }
        }
        operator = 'AND'
        sql += ` )`
      }

      if (fasilitas.length > 0) {
        console.log(fasilitas);
        operator = 'AND'
        // sql += `()`
        for (let i = 0; i < fasilitas.length; i++) {
          if (fasilitas[i] == 1) {
            sql += ` ${operator} flights.lugage = ${fasilitas[i]}`
            // operator = 'OR'
          } else if (fasilitas[i] == 2) {
            // op = 'OR'
            sql += ` ${operator} flights.meal = ${fasilitas[i] - 1}`
            // operator = 'OR'
          } else {
            if (fasilitas[i] == 3) {
              sql += ` ${operator} flights.wifi = ${fasilitas[i] - 2}`
              // operator = 'OR'
            }

          }
        }
        // sql += `)`
      }


      if (departure.length > 0) {
        console.log(departure);
        operator = 'AND'
        let kurungBuka = '('
        for (let i = 0; i < departure.length; i++) {
          if (departure[i] == 'dinihari') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' }  flights.departure_time BETWEEN '00:00:00' AND '06:00:00'`
            operator = 'OR'
          } else if (departure[i] == 'pagi') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.departure_time BETWEEN '06:00:00' AND '12:00:00'`
            operator = 'OR'
          } else if (departure[i] == 'sore') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.departure_time BETWEEN '12:00:00' AND '18:00:00'`
            operator = 'OR'
          } else {
            if (departure[i] == 'malam') {
              sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.departure_time BETWEEN '18:00:00' AND '24:00:00'`
              operator = 'OR'
            }

          }
        }
        operator = 'AND'
        sql += `)`
      }

      if (arrival.length > 0) {
        // console.log(departure);
        operator = 'AND'
        let kurungBuka = '('
        for (let i = 0; i < arrival.length; i++) {
          if (arrival[i] == 'dinihari') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.arrival_time BETWEEN '00:00:00' AND '06:00:00'`
            operator = 'OR'
          } else if (arrival[i] == 'pagi') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.arrival_time BETWEEN '06:00:00' AND '12:00:00'`
            operator = 'OR'
          } else if (arrival[i] == 'sore') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.arrival_time BETWEEN '12:00:00' AND '18:00:00'`
            operator = 'OR'
          } else {
            if (arrival[i] == 'malam') {
              sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.arrival_time BETWEEN '18:00:00' AND '24:00:00'`
              operator = 'OR'
            }

          }
        }
        operator = 'AND'
        sql += `)`
      }

      if (type) {
        sql += ` AND (flights.class ILIKE '${type}')`;
      }

      console.log(min);
      console.log(max);
      if(min && max){
        operator = 'AND'
        sql += ` ${operator} (flights.price BETWEEN ${min} AND ${max})`
      }

      // search by destination
      if (date) {
        // console.log(date);
        sql += ` AND (flights.departure_date = '${date}')`
      }
      if (origin) {
        sql += ` AND (origin.city_name ILIKE '${origin}')`;
      }

      if (destination) {
        sql += ` AND (destination.city_name ILIKE '${destination}')`;
      }

      if (sortBy === "price") {
        sql += ` ORDER BY flights.price`;
      }

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
    let sql = `SELECT flights.id, flights.airline_id, flights.departure_time, flights.duration,
      flights.arrival_time, flights.code, flights.class, flights.departure_date, flights.direct,
      flights.transit, flights.more_transit, flights.lugage, flights.meal, flights.wifi, flights.gate,
      flights.terminal, flights.price, flights.stock, flights.is_active, airlines.name AS airline_name, airlines.image AS airline_image,
      origin.city_name AS origin, destination.city_name AS destination
      FROM flights 
      INNER JOIN airlines ON flights.airline_id = airlines.id
      INNER JOIN countries AS origin ON flights.departure_city = origin.id
      INNER JOIN countries AS destination ON flights.arrival_city = destination.id
      WHERE flights.id = '${id}'`

    pool.query(sql, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
  ,
  countFlights: (transit,
    airline, 
    origin, 
    destination, 
    departure, 
    arrival, 
    fasilitas, 
    type,
    date,
    min,
    max) =>
    new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(*) AS total FROM flights 
      INNER JOIN airlines ON flights.airline_id = airlines.id
      INNER JOIN countries AS origin ON flights.departure_city = origin.id
      INNER JOIN countries AS destination ON flights.arrival_city = destination.id
      WHERE flights.stock >= ${1} AND flights.is_active = ${1}`;

      // if (transit === "0") {
      //   sql += ` AND flights.direct = ${1}`;
      // }
      // if (transit == 1) {
      //   sql += ` AND flights.transit = ${transit}`;
      // }

      // if (transit > 1) {
      //   sql += ` AND flights.more_transit = ${transit}`;
      // }

      // if (airline) {
      //   sql += ` AND airlines.name ILIKE '${airline}'`;
      // }

      let operator = ''
      console.log(transit);
      if (transit.length > 0) {
        operator = 'AND'
        let kurungBuka = '('
        for (let i = 0; i < transit.length; i++) {
          if (transit[i] == 1) {
            // console.log('cek jalan');
            // console.log(typeof(transit[i]));
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.direct = ${transit[i]}`
            operator = 'OR'
          } else if (transit[i] == 2) {
            // op = 'OR'
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.transit = ${transit[i] - 1}`
            operator = 'OR'
          } else {
            if (transit[i] == 3) {
              sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.more_transit = ${transit[i] - 2}`
              operator = 'OR'
            }

          }
        }
        sql += `)`
      }

      if (airline.length > 0) {
        console.log(airline);
        operator = 'AND'
        let kurungBuka = '('
        for (let i = 0; i < airline.length; i++) {
          if (airline[i].toLowerCase() == 'garudaindonesia') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } airlines.name ILIKE '%garuda indonesia%'`
            operator = 'OR'
          } else if (airline[i].toLowerCase() == 'america') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } airlines.name ILIKE '%america%'`
            operator = 'OR'
          } else {
            if (airline[i].toLowerCase() == 'batikair') {
              sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } airlines.name ILIKE '%Batik Air%'`
              operator = 'OR'
            }

          }
        }
        operator = 'AND'
        sql += ` )`
      }

      if (fasilitas.length > 0) {
        console.log(fasilitas);
        operator = 'AND'
        // sql += `()`
        for (let i = 0; i < fasilitas.length; i++) {
          if (fasilitas[i] == 1) {
            sql += ` ${operator} flights.lugage = ${fasilitas[i]}`
            // operator = 'OR'
          } else if (fasilitas[i] == 2) {
            // op = 'OR'
            sql += ` ${operator} flights.meal = ${fasilitas[i] - 1}`
            // operator = 'OR'
          } else {
            if (fasilitas[i] == 3) {
              sql += ` ${operator} flights.wifi = ${fasilitas[i] - 2}`
              // operator = 'OR'
            }

          }
        }
        // sql += `)`
      }


      if (departure.length > 0) {
        console.log(departure);
        operator = 'AND'
        let kurungBuka = '('
        for (let i = 0; i < departure.length; i++) {
          if (departure[i] == 'dinihari') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' }  flights.departure_time BETWEEN '00:00:00' AND '06:00:00'`
            operator = 'OR'
          } else if (departure[i] == 'pagi') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.departure_time BETWEEN '06:00:00' AND '12:00:00'`
            operator = 'OR'
          } else if (departure[i] == 'sore') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.departure_time BETWEEN '12:00:00' AND '18:00:00'`
            operator = 'OR'
          } else {
            if (departure[i] == 'malam') {
              sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.departure_time BETWEEN '18:00:00' AND '24:00:00'`
              operator = 'OR'
            }

          }
        }
        operator = 'AND'
        sql += `)`
      }

      if (arrival.length > 0) {
        // console.log(departure);
        operator = 'AND'
        let kurungBuka = '('
        for (let i = 0; i < arrival.length; i++) {
          if (arrival[i] == 'dinihari') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.arrival_time BETWEEN '00:00:00' AND '06:00:00'`
            operator = 'OR'
          } else if (arrival[i] == 'pagi') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.arrival_time BETWEEN '06:00:00' AND '12:00:00'`
            operator = 'OR'
          } else if (arrival[i] == 'sore') {
            sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.arrival_time BETWEEN '12:00:00' AND '18:00:00'`
            operator = 'OR'
          } else {
            if (arrival[i] == 'malam') {
              sql += ` ${operator} ${operator === 'AND' ? kurungBuka : '' } flights.arrival_time BETWEEN '18:00:00' AND '24:00:00'`
              operator = 'OR'
            }

          }
        }
        operator = 'AND'
        sql += `)`
      }

      if (type) {
        sql += ` AND (flights.class ILIKE '${type}')`;
      }

      if(min && max){
        operator = 'AND'
        sql += ` ${operator} (flights.price BETWEEN ${min} AND ${max})`
      }

      // search by destination
      if (date) {
        // console.log(date);
        sql += ` AND (flights.departure_date = '${date}')`
      }
      if (origin) {
        sql += ` AND (origin.city_name ILIKE '${origin}')`;
      }

      if (destination) {
        sql += ` AND (destination.city_name ILIKE '${destination}')`;
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
