function postClipForm() {
    console.log(spot_id)

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