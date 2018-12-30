/// <reference path="../../node_modules/@types/jquery/index.d.ts"/>
var log = /** @class */ (function () {
    function log() {
    }
    log.prototype.statusStart = function (msg) {
        $('#status').text(msg);
        $('#overlayStatus').text(msg);
    };
    log.prototype.statusDone = function (msg) {
        $('#status').text(msg);
        $('#overlayStatus').text(msg);
    };
    return log;
}());
//# sourceMappingURL=status.js.map