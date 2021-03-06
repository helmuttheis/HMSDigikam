﻿// <reference path="../../node_modules/@types/jquery/index.d.ts"/>

class lg {
    constructor() {

    }
    progessStart() {
        var elem = document.getElementById("myProgress");
        setTimeout(function () {
           // elem.style.visibility = "visible";
        }, 0);
    }
    progessStop() {
        var elem = document.getElementById("myProgress");
        setTimeout(function () {
            // elem.style.visibility = "hidden";
        }, 0);
    }
    progressStep(value:number, max:number) {
        var elem = document.getElementById("myBar");
        setTimeout(function () {
            // elem.style.width = value * 100 / max + '%';
        }, 0);
    }

    lgClear(selector: string) {
        var $ulElem = $(selector);

        if ($ulElem) {
            $ulElem.empty();
        }
    }

    lgFillImages(selector, idSearchText, cb) {
        var $ulElem = $(selector);

        if ($ulElem) {
            $ulElem.empty();

            var searchControl = $(idSearchText);
            var searchString = encodeURIComponent(<string>searchControl.val());
            $.getJSON("/search?person=" + searchString, function (data) {

                var items: DBPhotoList = data.json;
                if (items.error) {
                    cb(items.error);
                }
                else {
                    var nr = 0;
                    $.each(items.Photos, function (index, item: DBPhoto) {
                        var thumb_name = "/thumb" + item.Image.replace(/ /gi, "%20");
                        var img_name = "/photo" + item.Image.replace(/ /gi, "%20"); //  = "img/" + (nr % 4 + 1) + "-1600.jpg";
                        nr++;
                        var data_responsive = thumb_name; //  "img/4-375.jpg 375, img/4-480.jpg 480, img/4.jpg 800";
                        var data_src = img_name;
                        var data_sub_html = "<h4>" + item.Image + "</h4>"; // <p></p>";
                        var src = thumb_name; // "img/thumb-4.jpg";
                        $ulElem.append('<li class="image" data-responsive="' + data_responsive + '" data-src="' + data_src + '" data-sub-html="' + data_sub_html + '"><a href=""><img class="img-responsive" src="' + src + '" onload="cbOnLoad()" onerror="cbOnError()"></a></li>');

                    });

                    cb(items.TotalRecordCount);
                }
            });
        }
    }
    lgFillAlbumImages(selector, album: string, cb) {
        var $ulElem = $(selector);
        var that = this;
        if ($ulElem) {
            $ulElem.empty();

            var searchString = encodeURIComponent(album);
            $.getJSON("/search?album=" + searchString, function (data) {

                var items: DBPhotoList = data.json;
                if (items.error) {
                    cb(items.error);
                }
                else {
                    that.progessStart();
                    var nr = 0;
                    $.each(items.Photos, function (index, item: DBPhoto) {
                        var thumb_name = "/thumb" + item.Image.replace(/ /gi,"%20");
                        var img_name = "/photo" + item.Image.replace(/ /gi,"%20"); //  = "img/" + (nr % 4 + 1) + "-1600.jpg";
                        nr++;
                        var data_responsive = thumb_name; //  "img/4-375.jpg 375, img/4-480.jpg 480, img/4.jpg 800";
                        var data_src = img_name;
                        var data_sub_html = "<h4>" + item.Image + "</h4>"; // <p></p>";
                        var src = thumb_name; // "img/thumb-4.jpg";
                        $ulElem.append('<li class="image" data-responsive="' + data_responsive + '" data-src="' + data_src + '" data-sub-html="' + data_sub_html + '">' +
                            '<a href=""> <img class="img-responsive" src="' + src + '" onload="cbOnLoad()" onerror="cbOnError()"> </a></li > ');
                        that.progressStep(nr, items.TotalRecordCount);
                        if (nr >= items.TotalRecordCount) {
                            that.progessStop();
                        }
                    });
                    cb(items.TotalRecordCount);
                }
            });
        }
    }
    lgFillAlbumList(selector, cb) {
        var $ulElem = $(selector);

        if ($ulElem) {
            $ulElem.empty();

            $.getJSON("/albumlist", function (data) {

                var items: DBAlbumList = data.json; // JSON.parse(data.json);
                if (items.error) {
                    cb(items.error);
                }
                else {
                    var nr = 0;
                    $.each(items.Albums, function (index, item: DBAlbum) {
                        var href = item.RelativePath;
                        nr++;
                        var data_responsive = href; //  "img/4-375.jpg 375, img/4-480.jpg 480, img/4.jpg 800";
                        var data_src = href;
                        var data_sub_html = "<h4>" + item.RelativePath + "</h4><p> </p>";

                        $ulElem.append('<li class="">' +
                            '<button onclick="btnSearchAlbum_Click(this)" data-responsive="' + data_responsive + '" data-name="' + data_responsive + '"> ' + data_responsive + ' </button></li> ');
                    });

                    cb(items.TotalRecordCount);
                }
            });
        }
    }
    lgFillTagList(selector, tagid: string, cb) {
        var $ulElem = $(selector);

        if ($ulElem) {
            $ulElem.empty();

            $.getJSON("/taglist?tagid=" + tagid, function (data) {
                var items: DBTagList = data.json;
                if (items.error) {
                    cb(items.error);
                }
                else {
                    var nr = 0;
                    $.each(items.Tags, function (index, item: DBTag) {
                        var href = item.id;
                        nr++;
                        var data_responsive = href; //  "img/4-375.jpg 375, img/4-480.jpg 480, img/4.jpg 800";
                        var data_src = href;
                        var data_sub_html = "<h4>" + item.name + "</h4>";
                        var data_image = "./img/placeholder.png";
                        var data_children = "";
                        var data_name = item.name + '(' + item.childcnt + ')';
                        if (item.childcnt == 0) {
                            data_children = "invisible";
                            data_name = item.name;
                        }

                        /* $ulElem.append('<li class="" data-responsive="' + data_responsive + '"  data-sub-html="' + data_sub_html + '" >' +
                            '<button onclick="btnSearchTag_Click(this)" data-responsive="' + data_responsive + '" >' + item.name + '</button>' +
                            '<button onclick="btnShowTag_Click(this)" data-responsive="' + data_responsive + '" ><i class="fas fa-arrow-right"></i></button></li>');
                        */

                        $ulElem.append('<li class= "" data-responsive="' + data_responsive + '" data-sub-html="' + data_sub_html + '"style="background-image: url(' + data_image + ')">' + 
                            '<div class="tag_preview" >' +
                            '<button onclick="btnShowTag_Click(this)" data-responsive="' + data_responsive + '" data-name="' + data_name + '">' + item.name + '</button>' + 
                            '</div><div class= "tag_view ' + data_children + '" >' +
                            '<button class="' + data_children + '" onclick="btnSearchTag_Click(this)" data-responsive="' + data_responsive + '" data-name="' + data_name + '">' + item.childcnt +  ' Tags enzeigen &nbsp <i class= "fas fa-arrow-right"></i></button>' +
                            '</div> </li>'
                        );
                    });
                    
                    cb(items.TotalRecordCount);
                }
            });
        }
    }
    lgFillTag (selector, tagid: string, cb) {
        var $ulElem = $(selector);

        if ($ulElem) {
            $ulElem.empty();
            
            $.getJSON("/tag?tagid=" + tagid, function (data) {

                var items: DBPhotoList = data.json;
                if (items.error) {
                    cb(items.error);
                }
                else {
                    var nr = 0;
                    $.each(items.Photos, function (index, item: DBPhoto) {
                        var thumb_name = "/thumb" + item.Image.replace(/ /gi,"%20");
                        var img_name = "/photo" + item.Image.replace(/ /gi,"%20");
                        nr++;
                        var data_responsive = thumb_name;
                        var data_src = img_name;
                        var data_sub_html = "<h4>" + item.Image + "</h4>"; // <p></p>";
                        var src = thumb_name;
                        $ulElem.append('<li class="image" data-responsive="' + data_responsive + '" data-src="' + data_src + '" data-sub-html="' + data_sub_html + '"><a href=""><img class="img-responsive" src="' + src + '" onload="cbOnLoad()" onerror="cbOnError()"></a></li>');

                    });

                    cb(items.TotalRecordCount);
                
                }
            });
        }
    }
    lgFillbreadcrumb(selector, bcArray: breadcrumb[]) {
        var $ulElem = $(selector);
        if ($ulElem) {
            $ulElem.empty();
            $.each(bcArray, function (index, item: breadcrumb) {
                var breadcrumbName = item.name;
                var breadcrumbArrow = '<div class="breadcrumbArrow">&gt;</div>';
                if (index > 0) {
                    $ulElem.append(breadcrumbArrow);
                }
                /*var addSpan = "";
                if (index == bcArray.length - 1) {
                    addSpan = '<span id="PicCnt"></span>';
                }*/
                $ulElem.append('<div class="breadcrumb"><button onclick="btnBreadcrumb_Click(' + index + ')">' + breadcrumbName + '</button></div>');

            });

        }
    }
}

interface breadcrumb {
    name: string,
    func: any
}

interface DBTagList {
    error: string,
    Tags: DBTag[],
    TotalRecordCount: number
}
interface DBTag {
    id: string,
    pid: string,
    name: string,
    childcnt: number
}

interface DBAlbumList {
    error: string,
    Albums: DBAlbum[],
    TotalRecordCount: number
}
interface DBAlbum {
    error: string,
    Albumroots: string,
    RelativePath: string
}
interface DBPhotoList {
    error:string,
    Photos: DBPhoto[],
    TotalRecordCount: number
}
interface DBPhoto {
    Image: string
}