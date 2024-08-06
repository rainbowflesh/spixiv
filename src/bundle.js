!(function (e) {
  function t(r) {
    if (n[r]) return n[r].exports;
    var i = (n[r] = { exports: {}, id: r, loaded: !1 });
    return e[r].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
  }
  var n = {};
  return (t.m = e), (t.c = n), (t.p = ""), t(0);
})([
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var i =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            },
      a = n(1),
      o = r(a);
    !(function () {
      var e = function () {
        var e = document.getElementById("init-config"),
          t = document.getElementById("background-slideshow");
        if (null != e && null != t) {
          var n = JSON.parse(e.value);
          if (
            !(
              n &&
              "object" === ("undefined" == typeof n ? "undefined" : i(n)) &&
              "pixivBackgroundSlideshow.illusts" in n
            )
          )
            return void console.warn("スライドショーのイラスト情報が設定されていません");
          var r = new o.default(t, n["pixivBackgroundSlideshow.illusts"]);
          r.render();
        }
      };
      "loading" !== document.readyState
        ? e()
        : "undefined" != typeof document.addEventListener && document.addEventListener("DOMContentLoaded", e, !1);
    })();
  },
  function (e, t, n) {
    "use strict";
    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }
    function i(e, t) {
      e.className.indexOf(t) < 0 && (e.className = e.className + " " + t);
    }
    function a(e) {
      if (!/^https?:\/\/[\w\.\/\-\?=&]+$/.test(e)) throw "'" + e + "' is invalid image url.";
      return e;
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = (function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    })();
    n(2);
    var l = n(6),
      s = (function () {
        function e(t, n) {
          r(this, e),
            (this.target = t),
            (this.illusts = n),
            (this.orientation = "landscape"),
            (this.currentIllustIndex = Math.floor(Math.random() * this.availableIllusts.length)),
            (this.slideInterval = 2e4),
            (this.switchSlideAnimationDuration = 1e3),
            (this.startSwitchSlideAnimation = this.startSwitchSlideAnimation.bind(this)),
            (this.switchSlide = this.switchSlide.bind(this)),
            (this.standbySlide = void 0),
            (this.activeSlide = void 0);
        }
        return (
          o(e, [
            {
              key: "createWallpaper",
              value: function (e) {
                var t = this.availableIllusts[e],
                  n = document.createElement("div");
                return (
                  (n.innerHTML = l({
                    illustImgUrl: a(t.url["1200x1200"]),
                    illustTitle: t.illust_title,
                    userName: t.user_name,
                    profileImgUrl: a(t.profile_img.main_s),
                    wwwMemberIllustMediumUrl: a(t.www_member_illust_medium_url),
                    wwwUserUrl: a(t.www_user_url),
                  })),
                  n.removeChild(n.firstElementChild)
                );
              },
            },
            {
              key: "startSwitchSlideAnimation",
              value: function () {
                i(this.activeSlide.lastChild, "fadeout"),
                  setTimeout(this.switchSlide, this.switchSlideAnimationDuration);
              },
            },
            {
              key: "switchSlide",
              value: function () {
                this.activeSlide.removeChild(this.activeSlide.lastChild),
                  this.activeSlide.appendChild(this.standbySlide.lastChild),
                  (this.currentIllustIndex = this.nextIllustIndex),
                  this.standbySlide.appendChild(this.createWallpaper(this.nextIllustIndex)),
                  setTimeout(this.startSwitchSlideAnimation, this.slideInterval);
              },
            },
            {
              key: "render",
              value: function () {
                var e = this;
                (this.standbySlide = document.createElement("div")),
                  this.target.appendChild(this.standbySlide),
                  (this.activeSlide = document.createElement("div")),
                  this.activeSlide.appendChild(this.createWallpaper(this.currentIllustIndex)),
                  this.target.appendChild(this.activeSlide),
                  i(this.activeSlide, "slide"),
                  i(this.standbySlide, "slide"),
                  setTimeout(function () {
                    e.standbySlide.appendChild(e.createWallpaper(e.nextIllustIndex));
                  }, this.slideInterval / 2),
                  setTimeout(this.startSwitchSlideAnimation, this.slideInterval);
              },
            },
            {
              key: "availableIllusts",
              get: function () {
                return this.illusts[this.orientation];
              },
            },
            {
              key: "nextIllustIndex",
              get: function () {
                return this.currentIllustIndex < this.availableIllusts.length - 1 ? this.currentIllustIndex + 1 : 0;
              },
            },
          ]),
          e
        );
      })();
    t.default = s;
  },
  function (e, t, n) {
    var r = n(3),
      i = n(4);
    (i = i.__esModule ? i.default : i), "string" == typeof i && (i = [[e.id, i, ""]]);
    var a = {};
    (a.insert = "head"), (a.singleton = !1);
    r(i, a);
    e.exports = i.locals || {};
  },
  function (e, t) {
    "use strict";
    function n(e) {
      for (var t = -1, n = 0; n < d.length; n++)
        if (d[n].identifier === e) {
          t = n;
          break;
        }
      return t;
    }
    function r(e, t) {
      for (var r = {}, i = [], a = 0; a < e.length; a++) {
        var o = e[a],
          l = t.base ? o[0] + t.base : o[0],
          u = r[l] || 0,
          c = "".concat(l, " ").concat(u);
        r[l] = u + 1;
        var f = n(c),
          p = { css: o[1], media: o[2], sourceMap: o[3] };
        f !== -1 ? (d[f].references++, d[f].updater(p)) : d.push({ identifier: c, updater: s(p, t), references: 1 }),
          i.push(c);
      }
      return i;
    }
    function i(e) {
      var t = document.createElement("style"),
        n = e.attributes || {};
      if ("undefined" == typeof n.nonce) {
        var r = "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : null;
        r && (n.nonce = r);
      }
      if (
        (Object.keys(n).forEach(function (e) {
          t.setAttribute(e, n[e]);
        }),
        "function" == typeof e.insert)
      )
        e.insert(t);
      else {
        var i = c(e.insert || "head");
        if (!i)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
          );
        i.appendChild(t);
      }
      return t;
    }
    function a(e) {
      return null !== e.parentNode && void e.parentNode.removeChild(e);
    }
    function o(e, t, n, r) {
      var i = n ? "" : r.media ? "@media ".concat(r.media, " {").concat(r.css, "}") : r.css;
      if (e.styleSheet) e.styleSheet.cssText = f(t, i);
      else {
        var a = document.createTextNode(i),
          o = e.childNodes;
        o[t] && e.removeChild(o[t]), o.length ? e.insertBefore(a, o[t]) : e.appendChild(a);
      }
    }
    function l(e, t, n) {
      var r = n.css,
        i = n.media,
        a = n.sourceMap;
      if (
        (i ? e.setAttribute("media", i) : e.removeAttribute("media"),
        a &&
          "undefined" != typeof btoa &&
          (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(
            btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
            " */"
          )),
        e.styleSheet)
      )
        e.styleSheet.cssText = r;
      else {
        for (; e.firstChild; ) e.removeChild(e.firstChild);
        e.appendChild(document.createTextNode(r));
      }
    }
    function s(e, t) {
      var n, r, s;
      if (t.singleton) {
        var u = h++;
        (n = p || (p = i(t))), (r = o.bind(null, n, u, !1)), (s = o.bind(null, n, u, !0));
      } else
        (n = i(t)),
          (r = l.bind(null, n, t)),
          (s = function () {
            a(n);
          });
      return (
        r(e),
        function (t) {
          if (t) {
            if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
            r((e = t));
          } else s();
        }
      );
    }
    var u = (function () {
        var e;
        return function () {
          return "undefined" == typeof e && (e = Boolean(window && document && document.all && !window.atob)), e;
        };
      })(),
      c = (function () {
        var e = {};
        return function (t) {
          if ("undefined" == typeof e[t]) {
            var n = document.querySelector(t);
            if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
              try {
                n = n.contentDocument.head;
              } catch (e) {
                n = null;
              }
            e[t] = n;
          }
          return e[t];
        };
      })(),
      d = [],
      f = (function () {
        var e = [];
        return function (t, n) {
          return (e[t] = n), e.filter(Boolean).join("\n");
        };
      })(),
      p = null,
      h = 0;
    e.exports = function (e, t) {
      (t = t || {}), t.singleton || "boolean" == typeof t.singleton || (t.singleton = u()), (e = e || []);
      var i = r(e, t);
      return function (e) {
        if (((e = e || []), "[object Array]" === Object.prototype.toString.call(e))) {
          for (var a = 0; a < i.length; a++) {
            var o = i[a],
              l = n(o);
            d[l].references--;
          }
          for (var s = r(e, t), u = 0; u < i.length; u++) {
            var c = i[u],
              f = n(c);
            0 === d[f].references && (d[f].updater(), d.splice(f, 1));
          }
          i = s;
        }
      };
    };
  },
  function (e, t, n) {
    var r = n(5);
    (t = r(!1)),
      t.push([
        e.id,
        "#background-slideshow .slide {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: fixed;\n}\n#background-slideshow .wallpaper {\n  width: 100%;\n  height: 100%;\n  background-size: cover;\n  background-position-x: 50%;\n  background-position-y: 0;\n  opacity: 1;\n  transition-property: opacity;\n  transition-duration: 1s;\n  transition-timing-function: ease;\n}\n#background-slideshow .wallpaper.fadeout {\n  opacity: 0;\n}\n#background-slideshow .user-info {\n  position: fixed;\n  width: 216px;\n  height: 64px;\n  bottom: 48px;\n  right: 16px;\n  border-radius: 8px;\n  background-color: rgba(0,0,0,0.32);\n  color: #fff;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  box-sizing: border-box;\n  padding: 8px;\n}\n#background-slideshow .user-info a:link,\n#background-slideshow .user-info a:visited,\n#background-slideshow .user-info a:hover,\n#background-slideshow .user-info a:active {\n  text-decoration: none;\n  color: #fff;\n}\n#background-slideshow .user-info .user-icon {\n  display: inline-block;\n  vertical-align: top;\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n#background-slideshow .user-info .description {\n  display: -ms-grid;\n  display: grid;\n  margin-left: 8px;\n}\n#background-slideshow .user-info .description .illust-title {\n  font-size: 12px;\n  line-height: 20px;\n  font-weight: bold;\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n#background-slideshow .user-info .description .user-name {\n  font-size: 12px;\n  line-height: 20px;\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n",
        "",
      ]),
      (e.exports = t);
  },
  function (e, t) {
    "use strict";
    function n(e, t) {
      var n = e[1] || "",
        i = e[3];
      if (!i) return n;
      if (t && "function" == typeof btoa) {
        var a = r(i),
          o = i.sources.map(function (e) {
            return "/*# sourceURL=".concat(i.sourceRoot || "").concat(e, " */");
          });
        return [n].concat(o).concat([a]).join("\n");
      }
      return [n].join("\n");
    }
    function r(e) {
      var t = btoa(unescape(encodeURIComponent(JSON.stringify(e)))),
        n = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t);
      return "/*# ".concat(n, " */");
    }
    e.exports = function (e) {
      var t = [];
      return (
        (t.toString = function () {
          return this.map(function (t) {
            var r = n(t, e);
            return t[2] ? "@media ".concat(t[2], " {").concat(r, "}") : r;
          }).join("");
        }),
        (t.i = function (e, n, r) {
          "string" == typeof e && (e = [[null, e, ""]]);
          var i = {};
          if (r)
            for (var a = 0; a < this.length; a++) {
              var o = this[a][0];
              null != o && (i[o] = !0);
            }
          for (var l = 0; l < e.length; l++) {
            var s = [].concat(e[l]);
            (r && i[s[0]]) || (n && (s[2] ? (s[2] = "".concat(n, " and ").concat(s[2])) : (s[2] = n)), t.push(s));
          }
        }),
        t
      );
    };
  },
  function (e, t, n) {
    var r = n(7);
    e.exports = (r.default || r).template({
      compiler: [7, ">= 4.0.0"],
      main: function (e, t, n, r, i) {
        var a,
          o = null != t ? t : e.nullContext || {},
          l = n.helperMissing,
          s = "function",
          u = e.escapeExpression;
        return (
          '<div class="wallpaper" style="background-image:url(\'' +
          u(
            ((a = null != (a = n.illustImgUrl || (null != t ? t.illustImgUrl : t)) ? a : l),
            typeof a === s ? a.call(o, { name: "illustImgUrl", hash: {}, data: i }) : a)
          ) +
          '\')">\n    <div class="user-info">\n        <a href="' +
          u(
            ((a = null != (a = n.wwwUserUrl || (null != t ? t.wwwUserUrl : t)) ? a : l),
            typeof a === s ? a.call(o, { name: "wwwUserUrl", hash: {}, data: i }) : a)
          ) +
          '" target="_blank">\n            <div class="user-icon" style="background-image:url(\'' +
          u(
            ((a = null != (a = n.profileImgUrl || (null != t ? t.profileImgUrl : t)) ? a : l),
            typeof a === s ? a.call(o, { name: "profileImgUrl", hash: {}, data: i }) : a)
          ) +
          '\')">\n            </div>\n        </a>\n        <div class="description">\n            <div class="illust-title">\n                <a href="' +
          u(
            ((a = null != (a = n.wwwMemberIllustMediumUrl || (null != t ? t.wwwMemberIllustMediumUrl : t)) ? a : l),
            typeof a === s ? a.call(o, { name: "wwwMemberIllustMediumUrl", hash: {}, data: i }) : a)
          ) +
          '" target="_blank">\n                    ' +
          u(
            ((a = null != (a = n.illustTitle || (null != t ? t.illustTitle : t)) ? a : l),
            typeof a === s ? a.call(o, { name: "illustTitle", hash: {}, data: i }) : a)
          ) +
          '\n                </a>\n            </div>\n            <div class="user-name">\n                <a href="' +
          u(
            ((a = null != (a = n.wwwUserUrl || (null != t ? t.wwwUserUrl : t)) ? a : l),
            typeof a === s ? a.call(o, { name: "wwwUserUrl", hash: {}, data: i }) : a)
          ) +
          '" target="_blank">\n                    ' +
          u(
            ((a = null != (a = n.userName || (null != t ? t.userName : t)) ? a : l),
            typeof a === s ? a.call(o, { name: "userName", hash: {}, data: i }) : a)
          ) +
          "さんの作品\n                </a>\n            </div>\n        </div>\n    </div>\n</div>\n"
        );
      },
      useData: !0,
    });
  },
  function (e, t, n) {
    e.exports = n(8).default;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function i(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    function a() {
      var e = new l.HandlebarsEnvironment();
      return (
        p.extend(e, l),
        (e.SafeString = u.default),
        (e.Exception = d.default),
        (e.Utils = p),
        (e.escapeExpression = p.escapeExpression),
        (e.VM = v),
        (e.template = function (t) {
          return v.template(t, e);
        }),
        e
      );
    }
    t.__esModule = !0;
    var o = n(9),
      l = i(o),
      s = n(23),
      u = r(s),
      c = n(11),
      d = r(c),
      f = n(10),
      p = i(f),
      h = n(24),
      v = i(h),
      m = n(25),
      g = r(m),
      w = a();
    (w.create = a), g.default(w), (w.default = w), (t.default = w), (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function i(e, t, n) {
      (this.helpers = e || {}),
        (this.partials = t || {}),
        (this.decorators = n || {}),
        s.registerDefaultHelpers(this),
        u.registerDefaultDecorators(this);
    }
    (t.__esModule = !0), (t.HandlebarsEnvironment = i);
    var a = n(10),
      o = n(11),
      l = r(o),
      s = n(12),
      u = n(20),
      c = n(22),
      d = r(c),
      f = "4.1.0";
    t.VERSION = f;
    var p = 7;
    t.COMPILER_REVISION = p;
    var h = {
      1: "<= 1.0.rc.2",
      2: "== 1.0.0-rc.3",
      3: "== 1.0.0-rc.4",
      4: "== 1.x.x",
      5: "== 2.0.0-alpha.x",
      6: ">= 2.0.0-beta.1",
      7: ">= 4.0.0",
    };
    t.REVISION_CHANGES = h;
    var v = "[object Object]";
    i.prototype = {
      constructor: i,
      logger: d.default,
      log: d.default.log,
      registerHelper: function (e, t) {
        if (a.toString.call(e) === v) {
          if (t) throw new l.default("Arg not supported with multiple helpers");
          a.extend(this.helpers, e);
        } else this.helpers[e] = t;
      },
      unregisterHelper: function (e) {
        delete this.helpers[e];
      },
      registerPartial: function (e, t) {
        if (a.toString.call(e) === v) a.extend(this.partials, e);
        else {
          if ("undefined" == typeof t)
            throw new l.default('Attempting to register a partial called "' + e + '" as undefined');
          this.partials[e] = t;
        }
      },
      unregisterPartial: function (e) {
        delete this.partials[e];
      },
      registerDecorator: function (e, t) {
        if (a.toString.call(e) === v) {
          if (t) throw new l.default("Arg not supported with multiple decorators");
          a.extend(this.decorators, e);
        } else this.decorators[e] = t;
      },
      unregisterDecorator: function (e) {
        delete this.decorators[e];
      },
    };
    var m = d.default.log;
    (t.log = m), (t.createFrame = a.createFrame), (t.logger = d.default);
  },
  function (e, t) {
    "use strict";
    function n(e) {
      return c[e];
    }
    function r(e) {
      for (var t = 1; t < arguments.length; t++)
        for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
      return e;
    }
    function i(e, t) {
      for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
      return -1;
    }
    function a(e) {
      if ("string" != typeof e) {
        if (e && e.toHTML) return e.toHTML();
        if (null == e) return "";
        if (!e) return e + "";
        e = "" + e;
      }
      return f.test(e) ? e.replace(d, n) : e;
    }
    function o(e) {
      return (!e && 0 !== e) || !(!v(e) || 0 !== e.length);
    }
    function l(e) {
      var t = r({}, e);
      return (t._parent = e), t;
    }
    function s(e, t) {
      return (e.path = t), e;
    }
    function u(e, t) {
      return (e ? e + "." : "") + t;
    }
    (t.__esModule = !0),
      (t.extend = r),
      (t.indexOf = i),
      (t.escapeExpression = a),
      (t.isEmpty = o),
      (t.createFrame = l),
      (t.blockParams = s),
      (t.appendContextPath = u);
    var c = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;", "=": "&#x3D;" },
      d = /[&<>"'`=]/g,
      f = /[&<>"'`=]/,
      p = Object.prototype.toString;
    t.toString = p;
    var h = function (e) {
      return "function" == typeof e;
    };
    h(/x/) &&
      (t.isFunction = h =
        function (e) {
          return "function" == typeof e && "[object Function]" === p.call(e);
        }),
      (t.isFunction = h);
    var v =
      Array.isArray ||
      function (e) {
        return !(!e || "object" != typeof e) && "[object Array]" === p.call(e);
      };
    t.isArray = v;
  },
  function (e, t) {
    "use strict";
    function n(e, t) {
      var i = t && t.loc,
        a = void 0,
        o = void 0;
      i && ((a = i.start.line), (o = i.start.column), (e += " - " + a + ":" + o));
      for (var l = Error.prototype.constructor.call(this, e), s = 0; s < r.length; s++) this[r[s]] = l[r[s]];
      Error.captureStackTrace && Error.captureStackTrace(this, n);
      try {
        i &&
          ((this.lineNumber = a),
          Object.defineProperty
            ? Object.defineProperty(this, "column", { value: o, enumerable: !0 })
            : (this.column = o));
      } catch (e) {}
    }
    t.__esModule = !0;
    var r = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
    (n.prototype = new Error()), (t.default = n), (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function i(e) {
      o.default(e), s.default(e), c.default(e), f.default(e), h.default(e), m.default(e), w.default(e);
    }
    (t.__esModule = !0), (t.registerDefaultHelpers = i);
    var a = n(13),
      o = r(a),
      l = n(14),
      s = r(l),
      u = n(15),
      c = r(u),
      d = n(16),
      f = r(d),
      p = n(17),
      h = r(p),
      v = n(18),
      m = r(v),
      g = n(19),
      w = r(g);
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(10);
    (t.default = function (e) {
      e.registerHelper("blockHelperMissing", function (t, n) {
        var i = n.inverse,
          a = n.fn;
        if (t === !0) return a(this);
        if (t === !1 || null == t) return i(this);
        if (r.isArray(t)) return t.length > 0 ? (n.ids && (n.ids = [n.name]), e.helpers.each(t, n)) : i(this);
        if (n.data && n.ids) {
          var o = r.createFrame(n.data);
          (o.contextPath = r.appendContextPath(n.data.contextPath, n.name)), (n = { data: o });
        }
        return a(t, n);
      });
    }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.__esModule = !0;
    var i = n(10),
      a = n(11),
      o = r(a);
    (t.default = function (e) {
      e.registerHelper("each", function (e, t) {
        function n(t, n, a) {
          u && ((u.key = t), (u.index = n), (u.first = 0 === n), (u.last = !!a), c && (u.contextPath = c + t)),
            (s += r(e[t], { data: u, blockParams: i.blockParams([e[t], t], [c + t, null]) }));
        }
        if (!t) throw new o.default("Must pass iterator to #each");
        var r = t.fn,
          a = t.inverse,
          l = 0,
          s = "",
          u = void 0,
          c = void 0;
        if (
          (t.data && t.ids && (c = i.appendContextPath(t.data.contextPath, t.ids[0]) + "."),
          i.isFunction(e) && (e = e.call(this)),
          t.data && (u = i.createFrame(t.data)),
          e && "object" == typeof e)
        )
          if (i.isArray(e)) for (var d = e.length; l < d; l++) l in e && n(l, l, l === e.length - 1);
          else {
            var f = void 0;
            for (var p in e) e.hasOwnProperty(p) && (void 0 !== f && n(f, l - 1), (f = p), l++);
            void 0 !== f && n(f, l - 1, !0);
          }
        return 0 === l && (s = a(this)), s;
      });
    }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.__esModule = !0;
    var i = n(11),
      a = r(i);
    (t.default = function (e) {
      e.registerHelper("helperMissing", function () {
        if (1 !== arguments.length)
          throw new a.default('Missing helper: "' + arguments[arguments.length - 1].name + '"');
      });
    }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(10);
    (t.default = function (e) {
      e.registerHelper("if", function (e, t) {
        return (
          r.isFunction(e) && (e = e.call(this)),
          (!t.hash.includeZero && !e) || r.isEmpty(e) ? t.inverse(this) : t.fn(this)
        );
      }),
        e.registerHelper("unless", function (t, n) {
          return e.helpers.if.call(this, t, { fn: n.inverse, inverse: n.fn, hash: n.hash });
        });
    }),
      (e.exports = t.default);
  },
  function (e, t) {
    "use strict";
    (t.__esModule = !0),
      (t.default = function (e) {
        e.registerHelper("log", function () {
          for (var t = [void 0], n = arguments[arguments.length - 1], r = 0; r < arguments.length - 1; r++)
            t.push(arguments[r]);
          var i = 1;
          null != n.hash.level ? (i = n.hash.level) : n.data && null != n.data.level && (i = n.data.level),
            (t[0] = i),
            e.log.apply(e, t);
        });
      }),
      (e.exports = t.default);
  },
  function (e, t) {
    "use strict";
    (t.__esModule = !0),
      (t.default = function (e) {
        e.registerHelper("lookup", function (e, t) {
          return e && e[t];
        });
      }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(10);
    (t.default = function (e) {
      e.registerHelper("with", function (e, t) {
        r.isFunction(e) && (e = e.call(this));
        var n = t.fn;
        if (r.isEmpty(e)) return t.inverse(this);
        var i = t.data;
        return (
          t.data &&
            t.ids &&
            ((i = r.createFrame(t.data)), (i.contextPath = r.appendContextPath(t.data.contextPath, t.ids[0]))),
          n(e, { data: i, blockParams: r.blockParams([e], [i && i.contextPath]) })
        );
      });
    }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function i(e) {
      o.default(e);
    }
    (t.__esModule = !0), (t.registerDefaultDecorators = i);
    var a = n(21),
      o = r(a);
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(10);
    (t.default = function (e) {
      e.registerDecorator("inline", function (e, t, n, i) {
        var a = e;
        return (
          t.partials ||
            ((t.partials = {}),
            (a = function (i, a) {
              var o = n.partials;
              n.partials = r.extend({}, o, t.partials);
              var l = e(i, a);
              return (n.partials = o), l;
            })),
          (t.partials[i.args[0]] = i.fn),
          a
        );
      });
    }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(10),
      i = {
        methodMap: ["debug", "info", "warn", "error"],
        level: "info",
        lookupLevel: function (e) {
          if ("string" == typeof e) {
            var t = r.indexOf(i.methodMap, e.toLowerCase());
            e = t >= 0 ? t : parseInt(e, 10);
          }
          return e;
        },
        log: function (e) {
          if (((e = i.lookupLevel(e)), "undefined" != typeof console && i.lookupLevel(i.level) <= e)) {
            var t = i.methodMap[e];
            console[t] || (t = "log");
            for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) r[a - 1] = arguments[a];
            console[t].apply(console, r);
          }
        },
      };
    (t.default = i), (e.exports = t.default);
  },
  function (e, t) {
    "use strict";
    function n(e) {
      this.string = e;
    }
    (t.__esModule = !0),
      (n.prototype.toString = n.prototype.toHTML =
        function () {
          return "" + this.string;
        }),
      (t.default = n),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function i(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    function a(e) {
      var t = (e && e[0]) || 1,
        n = g.COMPILER_REVISION;
      if (t !== n) {
        if (t < n) {
          var r = g.REVISION_CHANGES[n],
            i = g.REVISION_CHANGES[t];
          throw new m.default(
            "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" +
              r +
              ") or downgrade your runtime to an older version (" +
              i +
              ")."
          );
        }
        throw new m.default(
          "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" +
            e[1] +
            ")."
        );
      }
    }
    function o(e, t) {
      function n(n, r, i) {
        i.hash && ((r = h.extend({}, r, i.hash)), i.ids && (i.ids[0] = !0)),
          (n = t.VM.resolvePartial.call(this, n, r, i));
        var a = t.VM.invokePartial.call(this, n, r, i);
        if (
          (null == a &&
            t.compile &&
            ((i.partials[i.name] = t.compile(n, e.compilerOptions, t)), (a = i.partials[i.name](r, i))),
          null != a)
        ) {
          if (i.indent) {
            for (var o = a.split("\n"), l = 0, s = o.length; l < s && (o[l] || l + 1 !== s); l++)
              o[l] = i.indent + o[l];
            a = o.join("\n");
          }
          return a;
        }
        throw new m.default("The partial " + i.name + " could not be compiled when running in runtime-only mode");
      }
      function r(t) {
        function n(t) {
          return "" + e.main(i, t, i.helpers, i.partials, o, s, l);
        }
        var a = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
          o = a.data;
        r._setup(a), !a.partial && e.useData && (o = d(t, o));
        var l = void 0,
          s = e.useBlockParams ? [] : void 0;
        return (
          e.useDepths && (l = a.depths ? (t != a.depths[0] ? [t].concat(a.depths) : a.depths) : [t]),
          (n = f(e.main, n, i, a.depths || [], o, s))(t, a)
        );
      }
      if (!t) throw new m.default("No environment passed to template");
      if (!e || !e.main) throw new m.default("Unknown template object: " + typeof e);
      (e.main.decorator = e.main_d), t.VM.checkRevision(e.compiler);
      var i = {
        strict: function (e, t) {
          if (!(t in e)) throw new m.default('"' + t + '" not defined in ' + e);
          return e[t];
        },
        lookup: function (e, t) {
          for (var n = e.length, r = 0; r < n; r++) if (e[r] && null != e[r][t]) return e[r][t];
        },
        lambda: function (e, t) {
          return "function" == typeof e ? e.call(t) : e;
        },
        escapeExpression: h.escapeExpression,
        invokePartial: n,
        fn: function (t) {
          var n = e[t];
          return (n.decorator = e[t + "_d"]), n;
        },
        programs: [],
        program: function (e, t, n, r, i) {
          var a = this.programs[e],
            o = this.fn(e);
          return t || i || r || n ? (a = l(this, e, o, t, n, r, i)) : a || (a = this.programs[e] = l(this, e, o)), a;
        },
        data: function (e, t) {
          for (; e && t--; ) e = e._parent;
          return e;
        },
        merge: function (e, t) {
          var n = e || t;
          return e && t && e !== t && (n = h.extend({}, t, e)), n;
        },
        nullContext: Object.seal({}),
        noop: t.VM.noop,
        compilerInfo: e.compiler,
      };
      return (
        (r.isTop = !0),
        (r._setup = function (n) {
          n.partial
            ? ((i.helpers = n.helpers), (i.partials = n.partials), (i.decorators = n.decorators))
            : ((i.helpers = i.merge(n.helpers, t.helpers)),
              e.usePartial && (i.partials = i.merge(n.partials, t.partials)),
              (e.usePartial || e.useDecorators) && (i.decorators = i.merge(n.decorators, t.decorators)));
        }),
        (r._child = function (t, n, r, a) {
          if (e.useBlockParams && !r) throw new m.default("must pass block params");
          if (e.useDepths && !a) throw new m.default("must pass parent depths");
          return l(i, t, e[t], n, 0, r, a);
        }),
        r
      );
    }
    function l(e, t, n, r, i, a, o) {
      function l(t) {
        var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
          l = o;
        return (
          !o || t == o[0] || (t === e.nullContext && null === o[0]) || (l = [t].concat(o)),
          n(e, t, e.helpers, e.partials, i.data || r, a && [i.blockParams].concat(a), l)
        );
      }
      return (l = f(n, l, e, o, r, a)), (l.program = t), (l.depth = o ? o.length : 0), (l.blockParams = i || 0), l;
    }
    function s(e, t, n) {
      return (
        e
          ? e.call || n.name || ((n.name = e), (e = n.partials[e]))
          : (e = "@partial-block" === n.name ? n.data["partial-block"] : n.partials[n.name]),
        e
      );
    }
    function u(e, t, n) {
      var r = n.data && n.data["partial-block"];
      (n.partial = !0), n.ids && (n.data.contextPath = n.ids[0] || n.data.contextPath);
      var i = void 0;
      if (
        (n.fn &&
          n.fn !== c &&
          !(function () {
            n.data = g.createFrame(n.data);
            var e = n.fn;
            (i = n.data["partial-block"] =
              function (t) {
                var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                return (n.data = g.createFrame(n.data)), (n.data["partial-block"] = r), e(t, n);
              }),
              e.partials && (n.partials = h.extend({}, n.partials, e.partials));
          })(),
        void 0 === e && i && (e = i),
        void 0 === e)
      )
        throw new m.default("The partial " + n.name + " could not be found");
      if (e instanceof Function) return e(t, n);
    }
    function c() {
      return "";
    }
    function d(e, t) {
      return (t && "root" in t) || ((t = t ? g.createFrame(t) : {}), (t.root = e)), t;
    }
    function f(e, t, n, r, i, a) {
      if (e.decorator) {
        var o = {};
        (t = e.decorator(t, o, n, r && r[0], i, a, r)), h.extend(t, o);
      }
      return t;
    }
    (t.__esModule = !0),
      (t.checkRevision = a),
      (t.template = o),
      (t.wrapProgram = l),
      (t.resolvePartial = s),
      (t.invokePartial = u),
      (t.noop = c);
    var p = n(10),
      h = i(p),
      v = n(11),
      m = r(v),
      g = n(9);
  },
  function (e, t) {
    (function (n) {
      "use strict";
      (t.__esModule = !0),
        (t.default = function (e) {
          var t = "undefined" != typeof n ? n : window,
            r = t.Handlebars;
          e.noConflict = function () {
            return t.Handlebars === e && (t.Handlebars = r), e;
          };
        }),
        (e.exports = t.default);
    }).call(
      t,
      (function () {
        return this;
      })()
    );
  },
]);
