angular.module('MyApp')
  .factory('Account', function($http, User) {
    return {
      getProfile: function(id) {
        return $http.get('/api/me');
      },
      updateProfile: function(id, profileData) {
        return $http.put('/api/me', profileData);
      },
      getData: function(){
        return $http.get('/test');
      },
      getUsers: function(){
        return $http.get('/users');
      },
    };
  });

