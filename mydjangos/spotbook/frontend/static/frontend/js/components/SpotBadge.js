export default class SpotBadge {

    // FETCHERS

    async fetchSpotDetail(spot_id) {
        let url = `http://127.0.0.1:8000/spots/api/spot-detail/${spot_id}`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async fetchUserDetail(spot_id) {
        let user_id = await this.getUserId(spot_id);
        let url = `http://127.0.0.1:8000/accounts/api/account-detail/${user_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // GETTERS

    async getSpotObj(spot_id) {
        let result = await this.fetchSpotDetail(spot_id);
        return result;    
    }

    async getUserId(spot_id) {
        let spotObj = await this.getSpotObj(spot_id);
        let userId = spotObj.properties.user;
        return userId;
    }

    async getUserObj(spot_id) {
        let result = await this.fetchUserDetail(spot_id);
        return result;
    }

    async getSpotTitle(spot_id) {
        let obj = await this.getSpotObj(spot_id);
        let result = obj.properties.title;
        return result;
    }

    async getUsername(spot_id) {
        let userObj = await this.getUserObj(spot_id);
        let username = userObj.username;
        return username;
    }

    async getTitleDiv(spot_id) {
        let result = await this.buildTitle(spot_id);
        return result;
    }

    async getSpotBadge(spot_id) {
        let result = await this.buildSpotBadge(spot_id);
        return result;
    }



    // BUILDERS

    async buildTitle(spot_id) {
        var titleDiv = document.createElement('div');
        titleDiv.id = 'spot-title-div';

        const titleLink = document.createElement('a');
        titleLink.id = 'title-link';
        titleLink.setAttribute('href', `http://127.0.0.1:8000/spotbook/spotpage/${spot_id}/`);
        titleLink.textContent = await this.getSpotTitle(spot_id);

        titleDiv.appendChild(titleLink);

        return titleDiv;
    }

    async buildSpotBadge(spot_id) {
        var spotBadgeDiv = document.createElement('div');
        spotBadgeDiv.id = 'spot-badge-div';

        var spotTitleDiv = await this.getTitleDiv(spot_id);

        spotBadgeDiv.appendChild(spotTitleDiv);

        return spotBadgeDiv;
    }

    // TESTS

    async test(spot_id) {
        this.getSpotBadge(spot_id);
    }
}