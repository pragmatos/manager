const Type = require('../models/type');

module.exports = (function() {
    return {
        getAll : function(req, res){
            var query = Type.find({});
            query.exec(function(err, types){
                if(err) res.send(err);
                res.json(types);
            });
        },
        post: function(req, res){
            var newChannel = new Type(req.body);
            newChannel.save(function(err){
                if(err) res.send(err);
                res.json(req.body);
            });
        },
        getOne: function(req, res){
            Type.findById(req.params.id, function(err, type){
                if(err) res.send(err);
                res.json(type);
            });     
        },
        deleteOne: function(req, res) {
             Type.findOneAndRemove({_id: req.params.id}, function(err,user){
                if(err) res.send(404);
                res.json(user);
            });
        }
    }
})();  