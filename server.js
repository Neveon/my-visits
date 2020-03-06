const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
// const mysql = require('mysql');
const bodyParser = require('body-parser');

// // load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Body parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application.json
app.use(bodyParser.json());

// Enable cors
app.use(cors());

require('./routes/users')(app);
require('./routes/auth')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
