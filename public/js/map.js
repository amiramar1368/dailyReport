// Creates a leaflet map binded to an html <div> with id "map"
// setView will set the initial map view to the location at coordinates
// 13 represents the initial zoom level with higher values being more zoomed in
// var map = leaflet.map('map').setView([32.30661, 55.54481], 13);
var map = L.map("map", {
  center: [32.2972, 55.52149],
  zoom:(innerHeight+innerWidth)/85
});

// Adds the basemap tiles to your web map
// Additional providers are available at: https://leaflet-extras.github.io/leaflet-providers/preview/

// http://www.google.com/maps/vt?lyrs=s,h&x={x}&y={y}&z={z}
L.tileLayer("https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png", {
  subdomains: "abcd",
  maxZoom: 25,
}).addTo(map);

const start_opint = JSON.parse(localStorage.getItem("start"));
const end_point = JSON.parse(localStorage.getItem("end"));
const truck_name = localStorage.getItem("truck");
const start_time = localStorage.getItem("startTime");
const end_time = localStorage.getItem("endTime");
const distant_time = localStorage.getItem("distanceTime");

// Adds a popup marker to the webmap for GGL address
L.marker([start_opint[0], start_opint[1]])
  .addTo(map)
  .bindPopup(`<b>نقطه شروع</b><br> Truck : ${truck_name}<br> Start :${start_time}<br> End :${end_time} <br> Time :${distant_time} <br>`,{
    
  })
  .openPopup();

// L.circleMarker([end[0], end[1]])
//   .addTo(map)
//   .bindPopup("Truck :<br>" + "Start :<br>" + "End : <br>" + "Time : <br>")
// .openPopup();
L.marker([end_point[0], end_point[1]]).addTo(map).bindPopup("<b>نقطه پایان</b>");
const points = JSON.parse(localStorage.getItem("points"));
var pointList = [];

for (let item in points) {
  pointList.push(new L.LatLng(points[item][0], points[item][1]));
}
var firstpolyline = new L.polyline(pointList, {
  color: "red",
  weight: 3,
  opacity: 0.7,
  smoothFactor: 1,
});

addEventListener("DOMContentLoaded", async () => {
  const { data } = await axios.get("/map");
  L.geoJSON(data).addTo(map);
  firstpolyline.addTo(map);
  setTimeout(() => {
    return map.invalidateSize();
  }, 1000);
});
