/*! video.h5ive.js | (c) Kyle Simpson | MIT License: http://getify.mit-license.org */

(function(h5){

	if (!h5) throw new Error("video.h5ive: core.h5ive required.");

	h5.video = function(opts) {
		var publicAPI, VIDEO;

		VIDEO = document.createElement("video");

		function element() {
			return VIDEO;
		}

		publicAPI = {
			element: element
		};

		return publicAPI;
	};

})(this.h5);
