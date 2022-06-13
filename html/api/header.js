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
        // location.reload();

        window.location.href = '/html/index.html';
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
        var count = json.data.cart_items.length
        $(".cart_bt strong").text(count)

        $(json.data.cart_items).each(function (i, v) {
            var product = v.product
            var product_option = v.product_option

            var html = `
        <li>
            <a href="product-detail.html?product_id=`+ product.id + `">
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

    //Xử lí favorites trên header
    var favUrl = 'https://electronics-api.herokuapp.com/user/favorites'
    var bearer = 'Bearer ' + token;

    const favOptions = {
        method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
    }

    fetch(favUrl, favOptions).then(res => res.json()).then(json => {
        $(json.data).each(function (i, v) {
            var product = v.product

            var html = `
        <li>
            <a href="product-detail.html?product_id=`+ product.id + `">
                <figure><img src="`+ product.thumbnail_url + `"
                        data-src="`+ product.thumbnail_url + `" alt="" width="50"
                        height="50" class="lazy"></figure>
                <strong><span>` + truncate(product.name) + `</span>` + `</strong>
            </a>
            <a href="#0" class="action"><i class="ti-trash"></i></a>
        </li>
        `
            $("#wishlist-menu > ul").append(html)
        });
    });


    // End of checking login
});