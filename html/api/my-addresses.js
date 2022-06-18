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

    var url = 'http://localhost:1323/user/addresses?limit=10&page=1'
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
        <div class="col-md-6">
                                    <div class="bg-white card addresses-item mb-4 border border-primary">
                                        <div class="gold-members p-4">
                                            <div class="media">
                                                <div class="mr-3"><i class="icofont-ui-home icofont-3x"></i></div>
                                                <div class="media-body">
                                                    <h6 class="mb-1 text-secondary">`+ v.name + `</h6>
                                                    <p class="text-black">`+ v.specific_address + `</p>
                                                    <p class="mb-0 text-black font-weight-bold"><a
                                                            class="text-primary mr-3" data-toggle="modal"
                                                            data-target="#add-address-modal" href="#"><i
                                                                class="icofont-ui-edit"></i> Sửa</a> <a
                                                            class="text-danger" data-toggle="modal"
                                                            data-target="#delete-address-modal" href="#"><i
                                                                class="icofont-ui-delete"></i> Xóa</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        `

            $("#addresses").append(html)
        });
    });
});