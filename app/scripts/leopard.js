/*
 * leopard
 * v 0.1
 * a html5 media preloader
 *
*/
( function ( doc, undefined ) {
	'use strict';

	var leopard = function ( resources, options ) {
		return new leopard.prototype.init(resources, options);
	};

	leopard.prototype = {
		constructor: leopard,
		resources: [],
		loaded: [],
		failed: [],
		completed: false,
		aborted: false,
		timer: null,
		init: function ( resources, options ) {
			if ( typeof ( resources ) === 'string' ) {
				resources = [resources];
			}
			this.resources = resources;
			this.options = options || leopard.defaults;
			this.preload();
		},
		preload: function () { // preload resources
			var that = this,
				i = 0;

			if ( that.options.timeout, that.options.failback && typeof ( that.options.failback === 'function' ) ) {
				that.timer = setTimeout( function () {
					that.options.failback( that );
				}, that.options.timeout );
			}

			if ( that.options.onloadstart && typeof ( that.options.onloadstart === 'function' ) ) {
				that.options.onloadstart( that );
			}

			for ( ; i < that.resources.length; i ++ ) {
				if ( typeof ( that.resources[ i ] ) === 'string' ) {
					if ( that.options.type === 'image' || that.options.type === 'audio' || that.options.type === 'video' ) {
						that.process( that.resources[ i ], that.options.type );
					} else if ( that.options.type === 'auto' ) {
						var extension = that.resources[ i ].substring( that.resources[ i ].lastIndexOf('.') + 1 ).toLowerCase();
						if ( leopard.mime [ extension ] ) {
							that.process( that.resources[ i ], leopard.mime[ extension ] );
						} else {
							that.fail( that.resources[ i ], '2' );
						}
					}
				} else if ( typeof ( that.resources[ i ] ) === 'object' ) {
					if ( that.resources[ i ].url && ( that.resources[ i ].type === 'image' || that.resources[ i ].type === 'audio' || that.resources[ i ].type === 'video' ) ) {
						that.process( that.resources[ i ].url, that.resources[ i ].type );
					} else {
						that.fail( that.resources[ i ] , '1' );
					}
				} else {
					that.fail( that.resources[ i ] , '1' );
				}
			}
		},
		process: function ( url, type ) {
			var that = this,
				entity;

			if ( that.aborted ) {
				return false;
			}

			if ( type === 'image' ) {

				entity = doc.createElement( 'img' );

				entity.addEventListener( 'load', function () {
					that.progress( url );
					entity = null;
				}, false );

				entity.addEventListener( 'error', function () {
					that.fail( url, '0' );
					entity = null;
				}, false );

				entity.src = url;

				// handle cache issue
				if (entity.complete) {
					that.progress( url );
					entity = null;
				}
			} else if ( type === 'audio' ) {
				entity = doc.createElement( 'audio' );
				entity.addEventListener( 'canplaythrough', function () {
					that.progress( url );
					entity = null;
				}, false );
				entity.addEventListener( 'error', function () {
					that.fail( url, '0' );
					entity = null;
				}, false );
				entity.src = url;
				entity.preload = 'auto';
			} else if ( type === 'video' ) {
				entity = doc.createElement( 'video' );
				entity.addEventListener( 'canplaythrough', function () {
					that.progress( url );
					entity = null;
				}, false );
				entity.addEventListener( 'error', function () {
					that.fail( url, '0' );
					entity = null;
				}, false );
				entity.src = url;
				entity.preload = 'auto';
			}

		},
		progress: function ( url ) {
			var that = this;

			if ( that.aborted ) {
				return false;
			}

			that.loaded.push( url );

			if ( that.options.onprogress && typeof ( that.options.onprogress ) === 'function' ) {
				that.options.onprogress( that );
			}

			that.complete();
		},
		fail: function ( url, code ) {
			var that = this,
				_error = {
					url: url,
					code: code,
					msg: leopard.fail[ code ]
				};
			if ( that.aborted ) {
				return false;
			}

			if ( that.options.onerror && typeof ( that.options.onerror ) === 'function' ) {
				that.options.onerror( _error, that );
			}

			that.failed.push( url );

			that.complete();
		},
		abort: function () {
			var that = this;
			that.aborted = true;
			if ( that.timer ) {
				clearTimeout( that.timer );
			}
		},
		complete: function () {
			var that = this;

			if ( ( that.completed instanceof Boolean ) && that.completed && ( that.loaded.length + that.failed.length ) === that.resources.length ) {
				return true;
			}

			if ( ( that.loaded.length + that.failed.length ) === that.resources.length ) {

				that.completed = true;

				if ( that.options.onload && typeof ( that.options.onload ) === 'function' && that.failed.length === 0 ) { // all file load success
					that.options.onload();
				}

				if ( that.options.onloadend && typeof ( that.options.onloadend === 'function' ) ) {  // load complete
					that.options.onloadend( that );
				}
			}
		}
	};

	leopard.prototype.init.prototype = leopard.prototype;

	leopard.defaults = { // default settings
		type: 'auto',
		timeout: 0,
		failback: null
	};

	leopard.mime = { // supported mime type
		bmp: 'image',
		gif: 'image',
		jpg: 'image',
		png: 'image',
		svg: 'image',
		m4a: 'audio',
		mp3: 'audio',
		oga: 'audio',
		ogg: 'audio',
		opus: 'audio',
		wav: 'audio',
		weba: 'audio',
		mp4: 'video',
		m4v: 'video',
		ogv: 'video',
		webm: 'video'
	};

	leopard.fail = { // error
		'0': 'Unkonwn error.',
		'1': 'Unknown source type.',
		'2': 'Unsupported source mime type.'
	};

	if ( typeof define === 'function' && define.amd ) { // support amd
		define( 'leopard', [], function() {
			return leopard;
		});
	} else {
		window.leopard = leopard;
	}
	
})( document );