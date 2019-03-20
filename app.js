(function() {
    document.addEventListener('DOMContentLoaded', addListener);
})

function addListener() {
    var hex = document.querySelector('#hexCode');
    var rgb = document.querySelector('#rgbValue');
    hex.addEventListener('input', (ev) => {
        console.log('input from hex code', ev.type, ev.currentTarget, ev.target);
    }, false);
    rgb.addEventListener('input', (ev) => {
        console.log('input from rgb value', ev.type, ev.currentTarget);
    });
}