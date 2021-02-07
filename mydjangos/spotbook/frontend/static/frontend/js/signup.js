async function getAccounts() {
    let url = 'http://127.0.0.1:8000/accounts/api/account-list/'
    try {
        let response = await(fetch(url));
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function validateAccount(username, email) {
    let accounts = await getAccounts();
    var validEmail = true;
    var validUsername = true;
    var validAccount = true;

    accounts.forEach(account => {
        if (account.email == email) {
            console.log('email already exists');
            validEmail = false;
        };
    });

    accounts.forEach(account => {
        if (account.username == username) {
            console.log('username already exists');
            validUsername = false;
        };
    });

    if (validEmail == true && validUsername == true) {
        validAccount = true;
    } else if (validEmail == false) {
        validAccount = false
    } else if (validUsername == false) {
        validAccount = false
    }

    if (validAccount == true) {
        console.log('account details validated')
        return true
    } else if (validAccount == false) {
        console.log('account details not validated')
        return false
    }

};

function postAccountForm(email, username) {
    let _data = {
        email: `${email}`,
        username: `${username}`,
        date_joined: "2021-01-18T12:24:20.564611Z",
        last_login: "2021-01-18T12:24:20.564611Z",
        is_admin: false,
        is_active: true,
        is_staff: false,
        is_superuser: false,
        csrfmiddlewaretoken: '{{ csrf_token }}'
    }

    fetch('http://127.0.0.1:8000/accounts/api/account-create/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(_data)
    }).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
}


async function createAccount() {

    const emailForm = document.getElementById('email-form');
    const usernameForm = document.getElementById('username-form');
    const email = emailForm.value;
    const username = usernameForm.value;
    console.log(username);
    console.log(email);

    let valid =  await validateAccount(username, email)
    if (valid == true) {
        postAccountForm(email, username)
    }

};

