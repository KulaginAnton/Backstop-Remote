module.exports = function(casper, scenario, vp) {
    casper.on('remote.message', function(message) {
        this.echo("--------> " + message);
    });
    casper.on('remote.error', function(message) {
        this.echo("--------> " + message);
    });
    casper.on('page.error', function(message) {
        this.echo("--------> " + message);
    });

};