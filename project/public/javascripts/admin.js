

$( document ).ready(function() {
    getTableUser();
 
})
$(document).on('click','#edit',function(){
    var id= $(this).attr('rel');
    $.ajax({
        type:'get',
        url:'/admin/account/getUserById/'+id,
        success: (res)=>{
            $('#id').val(res[0]._id)
            $('#username').val(res[0].username)
            $('#pass').val(res[0].password)
            $('#email').val(res[0].email)
            $('#level').val(res[0].level)
            $('#money').val(res[0].money)
            if(res[0].status ==true)
                $('#status').attr('checked',true)
            if(res[0].status ==false) 
                $('#status').attr('checked',false)
            if(res[0].sex ==true)
                $('#sex').attr('checked',true)
            if(res[0].sex ==false)  
                $('#sex').attr('checked',false)
        }
    })
})
$(document).on('click','#save',function(){
    let status = false
    let sex= false
    if($('#status').prop('checked'))
    status = true
    if($('#sex').prop('checked'))
    sex=true
    let data={
        _id:$('#id').val(),
        username:$('#username').val(),
        password:$('#pass').val(),
        email:$('#email').val(),
        level:$('#level').val(),
        money:$('#money').val(),
        status:status,
        sex:sex
    }
    console.log(data)
    $.ajax({
        type:'post',
        url:'/admin/account/edit',
        dataType:'json',
        data:data,
        success: function(res){
            bootbox.alert("update success!!!")
            getTableUser();
        }
    })
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
            url:'/admin/account/delete/'+id,
            success: function(res){
                getTableUser();
            }
        })}
    }
    })
 
})



function getTableUser(){
    $.getJSON('/admin/account/all',data =>{
        console.log(data)
        var content=[]
        data.forEach(element => {
            if(element.sex == true)
            element.sex='nam'
            else
            element.sex='nu'
            content +=`<tr>
            <td>${element.username}</td>
            <td>${element.password}</td>
            <td>${element.email}</td>
            <td>${element.status}</td>
            <td>${element.level}</td>
            <td>${element.money}</td>
            <td>${element.sex}</td>
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
$(document).on('keyup','#search',function(){
    let name = $(this).val();
    if(name != '')
    {
    $.ajax({
        type:'get',
        url:'/admin/account/find/' +name,
        success:function(res){
            var content=[]
            res.forEach(element => {
            if(element.sex == true)
            element.sex='nam'
            else
            element.sex='nữ'
            content +=`<tr>
            <td>${element.username}</td>
            <td>${element.password}</td>
            <td>${element.email}</td>
            <td>${element.status}</td>
            <td>${element.level}</td>
            <td>${element.money}</td>
            <td>${element.sex}</td>
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
}
else{
    getTableUser();
}
    
})