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
    myMarker.bindPopup(`<b> ${title} </b><br>${spotType}<br>${description}<br><a href='http://127.0.0.1:8000/spotbook/spotpage/${id}'>spot page</a><br><a href='http://127.0.0.1:8000/spotbook/upload-clip-from-spot/${id}'>upload clip</a>`);
}

async function showSpots() {
    let spots = await getSpots();
    const spotList = spots.features;
    spotList.forEach(spot => {
        spotMarker(spot);
    })
    
}

showSpots();

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

function stringifySpotForm() {
    let spotObj = {
        "geometry": {
            "type": "Point",
            "coordinates": [coords.lng, coords.lat]
        },
        "properties": {
           "title":  document.getElementById('title-input').value,
           "description": document.getElementById('description-input').value,
           "spotType": document.getElementById('spotType-input').value
        }
    }

    let spotJson = JSON.stringify(spotObj);
    
    return spotJson;

}

function postForm(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: data,
    }).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
}


function postSpotForm() {
    const spotJson = stringifySpotForm();
    let url = "http://127.0.0.1:8000/spots/api/spot-create/";

    postForm(url, spotJson);
    
}

function renderCreateSpotForm() {
    const container = document.getElementById('popup-html-container');
    const createSpotFormContainer = document.createElement('div');
    createSpotFormContainer.id = 'create-spot-form-container';

    const title = document.createElement('input');
    title.type = 'text'
    title.id = 'title-input';
    title.name = 'title-input';
    title.placeholder = 'spot-title';
    title.setAttribute('class', 'form-control');
    createSpotFormContainer.appendChild(title);

    const description = document.createElement('input');
    description.type = 'text';
    description.id = 'description-input';
    description.name = 'description-input';
    description.placeholder = 'spot-description';
    description.setAttribute('class', 'form-control');
    createSpotFormContainer.appendChild(description);

    const spotTypes = document.createElement('select');
    spotTypes.id = 'spotType-input';
    spotTypes.setAttribute('class', 'form-control');

    const street = document.createElement('option');
    street.text = 'Street';
    street.value = 'Street';
    spotTypes.add(street);

    const skatepark = document.createElement('option');
    skatepark.text = 'Skatepark';
    skatepark.value = 'Skatepark';
    spotTypes.add(skatepark);

    const diy = document.createElement('option');
    diy.text = 'D.I.Y';
    diy.value = 'D.I.Y';
    spotTypes.add(diy);

    createSpotFormContainer.appendChild(spotTypes);

    const submitButton = document.createElement('button');
    submitButton.id = 'submit-input';
    submitButton.setAttribute('class', 'btn btn-success');
    submitButton.innerHTML = 'Submit';
    submitButton.addEventListener('click', postSpotForm)
    createSpotFormContainer.appendChild(submitButton);

    container.appendChild(createSpotFormContainer);

    return container

}

var popup = L.popup();

function onMapClick(e) {
    coords = e.latlng;
    popup
        .setLatLng(coords)
        .setContent(`<div id="popup-html-container">
            <p> You clicked the map at ${coords.toString()} </p>
        </div>
        `)
        .openOn(mymap);
    renderCreateSpotForm();
}

mymap.on('click', onMapClick);