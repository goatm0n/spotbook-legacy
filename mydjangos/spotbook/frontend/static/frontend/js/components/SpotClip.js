class SpotClip {
    constructor(targetDiv, clip_id) {
        this.targetDiv = targetDiv;
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

    spotClip() {
        return this.buildSpotClip();
    }


    //method
    buildSpotClip() {
        const spotClipDiv = document.createElement('div');
        spotClipDiv.id = 'spot-clip-div';
        
        const likeButtonDiv = document.createElement('div');
        likeButtonDiv.id = 'like-buttton';
        // call like button component

        spotClipDiv.appendChild(likeButtonDiv);

        return spotClipDiv;
    }

    render() {
        let spotclip = this.spotClip();
        const target = document.getElementById(this.targetDiv);
        target.appendChild(spotclip);
    }



    // test method
    test() {
        console.log(this.fetchClipObj());
    }

}