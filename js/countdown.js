function initCountdown() {
    var minWidthForFancyCountdown = 850;
    if ($(document).width() >= minWidthForFancyCountdown) {
        $('#canvastimer').show();
        $('#lameclock').hide();
    } else {
        $('#canvastimer').hide();
        $('#lameclock').show();
    }

}

$(window).resize(function () {
    initCountdown();
});

var ringer = {
    countdown_to: "11/09/2017",
    rings: {
        'DAYS': {
            s: 86400000, // mseconds in a day,
            max: 14
        },
        'HOURS': {
            s: 3600000, // mseconds per hour,
            max: 24
        },
        'MINUTES': {
            s: 60000, // mseconds per minute
            max: 60
        },
        'SECONDS': {
            s: 1000,
            max: 60
        },
        'MICROSEC': {
            s: 10,
            max: 100
        }
    },
    r_count: 5,
    r_spacing: 13, // px
    r_size: 150, // px
    r_thickness: 3, // px
    update_interval: 11, // ms


    init: function () {

        $r = ringer;
        $r.cvs = document.createElement('canvas');

        $r.size = {
            w: ($r.r_size + $r.r_thickness) * $r.r_count + ($r.r_spacing * ($r.r_count - 1)),
            h: ($r.r_size + $r.r_thickness)
        };


        //added devicePixelRatio for retina screens
        $r.cvs.setAttribute('width', $r.size.w * window.devicePixelRatio);
        $r.cvs.setAttribute('height', $r.size.h * window.devicePixelRatio);


        $r.ctx = $r.cvs.getContext('2d');

        //*1 multiply for non-retinas
        $r.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        $('#canvastimer').append($r.cvs);
        $r.cvs = $($r.cvs);
        $r.ctx.textAlign = 'center';
        $r.actual_size = $r.r_size + $r.r_thickness;
        $r.countdown_to_time = new Date($r.countdown_to).getTime();
        $r.cvs.css({width: $r.size.w + "px", height: $r.size.h + "px"});
        $r.go();


    },
    ctx: null,
    go: function () {
        var idx = 0;

        $r.time = (new Date().getTime()) - $r.countdown_to_time;


        for (var r_key in $r.rings) $r.unit(idx++, r_key, $r.rings[r_key]);

        setTimeout($r.go, $r.update_interval);
    },
    unit: function (idx, label, ring) {
        var x, y, value, ring_secs = ring.s;
        value = parseFloat($r.time / ring_secs);
        $r.time -= Math.round(parseInt(value)) * ring_secs;
        value = Math.abs(value);

        x = ($r.r_size * .5 + $r.r_thickness * .5);
        x += +(idx * ($r.r_size + $r.r_spacing + $r.r_thickness));
        y = $r.r_size * .5;
        y += $r.r_thickness * .5;


        // calculate arc end angle
        var degrees = 270 - (value / ring.max) * 360.0;
        var endAngle = degrees * (Math.PI / 180);

        $r.ctx.save();

        $r.ctx.translate(x, y);
        $r.ctx.clearRect($r.actual_size * -0.5, $r.actual_size * -0.5, $r.actual_size, $r.actual_size);

        // first circle
        $r.ctx.strokeStyle = "#efefef";
        $r.ctx.beginPath();
        $r.ctx.arc(0, 0, $r.r_size / 2, 1.5 * Math.PI, -0.5 * Math.PI, 1);
        $r.ctx.lineWidth = $r.r_thickness;
        $r.ctx.stroke();

        // second circle
        $r.ctx.strokeStyle = "#15bfb3";
        $r.ctx.beginPath();
        $r.ctx.arc(0, 0, $r.r_size / 2, 1.5 * Math.PI, endAngle, 1);
        $r.ctx.lineWidth = $r.r_thickness;
        $r.ctx.stroke();

        // label
        $r.ctx.fillStyle = "#aaa";

        $r.ctx.font = '200 10px sans-serif';
        $r.ctx.fillText(label, 0, 20);

        $r.ctx.font = '200 32px sans-serif';
        $r.ctx.fillStyle = "#fff";
        $r.ctx.fillText(Math.floor(value), 0, 5);

        $r.ctx.restore();
    }
};

