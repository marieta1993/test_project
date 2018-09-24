'use strict';

angular.module('myApp.main', ['ngRoute'])


    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'main/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', function($scope,$http,$cookieStore,$location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        let  user_access= JSON.parse($cookieStore.get('UserData')),url ='http://dev4.wedoapps.eu/',main = this;
        $http.defaults.headers.common.Authorization = 'Bearer '+user_access.access_token;
        $http({
            method: 'GET',
            url: url+'en/v1/user',
        }).then(function successCallback(response) {
            $scope.data =response.data;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            console.log(response)
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    });