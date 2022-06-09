//Url của api
url = 'https://electronics-api.herokuapp.com/products/54665'

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

//Gọi api => trả về dạng Json => chạy loop đổ json ra HTML
fetch(url, options).then(res => res.json()).then(json => {
    for (var i = 0; i < json.data.product_images.length; i++) {

        var obj = json.data.product_images[i];
        var newDiv = document.createElement('div');
        newDiv.style = "background-image: url(" + "https://salt.tikicdn.com/cache/w300/ts/product/ba/e2/6e/e6195ea67855e398251f7017eb4ceded.jpg" + ");";
        newDiv.className = 'item-box';
        // document.getElementById("slider1").appendChild(newDiv)
    }
});