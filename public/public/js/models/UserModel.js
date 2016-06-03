
define([
    "app"
], function(app){

    var UserModel = Backbone.Model.extend({

        initialize: function(){
            _.bindAll(this);
        },
        urlRoot : 'api/user',
        defaults: {
            id: 0,
            login: '',
            name: '',
            email: ''
        },
    });
    
    return UserModel;
});

