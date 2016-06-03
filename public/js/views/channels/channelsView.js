define([
    'app',
    'collections/channels',
    'collections/category',
    'views/channels/channelView',
    'text!templates/channels/channels.html',
    'text!templates/category/category.html',
    'text!templates/channels/searcherror.html'
],function(app,ChannelsCollection,CategoryCollection,ChannelView,ChannelsTpl,CategoryTpl,ErrorTpl){
    var ChannelsView = Backbone.View.extend({
        type: 0,
        category_id: 0,
        events : {
            'keyup .search-query' : 'search',
            'click .category li'  : 'sortByCategory',
            'click .type li'      : 'sortByType'
        },
        initialize: function() {
            that = this;
            this.template = _.template(ChannelsTpl);
            this.tempaltecategory = _.template(CategoryTpl);
            this.errorTpl = _.template(ErrorTpl); 
            this.collection = new ChannelsCollection();
            this.category = new CategoryCollection();
            this.collection.on('reset',this.render,this);
            
            app.session.on('change:logged_in',this.initialize,this);
        },
        search :function(e){
           
            this.renderList(this.collection.search(e.currentTarget.value));
        },
        sortByCategory : function(e){
            e.preventDefault();
            $('.category li').removeClass('active');
            $(e.currentTarget).addClass('active');
            this.category_id = $(e.currentTarget).attr('data');
            this.sort();
        },
        sortByType : function(e){
            e.preventDefault();
            $('.type li').removeClass('active');
            $(e.currentTarget).addClass('active');
            this.type = $(e.currentTarget).attr('data');
            this.sort();
            
        },
        sort : function(){
            this.renderList(this.collection.sort(this.type,this.category_id));
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
            this.collection.fetch({
                    sync    : true,
                success: function(){
                        that.renderList(that.collection);
                    },
                error:function(){
                    console.log(that.collection);
                }
            });
            this.category.fetch({
                sync    : true,
                success : function(){
                    $('.category').html(that.tempaltecategory({'category':that.category}));
                },
                error : function(){
                  console.log(arguments);
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