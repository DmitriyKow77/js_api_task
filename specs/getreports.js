
const expect = require("chai").expect;
const envData = require('../resource/datafile/endPoints.json');
const testingData = require('../resource/datafile/testData.json');
const {Get_data, Delete_data, POST_data, Send_request} = require("../apiModules/analiseApp/Get_data");


describe('Get Reports', function() {
this.timeout(30000);
let testData = {
    method: "get",
    apiUrl: envData.BaseURL + envData.endPoints.exerciseAPI
}

    describe('Basic Shakedown Test', function() {

        it('Verify API is responsive', async function() {
            currentResponse = await Send_request(testData);

            expect(currentResponse.status).to.equal(200, `Body error is: "${currentResponse.data}"`);
            
            currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));
            expect(currentResponseBody).to.be.an('object');
            expect(currentResponseBody).to.have.length.above(0);
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

       it('Verify POST method of test endpoint' , async function() {
           testData.body = {"main_key": "Dmitriy", "value": 33};
           currentResponse = await POST_data(testData);
           currentResponseBody = JSON.parse(JSON.stringify(currentResponse.data));

           expect(currentResponse.status).to.equal(200, `Body error is: "${currentResponseBody}"`);
           expect(currentResponseBody.main_key).to.equal(testData.body.main_key);
           expect(currentResponseBody.value).to.equal(testData.body.value);
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