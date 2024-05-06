const mongoose =require ("mongoose")

const postSchema = new mongoose.Schema({
    Title : {
        type : String, 
        required: true,
        min: 6,
        max: 255,
    },
    Description : {
        type : String, 
        required: true,
        min: 6,
        max: 255,
    },
    DatePost : {
        type : Date,
        required: true,
    },
    IsValid: {
        type: Boolean,
        required: true,
        },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    LinkImage: {
        type : String, 
        required : true,
    },
}, )
module.exports = mongoose.model("Post" , postSchema);