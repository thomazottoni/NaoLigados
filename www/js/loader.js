document.addEventListener("deviceready", function() {
  var pTags = document.getElementsByClassName("demo");
  for (var i = 0; i < pTags.length; i++) {
    executeCode(pTags[i], 1000 * i);
  }
}, false);

function executeCode(pTag, loadDelay) {
  var code = pTag.getElementsByTagName("pre")[0];
  //console.log(code.innerText);

  // In order to prevent freezing the device (because too much work),
  // waiting kind of times is better when you use the multiple maps in one page.
  setTimeout(function() {
    var div = document.getElementById('map_canvas1'); 
    var map = plugin.google.maps.Map.getMap(div);  
    map.one(plugin.google.maps.event.MAP_READY, function() 
      {
        var onSuccess = function(location) {
        var msg = "Minha Posição";


        map.addMarker({
          'position': location.latLng,
          'icon': "./images/user-location.png",
          'title': msg

        }, function(marker) {
          marker.showInfoWindow();
          map.animateCamera({
            target: location.latLng,
            zoom: 16
          }, function() {
            marker.showInfoWindow();
          });
        });
      };

      var onError = function(msg) {
        alert(JSON.stringify(msg));
      };

      map.clear();
      map.getMyLocation(onSuccess, onError);

      var baseArray = new plugin.google.maps.BaseArrayClass([
        {lat: -20.337862, lng: -40.302598},
        {lat: -20.336052, lng: -40.309615},
        {lat: -20.338043, lng: -40.297277},
        {lat: -20.343194, lng: -40.297749},
        {lat: 41.79567, lng: 140.75845},
        {lat: 41.794470000000004, lng: 140.75714000000002},
        {lat: 41.795010000000005, lng: 140.75611},
        {lat: 41.79477000000001, lng: 140.75484},
        {lat: 41.79576, lng: 140.75475},
        {lat: 41.796150000000004, lng: 140.75364000000002},
        {lat: 41.79744, lng: 140.75454000000002},
        {lat: 41.79909000000001, lng: 140.75465}
      ]);

      baseArray.map(function(element, cb) {

        map.addMarker({
          "position": element
        }, cb);

      }, function(markers) {

        // markers[0] ... markers[n]

      });

      var isRunning = false;
      var inputField = div.getElementsByTagName("input")[0];
      var button = div.getElementsByTagName("button")[0];
      button.addEventListener("click", function() {
        if (isRunning) {
          return;
        }
        isRunning = true;

        var dialogDiv = showVirtualDialog(div, "Just a moment, please ...");
        setTimeout(function() {
          div.removeChild(dialogDiv);
        }, 3000);

        // Address -> latitude,longitude
        plugin.google.maps.Geocoder.geocode({
          "address": inputField.value
        }, function(results) {

          if (results.length) {

             // Move to the position
            map.animateCamera({
              'target': results[0].position,
              'zoom': 17
            }, function() {
              isRunning = false;
            });
          };
      });

 
    });
  }, loadDelay);
}

function showVirtualDialog(parentDiv, message) {
  var virtualDialog = document.createElement("div");
  virtualDialog.className = "virtualDialog";
  var text = document.createElement("div");
  text.innerText = message;
  text.style.width="200px";
  text.style.height="50px";
  virtualDialog.appendChild(text);
  virtualDialog.addEventListener("click", function() {
    parentDiv.removeChild(virtualDialog);
    virtualDialog.removeEventListener("click", arguments.callee);
    virtualDialog = null;
  });
  parentDiv.appendChild(virtualDialog);
  return virtualDialog;
}
