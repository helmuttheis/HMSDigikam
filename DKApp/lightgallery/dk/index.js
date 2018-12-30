/// <reference path="./lg.ts"/>
// import * as $ from 'jquery'
var glbStatus = new log();
var ImgToLoad = 0;
var ImgLoaded = 0;
var ImgErrored = 0;
var ImgDone = 0;
function btnClear_Click() {
    var lgInst = new lg();
    lgInst.lgClear('#albumlist');
    lgInst.lgClear('#lightgallery');
    lgInst.lgClear('#tagslist');
}
function btnSearch_Click() {
    ClearCount();
    var lgInst = new lg();
    lgInst.lgClear('#albumlist');
    lgInst.lgFillImages('#lightgallery', '#tbSearch', function (msg) {
        glbStatus.statusDone(msg);
        $('#lightgallery').lightGallery();
    });
    glbStatus.statusStart('searching ...');
}
function btnSearchAlbum(elem) {
    ClearCount();
    var lgInst = new lg();
    var album = $(elem).attr('data-responsive');
    lgInst.lgClear('#tagslist');
    lgInst.lgClear('#albumlist');
    lgInst.lgFillAlbumImages('#lightgallery', album, function (msg) {
        glbStatus.statusDone(msg);
        $('#lightgallery').lightGallery();
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
    ClearCount();
    var lgInst = new lg();
    var tagid = $(elem).attr('data-responsive');
    // this must be the previously selected id
    document.getElementById("loadingOverlay").classList.remove('invisible');
    document.getElementById("loadingOverlay").classList.add('visible');
    lgInst.lgClear('#albumlist');
    lgInst.lgClear('#tagslist');
    lgInst.lgFillTag('#lightgallery', tagid, function (msg) {
        ImgToLoad = msg;
        glbStatus.statusDone(msg + ' found');
        $('#lightgallery').lightGallery();
    });
    glbStatus.statusStart('searching ...');
}
function cbOnLoad() {
    ImgLoaded++;
    ImgDone++;
    document.getElementById("progressbarSuccess").style.width = ImgLoaded / ImgToLoad * 100 + "%";
    if (ImgDone >= ImgToLoad) {
        document.getElementById("loadingOverlay").classList.remove('visible');
        document.getElementById("loadingOverlay").classList.add('invisible');
    }
}
function cbOnError() {
    ImgErrored++;
    ImgDone++;
    document.getElementById("progressbarError").style.width = ImgErrored / ImgToLoad * 100 + "%";
    if (ImgDone >= ImgToLoad) {
        document.getElementById("loadingOverlay").classList.remove('visible');
        document.getElementById("loadingOverlay").classList.add('invisible');
    }
}
function ClearCount() {
    ImgToLoad = 0;
    ImgErrored = 0;
    ImgErrored = 0;
    ImgDone = 0;
}
//delete if not needed anymore!!!!
function btnTest() {
    document.getElementById("loadingOverlay").classList.remove('invisible');
    document.getElementById("loadingOverlay").classList.add('visible');
}
function overlayClose() {
    document.getElementById("loadingOverlay").classList.remove('visible');
    document.getElementById("loadingOverlay").classList.add('invisible');
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
//# sourceMappingURL=index.js.map