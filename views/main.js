$(function () {
    $('#show').click(function () {
        var collegename = $('#collegename').val();
        var phone = $('#phone').val();
        var token = $('#token').val();
        // console.log(collegename, phone, token)
        $('.loader').show()
        $.ajax({
            type: 'POST',
            url: '/update',
            contentType: 'application/json',
            data: JSON.stringify({ collegename, phone, token })
        }).done(function () {
            return

        })

    })
})




