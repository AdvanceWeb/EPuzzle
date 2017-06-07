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
        // dataService.getDetail(id);
        var data = {id: id};
        var transform = function(data){
            return $.param(data);
        };
        $http.post("GetInfoServlet", data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then(function successCallback(response) {
            var obj = response.data;
            var product = obj.product;
            var color = {content : product.color.content, price : product.color.price, color: parseInt(product.color.color,16)};
            var shape = {content : product.shape.content, price : product.shape.price};
            var size =  {size : product.size.size, width: product.size.width, height: product.size.height, price : product.size.price};
            console.log(color);
            dataService.saveOrder(color,shape,size,product.imgSrc,product.overview);
            $location.path('/makeorder');
        }, function errorCallback(response) {
            alert("ouch");
        });

    }

});