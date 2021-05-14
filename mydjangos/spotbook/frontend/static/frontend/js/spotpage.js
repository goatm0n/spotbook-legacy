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


async function renderSpotDetail() {
    let spot = await getSpotDetail();
    const spotDetailDiv = document.getElementById('spot-details');

    const spotTitleDiv = document.createElement('div');
    spotTitleDiv.id = 'spot-title';
    const spotTitle = document.createElement('p');
    spotTitle.textContent = spot.properties.title;
    spotTitleDiv.appendChild(spotTitle);
    spotDetailDiv.appendChild(spotTitleDiv);

    const spotDescriptionDiv = document.createElement('div');
    spotDescriptionDiv.id = 'spot-description';
    const spotDescription = document.createElement('p');
    spotDescription.textContent = spot.properties.description;
    spotDescriptionDiv.appendChild(spotDescription);
    spotDetailDiv.appendChild(spotDescriptionDiv);

    const spotTypeDiv = document.createElement('div');
    spotTypeDiv.id = 'spot-type';
    const spotType = document.createElement('p');
    spotType.textContent = spot.properties.spotType;
    spotTypeDiv.appendChild(spotType);
    spotDetailDiv.appendChild(spotTypeDiv);


}

renderSpotDetail();

async function getUserById(user_id) {
    let url = `http://127.0.0.1:8000/accounts/api/account-detail/${user_id}`
    try {
        let response = await(fetch(url));
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function getSpotById(spot_id) {
    let url = `http://127.0.0.1:8000/spots/api/spot-detail/${spot_id}`;
    try {
        let response = await(fetch(url));
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}


async function spotClip(clip) {
    const myContainer = document.createElement('div');
    myContainer.id = 'spot-clip';
    myContainer.setAttribute('class', 'container');
    
    const clipUserContainer = document.createElement('div');
    clipUserContainer.id = 'clip-user-container';
    clipUserContainer.setAttribute('class', 'container');
    const clipUser = document.createElement('a');
    let userObj = await getUserById(clip.user);
    let username = userObj.username;
    clipUser.textContent = username;
    clipUser.setAttribute('href', `http://127.0.0.1:8000/spotbook/profile/${username}`);
    clipUserContainer.appendChild(clipUser);
    myContainer.appendChild(clipUserContainer);

    const clipSpotContainer = document.createElement('div');
    clipSpotContainer.id= 'clip-spot-container';
    clipSpotContainer.setAttribute('class', 'container');
    const clipSpot = document.createElement('p');
    let spotObj = await getSpotById(clip.spot);
    let spotTitle = spotObj.properties.title
    clipSpot.textContent = spotTitle;
    clipSpotContainer.appendChild(clipSpot);
    myContainer.appendChild(clipSpotContainer);

    const clipImageContainer = document.createElement('div');
    clipImageContainer.id = 'clip-image-container';
    clipImageContainer.setAttribute('class', 'container');
    const clipImage = document.createElement('img');
    clipImage.src = clip.image;
    clipImage.alt = 'image';
    clipImage.width = '300';
    clipImage.height = '400';
    clipImage.id = 'clip-image';
    clipImageContainer.appendChild(clipImage);
    myContainer.appendChild(clipImageContainer);

    const clipTextContentContainer = document.createElement('div');
    clipTextContentContainer. id = 'clip-text-content-container';
    clipTextContentContainer.setAttribute('class', 'container');
    const clipTextContent = document.createElement('p');
    clipTextContent.textContent = clip.textContent;
    clipTextContentContainer.appendChild(clipTextContent);
    myContainer.appendChild(clipTextContentContainer);


    return myContainer

}

async function renderSpotClip() {
    let clipList = await getSpotClipList();
    const spotClipDiv = document.getElementById('spot-clips');

    for (clip of clipList) {
        newClip = await spotClip(clip)
        spotClipDiv.appendChild(newClip)
    }


}

renderSpotClip();