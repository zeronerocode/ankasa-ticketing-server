const pool = require("../config/db");
const findEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE email = $1", [email], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const checkIdUser = (id) => {
  console.log("model id => ",id);
  return pool.query('SELECT * FROM users WHERE id = $1', [id])
}

const insert = ({ id, email, password, name}) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO users(id, email, password, name, username)VALUES($1, $2, $3, $4, $5)", [id, email, password, name, name], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const activate = (id) => {
  console.log(`id ${id}`);
  return pool.query(`UPDATE users SET is_active = true where id = '${id}'`)
}

const resetPassword =  (route, hash, email) =>{
  return pool.query(`UPDATE ${route} SET password = '${hash}' WHERE email = '${email}'`)
}

module.exports = {
  findEmail,
  insert,
  checkIdUser,
  activate ,
  resetPassword
};