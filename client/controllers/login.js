angular.module('MyApp')
  .controller('LoginCtrl', function($scope, $alert, $auth, Account) {
    $scope.login = function() {
      $auth.login({ email: $scope.email, password: $scope.password })
        .then(function() {
          Account.getProfile()
            .success(function(data) {
              var message = 'You have successfully logged in';
              
              $alert({
                content: message,
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
              });           
            });
        })
        .catch(function(response) {
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {      
          Account.getProfile()
            .success(function(data) {
              var message = 'You have successfully logged in';
              
              $alert({
                content: message,
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
              });           
            });
        })
        .catch(function(response) {
          $alert({
            content: response.data ? response.data.message : response,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };
  });