var looper = require('./looper');
var gdaxApi = require('./gdax-api');

module.exports = 

(function() {

    function LooperGdax() {
        this.init = function() {
            function test(callback) {
                setTimeout( () => {
                    console.log('10 second timeout fired');
                    callback();
                }, 10000);
            }
            
            looper.setLogic(gdaxApi.callTicker);
            looper.loop();
        }
    }

    return new LooperGdax();
})();