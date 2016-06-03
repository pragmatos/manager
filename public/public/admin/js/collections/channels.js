define([
  'app',
  'models/channelModel'
], function(app,Channel) {
   var ChannelCollection = Backbone.Collection.extend({
    model : Channel,
    url   : "api/channel",
    searchByName: function(key){
        var url = (key == '') ? this.url : this.url+"/search/" + key;
        console.log('findByName: ' + key);
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                self.reset(data);
            }
        });
    }
    
  });

  return ChannelCollection;
});
