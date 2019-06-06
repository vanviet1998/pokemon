
     $( document ).ready(function() {
       $('.card-index').click(function(){
          $('#modal-container').addClass('out');
          $('body').removeClass('modal-active');
          $('#sucess').removeClass('d-block animated');
          $('#fail').removeClass('d-block animated');
       })
      var res=[];
      function getShop(){
      var user ='';
        $.ajax({
          type: "get",
          url: "/users/getUser",
          dataType: "json",
          async:false,
          success: function (response) {
            user = response;
          }
        })
          
            $('#coins h4').empty();
            $('#coins h4').append(user.money);
            res=[]
          $.ajax({
          type: "get",
          url: "/items/getItems",
          dataType: "json",
          async:false,
          success: function (response) {
            res.push(response.items);
          }
        });
      
      var parentContent='';
      for(let value of res[0])
      {
        if(value.number.length>0)
        {
          for(let v of value.number)
          {
            var content=`<div class="col-sm-4">
                    <input type="hidden" value="${value._id}" />
                    <img class="items" src="${value.imageItem}" alt="Items" data-toggle="tooltip" title="Mua" />
                    <p class="number"><span id="number">${v}</span> ${value.nameItem}</p>
                    <p class="price">${v*value.priceItem}</p>
                    </div>

                  `
                  parentContent=parentContent+content;
          }
        }else
        {
          var content=`<div class="col-sm-4">
                    <input type="hidden" value="${value._id}" />
                    <img class="items" src="${value.imageItem}" alt="Items" data-toggle="tooltip" title="Mua" />
                    <p class="number"><span id="number">${value.number}</span> ${value.nameItem}</p>
                    <p class="price">${value.number*value.priceItem}</p>
                    </div>

                  `
                  parentContent=parentContent+content;
        }

        
    
        
      }
      $('.list-items').empty()
      $('.list-items').append(parentContent);
          }
         $('.ball-index').click(function(){
           getShop();

           var buttonId = $(this).attr('id');
           $('#modal-container').removeAttr('class').addClass(buttonId);
           $('body').addClass('modal-active');
         })
   
         $('.closeModal').click(function(){
           $('#modal-container').addClass('out');
           $('body').removeClass('modal-active');
           $('#sucess').removeClass('d-block animated');
           $('#fail').removeClass('d-block animated');
         });
         $(".modalshop-body img").tooltip();
         $(document).on('click','.items',function(){
           // $('#sucess').removeClass('d-none d-block animated');
           // 
           var data={};

            data.idUser=$('#_id').val();
            data.idItem=$(this).prev().val();
            data.number=$(this).next().children('#number').html();
            data.price=$(this).next().next().html();
         
           $.ajax({
             type: "post",
             url: "/bags/saveItemToBag",
             //contentType:'application/json',
             data: {_idUser:data.idUser,_idItem:data.idItem,number:data.number,price:data.price},
             dataType: "json",
             success: function (response) {
               if(response.done)
               {
                 $('#sucess').addClass('d-block animated');
                 setTimeout(function(){
                   
                   $('#sucess').removeClass('d-block animated');
                 }, 2000);
               }
               else
               {
                 $('#fail').addClass('d-block animated');
                 setTimeout(function(){
                   
                   $('#fail').removeClass('d-block animated');
                 }, 2000);
               
               }
             }
           });
         })
         $('#pills-all-tab').click(function(){
          getShop();
         })
         $('#pills-ball-tab').click(function(){
           res=[];
           $.ajax({
               type: "get",
               url: "/items/getBall",
               dataType: "json",
               async:false,
               success: function (response) {
                 res.push(response.items);
               }
             });
             console.log(res);
            var parentContent='';
            for(let value of res[0])
            {
              if(value.number.length>0)
              {
               for(let v of value.number)
               {
                 var content=`<div class="col-sm-4">
                         <input type="hidden" value="${value._id}" />
                         <img class="items" src="${value.imageItem}" alt="Items" data-toggle="tooltip" title="Mua" />
                         <p class="number"><span id="number">${v}</span> ${value.nameItem}</p>
                         <p class="price">${v*value.priceItem}</p>
                         </div>
   
                       `
                       parentContent=parentContent+content;
               }
              }else
              {
               var content=`<div class="col-sm-4">
                         <input type="hidden" value="${value._id}" />
                         <img class="items" src="${value.imageItem}" alt="Items" data-toggle="tooltip" title="Mua" />
                         <p class="number"><span id="number">${value.number}</span> ${value.nameItem}</p>
                         <p class="price">${value.number*value.priceItem}</p>
                         </div>
   
                       `
                       parentContent=parentContent+content;
              } 
           }
           $('.list-items').empty()
           $('.list-items').append(parentContent);
         })
         $('#pills-item-tab').click(function(){
          res=[];
          $.ajax({
              type: "get",
              url: "/items/get",
              dataType: "json",
              async:false,
              success: function (response) {
                res.push(response.items);
              }
            });
            console.log(res);
           var parentContent='';
           for(let value of res[0])
           {
             if(value.number.length>0)
             {
              for(let v of value.number)
              {
                var content=`<div class="col-sm-4">
                        <input type="hidden" value="${value._id}" />
                        <img class="items" src="${value.imageItem}" alt="Items" data-toggle="tooltip" title="Mua" />
                        <p class="number"><span id="number">${v}</span> ${value.nameItem}</p>
                        <p class="price">${v*value.priceItem}</p>
                        </div>
  
                      `
                      parentContent=parentContent+content;
              }
             }else
             {
              var content=`<div class="col-sm-4">
                        <input type="hidden" value="${value._id}" />
                        <img class="items" src="${value.imageItem}" alt="Items" data-toggle="tooltip" title="Mua" />
                        <p class="number"><span id="number">${value.number}</span> ${value.nameItem}</p>
                        <p class="price">${value.number*value.priceItem}</p>
                        </div>
  
                      `
                      parentContent=parentContent+content;
             } 
          }
          $('.list-items').empty()
          $('.list-items').append(parentContent);
        })
   });
    