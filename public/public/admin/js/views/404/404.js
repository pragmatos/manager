define([
    "app",
    "text!templates/404/404.html",
],
function(app,tpl){
    var ErrorView = Backbone.View.extend({
        template : _.template(tpl),
        el : 'body',
        render : function(){
            that = this;
            this.$el.html(that.template());
            return this;
            
        }
        
    });
    return ErrorView;
});