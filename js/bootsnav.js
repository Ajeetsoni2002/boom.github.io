! function(a) {
    "use strict";
    var n = {
        initialize: function() {
            this.event(), this.hoverDropdown(), this.navbarSticky(), this.navbarScrollspy()
        },
        event: function() {
            var n = a("nav.navbar.bootsnav");
            if (n.hasClass("navbar-sticky") && n.wrap("<div class='wrap-sticky'></div>"), n.hasClass("brand-center")) {
                var s = [],
                    o = a("nav.brand-center"),
                    e = o.find("ul.navbar-nav");
                o.prepend("<span class='storage-name' style='display:none;'></span>"), o.find("ul.navbar-nav > li").each(function() {
                    if (a(this).hasClass("active")) {
                        var n = a("a", this).eq(0).text();
                        a(".storage-name").html(n)
                    }
                    s.push(a(this).html())
                });
                var t = s.splice(0, Math.round(s.length / 2)),
                    i = "",
                    l = function(a) {
                        i = "";
                        for (var n = 0; n < a.length; n++) i += "<li>" + a[n] + "</li>"
                    };
                l(t), e.html(i), o.find("ul.nav").first().addClass("navbar-left"), l(s), e.after('<ul class="nav navbar-nav"></ul>').next().html(i), o.find("ul.nav").last().addClass("navbar-right"), o.find("ul.nav.navbar-left").wrap("<div class='col-half left'></div>"), o.find("ul.nav.navbar-right").wrap("<div class='col-half right'></div>"), o.find("ul.navbar-nav > li").each(function() {
                    var n = a("ul.dropdown-menu", this),
                        s = a("ul.simple-dropdown", this),
                        o = a("ul.megamenu-content", this);
                    n.closest("li").addClass("dropdown"), s.closest("li").addClass("simple-dropdown"), o.closest("li").addClass("megamenu-fw")
                });
                var r = a(".storage-name").html();
                "" == !r && a("ul.navbar-nav > li:contains('" + r + "')").addClass("active")
            }
            n.hasClass("navbar-sidebar") ? (a("body").addClass("wrap-nav-sidebar"), n.wrapInner("<div class='scroller'></div>")) : a(".bootsnav").addClass("on"), n.find("ul.nav").hasClass("navbar-center") && n.addClass("menu-center"), n.hasClass("navbar-full") ? (a("nav.navbar.bootsnav").find("ul.nav").wrap("<div class='wrap-full-menu'></div>"), a(".wrap-full-menu").wrap("<div class='nav-full'></div>"), a("ul.nav.navbar-nav").prepend("<li class='close-full-menu'><a href='#'><i class='fa fa-times'></i></a></li>")) : n.hasClass("navbar-mobile") ? n.removeClass("no-full") : n.addClass("no-full"), n.hasClass("navbar-mobile") && (a(".navbar-collapse").on("shown.bs.collapse", function() {
                a("body").addClass("side-right")
            }), a(".navbar-collapse").on("hide.bs.collapse", function() {
                a("body").removeClass("side-right")
            }), a(window).on("resize", function() {
                a("body").removeClass("side-right")
            })), n.hasClass("no-background") && a(window).on("scroll", function() {
                a(window).scrollTop() > 34 ? a(".navbar-fixed").removeClass("no-background") : a(".navbar-fixed").addClass("no-background")
            }), n.hasClass("navbar-transparent") && a(window).on("scroll", function() {
                a(window).scrollTop() > 34 ? a(".navbar-fixed").removeClass("navbar-transparent") : a(".navbar-fixed").addClass("navbar-transparent")
            }), a(".btn-cart").on("click", function(a) {
                a.stopPropagation()
            }), a("nav.navbar.bootsnav .attr-nav").each(function() {
                a("li.search > a", this).on("click", function(n) {
                    n.preventDefault(), a(".top-search").slideToggle()
                })
            }), a(".input-group-addon.close-search").on("click", function() {
                a(".top-search").slideUp()
            }), a("nav.navbar.bootsnav .attr-nav").each(function() {
                a("li.side-menu > a", this).on("click", function(n) {
                    n.preventDefault(), a("nav.navbar.bootsnav > .side").toggleClass("on"), a("body").toggleClass("on-side")
                })
            }), a(".side .close-side").on("click", function(n) {
                n.preventDefault(), a("nav.navbar.bootsnav > .side").removeClass("on"), a("body").removeClass("on-side")
            })
        },
        hoverDropdown: function() {
            var n = a("nav.navbar.bootsnav"),
                s = a(window).width(),
                o = a(window).height(),
                e = n.find("ul.nav").data("in"),
                t = n.find("ul.nav").data("out");
            if (s < 991) {
                a(".scroller").css("height", "auto"), a("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseenter"), a("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseleave"), a("nav.navbar.bootsnav ul.nav").find(".title").off("mouseenter"), a("nav.navbar.bootsnav ul.nav").off("mouseleave"), a(".navbar-collapse").removeClass("animated"), a("nav.navbar.bootsnav ul.nav").each(function() {
                    a(".dropdown-menu", this).addClass("animated"), a(".dropdown-menu", this).removeClass(t), a("a.dropdown-toggle", this).off("click"), a("a.dropdown-toggle", this).on("click", function(n) {
                        return n.stopPropagation(), a(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle().toggleClass(e), a(this).closest("li.dropdown").first().toggleClass("on"), !1
                    }), a("li.dropdown", this).each(function() {
                        return a(this).find(".dropdown-menu").stop().fadeOut("fast"), a(this).on("hidden.bs.dropdown", function() {
                            a(this).find(".dropdown-menu").stop().fadeOut("fast")
                        }), !1
                    }), a(".megamenu-fw", this).each(function() {
                        a(".col-menu", this).each(function() {
                            a(".content", this).addClass("animated"), a(".content", this).stop().fadeOut(), a(".title", this).off("click"), a(".title", this).on("click", function() {
                                return a(this).closest(".col-menu").find(".content").stop().fadeToggle("fast").addClass(e), a(this).closest(".col-menu").toggleClass("on"), !1
                            }), a(".content", this).on("click", function(a) {
                                a.stopPropagation()
                            })
                        })
                    })
                });
                var i = function() {
                    a("li.dropdown", this).removeClass("on"), a(".dropdown-menu", this).stop().fadeOut("fast"), a(".dropdown-menu", this).removeClass(e), a(".col-menu", this).removeClass("on"), a(".col-menu .content", this).stop().fadeOut("fast"), a(".col-menu .content", this).removeClass(e)
                };
                a("nav.navbar.bootsnav").on("mouseleave", function() {
                    i()
                }), a("nav.navbar.bootsnav .attr-nav").each(function() {
                    a(".dropdown-menu", this).removeClass("animated"), a("li.dropdown", this).off("mouseenter"), a("li.dropdown", this).off("mouseleave"), a("a.dropdown-toggle", this).off("click"), a("a.dropdown-toggle", this).on("click", function(n) {
                        n.stopPropagation(), a(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle(), a(".navbar-toggle").each(function() {
                            a(".fa", this).removeClass("fa-times"), a(".fa", this).addClass("fa-bars"), a(".navbar-collapse").removeClass("in"), a(".navbar-collapse").removeClass("on")
                        })
                    }), a(this).on("mouseleave", function() {
                        return a(".dropdown-menu", this).stop().fadeOut(), a("li.dropdown", this).removeClass("on"), !1
                    })
                }), a(".navbar-toggle").each(function() {
                    a(this).off("click"), a(this).on("click", function() {
                        a(".fa", this).toggleClass("fa-bars"), a(".fa", this).toggleClass("fa-times"), i()
                    })
                })
            } else s > 991 && ((a(".scroller").css("height", o + "px"), n.hasClass("navbar-sidebar")) ? a("nav.navbar.bootsnav ul.nav").each(function() {
                a("a.dropdown-toggle", this).off("click"), a("a.dropdown-toggle", this).on("click", function(a) {
                    a.stopPropagation()
                }), a(".dropdown-menu", this).addClass("animated"), a("li.dropdown", this).on("mouseenter", function() {
                    return a(".dropdown-menu", this).eq(0).removeClass(t), a(".dropdown-menu", this).eq(0).stop().fadeIn("fast").addClass(e), a(this).addClass("on"), !1
                }), a(".col-menu").each(function() {
                    a(".content", this).addClass("animated"), a(".title", this).on("mouseenter", function() {
                        return a(this).closest(".col-menu").find(".content").stop().fadeIn("fast").addClass(e), a(this).closest(".col-menu").addClass("on"), !1
                    })
                }), a(this).on("mouseleave", function() {
                    return a(".dropdown-menu", this).stop().removeClass(e), a(".dropdown-menu", this).stop().addClass(t).fadeOut("fast"), a(".col-menu", this).find(".content").stop().fadeOut("fast").removeClass(e), a(".col-menu", this).removeClass("on"), a("li.dropdown", this).removeClass("on"), !1
                })
            }) : (navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), a("nav.navbar.bootsnav ul.nav").each(function() {
                a("a.dropdown-toggle", this).off("click"), a("a.dropdown-toggle", this).on("click", function(a) {
                    a.stopPropagation()
                }), a(".megamenu-fw", this).each(function() {
                    a(".title", this).off("click"), a("a.dropdown-toggle", this).off("click"), a(".content").removeClass("animated")
                }), a(".dropdown-menu", this).addClass("animated"), (a(".navbar-left-sidebar").length > 0 || a(".left-nav-sidebar").length > 0) && (a("li:not(.dropdown)", this).on("mouseenter", function() {
                    a(this).parent().find(".dropdown-menu").stop().fadeOut("fast")
                }), a(document).on("click", ".side-left-menu-close.active", function(n) {
                    a(this).removeClass("active")
                })), a("li.dropdown", this).on("mouseenter", function() {
                    if (a(".side-left-menu-close").addClass("active"), (a(".navbar-left-sidebar").length > 0 || a(".left-nav-sidebar").length > 0) && (a(this).parent().find(".dropdown").removeClass("on"), a(this).parents(".dropdown-menu").length > 0 ? a(this).parents(".dropdown-menu").find(".dropdown-menu").not(a(".dropdown-menu", this)).stop().fadeOut("fast") : (a(this).parents(".bootsnav .nav").find(".dropdown-menu").not(a(".dropdown-menu", this)).stop().fadeOut("fast"), a(":not(.second-level)", this).find(".third-level").stop().fadeOut("fast")), a(this).parent().hasClass("second-level") ? a(this).parents(".navbar-nav").addClass("enter") : a(this).parent().hasClass("enter") && a(".navbar-nav").removeClass("enter")), a(".dropdown-menu", this).eq(0).removeClass(t), a(".dropdown-menu", this).eq(0).stop().fadeIn("fast").addClass(e), a(this).addClass("on"), a(".navbar-left-sidebar").length > 0 || a(".left-nav-sidebar").length > 0) {
                        if (a(".left-nav-sidebar").length > 0) {
                            var n = a(".sidebar-part1").outerWidth();
                            n += 20, n += a(".left-nav-on .navbar-nav").outerWidth()
                        } else var n = a(".navbar-nav").outerWidth();
                        var s = a(window).width();
                        setTimeout(function() {
                            a(".dropdown").each(function() {
                                a(this).hasClass("on") && (n += a(".dropdown-menu li", this).outerWidth())
                            }), a(".side-left-menu-close").width(s - n)
                        }, 300)
                    }
                    return !1
                }), a("li.dropdown", this).on("mouseleave", function() {
                    if (a(".dropdown-menu", this).eq(0).removeClass(e), ("none" == a(".dropdown-menu", this).css("display") || !(a(".navbar-left-sidebar").length > 0 || a(".left-nav-sidebar").length > 0) || a(this).parents(".bootsnav .nav").hasClass("enter")) && (a(".dropdown-menu", this).eq(0).stop().fadeOut("fast").addClass(t), a(this).removeClass("on")), a(".navbar-left-sidebar").length > 0 || a(".left-nav-sidebar").length > 0) {
                        if (a(".side-left-menu-close").addClass("active"), a(".left-nav-sidebar").length > 0) {
                            var n = a(".sidebar-part1").outerWidth();
                            n += 20, n += a(".left-nav-on .navbar-nav").outerWidth()
                        } else var n = a(".navbar-nav").outerWidth();
                        var s = a(window).width();
                        setTimeout(function() {
                            a(".dropdown").each(function() {
                                a(this).hasClass("on") && (n += a(".dropdown-menu li", this).outerWidth())
                            }), a(".side-left-menu-close").width(s - n)
                        }, 300)
                    }
                }), a(this).on("mouseleave", function() {
                    return a(".dropdown-menu", this).removeClass(e), a(".side-left-menu-close").removeClass("active"), a(".dropdown-menu", this).eq(0).stop().fadeOut("fast").addClass(t), a("li.dropdown", this).removeClass("on"), (a(".navbar-left-sidebar").length > 0 || a(".left-nav-sidebar").length > 0) && (a(".bootsnav .nav").hasClass("enter") ? a(".bootsnav .nav").removeClass("enter") : a(".bootsnav .nav").find(".dropdown-menu").fadeOut("fast")), !1
                })
            })), a("nav.navbar.bootsnav .attr-nav").each(function() {
                a("a.dropdown-toggle", this).off("click"), a("a.dropdown-toggle", this).on("click", function(a) {
                    a.stopPropagation()
                }), a(".dropdown-menu", this).addClass("animated"), a("li.dropdown", this).on("mouseenter", function() {
                    return a(".dropdown-menu", this).eq(0).removeClass(t), a(".dropdown-menu", this).eq(0).stop().fadeIn("fast").addClass(e), a(this).addClass("on"), !1
                }), a("li.dropdown", this).on("mouseleave", function() {
                    a(".dropdown-menu", this).eq(0).removeClass(e), a(".dropdown-menu", this).eq(0).stop().fadeOut("fast").addClass(t), a(this).removeClass("on")
                }), a(this).on("mouseleave", function() {
                    return a(".dropdown-menu", this).removeClass(e), a(".dropdown-menu", this).eq(0).stop().fadeOut("fast").addClass(t), a("li.dropdown", this).removeClass("on"), !1
                })
            }));
            if (n.hasClass("navbar-full")) {
                var l = a(window).height(),
                    r = a(window).width();
                a(".nav-full").css("height", l + "px"), a(".wrap-full-menu").css("height", l + "px"), a(".wrap-full-menu").css("width", r + "px"), a(".navbar-collapse").addClass("animated"), a(".navbar-toggle").each(function() {
                    var n = a(this).data("target");
                    a(this).off("click"), a(this).on("click", function(s) {
                        return s.preventDefault(), a(n).removeClass(t), a(n).addClass("in"), a(n).addClass(e), !1
                    }), a("li.close-full-menu").on("click", function(s) {
                        return s.preventDefault(), a(n).addClass(t), setTimeout(function() {
                            a(n).removeClass("in"), a(n).removeClass(e)
                        }, 500), !1
                    })
                })
            }
        },
        navbarSticky: function() {
            var n = a("nav.navbar.bootsnav");
            if (n.hasClass("navbar-sticky")) {
                var s = n.height();
                a(".wrap-sticky").height(s);
                var o = a(".wrap-sticky").offset().top;
                a(window).on("scroll", function() {
                    a(window).scrollTop() > o ? n.addClass("sticked") : n.removeClass("sticked")
                })
            }
        },
        navbarScrollspy: function() {
            var n = a(".navbar-scrollspy"),
                s = a("body"),
                o = a("nav.navbar.bootsnav"),
                e = o.outerHeight();
            if (n.length) {
                s.scrollspy({
                    target: ".navbar",
                    offset: e
                }), a(".scroll").on("click", function(n) {
                    n.preventDefault(), a(".scroll").removeClass("active"), a(this).addClass("active"), a(".navbar-collapse").removeClass("in"), a(".navbar-toggle").each(function() {
                        a(".fa", this).removeClass("fa-times"), a(".fa", this).addClass("fa-bars")
                    }), a(window).scrollTop();
                    var s = a(this).find("a"),
                        e = a(s.attr("href")).offset().top,
                        t = a(window).width(),
                        i = o.data("minus-value-desktop"),
                        l = o.data("minus-value-mobile"),
                        r = o.data("speed");
                    if (t > 992) var d = e - i;
                    else var d = e - l;
                    a("html, body").stop().animate({
                        scrollTop: d
                    }, r)
                });
                var t = function() {
                    var a = s.data("bs.scrollspy");
                    a && (e = o.outerHeight(), a.options.offset = e, s.data("bs.scrollspy", a), s.scrollspy("refresh"))
                };
                a(window).on("resize", function() {
                    clearTimeout(a);
                    var a = setTimeout(t, 200)
                })
            }
        }
    };
    a(document).ready(function() {
        n.initialize()
    }), a(window).on("resize", function() {
        n.hoverDropdown(), setTimeout(function() {
            n.navbarSticky()
        }, 500), a(".navbar-toggle").each(function() {
            a(".fa", this).removeClass("fa-times"), a(".fa", this).addClass("fa-bars"), a(this).removeClass("fixed")
        }), a(".navbar-collapse").removeClass("in"), a(".navbar-collapse").removeClass("on"), a(".navbar-collapse").removeClass("bounceIn")
    })
}(jQuery);