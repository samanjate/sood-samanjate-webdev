var mongoose = require('mongoose');
var AudienceSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    bio: String,
    profilePic: String,
    //movie user wants to see
    wantToSee: [
        {
            id: String,
            original_title: String,
            poster_path: String,
            vote_average: Number
        }],
    wantToSeeTv: [
        {
            id: String,
            original_name: String,
            poster_path: String,
            vote_average: Number
        }],
    // movies rated by users
    ratings: [ {type: mongoose.Schema.Types.ObjectId, ref:'project.rating.gomovies'}],
    follows: [{type: mongoose.Schema.Types.ObjectId, ref:'project.critic.gomovies'}],
    dateCreated: {type:Date, default: Date.now()}

}, {collection: 'project.audience.gomovies'});

module.exports = AudienceSchema;