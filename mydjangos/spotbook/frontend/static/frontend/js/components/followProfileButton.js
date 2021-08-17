export default class FollowProfileButton {

    // FETCHERS

    // check if user follows target
    async fetchDoesUserFollowTarget(username) {
        let url = `http://127.0.0.1:8000/profiles/api/does-user-follow/${username}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // GETTERS

    // getter
    async doesUserFollowTarget(username) {
        var result = await this.fetchDoesUserFollowTarget(username);
        return result.data;
    }

    // getter 
    get csrfCookie() {
        return this.getCookie('csrftoken');
    }

    // getter
    async button(username) {
        var follows = await this.doesUserFollowTarget(username);
        if (follows) {
            return this.buildButton('unfollow', username);
        } else {
            return this.buildButton('follow', username);
        }  
    }

    // METHODS

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
    
    processFollowForm(event) {
        event.preventDefault();
        let form = document.getElementById('profile-follow-button-form');
        let action = form.action.value;
        let url = form.getAttribute('action');
        let dataObj = {"action": action};
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

    buildButton(action, username) {
        const csrftoken = this.csrfCookie;

        const buttonDiv = document.createElement('div');
        buttonDiv.id = 'follow-button-div';

        const form = document.createElement('form');
        form.id = 'profile-follow-button-form';
        form.action = `http://127.0.0.1:8000/profiles/api/${username}/follow`;
        form.method = 'POST';
        form.headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
        }
        form.addEventListener('submit', this.processFollowForm);

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

    // RENDERERS
    
    async renderButton() {
        const followButton = await this.button();
        const target = document.getElementById(this.targetDiv);
        target.appendChild(followButton);
    }


}