async function getSpotDetail() {
    let url = `http://127.0.0.1:8000/spots/api/spot-detail/${spot_id}`;
    try {
        let response = await(fetch(url));
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function showSpotDetail() {
    let spot = await getSpotDetail();
    console.log(spot);
}

showSpotDetail();