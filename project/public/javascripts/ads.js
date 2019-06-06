$( document ).ready(function() {
    getallTable();
})
$(document).on('click','#delete',function(){
    var id= $(this).attr('rel');
    bootbox.confirm({ 
        size: "small",
        message: "Are you sure?",
        callback: function(result){
            if(result){
             $.ajax({
            type:'get',
            url:'/admin/ads/delete/'+id,
            success: function(res){
                getallTable();
            }
        })}
    }
    })
})
$(document).on('keyup','#search',function(){
    var email=$('#search').val();
    if(email!="")
    {
    $.ajax({
        type:'get',
        url:'/admin/ads/getAdsbyname/'+email,
        success:function(res){
            var number=0;
            var content=[]
            res.forEach(element => {
                    content +=`<tr>
                                <td>${number++}</td>
                                <td>${element.email}</td>
                                <td>${element.phone}</td>
                                <td>${element.link}</td>
                                <td>${element.image}</td>
                                <td>${element.status}</td>
                                <td>
                                <a rel=${element._id} id="edit" href="#editEmployeeModal" class="edit" title="Edit" data-toggle="modal"><i class="material-icons">&#xE254;</i></a>
                                <a rel=${element._id} href="#" id="delete" class="delete" title="Delete" data-toggle="modal"><i class="material-icons">&#xE872;</i></a>
                            </td>
                            </tr> `
            });
            $("#table tbody").empty();
            $("#table").append(content);
        }
    })
}else{
    getallTable()
}
})
$(document).on('click','#edit',function(){
    var id= $(this).attr('rel');
    $.ajax({
        type:'get',
        url:'/admin/ads/getAds/'+id,
        success: function(res){
            $('#id').val(res[0]._id);
          $('#email').val(res[0].email);
          $('#phone').val(res[0].phone);
          $('#link').val(res[0].link);
          if(res[0].status==true)
          $('#check').attr('checked', true);
          if(res[0].status==false)
          $('#check').attr('checked', false);
          
        }
})
})
 $(document).on('click','#save',function(){
     var check=false;
     if($('#check').prop('checked'))
     check=true
    var data={
        _id:$('#id').val(),
        email: $('#email').val(),
        phone:$('#phone').val(),
        link:$('#link').val(),
        check:check
    }
    $.ajax({
        type:'post',
        url:'/admin/ads/update/',
        dataType: "json",
        data:data,
        success: function(res){
            getallTable();
        }
    })
})
function getallTable(){
    $.getJSON("/admin/ads/all",data=>{
        var number=0;
        var content=[]
        data.forEach(element => {
                content +=`<tr>
                            <td>${number++}</td>
                            <td>${element.email}</td>
                            <td>${element.phone}</td>
                            <td>${element.link}</td>
                            <td>${element.image}</td>
                            <td>${element.status}</td>
                            <td>
                            <a rel=${element._id} id="edit" href="#editEmployeeModal" class="edit" title="Edit" data-toggle="modal"><i class="material-icons">&#xE254;</i></a>
                            <a rel=${element._id} href="#" id="delete" class="delete" title="Delete" data-toggle="modal"><i class="material-icons">&#xE872;</i></a>
                        </td>
                        </tr> `
        });
        $("#table tbody").empty();
        $("#table").append(content);
    })
    
}
