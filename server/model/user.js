const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({

    email:{
        type: String,
        unique: true,
    },
    password:String,
    usertype:String,
})

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;