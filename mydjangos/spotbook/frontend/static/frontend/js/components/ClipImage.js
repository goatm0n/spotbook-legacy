class ClipImage {
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

    // GETTERS

    async getClipObj() {
        return await this.fetchClipObj();
    }

    async getClipImageSrc() {
        let obj = await this.getClipObj();
        let result = obj.image;
        return result;
    }

    async getClipImage() {
        let result = await this.buildClipImage();
        return result;
    }

    // BUILDERS

    async buildClipImage() {
        const clipImageDiv = document.createElement('div');
        clipImageDiv.id='clip-image-div';

        const mainContainer = document.createElement('div');
        mainContainer.id = 'main-container';
        mainContainer.setAttribute('class', 'container');

        var clipImageElem = document.createElement('img');
        clipImageElem.id = 'clip-image';
        clipImageElem.src = await this.getClipImageSrc();

        mainContainer.appendChild(clipImageElem);
        clipImageDiv.appendChild(mainContainer);

        return clipImageDiv;
    }

    // TESTS

    async test() {
        let result = await this.getClipImage();
        console.log(result);
    }
}