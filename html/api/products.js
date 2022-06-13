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
	//Url của api
	var limit = '9'
	url = 'https://electronics-api.herokuapp.com/products/list_by_category?limit=' + limit + '&page=' + page.toString() + '&category_id=' + categoryId

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
		pageNumber = Math.floor(json.count / limit)
		for (var i = 0; i < json.data.length; i++) {

			//Hiển thị tên sản phẩm ra HTML
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
        								<span class="old_price">` + toVND(obj.price) + ` đ</span>
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
			$(".pagination").append(`<li><a  href="#0" class="prev page" title="previous page">&#10094;</a></li>`)
			html = `<li>
								<a  href="/html/list-product.html?page=1` + `&category_id=` + categoryId + `" class="active page">1</a>
							</li>`
			$(".pagination").append(html)
			$(".pagination").append(`<li><a href="#0" class="next page" title="next page">&#10095;</a></li>`)
		}

		$('a[href="#add-to-cart"]').click(function () {
			var productId = $(this).parent().parent().parent().find("figure").find("a").attr("product_id")
			var quantity = 1

			var cartUrl = "https://electronics-api.herokuapp.com/add_to_cart"
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
});