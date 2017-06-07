app.controller("mypuzzleCtrl", function ($scope, $http, fileReader, $location,dataService) {
    // Part
    // Manager the customer's info & history orders.
    //todo get data from server and show the data to customer.
    $scope.userInfo = function () {
        var data = {username:dataService.getUsername()};
        var transform = function(data){
            return $.param(data);
        };
        $http.post("UserOrdersServlet", data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then(function successCallback(response) {
            var obj = response.data;
            var results=obj.results;
            //TODO:对返回的xml数组json处理
        }, function errorCallback(response) {
            alert("lost connection");
        });
    };
});