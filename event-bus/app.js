const express=require('express');

const app=express();
const eventRouter=require('./routes/eventRoute');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/events',eventRouter);

app.listen(8005,()=>{
    console.log('Event Bus started on port 8005')
})