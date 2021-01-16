var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(mymap);

L.control.scale().addTo(mymap);

function fetchSpotlist() {
    console.log('fetching...');
    fetch('http://127.0.0.1:8000/backend/api/spot-list/').then(
        (response) => {
            var data = response.json()
            console.log(data)
        }
    );
};

fetchSpotlist();