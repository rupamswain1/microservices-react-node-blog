const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const commetSchema=new Schema({
    postId:{
        type: String,
        required:true
    },
    comments:[
        {comment:String},
    ]
})
module.exports=mongoose.model('CommentMaster',commetSchema);