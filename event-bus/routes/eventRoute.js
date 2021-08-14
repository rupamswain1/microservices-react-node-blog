const express=require('express');
const axios=require('axios');
const Router=express();
const Post=require('../model/postEvent');
const Comment=require('../model/commentEvent');
Router.post('/posts',(req,res,next)=>{
    const body=req.body;
    //console.log('new Post')
    //console.log(body)
    new Post({_id:req.body._id,title:req.body.title,content:req.body.content,addedOn:req.body.addedOn,action:'new'}).save()
    .then(eventres=>{
        return axios.post('http://query-cluster-service:8002/events/newPost',body)
    })
    .then(response=>{
        if(response.status===201){
            Post.findOneAndDelete({_id:req.body._id})
            .then(done=>{
                res.status(201).json({message:'success'});
            })
            
        }
        else{
            res.status(500).json({error:response.data.error})
        }
    })
    .then(eventUpdate=>{
        console.log('deleted post event from DB');
    })
    .catch(err=>{
        //console.log()
        //res.status(500).json({error:err.response.data.error})
        res.send({});
    })
   
})

Router.post('/comment',(req,res,next)=>{
    console.log('comment revieved')
    const body=req.body;
    console.log(req.body);
    res.status(201);
    new Comment({postId:req.body.postId,action:'new',comments:[{comment:req.body.comment,addedOn:req.body.addedOn,_id:req.body.commentId}]}).save()
    .then(eventUpdate=>{
        return axios.post('http://query-cluster-service:8002/events/newComment',body)
    })
    .then(response=>{
        if(response.status===201){
            //console.log(req.body.postId)
            //console.log(req.body.commentId)
            Comment.findOneAndDelete({postId:req.body.postId},{comments:{commentId:req.body.commentId}})
            .then(done=>{
                res.status(201).json({message:'success'});
            })
            
        }
        else{
            res.status(500).json({error:err.response.data.error})
        }
    })
    .catch(err=>{
        console.log("Failed in Querry Service")
       // console.log(err.response.data.error)
        //res.status(500).json({error:err.response.data.error})
        res.send({})
    })
})
module.exports = Router;