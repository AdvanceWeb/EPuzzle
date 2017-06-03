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
app.controller("workshopCtrl", function ($scope, $http, fileReader, $location, dataService) {
    // Part
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

    // make order
    $scope.makeorder = function () {
        if($scope.checkOrder()) {
            compressImg();
            dataService.saveOrder($scope.selectedColor, $scope.selectedShape, $scope.selectedSize, $scope.imageSrc, "");
            $location.path('/makeorder');
        }
    };

    // check complete
    $scope.checkOrder = function(){
        if($scope.selectedColor == undefined || $scope.selectedShape == undefined || $scope.selectedSize == undefined || $scope.imageSrc == undefined){
            alert("The information of puzzle is not complete!")
            return false;
        }
        else{
            return true;
        }
    };

    // compress the image
    function compressImg(){
        var i = document.getElementById("productImg");
        console.log($(i).width());
        console.log($(i).height());
        var compressSrc = compress(i).src;
        $scope.imageSrc = compressSrc;
    }

    function  compress(source_img_obj, output_format) {
        var mime_type = "image/jpeg";
        if(output_format!=undefined && output_format=="png"){
            mime_type = "image/png";
        }
        var cvs = document.createElement('canvas');
        cvs.width = source_img_obj.naturalWidth;
        cvs.height = source_img_obj.naturalHeight;
        var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
        var newImageData = cvs.toDataURL(mime_type, 0.1);
        var result_image_obj = new Image();
        result_image_obj.src = newImageData;
        return result_image_obj;
    }
});
