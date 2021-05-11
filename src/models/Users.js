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
    email:{
        type: String,
        unique:true,
        require: true,
        lowercase: true,
    },
    password:{
        type: String,
        require: true,
        select: false, //select false indica que o campo password não vai ser exibido numa listagem de usuários
    },
    passwordResetToken:{
        type: String,
        select: false,
    },
    passwordResetExpires:{
        type: Date,
        select: false,
    },
    createAt:{
        type: Date,
        default: Date.now,
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
