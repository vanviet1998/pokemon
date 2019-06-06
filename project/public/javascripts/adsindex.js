$(document).ready(function(){
  hideFB();
  

  FB.Event.subscribe('edge.create', function(response) {
    $.ajax({
      type:'get',
      url:'/tangtien',
      success:function(res){
        bootbox.alert("Chúc Mừng Bạn Đã Được nhận 1000 Tiền");
        hideFB();
      }
    })
  })
})
function hideFB() {
  $.getJSON('/kt',function(data){
    console.log(data[0]);
    console.log(data[0].status);
    users= data;
    if(data[0].status === false){
      $('#fb').css("display","none");
    }
  })
}