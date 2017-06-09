app.controller("chatCtrl", function ($scope, $http, fileReader, $location, $filter, dataService) {
    // chat part
    $scope.username =  dataService.getUserName();
    $scope.cusername = "";
    $scope.items = [];

    var socket = new WebSocket("ws://localhost:8080/EPuzzle/chatroom/" + $scope.username);
    function listen() {
        socket.onopen = function() {
            $("#content").append("<div>Welcome! ↑↑↑↑↑ History ↑↑↑↑↑</div></br>");
        };
        socket.onmessage = function(evt) {
            var data = JSON.parse(evt.data);
            $("#content").append("<div class=\"pull-left\">"+ data.emitTime + " - " + data.sender + " Say: <br>" + data.message + "</div><br><br>");
            var panel = document.getElementById("panel");
            panel.scrollTop = (panel.scrollHeight);
        };
        socket.onclose = function(evt) {
            $("#content").append("<div>" + "Close!" + "</div></br>");
        }
        socket.onerror = function(evt) {
            $("#content").append("<div>" + "ERROR!" + "</div></br>");
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
        var text = $scope.msg;
        var sender = $scope.username;
        var date = new Date();
        var emitTime = $filter('date')(date, "yyyy-MM-dd hh:mm:ss");

        $("#content").append("<div class=\"pull-right\">" + emitTime + " - " + sender + " Say: <br>" + text + "</div><br><br>");
        var panel = document.getElementById("panel");
        panel.scrollTop = (panel.scrollHeight);
        //TODO:
        var msg = {
            "sender" : sender,
            "receiver" : $scope.cusername,
            "message" : text,
            "emitTime" : emitTime
        };
        socket.send(JSON.stringify(msg));
        $scope.msg = "";
    };

    $scope.enterEvent = function(e) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.emit();
        }
    };

    $scope.requestChat = function(){
        var data = {username: dataService.getUserName(), cusername: $scope.cusername};
        var transform = function (data) {
            return $.param(data);
        };
        $http.post("chat.ChatServlet", data, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then(function successCallback(response) {
            var obj = response.data;
            var result = obj.result;

            // if connect
            if(obj.status == "success") {
                dataService.setConnectUserName($scope.cusername);
                // Show history

                $scope.items = [];
                var i = 0;
                for (i = 0; i < result.length; i++) {
                    $scope.items.push(result[i]);
                }
                var panel = document.getElementById("panel");
                panel.scrollTop = (panel.scrollHeight);
            }
            else{
                alert("You're refused by: " + $scope.cusername + ". Hahaha!");
            }
        }, function errorCallback(response) {
            alert("lost connection");
        });
    }

});
