const createError = require("http-errors");

const { response } = require("../helper/response");
const flightsModel = require("../models/flights");
const errorMessage = new createError.InternalServerError();

const flightsController = {
  getDataFlights: async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 2;
      const offset = (page - 1) * limit;

      const {
        transit,
        airline,
        sortBy
      } = req.query
      // console.log(typeof(transit));
      // console.log(airline);

      const transitFilter = transit || ''
      const airlineFilter = airline || ''
      const sortByFilter = sortBy || ''

      const result = await flightsModel.getAllProduct(limit, offset, transitFilter, airlineFilter, sortByFilter);

      const {
        rows: [count],
      } = await flightsModel.countFlights(transitFilter, airlineFilter);
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

      return response(res, result.rows, 200, "get data flights success", pagination);
    } catch (error) {
      console.log(error);
      next(errorMessage);
    }
  },
};

module.exports = flightsController;
