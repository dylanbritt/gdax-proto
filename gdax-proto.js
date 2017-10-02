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

// 42 days ago ==== 1000 hours
var tmpDate = (function(d){ d.setDate(d.getDate()-1); return d})(new Date)
var tmpStr = `${tmpDate.getMonth()}/${tmpDate.getDate()}/${tmpDate.getFullYear()} ${tmpDate.getHours()}:00:00`;

gdaxApi.getCurrencyPairHistory(getCurrencyPairHistoryResult, 'BTC-USD', lastYear, yesterday, 86400);

function getCurrencyPairHistoryResult(err, data) {
    console.log(data.length);
    if(err) {
        console.log(error);
    }
    
    var minVolume = Number.MAX_SAFE_INTEGER;
    var maxVolume = Number.MIN_SAFE_INTEGER;
    var volumeAndPercentage = data.map(function(datum) {

        // [ 0-time, 1-low, 2-high, 3-open, 4-close, 5-volume ],
        var time = datum[0];
        var open = datum[3];
        var close = datum[4];
        var volume = datum[5];

        if(volume < minVolume) {
            minVolume = volume;
        }
        if(volume > maxVolume) {
            maxVolume = volume;
        }

        var increase = close - open;
        var original = open;

        var res = increase / original;

        return [time, res, volume];
    });

    var volScaleMax = maxVolume - minVolume;
    var v_p_normalized = volumeAndPercentage.map(function(datum) {
        var datumVolScaleVal = (datum[2] - minVolume) / volScaleMax;
        return [datum[0], datum[1], datumVolScaleVal];
    });

    var tmpData = v_p_normalized.sort(function(a, b) {
        var aVal = a[1] + a[2];
        var bVal = b[1] + b[2];
        if(aVal < bVal) {
            return -1;
        }
        if(aVal > bVal) {
            return 1;
        }
        return 0;
    });

    var Superior_K_Means = require('superior-k-means').Superior_K_Means;
    var skm = new Superior_K_Means();
    skm.setOptions({
        centroidInitType: "grabEveryNDividedByK",
        numberOfCentroids: 10,
        isFirstAttributeUniqueIdentifier: true
    });
    skm.setMultiDimensionalVector(tmpData);
    var res = skm.compute();
    
    var centroids = res.centroids;
    var centroid1 = centroids[0].getCenterValues();
    var l1 = centroids[0].getMultiDimensionalVector().length;
    var centroid2 = centroids[1].getCenterValues();
    var l2 = centroids[1].getMultiDimensionalVector().length;
    var centroid3 = centroids[2].getCenterValues();
    var l3 = centroids[2].getMultiDimensionalVector().length;
    var centroid4 = centroids[3].getCenterValues();
    var l4 = centroids[3].getMultiDimensionalVector().length;
    var centroid5 = centroids[4].getCenterValues();
    var l5 = centroids[4].getMultiDimensionalVector().length;
    var centroid6 = centroids[5].getCenterValues();
    var l6 = centroids[5].getMultiDimensionalVector().length;
    var centroid7 = centroids[6].getCenterValues();
    var l7 = centroids[6].getMultiDimensionalVector().length;
    var centroid8 = centroids[7].getCenterValues();
    var l8 = centroids[7].getMultiDimensionalVector().length;
    var centroid9 = centroids[8].getCenterValues();
    var l9 = centroids[8].getMultiDimensionalVector().length;
    var centroid10 = centroids[9].getCenterValues();
    var l10 = centroids[9].getMultiDimensionalVector().length;

    var stop = 0;    
    
}

//looperGdax.init();

//myWebSocketClient.test();

//candleStickRepository.insertCandleStick('BTC-USD',1,2,3,4,5);

//candleStickRepository.getCandleSticks('BTC-USD');

console.log('after test');