app.controller("homeCtrl", function ($scope, $http, fileReader, $location, dataService) {
    // Part
    $scope.keyword = "";
    $scope.products = [];

    $scope.search = function () {
        var data = {keyword: $scope.keyword};
        var transform = function(data){
            return $.param(data);
        };
        $http.post("servlet.SearchServlet", data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
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
        // dataService.getDetail(id);
        var data = {id: id};
        var transform = function(data){
            return $.param(data);
        };
        $http.post("servlet.GetInfoServlet", data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then(function successCallback(response) {
            var obj = response.data;
            var product = obj.product;
            var color = {content : product.color.content, price : parseInt(product.color.price), color: parseInt(product.color.color,16)};
            var shape = {content : product.shape.content, price : parseInt(product.shape.price)};
            var size =  {size : product.size.size, width: product.size.width, height: product.size.height, price : parseInt(product.size.price)};
            dataService.saveOrder(color,shape,size,product.imgSrc,product.overview);
            $location.path('/makeorder');
        }, function errorCallback(response) {
            alert("ouch");
        });

    }

});