define([
    'app',
    'text!templates/home.html'
], function(app,tpl) {
  var HomeView;

  HomeView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(tpl);
    },
    render: function() {
      $(this.el).html(this.template());
      return this;
    }
  });

  return HomeView;
});
