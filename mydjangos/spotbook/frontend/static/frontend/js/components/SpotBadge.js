class SpotBadge {
    constructor(spot_id) {
        this.spot_id = spot_id;
    }

    // FETCHERS

    async fetchSpotDetail() {
        let url = `http://127.0.0.1:8000/spots/api/spot-detail/${this.spot_id}`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async fetchUserDetail() {
        let user_id = await this.getUserId();
        let url = `http://127.0.0.1:8000/accounts/api/account-detail/${user_id}/`;
        try {
            let response = await(fetch(url));
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // GETTERS

    async getSpotObj() {
        let result = await this.fetchSpotDetail();
        return result;    
    }

    async getUserId() {
        let spotObj = await this.getSpotObj();
        let userId = spotObj.properties.user;
        return userId;
    }

    async getUserObj() {
        let result = await this.fetchUserDetail();
        return result;
    }

    async getSpotTitle() {
        let obj = await this.getSpotObj();
        let result = obj.properties.title;
        return result;
    }

    async getUsername() {
        let userObj = await this.getUserObj();
        let username = userObj.username;
        return username;
    }

    async getTitleDiv() {
        let result = await this.buildTitle();
        return result;
    }

    async getSpotBadge() {
        let result = await this.buildSpotBadge();
        return result;
    }



    // BUILDERS

    async buildTitle() {
        var titleDiv = document.createElement('div');
        titleDiv.id = 'spot-title-div';

        const titleLink = document.createElement('a');
        titleLink.id = 'title-link';
        titleLink.setAttribute('href', `http://127.0.0.1:8000/spotbook/spotpage/${this.spot_id}/`);
        titleLink.textContent = await this.getSpotTitle();

        titleDiv.appendChild(titleLink);

        return titleDiv;
    }

    async buildSpotBadge() {
        var spotBadgeDiv = document.createElement('div');
        spotBadgeDiv.id = 'spot-badge-div';

        var spotTitleDiv = await this.getTitleDiv();

        spotBadgeDiv.appendChild(spotTitleDiv);

        return spotBadgeDiv;
    }

    // TESTS

    async test() {
        this.getSpotBadge();
    }
}