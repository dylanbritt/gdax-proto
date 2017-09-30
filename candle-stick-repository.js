var sqlite3 = require('sqlite3').verbose()

module.exports = args =>
(function(arg_database) {

    function CandleStickRepository (arg_database) {
        if(!arg_database) {
            throw "arg_database is missing";
        }
        var _database = arg_database;

        this.insertCandleStick = function(currencyPair, open, close, high, low, volume, dateTime, interval) {
            var db = new sqlite3.Database(_database);

            let data = [currencyPair, open, close, high, low, volume];
            let sql =
            
            `
            INSERT INTO CandleStick (
                CurrencyPair,
                Open,
                Close,
                High,
                Low,
                Volume,
                DateTime,
                Interval
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `
            
            db.run(sql, data, function(err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Row(s) inserted/updated: ${this.changes}`);
            });

            db.close();
        }

        this.getCandleSticks = function(currencyPair) {
            var db = new sqlite3.Database(_database);

            let sql = 
            `
            SELECT 
                CurrencyPair currencyPair,
                Open open,
                Close close,
                High high,
                Low low,
                Volume volume,
                DateTime dateTime,
                Interval interval
            FROM CandleStick
            WHERE CurrencyPair = (?)
            `;

            db.all(sql, [currencyPair], (err, rows) => {
                if (err) {
                throw err;
                }
                rows.forEach((row) => {
                    console.log(`${row.currencyPar},
                    ${row.open},
                    ${row.close},
                    ${row.high},
                    ${row.low},
                    ${row.volume},
                    ${row.dateTime},
                    ${row.interval}`);
                });
            });

            db.close();
        }
    }

    return new CandleStickRepository(arg_database);
})(args);