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
$(document).ready(function(){
    getallPoke()
})
// $(document).on('click','#save',function(){
//   var img=  $('#image').prop('files')[0];
//   var formdata= new FormData();

//   formdata.append('file', img);
//   console.log(formdata)
// })
$(document).on('click','#edit',function(){
    //var n=$('#page li.active a').attr('rel')
    var id= $(this).attr('rel');

    $.ajax({
        type:'get',
        url:'/admin/pokemon/getTypeById/'+id,
        success:function(res){
            $('#id').val(res[0]._id)
            $('#cp').val(res[0].CP)
            $('#namePokemon').val(res[0].namePokemon)
            var cc=  $('#mySelect').val(res[0].typePokemons._id)
            cc.attr('selected', 'selected').change();
    }
    })

})
$(document).on('click','#delete',function(){
    var n=$('#tranght').val()

    var id= $(this).attr('rel');
    bootbox.confirm({ 
        size: "small",
        message: "Are you sure?",
        callback: function(result){
            if(result){
                $.ajax({
                    type:'get',
                    url:'/admin/pokemon/delete/'+id,
                    success:function(res){
                    bootbox.alert("deleted!!!");
                    getallPoke(n)
                    }
                })
    }
    }
    })
 
})
$(document).on('keyup','#search',function(){
    let name = $(this).val();
    if(name != '')
    {
    $.ajax({
        type:'get',
        url:'/admin/pokemon/find/' +name,
        success:function(res){
        var content=[]
     
       res.forEach(element => {
    
         
             content +=`<tr>
        
            <td>${element.namePokemon}</td>
            <td>${element.imagePokemon}</td>
            <td>${element.CP}</td>
            <td>${element.typePokemons.nameType}</td>
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
    getallPoke();
}
})
$(document).on('click','#page li',function(){
    $('#page li.active').removeClass('active');
    $(this).addClass('active');
    $('#page li.disabled').removeClass('disabled');
    
})
$(document).on('click','#phantrang',function(){
    var n=$(this).attr('rel')
    
    $('#tranght').val(n)
    $.ajax({
        type:'get',
        url:'/admin/pokemon/phantrang/'+n,
        success:function(data){
            var content=[]
         
            for(var i=0; i< data.length;i++)
            {
       
              
             content +=`<tr>
         
             <td>${data[i].namePokemon}</td>
             <td>${data[i].imagePokemon}</td>
             <td>${data[i].CP}</td>
             <td>${data[i].typePokemons.nameType}</td>
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
})
$(document).on('click','#phantrang1',function(){
    var n=$('#tranght').val()
    n--
    $('#tranght').val(n)
    $.ajax({
        type:'get',
        url:'/admin/pokemon/phantrang/'+n,
        success:function(data){
            var content=[]
         
            for(var i=0; i< data.length;i++)
            {
       
              
             content +=`<tr>
         
             <td>${data[i].namePokemon}</td>
             <td>${data[i].imagePokemon}</td>
             <td>${data[i].CP}</td>
             <td>${data[i].typePokemons.nameType}</td>
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
})
$(document).on('click','#phantrang2',function(){
    var n=$('#tranght').val()
    n++
    $('#tranght').val(n)
    $.ajax({
        type:'get',
        url:'/admin/pokemon/phantrang/'+n,
        success:function(data){
            var content=[]
            for(var i=0; i< data.length;i++)
            {
             content +=`<tr>
             <td>${data[i].namePokemon}</td>
             <td>${data[i].imagePokemon}</td>
             <td>${data[i].CP}</td>
             <td>${data[i].typePokemons.nameType}</td>
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
})
function getallPoke(n){
   if(n == undefined) n=0
  
  var cc=  $('#tranght').val(n)
    $.ajax({
        type:'get',
        url:'/admin/pokemon/phantrang/'+n,
        success: function(data){
       var content=[]
   
       for(var i=0; i< data.length;i++)
       {
      
         
        content +=`<tr>
       
        <td>${data[i].namePokemon}</td>
        <td>${data[i].imagePokemon}</td>
        <td>${data[i].CP}</td>
        <td>${data[i].typePokemons.nameType}</td>
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
