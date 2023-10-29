! function(e) {
    var r = [],
        t = !1,
        n = !1,
        a = {
            interval: 250,
            force_process: !1
        },
        i = e(window),
        p = [];

    function f(r) {
        return e(r).filter(function() {
            return e(this).is(":appeared")
        })
    }

    function o() {
        n = !1;
        for (var e = 0, t = r.length; e < t; e++) {
            var a = f(r[e]);
            if (a.trigger("appear", [a]), p[e]) {
                var i = p[e].not(a);
                i.trigger("disappear", [i])
            }
            p[e] = a
        }
    }
    e.expr.pseudos.appeared = e.expr.createPseudo(function(r) {
        return function(r) {
            var t = e(r);
            if (!t.is(":visible")) return !1;
            var n = i.scrollLeft(),
                a = i.scrollTop(),
                p = t.offset(),
                f = p.left,
                o = p.top;
            return !!(o + t.height() >= a && o - (t.data("appear-top-offset") || 0) <= a + i.height() && f + t.width() >= n && f - (t.data("appear-left-offset") || 0) <= n + i.width())
        }
    }), e.fn.extend({
        appear: function(r, t) {
            return e.appear(this, t), this
        }
    }), e.extend({
        appear: function(i, f) {
            var s, u = e.extend({}, a, f || {});
            if (!t) {
                var c = function() {
                    !n && (n = !0, setTimeout(o, u.interval))
                };
                e(window).scroll(c).resize(c), t = !0
            }
            u.force_process && setTimeout(o, u.interval), s = i, r.push(s), p.push()
        },
        force_appear: function() {
            return !!t && (o(), !0)
        }
    })
}("undefined" != typeof module ? require("jquery") : jQuery);