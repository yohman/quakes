// Global variables
var map;

$( document ).ready(function() {
	init();
});

function init()
{
	// let's start the map
	startMap();

	// the url for earthquake feeds from USGS
	var url = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

	// get the data from USGS and add it to our map
	$.getJSON(url,function(data){
		L.geoJson(data, {
			onEachFeature: onEachFeature
		}).addTo(map);		
	})
}

function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.title);
    $('#data').append('<div>'+feature.properties.title+'</div>')
}

function startMap()
{
	map = new L.Map('map').setView([0,0], 1);
L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
}
