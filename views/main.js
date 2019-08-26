$(function () {
    function addEventListners() {
        const button = document.getElementById("show");
        
        button.addEventListener("click", (e) => {
            e.preventDefault();
            $('.loader').show()
            let name = document.getElementById("name").value;
            let regno = document.getElementById("regno").value;
            let email = document.getElementById("email").value;
            let phone = document.getElementById("phone").value;
            $.ajax({
                type:"POST",
                url:"/getinfo",
                contentType:"application/json",
                data:JSON.stringify({name:name},{regno:regno},{email:email},{phone:phone})
            }).done(function (data) {
                $('.loader').hide()            
            })
            
        })
    }
})