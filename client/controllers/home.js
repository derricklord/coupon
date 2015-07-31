angular.module('MyApp')
  .controller('HomeCtrl', function($scope, $auth, $location, $anchorScroll, User, $geolocation, Coupons, $alert) {
    $scope.map = { center: { latitude: 21.308, longitude: -157.860 }, zoom: 13, pan:true };
    $scope.marker = {
          id: 0,
          coords: {
            latitude: 21.308,
            longitude: -157.860
          },
          options: { 
              draggable: false,
              animation: 0
          },
          title:'',
    };
    
    $scope.markers = [];
    $scope.loading = true;
      
    $scope.isAuthorized = function(){
        return User.isAdmin();
    };
     
      
    function getCoupons(){
        Coupons.getCoupons()
            .success(function(data){
                $scope.coupons = data;
                $scope.coupons.forEach(function(coupon){
                    var marker = {
                          id: $scope.markers.length + 1,
                          coords: {
                            latitude: 0,
                            longitude: 0
                          },
                          options: { 
                              draggable: false,
                              animation: 0
                          },
                          title:'',
                    };
                    marker.coords.latitude = coupon.loc[1];
                    marker.coords.longitude = coupon.loc[0];
                    marker.title = coupon.desc;
                    $scope.markers.push(marker);
                });
                
            })
            .error(function(err){
                console.log(err);
            });
    };  
    
    getCoupons();  
    
     
   $geolocation.getCurrentPosition({
      timeout: 60000
      }).then(function(position){
          $scope.map.latitude = position.coords.latitude;
          $scope.map.longitude = position.coords.longitude;
          $scope.marker.coords.latitude = position.coords.latitude;
          $scope.marker.coords.longitude = position.coords.longitude;

          $scope.map.center.latitude = position.coords.latitude;
          $scope.map.center.longitude = position.coords.longitude;


          $scope.marker.title = 'current location';
          $scope.markers.push($scope.marker);
          $scope.loading = false;

      }); 
      
      
});