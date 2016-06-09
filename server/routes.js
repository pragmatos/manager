const middleware = require('./middlewares/auth');
const path		 = require('path');

const multer     = require('multer');
const channels   = require('./routes/channels');
const users 	 = require('./routes/users');
const categories = require('./routes/categories');
const playlist   = require('./routes/playlist');


const storage = multer.diskStorage({
  destination: './public/uploads/img/',
  filename: function (req, file, cb) {
    	req.file = file;
    	req.datatime = Date.now();

      cb(null, file.fieldname+"_"+req.datatime+ path.extname(file.originalname) );
    
  }
})

var upload = multer({ storage: storage });

module.exports = function(app, express) {
	var router = express.Router();

    router.route('/channels')
    	  .get(channels.getAll)
    	  .post(middleware.isAuth, upload.single('file'), channels.post);

	router.route('/channels/:id')
		  .get(channels.getOne)
		  .put(middleware.isAuth, middleware.isAdmin, channels.updateOne)
		  .delete(middleware.isAuth, middleware.isAdmin, channels.deleteOne);


	router.get('/userchannels', middleware.isAuth, channels.getUserChannels);
	router.delete('/userchannels/:id', middleware.isAuth, channels.deleteUserChannel);
	

	router.post('/users/signup', users.signup, users.login);
	router.post('/users/login', users.login);
	router.get('/users/profile', middleware.isAuth, users.profile);
	

	//admin
	router.route('/users')
		  .get(middleware.isAuth, middleware.isAdmin, users.all)
	router.route('/users/:id')
		  .get(middleware.isAuth, users.getOne)
		  .put(middleware.isAuth, middleware.isAdmin, users.updateOne)
		  .delete(middleware.isAuth, middleware.isAdmin, users.deleteOne);	
	
	router.route('/category')
		  .get(categories.getAll)
		  .post(middleware.isAuth,middleware.isAdmin, categories.post);

	router.route('/category/:id')
		  .get(categories.getOne)
		  .delete(middleware.isAuth, middleware.isAdmin, categories.deleteOne)
		  .put(middleware.isAuth, middleware.isAdmin, categories.updateOne);


	router.route('/playlist')
		  .post(middleware.isAuth, playlist.post)
		  .get(middleware.isAuth, playlist.getAll);
	router.route('/playlist/:id')
		  .delete(middleware.isAuth, playlist.deleteOne);

	router.post('/playlist/file', middleware.isAuth, playlist.createFile );

    return router;    
};