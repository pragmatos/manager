const User  = require('../models/user');
const Token = require('../helpers/token');

module.exports = (function() {
    return {
        login : function(req, res){
            if(req.body.login && req.body.pass){
                User.findOne({ 
                    login:req.body.login
                }).select('pass login name admin').exec(function(err, user){
                    console.log(user);  
                    if(err)res.send("error");
                    
                    if(user){
                        var validPass = user.comparePass(req.body.pass);

                        if(!validPass) {
                            res.send('Bad Pass');
                        }
                        else {

                            var token = Token.createToken(user);
                            res.json({
                                success:true,
                                user: user,
                                token: token,
                            });
                        }                        
                    }
                });
            }
            else {
                res.send('Bad Login/Pass');
            }

        },
        signup: function(req, res, next){
            if(req.body.login && req.body.pass){
                User.findOne({login:req.body.login}, function(err, user){
                    if(err) res.send("error");
                    if(user) res.json({msg:"Користувач з таким логином існує!"});
                    else{
                        console.log(req.body);
                        var newUser = new User(req.body);
                        newUser.save(function(err){
                            if(err) res.send(err);
                            next();
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