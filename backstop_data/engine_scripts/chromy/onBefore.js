var errorHelper = require('./utils/error-helper');
var uuidv4 = require('uuid/v4');
var moment = require('moment');
module.exports = function (chromy, scenario, vp, isReference, chromyStatic) {
    // require('./loadCookies')(chromy, scenario);

    chromy.on('Runtime.exceptionThrown', (params) => {
        errorHelper.push(
            {
                "id": uuidv4(),
                "url": scenario.url,
                "testName": `${scenario.label}-${vp.label}`,
                "vp": vp.label,
                "errorMsg": params.exceptionDetails.exception.description,
                "date": moment().format("YYYY-MM-DD:HH-mm-ss"),
                "status": true
            })
    })
    chromy.on('Network.responseReceived', (params) => {
        if (params.response.status != 200) {
            errorHelper.push(
                {
                    "id": uuidv4(),
                    "url": scenario.url,
                    "testName": `Network-${scenario.label}-${vp.label}`,
                    "vp": vp.label,
                    "errorMsg": `[${params.response.status}] ${params.response.url}`,
                    "date": moment().format("YYYY-MM-DD:HH-mm-ss"),
                    "status": true
                })
        }

    })
};