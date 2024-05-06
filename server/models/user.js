let mongoose = require('mongoose'); 
let userSchema  = new mongoose.Schema({
    firstname : {
        type: String,
        required : true,
    } ,
    lastname: {
        type: String,
        required : true,
    } ,
    email : {
        type: String,
        required : true,
    } ,
    password: {
        type: String,
        required : true,
    } ,
    role : {
        type: Number,
        required : true,
    } ,
    LinkImage : {
        type : String,
        required : true
    },
    Posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }],
})
module.exports = mongoose.model('Users', userSchema)