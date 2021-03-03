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
        if (response.status == 201) {
            alert('account created succesfully')
        }
        if (response.status != 201) {
            alert('error creating account')
        }
    }).catch(err => {
        console.log(err)
    })
}

function postAccountForm() {
    let accountObj = {
        'email': document.getElementById('email-input').value,
        'username': document.getElementById('username-input').value,
        'password': document.getElementById('password-input').value
    }

    let accountJson = JSON.stringify(accountObj);
    let url = 'http://127.0.0.1:8000/accounts/api/account-create/';
    postForm(url, accountJson);
}