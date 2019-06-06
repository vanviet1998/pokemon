$(document).on("click", "#nobutton", function()
 { 
  // console.log(MAPAPP.currentInfoWindow);
  MAPAPP.currentInfoWindow.close();
  //console.log(this);
 
    
     
});




var spinPoke=[]
$(document).on("click", "#spin", function()
{ $('#spinpoke').addClass('d-block animated');
  setTimeout(function(){            
      $('#spinpoke').removeClass('d-block animated');
    }, 2000);
  $.getJSON('/lol',function(data){  
      var spin=[]
      data.forEach(function(spins){
            var content=`<p style='font-size: 50px;display: inline-block;margin-top: 0;margin-bottom: 1rem;'>${spins.amount}X</p>
            <img src="${spins.image}">`
            spin += content;
      })
      
      $('#spinpoke').empty();
      $('#spinpoke').append(spin);
})
});

$(document).on("click", "#yesbutton", function()
 { 
    
      console.log(MAPAPP.currentInfoWindow.anchor.customInfo._id);
      var random = Math.floor(Math.random()*(7)+1);
      console.log(random);
      $('#messCatch').empty();
     var data = {};
       $.ajax({
          type: "POST",
          url: "/bags/savePokemon/",
          data: {_idUser : data.idUser, _idPoke : MAPAPP.currentInfoWindow.anchor.customInfo._id, random: random},
          dataType: "json",
          success: function(response){
            if(response.success){
                  $('#messCatch').removeClass('alert-danger');
                  $('#messCatch').addClass('alert-success d-block animated');
                  setTimeout(function(){
                    
                    $('#messCatch').removeClass('d-block animated');
                  }, 2000);
                 
                  $('#messCatch').append(response.success);

                  console.log(response);
                  var latIndex = MAPAPP.currentInfoWindow.position.lat(),
                 lngIndex = MAPAPP.currentInfoWindow.position.lng();
                  for ( var i=0; i < MAPAPP.markers.length; i++){
                        var lat = MAPAPP.markers[i].position.lat(),
                        lng = MAPAPP.markers[i].position.lng();
                        if(lat == latIndex && lng == lngIndex){
                        MAPAPP.markers[i].setMap(null);
                  }
              }
            }
            else{
                  $('#messCatch').removeClass('alert-success');
                  $('#messCatch').addClass('alert-danger d-block animated');
                  setTimeout(function(){ 
                     $('#messCatch').removeClass('d-block animated');
                  }, 2000);
                  
                  $('#messCatch').append(response.error);
            }
          }
       })
     
});

