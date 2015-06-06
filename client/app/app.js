angular.module('couponApp', [ 'ui.router', 'satellizer', 'lumx'  ])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/partials/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/partials/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/partials/signup.html',
        controller: 'SignupCtrl'
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('/users', {
        url: '/users',
        templateUrl: 'app/partials/users.html',
        controller: 'UsersCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();
            deferred.resolve();

            return deferred.promise;
          }
        }        
      }) 
       .state('coupons', {
        url: '/coupons',
        templateUrl: 'app/partials/coupons.html',
        controller: 'PageCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }        
      }); 
      

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


