var request = require('request');
var gdaxApi = require('./gdax-api');
var looperGdax = require('./looper-gdax');
var myWebSocketClient = require('./my-web-socket-client');
var candleStickRepository = require('./candle-stick-repository')('./db/data.db');

console.log('begin gdax-proto');


var tmp = (function(d){ d.setDate(d.getDate()-1); return d})(new Date)
var yesterday = new Date(`${tmp.getMonth()}/${tmp.getDate()}/${tmp.getFullYear()}`);
var lastYear = new Date(`${tmp.getMonth()}/${tmp.getDate()}/${tmp.getFullYear() - 1}`);
console.log(yesterday);
console.log(lastYear);
gdaxApi.getCurrencyPairHistory(getCurrencyPairHistoryResult, 'BTC-USD', lastYear, yesterday, 86400);

function getCurrencyPairHistoryResult(err, data) {
    console.log(data.length);
    if(err) {
        console.log(error);
    }

    // Create the data 2D-array (vectors) describing the data 
    let vectors = new Array();
    for (let i = 0 ; i < data.length ; i++) {
        //vectors[i] = [ data[i][1], data[i][2], data[i][3], data[i][4], data[i][5]];
        vectors[i] = [data[i][4] - data[i][3]];
    }
    
    const kmeans = require('node-kmeans');
    var Superior_K_Means = require('superior-kmeans').Superior_K_Means;
    var skm = new Superior_K_Means();
    skm.setOptions({});
    var result = skm.setMultiDimensionalVector(data);
    var centroids = skm.compute()[0].getCenterValues();
    var stop = 0;
    // kmeans.clusterize(vectors, {k: 4}, (err,res) => {
    //     if (err) console.error(err);
    //     //else console.log('%o',res);

    //     var fs = require('fs');
    //     fs.writeFile("./test", JSON.stringify(res), function(err) {
    //         if(err) {
    //             return console.log(err);
    //         }
        
    //         console.log("The file was saved!");
    //     }); 
    // });
}
//looperGdax.init();

//myWebSocketClient.test();

//candleStickRepository.insertCandleStick('BTC-USD',1,2,3,4,5);

//candleStickRepository.getCandleSticks('BTC-USD');


console.log('after test');