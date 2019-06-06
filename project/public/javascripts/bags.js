function showPokemon(){
  var user;
   $.ajax({
      type: "get",
      url: "/users",
      dataType: "json",
      async:false,
      success: function (response) {
          //console.log(response);
          //res.push(response.items);
          user= response;
      }
  });
  // list all pokemon
  var pokemons = [];
  var kanto = [];
  var johto = [];
  var sinnoh = [];
  var hoenn = [];
  console.log(user.bag.pokemons);
  for(let value of user.bag.pokemons){
      var content = `<div class="box row" value="${value._id._id}">
                      <div class="col-md-4">
                        <img src="${value._id.imagePokemon}">
                      </div>
                      <div class="col-md-4">
                        <p>${value._id.namePokemon} x ${value.amount} </p>
                      </div>
                      <div class="col-md-4">
                        <p>CP : ${value._id.CP}</>
                      </div> 
                    </div>`
      if(value._id.typePokemons == "5c967763df6b630b8cf2f815")
      {
        johto += content;
      }
      else if(value._id.typePokemons == "5c967763df6b630b8cf2f816"){
        hoenn += content;
      }
      else if(value._id.typePokemons == "5c967763df6b630b8cf2f817"){
        sinnoh += content;
      }
      else if(value._id.typePokemons == "5c967763df6b630b8cf2f818"){
        kanto += content;
      }
      pokemons += content;
  }
  $('#list-pokemon').empty();
  $('#list-pokemon').append(pokemons);

  // list kanto
  
  $('#list-kanto').empty();
  $('#list-kanto').append(kanto);
  // list johto
  $('#list-johto').empty();
  $('#list-johto').append(johto);
  // list hoenn
  $('#list-hoenn').empty();
  $('#list-hoenn').append(hoenn);
  // list sinnoh
  $('#list-sinnoh').empty();
  $('#list-sinnoh').append(sinnoh);
}
$( document ).ready(function() {
    $('#submit1').click(function(){
        var coin = $('#coin').val();
        $.ajax({
            type: 'post',
            url: '/bags/card/',
            dataType: "json",
            data: { coin : coin},
            success: function(res){
                console.log(res.success);
                $('#messCard').empty();
                $('#messCard').append(res.success);
                  $('#messCard').addClass('d-block animated');
                  setTimeout(function(){
                    $('#messCard').removeClass('d-block animated');
                  }, 2000);
                 
            }
        })
    })
   
    $('.poke-index').click(function(){
      showPokemon();
    })
    
    
    $('.bag-index').click(function(){
        var user;
        $.ajax({
            type: "get",
            url: "/users",
            dataType: "json",
            async:false,
            success: function (response) {
                //console.log(response);
                //res.push(response.items);
                user= response;
            }
        });

        // user name, level, image
        var contact = [];
        if(user.sex){
            contact1 = `<img src="images/user1.png", alt="user image" >`;
        }
        else{
            contact1 = `<img src="images/user2.png", alt="user image">`;
        };

        var contact2 = `<h4>${user.username}</h4>
                        <p>Level : ${user.level}</p>`;

        contact = contact1 + contact2;    
        $('#contact').empty();
        $('#contact').append(contact);
        // list pokemon
        var pokemons = [];
        for(let value of user.bag.pokemons){
            var content = `<div class="col-md-4">
                              <div class="box">
                                <p>${value._id.namePokemon}</p>
                                <img src="${value._id.imagePokemon}">
                                <p>CP : ${value._id.CP}</>
                                </div>
                            </div>`
            pokemons += content;
        }
        $('#list-pokemon').empty();
        $('#list-pokemon').append(pokemons);
        
        // list item
        var items=[];
        for(let value of user.bag.items){
            var content = `<div class="col-md-4">
                              <div class="box">
                                <p>${value._id.nameItem}</p>
                                <img src="${value._id.imageItem}">
                                <p>Số luợng : ${value.amount}</>
                               </div>
                            </div>`
            items += content;
        }
        $('#list-item').empty();
         $('#list-item').append(items);

         // list friend
         var friends =[];
         for(let value of user.friends){
             var content = `<div class="col-md-4">
                                <div class="box">
                                 <p>${value.username}</p>
                                 <p>Level : ${value.level}</>
                                </div>
                             </div>`
            friends += content;
         }
         $('#list-friend').empty();
          $('#list-friend').append(friends);
 
    });



    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
    $('#btnAddFr').click(function(){
        $.ajax({
            type: "post",
            url: "/users/addfriend",
            dataType: "text",
            data: { namefriend :ipFr.value},
            dataType: "json",
            success: function(result){
                console.log(result);
                $('#messAddFr').empty();
                $('#messAddFr').append(result.mess);
                  $('#messAddFr').addClass('d-block animated');
                  setTimeout(function(){
                    $('#messAddFr').removeClass('d-block animated');
                  }, 2000);
                 
                 
            },
        })
    });
    var myCustomScrollbar = document.querySelector('.my-custom-scrollbar');
    Ps.initialize(myCustomScrollbar);
    var scrollbarY = myCustomScrollbar.querySelector('.ps.ps--active-y>.ps__scrollbar-y-rail');

    myCustomScrollbar.onscroll = function() {
        scrollbarY.style.cssText = `top: ${this.scrollTop}px!important; height: 400px; right: ${-this.scrollLeft}px`;
    }

        
})
// const swalWithBootstrapButtons = swal.mixin({
//     customClass: {
//       confirmButton: 'btn btn-success',
//       cancelButton: 'btn btn-danger'
//     },
//     buttonsStyling: false,
//   })
$(document).on('click','#pokemon .box',function(){
    var id = $(this).attr('value');
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: "No, cancel plx!",
      closeOnConfirm: false,
      closeOnCancel: false
  },
  function(isConfirm){
  if (isConfirm){
    swal("Deleted!", "Your imaginary file has been deleted!", "success");
  } else {
    swal("Cancelled", "Your imaginary file is safe :)", "error");
  }
  });
      
      // swalWithBootstrapButtons.fire({
      //   title: 'Are you sure?',
      //   text: "You won't be able to revert this!",
      //   type: 'warning',
      //   showCancelButton: true,
      //   confirmButtonText: 'Delete ?!',
      //   cancelButtonText: 'Upgrade ?!',
      //   reverseButtons: true
      // }).then(async(result) => {
      //   if (result.value) {
      //     console.log('delete');
      //       $.ajax({
      //           type: "delete",
      //           url: "/bags/deletePokemon/",
      //           data: { _idPoke : id},
      //           dataType: "json",
      //           success: function(result){
      //             showPokemon();
      //           }
      //       });
      //       swalWithBootstrapButtons.fire(
      //           'Deleted!',
      //           'Pokemon has been deleted.',
      //           'success'
      //       )
      //   } else 
      //   if (result.dismiss === Swal.DismissReason.cancel
      //   ) {
      //     console.log('upgrade');
      //     var mess;
      //       $.ajax({
      //           type: "post",
      //           url: "/bags/upgradePoke/",
      //           data: { _idPoke : id},
      //           dataType: "json",
      //           success: function(response){
      //               showPokemon();
      //               alert(response.messenger);
      //           }
      //       });
      //       console.log(mess);
      //     swalWithBootstrapButtons.fire(
      //       'Cancelled',
      //       'Your imaginary file is safe :)',
      //       'error'
      //     )
      //   }
      // })
})