ringer.init();


var module, countdown = function (y) {
    function C(a, b) {
        var c = a.getTime();
        a.setMonth(a.getMonth() + b);
        return Math.round((a.getTime() - c) / 864E5)
    }

    function z(a) {
        var b = a.getTime(), c = new Date(b);
        c.setMonth(a.getMonth() + 1);
        return Math.round((c.getTime() - b) / 864E5)
    }

    function A(a, b) {
        b = b instanceof Date || null !== b && isFinite(b) ? new Date(+b) : new Date;
        if (!a) return b;
        var c = +a.value || 0;
        if (c) return b.setTime(b.getTime() + c), b;
        (c = +a.milliseconds || 0) && b.setMilliseconds(b.getMilliseconds() + c);
        (c = +a.seconds || 0) && b.setSeconds(b.getSeconds() +
            c);
        (c = +a.minutes || 0) && b.setMinutes(b.getMinutes() + c);
        (c = +a.hours || 0) && b.setHours(b.getHours() + c);
        (c = +a.weeks || 0) && (c *= 7);
        (c += +a.days || 0) && b.setDate(b.getDate() + c);
        (c = +a.months || 0) && b.setMonth(b.getMonth() + c);
        (c = +a.millennia || 0) && (c *= 10);
        (c += +a.centuries || 0) && (c *= 10);
        (c += +a.decades || 0) && (c *= 10);
        (c += +a.years || 0) && b.setFullYear(b.getFullYear() + c);
        return b
    }

    function l(a, b) {
        return v(a) + (1 === a ? w[b] : x[b])
    }

    function q() {
    }

    function n(a, b, c, d, f, m) {
        0 <= a[c] && (b += a[c], delete a[c]);
        b /= f;
        if (1 >= b + 1) return 0;
        if (0 <= a[d]) {
            a[d] =
                +(a[d] + b).toFixed(m);
            switch (d) {
                case "seconds":
                    if (60 !== a.seconds || isNaN(a.minutes)) break;
                    a.minutes++;
                    a.seconds = 0;
                case "minutes":
                    if (60 !== a.minutes || isNaN(a.hours)) break;
                    a.hours++;
                    a.minutes = 0;
                case "hours":
                    if (24 !== a.hours || isNaN(a.days)) break;
                    a.days++;
                    a.hours = 0;
                case "days":
                    if (7 !== a.days || isNaN(a.weeks)) break;
                    a.weeks++;
                    a.days = 0;
                case "weeks":
                    if (a.weeks !== z(a.refMonth) / 7 || isNaN(a.months)) break;
                    a.months++;
                    a.weeks = 0;
                case "months":
                    if (12 !== a.months || isNaN(a.years)) break;
                    a.years++;
                    a.months = 0;
                case "years":
                    if (10 !==
                        a.years || isNaN(a.decades)) break;
                    a.decades++;
                    a.years = 0;
                case "decades":
                    if (10 !== a.decades || isNaN(a.centuries)) break;
                    a.centuries++;
                    a.decades = 0;
                case "centuries":
                    if (10 !== a.centuries || isNaN(a.millennia)) break;
                    a.millennia++;
                    a.centuries = 0
            }
            return 0
        }
        return b
    }

    function D(a, b, c, d, f, m) {
        var k = new Date;
        a.start = b = b || k;
        a.end = c = c || k;
        a.units = d;
        a.value = c.getTime() - b.getTime();
        0 > a.value && (k = c, c = b, b = k);
        a.refMonth = new Date(b.getFullYear(), b.getMonth(), 15, 12, 0, 0);
        try {
            a.millennia = 0;
            a.centuries = 0;
            a.decades = 0;
            a.years = c.getFullYear() -
                b.getFullYear();
            a.months = c.getMonth() - b.getMonth();
            a.weeks = 0;
            a.days = c.getDate() - b.getDate();
            a.hours = c.getHours() - b.getHours();
            a.minutes = c.getMinutes() - b.getMinutes();
            a.seconds = c.getSeconds() - b.getSeconds();
            a.milliseconds = c.getMilliseconds() - b.getMilliseconds();
            var g;
            0 > a.milliseconds ? (g = s(-a.milliseconds / 1E3), a.seconds -= g, a.milliseconds += 1E3 * g) : 1E3 <= a.milliseconds && (a.seconds += p(a.milliseconds / 1E3), a.milliseconds %= 1E3);
            0 > a.seconds ? (g = s(-a.seconds / 60), a.minutes -= g, a.seconds += 60 * g) : 60 <= a.seconds && (a.minutes +=
                p(a.seconds / 60), a.seconds %= 60);
            0 > a.minutes ? (g = s(-a.minutes / 60), a.hours -= g, a.minutes += 60 * g) : 60 <= a.minutes && (a.hours += p(a.minutes / 60), a.minutes %= 60);
            0 > a.hours ? (g = s(-a.hours / 24), a.days -= g, a.hours += 24 * g) : 24 <= a.hours && (a.days += p(a.hours / 24), a.hours %= 24);
            for (; 0 > a.days;) a.months--, a.days += C(a.refMonth, 1);
            7 <= a.days && (a.weeks += p(a.days / 7), a.days %= 7);
            0 > a.months ? (g = s(-a.months / 12), a.years -= g, a.months += 12 * g) : 12 <= a.months && (a.years += p(a.months / 12), a.months %= 12);
            10 <= a.years && (a.decades += p(a.years / 10), a.years %=
                10, 10 <= a.decades && (a.centuries += p(a.decades / 10), a.decades %= 10, 10 <= a.centuries && (a.millennia += p(a.centuries / 10), a.centuries %= 10)));
            b = 0;
            !(d & 1024) || b >= f ? (a.centuries += 10 * a.millennia, delete a.millennia) : a.millennia && b++;
            !(d & 512) || b >= f ? (a.decades += 10 * a.centuries, delete a.centuries) : a.centuries && b++;
            !(d & 256) || b >= f ? (a.years += 10 * a.decades, delete a.decades) : a.decades && b++;
            !(d & 128) || b >= f ? (a.months += 12 * a.years, delete a.years) : a.years && b++;
            !(d & 64) || b >= f ? (a.months && (a.days += C(a.refMonth, a.months)), delete a.months,
            7 <= a.days && (a.weeks += p(a.days / 7), a.days %= 7)) : a.months && b++;
            !(d & 32) || b >= f ? (a.days += 7 * a.weeks, delete a.weeks) : a.weeks && b++;
            !(d & 16) || b >= f ? (a.hours += 24 * a.days, delete a.days) : a.days && b++;
            !(d & 8) || b >= f ? (a.minutes += 60 * a.hours, delete a.hours) : a.hours && b++;
            !(d & 4) || b >= f ? (a.seconds += 60 * a.minutes, delete a.minutes) : a.minutes && b++;
            !(d & 2) || b >= f ? (a.milliseconds += 1E3 * a.seconds, delete a.seconds) : a.seconds && b++;
            if (!(d & 1) || b >= f) {
                var h = n(a, 0, "milliseconds", "seconds", 1E3, m);
                if (h && (h = n(a, h, "seconds", "minutes", 60, m)) && (h =
                        n(a, h, "minutes", "hours", 60, m)) && (h = n(a, h, "hours", "days", 24, m)) && (h = n(a, h, "days", "weeks", 7, m)) && (h = n(a, h, "weeks", "months", z(a.refMonth) / 7, m))) {
                    d = h;
                    var e, l = a.refMonth, q = l.getTime(), r = new Date(q);
                    r.setFullYear(l.getFullYear() + 1);
                    e = Math.round((r.getTime() - q) / 864E5);
                    if (h = n(a, d, "months", "years", e / z(a.refMonth), m)) if (h = n(a, h, "years", "decades", 10, m)) if (h = n(a, h, "decades", "centuries", 10, m)) if (h = n(a, h, "centuries", "millennia", 10, m)) throw Error("Fractional unit overflow");
                }
            }
        } finally {
            delete a.refMonth
        }
        return a
    }

    function e(a, b, c, d, f) {
        var e;
        c = +c || 222;
        d = 0 < d ? d : NaN;
        f = 0 < f ? 20 > f ? Math.round(f) : 20 : 0;
        var k = null;
        "function" === typeof a ? (e = a, a = null) : a instanceof Date || (null !== a && isFinite(a) ? a = new Date(+a) : ("object" === typeof k && (k = a), a = null));
        var g = null;
        "function" === typeof b ? (e = b, b = null) : b instanceof Date || (null !== b && isFinite(b) ? b = new Date(+b) : ("object" === typeof b && (g = b), b = null));
        k && (a = A(k, b));
        g && (b = A(g, a));
        if (!a && !b) return new q;
        if (!e) return D(new q, a, b, c, d, f);
        var k = c & 1 ? 1E3 / 30 : c & 2 ? 1E3 : c & 4 ? 6E4 : c & 8 ? 36E5 : c & 16 ? 864E5 : 6048E5,
            h, g = function () {
                e(D(new q, a, b, c, d, f), h)
            };
        g();
        return h = setInterval(g, k)
    }

    var s = Math.ceil, p = Math.floor, w, x, r, t, u, v, B;
    q.prototype.toString = function (a) {
        var b = B(this), c = b.length;
        if (!c) return a ? "" + a : u;
        if (1 === c) return b[0];
        a = r + b.pop();
        return b.join(t) + a
    };
    q.prototype.toHTML = function (a, b) {
        a = a || "span";
        var c = B(this), d = c.length;
        if (!d) return (b = b || u) ? "\x3c" + a + "\x3e" + b + "\x3c/" + a + "\x3e" : b;
        for (var f = 0; f < d; f++) c[f] = "\x3c" + a + "\x3e" + c[f] + "\x3c/" + a + "\x3e";
        if (1 === d) return c[0];
        d = r + c.pop();
        return c.join(t) + d
    };
    q.prototype.addTo =
        function (a) {
            return A(this, a)
        };
    B = function (a) {
        var b = [], c = a.millennia;
        c && b.push(l(c, 10));
        (c = a.centuries) && b.push(l(c, 9));
        (c = a.decades) && b.push(l(c, 8));
        (c = a.years) && b.push(l(c, 7));
        (c = a.months) && b.push(l(c, 6));
        (c = a.weeks) && b.push(l(c, 5));
        (c = a.days) && b.push(l(c, 4));
        (c = a.hours) && b.push(l(c, 3));
        (c = a.minutes) && b.push(l(c, 2));
        (c = a.seconds) && b.push(l(c, 1));
        (c = a.milliseconds) && b.push(l(c, 0));
        return b
    };
    e.MILLISECONDS = 1;
    e.SECONDS = 2;
    e.MINUTES = 4;
    e.HOURS = 8;
    e.DAYS = 16;
    e.WEEKS = 32;
    e.MONTHS = 64;
    e.YEARS = 128;
    e.DECADES = 256;
    e.CENTURIES = 512;
    e.MILLENNIA = 1024;
    e.DEFAULTS = 222;
    e.ALL = 2047;
    e.setLabels = function (a, b, c, d, f, e) {
        a = a || [];
        a.split && (a = a.split("|"));
        b = b || [];
        b.split && (b = b.split("|"));
        for (var k = 0; 10 >= k; k++) w[k] = a[k] || w[k], x[k] = b[k] || x[k];
        r = "string" === typeof c ? c : r;
        t = "string" === typeof d ? d : t;
        u = "string" === typeof f ? f : u;
        v = "function" === typeof e ? e : v
    };
    (e.resetLabels = function () {
        w = " millisecond; second; minute; hour; day; week; month; year; decade; century; millennium".split(";");
        x = " milliseconds; seconds; minutes; hours; days; weeks; months; years; decades; centuries; millennia".split(";");
        r = " and ";
        t = ", ";
        u = "";
        v = function (a) {
            return a
        }
    })();
    y && y.exports ? y.exports = e : "function" === typeof window.define && "undefined" !== typeof window.define.amd && window.define("countdown", [], function () {
        return e
    });
    return e
}(module);
/* end of countdown.js */

/* baby js file */
var count = setInterval(function () {
    var countdownNow = countdown(Date.now(), new Date(2017, 11, 09)).toString();
    console.log(countdownNow);
    $("#lameclock p").html(countdownNow);
}, 1000);

initCountdown();
