$(document).ready(function() {
    console.log('xxx');
    // $.ajax({
    //     type: "get",
    //     url: "/home/getBlog/" + id,
    //     dataType: "json",
    //     success: function(response) {

    //     }
    // })

    

    const $form = $('#submitAdv');
    $form.on('submit', submitHandler);

    function submitHandler(e) {
        e.preventDefault()
        console.log(e.target.image.files[0]);
        var formData = new FormData();
        formData.append("email", e.target.email.value);
        formData.append("phone", e.target.phone.value);
        formData.append("link", e.target.link.value);
        formData.append("image", e.target.image.files[0]);

        $.ajax({
            url: '/home/adv/',
            type: 'POST',
            data: formData
        })
    }

    
})