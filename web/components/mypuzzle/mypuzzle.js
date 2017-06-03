app.controller("mypuzzleCtrl", function ($scope, $http, fileReader, $location, dataService) {
    // Part
    // Manager the customer's info & history orders.

    $scope.orders = [];
    getOrders();
    $scope.username = dataService.getUserName();
    $scope.nickname = dataService.getNickName();

    function getOrders() {
        var data = {id: $scope.username};
        var transform = function(data){
            return $.param(data);
        };
        $http.post("GetOrdersServlet", data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then(function successCallback(response) {
            var obj = response.data;
            var orders_xml = obj.orders;
            console.log(orders_xml);
            var orders = [];
            var i = 0;
            for(i = 0; i < orders_xml.length; i++){
                orders.push(parseOrders(orders_xml[i].content));
            }
            $scope.orders = orders;
        }, function errorCallback(response) {
            alert("ouch");
        });
    };

    function parseOrders(orders_xml) {
        var xmlDoc;
        if (window.DOMParser)
        {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(orders_xml, "application/xml");
        }
        // console.log(xmlDoc);

        // xml parsing
        var shapes = xmlDoc.getElementsByTagName("Shape");
        var child = shapes[0];
        var content = child.getElementsByTagName("Content")[0].textContent;
        var price = parseInt(child.getElementsByTagName("Price")[0].textContent);
        var shape = {content : content, price : price};

        var colors = xmlDoc.getElementsByTagName("Color");
        child = colors[0];
        content = child.getElementsByTagName("Content")[0].textContent;
        price = parseInt(child.getElementsByTagName("Price")[0].textContent);
        var value = parseInt(child.getElementsByTagName("Value")[0].textContent,16);
        var color = {content : content, price : price, color: value};

        var sizes = xmlDoc.getElementsByTagName("Size");
        child = sizes[0];
        var width = child.getElementsByTagName("Width")[0].textContent;
        var height = child.getElementsByTagName("Height")[0].textContent;
        content = width+ "*" + height;
        price = parseInt(child.getElementsByTagName("Price")[0].textContent);
        var sizes = {size : content, width: width, height: height, price : price};

        var imgSrc = xmlDoc.getElementsByTagName("Img")[0].textContent;

        var date = xmlDoc.getElementsByTagName("Date")[0].textContent;
        var totalPrice = parseInt(xmlDoc.getElementsByTagName("TotalPrice")[0].textContent);
        var address = xmlDoc.getElementsByTagName("Address")[0].textContent;
        var phoneNo = xmlDoc.getElementsByTagName("PhoneNo")[0].textContent;

        return {"date":date, "shape":shape, "color":color, "sizes": sizes, "imgSrc": imgSrc, "totalPrice":totalPrice, "address":address, "phoneNo":phoneNo};
    }

});