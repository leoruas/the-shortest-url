var express = require("express");
var app = express();

// Setup body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Get environment variables
require("dotenv").config();

// Set encode route
const encodeRoute = require('./routes/encode.js')
app.use('/encode', encodeRoute)

// Set decode route
const decodeRoute = require('./routes/decode.js')
app.use('/decode', decodeRoute)

// Start server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});