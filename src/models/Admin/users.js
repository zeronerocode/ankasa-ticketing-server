const pool = require('../../config/db')

const usersModel = {
    getAllUser: (data) => {
        return pool.query('SELECT * FROM users LIMIT = $1 OFFSET = $2', [data.limit, data.offset])
    },
    detailUsers: (id) => {
        return pool.query('SELECT * FROM users WHERE id = $1', [id])
    },
    deleteUsers: (id) => {
        return pool.query('DELETE FROM users WHERE id = $1', [id])
    },
    activate: (id) => {
        return pool.query('UPDATE users SET is_active = true WHERE id = $1', [id])
    },
    deactivate: (id) => {
        return pool.query('UPDATE users SET is_active = false WHERE id = $1', [id])
    }
}

module.exports = usersModel