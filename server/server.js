const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const Arena = require('./data');
require("dotenv").config();

const API_PORT = 3001;
const app = express();
const router = express.Router();

// The line below allows us to import large data chunks in our API
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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


// TODO: Race condition between findByIdAndRemove and findOneAndUpdate. Possibly nest these calls?
// Primary route, creates a new document if none exists, updates document if one
router.put('/import', async (req, res) => {
    console.log(`import endpoint hit, parsing request...`);
    const { id, games } = req.body;
    console.log(`req.body.id: ${id}`);
    console.log(`req.body.games:`);
    console.log(games);
    

    const query = await id ? { _id: id } : { _id: new mongoose.mongo.ObjectID() };
    console.log(`Searching on query: ${JSON.stringify(query)}`);
    
    const options = { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true, };

    let update = {$set : {games: games}};
    // console.log(`Pushing to DB under ID: ${query._id}: ${JSON.stringify(update)}`);
    
    Arena.findOneAndUpdate(
        query,
        update,
        options,
        function (err, doc) {
            // console.log(doc);
            if (err) return res.json({ success: false, error: err });
            console.log(`Document ${query._id} reset to newest import.`);
            return res.json({
                success: true,
                _id: doc._id,
                games: doc.games,
            });
        }
    );
});

router.get('/games', async (req, res) => {
    console.log(`games endpoint hit, parsing request...`);
    const { id } = req.query;
    console.log(`id: ${id}`);
    // console.log(`Request Body:`);
    // console.log(req.query.id);
    // const query = await { _id: id };
    // console.log(`Retreving game data for ${query._id}`);
    
    // let update = {$set : {games: games}};
    // console.log(`Pushing to DB under ID: ${query._id}: ${JSON.stringify(update)}`);
    
    Arena.findById(id, function (err, doc) {
            if (err) return res.json({ success: false, error: err });
            console.log(`Sending document ${id} to client.`);
            return res.json({
                success: true,
                data: doc,
            });
        }
    );
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, ()  => console.log(`Server listening on port ${API_PORT}`));