/*! worker.h5ive.js | (c) Alex Lee | MIT License: http://getify.mit-license.org */

(function(h5) {

	if (!h5) {
    throw new Error("worker.h5ive: core.h5ive required.");
  }

  var _self = this.self;

  h5.worker = function(opts) {
    var publicAPI, worker;

    if (typeof window === "undefined" && opts === _self) {
      // Inside a Worker
      worker = _self;
    }
    else if (typeof opts === "string" ) {
      worker = new Worker(opts);
    }

    function send(data) {
      worker.postMessage(data);
      return publicAPI;
    }

    function receive(handler) {
      worker.onmessage = function(e) {
        handler.call(publicAPI, e.data, e);
      };
      return publicAPI;
    }

    function error(handler) {
      worker.onerror = handler;
      return publicAPI;
    }

    function abort() {
      worker.terminate();
      return publicAPI;
    }

    publicAPI = {
      __raw__ : worker,
      send : send,
      receive : receive,
      error : error,
      abort : abort
    };

    return publicAPI;
  };
}(this.h5));
