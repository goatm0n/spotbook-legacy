import SpotClip from './SpotClip.js';

export default class SpotFeed {

    // FETCHERS
    async fetchUserSpotFeed(username) {
        let url = `http://127.0.0.1:8000/clips/api/spotfeed/${username}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // GETTERS

    async getUserSpotFeed(username) {
        var clip_list_obj = await this.fetchUserSpotFeed(username);
        var clip_list = clip_list_obj.clip_list;

        return clip_list;
    }

    async getSpotClipDiv(clip_id) {
        var obj = new SpotClip();
        var div = await obj.getSpotClip(clip_id);
        return div;
    }
    
    async getSpotFeedDiv(username) {
        var result = await this.buildSpotFeed(username);
        return result;
    }

    // BUILDERS
    async buildSpotFeed(username) {
        var div = document.createElement('div');
        div.id = 'spot-feed-div';

        var clip_list = await this.getUserSpotFeed(username);
        for (var clip_id of clip_list) {
            var clipDiv = await this.getSpotClipDiv(clip_id);
            div.appendChild(clipDiv);
        }

        return div;
    }

    // RENDERERS
    async render(target_div, username) {
        var target = document.getElementById(target_div);
        var div = await this.getSpotFeedDiv(username);
        target.appendChild(div);
    }
}