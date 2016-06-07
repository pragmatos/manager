const Category = require('../models/category');

module.exports = (function() {
    return {
        getAll : function(req, res){
            var query = Category.find({});
            query.exec(function(err, cat){
                if(err) res.send(err);
                res.json(cat);
            });
        },
        post: function(req, res){
            var newCategory = new Category(req.body);
            newCategory.save(function(err,cat){
                if(err) res.send(err);
                res.json(cat);
            });
        },
        getOne: function(req, res){
            Category.findById(req.params.id, function(err, cat){
                if(err) res.send(err);
                res.json(cat);
            });     
        },
        deleteOne: function(req, res) {
             Category.findOneAndRemove({_id: req.params.id}, function(err,cat){
                if(err) res.send(404);
                res.json(cat);
            });
        },
        updateOne: function(req,res){
            Category.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, cat){
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