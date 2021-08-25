export default class ClipForm {
    

    // GETTERS
    get csrfCookie() {
        return this.getCookie('csrftoken');
    }

    getClipForm(spot_id) {
        var result = this.buildClipForm(spot_id);
        return result;
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
        let form = document.getElementById('clip-form');
        let spot = form.spot.value;
        let textContent = form.textContent.value;
        var image = document.getElementById('image-input').files[0].name;
        console.log(image);
        let url = form.getAttribute('action');
        let dataObj = {
            'spot': spot,
            'textContent': textContent,
            'image': image,
        };
        let data = JSON.stringify(dataObj);
        console.log(data);
        let cookie = form.csrfmiddlewaretoken.value;

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'X-CSRFToken': cookie,
                'enctype': 'multipart/form-data'
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
    buildClipForm(spot_id) {
        var div = document.createElement('div');
        div.id = 'clip-form-div';

        var form = document.createElement('form');
        form.id = 'clip-form';
        form.action = 'http://127.0.0.1:8000/clips/api/clip-create/';
        form.method = 'POST';
        form.enctype = 'multipart/form-data';
        form.addEventListener('submit', this.processForm);

        // spot
        var spotInput = document.createElement('input');
        spotInput.id = 'spot-input';
        spotInput.name = 'spot';
        spotInput.type = 'text';
        spotInput.placeholder = 'spot';
        if (spot_id != '') {
            spotInput.value = spot_id;
            spotInput.type = 'hidden';
        }

        // text content
        var textInput = document.createElement('input');
        textInput.id = 'text-input';
        textInput.type = 'text';
        textInput.name = 'textContent'
        textInput.placeholder = 'textContent';

        // image 
        var imageInput = document.createElement('input');
        imageInput.id = 'image-input';
        imageInput.name = 'image';
        imageInput.type = 'file';

        // csrf token
        var csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrfmiddlewaretoken';
        csrfInput.value = this.csrfCookie;

        // submit
        var submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.value = 'OK';
        
        form.appendChild(spotInput);
        form.appendChild(textInput);
        form.appendChild(imageInput);
        form.appendChild(csrfInput);
        form.appendChild(submitButton);

        div.appendChild(form);

        return div;
    }
}