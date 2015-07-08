(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('changeLayout', changeLayout);


    /* @ngInject */
    function  changeLayout() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                changeLayout: '='
            }
        };
        return directive;
            
        function link(scope, element, attrs) {
                //Default State
                if(scope.changeLayout === '1') {
                    element.prop('checked', true);
                }

                //Change State
                element.on('change', function(){
                    if(element.is(':checked')) {
                        localStorage.setItem('ma-layout-status', 1);
                        scope.$apply(function(){
                            scope.changeLayout = '1';
                        })
                    }
                    else {
                        localStorage.setItem('ma-layout-status', 0);
                        scope.$apply(function(){
                            scope.changeLayout = '0';
                        })
                    }
                })            
        }
    }
    
})();
