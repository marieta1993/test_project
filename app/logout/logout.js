'use strict';

angular.module('myApp.logout', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: 'login/login.html',
            controller: 'LogoutCtrl'
        });
    }])

    .controller('LogoutCtrl', function($scope,$http,$cookieStore,$window) {
        $window.location.href = '#!/login';
        let  user_access= JSON.parse($cookieStore.get('UserData')),url ='http://dev4.wedoapps.eu/';
        $http.defaults.headers.common.Authorization = 'Bearer '+user_access.access_token;
        $http({
            method: 'GET',
            url: url+'en/v1/logout',
        }).then(function successCallback(response) {
            console.log(response.data)
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    });