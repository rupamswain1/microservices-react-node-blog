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
    axios.get('http://event-srv:8005/getAll/postEvent')
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
        return axios.post("http://event-srv:8005/getAll/deletePostsEvents",processedPosts)
    })
    .then(postDeleted=>{
        console.log("<<<<<<<<<<<<<<<<<<<<<<<< Syncing COMMENTS >>>>>>>>>>>>>>>>>>>>>>>>");
        axios.get('http://event-srv:8005/getAll/commentevents')
        .then(comments=>{
            comments.data.map(comment=>{
                //console.log(comment)
                const body={
                    postId:comment.postId,
                    comment:comment.comments[0].comment,
                    commentId:comment.comments[0]._id,
                    addedOn:comment.comments[0].addedOn
                }
                console.log("Calling new comment of querry service")
                //return axios.post('http://query-cluster-service:8002/events/newComment',body)
                console.log(body.postId)
                Posts.findOne({postId:body.postId})
                    .then(commentObj=>{
                        console.log("comment object found >>>>>>",commentObj)
                        if(commentObj){
                            
                            return Posts.updateOne({postId:body.postId},{$push:{comments:{comment:body.comment,commentId:body.commentId,addedOn:body.addedOn}}})
                        }
                        else{
                            return new Posts({postId:body.postId,comments:[{comment:body.comment,commentId:body.commentId,addedOn:body.addedOn}]}).save();
                        }
                    })
                    .then(done=>{
                        console.log('===================================================================')
                        console.log("Object Returned after adding on Query DB: ",done)
                        processedComments.push(body.postId);
                        console.log("Processed Comments: ",processedComments)
                        axios.post("http://event-srv:8005/getAll/deleteCommentEvents",processedComments)
                        processedComments.pop();
                    })
                    .catch(err=>{
                        console.log("Some Error has occured")    
                        console.log(err)
                        //res.status(500).json({error:err._message+' error is in Query service, /newComment'});
                        //res.send({});
                    });
               
            })
           
            resolve('pass')
        })
    })
    .catch(err=>console.log(err));
    })
    
}
mongoose.connect('mongodb://rupam123:rupam123@nodecluster-shard-00-00.plaky.mongodb.net:27017,nodecluster-shard-00-01.plaky.mongodb.net:27017,nodecluster-shard-00-02.plaky.mongodb.net:27017/MicroserviceBlogBD?ssl=true&replicaSet=atlas-t1w1wl-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(result=>{
    //change syncWithEvents to promise
    syncWithEvents()
    .then(done=>{
        app.listen(8002,()=>{
            console.log('Querry Service started on 8002');
        })
    })
    
})