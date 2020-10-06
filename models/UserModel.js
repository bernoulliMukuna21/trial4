let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date,
    }
});

UserSchema.methods.comparePassword = function(){
    console.log('I can call this function');
};

let UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel;