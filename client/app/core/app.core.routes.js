(function () {
    'use strict';

    angular.module('app.core')
      .config(function($stateProvider, $urlRouterProvider, $authProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/core/app.core.main.html',
                controller: 'mainController',
                controllerAs: 'vm'
              })
            .state('coupons', {
                url: '/coupons',
                templateUrl: 'app/coupons/app.coupons.html',
                controller: 'couponController',
                controllerAs: 'vm'
            });

        //Default Route
        $urlRouterProvider.otherwise('/');

        // Google
        $authProvider.google({
          url: '/auth/google',
          authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          clientId: '496782544977-q67gsgn3sguk2vcs6hllm5nc33nd4ih1.apps.googleusercontent.com',    
          scope: ['profile', 'email'],
          scopePrefix: 'openid',
          scopeDelimiter: ' ',
          requiredUrlParams: ['scope'],
          optionalUrlParams: ['display'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 580, height: 400 }
        });
      });
})();

