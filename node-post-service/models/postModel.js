const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const postSchema=new Schema({
    addedOn:{
        type:Date,
        default:Date.now,
    },
    title:{type:String, required: true},
    content:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('Posts',postSchema);