// /server/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be the database's data structure 
// Timestamp;Map;PlayersNumber;TeamComposition;EnemyComposition;Duration;Victory;KillingBlows;Damage;Healing;Honor;RatingChange;MMR;EnemyMMR;Specialization;isRated
const DataSchema = new Schema(
  {
    games: [{
        timestamp: {
            type: Number, 
            required: [true, "can't be blank"], 
            min: 1000000000,
            max: 9999999999,
            index: true,
            unique: true,
        },
        map: Number,
        playersNumber: Number,
        teamComposition: String,
        enemyComposition: String,
        duration: Number,
        victory: Boolean,
        killingBlows: Number,
        damage: Number,
        healing: Number,
        honor: Number,
        ratingChange: Number,
        MMR: Number,
        enemyMMR: Number,
        specialization: String,
        rated: Boolean,
    }],
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Arena", DataSchema);