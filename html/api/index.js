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

    // Checking login
    // Thêm đoạn này vào đầu mỗi scipt nếu page nào cần check login đển ẩn/hiện nút đăng xuất/đăng nhập
    var token = localStorage.getItem('token')

    //Chưa đăng nhập
    if (token == null) {
        $('a[href="#logout"]').hide()
        $('a[href="#track-order.html"]').hide()
        $('a[href="#my-order.html"]').hide()
        $('a[href="#my-profile.html"]').hide()
        $('.dropdown-cart').hide()
    }

    // Đã đăng nhập
    if (token != null) {
        $("#login-btn").hide()
    }

    $('a[href="#logout"]').click(function () {
        localStorage.removeItem('token');
        location.reload();

        // window.location.href = '/html/index.html';
    });


    //Xử lí cart trên header
    var cartUrl = 'https://electronics-api.herokuapp.com/sale/carts'
    var bearer = 'Bearer ' + token;

    const cartOptions = {
        method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
    }

    fetch(cartUrl, cartOptions).then(res => res.json()).then(json => {
        $(json.data.cart_items).each(function (i, v) {
            var product = v.product
            var product_option = v.product_option

            var html = `
        <li>
            <a href="product-detail-1.html">
                <figure><img src="`+ product.thumbnail_url + `"
                        data-src="`+ product.thumbnail_url + `" alt="" width="50"
                        height="50" class="lazy"></figure>
                <strong><span>`+ v.quantity + `x ` + truncate(product_option.name) + `</span>` + toVND(product_option.price * v.quantity) + `</strong>
            </a>
            <a href="#0" class="action"><i class="ti-trash"></i></a>
        </li>
        `
            $("#cart-menu > div > div > span").text(toVND(json.data.subtotal_price))
            $("#cart-menu > ul").append(html)
        });
    });
    // End of checking login

    //Url của api
    url = 'https://electronics-api.herokuapp.com/products?limit=900&offset=0'

    const options = {
        method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
        headers: { 'Content-Type': 'application/json' },
    }

    /* Quy ước:
        Đọc data dùng GET
        Sửa data dùng PUT
        Thêm data dùng POST
        Xóa data dùng DELETE
    */

    //Gọi api => trả về dạng Json => chạy loop đổ json ra HTML
    fetch(url, options).then(res => res.json()).then(json => {
        for (var i = 0; i < json.data.length; i++) {

            //Hiển thị tên sản phẩm mra HTML
            var obj = json.data[i];
            var newDiv = document.createElement('div');
            newDiv.innerText = obj.name;
            document.getElementById("products").appendChild(newDiv);

            //Hiển thị ảnh sản phẩm ra HTML
            var obj = json.data[i];
            var img = document.createElement('img');
            img.src = obj.thumbnail_url;
            document.getElementById("products").appendChild(img);
        }
    });

    // Tham khảo
    // https://suntech.edu.vn/http-request-trong-javascript-voi-fetch-api.sunpost.html

});