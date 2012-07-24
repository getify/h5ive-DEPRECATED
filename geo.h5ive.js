/*! geo.h5ive.js | (c) Trevor Landau | MIT License: http://getify.mit-license.org */

(function(h5){
	'use strict';
	if (!h5) throw new Error("storage.h5api: core.h5api required.");

	var pubsub = new h5.PubSub();
	var geo = window.navigator.geolocation;

	var methods = {
		get: 'getCurrentPosition',
		watch: 'watchPosition'
	}
	var id;
	h5.geo = {

		get: function get( opts ) {
			opts = opts || {};

			// todo rename this to something more entertaining
			opts.enableHighAccuracy = opts.high; 
			opts.maximumAge = opts.age;
			var self = this;
			id = geo[ opts.method || methods.get ]( function ( pos ) {
				self.lastPosition = pos;

				// Save some typing
				var ret = [ pos.coords.latitude, pos.coords.longitude, pos ];

				// Is anybody listening?
				if ( opts.method === methods.watch ) {
					i++;
					pubsub.trigger.apply( pubsub, ['update'].concat( ret ) );
				} else {
					opts.success.apply( opts.ctx, ret );
				}
			}, 
			function ( err ) {
				if ( opts.method === methods.watch ) {
					pubsub.trigger( 'error', err );
				} else {
					opts.error.apply( opts.ctx, arguments );
				}
			}, opts );
			return this;
			
		},

		watch: function watch( opts ) {
			this.clear();
			opts = opts || {};
			opts.method = methods.watch;


			return this.get( opts );

		},

		// Should clear wipe out listeners?
		// Perhaps it should be an option
		clear: function clear() {
			if ( id ) {
				geo.clearWatch( id );
				id = null;
			}
			return this;
		},

		onUpdate: function onUpdate( fn, ctx ) {
			pubsub.on( 'update', fn, ctx );	
			return this;
		},

		onError: function onError( fn, ctx ) {
			pubsub.on( 'error', fn, ctx );	
			return this;
		}
	};
})(this.h5);

