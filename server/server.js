const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const Arena = require('./data');
require("dotenv").config();
// const UUID = require('uuid/v4');
const Papa = require("papaparse");

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

function parseCSV(data) {
    Papa.parse(data, {
        header: true,
        delimiter: ';',
        download: true,
        skipEmptyLines: true,
        step: function(row) {
            console.log("Row:", row.data);
        },
        complete: function() {
            console.log("All done!");
        }
      });
};

// Primary route, creates a new document if none exists, updates document if one
router.post('/import', (req, res) => {
    console.log(`import endpoint hit, parsing request...`);
    const { id, message } = req.body;
    console.log(`req.body.id: ${id}`);
    console.log(`req.body.message: ${message}`);
    
    let query = id ? { _id: id } : { _id: new mongoose.mongo.ObjectID() };
    console.log(`Searching on query: ${JSON.stringify(query)}`);
    
    // let update = {$push : {games: {
    //         timestamp: 1547732654,
    //         map: 1552,
    //         playersNumber: 6,
    //         teamComposition: "MAGE-Frost,PRIEST-Discipline,ROGUE-Assassination",
    //         enemyComposition: "MONK-Windwalker,PALADIN-Holy,WARRIOR-Fury",
    //         duration: 151,
    //         victory: true,
    //         killingBlows: 0,
    //         damage: 364332,
    //         healing: 0,
    //         honor: 0,
    //         ratingChange: 11,
    //         MMR: 2240,
    //         enemyMMR: 2262,
    //         specialization: "Frost",
    //         rated: true,
    //         }
    //     }
    // };

    let update = {$push : {games: {
        timestamp: 1547732359,
        map: 980,
        playersNumber: 6,
        teamComposition: "MAGE-Frost,PRIEST-Discipline,ROGUE-Assassination",
        enemyComposition: "MONK-Windwalker,PALADIN-Holy,WARRIOR-Fury",
        duration: 211,
        victory: false,
        killingBlows: 0,
        damage: 507220,
        healing: 61491,
        honor: 0,
        ratingChange: -15,
        MMR: 2282,
        enemyMMR: 2220,
        specialization: "Frost",
        rated: true,
        }
    }
};

    console.log(`Updating: ${JSON.stringify(update)}`);

    const options = { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true };

    Arena.findOneAndUpdate(
        query,
        update,
        options,
        function (err, doc) {
            if (err) return res.json({ success: false, error: err });
            console.log(doc);
            return res.json({
                success: true,
                _id: doc._id,
                games: doc.games,
            });
        }
    );
});

// READ
// fetches all avaiable data in database
// router.get('/getData', (req, res) => {
//     Data.find((err, data) => {
//         if (err) return res.json({ success: false, error: err });
//         return res.json({ success: true, data: data });
//     });
// });

// UPDATE
// overwrites existing data in database
// router.post('/updateData', (req, res) => {
//     const { id, update } = req.body;
//     Data.findOneAndUpdate(id, update, err => {
//         if (err) return res.json({ success: false, error: err });
//         return res.json({ success: true });
//     });
// });

// DELETE
// removes existing data in database
// router.post('/deleteData', (req, res) => {
//     const { id } = req.body;
//     Data.findOneAndDelete(id, err => {
//         if (err) return res.send(err);
//         return res.json({ success: true });
//     });
// });

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, ()  => console.log(`Server listening on port ${API_PORT}`));