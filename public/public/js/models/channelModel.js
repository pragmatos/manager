define([
    'app'
    
], function(app) {
    var Channel = Backbone.Model.extend({
        urlRoot: function(){
            return app.API + '/channel';
        },
        id :'id',
        defaults: {
            id      : null,
            name    : '',
            description : '',
            href    : '',
            img     : '',
            added   : false,
            typeip_id: 1
        },
        initialize: function () {
            this.validators = {};

            this.validators.name = function (value) {
                return value.length > 0 ? {isValid: true} : {isValid: false, message: "Повинно бути ім'я"};
            };

            this.validators.href = function (value) {
                return value.length > 0 ? {isValid: true} : {isValid: false, message: "Вкажіть адрес каналу"};
            };

        },

        validateItem: function (key) {
            return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
        },
        validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },
        postChannel: function(opts, callback){
           var self = this;
           $.ajax({
               url: 'api/'+opts.method,
               contentType: 'application/json',
               dataType: 'json',
               type: 'POST',
               data:  JSON.stringify( _.omit(opts, 'method') ),
               success: function(res){
                   self.set({'added':true});
                   console.log(self);
                   if( !res.error ){
                        if(callback && 'success' in callback) callback.success(res);
                   } else {
                        if(callback && 'error' in callback) callback.error(res);
                   }
               },
               error: function(mod, res){
                   if(callback && 'error' in callback) callback.error(res);
               }
           });
        },
        addToPlaylist: function(opts,callback){
            this.postChannel(_.extend(opts, { method: 'playlist' }),callback);
        },
        deleteUserchannel: function(){
            $.ajax({
               url: 'api/userchannels/'+this.get('id'),
               type: 'DELETE',
               success: function(res){
                   alert('Видалено');
               },
               error: function(mod, res){
                   alert('error');
               }
           });
        }
        
    });
    
    return Channel;
  });
