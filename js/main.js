"use strict";
var lastScroll = 0,
    isMobile = !1,
    isiPhoneiPad = !1;

function SetMegamenuPosition() {
    $(window).width() > 991 ? setTimeout(function() {
        var e = $("nav.navbar").outerHeight();
        $(".mega-menu").css({
            top: e
        }), 0 === $(".navbar-brand-top").length && $(".dropdown.simple-dropdown > .dropdown-menu").css({
            top: e
        })
    }, 200) : ($(".mega-menu").css("top", ""), $(".dropdown.simple-dropdown > .dropdown-menu").css("top", ""))
}

function pad(e) {
    return e < 10 ? "0" + e.toString() : e.toString()
}

function isIE() {
    return !!(window.navigator.userAgent.indexOf("MSIE ") > 0 || navigator.userAgent.match(/Trident.*rv\:11\./))
}

function setPageTitleSpace() {
    if (($(".navbar").hasClass("navbar-top") || $("nav").hasClass("navbar-fixed-top")) && $(".top-space").length > 0) {
        var e = $(".navbar").outerHeight();
        $(".top-header-area").length > 0 && (e += $(".top-header-area").outerHeight()), $(".top-space").css("margin-top", e + "px")
    }
}

function setButtonPosition() {
    if ($(window).width() > 767 && $(".swiper-auto-height-container").length > 0) {
        var e = parseInt($(".swiper-auto-height-container .swiper-slide").css("padding-left")),
            t = parseInt($(".swiper-auto-height-container .swiper-slide").css("padding-bottom")),
            a = parseInt($(".swiper-auto-height-container .slide-banner").outerWidth());
        $(".navigation-area").css({
            left: a + e + "px",
            bottom: t + "px"
        })
    } else $(".swiper-auto-height-container").length > 0 && $(".navigation-area").css({
        left: "",
        bottom: ""
    })
}

function init_scroll_navigate() {
    var e = $(".navbar-nav li a"),
        t = $(document).scrollTop();
    t += 60, e.each(function() {
        var a = $(this),
            i = a.attr("href").indexOf("#");
        if (i > -1) {
            var o = a.attr("href").substring(i);
            if ($(o).length > 0) {
                var n = $(o);
                n.offset().top <= t && n.offset().top + n.height() > t ? (e.not(a).removeClass("active"), a.addClass("active")) : a.removeClass("active")
            }
        }
    });
    var a = $(window),
        i = $(".bg-background-fade"),
        o = $(".color-code"),
        n = a.scrollTop() + a.height() / 2;
    o.each(function() {
        var e = $(this);
        e.position().top <= n && e.position().top + e.height() > n && (i.removeClass(function(e, t) {
            return (t.match(/(^|\s)color-\S+/g) || []).join(" ")
        }), i.addClass("color-" + $(this).data("color")))
    });
    var s = $("nav").outerHeight();
    $("header").hasClass("no-sticky") || ($(document).scrollTop() >= s ? $("header").addClass("sticky") : $(document).scrollTop() <= s && ($("header").removeClass("sticky"), setTimeout(function() {
        setPageTitleSpace()
    }, 500)), SetMegamenuPosition());
    var l = $(this).scrollTop();
    l > lastScroll ? $(".sticky").removeClass("header-appear") : $(".sticky").addClass("header-appear"), (lastScroll = l) <= s && $("header").removeClass("header-appear")
}

function parallax_text() {
    $(window).width() > 1024 && 0 !== $(".swiper-auto-slide .swiper-slide").length && ($(document).on("mousemove", ".swiper-auto-slide .swiper-slide", function(e) {
        var t = e.clientX,
            a = e.clientY;
        t = Math.round(t / 10) - 80, a = Math.round(a / 10) - 40, $(this).find(".parallax-text").css({
            transform: "translate(" + t + "px," + a + "px)",
            "transition-duration": "0s"
        })
    }), $(document).on("mouseout", ".swiper-auto-slide .swiper-slide", function(e) {
        $(".parallax-text").css({
            transform: "translate(0,0)",
            "transition-duration": "0.5s"
        })
    }))
}

function ScrollStop() {
    return !1
}

function ScrollStart() {
    return !0
}

function validationSearchForm() {
    var e = !0;
    return $("#search-header input[type=text]").each(function(t) {
        0 === t && (null === $(this).val() || "" === $(this).val() ? ($("#search-header").find("input:eq(" + t + ")").css({
            border: "none",
            "border-bottom": "2px solid red"
        }), e = !1) : $("#search-header").find("input:eq(" + t + ")").css({
            border: "none",
            "border-bottom": "2px solid #000"
        }))
    }), e
}

function stellarParallax() {
    $(window).width() > 1024 ? $.stellar() : ($.stellar("destroy"), $(".parallax").css("background-position", ""))
}

