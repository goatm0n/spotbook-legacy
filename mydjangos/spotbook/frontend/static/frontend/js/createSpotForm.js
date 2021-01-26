function postForm(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data,
    }).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
}

function postSpotForm() {
    let titleForm = document.getElementById('title-form')
    let spotTypeForm = document.getElementById('spotType-form')
    let descriptionForm = document.getElementById('description-form')
    let latitudeForm = document.getElementById('latitude-form')
    let longitudeForm = document.getElementById('longitude-form')
    const myurl = 'http://127.0.0.1:8000/backend/api/spot-create/'

    let _data = `{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [
                ${longitudeForm.value},
                ${latitudeForm.value}
            ]
        },
        "properties": {
            "title": "${titleForm.value}",
            "spotType": "${spotTypeForm.value}",
            "description": "${descriptionForm.value}"
        }
    }`
    
    postForm(url=myurl, data=_data)

}