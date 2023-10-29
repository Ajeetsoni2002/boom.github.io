function bindEvent(e, n, t) {
    e.addEventListener ? e.addEventListener(n, t, !1) : e.attachEvent && e.attachEvent("on" + n, t)
}! function() {
    var e = document.body,
        n = document.getElementById("open-button"),
        t = document.getElementById("close-button"),
        d = !1;

    function o() {
        d ? (classie.remove(e, "show-menu"), $(".full-width-pull-menu").length && (classie.remove(e, "overflow-hidden"), classie.remove(e, "position-fixed"))) : (classie.add(e, "show-menu"), $(".full-width-pull-menu").length && (classie.add(e, "overflow-hidden"), classie.add(e, "position-fixed"))), d = !d
    }
    n && bindEvent(n, "click", o), t && bindEvent(t, "click", o)
}();