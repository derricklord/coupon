angular.module('MyApp')
    .factory('User', function(){
        var info = {
            id: '',
            isAdmin: false,
            displayName: '',
            picture: '',
        };

        return {
                setUser: function(data){
                    info.id = data._id;
                    info.isAdmin = data.isAdmin;
                    info.displayName = data.displayName;
                    info.picture = data.picture;
                },
                getUser: function(){
                    return info;
                },
                isAdmin: function(){
                    return info.isAdmin;
                },
                clearUser: function(){
                    var info = {
                        id: '',
                        isAdmin: false,
                        displayName: '',
                        picture: '',
                    };
                },
                getDisplayName: function(){
                    return info.displayName;
                }
        }
    });