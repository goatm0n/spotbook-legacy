import SpotBadge from "./SpotBadge.js";
import ProfileBadge from "./ProfileBadge.js";
import ClipImage from "./ClipImage.js";
import ClipTextContent from "./ClipTextContent.js";
import ClipLikeButton from "./ClipLikeButton.js";
import ClipLikeCounter from "./ClipLikeCounter.js";

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
        let accountObj = await this.getAccountObj(clip_id);
        let username = accountObj.username;
        return username;
    }

    async getSpotBadge(clip_id) {
        let result = await this.buildSpotBadge(clip_id);
        return result;
    }

    async getProfileBadge(clip_id) {
        let result = await this.buildProfileBadge(clip_id);
        return result;
    }

    async getClipImage(clip_id) {
        var result = await this.buildClipImage(clip_id);
        return result;
    }

    async getClipTextContent(clip_id) {
        var result = await this.buildClipTextContent(clip_id);
        return result;
    }

    async getLikeButton(clip_id) {
        var result = await this.buildLikeButton(clip_id);
        return result;
    }

    async getLikeCounter(clip_id) {
        var result = await this.buildClipLikeCounter(clip_id);
        return result;
    }

    async getSpotClip(clip_id) {
        var result = await this.buildSpotClip(clip_id);
        return result;

    }


    // BUILDERS

    async buildSpotBadge(clip_id) {
        var spot_id = await this.getSpotId(clip_id);
        var spot_badge_obj = new SpotBadge();
        var spot_badge = await spot_badge_obj.getSpotBadge(spot_id);
        return spot_badge;
    }

    async buildProfileBadge(clip_id) {
        var username = await this.getUsername(clip_id);
        var profile_badge_obj = new ProfileBadge();
        var profile_badge = profile_badge_obj.getProfileBadge(username);
        
        return profile_badge;
    }

    async buildClipImage(clip_id) {
        let clip_image = new ClipImage();
        let result = await clip_image.getClipImage(clip_id);
        return result;
    }

    async buildClipTextContent(clip_id) {
        var clip_text_content = new ClipTextContent();
        var result = await clip_text_content.getClipTextContent(clip_id);
        return result;
    }

    async buildLikeButton(clip_id) {
        var like_button = new ClipLikeButton();
        var result = await like_button.getLikeButton(clip_id);
        return result;
    }

    async buildClipLikeCounter(clip_id) {
        var like_counter = new ClipLikeCounter();
        var result = await like_counter.getCounter(clip_id);
        return result;
    }

    // final build
    async buildSpotClip(clip_id) {
        const spotClipDiv = document.createElement('div');
        spotClipDiv.id = 'spot-clip-div';

        const mainContainer = document.createElement('div');
        mainContainer.id = 'main-container';
        mainContainer.setAttribute('class', 'container');

        var spotBadgeDiv = await this.getSpotBadge(clip_id);
        var profileBadgeDiv = await this.getProfileBadge(clip_id);
        var spotClipImage = await this.getClipImage(clip_id);
        var spotClipTextContent = await this.getClipTextContent(clip_id);
        var spotClipLikeButtonDiv = await this.getLikeButton(clip_id);
        var spotClipLikeCounterDiv = await this.getLikeCounter(clip_id);

        mainContainer.appendChild(spotBadgeDiv);
        mainContainer.appendChild(profileBadgeDiv);
        mainContainer.appendChild(spotClipImage);
        mainContainer.appendChild(spotClipTextContent);
        mainContainer.appendChild(spotClipLikeButtonDiv);
        mainContainer.appendChild(spotClipLikeCounterDiv);

        spotClipDiv.appendChild(mainContainer);
        

        return spotClipDiv;
    }

    // RENDERERS
    async render(clip_id, target_div) {
        const target = document.getElementById(target_div);
        var div = await this.getSpotClip(clip_id);
        target.appendChild(div);
    }

}