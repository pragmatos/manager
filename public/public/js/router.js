define([
    'app',
    'views/home',
    'views/header',
    'views/auth/login',
    'views/auth/singup',
    'views/channels/channelsView',
    'views/usersChannels/newChannelView',
    'views/playlist/playlist',
    'views/profile/profile',
    'views/usersChannels/userChannelsView',
    'views/404/404'
  
], function(app, 
            HomeView, HeaderView,LoginView,SignUpView,
            ChannelsView,newChannelView,PlayListView,
            ProfileView,UsersChannels,ErrorView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      ''                        : 'home',
      'home'                    : 'home',
      'login'                   : 'login',
      'signup'                  : 'signup',
      'playlist'                : 'showPlaylist',
      'channels'                : 'showChannels',
      'profile/id_:id'          : 'showProfile',
      'userchannel/add'         : 'newChannel',
      'userchannels'            : 'showUsersChannels',
      
      '*actions'                : 'defaultAction'
    },
   
    
    show: function(view, options){
            if(!this.headerView){
                this.headerView = new HeaderView({});
                this.headerView.setElement($("header")).render();
            }
            if(this.currentView) this.currentView.remove();
            this.currentView = view;
            if (typeof options !== 'undefined' && options.requiresAuth){        
                var self = this;
                if(app.session.get('logged_in')){
                    if(options.requiresAuth === 'show'){
                            self.navigate("/", { trigger: true});
                            return;
                        }
                    console.log('auth');
                    $('.page-content').html( self.currentView.render().$el);
                }
                else{
                    if(options.requiresAuth === 'show'){
                            $('.page-content').html(self.currentView.render().$el);
                            return;
                        }
                    console.log('auth:no');
                    self.navigate("/", { trigger: true, replace: true });
                }
                

            } else {
                $('.page-content').html(this.currentView.render().$el);
            }

        },
    home: function() {
        this.show(new HomeView);
        this.headerView.select('home-menu');
    },
    login : function(){
        this.show(new LoginView,{requiresAuth:'show'});
        this.headerView.select('login-menu');
      
    },
    signup : function(){
        this.show(new SignUpView,{requiresAuth:'show'});
        this.headerView.select('signup-menu');
    },
    showChannels: function(){
       
       this.show(new ChannelsView);
       this.headerView.select('channels-menu');
    },
    showPlaylist : function(){
        
        this.show(new PlayListView,{requiresAuth:true});
        this.headerView.select('playlist-menu');
    },
    showProfile: function(id){
        this.show(new ProfileView,{requiresAuth:true});
    },
    newChannel: function(){
        this.show(new newChannelView);
        this.headerView.select('addchannel-menu');
        
    },
    showUsersChannels:function(){
        this.show(new UsersChannels,{requiresAuth:true});
        this.headerView.select('userchannels-menu');
    },
    
    defaultAction: function(actions) {
       var t = new ErrorView;
       t.render().$el;
    }
  });

  return AppRouter;
});
