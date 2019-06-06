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