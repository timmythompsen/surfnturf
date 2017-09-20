function initMap() {
   
           var map = new google.maps.Map(document.getElementById('map'), {
             zoom: 6,
             center: {lat: 33.034405, lng: -117.292928}
           });
   
           // Create an array of alphabetical characters used to label the markers.
           var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   
           // Add some markers to the map.
           // Note: The code uses the JavaScript Array.prototype.map() method to
           // create an array of markers based on a given "locations" array.
           // The map() method here has nothing to do with the Google Maps API.
           var markers = locations.map(function(location, i) {
             return new google.maps.Marker({
               position: location,
               label: labels[i % labels.length]
             });
           });

           //click function to add pins "markers" onto google map
           function addMarker(location) {  
            var marker = new google.maps.Marker({  
              position: location,  
              map: map  
            });  
            markerCluster.addMarker(marker);
          }  
           
          map.addListener('click', function(event) {  
            addMarker(event.latLng); 
            console.log(locations); 
          }); 
   
           // Add a marker clusterer to manage the markers.
           var markerCluster = new MarkerClusterer(map, markers,
               {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
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


// Initialize Firebase
var config = {
apiKey: "AIzaSyAzgRe2qa6Q8latl74anLMAAOs9s6D3fX4",
authDomain: "surfnturf-1505590651992.firebaseapp.com",
databaseURL: "https://surfnturf-1505590651992.firebaseio.com",
projectId: "surfnturf-1505590651992",
storageBucket: "",
messagingSenderId: "1078434011414"
};
firebase.initializeApp(config);

var database = firebase.database();
