export default class ClipLikeCounter {
    // FETCHERS
    async fetchClipLikesCount(clip_id) {
        let url = `http://127.0.0.1:8000/clips/api/likes-count/${clip_id}/`;
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

    // GETTERS
    get csrfCookie() {
            return this.getCookie('csrftoken');
        }
    
    async getClipLikeCount(clip_id) {
        var result = await this.fetchClipLikesCount(clip_id);
        return result.count;
    }

    async getCounter(clip_id) {
        let count = await this.getClipLikeCount(clip_id);
        var counterElem = this.buildCounter(count);
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
    
}