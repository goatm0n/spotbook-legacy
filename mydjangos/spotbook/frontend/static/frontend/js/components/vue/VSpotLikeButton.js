function sendRequest(url, method, data) {
    var r = axios({
        method: method,
        url: url,
        data: data,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
    return r
}

Vue.component('spot-like-button', {
    template: '<h2>are u working</h2>',
})

var app = new Vue({
    el: '#spot-like-button',
    delimiters: ['[[', ']]'],
    data: {
        message: 'Hello Spot Like Button!',
    },
})