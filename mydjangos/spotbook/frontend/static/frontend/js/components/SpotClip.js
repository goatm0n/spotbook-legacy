class SpotClip {
    constructor(clip_id) {
        this.clip_id = clip_id;
        // imported comoponents must be included in script tag of html doc before SpotClip
        this.clip_like_button = new ClipLikeButton(clip_id=this.clip_id);
        this.clip_like_counter = new ClipLikeCounter(clip_id=this.clip_id);
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

    // GETTERS

    async getClipObj() {
        return await this.fetchClipObj();
    }

    async spotClip() {
        var mySpotClip = await this.buildSpotClip();
        return mySpotClip;
    }


    // BUILDERS
    
    async buildLikeButton() {
        var myButton = await this.clip_like_button.button();     
        return myButton
    }

    async buildLikeCounter() {
        var myCounter = await this.clip_like_counter.counter();
        return myCounter;
    }

    // final build
    async buildSpotClip() {
        const spotClipDiv = document.createElement('div');
        spotClipDiv.id = 'spot-clip-div';

        const mainContainer = document.createElement('div');
        mainContainer.id = 'main-container';
        mainContainer.setAttribute('class', 'container');

        const spotClipLikeButtonDiv = await this.buildLikeButton();

        const spotClipLikeCounterDiv = await this.buildLikeCounter();

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
        var result = await this.buildLikeButton();
        console.log(result);
    }

}