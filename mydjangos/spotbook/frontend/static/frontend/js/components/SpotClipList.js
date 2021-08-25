import SpotClip from "./SpotClip.js";

export default class SpotClipList {
    // FETCHERS
    
    async fetchClipList(spot_id) {
        let url = `http://127.0.0.1:8000/clips/api/clip-list-spot/${spot_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // GETTERS

    async getClipList(spot_id) {
        var result = await this.fetchClipList(spot_id);
        return result;
    }

    async getClip(clip_id) {
        var result = await this.buildClip(clip_id);
        return result;
    }

    async getSpotClipList(spot_id) {
        var result = await this.buildSpotClipList(spot_id);
        return result;
    }

    // BUILDERS

    async buildClip(clip_id) {
        var obj = new SpotClip();
        var result = obj.getSpotClip(clip_id);
        return result;
    }

    async buildSpotClipList(spot_id) {
        var clip_list_obj = await this.getClipList(spot_id);
        var clip_list = clip_list_obj.clip_id_list;

        var div = document.createElement('div');
        div.id = 'spot-clips';

        for (var i = 0; i < clip_list.length; i++) {
            var clip_id = clip_list[i];
            var clip = await this.getClip(clip_id);
            div.appendChild(clip);
        }

        return div;
    }


}