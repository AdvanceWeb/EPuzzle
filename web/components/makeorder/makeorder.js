app.controller("makeorderCtrl", function ($scope, $http, fileReader, $location, dataService) {
    // Part

    // Make an order according to the data saved.
    $scope.selectedColor = dataService.getSelectedColor();
    $scope.selectedShape = dataService.getSelectedShape();
    $scope.selectedSize = dataService.getSelectedSize();
    $scope.imageSrc = dataService.getSelectedImgSrc();
    $scope.overview = dataService.getOverView();
    // Post to MakeOrderServlet
    $scope.makeOrder = function () {
        var order = createOrder();
        var username=dataService.getUsername();
        if(username==null){
            $location.path("/");
        }else{
            var orderId = Date.parse(new Date())+dataService.getUsername();
            //console.log(orderId);
            var data = {order: order,username:dataService.getUsername(),orderId:orderId};
            var transform = function(data){
                return $.param(data);
            };
            $http.post("MakeOrderServlet", data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform
            }).then(function successCallback(response) {
                var message = response.data;
                //alert(message);
                var res = message.results;
                if(res!="success"){
                    alert("购买失败,服务器未开启");
                }else{
                    $location.path("/home");
                }
            }, function errorCallback(response) {
                alert("ouch");
            });
        }
    };

    // Create an order in xml form.
    function createOrder(){
        var order;
        var date = new Date().toLocaleDateString();
        date = date.replace("/","-");// Trans-to xml date type
        var price = $scope.selectedColor.price +$scope.selectedShape.price +$scope.selectedSize.price;
        order = "<?xml version=\"1.0\"?>"+
            "<Order>"+
            "<Date>"+date+"</Date>"+
            "<Product>"+
            "<Color>"+
            "<Content>"+$scope.selectedColor.content+"</Content>"+
            "<Price>"+$scope.selectedColor.price+"</Price>"+
            "<Value>"+$scope.selectedColor.color+"</Value>"+
            "</Color>"+
            "<Shape>"+
            "<Content>"+$scope.selectedShape.content+"</Content>"+
            "<Price>"+$scope.selectedShape.price+"</Price>"+
            "</Shape>"+
            "<Size>"+
            "<Width>"+$scope.selectedSize.width+"</Width>"+
            "<Height>"+$scope.selectedSize.height+"</Height>"+
            "<Price>"+$scope.selectedSize.price+"</Price>"+
            "</Size>"+
            "<Img>"+$scope.imageSrc+"</Img>"+
            "</Product>"+
            "<Customer>"+
            "<Name>"+$scope.Name+"</Name>"+
            "<Address>"+$scope.Address+"</Address>"+
            "<PhoneNo>"+$scope.PhoneNo+"</PhoneNo>"+
            "</Customer>"+
            "<Price>"+price+"</Price>"+
            "</Order>";
        return order;
    }
});
