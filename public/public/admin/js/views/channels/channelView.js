define([
    'app',
    'views/channels/editchannelView',
    'text!templates/channels/channel.html',
    'text!templates/channels/edit.html'
],function(app,EditChannel,ChannelTpl,ChannelEditTpl){
    var ChannelView = Backbone.View.extend({
    tagName: 'tr',
    template : _.template(ChannelTpl),
    editTemplate : _.template(ChannelEditTpl),
    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click .delete' : 'deleteModel',
        'click .edit'   : 'editModel',
        'click .save'   : 'save',
        'click .back'   : 'back'
    },
    back : function(){
        this.render();
    },
    deleteModel: function(){
        this.model.destroy();
    },
    editModel:function(e){
        app.router.navigate('channel/id'+this.model.get('id')+'/edit',{trigger:true});
       
    }


});
return ChannelView;
});