// Initialize Firebase
var config = {
  apiKey: "AIzaSyAzgRe2qa6Q8latl74anLMAAOs9s6D3fX4",
  authDomain: "surfnturf-1505590651992.firebaseapp.com",
  databaseURL: "https://surfnturf-1505590651992.firebaseio.com",
  projectId: "surfnturf-1505590651992",
  storageBucket: "surfnturf-1505590651992.appspot.com",
  messagingSenderId: "1078434011414"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("value",function(snapshot){
   console.log(snapshot.val()); 
})

// Create map

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.823, lng: -117.283},
    zoom: 10,
    styles: [{
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]  // Turn off points of interest.
    }, {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
    }],
    disableDoubleClickZoom: true
  });

  // Create an array of alphabetical characters used to label the markers.
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

   // Add markers to the map.
    database.ref("/spitCast").on("child_added", function(childSnapshot, prevChildKey) {

       var myLat = childSnapshot.val().lat;
       var myLng = childSnapshot.val().lng;
       var myPosition = childSnapshot.val();
       var myLatLng = "{lat: " + myLat + ", lng: " + myLng + "}";

       console.log("myLat = " + myLat);
       console.log("myLng = " + myLng);
       console.log("myPosition = " + myPosition);
       console.log("myLatLng = " + myLatLng);


      var Marker = new google.maps.Marker({
      position: myPosition,
      map: map,
      });
    });

   // Add a marker clusterer to manage the markers.
   // var markerCluster = new MarkerClusterer(map, marker,
   //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
   
   // Listen for click event
   // Store click location to firebase
   map.addListener('click', function(e) {
    placeMarker(e.latLng, map);
    });

  function placeMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
    console.log(marker.position.lat());
    console.log(marker.position.lng());
    map.panTo(position);
    var objPosition = {
      lat: marker.position.lat(),
      lng: marker.position.lng()
    }
    database.ref().push(objPosition);
  }
}