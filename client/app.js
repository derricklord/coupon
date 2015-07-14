angular.module('MyApp', [ 'ngCkeditor', 'ngSanitize', 'ui.router', 'mgcrea.ngStrap', 'satellizer', 'ngGeolocation', 'uiGmapgoogle-maps'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('/users', {
        url: '/users',
        templateUrl: 'partials/users.html',
        controller: 'UsersCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();
            deferred.resolve();

            return deferred.promise;
          }
        }        
      }) 
      .state('coupon', {
        url: '/coupon',
        templateUrl: 'partials/coupons.html',
        controller: 'CouponCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();
            /*
            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }
            */
            deferred.resolve();
            return deferred.promise;
          }
        }        
      }) 
      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
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
      clientId: '336814594012-tcjdjlifhj04pohlsnv610pd9nn21cpp.apps.googleusercontent.com',    
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


angular.module('MyApp')
    .controller('HomePageController', function($scope, $auth, User, Account){
        if($auth.isAuthenticated){
            $scope.user = User.getUser().displayName;
            
        }else{
            $scope.user = 'Guest';
        }
    });