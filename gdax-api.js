var request = require('request');

module.exports = 
(function() {

    function GdaxApi() {

        this.callTicker = function(cb, args) {
            var options = {
                url: `https://api.gdax.com/products/BTC-USD/ticker`,
                headers: {
                    'User-Agent': 'request'
                }
            };
    
            request(options, function(error, response, body) {
                if (error) {
                    throw error;
                }
                console.log(body);
                cb();
            });
        }

        this.getCurrencyPairHistory = function(cb, currencyPair, start, end, granularity) {
            /*
                [
                    [ time, low, high, open, close, volume ],
                    [ 1415398768, 0.32, 4.2, 0.35, 4.2, 12.3 ],
                    ...
                ]
            */
            var options = {
                url: `https://api.gdax.com/products/${currencyPair}/candles?start=${start}&end=${end}&granularity=${granularity}`,
                headers: {
                    'User-Agent': 'request'
                }
            };
    
            request(options, function(error, response, body) {
                if (error) {
                    throw error;
                }
                //console.log(body);
                cb(0, JSON.parse(body));
            });
        }
    }

    return new GdaxApi();
})();
