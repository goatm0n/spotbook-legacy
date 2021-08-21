import SpotDetail from "./spotDetail.js";
import SpotFollowButton from "./SpotFollowButton.js";
import SpotLikeButton from "./SpotLikeButton.js";

export default class SpotPage {

    // GETTERS
    async getSpotDetailDiv(spot_id) {
        var obj = new SpotDetail();
        var div = obj.getSpotDetailDiv(spot_id);
        return div;
    }

    async getSpotFollowButtonDiv(spot_id) {
        var obj = new SpotFollowButton();
        var div = await obj.button(spot_id);
        return div
    }

    async getSpotLikeButtonDiv(spot_id) {
        var obj = new SpotLikeButton();
        var div = await obj.button(spot_id);
        return div;
    }

    async getSpotPageDiv(spot_id) {
        var result = await this.buildSpotPageDiv(spot_id);
        console.log(result);
        return result;
    }

    // BUILDERS
    async buildSpotPageDiv(spot_id) {
        var spotPageDiv = document.createElement('div');
        spotPageDiv.id = 'spot-page-div';

        var spotDetailDiv = await this.getSpotDetailDiv(spot_id);
        var spotFollowButtonDiv = await this.getSpotFollowButtonDiv(spot_id);
        var SpotLikeButtonDiv = await this.getSpotLikeButtonDiv(spot_id);

        spotPageDiv.appendChild(spotDetailDiv);
        spotPageDiv.appendChild(spotFollowButtonDiv);
        spotPageDiv.appendChild(SpotLikeButtonDiv);

        return spotPageDiv;
    }

    // RENDERERS
    async render(spot_id, target_div) {
        var target = document.getElementById(target_div);
        var div = await this.getSpotPageDiv(spot_id);
        target.appendChild(div);
    }
}