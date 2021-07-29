const express=require('express');
const Router=express();
const UserPost=require('../model/userPost');

Router.post('/newPost',(req,res)=>{
    console.log(req.body.title)
    const postId=req.body.postId;
    const title=req.body.title;
    const content=req.body.content;

    const post=new UserPost({postId:postId, title:title, content:content});
    post.save()
    .then(result=>{
        res.status(201).json({message:'success'});
    })
    .catch(err=>console.log(err));
})

Router.post('/newComment',(req,res)=>{
    const commentId=req.body.commentId;
    const postId=req.body.postId;
    const comment=req.body.comment;

    UserPost.findOne({postId:postId})
        .then(commentObj=>{
            if(commentObj){
                return UserPost.updateOne({postId:postId},{$push:{comments:{comment:req.body.comment,commentId:req.body.commentId}}})
            }
            else{
                return new UserPost({postId:postId,comments:[{comment:req.body.comment}]}).save();
            }
        })
        .then(done=>{
            res.status(201).json({message:"success"})
        })
})
//connect to eventBuss
module.exports=Router;