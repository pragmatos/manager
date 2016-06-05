const jwt = require('jsonwebtoken');
const config = require('../config');

exports.createToken = function(user){
	
	var token = jwt.sign({ 
		_id : user._id,
		login: user.login,
		admin: user.admin
	}, config.secret);

	return token;
}