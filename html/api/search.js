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
    var pageNumber

    //Url của api
    var limit = '9'
    var keyword = get('keyword')
    var searchUrl = 'http://localhost:1323/products/search?limit=' + limit + '&page=' + page.toString() + '&keyword=' + keyword

    const searchOptions = {
        method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
        headers: { 'Content-Type': 'application/json' },
    }

    fetch(searchUrl, searchOptions).then(res => res.json()).then(json => {
        pageNumber = Math.floor(json.count / limit)
        for (var i = 0; i < json.data.length; i++) {

            //Hiển thị tên sản phẩm mra HTML
            var obj = json.data[i];
            var newDiv = document.createElement('div');
            newDiv.className = 'col-6 col-md-4'
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
        							<a href="product-detail.html?product_id=` + obj.id + `">
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
            document.getElementById("list_product").appendChild(newDiv)
        }

        //Pagination
        var html = ""
        if (pageNumber > 1) {

            if (page != 1) {
                var previous = page - 1
                $(".pagination").append(`<li><a href="/html/search-results.html?keyword=` + keyword + `&page=` + previous + `" class="prev page" title="previous page">&#10094;</a></li>`)
            }

            for (var i = 1; i <= pageNumber; i++) {
                console.log(i)
                if (i == page) {
                    html = `<li>
								<a href="/html/search-results.html?keyword=` + keyword + `&page=` + i + `" class="active page">` + i + `</a>
							</li>`
                } else {
                    html = `<li>
								<a  href="/html/search-results.html?keyword=` + keyword + `&page=` + i + `" class="page">` + i + `</a>
							</li>`
                }
                $(".pagination").append(html)
            }
            if (page != pageNumber) {
                var next = parseInt(page) + 1
                $(".pagination").append(`<li><a href="/html/search-results.html?keyword=` + keyword + `&page=` + next + `" class="next page" title="next page">&#10095;</a></li>`)
            }
        }
        else {
            $(".pagination").append(`<li><a  href="#0" class="prev page" title="previous page">&#10094;</a></li>`)
            html = `<li>
								<a  href="/html/search-results.html?keyword=` + keyword + `&page=1` + `" class="active page">1</a>
							</li>`
            $(".pagination").append(html)
            $(".pagination").append(`<li><a href="#0" class="next page" title="next page">&#10095;</a></li>`)
        }
    });
});