var mongoose = require('mongoose');
var ReviewSchema = mongoose.Schema({
    criticId: {type: mongoose.Schema.Types.ObjectId, ref:'project.critic.gomovies'},
    movieId: {type: mongoose.Schema.Types.ObjectId, ref:'project.movie.gomovies'},
    tvId: {type: mongoose.Schema.Types.ObjectId, ref:'project.tv.gomovies'},
    review: String,
    name: String,
    dateCreated: {type:Date, default: Date.now()}

}, {collection: 'project.review.gomovies'});

module.exports = ReviewSchema;