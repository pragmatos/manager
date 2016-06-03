define([
    'app',
    'text!templates/header.html'
 
], function(app,tpl) {
  var HeaderView;

  HeaderView = Backbone.View.extend({
      template : _.template(tpl),
    initialize: function() {
        _.bindAll(this);
        app.session.on("change:logged_in ", this.onLoginStatusChange);
        app.session.on("change:countPlaylist ", this.onLoginStatusChange);
        
        
    },
    events: {
            "click #logout-link"         : "onLogoutClick",
            "click #account-link"        : "onAccountClick",
            "click .dropdown-toggle"     : "onRemoveDefault"
    },
    onLoginStatusChange: function(){
        this.render();
    },
    onLogoutClick: function(evt) {
        evt.preventDefault();
        app.session.logout({}); 
        app.router.navigate('/',{trigger:true});
    },
    onAccountClick: function(){
         $('.dropdown-menu').toggleClass('show');
    },
    onRemoveDefault:function(evt) {console.log('prof');
         evt.preventDefault();
        $('.dropdown-menu').toggleClass('show');
    },
    render: function() {
      this.$el.html(this.template({ 
                logged_in: app.session.get('logged_in'),
                user: app.session.user.toJSON() ,
                countPlaylist:app.session.get('countPlaylist')
            }));
      return this;
    },
    select: function(item) {
      $('header .nav li').removeClass('active');
      $('.' + item).addClass('active');
    }
  });

  return HeaderView;
});
