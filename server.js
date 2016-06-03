'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./server/config');
const app = express();

mongoose.connect(config.database); 

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


//routes for api
const apiRouter = require('./server/routes');
app.use('/api', apiRouter);

app.get('/',(req,res)=>{
	console.log('/вв');
	res.sendFile('index.html');
});
app.get('/admin',(req,res)=>{
	console.log('/ввq');
	res.sendFile('admin.html',{'root':__dirname+'/public/'});
});

app.listen(3333, ()=>{
	console.log('good');
});
