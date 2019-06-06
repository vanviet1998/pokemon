function change(e){
    $('.showimg').show();
    $('#blah').attr('src',window.URL.createObjectURL(e.files[0]))
    $('#x').show();
    $('#x').click(function(){
        $('#x').hide();
        $('.showimg').hide();
    })
}
function change1(e){
    $('.showimg1').show();
    $('#blah1').attr('src',window.URL.createObjectURL(e.files[0]))
    $('#x1').show();
    $('#x1').click(function(){
        $('#x').hide();
        $('.showimg1').hide();
    })
}
$(document).on('click','#edit',function(){
    //var n=$('#page li.active a').attr('rel')
    var id= $(this).attr('rel');

    $.ajax({
        type:'get',
        url:'/admin/pokestop/getItemById/'+id,
        success:function(res){
            $('#blah').attr('src','../'+res[0].img)
            $('.showimg').show();
            $('#x').show();
            $('#id').val(res[0]._id)
            $('#lat').val(res[0].lat)
            $('#long').val(res[0].long)
            $('#address').val(res[0].address)
            var cc=  $('#mySelect').val(res[0].typePokemons._id)
            
    }
    })

})
const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
  })
$(document).on('click','#delete',function(){

    var id= $(this).attr('rel');
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
            $.ajax({
                type:'get',
                url:'/admin/pokestop/delete/'+id,
                success:function(res){
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                      getallPoke()
                }
})
         
        } else if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
          
 
})
function getallPoke(){
     $.ajax({
         type:'get',
         url:'/admin/pokestop/all',
         success: function(data){
        var content=[]
        for(var i=0; i< data.length;i++)
        {
         content +=`<tr>
         <td>${data[i].address}</td>
         <td>
         <img style='height: 50px;width: 50px;' src=${'../'+data[i].img}>
         </td>
         <td>${data[i].lat}</td>
         <td>${data[i].long}</td>
         <td>
         <a rel=${data[i]._id} id="edit" href="#editEmployeeModal" class="edit" title="Edit" data-toggle="modal"><i class="material-icons">&#xE254;</i></a>
         <a rel=${data[i]._id} href="#" id="delete" class="delete" title="Delete" data-toggle="modal"><i class="material-icons">&#xE872;</i></a>
         </td>
     </tr> `
        }
     $("#table tbody").empty();
     $("#table").append(content);
     }
 })
 }