// jQuery
window.jQuery || document.write('<script src="bootstrap/assets/js/vendor/jquery.min.js"><\/script>');

// Angular
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    // Part2 
    // This part is about loading information of our object
    // a. These information should be loaded from the configure file, e.g xml file
    // b. Then show in the corresponding place in the html page using Angular.js model
    $scope.Colors = [
        {content : "Red", price : 15, color: 0xff0000},
        {content : "Green", price : 20, color: 0x00ff00},
        {content : "Blue", price : 20, color: 0x0000ff},
    ];
    $scope.Shapes = [
        {content : "Semicircle", price : 2},
        {content : "Triangle", price : 5}
    ];
    $scope.Sizes = [
        {size : "25 * 25", price: 5},
        {size : "50 * 50", price: 8}
    ];

    // Call back to response to the users' choices, 
    // e.g. when the selected Material is change, change the scene at the same time 
    $scope.$watch('selectedColor', function(val){
        console.log(val);
        var obj = eval (val);
        if(obj){
            changeColor(obj.color);
        }
    },true)
});