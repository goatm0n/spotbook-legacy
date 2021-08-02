class ProfileDetail {
    constructor(targetDiv, targetUser) {
        this.targetDiv = targetDiv;
        this.targetUser = targetUser;
    }

    async fetchProfileObj() {
        let url = `http://127.0.0.1:8000/profiles/api/profile-detail/${this.targetUser}`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    buildUsername() {
        const div = document.createElement('div');
        div.id = 'username-container';
        const usernameElem = document.createElement('p');
        usernameElem.textContent = _username;
        div.appendChild(usernameElem);


        return div;
    }

    buildBio(bio) {
        const div = document.createElement('div');
        div.id = 'bio-container';
        const bioElem = document.createElement('p');
        bioElem.textContent = bio;
        div.appendChild(bioElem);

        return div;
    }

    buildFullName(fullName) {
        const div = document.createElement('div');
        div.id='full-name-container';
        const fullNameElem = document.createElement('p');
        fullNameElem.textContent = fullName;
        div.appendChild(fullNameElem);

        return div;
    }

    buildProfilePicture(src) {
        const div = document.createElement('div');
        div.id = 'profile-picture-container';
        const profilePicElem = document.createElement('img');
        profilePicElem.id = 'profile-pic';
        profilePicElem.src = src;
        div.appendChild(profilePicElem);

        return div;
    }

    build(profileObj) {
        const div = document.getElementById(this.targetDiv);

        const username = this.buildUsername();
        const bio = this.buildBio(profileObj.bio);
        const fullName = this.buildFullName(profileObj.full_name);
        const profilePic = this.buildProfilePicture(profileObj.profile_picture);
        
        div.appendChild(username);
        div.appendChild(bio);
        div.appendChild(fullName);
        div.appendChild(profilePic);

    }

    async render() {
        let profileObj = await this.fetchProfileObj();
        console.log(profileObj);
        this.build(profileObj);
        
        
    }
}