const { Schema, model } = require('mongoose');

    /*********************************
     * nameFirst
     * lastName
     * birthdate
     * bio
     * photos [Array]
     *** photoId
     *** photoUrl
     *** photoUploadedAt
     *** photoLikes
     * phoneNumber
     * tribe
     * interestedIn [Array]
     *** id
     *** name
     * likes [Array]
     *** id
     * Dislikes [Array]
     *** id
     * Locations [Array]
     *** lat,lng
     *** date
     * lastActivity
    *********************************/

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Users', UsersSchema);
