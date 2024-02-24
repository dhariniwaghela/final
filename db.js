//connect to mongodb 

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

const mongoURI = process.env.MONGODB_URL;

const InitiateMongoServer = async()=>{
    try{
        await mongoose.connect(mongoURI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("connected to database")
        importData();
    }
    catch(e){
        console.log(e);
        throw e;
    }
};

module.exports= InitiateMongoServer;