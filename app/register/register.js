'use strict';

angular.module('myApp.register', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        });
    }])

    .controller('RegisterCtrl', function($http,$scope,$cookieStore,$window,$location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        let main = this, url = 'http://dev4.wedoapps.eu/';
        main.user ={
            first_name:'',
            last_name:"",
            email:'',
            username:'',
            password:''
        };
        main.RegisterUser = function (user) {
            $http.post(url+'en/api/registration',JSON.stringify(user)).then(function (response) {
                console.log(response);
                main.successMsg = response.data.data.message;
                alert(main.successMsg);
                $window.location.href = '#!/login';
            }, function (response) {
                main.errorMessage = response.data.data.message;
                alert(main.errorMessage);
            })
        }

    });