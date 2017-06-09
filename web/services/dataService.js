app.service('dataService', function($http, $location) {
    // Connect chat
    this.cusername;
    // Socket Session
    this.socket;
    // Products
    this.selectedColor;
    this.selectedShape;
    this.selectedSize;
    this.imageSrc;
    this.overview;
    // Username and nickname (global)
    this.username;
    this.nickname;
    // log in / sign in
    this.login = function (username,nickname) {
        this.username=username;
        this.nickname=nickname;
    };
    // log out / sign out
    this.logout = function () {
        this.cusername = undefined;
        if(this.socket != undefined){
            this.socket.close();
        }
        this.socket  = undefined;
        this.selectedColor  = undefined;
        this.selectedShape  = undefined;
        this.selectedSize  = undefined;
        this.imageSrc  = undefined;
        this.overview  = undefined;
        this.username  = undefined;
        this.nickname  = undefined;
        $location.path("/");
    };

    this.getUserName = function () {
        return this.username;
    };

    this.getNickName = function () {
        return this.nickname;
    };

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

    this.setConnectUserName = function(cu){
        this.cusername = cu;
    };

    this.getConnectUserName = function(){
        return this.cusername;
    };

    this.setSockect = function() {
        if(this.socket != undefined){// close the old one
            this.socket.close();
        }
        this.socket = new WebSocket("ws://localhost:8080/EPuzzle/chatroom/" + this.username);
    };

    this.getSocket = function(){
        return this.socket;
    };

    var that = this;
    // Get the detail of made product~
    this.getDetail = function (productID){
        var data = {id: productID};
        print("js"+productID);
        var transform = function(data){
            return $.param(data);
        };
        $http.post("servlet.GetInfoServlet", data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then(function successCallback(response) {
            var obj = response.data;
            var product = obj.product;
            print("product:"+product);
            var color = {content : product.color.content, price : product.color.price, color: parseInt(product.color.color,16)};
            var shape = {content : product.shape.content, price : product.shape.price};
            var size =  {size : product.size.size, width: product.size.width, height: product.size.height, price : product.size.price};
            print("color:"+color);
            that.saveOrder(color,shape,size,product.imgSrc,product.overview);
        }, function errorCallback(response) {
            alert("ouch");
        });
    }
});


