const createError = require("http-errors");
const { setProfile, getProfile} = require("../models/profile");
const { response } = require("../helper/response");
const cloudinary = require('../helper/cloudinary');
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
        await setProfile(data, id);
        response(res, data, 201, "insert profile successfully");

    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

const Profile = async (req, res, next) =>{
    const id = req.decoded.id;
    try {
        const result = await getProfile(id);
        response(res, result.rows[0], 200, "get data profile") 
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
}

module.exports = {
    insertProfile,
    Profile
}