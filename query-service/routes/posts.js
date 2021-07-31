const express=require('express');
const UserPost=require('../model/userPost');
const Router=express();

Router.get('/',async (req,res)=>{
   const cursor= await UserPost.find().cursor();
   const response=[];
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        response.push(doc);
      }
        
    res.status(200).json(response);
   
})

module.exports=Router;


