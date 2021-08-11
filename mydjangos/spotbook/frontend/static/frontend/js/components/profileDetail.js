export default class ProfileDetail {
    constructor(username) {
        this.username = username;
        console.log(this.username);
    }

    sayHi() {
        console.log('hi');
    }

    // FETCHERS

    async fetchProfileObj() {
        let url = `http://127.0.0.1:8000/profiles/api/profile-detail/${this.username}`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async fetchAccountObj() {
        let user_id = await this.getUserId();
        let url = `http://127.0.0.1:8000/accounts/api/account-detail/${user_id}`;
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

    async getUserId() {
        let obj = await this.getProfileObj();
        let user_id = obj.user;
        return user_id;

    }

    async getAccountObj() {
        return await this.fetchAccountObj();
    }

    async getUsername() {
        let obj = await this.getAccountObj();
        return obj.username;
    }

    async getBio() {
        let obj = await this.getProfileObj();
        return obj.bio;
    }

    async getFullName() {
        let obj = await this.getProfileObj();
        return obj.full_name;
    }

    async getProfilePicSrc() {
        let obj = await this.getProfileObj();
        return obj.profile_picture;
    }

    async getProfileDetailDiv() {
        let result = await this.buildProfileDetail();
        console.log(result);
        return result;
    }


    // BUILDERS

    async buildUsername() {
        const div = document.createElement('div');
        div.id = 'username-container';
        const usernameElem = document.createElement('p');
        usernameElem.textContent = await this.getUsername();
        div.appendChild(usernameElem);


        return div;
    }

    async buildBio() {
        const div = document.createElement('div');
        div.id = 'bio-container';
        const bioElem = document.createElement('p');
        bioElem.textContent = await this.getBio();
        div.appendChild(bioElem);

        return div;
    }

    async buildFullName() {
        const div = document.createElement('div');
        div.id='full-name-container';
        const fullNameElem = document.createElement('p');
        fullNameElem.textContent = await this.getFullName();
        div.appendChild(fullNameElem);

        return div;
    }

    async buildProfilePicture() {
        const div = document.createElement('div');
        div.id = 'profile-picture-container';
        const profilePicElem = document.createElement('img');
        profilePicElem.id = 'profile-pic';
        profilePicElem.src = await this.getProfilePicSrc();
        div.appendChild(profilePicElem);

        return div;
    }

    async buildProfileDetail() {
        var div = document.createElement('div');

        var usernameDiv = await this.buildUsername();
        var bioDiv = await this.buildBio();
        var fullNameDiv = await this.buildFullName();
        var profilePicDiv = await this.buildProfilePicture();
        
        div.appendChild(usernameDiv);
        div.appendChild(bioDiv);
        div.appendChild(fullNameDiv);
        div.appendChild(profilePicDiv);

        return div
    }

    // RENDERERS

    async render(targetDiv) {
        var div = await this.getProfileDetailDiv();
        const target = document.getElementById(targetDiv);

        target.appendChild(div);
    }
}