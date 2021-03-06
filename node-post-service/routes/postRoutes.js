const express=require('express');
const Posts=require('../models/postModel');
const Router=express();
const axios = require('axios')

Router.post('/',(req,res,next)=>{
    console.log(req.body.title)
    let results={};
    let postId;
    new Posts({title:req.body.title, content:req.body.content}).save()
    .then(result=>{
        const body={
            title:result.title,
            addedOn:result.addedOn,
            content:result.content,
            _id:result._id
        }
        postId=result._id;
        results=body;
        console.log('emtted to event bus for post create')
        axios.post('http://event-srv:8005/events/posts',body)
        res.status(201).json({_id:results._id,title:results.title,content:results.content,addedOn:results.addedOn});
      
    })
    .then(querrySuccess=>{
        console.log(results)
        if(querrySuccess.status===201){
            res.status(201).json({_id:results._id,title:results.title,content:results.content,addedOn:results.addedOn});
        }
        else{
            throw new Error('Event Bus is Down')
        }       
    }

    )
    .catch(err=>{
       // console.log('********************************* I threw the error**********************************')
        // Posts.findOneAndDelete({_id:postId})
        // .then(resp=>{
        //     res.status(500).json({error:err.response.data.error});
        // })
        // .catch(err=>{
        //     console.log(err)
        //     console.log('error deleting post')
        // })
       
    })
});


Router.get('/',(req,res,next)=>{
    
    Posts.find()
    .then(result=>{
        // result.forEach((data)=>{
        //     console.log(data.title)
        // })
       // res.status(200).json({result});
        res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err),
        res.status(500).json({error:err});
    })
})
module.exports = Router;