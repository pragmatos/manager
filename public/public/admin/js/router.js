define([
    'app',
    'models/channelModel',
    'views/header',
    'views/channels/editchannelView',
    'views/channels/channelsView'
    
    
    
    
    
  
], function(app,ChannelModel,HeaderView,ChannelView,ChannelsView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      ''            : 'showChannels',
      'channels'    : 'showChannels',
      'channel/add': 'addChannel',
      'channel/id:id/edit': 'channelsDetail',
      
      
    },
    show: function(view, options){
        console.log(app.session.get('logged_in'));
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
    
    showChannels: function(){
        this.show(new ChannelsView);
    },
    
    addChannel: function() {
        $('.header').html(new HeaderView().render().el);
        $('.page-content').html(new ChannelView({model: new ChannelModel}).el)
        //this.headerView.selectMenuItem('add-menu');
    },
    channelsDetail: function(id){
        $('.header').html(new HeaderView().render().el);
        var channel = new ChannelModel({id: id});
        channel.fetch({
            success: function(res,model){
                console.log(model);
                $('.page-content').html(new ChannelView({model: channel}).el)
            }
        });
        
    },
    
   
    defaultAction: function(actions) {
       var t = new ErrorView;
       t.render().$el;
    }
  });

  return AppRouter;
});
