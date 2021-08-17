import ProfileDetail from './components/ProfileDetail.js'
import FollowProfileButton from './components/FollowProfileButton.js/index.js';

export default class Profile {


    // GETTERS

    async getProfileDetailDiv(username) {
        var profileDetail = new ProfileDetail();
        var profile_detail_div = await profileDetail.getProfileDetailDiv(username);
        return profile_detail_div;
    }

    async getProfileDiv(username) {
        var profileDiv = await this.buildProfileDiv(username);
        return profileDiv;
    }

    async getFollowProfileButtonDiv(username) {
        var obj = new FollowProfileButton();
        var div = await obj.button(username);
        return div;
    }

    // BUILDERS

    async buildProfileDiv(username) {
        var profileDiv = document.createElement('div');
        profileDiv.id = 'profile-div';

        var profileDetailDiv = await this.getProfileDetailDiv(username);
        var followButtonDiv = await this.getFollowProfileButtonDiv(username);

        profileDiv.appendChild(profileDetailDiv);
        profileDiv.appendChild(followButtonDiv);

        return profileDiv;
    }

    // RENDERERS

    async render(targetDiv, username) {
        var div = await this.getProfileDiv(username);
        const target = document.getElementById(targetDiv);

        target.appendChild(div);
    }
}