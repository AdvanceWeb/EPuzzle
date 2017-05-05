// jQuery Used for bootstrap
window.jQuery || document.write('<script src="bootstrap/assets/js/vendor/jquery.min.js"><\/script>');

// Angular
var app = angular.module('myApp', ['ngRoute']);
app.controller('myCtrl', function($scope, $http, fileReader) {
});
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModel) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(event){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
                //附件预览
                scope.file = (event.srcElement || event.target).files[0];
                scope.getFile();
            });
        }
    };
}]).
directive('navbar', function() {
    return {
        templateUrl: 'components/navbar.html'
    };
}).
factory('fileReader', ["$q", "$log", function($q, $log){
    var onLoad = function(reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };
    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };
    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        return reader;
    };
    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();
        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);
        return deferred.promise;
    };
    return {
        readAsDataUrl: readAsDataURL
    };
}]);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/',{
            templateUrl: 'components/home.html'
        })
        .when('/workshop', {
            templateUrl: 'components/workshop.html',
            controller: 'workshopCtrl'
        })
        .when('/makeorder', {
            templateUrl: 'components/makeorder.html',
            controller: 'makeorderCtrl'
        })
        .when('/mypuzzle', {
            templateUrl: 'components/mypuzzle.html',
            controller: 'mypuzzleCtrl'
        })
        .otherwise({
            redirectTo:''
        });

    // configure html5
    $locationProvider.html5Mode(false);
});

app.controller("workshopCtrl", function ($scope, $http, fileReader, $location) {
    // Part2
    // This part is about loading information of our object
    // a. These information should be loaded from the configure file -> xml file
    // b. Then show in the corresponding place in the html page using Angular.js model
    $http({
        method: 'POST',
        url: 'OnloadServlet'
    }).then(function successCallback(response) {
        specification = response.data;
        setConfiguration();
    }, function errorCallback(response) {
        alert("ouch");
    });

    $scope.Shapes = [];
    $scope.Colors = [];
    $scope.Sizes = [];
    $scope.PuzzleVR = new PuzzleVR(document.getElementById("vrcontainer"));

    $scope.changeView =$scope.PuzzleVR.changeView;
    $scope.preview = $scope.PuzzleVR.preview;

    var specification;
    function setConfiguration() {
        var xmlDoc;
        if (window.DOMParser)
        {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(specification, "application/xml");
        }
        // xml parsing
        var shapes = xmlDoc.getElementsByTagName("Shape");
        for (i = 0; i < shapes.length; i++) {
            var child = shapes[i];
            var content = child.getElementsByTagName("Content")[0].textContent;
            var price = parseInt(child.getElementsByTagName("Price")[0].textContent);
            var tmp = {content : content, price : price};
            $scope.Shapes.push(tmp);
        }
        var colors = xmlDoc.getElementsByTagName("Color");
        for (i = 0; i < colors.length; i++) {
            var child = colors[i];
            var content = child.getElementsByTagName("Content")[0].textContent;
            var price = parseInt(child.getElementsByTagName("Price")[0].textContent);
            var value = parseInt(child.getElementsByTagName("Value")[0].textContent,16);
            var tmp = {content : content, price : price, color: value};
            $scope.Colors.push(tmp);
        }
        var sizes = xmlDoc.getElementsByTagName("Size");
        for (i = 0; i < sizes.length; i++) {
            var child = sizes[i];
            var width = child.getElementsByTagName("Width")[0].textContent;
            var height = child.getElementsByTagName("Height")[0].textContent;
            var content = width+ "*" + height;
            var price = parseInt(child.getElementsByTagName("Price")[0].textContent);
            var tmp = {size : content, width: width, height: height, price : price};
            $scope.Sizes.push(tmp);
        }
    }
    $scope.$watch('selectedColor', function(val){
        console.log(val);
        var obj = eval (val);
        if(obj){
            $scope.PuzzleVR.changeColor(obj.color);
        }
    },true);
    $scope.$watch('selectedShape', function(val){
        console.log(val);
        var obj = eval (val);
        if(obj){
            $scope.PuzzleVR.changeShape(obj.content);
        }
    },true);
    $scope.$watch('selectedSize', function(val){
        console.log(val);
        var obj = eval (val);
        if(obj){
            $scope.PuzzleVR.changeSize(obj.width, obj.height);
        }
    },true);

    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
                $scope.imageSrc = result;
                $scope.PuzzleVR.changeImg(result);
            });
    };
});
app.controller("makeorderCtrl", function ($scope, $http, fileReader, $location) {
    // Part 4
    // Make an order according to the data.
    // Create an order in xml form.
    // Post to MakeOrderServlet
    $scope.makeOrder = function () {
        var order = createOrder();
        var data = {order: order};
        var transform = function(data){
            return $.param(data);
        }
        $http.post("MakeOrderServlet", data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then(function successCallback(response) {
            var message = response.data;
            alert(message);
        }, function errorCallback(response) {
            alert("ouch");
        });
    }

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
app.controller("mypuzzleCtrl", function ($scope, $http, fileReader, $location) {
    // Part 5
    // Manager the customer's info & history orders.

});