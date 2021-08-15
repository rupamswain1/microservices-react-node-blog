const express=require('express');
const PostEvent=require('../model/postEvent');
const commentEvent=require('../model/commentEvent');

const Routes=express();

Routes.get('/postEvent',async (req,res)=>{
    const cursor=await PostEvent.find().cursor();
    const response=[];
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        //console.log(doc)
        response.push(doc);
    }
    //console.log(response);
    res.status(200).json(response)
})

Routes.post('/deletePostsEvents',async(req,res)=>{
    const postToDelete=req.body;
   
    PostEvent.deleteMany({_id:{$in:postToDelete}})
    .then(e=>{
        console.log('all post events deleted')
        res.status(200).json()
    })
})

Routes.post('/deleteCommentEvents',async(req,res)=>{
    //const postToDelete=req.body;
    console.log(req.body)
    commentEvent.deleteMany({postId:{$in:req.body}})
    .then(e=>{
        console.log('all comment events deleted')
    })
})

Routes.get('/commentevents',async (req,res)=>{
    const cursor=await commentEvent.find().cursor();
    console.log(">>get comment from event bus called")
    const response=[];
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
       // console.log(doc)
        response.push(doc);
    }
    console.log(response);
    res.status(200).json(response)
}) 
module.exports=Routes