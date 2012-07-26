window.onload = function () {
	'use strict';

	var input = document.createElement('input');
	input.value = 'bar';
	input.name = 'foo';
	
	var button = document.createElement( 'button' );
	button.type = 'submit';
	button.innerText = 'Submit';

	var form = document.createElement('form');
	form.appendChild( input );
	form.appendChild( button );

	document.body.appendChild( form );

	form.addEventListener( 'submit', function ( e ) {
		e.preventDefault();
			

		var formdata = h5.formdata( this, {
			data: 'custom',
			blob: new Blob(['a','b','c'], { type: 'text\/plain' })
		});
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/post', true);
		xhr.send( formdata );

	}, false );

};
