const express=require('express');
const axios=require('axios');
const Router=express();

Router.post('/posts',(req,res,next)=>{
    const body=req.body;
    //console.log('new Post')
    //console.log(body)
    axios.post('http://localhost:8002/events/newPost',body)
    .then(response=>{
        if(response.status===201){
            res.status(201).json({message:'success'});
        }
        else{
            res.status(500).json({error:response.data.error})
        }
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
    axios.post('http://localhost:8002/events/newComment',body)
    .then(response=>{
        if(response.status===201){
            res.status(201).json({message:'success'});
        }
        else{
            res.status(500).json({error:err.response.data.error})
        }
    })
    .catch(err=>{
        console.log(err.response.data.error)
        //res.status(500).json({error:err.response.data.error})
        res.send({})
    })
})
module.exports = Router;
