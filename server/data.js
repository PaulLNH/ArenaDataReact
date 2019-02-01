// /server/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be the database's data structure 
// Timestamp;Map;PlayersNumber;TeamComposition;EnemyComposition;Duration;Victory;KillingBlows;Damage;Healing;Honor;RatingChange;MMR;EnemyMMR;Specialization;isRated
const DataSchema = new Schema(
  {
    id: String,
    message: String,
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);

// user: {
//     id: Number,
//     Timestamp: Number,
//     Map: Number,
//     PlayersNumber: Number,
//     TeamComposition: Array,
//     EnemyComposition: Array,
//     Duration: Number,
//     Victory: Boolean,
//     KillingBlows: Number,
//     Damage: Number,
//     Healing: Number, 
//     Honor: Number,
//     RatingChange: Number,
//     MMR: Number,
//     EnemyMMR: Number,
//     Specialization: String,
//     isRated: Boolean,
// },