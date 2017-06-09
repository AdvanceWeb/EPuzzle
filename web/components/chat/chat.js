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
            $("#content").append("<kbd margin-top: 10px;'>" + data.sender + " Say: " + data.message + "</kbd></br>");
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
        var sender = dataService.getUserName();
        $("#content").append("<kbd margin-top: 10px;'>" + sender + " Say: " + text + "</kbd></br>");
        //TODO:
        var msg = {
            "sender" : sender,
            "receiver" : "",
            "message" : text,
            "emitTime" : ""
        }
        socket.send(JSON.stringify(msg));
            // $scope.items.push(result[0]);
        $scope.msg = "";
    };

    $scope.enterEvent = function(e) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.emit();
        }
    }
});
