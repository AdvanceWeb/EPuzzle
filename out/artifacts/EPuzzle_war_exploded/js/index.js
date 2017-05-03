// jQuery
window.jQuery || document.write('<script src="bootstrap/assets/js/vendor/jquery.min.js"><\/script>');

// Angular
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
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

    $scope.Shapes = [
    ];
    $scope.Colors = [
    ];
    $scope.Sizes = [
    ];

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
            var price = parseFloat(child.getElementsByTagName("Price")[0].textContent);
            var tmp = {content : content, price : price};
            $scope.Shapes.push(tmp);
        }
        var colors = xmlDoc.getElementsByTagName("Color");
        for (i = 0; i < colors.length; i++) {
            var child = colors[i];
            var content = child.getElementsByTagName("Content")[0].textContent;
            var price = parseFloat(child.getElementsByTagName("Price")[0].textContent);
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
            var price = parseFloat(child.getElementsByTagName("Price")[0].textContent);
            var tmp = {size : content, width: width, height: height, price : price};
            $scope.Sizes.push(tmp);
        }
    }

    // Call back to response to the users' choices,
    // e.g. when the selected Color is change, change the scene at the same time
    $scope.$watch('selectedColor', function(val){
        console.log(val);
        var obj = eval (val);
        if(obj){
            changeColor(obj.color);
        }
    },true);

    $scope.$watch('selectedShape', function(val){
        console.log(val);
        var obj = eval (val);
        if(obj){
            changeShape(obj.content);
        }
    },true);
});