
    function changeQty(product_id, c_id, operation) {
        var obj = {
            url: "/changeQtyByAjax",
            type: 'post',
            data: { 'p_id': product_id, 'cart_id': c_id, 'operation': operation }
        };
        $.ajax(obj).done(
            function (result) {
                $("#current_qty" + c_id).html(result.qty)
                printProductTotal(c_id)
                if (result.status == 'deleted') {
                    $("#trrow" + c_id).remove();
                }
            }
        )
    }
    function printProductTotal(cart_id) {
        a = ($("#price_rate" + cart_id).html())
        b = ($("#current_qty" + cart_id).html())
        $("#product_ttl" + cart_id).html(a * b)
        var p_ttls = $(".prod_ttl")
        var sum = 0;
        for (let i = 0; i < p_ttls.length; i++) {
            sum += Number(p_ttls[i].innerHTML)
            console.log(p_ttls[i].innerHTML)
        }
        $("#final_price").html(sum)
    }
