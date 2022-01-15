var express = require("express");
var app = express();

// Get environment variables
require("dotenv").config();

// Connect to database
const mysql = require("../database/mysql").pool

// Start server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});