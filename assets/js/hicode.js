(function(g) {
  g.fn.hicode = function(b) {
    b = g.extend({
      commentPrefix: "//",
      blockPrefix: "`",
      tabWidth: 4,
      blockStyles: 0,
      interactive: !0,
      alwaysShowBlocks: !1,
      persistence: 0
    }, b);
    for (var c = 0; c < this.length; c++) g.hicode(g(this[c]), b)
  };
  g.hicode = function(b, c) {
    if (!(navigator.userAgent.match(/MSIE ([0-9]+)\./) && 8 >= RegExp.$1)) {
      var m, h, e, k, l, r, a, f, d, n = !1,
        s = "",
        p = 0;
      m = b.text().split("\n");
      h = [];
      r = 0;
      l = 1;
      for (e = 0; e < c.tabWidth; e++) s += "&nbsp;";
      for (e in m)
        if (a = m[e].trim(), 0 !== a.length)
          if (a.substring(0, c.blockPrefix.length) == c.blockPrefix)
            if (n) h.push("</div>"), n = !1;
            else {
              a = a.substring(c.blockPrefix.length).trim();
              "(" == a.charAt(0) && -1 !== (k = a.indexOf(")")) ? (f = a.substring(1, k), d = a.substring(k + 1).trim()) : d = a;
              a = '<div class="block style' + l + '">';
              if (f || d) a += '<div class="block-comment style' + l + '">' + (f ? '<div class="title">' + f + "</div>" : "") + (d ? '<div class="text">' + d + "</div>" : "") + "</div>";
              f = d = null;
              h.push(a);
              n = !0;
              l++;
              0 < c.blockStyles && l > c.blockStyles && (l = 1)
            } else if (a.substring(0, c.commentPrefix.length) == c.commentPrefix) a = a.substring(c.commentPrefix.length).trim(), "(" == a.charAt(0) && -1 !== (k = a.indexOf(")")) ? (f = a.substring(1, k), d = a.substring(k + 1).trim()) : d = a;
      else {
        a = '<div class="line' + (0 == r ? " first" : "") + (0 !== r++ % 2 ? " even" : " odd") + (f || d ? " notification" : "") + '">' + m[e].replace(/\s+$/g, "").replace(/ /g, "&nbsp;").replace(/\t/g, s).replace(/>/g, "&gt;").replace(/</g, "&lt") + "</div>";
        if (f || d) a += '<div class="line-comment">' + (f ? '<div class="title">' + f + "</div>" : "") + (d ? '<div class="text">' + d + "</div>" : "") + "</div>";
        f = d = null;
        h.push(a);
        p = h.length - 1
      }
      n && h.push("</div>");
      h[p] && (h[p] = h[p].replace(/"line/, '"line last'));
      a = g('<div class="hicode" id="' + b.attr("id") + '">' + h.join("") + "</div>");
      a.insertAfter(b);
      b.remove();
      b = a;
      var q = b.find(".block"),
        u = b.find(".block-comment"),
        t = b.find(".line"),
        v = b.find(".line-comment");
      c.interactive ? (v.hide(), e = 0, t.each(function() {
        var a = g(this),
          b = a.next();
        b.hasClass("line-comment") && (0 < c.persistence ? (a.mouseenter(function() {
          t.removeClass("active");
          v.hide();
          a.addClass("active");
          b.show()
        }), 0 == e && 1 < c.persistence && a.trigger("mouseenter")) : a.mouseenter(function() {
          a.addClass("active");
          b.show()
        }).mouseleave(function() {
          a.removeClass("active");
          b.hide()
        }), e++)
      }), c.alwaysShowBlocks ? q.addClass("active") : (e = 0, u.hide(), q.each(function() {
        var a = g(this),
          b = a.children().first();
        b.hasClass("block-comment") && (0 < c.persistence ? (a.mouseenter(function() {
          q.removeClass("active");
          u.hide();
          a.addClass("active");
          b.show()
        }), 0 == e && 1 < c.persistence && a.trigger("mouseenter")) : a.mouseenter(function() {
          a.addClass("active");
          b.show()
        }).mouseleave(function() {
          a.removeClass("active");
          b.hide()
        }), e++)
      }))) : (t.each(function(a) {
        a = g(this);
        a.next().hasClass("line-comment") && a.addClass("active")
      }), q.each(function() {
        var a = g(this);
        a.children().first().hasClass("block-comment") && a.addClass("active")
      }))
    }
  }
})(jQuery);
