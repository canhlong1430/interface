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

    //Url của api
    url = 'http://localhost:1323/products/recommend'
    var bearer = 'Bearer ' + token;

    const options = {
        method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
    }

    // Checking login để ẩn/hiện phầm Recommend
    var token = localStorage.getItem('token')

    //check user đủ 3 rating
    var orderurl = 'http://localhost:1323/product/ratings?limit=50&page=1'
    var bearer = 'Bearer ' + token;
    const orderoptions = {
        method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
    }

    var ratingCount = 0
    fetch(orderurl, orderoptions).then(res => res.json()).then(json => {
        ratingCount = json.count

        // Đã đăng nhập
        if (token != null && ratingCount >= 3) {
            $("#recommender").html(`
        <div class="main_title">
        <h2>GỢI Ý DÀNH CHO BẠN</h2>
            <span>DÀNH CHO BẠN</span>
            <p>Những sản phẩm có thể bạn quan tâm</p>
        </div>
        <div class="row small-gutters" id=recommended>

            <!-- /col -->
        </div>`
            )

            //Gọi api => trả về dạng Json => chạy loop đổ json ra HTML
            fetch(url, options).then(res => res.json()).then(json => {
                for (var i = 0; i < json.data.length; i++) {
                    if (i < 8) {
                        //Hiển thị tên sản phẩm mra HTML
                        var obj = json.data[i];
                        var newDiv = document.createElement('div');
                        newDiv.className = 'col-6 col-md-4 col-xl-3'
                        newDiv.innerHTML = `
        						<div class="grid_item">
								
        							<figure>
										<a href="product-detail.html?product_id=` + obj.id + `" product_id="` + obj.id + `">
        									<img class="img-fluid lazy"
        										src="` + obj.thumbnail_url + `"
        										data-src="` + obj.thumbnail_url + `" alt="">
        								</a>
        								<!-- <div data-countdown="2019/05/15" class="countdown"></div> -->
        							</figure>
        							<a href="product-detail.html?product_id=` + obj.id + `">
        								<h3>`+ truncate(obj.name) + `</h3>
        							</a>
        							<div class="price_box">
        								<span class="new_price">` + toVND(obj.price) + `</span>
        								<span class="old_price">` + toVND(obj.price + obj.price * 0.2) + `</span>
        							</div>
        							<ul>
        								<li><a href="#add-to-cartrec" class="tooltip-1" data-toggle="tooltip" data-placement="left"
        										title="Thêm vào giỏ hàng"><i class="ti-shopping-cart"></i><span>Thêm vào giỏ hàng</span></a></li>
        							</ul>
        						</div>     
        `;
                        document.getElementById("recommended").appendChild(newDiv)
                    }
                }

                $('a[href="#add-to-cartrec"]').click(function () {
                    if (token == null) {
                        var productId = $(this).parent().parent().parent().find("figure").find("a").attr("product_id")
                        var quantity = 1
                        localStorage.setItem('productId', data.productId);
                        localStorage.setItem('quantity', data.quantity);
                        window.location.href("account.html");

                    }
                    else {
                        var productId = $(this).parent().parent().parent().find("figure").find("a").attr("product_id")
                        var quantity = 1

                        var cartUrl = "http://localhost:1323/add_to_cart"
                        var bearer = 'Bearer ' + token;

                        const cartOptions = {
                            method: 'POST', //tùy chọn method GET hoặc POST, PUT, DELETE
                            headers: {
                                'Authorization': bearer,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                data:
                                {
                                    product_option_id: parseInt(productId),
                                    quantity: parseInt(quantity),
                                }
                            })
                        };

                        var status2
                        fetch(cartUrl, cartOptions)
                            .then((res) => {
                                console.log(res.status);
                                status2 = res.status
                                return res.json();
                            })
                            .then(data => {
                                if (status2 == 200) {
                                    location.reload()
                                }
                                if (status2 != 200) {
                                }
                                if (status2 == 401) {
                                }
                            })
                            .catch(error => console.log('Error:', error));
                    }

                });
            });
        }
    });





    // Tham khảo
    // https://suntech.edu.vn/http-request-trong-javascript-voi-fetch-api.sunpost.html

});