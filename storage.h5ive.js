/*! storage.h5ive.js | (c) Kyle Simpson | MIT License: http://getify.mit-license.org */

(function(H5){

	if (!H5) throw new Error("storage.H5ive: core.H5ive required.");

	H5.storage = function(opts) {
		var store, publicAPI, expires;

		opts = opts || {};
		if ("expires" in opts && typeof opts.expires == "number" && opts.expires > 0) {
			expires = (New Date()) + opts.expires;
		}
		if (opts.expires == "session") store = sessionStorage;
		else store = localStorage;


		function save(data) {
			var key, val;

			for (key in data) {
				val = { "h5ive:data": data[key] };
				if (expires) val["h5ive:expires"] = expires;

				store.setItem(key,JSON.stringify(val));
			}

			return publicAPI;
		}

		function discard(keys) {
			for (var i=0; i<keys.length; i++) {
				store.removeItem(keys[i]);
			}

			return publicAPI;
		}

		function get(keys) {
			var i, val, ret, now = 0 + (new Date());

			for (i=0; i<keys.length; i++) {
				val = ret[keys[i]] = store.getItem(keys[i]);
				try {
					val = JSON.parse(val);
					if ("h5ive:data" in val) {
						if ("h5ive:expires" in val && now >= val["h5ive:expires"]) {
							delete ret[keys[i]];
							continue;
						}
						ret[keys[i]] = val["h5ive:data"];
					}
				}
				catch (err) { }
			}

			return ret;
		}

		publicAPI = {
			save: save,
			discard: discard,
			get: get
		};

		return publicAPI;
	};

})(this.H5);
