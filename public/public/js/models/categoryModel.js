define([
    'app'
],function(app){
    var Category = Backbone.Model.extend({
        urlRoot: function(){
            return app.API + '/category';
        },
        id :'id',
        defaults: {
            id      : 0,
            name    : '1'
            
        }
    });
    return Category;
});


