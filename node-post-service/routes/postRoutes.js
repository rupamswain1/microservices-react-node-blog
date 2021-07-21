const express=require('express');
const Posts=require('../models/postModel');
const Router=express();


Router.post('/',(req,res,next)=>{
    console.log(req.body.title)
    new Posts({title:req.body.title, content:req.body.content}).save()
    .then(result=>{
        res.status(201).json({title:result.title,content:result.content,addedOn:result.addedOn});
    })
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