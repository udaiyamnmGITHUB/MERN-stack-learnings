const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        min: 3,
        min: 15
    },
    lastName:{
        type: String,
        required: true,
        min: 3,
        min: 15
    },
    email:{
        type: String,
        required: true,
        unique: true,
        min: 3,
        min: 15
    },
    password:{
        type: String,
        required: true,
        min: 8,
        min: 15
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);
