const Channel = require('../models/channel');

module.exports = (function() {
    return {
        getAll : function(req, res){
            var query = Channel.find({});
            query.exec(function(err, superheroes){
                if(err) res.send(err);
                res.json(superheroes);
            });
        },
        post: function(req, res){
            var newChannel = new Channel(req.body);
            newChannel.save(function(err){
                if(err) res.send(err);
                res.json(req.body);
            });
        },
        getOne: function(req, res){
            Superhero.findById(req.params.id, function(err, superhero){
                if(err) res.send(err);
                //If no errors, send it back to the client
                res.json(superhero);
            });     
        }
    }
})();  