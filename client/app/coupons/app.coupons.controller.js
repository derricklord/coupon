(function() {
    'use strict';

    angular
        .module('app.coupons')
        .controller('couponController', couponController);

    couponController.$inject = ['$http'];

    /* @ngInject */
    function couponController($http){
        var vm = this;
        
        getCoupons();

        ////////////////

        function getCoupons() {
            $http.get('/api/coupons').
              success(function(data, status, headers, config) {
                vm.coupons = data;
              }).
              error(function(data, status, headers, config) {
                console.log('Error: '+ data);
              });
        }
    }
})();