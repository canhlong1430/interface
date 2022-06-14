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

    url = 'https://electronics-api.herokuapp.com/sale/orders'
    var bearer = 'Bearer ' + token;

    const options = {
        method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
    }

    fetch(url, options).then(res => res.json()).then(json => {
        $(json.data).each(function (i, v) {
            var html = `
            <div class="bg-white card mb-4 order-list shadow-sm">
                                        <div class="gold-members p-4">
                                            <a href="/html/order-detail.html?order_id=` + v.id + `">
                                            </a>
                                            <div class="media">
                                                <a href="/html/order-detail.html?order_id=` + v.id + `">
                                                </a>
                                                <div class="media-body">
                                                    <a href="#">
                                                        <span class="float-right text-info">Ngày đặt hàng ` + v.created_at + ` <i
                                                                class="icofont-check-circled text-success"></i></span>
                                                    </a>
                                                    <h6 class="mb-2">
                                                        <a href="/html/order-detail.html?order_id=` + v.id + `"></a>
                                                        <a href="/html/order-detail.html?order_id=` + v.id + `" class="text-black">Mã đơn hàng: ` + v.id + `</a>
                                                    </h6>
                                                    <p class="text-gray mb-1"><i class="icofont-location-arrow"></i>Địa chỉ: ` + v.shipping_address.specific_address + `
                                                    </p>
                                                    <p class="text-gray mb-3"><i class="icofont-list"></i> Điện thoại: ` + v.shipping_address.phone_number + ` <i class="icofont-clock-time ml-2"></i> </p>
                                                    <p class="text-dark">`


            $(v.order_items).each(function (j, item) {
                html += truncate(item.product_option.name) + ' X ' + (item.quantity).toString() + ', '
            });

            html += `
                                                    </p>
                                                    <hr>
                                                    <div class="float-right">
                                                        <a class="btn btn-sm btn-outline-primary" href="#"><i
                                                                class="icofont-headphone-alt"></i>Trạng thái: </a>
                                                        <a class="btn btn-sm btn-primary" href="#"><i
                                                                class="icofont-refresh"></i> ` + v.status + `</a>
                                                    </div>
                                                    <p class="mb-0 text-black text-primary pt-2"><span
                                                            class="text-black font-weight-bold"> Tổng tiền:</span> ` + toVND(v.total_price) + `
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
            `

            $("#orders").append(html)
        });
    });
});