var mongoose = require('mongoose');
var CriticSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    bio: String,
    profilePic: String,
    userType: {type:String, enum:['critic']},
    // movies rated by users
    ratings: [ {type: mongoose.Schema.Types.ObjectId, ref:'project.rating.gomovies'}],
    reviews: [ {type: mongoose.Schema.Types.ObjectId, ref:'project.review.gomovies'}],
    dateCreated: {type:Date, default: Date.now()}

}, {collection: 'project.critic.gomovies'});

module.exports = CriticSchema;