
async function fetchProfileObj() {
    let url = `http://127.0.0.1:8000/profiles/api/profile-detail/${_username}`;
    try {
        let response = await(fetch(url));
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

function renderUsername(username) {
    const container = document.getElementById('username-container');
    const usernameh3 = document.createElement('h3');
    usernameh3.textContent = username;
    container.appendChild(usernameh3);
}

function renderFullName(fullName) {
    const container = document.getElementById('full-name-container');
    const fullNameH3 = document.createElement('h3');
    fullNameH3.textContent = fullName;
    container.appendChild(fullNameH3);
}

function renderProfilePicture(profilePicture) {
    const container = document.getElementById('profile-picture-container');
    const profilePicElement = document.createElement('img');
    profilePicElement.src = profilePicture;
    container.appendChild(profilePicElement);
}

function renderBio(bio) {
    const container = document.getElementById('bio-container');
    const bioP = document.createElement('p');
    bioP.textContent = bio;
    container.appendChild(bioP);
}

async function renderProfile() {
    let profileObj = await fetchProfileObj();
    const fullName = profileObj.full_name;
    const bio = profileObj.bio;
    const profilePic = profileObj.profile_picture;

    renderUsername(_username);
    renderFullName(fullName);
    renderProfilePicture(profilePic);
    renderBio(bio);
}

renderProfile();
