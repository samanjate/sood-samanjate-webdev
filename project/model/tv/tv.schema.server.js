var mongoose = require('mongoose');
var TvSchema = mongoose.Schema({
    tmdbId: String,
    name: String,
    poster_path: String,
    totalRatings: Number,
    numOfRatings: Number,
    dateCreated: {type:Date, default: Date.now()}

}, {collection: 'project.tv.gomovies'});

module.exports = TvSchema;