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
        require: false, // VB: Setei como false, remover depois
        lowercase: true,
    },
    password:{
        type: String,
        require: false, // VB: Setei como false, remover depois
        select: false, //OB: select false indica que o campo password não vai ser exibido numa listagem de usuários
    },
    passwordResetToken:{
        type: String,
        require: false, // VB: Setei como false, remover depois
        select: false,
    },
    passwordResetExpires:{
        type: Date,
        require: false, // VB: Setei como false, remover depois
        select: false,
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
    },
    likes: [{
        type: String,
    }],
    dislikes: [{
        type: String
    }],
    blocked: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = model('Users', UsersSchema);
