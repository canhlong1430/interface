$(document).ready(function () {
	function get(name) {
		if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
			return decodeURIComponent(name[1]);
	}

	var page = get('page')

	//Url của api
	var limit = '9'
	var offset = page - 1
	url = 'https://electronics-api.herokuapp.com/products?limit=' + limit + '&offset=' + offset.toString()

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
			newDiv.className = 'col-6 col-md-4'
			newDiv.innerHTML = `
        						<div class="grid_item">
        							<span class="ribbon off">-30%</span>
        							<figure>
										<a href="product-detail-2.html?product_id=` + obj.id + `">
        									<img class="img-fluid lazy"
        										src="` + obj.thumbnail_url + `"
        										data-src="` + obj.thumbnail_url + `" alt="">
        								</a>
        								<!-- <div data-countdown="2019/05/15" class="countdown"></div> -->
        							</figure>
        							<a href="product-detail-2.html?product_id=` + obj.id + `">
        								<h3>`+ obj.name + `</h3>
        							</a>
        							<div class="price_box">
        								<span class="new_price">` + obj.price + ` đ</span>
        								<span class="old_price">` + obj.price + ` đ</span>
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
			document.getElementById("list_product").appendChild(newDiv)
		}
	});



});