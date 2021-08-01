const express=require('express');
const Router=express();
const UserPost=require('../model/userPost');

Router.post('/newPost',(req,res)=>{
    console.log(req.body)
    const postId=req.body._id;
    const title=req.body.title;
    const content=req.body.content;
    const addedOn=req.body.addedOn;
    const post=new UserPost({postId:postId, title:title, content:content,addedOn:addedOn});
    post.save()
    .then(result=>{
        res.status(201).json({message:'success'});
    })
    .catch(err=>{    
        console.log(err._message)
       //console.log('error occured')
        //res.status(500).json({error:err._message+' error is in Query service, /newPost'});
        res.send({});
    });
})

Router.post('/newComment',(req,res)=>{
    const commentId=req.body.commentId;
    const postId=req.body.postId;
    const comment=req.body.comment;
    console.log(req.body)
    UserPost.findOne({postId:postId})
        .then(commentObj=>{
            if(commentObj){
                
                return UserPost.updateOne({postId:postId},{$push:{comments:{comment:req.body.comment,commentId:req.body.commentId,addedOn:req.body.addedOn}}})
            }
            else{
                return new UserPost({postId:postId,comments:[{comment:req.body.comment,commentId:req.body.commentId,addedOn:req.body.addedOn}]}).save();
            }
        })
        .then(done=>{
            res.status(201).json({message:"success"})
        })
        .catch(err=>{    
            console.log(err._message)
            //res.status(500).json({error:err._message+' error is in Query service, /newComment'});
            res.send({});
        });
})
//connect to eventBuss
module.exports=Router;