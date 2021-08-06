class ClipLikeCounter {
    constructor(clip_id) {
        this.clip_id = clip_id;
    }

    // FETCHERS
    // fetch clip likes count
    async fetchClipLikesCount() {
        let url = `http://127.0.0.1:8000/clips/api/likes-count/${this.clip_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // METHODS
    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    async test() {
        let result = await this.counter();
        console.log(result);

    }

    // GETTERS
    get csrfCookie() {
            return this.getCookie('csrftoken');
        }
    
    async getClipLikeCount() {
        var result = await this.fetchClipLikesCount();
        return result.count;
    }

    async counter() {
        let count = await this.getClipLikeCount();
        var counterElem = this.buildCounter(count=count);
        return counterElem;
    }

    // BUILDERS
    buildCounter(count) {
        const likeCounterDiv = document.createElement('div');
        likeCounterDiv.id = 'like-counter-div';

        var likeCounterP = document.createElement('p');
        likeCounterP.textContent = `${count} likes`;

        likeCounterDiv.appendChild(likeCounterP);

        return likeCounterDiv;
    }

    // RENDERERS
    async render(target_div) {
        var renderObj = await this.counter();
        const target = document.getElementById(target_div);
        target.appendChild(renderObj);
    }
    
}