
const expect = require("chai").expect;
const envData = require('../resource/datafile/endPoints.json');
const {Send_request} = require("../apiModules/analiseApp/Get_data");


describe('Get Reports', function() {
this.timeout(30000);
let testData = {
    method: "get",
    apiUrl: envData.BaseURL + envData.endPoints.exerciseAPI
}

    describe('Basic Sanity Test', function() {

        it('Verify GET method of test endpoint', async function() {
            currentResponse = await Send_request(testData);

            expect(currentResponse.status).to.equal(200, `Body error is: "${currentResponse.data}"`);
            
            currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));
            expect(currentResponseBody).to.have.length.above(0);

            let fistResult = currentResponseBody[0];
            expect(fistResult).to.be.an('object');
            expect(fistResult).to.have.property("main_key").to.be.a('string');
            expect(fistResult).to.have.property("value").to.be.a('string').to.match(/\d+/);
        });
    });

   describe('Functional Tests', function() {
       it('Verify PUT method of test endpoint' , async function() {
           testData.method = "put";
           testData.body = {"main_key": "Dmitriy", "value": 7};

           currentResponse = await Send_request(testData);
           currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));

           expect(currentResponse.status).to.equal(200, `Body error is: "${currentResponseBody}"`);
           expect(currentResponseBody.main_key).to.equal(testData.body.main_key);
           expect(currentResponseBody.value).to.equal(testData.body.value);
       });

       it('PUT request negative test for missing key' , async function() {
           testData.method = "put";
           testData.body = {"value": 7};

           currentResponse = await Send_request(testData);
           currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));

           expect(currentResponse.status).to.equal(400, `Body error is: "${currentResponseBody}"`);
       });

       it('PUT request negative test for missing value' , async function() {
           testData.method = "put";
           testData.body = {"main_key": "Dmitriy"};

           currentResponse = await Send_request(testData);
           currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));

           expect(currentResponse.status).to.equal(400, `Body error is: "${currentResponseBody}"`);
       });


       it('PUT request negative test for empty body' , async function() {
           testData.method = "put";
           testData.body = {};

           currentResponse = await Send_request(testData);
           currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));

           expect(currentResponse.status).to.equal(400, `Body error is: "${currentResponseBody}"`);
       });

       it('Verify POST method of test endpoint' , async function() {
           testData.method = "post";
           testData.body = {"main_key": "Dmitriy", "value": 33};
           currentResponse = await Send_request(testData);
           currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));

           expect(currentResponse.status).to.equal(200, `Body error is: "${currentResponseBody}"`);
           expect(currentResponseBody.main_key).to.equal(testData.body.main_key);
           expect(currentResponseBody.value).to.equal(testData.body.value);
       });

       it('POST request negative test for missing key' , async function() {
           testData.method = "post";
           testData.body = {"main_key": "", "value": 33};
           currentResponse = await Send_request(testData);
           currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));

           expect(currentResponse.status).to.equal(400, `Body error is: "${currentResponseBody}"`);
       });

       it('POST request negative test for missing value' , async function() {
           testData.method = "post";
           testData.body = {"main_key": "Dmitriy"};
           currentResponse = await Send_request(testData);
           currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));

           expect(currentResponse.status).to.equal(400, `Body error is: "${currentResponseBody}"`);
       });

       it('POST request negative test for empty value' , async function() {
           testData.method = "post";
           testData.body = {};
           currentResponse = await Send_request(testData);
           currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));

           expect(currentResponse.status).to.equal(400, `Body error is: "${currentResponseBody}"`);
       });

       it('Verify DELETE method of test endpoint with existing data' , async function() {
           testData.method = "delete";
           testData.body = {"main_key": "Dmitriy"};
           currentResponse = await Send_request(testData);
           currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));

           expect(currentResponse.status).to.equal(200, `Body error is: "${currentResponseBody}"`);
           expect(currentResponseBody.main_key).to.equal(testData.body.main_key);
           expect(currentResponseBody.value).to.equal(testData.body.value);
       });

       it('Verify DELETE method of test endpoint with NOT valid data' , async function() {
           testData.method = "delete";
           testData.body = {"main_key": "Not_existing"};
           currentResponse = await Send_request(testData);

           currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));
           expect(currentResponse.status).to.equal(400, `Body is: "${JSON.stringify(currentResponseBody)}", but expected to get error code`);
       });

       it('Verify calling Non Existent endpoint' , async function() {
           testData.apiUrl = testData.apiUrl + "_non_existing";

           currentResponse = await Send_request(testData);
           expect(currentResponse.status).to.equal(404, `Expected to get 404 error for not eixisting url ${testData.apiUrl}`);
       });
   });
});