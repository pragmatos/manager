define([
    'app',
    'collections/Channels',
    
    'text!templates/channels/index.html',
], function(app,ChannelCollection,ChannelsTpl) {
  var ChannelsView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(ChannelsTpl);
      this.collection = new ChannelCollection();
    },
    getData: function(callback) {
      this.collection.fetch({
        success: function(collection) {
          callback(collection);
        },
        error: function(coll, res) {
          if (res.status === 404) {
            // TODO: handle 404 Not Found
          } else if (res.status === 500) {
            // TODO: handle 500 Internal Server Error
          }
        }
      });
    },
    // render template after data refresh
    render: function(callback) {
      var self = this, tmpl;

      this.getData(function(collection) {
        tmpl = self.template({ channels: collection.toJSON() });
        $(self.el).html(tmpl);

        callback();
      });
    }
  });

  return ChannelsView;
});
