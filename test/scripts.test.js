const fetch = require('node-fetch');
let chai = require('chai');
let expect = chai.expect;
chai.use(require('chai-like'));
chai.use(require('chai-things'));

class Endpoint {
    jsonHeaders = {
        'Content-Type': 'application/json',
    };

    async GET(url, headers = this.jsonHeaders) {
        let response
        try {
            response = await fetch(url, {method: "GET", headers: headers});
        } catch (e) {
            console.log(`error while sending GET request to ${url}: ${e}`);
        }
        let json = await response.json();

        return {response, json};
    }

    async POST(url, body, headers = this.jsonHeaders) {
        let response
        try {
            response = await fetch(url, {
                headers: headers, method: 'POST', body: JSON.stringify(body)
            });
        } catch (e) {
            console.log(`error while sending POST request to ${url}: ${e}`);
        }
        let json = await response.json();

        return {response, json};
    }

}

class Validator {
    statusCode(actual, expected) {
        expect(actual).to.equal(expected);
    }
}

suite('Tests for jsonplaceholder.typicode.com', function () {
    let endpoint = new Endpoint()
    let validator = new Validator()

    test('1.0. GET posts', async function () {
        let {response, json} = await endpoint.GET('https://jsonplaceholder.typicode.com/posts')

        validator.statusCode(response.status, 200);
    })
})