const {pool} = require('../../config/db')

const airlanesModule = {
    getAirlanes: (data)=>{
        return pool.query('SELECT * FROM airlanes LIMIT $1 OFFSET $2', [data.limit, data.offset])
    },
    detailAirlanes: (data) =>{
        return pool.query('SELECT * FROM airlanes WHERE id = $1', [data])
    },
    newAirlanesWImg: (data) => {
        return pool.query('INSERT INTO airlanes (id, name, image, is_active) VALUES($1, $2, $3, $4)',[data.id, data.name, data.img, data.is_active])
    },
    newAirlanesWOImg: (data) => {
        return pool.query('INSERT INTO airlanes (id, name, is_active) VALUES($1, $2, $3)',[data.id, data.name, data.is_active])
    },
    activate: (data) => {
        return pool.query('UPDATE airlanes SET is_active = true WHERE id = $1', [data])
    },
    deactivate: (data) => {
        return pool.query('UPDATE airlanes SET is_active = false WHERE id = $1', [data])
    },
    updateWImg: (data) => {
        return  pool.query('UPDATE airlanes SET name = COALESCE ($1, name), image = COALESCE ($2, image), update_at = $3', [data.name, data.image, data.update_at])
    },
    updateWOImg: (data) => {
        return  pool.query('UPDATE airlanes SET name = COALESCE ($1, name), update_at = $2', [data.name, data.update_at])
    },
    deleteAirlanes: (data)=> {
        return pool.query('DELETE FROM airlanes WHERE id = $1', [data])
    }
}

module.exports = airlanesModule