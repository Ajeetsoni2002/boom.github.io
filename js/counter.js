 ! function(t) {
     "use strict";
     "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
 }(function(t) {
     "use strict";
     var e = [],
         s = [];
     s.push(/^[0-9]*$/.source), s.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), s.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), s = RegExp(s.join("|"));
     var i = {
         Y: "years",
         m: "months",
         w: "weeks",
         d: "days",
         D: "totalDays",
         H: "hours",
         M: "minutes",
         S: "seconds"
     };

     function n(t, e) {
         var s = "s",
             i = "";
         return (t && (1 === (t = t.replace(/(:|;|\s)/gi, "").split(/\,/)).length ? s = t[0] : (i = t[0], s = t[1])), 1 === Math.abs(e)) ? i : s
     }
     var o = function(s, i, n) {
         this.el = s, this.$el = t(s), this.interval = null, this.offset = {}, this.instanceNumber = e.length, e.push(this), this.$el.data("countdown-instance", this.instanceNumber), n && (this.$el.on("update.countdown", n), this.$el.on("stoped.countdown", n), this.$el.on("finish.countdown", n)), this.setFinalDate(i), this.start()
     };
     t.extend(o.prototype, {
         start: function() {
             null !== this.interval && clearInterval(this.interval);
             var t = this;
             this.update(), this.interval = setInterval(function() {
                 t.update.call(t)
             }, 100)
         },
         stop: function() {
             clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
         },
         pause: function() {
             this.stop.call(this)
         },
         resume: function() {
             this.start.call(this)
         },
         remove: function() {
             this.stop(), e[this.instanceNumber] = null, delete this.$el.data().countdownInstance
         },
         setFinalDate: function(t) {
             this.finalDate = function t(e) {
                 if (e instanceof Date) return e;
                 if (String(e).match(s)) return String(e).match(/^[0-9]*$/) && (e = Number(e)), String(e).match(/\-/) && (e = String(e).replace(/\-/g, "/")), new Date(e);
                 throw Error("Couldn't cast `" + e + "` to a date object.")
             }(t)
         },
         update: function() {
             if (0 === this.$el.closest("html").length) {
                 this.remove();
                 return
             }
             this.totalSecsLeft = this.finalDate.getTime() - new Date().getTime(), this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1e3), this.totalSecsLeft = this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft, this.offset = {
                 seconds: this.totalSecsLeft % 60,
                 minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                 hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                 days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                 totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                 weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                 months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30),
                 years: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365)
             }, 0 === this.totalSecsLeft ? (this.stop(), this.dispatchEvent("finish")) : this.dispatchEvent("update")
         },
         dispatchEvent: function(e) {
             var s, o = t.Event(e + ".countdown");
             o.finalDate = this.finalDate, o.offset = t.extend({}, this.offset), o.strftime = (s = this.offset, function(t) {
                 var e = t.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
                 if (e)
                     for (var o = 0, a = e.length; o < a; ++o) {
                         var l = e[o].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                             h = RegExp(l[0]),
                             c = l[1] || "",
                             r = l[3] || "",
                             f = null;
                         l = l[2], i.hasOwnProperty(l) && (f = Number(s[f = i[l]])), null !== f && ("!" === c && (f = n(r, f)), "" === c && f < 10 && (f = "0" + f.toString()), t = t.replace(h, f.toString()))
                     }
                 return t = t.replace(/%%/, "%")
             }), this.$el.trigger(o)
         }
     }), t.fn.countdown = function() {
         var s = Array.prototype.slice.call(arguments, 0);
         return this.each(function() {
             var i = t(this).data("countdown-instance");
             if (void 0 !== i) {
                 var n = e[i],
                     a = s[0];
                 o.prototype.hasOwnProperty(a) ? n[a].apply(n, s.slice(1)) : null === String(a).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (n.setFinalDate.call(n, a), n.start()) : t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, a))
             } else new o(this, s[0], s[1])
         })
     }
 });