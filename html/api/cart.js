$(document).ready(function () {
    // Get data từ url. Ví dụ google.com?search=abc lấy theo từ khóa: get('search') => 'abc'
    function get(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }
    // Truncate text nếu quá dài
    function truncate(source) {
        return source.length > 150 ? source.slice(0, 150 - 1) + "…" : source;
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
    }

    // Đã đăng nhập
    if (token != null) {
        $("#login-btn").hide()
    }

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

    url = 'https://electronics-api.herokuapp.com/sale/carts'
    var bearer = 'Bearer ' + token;

    const options = {
        method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
    }

    fetch(url, options).then(res => res.json()).then(json => {
        $(json.data.cart_items).each(function (i, v) {
            var product = v.product
            var product_option = v.product_option

            var html = `
            <tr>
							<td>
								<div class="thumb_cart">
									<img src="`+ product.thumbnail_url + `"
										data-src="`+ product.thumbnail_url + `" class="lazy" alt="Image">
								</div>
								<span class="item_cart">`+ truncate(product_option.name) + `</span>
							</td>
							<td>
								<strong>`+ toVND(product_option.price) + `</strong>
							</td>
							<td>
								<div class="numbers-row" id="`+ v.id + `">
									<input type="text" value="`+ v.quantity + `" id="quantity_1" class="qty2" name="quantity_1" readonly="readonly">
									<div class="inc button_inc btn_inc">+</div>
									<div class="dec button_inc btn_dec">-</div>
								</div>
							</td>
							<td>
								<strong>`+ toVND(product_option.price * v.quantity)
                + `</strong>
							</td>
							<td class="options">
								<a href="#"><i class="ti-trash"></i></a>
							</td>
			</tr>
            `
            $("#cart-list > tbody").append(html)
        });

        //Remove dấu '...' loading
        $("#payment").children().children().eq(0).children().get(0).nextSibling.remove()
        $("#payment").children().children().eq(1).children().get(0).nextSibling.remove()
        $("#payment").children().children().eq(2).children().get(0).nextSibling.remove()

        //Gắn phí ship cứng (30k)
        $("#payment").children().children().eq(0).append(toVND(json.data.subtotal_price))
        $("#payment").children().children().eq(1).append(toVND(30000))
        $("#payment").children().children().eq(2).append(toVND(json.data.subtotal_price + 30000))

        //Update cart
        $(".btn_inc").click(function () {
            var urlItem = 'https://electronics-api.herokuapp.com/sale/cart/items/' + $(this).parent().attr('id') + '/add_one'
            var bearer = 'Bearer ' + token;

            const itemOptions = {
                method: 'PUT', //tùy chọn method GET hoặc POST, PUT, DELETE
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
            }

            fetch(urlItem, itemOptions).then(res => {
                if (res.status == 200) {
                    var val = $(this).parent().find("input").val()
                    $(this).parent().find("input").val((parseInt(val, 10) + 1).toString())
                    location.reload()
                }
            });
        });

        $(".btn_dec").click(function () {
            var urlItem1 = 'https://electronics-api.herokuapp.com/sale/cart/items/' + $(this).parent().attr('id') + '/remove_one'
            var bearer = 'Bearer ' + token;

            const itemOptions = {
                method: 'PUT', //tùy chọn method GET hoặc POST, PUT, DELETE
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
            }

            fetch(urlItem1, itemOptions).then(res => {
                if (res.status == 200) {
                    var val = $(this).parent().find("input").val()
                    $(this).parent().find("input").val((parseInt(val, 10) - 1).toString())
                    location.reload()
                }
            });
        });
    });
});