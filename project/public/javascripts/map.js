var MAPAPP = {};
MAPAPP.markers = [];
MAPAPP.currentInfoWindow=null;

//MAPAPP.pathName = window.location.pathname;
var cityCircle,map,marker,marker1;
//pokestops 
  //quay pokestop


// let locationPokeStop=[[,]];
//  ajax
function getPokestop(){
  $.getJSON( '/getPokestop', function( data ) {
    locationPokeStop=data;
  

//pokemonstop marker
var pokemonstop=[];
//pokestops
for(var i = 1 ; i<locationPokeStop.length;i++){
 
pokemonstop= new google.maps.Marker({
  map:map,
  animation:google.maps.Animation.DROP,
position:  new google.maps.LatLng(locationPokeStop[i][3], locationPokeStop[i][4]), // v,
  icon:"images/Pokestop1.png"
  });
  var infowindow = new google.maps.InfoWindow()
  google.maps.event.addListener(pokemonstop, 'click', (function(pokemonstop, i) {
    
    return function() {
      var users= {lat:position[0],lng:position[1]};
    
      var locs = {lat:pokemonstop.getPosition().lat(), lng: pokemonstop.getPosition().lng()};
      var n = arePointsNear(users, locs, 1000);
      console.log(locs);
        if(n){
         var content = `
         <div class="card" style="width: 18rem;">
           <img class="card-img-top" src="${locationPokeStop[i][2]}" alt="Card image cap">
           <ul class="list-group list-group-flush">
             <li class="list-group-item">Tên PokeStop:<span style="color:red">${locationPokeStop[i][1]}</span></li>
           </ul>
         </div>
         <div class="alert alert-success">bạn có chắc chắn quay không</div>
         <div id="spin" class="btn btn-outline-success onclick="spinPoke()">Quay</div> 

          `
         infowindow.setContent(content);
      infowindow.open(map, pokemonstop);
     
        }
        else
        {
          content1=`<div class="alert alert-danger">Nằm ngoài vùng quay</div>`
          infowindow.setContent(content1);
          infowindow.open(map, pokemonstop);
         
       
        }
        // "<div style='text-align: center;border: 1px solid;padding: 10px;'><b>ADDRESS POKEMOMSTOPS</b><br/>"
        // +locationPokeStop[i][1]+"</div><div style='float:left;height: 400px;width: 400px;'>"+
        // "<img id='ip' style='height: 300px;width:400px;margin-top: 10px;' src="+locationPokeStop[i][2] +">"
        // +'<h1 onclick="spinPokestops()">SPIN</h1></div>'
    }
  })(pokemonstop, i));
}
  });
  
}
$(document).ready(function(){

});
///////////
function delayMaps()
{
  setTimeout(function(){ initMap(); }, 10);

}
      function initMap() {
        //console.log("init");
        
          var myLatlng = new google.maps.LatLng(position[0],position[1]);     
          var mapOptions = {
            zoom: 15,
            center: myLatlng,
            scrollwheel:  false
          }
          map = new google.maps.Map(document.getElementById('map'),mapOptions);
          getPokestop();
        // The marker, positioned at 
        
        marker = new google.maps.Marker(
          {
        position: myLatlng, // vị trí trên map
          map: map, //add map
          title:'DANG NGOC TUAN',// tooltip
          animation:google.maps.Animation.DROP, // hiệu ứng marker
          //label:labels, // text trong icon,
          icon:'images/ash.png' // icon đại diện cho marker
      
          });
          populateMarkers();
        //draw circle

        drawCircle(myLatlng);
        
  

        // click on marker 
        // marker.addListener('click', toggleBounce);
        //   function toggleBounce() {
           
        //       if (marker.getAnimation() !== null) {
        //         marker.setAnimation(null);
        //       } 
        //       else {
        //         marker.setAnimation(google.maps.Animation.BOUNCE);
        //       }
        //   }
          //click on map
        /*  google.maps.event.addListener(map,"click",(event)=>{
            var result = [event.latLng.lat(), event.latLng.lng()];
            console.log("toa do cu:"+position);
            console.log("toa do muon di chuyen toi :"+result);
            transition(result);
          
          });*/
          
          //arrow top,bottom,left,right use to move 
          google.maps.event.addDomListener(document, 'keyup', function (e) {
           if( e.keyCode==38){
            
            //top
            var result = [position[0]+0.0001, position[1]+0.00001];
            mMarker(result);
             var myLatlng = new google.maps.LatLng(position[0]+0.0001,position[1]+0.00001);
             cityCircle.setMap(null);
             drawCircle(myLatlng);
             hideAndshowPokemon(position[0]+0.0001,position[1]+0.00001);
           }
           if(e.keyCode==37)
           {
             //left
            var result = [position[0]-0.00003, position[1]-0.0003];
            mMarker(result);
            var myLatlng = new google.maps.LatLng(position[0]-0.00003,position[1]-0.0003);
             cityCircle.setMap(null);
             drawCircle(myLatlng);
             hideAndshowPokemon(position[0]-0.00003,position[1]-0.0003);
           }
           if(e.keyCode==40)
           {
           //bottom
            var result = [position[0]-0.0001, position[1]-0.00001];
            mMarker(result);
            var myLatlng = new google.maps.LatLng(position[0]-0.0001,position[1]-0.00001);
             cityCircle.setMap(null);
             drawCircle(myLatlng);
             hideAndshowPokemon(position[0]-0.0001,position[1]-0.00001);
           }
           if(e.keyCode==39)
           {
              //right
              var result = [position[0]+0.00003, position[1]+0.0003];
              mMarker(result);
              var myLatlng = new google.maps.LatLng(position[0]+0.00003,position[1]+0.0003);
             cityCircle.setMap(null);
             drawCircle(myLatlng);
             hideAndshowPokemon(position[0]+0.00003,position[1]+0.0003);
           }
       
           
        });
        
      
/*var numDeltas = 100;
var delay = 10; //milliseconds
var i = 0;
var deltaLat;
var deltaLng;

function transition(result){
    i = 0;
    deltaLat = (result[0] - position[0])/numDeltas;
    deltaLng = (result[1] - position[1])/numDeltas;
    moveMarker();
}


function moveMarker(){
    position[0] += deltaLat;
    position[1] += deltaLng;
    var latlng = new google.maps.LatLng(position[0], position[1]);
    
    marker.setPosition(latlng);
   console.log("toa do moi :"+position);
}*/
             
} // end function init

