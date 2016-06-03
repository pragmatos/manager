const User = require('../models/user');

module.exports = (function() {
    return {
        signin : function(req, res){
            if(req.body.login && req.body.pass){
                User.findOne({login:req.body.login}, function(err, user){
                    if(err)res.send("error");
                    console.log(user);
                });

            }
            res.end();
        },
        signup: function(req, res){
            if(req.body.login && req.body.pass){
                User.findOne({login:req.body.login}, function(err, user){
                    if(err) res.send("error");
                    if(user) res.json({msg:"Користувач з таким логином існує!"});
                    else{
                        var newUser = new User(req.body);
                        newUser.save(function(err){
                            if(err) res.send(err);
                                res.json(req.body); 
                        });
                    }
                });  
            }    
        },
        all: function(req, res){
            User.find({},function(err, users){
                if(err) res.send(err);
                res.json(users);
            });
        },
        getOne: function(req, res){
            User.findOne({_id: req.params.id}, function(err, user){
                if(err){
                    res.send(404);
                }
                if(user)
                    res.json(user);
            });
        },
        deleteOne: function(req,res){
            console.log(req.params.id);
            User.findOneAndRemove({_id: req.params.id}, function(err,user){
                if(err) res.send(404);
                res.json(user);
            });
        }
    }
})();  