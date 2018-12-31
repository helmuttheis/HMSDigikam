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
    log.prototype.statusProgress = function (current, error, target) {
        if (error > 0) {
            $('#overlayInfo').text(current + " von " + target + " Bildern geladen (" + error + " fehlerhaft)");
        }
        else {
            $('#overlayInfo').text(current + " von " + target + " Bildern geladen.");
        }
    };
    return log;
}());
//# sourceMappingURL=status.js.map