// /server/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be the database's data structure 
// Timestamp;Map;PlayersNumber;TeamComposition;EnemyComposition;Duration;Victory;KillingBlows;Damage;Healing;Honor;RatingChange;MMR;EnemyMMR;Specialization;isRated
const DataSchema = new Schema(
  {
    games: [{
        Timestamp: {
            type: Number, 
            required: [true, "can't be blank"], 
            min: 1000000000,
            max: 9999999999,
        },
        Map: Number,
        PlayersNumber: Number,
        TeamComposition: String,
        EnemyComposition: String,
        Duration: Number,
        Victory: Boolean,
        KillingBlows: Number,
        Damage: Number,
        Healing: Number,
        Honor: Number,
        RatingChange: Number,
        MMR: Number,
        EnemyMMR: Number,
        Specialization: String,
        isRated: Boolean,
    }],
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Arena", DataSchema);