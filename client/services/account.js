angular.module('MyApp')
  .factory('Account', function($http, User) {
    return {
      getProfile: function(id) {
        return $http.get('/api/user/profile');
      },
      updateProfile: function(id, profileData) {
        return $http.put('/api/user/profile', profileData);
      },
      getUsers: function(){
        return $http.get('/api/user/list');
      }
    };
  });

