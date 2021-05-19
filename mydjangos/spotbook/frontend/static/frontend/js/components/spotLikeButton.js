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

function renderSpotLikeButton(div_id, spot) {
    const targetDiv = document.getElementById(div_id);
    
    const spotLikeForm = document.createElement('form');
    spotLikeForm.action = `http://127.0.0.1:8000/spots/api/spot-like/${spot.id}/`;
    spotLikeForm.method = 'POST';

    const spotLikeButton = document.createElement('button');
    spotLikeButton.id = 'spot-like-button';
    spotLikeButton.type = 'submit';
    spotLikeButton.setAttribute('class', 'btn btn-secondary');
    spotLikeButton.textContent = 'Like/ unlike';

    const csrfInput = document.createElement('input');
    const csrftoken = getCookie('csrftoken');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = csrftoken;
    spotLikeForm.appendChild(csrfInput);
    spotLikeForm.appendChild(spotLikeButton);
    
    targetDiv.appendChild(spotLikeForm);
}

function renderSpotLikeCounter(spot, div_id) {
    const targetDiv = document.getElementById(div_id);

    const spotLikeCounterContainer = document.createElement('div');
    spotLikeCounterContainer.id = 'spot-like-counter-container';
    spotLikeCounterContainer.setAttribute('class', 'container');
    const spotLikeCounter = document.createElement('p');
    spotLikeCounter.id ='spot-like-counter';
    spotLikeCounter.textContent = `${spot.likes.length}`;
    spotLikeCounterContainer.appendChild(spotLikeCounter);
    
    targetDiv.appendChild(spotLikeCounterContainer);

}

function spotLikeButton(spot ,div_id) {

    renderSpotLikeButton(div_id, spot);
    renderSpotLikeCounter(spot, div_id);
}

export {spotLikeButton};