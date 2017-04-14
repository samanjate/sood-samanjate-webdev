var mongoose = require('mongoose');
var ReviewSchema = mongoose.Schema({
    criticId: {type: mongoose.Schema.Types.ObjectId, ref:'project.critic.gomovies'},
    criticName: String,
    id: String,
    type: {type: String, enum: ['tv','movie']},
    review: String,
    rating: Number,
    name: String,
    poster_path: String,
    dateCreated: {type:Date, default: Date.now()}

}, {collection: 'project.review.gomovies'});

module.exports = ReviewSchema;