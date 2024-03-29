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

const deleteUser = ({ email }) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM users WHERE email = $1", [email], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  findEmail,
  insert,
  deleteUser
};