class CLipTextContent {
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

    async getTextContent() {
        let obj = await this.getClipObj();
        let result = obj.textContent;
        return result;
    }

    async getClipTextContent() {
        let result = await this.buildClipTextContent();
        return result;
    }

    // BUILDERS

    async buildClipTextContent() {
        const clipTextContentDiv = document.createElement('div');
        clipTextContentDiv.id = 'clip-text-content-div';

        const mainContainer = document.createElement('div');
        mainContainer.id = 'main-container';
        mainContainer.setAttribute('class', 'container');

        var clipTextContent = document.createElement('p');
        clipTextContent.id = 'clip-text-content';
        clipTextContent.textContent = await this.getTextContent();

        mainContainer.appendChild(clipTextContent);
        clipTextContentDiv.appendChild(mainContainer);

        return clipTextContentDiv;
    }
}