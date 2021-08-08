class SpotClip {
    /* 
        MUST INCLUDE COMPONENTS IN HTML
        CSS
        {% load static %}
        <link rel="stylesheet" href="{% static 'frontend/css/components/SpotClip.css' %}">
        {% load static %}
        <link rel="stylesheet" href="{% static 'frontend/css/components/ProfileBadge.css' %}">
        {% load static %}
        <link rel="stylesheet" href="{% static 'frontend/css/components/ClipImage.css' %}">

        JS
        {% load static  %}
        <script src="{% static 'frontend/js/components/ProfileBadge.js' %}"></script>
        {% load static  %}
        <script src="{% static 'frontend/js/components/SpotBadge.js' %}"></script>
        {% load static  %}
        <script src="{% static 'frontend/js/components/ClipImage.js' %}"></script>
        {% load static  %}
        <script src="{% static 'frontend/js/components/ClipTextContent.js' %}"></script>
        {% load static  %}
        <script src="{% static 'frontend/js/components/ClipLikeButton.js' %}"></script>
        {% load static  %}
        <script src="{% static 'frontend/js/components/ClipLikeCounter.js' %}"></script>
        {% load static  %}
        <script src="{% static 'frontend/js/components/SpotClip.js' %}"></script>
    */
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

    async getSpotId() {
        let clipObj = await this.getClipObj();
        let spotId = clipObj.spot;
        return spotId;
    }

    async getUsername() {
        let accountObj = await this.getAccountobj();
        let username = accountObj.username;
        return username;
    }

    async getSpotBadge() {
        let result = await this.buildSpotBadge();
        return result;
    }

    async getClipImage() {
        var result = await this.buildClipImage();
        return result;
    }

    async getClipTextContent() {
        var result = await this.buildClipTextContent();
        return result;
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

    async buildSpotBadge() {
        var spot_id = await this.getSpotId();
        var spot_badge_obj = new SpotBadge(spot_id=spot_id);
        var spot_badge = spot_badge_obj.getSpotBadge();
        return spot_badge;
    }

    async buildClipImage() {
        let clip_image = new ClipImage(clip_id=this.clip_id);
        let result = await clip_image.getClipImage();
        return result;
    }

    async buildClipTextContent() {
        let clip_text_content = new CLipTextContent(clip_id=this.clip_id);
        let result = await clip_text_content.getClipTextContent();
        return result;
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

        const spotBadgeDiv = await this.getSpotBadge();

        const spotClipImage = await this.getClipImage();

        const spotClipTextContent = await this.getClipTextContent();

        const spotClipLikeButtonDiv = await this.buildLikeButton();

        const spotClipLikeCounterDiv = await this.buildLikeCounter();

        mainContainer.appendChild(profileBadgeDiv);
        mainContainer.appendChild(spotBadgeDiv);
        mainContainer.appendChild(spotClipImage);
        mainContainer.appendChild(spotClipTextContent);
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
        this.getSpotBadge();
    }

}