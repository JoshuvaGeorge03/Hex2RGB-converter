var onlineEventListener;
var offlineEventListener;
(function() {
    document.addEventListener('DOMContentLoaded', addListener);
}());

function addListener() {
    // window.addEventListener('online', function online() {
    //     console.log('i am online');
    // });
    // window.addEventListener('offline', function offline() {
    //     console.log('i am offline');
    // });
    onlineEventListener = rxjs.fromEvent(window, 'online').pipe(
        rxjs.operators.switchMap(() => {
            // const networkResult = await fetch('https://httpbin.org/');
            // console.log('network result', networkResult);
            // if (networkResult.ok) {
            //     return true;
            // } else {
            //     return false;
            // }
            return covertPromiseToObservable().pipe(rxjs.operators.catchError((error) => {
                console.log('error in fetch', error);
                return rxjs.of({
                    ok: false
                });
            }))
        }),
        rxjs.operators.map((network) => {
            console.log("network", network);
            // if (network !== 'error') {
            if (network.ok) {
                return true
            } else {
                return false;
            }
            // } else {
            //     return false;
            // }
        })
    )
    offlineEventListener = rxjs.fromEvent(window, 'offline').pipe(
        rxjs.operators.map(() => 'you are offline')
    )
    onlineEventListener.subscribe((value) => {
        // if (value) {
        //     console.log('i am online');
        // } else {
        //     console.log('you are online, but not really online');
        // }
        console.log("online", value);
    });
    offlineEventListener.subscribe(function(value) {
        console.log(value);
    });
}
var hex = document.querySelector('#hex');
var rgb = document.querySelector('#rgb');

function checkHex(hex) {
    const hexRegex = /^[#]*([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i
    if (hexRegex.test(hex)) {
        return true;
    }
}

function checkHex(hex) {
    const hexRegex = /^[#]*([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i
    if (hexRegex.test(hex)) {
        return true;
    }
}

function checkRgb(rgb) {
    const rgbRegex = /([R][G][B][A]?[(]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])(\s*,\s*((0\.[0-9]{1})|(1\.0)|(1)))?[)])/i
    if (rgbRegex.test(rgb)) {
        return true
    }
}
// Parse Function
function modifyHex(hex) {
    if (hex.length == 4) {
        hex = hex.replace('#', '');
    }
    if (hex.length == 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return hex;
}

// Converting Functions
function hexToRgb(hex) {
    let x = [];
    hex = hex.replace('#', '')
    if (hex.length != 6) {
        hex = modifyHex(hex)
    }
    x.push(parseInt(hex.slice(0, 2), 16))
    x.push(parseInt(hex.slice(2, 4), 16))
    x.push(parseInt(hex.slice(4, 6), 16))
    return "rgb(" + x.toString() + ")"
}

function rgbToHex(rgb) {
    let y = rgb.match(/\d+/g).map(function(x) {
        return parseInt(x).toString(16).padStart(2, '0')
    });
    return y.join('').toUpperCase()
}

// Helper Functions
function addPound(x) {
    return '#' + x;
}

// Function to add cross mark on error values
function errorMark() {
    if (checkHex(hex.value)) {
        document.getElementById('hexError').classList.add('hidden');
    } else {
        document.getElementById('hexError').classList.remove('hidden');
    }
    if (checkRgb(rgb.value)) {
        document.getElementById('rgbError').classList.add('hidden');
    } else {
        document.getElementById('rgbError').classList.remove('hidden');
    }
}

// Finding Contrast Ratio to change text color. Thanks https://stackoverflow.com/a/11868398/10796932
function getContrastYIQ(hexcolor) {
    if (checkHex(hexcolor)) {
        hexcolor = hexcolor.replace("#", '')
    } else {
        hexcolor = rgbToHex(hexcolor)
    }
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

function checkBG(str) {
    if (str == 'black') {
        document.body.classList.add('dark')
    } else if (str == 'white') {
        document.body.classList.remove('dark')
    }
}

// Adding Event Listeners
hex.addEventListener('keyup', function() {
    let color = hex.value
    if (checkHex(color)) {
        color = modifyHex(color);
        document.body.style.backgroundColor = addPound(color);
        checkBG(getContrastYIQ(color))
        rgb.value = hexToRgb(color);
    }
})
hex.addEventListener('blur', function() {
    if (checkHex(hex.value)) {
        hex.value = modifyHex(hex.value)
        if (hex.value[1] != '#') {
            if (hex.value[0] != '#') {
                hex.value = addPound(hex.value);
            }
        }
    }
})
rgb.addEventListener('keyup', function() {
    let color = rgb.value
    if (checkRgb(color)) {
        hex.value = color = addPound(rgbToHex(color))
        document.body.style.backgroundColor = color;
        checkBG(getContrastYIQ(color))
    }
})
document.addEventListener('keyup', function() {
    errorMark();
})

function covertPromiseToObservable() {
    return rxjs.from(fetch('https://httpbin.org/'));
}