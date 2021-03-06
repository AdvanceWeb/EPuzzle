app.controller("loginCtrl", function ($scope, $http, fileReader, $location, dataService) {
    // Part
    $scope.username="";
    $scope.password="";
    $scope.validation=false;


    $scope.login = function () {
        var data = {username:$scope.username,password:$scope.password};
        var transform = function(data){
            return $.param(data);
        };
        $http.post("servlet.LoginServlet", data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then(function successCallback(response) {
            var obj = response.data;
            var results = obj.results;
            if(results=="success"){
                dataService.login($scope.username,obj.nickname);
                dataService.setSockect();
                $location.path('/home');
            }else{
                $scope.validation=true;
            }
        }, function errorCallback(response) {
            alert("lost connection");
        });
    };

});