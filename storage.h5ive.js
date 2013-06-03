/*! storage.h5ive.js | (c) Kyle Simpson | MIT License: http://getify.mit-license.org */

(function(h5){

	if (!h5) throw new Error("storage.h5ive: core.h5ive required.");

	h5.storage = function(opts) {
		var store, publicAPI, expires;

		opts = opts || {};
		if ("expires" in opts && typeof opts.expires === "number" && opts.expires > 0) {
			expires = opts.expires + (new Date()).getTime();
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
			if (Object.prototype.toString.call(keys) != "[object Array]") keys = [keys];
			for (var i=0; i<keys.length; i++) {
				store.removeItem(keys[i]);
			}

			return publicAPI;
		}

		function get(keys) {
			var i, val, ret = [], now = (new Date()).getTime();

			if (Object.prototype.toString.call(keys) !== "[object Array]") keys = [keys];

			for (i=0; i<keys.length; i++) {
				val = ret[keys[i]] = store.getItem(keys[i]);
				try {
					val = JSON.parse(val);
					if ("h5ive:data" in val) {
						if ("h5ive:expires" in val && now >= val["h5ive:expires"]) {
							delete ret[keys[i]];
							store.removeItem(keys[i]);
							continue;
						}
						ret[keys[i]] = val["h5ive:data"];
					}
				}
				catch (err) { }
			}

			if (keys.length < 2) {
				if (keys.length > 0 && (keys[0] in ret)) return ret[keys[0]];
				else return;
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

})(this.h5);
