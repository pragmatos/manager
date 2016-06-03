define([
    'app',
    'collections/playlist',
    'views/playlist/itemPlaylist',
    'text!templates/playlist/playlist.html',
    'text!templates/playlist/filterview.html',
    'text!templates/playlist/error.html'
],function(app,Playlist,ChannelView,PlaylistTpl,FilterView,ErrorTpl){
    var PlaylistView = Backbone.View.extend({
        
        
        errortpl : _.template(ErrorTpl),
        filtertpl   : _.template(FilterView),
        
        initialize: function() {
            that = this;
            this.collection = new Playlist();
            this.template = _.template(PlaylistTpl);
            this.collection.on('reset', this.render, this);
            this.collection.on('sort', this.renderSorted, this);
            this.collection.fetch({
                success: function(){
                    if(that.collection.length === 0){
                        that.renderNullPlaylist();
                    }
                    app.session.set('countPlaylist',that.collection.length);
                },
                error:function(){
                    console.log(that.collection);
                }});
            this.collection.on('remove',this.removeModel,this);
        },
        
        events: {
            'keyup #searchBox'    : 'searchFilter',
            'click a.loadbutton'  : 'loadFile',
            'click a.generateFile': 'GenerateFile',
            'click a.greateFile'  : 'greateFile',
            'click li.r'          : 'sortBytype'

        },
        greateFile: function(e){
            console.log('sds');
            e.preventDefault();
            this.collection.sendToServer({
                success : function(res){
                    if(res.url){
                        $('a.loadfile').attr('href',res.url).show(200);
                    }
                },
                error : function(){
                    alert('error');
                }
            });
            console.log(this.collection.toJSON());
        },
        sortBytype: function(e){
            e.preventDefault();
            $('li.r').removeClass('active');
            $(e.currentTarget).addClass('active');
            this.collection.sortCollection('typeip_id',parseInt(e.currentTarget.attributes.data.value));
        },
        renderSorted: function(){
            that = this;
            console.log(this.collection);
            $('#playlist #listing').html("");
            this.collection.each(function(item) {
                var view = new ChannelView({
				model: item
			});
                $("#playlist #listing").append(view.render().el);
            });
            return this;
        },
        renderList: function (Channels){
            that = this;
            console.log(Channels);
            $('#playlist #listing').html("");
            Channels.each(function(item) {
                var view = new ChannelView({
				model: item
			});
                $("#playlist #listing").append(view.render().el);
            });
            return this;
        },
        
        render: function () {
           that = this;
            console.log('preinit');
            $(this.el).html(this.template);
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
        renderNullPlaylist: function(){
            $(this.el).html(this.errortpl({}));
        },
        removeModel:function(model){
            if(this.collection.length === 0)
                this.renderNullPlaylist();
            app.session.set('countPlaylist',app.session.get('countPlaylist')-1);
            console.log(model);
        },
        addOne: function(channel) {
            var chanel = new ChannelView({ model: channel });
            //this.$el.append( chanel.render().el );
            console.log(chanel.render().el);
            console.log($('.pro'));
            $("#channels .list").append(chanel.render().el);
        }
        
    });
    return PlaylistView;
});
