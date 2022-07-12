const pool = require('../../config/db')

const countryModel = {
    getCountry: (data) => {
        return pool.query('SELECT * FROM countries LIMIT $1 OFFSET $2', [data.limit, data.offset])
    },
    detailCountry: (id) => {
        return pool.query('SELECT * FROM countries WHERE id = $1', [id])
    },
    createCountryWImg: (data) => {
        return pool.query('INSERT INTO countries (id, name, alias, city_name, city_image, created_at) VALUES ($1, $2, $3, $4, $5, $6)', [data.id, data.name, data.alias, data.city_name, data.city_image, data.created_at])
    },
    createCountryWoImg: (data) => {
        return pool.query('INSERT INTO countries (id, name, alias, city_name, created_at) VALUES ($1, $2, $3, $4, $5)', [data.id, data.name, data.alias, data.city_name, data.created_at])
    },
    updateCountry: (data) => {
        return pool.query('UPDATE countries SET name = COALESCE ($1, name), alias = COALESCE ($2, alias), city_name = COALESCE ($3, city_name), city_image = COALESCE ($4, city_image), updated_at = COALESCE($5, updated_at) WHERE id = $6', [data.name, data.alias, data.city_name, data.city_image, data.updated_at, data.id])
    },
    updateCountryWOImg: (data) => {
        return pool.query('UPDATE countries SET name = COALESCE ($1, name), alias = COALESCE ($2, alias), city_name = COALESCE ($3, city_name), updated_at = COALESCE($4, updated_at) WHERE id = $5', [data.name, data.alias, data.city_name, data.updated_at, data.id])
    },
    deleteCountry: (id) => {
        return pool.query('DELETE FROM countries WHERE id = $1', [id])
    }
} 

module.exports = countryModel