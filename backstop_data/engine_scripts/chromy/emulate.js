module.exports = function (chromy, scenario, vp, isReference, chromyStatic) {
    chromyStatic.addCustomDevice({
        name: 'Android',
        width: 750,
        height: 1334,
        deviceScaleFactor: 2.0,
        pageScaleFactor: 1.0,
        mobile: true,
        userAgent: 'Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    });
    chromy.emulate("Android");
 
};