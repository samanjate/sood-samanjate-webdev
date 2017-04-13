var mongoose = require('mongoose');
var MovieSchema = mongoose.Schema({
    id: String,
    original_title: String,
    poster_path: String,
    totalRatings: Number,
    numOfRatings: Number,
    vote_average: Number,
    dateCreated: {type:Date, default: Date.now()}

}, {collection: 'project.movie.gomovies'});

module.exports = MovieSchema;