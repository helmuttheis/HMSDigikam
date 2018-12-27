/// <reference path="../../node_modules/@types/jquery/index.d.ts"/>

class log {
    constructor() {

    }
    statusStart(msg: string) {
        $('#status').text(msg);
    }
    statusDone(msg: string) {
        $('#status').text(msg);
    }
}