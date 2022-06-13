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
    url = 'https://electronics-api.herokuapp.com/products/recommend'
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

    //Chưa đăng nhập
    if (token == null) {
    }

    // Đã đăng nhập
    if (token != null) {
        $("#recommender").html(`
        <div class="main_title">
        <h2>Gợi ý dành cho bạn</h2>
            <span>Dành cho bạn</span>
            <p>Các sản phẩm có thể bạn quan tâm</p>
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
										<a href="product-detail.html?product_id=` + obj.id + `">
        									<img class="img-fluid lazy"
        										src="` + obj.thumbnail_url + `"
        										data-src="` + obj.thumbnail_url + `" alt="">
        								</a>
        								<!-- <div data-countdown="2019/05/15" class="countdown"></div> -->
        							</figure>
        							<a href="product-detail-2.html?product_id=` + obj.id + `">
        								<h3>`+ truncate(obj.name) + `</h3>
        							</a>
        							<div class="price_box">
        								<span class="new_price">` + toVND(obj.price) + ` đ</span>
        								<span class="old_price">` + toVND(obj.price) + ` đ</span>
        							</div>
        							<ul>
        								<li><a href="#0" class="tooltip-1" data-toggle="tooltip" data-placement="left"
        										title="Add to favorites"><i class="ti-heart"></i><span>Add to
        											favorites</span></a></li>
        								<li><a href="#0" class="tooltip-1" data-toggle="tooltip" data-placement="left"
        										title="Add to compare"><i class="ti-control-shuffle"></i><span>Add to
        											compare</span></a></li>
        								<li><a href="#0" class="tooltip-1" data-toggle="tooltip" data-placement="left"
        										title="Add to cart"><i class="ti-shopping-cart"></i><span>Add to
        											cart</span></a></li>
        							</ul>
        						</div>     
        `;
                    document.getElementById("recommended").appendChild(newDiv)
                }
            }
        });
    }


    // Tham khảo
    // https://suntech.edu.vn/http-request-trong-javascript-voi-fetch-api.sunpost.html

});