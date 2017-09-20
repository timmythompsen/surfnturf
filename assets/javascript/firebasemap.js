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
       var locationName = childSnapshot.val().spot_name;
       var spotId = childSnapshot.val().spot_id;


       console.log("myLat = " + myLat);
       console.log("myLng = " + myLng);
       console.log("myPosition = " + myPosition);
       console.log("myLatLng = " + myLatLng);


      var marker = new google.maps.Marker({
      position: myPosition,
      map: map,
      reference: locationName,
      idNum: spotId
      });

      // marker clicked functions
     /* marker.addListener('click', function(e){
        infoWindow1.open(map, marker);
        console.log("marker clicked");
        
      });*/
      /*var infoWindow1 = new google.maps.InfoWindow({
        content: display(marker.idNum)
      });*/
      tempWindow = new google.maps.InfoWindow({
        content: display(marker.idNum)
      });

      // mouse over funtions
      var infoWindow2 = new google.maps.InfoWindow({
      content: '<h1>'+ marker.reference +'</h1>'
      });

      marker.addListener('mouseover', function(e){
        infoWindow2.open(map, marker);
      });
      marker.addListener('mouseout', function(e){
        infoWindow2.close(map, marker);
      });
    });
    
    var tempWindow;
    google.map.Marker.addListener('click', function(e){
        tempWindow.open(map, marker);
        console.log("marker clicked");
        
      });

    function display(id){
      var location = id;
      var queryURL = "http://api.spitcast.com/api/spot/forecast/" + location + "/";

        //ajax call
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response){
          console.log(response);
          
        });


    }
    
    



   // Add a marker clusterer to manage the markers.
   // var markerCluster = new MarkerClusterer(map, marker,
   //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
   
   // Listen for click event
   // Store click location to firebase
    /*map.addListener('click', function(e) {
    placeMarker(e.latLng, map);
    });*/

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
    database.ref("/userSpots").push(objPosition);
  }

}





  var locations = [
    {lat: -31.563910, lng: 147.154312},
    {lat: -33.718234, lng: 150.363181},
    {lat: -33.727111, lng: 150.371124},
    {lat: -33.848588, lng: 151.209834},
    {lat: -33.851702, lng: 151.216968},
    {lat: -34.671264, lng: 150.863657},
    {lat: -35.304724, lng: 148.662905},
    {lat: -36.817685, lng: 175.699196},
    {lat: -36.828611, lng: 175.790222},
    {lat: -37.750000, lng: 145.116667},
    {lat: -37.759859, lng: 145.128708},
    {lat: -37.765015, lng: 145.133858},
    {lat: -37.770104, lng: 145.143299},
    {lat: -37.773700, lng: 145.145187},
    {lat: -37.774785, lng: 145.137978},
    {lat: -37.819616, lng: 144.968119},
    {lat: -38.330766, lng: 144.695692},
    {lat: -39.927193, lng: 175.053218},
    {lat: -41.330162, lng: 174.865694},
    {lat: -42.734358, lng: 147.439506},
    {lat: -42.734358, lng: 147.501315},
    {lat: -42.735258, lng: 147.438000},
    {lat: -43.999792, lng: 170.463352},
    {lat: 33.034405, lng: -117.292928},
    {lat: 32.034405, lng: -117.292928},
    {lat: 33.034405, lng: -118.292928},
    {lat: 34.034405, lng: -117.292928}
  ]

// database.ref().push(locations);    