function fullScreenHeight() {
    var e = $(".full-screen"),
        t = $(window).height();
    e.parents("section").imagesLoaded(function() {
        if ($(".top-space .full-screen").length > 0) {
            var a = $("header nav.navbar").outerHeight();
            $(".top-space .full-screen").css("min-height", t - a)
        } else e.css("min-height", t)
    });
    var a = $(window).width();
    $(".full-screen-width").css("min-width", a);
    var i = $(".sidebar-nav-style-1").height() - $(".logo-holder").parent().height() - $(".footer-holder").parent().height() - 10;
    $(".sidebar-nav-style-1 .nav").css("height", i);
    var o = parseInt($(".sidebar-part2").height() - parseInt($(".sidebar-part2 .sidebar-middle").css("padding-top")) - parseInt($(".sidebar-part2 .sidebar-middle").css("padding-bottom")) - parseInt($(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css("margin-bottom")));
    $(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css("height", o)
}

function SetResizeContent() {
    SetMegamenuPosition(), setPageTitleSpace(), setButtonPosition(), parallax_text(), stellarParallax(), fullScreenHeight()
}
/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (isMobile = !0), /iPhone|iPad|iPod/i.test(navigator.userAgent) && (isiPhoneiPad = !0), $(window).on("scroll", init_scroll_navigate), $(window).resize(function(e) {
    setTimeout(function() {
        SetResizeContent()
    }, 500), $(".menu-back-div").each(function() {
        $(this).attr("style", "")
    }), $(".navbar-collapse").collapse("hide"), e.preventDefault()
}), $(document).ready(function() {
    var e, t = window.location.href.substr(window.location.href.lastIndexOf("/") + 1),
        a = window.location.hash.substring(1);
    a ? (a = "#" + a, t = t.replace(a, "")) : t = t.replace("#", ""), $(".nav li a").each(function() {
        ($(this).attr("href") == t || $(this).attr("href") == t + ".html") && ($(this).parent().addClass("active"), $(this).parents("li.dropdown").addClass("active"))
    }), $(window).scroll(function() {
        $(this).scrollTop() > 150 ? $(".scroll-top-arrow").fadeIn("slow") : $(".scroll-top-arrow").fadeOut("slow")
    }), $(document).on("click", ".scroll-top-arrow", function() {
        return $("html, body").animate({
            scrollTop: 0
        }, 800), !1
    });
    var i = new Swiper(".swiper-full-screen", {
            loop: !0,
            slidesPerView: 1,
            preventClicks: !1,
            allowTouchMove: !0,
            pagination: {
                el: ".swiper-full-screen-pagination",
                clickable: !0
            },
            autoplay: {
                delay: 5e3
            },
            keyboard: {
                enabled: !0
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            on: {
                resize: function() {
                    i.update()
                }
            }
        }),
        o = new Swiper(".swiper-auto-fade", {
            allowTouchMove: !0,
            loop: !0,
            slidesPerView: 1,
            preventClicks: !1,
            effect: "fade",
            autoplay: {
                delay: 5e3
            },
            keyboard: {
                enabled: !0
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            pagination: {
                el: ".swiper-auto-pagination",
                clickable: !0
            },
            on: {
                resize: function() {
                    o.update()
                }
            }
        }),
        n = new Swiper(".swiper-slider-second", {
            allowTouchMove: !0,
            slidesPerView: 1,
            preventClicks: !1,
            keyboard: {
                enabled: !0
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            pagination: {
                el: ".swiper-pagination-second",
                clickable: !0
            },
            on: {
                resize: function() {
                    n.update()
                }
            }
        }),
        s = new Swiper(".swiper-slider-third", {
            allowTouchMove: !0,
            slidesPerView: 1,
            preventClicks: !1,
            keyboard: {
                enabled: !0
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            pagination: {
                el: ".swiper-pagination-third",
                clickable: !0
            },
            on: {
                resize: function() {
                    s.update()
                }
            }
        }),
        l = new Swiper(".swiper-number-pagination", {
            allowTouchMove: !0,
            preventClicks: !1,
            autoplay: {
                delay: 4e3,
                disableOnInteraction: !0
            },
            pagination: {
                el: ".swiper-number",
                clickable: !0,
                renderBullet: function(e, t) {
                    return '<span class="' + t + '">' + pad(e + 1) + "</span>"
                }
            },
            on: {
                resize: function() {
                    l.update()
                }
            }
        }),
        r = new Swiper(".swiper-vertical-pagination", {
            allowTouchMove: !0,
            direction: "vertical",
            slidesPerView: 1,
            spaceBetween: 0,
            preventClicks: !1,
            mousewheel: {
                mousewheel: !0,
                sensitivity: 1,
                releaseOnEdges: !0
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            pagination: {
                el: ".swiper-pagination-vertical",
                clickable: !0
            },
            on: {
                resize: function() {
                    r.update()
                }
            }
        }),
        c = new Swiper(".swiper-slider-clients", {
            allowTouchMove: !0,
            slidesPerView: 4,
            paginationClickable: !0,
            preventClicks: !0,
            autoplay: {
                delay: 3e3,
                disableOnInteraction: !0
            },
            pagination: {
                el: null
            },
            breakpoints: {
                1199: {
                    slidesPerView: 3
                },
                991: {
                    slidesPerView: 2
                },
                767: {
                    slidesPerView: 1
                }
            },
            on: {
                resize: function() {
                    c.update()
                }
            }
        }),
        d = new Swiper(".swiper-slider-clients-second", {
            allowTouchMove: !0,
            slidesPerView: 4,
            paginationClickable: !0,
            preventClicks: !0,
            autoplay: {
                delay: 3e3,
                disableOnInteraction: !0
            },
            pagination: {
                el: null
            },
            breakpoints: {
                1199: {
                    slidesPerView: 3
                },
                991: {
                    slidesPerView: 2
                },
                767: {
                    slidesPerView: 1
                }
            },
            on: {
                resize: function() {
                    d.update()
                }
            }
        }),
        p = new Swiper(".swiper-three-slides", {
            allowTouchMove: !0,
            slidesPerView: 2,
            preventClicks: !1,
            pagination: {
                el: ".swiper-pagination-three-slides",
                clickable: !0
            },
            autoplay: {
                delay: 5e3
            },
            keyboard: {
                enabled: !0
            },
            navigation: {
                nextEl: ".swiper-three-slide-next",
                prevEl: ".swiper-three-slide-prev"
            },
            breakpoints: {
                991: {
                    slidesPerView: 2
                },
                767: {
                    slidesPerView: 1
                }
            },
            on: {
                resize: function() {
                    p.update()
                }
            }
        }),
        u = new Swiper(".swiper-four-slides", {
            allowTouchMove: !0,
            slidesPerView: 4,
            preventClicks: !1,
            pagination: {
                el: ".swiper-pagination-four-slides",
                clickable: !0
            },
            autoplay: {
                delay: 3e3
            },
            keyboard: {
                enabled: !0
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            breakpoints: {
                1199: {
                    slidesPerView: 3
                },
                991: {
                    slidesPerView: 2
                },
                767: {
                    slidesPerView: 1
                }
            },
            on: {
                resize: function() {
                    u.update()
                }
            }
        }),
        h = new Swiper(".swiper-demo-header-style", {
            allowTouchMove: !0,
            loop: !0,
            slidesPerView: 4,
            preventClicks: !0,
            slidesPerGroup: 4,
            pagination: {
                el: ".swiper-pagination-demo-header-style",
                clickable: !0
            },
            autoplay: {
                delay: 3e3
            },
            keyboard: {
                enabled: !0
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            breakpoints: {
                1199: {
                    slidesPerGroup: 2,
                    slidesPerView: 2
                },
                767: {
                    slidesPerGroup: 1,
                    slidesPerView: 1
                }
            },
            on: {
                resize: function() {
                    h.update()
                }
            }
        }),
        f = 0,
        m = new Swiper(".swiper-auto-slide", {
            allowTouchMove: !0,
            slidesPerView: "auto",
            centeredSlides: !0,
            spaceBetween: 80,
            preventClicks: !1,
            observer: !0,
            speed: 1e3,
            pagination: {
                el: null
            },
            scrollbar: {
                el: ".swiper-scrollbar",
                draggable: !0,
                hide: !1,
                snapOnRelease: !0
            },
            autoplay: {
                delay: 3e3
            },
            mousewheel: {
                invert: !1
            },
            keyboard: {
                enabled: !0
            },
            navigation: {
                nextEl: ".swiper-next-style2",
                prevEl: ".swiper-prev-style2"
            },
            breakpoints: {
                1199: {
                    spaceBetween: 60
                },
                960: {
                    spaceBetween: 30
                },
                767: {
                    spaceBetween: 15
                }
            },
            on: {
                resize: function() {
                    m.update()
                }
            }
        });
    if ($(window).width() > 767) var v = new Swiper(".swiper-bottom-scrollbar-full", {
        allowTouchMove: !0,
        slidesPerView: "auto",
        grabCursor: !0,
        preventClicks: !1,
        spaceBetween: 30,
        keyboardControl: !0,
        speed: 1e3,
        pagination: {
            el: null
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: !0,
            hide: !1,
            snapOnRelease: !0
        },
        mousewheel: {
            enable: !0
        },
        keyboard: {
            enabled: !0
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });
    var g = new Swiper(".swiper-auto-height-container", {
            allowTouchMove: !0,
            effect: "fade",
            loop: !0,
            autoHeight: !0,
            pagination: {
                el: ".swiper-auto-height-pagination",
                clickable: !0
            },
            autoplay: {
                delay: 3e3
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            on: {
                resize: function() {
                    g.update()
                }
            }
        }),
        b = new Swiper(".swiper-multy-row-container", {
            allowTouchMove: !0,
            slidesPerView: 3,
            spaceBetween: 15,
            pagination: {
                el: ".swiper-multy-row-pagination",
                clickable: !0
            },
            autoplay: {
                delay: 3e3,
                disableOnInteraction: !0
            },
            navigation: {
                nextEl: ".swiper-portfolio-next",
                prevEl: ".swiper-portfolio-prev"
            },
            breakpoints: {
                991: {
                    slidesPerView: 2
                },
                767: {
                    slidesPerView: 1
                }
            },
            on: {
                resize: function() {
                    b.update()
                }
            }
        }),
        w = new Swiper(".swiper-blog", {
            allowTouchMove: !0,
            slidesPerView: "auto",
            centeredSlides: !0,
            spaceBetween: 15,
            preventClicks: !1,
            loop: !0,
            loopedSlides: 3,
            pagination: {
                el: ".swiper-blog-pagination",
                clickable: !0
            },
            autoplay: {
                delay: 5e3,
                disableOnInteraction: !0
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            on: {
                resize: function() {
                    w.update()
                }
            }
        }),
        b = new Swiper(".swiper-multi-row-container", {
            allowTouchMove: !0,
            slidesPerView: 3,
            spaceBetween: 15,
            pagination: {
                el: ".swiper-multy-row-pagination",
                clickable: !0
            },
            autoplay: {
                delay: 3e3,
                disableOnInteraction: !0
            },
            navigation: {
                nextEl: ".swiper-portfolio-next",
                prevEl: ".swiper-portfolio-prev"
            },
            breakpoints: {
                991: {
                    slidesPerView: 2
                },
                767: {
                    slidesPerView: 1
                }
            },
            on: {
                resize: function() {
                    b.update()
                }
            }
        }),
        b = new Swiper(".swiper-multi-row-two-container", {
            allowTouchMove: !0,
            slidesPerView: 2,
            spaceBetween: 15,
            pagination: {
                el: ".swiper-multy-row-pagination",
                clickable: !0
            },
            autoplay: {
                delay: 3e3,
                disableOnInteraction: !0
            },
            navigation: {
                nextEl: ".swiper-portfolio-next-testi",
                prevEl: ".swiper-portfolio-prev-testi"
            },
            breakpoints: {
                991: {
                    slidesPerView: 2
                },
                767: {
                    slidesPerView: 1
                }
            },
            on: {
                resize: function() {
                    b.update()
                }
            }
        }),
        w = new Swiper(".swiper-blog", {
            allowTouchMove: !0,
            slidesPerView: "auto",
            centeredSlides: !0,
            spaceBetween: 15,
            preventClicks: !1,
            loop: !0,
            loopedSlides: 3,
            pagination: {
                el: ".swiper-blog-pagination",
                clickable: !0
            },
            autoplay: {
                delay: 5e3,
                disableOnInteraction: !0
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            on: {
                resize: function() {
                    w.update()
                }
            }
        }),
        _ = new Swiper(".swiper-presentation", {
            allowTouchMove: !0,
            slidesPerView: 4,
            centeredSlides: !0,
            spaceBetween: 30,
            preventClicks: !0,
            loop: !0,
            loopedSlides: 6,
            pagination: {
                el: ".swiper-presentation-pagination",
                clickable: !0
            },
            autoplay: {
                delay: 3e3,
                disableOnInteraction: !0
            },
            keyboard: {
                enabled: !0
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            breakpoints: {
                991: {
                    spaceBetween: 15,
                    slidesPerView: 2
                },
                767: {
                    slidesPerView: 1
                }
            },
            on: {
                resize: function() {
                    _.update()
                }
            }
        });

    function y() {
        v && (v.detachEvents(), v.destroy(!0, !0), v = void 0), $(".swiper-bottom-scrollbar-full .swiper-wrapper").css("transform", "").css("transition-duration", ""), $(".swiper-bottom-scrollbar-full .swiper-slide").css("margin-right", ""), $(".swiper-bottom-scrollbar-full .swiper-wrapper").removeAttr("style"), $(".swiper-bottom-scrollbar-full .swiper-slide").removeAttr("style"), $(window).width() > 767 && setTimeout(function() {
            v = new Swiper(".swiper-bottom-scrollbar-full", {
                allowTouchMove: !0,
                slidesPerView: "auto",
                grabCursor: !0,
                preventClicks: !1,
                spaceBetween: 30,
                keyboardControl: !0,
                speed: 1e3,
                pagination: {
                    el: null
                },
                scrollbar: {
                    el: ".swiper-scrollbar",
                    draggable: !0,
                    hide: !1,
                    snapOnRelease: !0
                },
                mousewheel: {
                    enable: !0
                },
                keyboard: {
                    enabled: !0
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            })
        }, 500)
    }
    $(window).resize(function() {
        $(".swiper-auto-slide").length > 0 && m && (f = m.activeIndex, m.detachEvents(), m.destroy(!0, !1), m = void 0, $(".swiper-auto-slide .swiper-wrapper").css("transform", "").css("transition-duration", ""), $(".swiper-auto-slide .swiper-slide").css("margin-right", ""), setTimeout(function() {
            (m = new Swiper(".swiper-auto-slide", {
                allowTouchMove: !0,
                slidesPerView: "auto",
                centeredSlides: !0,
                spaceBetween: 80,
                preventClicks: !1,
                mousewheelControl: !0,
                observer: !0,
                speed: 1e3,
                pagination: {
                    el: null
                },
                scrollbar: {
                    el: ".swiper-scrollbar",
                    draggable: !0,
                    hide: !1,
                    snapOnRelease: !0
                },
                autoplay: {
                    delay: 3e3
                },
                keyboard: {
                    enabled: !0
                },
                navigation: {
                    nextEl: ".swiper-next-style2",
                    prevEl: ".swiper-prev-style2"
                },
                breakpoints: {
                    1199: {
                        spaceBetween: 60
                    },
                    960: {
                        spaceBetween: 30
                    },
                    767: {
                        spaceBetween: 15
                    }
                },
                on: {
                    resize: function() {
                        m.update()
                    }
                }
            })).slideTo(f, 1e3, !1)
        }, 1e3)), $(".swiper-bottom-scrollbar-full").length > 0 && (clearTimeout(e), e = setTimeout(y, 1e3)), setTimeout(function() {
            $(".swiper-full-screen").length > 0 && i && i.update(), $(".swiper-auto-fade").length > 0 && o && o.update(), $(".swiper-slider-second").length > 0 && n && n.update(), $(".swiper-slider-third").length > 0 && s && s.update(), $(".swiper-number-pagination").length > 0 && l && l.update(), $(".swiper-vertical-pagination").length > 0 && r && r.update(), $(".swiper-slider-clients").length > 0 && c && c.update(), $(".swiper-slider-clients-second").length > 0 && d && d.update(), $(".swiper-three-slides").length > 0 && p && p.update(), $(".swiper-four-slides").length > 0 && u && u.update(), $(".swiper-demo-header-style").length > 0 && h && h.update(), $(".swiper-auto-slide").length > 0 && m && m.update(), $(".swiper-auto-height-container").length > 0 && g && g.update(), $(".swiper-multy-row-container").length > 0 && b && b.update(), $(".swiper-blog").length > 0 && w && w.update(), $(".swiper-presentation").length > 0 && _ && _.update()
        }, 500), isIE() && setTimeout(function() {
            $(".swiper-full-screen").length > 0 && i && i.update(), $(".swiper-auto-fade").length > 0 && o && o.update(), $(".swiper-slider-second").length > 0 && n && n.update(), $(".swiper-slider-third").length > 0 && s && s.update(), $(".swiper-number-pagination").length > 0 && l && l.update(), $(".swiper-vertical-pagination").length > 0 && r && r.update(), $(".swiper-slider-clients").length > 0 && c && c.update(), $(".swiper-slider-clients-second").length > 0 && d && d.update(), $(".swiper-three-slides").length > 0 && p && p.update(), $(".swiper-four-slides").length > 0 && u && u.update(), $(".swiper-demo-header-style").length > 0 && h && h.update(), $(".swiper-auto-slide").length > 0 && m && m.update(), $(".swiper-auto-height-container").length > 0 && g && g.update(), $(".swiper-multy-row-container").length > 0 && b && b.update(), $(".swiper-blog").length > 0 && w && w.update(), $(".swiper-presentation").length > 0 && _ && _.update()
        }, 500)
    }), $(document).on("click.smoothscroll", "a.scrollto", function(e) {
        e.preventDefault();
        var t = this.hash;
        0 != $(t).length && $("html, body").stop().animate({
            scrollTop: $(t).offset().top
        }, 1200, "easeInOutExpo", function() {
            window.location.hash = t
        })
    }), $(".full-width-pull-menu").length > 0 && $(document).on("click", ".full-width-pull-menu .inner-link", function(e) {
        $(".full-width-pull-menu .close-button-menu").trigger("click");
        var t = $(this);
        setTimeout(function() {
            var e = t.attr("href");
            $(e).length > 0 && $("html, body").stop().animate({
                scrollTop: $(e).offset().top
            })
        }, 500)
    }), $(".navbar-top").length > 0 || $(".navbar-scroll-top").length > 0 || $(".navbar-top-scroll").length > 0 ? $(".inner-link").smoothScroll({
        speed: 900,
        offset: 0
    }) : $(".inner-link").smoothScroll({
        speed: 900,
        offset: -59
    }), $(".section-link").smoothScroll({
        speed: 900,
        offset: 1
    }), $(".chart1").length > 0 && ($(".chart1").appear(), $(".chart1").easyPieChart({
        barColor: "#929292",
        trackColor: "#d9d9d9",
        scaleColor: !1,
        easing: "easeOutBounce",
        scaleLength: 1,
        lineCap: "round",
        lineWidth: 3,
        size: 150,
        animate: {
            duration: 2e3,
            enabled: !0
        },
        onStep: function(e, t, a) {
            $(this.el).find(".percent").text(Math.round(a))
        }
    }), $(document.body).on("appear", ".chart1", function(e) {
        $(this).hasClass("appear") || ($(this).addClass("appear"), $(this).data("easyPieChart").update(0).update($(this).data("percent")))
    })), $(".chart2").length > 0 && ($(".chart2").appear(), $(".chart2").easyPieChart({
        easing: "easeOutCirc",
        barColor: "#ff214f",
        trackColor: "#c7c7c7",
        scaleColor: !1,
        scaleLength: 1,
        lineCap: "round",
        lineWidth: 2,
        size: 120,
        animate: {
            duration: 2e3,
            enabled: !0
        },
        onStep: function(e, t, a) {
            $(this.el).find(".percent").text(Math.round(a))
        }
    }), $(document.body).on("appear", ".chart2", function(e) {
        $(this).hasClass("appear") || ($(this).addClass("appear"), $(this).data("easyPieChart").update(0).update($(this).data("percent")))
    })), $(".chart3").length > 0 && ($(".chart3").appear(), $(".chart3").easyPieChart({
        easing: "easeOutCirc",
        barColor: "#ff214f",
        trackColor: "",
        scaleColor: !1,
        scaleLength: 1,
        lineCap: "round",
        lineWidth: 3,
        size: 140,
        animate: {
            duration: 2e3,
            enabled: !0
        },
        onStep: function(e, t, a) {
            $(this.el).find(".percent").text(Math.round(a))
        }
    }), $(document.body).on("appear", ".chart3", function(e) {
        $(this).hasClass("appear") || ($(this).addClass("appear"), $(this).data("easyPieChart").update(0).update($(this).data("percent")))
    }));
    var C = $(".portfolio-grid");
    C.imagesLoaded(function() {
        C.isotope({
            layoutMode: "masonry",
            itemSelector: ".grid-item",
            percentPosition: !0,
            masonry: {
                columnWidth: ".grid-sizer"
            }
        }), C.isotope()
    });
    var k = $(".portfolio-filter > li.active > a").attr("data-filter");
    C.find(".grid-item").removeClass("animated").css("visibility", ""), C.isotope({
        filter: k
    });
    var x = $(".portfolio-filter > li > a");
    x.on("click", function() {
        x.parent().removeClass("active"), $(this).parent().addClass("active");
        var e = $(this).attr("data-filter");
        return C.find(".grid-item").removeClass("animated").css("visibility", ""), C.find(".grid-item").each(function() {
            T.removeBox(this), $(this).css("-webkit-animation", "none"), $(this).css("-moz-animation", "none"), $(this).css("-ms-animation", "none"), $(this).css("animation", "none")
        }), C.isotope({
            filter: e
        }), !1
    }), $(window).resize(function() {
        isMobile || isiPhoneiPad || C.imagesLoaded(function() {
            setTimeout(function() {
                C.find(".grid-item").removeClass("wow").removeClass("animated"), C.isotope("layout")
            }, 300)
        })
    });
    var P = $(".blog-grid");
    P.imagesLoaded(function() {
        P.isotope({
            layoutMode: "masonry",
            itemSelector: ".grid-item",
            percentPosition: !0,
            masonry: {
                columnWidth: ".grid-sizer"
            }
        })
    }), $(window).resize(function() {
        setTimeout(function() {
            P.find(".grid-item").removeClass("wow").removeClass("animated"), P.isotope("layout")
        }, 300)
    }), $(".lightbox-gallery").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-fade",
        fixedContentPos: !0,
        closeBtnInside: !1,
        gallery: {
            enabled: !0,
            navigateByImgClick: !0,
            preload: [0, 1]
        }
    });
    var S = {};
    $(".lightbox-group-gallery-item").each(function() {
        var e = $(this).attr("data-group");
        S[e] || (S[e] = []), S[e].push(this)
    }), $.each(S, function() {
        $(this).magnificPopup({
            type: "image",
            closeOnContentClick: !0,
            closeBtnInside: !1,
            gallery: {
                enabled: !0
            }
        })
    }), $(".lightbox-portfolio").magnificPopup({
        delegate: ".gallery-link",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-fade",
        fixedContentPos: !0,
        closeBtnInside: !1,
        gallery: {
            enabled: !0,
            navigateByImgClick: !1,
            preload: [0, 1]
        }
    }), $(".single-image-lightbox").magnificPopup({
        type: "image",
        closeOnContentClick: !0,
        fixedContentPos: !0,
        closeBtnInside: !1,
        mainClass: "mfp-no-margins mfp-with-zoom",
        image: {
            verticalFit: !0
        },
        zoom: {
            enabled: !0,
            duration: 300
        }
    }), $(".zoom-gallery").magnificPopup({
        delegate: "a",
        type: "image",
        mainClass: "mfp-with-zoom mfp-img-mobile",
        fixedContentPos: !0,
        closeBtnInside: !1,
        image: {
            verticalFit: !0,
            titleSrc: function(e) {
                return e.el.attr("title")
            }
        },
        gallery: {
            enabled: !0
        },
        zoom: {
            enabled: !0,
            duration: 300,
            opener: function(e) {
                return e.find("img")
            }
        }
    }), $(".modal-popup").magnificPopup({
        type: "inline",
        preloader: !1,
        blackbg: !0,
        callbacks: {
            open: function() {
                $("html").css("margin-right", 0)
            }
        }
    }), $(document).on("click", ".popup-modal-dismiss", function(e) {
        e.preventDefault(), $.magnificPopup.close()
    }), $(".popup-with-zoom-anim").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        blackbg: !0,
        mainClass: "my-mfp-zoom-in"
    }), $(".popup-with-move-anim").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        blackbg: !0,
        mainClass: "my-mfp-slide-bottom"
    }), $(".popup-with-form").magnificPopup({
        type: "inline",
        preloader: !1,
        closeBtnInside: !1,
        fixedContentPos: !0,
        focus: "#name",
        callbacks: {
            beforeOpen: function() {
                700 > $(window).width() ? this.st.focus = !1 : this.st.focus = "#name"
            }
        }
    }), $(".popup-youtube, .popup-vimeo, .popup-googlemap").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: "auto",
        closeBtnInside: !1
    }), $(".ajax-popup").magnificPopup({
        type: "ajax",
        alignTop: !0,
        fixedContentPos: !0,
        overflowY: "scroll",
        callbacks: {
            open: function() {
                $(".navbar .collapse").removeClass("show"), $(".navbar a.dropdown-toggle").addClass("collapsed")
            }
        }
    }), $("ul.mega-menu-full").each(function(e, t) {
        var a = 0;
        $(this).children("li").each(function(e, t) {
            a += $(this).outerWidth()
        }), $(this).width(a + 95), a = 0
    }), $(".fit-videos").fitVids(), $("#success-subscribe-newsletter").hide(), $("#success-subscribe-newsletter2").hide(), $("#success-contact-form").hide(), $("#success-project-contact-form").hide(), $("#success-contact-form-2").hide(), $("#success-contact-form-3").hide(), $("#success-project-contact-form-4").hide(), $(document).on("click", "#button-subscribe-newsletter", function() {
        var e;
        e = !0, $("#subscribenewsletterform input[type=text]").each(function(t) {
            0 == t && (/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()) ? $("#subscribenewsletterform").find("input:eq(" + t + ")").removeClass("required-error") : ($("#subscribenewsletterform").find("input:eq(" + t + ")").addClass("required-error"), e = !1))
        }), e && $.ajax({
            type: "POST",
            url: "email-templates/subscribe-newsletter.php",
            data: $("#subscribenewsletterform").serialize(),
            success: function(e) {
                $("input[type=text],textarea").each(function() {
                    $(this).val("")
                }), $("#success-subscribe-newsletter").html(e), $("#success-subscribe-newsletter").fadeIn("slow"), $("#success-subscribe-newsletter").delay(4e3).fadeOut("slow")
            }
        })
    }), $(document).on("click", "#button-subscribe-newsletter2", function() {
        var e;
        e = !0, $("#subscribenewsletterform2 input[type=text]").each(function(t) {
            0 == t && (/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()) ? $("#subscribenewsletterform2").find("input:eq(" + t + ")").removeClass("required-error") : ($("#subscribenewsletterform2").find("input:eq(" + t + ")").addClass("required-error"), e = !1))
        }), e && $.ajax({
            type: "POST",
            url: "email-templates/subscribe-newsletter.php",
            data: $("#subscribenewsletterform2").serialize(),
            success: function(e) {
                $("input[type=text],textarea").each(function() {
                    $(this).val("")
                }), $("#success-subscribe-newsletter2").html(e), $("#success-subscribe-newsletter2").fadeIn("slow"), $("#success-subscribe-newsletter2").delay(4e3).fadeOut("slow")
            }
        })
    }), $(document).on("click", "#contact-us-button", function() {
        var e;
        e = !0, $("#contact-form input[type=text]").each(function(t) {
            0 == t ? null == $(this).val() || "" == $(this).val() ? ($("#contact-form").find("input:eq(" + t + ")").addClass("required-error"), e = !1) : $("#contact-form").find("input:eq(" + t + ")").removeClass("required-error") : 1 == t && (/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()) ? $("#contact-form").find("input:eq(" + t + ")").removeClass("required-error") : ($("#contact-form").find("input:eq(" + t + ")").addClass("required-error"), e = !1))
        }), e && $.ajax({
            type: "POST",
            url: "email-templates/contact.php",
            data: $("#contact-form").serialize(),
            success: function(e) {
                $("input[type=text],textarea").each(function() {
                    $(this).val("")
                }), $("#success-contact-form").html(e), $("#success-contact-form").fadeIn("slow"), $("#success-contact-form").delay(4e3).fadeOut("slow")
            }
        })
    }), $("#contact-us-button-2").on("click", function() {
        var e;
        e = !0, $("#contact-form-2 input[type=text]").each(function(t) {
            0 == t ? null == $(this).val() || "" == $(this).val() ? ($("#contact-form-2").find("input:eq(" + t + ")").addClass("required-error"), e = !1) : $("#contact-form-2").find("input:eq(" + t + ")").removeClass("required-error") : 1 == t && (/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()) ? $("#contact-form-2").find("input:eq(" + t + ")").removeClass("required-error") : ($("#contact-form-2").find("input:eq(" + t + ")").addClass("required-error"), e = !1))
        }), e && $.ajax({
            type: "POST",
            url: "email-templates/contact.php",
            data: $("#contact-form-2").serialize(),
            success: function(e) {
                $("input[type=text],textarea").each(function() {
                    $(this).val("")
                }), $("#success-contact-form-2").html(e), $("#success-contact-form-2").fadeIn("slow"), $("#success-contact-form-2").delay(4e3).fadeOut("slow")
            }
        })
    }), $(document).on("click", "#contact-us-button-3", function() {
        var e;
        e = !0, $("#contact-form-3 input[type=text]").each(function(t) {
            0 == t ? null == $(this).val() || "" == $(this).val() ? ($("#contact-form-3").find("input:eq(" + t + ")").addClass("required-error"), e = !1) : $("#contact-form-3").find("input:eq(" + t + ")").removeClass("required-error") : 1 == t && (/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()) ? $("#contact-form-3").find("input:eq(" + t + ")").removeClass("required-error") : ($("#contact-form-3").find("input:eq(" + t + ")").addClass("required-error"), e = !1))
        }), e && $.ajax({
            type: "POST",
            url: "email-templates/contact.php",
            data: $("#contact-form-3").serialize(),
            success: function(e) {
                $("input[type=text],textarea").each(function() {
                    $(this).val("")
                }), $("#success-contact-form-3").html(e), $("#success-contact-form-3").fadeIn("slow"), $("#success-contact-form-3").delay(4e3).fadeOut("slow")
            }
        })
    }), $(document).on("click", "#project-contact-us-button", function(e) {
        var t;
        e.preventDefault(), t = !0, $("#project-contact-form input[type=text]").each(function(e) {
            0 == e ? null == $(this).val() || "" == $(this).val() ? ($("#project-contact-form").find("input:eq(" + e + ")").addClass("required-error"), t = !1) : $("#project-contact-form").find("input:eq(" + e + ")").removeClass("required-error") : 2 == e && (/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()) ? $("#project-contact-form").find("input:eq(" + e + ")").removeClass("required-error") : ($("#project-contact-form").find("input:eq(" + e + ")").addClass("required-error"), t = !1))
        }), t && $.ajax({
            type: "POST",
            url: "email-templates/project-contact.php",
            data: $("#project-contact-form").serialize(),
            success: function(e) {
                $("input[type=text],textarea").each(function() {
                    $(this).val("")
                }), $("#success-project-contact-form").html(e), $("#success-project-contact-form").fadeIn("slow"), $("#success-project-contact-form").delay(4e3).fadeOut("slow")
            }
        })
    }), $(document).on("click", "#project-contact-us-4-button", function() {
        var e;
        e = !0, $("#project-contact-form-4 input[type=text]").each(function(t) {
            0 == t ? null == $(this).val() || "" == $(this).val() ? ($("#project-contact-form-4").find("input:eq(" + t + ")").addClass("required-error"), e = !1) : $("#project-contact-form-4").find("input:eq(" + t + ")").removeClass("required-error") : 2 == t && (/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()) ? $("#project-contact-form-4").find("input:eq(" + t + ")").removeClass("required-error") : ($("#project-contact-form-4").find("input:eq(" + t + ")").addClass("required-error"), e = !1))
        }), e && $.ajax({
            type: "POST",
            url: "email-templates/project-contact.php",
            data: $("#project-contact-form-4").serialize(),
            success: function(e) {
                $("input[type=text],textarea").each(function() {
                    $(this).val("")
                }), $("#success-project-contact-form-4").html(e), $("#success-project-contact-form-4").fadeIn("slow"), $("#success-project-contact-form-4").delay(4e3).fadeOut("slow")
            }
        })
    });
    var T = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: !1,
        live: !0
    });

    function E() {
        $(".timer").each(function e(t) {
            var a = $(this);
            t = $.extend({}, t || {}, a.data("countToOptions") || {}), a.countTo(t)
        })
    }
    $(window).imagesLoaded(function() {
        T.init()
    }), $(function(e) {
        E()
    }), $(".timer").appear(), $(document.body).on("appear", ".timer", function(e) {
        $(this).hasClass("appear") || (E(), $(this).addClass("appear"))
    }), $(".countdown").countdown($(".countdown").attr("data-enddate")).on("update.countdown", function(e) {
        $(this).html(e.strftime('<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div><div class="counter-box"><div class="number">%H</div><span>Hours</span></div><div class="counter-box"><div class="number">%M</div><span>Minutes</span></div><div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'))
    }), $(document).on("click", ".right-menu-button", function(e) {
        $("body").toggleClass("left-nav-on")
    }), $(document).on("click", ".btn-hamburger", function() {
        $(".hamburger-menu").toggleClass("show-menu"), $("body").removeClass("show-menu")
    }), $(document).on("click", "#mobileToggleSidenav", function() {
        $(this).closest("nav").toggleClass("sidemenu-open")
    }), $(document).imagesLoaded(function() {
        $(".justified-gallery").length > 0 && $(".justified-gallery").justifiedGallery({
            rowHeight: 400,
            maxRowHeight: !1,
            captions: !0,
            margins: 10,
            waitThumbnailsLoad: !0
        })
    }), $(".atr-nav").on("click", function() {
        $(".atr-div").append("<a class='close-cross' href='#'>X</a>"), $(".atr-div").animate({
            width: "toggle"
        })
    }), $(".close-cross").on("click", function() {
        $(".atr-div").hide()
    });
    var V = document.getElementById("cbp-spmenu-s2"),
        O = document.getElementById("showRightPush");
    document.body, O && (O.onclick = function() {
        classie.toggle(this, "active"), V && classie.toggle(V, "cbp-spmenu-open")
    });
    var L = document.getElementById("close-pushmenu");
    if (L && (L.onclick = function() {
            classie.toggle(this, "active"), V && classie.toggle(V, "cbp-spmenu-open")
        }), $(".blog-header-style1 li").hover(function() {
            $(".blog-header-style1 li.blog-column-active").removeClass("blog-column-active"), $(this).addClass("blog-column-active")
        }, function() {
            $(this).removeClass("blog-column-active"), $(".blog-header-style1 li:first-child").addClass("blog-column-active")
        }), $(".big-menu-open").on("click", function() {
            $(".big-menu-right").addClass("open")
        }), $(".big-menu-close").on("click", function() {
            $(".big-menu-right").removeClass("open")
        }), 0 != $("#instaFeed-style1").length) {
        var z = "IGQVJWN1pHaUZA4eEoxa3hKWTZA2VkR3N3hGMENLcjFKRGp2TVE4bENTX3N0RllmY2FDNDRSV1VSQmx0ejhPLWtBNXVuaFdtVkFNQmdGQVNpamNiQlJTZA2lFS01Mc1JseWxWLVlrbEdiZAXhrWTJUNHlSZAAZDZD";
        $.ajax({
            url: "https://graph.instagram.com/me/media?fields=id,media_type,media_url,timestamp,permalink,comments_count,like_count&access_token=" + z,
            type: "GET",
            success: function(e) {
                for (var t in e.data)
                    if (t < 8 && "IMAGE" == e.data[t].media_type) {
                        var a = e.data[t].permalink,
                            i = e.data[t].media_url,
                            o = e.data[t].like_count,
                            n = e.data[t].comments_count,
                            s = "";
                        s += '<div class="col-lg-3 col-md-6 instafeed-style1">', s += '<a class="insta-link" href="' + a + '" target="_blank">', s += '<img src="' + i + '" class="insta-image" />', s += '<div class="insta-counts">', "" != o && void 0 != o || "" != n && void 0 != n ? ("" != o && void 0 != o && (s += '<span><i class="ti-heart"></i> <span class="count-number">' + o + "</span></span>"), "" != n && void 0 != n && (s += '<span><i class="ti-comment"></i> <span class="count-number">' + n + "</span></span>")) : s += '<span class="mr-0"><i class="ti-instagram"></i></span>', s += "</div>", s += "</a>", s += "</div>", $("#instaFeed-style1").append(s)
                    }
            },
            error: function(e) {
                $("#instaFeed-style1").append('<div class="col-12"><span class=text-center>No Images Found</span></div>')
            }
        })
    }
    if (0 != $("#instaFeed-aside").length) {
        var z = "IGQVJWN1pHaUZA4eEoxa3hKWTZA2VkR3N3hGMENLcjFKRGp2TVE4bENTX3N0RllmY2FDNDRSV1VSQmx0ejhPLWtBNXVuaFdtVkFNQmdGQVNpamNiQlJTZA2lFS01Mc1JseWxWLVlrbEdiZAXhrWTJUNHlSZAAZDZD";
        $.ajax({
            url: "https://graph.instagram.com/me/media?fields=id,media_type,media_url,timestamp,permalink,comments_count,like_count&access_token=" + z,
            type: "GET",
            success: function(e) {
                for (var t in e.data)
                    if (t < 6 && "IMAGE" == e.data[t].media_type) {
                        var a = e.data[t].permalink,
                            i = e.data[t].media_url,
                            o = e.data[t].like_count,
                            n = (e.data[t].comments_count, "");
                        n += "<li><figure>", n += '<a href="' + a + '" target="_blank">', n += '<img src="' + i + '" class="insta-image" />', "" != o && void 0 != o ? (n += '<span class="insta-counts">', n += '<i class="ti-heart"></i>' + o, n += "</span>") : n += '<span class="insta-counts"><i class="ti-instagram"></i></span>', n += "</a>", n += "</figure></li>", $("#instaFeed-aside").append(n)
                    }
            },
            error: function(e) {
                $("#instaFeed-aside").append('<div class="col-12"><span class=text-center>No Images Found</span></div>')
            }
        })
    }
    if (0 != $("#instaFeed-footer").length) {
        var z = "IGQVJWN1pHaUZA4eEoxa3hKWTZA2VkR3N3hGMENLcjFKRGp2TVE4bENTX3N0RllmY2FDNDRSV1VSQmx0ejhPLWtBNXVuaFdtVkFNQmdGQVNpamNiQlJTZA2lFS01Mc1JseWxWLVlrbEdiZAXhrWTJUNHlSZAAZDZD";
        $.ajax({
            url: "https://graph.instagram.com/me/media?fields=id,media_type,media_url,timestamp,permalink,comments_count,like_count&access_token=" + z,
            type: "GET",
            success: function(e) {
                for (var t in e.data)
                    if (t < 6 && "IMAGE" == e.data[t].media_type) {
                        var a = e.data[t].permalink,
                            i = e.data[t].media_url,
                            o = e.data[t].like_count,
                            n = (e.data[t].comments_count, "");
                        n += "<li><figure>", n += '<a href="' + a + '" target="_blank">', n += '<img src="' + i + '" class="insta-image" />', "" != o && void 0 != o ? (n += '<span class="insta-counts">', n += '<i class="ti-heart"></i><span>' + o + "</span>", n += "</span>") : n += '<span class="insta-counts"><i class="ti-instagram"></i></span>', n += "</a>", n += "</figure></li>", $("#instaFeed-footer").append(n)
                    }
            },
            error: function(e) {
                $("#instaFeed-footer").append('<div class="col-12"><span class=text-center>No Images Found</span></div>')
            }
        })
    }
    void 0 == $("#rev_slider_151_1").revolution ? revslider_showDoubleJqueryError("#rev_slider_151_1") : $("#rev_slider_151_1").show().revolution({
        sliderType: "standard",
        jsFileLocation: "revolution/js/",
        sliderLayout: "fullscreen",
        dottedOverlay: "none",
        delay: 9e3,
        navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "vertical",
            mouseScrollNavigation: "off",
            mouseScrollReverse: "default",
            onHoverStop: "off",
            touch: {
                touchenabled: "on",
                swipe_threshold: 75,
                swipe_min_touches: 1,
                swipe_direction: "horizontal",
                drag_block_vertical: !1
            },
            arrows: {
                style: "uranus",
                enable: !0,
                hide_onmobile: !1,
                hide_over: 479,
                hide_onleave: !1,
                tmp: "",
                left: {
                    h_align: "left",
                    v_align: "center",
                    h_offset: 0,
                    v_offset: 0
                },
                right: {
                    h_align: "right",
                    v_align: "center",
                    h_offset: 0,
                    v_offset: 0
                }
            }
        },
        responsiveLevels: [1240, 1024, 778, 480],
        visibilityLevels: [1240, 1024, 778, 480],
        gridwidth: [1240, 1024, 778, 480],
        gridheight: [868, 768, 960, 720],
        lazyType: "none",
        scrolleffect: {
            blur: "on",
            maxblur: "20",
            on_slidebg: "on",
            direction: "top",
            multiplicator: "2",
            multiplicator_layers: "2",
            tilt: "10",
            disable_on_mobile: "off"
        },
        parallax: {
            type: "scroll",
            origo: "slidercenter",
            speed: 400,
            levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55]
        },
        shadow: 0,
        spinner: "spinner3",
        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,
        shuffle: "off",
        autoHeight: "off",
        fullScreenAutoWidth: "off",
        fullScreenAlignForce: "off",
        fullScreenOffsetContainer: "",
        fullScreenOffset: "0px",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: !1,
        fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: !1
        }
    }), void 0 == $("#rev_slider_1174_1").revolution ? revslider_showDoubleJqueryError("#rev_slider_1174_1") : $("#rev_slider_1174_1").show().revolution({
        sliderType: "hero",
        jsFileLocation: "revolution/js/",
        sliderLayout: "fullscreen",
        dottedOverlay: "none",
        delay: 9e3,
        navigation: {},
        responsiveLevels: [1240, 1024, 778, 480],
        visibilityLevels: [1240, 1024, 778, 480],
        gridwidth: [1240, 1024, 778, 480],
        gridheight: [868, 768, 960, 720],
        lazyType: "none",
        parallax: {
            type: "scroll",
            origo: "slidercenter",
            speed: 400,
            levels: [10, 15, 20, 25, 30, 35, 40, -10, -15, -20, -25, -30, -35, -40, -45, 55]
        },
        shadow: 0,
        spinner: "off",
        autoHeight: "off",
        fullScreenAutoWidth: "off",
        fullScreenAlignForce: "off",
        fullScreenOffsetContainer: "",
        disableProgressBar: "on",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: !1,
        fallbacks: {
            simplifyAll: "off",
            disableFocusListener: !1
        }
    }), void 0 == $("#rev_slider_1078_1").revolution ? revslider_showDoubleJqueryError("#rev_slider_1078_1") : $("#rev_slider_1078_1").show().revolution({
        sliderType: "standard",
        jsFileLocation: "revolution/js/",
        sliderLayout: "fullscreen",
        dottedOverlay: "none",
        delay: 9e3,
        navigation: {
            keyboardNavigation: "on",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            mouseScrollReverse: "default",
            onHoverStop: "off",
            touch: {
                touchenabled: "on",
                swipe_threshold: 75,
                swipe_min_touches: 1,
                swipe_direction: "horizontal",
                drag_block_vertical: !1
            },
            arrows: {
                style: "zeus",
                enable: !0,
                hide_onmobile: !0,
                hide_under: 600,
                hide_onleave: !0,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                tmp: '<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
                left: {
                    h_align: "left",
                    v_align: "center",
                    h_offset: 30,
                    v_offset: 0
                },
                right: {
                    h_align: "right",
                    v_align: "center",
                    h_offset: 30,
                    v_offset: 0
                }
            },
            bullets: {
                enable: !0,
                hide_onmobile: !1,
                hide_under: 300,
                style: "hermes",
                hide_onleave: !1,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                direction: "horizontal",
                h_align: "center",
                v_align: "bottom",
                h_offset: 0,
                v_offset: 30,
                space: 8,
                tmp: '<span class="tp-bullet-img-wrap">  <span class="tp-bullet-image"></span></span><span class="tp-bullet-title">{{title}}</span>'
            }
        },
        viewPort: {
            enable: !0,
            outof: "pause",
            visible_area: "80%",
            presize: !1
        },
        responsiveLevels: [1240, 1024, 778, 480],
        visibilityLevels: [1240, 1024, 778, 480],
        gridwidth: [1240, 1024, 778, 480],
        gridheight: [600, 600, 500, 400],
        lazyType: "none",
        parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 2e3,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50, 46, 47, 48, 49, 50, 55]
        },
        shadow: 0,
        spinner: "off",
        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,
        shuffle: "off",
        autoHeight: "off",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: !1,
        fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: !1
        }
    }), void 0 == $("#rev_slider_26_1").revolution ? revslider_showDoubleJqueryError("#rev_slider_26_1") : $("#rev_slider_26_1").show().revolution({
        sliderType: "standard",
        jsFileLocation: "revolution/js/",
        sliderLayout: "fullscreen",
        dottedOverlay: "none",
        delay: 9e3,
        navigation: {
            keyboardNavigation: "on",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            mouseScrollReverse: "default",
            onHoverStop: "off",
            touch: {
                touchenabled: "on",
                touchOnDesktop: "on",
                swipe_threshold: 75,
                swipe_min_touches: 1,
                swipe_direction: "horizontal",
                drag_block_vertical: !1
            },
            arrows: {
                style: "uranus",
                enable: !1,
                hide_onmobile: !0,
                hide_under: 778,
                hide_onleave: !1,
                tmp: "",
                left: {
                    h_align: "left",
                    v_align: "center",
                    h_offset: 15,
                    v_offset: 0
                },
                right: {
                    h_align: "right",
                    v_align: "center",
                    h_offset: 15,
                    v_offset: 0
                }
            },
            bullets: {
                enable: !0,
                hide_onmobile: !1,
                style: "hermes",
                hide_onleave: !1,
                direction: "horizontal",
                h_align: "center",
                v_align: "bottom",
                h_offset: 0,
                v_offset: 30,
                space: 6,
                tmp: ""
            }
        },
        responsiveLevels: [1240, 1025, 778, 480],
        visibilityLevels: [1240, 1025, 778, 480],
        gridwidth: [1240, 1025, 778, 480],
        gridheight: [868, 768, 960, 720],
        lazyType: "none",
        parallax: {
            type: "scroll",
            origo: "slidercenter",
            speed: 2e3,
            levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55]
        },
        shadow: 0,
        spinner: "off",
        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,
        shuffle: "off",
        autoHeight: "off",
        fullScreenAutoWidth: "off",
        fullScreenAlignForce: "off",
        fullScreenOffsetContainer: "",
        fullScreenOffset: "0px",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: !1,
        fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: !1
        }
    }), $(".header-search-form").magnificPopup({
        mainClass: "mfp-fade",
        closeOnBgClick: !0,
        preloader: !1,
        fixedContentPos: !1,
        closeBtnInside: !1,
        callbacks: {
            open: function() {
                setTimeout(function() {
                    $(".search-input").focus()
                }, 500), $("#search-header").parent().addClass("search-popup"), isMobile ? $("body, html").on("touchmove", function(e) {
                    e.preventDefault()
                }) : ($("body").addClass("overflow-hidden"), $("body").addClass("width-100"), document.onmousewheel = ScrollStop)
            },
            close: function() {
                isMobile ? $("body, html").unbind("touchmove") : ($("body").removeClass("overflow-hidden"), $("body").removeClass("width-100"), $("#search-header input[type=text]").each(function(e) {
                    0 == e && ($(this).val(""), $("#search-header").find("input:eq(" + e + ")").css({
                        border: "none",
                        "border-bottom": "2px solid rgba(255,255,255,0.5)"
                    }))
                }), document.onmousewheel = ScrollStart)
            }
        }
    }), $("input.search-input").on("keypress", function(e) {
        13 != e.which || isMobile || ($("button.search-button").trigger("click"), e.preventDefault())
    }), $("input.search-input").on("keyup", function(e) {
        null == $(this).val() || "" == $(this).val() ? $(this).css({
            border: "none",
            "border-bottom": "2px solid red"
        }) : $(this).css({
            border: "none",
            "border-bottom": "2px solid rgba(255,255,255,0.5)"
        })
    }), $("form.search-form, form.search-form-result").submit(function(e) {
        if (validationSearchForm()) {
            var t = $(this).attr("action");
            t = (t = "#" == t || "" == t ? "blog-grid-3columns.html" : t) + "?" + $(this).serialize(), window.location = t
        }
        e.preventDefault()
    }), $(document).on("click", '.navbar .navbar-collapse a.dropdown-toggle, .accordion-style1 .panel-heading a, .accordion-style2 .panel-heading a, .accordion-style3 .panel-heading a, .toggles .panel-heading a, .toggles-style2 .panel-heading a, .toggles-style3 .panel-heading a, a.carousel-control, .nav-tabs a[data-toggle="tab"], a.shopping-cart', function(e) {
        e.preventDefault()
    }), $(document).on("touchstart click", "body", function(e) {
        992 > $(window).width() ? !$(".navbar-collapse").has(e.target).is(".navbar-collapse") && $(".navbar-collapse").hasClass("show") && !$(e.target).hasClass("navbar-toggle") && $(".navbar-collapse").collapse("hide") : !$(".navbar-collapse").has(e.target).is(".navbar-collapse") && $(".navbar-collapse").hasClass("show") && ($(".navbar-collapse").find("a.dropdown-toggle").addClass("collapsed"), $(".navbar-collapse").find("ul.dropdown-menu").removeClass("show"), $(".navbar-collapse a.dropdown-toggle").removeClass("active"))
    }), $(".navbar-collapse a.dropdown-toggle").on("touchstart", function(e) {
        $(".navbar-collapse a.dropdown-toggle").not(this).removeClass("active"), $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active")
    }), $("button.navbar-toggle").on("click", function(e) {
        isMobile && ($(".cart-content").css("opacity", "0"), $(".cart-content").css("visibility", "hidden"))
    }), $("a.dropdown-toggle").on("click", function(e) {
        isMobile && ($(".cart-content").css("opacity", "0"), $(".cart-content").css("visibility", "hidden"))
    }), $(document).on("touchstart click", '.navbar-collapse [data-toggle="dropdown"]', function(e) {
        var t = $(this).parents("ul.navbar-nav").find("li.dropdown a.inner-link").parent("li.dropdown");
        !$(this).hasClass("inner-link") && !$(this).hasClass("dropdown-toggle") && t.hasClass("show") && t.removeClass("show");
        var a = $(this).attr("target");
        if (991 >= $(window).width() && $(this).attr("href") && -1 >= $(this).attr("href").indexOf("#") && !$(e.target).is("i")) {
            if (e.ctrlKey || e.metaKey) return window.open($(this).attr("href"), "_blank"), !1;
            a ? window.open($(this).attr("href"), a) : window.location = $(this).attr("href")
        } else if ($(window).width() > 991 && -1 >= $(this).attr("href").indexOf("#")) {
            if (e.ctrlKey || e.metaKey) return window.open($(this).attr("href"), "_blank"), !1;
            a ? window.open($(this).attr("href"), a) : window.location = $(this).attr("href")
        } else 991 >= $(window).width() && $(this).attr("href") && $(this).attr("href").length > 1 && $(this).attr("href").indexOf("#") >= 0 && $(this).hasClass("inner-link") && ($(this).parents("ul.navbar-nav").find("li.dropdown").not($(this).parent(".dropdown")).removeClass("show"), $(this).parent(".dropdown").hasClass("show") ? $(this).parent(".dropdown").removeClass("show") : $(this).parent(".dropdown").addClass("show"), $(this).toggleClass("active"))
    }), $(".skillbar").appear(), $(".skillbar").skillBars({
        from: 0,
        speed: 4e3,
        interval: 100,
        decimals: 0
    }), $(document.body).on("appear", ".skillbar", function(e) {
        $(this).hasClass("appear") || ($(this).addClass("appear"), $(this).find(".skillbar-bar").css("width", "0%"), $(this).skillBars({
            from: 0,
            speed: 4e3,
            interval: 100,
            decimals: 0
        }))
    }), $("nav.full-width-pull-menu ul.panel-group li.dropdown a.dropdown-toggle").on("click", function(e) {
        $(this).parent("li").find("ul.dropdown-menu").length > 0 && ($(this).parent("li").hasClass("show") ? $(this).parent("li").removeClass("show") : $(this).parent("li").addClass("show"))
    }), $(".accordion-style1 .collapse").on("show.bs.collapse", function() {
        var e = $(this).attr("id");
        $('a[href="#' + e + '"]').closest(".panel-heading").addClass("active-accordion"), $('a[href="#' + e + '"] .panel-title span').html('<i class="ti-minus"></i>')
    }), $(".accordion-style1 .collapse").on("hide.bs.collapse", function() {
        var e = $(this).attr("id");
        $('a[href="#' + e + '"]').closest(".panel-heading").removeClass("active-accordion"), $('a[href="#' + e + '"] .panel-title span').html('<i class="ti-plus"></i>')
    }), $(document).on("click", ".nav.navbar-nav a.inner-link", function(e) {
        $(this).parents("ul.navbar-nav").find("a.inner-link").removeClass("active");
        var t = $(this);
        $(this).parents(".navbar-collapse").collapse("hide"), setTimeout(function() {
            t.addClass("active")
        }, 1e3)
    }), $(".accordion-style2 .collapse").on("show.bs.collapse", function() {
        var e = $(this).attr("id");
        $('a[href="#' + e + '"]').closest(".panel-heading").addClass("active-accordion"), $('a[href="#' + e + '"] .panel-title').find("i").addClass("fa-angle-up").removeClass("fa-angle-down")
    }), $(".accordion-style2 .collapse").on("hide.bs.collapse", function() {
        var e = $(this).attr("id");
        $('a[href="#' + e + '"]').closest(".panel-heading").removeClass("active-accordion"), $('a[href="#' + e + '"] .panel-title').find("i").removeClass("fa-angle-up").addClass("fa-angle-down")
    }), $(".accordion-style3 .collapse").on("show.bs.collapse", function() {
        var e = $(this).attr("id");
        $('a[href="#' + e + '"]').closest(".panel-heading").addClass("active-accordion"), $('a[href="#' + e + '"] .panel-title').find("i").addClass("fa-angle-up").removeClass("fa-angle-down")
    }), $(".accordion-style3 .collapse").on("hide.bs.collapse", function() {
        var e = $(this).attr("id");
        $('a[href="#' + e + '"]').closest(".panel-heading").removeClass("active-accordion"), $('a[href="#' + e + '"] .panel-title').find("i").removeClass("fa-angle-up").addClass("fa-angle-down")
    }), $(".toggles .collapse").on("show.bs.collapse", function() {
        var e = $(this).attr("id");
        $('a[href="#' + e + '"]').closest(".panel-heading").addClass("active-accordion"), $('a[href="#' + e + '"] .panel-title span').html('<i class="ti-minus"></i>')
    }), $(".toggles .collapse").on("hide.bs.collapse", function() {
        var e = $(this).attr("id");
        $('a[href="#' + e + '"]').closest(".panel-heading").removeClass("active-accordion"), $('a[href="#' + e + '"] .panel-title span').html('<i class="ti-plus"></i>')
    }), $(".toggles-style2 .collapse").on("show.bs.collapse", function() {
        var e = $(this).attr("id");
        $('a[href="#' + e + '"]').closest(".panel-heading").addClass("active-accordion"), $('a[href="#' + e + '"] .panel-title span').html('<i class="fa fa-angle-up"></i>')
    }), $(".toggles-style2 .collapse").on("hide.bs.collapse", function() {
        var e = $(this).attr("id");
        $('a[href="#' + e + '"]').closest(".panel-heading").removeClass("active-accordion"), $('a[href="#' + e + '"] .panel-title span').html('<i class="fas fa-angle-down"></i>')
    }), $(document).on("mouseenter", ".blog-post-style4 .grid-item", function(e) {
        $(this).find("figcaption .blog-hover-text").slideDown(300)
    }), $(document).on("mouseleave", ".blog-post-style4 .grid-item", function(e) {
        $(this).find("figcaption .blog-hover-text").slideUp(300)
    }), SetResizeContent(), $("img:not([data-rjs])").attr("data-no-retina", ""), $("body").append(""), $(document).on("touchstart", ".sidebar-wrapper", function() {
        $("li.dropdown").removeClass("on").removeClass("show"), $(".dropdown-menu").stop().fadeOut("fast"), $(".dropdown-menu").removeClass(M), $(".dropdown-menu").addClass(j)
    });
    var A = $("nav.navbar.bootsnav"),
        M = A.find("ul.nav").data("in"),
        j = A.find("ul.nav").data("out")
}), $(document).on("load", function() {
    var e = window.location.hash.substr(1);
    "" != e && setTimeout(function() {
        $(document).imagesLoaded(function() {
            var t = "#" + e;
            $(t).length > 0 && $("html, body").stop().animate({
                scrollTop: $(t).offset().top
            }, 1200, "easeInOutExpo", function() {
                window.location.hash = t
            })
        })
    }, 500), fullScreenHeight()
});