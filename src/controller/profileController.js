const createError = require("http-errors");
const { setProfile, getProfile} = require("../models/profile");
const { response } = require("../helper/response");
const cloudinary = require('../helper/cloudinary');
const errorServ = new createError.InternalServerError();

const insertProfile = async (req, res, next) => {
    try {
        const { username, phone_number, city, address, post_code } = req.body;
        const img = await cloudinary.uploader.upload(req.file.path)
        const id = "45888b11-749d-4a9c-9155-3c814c9e1180";
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
    const id = "45888b11-749d-4a9c-9155-3c814c9e1180";
    try {
        const result = await getProfile(id);
        response(res, result.rows, 200, "get data profile") 
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
}

module.exports = {
    insertProfile,
    Profile
}