(function () {
    'use strict';

    angular
        .module('app.core', [
            'app.coupons',
        
            'ngResource', 
            'angular-loading-bar', 
            'oc.lazyLoad',      
            'ui.router',
            'satellizer'
        ]);
})();