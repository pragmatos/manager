define([
    'app',
    'collections/channels',
    'views/usersChannels/userChannelView',
    'text!templates/usersChannels/userchannels.html',
    'text!templates/channels/searcherror.html'
],function(app,ChannelsCollection,ChannelView,ChannelsTpl,ErrorTpl){
    var ChannelsView = Backbone.View.extend({
        type: 0,
        events : {
            'keyup .search-query' : 'search',
            'click .type li'      : 'sortByType'
        },
        initialize: function() {
            that = this;
            this.template = _.template(ChannelsTpl);
            this.errorTpl = _.template(ErrorTpl); 
            this.collection = new ChannelsCollection();
            this.collection.on('reset',this.render,this);
            this.collection.urlRoot="api/userchannels";
        },
         search :function(e){
           
            this.renderList(this.collection.search(e.currentTarget.value));
        },
        
        sortByType : function(e){
            e.preventDefault();
            $('.type li').removeClass('active');
            $(e.currentTarget).addClass('active');
            this.type = $(e.currentTarget).attr('data');
            this.sort();
            
        },
        sort : function(){
            this.renderList(this.collection.sort(this.type,0));
        },
        renderError: function(){
            $("#channels .list").html(this.errorTpl);
        },
        renderList: function (Channels){
            
            that = this;
            console.log(Channels);
            $('#channels .list').html("");
            Channels.each(function(item) {
                var view = new ChannelView({
				model: item
			});
                $("#channels .list").append(view.render().el);
            });
            return this;
        },
        render: function () {
            that = this;
            console.log('preinit');
            $(this.el).html(this.template);
            this.collection.url="api/userchannels";
            this.collection.fetch({
                success: function(){
                        that.renderList(that.collection);
                    },
                error:function(){
                    console.log(that.collection);
                }
            });
            
            return this;
        },

        addOne: function(channel) {
            var chanel = new ChannelView({ model: channel });
            this.$el.append( chanel.render().el );
        }
    });
    return ChannelsView;
});