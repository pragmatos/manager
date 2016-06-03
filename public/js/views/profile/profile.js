define([
    'app',
    'models/UserModel',
    'text!templates/profile/profile1.html'
],function(app,UserModel,ProfileTpl){
    var ProfileView = Backbone.View.extend({
        template : _.template(ProfileTpl),
        initialize: function(){
            
        },
        getUser :function(id){
            app.session.user = new UserModel({id:id});
            app.session.user.fetch(); 
        },
        render: function(){
            this.$el.html(this.template({'profile':app.session.toJSON()}));
            return this;
        }
    });
    return ProfileView;
});