'use strict';

angular.module('myApp.user_friends', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user_friends', {
            templateUrl: 'user_friends/user_friends.html',
            controller: 'UserFriendsCtrl'
        });
    }])

    .controller('UserFriendsCtrl', function($cookieStore,$scope,$http,$location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        let user_access= JSON.parse($cookieStore.get('UserData')),
            url = 'http://dev4.wedoapps.eu/';
        $http.defaults.headers.common.Authorization = 'Bearer '+user_access.access_token;
        $http({
            method: 'GET',
            url: url+'en/v1/user/friends?l=10&o=0',
        }).then(function successCallback(response) {
            $scope.data =response.data;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            console.log("uppsss")
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    });