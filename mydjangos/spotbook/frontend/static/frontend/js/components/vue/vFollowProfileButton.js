/* function sendRequest(url, method, data) {
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
} */

Vue.component('follow-profile-button', {
    data: function () {
        return {
            message: 'hello',
            follows: false,
            

        }
    },
    methods: {
        
    },
    template: '<button v-on:click="sendRequest">{{ message }}</button>',
})