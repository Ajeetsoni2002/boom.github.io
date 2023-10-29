! function(e) {
    e.fn.skillBars = function(t) {
        var a = e.extend({
            from: 0,
            to: !1,
            speed: 1e3,
            interval: 100,
            decimals: 0,
            onUpdate: null,
            onComplete: null,
            classes: {
                skillBarBar: ".skillbar-bar",
                skillBarPercent: ".skill-bar-percent"
            }
        }, t);
        return this.each(function() {
            var t = e(this),
                l = !1 != a.to ? a.to : parseInt(t.attr("data-percent"));
            l > 100 && (l = 100);
            var n = a.from,
                r = Math.ceil(a.speed / a.interval),
                i = (l - n) / r,
                s = 0,
                o = setInterval(function c() {
                    n += i, s++, e(t).find(a.classes.skillBarPercent).text(n.toFixed(a.decimals) + "%"), "function" == typeof a.onUpdate && a.onUpdate.call(t, n), s >= r && (clearInterval(o), n = l, "function" == typeof a.onComplete && a.onComplete.call(t, n))
                }, a.interval);
            t.find(a.classes.skillBarBar).animate({
                width: parseInt(t.attr("data-percent")) + "%"
            }, a.speed)
        })
    }
}(jQuery);