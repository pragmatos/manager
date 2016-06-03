define([
    'app',
    'models/channelModel',
    'text!templates/channels/channel.html'
],function(app,ChannelModel,ChannelTpl){
    var ChannelView = Backbone.View.extend({
        template : _.template(ChannelTpl),
        tagName : 'li',
        events:{
            'click .addchannel' : 'addToPlaylist'
        },
        addToPlaylist:function(e){
            
            self = this;
           e.preventDefault();
                      
           this.model.addToPlaylist({
                    id_channel:this.model.get('id')
                    }, 
                    {
                    success: function(res){
                        console.log(res);
                        self.render();
                        app.session.set('countPlaylist',app.session.get('countPlaylist')+1);
                    },
                    error: function(err){
                         console.log("ERROR",err);
                     
                    }
                });
        },
        
        render: function(){
            this.$el.html(this.template({'channel':this.model.toJSON(),'logged_in':app.session.get('logged_in')}));
            return this;
        }
    });
    return ChannelView;
});