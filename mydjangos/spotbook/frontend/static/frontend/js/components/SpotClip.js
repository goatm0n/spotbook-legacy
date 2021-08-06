class SpotClip {
    constructor(clip_id) {
        this.clip_id = clip_id;
    }

    // fetches
    async fetchClipObj() {
        let url = `http://127.0.0.1:8000/clips/api/clip-detail/${this.clip_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // getter
    async getClipObj() {
        return await this.fetchClipObj();
    }

    async buildLikeButton() {
        var myLikeButtonObj = new ClipLikeButton(clip_id=this.clip_id);
        var myButton = await myLikeButtonObj.button();
        return myButton
    }

    async spotClip() {
        var mySpotClip = await this.buildSpotClip();
        return mySpotClip;
    }


    //method
    async buildSpotClip() {
        const spotClipDiv = document.createElement('div');
        spotClipDiv.id = 'spot-clip-div';

        const spotClipLikeButtonDiv = await this.buildLikeButton();

        spotClipDiv.appendChild(spotClipLikeButtonDiv);
        

        return spotClipDiv;
    }

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