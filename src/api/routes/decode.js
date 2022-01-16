const express = require('express');
const router = express.Router()

// Setup id generator
const Hashids = require('hashids/cjs')
const hashids = new Hashids("", 5)

// Connect to database
const mysql = require("../../database/mysql").pool

// Create main route
router.get('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }

        // If url is not informed
        if(req.body.url == null) {
            return res.status(400).send({ error: "The 'url' value is required in body." })
        }

        const shortLinkSplit = req.body.url.split("https://short.link/") // Separate link in two parts
        const linkId = shortLinkSplit[1]; // Get id from link
        const dbId = hashids.decode(linkId); // Decode link id into id from database

        conn.query(
            `SELECT * FROM urls WHERE ID = ${dbId}`,
            (error, results, fields) => {
                conn.release();

                // If id was not found
                if(results == undefined) {
                    return res.status(404).send({
                        message: "Link not found in database."
                    })
                }

                if (error) {
                    return res.status(500).send({ error: error });
                }

                return res.status(200).send({
                    message: "Link successfully decoded!",
                    url: results[0].url
                });
            }
        )
    })
})

module.exports = router