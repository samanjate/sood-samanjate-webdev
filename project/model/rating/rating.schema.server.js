var mongoose = require('mongoose');
var RatingSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'project.audience.gomovies'},
    criticId: {type: mongoose.Schema.Types.ObjectId, ref:'project.critic.gomovies'},
    movieId: {type: mongoose.Schema.Types.ObjectId, ref:'project.movie.gomovies'},
    tvId: {type: mongoose.Schema.Types.ObjectId, ref:'project.tv.gomovies'},
    rating: Number,
    name: String,
    dateCreated: {type:Date, default: Date.now()}

}, {collection: 'project.rating.gomovies'});

module.exports = RatingSchema;