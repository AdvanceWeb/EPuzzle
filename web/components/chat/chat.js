app.controller("chatCtrl", function ($scope, $http, fileReader, $location, $filter, dataService) {
    // chat part
    $scope.username =  dataService.getUserName();
    $scope.cusername = "";
    $scope.items = [];

    if ($scope.username == undefined || $scope.username == null) {
        alert("Please sign in first!");
        dataService.logout();
    }

    var socket = dataService.getSocket();
    if(socket){
        $("#note").append("<div>Welcome!</div></br>");
    }
    function listen() {
        socket.onopen = function() {
        };
        socket.onmessage = function(evt) {
            var data = JSON.parse(evt.data);
            if(data.ack){
                alert("connet to " + data.username);
                $scope.cusername = data.username;
                $scope.requestChat();
            }
            else if(data.username != undefined){
                alert("You're refused by: " + $scope.cusername + ". Hahaha!");
            }
            else if(data.invite){
                if(window.confirm(data.sender+" invite you to chat~!")){
                    var m = {
                        "ack" : true,
                        "username":$scope.username,
                        "cusername": data.sender
                    };
                    $scope.cusername = data.sender;
                    socket.send(JSON.stringify(m));
                    $scope.requestChat();
                }else{
                    var m = {
                        "ack" : false,
                        "username":$scope.username,
                        "cusername": data.sender
                    };
                    socket.send(JSON.stringify(m));
                }
            }
            else{
                if(data.close) {
                    alert("This account is be used again! Please re-sign-in.");
                    $location.path("/");
                }else{
                    $("#content").append("<div class=\"pull-left\">" + data.emitTime + " - " + data.sender + " Say: <br>" + data.message + "</div><br><br>");
                    var panel = document.getElementById("panel");
                    panel.scrollTop = (panel.scrollHeight);
                }
            }
        };
        socket.onclose = function(evt) {
            $("#content").append("<div>" + "The connection is closed, or your friend is not online yet." + "</div></br>");
        };
        socket.onerror = function(evt) {
            $("#content").append("<div>" + "Oh, network error! " + "</div></br>");
        };
    }

    $(function() {
        listen();
    });

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
            "emitTime" : emitTime,
            "close":false
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

    $scope.requestChat = function() {
        if ($scope.cusername == $scope.username) {
            alert("Cannot talk to yourself! Are you crazy?");
        }
        else if($scope.cusername != undefined){
            var data = {username: dataService.getUserName(), cusername: $scope.cusername};
            var transform = function (data) {
                return $.param(data);
            };
            $("#content").empty();// empty the content
            $scope.items = [];// empty the history

            $http.post("chat.ChatServlet", data, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform
            }).then(function successCallback(response) {
                var obj = response.data;
                if (obj == "wait!") {
                    // wait...
                }
                else {
                    var result = obj.result;
                    // if connect
                    if (obj.status == "success") {
                        dataService.setConnectUserName($scope.cusername);
                        // Show history
                        var i = 0;
                        for (i = 0; i < result.length; i++) {
                            $scope.items.push(result[i]);
                        }
                        $("#content").append("<div id=\"history\">↑↑↑↑↑ History ↑↑↑↑↑</div></br>");
                        var panel = document.getElementById("panel");
                        panel.scrollTop = (panel.scrollHeight);
                    }
                    else {
                        alert("You're refused by: " + $scope.cusername + ". Hahaha!");
                    }
                }
            }, function errorCallback(response) {
                alert("lost connection");
            });
        }
    }
});
