const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const Data = require('./data');
require("dotenv").config();
// const UUID = require('uuid/v4');
// const Papa = require("papaparse");

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
// Enable CORS on all routes
app.use(cors());

// function parseCSV(data) {
//     Papa.parse(data, {
//         header: true,
//         delimiter: ';',
//         download: true,
//         skipEmptyLines: true,
//         step: function(row) {
//             console.log("Row:", row.data);
//         },
//         complete: function() {
//             console.log("All done!");
//         }
//       });
// };

// CRUD Routes: 

// OLD IMPORT ROUTE:
// router.post('/import', (req, res) => {
//     let data = new Data();
//     let newUUID = null;
//     const { id, message } = req.body;

//     if ((id === null)) {
//         newUUID = UUID();
//         console.log(`Generating new UUID for client: ${newUUID}`);
//         data.id = newUUID;
//     } else {
//         console.log(`Import request from client id: ${id}`);
//         data.id = id;
//     }

//     data.message = message;
//     data.save(err => {
//         if (err) return res.json({ success: false, error: err });
//         console.log(data.message);
//         return res.json({ 
//             success: true, 
//             id: data.id, 
//             message: data.message 
//         });
//     });
// });

// CREATE
// adds new data to database
router.post('/import', (req, res) => {
    console.log(`import endpoint hit, parsing request...`);
    const { id, message } = req.body;
    console.log(`req.body.id: ${id}`);
    console.log(`req.body.message: ${message}`);
    
    let query = id ? { _id: id } : { _id: new mongoose.mongo.ObjectID() };
    console.log(`Searching on query: ${JSON.stringify(query)}`);
    
    let update = {
        message: message,
    };
    console.log(`Updating: ${JSON.stringify(update)}`);

    // const options = { runValidators: true, upsert: true, new: true, setDefaultsOnInsert: true };
    const options = { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true };

    Data.findOneAndUpdate(
        query,
        update,
        options,
        function (err, doc) {
            if (err) return res.json({ success: false, error: err });
            console.log(doc);
            return res.json({
                success: true,
                _id: doc._id,
                message: doc.message,
            });
        }
    );
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