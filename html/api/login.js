$(document).ready(function () {
    function get(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }

    $("#login-btn").click(function () {
        var email = $("#email").val()
        var password = $("#password_in").val()

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data:
                {
                    email: email,
                    password: password
                }
            })
        };

        url = 'https://electronics-api.herokuapp.com/login'

        var status
        fetch(url, options)
            .then((res) => {
                console.log(res.status);
                status = res.status
                return res.json();
            })
            .then(data => {
                localStorage.setItem('token', data.token);
                console.log('Success:', data.token)
                if (status == 200) {
                    window.location.href = '/html/index.html';
                }
                if (status != 200) {
                    alert("Email hoặc mật khẩu không đúng. Xin thử lại!")
                    window.location.href = '/html/account.html';
                }
            })
            .catch(error => console.log('Error:', error));
    });

    $("#test").click(function () {
        const token = localStorage.getItem('token')
        console.log(token)
    });




});