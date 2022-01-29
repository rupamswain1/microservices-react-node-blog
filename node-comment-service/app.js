const express=require('express');
const cors=require('cors');
const app=express();
const mongoose=require('mongoose');
const commentRouter=require('./routes/comments')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', "OPTIONS,GET,POST,PUT,PATCH,DELETE");
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

app.use('/comments',commentRouter);

mongoose.connect('')//Enter the mongoDB key here
.then(result=>{
    app.listen(8001,()=>{
        console.log('server started on 8001');
    })
})
