const express = require('express');
const router  = express.Router();

const channels = require('./routes/channels');
const users = require('./routes/authentication');

module.exports = (function() {
    var router = express.Router();

    router.get('/channels', channels.getAll);
	router.post('/channels', channels.post);

	router.post('/users/signup', users.signup);
	router.post('/users/signin', users.signin);
	router.get('/users', users.all);
	router.get('/users/:id', users.getOne);
	router.delete('/users/:id', users.deleteOne);

    return router;    
})();