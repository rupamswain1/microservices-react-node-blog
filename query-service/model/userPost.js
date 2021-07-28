const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const userPostSchema=new Schema({
    postId:{
        value:String,
        required:true
    },
    title:{
        value:String,
        required:true
    },
    content:String,
    addedOn:{
            type:Date,
            default:Date.now,
    },
    comments:[
        {
            comment:String,
            addedOn:{
            type:Date,
            default:Date.now,
            },
            commentId:String
        },
    ]
});

module.exports=mongoose.model('UserPost',userPostSchema);