function mMarker(result){
  position[0]=result[0];
  position[1]=result[1];
  var latlng = new google.maps.LatLng(result[0], result[1]);
  marker.setPosition(latlng);
} //end function mMarker
function drawCircle(myLatlng)
{
  cityCircle=new google.maps.Circle({
    strokeColor: '#1F53BF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#7CA2F5',
    fillOpacity: 0.35,
    map: map,
    radius:1000,
    center:myLatlng
  });
} //end function drawCircle
// Fill map with markers
var res=[];
function populateMarkers() {
 
  apiLoc = typeof apiLoc !== 'undefined' ? apiLoc : '/pokemon/get';
  var arr= generateRandomPoints({'lat':position[0], 'lng':position[1]},2000,29); // tạo trong bán kính 2000, số lượng 12
  // jQuery AJAX call for JSON
  
  let i=0;

  $.getJSON(apiLoc, function(data) {  
  
      //For each item in our JSON, add a new map marker
      arr.forEach(function(element) {
        marker1 = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(element.lat,element.lng),
        
          icon: {url:`${data[i].imagePokemon}`, scaledSize: new google.maps.Size(70, 70)},
          customInfo:data[i],
          isOpen:false
       
      });
     
      var pokemonPosLat=marker1.getPosition().lat();
      var pokemonPosLng=marker1.getPosition().lng();
      var loc={lat:pokemonPosLat,lng:pokemonPosLng};
      var n = arePointsNear({lat:position[0],lng:position[1]}, loc, 1000);
      marker1.setVisible(false);
      if(n)
      {
        marker1.setVisible(true);
       
      }
      
     
      
      content1=`<div class="alert alert-danger">Nằm ngoài vùng săn bắt</div>`
     //var infoWindow=new google.maps.InfoWindow();
    //Add InfoWindow
    google.maps.event.addListener(marker1, 'click', function(event) {
      
      $.ajax({
        type: "get",
        url: "/pokemon/getType/"+this.customInfo._id,
        data: `{_id:${this.customInfo._id}}`,
        dataType: "json",
        async:false,
     
        success: function (data) {
          res[0]=data.type;
        

        
        }
      });
      
  
        var content=`
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${this.customInfo.imagePokemon}" alt="Card image cap">
       
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Tên Pokemon:<span style="color:red">${this.customInfo.namePokemon}</span></li>
          <li class="list-group-item">CP:<span style="color:red">${this.customInfo.CP}</span></li>
          <li class="list-group-item">Thuộc hệ:<span style="color:red" id="type">${res[0]}</span></li>
        
        </ul>
       
      </div>
      <div class="alert alert-success">bạn có chắc chắn muốn bắt không</div>
      <div id="yesbutton" class="btn btn-outline-success">Yes</div> 
      <div class="btn btn-outline-danger" id="nobutton">No</div>

       
       `;
       var locs = {lat: event.latLng.lat(), lng: event.latLng.lng()};
    var n = arePointsNear({lat:position[0],lng:position[1]}, locs, 1000);


    if(n)
    {
    // infoWindow.setContent(content);
      this.infowindow = new google.maps.InfoWindow({
        content: content,
        maxWidth: 400
      });
     // console.log(this.infowindow);
      hideAllInfoWindows(map,this);
      if(!this.isOpen)
      {
    //   infoWindow.open(map,this);
        this.infowindow.open(map,this);
       MAPAPP.currentInfoWindow=this.infowindow;
        // console.log(MAPAPP.currentInfoWindow);
        this.isOpen=true;
      }
   
    
    }
    // else
    // {
    //   this.infowindow = new google.maps.InfoWindow({
    //     content: content1,
    //     maxWidth: 400
    //   });
    //   hideAllInfoWindows(map,this);
    //   if(!this.isOpen)
    //   {
    //     this.infowindow.open(map,this);
    //     MAPAPP.currentInfoWindow=this;
    //     this.isOpen=true;
    //   }
   
    // }
     
  });
          
          MAPAPP.markers.push(marker1);
          i=i+1;
      });
     
  });

  
};
function hideAllInfoWindows(map,m) {
 
  MAPAPP.markers.forEach(function(marker) {
   if(marker.isOpen)
   {
     marker.infowindow.close(map, marker);
     MAPAPP.currentInfoWindow=null;
     m.isOpen=false;
   }
   
 
 }); 
}
