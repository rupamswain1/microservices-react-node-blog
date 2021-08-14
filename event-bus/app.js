const express=require('express');
const mongoose=require('mongoose');
const getEvents=require('./routes/getRoutes');
const app=express();
const eventRouter=require('./routes/eventRoute');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/events',eventRouter);
app.use('/getAll',getEvents)
//create end points to get data from EventDBs
mongoose.connect('mongodb://rupam123:rupam123@nodecluster-shard-00-00.plaky.mongodb.net:27017,nodecluster-shard-00-01.plaky.mongodb.net:27017,nodecluster-shard-00-02.plaky.mongodb.net:27017/MicroserviceBlogBD?ssl=true&replicaSet=atlas-t1w1wl-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(result=>{
    app.listen(8005,()=>{
        console.log('Event Bus started on port 8005');
    })
})
