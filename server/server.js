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
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

// enviornmental variables for db
const MLAB = {
    USERNAME: process.env.MLAB_USERNAME,
    PASSWORD: process.env.MLAB_PASSWORD,
};

// this is our MongoDB database
const dbRoute = `mongodb://${MLAB.USERNAME}:${MLAB.PASSWORD}@ds143683.mlab.com:43683/arenadata`;

// connects our back end code with the database
mongoose.connect(
    dbRoute, {
        useNewUrlParser: true
    },
);

let db = mongoose.connection;

db.once('open', () => console.log(`Connected to the database`));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, "MongoDB connection error:"));

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// uses morgan for logging
app.use(logger("dev"));
// Enable CORS on all routes
app.use(cors());


// TODO: Race condition between findByIdAndRemove and findOneAndUpdate. Possibly nest these calls?
// Primary route, creates a new document if none exists, updates document if one
router.put('/import', async (req, res) => {
    console.log(`import endpoint hit from ip: ${req.ip}, parsing request...`);
    const {
        id,
        games
    } = req.body;
    console.log(`req.body.id: ${id}`);
    console.log(`req.body.games:`);
    console.log(games);


    const query = await id ? {
        _id: id
    } : {
        _id: new mongoose.mongo.ObjectID()
    };
    console.log(`Searching on query: ${JSON.stringify(query)}`);

    const options = {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
    };

    let update = {
        $set: {
            games: games
        }
    };
    // console.log(`Pushing to DB under ID: ${query._id}: ${JSON.stringify(update)}`);

    Arena.findOneAndUpdate(
        query,
        update,
        options,
        function (err, doc) {
            // console.log(doc);
            if (err) return res.json({
                success: false,
                error: err
            });
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
    console.log(`games endpoint hit from ip: ${req.ip}, parsing request...`);
    const {
        id
    } = req.query;
    console.log(`id: ${id}`);
    // console.log(`Request Body:`);
    // console.log(req.query.id);
    // const query = await { _id: id };
    // console.log(`Retreving game data for ${query._id}`);

    // let update = {$set : {games: games}};
    // console.log(`Pushing to DB under ID: ${query._id}: ${JSON.stringify(update)}`);

    Arena.findById(id, function (err, doc) {
        if (err) return res.json({
            success: false,
            error: err
        });
        console.log(`Sending document ${id} to client.`);
        return res.json({
            success: true,
            data: doc,
        });
    });
});

router.get('/mapdata', async (req, res) => {
    console.log(`mapdata endpoint hit from ip: ${req.ip}, processing request...`);
    const {
        id
    } = req.query || req.body;
    console.log(`id: ${id}`);

    Arena.findById(id, function (err, doc) {
        if (err) return res.json({
            success: false,
            error: err
        });
        console.log(`Sending document ${id} to client.`);
        let total = doc.games.length;
        console.log(doc.games.length);
        let wins = 0;
        let losses = 0;

        let RoL = {
            wins: 0,
            losses: 0,
        };
        let DS = {
            wins: 0,
            losses: 0,
        };
        let TA = {
            wins: 0,
            losses: 0,
        };
        let TTP = {
            wins: 0,
            losses: 0,
        };
        let BRHA = {
            wins: 0,
            losses: 0,
        };
        let NA = {
            wins: 0,
            losses: 0,
        };
        let AF = {
            wins: 0,
            losses: 0,
        };
        let BEA = {
            wins: 0,
            losses: 0,
        };
        let HP = {
            wins: 0,
            losses: 0,
        };
        let M = {
            wins: 0,
            losses: 0,
        };

        doc.games.forEach(game => {
            if (game.Victory) {
                wins++;
            } else {
                losses++;
            };

            switch (game["Map"].toString()) {
                case '572':
                    // code for RoL
                    if (game.Victory) {
                        RoL.wins++;
                    } else {
                        RoL.losses++;
                    };
                    break;
                case '617':
                    // code for DS
                    if (game.Victory) {
                        DS.wins++;
                    } else {
                        DS.losses++;
                    };
                    break;
                case '980':
                    // code for TA
                    if (game.Victory) {
                        TA.wins++;
                    } else {
                        TA.losses++;
                    };
                    break;
                case '1134':
                    // code for TTP
                    if (game.Victory) {
                        TTP.wins++;
                    } else {
                        TTP.losses++;
                    };
                    break;
                case '1504':
                    // code for BRHA
                    if (game.Victory) {
                        BRHA.wins++;
                    } else {
                        BRHA.losses++;
                    };
                    break;
                case '1505':
                    // code for NA
                    if (game.Victory) {
                        NA.wins++;
                    } else {
                        NA.losses++;
                    };
                    break;
                case '1552':
                    // code for AF
                    if (game.Victory) {
                        AF.wins++;
                    } else {
                        AF.losses++;
                    };
                    break;
                case '1672':
                    // code for BEA
                    if (game.Victory) {
                        BEA.wins++;
                    } else {
                        BEA.losses++;
                    };
                    break;
                case '1825':
                    // code for HP
                    if (game.Victory) {
                        HP.wins++;
                    } else {
                        HP.losses++;
                    };
                    break;
                case '1911':
                    // code for M
                    if (game.Victory) {
                        M.wins++;
                    } else {
                        M.losses++;
                    };
                    break;
                default:
                    console.error(`MAP CODE NOT FOUND.`);
                    break;
            }
        });

        console.log(`SENDING MAPDATA TO CLIENT:`);
        console.log(`TOTAL: ${total}`);
        console.log(`WINS: ${wins}`);
        console.log(`LOSSES: ${losses}`);
        console.log(`ROL:`);
        console.log(RoL);
        console.log(`DS:`);
        console.log(DS);
        console.log(`TA:`);
        console.log(TA);
        console.log(`TTP:`);
        console.log(TTP);
        console.log(`BRHA:`);
        console.log(BRHA);
        console.log(`NA:`);
        console.log(NA);
        console.log(`AF:`);
        console.log(AF);
        console.log(`BEA:`);
        console.log(BEA);
        console.log(`HP:`);
        console.log(HP);
        console.log(`M:`);
        console.log(M);


        return res.json({
            success: true,
            total: total,
            wins: wins,
            losses: losses,
            RoL: RoL,
            DS: DS,
            TA: TA,
            TTP: TTP,
            BRHA: BRHA,
            NA: NA,
            AF: AF,
            BEA: BEA,
            HP: HP,
            M: M,
        });
    });
});


router.get('/mmrdata', async (req, res) => {
    console.log(`mmrdata endpoint hit from ip: ${req.ip}, processing request...`);
    const { id } = req.query || req.body;
    console.log(`id: ${id}`);

    Arena.findById(id, function (err, doc) {
        if (err) return res.json({
            success: false,
            error: err
        });
        console.log(`Sending document ${id} to client.`);
        let data = [{
            id: "MMR",
            data: [],
        },
        {
            id: "Enemy MMR",
            data: [],
        }];

        doc.games.forEach(game => {
            let MMR = {
                x: game.Timestamp,
                y: game.MMR,
            };
            let EnemyMMR = {
                x: game.Timestamp,
                y: game.EnemyMMR,
            };
            data[0].data.push(MMR);
            data[1].data.push(EnemyMMR);
        });
        console.log(JSON.stringify(data));
        data[0].data.reverse();
        data[1].data.reverse();

        return res.json({
            success: true,
            data: data,
        });
    });
});

// {
//     id: "MMR",
//     data: [
//       {
//         x: 1547732654,
//         y: 2240
//       },
//     ]
//   },
//   {
//       id: "Enemy MMR",
//       data: [
//         {
//           x: 1547732654,
//           y: 2262
//         },
//       ]
// },

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`));