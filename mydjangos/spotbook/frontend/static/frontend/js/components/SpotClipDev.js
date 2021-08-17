import SpotBadge from "./SpotBadge.js";

export default class SpotClip {
    // FETCHERS

    async fetchClipObj(clip_id) {
        let url = `http://127.0.0.1:8000/clips/api/clip-detail/${clip_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async fetchAccountObj(clip_id) {
        let clipObj = await this.getClipObj(clip_id);
        let account_id = clipObj.user;
        let url = `http://127.0.0.1:8000/accounts/api/account-detail/${account_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // GETTERS

    async getClipObj(clip_id) {
        var result =  await this.fetchClipObj(clip_id);
        return result;
    }

    async getAccountObj(clip_id) {
        var result = await this.fetchAccountObj(clip_id);
        return result;
    }

    async getSpotId(clip_id) {
        let clipObj = await this.getClipObj(clip_id);
        let spotId = clipObj.spot;
        return spotId;
    }

    async getUsername(clip_id) {
        let accountObj = await this.getAccountobj(clip_id);
        let username = accountObj.username;
        return username;
    }

    async getSpotBadge(clip_id) {
        let result = await this.buildSpotBadge(clip_id);
        return result;
    }

    // BUILDERS

    async buildSpotBadge(clip_id) {
        var spot_id = await this.getSpotId(clip_id);
        var spot_badge_obj = new SpotBadge();
        var spot_badge = await spot_badge_obj.getSpotBadge(spot_id);
        return spot_badge;
    }
}