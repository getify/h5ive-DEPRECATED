/*! core.h5ive.js | (c) Kyle Simpson | MIT License: http://getify.mit-license.org */

(function(global){

	// Trevor Landau - github.com/landau
	// expose a pub sub object to h5api users and h5api modules
	function PubSub() { 
		this._callbacks = {};	
	}

	var splt = /\s/g;
	var arraySlice = Array.prototype.slice;
	PubSub.prototype = {

		/*
		 * @method _splitEvents
		 * @param {String} events - a string to be split delimited by a space
		 * @return {Array} 
		 */
		_splitEvents: function ( events ) {
			return events.split( splt );
		},

		/*
		 * @method _hasCallbacks
		 * @param {String} events - a string to be split delimited by a space
		 * @return {Array} 
		 */
		_hasCallbacks: function ( events ) {
			events = this._splitEvents( events );
			var flag;
			//events.forEach(function
			var self = this;
			return !!( events.reduce(function ( memo, event ) {
				var callbacks = self._callbacks[ event ];
				// Has at least one event
				if ( callbacks && callbacks.length ) {
					return memo + 1;
				}
				return memo;
			}, 0));
		},


		/*
		 * @method on
		 * @param {String} events - a string of space delimted events
		 * @param {Function} fn - a callback
		 * @param {Object} ctx - The context in which to run each function on
		 * @return {self}
		 */
		on: function ( events, fn, ctx ) {
			var events = this._splitEvents( events );

			events.forEach(function( event ) {
				var callbacks = 
					this._callbacks[ event ] = ( this._callbacks[ event ] || [] );
				callbacks.push({
					fn: fn,
					ctx: ctx
				});
			}, this);

			return this;

		},

		off: function ( events, fn, ctx ) {
		
			// clear out events if fn and ctx are null or not passed

			if ( this._hasCallbacks( events ) ) {
				
			}
		},

		trigger: function ( events ) {
			var args = arraySlice.call( arguments, 1 );
			
			if ( this._hasCallbacks( events ) ) {
				this._splitEvents( events ).forEach(function ( event ) {
					var callbacks = this._callbacks[ event ] = 
						( this._callbacks[ event ] || [] );

					callbacks.forEach(function ( callback ) {
						callback.fn.apply( callback.ctx, args );
					});
				}, this);
			} // END IF
			return this;
		}
	};
	global.h5 = {
		// TODO: fill in core API functions
		PubSub: PubSub	
	};

})(this);
