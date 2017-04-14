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
    ratings: [
        {
            id: String,
            original_title: String,
            poster_path: String,
            vote_average: Number,
            rating: Number
        }],
    ratingsTv: [
        {
            id: String,
            original_name: String,
            poster_path: String,
            vote_average: Number,
            rating: Number
        }],
    reviews: [ {type: mongoose.Schema.Types.ObjectId, ref:'project.review.gomovies'}],
    dateCreated: {type:Date, default: Date.now()}

}, {collection: 'project.critic.gomovies'});

module.exports = CriticSchema;