const {Request} = require ('../../common/baseRequest.js');

const Send_request = testData =>
    new Promise( (resolve, reject) => {

        const options = {
            method: testData.method,
            url: testData.apiUrl,
            body: testData.body,
            resolveWithFullResponse: true
        };

        Request(options)
        .then(function (response) {
            resolve(response);
        })
        .catch(function (err) {
            reject(err);
            console.log("Error Inside GET request: " + err);
        });
    });

module.exports = {Send_request};