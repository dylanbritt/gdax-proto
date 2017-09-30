#!/usr/bin/env node

var WebSocketClient = require('websocket').client;

module.exports = 

(function() {

    function MyWebSocketClient() {

    }

    MyWebSocketClient.prototype.test = function() {
        var client = new WebSocketClient();

        client.on('connectFailed', function(error) {
            console.log('Connect Error: ' + error.toString());
        });

        client.on('connect', function(connection) {
            console.log('WebSocket Client Connected');
            connection.on('error', function(error) {
                console.log("Connection Error: " + error.toString());
            });
            connection.on('close', function() {
                console.log('echo-protocol Connection Closed');
            });
            connection.on('message', function(message) {
                if (message.type === 'utf8') {
                    console.log("Received: '" + message.utf8Data + "'");
                }
            });
        
            function sendMessage() {
                if (connection.connected) {
                    var subscribe = {
                        "type": "subscribe",
                        "product_ids": [
                            // "ETH-USD",
                            // "ETH-EUR"
                            "BTC-USD"
                        ],
                        "channels": [
                            // "level2",
                            //"heartbeat",
                            {
                                "name": "ticker",
                                "product_ids": [
                                    // "ETH-BTC",
                                    // "ETH-GBP"
                                    "BTC-USD"
                                ]
                            },
                        ]
                    };
                    var msg = JSON.stringify(subscribe);
                    console.log(msg);
                    connection.sendUTF(msg);
                }
            }
            sendMessage();
        });

        client.connect('wss://ws-feed.gdax.com', 'echo-protocol');
    }

    return new MyWebSocketClient();
})();