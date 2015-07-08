(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('test', test);


    /* @ngInject */
    function  test() {
        // Usage:
        //
        // Creates:
        //
        var test = {
            link: link,
            restrict: 'EA',
            scope: {},
            template: '<h1>This is a test Directive</h1>'
        };
        return test;

        function link(scope, element, attrs, controller) {
           
        }
    }

})();

