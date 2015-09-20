#leopard
A javascript HTML5 media preloader

##Usage

|| **Options** || **Type** || **Accept** ||
|| type || String || auto Automatic detection type ||

    leopard( [
        '../images/001.jpg',
        '../images/002.jpg',
        '../images/003.jpg',
        '../audios/001.mp3',
        '../audios/002.mp3',
        '../videos/001.mp3'
    ], {
        type: 'auto',
        onloadstart: function ( that ) {
            // onloadstart handle
        },
        onload: function ( that ) {
            // onload handle
        },
        onprogress: function ( that ) {
            // onprogress handle
            console.log( that.loaded.length + '/' + that.resources.length );
        },
        onloadend: function ( that ) {
            // onloadend handle
        },
        onerror: function ( error, that ) {
            // onerror handle
            that.abort() // abort preload
        }
    } );