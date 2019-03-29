// (function() {
//     document.addEventListener('DOMContentLoaded', addListener);
// }());

// function addListener() {
//     var hex = document.querySelector('#hexCode');
//     var rgb = document.querySelector('#rgbValue');
//     hex.addEventListener('input', (ev) => {
//         console.log('input from hex code', ev.type, ev.currentTarget, ev.target);
//     }, false);
//     rgb.addEventListener('input', (ev) => {
//         console.log('input from rgb value', ev.type, ev.currentTarget);
//     });
// }
var hex = document.querySelector('#hex');
var rgb = document.querySelector('#rgb');

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