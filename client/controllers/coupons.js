angular.module('MyApp')
  .controller('CouponCtrl', function($scope, $auth, $alert, Coupons) {

    /**
     * Get user's profile information.
     */
    $scope.getData = function() {
      Coupons.getCoupons()
        .success(function(data) {
          $scope.coupons = data;
          $alert({
            content: 'Coupon data loaded',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .error(function(error) {
          $alert({
            content: error.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };


    $scope.getData();

  });