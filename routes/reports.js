var express = require('express');
var router = express.Router();
var fs = require("fs"),
    json;
let mockJson = {
    "testSuite": "BackstopJS",
    "tests": [{
            "pair": {
                "reference": "..\\bitmaps_reference\\backstop_default_Homepage_0_document_0_phone.png",
                "test": "..\\bitmaps_test\\20170920-113959\\backstop_default_Homepage_0_document_0_phone.png",
                "selector": "document",
                "fileName": "backstop_default_Homepage_0_document_0_phone.png",
                "label": "Homepage",
                "misMatchThreshold": 0.1,
                "diff": {
                    "isSameDimensions": true,
                    "dimensionDifference": {
                        "width": 0,
                        "height": 0
                    },
                    "misMatchPercentage": "0.81",
                    "analysisTime": 20,
                    "getDiffImage": null
                },
                "diffImage": "..\\bitmaps_test\\20170920-113959\\failed_diff_backstop_default_Homepage_0_document_0_phone.png"
            },
            "status": "fail"
        },
        {
            "pair": {
                "reference": "..\\bitmaps_reference\\backstop_default_Homepage_0_document_1_tablet.png",
                "test": "..\\bitmaps_test\\20170920-113959\\backstop_default_Homepage_0_document_1_tablet.png",
                "selector": "document",
                "fileName": "backstop_default_Homepage_0_document_1_tablet.png",
                "label": "Homepage",
                "misMatchThreshold": 0.1,
                "diff": {
                    "isSameDimensions": true,
                    "dimensionDifference": {
                        "width": 0,
                        "height": 0
                    },
                    "misMatchPercentage": "0.21",
                    "analysisTime": 28,
                    "getDiffImage": null
                },
                "diffImage": "..\\bitmaps_test\\20170920-113959\\failed_diff_backstop_default_Homepage_0_document_1_tablet.png"
            },
            "status": "fail"
        }
    ]
}



/* GET report listing. */
router.get('/', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.json(mockJson);
});

module.exports = router;