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
/*
function renderClipForm(parentDiv) {
    const parent = document.getElementById(parentDiv);
    const container = document.createElement('div');
    container.id = 'clip-form-container';

    const textContent = document.createElement('input');
    textContent.type = 'text';
    textContent.id = 'text-input';
    textContent.name = 'text-input';
    textContent.placeholder = 'text-content'
    textContent.setAttribute('class', 'form-control');
    container.appendChild(textContent);

    const imageForm = document.createElement('form');
    imageForm.id = 'image-form';
    const image = document.createElement('input');
    image.id = 'image-input';
    image.name='image-input';
    image.type='file';
    imageForm.appendChild(image);
    const imageButton = document.createElement('button');
    imageButton.type = 'submit';
    imageButton.id = 'image-button';
    imageButton.innerHTML = 'Submit with image';
    imageButton.setAttribute('class', 'btn btn-success');
    imageForm.appendChild(imageButton);
    container.appendChild(imageForm);

    parent.appendChild(container);
}

renderClipForm('upload-spot-clip');
*/

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
    container.appendChild(clipForm);

    // spot
    const spotInput = document.createElement('input');
    spotInput.id = 'spot-input';
    spotInput.name = 'spot';
    spotInput.type = 'text';
    spotInput.placeholder = 'spot';
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
