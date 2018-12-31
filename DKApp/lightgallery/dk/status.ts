/// <reference path="../../node_modules/@types/jquery/index.d.ts"/>

class log {
    constructor() {

    }
    statusStart(msg: string) {
        $('#status').text(msg);
        $('#overlayStatus').text(msg);
    }
    statusDone(msg: string) {
        $('#status').text(msg);
        $('#overlayStatus').text(msg);
    }
    statusProgress(current, error, target) {
        if (error > 0) {
            $('#overlayInfo').text(current + " von " + target + " Bildern geladen (" + error + " fehlerhaft)");
        }
        else {
            $('#overlayInfo').text(current + " von " + target + " Bildern geladen.");
        }
    }
}