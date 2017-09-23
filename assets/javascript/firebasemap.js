//global variables
var marker;
var infoWindow1;
var infoWindow2;



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

   // Add markers to the map.
    database.ref("/spitCast").on("child_added", function(childSnapshot, prevChildKey) {

       var myLat = childSnapshot.val().lat;
       var myLng = childSnapshot.val().lng;
       var myPosition = childSnapshot.val();
       var myLatLng = "{lat: " + myLat + ", lng: " + myLng + "}";
       var locationName = childSnapshot.val().spot_name;
       var spotId = childSnapshot.val().spot_id;

      var marker = new google.maps.Marker({
      position: myPosition,
      map: map,
      reference: locationName,
      idNum: spotId});
         
        //display() is the ajax call for spitcast to display spot information
        function display(){
        var location = spotNum;
        var queryURL = "http://api.spitcast.com/api/spot/forecast/" + location + "/";
        var queryURL2 = "http://api.spitcast.com/api/county/swell/san-diego/";
        var queryURL3 = "http://api.spitcast.com/api/county/wind/san-diego/";
        var queryURL4 = "http://api.spitcast.com/api/county/tide/san-diego/";
        var queryURL5 = "http://api.spitcast.com/api/county/water-temperature/san-diego/";
          //ajax call
          $.ajax({
            url: queryURL,
            method: "GET"
          })
          .done(function(response){
            console.log(response);
            
            $.ajax({
              url: queryURL2,
              method: "GET"
            }) 
            .done(function(response2){
              console.log(response2);


              $.ajax({
                url: queryURL3,
                method: "GET"
              }) 
              .done(function(response3){
                console.log(response3); 

                $.ajax({
                  url: queryURL4,
                  method: "GET"
                }) 
                .done(function(response4){
                  console.log(response4); 

                  $.ajax({
                    url: queryURL5,
                    method: "GET"
                  }) 
                  .done(function(response5){
                    console.log(response5);  

                      var dir=null;
                      var amSwellDir = response2[6][5].dir;
                      var midSwellDir = response2[12][5].dir;
                      var pmSwellDir = response2[17][5].dir;

                      if (amSwellDir >= 0 && amSwellDir < 45){
                        dir = "NNE";
                      } else if (amSwellDir >= 45 && amSwellDir < 90){
                       dir="NE";
                      }else if(amSwellDir >= 90 && amSwellDir < 135){
                        dir ="SE";
                      }else if(amSwellDir >= 135 && amSwellDir < 180){
                        dir="SSE";
                      }else if(amSwellDir >= 180 && amSwellDir < 225){
                        dir="SSW";
                      }else if (amSwellDir >= 225 && amSwellDir < 270){
                        dir="SW";
                      }else if(amSwellDir >= 270 && amSwellDir < 315){
                        dir="NW";
                      }else if(amSwellDir >= 315 && amSwellDir < 360){
                        dir="NNW";
                      }
            
                      if (midSwellDir >= 0 && midSwellDir < 45){
                        dir = "NNE";
                      } else if (midSwellDir >= 45 && midSwellDir < 90){
                       dir="NE";
                      }else if(midSwellDir >= 90 && midSwellDir < 135){
                        dir ="SE";
                      }else if(midSwellDir >= 135 && midSwellDir < 180){
                        dir="SSE";
                      }else if(midSwellDir >= 180 && midSwellDir < 225){
                        dir="SSW";
                      }else if (midSwellDir >= 225 && midSwellDir < 270){
                        dir="SW";
                      }else if(midSwellDir >= 270 && midSwellDir < 315){
                        dir="NW";
                      }else if(midSwellDir >= 315 && midSwellDir < 360){
                        dir="NNW";
                      }
            
                      if (pmSwellDir >= 0 && pmSwellDir < 45){
                        dir = "NNE";
                      } else if (pmSwellDir >= 45 && pmSwellDir < 90){
                       dir="NE";
                      }else if(pmSwellDir >= 90 && pmSwellDir < 135){
                        dir ="SE";
                      }else if(pmSwellDir >= 135 && pmSwellDir < 180){
                        dir="SSE";
                      }else if(pmSwellDir >= 180 && pmSwellDir < 225){
                        dir="SSW";
                      }else if (pmSwellDir >= 225 && pmSwellDir < 270){
                        dir="SW";
                      }else if(pmSwellDir >= 270 && pmSwellDir < 315){
                        dir="NW";
                      }else if(pmSwellDir >= 315 && pmSwellDir < 360){
                        dir="NNW";
                      }

                      var displayBox = '<div id="infoWindow"><p>'
                      + response[0].spot_name +'</p><p>Morning Conditions: '
                      + response[5].size+'ft' + '</br> Shape: ' + response[5].shape_full
                      + '</br> Swell Direction: '+ dir + '</br> Wind: ' + response3[5].speed_kts + '</br> Tide: ' + response4[5].tide_meters + '</br>'
                      +'</p><p>Midday Conditions: ' 
                      + response[12].size+'ft' + '</br> Shape: ' + response[12].shape_full 
                      +'</br> Swell Direction: '+ dir + '</br> Wind: ' + response3[12].speed_kts + '</br> Tide: ' + response4[12].tide_meters + '</br>'
                      +'</p><p>Dusk Conditions :' 
                      + response[17].size+'ft' + '</br> Shape: ' + response[17].shape_full
                      +'</br> Swell Direction: '+ dir + '</br> Wind: ' + response3[17].speed_kts + '</br> Tide: ' + response4[17].tide_meters + '</br>'
                      +'</p>' +  '<p> Water Temp: ' + response5.fahrenheit + '</br> Wetsuit: ' + response5.wetsuit + '</p></div>';

                      var infoWindow1 = new google.maps.InfoWindow({
                              content: displayBox
                            });
                      infoWindow1.open(map, marker);
                    });
                  });
                });
              });
            });
        }

      var spotNum;
      // marker clicked functions
      marker.addListener('click', function(e){
        spotNum = marker.idNum;
        display();
        console.log("marker clicked");
        
        //closes infoWindow2 on mouseover so that infoWindow1 will stay open until clicked again.
        infoWindow2.close(map, marker);           
      });
      
      

      // mouse over funtions
      var infoWindow2 = new google.maps.InfoWindow({
      content: '<p>'+ marker.reference +'</p>'
      });

      marker.addListener('mouseover', function(e){
        infoWindow2.open(map, marker);
      });
      marker.addListener('mouseout', function(e){
        infoWindow2.close(map, marker);
      });
    });
    
      //   //testing google places api
      // // Create the search box and link it to the UI element.
      //   // Create the search box and link it to the UI element.
      //   var input = document.getElementById('pac-input');
      //   var searchBox = new google.maps.places.SearchBox(input);
      //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      //   // Bias the SearchBox results towards current map's viewport.
      //   map.addListener('bounds_changed', function() {
      //     searchBox.setBounds(map.getBounds());
      //   });

      //   var markers = [];
      //   // Listen for the event fired when the user selects a prediction and retrieve
      //   // more details for that place.
      //   searchBox.addListener('places_changed', function() {
      //     var places = searchBox.getPlaces();

      //     if (places.length == 0) {
      //       return;
      //     }

      //     // Clear out the old markers.
      //     markers.forEach(function(marker) {
      //       marker.setMap(null);
      //     });
      //     markers = [];

      //     // For each place, get the icon, name and location.
      //     var bounds = new google.maps.LatLngBounds();
      //     places.forEach(function(place) {
      //       if (!place.geometry) {
      //         console.log("Returned place contains no geometry");
      //         return;
      //       }
      //       var icon = {
      //         url: place.icon,
      //         size: new google.maps.Size(71, 71),
      //         origin: new google.maps.Point(0, 0),
      //         anchor: new google.maps.Point(17, 34),
      //         scaledSize: new google.maps.Size(25, 25)
      //       };

      //       // Create a marker for each place.
      //       markers.push(new google.maps.Marker({
      //         map: map,
      //         icon: icon,
      //         title: place.name,
      //         position: place.geometry.location
      //       }));

      //       if (place.geometry.viewport) {
      //         // Only geocodes have viewport.
      //         bounds.union(place.geometry.viewport);
      //       } else {
      //         bounds.extend(place.geometry.location);
      //       }
      //     });
      //     map.fitBounds(bounds);
      //   });


 


    
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
