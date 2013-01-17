/*! geo.h5ive.js */

// Originally added by Trevor Landau | http://github.com/landau
(function( h5 ) {

	'use strict';
	if (!h5) throw new Error("storage.h5api: core.h5api required.");

	var geo = window.navigator.geolocation;

	var methods = {
		get: 'getCurrentPosition',
		watch: 'watchPosition'
	};

	// Watch id
	var id;

	// In case of watch id needs to be automatically cleared
	var clearTimer;

	h5.geo = {

		/**
		 * @method get
		 * 
		 * @param opts {Object}
		 * @option ctx {Object} - A context for callbacks to be called with
		 * @option success {Function} - Success Callback passes back lat, lon, and Position Object
		 * @option error {Function} - Error Callback if geolocation fails passes PositionError Object
		 * @option method {String} - A string denoting what method to run ( see methods object )
		 * *** See Docs for more info on these options
		 * @option enableHighAccuracy {Boolean}  
		 * @option maximumAge {Number} 
		 * @option timeout {Number} 
		 *
		 * @return h5.geo
		 */
		get: function get( opts ) {
			opts = opts || {};

			id = geo[ opts.method || methods.get ]( function ( pos ) {
				// Make available to object
				this.position = pos;
				this.latitude = pos.coords.latitude;
				this.longitude = pos.coords.longitude;
				this.timestamp = new Date( pos.timestamp );

				opts.success.call( opts.ctx || this, pos.coords.latitude, pos.coords.longitude, pos );


				if ( opts.method === methods.get ) {
					id = null;
				} else { 
					// only set timer once
					if (  !clearTimer && opts.clearTime ) {
						clearTimer = setTimeout(function () {
							this.clear();	
						}.bind( this ), opts.clearTime );
					}
				} // END IF

			}.bind( this ), opts.error.bind( opts.ctx || this ), opts )
			return this;
			
		},

		/**
		 * @method watch
		 * @description simple wrapper facade for the `get` method
		 * 				Adds the watch method  to the options object
		 */
		watch: function watch( opts ) {
			this.clear();
			opts = opts || {};
			opts.method = methods.watch;

			return this.get( opts );

		},

		/**
		 * @method clear
		 * @description simple wrapper facade for the native `clear` method
		 * 				wipes out the id for you
		 */
		clear: function clear() {
			if ( id ) {
				geo.clearWatch( id );
				id = null;
			}
			if ( clearTimer ) {
				clearTimeout( clearTimer )
				clearTimer = null;
			}
			return this;
		}
	};
})( this.h5 );

