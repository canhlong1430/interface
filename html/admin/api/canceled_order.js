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
    var status = 'đã hủy'

    url = 'http://localhost:1323/sale/orders?status=' + status
    var bearer = 'Bearer ' + token;

    const options = {
        method: 'GET', //tùy chọn method GET hoặc POST, PUT, DELETE
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
    }

    fetch(url, options).then(res => res.json()).then(json => {
        var table = $('.canceled').DataTable();
        table.destroy();

        $(json.data).each(function (i, v) {
            var row = `
            <tr>
            <td>`+ v.user_id + `</td>
                                            <td>`+ v.subtotal_price + `</td>
                                            <td>`+ v.total_price + `</td>
                                            <td>`+ v.total_discounts + `</td>
                                            <td>`+ v.delivery_fee + `</td>
                                            <td>`+ v.payment_method_id + `</td>
                                            <td>`+ v.status + `</td>
                                            <td>
                                                <button order-id=`+ v.id + ` type='submit'
                                                    class='btn btn-outline-success btn-fill'>Confirm</button>
                                            </td>
                                            </tr>
            `
            $(".canceled > tbody").append(row)
        });

        var table = $('.canceled').DataTable();

        $(".btn").click(function () {
            orderId = $(this).attr("order-id")

            updateurl = 'http://localhost:1323/sale/orders/' + orderId + '/update_status'
            var bearer = 'Bearer ' + token;

            const updateoptions = {
                method: 'PUT', //tùy chọn method GET hoặc POST, PUT, DELETE
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
            }

            fetch(updateurl, updateoptions).then(res => res.json()).then(json => {
                window.location.reload()
            });
        })
    });
});