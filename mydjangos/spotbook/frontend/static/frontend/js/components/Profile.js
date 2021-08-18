import ProfileDetail from './ProfileDetail.js'
import FollowProfileButton from './FollowProfileButton.js';
import ProfileClipList from './ProfileClipList.js';

export default class Profile {


    // GETTERS

    async getProfileDetailDiv(username) {
        var profileDetail = new ProfileDetail();
        var profile_detail_div = await profileDetail.getProfileDetailDiv(username);
        return profile_detail_div;
    }

    async getFollowProfileButtonDiv(username) {
        var obj = new FollowProfileButton();
        var div = await obj.button(username);
        return div;
    }

    async getProfileClipList(username) {
        var obj = new ProfileClipList();
        var div = await obj.getProfileClipList(username);
        return div;
    }

    async getProfileDiv(username) {
        var profileDiv = await this.buildProfileDiv(username);
        return profileDiv;
    }

    // BUILDERS

    async buildProfileDiv(username) {
        var profileDiv = document.createElement('div');
        profileDiv.id = 'profile-div';

        var profileDetailDiv = await this.getProfileDetailDiv(username);
        var followButtonDiv = await this.getFollowProfileButtonDiv(username);
        var profileClipListDiv = await this.getProfileClipList(username);

        profileDiv.appendChild(profileDetailDiv);
        profileDiv.appendChild(followButtonDiv);
        profileDiv.appendChild(profileClipListDiv);

        return profileDiv;
    }

    // RENDERERS

    async render(username, targetDiv) {
        var div = await this.getProfileDiv(username);
        const target = document.getElementById(targetDiv);

        target.appendChild(div);
    }
}