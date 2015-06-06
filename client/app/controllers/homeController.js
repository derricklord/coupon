(function() {
    'use strict';

    angular
        .module('couponApp')
        .controller('homeController', homeController);

    homeController.$inject = ['$http'];

    /* @ngInject */
    function homeController($http){
        var vm = this;
        vm.title = 'Featured Coupons';
        vm.coupons = {};

        

        activate();

        ////////////////

        function activate() {
            $http.get('/api/coupons').
              success(function(data, status, headers, config) {
                //console.log(data);
                vm.coupons = data;
              }).
              error(function(data, status, headers, config) {
                console.log('Error: '+ data);
              });
        }
    }
})();