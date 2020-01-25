const { date } = require("../../lib/utils")

const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`SELECT * FROM members`, function(err, results) {
            if (err) throw `Database ERROR: ${err}`
            
            callback(results.rows)
        })

    },

    create(data, callback){
        const query = `
            INSERT INTO members (
                name, 
                avatar_url,
                gender,
                email,
                birth,
                blood,
                weight,
                height,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database ERROR: ${err}`
            
            callback(results.rows[0])
        })
    },

    find(id, callback) {
        db.query(`SELECT * FROM members WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database ERROR: ${err}`

            callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `
            UPDATE members SET
                avatar_url = $1,
                name = $2,
                email = $3,
                birth = $4,
                gender = $5,
                blood = $6,
                weight = $7,
                height = $8,
                instructor_id = $9
            WHERE id = $10
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database ERROR: ${err}`
            
            callback()
        })

    },

    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database ERROR: ${err}`
            
            callback()
        })
    },

    instructorsSelectOptions(callback) {
        db.query(`SELECT name, id FROM instructors`, function(err, results) {
            if (err) throw 'Database Error'

            callback(results.rows)
        })
    }
}