function hideAndshowPokemon(a,b){
    for(let value of MAPAPP.markers)
{
    var pokemonPosLat=value.getPosition().lat();
      var pokemonPosLng=value.getPosition().lng();
      var loc={lat:pokemonPosLat,lng:pokemonPosLng};
      var n = arePointsNear({lat:a,lng:b}, loc, 1000);
 
      if(n)
      {
        value.setVisible(true);
      }
      else
      {
          value.setVisible(false);
      }
}
}
