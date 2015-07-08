(function () {
    'use strict';

    angular
        .module('app.core')
        .service('messageService', messageService);

    //messageService.$inject = ['$resource'];

    /* @ngInject */
    function messageService(img, user, text) {
        //var gmList = $resource("data/messages-notifications.json");
        /*
        return gmList.get({
            img: img,
            user: user,
            text: text
        });
        */
    }
})();
