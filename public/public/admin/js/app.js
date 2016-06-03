define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
    var app = {
        root : "/",
        URL  : "/",
        API  : "/api",

    showAlert: function(title, text, klass) {
    $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
    $('.alert').addClass(klass);
    $('.alert').html('<strong>' + title + '</strong> ' + text);
    $('.alert').show();
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
    displayValidationErrors: function (messages) {
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.addValidationError(key, messages[key]);
            }
        }
    },
    uploadFile: function (file, callbackSuccess) {
        var self = this;
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
            //console.log(file.name + " uploaded successfully");
            callbackSuccess(res);
            }
        }).fail(function () {
            self.showAlert('Error!', 'An error occurred while uploading ' + file.name, 'alert-error');
        });
    },
    hideAlert: function() {
        $('.alert').hide();
    }
    };
    
    //$.ajaxSetup({ cache: false });          // force ajax call on all browsers

    $('body').ajaxStart(function() {
           $('.ajax-loader').show();
        }).ajaxStop(function() {
          $('.ajax-loader').fadeOut('fast');
        });
        

    // Global event aggregator
    app.eventAggregator = _.extend({}, Backbone.Events);

    return app;

});
