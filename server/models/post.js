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
        max: 1000,
    },
    DatePost : {
        type : Date,
        required: true,
    },
    IsValid: {
        type: Boolean,
        required: true,
        default:false,
        },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    LinkImage: {
        type : String, 
        required : true,
    },
}, )
module.exports = mongoose.model("Post" , postSchema);