var mymap = L.map('mapid').setView([55.8642, -4.2518], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(mymap);

L.control.scale().addTo(mymap);

async function getSpots() {
    let url = 'http://127.0.0.1:8000/spots/api/spot-list/'
    try {
        let response = await(fetch(url));
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

function spotMarker(spot) {
    title = spot.properties.title
    spotType = spot.properties.spotType
    description = spot.properties.description
    coordinates = spot.geometry.coordinates
    id = spot.id

    var myMarker = L.marker([coordinates[1], coordinates[0]]).addTo(mymap);
    myMarker.bindPopup(`<b> ${title} </b><br>${spotType}<br>${description}<br><a href='http://127.0.0.1:8000/spotbook/spotpage/${id}'>spot page</a>`);
}

async function showSpots() {
    let spots = await getSpots();
    const spotList = spots.features;
    spotList.forEach(spot => {
        spotMarker(spot);
    })
    
}

showSpots();

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);