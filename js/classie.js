 ! function(s) {
     "use strict";

     function a(s) {
         return RegExp("(^|\\s+)" + s + "(\\s+|$)")
     }

     function n(s, a) {
         (t(s, a) ? c : e)(s, a)
     }
     "classList" in document.documentElement ? (t = function(s, a) {
         return s.classList.contains(a)
     }, e = function(s, a) {
         s.classList.add(a)
     }, c = function(s, a) {
         s.classList.remove(a)
     }) : (t = function(s, n) {
         return a(n).test(s.className)
     }, e = function(s, a) {
         t(s, a) || (s.className = s.className + " " + a)
     }, c = function(s, n) {
         s.className = s.className.replace(a(n), " ")
     });
     var t, e, c, i = {
         hasClass: t,
         addClass: e,
         removeClass: c,
         toggleClass: n,
         has: t,
         add: e,
         remove: c,
         toggle: n
     };
     "function" == typeof define && define.amd ? define(i) : s.classie = i
 }(window);