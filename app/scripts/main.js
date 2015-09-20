// jshint devel:true
( function ( undefined ) {
	'use strict';

	leopard( [
		'../images/001.jpg',
		'../images/002.jpg',
		'../images/003.jpg',
		'../audios/001.flac',
		'../audios/002.flac',
		'../audios/003.mp3',
		'../audios/004.mp3'
	], {
		type: 'auto',
		onloadstart: function () {
			console.log( 'demo loadstart' );
		},
		onload: function () {
			console.log( 'demo load success' );
		},
		onprogress: function ( that ) {
			console.log( that.loaded.length + '/' + that.resources.length );
		},
		onloadend: function () {
			console.log( 'demo loadend' );
		},
		onerror: function ( error ) {
			console.log( error );
		}
	} );

} ) ();
