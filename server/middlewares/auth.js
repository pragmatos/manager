const conf = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

exports.isAuth = (req, res, next)=>{
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if(token){
		jwt.verify(token, conf.secret, function(err, decoded) { 
			if(decoded.login && decoded._id){
				next();
			}
			
		});
	}
	else{
		res.status(403).send({ success: false, message: 'Bad token.' });
	}
}

exports.login = (req, res, next)=>{
	if(req.body.login && req.body.pass){
        User.findOne({login: req.body.login, pass: req.body.pass}, function(err, user){
            if(err) res.send("error");
            if(user){
            	var Token = jwt.sign({_id : user._id, login: user.login, admin: user.admin}, conf.secret);
				res.send({ token: Token, user : user });
            }
            else
            	res.json({ success: false, message: 'Bad login/pass' });
        });
    }
	
}