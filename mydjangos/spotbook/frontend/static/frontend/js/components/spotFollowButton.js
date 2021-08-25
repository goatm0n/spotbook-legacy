export default class SpotFollowButton {
    // FETCHERS
    // check if user follows spot
    async fetchDoesUserFollowSpot(spot_id) {
        let url = `http://127.0.0.1:8000/spots/api/does-user-follow/${spot_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // GETTERS

    async doesUserFollowSpot(spot_id) {
        var result = await this.fetchDoesUserFollowSpot(spot_id);
        return result.data;
    }

    // getter 
    get csrfCookie() {
        return this.getCookie('csrftoken');
    }
    // getter
    async button(spot_id) {
        var follows = await this.doesUserFollowSpot(spot_id);
        if (follows) {
            return this.buildButton(spot_id, 'unfollow');
        } else {
            return this.buildButton(spot_id, 'follow');
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

    processForm(event) {
        event.preventDefault();
        let form = document.getElementById('spot-follow-form');
        let action = form.action.value;
        let url = form.getAttribute('action');
        let dataObj = {'action': action};
        let data = JSON.stringify(dataObj);
        let cookie = form.csrfmiddlewaretoken.value;

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'X-CSRFToken': cookie
            },
            body: data,
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })

        location.reload();

        return false;
    }

    // BUILDERS

    buildButton(spot_id, action) {
        const csrftoken = this.csrfCookie;

        const buttonDiv = document.createElement('div');
        buttonDiv.id = 'follow-button-div';

        const form = document.createElement('form');
        form.id = 'spot-follow-form';
        form.action = `http://127.0.0.1:8000/spots/api/follow/${spot_id}/`;
        form.method = 'POST';
        form.headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
        }
        form.addEventListener('submit', this.processForm)

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

}