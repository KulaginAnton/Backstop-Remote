module.exports = function(engine, scenario, vp) {
    // This script runs before your app loads. Edit here to log-in, load cookies or set other states required for your test.
    //console.log('-----------> onBefore.js has run for ' + vp.label + '.');
    engine.evaluate(function() {
        // Your web-app is now loaded. Edit here to simulate user interacions or other state changes in the browser window context.
        document.querySelector('body').style.background = 'red';
    });
    console.log('onBefore.js has run for: ', vp.label);
    engine.onError = function(msg, trace) {

        var msgStack = ['ERROR: ' + msg];

        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function(t) {
                msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function+'")' : ''));
            });
        }

        console.error(msgStack.join('\n'));

    };
    engine.onConsoleMessage = function(msg) {
        console.log('---------<' + msg);
    }
};