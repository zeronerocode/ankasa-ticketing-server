const createError = require("http-errors");
const { setProfile,} = require("../models/profile");
const { response } = require("../helper/response");
const cloudinary = require('../helper/cloudinary')
const errorServ = new createError.InternalServerError();

const insertProfile = async (req, res, next) => {
    try {
        const { username, phone_number, city, address, post_code } = req.body;
        const img = await cloudinary.uploader.upload(req.file.path)
        const id = req.decoded.id;
        const data = {
            username, 
            phone_number, 
            city, 
            address, 
            post_code,
            photo: img.secure_url ,
            updatedAt: new Date()
        };
        console.log(data.photo);
        await setProfile(data, id);
        response(res, data, 201, "insert profile successfully");

    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

module.exports = {
    insertProfile
}