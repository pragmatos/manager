define([
    'app',
    'models/channelModel',
    'text!templates/playlist/itemplaylist.html'
    
],function(app,ChannelModel,ChannelTpl){
var ChannelView = Backbone.View.extend({
    tagName: 'li',
    template: _.template(ChannelTpl),
    initialize: function(){
        this.model.bind('delete', this.unrender,this);
    },
    attributes: function() {
        return {
            class: 'person ' + 'typeip'+this.model.get('typeip_id')
        };
    },
    events: {
        'click .list-header': 'showDetails',
        'click .delete-icon': 'deleteFromPlaylist',
    },
    
    render: function() {
       // console.log(this.model.toJSON());
        this.$el.html(this.template({'channel':this.model.toJSON()}));
        return this;
    },
    unrender: function(){
        $(this.el).fadeOut();
    },

    showDetails: function(e) {
        $(e.target).toggleClass('active');
        $(e.target).siblings('.details').slideToggle('fast');
    },
    deleteFromPlaylist: function(){
        this.model.destroy({url: 'api/playlist/'+this.model.get('id')});
        this.unrender();
        //console.log(this.model.toJSON());
        //console.log(app.session.playlist);
    }

});
return ChannelView;

});



