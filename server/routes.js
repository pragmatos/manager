const middleware = require('./middlewares/auth');

const channels = require('./routes/channels');
const users = require('./routes/authentication');

module.exports = function(app, express) {
	var router = express.Router();

    router.get('/channels', channels.getAll);
	router.post('/channels', channels.post);

	router.post('/users/signup', users.signup);
	router.post('/users/signin', users.signin);
	router.get('/users', middleware.isAuth, users.all);
	router.get('/users/:id', users.getOne);
	router.delete('/users/:id', users.deleteOne);




	router.post('/login', middleware.login);
	router.get('/token', middleware.isAuth)

    return router;    
};