const express=require('express');
const axios=require('axios');
const Router=express();

Router.post('/posts',(req,res,next)=>{
    const body=req.body;
    console.log('new Post')
    console.log(body)
   // axios.post('http://localhost:8002/events/post',body);
   res.status(201).json({message:'success'});
})

Router.post('/comment',(req,res,next)=>{
    console.log('comment revieved')
    const body=req.body;
    console.log(req.body);
    res.status(201);
    //axios.post('http://localhost:8002/events/comment',body);
    res.status(201).json({message:'success'});
})
module.exports = Router;
