async function getUserClipList(username) {
    let url = `http://127.0.0.1:8000/clips/api/clip-user/${username}`;
    try {
        let response = await(fetch(url));
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

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
    const clipUser = document.createElement('p');
    let userObj = await getUserById(clip.user);
    let username = userObj.username;
    clipUser.textContent = username;
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


    return myContainer;

}

async function renderUserClips(username) {
    let clipList = await getUserClipList(username);
    const userClipsDiv = document.getElementById('clips-container');

    for (clip of clipList) {
        newClip = await spotClip(clip);
        userClipsDiv.appendChild(newClip);
    }


}

renderUserClips(_username);