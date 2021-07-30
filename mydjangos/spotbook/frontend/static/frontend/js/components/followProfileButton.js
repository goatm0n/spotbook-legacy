class FollowProfileButton {
    constructor(targetDiv, targetUser, action) {
        this.targetDiv = targetDiv;
        this.targetUser = targetUser;
        this.action = action
    }

    // getter 
    get csrfCoookie() {
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
    get button() {
        return this.buildButton();
    }
    //method
    buildButton() {
        const csrftoken = this.csrfCoookie;

        const buttonDiv = document.createElement('div');
        buttonDiv.id = 'follow-button-div';

        const form = document.createElement('form');
        form.action = `http://127.0.0.1:8000/profiles/api/${this.targetUser.username}/follow`;
        form.method = 'POST';
        form.headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken
        }
        form.data = {'action': this.action};

        const button = document.createElement('button');
        button.id = 'profile-follow-button';
        button.type = 'submit';
        button.setAttribute('class', 'btn btn-secondary');
        button.textContent = this.action;

        form.appendChild(button);
        buttonDiv.appendChild(form)

        return buttonDiv;
    }

    renderButton() {
        const followButton = this.button;
        const target = document.getElementById(this.targetDiv);
        target.appendChild(followButton);
    }
}