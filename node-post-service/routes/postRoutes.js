const express=require('express');
const Posts=require('../models/postModel');
const Router=express();
const axios = require('axios')

Router.post('/',(req,res,next)=>{
    console.log(req.body.title)
    let results={};
    new Posts({title:req.body.title, content:req.body.content}).save()
    .then(result=>{
        const body={
            title:result.title,
            addedOn:result.addedOn,
            content:result.content,
            _id:result._id
        }
        results=body;
        console.log('emtted to event bus for post create')
        return axios.post('http://localhost:8005/events/posts',body)
        
      
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
        console.log(err),
        res.status(500).json({error:err});
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