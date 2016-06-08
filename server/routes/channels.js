const Channel = require('../models/channel');
const path       = require('path');
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
            var imgUrl = "";
            if(req.file) {
                imgUrl = req.file.fieldname+"_"+req.datatime+ path.extname(req.file.originalname);
            }

            console.log(req.body);
            var newChannel = new Channel({
                name: req.body.name,
                href: req.body.href,
                desc: req.body.desc,
                category: req.body.category,
                type: req.body.type,
                img: imgUrl,
                creator: req.decoded._id
            });
            newChannel.save(function(err, channel){
                if(err) res.send(err);
                res.json(channel);
            });
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