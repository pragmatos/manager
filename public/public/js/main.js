require([
    "app",
    "router",
    "models/SessionModel"
],
function(app, Router, SessionModel) {
    app.router = new Router();
    app.session = new SessionModel({});
    app.session.countPlaylist = 0;
    app.session.checkAuth({
        success: function(){
            Backbone.history.start();
        },
        error: function(){
            Backbone.history.start();
        }
    });
     $('body').on("click", "a:not([data-bypass])", function(evt) {
        evt.preventDefault();
        var href = $(this).attr("href");
        app.router.navigate(href, { trigger : true, replace : false });

    });
    
});

