const axios = require('axios');
axios.default = false;

// this module uses axios binding (npm package)
const Request = (options) =>
    new Promise((resolve, reject) => {
        axios({
            method : options.method,
            baseURL: options.url,
            data: options.body,
            validateStatus: false
        })
        .then(function (response) {
            resolve(response);
        })
        .catch(function (error) {
            reject(error);
        });
    });

module.exports = {Request};    
