var Map = function(latLng, zoomAmount){
  this.googleMap = new google.maps.Map(document.getElementById('map'), {
    center: latLng,
    zoom: zoomAmount
  }),
  this.addMarker = function(latLng, title, icon){
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.googleMap,
      title: title,
      icon: icon
    });
    return marker;
  },
  // this.bindClick = function(label){
  //   // // var map = this;
  //   // google.maps.event.addListener(this.googleMap, 'click', function(event){
  //   //   var newlatLng = { lat: event.latLng.lat(), lng: event.latLng.lng()};
  //   //   // map.addMarker(newlatLng, label);

  //   google.maps.event.addListener(this.googleMap, 'click', function(event){
  //     var newlatLng = { lat: event.latLng.lat(), lng: event.latLng.lng()};
  //     this.addMarker(newlatLng, label);
  //     if(parseInt(label)){
  //       label = parseInt(label)
  //       label++;
  //       label = String(label);
  //       }
  //     else{
  //       label = String.fromCharCode(label.charCodeAt() + 1)
  //     }
  //   }.bind(this)
  //   ); 
  // // the function(event) is a callback - called when the event happens
  // },
  this.bindClick = function(){ 
    google.maps.event.addListener(this.googleMap, 'click', function(event){ 
      this.addInfoWindow({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()}, 
        "meow!", 
        "https://33.media.tumblr.com/avatar_e2fbfbcbb52d_128.png"
        ); }.bind(this));   
  },


  this.setCentre = function(latLng){
    this.googleMap.setCenter(latLng);
  },
  this.addInfoWindow = function(latLng, title, icon){
    var marker = this.addMarker(latLng, title, icon);
    marker.addListener('click', function(){
      var infoWindow = new google.maps.InfoWindow({
        content: this.title
      });
      infoWindow.open(this.map, marker);
    })
  }

}
