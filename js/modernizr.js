window.Modernizr = function(e, t, n) {
        function r(e) {
            m.cssText = e
        }

        function o(e, t) {
            return r(prefixes.join(e + ";") + (t || ""))
        }

        function a(e, t) {
            return typeof e === t
        }

        function i(e, t) {
            return !!~("" + e).indexOf(t)
        }

        function c(e, t, r) {
            for (var o in e) {
                var i = t[e[o]];
                if (i !== n) return !1 === r ? e[o] : a(i, "function") ? i.bind(r || t) : i
            }
            return !1
        }
        var l, s, u, f = {},
            d = t.documentElement,
            p = "modernizr",
            h = t.createElement(p),
            m = h.style,
            v = {},
            y = [],
            g = y.slice,
            $ = {}.hasOwnProperty;
        for (var E in u = a($, "undefined") || a($.call, "undefined") ? function(e, t) {
                return t in e && a(e.constructor.prototype[t], "undefined")
            } : function(e, t) {
                return $.call(e, t)
            }, Function.prototype.bind || (Function.prototype.bind = function(e) {
                var t = this;
                if ("function" != typeof t) throw TypeError();
                var n = g.call(arguments, 1),
                    r = function() {
                        if (this instanceof r) {
                            var o = function() {};
                            o.prototype = t.prototype;
                            var a = new o,
                                i = t.apply(a, n.concat(g.call(arguments)));
                            return Object(i) === i ? i : a
                        }
                        return t.apply(e, n.concat(g.call(arguments)))
                    };
                return r
            }), v) u(v, E) && (f[s = E.toLowerCase()] = v[E](), y.push((f[s] ? "" : "no-") + s));
        return f.addTest = function(e, t) {
                if ("object" == typeof e)
                    for (var r in e) u(e, r) && f.addTest(r, e[r]);
                else {
                    if (f[e = e.toLowerCase()] !== n) return f;
                    t = "function" == typeof t ? t() : t, d.className += " " + (t ? "" : "no-") + e, f[e] = t
                }
                return f
            }, r(""), h = l = null,
            function(e, t) {
                function n() {
                    var e = h.elements;
                    return "string" == typeof e ? e.split(" ") : e
                }

                function r(e) {
                    var t = p[e[f]];
                    return t || (t = {}, d++, e[f] = d, p[d] = t), t
                }

                function o(e, n, o) {
                    var a;
                    return (n || (n = t), c) ? n.createElement(e) : (o || (o = r(n)), !(a = o.cache[e] ? o.cache[e].cloneNode() : u.test(e) ? (o.cache[e] = o.createElem(e)).cloneNode() : o.createElem(e)).canHaveChildren || s.test(e) || a.tagUrn ? a : o.frag.appendChild(a))
                }

                function a(e) {
                    e || (e = t);
                    var a, l, s, u, f, d = r(e);
                    return !h.shivCSS || i || d.hasCSS || (d.hasCSS = (l = (a = e).createElement("p"), s = a.getElementsByTagName("head")[0] || a.documentElement, l.innerHTML = "x<style>article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}</style>", !!s.insertBefore(l.lastChild, s.firstChild))), c || (u = e, (f = d).cache || (f.cache = {}, f.createElem = u.createElement, f.createFrag = u.createDocumentFragment, f.frag = f.createFrag()), u.createElement = function(e) {
                        return h.shivMethods ? o(e, u, f) : f.createElem(e)
                    }, u.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/[\w\-]+/g, function(e) {
                        return f.createElem(e), f.frag.createElement(e), 'c("' + e + '")'
                    }) + ");return n}")(h, f.frag)), e
                }
                var i, c, l = e.html5 || {},
                    s = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    u = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    f = "_html5shiv",
                    d = 0,
                    p = {};
                (function() {
                    try {
                        var e, n = t.createElement("a");
                        n.innerHTML = "<xyz></xyz>", i = "hidden" in n, c = 1 == n.childNodes.length || (t.createElement("a"), e = t.createDocumentFragment(), void 0 === e.cloneNode || void 0 === e.createDocumentFragment || void 0 === e.createElement)
                    } catch (r) {
                        i = !0, c = !0
                    }
                })();
                var h = {
                    elements: l.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: "3.7.0",
                    shivCSS: !1 !== l.shivCSS,
                    supportsUnknownElements: c,
                    shivMethods: !1 !== l.shivMethods,
                    type: "default",
                    shivDocument: a,
                    createElement: o,
                    createDocumentFragment: function e(o, a) {
                        if (o || (o = t), c) return o.createDocumentFragment();
                        for (var i = (a = a || r(o)).frag.cloneNode(), l = 0, s = n(), u = s.length; l < u; l++) i.createElement(s[l]);
                        return i
                    }
                };
                e.html5 = h, a(t)
            }(this, t), f._version = "2.8.3", d.className = d.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + y.join(" "), f
    }(this, this.document),
    function(e, t, n) {
        function r(e) {
            return "[object Function]" == m.call(e)
        }

        function o(e) {
            return "string" == typeof e
        }

        function a() {}

        function i(e) {
            return !e || "loaded" == e || "complete" == e || "uninitialized" == e
        }

        function c() {
            var e = v.shift();
            y = 1, e ? e.t ? p(function() {
                ("c" == e.t ? f.injectCss : f.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
            }, 0) : (e(), c()) : y = 0
        }

        function l(e, n, r, a, l) {
            return y = 0, n = n || "j", o(e) ? function e(n, r, o, a, l, s, u) {
                function d(e) {
                    if (!g && i(m.readyState) && (S.r = g = 1, y || c(), m.onload = m.onreadystatechange = null, e))
                        for (var t in "img" != n && p(function() {
                                E.removeChild(m)
                            }, 50), j[r]) j[r].hasOwnProperty(t) && j[r][t].onload()
                }
                var u = u || f.errorTimeout,
                    m = t.createElement(n),
                    g = 0,
                    b = 0,
                    S = {
                        t: o,
                        s: r,
                        e: l,
                        a: s,
                        x: u
                    };
                1 === j[r] && (b = 1, j[r] = []), "object" == n ? m.data = r : (m.src = r, m.type = n), m.width = m.height = "0", m.onerror = m.onload = m.onreadystatechange = function() {
                    d.call(this, b)
                }, v.splice(a, 0, S), "img" != n && (b || 2 === j[r] ? (E.insertBefore(m, $ ? null : h), p(d, u)) : j[r].push(m))
            }("c" == n ? S : b, e, n, this.i++, r, a, l) : (v.splice(this.i++, 0, e), 1 == v.length && c()), this
        }

        function s() {
            var e = f;
            return e.loader = {
                load: l,
                i: 0
            }, e
        }
        var u, f, d = t.documentElement,
            p = e.setTimeout,
            h = t.getElementsByTagName("script")[0],
            m = {}.toString,
            v = [],
            y = 0,
            g = "MozAppearance" in d.style,
            $ = g && !!t.createRange().compareNode,
            E = $ ? d : h.parentNode,
            d = e.opera && "[object Opera]" == m.call(e.opera),
            d = !!t.attachEvent && !d,
            b = g ? "object" : d ? "script" : "img",
            S = d ? "script" : b,
            _ = Array.isArray || function(e) {
                return "[object Array]" == m.call(e)
            },
            C = [],
            j = {},
            N = {
                timeout: function(e, t) {
                    return t.length && (e.timeout = t[0]), e
                }
            };
        (f = function(e) {
            function t(e, t, n, o, a) {
                var i = function e(t) {
                        var n, r, o, t = t.split("!"),
                            a = C.length,
                            i = t.pop(),
                            c = t.length,
                            i = {
                                url: i,
                                origUrl: i,
                                prefixes: t
                            };
                        for (r = 0; r < c; r++)(n = N[(o = t[r].split("=")).shift()]) && (i = n(i, o));
                        for (r = 0; r < a; r++) i = C[r](i);
                        return i
                    }(e),
                    c = i.autoCallback;
                i.url.split(".").pop().split("?").shift(), i.bypass || (t && (t = r(t) ? t : t[e] || t[o] || t[e.split("/").pop().split("?")[0]]), i.instead ? i.instead(e, t, n, o, a) : (j[i.url] ? i.noexec = !0 : j[i.url] = 1, n.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : void 0, i.noexec, i.attrs, i.timeout), (r(t) || r(c)) && n.load(function() {
                    s(), t && t(i.origUrl, a, o), c && c(i.origUrl, a, o), j[i.url] = 2
                })))
            }

            function n(e, n) {
                function i(e, a) {
                    if (e) {
                        if (o(e)) a || (f = function() {
                            var e = [].slice.call(arguments);
                            d.apply(this, e), p()
                        }), t(e, f, n, 0, s);
                        else if (Object(e) === e)
                            for (l in c = function() {
                                    var t, n = 0;
                                    for (t in e) e.hasOwnProperty(t) && n++;
                                    return n
                                }(), e) e.hasOwnProperty(l) && (a || --c || (r(f) ? f = function() {
                                var e = [].slice.call(arguments);
                                d.apply(this, e), p()
                            } : f[l] = function(e) {
                                return function() {
                                    var t = [].slice.call(arguments);
                                    e && e.apply(this, t), p()
                                }
                            }(d[l])), t(e[l], f, n, l, s))
                    } else a || p()
                }
                var c, l, s = !!e.test,
                    u = e.load || e.both,
                    f = e.callback || a,
                    d = f,
                    p = e.complete || a;
                i(s ? e.yep : e.nope, !!u), u && i(u)
            }
            var i, c, l = this.yepnope.loader;
            if (o(e)) t(e, 0, l, 0);
            else if (_(e))
                for (i = 0; i < e.length; i++) o(c = e[i]) ? t(c, 0, l, 0) : _(c) ? f(c) : Object(c) === c && n(c, l);
            else Object(e) === e && n(e, l)
        }).addPrefix = function(e, t) {
            N[e] = t
        }, f.addFilter = function(e) {
            C.push(e)
        }, f.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", u = function() {
            t.removeEventListener("DOMContentLoaded", u, 0), t.readyState = "complete"
        }, 0)), e.yepnope = s(), e.yepnope.executeStack = c, e.yepnope.injectJs = function(e, n, r, o, l, s) {
            var u, d, m = t.createElement("script"),
                o = o || f.errorTimeout;
            for (d in m.src = e, r) m.setAttribute(d, r[d]);
            n = s ? c : n || a, m.onreadystatechange = m.onload = function() {
                !u && i(m.readyState) && (u = 1, n(), m.onload = m.onreadystatechange = null)
            }, p(function() {
                u || (u = 1, n(1))
            }, o), l ? m.onload() : h.parentNode.insertBefore(m, h)
        }, e.yepnope.injectCss = function(e, n, r, o, i, l) {
            var s, o = t.createElement("link"),
                n = l ? c : n || a;
            for (s in o.href = e, o.rel = "stylesheet", o.type = "text/css", r) o.setAttribute(s, r[s]);
            i || (h.parentNode.insertBefore(o, h), p(n, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    };