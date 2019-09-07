
$(function () {
    $('#show').click(function () {
        var hostelroom = $('#hostelroom').val();
        var phone = $('#phone').val();
        var token = $('#token').val();
        // console.log(hostelroom, phone, token)
        $('.loader').show()
        $.ajax({
            type: 'POST',
            url: '/update',
            contentType: 'application/json',
            data: JSON.stringify({ hostelroom, phone, token })
        }).done(function () {
            return
        })

    })
})




