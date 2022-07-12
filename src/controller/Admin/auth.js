const createError = require('http-errors')
const { response } = require('../../helper/response')
const {generateToken, gerateRefreshToken}  = require('../../middleware/auth')
const { login } = require("../../models/Admin/auth")

const authAdminControler ={
    login: async(req, res, next) => {
        try {
            console.log('masuk login');
            const {admin, password} = req.body
            const data = {
                admin,
                password
            }
            const {rows: [result], rowCount: isExist} = await login(data)
            console.log(isExist);
            console.log(result);
            if(!isExist || result.password !== data.password){
                res.status(401).json({
                    message: 'Wrong combination account and password'
                })
            }else {
                data.token = generateToken(data)
                data.refreshToken = gerateRefreshToken(data)
                delete data.password
                response(res, data, 200, 'success')
            }
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    }
}

module.exports = authAdminControler