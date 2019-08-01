'use strict';

class Controller {

    constructor(request, response) {

        this.request = request;
        this.response = response;

        this.requestBody = {};

        this.model = null;
        
        this.setRequestBody();
    }

    setRequestBody() {

        this.requestBody = this.request.body;
    }
}

module.exports = Controller;
