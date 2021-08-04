const express=require('express');
const app=express()
const mongoose=require('mongoose');
const cors=require('cors');
const axios=require('axios');
const eventRoutes=require('./routes/eventRoutes');
const allPostRouter=require('./routes/posts');
const Posts=require('./model/userPost');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', "OPTIONS,GET,POST,PUT,PATCH,DELETE");
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

app.use('/events',eventRoutes);
app.use('/posts',allPostRouter);

const syncWithEvents=async ()=>{
    return new Promise((resolve,reject)=>{
        console.log("<<<<<<<<<<<<<<<<<<<<<<<< Start Syncing >>>>>>>>>>>>>>>>>>>>>>>>");
    console.log("<<<<<<<<<<<<<<<<<<<<<<<< Syncing POSTS >>>>>>>>>>>>>>>>>>>>>>>>");
    const processedPosts=[];
    const processedComments=[];
    axios.get('http://localhost:8005/getAll/postEvent')
    .then(eventPosts=>{
        //console.log(eventPosts.data.length)
        const processedPost=[]
        eventPosts.data.map(post=>{
            processedPost.push({
                postId:post._id,
                title:post.title,
                content:post.content,
                addedOn:post.addedOn,
            })
        })
       
            console.log('Inserting........................')
            return Posts.insertMany(processedPost);
        
        
    })
    .then(insertedPost=>{
        console.log("<<<<<<<<<<<<<<<<<INSERTED POSTS>>>>>>>>>>>>>>>>>>>")
        console.log(insertedPost)
        insertedPost.map(post=>{
            processedPosts.push(post.postId);
        })
        console.log(processedPosts)
        return axios.post("http://localhost:8005/getAll/deletePostsEvents",processedPosts)
    })
    .then(postDeleted=>{
        console.log("<<<<<<<<<<<<<<<<<<<<<<<< Syncing COMMENTS >>>>>>>>>>>>>>>>>>>>>>>>");
        axios.get('http://localhost:8005/getAll/commentevents')
        .then(comments=>{
            comments.data.map(comment=>{
                //console.log(comment)
                const body={
                    postId:comment.postId,
                    comment:comment.comments[0].comment,
                    commentId:comment.comments[0]._id,
                    addedOn:comment.comments[0].addedOn
                }
                //console.log(body)
                return axios.post('http://localhost:8002/events/newComment',body)
                .then(addedComment=>{
                    console.log('===================================================================')
                    console.log(addedComment)
                    processedComments.push(comment.postId);
                    console.log(processedComments)
                    axios.post("http://localhost:8005/getAll/deleteCommentEvents",processedComments)
                    processedComments.pop();
                })
            })
           
            resolve('pass')
        })
    })
    .catch(err=>console.log(err));
    })
    
}

mongoose.connect('mongodb+srv://rupam123:rupam123@nodecluster.plaky.mongodb.net/MicroserviceBlogBD?retryWrites=true&w=majority')
.then(result=>{
    //change syncWithEvents to promise
    syncWithEvents()
    .then(done=>{
        app.listen(8002,()=>{
            console.log('Querry Service started on 8002');
        })
    })
    
})