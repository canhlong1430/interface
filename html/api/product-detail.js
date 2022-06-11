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
    // End of checking login

    var productId = get('product_id')

    //Url của api
    url = 'https://electronics-api.herokuapp.com/products/' + productId

    const options = {
        method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
        headers: { 'Content-Type': 'application/json' },
    }

    var brandId

    //Gọi api => trả về dạng Json => chạy loop đổ json ra HTML
    fetch(url, options).then(res => res.json()).then(json => {
        brandId = json.data.brand_id

        $(json.data.product_images).each(function (i, v) {
            switch (i) {
                case 0:
                    console.log(v.thumbnail_url)
                    $("#img1").css('background-image', 'url(' + v.url + ')')
                    $("#small-img1").css('background-image', 'url(' + v.url + ')')
                    break;
                case 1:
                    console.log(v.thumbnail_url)
                    $("#img2").css('background-image', 'url(' + v.url + ')')
                    $("#small-img2").css('background-image', 'url(' + v.url + ')')
                    break;
                case 2:
                    console.log(v.thumbnail_url)
                    $("#img3").css('background-image', 'url(' + v.url + ')')
                    $("#small-img3").css('background-image', 'url(' + v.url + ')')
                    break;
                case 3:
                    console.log(v.thumbnail_url)
                    $("#img4").css('background-image', 'url(' + v.url + ')')
                    $("#small-img4").css('background-image', 'url(' + v.url + ')')
                    break;
                case 4:
                    console.log(v.thumbnail_url)
                    $("#img5").css('background-image', 'url(' + v.url + ')')
                    $("#small-img5").css('background-image', 'url(' + v.url + ')')
                    break;
                case 5:
                    console.log(v.thumbnail_url)
                    $("#img6").css('background-image', 'url(' + v.url + ')')
                    $("#small-img6").css('background-image', 'url(' + v.url + ')')
                    break;
            }
        });


        $(".prod_info h1").text(json.data.name)
        $(".prod_info p small").text("SKU: " + json.data.sku)
        $(".prod_info p").append(json.data.short_description)
        $(".price_main .new_price").text(toVND(json.data.price))
        $(".price_main .old_price").text(toVND(json.data.price))
        $("#detail div").html(json.data.description)

        var str = `
        <div class="row justify-content-between">
        `
        for (var i = 0; i < 4; i++) {//Cho hiển thị 4 comment
            var obj = json.data.product_ratings[i];
            var user = obj.created_by
            str += `				
                <div class="col-lg-6">
											<div class="review_content">
												<div class="clearfix add_bottom_10">
													<span class="rating">
            `
            for (var j = 0; j < obj.star_number; j++) {
                str += `
                <i class="icon-star"></i>`
            }
            str += `
                 <em>`+ obj.star_number + `/5</em></span>
													<em>`+ obj.created_at + `</em>
												</div>
												<h4>`+ user.name + `</h4>
												<p>`+ obj.comment + `</p>
											</div>
				</div>
            `
        }

        str += `</div>`
        $("#rating div").html(str)

        var str = `<tbody>`
        var product = json.data.product_options[0]
        for (var i = 0; i < product.attributes.length; i++) {
            var attribute = product.attributes[i]
            str += `
            <tr>
            <td><strong>
            ` + attribute.name + `</strong></td>`

            str += `
            <td>`+ attribute.attribute_value.value + `</td>
			</tr>
            `
        }

        str += `</tbody>`

        $("#specs").html(str)


        urlBrand = 'https://electronics-api.herokuapp.com/products/list_by_brand?brand_id=' + brandId + '&limit=10&offset=0'
        fetch(urlBrand, options).then(res1 => res1.json()).then(json1 => {

            $(json1.data).each(function (i, v) {
                switch (i) {
                    case 0:
                        $("#related-item1 > div > a").attr("href", "product-detail-2.html?product_id=" + v.id);
                        $("#related-item1 > div > a > h3").text(truncate(v.name))
                        $("#related-item1 > div > figure > a").attr("href", "product-detail-2.html?product_id=" + v.id);
                        $("#related-item1 > div > figure > a > img").attr("src", v.thumbnail_url);
                        $("#related-item1 > div > .price_box > .new_price").text(toVND(v.price))
                        break;
                    case 1:
                        $("#related-item2 > div > a").attr("href", "product-detail-2.html?product_id=" + v.id);
                        $("#related-item2 > div > a > h3").text(truncate(v.name))
                        $("#related-item2 > div > figure > a").attr("href", "product-detail-2.html?product_id=" + v.id);
                        $("#related-item2 > div > figure > a > img").attr("src", v.thumbnail_url);
                        $("#related-item2 > div > .price_box > .new_price").text(toVND(v.price))
                        break;
                    case 2:
                        $("#related-item3 > div > a").attr("href", "product-detail-2.html?product_id=" + v.id);
                        $("#related-item3 > div > a > h3").text(truncate(v.name))
                        $("#related-item3 > div > figure > a").attr("href", "product-detail-2.html?product_id=" + v.id);
                        $("#related-item3 > div > figure > a > img").attr("src", v.thumbnail_url);
                        $("#related-item3 > div > .price_box > .new_price").text(toVND(v.price))
                        break;
                    case 3:
                        $("#related-item4 > div > a").attr("href", "product-detail-2.html?product_id=" + v.id);
                        $("#related-item4 > div > a > h3").text(truncate(v.name))
                        $("#related-item4 > div > figure > a").attr("href", "product-detail-2.html?product_id=" + v.id);
                        $("#related-item4 > div > figure > a > img").attr("src", v.thumbnail_url);
                        $("#related-item4 > div > .price_box > .new_price").text(toVND(v.price))
                        break;
                    case 4:
                        $("#related-item5 > div > a").attr("href", "product-detail-2.html?product_id=" + v.id);
                        $("#related-item5 > div > a > h3").text(truncate(v.name))
                        $("#related-item5 > div > figure > a").attr("href", "product-detail-2.html?product_id=" + v.id);
                        $("#related-item5 > div > figure > a > img").attr("src", v.thumbnail_url);
                        $("#related-item5 > div > .price_box > .new_price").text(v.price + " đ")
                        break;
                }
            });
        });
    });



});