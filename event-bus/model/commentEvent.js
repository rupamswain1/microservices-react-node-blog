const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const commetSchema=new Schema({
    postId:{
        type: String,
        required:true
    },
    comments:[
        {comment:String,addedOn:{
            type:Date,
            
        }},
    ]
})
module.exports=mongoose.model('CommentEvent',commetSchema);