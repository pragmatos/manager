define([
    "app",
    "text!templates/auth/login-page.html",

    "parsley"
], function(app, LoginPageTpl){

    var LoginView = Backbone.View.extend({

        initialize: function () {
            _.bindAll(this);
         
            app.session.on("change:logged_in", this.render);
        },
        events: {
            'click #login-btn'                      : 'onLoginAttempt',
            'keyup #login-password-input'           : 'onPasswordKeyup',
            
        },
        onPasswordKeyup: function(evt){
            var k = evt.keyCode || evt.which;

            if (k == 13 && $('#login-password-input').val() === ''){
                evt.preventDefault();    // prevent enter-press submit when input is empty
            } else if(k == 13){
                evt.preventDefault();
                this.onLoginAttempt();
                return false;
            }
        },

        onLoginAttempt: function(evt){
            self = this;
            if(evt) evt.preventDefault();
            if(this.$("#login-form").parsley('validate')){
                app.session.login({
                    login: this.$("#login-login-input").val(),
                    password: this.$("#login-password-input").val()
                }, {
                    success: function(mod, res){
                        app.router.navigate('/home',{trigger:true});

                    },
                    error: function(err){
                        
            self.render();
                        $('.help-block').append(err.error);
                       
                    }
                });
            } else {
                // Invalid clientside validations thru parsley
                if(DEBUG) console.log("Did not pass clientside validation");

            }
        },
        render:function () {
            this.template = _.template(LoginPageTpl); 
            this.$el.html(this.template({ user: app.session.user.toJSON() }));
            return this;
        }

    });

    return LoginView;
});

