(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('mainController', mainController);

    mainController.$inject = ['$http'];

    /* @ngInject */
    function mainController($http){
        var vm = this;
        vm.title = 'Featured Coupons';
        vm.coupons = {};

        

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