var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

 var position=[];
 
 //get current geolocation user
function success(pos){
 
   var coords=pos.coords;
   position[0]=coords.latitude;
   position[1]=coords.longitude;
}
function error(err){
  console.log(`error:${err}`);
}

navigator.geolocation.getCurrentPosition(success,error,options);