define([
  'app',
  'models/channelModel'
], function(app,Channel) {
   var PlayList = Backbone.Collection.extend({
    model : Channel,
    url   : "api/playlist",
    byType: function(type) {
            filtered = this.filter(function(channel) {
                console.log('1',channel);
                return channel.get('name') === 'Inter';
            });
            return new PlayList(filtered);
        },
    
    
  });

  return PlayList;
});
