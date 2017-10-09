document.addEventListener("deviceready", function() {
  var pTags = document.getElementsByClassName("demo");
  for (var i = 0; i < pTags.length; i++) {
    executeCode(pTags[i], 1000 * i);
  }
}, false);

var baseArray = new plugin.google.maps.BaseArrayClass();

function executeCode(pTag, loadDelay) {
  var code = pTag.getElementsByTagName("pre")[0];
  
   $.ajax({
      url: "./Enderecos.csv",
      dataType: 'text',
      statusCode: {
        404: function() {
          alert( "page not found" );
        }
      }

   }).done(successFunction);

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

          var dialogDiv = showVirtualDialog(div, "Um momento, por favor ...");
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

            } else {
              isRunning = false;
            }
          });
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

function successFunction(data) {
  var allRows = data.split(/\r?\n|\r/);
  var endereco = "";


  for (var singleRow = 0; singleRow < allRows.length; singleRow++) {

    var rowCells = allRows[singleRow].split(',');
    endereco = "";
    for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
      // Se for primeiro campo da linha é a latitude
      if (rowCell === 0) {
         endereco = "{lat: " +  rowCells[rowCell] + ", ";
      }
      // Se for segundo campo da linha é a longitude
      else {
         endereco = endereco + "lng: " +  rowCells[rowCell] + "}";
      };
    };

    if (singleRow < 2) alert(endereco);
      
    // Adiciona endereco no vetor  
    baseArray.push(endereco);

  }; 
}