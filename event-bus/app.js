const express=require('express');
const mongoose=require('mongoose')
const app=express();
const eventRouter=require('./routes/eventRoute');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/events',eventRouter);
//create end points to get data from EventDBs
mongoose.connect('mongodb+srv://rupam123:rupam123@nodecluster.plaky.mongodb.net/MicroserviceBlogBD?retryWrites=true&w=majority')
.then(result=>{
    app.listen(8005,()=>{
        console.log('Event Bus started on port 8005');
    })
})
