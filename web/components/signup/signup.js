app.controller("signupCtrl", function ($scope, $http, fileReader, $location) {
    // Part
    // todo handle the information of customer and send to server.
    $scope.validation = false;
    $scope.username = "";
    $scope.nickname = "";
    $scope.password = "";

    $scope.checkRepeat = function () {
        var data = {username: $scope.username};
        var transform = function (data) {
            return $.param(data);
        };
        $http.post("servlet.CheckServlet", data, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then(function successCallback(response) {
            var obj = response.data;
            var results = obj.results;
            if (results == "false") {
                $scope.validation = true;
            }else{
                $scope.validation=false;
            }
        }, function errorCallback(response) {
            alert("lost connection");
        });
    };
    $scope.register = function () {
        var data = {username:$scope.username,password:$scope.password,nickname:$scope.nickname};
        var transform = function(data){
            return $.param(data);
        };
        $http.post("servlet.RegisterServlet", data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then(function successCallback(response) {
            var obj = response.data;
            var results = obj.results;
            if(results=="success"){
                $location.path('/');
            }
        }, function errorCallback(response) {
            alert("lost connection");
        });
    };

});
