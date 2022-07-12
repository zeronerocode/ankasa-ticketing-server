const pool = require('../../config/db')

const authAdminModule = {
    login: (data) => {
        return pool.query('SELECT * FROM admin WHERE admins = $1', [data.admin])
    },
    register: (data) => {
        return pool.query('INSERT INTO admin (id, admins, password, status) VALUES ($1, $2, $3, $4)', [data.id, data.user, data.password, data.status])
    }
}

module.exports = authAdminModule