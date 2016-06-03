require.config({
    baseUrl: '/public/js',

    paths: {
        'jquery'                : 'lib/jquery',
        'underscore'            : 'lib/underscore',         
        'backbone'              : 'lib/backbone',
        'bootstrap'             : 'lib/bootstrap',
        'text'                  : 'lib/text',
        'parsley'               : 'lib/parsley'
    },

    shim: {
        'underscore'            : { exports  : '_' },
        'backbone'              : { deps : ['underscore', 'jquery'], exports : 'Backbone' },
        'bootstrap'             : { deps : ['jquery'], exports : 'Bootstrap' },
        'parsley'               : { deps: ['jquery'] }
    }

});

require(['main']);       
