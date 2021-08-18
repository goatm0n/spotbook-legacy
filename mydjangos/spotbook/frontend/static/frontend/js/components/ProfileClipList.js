import SpotClip from "./SpotClip.js";

export default class ProfileClipList {
    // FETCHERS
    
    async fetchClipList(username) {
        let url = `http://127.0.0.1:8000/clips/api/clip-list/${username}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // GETTERS

    async getClipList(username) {
        var result = await this.fetchClipList(username);
        return result;
    }

    async getClip(clip_id) {
        var result = await this.buildClip(clip_id);
        return result;
    }

    async getProfileClipList(username) {
        var result = await this.buildProfileClipList(username);
        return result;
    }

    // BUILDERS

    async buildClip(clip_id) {
        var obj = new SpotClip();
        var result = obj.getSpotClip(clip_id);
        return result;
    }

    async buildProfileClipList(username) {
        var clip_list_obj = await this.getClipList(username);
        var clip_list = clip_list_obj.clip_id_list;

        var div = document.createElement('div');
        div.id = 'profile-clips';

        for (var i = 0; i < clip_list.length; i++) {
            var clip_id = clip_list[i];
            var clip = await this.getClip(clip_id);
            div.appendChild(clip);
        }

        return div;
    }
}