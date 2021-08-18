export default class ClipImage {
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

    // GETTERS

    async getClipObj(clip_id) {
        return await this.fetchClipObj(clip_id);
    }

    async getClipImageSrc(clip_id) {
        let obj = await this.getClipObj(clip_id);
        let result = obj.image;
        return result;
    }

    async getClipImage(clip_id) {
        let result = await this.buildClipImage(clip_id);
        return result;
    }

    // BUILDERS

    async buildClipImage(clip_id) {
        const clipImageDiv = document.createElement('div');
        clipImageDiv.id='clip-image-div';

        var clipImageElem = document.createElement('img');
        clipImageElem.id = 'clip-image';
        clipImageElem.src = await this.getClipImageSrc(clip_id);

        clipImageDiv.appendChild(clipImageElem);

        return clipImageDiv;
    }

    // TESTS

    async test(clip_id) {
        let result = await this.getClipImage(clip_id);
        console.log(result);
    }
}