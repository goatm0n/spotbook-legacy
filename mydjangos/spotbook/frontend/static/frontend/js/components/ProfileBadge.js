export default class ProfileBadge {

    // FETCHERS
    
    async fetchProfileObj(username) {
        let url = `http://127.0.0.1:8000/profiles/api/profile-detail/${username}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async fetchAccountObj(username) {
        var account_id = await this.getProfileObj(username).user;
        let url = `http://127.0.0.1:8000/accounts/api/account-detail/${account_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
    

    // GETTERS

    async getProfileObj(username) {
        return await this.fetchProfileObj(username);
    }

    async getAccountobj(username) {
        return await this.fetchAccountObj(username);
    }

    async getProfilePictureSrc(username) {
        let profile = await this.getProfileObj(username);
        let result = profile.profile_picture;
        return result
    }

    async getProfileBadge(username) {
        let result = await this.buildProfileBadge(username);
        return result
    }

    // BUILDERS

    async buildProfileBadgePicture(username) {
        const profileBadgePictureDiv = document.createElement('div');
        profileBadgePictureDiv.id = 'profile-badge-picture-div';

        const profileBadgePicElem = document.createElement('img');
        profileBadgePicElem.id = 'profile-badge-pic';
        profileBadgePicElem.src = await this.getProfilePictureSrc(username);

        profileBadgePictureDiv.appendChild(profileBadgePicElem);

        return profileBadgePictureDiv;
    }

    async buildUsername(username) {
        const usernameDiv = document.createElement('div');
        usernameDiv.id = 'username-div';

        const usernameLink = document.createElement('a');
        usernameLink.id = 'username-link';
        usernameLink.setAttribute('href', `http://127.0.0.1:8000/spotbook/profile/${username}/`);
        usernameLink.textContent = `${username}`;

        usernameDiv.appendChild(usernameLink);

        return usernameDiv;
    }

    async buildProfileBadge(username) {
        const profileBadgeDiv = document.createElement('div');
        profileBadgeDiv.id = 'profile-badge-div';

        const profile_badge_picture = await this.buildProfileBadgePicture(username);
        const username_div = await this.buildUsername(username);

        profileBadgeDiv.appendChild(profile_badge_picture);
        profileBadgeDiv.appendChild(username_div);

        return profileBadgeDiv;
    }


    // TESTS
    async test() {
        result = await this.getAccountObj(username);
        return result
    }
}