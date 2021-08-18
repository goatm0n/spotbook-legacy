export default class ClipTextContent {
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

    async getTextContent(clip_id) {
        let obj = await this.getClipObj(clip_id);
        let result = obj.textContent;
        return result;
    }

    async getClipTextContent(clip_id) {
        let result = await this.buildClipTextContent(clip_id);
        return result;
    }

    // BUILDERS

    async buildClipTextContent(clip_id) {
        const clipTextContentDiv = document.createElement('div');
        clipTextContentDiv.id = 'clip-text-content-div';

        var clipTextContent = document.createElement('p');
        clipTextContent.id = 'clip-text-content';
        clipTextContent.textContent = await this.getTextContent(clip_id);

        clipTextContentDiv.appendChild(clipTextContent);

        return clipTextContentDiv;
    }
}