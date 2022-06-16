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
	var pageNumber
	var page = get('page')
	var categoryId = get('category_id')

	var filter = ''
	if (get('brand_ids')) {
		filter += '&brand_ids=' + get('brand_ids')
	}
	if (get('min_price') && get('max_price')) {
		filter += '&min_price=' + get('min_price') + '&max_price=' + get('max_price')
	}

	//Url của api
	var limit = '9'
	url = 'http://localhost:1323/products/list_by_category?limit=' + limit + '&page=' + page.toString() + '&category_id=' + categoryId + filter

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
		pageNumber = Math.ceil(json.count / limit)
		for (var i = 0; i < json.data.length; i++) {
			//Hiển thị tên sản phẩm mra HTML
			var obj = json.data[i];
			var newDiv = document.createElement('div');
			newDiv.className = 'col-6 col-md-4'
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
        								<span class="new_price">` + toVND(obj.price) + ` đ</span>
        								<span class="old_price">` + toVND(obj.price + obj.price * 0.2) + ` đ</span>
        							</div>
        							<ul>
        								<li><a href="#add-to-cart" class="tooltip-1" data-toggle="tooltip" data-placement="left"
        										title="Thêm vào giỏ hàng"><i class="ti-shopping-cart"></i><span>Thêm vào giỏ hàng</span></a></li>
        							</ul>
        						</div>     
        `;
			document.getElementById("list_product").appendChild(newDiv)
		}

		//Pagination
		var html = ""
		if (pageNumber > 1) {

			if (page != 1) {
				var previous = page - 1
				$(".pagination").append(`<li><a href="/html/list-product.html?page=` + previous + `&category_id=` + categoryId + `" class="prev page" title="previous page">&#10094;</a></li>`)
			}

			for (var i = 1; i <= pageNumber; i++) {
				if (i == page) {
					html = `<li>
								<a href="/html/list-product.html?page=`+ i + `&category_id=` + categoryId + `" class="active page">` + i + `</a>
							</li>`
				} else {
					html = `<li>
								<a  href="/html/list-product.html?page=`+ i + `&category_id=` + categoryId + `" class="page">` + i + `</a>
							</li>`
				}
				$(".pagination").append(html)
			}
			if (page != pageNumber) {
				var next = parseInt(page) + 1
				$(".pagination").append(`<li><a href="/html/list-product.html?page=` + next + `&category_id=` + categoryId + `" class="next page" title="next page">&#10095;</a></li>`)
			}
		}
		else {
			// $(".pagination").append(`<li><a  href="#0" class="prev page" title="previous page">&#10094;</a></li>`)
			html = `<li>
								<a  href="/html/list-product.html?page=1` + `&category_id=` + categoryId + `" class="active page">1</a>
							</li>`
			$(".pagination").append(html)
			// $(".pagination").append(`<li><a href="#0" class="next page" title="next page">&#10095;</a></li>`)
		}

		$('a[href="#add-to-cart"]').click(function () {
			var productId = $(this).parent().parent().parent().find("figure").find("a").attr("product_id")
			var quantity = 1

			//frontend
			$("#cart-menu > ul").append(`
				<li>
				<a href="product-detail.html?product_id=`+ productId + `">
					<figure><img src="img/products/shoes/1.jpg"
							data-src="img/products/shoes/1.jpg" alt="" width="50"
							height="50" class="lazy"></figure>
					<strong><span>`+ quantity + `x ` + productId + `</span>` + toVND(100000) + `</strong>
				</a>
				<a href="#0" class="action"><i class="ti-trash"></i></a>
			</li>
       		`)
			//

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
						$(".cart_bt strong").text(parseInt($(".cart_bt strong").text()) + 1)
					}
					if (status2 != 200) {
					}
					if (status2 == 401) {
					}
				})
				.catch(error => console.log('Error:', error));
		});
	});

	$(".pagination").on("click", ".page", function (event) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	brandUrl = 'http://localhost:1323/products/list_by_category?limit=' + limit + '&page=' + page.toString() + '&category_id=' + categoryId

	const brandOptions = {
		method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
		headers: { 'Content-Type': 'application/json' },
	}

	fetch(brandUrl, brandOptions).then(res => res.json()).then(json => {
		var clean = json.brands.filter((arr, index, self) =>
			index === self.findIndex((t) => (t.id === arr.id)))

		$(clean).each(function (i, v) {
			var html = ''
			html += `
										<li>
											<label class="container_check"> `+ v.name + ` <small>12</small>
												<input type="checkbox" name="`+ v.name + `" value="` + v.id + `">
												<span class="checkmark"></span>
											</label>
										</li>
			`
			$("#filter_brand > ul").append(html)
		});
	});

	//xử lí filter
	$("#apply").click(function () {
		var brand_ids = [];
		$('ul.brands').find("input[type='checkbox']:checked").each(function () {
			brand_ids.push($(this).val());
		});

		var min = 999999999
		var max = 0
		$('ul.prices').find("input[type='checkbox']:checked").each(function () {
			min = $(this).attr("min")
			max = $(this).attr("max")
		});

		var url = "/html/list-product.html?page=1" + "&category_id=" + categoryId

		if (brand_ids.length > 0) {
			url += "&brand_ids=" + brand_ids.toString()
		}
		if (min && max) {
			url += "&min_price=" + min + "&max_price=" + max
		}

		window.location.href = url;
	});
	$("#reset").click(function () {
		var url = "/html/list-product.html?page=" + page + "&category_id=" + categoryId
		window.location.href = url;
	});

});