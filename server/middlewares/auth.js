const config = require('../config');
const jwt 	 = require('jsonwebtoken');
const User   = require('../models/user.js');

exports.isAuth = (req, res, next)=>{
	
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if(token){
		
		jwt.verify(token, config.secret, function(err, decoded) { 
			console.log(err);
			if(err) {
				res.status(403).send({ success: false, message: 'Failed to auth'});
			
			} else {
				
				req.decoded = decoded;

				next();
			}
		});

	} else{
		
		res.status(403).send({ success: false, message: 'Bad token.' });
	
	}
}

exports.isAdmin = (req, res, next)=>{
	
	if(req.decoded.admin) {

		next();
    } else {
    	res.status(403).send( {success: false, message: 'You are not admin!' });
    }
	
}