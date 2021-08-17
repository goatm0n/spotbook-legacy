export default class ProfileDetail {
    // FETCHERS

    async fetchProfileObj(username) {
        let url = `http://127.0.0.1:8000/profiles/api/profile-detail/${username}`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async fetchAccountObj(username) {
        let user_id = await this.getUserId(username);
        let url = `http://127.0.0.1:8000/accounts/api/account-detail/${user_id}`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // GETTERS

    async getProfileObj(username) {
        return await this.fetchProfileObj(username=username);
    }

    async getUserId(username) {
        let obj = await this.getProfileObj(username);
        let user_id = obj.user;
        return user_id;

    }

    async getAccountObj(username) {
        return await this.fetchAccountObj(username);
    }

    async getUsername(username) {
        let obj = await this.getAccountObj(username);
        return obj.username;
    }

    async getBio(username) {
        let obj = await this.getProfileObj(username);
        return obj.bio;
    }

    async getFullName(username) {
        let obj = await this.getProfileObj(username);
        return obj.full_name;
    }

    async getProfilePicSrc(username) {
        let obj = await this.getProfileObj(username);
        return obj.profile_picture;
    }

    async getProfileDetailDiv(username) {
        let result = await this.buildProfileDetail(username);
        return result;
    }


    // BUILDERS

    async buildUsername(username) {
        const div = document.createElement('div');
        div.id = 'username-container';
        const usernameElem = document.createElement('p');
        usernameElem.textContent = await this.getUsername(username);
        div.appendChild(usernameElem);


        return div;
    }

    async buildBio(username) {
        const div = document.createElement('div');
        div.id = 'bio-container';
        const bioElem = document.createElement('p');
        bioElem.textContent = await this.getBio(username);
        div.appendChild(bioElem);

        return div;
    }

    async buildFullName(username) {
        const div = document.createElement('div');
        div.id='full-name-container';
        const fullNameElem = document.createElement('p');
        fullNameElem.textContent = await this.getFullName(username);
        div.appendChild(fullNameElem);

        return div;
    }

    async buildProfilePicture(username) {
        const div = document.createElement('div');
        div.id = 'profile-picture-container';
        const profilePicElem = document.createElement('img');
        profilePicElem.id = 'profile-pic';
        profilePicElem.src = await this.getProfilePicSrc(username);
        div.appendChild(profilePicElem);

        return div;
    }

    async buildProfileDetail(username) {
        var div = document.createElement('div');

        var usernameDiv = await this.buildUsername(username);
        var bioDiv = await this.buildBio(username);
        var fullNameDiv = await this.buildFullName(username);
        var profilePicDiv = await this.buildProfilePicture(username);
        
        div.appendChild(usernameDiv);
        div.appendChild(bioDiv);
        div.appendChild(fullNameDiv);
        div.appendChild(profilePicDiv);

        return div
    }

    // RENDERERS

    async render(targetDiv, username) {
        var div = await this.getProfileDetailDiv(username);
        const target = document.getElementById(targetDiv);

        target.appendChild(div);
    }
}