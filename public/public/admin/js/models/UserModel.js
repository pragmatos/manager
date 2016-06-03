
define([
    "app"
], function(app){

    var UserModel = Backbone.Model.extend({

        initialize: function(){
            _.bindAll(this);
        },

        defaults: {
            id: 0,
            login: '',
            name: '',
            email: ''
        },

        url: function(){
            return app.API + '/user';
        }

    });
    
    return UserModel;
});

