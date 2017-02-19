requirejs.config({
    baseUrl:'js/',
    enforceDefine: false,
    paths: {
        'jquery': 'lib/jquery.min',
        'bootstrap': 'lib/bootstrap.min'
    },
    shim: {
        'bootstrap': ['jquery'],
        'jquery': {
            exports: '$'
        }
    },
    urlArgs: 'ver=16.1.100'
});
