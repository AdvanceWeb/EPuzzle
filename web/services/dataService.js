app.service('dataService', function($http,$location) {
    //username and nickname
    this.username = "username";
    this.nickname = "nickname";

    this.selectedColor;
    this.selectedShape;
    this.selectedSize;
    this.imageSrc;
    this.overview;

    this.saveOrder = function (selectedColor,selectedShape,selectedSize,imageSrc,overview) {
        this.selectedColor = selectedColor;
        this.selectedShape = selectedShape;
        this.selectedSize = selectedSize;
        this.imageSrc = imageSrc;
        this.overview = overview;
    };

    this.getSelectedColor = function(){
        return this.selectedColor;
    };

    this.getSelectedShape = function(){
        return this.selectedShape;
    };

    this.getSelectedSize = function(){
        return this.selectedSize;
    };

    this.getSelectedImgSrc = function(){
        return this.imageSrc;
    };

    this.getOverView = function(){
        return this.overview;
    };

    var that = this;
    this.getDetail = function ( productID){
        var data = {id: productID};
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
            alert(product.overview);
            that.saveOrder(color,shape,size,product.imgSrc,product.overview);
            $location.path('/makeorder');
        }, function errorCallback(response) {
            alert("ouch");
        });
    };

    this.getUserName = function(){
        return this.username;
    };

    this.getNickName = function() {
        return this.nickname;
    };
});


