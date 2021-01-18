async function getAccounts() {
    let url = 'http://127.0.0.1:8000/accounts/api/account-list/'
    try {
        let response = await(fetch(url));
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function login() {
    const usernameForm = document.getElementById('username-form')
    const username = usernameForm.value
    const emailForm = document.getElementById('email-form')
    const email = emailForm.value
    console.log(username)
    console.log(email)

    let accounts = await getAccounts();
    console.log(accounts)


}
