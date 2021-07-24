const express=require('express');

const Router=express();
const Comment=require('../models/comments');

Router.post('/:id',(req,res)=>{
    const postId=req.params.id;
    Comment.findOne({postId:postId})
        .then(commentObj=>{
            if(commentObj){
                return Comment.updateOne({postId:postId},{$push:{comments:{comment:req.body.comment}}})
            }
            else{
                return new Comment({postId:postId,comments:[{comment:req.body.comment}]}).save();
            }
        })
        .then(result=>{
            Comment.findOne({postId:postId})
            .then(obj=>{
                res.status(201).json(obj);
            })
        }).
        catch(err=>{
            res.status(500).json(err)
        })
})

Router.get('/:id',(req,res)=>{
    const postId=req.params.id;
    Comment.findOne({postId:postId})
            .then(obj=>{
                if(obj){
                    res.status(201).json(obj);
                }
                else{
                    res.status(404).json({postId:postId,mesage:'No Comments found'});
                }
                
            })
});

module.exports=Router;