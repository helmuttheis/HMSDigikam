/// <reference path="./lg.ts"/>
// import * as $ from 'jquery'
var glbStatus = new log();
var ImgToLoad = 0;
var ImgLoaded = 0;
var ImgErrored = 0;
var ImgDone = 0;
var funcarray: Breadcrump[] = [];

function btnClear_Click() {
    var lgInst = new lg();
    lgInst.lgClear('#albumlist');
    lgInst.lgClear('#lightgallery');
    lgInst.lgClear('#tagslist');
    lgInst.lgClear('#breadcrumps');
}
function btnSearch_Click() {
    ClearCount()
    var lgInst = new lg();
    overlayOpen();
    lgInst.lgClear('#albumlist');
    lgInst.lgClear('#breadcrumps');
    lgInst.lgFillImages('#lightgallery', '#tbSearch', function (msg) {
        ImgToLoad = msg;
        glbStatus.statusDone(msg + ' gefunden');
        (<any>$('#lightgallery')).lightGallery();
    });
    glbStatus.statusStart('Bilder werden gesucht...');
}
function btnSearchAlbum(elem) {
    ClearCount()
    var lgInst = new lg();
    var album = $(elem).attr('data-responsive');
    overlayOpen();
    lgInst.lgClear('#tagslist');
    lgInst.lgClear('#albumlist');
    lgInst.lgClear('#breadcrumps');
    lgInst.lgFillAlbumImages('#lightgallery', album, function (msg) {
        ImgToLoad = msg;
        glbStatus.statusDone(msg + ' gefunden');
        (<any>$('#lightgallery')).lightGallery();
    });
    glbStatus.statusStart('Bilder werden gesucht...');
}
function btnFolder_Click() {
    var lgInst = new lg();
    lgInst.lgClear('#lightgallery');
    lgInst.lgClear('#tagslist');
    lgInst.lgClear('#breadcrumps');
    lgInst.lgFillAlbumList('#albumlist', function (msg) {
        glbStatus.statusDone(msg);
    });
    glbStatus.statusStart('Alben werden gesucht...');
}
function btnTags_Click() {
    var lgInst = new lg();
    var tagid = "0";
    funcarray = [];
    // this must be the previously selected id
    lgInst.lgClear('#albumlist');
    lgInst.lgClear('#lightgallery');
    lgInst.lgClear('#breadcrumps');
    lgInst.lgFillTagList('#tagslist', tagid, function (msg) {
        glbStatus.statusDone(msg);
    });
    glbStatus.statusStart('Tags werden gesucht...');
}
function btnSearchTag_Click(elem) {
    var lgInst = new lg();
    lgInst.lgClear('#breadcrumps');
    var nb: Breadcrump = {
        name: $(elem).attr('data-name'), func: () => { btnSearchTag(elem) }};
    funcarray.push(nb);
    //var BC = funcarray.pop();
    //BC.func();
    lgInst.lgFillBreadcrump('#breadcrumps', funcarray);
    funcarray[funcarray.length - 1].func();
    //btnSearchTag(elem);
}
function btnSearchTag(elem) {
    var lgInst = new lg();
    var tagid = $(elem).attr('data-responsive');
    // this must be the previously selected id
    lgInst.lgClear('#lightgallery');
    lgInst.lgClear('#breadcrumps');
    lgInst.lgFillTagList('#tagslist', tagid, function (msg) {
        glbStatus.statusDone(msg);

    });
    glbStatus.statusStart('Tags werden gesucht...');
}
function btnShowTag_Click(elem) {
    ClearCount()
    var lgInst = new lg();
    var tagid = $(elem).attr('data-responsive');
    // this must be the previously selected id
    overlayOpen();
    lgInst.lgClear('#albumlist');
    lgInst.lgClear('#tagslist');
    lgInst.lgClear('#breadcrumps');
    lgInst.lgFillTag('#lightgallery', tagid, function (msg) {
        ImgToLoad = msg;
        glbStatus.statusDone(msg + ' gefunden');
        (<any>$('#lightgallery')).lightGallery();
    });
    glbStatus.statusStart('Bilder werden gesucht...');
}
function cbOnLoad() {
    ImgLoaded++;
    ImgDone++;
    if (ImgToLoad == 0) document.getElementById("progressbarError").style.width = ".1%";
    else document.getElementById("progressbarSuccess").style.width = ImgLoaded / ImgToLoad * 100 + "%";
    glbStatus.statusProgress(ImgLoaded, ImgErrored, ImgToLoad);
    if(ImgDone >= ImgToLoad) {
        overlayClose();
    }
}

function cbOnError() {
    ImgErrored++;
    ImgDone++;
    if (ImgToLoad == 0) document.getElementById("progressbarError").style.width = ".1%";
    else document.getElementById("progressbarError").style.width = ImgErrored / ImgToLoad * 100 + "%";
    glbStatus.statusProgress(ImgLoaded, ImgErrored, ImgToLoad);
    if(ImgDone >= ImgToLoad) {
        overlayClose();
    }
}


function ClearCount() {
    ImgToLoad = 0;
    ImgLoaded = 0;
    ImgErrored = 0;
    ImgDone = 0;
}

//delete if not needed anymore!!!!
function btnTest() {
    overlayOpen();
}

function overlayClose() {
    document.getElementById("loadingOverlay").classList.remove('visible');
    document.getElementById("loadingOverlay").classList.add('invisible');
}

function overlayOpen() {
    document.getElementById("loadingOverlay").classList.remove('invisible');
    document.getElementById("loadingOverlay").classList.add('visible');
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

interface Breadcrump {
    name: string,
    func: any
}