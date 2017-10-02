module.exports = function(engine, scenario, vp) {
    engine.evaluate(function() {
        // Your web-app is now loaded. Edit here to simulate user interacions or other state changes in the browser window context.
        document.querySelector('body').style.background = 'red';
    });
    console.log('onReady.js has run for: ', vp.label);
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