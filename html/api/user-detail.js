$(document).ready(function () {
    // Get data từ url. Ví dụ google.com?search=abc lấy theo từ khóa: get('search') => 'abc'
    function get(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }
    // Truncate text nếu quá dài
    function truncate(source) {
        return source.length > 30 ? source.slice(0, 30 - 1) + "…" : source;
    }
    // Convert từ số sang hiển thị dạng VND
    function toVND(x) {
        return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }

    var token = localStorage.getItem('token')

    url = 'http://localhost:1323/users/profile'
    var bearer = 'Bearer ' + token;

    const options = {
        method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
    }

    fetch(url, options).then(res => res.json()).then(json => {
        $(".profile-img > img").attr("src", json.data.avatar)
        $(".profile-head > h5").text(json.data.name)
        $(".profile-head > h6").text(json.data.email)
        $("#name").val(json.data.name)
        $("#phone").val(json.data.phone_number)
        $("#email").val(json.data.email)
        $("#birth").val(json.data.birthday.slice(0, 10))
    });

    $(".btn-save").click(function () { alert() });
    $(".btn-change-pass").click(function () { alert() });
});