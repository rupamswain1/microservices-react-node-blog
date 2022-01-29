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
mongoose.connect('')//Enter the mongoDB key here
.then(result=>{
    app.listen(8005,()=>{
        console.log('Event Bus started on port 8005');
    })
})
