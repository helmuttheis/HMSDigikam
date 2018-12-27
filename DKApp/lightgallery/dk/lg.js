/// <reference path="../../node_modules/@types/jquery/index.d.ts"/>
var lg = /** @class */ (function () {
    function lg() {
    }
    lg.prototype.progessStart = function () {
        var elem = document.getElementById("myProgress");
        setTimeout(function () {
            // elem.style.visibility = "visible";
        }, 0);
    };
    lg.prototype.progessStop = function () {
        var elem = document.getElementById("myProgress");
        setTimeout(function () {
            // elem.style.visibility = "hidden";
        }, 0);
    };
    lg.prototype.progressStep = function (value, max) {
        var elem = document.getElementById("myBar");
        setTimeout(function () {
            // elem.style.width = value * 100 / max + '%';
        }, 0);
    };
    lg.prototype.lgClearImages = function (selector) {
        var $ulElem = $(selector);
        if ($ulElem) {
            $ulElem.empty();
        }
    };
    lg.prototype.lgFillImages = function (selector, idSearchText, cb) {
        var $ulElem = $(selector);
        if ($ulElem) {
            $ulElem.empty();
            var searchControl = $(idSearchText);
            var searchString = encodeURIComponent(searchControl.val());
            $.getJSON("/search?person=" + searchString, function (data) {
                var items = data.json;
                if (items.error) {
                    cb(items.error);
                }
                else {
                    var nr = 0;
                    $.each(items.Photos, function (index, item) {
                        var thumb_name = "/thumb" + item.Image.replace(/ /gi, "%20");
                        var img_name = "/photo" + item.Image.replace(/ /gi, "%20"); //  = "img/" + (nr % 4 + 1) + "-1600.jpg";
                        nr++;
                        var data_responsive = thumb_name; //  "img/4-375.jpg 375, img/4-480.jpg 480, img/4.jpg 800";
                        var data_src = img_name;
                        var data_sub_html = "<h4>" + item.Image + "</h4>"; // <p></p>";
                        var src = thumb_name; // "img/thumb-4.jpg";
                        $ulElem.append('<li class="" data-responsive="' + data_responsive + '" data-src="' + data_src + '" data-sub-html="' + data_sub_html + '"><a href=""><img class="img-responsive" src="' + src + '"></a></li>');
                    });
                    cb(items.TotalRecordCount + ' found');
                }
            });
        }
    };
    lg.prototype.lgFillAlbumImages = function (selector, album, cb) {
        var $ulElem = $(selector);
        var that = this;
        if ($ulElem) {
            $ulElem.empty();
            var searchString = encodeURIComponent(album);
            $.getJSON("/search?album=" + searchString, function (data) {
                var items = data.json;
                if (items.error) {
                    cb(items.error);
                }
                else {
                    that.progessStart();
                    var nr = 0;
                    $.each(items.Photos, function (index, item) {
                        var thumb_name = "/thumb" + item.Image.replace(/ /gi, "%20");
                        var img_name = "/photo" + item.Image.replace(/ /gi, "%20"); //  = "img/" + (nr % 4 + 1) + "-1600.jpg";
                        nr++;
                        var data_responsive = thumb_name; //  "img/4-375.jpg 375, img/4-480.jpg 480, img/4.jpg 800";
                        var data_src = img_name;
                        var data_sub_html = "<h4>" + item.Image + "</h4>"; // <p></p>";
                        var src = thumb_name; // "img/thumb-4.jpg";
                        $ulElem.append('<li class="" data-responsive="' + data_responsive + '" data-src="' + data_src + '" data-sub-html="' + data_sub_html + '"><a href=""><img class="img-responsive" src="' + src + '"></a></li>');
                        that.progressStep(nr, items.TotalRecordCount);
                        if (nr >= items.TotalRecordCount) {
                            that.progessStop();
                        }
                    });
                    cb(items.TotalRecordCount + ' found');
                }
            });
        }
    };
    lg.prototype.lgClearAlbumList = function (selector) {
        var $ulElem = $(selector);
        if ($ulElem) {
            $ulElem.empty();
        }
    };
    lg.prototype.lgFillAlbumList = function (selector, cb) {
        var $ulElem = $(selector);
        if ($ulElem) {
            $ulElem.empty();
            $.getJSON("/albumlist", function (data) {
                var items = data.json; // JSON.parse(data.json);
                if (items.error) {
                    cb(items.error);
                }
                else {
                    var nr = 0;
                    $.each(items.Albums, function (index, item) {
                        var href = item.RelativePath;
                        nr++;
                        var data_responsive = href; //  "img/4-375.jpg 375, img/4-480.jpg 480, img/4.jpg 800";
                        var data_src = href;
                        var data_sub_html = "<h4>" + item.RelativePath + "</h4><p> </p>";
                        $ulElem.append('<li class="" data-responsive="' + data_responsive + '"  data-sub-html="' + data_sub_html + '" ><button onclick="btnSearchAlbum(this)" data-responsive="' + data_responsive + '" >' + data_responsive + '</button></li>');
                    });
                    cb(items.TotalRecordCount + ' found');
                }
            });
        }
    };
    lg.prototype.lgClearTagList = function (selector) {
        var $ulElem = $(selector);
        if ($ulElem) {
            $ulElem.empty();
        }
    };
    lg.prototype.lgFillTagList = function (selector, tagid, cb) {
        var $ulElem = $(selector);
        if ($ulElem) {
            $ulElem.empty();
            $.getJSON("/taglist?tagid=" + tagid, function (data) {
                var items = data.json;
                if (items.error) {
                    cb(items.error);
                }
                else {
                    var nr = 0;
                    $.each(items.Tags, function (index, item) {
                        var href = item.id;
                        nr++;
                        var data_responsive = href; //  "img/4-375.jpg 375, img/4-480.jpg 480, img/4.jpg 800";
                        var data_src = href;
                        var data_sub_html = "<h4>" + item.name + "</h4><p> </p>";
                        $ulElem.append('<li class="" data-responsive="' + data_responsive + '"  data-sub-html="' + data_sub_html + '" >' +
                            '<button onclick="btnSearchTag_Click(this)" data-responsive="' + data_responsive + '" >' + item.name + '</button>' +
                            '<button onclick="btnShowTag_Click(this)" data-responsive="' + data_responsive + '" >#' + item.name + '</button></li>');
                    });
                    cb(items.TotalRecordCount + ' found');
                }
            });
        }
    };
    lg.prototype.lgFillTag = function (selector, tagid, cb) {
        var $ulElem = $(selector);
        if ($ulElem) {
            $ulElem.empty();
            ;
            $.getJSON("/tag?tagid=" + tagid, function (data) {
                var items = data.json;
                if (items.error) {
                    cb(items.error);
                }
                else {
                    var nr = 0;
                    $.each(items.Photos, function (index, item) {
                        var thumb_name = "/thumb" + item.Image.replace(/ /gi, "%20");
                        var img_name = "/photo" + item.Image.replace(/ /gi, "%20");
                        nr++;
                        var data_responsive = thumb_name;
                        var data_src = img_name;
                        var data_sub_html = "<h4>" + item.Image + "</h4>"; // <p></p>";
                        var src = thumb_name;
                        $ulElem.append('<li class="" data-responsive="' + data_responsive + '" data-src="' + data_src + '" data-sub-html="' + data_sub_html + '"><a href=""><img class="img-responsive" src="' + src + '"></a></li>');
                    });
                    cb(items.TotalRecordCount + ' found');
                }
            });
        }
    };
    return lg;
}());
//# sourceMappingURL=lg.js.map