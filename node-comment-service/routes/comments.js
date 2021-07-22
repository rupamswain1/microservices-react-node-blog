const express=require('express');

const Router=express();

Router.post('/:id',(req,res)=>{
    console.log(req.params.body);
})

Router.get('/:id',(req,res)=>{
    console.log(req.params.id);
});

module.exports=Router;