/*! xhr.h5ive.js | (c) Kyle Simpson | MIT License: http://getify.mit-license.org */

(function(h5){

	if (!h5) throw new Error("xhr.h5ive: core.h5ive required.");

	h5.xhr = function(opts) {
		var XHR, publicAPI, used = false;

		function connect(url) {
			if (used) reset();
			used = true;
			for (var header in opts.headers) {
				XHR.setRequestHeader(header,opts.headers[header]);
			}
			XHR.open(opts.method,url,false,opts.user,opts.pw);
			return publicAPI;
		}

		function send(data) {
			XHR.send(data);
			return publicAPI;
		}

		function reset(newOpts) {
			XHR.removeEventListener("readystatechange",readyStateChange);
			XHR.removeEventListener("progress",progressUpdate);
			publicAPI.__raw__ = XHR = new XMLHttpRequest();
			XHR.addEventListener("readystatechange",readyStateChange);
			if (newOpts) opts = newOpts;
			processOpts();
			return publicAPI;
		}

		function success(cb) { opts.success = cb; return publicAPI; }
		function progress(cb) { opts.progress = cb; return publicAPI; }
		function error(cb) { opts.error = cb; return publicAPI; }

		function progressUpdate(evt) {
			opts.progress.call(publicAPI,{
				bytesLoaded: evt.loaded,
				bytesTotal: evt.total
			});
		}

		function readyStateChange() {
			if (XHR.readyState == 4) {
				XHR.removeEventListener("readystatechange",readyStateChange);
				XHR.removeEventListener("progress",progressUpdate);
				if (XHR.status == 200) {
					opts.success.call(publicAPI,XHR.response);
				}
				else {
					opts.error.call(publicAPI,XHR.status,XHR.statusText);
				}
			}
		}

		function processOpts() {
			opts = opts || {};
			opts.method = opts.method || "GET";
			opts.success = opts.success || function(){};
			opts.progress = opts.progress || function(){};
			opts.error = opts.error || function(){};
			opts.headers = opts.headers || {};
			opts.responseType = opts.responseType || "text"; // TODO: check this
		}

		publicAPI = {
			__raw__: XHR,
			connect: connect,
			send: send,
			success: success,
			progress: progress,
			error: error,
			reset: reset
		};

		processOpts();

		return publicAPI;
	};

})(this.h5);
