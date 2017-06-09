app.controller("makeorderCtrl", function ($scope, $http, fileReader, $location, dataService) {
    // Part

    // Make an order according to the data saved.
    $scope.selectedColor = dataService.getSelectedColor();
    $scope.selectedShape = dataService.getSelectedShape();
    $scope.selectedSize = dataService.getSelectedSize();
    $scope.imageSrc = dataService.getSelectedImgSrc();
    $scope.overview = dataService.getOverView();

    // number of products, default is 0
    $scope.number = 1;
    $scope.username = dataService.getUserName();

    $scope.minus = function() {
        if($scope.number > 1){
            $scope.number = $scope.number - 1;
        }
    };
    $scope.add = function() {
        $scope.number = $scope.number + 1;
    };

    // Post to MakeOrderServlet
    $scope.makeOrder = function () {
        if(checkOrder()) {
            var order = createOrder();
            var username = dataService.getUserName();
            if (username == undefined || username == null) {
                alert("Please sign in first!");
                $location.path("/");
            }
            else {
                var orderId = Date.parse(new Date()) + dataService.getUserName();
                //console.log(orderId);
                var data = {order: order, username: dataService.getUserName(), orderId: orderId};
                var transform = function (data) {
                    return $.param(data);
                };
                $http.post("servlet.MakeOrderServlet", data, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transform
                }).then(function successCallback(response) {
                    var message = response.data;
                    //alert(message);
                    var res = message.results;
                    if (res != "success") {
                        alert("Sorry, make order failed. Please retry.");
                    } else {
                        alert("Make order successfully! See 'My Puzzle' to get the history of orders.");
                        $location.path("/home");
                    }
                }, function errorCallback(response) {
                    alert("ouch");
                });
            }
        }
        else{
            alert("Please complete the order information.");
        }
    };

    // Create an order in xml form.
    function createOrder(){
        var order;
        var date = new Date().toLocaleDateString();
        date = date.replace("/", "-");// Trans-to xml date type
        var price = $scope.selectedColor.price + $scope.selectedShape.price + $scope.selectedSize.price;
        // order = "<?xml version=\"1.0\"?>"+
        order = "" +
            "<Order>" +
            "<Date>" + date + "</Date>" +
            "<Product>" +
            "<Color>" +
            "<Content>" + $scope.selectedColor.content + "</Content>" +
            "<Price>" + $scope.selectedColor.price + "</Price>" +
            "<Value>" + $scope.selectedColor.color + "</Value>" +
            "</Color>" +
            "<Shape>" +
            "<Content>" + $scope.selectedShape.content + "</Content>" +
            "<Price>" + $scope.selectedShape.price + "</Price>" +
            "</Shape>" +
            "<Size>" +
            "<Width>" + $scope.selectedSize.width + "</Width>" +
            "<Height>" + $scope.selectedSize.height + "</Height>" +
            "<Price>" + $scope.selectedSize.price + "</Price>" +
            "</Size>" +
            "<Img>" + $scope.imageSrc + "</Img>" +
            "<Number>" + $scope.number + "</Number>" +
            "</Product>" +
            "<Customer>" +
            "<Name>" + $scope.username + "</Name>" +
            "<Address>" + $scope.Address + "</Address>" +
            "<PhoneNo>" + $scope.PhoneNo + "</PhoneNo>" +
            "</Customer>" +
            "<TotalPrice>" + price + "</TotalPrice>" +
            "</Order>";
        return order;
    };

    // check complete
    function checkOrder(){
        if($scope.Address == undefined || $scope.PhoneNo == undefined || $scope.Address == "" || $scope.PhoneNo == ""){
            return false;
        }
        else{
            return true;
        }
    };
});
