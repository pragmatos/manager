const conf = require('../config');


exports.isAuth = (req, res, next)=>{
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {      
    		if (err) {
        		return res.json({ success: false, message: 'Failed to authenticate token.' });    
      		} else {
	        	req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});
}