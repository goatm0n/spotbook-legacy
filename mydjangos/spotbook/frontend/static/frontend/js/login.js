async function fetchAccounts() {
    let response = await fetch('http://127.0.0.1:8000/accounts/api/account-list/');
    let data = await response.text();
    console.log(data);
}

function login() {
    const usernameForm = document.getElementById('username-form')
    const username = usernameForm.value
    const emailForm = document.getElementById('email-form')
    const email = emailForm.value
    console.log(username)
    console.log(email)

    fetchAccounts()

}
