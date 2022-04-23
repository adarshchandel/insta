const express =require('express');
const post = require('./postRoutes');
const user = require('./userRoutes');

const route =express.Router();
console.log('router working');


route.use('/post',post);
route.use('/user',user)


module.exports =route;