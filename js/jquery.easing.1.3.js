jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(n, e, u, t, r) {
        return jQuery.easing[jQuery.easing.def](n, e, u, t, r)
    },
    easeInQuad: function(n, e, u, t, r) {
        return t * (e /= r) * e + u
    },
    easeOutQuad: function(n, e, u, t, r) {
        return -t * (e /= r) * (e - 2) + u
    },
    easeInOutQuad: function(n, e, u, t, r) {
        return (e /= r / 2) < 1 ? t / 2 * e * e + u : -t / 2 * (--e * (e - 2) - 1) + u
    },
    easeInCubic: function(n, e, u, t, r) {
        return t * (e /= r) * e * e + u
    },
    easeOutCubic: function(n, e, u, t, r) {
        return t * ((e = e / r - 1) * e * e + 1) + u
    },
    easeInOutCubic: function(n, e, u, t, r) {
        return (e /= r / 2) < 1 ? t / 2 * e * e * e + u : t / 2 * ((e -= 2) * e * e + 2) + u
    },
    easeInQuart: function(n, e, u, t, r) {
        return t * (e /= r) * e * e * e + u
    },
    easeOutQuart: function(n, e, u, t, r) {
        return -t * ((e = e / r - 1) * e * e * e - 1) + u
    },
    easeInOutQuart: function(n, e, u, t, r) {
        return (e /= r / 2) < 1 ? t / 2 * e * e * e * e + u : -t / 2 * ((e -= 2) * e * e * e - 2) + u
    },
    easeInQuint: function(n, e, u, t, r) {
        return t * (e /= r) * e * e * e * e + u
    },
    easeOutQuint: function(n, e, u, t, r) {
        return t * ((e = e / r - 1) * e * e * e * e + 1) + u
    },
    easeInOutQuint: function(n, e, u, t, r) {
        return (e /= r / 2) < 1 ? t / 2 * e * e * e * e * e + u : t / 2 * ((e -= 2) * e * e * e * e + 2) + u
    },
    easeInSine: function(n, e, u, t, r) {
        return -t * Math.cos(e / r * (Math.PI / 2)) + t + u
    },
    easeOutSine: function(n, e, u, t, r) {
        return t * Math.sin(e / r * (Math.PI / 2)) + u
    },
    easeInOutSine: function(n, e, u, t, r) {
        return -t / 2 * (Math.cos(Math.PI * e / r) - 1) + u
    },
    easeInExpo: function(n, e, u, t, r) {
        return 0 == e ? u : t * Math.pow(2, 10 * (e / r - 1)) + u
    },
    easeOutExpo: function(n, e, u, t, r) {
        return e == r ? u + t : t * (-Math.pow(2, -10 * e / r) + 1) + u
    },
    easeInOutExpo: function(n, e, u, t, r) {
        return 0 == e ? u : e == r ? u + t : (e /= r / 2) < 1 ? t / 2 * Math.pow(2, 10 * (e - 1)) + u : t / 2 * (-Math.pow(2, -10 * --e) + 2) + u
    },
    easeInCirc: function(n, e, u, t, r) {
        return -t * (Math.sqrt(1 - (e /= r) * e) - 1) + u
    },
    easeOutCirc: function(n, e, u, t, r) {
        return t * Math.sqrt(1 - (e = e / r - 1) * e) + u
    },
    easeInOutCirc: function(n, e, u, t, r) {
        return (e /= r / 2) < 1 ? -t / 2 * (Math.sqrt(1 - e * e) - 1) + u : t / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + u
    },
    easeInElastic: function(n, e, u, t, r) {
        var i = 1.70158,
            a = 0,
            s = t;
        if (0 == e) return u;
        if (1 == (e /= r)) return u + t;
        if (a || (a = .3 * r), s < Math.abs(t)) {
            s = t;
            var i = a / 4
        } else var i = a / (2 * Math.PI) * Math.asin(t / s);
        return -(s * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * r - i) * (2 * Math.PI) / a)) + u
    },
    easeOutElastic: function(n, e, u, t, r) {
        var i = 1.70158,
            a = 0,
            s = t;
        if (0 == e) return u;
        if (1 == (e /= r)) return u + t;
        if (a || (a = .3 * r), s < Math.abs(t)) {
            s = t;
            var i = a / 4
        } else var i = a / (2 * Math.PI) * Math.asin(t / s);
        return s * Math.pow(2, -10 * e) * Math.sin((e * r - i) * (2 * Math.PI) / a) + t + u
    },
    easeInOutElastic: function(n, e, u, t, r) {
        var i = 1.70158,
            a = 0,
            s = t;
        if (0 == e) return u;
        if (2 == (e /= r / 2)) return u + t;
        if (a || (a = r * (.3 * 1.5)), s < Math.abs(t)) {
            s = t;
            var i = a / 4
        } else var i = a / (2 * Math.PI) * Math.asin(t / s);
        return e < 1 ? -.5 * (s * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * r - i) * (2 * Math.PI) / a)) + u : s * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * r - i) * (2 * Math.PI) / a) * .5 + t + u
    },
    easeInBack: function(n, e, u, t, r, i) {
        return void 0 == i && (i = 1.70158), t * (e /= r) * e * ((i + 1) * e - i) + u
    },
    easeOutBack: function(n, e, u, t, r, i) {
        return void 0 == i && (i = 1.70158), t * ((e = e / r - 1) * e * ((i + 1) * e + i) + 1) + u
    },
    easeInOutBack: function(n, e, u, t, r, i) {
        return (void 0 == i && (i = 1.70158), (e /= r / 2) < 1) ? t / 2 * (e * e * (((i *= 1.525) + 1) * e - i)) + u : t / 2 * ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) + u
    },
    easeInBounce: function(n, e, u, t, r) {
        return t - jQuery.easing.easeOutBounce(n, r - e, 0, t, r) + u
    },
    easeOutBounce: function(n, e, u, t, r) {
        return (e /= r) < 1 / 2.75 ? t * (7.5625 * e * e) + u : e < 2 / 2.75 ? t * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + u : e < 2.5 / 2.75 ? t * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + u : t * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + u
    },
    easeInOutBounce: function(n, e, u, t, r) {
        return e < r / 2 ? .5 * jQuery.easing.easeInBounce(n, 2 * e, 0, t, r) + u : .5 * jQuery.easing.easeOutBounce(n, 2 * e - r, 0, t, r) + .5 * t + u
    }
});