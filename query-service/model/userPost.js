const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const userPostSchema=new Schema({
    postId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:String,
    addedOn:{
            type:Date,
    },
    comments:[
        {
            comment:String,
            addedOn:{
            type:Date,
            },
            commentId:String
        },
    ]
});

module.exports=mongoose.model('UserPost',userPostSchema);