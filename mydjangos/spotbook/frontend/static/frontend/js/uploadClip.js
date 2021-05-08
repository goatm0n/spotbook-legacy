function getCookie(name) {
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
const csrftoken = getCookie('csrftoken');

function renderClipForm(parentDiv){
    // create form container div
    const parent = document.getElementById(parentDiv);
    const container = document.createElement('div');
    container.id = 'clip-form-container';
    parent.appendChild(container);

    // create form
    const clipForm = document.createElement('form');
    clipForm.id = 'clip-form';
    clipForm.action = 'http://127.0.0.1:8000/clips/api/clip-create/';
    clipForm.method = 'POST';
    clipForm.enctype = 'multipart/form-data'
    container.appendChild(clipForm);

    // spot
    const spotInput = document.createElement('input');
    spotInput.id = 'spot-input';
    spotInput.name = 'spot';
    spotInput.type = 'text';
    spotInput.placeholder = 'spot';
    if (spot_id != '') {
        spotInput.value = spot_id;
        spotInput.type = 'hidden';
    }
    clipForm.appendChild(spotInput);

    // text content
    const textInput = document.createElement('input');
    textInput.id = 'text-input';
    textInput.type = 'text';
    textInput.name = 'textContent'
    textInput.placeholder = 'textContent';
    clipForm.appendChild(textInput);

    // image 
    const imageInput = document.createElement('input');
    imageInput.id = 'image-input';
    imageInput.name = 'image';
    imageInput.type = 'file';
    clipForm.append(imageInput);

    // csrf token
    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = csrftoken;
    clipForm.appendChild(csrfInput);

    // submit
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'OK';
    clipForm.appendChild(submitButton);

}

renderClipForm('upload-spot-clip');
