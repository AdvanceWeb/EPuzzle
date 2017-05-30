app.controller("homeCtrl", function ($scope, $http, fileReader, $location, dataService) {
    // Part
    // todo get the products from the server
    // todo support the search function
    $scope.keyword = "";
    $scope.products = [];

    $scope.search = function () {
        var data = {keyword: $scope.keyword};
        var transform = function(data){
            return $.param(data);
        };
        $http.post("SearchServlet", data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then(function successCallback(response) {
            var obj = response.data;
            var results = obj.results;
            $scope.products = results;
        }, function errorCallback(response) {
            alert("ouch");
        });
    };

    $scope.viewDetails = function (id) {
        dataService.getDetail(id);
        $location.path('/makeorder');
    }

});