// jQuery Used for bootstrap
window.jQuery || document.write('<script src="bootstrap/assets/js/vendor/jquery.min.js"><\/script>');

// Angular
var app = angular.module('myApp', ['ngRoute']);
app.controller('myCtrl', function($scope, $http, fileReader) {
});
app.directive('navbar', function() {
    return {
        templateUrl: 'components/navbar/navbar.html'
    };
});

// Routers
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/',{
            templateUrl: 'components/login/login.html',
            controller: 'loginCtrl'
        })
        .when('/signup',{
            templateUrl: 'components/signup/signup.html',
            controller: 'signupCtrl'
        })
        .when('/home',{
            templateUrl: 'components/home/home.html',
            controller: 'homeCtrl'
        })
        .when('/workshop', {
            templateUrl: 'components/workshop/workshop.html',
            controller: 'workshopCtrl'
        })
        .when('/makeorder', {
            templateUrl: 'components/makeorder/makeorder.html',
            controller: 'makeorderCtrl'
        })
        .when('/mypuzzle', {
            templateUrl: 'components/mypuzzle/mypuzzle.html',
            controller: 'mypuzzleCtrl'
        })
        .otherwise({
            redirectTo:'/home'
        });

    // configure html5
    $locationProvider.html5Mode(false);
});
