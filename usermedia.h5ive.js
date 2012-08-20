/*! usermedia.h5ive.js | (c) Kyle Simpson | MIT License: http://getify.mit-license.org */

(function(h5){

	if (!h5) throw new Error("userMedia.h5ive: core.h5ive required.");

	var gUM = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

	h5.userMedia = function(opts,successCB,failedCB) {
		var publicAPI, success_cb, failed_cb,
			success_args = [], failed_args = [], opts_str
		;

		function stream(cb) {
			if (!success_cb) success_cb = cb;
			else if (success_cb === true) cb.apply(h5.userMedia,success_args);
			else throw new Error("Success callback already defined.");
			return publicAPI;
		}

		function failed(cb) {
			if (!failed_cb) failed_cb = cb;
			else if (success_cb === true) cb.apply(h5.userMedia,failed_args);
			else throw new Error("Failed callback already defined.");
			return publicAPI;
		}

		function handleSuccess() {
			if (window.webkitURL) {
				arguments[0] = webkitURL.createObjectURL(arguments[0]);
			}
			if (success_cb && typeof success_cb === "function") {
				success_cb.apply(h5.userMedia,arguments);
			}
			else {
				success_cb = true;
				success_args = [].slice.call(arguments);
			}
		}

		function handleFailure() {
			if (failed_cb && typeof failed_cb === "function") {
				failed_cb.apply(h5.userMedia,arguments);
			}
			else {
				failed_cb = true;
				failed_args = [].slice.call(arguments);
			}
		}

		success_cb = successCB;
		failed_cb = failedCB;

		if (gUM) {
			for (idx in opts) { if (opts.hasOwnProperty(idx)) {
				opts_str += (opts_str != "" ? "," : "") + idx;
			}}
			try {
				gUM.call(navigator,opts,handleSuccess,handleFailure);
			}
			catch (err) {
				try {
					gUM.call(navigator,opts_str,handleSuccess,handleFailure);
				}
				catch (err2) {
					handleFailure("'getUserMedia' failed.");
				}
			}
		}
		else {
			handleFailure("'getUserMedia' is not available.");
		}

		publicAPI = {
			stream: stream,
			failed: failed
		};

		return publicAPI;
	};

})(this.h5);
