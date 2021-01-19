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
    } else if (validAccount == false) {
        console.log('account details not validated')
    }

};


function createAccount() {

    const emailForm = document.getElementById('email-form');
    const usernameForm = document.getElementById('username-form');
    const email = emailForm.value;
    const username = usernameForm.value;
    console.log(username);
    console.log(email);

    validateAccount(username, email)

};
