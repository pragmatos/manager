define([
    'app',
    'models/channelModel',
    'text!templates/usersChannels/userchannel.html'
],function(app,ChannelModel,ChannelTpl){
    var ChannelView = Backbone.View.extend({
        template : _.template(ChannelTpl),
        tagName : 'li',
        events:{
            'click .delete-icon' : 'delete',
            
        },
        delete:function(e){
             e.preventDefault();
            this.model.deleteUserchannel();
            this.remove();
            
        },
        
        render: function(){
            this.$el.html(this.template({'channel':this.model.toJSON()}));
            return this;
        }
    });
    return ChannelView;
});