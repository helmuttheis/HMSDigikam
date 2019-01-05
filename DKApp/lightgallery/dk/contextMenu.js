document.addEventListener("click", function () {
    "use strict";
    var contextMenuClassName = "context-menu";
    var contextMenuItemClassName = "context-menu__item";
    var contextMenuLinkClassName = "context-menu__link";
    var contextMenuActive = "context-menu--active";
    var contextMenuDropdownClassName = "dropdown";
    var imageClassName = "image";
    var imageInContext;
    var images = document.querySelectorAll(imageClassName);
    var menu = document.querySelector("#context-menu");
    var menuItems = menu.querySelectorAll(".context-menu__item");
    var menuState = 0;
    var menuWidth;
    var menuHeight;
    var menuPosition;
    var menuPositionX;
    var menuPositionY;
    var clickCoords;
    var clickCoordsX;
    var clickCoordsY;
    var windowWidth;
    var windowHeight;
    function init() {
        contextListener();
        clickListener();
        keyupListener();
        resizeListener();
    }
    function clickInsideElement(e, className) {
        var el = e.srcElement || e.target;
        if (el.classList.contains(className)) {
            return el;
        }
        else {
            while (el = el.parentNode) {
                if (el.classList && el.classList.contains(className)) {
                    return el;
                }
            }
        }
        return false;
    }
    function contextListener() {
        document.addEventListener("contextmenu", function (e) {
            imageInContext = clickInsideElement(e, imageClassName);
            if (clickInsideElement(e, imageClassName)) {
                e.preventDefault();
                toggleMenuOn();
                positionMenu(e);
            }
            else {
                imageInContext = null;
                toggleMenuOff();
            }
        });
    }
    function clickListener() {
        document.addEventListener("click", function (e) {
            var clickElemIsLink = clickInsideElement(e, contextMenuLinkClassName);
            var clickElemIsDropdown = clickInsideElement(e, contextMenuDropdownClassName);
            if (clickElemIsLink && !clickElemIsDropdown) {
                e.preventDefault();
                menuItemListener(clickElemIsLink);
            }
            else if (clickElemIsDropdown) {
                e.preventDefault();
            }
            else {
                var button = e.which || e.button;
                if (button === 1) {
                    toggleMenuOff();
                }
            }
        });
    }
    function keyupListener() {
        window.onkeyup = function (e) {
            if (e.keyCode === 27) {
                toggleMenuOff();
            }
        };
    }
    function menuItemListener(link) {
        console.log("Task ID - " +
            imageInContext.getAttribute("data-id") +
            ", Task action - " + link.getAttribute("data-action"));
        //$.post();
        toggleMenuOff();
    }
    function getPosition(e) {
        var posx = 0;
        var posy = 0;
        if (!e)
            e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }
        return {
            x: posx,
            y: posy
        };
    }
    function resizeListener() {
        window.onresize = function (e) {
            toggleMenuOff();
        };
    }
    function positionMenu(e) {
        clickCoords = getPosition(e);
        clickCoordsX = clickCoords.x;
        clickCoordsY = clickCoords.y;
        menuWidth = menu.offsetWidth + 4;
        menuHeight = menu.offsetHeight + 4;
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        if ((windowWidth - clickCoordsX) < menuWidth) {
            menu.style.left = windowWidth - menuWidth + "px";
        }
        else {
            menu.style.left = clickCoordsX + "px";
        }
        if ((windowHeight - clickCoordsY) < menuHeight) {
            menu.style.top = windowHeight - menuHeight + "px";
        }
        else {
            menu.style.top = clickCoordsY + "px";
        }
    }
    function toggleMenuOn() {
        if (menuState !== 1) {
            menuState = 1;
            menu.classList.add(contextMenuActive);
        }
    }
    function toggleMenuOff() {
        if (menuState !== 0) {
            menuState = 0;
            menu.classList.remove(contextMenuActive);
        }
    }
    init();
});
//# sourceMappingURL=contextMenu.js.map