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
            name: String,
            id: String,
            rating: Number,
            poster_path: String
        }
    ],
    // movies rated by users
    ratings: [
        {
            name: String,
            id: String,
            rating: Number,
            poster_path: String
        }
    ],
    follows: [
        {
            criticId: String,
            username: String,
            profilePic: String
        }
    ],
    dateCreated: {type:Date, default: Date.now()}

}, {collection: 'project.audience.gomovies'});

module.exports = AudienceSchema;