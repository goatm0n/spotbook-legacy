class ProfileBadge {
    constructor(username) {
        this.username = username;
    }

    // FETCHERS
    
    async fetchProfileObj() {
        let url = `http://127.0.0.1:8000/profiles/api/profile-detail/${this.username}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async fetchAccountObj() {
        var account_id = await this.getProfileObj().user;
        let url = `http://127.0.0.1:8000/accounts/api/account-detail/${account_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
    

    // GETTERS

    async getProfileObj() {
        return await this.fetchProfileObj();
    }

    async getAccountobj() {
        return await this.fetchAccountObj();
    }

    async getProfilePictureSrc() {
        let profile = await this.getProfileObj();
        let result = profile.profile_picture;
        return result
    }

    getProfileBadge() {
        let result = this.buildProfileBadge();
        return result
    }

    // BUILDERS

    async buildProfileBadgePicture() {
        const profileBadgePictureDiv = document.createElement('div');
        profileBadgePictureDiv.id = 'profile-badge-picture-div';

        const profileBadgePicElem = document.createElement('img');
        profileBadgePicElem.id = 'profile-badge-pic';
        profileBadgePicElem.src = await this.getProfilePictureSrc();

        profileBadgePictureDiv.appendChild(profileBadgePicElem);

        return profileBadgePictureDiv;
    }

    async buildUsername() {
        const usernameDiv = document.createElement('div');
        usernameDiv.id = 'username-div';

        const usernameLink = document.createElement('a');
        usernameLink.id = 'username-link';
        usernameLink.setAttribute('href', `http://127.0.0.1:8000/spotbook/profile/${this.username}/`);
        usernameLink.textContent = `${this.username}`;

        usernameDiv.appendChild(usernameLink);

        return usernameDiv;
    }

    async buildProfileBadge() {
        const profileBadgeDiv = document.createElement('div');
        profileBadgeDiv.id = 'profile-badge-div';

        const mainContainer = document.createElement('div');
        mainContainer.id = 'main-container';
        mainContainer.setAttribute('class', 'container');

        const profile_badge_picture = await this.buildProfileBadgePicture();
        const username_div = await this.buildUsername();

        mainContainer.appendChild(profile_badge_picture);
        mainContainer.appendChild(username_div);
        profileBadgeDiv.appendChild(mainContainer);

        return profileBadgeDiv;
    }


    // TESTS
    async test() {
        result = await this.getAccountObj();
        return result
    }
}