app.controller("loginCtrl", function ($scope, $http, fileReader, $location, dataService) {
    // Part
    // todo login
    // todo, here should add the login check in!
    $scope.username="";
    $scope.password="";
    $scope.validation=false;


    $scope.login = function () {
        var data = {username:$scope.username,password:$scope.password};
        var transform = function(data){
            return $.param(data);
        };
        $http.post("LoginServlet", data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then(function successCallback(response) {
            var obj = response.data;
            var results = obj.results;
            if(results=="success"){
                dataService.login($scope.username,obj.nickname);
                $location.path('/home');
            }else{
                $scope.validation=true;
            }
        }, function errorCallback(response) {
            alert("lost connection");
        });
    };

});