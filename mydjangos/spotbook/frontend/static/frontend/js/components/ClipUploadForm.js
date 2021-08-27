export default class ClipUploadForm {

    // GETTERS
    getClipUploadForm(spot_id) {
        var result = this.buildClipUploadForm(spot_id);
        return result;
    }

    get csrfCookie() {
        return this.getCookie('csrftoken');
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

    postForm(path, params, method='POST') {
        const form = document.createElement('form');
        form.method = method;
        form.action = path;

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const hiddenField = document.createElement('input');
                hiddenField.type = 'hidden';
                hiddenField.name = key;
                hiddenField.value = params[key];
          
                form.appendChild(hiddenField);
            }
        }

        //document.body.appendChild(form);
        console.log(form);
        //form.submit();

        return false;
    }

    processForm(event) {
        event.preventDefault();

        var myForm = document.getElementById('clip-upload-form');

        var postForm = document.createElement('form');
        postForm.method = myForm.getAttribute('method');
        postForm.action = myForm.getAttribute('action');

        var data = {
            "spot": myForm.spot.value,
            "textContent": myForm.text.value,
            "csrfmiddlewaretoken": myForm.csrfmiddlewaretoken.value,
        }

        for (var key in data) {
            var hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = key;
            hiddenInput.value = data[key];

            postForm.appendChild(hiddenInput);
        }

        console.log(postForm);
        document.body.appendChild(postForm);
        postForm.submit();

        location.reload();
    }

    // BUILDERS
    buildClipUploadForm(spot_id) {
        var div = document.createElement('div');
        div.id = 'clip-upload-form-div';

        var form = document.createElement('form');
        form.id = 'clip-upload-form';
        form.action = 'http://127.0.0.1:8000/clips/api/clip-create/';
        form.method = 'POST';
        form.addEventListener('submit', this.processForm);

        var spotInput = document.createElement('input');
        spotInput.id = 'spot-input';
        spotInput.type = 'hidden';
        spotInput.name = 'spot';
        spotInput.value = spot_id;

        var textInput = document.createElement('input');
        textInput.id = 'text-input';
        textInput.type = 'text';
        textInput.name = 'text';
        textInput.placeholder = 'text-content';

        var imageInput = document.createElement('input');
        imageInput.id = 'image-input';
        imageInput.name = 'image';
        imageInput.type = 'file';

        var csrfToken = document.createElement('input');
        csrfToken.name = 'csrfmiddlewaretoken';
        csrfToken.type = 'hidden';
        csrfToken.value = this.csrfCookie;

        var submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.value = 'OK';

        form.appendChild(spotInput);
        form.appendChild(textInput);
        form.appendChild(imageInput);
        form.appendChild(csrfToken);
        form.appendChild(submitButton);

        div.appendChild(form);

        return div;
    }

    // RENDERERS
    render(target_div, spot_id) {
        var target = document.getElementById(target_div);
        var div = this.getClipUploadForm(spot_id);
        target.appendChild(div);
    }

}