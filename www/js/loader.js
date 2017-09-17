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
      console.log("--> map_canvas1 : ready.");
    );
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
