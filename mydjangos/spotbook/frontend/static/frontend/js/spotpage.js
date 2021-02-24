async function getSpotDetail() {
    let url = `http://127.0.0.1:8000/spots/api/spot-detail/${spot_id}`;
    try {
        let response = await(fetch(url));
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}


async function getSpotClipList() {
    let url = `http://127.0.0.1:8000/clips/api/clip-spot/${spot_id}`;
    try {
        let response = await(fetch(url));
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function consolelogSpotClipList() {
    let clipList = await getSpotClipList();
    console.log(clipList);
}

consolelogSpotClipList();

async function renderSpotDetail() {
    let spot = await getSpotDetail();
    const spotDetailDiv = document.getElementById('spot-details');

    const spotTitle = document.createElement('p');
    spotTitle.textContent = spot.properties.title;
    spotDetailDiv.appendChild(spotTitle);

    const spotDescrition = document.createElement('p');
    spotDescrition.textContent = spot.properties.description;
    spotDetailDiv.appendChild(spotDescrition);

    const spotType = document.createElement('p');
    spotType.textContent = spot.properties.spotType;
    spotDetailDiv.appendChild(spotType);


}

renderSpotDetail();

function spotClip(clip) {
    const container = document.createElement('div');
    
    const clipUser = document.createElement('p');
    clipUser.textContent = clip.user;
    container.appendChild(clipUser);

    const clipSpot = document.createElement('p');
    clipSpot.textContent = clip.spot;
    container.appendChild(clipSpot);

    const clipTextContent = document.createElement('p');
    clipTextContent.textContent = clip.textContent;
    container.appendChild(clipTextContent);


    return container

}

async function renderSpotClip() {
    let clipList = await getSpotClipList();
    const spotClipDiv = document.getElementById('spot-clips');

    for (clip of clipList) {
        spotClipDiv.appendChild(spotClip(clip))
    }


}

renderSpotClip();