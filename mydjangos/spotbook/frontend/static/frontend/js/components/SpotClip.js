class SpotClip {
    // imported comoponents must be included in script tag of html doc before SpotClip
    constructor(clip_id) {
        this.clip_id = clip_id;
    }

    // FETCHERS

    async fetchClipObj() {
        let url = `http://127.0.0.1:8000/clips/api/clip-detail/${this.clip_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async fetchAccountObj() {
        let clipObj = await this.getClipObj();
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

    async getClipObj() {
        return await this.fetchClipObj();
    }

    async getAccountobj() {
        return await this.fetchAccountObj();
    }

    async getUsername() {
        let accountObj = await this.getAccountobj();
        let username = accountObj.username;
        return username;
    }

    async spotClip() {
        var mySpotClip = await this.buildSpotClip();
        return mySpotClip;
    }


    // BUILDERS

    async buildProfileBadge() {
        let username = await this.getUsername();
        let profile_badge = new ProfileBadge(username=username).getProfileBadge();
        
        return profile_badge;
    }
    
    async buildLikeButton() {
        let clip_like_button = new ClipLikeButton(clip_id=this.clip_id);
        var myButton = await clip_like_button.button();     
        return myButton;
    }

    async buildLikeCounter() {
        let clip_like_counter = new ClipLikeCounter(clip_id=this.clip_id);
        var myCounter = await clip_like_counter.counter();
        return myCounter;
    }

    // final build
    async buildSpotClip() {
        const spotClipDiv = document.createElement('div');
        spotClipDiv.id = 'spot-clip-div';

        const mainContainer = document.createElement('div');
        mainContainer.id = 'main-container';
        mainContainer.setAttribute('class', 'container');

        const profileBadgeDiv = await this.buildProfileBadge();

        const spotClipLikeButtonDiv = await this.buildLikeButton();

        const spotClipLikeCounterDiv = await this.buildLikeCounter();

        mainContainer.appendChild(profileBadgeDiv);
        mainContainer.appendChild(spotClipLikeButtonDiv);
        mainContainer.appendChild(spotClipLikeCounterDiv);

        spotClipDiv.appendChild(mainContainer);
        

        return spotClipDiv;
    }

    // RENDERERS
    async render(target_div) {
        var spotClipToRender = await this.spotClip();
        const target = document.getElementById(target_div);
        target.appendChild(spotClipToRender);
    }


    // test method
    async test() {
        this.getUsername();
    }

}