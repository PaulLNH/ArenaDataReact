const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
require("dotenv").config();

const API_PORT = 3001;
const app = express();
const router = express.Router();

// enviornmental variables for db
const MLAB = {
    USERNAME: process.env.MLAB_USERNAME,
    PASSWORD: process.env.MLAB_PASSWORD,
};

// this is our MongoDB database
const dbRoute = `mongodb://${MLAB.USERNAME}:${MLAB.PASSWORD}@ds143683.mlab.com:43683/arenadata`;

// connects our back end code with the database
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true },
);

let db = mongoose.connection;

db.once('open', () => console.log(`Connected to the database`));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, "MongoDB connection error:"));

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// uses morgan for logging
app.use(logger("dev"));

// CRUD Routes: 

// CREATE
// adds new data to database
router.post('/putData', (req, res) => {
    let data = new Data();

    const { id, message } = req.body;

    if ((!id && id !== 0)) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.message = message;
    data.id = id;
    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// READ
// fetches all avaiable data in database
router.get('/getData', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// UPDATE
// overwrites existing data in database
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Data.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// DELETE
// removes existing data in database
router.post('/deleteData', (req, res) => {
    const { id } = req.body;
    Data.findOneAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, ()  => console.log(`Server listening on port ${API_PORT}`));