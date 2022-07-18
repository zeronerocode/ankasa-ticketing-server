const createError = require("http-errors");
const moment = require('moment')

const { response } = require("../helper/response");
// const { flightDetail } = require("../models/flights");
const flightsModel = require("../models/flights");
const errorMessage = new createError.InternalServerError();

const flightsController = {
  getDataFlights: async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 5;
      const offset = (page - 1) * limit;

      const { 
        transit,
        airline,
        sortBy,
        origin,
        destination,
        departure,
        arrival,
        fasilitas,
        // price,
        type,
        date,
        min,
        max
      } = req.query;
      // console.log(typeof(transit));
      console.log(min);
      console.log(max);
      // console.log(transit.split('%'));
      const transitFilter = transit ? transit.split('.') : "";
      const airlineFilter = airline ? airline.split('|') : "";
      const departureFilter = departure ? departure.split('.') : "";
      const arriveFilter = arrival ? arrival.split('.') : "";
      const fasilitasFilter = fasilitas ? fasilitas.split('.') : "";
      const departureDate = date || 0
      // const priceFilter = price ? price : "";
      const sortByFilter = sortBy || "";
      const originFilter = origin || "";
      const destinationFilter = destination || "";
      const minPrice = min || 0
      const maxPrice = max || 0

      const result = await flightsModel.getAllProduct(
        limit,
        offset,
        transitFilter,
        airlineFilter,
        sortByFilter,
        originFilter,
        destinationFilter,
        departureFilter,
        arriveFilter,
        fasilitasFilter,
        type,
        departureDate,
        minPrice,
        maxPrice
        );

      const {
        rows: [count],
      } = await flightsModel.countFlights(transitFilter,
        airlineFilter,
        originFilter,
        destinationFilter,
        departureFilter,
        arriveFilter,
        fasilitasFilter,
        type,
        departureDate,
        minPrice,
        maxPrice
        );
      // console.log('apakah ini jalan');
      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);

      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      // console.log(result);
      const newData = result.rows.map((item)=>{
        return {
          ...item,
          departure_time: item.departure_time.split (':').slice(0, 2).join(':'),
          arrival_time : item.arrival_time.split (':').slice(0, 2).join(':'),
          departure_date : moment(item.departure_date).format('dddd, d MMMM YYYY')
        }
      })

      return response(res, newData, 200, "get data flights success", pagination);
    } catch (error) {
      console.log(error);
      next(errorMessage);
    }
  },

  getDetailFlight: async (req, res, next) => {
    try {
      const id = req.params.id
      console.log(id);
      const {rows} = await flightsModel.flightDetail(id)

      return response(res, rows[0], 200, "get detail flights success");
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
};

module.exports = flightsController;
