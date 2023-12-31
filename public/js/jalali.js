!(function () {
  "use strict";
  !(function () {
    var t = void 0;
    function n(t) {
      return (n =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    var e = function (t) {
        return void 0 === t;
      },
      i = function (t) {
        return "function" == typeof t;
      },
      a = function (t) {
        return "string" == typeof t;
      },
      o = function (t) {
        return JSON.parse(JSON.stringify(t));
      },
      r = function (t) {
        if (!t || !t.constructor || t.nodeType) return !1;
        try {
          return "{}" === JSON.stringify(t);
        } catch (t) {
          return !0;
        }
      },
      s = function a() {
        for (var o, s, h, d, c, u = arguments.length, p = new Array(u), y = 0; y < u; y++) p[y] = arguments[y];
        var l = p[0] || {},
          m = 1,
          f = p.length,
          v = !1;
        for (
          "boolean" == typeof l && ((v = l), (l = p[m] || {}), (m += 1)),
            "object" !== n(l) && i(l) && (l = {}),
            m === f && ((l = t), (m -= 1));
          m < f;
          m++
        )
          if (((o = p[m]), !e(o) && null !== o))
            for (var g = 0; g < window.Object.keys(o).length; g++) {
              var D = window.Object.keys(o)[g];
              if (Object.prototype.hasOwnProperty.call(o, D)) {
                if (((h = o[D]), "__proto__" === D || l === h)) return !0;
                (d = Array.isArray(h)),
                  v && h && (r(h) || d)
                    ? ((s = l[D]), (c = d && !Array.isArray(s) ? [] : d || r(s) ? s : {}), (l[D] = a(v, c, h)))
                    : e(h) || (l[D] = h);
              }
            }
        return l;
      },
      h = function (t, n) {
        return window.Math.abs(t - n * window.Math.floor(t / n));
      },
      d = function (t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2,
          e = String(Math.abs(t)),
          i = e.length,
          a = "";
        for (t < 0 && (a += "-"); i < n; ) (i += 1), (a += "0");
        return a + e;
      },
      c = function (t, n, e) {
        var i = s(n, e),
          a = t.initDate,
          o = t.options.maxDate,
          r = t.options.minDate,
          h = i.year,
          d = i.month,
          c = i.day;
        return (
          isNaN(h) || h < 1e3 || h > 1999 ? (h = a.year) : h < r.year ? (h = r.year) : h > o.year && (h = o.year),
          isNaN(d) || d < 1 || d > 12
            ? (d = a.month)
            : h <= r.year && d < r.month
            ? (d = r.month)
            : h >= o.year && d > o.month && (d = o.month),
          isNaN(c) || c < 1
            ? (c = a.day)
            : d <= r.month && c < r.day
            ? (c = r.day)
            : d >= o.month && c > o.day && (c = o.day),
          { year: parseInt(h), month: parseInt(d), day: parseInt(c) }
        );
      },
      u = function (t, n, e, i) {
        var a = t.options.minDate,
          o = t.options.maxDate,
          s = y(t, { year: n, month: e, day: i });
        return (
          (a = r(a) ? s : y(t, { year: a.year, month: a.month, day: a.day })),
          s <= (o = r(o) ? s : y(t, { year: o.year, month: o.month, day: o.day })) && s >= a
        );
      },
      p = function (t, n) {
        var e = t.options.separatorChars,
          i = n.split(e.between),
          a = t.options.date ? i[0].split(e.date) : {},
          o = t.options.date ? (t.options.time && i[1] ? i[1].split(e.time) : {}) : i[0].split(e.time);
        return {
          year: parseInt(a[0]),
          month: parseInt(a[1]),
          day: parseInt(a[2]),
          hour: parseInt(o[0]) || void 0,
          minute: parseInt(o[1]) || void 0,
          second: parseInt(o[2]) || void 0,
        };
      },
      y = function (t, n) {
        var e = t.options.separatorChars;
        return "".concat(n.year).concat(e.date).concat(d(n.month)).concat(e.date).concat(d(n.day));
      },
      l = function (t, n) {
        if (!n) return !1;
        var e = n.substr(0, 10).split(t.options.separatorChars.date);
        return 3 === e.length && 4 === e[0].length && 2 === e[1].length && 2 === e[2].length;
      },
      m = "jdp",
      f = "".concat(m, "-container"),
      v = "".concat(m, "-overlay"),
      g = "div.".concat(m, "-years"),
      D = "div.".concat(m, "-year"),
      w = "div.".concat(m, "-months"),
      _ = "div.".concat(m, "-month"),
      b = "div.".concat(m, "-days"),
      C = "div.".concat(m, "-day"),
      x = "div.".concat(m, "-day.not-in-month"),
      I = "div.".concat(m, "-day.disabled-day"),
      M = "".concat(x, ".disabled-day"),
      S = "div.".concat(m, "-day-name"),
      T = "div.".concat(m, "-icon-plus"),
      E = "div.".concat(m, "-icon-minus"),
      O = "div.".concat(m, "-footer"),
      j = "div.".concat(m, "-btn-today"),
      N = "div.".concat(m, "-btn-empty"),
      A = "div.".concat(m, "-btn-close"),
      V = "div.".concat(m, "-time-container"),
      B = "div.".concat(m, "-time"),
      H = "not-in-range",
      P = "holly-day",
      Y = "".concat(m, ":change"),
      k = "click",
      L = "focusin",
      z = "today",
      R = "attr",
      J = ("data-".concat(m), "visible"),
      W = "block",
      q = "none",
      F = function t(n) {
        if (["html", "body", "#document"].indexOf((n.nodeName || "").toLowerCase()) >= 0) return window;
        if (n instanceof HTMLElement) {
          var e = window.getComputedStyle(n),
            i = e.overflow,
            a = e.overflowX,
            o = e.overflowY;
          if (/auto|scroll|overlay/.test(i + o + a)) return n;
        }
        return t(n.parentNode);
      },
      X = function (t) {
        var n = document.createEvent("Event");
        return n.initEvent(t, !0, !0), n;
      },
      G = function (t, n, i, o, r) {
        var s = t.split(".");
        t = s.shift() || "div";
        var h = s,
          d = window.document.createElement(t);
        return (
          a(n) ? window.document.querySelector(n).appendChild(d) : n.appendChild(d),
          h.length && (d.className = h.join(" ")),
          i &&
            o &&
            (function (t, n, e) {
              for (var i = n.split(" "), a = 0, o = i.length; a < o; a++) t.addEventListener(i[a], e, !1);
            })(d, i, o),
          e(r) || K(d, r),
          d
        );
      },
      K = function (t, n) {
        t.innerHTML = n;
      },
      Q = function (t) {
        function n(t, n) {
          return ~~(t / n);
        }
        for (
          var e,
            i = [
              -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456,
              3178,
            ],
            a = i.length,
            o = 0,
            r = -14,
            s = i[0],
            d = 1;
          d < a;
          d += 1
        ) {
          var c = i[d];
          if (((o = c - s), t < c)) break;
          (r = r + 8 * n(o, 33) + n(h(o, 33), 4)), (s = c);
        }
        var u = t - s;
        return o - u < 6 && (u = u - o + 33 * n(o + 4, 33)), -1 === (e = h(h(u + 1, 33) - 1, 4)) && (e = 4), 0 === e;
      },
      U = function (t, n, e) {
        var i = function (t, n) {
          return t < 8 ? 31 * (t - 1) + n : 186 + 30 * (t - 7) + n;
        };
        return h(
          (function (t, n, e, a, o, r) {
            for (var s = i(o, r) - i(n, e), h = t < a ? a : t, d = t < a ? t : a; d < h; d++)
              Q(d) ? (s += t < a ? 366 : -366) : (s += t < a ? 365 : -365);
            return s;
          })(1392, 3, 25, t, n, e),
          7
        );
      },
      Z = function (t, n) {
        return [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, Q(t) ? 30 : 29][n];
      };
    var $,
      tt,
      nt = function (t) {
        for (var n = [], e = 0; e < t; e++) n.push(d(e));
        return n;
      },
      et = function (t, n, e) {
        var i = G(B, n),
          a = G("select", i, "change", function (n) {
            var i, a, o;
            t.setValue(
              ((i = {}),
              (a = e),
              (o = n.target.value),
              a in i
                ? Object.defineProperty(i, a, { value: o, enumerable: !0, configurable: !0, writable: !0 })
                : (i[a] = o),
              i)
            );
          });
        a.tabIndex = -1;
        for (var o = nt("hour" == e ? 24 : 60), r = 0; r < o.length; r++) {
          var s = G("option", a);
          (s.value = o[r]), (s.text = o[r]), (s.selected = parseInt(o[r]) === parseInt(t.getValue[e] || t.initTime[e]));
        }
      },
      it = function (t) {
        return 6 === t ? ".".concat("last-week", ".").concat(P) : "";
      },
      at = function (t, n, e) {
        G(
          T +
            (e
              ? t.options.maxDate.year === t.initDate.year
                ? ".".concat(H)
                : ""
              : t.options.maxDate.year === t.initDate.year && t.options.maxDate.month === t.initDate.month
              ? ".".concat(H)
              : ""),
          n,
          k,
          e
            ? function () {
                t.increaseYear();
              }
            : function () {
                t.increaseMonth();
              },
          t.options.plusHtml
        );
      },
      ot = function (t, n, e) {
        G(
          E +
            (e
              ? t.options.minDate.year === t.initDate.year
                ? ".".concat(H)
                : ""
              : t.options.minDate.year === t.initDate.year && t.options.minDate.month === t.initDate.month
              ? ".".concat(H)
              : ""),
          n,
          k,
          e
            ? function () {
                t.decreaseYear();
              }
            : function () {
                t.decreaseMonth();
              },
          t.options.minusHtml
        );
      },
      rt = function (t) {
        var n = G(g, t.dpContainer);
        at(t, n, !0);
        var e = G(D, n);
        ot(t, n, !0);
        var i = t.options.useDropDownYears,
          a = G(i ? "select" : "input", e, "keyup change", function (n) {
            n.target.value < 1e3 || n.target.value > 2e3 || t.yearChange(n.target.value);
          });
        if (i)
          for (
            var o = (function (t) {
                function n(t) {
                  return 100 * Math.round(t / 100);
                }
                var e = t.initDate.year;
                return { min: t.options.minDate.year || n(e - 200), max: t.options.maxDate.year || n(e + 200) };
              })(t),
              r = o.min;
            r <= o.max;
            r++
          ) {
            var s = G("option", a);
            (s.value = r), (s.text = r), (s.selected = r === t.initDate.year);
          }
        else (a.tabIndex = -1), (a.value = t.initDate.year), (a.type = "number");
      },
      st = function (t) {
        rt(t),
          (function (t) {
            var n = G(w, t.dpContainer);
            at(t, n, !1);
            var e = G(_, n);
            ot(t, n, !1);
            var i = G("select", e, "change", function (n) {
              t.monthChange(n.target.value);
            });
            i.tabIndex = -1;
            for (
              var a = (function (t) {
                  var n = t.initDate.year,
                    e = t.options.minDate,
                    i = t.options.maxDate,
                    a = [],
                    o = 1,
                    r = 12;
                  n === e.year
                    ? ((o = e.month), n === i.year && (r = i.month))
                    : n === i.year && ((o = 1), (r = i.month));
                  for (var s = o; s <= r; s++) a.push(s);
                  return a;
                })(t),
                o = t.options.months,
                r = 0;
              r < a.length;
              r++
            ) {
              var s = G("option", i);
              (s.value = a[r]), (s.text = o[a[r] - 1]), (s.selected = a[r] === t.initDate.month);
            }
          })(t),
          (function (t) {
            for (var n = G(b, t.dpContainer), e = 0; e < 7; e++) G(S + it(e), n, null, null, t.options.days[e]);
            for (
              var a = function (n) {
                  return (
                    !n.day || n.inBeforeMonth ? (n.day = 1) : (n.day += 1),
                    (n.inBeforeMonth = !1),
                    (n.inAfterMonth = !1),
                    (n.isValid = !1),
                    (n.isHollyDay = !1),
                    (n.className = ""),
                    (n.year = t.initDate.year),
                    (n.month = t.initDate.month),
                    n
                  );
                },
                o = a({}),
                r = Z(o.year, o.month),
                h = U(o.year, o.month, 1),
                d = 7 * Math.ceil((h + r) / 7) - 1,
                c = 1 == o.month ? 12 : o.month - 1,
                p = 12 == o.month ? 1 : o.month + 1,
                y = 12 == c ? o.year - 1 : o.year,
                l = 1 == p ? o.year + 1 : o.year,
                m = 1 == o.month ? Z(o.year - 1, c) : Z(o.year, c),
                f = U(o.year, o.month, o.day),
                v = m - f,
                g = 0,
                D = function (e) {
                  (o.inBeforeMonth = o.day <= f && e < f),
                    (o.inAfterMonth = e >= r + f),
                    (o.inBeforeMonth || o.inAfterMonth) &&
                      (o.inBeforeMonth
                        ? (v++, (o.day = v), (o.year = y), (o.month = c))
                        : (g++, (o.day = g), (o.year = l), (o.month = p))),
                    (o.isValid = u(t, o.year, o.month, o.day)),
                    (o.className = it(U(o.year, o.month, o.day))),
                    t.inputValue.day === o.day &&
                      t.inputValue.year === o.year &&
                      t.inputValue.month === o.month &&
                      (o.className += ".".concat("selected")),
                    t.today.day === o.day &&
                      t.today.year === o.year &&
                      t.today.month === o.month &&
                      (o.className += ".".concat("today")),
                    i(t.options.dayRendering) && s(o, t.options.dayRendering(o, t.input)),
                    o.isHollyDay && (o.className += ".".concat(P));
                  var h = o.isValid ? C : I;
                  (o.inBeforeMonth || o.inAfterMonth) && ((h = x), o.isValid || (h = M));
                  var d = G(h + o.className, n, null, null, o.day);
                  (d.day = o.day),
                    (d.month = o.month),
                    (d.year = o.year),
                    o.isValid &&
                      d.addEventListener(k, function () {
                        t.setValue({ year: d.year, month: d.month, day: d.day });
                      }),
                    a(o);
                },
                w = 0;
              w <= d;
              w++
            )
              D(w);
          })(t);
      },
      ht = function (t) {
        var n = G(O, t.dpContainer);
        if (t.options.showTodayBtn && t.options.date) {
          var e = (function (t) {
            return u(t, t.today.year, t.today.month, t.today.day);
          })(t);
          G(
            j + (e ? "" : ".disabled-btn"),
            n,
            k,
            function () {
              e && t.setValue(t.today);
            },
            "امروز"
          );
        }
        t.options.showEmptyBtn &&
          G(
            N,
            n,
            k,
            function () {
              (t.input.value = ""), t.hide();
            },
            "خالی"
          ),
          t.options.showCloseBtn &&
            G(
              A,
              n,
              k,
              function () {
                t.hide();
              },
              "بستن"
            );
      },
      dt = function (t) {
        K(t.dpContainer, ""),
          t.options.date && st(t),
          t.options.time &&
            (function (t) {
              var n = V + (t.options.time && !t.options.date ? ".jdp-only-time" : ""),
                e = G(n, t.dpContainer);
              t.options.hasSecond && et(t, e, "second"), et(t, e, "minute"), et(t, e, "hour");
            })(t),
          ht(t);
      };
    var ct = /iphone|ipod|android|ie|blackberry|fennec/.test(
        null === ($ = window.navigator) || void 0 === $ || null === (tt = $.userAgent) || void 0 === tt
          ? void 0
          : tt.toLowerCase()
      ),
      ut = {
        init: function (t) {
          var n;
          this.updateOptions(t),
            (window.onresize = mt),
            this.options.autoHide && (document.body.onclick = lt),
            this.options.autoShow &&
              ((n = this.options.selector),
              (Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector),
              document.body.addEventListener(L, function (t) {
                t.target && t.target.matches(n) && ut.show(t.target);
              }));
        },
        updateOptions: function (t) {
          this.options = yt(t);
        },
        options: o({
          days: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
          months: [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند",
          ],
          initDate: null,
          today: null,
          initTime: null,
          hasSecond: !0,
          time: !1,
          date: !0,
          minDate: {},
          maxDate: {},
          separatorChars: { date: "/", between: " ", time: ":" },
          zIndex: 1e3,
          container: "body",
          selector: "input[data-jdp]",
          autoShow: !0,
          autoHide: !0,
          plusHtml:
            '<svg viewBox="0 0 1024 1024"><g><path d="M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z"></path></g></svg>',
          minusHtml: '<svg viewBox="0 0 1024 1024"><g><path d="M810 554h-596v-84h596v84z"></path></g></svg>',
          changeMonthRotateYear: !1,
          showTodayBtn: !0,
          showEmptyBtn: !0,
          showCloseBtn: ct,
          autoReadOnlyInput: ct,
          useDropDownYears: !0,
          topSpace: 0,
          bottomSpace: 0,
        }),
        input: null,
        get dpContainer() {
          return (
            this._dpContainer ||
              ((this._dpContainer = G(f, this.options.container)),
              (this.overlayElm = G(v, this.options.container)),
              (this.dpContainer.style.zIndex = this.options.zIndex),
              (this.overlayElm.style.zIndex = this.options.zIndex - 1)),
            this._dpContainer
          );
        },
        get today() {
          return (
            (this._today =
              this._today ||
              this.options.today ||
              (function () {
                var t,
                  n,
                  e = new Date(),
                  i = parseInt(e.getFullYear()),
                  a = parseInt(e.getMonth()) + 1,
                  o = parseInt(e.getDate());
                i > 1600 ? ((t = 979), (i -= 1600)) : ((t = 0), (i -= 621));
                var r = a > 2 ? i + 1 : i;
                return (
                  (n =
                    365 * i +
                    parseInt((r + 3) / 4) -
                    parseInt((r + 99) / 100) +
                    parseInt((r + 399) / 400) -
                    80 +
                    o +
                    [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][a - 1]),
                  (t += 33 * parseInt(n / 12053)),
                  (n %= 12053),
                  (t += 4 * parseInt(n / 1461)),
                  (n %= 1461) > 365 && ((t += parseInt((n - 1) / 365)), (n = (n - 1) % 365)),
                  {
                    year: t,
                    month: n < 186 ? 1 + parseInt(n / 31) : 7 + parseInt((n - 186) / 30),
                    day: 1 + (n < 186 ? n % 31 : (n - 186) % 30),
                  }
                );
              })()),
            this._today
          );
        },
        get inputValue() {
          var t = o(this.input.value);
          return (t =
            (function (t, n) {
              if (!n) return !1;
              var e = t.options.separatorChars,
                i = t.options.date ? "\\d{4}".concat(e.date, "\\d{2}").concat(e.date, "\\d{2}") : "",
                a = t.options.time
                  ? "\\d{2}".concat(e.time, "\\d{2}") + (t.options.hasSecond ? "".concat(e.time, "\\d{2}") : "")
                  : "";
              return new RegExp(i + (i && a ? e.between : "") + a).test(n, "g");
            })(this, t) ||
            (a(t) && l(this, t))
              ? p(this, t)
              : {});
        },
        get initDate() {
          return (
            this._initDate ||
              ((this._initDate = o(this.input.value) || {}),
              r(this._initDate)
                ? (this._initDate = this.options.initDate || o(this.today))
                : a(this._initDate) && l(this, this._initDate)
                ? (this._initDate = p(this, this._initDate))
                : (this._initDate = o(this.today)),
              (this._initDate = c(this, this._initDate))),
            this._initDate
          );
        },
        get initTime() {
          var t = { hour: 0, minute: 0, second: 0 };
          return (
            (this._initTime = this._initTime || o(this.input.value) || this.options.initTime || t),
            a(this._initTime) &&
              (!(function (t, n) {
                if (!n) return !1;
                var e = n.substr(t.options.date ? 11 : 0, 8).split(t.options.separatorChars.time);
                return (
                  e.length === (t.options.hasSecond ? 3 : 2) &&
                  !e.find(function (t) {
                    return 2 !== t.toString().length;
                  })
                );
              })(this, this._initTime)
                ? (this._initTime = t)
                : ((this._initTime = p(this, this._initTime)), (this._initTime = s(this._initTime, t)))),
            this._initTime
          );
        },
        _draw: function () {
          dt(this);
        },
        show: function (t) {
          var n = this;
          (this._initDate = null),
            (this._initTime = null),
            (this._value = null),
            (this.input = t),
            this._draw(),
            (this.dpContainer.style.visibility = J),
            (this.dpContainer.style.display = W),
            setTimeout(function () {
              (n.overlayElm.style.display = W), (n.dpContainer.style.visibility = J), (n.dpContainer.style.display = W);
            }, 50),
            this.setPosition(),
            (function (t) {
              F(t).addEventListener(
                "scroll",
                function () {
                  ut.setPosition();
                },
                { passive: !0 }
              );
            })(t),
            (function (t, n) {
              n.autoReadOnlyInput && !t.readOnly && (t.readOnly = !0);
            })(t, this.options);
        },
        hide: function () {
          (this.dpContainer.style.visibility = "hidden"),
            (this.dpContainer.style.display = q),
            (this.overlayElm.style.display = q);
        },
        setPosition: function () {
          if (this.dpContainer.style.visibility === J) {
            var t = this.input.getBoundingClientRect(),
              n = t.height,
              e = t.left,
              i = t.top + n;
            i += this.options.topSpace;
            var a = window.document.body.offsetWidth,
              o = this.dpContainer.offsetWidth,
              r = this.dpContainer.offsetHeight;
            e + o >= a && (e -= e + o - (a + 10)),
              i - n >= r &&
                i + r >= window.innerHeight &&
                (i -= r + n + this.options.bottomSpace + this.options.topSpace),
              (this.dpContainer.style.position = "fixed"),
              (this.dpContainer.style.left = e + "px"),
              (this.dpContainer.style.top = i + "px");
          }
        },
        get getValue() {
          return (this._value = this._value || this.inputValue || {}), this._value;
        },
        setValue: function (t) {
          var n, e, i, a, o, r, h;
          (this._value = s(
            {
              year: this.today.year,
              month: this.today.month,
              day: this.today.day,
              hour: this.initTime.hour,
              minute: this.initTime.minute,
              second: this.initTime.second,
            },
            s(this._value, t)
          )),
            (this.input.value =
              ((n = this),
              (e = this._value),
              (i = n.options.separatorChars),
              (a = n.options.date
                ? "".concat(e.year).concat(i.date).concat(d(e.month)).concat(i.date).concat(d(e.day))
                : ""),
              (o = n.options.time
                ? "".concat(d(e.hour)).concat(i.time).concat(d(e.minute)) +
                  (n.options.hasSecond ? i.time + d(e.second) : "")
                : ""),
              a + (a && o ? i.between : "") + o)),
            (r = this.input),
            (h = Y),
            r && (r.dispatchEvent(X(h)), h === Y && (r.dispatchEvent(X("change")), r.dispatchEvent(X("input")))),
            this.options.time ? this._draw() : this.hide();
        },
        increaseMonth: function () {
          var t = 12 === this._initDate.month;
          this.options.changeMonthRotateYear && t && this.increaseYear(),
            this.monthChange(t ? 1 : this._initDate.month + 1);
        },
        decreaseMonth: function () {
          var t = 1 === this._initDate.month;
          this.options.changeMonthRotateYear && t && this.decreaseYear(),
            this.monthChange(t ? 12 : this._initDate.month - 1);
        },
        monthChange: function (t) {
          (this._initDate = c(this, this._initDate, { month: t })), this._draw();
        },
        increaseYear: function () {
          this.yearChange(this._initDate.year + 1);
        },
        decreaseYear: function () {
          this.yearChange(this._initDate.year - 1);
        },
        yearChange: function (t) {
          (this._initDate = c(this, this._initDate, { year: t })), this._draw();
        },
      },
      pt = function (t) {
        var n,
          e = null === (n = ut.input) || void 0 === n ? void 0 : n.getAttribute(t);
        if (e === z) e = o(ut.today);
        else if (a(e)) {
          try {
            e = document.querySelector(e).value;
          } catch (t) {}
          e = l(ut, e) ? p(ut, e) : {};
        } else e = {};
        return e;
      },
      yt = function (t) {
        return (
          !e(ut.options._date) && e(t.date) && (t.date = ut.options._date),
          !e(ut.options._time) && e(t.time) && (t.time = ut.options._time),
          (t.separatorChars = s(ut.options.separatorChars, t.separatorChars)),
          (t = s({}, ut.options, t)).minDate === z && (t.minDate = o(ut.today)),
          t.maxDate === z && (t.maxDate = o(ut.today)),
          (t.minDate === R || t._minDateIsAttr) &&
            (delete t.minDate,
            (t._minDateIsAttr = !0),
            window.Object.defineProperty(t, "minDate", {
              get: function () {
                return pt("data-jdp-min-date");
              },
              enumerable: !0,
            })),
          (t.maxDate === R || t._maxDateIsAttr) &&
            (delete t.maxDate,
            (t._maxDateIsAttr = !0),
            window.Object.defineProperty(t, "maxDate", {
              get: function () {
                return pt("data-jdp-max-date");
              },
              enumerable: !0,
            })),
          (t._date = t.date),
          delete t.date,
          window.Object.defineProperty(t, "date", {
            get: function () {
              var n;
              return t._date && !(null !== (n = ut.input) && void 0 !== n && n.hasAttribute("data-jdp-only-time"));
            },
            enumerable: !0,
          }),
          (t._time = t.time),
          delete t.time,
          window.Object.defineProperty(t, "time", {
            get: function () {
              var n;
              return t._time && !(null !== (n = ut.input) && void 0 !== n && n.hasAttribute("data-jdp-only-date"));
            },
            enumerable: !0,
          }),
          t
        );
      };
    function lt(t) {
      var n, e, a;
      ut.dpContainer.style.visibility !== J ||
        ((n = ut.dpContainer),
        (a = (e = t).path || (e.composedPath && e.composedPath()) || !1)
          ? -1 !== a.indexOf(n)
          : n.outerHTML.indexOf(e.target.outerHTML) > -1) ||
        (function (t) {
          try {
            return i(t.composedPath) ? t.composedPath()[0] : t.target;
          } catch (n) {
            return t.target;
          }
        })(t) === ut.input ||
        ut.hide();
    }
    function mt() {
      ut.setPosition();
    }
    window.jalaliDatepicker = {
      startWatch: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        ut.init(t);
      },
      show: function (t) {
        ut.show(t);
      },
      hide: function () {
        ut.hide();
      },
      updateOptions: function (t) {
        ut.updateOptions(t);
      },
    };
  })();
})();
