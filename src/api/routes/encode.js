const express = require('express');
const router = express.Router()

// Setup id generator
const Hashids = require('hashids/cjs')
const hashids = new Hashids("", 5)

// Connect to database
const mysql = require("../../database/mysql").pool

// Create main route
router.post('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }

        conn.query(
            'INSERT INTO urls (url) VALUES (?)',
            [req.body.url],
            (error, result, fields) => {
                conn.release();

                // Encode url based on insertion id
                const encoded = `https://short.link/${hashids.encode(result.insertId)}`;

                if (error) {
                    return res.status(500).send({ error: error });
                }

                res.status(201).send({
                    message: "Link successfully shortened!",
                    url: encoded
                });
            }
        )
    })
})

module.exports = router