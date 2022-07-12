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
      const limit = req.query.limit || 2;
      const offset = (page - 1) * limit;

      const { transit, airline, sortBy, origin, destination } = req.query;
      // console.log(typeof(transit));
      // console.log(airline);
      // console.log(req.query.facilitas);
      // const fasilitas = req.query.facilitas.split('%');

      const transitFilter = transit || "";
      const airlineFilter = airline || "";
      const sortByFilter = sortBy || "";
      const originFilter = origin || "";
      const destinationFilter = destination || "";

      const result = await flightsModel.getAllProduct(limit, offset, transitFilter, airlineFilter, sortByFilter, originFilter, destinationFilter);

      const {
        rows: [count],
      } = await flightsModel.countFlights(transitFilter, airlineFilter, originFilter, destinationFilter);
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

      return response(res, rows, 200, "get detail flights success");
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
};

module.exports = flightsController;
