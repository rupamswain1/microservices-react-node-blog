const express=require('express');
const app=express()
const mongoose=require('mongoose');
const cors=require('cors')
const eventRoutes=require('./routes/eventRoutes');
const allPostRouter=require('./routes/posts');
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

mongoose.connect('mongodb+srv://rupam123:rupam123@nodecluster.plaky.mongodb.net/MicroserviceBlogBD?retryWrites=true&w=majority')
.then(result=>{
    app.listen(8002,()=>{
        console.log('Querry Service started on 8002');
    })
})