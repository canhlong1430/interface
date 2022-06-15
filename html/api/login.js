$(document).ready(function () {
    function get(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }

    $("#login-btnn").click(function () {
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
                if (status == 200) {
                    localStorage.setItem('token', data.token);
                    console.log('Success:', data.token)
                    window.location.href = '/html/index.html';
                }
                if (status != 200) {
                    // alert("Email hoặc mật khẩu không đúng. Xin thử lại!")
                    // window.location.href = '/html/account.html';

                    $('.client').append(' <span style="color:red"> [Lỗi - Email hoặc mật khẩu không đúng!]</span>')
                    setTimeout(function () {
                        $('.client > span').hide()
                    }, 1000);
                }
            })
            .catch(error => console.log('Error:', error));
    });

    $("#register-btn").click(function () {
        var email = $("#email_2").val()
        var password = $("#password_in_2").val()
        var avatar = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        var gender = $('input[name="gender"]:checked').val();
        var birthday = "1999-01-01"
        var phone_number = $("#phone_number").val()
        var name = $("#name").val()
        if (email == "" || password == "" || avatar == "" || gender == "" || phone_number == "") {
            $('.new_client').append(' <span style="color:red"> [Lỗi - Bạn cần điền đầy đủ thông tin!]</span>')
            setTimeout(function () {
                $('.new_client > span').hide()
            }, 1000);
        } else {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data:
                    {
                        name: name,
                        avatar: avatar,
                        email: email,
                        gender: gender,
                        birthday: birthday,
                        phone_number: phone_number,
                        password: password
                    }
                })
            };

            url = 'https://electronics-api.herokuapp.com/register'

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
                        $('.new_client').append(' <span style="color:green"> [Đăng ký thành công!]</span>')
                        setTimeout(function () {
                            $('.new_client > span').hide()
                            window.location.href = '/html/account.html';
                        }, 1000);
                    }
                    if (status != 200) {
                        // alert("Email hoặc mật khẩu không đúng. Xin thử lại!")
                        // window.location.href = '/html/account.html';

                        $('.new_client').append(' <span style="color:red"> [Lỗi - Đăng ký không thành công, thử lại với email khác!]</span>')
                        setTimeout(function () {
                            $('.new_client > span').hide()
                        }, 1000);
                    }
                })
                .catch(error => {
                    console.log('Error:', error)
                    $('.new_client').append(' <span style="color:red"> [Lỗi - Đăng ký không thành công, Có lỗi xảy ra!]</span>')
                    setTimeout(function () {
                        $('.new_client > span').hide()
                    }, 1000);
                });
        }
    });

    $("#forget-password").click(function () {
        var email = $("#email_forgot").val()

        const fpOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data:
                {
                    email: email,
                }
            })
        };

        fpUrl = 'https://electronics-api.herokuapp.com/users/forget_password'

        var status
        fetch(fpUrl, fpOptions)
            .then((res) => {
                console.log(res.status);
                status = res.status

                if (status == 200) {
                    $('.client').append(' <span style="color:green"> [Mật khẩu đã được gửi!]</span>')
                    setTimeout(function () {
                        $('.client > span').hide()
                        window.location.reload()
                    }, 1000);
                }
                if (status != 200) {
                    $('.client').append(' <span style="color:red"> [Lỗi - Có lỗi xảy ra!]</span>')
                    setTimeout(function () {
                        $('.client > span').hide()
                    }, 1000);
                }

                return res.json();
            });
    });
});