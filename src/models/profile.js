const pool = require("../config/db");

const setProfile = ({ username, phone_number, city, address, post_code, photo }, id) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE users SET username=$2, phone_number=$3, city=$4, address=$5, post_code=$6, photo=$7 WHERE id = $1",
            [id, username, phone_number, city, address, post_code, photo],
            (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
    });
};

module.exports = {
    setProfile
}