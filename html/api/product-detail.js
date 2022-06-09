$(document).ready(function () {
    function get(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }

    var productId = get('product_id')

    //Url của api
    url = 'https://electronics-api.herokuapp.com/products/' + productId

    const options = {
        method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
        headers: { 'Content-Type': 'application/json' },
    }

    //Gọi api => trả về dạng Json => chạy loop đổ json ra HTML
    fetch(url, options).then(res => res.json()).then(json => {

        var newDiv = ``;
        for (var i = 0; i < json.data.product_images.length; i++) {

            var obj = json.data.product_images[i];

            if (i == 0) {
                newDiv += `
                <div class="owl-item active" style="width: 438.4px;">
												<div style="background-image: url(img/products/shoes/1.jpg);"
													class="item-box">
												</div>
											</div>
                `
            }
            else {
                newDiv += `
                <div class="owl-item" style="width: 438.4px;">
												<div style="background-image: url(img/products/shoes/1.jpg);"
													class="item-box">
												</div>
											</div>
                `
            }
        }
        // $("#test").children().children().children().append(newDiv)


        $(".prod_info h1").text(json.data.name)
        $(".prod_info p small").text("SKU: " + json.data.sku)
        $(".prod_info p").append(json.data.short_description)
        $(".price_main .new_price").text(json.data.price + " đ")
        $(".price_main .old_price").text(json.data.price + " đ")
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
    });


});