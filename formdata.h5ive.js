/*! formdata.h5ive.js */

// Originally added by Trevor Landau | http://github.com/landau
(function( h5 ) {

	'use strict';
	if ( !h5 ) throw new Error("formdata.h5api: core.h5api required.");

	/**
	 * @method formdata
	 * @description A simpler way to use formdata
	 *
	 * @param form {HTMLFormElement}
	 * @param custom {Object} key-value set to add as custom data
	 * 				
	 * @return {FormData}
	 */
	h5.formdata = function formdata( form, custom ) {
		var formData = new FormData( form );

		// Add custom data 
		custom = custom || {};
		for ( var prop in custom ) {
			formData.append( prop, custom[ prop ] );
		}
		return formData;
	};

})( this.h5 );


