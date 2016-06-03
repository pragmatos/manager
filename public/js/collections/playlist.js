define([
  'app',
  'models/channelModel'
], function(app,Channel) {
   var PlayList = Backbone.Collection.extend({
    model : Channel,
    url   : "api/playlist",
    sortCollection : function(criteria,up) {
        this.comparator = this.criteriaComparator(criteria,up);
        this.sort();
    },
    criteriaComparator : function(criteria, up) {

        return function(a, b) {
            if(up){
                var tmp = a;
                a = b;
                b =tmp;
            }
            var aSortVal = a.get(criteria);
            var bSortVal = b.get(criteria);
            if (aSortVal < bSortVal) {
                return -1;
            }
            if (aSortVal > bSortVal) {
                return 1;
            }
            else {
                return 0;
            }

        };
    },
    sendToServer : function(callback){
         $.ajax({
                url: this.url +'/create',
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                data:  JSON.stringify( this),
                success: function(res){
                    callback.success(res);
                },
                error: function(mod, res){
                    callback.error(res);
                }
            });
    }
  });

  return PlayList;
});
