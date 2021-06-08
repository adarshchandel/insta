const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

let userSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        require:true
    }
})

module.exports =mongoose.model('User',userSchema);