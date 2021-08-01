const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const postSchema=new Schema({
    addedOn:{
        type:Date,
    },
    title:{type:String, required: true},
    content:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('PostEvent',postSchema);