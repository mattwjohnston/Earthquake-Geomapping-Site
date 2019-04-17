var myMap = L.map("map", {
  center: [38, -113.74],
  zoom: 6
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson").then(function(data) {
  var data = data["features"];
  console.log(data);

  for (var i = 0; i < data.length; i++) {
    var mag = data[i]["properties"]["mag"];
    var color = "";
    var coordinates = data[i]['geometry']['coordinates'];
    var place = data[i]["properties"]["place"];

    if (mag < 2.9) {
      color = "Green";
    }else if (mag < 3.5) {
      color = "GreenYellow";
    }
    else if (mag < 4) {
      color = "Yellow";
    }
    else if (mag < 6) {
      color = "Orange";
    }
    else if (mag < 7) {
      color = "OrangeRed";
    }
    else if (mag < 10) {
      color = "Red";
    }
    L.circle([coordinates[1], coordinates[0]], {fillColor: color, color: color, fillOpacity: 0.8, radius: mag * 15000})
      .bindPopup(`<center><h2>Location:<br>${place}<hr>Magnitude:<br>${mag}</h2></center>`).addTo(myMap)
  }

  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
       div.innerHTML = `<div class="legendbox">
                        <p>Magnitudes</p>
                        <p><i style="background: Green"></i>2.4-2.9</p>
                        <p><i style="background: GreenYellow"></i>3.0-3.4</p>
                        <p><i style="background: Yellow"></i>3.5-3.9</p>
                        <p><i style="background: Orange"></i>4.0-4.4</p>
                        <p><i style="background: OrangeRed"></i>4.5-4.9</p>
                        <p><i style="background: Red"></i>5+</p></div>`
    return div;
  };
  
  legend.addTo(myMap)

});