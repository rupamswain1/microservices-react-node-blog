const express=require('express');
const PostEvent=require('../model/postEvent');
const commentEvent=require('../model/commentEvent');

const Routes=express();

Routes.get('/postEvent',async (req,res)=>{
    const cursor=await PostEvent.find().cursor();
    const response=[];
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        console.log(doc)
        response.push(doc);
    }
    console.log(response);
    res.status(200).json(response)
})

Routes.delete('/deletePostsEvents',async(req,res)=>{
    const postToDelete=req.body.postToDelete;
    PostEvent.deleteMany({_id:postToDelete})
    .then(e=>{
        console.log('all post events deleted')
        res.status(200).json()
    })
})

Routes.delete('/deleteCommentEvents',async(req,res)=>{
    const postToDelete=req.body.comment;
    commentEvent.deleteMany({_id:postToDelete})
    .then(e=>{
        console.log('all post events deleted')
    })
})

Routes.get('/commentevents',async (req,res)=>{
    const cursor=await commentEvent.find().cursor();
    const response=[];
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        console.log(doc)
        response.push(doc);
    }
    console.log(response);
    res.status(200).json(response)
})
module.exports=Routes