var express = require('express');
var router = express.Router();

let mockJson = {
    "testSuite": "BackstopJS",
    "tests": [{
            "pair": {
                "reference": "..\\bitmaps_reference\\backstop_default_flip_0_flip-with-border_0_phone.png",
                "test": "..\\bitmaps_test\\20170913-160704\\backstop_default_flip_0_flip-with-border_0_phone.png",
                "selector": ".flip-with-border",
                "fileName": "backstop_default_flip_0_flip-with-border_0_phone.png",
                "label": "flip",
                "requireSameDimensions": true,
                "misMatchThreshold": 0,
                "diff": {
                    "isSameDimensions": true,
                    "dimensionDifference": {
                        "width": 0,
                        "height": 0
                    },
                    "misMatchPercentage": "0.00",
                    "getDiffImage": null
                }
            },
            "status": "pass"
        },
        {
            "pair": {
                "reference": "..\\bitmaps_reference\\backstop_default_flip_0_flip-with-border_1_tablet.png",
                "test": "..\\bitmaps_test\\20170913-160704\\backstop_default_flip_0_flip-with-border_1_tablet.png",
                "selector": ".flip-with-border",
                "fileName": "backstop_default_flip_0_flip-with-border_1_tablet.png",
                "label": "flip",
                "requireSameDimensions": true,
                "misMatchThreshold": 0,
                "diff": {
                    "isSameDimensions": true,
                    "dimensionDifference": {
                        "width": 0,
                        "height": 0
                    },
                    "misMatchPercentage": "0.00",
                    "getDiffImage": null
                }
            },
            "status": "pass"
        },
        {
            "pair": {
                "reference": "..\\bitmaps_reference\\backstop_default_flip_0_flip-with-border_2_desktop.png",
                "test": "..\\bitmaps_test\\20170913-160704\\backstop_default_flip_0_flip-with-border_2_desktop.png",
                "selector": ".flip-with-border",
                "fileName": "backstop_default_flip_0_flip-with-border_2_desktop.png",
                "label": "flip",
                "requireSameDimensions": true,
                "misMatchThreshold": 0,
                "diff": {
                    "isSameDimensions": true,
                    "dimensionDifference": {
                        "width": 0,
                        "height": 0
                    },
                    "misMatchPercentage": "0.00",
                    "getDiffImage": null
                }
            },
            "status": "pass"
        },
        {
            "pair": {
                "reference": "..\\bitmaps_reference\\backstop_default_promo-gray_0_promo-gray_0_phone.png",
                "test": "..\\bitmaps_test\\20170913-160704\\backstop_default_promo-gray_0_promo-gray_0_phone.png",
                "selector": ".promo-gray",
                "fileName": "backstop_default_promo-gray_0_promo-gray_0_phone.png",
                "label": "promo-gray",
                "requireSameDimensions": true,
                "misMatchThreshold": 0,
                "diff": {
                    "isSameDimensions": true,
                    "dimensionDifference": {
                        "width": 0,
                        "height": 0
                    },
                    "misMatchPercentage": "0.00",
                    "getDiffImage": null
                }
            },
            "status": "pass"
        },
        {
            "pair": {
                "reference": "..\\bitmaps_reference\\backstop_default_promo-gray_0_promo-gray_1_tablet.png",
                "test": "..\\bitmaps_test\\20170913-160704\\backstop_default_promo-gray_0_promo-gray_1_tablet.png",
                "selector": ".promo-gray",
                "fileName": "backstop_default_promo-gray_0_promo-gray_1_tablet.png",
                "label": "promo-gray",
                "requireSameDimensions": true,
                "misMatchThreshold": 0,
                "diff": {
                    "isSameDimensions": true,
                    "dimensionDifference": {
                        "width": 0,
                        "height": 0
                    },
                    "misMatchPercentage": "0.00",
                    "getDiffImage": null
                }
            },
            "status": "pass"
        },
        {
            "pair": {
                "reference": "..\\bitmaps_reference\\backstop_default_promo-gray_0_promo-gray_2_desktop.png",
                "test": "..\\bitmaps_test\\20170913-160704\\backstop_default_promo-gray_0_promo-gray_2_desktop.png",
                "selector": ".promo-gray",
                "fileName": "backstop_default_promo-gray_0_promo-gray_2_desktop.png",
                "label": "promo-gray",
                "requireSameDimensions": true,
                "misMatchThreshold": 0,
                "diff": {
                    "isSameDimensions": true,
                    "dimensionDifference": {
                        "width": 0,
                        "height": 0
                    },
                    "misMatchPercentage": "0.00",
                    "getDiffImage": null
                }
            },
            "status": "pass"
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