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

function postForm(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: data,
    }).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
}

function postClipForm() {
    let clipObj = {
        'textContent': document.getElementById('text-input').value,
        'spot': spot_id
    }

    let clipJson = JSON.stringify(clipObj);
    let url = 'http://127.0.0.1:8000/clips/api/clip-create/';

    postForm(url, clipJson);

}

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

    const submitButton = document.createElement('button');
    submitButton.id = 'submit-input';
    submitButton.setAttribute('class', 'btn btn-success');
    submitButton.innerHTML = 'Submit';
    submitButton.addEventListener('click', postClipForm)
    container.appendChild(submitButton);

    parent.appendChild(container);
}

renderClipForm('content');