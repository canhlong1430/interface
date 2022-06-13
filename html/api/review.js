$(document).ready(function () {
    function get(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }
    function truncate(source) {
        return source.length > 40 ? source.slice(0, 40 - 1) + "…" : source;
    }
    function toVND(x) {
        return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }

    var token = localStorage.getItem('token')


    $("#rating-btn").click(function () {
        alert()
    });
});