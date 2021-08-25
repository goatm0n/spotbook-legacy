export default class SpotDetail {
    // FETCHERS
    async fetchSpotDetail(spot_id) {
        let url = `http://127.0.0.1:8000/spots/api/spot-detail/${spot_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // GETTERS
    async getSpotDetail(spot_id) {
        var result = await this.fetchSpotDetail(spot_id);
        return result;
    }

    async getSpotTitle(spot_id) {
        var spot = await this.getSpotDetail(spot_id);
        var result = spot.properties.title;
        return result;
    }

    async getSpotType(spot_id) {
        var spot = await this.getSpotDetail(spot_id);
        var result = spot.properties.spotType;
        return result;
    }

    async getSpotDescription(spot_id) {
        var spot = await this.getSpotDetail(spot_id);
        var result = spot.properties.description;
        return result;
    }

    async getSpotDetailDiv(spot_id) {
        var div = await this.buildSpotDetail(spot_id);
        return div;
    }

    //  BUILDERS
    async buildSpotDetail(spot_id) {
        var spotDetailDiv = document.createElement('div');
        spotDetailDiv.id = 'spot-detail-div';

        var spotTitleDiv = document.createElement('div');
        spotTitleDiv.id = 'spot-title-div';
        var spotTitle = document.createElement('p');
        spotTitle.id = 'spot-title';
        spotTitle.textContent = await this.getSpotTitle(spot_id);
        spotTitleDiv.appendChild(spotTitle);

        var spotTypeDiv = document.createElement('div');
        spotTypeDiv.id = 'spot-type-div';
        var spotType = document.createElement('p');
        spotType.id = 'spot-type';
        spotType.textContent = await this.getSpotType(spot_id);
        spotTypeDiv.appendChild(spotType);

        var spotDescriptionDiv = document.createElement('div');
        spotDescriptionDiv.id = 'spot-description-div';
        var spotDescription = document.createElement('p');
        spotDescription.id = 'spot-description';
        spotDescription.textContent = await this.getSpotDescription(spot_id);
        spotDescriptionDiv.appendChild(spotDescription);


        spotDetailDiv.appendChild(spotTitleDiv);
        spotDetailDiv.appendChild(spotTypeDiv);
        spotDetailDiv.appendChild(spotDescriptionDiv);

        return spotDetailDiv;

    }

}
