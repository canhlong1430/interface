//Url của api
url = 'https://electronics-api.herokuapp.com/products?limit=900&offset=0'

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
    for (var i = 0; i < json.data.length; i++) {

        //Hiển thị tên sản phẩm mra HTML
        var obj = json.data[i];
        var newDiv = document.createElement('div');
        newDiv.innerText = obj.name;
        document.getElementById("products").appendChild(newDiv);

        //Hiển thị ảnh sản phẩm ra HTML
        var obj = json.data[i];
        var img = document.createElement('img');
        img.src = obj.thumbnail_url;
        document.getElementById("products").appendChild(img);
    }
});

// Tham khảo
// https://suntech.edu.vn/http-request-trong-javascript-voi-fetch-api.sunpost.html