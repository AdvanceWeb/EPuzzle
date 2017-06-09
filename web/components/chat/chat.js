app.controller("chatCtrl", function ($scope, $http, fileReader, $location, dataService) {
    // chat part
    $scope.items = [];
    $scope.username =  dataService.getUserName();

    var socket = new WebSocket("ws://localhost:8080/EPuzzle/chatroom");
    function listen() {
        socket.onopen = function() {
            $("#content").append("<kbd>Welcome!</kbd></br>");
        };
        socket.onmessage = function(evt) {
            var data = JSON.parse(evt.data);
            $("#content").append("<kbd style='color: #" + data.color + ";font-size: " + data.fontSize + ";margin-top: 10px;'>" + data.userName + " Say: " + data.message + "</kbd></br>");
        };
        socket.onclose = function(evt) {
            $("#content").append("<kbd>" + "Close!" + "</kbd></br>");
        }
        socket.onerror = function(evt) {
            $("#content").append("<kbd>" + "ERROR!" + "</kbd></br>");
        }
    }

    $(function() {
        listen();
    });

    if ($scope.username == undefined || $scope.username == null) {
        alert("Please sign in first!");
        $location.path("/");
    }

    $scope.emit = function () {
        // var data = {username: dataService.getUserName(), msg: $scope.msg};
        // var transform = function (data) {
        //     return $.param(data);
        // };
        // $http.post("ChatServlet", data, {
        //     headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        //     transformRequest: transform
        // }).then(function successCallback(response) {
        //     var obj = response.data;
        //     var result = obj.result;
        //     $scope.items.push(result[0]);
        //
        //     var panel = document.getElementById("panel");
        //     panel.scrollTop = (panel.scrollHeight);
        // }, function errorCallback(response) {
        //     alert("lost connection");
        // });
        var text = $scope.msg;
        var msg = {
            "message" : text,
            "color" : "#CECECE",
            "bubbleColor" : "#2E2E2E",
            "fontSize" : "12",
            "fontType" : "黑体"
        };
        msg = JSON.stringify(msg);
        socket.send(msg);
            // $scope.items.push(result[0]);
        $scope.msg = "";
    };

    $scope.enterEvent = function(e) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.emit();
        }
    }

    // function encodeScript(data) {
    //     if(null == data || "" == data) {
    //         return "";
    //     }
    //     return data.replace("<", "&lt;").replace(">", "&gt;");
    // }
    //
    // function emit() {
    //     var text = $scope.msg;
    //     var msg = {
    //         "message" : text,
    //         "color" : "#CECECE",
    //         "bubbleColor" : "#2E2E2E",
    //         "fontSize" : "12",
    //         "fontType" : "黑体"
    //     };
    //     msg = JSON.stringify(msg);
    //     socket.send(msg);
    //     $("#content").append("<kbd style='color: #" + "CECECE" + ";float: right; font-size: " + 12 + ";'>" + text +  "</kbd><br/>");
    //     $("#msg").val("");
    // }

});
