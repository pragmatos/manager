define([
  'app',
  'models/channelModel'
], function(app,Channel) {
   var ChannelCollection = Backbone.Collection.extend({
    model : Channel,
    url   : "api/channel",
    
    sort : function(type,category){
        console.log(type,category);
        if(type == 0 && category == 0 ) return this;
        if(type!= 0 && category == 0){
            return _(this.filter(function(data) {
		  	return data.get("typeip_id") == type;
		}));
        }
        if(type== 0 && category != 0){
            return _(this.filter(function(data) {
		  	return data.get("category_id") == category;
		}));
        }
        if(type !=0 &&category !=0){
		return _(this.filter(function(data) {
		  	return data.get("typeip_id") == type && data.get("category_id")==category;
		}));
            }
	},
    search : function(letters){
        if(letters === "") return this;
        var pattern = new RegExp(letters,"gi");
        return _(this.filter(function(data) {
            return pattern.test(data.get("name"));
    }));
  }

    
    
  });

  return ChannelCollection;
});
