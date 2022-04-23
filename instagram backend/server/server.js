const express =require('express');
const app =express();
app.use(express.json());
let body_parser =require('body-parser');
const v1 = require('./v1/routes');
const http = require('http');
const path =require('path');
const cors =require('cors');
require('./mongo');


app.use(cors());
app.options('*',cors())
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,x-requested-with, Accept,Authorization,token");
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    next();
});


let server = http.createServer(app).listen(8000,()=>{
    console.log('server connnect')
}) 
app.use('/v1',v1);


app.use(body_parser.json());
app.use(body_parser.urlencoded({extented:true}));
app.use('/static' ,express.static(path.join(__dirname,"/uploads")));