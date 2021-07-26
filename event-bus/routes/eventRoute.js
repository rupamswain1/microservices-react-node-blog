const express=require('express');
const axios=require('axios');
const Router=express();

Router.post('/',(req,res,next)=>{
    const body=req.body;
    axios.post('http://localhost:8000/events',body);
    axios.post('http://localhost:8001/events',body);
    axios.post('http://localhost:8002/events',body);
})


module.exports = Router;
