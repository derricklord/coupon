angular.module('MyApp')
  .factory('Coupons', function($http) {
    return {
      getCoupon: function(id) {
        return $http.get('/api/coupons/'+id);
      },
      getCoupons: function(){
        return $http.get('/api/coupons');
      },
      postCoupon: function(couponData) {
        return $http.post('/api/coupons', couponData);
      },
      deleteCoupon: function(id){
        return $http.delete('/api/coupons/'+id);
      },
      updatePage: function(couponData) {
        return $http.put('/api/coupons/'+couponData._id, couponData);
      },       
    };
  });