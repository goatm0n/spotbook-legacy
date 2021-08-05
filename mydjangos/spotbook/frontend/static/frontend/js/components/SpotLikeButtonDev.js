class SpotLikeButton {
    constructor(targetDiv, spot_id) {
        this.targetDiv = targetDiv;
        this.spot_id = spot_id;
    }

    // check if user likes spot
    async fetchDoesUserLikeSpot() {
        let url = `http://127.0.0.1:8000/spots/api/does-user-like/${this.spot_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // getter
    async doesUserLikeSpot() {
        var result = await this.fetchDoesUserLikeSpot();
        return result.data;
    }

    // getter 
    get csrfCookie() {
        return this.getCookie('csrftoken');
    }

    //method
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

    // getter
    async button() {
        var likes = await this.doesUserLikeSpot();
        if (likes) {
            return this.buildButton('unlike');
        } else {
            return this.buildButton('like');
        }  
    }

    //method
    buildButton(action) {
        const csrftoken = this.csrfCookie;

        const buttonDiv = document.createElement('div');
        buttonDiv.id = 'follow-button-div';

        const form = document.createElement('form');
        form.action = `http://127.0.0.1:8000/spots/api/spot-like-action/${this.spot_id}/`;
        form.method = 'POST';
        form.headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
        }

        const button = document.createElement('button');
        button.id = 'profile-follow-button';
        button.type = 'submit';
        button.setAttribute('class', 'btn btn-secondary');
        button.textContent = action;

        const formAction = document.createElement('input');
        formAction.type = 'hidden';
        formAction.name = 'action';
        formAction.value = action;

        const inputElem = document.createElement('input');
        inputElem.type = 'hidden';
        inputElem.name = 'csrfmiddlewaretoken';
        inputElem.value = csrftoken;

        form.appendChild(button);
        form.appendChild(formAction);
        form.appendChild(inputElem);
        buttonDiv.appendChild(form);


        return buttonDiv;
    }

    async renderButton() {
        const likeButton = await this.button();
        const target = document.getElementById(this.targetDiv);
        target.appendChild(likeButton);
    }
}