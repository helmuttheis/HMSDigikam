/// <reference path="./lg.ts"/>
// import * as $ from 'jquery'
var glbStatus = new log();

function btnClear_Click() {
    var lgInst = new lg();
    lgInst.lgClear('#albumlist');
    lgInst.lgClear('#lightgallery');
    lgInst.lgClear('#tagslist');
}
function btnSearch_Click() {
    var lgInst = new lg();
    lgInst.lgClear('#albumlist');
    lgInst.lgFillImages('#lightgallery', '#tbSearch', function (msg) {
        glbStatus.statusDone(msg);
        (<any>$('#lightgallery')).lightGallery();
    });
    glbStatus.statusStart('searching ...');
}
function btnSearchAlbum(elem) {
    var lgInst = new lg();
    var album = $(elem).attr('data-responsive');
    lgInst.lgClear('#tagslist');
    lgInst.lgClear('#albumlist');
    lgInst.lgFillAlbumImages('#lightgallery', album, function (msg) {
        glbStatus.statusDone(msg);
        (<any>$('#lightgallery')).lightGallery();
    });
    glbStatus.statusStart('searching ...');
}
function btnFolder_Click() {
    var lgInst = new lg();
    lgInst.lgClear('#lightgallery');
    lgInst.lgClear('#tagslist');
    lgInst.lgFillAlbumList('#albumlist', function (msg) {
        glbStatus.statusDone(msg);
    });
    glbStatus.statusStart('searching ...');
}
function btnTags_Click() {
    var lgInst = new lg();
    var tagid = "0";
    // this must be the previously selected id
    lgInst.lgClear('#albumlist');
    lgInst.lgClear('#lightgallery');
    lgInst.lgFillTagList('#tagslist', tagid, function (msg) {
        glbStatus.statusDone(msg);
    });
    glbStatus.statusStart('searching ...');
}
function btnSearchTag_Click(elem) {
    var lgInst = new lg();
    var tagid = $(elem).attr('data-responsive');
    // this must be the previously selected id
    lgInst.lgClear('#lightgallery');
    lgInst.lgFillTagList('#tagslist', tagid, function (msg) {
        glbStatus.statusDone(msg);

    });
    glbStatus.statusStart('searching ...');
}
function btnShowTag_Click(elem) {
    var lgInst = new lg();
    var tagid = $(elem).attr('data-responsive');
    // this must be the previously selected id
    lgInst.lgClear('#albumlist');
    lgInst.lgClear('#tagslist');
    lgInst.lgFillTag('#lightgallery', tagid, function (msg) {
        glbStatus.statusDone(msg);
        (<any>$('#lightgallery')).lightGallery();
    });
    glbStatus.statusStart('searching ...');
}
function cbOnLoad() {
    var lgInst = new lg();
    lgInst.lgImgOnLoad();
}

var bFirstRun = true;
$(document).ready(function () {
    if (bFirstRun === true) {
        bFirstRun = false;
        var input = document.getElementById("tbSearch");
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("tbSearchSubmit").click();
            }
        });

        var header = document.getElementById("headerButton");
        var btns = header.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("headerTabsButton-active");
                current[0].className = current[0].className.replace(" headerTabsButton-active", "");
                this.className += " headerTabsButton-active";
            });
        }
    }

});