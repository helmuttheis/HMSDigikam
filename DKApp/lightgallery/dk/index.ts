/// <reference path="./lg.ts"/>
// import * as $ from 'jquery'
var glbStatus = new log();
var ImgToLoad = 0;
var ImgLoaded = 0;
var ImgErrored = 0;
var ImgDone = 0;
var funcarray: breadcrumb[] = [];

function btnClear_Click() {
    var lgInst = new lg();
    funcarray = [];
    clearAll();
}
function clearAll() {
    var lgInst = new lg();
    lgInst.lgClear('#albumlist');
    lgInst.lgClear('#lightgallery');
    lgInst.lgClear('#tagslist');
    lgInst.lgClear('#breadcrumbs');
    lgInst.lgClear('#firstBreadcrumb');
}
function btnSearch_Click() {
    ClearCount()
    var lgInst = new lg();
    overlayOpen();
    clearAll();
    lgInst.lgFillImages('#lightgallery', '#tbSearch', function (msg) {
        ImgToLoad = msg;
        glbStatus.statusDone(msg + ' Bilder');
        (<any>$('#lightgallery')).lightGallery();
    });
    glbStatus.statusStart('Bilder werden gesucht...');
}
function btnSearchAlbum_Click(elem) {
    var lgInst = new lg();
    clearAll();
    var nb: breadcrumb = {
        name: $(elem).attr('data-name'), func: () => { btnSearchAlbum(elem) }
    };
    funcarray.push(nb);
    $('#firstBreadcrumb').append('<div class="breadcrumb"><button onclick="btnFolder_Click()">Alle Alben</button></div><div class="breadcrumbArrow">&gt;</div>');
    lgInst.lgFillbreadcrumb('#breadcrumbs', funcarray);
    funcarray[funcarray.length - 1].func();
}
function btnSearchAlbum(elem) {
    ClearCount();
    var lgInst = new lg();
    var album = $(elem).attr('data-responsive');
    overlayOpen();
    lgInst.lgFillAlbumImages('#lightgallery', album, function (msg) {
        ImgToLoad = msg;
        glbStatus.statusDone(msg + ' gefunden');
        (<any>$('#lightgallery')).lightGallery();
    });
    glbStatus.statusStart('Bilder werden gesucht...');
}
function btnFolder_Click() {
    var lgInst = new lg();
    clearAll();
    funcarray = [];
    $('#firstBreadcrumb').append('<div class="breadcrumb"><button onclick="btnFolder_Click()">Alle Alben</button></div><div class="breadcrumbArrow">&gt;</div>');
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
    clearAll();
    $('#firstBreadcrumb').append('<div class="breadcrumb"><button onclick="btnTags_Click()">Alle Tags</button></div><div class="breadcrumbArrow">&gt;</div>');
    lgInst.lgFillTagList('#tagslist', tagid, function (msg) {
        glbStatus.statusDone(msg);
    });
    glbStatus.statusStart('Tags werden gesucht...');
}
function btnSearchTag_Click(elem) {
    var lgInst = new lg();
    clearAll();
    var nb: breadcrumb = {
        name: $(elem).attr('data-name'), func: () => { btnSearchTag(elem) }};
    funcarray.push(nb);
    $('#firstBreadcrumb').append('<div class="breadcrumb"><button onclick="btnTags_Click()">Alle Tags</button></div><div class="breadcrumbArrow">&gt;</div>');
    lgInst.lgFillbreadcrumb('#breadcrumbs', funcarray);
    funcarray[funcarray.length - 1].func();
}
function btnSearchTag(elem) {
    var lgInst = new lg();
    var tagid = $(elem).attr('data-responsive');
    // this must be the previously selected id
    lgInst.lgClear('#lightgallery');
    lgInst.lgFillTagList('#tagslist', tagid, function (msg) {
        glbStatus.statusDone(msg);

    });
    glbStatus.statusStart('Tags werden gesucht...');
}
function btnShowTag_Click(elem) {
    var lgInst = new lg();
    clearAll();
    var nb: breadcrumb = {
        name: $(elem).attr('data-name'), func: () => { btnShowTag(elem) }
    };
    funcarray.push(nb);
    $('#firstBreadcrumb').append('<div class="breadcrumb"><button onclick="btnTags_Click()">Alle Tags</button></div><div class="breadcrumbArrow">&gt;</div>');
    lgInst.lgFillbreadcrumb('#breadcrumbs', funcarray);
    funcarray[funcarray.length - 1].func();
}
function btnShowTag(elem) {
    ClearCount()
    var lgInst = new lg();
    var tagid = $(elem).attr('data-responsive');
    // this must be the previously selected id
    overlayOpen();
    lgInst.lgFillTag('#lightgallery', tagid, function (msg) {
        ImgToLoad = msg;
        glbStatus.statusDone(msg + ' gefunden');
        (<any>$('#lightgallery')).lightGallery();
    });
    glbStatus.statusStart('Bilder werden gesucht...');
}
function btnBreadcrumb_Click(step) {
    var lgInst = new lg();
    lgInst.lgClear('#albumlist');
    lgInst.lgClear('#lightgallery');
    lgInst.lgClear('#tagslist');
    lgInst.lgClear('#breadcrumbs');
    funcarray = funcarray.slice(0, step + 1);
    lgInst.lgFillbreadcrumb('#breadcrumbs', funcarray);
    funcarray[funcarray.length - 1].func();
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

interface breadcrumb {
    name: string,
    func: any
}