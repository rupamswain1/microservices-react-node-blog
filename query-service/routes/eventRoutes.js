const express=require('express');
const Router=express();
const UserPost=require('../model/userPost');

Router.post('/newPost',(req,res)=>{
    const postId=req.body.postId;
    const title=req.body.title;
    const content=req.body.content;

    const post=new UserPost({postId:postId, title:title, content:content});
    post,save()
    .then(result=>{
        res.status(201).json(message:'success');
    })
    .catch(err=>console.log(err));
})

Router.post('/newComment',(req,res)=>{
    const commentId=req.commentId,
    const postId=req.postId,
    const comment=req.comment,

    UserPost.findOne({postId:postId})
        .then(commentObj=>{
            if(commentObj){
                return Comment.updateOne({postId:postId},{$push:{comments:{comment:req.body.comment}}})
            }
            else{
                return new Comment({postId:postId,comments:[{comment:req.body.comment}]}).save();
            }
        })
        .then(done=>{
            res.status(201).json({"message done"})
        })
})
//connect to eventBuss
module.exports=Router;