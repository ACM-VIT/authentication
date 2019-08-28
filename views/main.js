$(function () {
    $('#show').click(function () {
        var name = $('#name').val();
        var regno = $('#regno').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        $('.loader').show()
        $.ajax({
            type: 'POST',
            //url: '/getinfo?id=' + s1 + '&state=' + s2,
            url:'https://localhost:3000/getinfo',
            contentType: 'application/json',
            data: JSON.stringify({ name: name }, { regno: regno }, { email: email }, { phone: phone })
        }).done(function (data) {
            $('.loader').hide()
        })
    })
})




