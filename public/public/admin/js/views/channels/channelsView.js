define([
    'app',
    'collections/channels',
    'collections/category',
    'views/channels/channelView',
    'text!templates/channels/channels.html'
],function(app,ChannelsCollection,CategoryCollection,ChannelView,ChannelsTpl){
    var ChannelsView = Backbone.View.extend({
        tagName: 'table',
        className: 'border',
        template : _.template(ChannelsTpl),
        initialize: function() {
            that = this;
            this.collection = new ChannelsCollection();
            this.collection.fetch({
                success: function(){
                    console.log('init',that.collection);
                    that.render();
                },
                error:function(){
                    console.log(that.collection);
                }
            });
            this.collection.on('remove',this.render,this);
            app.session.on('change:logged_in',this.render,this);
        },
       
        render: function () {
            that = this;
            this.$el.html("");
            that.collection.each(function(item) {
                that.addOne(item);}, this);
            
            return this;
        },

        addOne: function(channel) {
            that = this;
            var chanel = new ChannelView({ model: channel});
            this.$el.append( chanel.render().el );
        }
    });
    return ChannelsView;
});