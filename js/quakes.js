/*

	Global variables

*/
var map;

/*

	Run this when the html document is loaded
	Source: https://learn.jquery.com/using-jquery-core/document-ready/

*/
$( document ).ready(function() {
	init();
});

/*

	The initialize function is the first thing this application does

*/
function init()
{
	// let's start the map
	startMap();

	// the url for earthquake feeds from USGS
	// Source: http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
	var url = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

	// get the data from USGS and add it to our map using $.getJSON
	// Source: http://api.jquery.com/jQuery.getJSON/
	$.getJSON(url,function(data){
		// use leaflet to map a geoJson object
		// Source: http://leafletjs.com/examples/geojson/
		L.geoJson(data, {
			onEachFeature: onEachFeature
		}).addTo(map);		
	})
}

/*

	Function to map each feature

*/
function onEachFeature(feature, layer) {
	// create a popup window
    layer.bindPopup(feature.properties.title);

    // add the data to the list using the jQuery append function
    // Source: http://api.jquery.com/append/
    $('#data').append('<div>'+feature.properties.title+'</div>')
}

/*

	Function to draw the map

*/
function startMap()
{
	// create a leaflet map
	// Source: http://leafletjs.com
	map = new L.Map('map').setView([0,0], 1);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}
