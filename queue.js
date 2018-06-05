function Queue(asStack) {
    Object.defineProperties(
        this,
        {
            add: {
                enumerable: true,
                writable: false,
                value: addToQueue
            },
            next: {
                enumerable: true,
                writable: false,
                value: run
            },
            clear: {
                enumerable: true,
                writable: false,
                value: clearQueue
            },
            contents: {
                enumerable: false,
                get: getQueue,
                set: setQueue
            },
            autoRun: {
                enumerable: true,
                writable: true,
                value: true
            },
            stop: {
                enumerable: true,
                writable: true,
                value: false
            }
        }
    );

    var queue = [];
    var stop = false;
    var autoStop = false;

    function clearQueue() {
        queue = [];
        return queue;
    }

    function getQueue() {
        return queue;
    }

    function setQueue(val) {
        queue = val;
        return queue;
    }

    function addToQueue() {
        for (var i in arguments) {
            queue.push(arguments[i]);
        }
        if (!this.stop && this.autoRun) {
            this.next();
        }
    }

    function run() {
        if (this.stop) {
            return;
        }

        if (queue.length === 1 || this.autoStop) {
            stop = true;
        }

        if (queue.length) {
            queue.shift().bind(this)();
        }
    }
}

module.exports = Queue;
