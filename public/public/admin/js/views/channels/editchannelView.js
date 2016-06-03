define([
    'app',
    'models/channelModel',
    'text!templates/channels/editChannel.html'
],function(app,ChannelModel,ChannelTpl){
    var ChannelView = Backbone.View.extend({
    template : _.template(ChannelTpl),
    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteChannel",
        "change #changePhoto" : 'changePhoto',
        "drop #picture" : "dropHandler"
    },

    change: function (event) {
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            app.addValidationError(target.id, check.message);
        } else {
            app.removeValidationError(target.id);
        }
    },

    beforeSave: function (e) {
        e.preventDefault();
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            app.displayValidationErrors(check.messages);
            return false;
        }
        if (this.pictureFile) {
            app.uploadFile(this.pictureFile,
                function (res) {
                    self.model.set("img", res);
                    self.saveChannel();
                }
            );
        } else {
            this.saveChannel();
        }
        return false;
    },

    saveChannel: function () {
        var self = this;
        self.render();
        this.model.save(null, {
            success: function (model,res) {
                if(res.error){
                    alert(res.error);
                }else{
                    self.render();
                    alert('Збержено!');
                    app.router.navigate('channels/id' + model.id+'/edit', false);

                }
                
                
            },
            error: function () {
                alert('Помилка при оновленні каналу');
            }
        });
    },

    deleteChannel: function () {
        this.model.destroy({
            success: function () {
                alert('Успішно видалено');
                window.history.back();
            }
        });
        return false;
    },
     changePhoto:function (event) {
        // Prevents the event from bubbling up the DOM tree.
        event.stopPropagation();
        // To prevent the browser default handling of the data: 
        // default is open as link on drop.
        event.preventDefault();
         console.log('image');
        var newFile = event.target.files[0];
        if( ! newFile.type.match(/image.*/i) ){
            alert('Only IMAGE');
        } else {
            this.pictureFile = newFile;
            
            
            console.log(this);
            var reader = new FileReader();
            reader.onloadend = function () {
                $('#picture').attr('src', reader.result);
            };
            reader.readAsDataURL(this.pictureFile);
        }
        return false;
    },

    dropHandler: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];

        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    }

});
return ChannelView;
});