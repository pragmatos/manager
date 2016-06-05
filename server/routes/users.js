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
                        console.log(req.body);
                        var newUser = new User({
                            name: req.body.name,
                            login: req.body.login,
                            pass: req.body.pass,
                            email: req.body.email
                        });
                        newUser.save(function(err){
                            if(err) res.send(err);
                                res.json({
                                    name: newUser.name,
                                    login: newUser.login
                                }); 
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