// var spitCast = 
// [
// {
// "county": "San Diego",
// "lat": 33.20422852759,
// "lng": -117.3959770213895,
// "spot_id": 238,
// "spot_name": "Oceanside Harbor"
// },
// {
// "county": "San Diego",
// "lat": 33.19338704616089,
// "lng": -117.3871878580306,
// "spot_id": 594,
// "spot_name": "Oceanside Pier"
// },
// {
// "county": "San Diego",
// "lat": 33.18560497984529,
// "lng": -117.37826775154,
// "spot_id": 628,
// "spot_name": "Wisconsin"
// },
// {
// "county": "San Diego",
// "lat": 33.1727141797096,
// "lng": -117.3666572301789,
// "spot_id": 629,
// "spot_name": "Cassidy"
// },
// {
// "county": "San Diego",
// "lat": 33.14732039517696,
// "lng": -117.3467966641187,
// "spot_id": 237,
// "spot_name": "Tamarack"
// },
// {
// "county": "San Diego",
// "lat": 33.1440071379831,
// "lng": -117.344584923286,
// "spot_id": 596,
// "spot_name": "Warm Water Jetty"
// },
// {
// "county": "San Diego",
// "lat": 33.1287625038052,
// "lng": -117.3361948822189,
// "spot_id": 597,
// "spot_name": "Terra Mar"
// },
// {
// "county": "San Diego",
// "lat": 33.10077725856549,
// "lng": -117.3199860617356,
// "spot_id": 630,
// "spot_name": "Campground"
// },
// {
// "county": "San Diego",
// "lat": 33.08703466528135,
// "lng": -117.314238172042,
// "spot_id": 236,
// "spot_name": "Ponto"
// },
// {
// "county": "San Diego",
// "lat": 33.07548446739567,
// "lng": -117.310721142163,
// "spot_id": 400,
// "spot_name": "Grandview"
// },
// {
// "county": "San Diego",
// "lat": 33.06357021203468,
// "lng": -117.3055500790094,
// "spot_id": 235,
// "spot_name": "Beacons"
// },
// {
// "county": "San Diego",
// "lat": 33.04544227410393,
// "lng": -117.2982038691907,
// "spot_id": 401,
// "spot_name": "D Street"
// },
// {
// "county": "San Diego",
// "lat": 33.03442293101347,
// "lng": -117.2957502535422,
// "spot_id": 234,
// "spot_name": "Swamis"
// },
// {
// "county": "San Diego",
// "lat": 33.01541991675105,
// "lng": -117.283273919829,
// "spot_id": 232,
// "spot_name": "Cardiff Reef"
// },
// {
// "county": "San Diego",
// "lat": 32.95866232586716,
// "lng": -117.2691753574579,
// "spot_id": 230,
// "spot_name": "15th Street - Del Mar"
// },
// {
// "county": "San Diego",
// "lat": 32.93310208353217,
// "lng": -117.2617407404518,
// "spot_id": 754,
// "spot_name": "Torrey Pines State Beach"
// },
// {
// "county": "San Diego",
// "lat": 32.88872776198521,
// "lng": -117.2574779327986,
// "spot_id": 229,
// "spot_name": "Blacks Beach"
// },
// {
// "county": "San Diego",
// "lat": 32.8665985093327,
// "lng": -117.2562736520856,
// "spot_id": 228,
// "spot_name": "Scripps Pier"
// },
// {
// "county": "San Diego",
// "lat": 32.82966532137208,
// "lng": -117.2820435395789,
// "spot_id": 227,
// "spot_name": "Windansea"
// },
// {
// "county": "San Diego",
// "lat": 32.81342404990851,
// "lng": -117.2738442945035,
// "spot_id": 398,
// "spot_name": "Bird Rock"
// },
// {
// "county": "San Diego",
// "lat": 32.80694591751527,
// "lng": -117.2659989723968,
// "spot_id": 399,
// "spot_name": "Tourmaline"
// },
// {
// "county": "San Diego",
// "lat": 32.79702950543552,
// "lng": -117.2596029503458,
// "spot_id": 226,
// "spot_name": "Pacific Beach"
// },
// {
// "county": "San Diego",
// "lat": 32.77792900748604,
// "lng": -117.2543264821912,
// "spot_id": 397,
// "spot_name": "Mission Beach"
// },
// {
// "county": "San Diego",
// "lat": 32.74915185196409,
// "lng": -117.2553418849109,
// "spot_id": 225,
// "spot_name": "Ocean Beach Pier"
// },
// {
// "county": "San Diego",
// "lat": 32.71899890471818,
// "lng": -117.2571632713268,
// "spot_id": 224,
// "spot_name": "Sunset Cliffs"
// },
// {
// "county": "San Diego",
// "lat": 32.577928810608,
// "lng": -117.1346007967761,
// "spot_id": 223,
// "spot_name": "Imperial Beach"
// }
// ]

// for (var i=0; i<spitCast.length; i++) {
//   database.ref("/spitCast").push(spitCast[i]);  
// }