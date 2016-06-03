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
            typeip_id:0
        },
        initialize: function () {
            this.validators = {};

            this.validators.name = function (value) {
                return value.length > 0 ? {isValid: true} : {isValid: false, message: "Має бути назва"};
            };

            this.validators.href = function (value) {
                return value.length > 0 ? {isValid: true} : {isValid: false, message: "Введіть ссилку"};
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
        }
    /*validate: function(attrs) {
      var fields, i, len, nameLen, compLen, errors = {};

      
      if (!attrs._silent) {
        // check required fields
        fields = ['name', 'email', 'company', 'born'];
        for (i = 0, len = fields.length; i < len; i++) {
          if (!attrs[fields[i]]) {
            errors[fields[i]] = fields[i] + ' required';
          }
        }

        // check valid name
        nameLen = (attrs.name) ? attrs.name.length : null;
        if (nameLen < 2 || nameLen > 100) {
          errors.name = "invalid name";
        }

        // check valid company
        compLen = (attrs.company) ? attrs.company.length : null;
        if (!compLen || (compLen < 7 || compLen > 100)) {
          errors.company = "invalid company";
        }

        // check valid email
        if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(attrs.email))) {
          errors.email = "invalid email";
        }

        if (_.keys(errors).length) {
          return {
            errors: errors
          };
        }
      }*/
    

    
    });
    
    return Channel;
  });
