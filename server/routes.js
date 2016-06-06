const middleware = require('./middlewares/auth');

const channels = require('./routes/channels');
const users = require('./routes/users');

module.exports = function(app, express) {
	var router = express.Router();

    router.get('/channels', channels.getAll);
	router.post('/channels', channels.post);

	router.post('/users/signup', users.signup, users.login);
	router.post('/users/login', users.login);
	router.get('/users/profile', middleware.isAuth, users.profile);
	

	//admin
	router.route('/users')
		.get(middleware.isAuth, middleware.isAdmin, users.all)
	router.route('/users/:id')
		.get(middleware.isAuth, users.getOne)
		.delete(middleware.isAuth, middleware.isAdmin, users.deleteOne);	
	//router.get('/users', middleware.isAuth, middleware.isAdmin, users.all);
	//router.get('/users/:id', users.getOne);
	//router.post();
	//router.delete('/users/:id', users.deleteOne);




	//router.post('/login', middleware.login);
	router.get('/token', middleware.isAuth)

    return router;    
};