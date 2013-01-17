var success = function ( lat, lon, pos ) {
	console.log( 'latitude: ' + lat );
	console.log( 'longitude: ' + lon );
	console.log( 'Position found @: ' + new Date( pos.timestamp ) );
	console.log( 'Position found @: ' + h5.geo.timestamp );
	console.log( 'Position Object: ', pos );
	console.log( 'bar' === this.foo, 'context was set on object properly' );
};

var error = function ( err ) {
	console.log( 'PositionError: ', err );
	console.log( 'bar' === this.foo, 'context was set on object properly' );
};

// Use as context
var obj = {
	foo: 'bar'
};

var opts = {
	ctx: obj,
	success: success,
	error: error,
	high: true,
	age: 1000 * 1 * 60,
	timeout: 30 * 1000
};

// Will get called once
h5.geo.get( opts );

// Will get called until cleared
h5.geo.watch( opts );
setTimeout(function () {
	h5.geo.clear();
}, 2000);

function extend( obj1, obj2 ) {
	for ( var prop in obj1 ) {
		obj2[ prop ] = obj1[ prop ];
	}
	return obj2;
}

// Will get called until cleared
// Note calling watch again will clear any existing watchers
h5.geo.watch( extend( opts, {
	// Will stop watching in 5 seconds
	clearTime: 10 * 1000
}));
