module.exports = 

(function() {
    function Looper() {
        var _self = this;
        
        function SyncObject() {
            var _isLocked = false;
            this.lock = function() {
                _isLocked = true;
            }
            this.unlock = function() {
                _isLocked = false;
            }
            this.canLock = function() {
                return !_isLocked;
            }
        }
        var syncObject = new SyncObject();
        
        var loopAgain = true;

        this.loop = function() {
            console.log('-- loop --');
            loopAgain = true;

            if(syncObject.canLock()) {
                console.log('-- lock --');
                syncObject.lock();
                executeLogic();
            }

            if(loopAgain) {
                setTimeout(_self.loop, 375);
            }
        }

        this.end = function() {
            loopAgain = false;
        }

        var _logic = function(callback) {
            console.log('_logic is not set.');
            callback();
        };
        var _logicArgs = null;
        var _callback = function(err, data) {
            if(err) {
                console.log(err);
            }
            console.log('-- unlock --');
            syncObject.unlock();
        }
        var executeLogic = function() {
            _logic(args);
        }
        this.setLogic = function(functionName, args) {
            _logic = functionName;
            if(!args) {
                args = { };
            }
            if(!args.callback || !args.callback ) {
                args.callback = _callback;
            }
            _args = args;
        }
    }
    return new Looper();
})();