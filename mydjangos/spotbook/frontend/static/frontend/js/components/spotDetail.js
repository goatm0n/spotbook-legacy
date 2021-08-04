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

function renderSpotDetail(spot) {

    const spotDetailContainer = document.createElement('div');
    spotDetailContainer.id = 'spot-detail-container';

    const spotTitleDiv = document.createElement('div');
    spotTitleDiv.id = 'spot-title-container';
    const spotTitle = document.createElement('p');
    spotTitle.id = 'spot-title';
    spotTitle.textContent = spot.properties.title;
    spotTitleDiv.appendChild(spotTitle);

    const spotTypeDiv = document.createElement('div');
    spotTypeDiv.id = 'spot-type-container';
    const spotType = document.createElement('p');
    spotType.id = 'spot-type';
    spotType.textContent = spot.properties.spotType;
    spotTypeDiv.appendChild(spotType);

    const spotDescriptionDiv = document.createElement('div');
    spotDescriptionDiv.id = 'spot-description-container';
    const spotDescription = document.createElement('p');
    spotDescription.id = 'spot-description';
    spotDescription.textContent = spot.properties.description;
    spotDescriptionDiv.appendChild(spotDescription);

    spotDetailContainer.appendChild(spotTitleDiv);
    spotDetailContainer.appendChild(spotTypeDiv);
    spotDetailContainer.appendChild(spotDescriptionDiv);

    return spotDetailContainer;
}

async function getSpotDetail() {
    let url = `http://127.0.0.1:8000/spots/api/spot-detail/${spot_id}`;
    try {
        let response = await(fetch(url));
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function spotDetail() {
    let mySpot = await getSpotDetail();
    spotDetailDiv = renderSpotDetail(mySpot);
    target = document.getElementById('spot-details');
    target.appendChild(spotDetailDiv);
}

spotDetail();

