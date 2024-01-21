const express = require('express');
const mongoose=  require('mongoose');
const cookieParser=require('cookie-parser');
require('dotenv').config()

const conn= require('./database/conn/db');
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:5173'}));

const routes=require('./routes/authRoute');

app.get('/',(req,res)=>{
    res.send('hello');


})


// app.get('/register',(req,res)=>{
//     res.send('hii')
// })
app.listen(3000,()=>{
    console.log('server listing at 3000')
})
app.use(routes);