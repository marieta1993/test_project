'use strict';
angular.module('myApp.user_search', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user_search', {
            templateUrl: 'user_search/user_search.html',
            // controller: 'UserSearchCtrl'
        });
    }])

    .controller('UserSearchCtrl', function($scope,$http,$cookieStore) {

        let user_access= JSON.parse($cookieStore.get('UserData')),main = this,
            url = 'http://dev4.wedoapps.eu/';
        main.userSearch = '';
        main.userCard = '';
        main.userList ='';
        main.friend = {
            friend_id:''
        };
        $http.defaults.headers.common.Authorization = 'Bearer '+user_access.access_token;
        main.searchUser= function (){
            $http({
                method: 'GET',
                url: url+'en/v1/friend/search?text='+main.userSearch+'&l=10&o=0',
            }).then(function successCallback(response) {
                main.data =response.data.data;
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                console.log(response.data.data.message)
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };
        main.addFriend = function (friend_id) {
            main.friend.friend_id =friend_id;
            $http.post(url+'en/v1/friend/add', main.friend).then(function (response) {
            }, function (response) {
                main.errorMessage = response;
                console.log(main.errorMessage);
            })
        }

    });
