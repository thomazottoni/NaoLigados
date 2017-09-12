/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
          var div = document.getElementById("map_canvas");

          // Initialize the map view
          map = plugin.google.maps.Map.getMap(div);

          // Wait until the map is ready status.
          map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
    }, 

    function onMapReady() {
      var button = document.getElementById("button");
      button.addEventListener("click", onButtonClick);
    }

    function onButtonClick() {

      // Move to the position with animation
      map.animateCamera({
        target: {lat: 37.422359, lng: -122.084344},
        zoom: 17,
        tilt: 60,
        bearing: 140,
        duration: 5000
      }, function() {

        // Add a maker
        map.addMarker({
          position: {lat: 37.422359, lng: -122.084344},
          title: "Welecome to \n" +
                 "Cordova GoogleMaps plugin for iOS and Android",
          snippet: "This plugin is awesome!",
          animation: plugin.google.maps.Animation.BOUNCE
        }, function(marker) {

          // Show the info window
          marker.showInfoWindow();

          // Catch the click event
          marker.on(plugin.google.maps.event.INFO_CLICK, function() {

            // To do something...
            alert("Hello world!");

          });
        });
      });
    }
};
