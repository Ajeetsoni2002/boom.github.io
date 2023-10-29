 ! function(t, e) {
     "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "jquery"], e) : e((t = t || self).bootstrap = {}, t.jQuery)
 }(this, function(t, e) {
     "use strict";

     function n(t, e) {
         for (var n = 0; n < e.length; n++) {
             var i = e[n];
             i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
         }
     }

     function i(t, e, i) {
         return e && n(t.prototype, e), i && n(t, i), t
     }

     function r(t, e, n) {
         return e in t ? Object.defineProperty(t, e, {
             value: n,
             enumerable: !0,
             configurable: !0,
             writable: !0
         }) : t[e] = n, t
     }

     function o(t) {
         for (var e = 1; e < arguments.length; e++) {
             var n = null != arguments[e] ? arguments[e] : {},
                 i = Object.keys(n);
             "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function(t) {
                 return Object.getOwnPropertyDescriptor(n, t).enumerable
             }))), i.forEach(function(e) {
                 r(t, e, n[e])
             })
         }
         return t
     }
     e = e && e.hasOwnProperty("default") ? e.default : e;
     var s = "transitionend";

     function a(t) {
         return ({}).toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase()
     }
     var l = {
         TRANSITION_END: "bsTransitionEnd",
         getUID: function t(e) {
             do e += ~~(1e6 * Math.random()); while (document.getElementById(e));
             return e
         },
         getSelectorFromElement: function t(e) {
             var n = e.getAttribute("data-target");
             if (!n || "#" === n) {
                 var i = e.getAttribute("href");
                 n = i && "#" !== i ? i.trim() : ""
             }
             try {
                 return document.querySelector(n) ? n : null
             } catch (r) {
                 return null
             }
         },
         getTransitionDurationFromElement: function t(n) {
             if (!n) return 0;
             var i = e(n).css("transition-duration"),
                 r = e(n).css("transition-delay"),
                 o = parseFloat(i),
                 s = parseFloat(r);
             return o || s ? (i = i.split(",")[0], r = r.split(",")[0], (parseFloat(i) + parseFloat(r)) * 1e3) : 0
         },
         reflow: function t(e) {
             return e.offsetHeight
         },
         triggerTransitionEnd: function t(n) {
             e(n).trigger(s)
         },
         supportsTransitionEnd: function t() {
             return Boolean(s)
         },
         isElement: function t(e) {
             return (e[0] || e).nodeType
         },
         typeCheckConfig: function t(e, n, i) {
             for (var r in i)
                 if (Object.prototype.hasOwnProperty.call(i, r)) {
                     var o = i[r],
                         s = n[r],
                         c = s && l.isElement(s) ? "element" : a(s);
                     if (!RegExp(o).test(c)) throw Error(e.toUpperCase() + ": " + ('Option "' + r + '" provided type "') + c + '" but expected type "' + o + '".')
                 }
         },
         findShadowRoot: function t(e) {
             if (!document.documentElement.attachShadow) return null;
             if ("function" == typeof e.getRootNode) {
                 var n = e.getRootNode();
                 return n instanceof ShadowRoot ? n : null
             }
             return e instanceof ShadowRoot ? e : e.parentNode ? l.findShadowRoot(e.parentNode) : null
         }
     };
     e.fn.emulateTransitionEnd = function t(n) {
         var i = this,
             r = !1;
         return e(this).one(l.TRANSITION_END, function() {
             r = !0
         }), setTimeout(function() {
             r || l.triggerTransitionEnd(i)
         }, n), this
     }, e.event.special[l.TRANSITION_END] = {
         bindType: s,
         delegateType: s,
         handle: function t(n) {
             if (e(n.target).is(this)) return n.handleObj.handler.apply(this, arguments)
         }
     };
     var c = "alert",
         h = "bs.alert",
         f = "." + h,
         u = e.fn[c],
         d = {
             CLOSE: "close" + f,
             CLOSED: "closed" + f,
             CLICK_DATA_API: "click" + f + ".data-api"
         },
         p = {
             ALERT: "alert",
             FADE: "fade",
             SHOW: "show"
         },
         g = function() {
             function t(t) {
                 this._element = t
             }
             var n = t.prototype;
             return n.close = function t(e) {
                 var n = this._element;
                 e && (n = this._getRootElement(e)), !this._triggerCloseEvent(n).isDefaultPrevented() && this._removeElement(n)
             }, n.dispose = function t() {
                 e.removeData(this._element, h), this._element = null
             }, n._getRootElement = function t(n) {
                 var i = l.getSelectorFromElement(n),
                     r = !1;
                 return i && (r = document.querySelector(i)), r || (r = e(n).closest("." + p.ALERT)[0]), r
             }, n._triggerCloseEvent = function t(n) {
                 var i = e.Event(d.CLOSE);
                 return e(n).trigger(i), i
             }, n._removeElement = function t(n) {
                 var i = this;
                 if (e(n).removeClass(p.SHOW), !e(n).hasClass(p.FADE)) {
                     this._destroyElement(n);
                     return
                 }
                 var r = l.getTransitionDurationFromElement(n);
                 e(n).one(l.TRANSITION_END, function(t) {
                     return i._destroyElement(n, t)
                 }).emulateTransitionEnd(r)
             }, n._destroyElement = function t(n) {
                 e(n).detach().trigger(d.CLOSED).remove()
             }, t._jQueryInterface = function n(i) {
                 return this.each(function() {
                     var n = e(this),
                         r = n.data(h);
                     r || (r = new t(this), n.data(h, r)), "close" === i && r[i](this)
                 })
             }, t._handleDismiss = function t(e) {
                 return function(t) {
                     t && t.preventDefault(), e.close(this)
                 }
             }, i(t, null, [{
                 key: "VERSION",
                 get: function t() {
                     return "4.3.1"
                 }
             }]), t
         }();
     e(document).on(d.CLICK_DATA_API, '[data-dismiss="alert"]', g._handleDismiss(new g)), e.fn[c] = g._jQueryInterface, e.fn[c].Constructor = g, e.fn[c].noConflict = function() {
         return e.fn[c] = u, g._jQueryInterface
     };
     var m = "button",
         v = "bs.button",
         E = "." + v,
         T = ".data-api",
         S = e.fn[m],
         y = {
             ACTIVE: "active",
             BUTTON: "btn",
             FOCUS: "focus"
         },
         I = {
             DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
             DATA_TOGGLE: '[data-toggle="buttons"]',
             INPUT: 'input:not([type="hidden"])',
             ACTIVE: ".active",
             BUTTON: ".btn"
         },
         C = {
             CLICK_DATA_API: "click" + E + T,
             FOCUS_BLUR_DATA_API: "focus" + E + T + " blur" + E + T
         },
         A = function() {
             function t(t) {
                 this._element = t
             }
             var n = t.prototype;
             return n.toggle = function t() {
                 var n = !0,
                     i = !0,
                     r = e(this._element).closest(I.DATA_TOGGLE)[0];
                 if (r) {
                     var o = this._element.querySelector(I.INPUT);
                     if (o) {
                         if ("radio" === o.type) {
                             if (o.checked && this._element.classList.contains(y.ACTIVE)) n = !1;
                             else {
                                 var s = r.querySelector(I.ACTIVE);
                                 s && e(s).removeClass(y.ACTIVE)
                             }
                         }
                         if (n) {
                             if (o.hasAttribute("disabled") || r.hasAttribute("disabled") || o.classList.contains("disabled") || r.classList.contains("disabled")) return;
                             o.checked = !this._element.classList.contains(y.ACTIVE), e(o).trigger("change")
                         }
                         o.focus(), i = !1
                     }
                 }
                 i && this._element.setAttribute("aria-pressed", !this._element.classList.contains(y.ACTIVE)), n && e(this._element).toggleClass(y.ACTIVE)
             }, n.dispose = function t() {
                 e.removeData(this._element, v), this._element = null
             }, t._jQueryInterface = function n(i) {
                 return this.each(function() {
                     var n = e(this).data(v);
                     n || (n = new t(this), e(this).data(v, n)), "toggle" === i && n[i]()
                 })
             }, i(t, null, [{
                 key: "VERSION",
                 get: function t() {
                     return "4.3.1"
                 }
             }]), t
         }();
     e(document).on(C.CLICK_DATA_API, I.DATA_TOGGLE_CARROT, function(t) {
         t.preventDefault();
         var n = t.target;
         e(n).hasClass(y.BUTTON) || (n = e(n).closest(I.BUTTON)), A._jQueryInterface.call(e(n), "toggle")
     }).on(C.FOCUS_BLUR_DATA_API, I.DATA_TOGGLE_CARROT, function(t) {
         var n = e(t.target).closest(I.BUTTON)[0];
         e(n).toggleClass(y.FOCUS, /^focus(in)?$/.test(t.type))
     }), e.fn[m] = A._jQueryInterface, e.fn[m].Constructor = A, e.fn[m].noConflict = function() {
         return e.fn[m] = S, A._jQueryInterface
     };
     var O = "carousel",
         D = "bs.carousel",
         b = "." + D,
         N = ".data-api",
         $ = e.fn[O],
         w = {
             interval: 5e3,
             keyboard: !0,
             slide: !1,
             pause: "hover",
             wrap: !0,
             touch: !0
         },
         L = {
             interval: "(number|boolean)",
             keyboard: "boolean",
             slide: "(boolean|string)",
             pause: "(string|boolean)",
             wrap: "boolean",
             touch: "boolean"
         },
         P = {
             NEXT: "next",
             PREV: "prev",
             LEFT: "left",
             RIGHT: "right"
         },
         H = {
             SLIDE: "slide" + b,
             SLID: "slid" + b,
             KEYDOWN: "keydown" + b,
             MOUSEENTER: "mouseenter" + b,
             MOUSELEAVE: "mouseleave" + b,
             TOUCHSTART: "touchstart" + b,
             TOUCHMOVE: "touchmove" + b,
             TOUCHEND: "touchend" + b,
             POINTERDOWN: "pointerdown" + b,
             POINTERUP: "pointerup" + b,
             DRAG_START: "dragstart" + b,
             LOAD_DATA_API: "load" + b + N,
             CLICK_DATA_API: "click" + b + N
         },
         _ = {
             CAROUSEL: "carousel",
             ACTIVE: "active",
             SLIDE: "slide",
             RIGHT: "carousel-item-right",
             LEFT: "carousel-item-left",
             NEXT: "carousel-item-next",
             PREV: "carousel-item-prev",
             ITEM: "carousel-item",
             POINTER_EVENT: "pointer-event"
         },
         R = {
             ACTIVE: ".active",
             ACTIVE_ITEM: ".active.carousel-item",
             ITEM: ".carousel-item",
             ITEM_IMG: ".carousel-item img",
             NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
             INDICATORS: ".carousel-indicators",
             DATA_SLIDE: "[data-slide], [data-slide-to]",
             DATA_RIDE: '[data-ride="carousel"]'
         },
         W = {
             TOUCH: "touch",
             PEN: "pen"
         },
         k = function() {
             function t(t, e) {
                 this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(R.INDICATORS), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
             }
             var n = t.prototype;
             return n.next = function t() {
                 this._isSliding || this._slide(P.NEXT)
             }, n.nextWhenVisible = function t() {
                 !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next()
             }, n.prev = function t() {
                 this._isSliding || this._slide(P.PREV)
             }, n.pause = function t(e) {
                 e || (this._isPaused = !0), this._element.querySelector(R.NEXT_PREV) && (l.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
             }, n.cycle = function t(e) {
                 e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
             }, n.to = function t(n) {
                 var i = this;
                 this._activeElement = this._element.querySelector(R.ACTIVE_ITEM);
                 var r = this._getItemIndex(this._activeElement);
                 if (!(n > this._items.length - 1) && !(n < 0)) {
                     if (this._isSliding) {
                         e(this._element).one(H.SLID, function() {
                             return i.to(n)
                         });
                         return
                     }
                     if (r === n) {
                         this.pause(), this.cycle();
                         return
                     }
                     var o = n > r ? P.NEXT : P.PREV;
                     this._slide(o, this._items[n])
                 }
             }, n.dispose = function t() {
                 e(this._element).off(b), e.removeData(this._element, D), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
             }, n._getConfig = function t(e) {
                 return e = o({}, w, e), l.typeCheckConfig(O, e, L), e
             }, n._handleSwipe = function t() {
                 var e = Math.abs(this.touchDeltaX);
                 if (!(e <= 40)) {
                     var n = e / this.touchDeltaX;
                     n > 0 && this.prev(), n < 0 && this.next()
                 }
             }, n._addEventListeners = function t() {
                 var n = this;
                 this._config.keyboard && e(this._element).on(H.KEYDOWN, function(t) {
                     return n._keydown(t)
                 }), "hover" === this._config.pause && e(this._element).on(H.MOUSEENTER, function(t) {
                     return n.pause(t)
                 }).on(H.MOUSELEAVE, function(t) {
                     return n.cycle(t)
                 }), this._config.touch && this._addTouchEventListeners()
             }, n._addTouchEventListeners = function t() {
                 var n = this;
                 if (this._touchSupported) {
                     var i = function t(e) {
                             n._pointerEvent && W[e.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = e.originalEvent.clientX : n._pointerEvent || (n.touchStartX = e.originalEvent.touches[0].clientX)
                         },
                         r = function t(e) {
                             e.originalEvent.touches && e.originalEvent.touches.length > 1 ? n.touchDeltaX = 0 : n.touchDeltaX = e.originalEvent.touches[0].clientX - n.touchStartX
                         },
                         o = function t(e) {
                             n._pointerEvent && W[e.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = e.originalEvent.clientX - n.touchStartX), n._handleSwipe(), "hover" === n._config.pause && (n.pause(), n.touchTimeout && clearTimeout(n.touchTimeout), n.touchTimeout = setTimeout(function(t) {
                                 return n.cycle(t)
                             }, 500 + n._config.interval))
                         };
                     e(this._element.querySelectorAll(R.ITEM_IMG)).on(H.DRAG_START, function(t) {
                         return t.preventDefault()
                     }), this._pointerEvent ? (e(this._element).on(H.POINTERDOWN, function(t) {
                         return i(t)
                     }), e(this._element).on(H.POINTERUP, function(t) {
                         return o(t)
                     }), this._element.classList.add(_.POINTER_EVENT)) : (e(this._element).on(H.TOUCHSTART, function(t) {
                         return i(t)
                     }), e(this._element).on(H.TOUCHMOVE, function(t) {
                         return r(t)
                     }), e(this._element).on(H.TOUCHEND, function(t) {
                         return o(t)
                     }))
                 }
             }, n._keydown = function t(e) {
                 if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {
                     case 37:
                         e.preventDefault(), this.prev();
                         break;
                     case 39:
                         e.preventDefault(), this.next()
                 }
             }, n._getItemIndex = function t(e) {
                 return this._items = e && e.parentNode ? [].slice.call(e.parentNode.querySelectorAll(R.ITEM)) : [], this._items.indexOf(e)
             }, n._getItemByDirection = function t(e, n) {
                 var i = e === P.NEXT,
                     r = e === P.PREV,
                     o = this._getItemIndex(n),
                     s = this._items.length - 1;
                 if ((r && 0 === o || i && o === s) && !this._config.wrap) return n;
                 var a = (o + (e === P.PREV ? -1 : 1)) % this._items.length;
                 return -1 === a ? this._items[this._items.length - 1] : this._items[a]
             }, n._triggerSlideEvent = function t(n, i) {
                 var r = this._getItemIndex(n),
                     o = this._getItemIndex(this._element.querySelector(R.ACTIVE_ITEM)),
                     s = e.Event(H.SLIDE, {
                         relatedTarget: n,
                         direction: i,
                         from: o,
                         to: r
                     });
                 return e(this._element).trigger(s), s
             }, n._setActiveIndicatorElement = function t(n) {
                 if (this._indicatorsElement) {
                     e([].slice.call(this._indicatorsElement.querySelectorAll(R.ACTIVE))).removeClass(_.ACTIVE);
                     var i = this._indicatorsElement.children[this._getItemIndex(n)];
                     i && e(i).addClass(_.ACTIVE)
                 }
             }, n._slide = function t(n, i) {
                 var r, o, s, a = this,
                     c = this._element.querySelector(R.ACTIVE_ITEM),
                     h = this._getItemIndex(c),
                     f = i || c && this._getItemByDirection(n, c),
                     u = this._getItemIndex(f),
                     d = Boolean(this._interval);
                 if (n === P.NEXT ? (r = _.LEFT, o = _.NEXT, s = P.LEFT) : (r = _.RIGHT, o = _.PREV, s = P.RIGHT), f && e(f).hasClass(_.ACTIVE)) {
                     this._isSliding = !1;
                     return
                 }
                 if (!this._triggerSlideEvent(f, s).isDefaultPrevented() && c && f) {
                     this._isSliding = !0, d && this.pause(), this._setActiveIndicatorElement(f);
                     var p = e.Event(H.SLID, {
                         relatedTarget: f,
                         direction: s,
                         from: h,
                         to: u
                     });
                     if (e(this._element).hasClass(_.SLIDE)) {
                         e(f).addClass(o), l.reflow(f), e(c).addClass(r), e(f).addClass(r);
                         var g = parseInt(f.getAttribute("data-interval"), 10);
                         g ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = g) : this._config.interval = this._config.defaultInterval || this._config.interval;
                         var m = l.getTransitionDurationFromElement(c);
                         e(c).one(l.TRANSITION_END, function() {
                             e(f).removeClass(r + " " + o).addClass(_.ACTIVE), e(c).removeClass(_.ACTIVE + " " + o + " " + r), a._isSliding = !1, setTimeout(function() {
                                 return e(a._element).trigger(p)
                             }, 0)
                         }).emulateTransitionEnd(m)
                     } else e(c).removeClass(_.ACTIVE), e(f).addClass(_.ACTIVE), this._isSliding = !1, e(this._element).trigger(p);
                     d && this.cycle()
                 }
             }, t._jQueryInterface = function n(i) {
                 return this.each(function() {
                     var n = e(this).data(D),
                         r = o({}, w, e(this).data());
                     "object" == typeof i && (r = o({}, r, i));
                     var s = "string" == typeof i ? i : r.slide;
                     if (n || (n = new t(this, r), e(this).data(D, n)), "number" == typeof i) n.to(i);
                     else if ("string" == typeof s) {
                         if (void 0 === n[s]) throw TypeError('No method named "' + s + '"');
                         n[s]()
                     } else r.interval && r.ride && (n.pause(), n.cycle())
                 })
             }, t._dataApiClickHandler = function n(i) {
                 var r = l.getSelectorFromElement(this);
                 if (r) {
                     var s = e(r)[0];
                     if (s && e(s).hasClass(_.CAROUSEL)) {
                         var a = o({}, e(s).data(), e(this).data()),
                             c = this.getAttribute("data-slide-to");
                         c && (a.interval = !1), t._jQueryInterface.call(e(s), a), c && e(s).data(D).to(c), i.preventDefault()
                     }
                 }
             }, i(t, null, [{
                 key: "VERSION",
                 get: function t() {
                     return "4.3.1"
                 }
             }, {
                 key: "Default",
                 get: function t() {
                     return w
                 }
             }]), t
         }();
     e(document).on(H.CLICK_DATA_API, R.DATA_SLIDE, k._dataApiClickHandler), e(window).on(H.LOAD_DATA_API, function() {
         for (var t = [].slice.call(document.querySelectorAll(R.DATA_RIDE)), n = 0, i = t.length; n < i; n++) {
             var r = e(t[n]);
             k._jQueryInterface.call(r, r.data())
         }
     }), e.fn[O] = k._jQueryInterface, e.fn[O].Constructor = k, e.fn[O].noConflict = function() {
         return e.fn[O] = $, k._jQueryInterface
     };
     var x = "collapse",
         F = "bs.collapse",
         U = "." + F,
         M = e.fn[x],
         V = {
             toggle: !0,
             parent: ""
         },
         j = {
             toggle: "boolean",
             parent: "(string|element)"
         },
         B = {
             SHOW: "show" + U,
             SHOWN: "shown" + U,
             HIDE: "hide" + U,
             HIDDEN: "hidden" + U,
             CLICK_DATA_API: "click" + U + ".data-api"
         },
         G = {
             SHOW: "show",
             COLLAPSE: "collapse",
             COLLAPSING: "collapsing",
             COLLAPSED: "collapsed"
         },
         K = {
             WIDTH: "width",
             HEIGHT: "height"
         },
         q = {
             ACTIVES: ".show, .collapsing",
             DATA_TOGGLE: '[data-toggle="collapse"]'
         },
         Q = function() {
             function t(t, e) {
                 this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                 for (var n = [].slice.call(document.querySelectorAll(q.DATA_TOGGLE)), i = 0, r = n.length; i < r; i++) {
                     var o = n[i],
                         s = l.getSelectorFromElement(o),
                         a = [].slice.call(document.querySelectorAll(s)).filter(function(e) {
                             return e === t
                         });
                     null !== s && a.length > 0 && (this._selector = s, this._triggerArray.push(o))
                 }
                 this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
             }
             var n = t.prototype;
             return n.toggle = function t() {
                 e(this._element).hasClass(G.SHOW) ? this.hide() : this.show()
             }, n.show = function n() {
                 var i, r, o = this;
                 if (!(this._isTransitioning || e(this._element).hasClass(G.SHOW) || (this._parent && 0 === (i = [].slice.call(this._parent.querySelectorAll(q.ACTIVES)).filter(function(t) {
                         return "string" == typeof o._config.parent ? t.getAttribute("data-parent") === o._config.parent : t.classList.contains(G.COLLAPSE)
                     })).length && (i = null), i && (r = e(i).not(this._selector).data(F)) && r._isTransitioning))) {
                     var s = e.Event(B.SHOW);
                     if (e(this._element).trigger(s), !s.isDefaultPrevented()) {
                         i && (t._jQueryInterface.call(e(i).not(this._selector), "hide"), r || e(i).data(F, null));
                         var a = this._getDimension();
                         e(this._element).removeClass(G.COLLAPSE).addClass(G.COLLAPSING), this._element.style[a] = 0, this._triggerArray.length && e(this._triggerArray).removeClass(G.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
                         var c = function t() {
                                 e(o._element).removeClass(G.COLLAPSING).addClass(G.COLLAPSE).addClass(G.SHOW), o._element.style[a] = "", o.setTransitioning(!1), e(o._element).trigger(B.SHOWN)
                             },
                             h = a[0].toUpperCase() + a.slice(1),
                             f = l.getTransitionDurationFromElement(this._element);
                         e(this._element).one(l.TRANSITION_END, c).emulateTransitionEnd(f), this._element.style[a] = this._element["scroll" + h] + "px"
                     }
                 }
             }, n.hide = function t() {
                 var n = this;
                 if (!this._isTransitioning && e(this._element).hasClass(G.SHOW)) {
                     var i = e.Event(B.HIDE);
                     if (e(this._element).trigger(i), !i.isDefaultPrevented()) {
                         var r = this._getDimension();
                         this._element.style[r] = this._element.getBoundingClientRect()[r] + "px", l.reflow(this._element), e(this._element).addClass(G.COLLAPSING).removeClass(G.COLLAPSE).removeClass(G.SHOW);
                         var o = this._triggerArray.length;
                         if (o > 0)
                             for (var s = 0; s < o; s++) {
                                 var a = this._triggerArray[s],
                                     c = l.getSelectorFromElement(a);
                                 null !== c && (e([].slice.call(document.querySelectorAll(c))).hasClass(G.SHOW) || e(a).addClass(G.COLLAPSED).attr("aria-expanded", !1))
                             }
                         this.setTransitioning(!0);
                         var h = function t() {
                             n.setTransitioning(!1), e(n._element).removeClass(G.COLLAPSING).addClass(G.COLLAPSE).trigger(B.HIDDEN)
                         };
                         this._element.style[r] = "";
                         var f = l.getTransitionDurationFromElement(this._element);
                         e(this._element).one(l.TRANSITION_END, h).emulateTransitionEnd(f)
                     }
                 }
             }, n.setTransitioning = function t(e) {
                 this._isTransitioning = e
             }, n.dispose = function t() {
                 e.removeData(this._element, F), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
             }, n._getConfig = function t(e) {
                 return (e = o({}, V, e)).toggle = Boolean(e.toggle), l.typeCheckConfig(x, e, j), e
             }, n._getDimension = function t() {
                 return e(this._element).hasClass(K.WIDTH) ? K.WIDTH : K.HEIGHT
             }, n._getParent = function n() {
                 var i, r = this;
                 l.isElement(this._config.parent) ? (i = this._config.parent, void 0 !== this._config.parent.jquery && (i = this._config.parent[0])) : i = document.querySelector(this._config.parent);
                 var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                 return e([].slice.call(i.querySelectorAll(o))).each(function(e, n) {
                     r._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n])
                 }), i
             }, n._addAriaAndCollapsedClass = function t(n, i) {
                 var r = e(n).hasClass(G.SHOW);
                 i.length && e(i).toggleClass(G.COLLAPSED, !r).attr("aria-expanded", r)
             }, t._getTargetFromElement = function t(e) {
                 var n = l.getSelectorFromElement(e);
                 return n ? document.querySelector(n) : null
             }, t._jQueryInterface = function n(i) {
                 return this.each(function() {
                     var n = e(this),
                         r = n.data(F),
                         s = o({}, V, n.data(), "object" == typeof i && i ? i : {});
                     if (!r && s.toggle && /show|hide/.test(i) && (s.toggle = !1), r || (r = new t(this, s), n.data(F, r)), "string" == typeof i) {
                         if (void 0 === r[i]) throw TypeError('No method named "' + i + '"');
                         r[i]()
                     }
                 })
             }, i(t, null, [{
                 key: "VERSION",
                 get: function t() {
                     return "4.3.1"
                 }
             }, {
                 key: "Default",
                 get: function t() {
                     return V
                 }
             }]), t
         }();
     e(document).on(B.CLICK_DATA_API, q.DATA_TOGGLE, function(t) {
         "A" === t.currentTarget.tagName && t.preventDefault();
         var n = e(this),
             i = l.getSelectorFromElement(this);
         e([].slice.call(document.querySelectorAll(i))).each(function() {
             var t = e(this),
                 i = t.data(F) ? "toggle" : n.data();
             Q._jQueryInterface.call(t, i)
         })
     }), e.fn[x] = Q._jQueryInterface, e.fn[x].Constructor = Q, e.fn[x].noConflict = function() {
         return e.fn[x] = M, Q._jQueryInterface
     };
     for (var Y = "undefined" != typeof window && "undefined" != typeof document, X = ["Edge", "Trident", "Firefox"], z = 0, J = 0; J < X.length; J += 1)
         if (Y && navigator.userAgent.indexOf(X[J]) >= 0) {
             z = 1;
             break
         }

     var Z = Y && window.Promise ? function t(e) {
         var n = !1;
         return function() {
             !n && (n = !0, window.Promise.resolve().then(function() {
                 n = !1, e()
             }))
         }
     } : function t(e) {
         var n = !1;
         return function() {
             n || (n = !0, setTimeout(function() {
                 n = !1, e()
             }, z))
         }
     };

     function tt(t) {
         return t && "[object Function]" === ({}).toString.call(t)
     }

     function te(t, e) {
         if (1 !== t.nodeType) return [];
         var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
         return e ? n[e] : n
     }

     function tn(t) {
         return "HTML" === t.nodeName ? t : t.parentNode || t.host
     }

     function ti(t) {
         if (!t) return document.body;
         switch (t.nodeName) {
             case "HTML":
             case "BODY":
                 return t.ownerDocument.body;
             case "#document":
                 return t.body
         }
         var e = te(t),
             n = e.overflow,
             i = e.overflowX,
             r = e.overflowY;
         return /(auto|scroll|overlay)/.test(n + r + i) ? t : ti(tn(t))
     }
     var tr = Y && !!(window.MSInputMethodContext && document.documentMode),
         to = Y && /MSIE 10/.test(navigator.userAgent);

     function ts(t) {
         return 11 === t ? tr : 10 === t ? to : tr || to
     }

     function ta(t) {
         if (!t) return document.documentElement;
         for (var e = ts(10) ? document.body : null, n = t.offsetParent || null; n === e && t.nextElementSibling;) n = (t = t.nextElementSibling).offsetParent;
         var i = n && n.nodeName;
         return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === te(n, "position") ? ta(n) : n : t ? t.ownerDocument.documentElement : document.documentElement
     }

     function tl(t) {
         return null !== t.parentNode ? tl(t.parentNode) : t
     }

     function tc(t, e) {
         if (!t || !t.nodeType || !e || !e.nodeType) return document.documentElement;
         var n, i, r = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
             o = r ? t : e,
             s = r ? e : t,
             a = document.createRange();
         a.setStart(o, 0), a.setEnd(s, 0);
         var l = a.commonAncestorContainer;
         if (t !== l && e !== l || o.contains(s)) return "BODY" !== (i = (n = l).nodeName) && ("HTML" === i || ta(n.firstElementChild) === n) ? l : ta(l);
         var c = tl(t);
         return c.host ? tc(c.host, e) : tc(t, tl(e).host)
     }

     function th(t) {
         var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
             n = "top" === e ? "scrollTop" : "scrollLeft",
             i = t.nodeName;
         if ("BODY" === i || "HTML" === i) {
             var r = t.ownerDocument.documentElement;
             return (t.ownerDocument.scrollingElement || r)[n]
         }
         return t[n]
     }

     function tf(t, e) {
         var n = "x" === e ? "Left" : "Top";
         return parseFloat(t["border" + n + "Width"], 10) + parseFloat(t["border" + ("Left" === n ? "Right" : "Bottom") + "Width"], 10)
     }

     function tu(t, e, n, i) {
         return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], ts(10) ? parseInt(n["offset" + t]) + parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0)
     }

     function td(t) {
         var e = t.body,
             n = t.documentElement,
             i = ts(10) && getComputedStyle(n);
         return {
             height: tu("Height", e, n, i),
             width: tu("Width", e, n, i)
         }
     }
     var tp = function(t, e) {
             if (!(t instanceof e)) throw TypeError("Cannot call a class as a function")
         },
         tg = function() {
             function t(t, e) {
                 for (var n = 0; n < e.length; n++) {
                     var i = e[n];
                     i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                 }
             }
             return function(e, n, i) {
                 return n && t(e.prototype, n), i && t(e, i), e
             }
         }(),
         tm = function(t, e, n) {
             return e in t ? Object.defineProperty(t, e, {
                 value: n,
                 enumerable: !0,
                 configurable: !0,
                 writable: !0
             }) : t[e] = n, t
         },
         t8 = Object.assign || function(t) {
             for (var e = 1; e < arguments.length; e++) {
                 var n = arguments[e];
                 for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
             }
             return t
         };

     function tv(t) {
         return t8({}, t, {
             right: t.left + t.width,
             bottom: t.top + t.height
         })
     }

     function tE(t) {
         var e = {};
         try {
             if (ts(10)) {
                 e = t.getBoundingClientRect();
                 var n = th(t, "top"),
                     i = th(t, "left");
                 e.top += n, e.left += i, e.bottom += n, e.right += i
             } else e = t.getBoundingClientRect()
         } catch (r) {}
         var o = {
                 left: e.left,
                 top: e.top,
                 width: e.right - e.left,
                 height: e.bottom - e.top
             },
             s = "HTML" === t.nodeName ? td(t.ownerDocument) : {},
             a = s.width || t.clientWidth || o.right - o.left,
             l = s.height || t.clientHeight || o.bottom - o.top,
             c = t.offsetWidth - a,
             h = t.offsetHeight - l;
         if (c || h) {
             var f = te(t);
             c -= tf(f, "x"), h -= tf(f, "y"), o.width -= c, o.height -= h
         }
         return tv(o)
     }

     function tT(t, e) {
         var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
             i = ts(10),
             r = "HTML" === e.nodeName,
             o = tE(t),
             s = tE(e),
             a = ti(t),
             l = te(e),
             c = parseFloat(l.borderTopWidth, 10),
             h = parseFloat(l.borderLeftWidth, 10);
         n && r && (s.top = Math.max(s.top, 0), s.left = Math.max(s.left, 0));
         var f = tv({
             top: o.top - s.top - c,
             left: o.left - s.left - h,
             width: o.width,
             height: o.height
         });
         if (f.marginTop = 0, f.marginLeft = 0, !i && r) {
             var u = parseFloat(l.marginTop, 10),
                 d = parseFloat(l.marginLeft, 10);
             f.top -= c - u, f.bottom -= c - u, f.left -= h - d, f.right -= h - d, f.marginTop = u, f.marginLeft = d
         }
         return (i && !n ? e.contains(a) : e === a && "BODY" !== a.nodeName) && (f = function t(e, n) {
             var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                 r = th(n, "top"),
                 o = th(n, "left"),
                 s = i ? -1 : 1;
             return e.top += r * s, e.bottom += r * s, e.left += o * s, e.right += o * s, e
         }(f, e)), f
     }

     function tS(t) {
         if (!t || !t.parentElement || ts()) return document.documentElement;
         for (var e = t.parentElement; e && "none" === te(e, "transform");) e = e.parentElement;
         return e || document.documentElement
     }

     function ty(t, e, n, i) {
         var r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
             o = {
                 top: 0,
                 left: 0
             },
             s = r ? tS(t) : tc(t, e);
         if ("viewport" === i) o = function t(e) {
             var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                 i = e.ownerDocument.documentElement,
                 r = tT(e, i),
                 o = Math.max(i.clientWidth, window.innerWidth || 0),
                 s = Math.max(i.clientHeight, window.innerHeight || 0),
                 a = n ? 0 : th(i),
                 l = n ? 0 : th(i, "left");
             return tv({
                 top: a - r.top + r.marginTop,
                 left: l - r.left + r.marginLeft,
                 width: o,
                 height: s
             })
         }(s, r);
         else {
             var a = void 0;
             "scrollParent" === i ? "BODY" === (a = ti(tn(e))).nodeName && (a = t.ownerDocument.documentElement) : a = "window" === i ? t.ownerDocument.documentElement : i;
             var l = tT(a, s, r);
             if ("HTML" === a.nodeName && ! function t(e) {
                     var n = e.nodeName;
                     if ("BODY" === n || "HTML" === n) return !1;
                     if ("fixed" === te(e, "position")) return !0;
                     var i = tn(e);
                     return !!i && t(i)
                 }(s)) {
                 var c = td(t.ownerDocument),
                     h = c.height,
                     f = c.width;
                 o.top += l.top - l.marginTop, o.bottom = h + l.top, o.left += l.left - l.marginLeft, o.right = f + l.left
             } else o = l
         }
         var u = "number" == typeof(n = n || 0);
         return o.left += u ? n : n.left || 0, o.top += u ? n : n.top || 0, o.right -= u ? n : n.right || 0, o.bottom -= u ? n : n.bottom || 0, o
     }

     function tI(t, e, n, i, r) {
         var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
         if (-1 === t.indexOf("auto")) return t;
         var s = ty(n, i, o, r),
             a = {
                 top: {
                     width: s.width,
                     height: e.top - s.top
                 },
                 right: {
                     width: s.right - e.right,
                     height: s.height
                 },
                 bottom: {
                     width: s.width,
                     height: s.bottom - e.bottom
                 },
                 left: {
                     width: e.left - s.left,
                     height: s.height
                 }
             },
             l = Object.keys(a).map(function(t) {
                 var e, n;
                 return t8({
                     key: t
                 }, a[t], {
                     area: (n = (e = a[t]).width) * e.height
                 })
             }).sort(function(t, e) {
                 return e.area - t.area
             }),
             c = l.filter(function(t) {
                 var e = t.width,
                     i = t.height;
                 return e >= n.clientWidth && i >= n.clientHeight
             }),
             h = c.length > 0 ? c[0].key : l[0].key,
             f = t.split("-")[1];
         return h + (f ? "-" + f : "")
     }

     function tC(t, e, n) {
         var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
             r = i ? tS(e) : tc(e, n);
         return tT(n, r, i)
     }

     function tA(t) {
         var e = t.ownerDocument.defaultView.getComputedStyle(t),
             n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
             i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
         return {
             width: t.offsetWidth + i,
             height: t.offsetHeight + n
         }
     }

     function tO(t) {
         var e = {
             left: "right",
             right: "left",
             bottom: "top",
             top: "bottom"
         };
         return t.replace(/left|right|bottom|top/g, function(t) {
             return e[t]
         })
     }

     function tD(t, e, n) {
         n = n.split("-")[0];
         var i = tA(t),
             r = {
                 width: i.width,
                 height: i.height
             },
             o = -1 !== ["right", "left"].indexOf(n),
             s = o ? "top" : "left",
             a = o ? "left" : "top",
             l = o ? "height" : "width";
         return r[s] = e[s] + e[l] / 2 - i[l] / 2, n === a ? r[a] = e[a] - i[o ? "width" : "height"] : r[a] = e[tO(a)], r
     }

     function tb(t, e) {
         return Array.prototype.find ? t.find(e) : t.filter(e)[0]
     }

     function tN(t, e, n) {
         return (void 0 === n ? t : t.slice(0, function t(e, n, i) {
             if (Array.prototype.findIndex) return e.findIndex(function(t) {
                 return t[n] === i
             });
             var r = tb(e, function(t) {
                 return t[n] === i
             });
             return e.indexOf(r)
         }(t, "name", n))).forEach(function(t) {
             t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
             var n = t.function || t.fn;
             t.enabled && tt(n) && (e.offsets.popper = tv(e.offsets.popper), e.offsets.reference = tv(e.offsets.reference), e = n(e, t))
         }), e
     }

     function t$() {
         if (!this.state.isDestroyed) {
             var t = {
                 instance: this,
                 styles: {},
                 arrowStyles: {},
                 attributes: {},
                 flipped: !1,
                 offsets: {}
             };
             t.offsets.reference = tC(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = tI(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = tD(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = tN(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
         }
     }

     function tw(t, e) {
         return t.some(function(t) {
             var n = t.name;
             return t.enabled && n === e
         })
     }

     function tL(t) {
         for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length; i++) {
             var r = e[i],
                 o = r ? "" + r + n : t;
             if (void 0 !== document.body.style[o]) return o
         }
         return null
     }

     function tP() {
         return this.state.isDestroyed = !0, tw(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[tL("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
     }

     function tH(t) {
         var e = t.ownerDocument;
         return e ? e.defaultView : window
     }

     function t_() {
         if (!this.state.eventsEnabled) {
             var t, e, n, i, r;
             this.state = (t = this.reference, this.options, n = this.state, i = this.scheduleUpdate, n.updateBound = i, tH(t).addEventListener("resize", n.updateBound, {
                 passive: !0
             }), ! function t(e, n, i, r) {
                 var o = "BODY" === e.nodeName,
                     s = o ? e.ownerDocument.defaultView : e;
                 s.addEventListener(n, i, {
                     passive: !0
                 }), o || t(ti(s.parentNode), n, i, r), r.push(s)
             }(r = ti(t), "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n)
         }
     }

     function tR() {
         if (this.state.eventsEnabled) {
             var t, e;
             cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, tH(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function(t) {
                 t.removeEventListener("scroll", e.updateBound)
             }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e)
         }
     }

     function tW(t) {
         return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
     }

     function tk(t, e) {
         Object.keys(e).forEach(function(n) {
             var i = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && tW(e[n]) && (i = "px"), t.style[n] = e[n] + i
         })
     }
     var tx = Y && /Firefox/i.test(navigator.userAgent);

     function tF(t, e, n) {
         var i = tb(t, function(t) {
                 return t.name === e
             }),
             r = !!i && t.some(function(t) {
                 return t.name === n && t.enabled && t.order < i.order
             });
         if (!r) {
             var o = "`" + e + "`";
             console.warn("`" + n + "` modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
         }
         return r
     }
     var tU = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
         tM = tU.slice(3);

     function tV(t) {
         var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
             n = tM.indexOf(t),
             i = tM.slice(n + 1).concat(tM.slice(0, n));
         return e ? i.reverse() : i
     }
     var tj = {
             FLIP: "flip",
             CLOCKWISE: "clockwise",
             COUNTERCLOCKWISE: "counterclockwise"
         },
         tB = function() {
             function t(e, n) {
                 var i = this,
                     r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                 tp(this, t), this.scheduleUpdate = function() {
                     return requestAnimationFrame(i.update)
                 }, this.update = Z(this.update.bind(this)), this.options = t8({}, t.Defaults, r), this.state = {
                     isDestroyed: !1,
                     isCreated: !1,
                     scrollParents: []
                 }, this.reference = e && e.jquery ? e[0] : e, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(t8({}, t.Defaults.modifiers, r.modifiers)).forEach(function(e) {
                     i.options.modifiers[e] = t8({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                 }), this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
                     return t8({
                         name: t
                     }, i.options.modifiers[t])
                 }).sort(function(t, e) {
                     return t.order - e.order
                 }), this.modifiers.forEach(function(t) {
                     t.enabled && tt(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
                 }), this.update();
                 var o = this.options.eventsEnabled;
                 o && this.enableEventListeners(), this.state.eventsEnabled = o
             }
             return tg(t, [{
                 key: "update",
                 value: function t() {
                     return t$.call(this)
                 }
             }, {
                 key: "destroy",
                 value: function t() {
                     return tP.call(this)
                 }
             }, {
                 key: "enableEventListeners",
                 value: function t() {
                     return t_.call(this)
                 }
             }, {
                 key: "disableEventListeners",
                 value: function t() {
                     return tR.call(this)
                 }
             }]), t
         }();
     tB.Utils = ("undefined" != typeof window ? window : global).PopperUtils, tB.placements = tU, tB.Defaults = {
         placement: "bottom",
         positionFixed: !1,
         eventsEnabled: !0,
         removeOnDestroy: !1,
         onCreate: function t() {},
         onUpdate: function t() {},
         modifiers: {
             shift: {
                 order: 100,
                 enabled: !0,
                 fn: function t(e) {
                     var n = e.placement,
                         i = n.split("-")[0],
                         r = n.split("-")[1];
                     if (r) {
                         var o = e.offsets,
                             s = o.reference,
                             a = o.popper,
                             l = -1 !== ["bottom", "top"].indexOf(i),
                             c = l ? "left" : "top",
                             h = l ? "width" : "height",
                             f = {
                                 start: tm({}, c, s[c]),
                                 end: tm({}, c, s[c] + s[h] - a[h])
                             };
                         e.offsets.popper = t8({}, a, f[r])
                     }
                     return e
                 }
             },
             offset: {
                 order: 200,
                 enabled: !0,
                 fn: function t(e, n) {
                     var i, r, o, s, a, l, c, h, f, u, d = n.offset,
                         p = e.placement,
                         g = e.offsets,
                         m = g.popper,
                         v = g.reference,
                         E = p.split("-")[0],
                         T = void 0;
                     return T = tW(+d) ? [+d, 0] : (i = d, r = m, o = v, a = [0, 0], l = -1 !== ["right", "left"].indexOf(s = E), c[h = (c = i.split(/(\+|\-)/).map(function(t) {
                         return t.trim()
                     })).indexOf(tb(c, function(t) {
                         return -1 !== t.search(/,|\s/)
                     }))] && -1 === c[h].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead."), f = /\s*,\s*|\s+/, (u = (u = -1 !== h ? [c.slice(0, h).concat([c[h].split(f)[0]]), [c[h].split(f)[1]].concat(c.slice(h + 1))] : [c]).map(function(t, e) {
                         var n = (1 === e ? !l : l) ? "height" : "width",
                             i = !1;
                         return t.reduce(function(t, e) {
                             return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, i = !0, t) : i ? (t[t.length - 1] += e, i = !1, t) : t.concat(e)
                         }, []).map(function(t) {
                             return function t(e, n, i, r) {
                                 var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                                     s = +o[1],
                                     a = o[2];
                                 if (!s) return e;
                                 if (0 === a.indexOf("%")) {
                                     var l = void 0;
                                     return tv(l = "%p" === a ? i : r)[n] / 100 * s
                                 }
                                 if ("vh" !== a && "vw" !== a) return s;
                                 var c = void 0;
                                 return (c = "vh" === a ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * s
                             }(t, n, r, o)
                         })
                     })).forEach(function(t, e) {
                         t.forEach(function(n, i) {
                             tW(n) && (a[e] += n * ("-" === t[i - 1] ? -1 : 1))
                         })
                     }), a), "left" === E ? (m.top += T[0], m.left -= T[1]) : "right" === E ? (m.top += T[0], m.left += T[1]) : "top" === E ? (m.left += T[0], m.top -= T[1]) : "bottom" === E && (m.left += T[0], m.top += T[1]), e.popper = m, e
                 },
                 offset: 0
             },
             preventOverflow: {
                 order: 300,
                 enabled: !0,
                 fn: function t(e, n) {
                     var i = n.boundariesElement || ta(e.instance.popper);
                     e.instance.reference === i && (i = ta(i));
                     var r = tL("transform"),
                         o = e.instance.popper.style,
                         s = o.top,
                         a = o.left,
                         l = o[r];
                     o.top = "", o.left = "", o[r] = "";
                     var c = ty(e.instance.popper, e.instance.reference, n.padding, i, e.positionFixed);
                     o.top = s, o.left = a, o[r] = l, n.boundaries = c;
                     var h = n.priority,
                         f = e.offsets.popper,
                         u = {
                             primary: function t(e) {
                                 var i = f[e];
                                 return f[e] < c[e] && !n.escapeWithReference && (i = Math.max(f[e], c[e])), tm({}, e, i)
                             },
                             secondary: function t(e) {
                                 var i = "right" === e ? "left" : "top",
                                     r = f[i];
                                 return f[e] > c[e] && !n.escapeWithReference && (r = Math.min(f[i], c[e] - ("right" === e ? f.width : f.height))), tm({}, i, r)
                             }
                         };
                     return h.forEach(function(t) {
                         f = t8({}, f, u[-1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary"](t))
                     }), e.offsets.popper = f, e
                 },
                 priority: ["left", "right", "top", "bottom"],
                 padding: 5,
                 boundariesElement: "scrollParent"
             },
             keepTogether: {
                 order: 400,
                 enabled: !0,
                 fn: function t(e) {
                     var n = e.offsets,
                         i = n.popper,
                         r = n.reference,
                         o = e.placement.split("-")[0],
                         s = Math.floor,
                         a = -1 !== ["top", "bottom"].indexOf(o),
                         l = a ? "right" : "bottom",
                         c = a ? "left" : "top";
                     return i[l] < s(r[c]) && (e.offsets.popper[c] = s(r[c]) - i[a ? "width" : "height"]), i[c] > s(r[l]) && (e.offsets.popper[c] = s(r[l])), e
                 }
             },
             arrow: {
                 order: 500,
                 enabled: !0,
                 fn: function t(e, n) {
                     if (!tF(e.instance.modifiers, "arrow", "keepTogether")) return e;
                     var i, r = n.element;
                     if ("string" == typeof r) {
                         if (!(r = e.instance.popper.querySelector(r))) return e
                     } else if (!e.instance.popper.contains(r)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                     var o = e.placement.split("-")[0],
                         s = e.offsets,
                         a = s.popper,
                         l = s.reference,
                         c = -1 !== ["left", "right"].indexOf(o),
                         h = c ? "height" : "width",
                         f = c ? "Top" : "Left",
                         u = f.toLowerCase(),
                         d = c ? "bottom" : "right",
                         p = tA(r)[h];
                     l[d] - p < a[u] && (e.offsets.popper[u] -= a[u] - (l[d] - p)), l[u] + p > a[d] && (e.offsets.popper[u] += l[u] + p - a[d]), e.offsets.popper = tv(e.offsets.popper);
                     var g = l[u] + l[h] / 2 - p / 2,
                         m = te(e.instance.popper),
                         v = parseFloat(m["margin" + f], 10),
                         E = parseFloat(m["border" + f + "Width"], 10),
                         T = g - e.offsets.popper[u] - v - E;
                     return T = Math.max(Math.min(a[h] - p, T), 0), e.arrowElement = r, e.offsets.arrow = (tm(i = {}, u, Math.round(T)), tm(i, c ? "left" : "top", ""), i), e
                 },
                 element: "[x-arrow]"
             },
             flip: {
                 order: 600,
                 enabled: !0,
                 fn: function t(e, n) {
                     if (tw(e.instance.modifiers, "inner") || e.flipped && e.placement === e.originalPlacement) return e;
                     var i = ty(e.instance.popper, e.instance.reference, n.padding, n.boundariesElement, e.positionFixed),
                         r = e.placement.split("-")[0],
                         o = tO(r),
                         s = e.placement.split("-")[1] || "",
                         a = [];
                     switch (n.behavior) {
                         case tj.FLIP:
                             a = [r, o];
                             break;
                         case tj.CLOCKWISE:
                             a = tV(r);
                             break;
                         case tj.COUNTERCLOCKWISE:
                             a = tV(r, !0);
                             break;
                         default:
                             a = n.behavior
                     }
                     return a.forEach(function(t, l) {
                         if (r !== t || a.length === l + 1) return e;
                         o = tO(r = e.placement.split("-")[0]);
                         var c, h = e.offsets.popper,
                             f = e.offsets.reference,
                             u = Math.floor,
                             d = "left" === r && u(h.right) > u(f.left) || "right" === r && u(h.left) < u(f.right) || "top" === r && u(h.bottom) > u(f.top) || "bottom" === r && u(h.top) < u(f.bottom),
                             p = u(h.left) < u(i.left),
                             g = u(h.right) > u(i.right),
                             m = u(h.top) < u(i.top),
                             v = u(h.bottom) > u(i.bottom),
                             E = "left" === r && p || "right" === r && g || "top" === r && m || "bottom" === r && v,
                             T = -1 !== ["top", "bottom"].indexOf(r),
                             S = !!n.flipVariations && (T && "start" === s && p || T && "end" === s && g || !T && "start" === s && m || !T && "end" === s && v);
                         (d || E || S) && (e.flipped = !0, (d || E) && (r = a[l + 1]), S && (s = "end" === (c = s) ? "start" : "start" === c ? "end" : c), e.placement = r + (s ? "-" + s : ""), e.offsets.popper = t8({}, e.offsets.popper, tD(e.instance.popper, e.offsets.reference, e.placement)), e = tN(e.instance.modifiers, e, "flip"))
                     }), e
                 },
                 behavior: "flip",
                 padding: 5,
                 boundariesElement: "viewport"
             },
             inner: {
                 order: 700,
                 enabled: !1,
                 fn: function t(e) {
                     var n = e.placement,
                         i = n.split("-")[0],
                         r = e.offsets,
                         o = r.popper,
                         s = r.reference,
                         a = -1 !== ["left", "right"].indexOf(i),
                         l = -1 === ["top", "left"].indexOf(i);
                     return o[a ? "left" : "top"] = s[i] - (l ? o[a ? "width" : "height"] : 0), e.placement = tO(n), e.offsets.popper = tv(o), e
                 }
             },
             hide: {
                 order: 800,
                 enabled: !0,
                 fn: function t(e) {
                     if (!tF(e.instance.modifiers, "hide", "preventOverflow")) return e;
                     var n = e.offsets.reference,
                         i = tb(e.instance.modifiers, function(t) {
                             return "preventOverflow" === t.name
                         }).boundaries;
                     if (n.bottom < i.top || n.left > i.right || n.top > i.bottom || n.right < i.left) {
                         if (!0 === e.hide) return e;
                         e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                     } else {
                         if (!1 === e.hide) return e;
                         e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                     }
                     return e
                 }
             },
             computeStyle: {
                 order: 850,
                 enabled: !0,
                 fn: function t(e, n) {
                     var i = n.x,
                         r = n.y,
                         o = e.offsets.popper,
                         s = tb(e.instance.modifiers, function(t) {
                             return "applyStyle" === t.name
                         }).gpuAcceleration;
                     void 0 !== s && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                     var a, l, c, h, f, u, d, p, g, m, v, E, T, S = void 0 !== s ? s : n.gpuAcceleration,
                         y = ta(e.instance.popper),
                         I = tE(y),
                         C = {
                             position: o.position
                         },
                         A = (a = e, l = window.devicePixelRatio < 2 || !tx, h = (c = a.offsets).popper, f = c.reference, u = Math.round, d = function t(e) {
                             return e
                         }, p = u(f.width), g = u(h.width), m = -1 !== ["left", "right"].indexOf(a.placement), v = -1 !== a.placement.indexOf("-"), E = l ? m || v || p % 2 == g % 2 ? u : Math.floor : d, T = l ? u : d, {
                             left: E(p % 2 == 1 && g % 2 == 1 && !v && l ? h.left - 1 : h.left),
                             top: T(h.top),
                             bottom: T(h.bottom),
                             right: E(h.right)
                         }),
                         O = "bottom" === i ? "top" : "bottom",
                         D = "right" === r ? "left" : "right",
                         b = tL("transform"),
                         N = void 0,
                         $ = void 0;
                     $ = "bottom" === O ? "HTML" === y.nodeName ? -y.clientHeight + A.bottom : -I.height + A.bottom : A.top, N = "right" === D ? "HTML" === y.nodeName ? -y.clientWidth + A.right : -I.width + A.right : A.left, S && b ? (C[b] = "translate3d(" + N + "px, " + $ + "px, 0)", C[O] = 0, C[D] = 0, C.willChange = "transform") : (C[O] = $ * ("bottom" === O ? -1 : 1), C[D] = N * ("right" === D ? -1 : 1), C.willChange = O + ", " + D);
                     var w = {
                         "x-placement": e.placement
                     };
                     return e.attributes = t8({}, w, e.attributes), e.styles = t8({}, C, e.styles), e.arrowStyles = t8({}, e.offsets.arrow, e.arrowStyles), e
                 },
                 gpuAcceleration: !0,
                 x: "bottom",
                 y: "right"
             },
             applyStyle: {
                 order: 900,
                 enabled: !0,
                 fn: function t(e) {
                     return tk(e.instance.popper, e.styles),
                         function t(e, n) {
                             Object.keys(n).forEach(function(t) {
                                 !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t)
                             })
                         }(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && tk(e.arrowElement, e.arrowStyles), e
                 },
                 onLoad: function t(e, n, i, r, o) {
                     var s = tC(o, n, e, i.positionFixed),
                         a = tI(i.placement, s, n, e, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                     return n.setAttribute("x-placement", a), tk(n, {
                         position: i.positionFixed ? "fixed" : "absolute"
                     }), i
                 },
                 gpuAcceleration: void 0
             }
         }
     };
     var tG = "dropdown",
         tK = "bs.dropdown",
         tq = "." + tK,
         tQ = ".data-api",
         tY = e.fn[tG],
         t0 = RegExp("38|40|27"),
         t1 = {
             HIDE: "hide" + tq,
             HIDDEN: "hidden" + tq,
             SHOW: "show" + tq,
             SHOWN: "shown" + tq,
             CLICK: "click" + tq,
             CLICK_DATA_API: "click" + tq + tQ,
             KEYDOWN_DATA_API: "keydown" + tq + tQ,
             KEYUP_DATA_API: "keyup" + tq + tQ
         },
         tX = {
             DISABLED: "disabled",
             SHOW: "show",
             DROPUP: "dropup",
             DROPRIGHT: "dropright",
             DROPLEFT: "dropleft",
             MENURIGHT: "dropdown-menu-right",
             MENULEFT: "dropdown-menu-left",
             POSITION_STATIC: "position-static"
         },
         t2 = {
             DATA_TOGGLE: '[data-toggle="dropdown"]',
             FORM_CHILD: ".dropdown form",
             MENU: ".dropdown-menu",
             NAVBAR_NAV: ".navbar-nav",
             VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
         },
         tz = {
             TOP: "top-start",
             TOPEND: "top-end",
             BOTTOM: "bottom-start",
             BOTTOMEND: "bottom-end",
             RIGHT: "right-start",
             RIGHTEND: "right-end",
             LEFT: "left-start",
             LEFTEND: "left-end"
         },
         t3 = {
             offset: 0,
             flip: !0,
             boundary: "scrollParent",
             reference: "toggle",
             display: "dynamic"
         },
         t7 = {
             offset: "(number|string|function)",
             flip: "boolean",
             boundary: "(string|element)",
             reference: "(string|element)",
             display: "string"
         },
         t5 = function() {
             function t(t, e) {
                 this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
             }
             var n = t.prototype;
             return n.toggle = function n() {
                 if (!(this._element.disabled || e(this._element).hasClass(tX.DISABLED))) {
                     var i = t._getParentFromElement(this._element),
                         r = e(this._menu).hasClass(tX.SHOW);
                     if (t._clearMenus(), !r) {
                         var o = {
                                 relatedTarget: this._element
                             },
                             s = e.Event(t1.SHOW, o);
                         if (e(i).trigger(s), !s.isDefaultPrevented()) {
                             if (!this._inNavbar) {
                                 if (void 0 === tB) throw TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                 var a = this._element;
                                 "parent" === this._config.reference ? a = i : l.isElement(this._config.reference) && (a = this._config.reference, void 0 !== this._config.reference.jquery && (a = this._config.reference[0])), "scrollParent" !== this._config.boundary && e(i).addClass(tX.POSITION_STATIC), this._popper = new tB(a, this._menu, this._getPopperConfig())
                             }
                             "ontouchstart" in document.documentElement && 0 === e(i).closest(t2.NAVBAR_NAV).length && e(document.body).children().on("mouseover", null, e.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), e(this._menu).toggleClass(tX.SHOW), e(i).toggleClass(tX.SHOW).trigger(e.Event(t1.SHOWN, o))
                         }
                     }
                 }
             }, n.show = function n() {
                 if (!(this._element.disabled || e(this._element).hasClass(tX.DISABLED) || e(this._menu).hasClass(tX.SHOW))) {
                     var i = {
                             relatedTarget: this._element
                         },
                         r = e.Event(t1.SHOW, i),
                         o = t._getParentFromElement(this._element);
                     e(o).trigger(r), !r.isDefaultPrevented() && (e(this._menu).toggleClass(tX.SHOW), e(o).toggleClass(tX.SHOW).trigger(e.Event(t1.SHOWN, i)))
                 }
             }, n.hide = function n() {
                 if (!(this._element.disabled || e(this._element).hasClass(tX.DISABLED)) && e(this._menu).hasClass(tX.SHOW)) {
                     var i = {
                             relatedTarget: this._element
                         },
                         r = e.Event(t1.HIDE, i),
                         o = t._getParentFromElement(this._element);
                     e(o).trigger(r), !r.isDefaultPrevented() && (e(this._menu).toggleClass(tX.SHOW), e(o).toggleClass(tX.SHOW).trigger(e.Event(t1.HIDDEN, i)))
                 }
             }, n.dispose = function t() {
                 e.removeData(this._element, tK), e(this._element).off(tq), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
             }, n.update = function t() {
                 this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
             }, n._addEventListeners = function t() {
                 var n = this;
                 e(this._element).on(t1.CLICK, function(t) {
                     t.preventDefault(), t.stopPropagation(), n.toggle()
                 })
             }, n._getConfig = function t(n) {
                 return n = o({}, this.constructor.Default, e(this._element).data(), n), l.typeCheckConfig(tG, n, this.constructor.DefaultType), n
             }, n._getMenuElement = function e() {
                 if (!this._menu) {
                     var n = t._getParentFromElement(this._element);
                     n && (this._menu = n.querySelector(t2.MENU))
                 }
                 return this._menu
             }, n._getPlacement = function t() {
                 var n = e(this._element.parentNode),
                     i = tz.BOTTOM;
                 return n.hasClass(tX.DROPUP) ? (i = tz.TOP, e(this._menu).hasClass(tX.MENURIGHT) && (i = tz.TOPEND)) : n.hasClass(tX.DROPRIGHT) ? i = tz.RIGHT : n.hasClass(tX.DROPLEFT) ? i = tz.LEFT : e(this._menu).hasClass(tX.MENURIGHT) && (i = tz.BOTTOMEND), i
             }, n._detectNavbar = function t() {
                 return e(this._element).closest(".navbar").length > 0
             }, n._getOffset = function t() {
                 var e = this,
                     n = {};
                 return "function" == typeof this._config.offset ? n.fn = function(t) {
                     return t.offsets = o({}, t.offsets, e._config.offset(t.offsets, e._element) || {}), t
                 } : n.offset = this._config.offset, n
             }, n._getPopperConfig = function t() {
                 var e = {
                     placement: this._getPlacement(),
                     modifiers: {
                         offset: this._getOffset(),
                         flip: {
                             enabled: this._config.flip
                         },
                         preventOverflow: {
                             boundariesElement: this._config.boundary
                         }
                     }
                 };
                 return "static" === this._config.display && (e.modifiers.applyStyle = {
                     enabled: !1
                 }), e
             }, t._jQueryInterface = function n(i) {
                 return this.each(function() {
                     var n = e(this).data(tK);
                     if (n || (n = new t(this, "object" == typeof i ? i : null), e(this).data(tK, n)), "string" == typeof i) {
                         if (void 0 === n[i]) throw TypeError('No method named "' + i + '"');
                         n[i]()
                     }
                 })
             }, t._clearMenus = function n(i) {
                 if (!i || 3 !== i.which && ("keyup" !== i.type || 9 === i.which))
                     for (var r = [].slice.call(document.querySelectorAll(t2.DATA_TOGGLE)), o = 0, s = r.length; o < s; o++) {
                         var a = t._getParentFromElement(r[o]),
                             l = e(r[o]).data(tK),
                             c = {
                                 relatedTarget: r[o]
                             };
                         if (i && "click" === i.type && (c.clickEvent = i), l) {
                             var h = l._menu;
                             if (!(!e(a).hasClass(tX.SHOW) || i && ("click" === i.type && /input|textarea/i.test(i.target.tagName) || "keyup" === i.type && 9 === i.which) && e.contains(a, i.target))) {
                                 var f = e.Event(t1.HIDE, c);
                                 e(a).trigger(f), !f.isDefaultPrevented() && ("ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), r[o].setAttribute("aria-expanded", "false"), e(h).removeClass(tX.SHOW), e(a).removeClass(tX.SHOW).trigger(e.Event(t1.HIDDEN, c)))
                             }
                         }
                     }
             }, t._getParentFromElement = function t(e) {
                 var n, i = l.getSelectorFromElement(e);
                 return i && (n = document.querySelector(i)), n || e.parentNode
             }, t._dataApiKeydownHandler = function n(i) {
                 if (!((/input|textarea/i.test(i.target.tagName) ? 32 === i.which || 27 !== i.which && (40 !== i.which && 38 !== i.which || e(i.target).closest(t2.MENU).length) : !t0.test(i.which)) || (i.preventDefault(), i.stopPropagation(), this.disabled || e(this).hasClass(tX.DISABLED)))) {
                     var r = t._getParentFromElement(this),
                         o = e(r).hasClass(tX.SHOW);
                     if (!o || o && (27 === i.which || 32 === i.which)) {
                         27 === i.which && e(r.querySelector(t2.DATA_TOGGLE)).trigger("focus"), e(this).trigger("click");
                         return
                     }
                     var s = [].slice.call(r.querySelectorAll(t2.VISIBLE_ITEMS));
                     if (0 !== s.length) {
                         var a = s.indexOf(i.target);
                         38 === i.which && a > 0 && a--, 40 === i.which && a < s.length - 1 && a++, a < 0 && (a = 0), s[a].focus()
                     }
                 }
             }, i(t, null, [{
                 key: "VERSION",
                 get: function t() {
                     return "4.3.1"
                 }
             }, {
                 key: "Default",
                 get: function t() {
                     return t3
                 }
             }, {
                 key: "DefaultType",
                 get: function t() {
                     return t7
                 }
             }]), t
         }();
     e(document).on(t1.KEYDOWN_DATA_API, t2.DATA_TOGGLE, t5._dataApiKeydownHandler).on(t1.KEYDOWN_DATA_API, t2.MENU, t5._dataApiKeydownHandler).on(t1.CLICK_DATA_API + " " + t1.KEYUP_DATA_API, t5._clearMenus).on(t1.CLICK_DATA_API, t2.DATA_TOGGLE, function(t) {
         t.preventDefault(), t.stopPropagation(), t5._jQueryInterface.call(e(this), "toggle")
     }).on(t1.CLICK_DATA_API, t2.FORM_CHILD, function(t) {
         t.stopPropagation()
     }), e.fn[tG] = t5._jQueryInterface, e.fn[tG].Constructor = t5, e.fn[tG].noConflict = function() {
         return e.fn[tG] = tY, t5._jQueryInterface
     };
     var t6 = "modal",
         t9 = "bs.modal",
         tJ = "." + t9,
         tZ = e.fn[t6],
         t4 = {
             backdrop: !0,
             keyboard: !0,
             focus: !0,
             show: !0
         },
         et = {
             backdrop: "(boolean|string)",
             keyboard: "boolean",
             focus: "boolean",
             show: "boolean"
         },
         ee = {
             HIDE: "hide" + tJ,
             HIDDEN: "hidden" + tJ,
             SHOW: "show" + tJ,
             SHOWN: "shown" + tJ,
             FOCUSIN: "focusin" + tJ,
             RESIZE: "resize" + tJ,
             CLICK_DISMISS: "click.dismiss" + tJ,
             KEYDOWN_DISMISS: "keydown.dismiss" + tJ,
             MOUSEUP_DISMISS: "mouseup.dismiss" + tJ,
             MOUSEDOWN_DISMISS: "mousedown.dismiss" + tJ,
             CLICK_DATA_API: "click" + tJ + ".data-api"
         },
         en = {
             SCROLLABLE: "modal-dialog-scrollable",
             SCROLLBAR_MEASURER: "modal-scrollbar-measure",
             BACKDROP: "modal-backdrop",
             OPEN: "modal-open",
             FADE: "fade",
             SHOW: "show"
         },
         ei = {
             DIALOG: ".modal-dialog",
             MODAL_BODY: ".modal-body",
             DATA_TOGGLE: '[data-toggle="modal"]',
             DATA_DISMISS: '[data-dismiss="modal"]',
             FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
             STICKY_CONTENT: ".sticky-top"
         },
         er = function() {
             function t(t, e) {
                 this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(ei.DIALOG), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
             }
             var n = t.prototype;
             return n.toggle = function t(e) {
                 return this._isShown ? this.hide() : this.show(e)
             }, n.show = function t(n) {
                 var i = this;
                 if (!this._isShown && !this._isTransitioning) {
                     e(this._element).hasClass(en.FADE) && (this._isTransitioning = !0);
                     var r = e.Event(ee.SHOW, {
                         relatedTarget: n
                     });
                     e(this._element).trigger(r), !(this._isShown || r.isDefaultPrevented()) && (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on(ee.CLICK_DISMISS, ei.DATA_DISMISS, function(t) {
                         return i.hide(t)
                     }), e(this._dialog).on(ee.MOUSEDOWN_DISMISS, function() {
                         e(i._element).one(ee.MOUSEUP_DISMISS, function(t) {
                             e(t.target).is(i._element) && (i._ignoreBackdropClick = !0)
                         })
                     }), this._showBackdrop(function() {
                         return i._showElement(n)
                     }))
                 }
             }, n.hide = function t(n) {
                 var i = this;
                 if (n && n.preventDefault(), this._isShown && !this._isTransitioning) {
                     var r = e.Event(ee.HIDE);
                     if (e(this._element).trigger(r), !(!this._isShown || r.isDefaultPrevented())) {
                         this._isShown = !1;
                         var o = e(this._element).hasClass(en.FADE);
                         if (o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off(ee.FOCUSIN), e(this._element).removeClass(en.SHOW), e(this._element).off(ee.CLICK_DISMISS), e(this._dialog).off(ee.MOUSEDOWN_DISMISS), o) {
                             var s = l.getTransitionDurationFromElement(this._element);
                             e(this._element).one(l.TRANSITION_END, function(t) {
                                 return i._hideModal(t)
                             }).emulateTransitionEnd(s)
                         } else this._hideModal()
                     }
                 }
             }, n.dispose = function t() {
                 [window, this._element, this._dialog].forEach(function(t) {
                     return e(t).off(tJ)
                 }), e(document).off(ee.FOCUSIN), e.removeData(this._element, t9), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
             }, n.handleUpdate = function t() {
                 this._adjustDialog()
             }, n._getConfig = function t(e) {
                 return e = o({}, t4, e), l.typeCheckConfig(t6, e, et), e
             }, n._showElement = function t(n) {
                 var i = this,
                     r = e(this._element).hasClass(en.FADE);
                 this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), e(this._dialog).hasClass(en.SCROLLABLE) ? this._dialog.querySelector(ei.MODAL_BODY).scrollTop = 0 : this._element.scrollTop = 0, r && l.reflow(this._element), e(this._element).addClass(en.SHOW), this._config.focus && this._enforceFocus();
                 var o = e.Event(ee.SHOWN, {
                         relatedTarget: n
                     }),
                     s = function t() {
                         i._config.focus && i._element.focus(), i._isTransitioning = !1, e(i._element).trigger(o)
                     };
                 if (r) {
                     var a = l.getTransitionDurationFromElement(this._dialog);
                     e(this._dialog).one(l.TRANSITION_END, s).emulateTransitionEnd(a)
                 } else s()
             }, n._enforceFocus = function t() {
                 var n = this;
                 e(document).off(ee.FOCUSIN).on(ee.FOCUSIN, function(t) {
                     document !== t.target && n._element !== t.target && 0 === e(n._element).has(t.target).length && n._element.focus()
                 })
             }, n._setEscapeEvent = function t() {
                 var n = this;
                 this._isShown && this._config.keyboard ? e(this._element).on(ee.KEYDOWN_DISMISS, function(t) {
                     27 === t.which && (t.preventDefault(), n.hide())
                 }) : this._isShown || e(this._element).off(ee.KEYDOWN_DISMISS)
             }, n._setResizeEvent = function t() {
                 var n = this;
                 this._isShown ? e(window).on(ee.RESIZE, function(t) {
                     return n.handleUpdate(t)
                 }) : e(window).off(ee.RESIZE)
             }, n._hideModal = function t() {
                 var n = this;
                 this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function() {
                     e(document.body).removeClass(en.OPEN), n._resetAdjustments(), n._resetScrollbar(), e(n._element).trigger(ee.HIDDEN)
                 })
             }, n._removeBackdrop = function t() {
                 this._backdrop && (e(this._backdrop).remove(), this._backdrop = null)
             }, n._showBackdrop = function t(n) {
                 var i = this,
                     r = e(this._element).hasClass(en.FADE) ? en.FADE : "";
                 if (this._isShown && this._config.backdrop) {
                     if (this._backdrop = document.createElement("div"), this._backdrop.className = en.BACKDROP, r && this._backdrop.classList.add(r), e(this._backdrop).appendTo(document.body), e(this._element).on(ee.CLICK_DISMISS, function(t) {
                             if (i._ignoreBackdropClick) {
                                 i._ignoreBackdropClick = !1;
                                 return
                             }
                             t.target === t.currentTarget && ("static" === i._config.backdrop ? i._element.focus() : i.hide())
                         }), r && l.reflow(this._backdrop), e(this._backdrop).addClass(en.SHOW), !n) return;
                     if (!r) {
                         n();
                         return
                     }
                     var o = l.getTransitionDurationFromElement(this._backdrop);
                     e(this._backdrop).one(l.TRANSITION_END, n).emulateTransitionEnd(o)
                 } else if (!this._isShown && this._backdrop) {
                     e(this._backdrop).removeClass(en.SHOW);
                     var s = function t() {
                         i._removeBackdrop(), n && n()
                     };
                     if (e(this._element).hasClass(en.FADE)) {
                         var a = l.getTransitionDurationFromElement(this._backdrop);
                         e(this._backdrop).one(l.TRANSITION_END, s).emulateTransitionEnd(a)
                     } else s()
                 } else n && n()
             }, n._adjustDialog = function t() {
                 var e = this._element.scrollHeight > document.documentElement.clientHeight;
                 !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
             }, n._resetAdjustments = function t() {
                 this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
             }, n._checkScrollbar = function t() {
                 var e = document.body.getBoundingClientRect();
                 this._isBodyOverflowing = e.left + e.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
             }, n._setScrollbar = function t() {
                 var n = this;
                 if (this._isBodyOverflowing) {
                     var i = [].slice.call(document.querySelectorAll(ei.FIXED_CONTENT)),
                         r = [].slice.call(document.querySelectorAll(ei.STICKY_CONTENT));
                     e(i).each(function(t, i) {
                         var r = i.style.paddingRight,
                             o = e(i).css("padding-right");
                         e(i).data("padding-right", r).css("padding-right", parseFloat(o) + n._scrollbarWidth + "px")
                     }), e(r).each(function(t, i) {
                         var r = i.style.marginRight,
                             o = e(i).css("margin-right");
                         e(i).data("margin-right", r).css("margin-right", parseFloat(o) - n._scrollbarWidth + "px")
                     });
                     var o = document.body.style.paddingRight,
                         s = e(document.body).css("padding-right");
                     e(document.body).data("padding-right", o).css("padding-right", parseFloat(s) + this._scrollbarWidth + "px")
                 }
                 e(document.body).addClass(en.OPEN)
             }, n._resetScrollbar = function t() {
                 e([].slice.call(document.querySelectorAll(ei.FIXED_CONTENT))).each(function(t, n) {
                     var i = e(n).data("padding-right");
                     e(n).removeData("padding-right"), n.style.paddingRight = i || ""
                 }), e([].slice.call(document.querySelectorAll("" + ei.STICKY_CONTENT))).each(function(t, n) {
                     var i = e(n).data("margin-right");
                     void 0 !== i && e(n).css("margin-right", i).removeData("margin-right")
                 });
                 var n = e(document.body).data("padding-right");
                 e(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
             }, n._getScrollbarWidth = function t() {
                 var e = document.createElement("div");
                 e.className = en.SCROLLBAR_MEASURER, document.body.appendChild(e);
                 var n = e.getBoundingClientRect().width - e.clientWidth;
                 return document.body.removeChild(e), n
             }, t._jQueryInterface = function n(i, r) {
                 return this.each(function() {
                     var n = e(this).data(t9),
                         s = o({}, t4, e(this).data(), "object" == typeof i && i ? i : {});
                     if (n || (n = new t(this, s), e(this).data(t9, n)), "string" == typeof i) {
                         if (void 0 === n[i]) throw TypeError('No method named "' + i + '"');
                         n[i](r)
                     } else s.show && n.show(r)
                 })
             }, i(t, null, [{
                 key: "VERSION",
                 get: function t() {
                     return "4.3.1"
                 }
             }, {
                 key: "Default",
                 get: function t() {
                     return t4
                 }
             }]), t
         }();
     e(document).on(ee.CLICK_DATA_API, ei.DATA_TOGGLE, function(t) {
         var n, i = this,
             r = l.getSelectorFromElement(this);
         r && (n = document.querySelector(r));
         var s = e(n).data(t9) ? "toggle" : o({}, e(n).data(), e(this).data());
         ("A" === this.tagName || "AREA" === this.tagName) && t.preventDefault();
         var a = e(n).one(ee.SHOW, function(t) {
             !t.isDefaultPrevented() && a.one(ee.HIDDEN, function() {
                 e(i).is(":visible") && i.focus()
             })
         });
         er._jQueryInterface.call(e(n), s, this)
     }), e.fn[t6] = er._jQueryInterface, e.fn[t6].Constructor = er, e.fn[t6].noConflict = function() {
         return e.fn[t6] = tZ, er._jQueryInterface
     };
     var eo = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
         es = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
         ea = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

     function el(t, e, n) {
         if (0 === t.length) return t;
         if (n && "function" == typeof n) return n(t);
         for (var i = new window.DOMParser().parseFromString(t, "text/html"), r = Object.keys(e), o = [].slice.call(i.body.querySelectorAll("*")), s = 0, a = o.length; s < a; s++)
             if ("continue" === function t(n, i) {
                     var s = o[n],
                         a = s.nodeName.toLowerCase();
                     if (-1 === r.indexOf(s.nodeName.toLowerCase())) return s.parentNode.removeChild(s), "continue";
                     var l = [].slice.call(s.attributes),
                         c = [].concat(e["*"] || [], e[a] || []);
                     l.forEach(function(t) {
                         ! function t(e, n) {
                             var i = e.nodeName.toLowerCase();
                             if (-1 !== n.indexOf(i)) return -1 === eo.indexOf(i) || Boolean(e.nodeValue.match(es) || e.nodeValue.match(ea));
                             for (var r = n.filter(function(t) {
                                     return t instanceof RegExp
                                 }), o = 0, s = r.length; o < s; o++)
                                 if (i.match(r[o])) return !0;
                             return !1
                         }(t, c) && s.removeAttribute(t.nodeName)
                     })
                 }(s, a)) continue;
         return i.body.innerHTML
     }
     var ec = "tooltip",
         eh = "bs.tooltip",
         ef = "." + eh,
         eu = e.fn[ec],
         ed = "bs-tooltip",
         ep = RegExp("(^|\\s)" + ed + "\\S+", "g"),
         eg = ["sanitize", "whiteList", "sanitizeFn"],
         em = {
             animation: "boolean",
             template: "string",
             title: "(string|element|function)",
             trigger: "string",
             delay: "(number|object)",
             html: "boolean",
             selector: "(string|boolean)",
             placement: "(string|function)",
             offset: "(number|string|function)",
             container: "(string|element|boolean)",
             fallbackPlacement: "(string|array)",
             boundary: "(string|element)",
             sanitize: "boolean",
             sanitizeFn: "(null|function)",
             whiteList: "object"
         },
         e8 = {
             AUTO: "auto",
             TOP: "top",
             RIGHT: "right",
             BOTTOM: "bottom",
             LEFT: "left"
         },
         ev = {
             animation: !0,
             template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
             trigger: "hover focus",
             title: "",
             delay: 0,
             html: !1,
             selector: !1,
             placement: "top",
             offset: 0,
             container: !1,
             fallbackPlacement: "flip",
             boundary: "scrollParent",
             sanitize: !0,
             sanitizeFn: null,
             whiteList: {
                 "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                 a: ["target", "href", "title", "rel"],
                 area: [],
                 b: [],
                 br: [],
                 col: [],
                 code: [],
                 div: [],
                 em: [],
                 hr: [],
                 h1: [],
                 h2: [],
                 h3: [],
                 h4: [],
                 h5: [],
                 h6: [],
                 i: [],
                 img: ["src", "alt", "title", "width", "height"],
                 li: [],
                 ol: [],
                 p: [],
                 pre: [],
                 s: [],
                 small: [],
                 span: [],
                 sub: [],
                 sup: [],
                 strong: [],
                 u: [],
                 ul: []
             }
         },
         eE = {
             SHOW: "show",
             OUT: "out"
         },
         eT = {
             HIDE: "hide" + ef,
             HIDDEN: "hidden" + ef,
             SHOW: "show" + ef,
             SHOWN: "shown" + ef,
             INSERTED: "inserted" + ef,
             CLICK: "click" + ef,
             FOCUSIN: "focusin" + ef,
             FOCUSOUT: "focusout" + ef,
             MOUSEENTER: "mouseenter" + ef,
             MOUSELEAVE: "mouseleave" + ef
         },
         eS = {
             FADE: "fade",
             SHOW: "show"
         },
         ey = {
             TOOLTIP: ".tooltip",
             TOOLTIP_INNER: ".tooltip-inner",
             ARROW: ".arrow"
         },
         eI = {
             HOVER: "hover",
             FOCUS: "focus",
             CLICK: "click",
             MANUAL: "manual"
         },
         eC = function() {
             function t(t, e) {
                 if (void 0 === tB) throw TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                 this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
             }
             var n = t.prototype;
             return n.enable = function t() {
                 this._isEnabled = !0
             }, n.disable = function t() {
                 this._isEnabled = !1
             }, n.toggleEnabled = function t() {
                 this._isEnabled = !this._isEnabled
             }, n.toggle = function t(n) {
                 if (this._isEnabled) {
                     if (n) {
                         var i = this.constructor.DATA_KEY,
                             r = e(n.currentTarget).data(i);
                         r || (r = new this.constructor(n.currentTarget, this._getDelegateConfig()), e(n.currentTarget).data(i, r)), r._activeTrigger.click = !r._activeTrigger.click, r._isWithActiveTrigger() ? r._enter(null, r) : r._leave(null, r)
                     } else {
                         if (e(this.getTipElement()).hasClass(eS.SHOW)) {
                             this._leave(null, this);
                             return
                         }
                         this._enter(null, this)
                     }
                 }
             }, n.dispose = function t() {
                 clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest(".modal").off("hide.bs.modal"), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
             }, n.show = function t() {
                 var n = this;
                 if ("none" === e(this.element).css("display")) throw Error("Please use show on visible elements");
                 var i = e.Event(this.constructor.Event.SHOW);
                 if (this.isWithContent() && this._isEnabled) {
                     e(this.element).trigger(i);
                     var r = l.findShadowRoot(this.element),
                         o = e.contains(null !== r ? r : this.element.ownerDocument.documentElement, this.element);
                     if (i.isDefaultPrevented() || !o) return;
                     var s = this.getTipElement(),
                         a = l.getUID(this.constructor.NAME);
                     s.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && e(s).addClass(eS.FADE);
                     var c = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
                         h = this._getAttachment(c);
                     this.addAttachmentClass(h);
                     var f = this._getContainer();
                     e(s).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(s).appendTo(f), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new tB(this.element, s, {
                         placement: h,
                         modifiers: {
                             offset: this._getOffset(),
                             flip: {
                                 behavior: this.config.fallbackPlacement
                             },
                             arrow: {
                                 element: ey.ARROW
                             },
                             preventOverflow: {
                                 boundariesElement: this.config.boundary
                             }
                         },
                         onCreate: function t(e) {
                             e.originalPlacement !== e.placement && n._handlePopperPlacementChange(e)
                         },
                         onUpdate: function t(e) {
                             return n._handlePopperPlacementChange(e)
                         }
                     }), e(s).addClass(eS.SHOW), "ontouchstart" in document.documentElement && e(document.body).children().on("mouseover", null, e.noop);
                     var u = function t() {
                         n.config.animation && n._fixTransition();
                         var i = n._hoverState;
                         n._hoverState = null, e(n.element).trigger(n.constructor.Event.SHOWN), i === eE.OUT && n._leave(null, n)
                     };
                     if (e(this.tip).hasClass(eS.FADE)) {
                         var d = l.getTransitionDurationFromElement(this.tip);
                         e(this.tip).one(l.TRANSITION_END, u).emulateTransitionEnd(d)
                     } else u()
                 }
             }, n.hide = function t(n) {
                 var i = this,
                     r = this.getTipElement(),
                     o = e.Event(this.constructor.Event.HIDE),
                     s = function t() {
                         i._hoverState !== eE.SHOW && r.parentNode && r.parentNode.removeChild(r), i._cleanTipClass(), i.element.removeAttribute("aria-describedby"), e(i.element).trigger(i.constructor.Event.HIDDEN), null !== i._popper && i._popper.destroy(), n && n()
                     };
                 if (e(this.element).trigger(o), !o.isDefaultPrevented()) {
                     if (e(r).removeClass(eS.SHOW), "ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), this._activeTrigger[eI.CLICK] = !1, this._activeTrigger[eI.FOCUS] = !1, this._activeTrigger[eI.HOVER] = !1, e(this.tip).hasClass(eS.FADE)) {
                         var a = l.getTransitionDurationFromElement(r);
                         e(r).one(l.TRANSITION_END, s).emulateTransitionEnd(a)
                     } else s();
                     this._hoverState = ""
                 }
             }, n.update = function t() {
                 null !== this._popper && this._popper.scheduleUpdate()
             }, n.isWithContent = function t() {
                 return Boolean(this.getTitle())
             }, n.addAttachmentClass = function t(n) {
                 e(this.getTipElement()).addClass(ed + "-" + n)
             }, n.getTipElement = function t() {
                 return this.tip = this.tip || e(this.config.template)[0], this.tip
             }, n.setContent = function t() {
                 var n = this.getTipElement();
                 this.setElementContent(e(n.querySelectorAll(ey.TOOLTIP_INNER)), this.getTitle()), e(n).removeClass(eS.FADE + " " + eS.SHOW)
             }, n.setElementContent = function t(n, i) {
                 if ("object" == typeof i && (i.nodeType || i.jquery)) {
                     this.config.html ? e(i).parent().is(n) || n.empty().append(i) : n.text(e(i).text());
                     return
                 }
                 this.config.html ? (this.config.sanitize && (i = el(i, this.config.whiteList, this.config.sanitizeFn)), n.html(i)) : n.text(i)
             }, n.getTitle = function t() {
                 var e = this.element.getAttribute("data-original-title");
                 return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
             }, n._getOffset = function t() {
                 var e = this,
                     n = {};
                 return "function" == typeof this.config.offset ? n.fn = function(t) {
                     return t.offsets = o({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t
                 } : n.offset = this.config.offset, n
             }, n._getContainer = function t() {
                 return !1 === this.config.container ? document.body : l.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container)
             }, n._getAttachment = function t(e) {
                 return e8[e.toUpperCase()]
             }, n._setListeners = function t() {
                 var n = this;
                 this.config.trigger.split(" ").forEach(function(t) {
                     if ("click" === t) e(n.element).on(n.constructor.Event.CLICK, n.config.selector, function(t) {
                         return n.toggle(t)
                     });
                     else if (t !== eI.MANUAL) {
                         var i = t === eI.HOVER ? n.constructor.Event.MOUSEENTER : n.constructor.Event.FOCUSIN,
                             r = t === eI.HOVER ? n.constructor.Event.MOUSELEAVE : n.constructor.Event.FOCUSOUT;
                         e(n.element).on(i, n.config.selector, function(t) {
                             return n._enter(t)
                         }).on(r, n.config.selector, function(t) {
                             return n._leave(t)
                         })
                     }
                 }), e(this.element).closest(".modal").on("hide.bs.modal", function() {
                     n.element && n.hide()
                 }), this.config.selector ? this.config = o({}, this.config, {
                     trigger: "manual",
                     selector: ""
                 }) : this._fixTitle()
             }, n._fixTitle = function t() {
                 var e = typeof this.element.getAttribute("data-original-title");
                 (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
             }, n._enter = function t(n, i) {
                 var r = this.constructor.DATA_KEY;
                 if ((i = i || e(n.currentTarget).data(r)) || (i = new this.constructor(n.currentTarget, this._getDelegateConfig()), e(n.currentTarget).data(r, i)), n && (i._activeTrigger["focusin" === n.type ? eI.FOCUS : eI.HOVER] = !0), e(i.getTipElement()).hasClass(eS.SHOW) || i._hoverState === eE.SHOW) {
                     i._hoverState = eE.SHOW;
                     return
                 }
                 if (clearTimeout(i._timeout), i._hoverState = eE.SHOW, !i.config.delay || !i.config.delay.show) {
                     i.show();
                     return
                 }
                 i._timeout = setTimeout(function() {
                     i._hoverState === eE.SHOW && i.show()
                 }, i.config.delay.show)
             }, n._leave = function t(n, i) {
                 var r = this.constructor.DATA_KEY;
                 if ((i = i || e(n.currentTarget).data(r)) || (i = new this.constructor(n.currentTarget, this._getDelegateConfig()), e(n.currentTarget).data(r, i)), n && (i._activeTrigger["focusout" === n.type ? eI.FOCUS : eI.HOVER] = !1), !i._isWithActiveTrigger()) {
                     if (clearTimeout(i._timeout), i._hoverState = eE.OUT, !i.config.delay || !i.config.delay.hide) {
                         i.hide();
                         return
                     }
                     i._timeout = setTimeout(function() {
                         i._hoverState === eE.OUT && i.hide()
                     }, i.config.delay.hide)
                 }
             }, n._isWithActiveTrigger = function t() {
                 for (var e in this._activeTrigger)
                     if (this._activeTrigger[e]) return !0;
                 return !1
             }, n._getConfig = function t(n) {
                 var i = e(this.element).data();
                 return Object.keys(i).forEach(function(t) {
                     -1 !== eg.indexOf(t) && delete i[t]
                 }), "number" == typeof(n = o({}, this.constructor.Default, i, "object" == typeof n && n ? n : {})).delay && (n.delay = {
                     show: n.delay,
                     hide: n.delay
                 }), "number" == typeof n.title && (n.title = n.title.toString()), "number" == typeof n.content && (n.content = n.content.toString()), l.typeCheckConfig(ec, n, this.constructor.DefaultType), n.sanitize && (n.template = el(n.template, n.whiteList, n.sanitizeFn)), n
             }, n._getDelegateConfig = function t() {
                 var e = {};
                 if (this.config)
                     for (var n in this.config) this.constructor.Default[n] !== this.config[n] && (e[n] = this.config[n]);
                 return e
             }, n._cleanTipClass = function t() {
                 var n = e(this.getTipElement()),
                     i = n.attr("class").match(ep);
                 null !== i && i.length && n.removeClass(i.join(""))
             }, n._handlePopperPlacementChange = function t(e) {
                 var n = e.instance;
                 this.tip = n.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
             }, n._fixTransition = function t() {
                 var n = this.getTipElement(),
                     i = this.config.animation;
                 null === n.getAttribute("x-placement") && (e(n).removeClass(eS.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = i)
             }, t._jQueryInterface = function n(i) {
                 return this.each(function() {
                     var n = e(this).data(eh);
                     if (!(!n && /dispose|hide/.test(i)) && (n || (n = new t(this, "object" == typeof i && i), e(this).data(eh, n)), "string" == typeof i)) {
                         if (void 0 === n[i]) throw TypeError('No method named "' + i + '"');
                         n[i]()
                     }
                 })
             }, i(t, null, [{
                 key: "VERSION",
                 get: function t() {
                     return "4.3.1"
                 }
             }, {
                 key: "Default",
                 get: function t() {
                     return ev
                 }
             }, {
                 key: "NAME",
                 get: function t() {
                     return ec
                 }
             }, {
                 key: "DATA_KEY",
                 get: function t() {
                     return eh
                 }
             }, {
                 key: "Event",
                 get: function t() {
                     return eT
                 }
             }, {
                 key: "EVENT_KEY",
                 get: function t() {
                     return ef
                 }
             }, {
                 key: "DefaultType",
                 get: function t() {
                     return em
                 }
             }]), t
         }();
     e.fn[ec] = eC._jQueryInterface, e.fn[ec].Constructor = eC, e.fn[ec].noConflict = function() {
         return e.fn[ec] = eu, eC._jQueryInterface
     };
     var eA = "popover",
         eO = "bs.popover",
         eD = "." + eO,
         eb = e.fn[eA],
         eN = "bs-popover",
         e$ = RegExp("(^|\\s)" + eN + "\\S+", "g"),
         ew = o({}, eC.Default, {
             placement: "right",
             trigger: "click",
             content: "",
             template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
         }),
         eL = o({}, eC.DefaultType, {
             content: "(string|element|function)"
         }),
         eP = {
             FADE: "fade",
             SHOW: "show"
         },
         eH = {
             TITLE: ".popover-header",
             CONTENT: ".popover-body"
         },
         e_ = {
             HIDE: "hide" + eD,
             HIDDEN: "hidden" + eD,
             SHOW: "show" + eD,
             SHOWN: "shown" + eD,
             INSERTED: "inserted" + eD,
             CLICK: "click" + eD,
             FOCUSIN: "focusin" + eD,
             FOCUSOUT: "focusout" + eD,
             MOUSEENTER: "mouseenter" + eD,
             MOUSELEAVE: "mouseleave" + eD
         },
         eR = function(t) {
             function n() {
                 return t.apply(this, arguments) || this
             }
             r = n, o = t, r.prototype = Object.create(o.prototype), r.prototype.constructor = r, r.__proto__ = o;
             var r, o, s = n.prototype;
             return s.isWithContent = function t() {
                 return this.getTitle() || this._getContent()
             }, s.addAttachmentClass = function t(n) {
                 e(this.getTipElement()).addClass(eN + "-" + n)
             }, s.getTipElement = function t() {
                 return this.tip = this.tip || e(this.config.template)[0], this.tip
             }, s.setContent = function t() {
                 var n = e(this.getTipElement());
                 this.setElementContent(n.find(eH.TITLE), this.getTitle());
                 var i = this._getContent();
                 "function" == typeof i && (i = i.call(this.element)), this.setElementContent(n.find(eH.CONTENT), i), n.removeClass(eP.FADE + " " + eP.SHOW)
             }, s._getContent = function t() {
                 return this.element.getAttribute("data-content") || this.config.content
             }, s._cleanTipClass = function t() {
                 var n = e(this.getTipElement()),
                     i = n.attr("class").match(e$);
                 null !== i && i.length > 0 && n.removeClass(i.join(""))
             }, n._jQueryInterface = function t(i) {
                 return this.each(function() {
                     var t = e(this).data(eO);
                     if (!(!t && /dispose|hide/.test(i)) && (t || (t = new n(this, "object" == typeof i ? i : null), e(this).data(eO, t)), "string" == typeof i)) {
                         if (void 0 === t[i]) throw TypeError('No method named "' + i + '"');
                         t[i]()
                     }
                 })
             }, i(n, null, [{
                 key: "VERSION",
                 get: function t() {
                     return "4.3.1"
                 }
             }, {
                 key: "Default",
                 get: function t() {
                     return ew
                 }
             }, {
                 key: "NAME",
                 get: function t() {
                     return eA
                 }
             }, {
                 key: "DATA_KEY",
                 get: function t() {
                     return eO
                 }
             }, {
                 key: "Event",
                 get: function t() {
                     return e_
                 }
             }, {
                 key: "EVENT_KEY",
                 get: function t() {
                     return eD
                 }
             }, {
                 key: "DefaultType",
                 get: function t() {
                     return eL
                 }
             }]), n
         }(eC);
     e.fn[eA] = eR._jQueryInterface, e.fn[eA].Constructor = eR, e.fn[eA].noConflict = function() {
         return e.fn[eA] = eb, eR._jQueryInterface
     };
     var eW = "scrollspy",
         ek = "bs.scrollspy",
         ex = "." + ek,
         eF = e.fn[eW],
         eU = {
             offset: 10,
             method: "auto",
             target: ""
         },
         eM = {
             offset: "number",
             method: "string",
             target: "(string|element)"
         },
         eV = {
             ACTIVATE: "activate" + ex,
             SCROLL: "scroll" + ex,
             LOAD_DATA_API: "load" + ex + ".data-api"
         },
         ej = {
             DROPDOWN_ITEM: "dropdown-item",
             DROPDOWN_MENU: "dropdown-menu",
             ACTIVE: "active"
         },
         eB = {
             DATA_SPY: '[data-spy="scroll"]',
             ACTIVE: ".active",
             NAV_LIST_GROUP: ".nav, .list-group",
             NAV_LINKS: ".nav-link",
             NAV_ITEMS: ".nav-item",
             LIST_ITEMS: ".list-group-item",
             DROPDOWN: ".dropdown",
             DROPDOWN_ITEMS: ".dropdown-item",
             DROPDOWN_TOGGLE: ".dropdown-toggle"
         },
         eG = {
             OFFSET: "offset",
             POSITION: "position"
         },
         eK = function() {
             function t(t, n) {
                 var i = this;
                 this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " " + eB.NAV_LINKS + "," + (this._config.target + " ") + eB.LIST_ITEMS + "," + this._config.target + " " + eB.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on(eV.SCROLL, function(t) {
                     return i._process(t)
                 }), this.refresh(), this._process()
             }
             var n = t.prototype;
             return n.refresh = function t() {
                 var n = this,
                     i = this._scrollElement === this._scrollElement.window ? eG.OFFSET : eG.POSITION,
                     r = "auto" === this._config.method ? i : this._config.method,
                     o = r === eG.POSITION ? this._getScrollTop() : 0;
                 this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(t) {
                     var n, i = l.getSelectorFromElement(t);
                     if (i && (n = document.querySelector(i)), n) {
                         var s = n.getBoundingClientRect();
                         if (s.width || s.height) return [e(n)[r]().top + o, i]
                     }
                     return null
                 }).filter(function(t) {
                     return t
                 }).sort(function(t, e) {
                     return t[0] - e[0]
                 }).forEach(function(t) {
                     n._offsets.push(t[0]), n._targets.push(t[1])
                 })
             }, n.dispose = function t() {
                 e.removeData(this._element, ek), e(this._scrollElement).off(ex), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
             }, n._getConfig = function t(n) {
                 if ("string" != typeof(n = o({}, eU, "object" == typeof n && n ? n : {})).target) {
                     var i = e(n.target).attr("id");
                     i || (i = l.getUID(eW), e(n.target).attr("id", i)), n.target = "#" + i
                 }
                 return l.typeCheckConfig(eW, n, eM), n
             }, n._getScrollTop = function t() {
                 return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
             }, n._getScrollHeight = function t() {
                 return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
             }, n._getOffsetHeight = function t() {
                 return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
             }, n._process = function t() {
                 var e = this._getScrollTop() + this._config.offset,
                     n = this._getScrollHeight(),
                     i = this._config.offset + n - this._getOffsetHeight();
                 if (this._scrollHeight !== n && this.refresh(), e >= i) {
                     var r = this._targets[this._targets.length - 1];
                     this._activeTarget !== r && this._activate(r);
                     return
                 }
                 if (this._activeTarget && e < this._offsets[0] && this._offsets[0] > 0) {
                     this._activeTarget = null, this._clear();
                     return
                 }
                 for (var o = this._offsets.length, s = o; s--;) this._activeTarget !== this._targets[s] && e >= this._offsets[s] && (void 0 === this._offsets[s + 1] || e < this._offsets[s + 1]) && this._activate(this._targets[s])
             }, n._activate = function t(n) {
                 this._activeTarget = n, this._clear();
                 var i = this._selector.split(",").map(function(t) {
                         return t + '[data-target="' + n + '"],' + t + '[href="' + n + '"]'
                     }),
                     r = e([].slice.call(document.querySelectorAll(i.join(","))));
                 r.hasClass(ej.DROPDOWN_ITEM) ? (r.closest(eB.DROPDOWN).find(eB.DROPDOWN_TOGGLE).addClass(ej.ACTIVE), r.addClass(ej.ACTIVE)) : (r.addClass(ej.ACTIVE), r.parents(eB.NAV_LIST_GROUP).prev(eB.NAV_LINKS + ", " + eB.LIST_ITEMS).addClass(ej.ACTIVE), r.parents(eB.NAV_LIST_GROUP).prev(eB.NAV_ITEMS).children(eB.NAV_LINKS).addClass(ej.ACTIVE)), e(this._scrollElement).trigger(eV.ACTIVATE, {
                     relatedTarget: n
                 })
             }, n._clear = function t() {
                 [].slice.call(document.querySelectorAll(this._selector)).filter(function(t) {
                     return t.classList.contains(ej.ACTIVE)
                 }).forEach(function(t) {
                     return t.classList.remove(ej.ACTIVE)
                 })
             }, t._jQueryInterface = function n(i) {
                 return this.each(function() {
                     var n = e(this).data(ek);
                     if (n || (n = new t(this, "object" == typeof i && i), e(this).data(ek, n)), "string" == typeof i) {
                         if (void 0 === n[i]) throw TypeError('No method named "' + i + '"');
                         n[i]()
                     }
                 })
             }, i(t, null, [{
                 key: "VERSION",
                 get: function t() {
                     return "4.3.1"
                 }
             }, {
                 key: "Default",
                 get: function t() {
                     return eU
                 }
             }]), t
         }();
     e(window).on(eV.LOAD_DATA_API, function() {
         for (var t = [].slice.call(document.querySelectorAll(eB.DATA_SPY)), n = t.length, i = n; i--;) {
             var r = e(t[i]);
             eK._jQueryInterface.call(r, r.data())
         }
     }), e.fn[eW] = eK._jQueryInterface, e.fn[eW].Constructor = eK, e.fn[eW].noConflict = function() {
         return e.fn[eW] = eF, eK._jQueryInterface
     };
     var eq = "bs.tab",
         eQ = "." + eq,
         eY = e.fn.tab,
         e0 = {
             HIDE: "hide" + eQ,
             HIDDEN: "hidden" + eQ,
             SHOW: "show" + eQ,
             SHOWN: "shown" + eQ,
             CLICK_DATA_API: "click" + eQ + ".data-api"
         },
         e1 = {
             DROPDOWN_MENU: "dropdown-menu",
             ACTIVE: "active",
             DISABLED: "disabled",
             FADE: "fade",
             SHOW: "show"
         },
         eX = {
             DROPDOWN: ".dropdown",
             NAV_LIST_GROUP: ".nav, .list-group",
             ACTIVE: ".active",
             ACTIVE_UL: "> li > .active",
             DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
             DROPDOWN_TOGGLE: ".dropdown-toggle",
             DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
         },
         e2 = function() {
             function t(t) {
                 this._element = t
             }
             var n = t.prototype;
             return n.show = function t() {
                 var n, i, r = this;
                 if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(e1.ACTIVE) || e(this._element).hasClass(e1.DISABLED))) {
                     var o = e(this._element).closest(eX.NAV_LIST_GROUP)[0],
                         s = l.getSelectorFromElement(this._element);
                     if (o) {
                         var a = "UL" === o.nodeName || "OL" === o.nodeName ? eX.ACTIVE_UL : eX.ACTIVE;
                         i = (i = e.makeArray(e(o).find(a)))[i.length - 1]
                     }
                     var c = e.Event(e0.HIDE, {
                             relatedTarget: this._element
                         }),
                         h = e.Event(e0.SHOW, {
                             relatedTarget: i
                         });
                     if (i && e(i).trigger(c), e(this._element).trigger(h), !(h.isDefaultPrevented() || c.isDefaultPrevented())) {
                         s && (n = document.querySelector(s)), this._activate(this._element, o);
                         var f = function t() {
                             var n = e.Event(e0.HIDDEN, {
                                     relatedTarget: r._element
                                 }),
                                 o = e.Event(e0.SHOWN, {
                                     relatedTarget: i
                                 });
                             e(i).trigger(n), e(r._element).trigger(o)
                         };
                         n ? this._activate(n, n.parentNode, f) : f()
                     }
                 }
             }, n.dispose = function t() {
                 e.removeData(this._element, eq), this._element = null
             }, n._activate = function t(n, i, r) {
                 var o = this,
                     s = (i && ("UL" === i.nodeName || "OL" === i.nodeName) ? e(i).find(eX.ACTIVE_UL) : e(i).children(eX.ACTIVE))[0],
                     a = r && s && e(s).hasClass(e1.FADE),
                     c = function t() {
                         return o._transitionComplete(n, s, r)
                     };
                 if (s && a) {
                     var h = l.getTransitionDurationFromElement(s);
                     e(s).removeClass(e1.SHOW).one(l.TRANSITION_END, c).emulateTransitionEnd(h)
                 } else c()
             }, n._transitionComplete = function t(n, i, r) {
                 if (i) {
                     e(i).removeClass(e1.ACTIVE);
                     var o = e(i.parentNode).find(eX.DROPDOWN_ACTIVE_CHILD)[0];
                     o && e(o).removeClass(e1.ACTIVE), "tab" === i.getAttribute("role") && i.setAttribute("aria-selected", !1)
                 }
                 if (e(n).addClass(e1.ACTIVE), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !0), l.reflow(n), n.classList.contains(e1.FADE) && n.classList.add(e1.SHOW), n.parentNode && e(n.parentNode).hasClass(e1.DROPDOWN_MENU)) {
                     var s = e(n).closest(eX.DROPDOWN)[0];
                     s && e([].slice.call(s.querySelectorAll(eX.DROPDOWN_TOGGLE))).addClass(e1.ACTIVE), n.setAttribute("aria-expanded", !0)
                 }
                 r && r()
             }, t._jQueryInterface = function n(i) {
                 return this.each(function() {
                     var n = e(this),
                         r = n.data(eq);
                     if (r || (r = new t(this), n.data(eq, r)), "string" == typeof i) {
                         if (void 0 === r[i]) throw TypeError('No method named "' + i + '"');
                         r[i]()
                     }
                 })
             }, i(t, null, [{
                 key: "VERSION",
                 get: function t() {
                     return "4.3.1"
                 }
             }]), t
         }();
     e(document).on(e0.CLICK_DATA_API, eX.DATA_TOGGLE, function(t) {
         t.preventDefault(), e2._jQueryInterface.call(e(this), "show")
     }), e.fn.tab = e2._jQueryInterface, e.fn.tab.Constructor = e2, e.fn.tab.noConflict = function() {
         return e.fn.tab = eY, e2._jQueryInterface
     };
     var ez = "toast",
         e3 = "bs.toast",
         e7 = "." + e3,
         e5 = e.fn[ez],
         e6 = {
             CLICK_DISMISS: "click.dismiss" + e7,
             HIDE: "hide" + e7,
             HIDDEN: "hidden" + e7,
             SHOW: "show" + e7,
             SHOWN: "shown" + e7
         },
         e9 = {
             FADE: "fade",
             HIDE: "hide",
             SHOW: "show",
             SHOWING: "showing"
         },
         eJ = {
             animation: "boolean",
             autohide: "boolean",
             delay: "number"
         },
         eZ = {
             animation: !0,
             autohide: !0,
             delay: 500
         },
         e4 = {
             DATA_DISMISS: '[data-dismiss="toast"]'
         },
         nt = function() {
             function t(t, e) {
                 this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
             }
             var n = t.prototype;
             return n.show = function t() {
                 var n = this;
                 e(this._element).trigger(e6.SHOW), this._config.animation && this._element.classList.add(e9.FADE);
                 var i = function t() {
                     n._element.classList.remove(e9.SHOWING), n._element.classList.add(e9.SHOW), e(n._element).trigger(e6.SHOWN), n._config.autohide && n.hide()
                 };
                 if (this._element.classList.remove(e9.HIDE), this._element.classList.add(e9.SHOWING), this._config.animation) {
                     var r = l.getTransitionDurationFromElement(this._element);
                     e(this._element).one(l.TRANSITION_END, i).emulateTransitionEnd(r)
                 } else i()
             }, n.hide = function t(n) {
                 var i = this;
                 this._element.classList.contains(e9.SHOW) && (e(this._element).trigger(e6.HIDE), n ? this._close() : this._timeout = setTimeout(function() {
                     i._close()
                 }, this._config.delay))
             }, n.dispose = function t() {
                 clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(e9.SHOW) && this._element.classList.remove(e9.SHOW), e(this._element).off(e6.CLICK_DISMISS), e.removeData(this._element, e3), this._element = null, this._config = null
             }, n._getConfig = function t(n) {
                 return n = o({}, eZ, e(this._element).data(), "object" == typeof n && n ? n : {}), l.typeCheckConfig(ez, n, this.constructor.DefaultType), n
             }, n._setListeners = function t() {
                 var n = this;
                 e(this._element).on(e6.CLICK_DISMISS, e4.DATA_DISMISS, function() {
                     return n.hide(!0)
                 })
             }, n._close = function t() {
                 var n = this,
                     i = function t() {
                         n._element.classList.add(e9.HIDE), e(n._element).trigger(e6.HIDDEN)
                     };
                 if (this._element.classList.remove(e9.SHOW), this._config.animation) {
                     var r = l.getTransitionDurationFromElement(this._element);
                     e(this._element).one(l.TRANSITION_END, i).emulateTransitionEnd(r)
                 } else i()
             }, t._jQueryInterface = function n(i) {
                 return this.each(function() {
                     var n = e(this),
                         r = n.data(e3);
                     if (r || (r = new t(this, "object" == typeof i && i), n.data(e3, r)), "string" == typeof i) {
                         if (void 0 === r[i]) throw TypeError('No method named "' + i + '"');
                         r[i](this)
                     }
                 })
             }, i(t, null, [{
                 key: "VERSION",
                 get: function t() {
                     return "4.3.1"
                 }
             }, {
                 key: "DefaultType",
                 get: function t() {
                     return eJ
                 }
             }, {
                 key: "Default",
                 get: function t() {
                     return eZ
                 }
             }]), t
         }();
     e.fn[ez] = nt._jQueryInterface, e.fn[ez].Constructor = nt, e.fn[ez].noConflict = function() {
             return e.fn[ez] = e5, nt._jQueryInterface
         },
         function() {
             if (void 0 === e) throw TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
             var t = e.fn.jquery.split(" ")[0].split(".");
             if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4) throw Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
         }(), t.Util = l, t.Alert = g, t.Button = A, t.Carousel = k, t.Collapse = Q, t.Dropdown = t5, t.Modal = er, t.Popover = eR, t.Scrollspy = eK, t.Tab = e2, t.Toast = nt, t.Tooltip = eC, Object.defineProperty(t, "__esModule", {
             value: !0
         })
 });