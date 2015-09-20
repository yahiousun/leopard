#leopard
A javascript HTML5 media preloader

##Usage

    leopard ( filesArray, options );

##Options

###type###
String, accept 'image', 'audio', 'video', 'auto', default value 'auto'.

###onloadstart###
Function, onloadstart callback, return arguments ( that ),
that: leopard instance.

###onprogress###
Function, onprogress callback, return arguments ( that ),
that: leopard instance.

###onerror###
Function, onerror callback, return arguments ( errorObject, that ),
errorObject: error object,
that: leopard instance.

    errorObject: {
        url: '', // error source url
        code: '', // error code
        msg: '' // error message
    }

**error codes**

    leopard.fail = {
        '0': 'Unkonwn error.',
        '1': 'Unknown source type.',
        '2': 'Unsupported source mime type.'
    }

###onload###
Function, onload callback, all file load success, return arguments ( that ),
that: leopard instance.

###onloadend###
Function, onloadend callback, no matter success or failure, return arguments ( that ),
that: leopard instance.