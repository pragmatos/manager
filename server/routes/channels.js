const Channel = require('../models/channel');

module.exports = (function() {
    return {
        getAll : function(req, res){
            var query = Channel.find({});
            query.exec(function(err, channels){
                if(err) res.send(err);
                res.json(channels);
            });
        },
        post: function(req, res){
            console.log(req.body,req.file);
            res.send(req.file);
            //var newChannel = new Channel(req.body);
            //newChannel.save(function(err){
              //  if(err) res.send(err);
                //res.json(req.body);
            //});
        },
        test: function(req,res){
            res.send(req.body);
        },
        getOne: function(req, res){
            Channel.findById(req.params.id, function(err, channel){
                if(err) res.send(err);
                res.json(channel);
            });     
        },
        deleteOne: function(req, res) {
             Channel.findOneAndRemove({_id: req.params.id}, function(err,cat){
                if(err) res.send(404);
                res.json(cat);
            });
        },
        updateOne: function(req,res){
            Channel.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, cat){
                if(err)res.send(404);
                if(cat){
                    console.log(cat);
                    res.send(cat);
                }
                else
                    res.send("not found");
            });
        }
    }
})();  