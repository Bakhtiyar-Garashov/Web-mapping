var map = L.map('map', {
    center: [54.008586, -1.078343],
    zoom: 10
});



//adding three base maps 
var landscape = L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
    attribution: 'Tiles from Thunderforest'
});

var toner = L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', { attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>' });
//toner.addTo(map);

var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 16
});

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


OpenStreetMap_Mapnik.addTo(map);


var baseMaps = {
    "Thunderforest landscape": landscape,
    "Toner": toner,
    "ESRI": esri,
    "OpemStreetMap": OpenStreetMap_Mapnik
}


L.control.scale(
    { imperial: false, maxwidth: 100 }
).addTo(map);


var myIcon = L.icon({
    iconUrl: 'css/images/fuel.svg',
    iconSize: [25, 25],
    
});



var img_url = "css/images/download.jpg";
var img_url2 = "css/images/park.jpg";


var boundaries = L.geoJson(boundaries, {
    onEachFeature: function (feature, marker) {
        marker.bindPopup("<center><b>" + feature.properties.NAME + "</b></center>");
    }
});
boundaries.addTo(map);




var stations = L.geoJson(dataset, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng,{icon:myIcon});
    },
    onEachFeature: function (feature, marker) {
        marker.bindPopup("<center><br><b> <img width=200 height=120 src=" + img_url + "> <br>" + "Station name: " + feature.properties.ADDRESS_1 + "<br>Location: " + marker.getLatLng() +
            "</b></center>");
        
    }
});
stations.addTo(map);



var car_parks = L.geoJson(parks, {
    onEachFeature: function (feature, marker) {
        marker.bindPopup("<center><br><b><img width=200 height=120 src=" + img_url2 + "> <br>Name:" + feature.properties.DESCRIPTIO + "<br>" + "Address:" + feature.properties.LV_DETAILS + "<br>Available spaces:" + feature.properties.CARPARKSPACES + "</b></center>");
    }
});

car_parks.addTo(map);


var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
}


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}


var features = {
    "Charging stations": stations,
    "Parking places": car_parks,
    "Boundaries":boundaries

}


var legend = L.control.layers(baseMaps, features, { position: 'bottomleft', collapsed: true }).addTo(map);


