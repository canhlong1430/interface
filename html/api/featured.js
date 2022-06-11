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

	var page = get('page')
	var categoryId = get('category_id')
	//Url của api
	var limit = '4'
	var offset = '5'
    url = 'https://electronics-api.herokuapp.com/products?limit=8&offset=0'

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

	// Tham khảo
	// https://suntech.edu.vn/http-request-trong-javascript-voi-fetch-api.sunpost.html

	//Gọi api => trả về dạng Json => chạy loop đổ json ra HTML
	fetch(url, options).then(res => res.json()).then(json => {
		for (var i = 0; i < json.data.length; i++) {

			//Hiển thị tên sản phẩm mra HTML
			var obj = json.data[i];
			var newDiv = document.createElement('div');
			newDiv.className = 'item'
			newDiv.innerHTML = `
            <div class="grid_item">
                <span class="ribbon new">New</span>
                <figure>
                    <a href="product-detail-1.html">
                        <img class="owl-lazy" src="img/products/product_placeholder_square_medium.jpg"
                            data-src="img/products/shoes/4.jpg" alt="">
                    </a>
                </figure>
                <div class="rating"><i class="icon-star voted"></i><i class="icon-star voted"></i><i
                        class="icon-star voted"></i><i class="icon-star voted"></i><i class="icon-star"></i>
                </div>
                <a href="product-detail-1.html">
                    <h3>ACG React Terra</h3>
                </a>
                <div class="price_box">
                    <span class="new_price">$110.00</span>
                </div>
                <ul>
                    <li><a href="#0" class="tooltip-1" data-toggle="tooltip" data-placement="left"
                            title="Add to favorites"><i class="ti-heart"></i><span>Add to
                                favorites</span></a></li>
                    <li><a href="#0" class="tooltip-1" data-toggle="tooltip" data-placement="left"
                            title="Add to compare"><i class="ti-control-shuffle"></i><span>Add to
                                compare</span></a></li>
                    <li><a href="#0" class="tooltip-1" data-toggle="tooltip" data-placement="left"
                            title="Add to cart"><i class="ti-shopping-cart"></i><span>Add to cart</span></a>
                    </li>
                </ul>
            </div>
            <!-- /grid_item -->
        `;
			document.getElementById("featured").appendChild(newDiv)
		}
	});



});