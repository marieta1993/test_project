'use strict';
angular.module('myApp.login',['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl' //
        });
    }])

    .controller('LoginCtrl', function($scope,$http,$cookieStore,$window,$location) {

            $scope.isActive = function (viewLocation) {
                return viewLocation === $location.path();
            };

        let main = this, url = 'http://dev4.wedoapps.eu/';
        main.user ={
            grant_type:'password',
            client_id:"1_5wzjwogvfa80sww4wo0840wocsoo0gk08cgos0skco48k4g48w",
            client_secret:'2valk06xew8w4gkcswwgkg40cs8kgkkg0ssc4g4k4cgokgskwg',
            username:'',
            password:'',
        };
        main.submitUser = function (user) {
            $http.post(url+'en/api/oauth',JSON.stringify(user)).then(function (response) {
                $scope.msg = "Post Data Submitted Successfully!";
                $cookieStore.put("UserData",JSON.stringify(response.data));
               let  user_access= JSON.parse($cookieStore.get('UserData'));
                $http.defaults.headers.common.Authorization = 'Bearer '+user_access.access_token;
                $http({
                    method: 'GET',
                    url: url+'en/v1/user',
                }).then(function successCallback(response) {
                    $window.location.href = '#!/main';
                    // this callback will be called asynchronously
                    // when the response is available
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }, function (response) {
                main.errorMessage = response.data.error_description;
            })
        }

    });