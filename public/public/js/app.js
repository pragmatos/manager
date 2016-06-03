define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
    var app = {
        root : "/",                     
        URL : "/",                     
        API : "/api",                  

    
     uploadFile: function (file, callbackSuccess) {
        var data = new FormData();
        data.append('file', file);
        $.ajax({
            url: 'api/upload',
            type: 'POST',
            data: data,
            processData: false,
            cache: false,
            contentType: false,
            success: function(res){
                 console.log(res);
            callbackSuccess(res);
            }
        }).fail(function () {
           alert('Помилка при завантаженні');
        });
    },
    addValidationError: function (field, message) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.addClass('error');
        $('.help-inline', controlGroup).html(message);
    },
    removeValidationError: function (field) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.removeClass('error');
        $('.help-inline', controlGroup).html('');
    },
    hideAlert: function() {
        $('.alert').hide();
    },
     displayValidationErrors: function (messages) {
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.addValidationError(key, messages[key]);
            }
        }
    }
    };
           

    $('body').ajaxStart(function() {
           $('.ajax-loader').show();
        }).ajaxStop(function() {
          $('.ajax-loader').fadeOut('fast');
        });

    app.eventAggregator = _.extend({}, Backbone.Events);

    return app;

});
