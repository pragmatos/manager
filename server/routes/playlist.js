const Playlist = require('../models/playlist');

module.exports = (function() {
    return {
        getAll : function(req, res){
            var query = Playlist.find({user: req.decoded._id}).populate('channel');
            query.exec(function(err, channels){
                if(err) res.send(err);
                res.json(channels);
            });
        },
        post: function(req, res){
        	var newPlaylist = new Playlist({
        		channel: req.body.id,
        		user: req.decoded._id
        	});

        	newPlaylist.save(function(err, playlist) {
        		if(err) res.send(err);
        		res.send(playlist);
        	});
    	},
        deleteOne: function(req, res) {
             Playlist.findOneAndRemove({_id: req.params.id}, function(err,cat){
                if(err) res.send(404);
                res.json(cat);
            });
        },

	}
})();
