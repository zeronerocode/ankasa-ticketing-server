const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const { response } = require("../../helper/response");
const { getAirlinesByName } = require("../../models/Admin/airlanes");
const { detailCountryByName } = require("../../models/Admin/country");
const {
  createNewFlight,
  getFlight,
  detailFlight,
  deleteFlights,
  updateFlights,
  deactive,
  activate,
} = require("../../models/Admin/tiket");

const flightsControler = {
  createFlights: async (req, res, next) => {
    try {
      const {
        airline_id,
        departure_city,
        arrival_city,
        departure_time,
        arrival_time,
        code,
        classF,
        departure_date,
        transit,
        lugage,
        meal,
        wifi,
        gate,
        terminal,
        price,
        stock,
        duration
      } = req.body;
      const {
        rows: [countryDep],
        rowCount: countryDepCount,
      } = await detailCountryByName(departure_city);
      const {
        rows: [countryArr],
        rowCount: countryArrCount,
      } = await detailCountryByName(arrival_city);
      const {
        rows: [airline],
        rowCount: airCount,
      } = await getAirlinesByName(airline_id);
      if (!countryArrCount || !countryDepCount) {
        res.status(403).json({
          message: "Country doesnt exist",
        });
      } else if (!airCount) {
        res.status(403).json({
          message: "Country doesnt exist",
        });
      } else if (!airline.is_active) {
        res.status(403).json({
          message:
            "Your Airlines are under suspended. please contact admin to talk about this",
        });
      } else {
        const data = {
          id: uuidv4(),
          airline_id: airline.id,
          departure_city: countryDep.id,
          arrival_city: countryArr.id,
          departure_time,
          arrival_time,
          code,
          classF,
          departure_date,
          transit,
          lugage,
          meal,
          wifi,
          gate,
          terminal,
          price,
          stock,
          duration,
          is_active: 1,
          created_at: new Date(),
        };
        await createNewFlight(data);
        response(res, data, 200, "success");
      }
    } catch (error) {
      console.log(error);
      next(createError[500]());
    }
  },
  getFlights: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;
      const offset = (page - 1) * 12;
      const data = {
        page,
        limit,
        offset,
      };
      const { rows: result } = await getFlight(data);
      response(res, result, 200, page);
    } catch (error) {
      console.log(error);
      next(createError[500]());
    }
  },
  detailFlights: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rowCount, rows } = await detailFlight(id);
      if (!rowCount) {
        res.status(200).json({
          message: "flights doesnt exist",
        });
      } else {
        response(res, rows[0], 200, "success");
      }
    } catch (error) {
      console.log(error);
      next(createError[500]());
    }
  },
  deleteFlights: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rows, rowCount } = await detailFlight(id);
      if (!rowCount) {
        res.status(401).json({
          message: "Data doesnt exist",
        });
      } else {
        await deleteFlights(id);
        response(res, rows[0], 200, "Data has been deleted");
      }
    } catch (error) {
      console.log(error);
      next(createError[500]());
    }
  },
  updateFlights: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {rows: initial} =  await detailFlight(id)
      console.log(initial);
      const {
        airline_id,
        departure_city,
        arrival_city,
        departure_time,
        arrival_time,
        code,
        classF,
        departure_date,
        transit,
        lugage,
        meal,
        wifi,
        gate,
        terminal,
        price,
        stock,
        duration
      } = req.body;
      const {
        rows: countryDep
      } = await detailCountryByName(departure_city);
      const {
        rows: countryArr
      } = await detailCountryByName(arrival_city);
      const {
        rows: [airline],
        rowCount: airCount,
      } = await getAirlinesByName(airline_id);
      if (!airCount) {
        res.status(403).json({
          message: "Country doesnt exist",
        });
      } else if (!airline.is_active) {
        res.status(403).json({
          message:
            "Your Airlines are under suspended. please contact admin to talk about this",
        });
      } else{
      const data = {
        id,
        airline_id: airline.id,
        departure_city: countryDep.id,
        arrival_city: countryArr.id,
        departure_time: departure_time || initial.departure_time,
        arrival_time: arrival_time || initial.arrival_time,
        code: code || initial.code,
        classF: classF || initial.classF,
        departure_date: departure_date || initial.departure_date,
        transit: transit || initial.transit,
        lugage: lugage || initial.lugage,
        meal: meal || initial.meal,
        wifi: wifi || initial.wifi,
        gate: gate || initial.gate,
        terminal: terminal || initial.terminal,
        price: price || initial.price,
        stock: stock || initial.stock,
        duration: duration || initial.duration,
        updated_at: new Date()
      };
      await updateFlights(data)
      const {rows: [result]} = await detailFlight(id)
      response(res, result, 200, 'success')
    }
    } catch (error) {
      console.log(error);
      next(createError[500]());
    }
  },
  switchStatus: async(req, res, next) => {
    try {
        const {id} =req.params
        const {rows: [result]} = await detailFlight(id)
        console.log(result);
        if(!result.is_active){
            await activate(id)
            const {rows: updated} = await detailFlight(id)
            response(res, updated, 200, 'Flight activated')
        } else {
            await deactive(id)
            const {rows: updated} = await detailFlight(id)
            response(res, updated, 200, 'Flight deactivated')
        }
    } catch (error) {
        console.log(error);
        next(createError[500]())
    }
  }
};

module.exports = flightsControler;
