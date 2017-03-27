// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
/*!
 * jQuery Smooth Scroll - v2.1.2 - 2017-01-19
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2017 Karl Swedberg
 * Licensed MIT
 */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    var version = '2.1.2';
    var optionOverrides = {};
    var defaults = {
        exclude: [],
        excludeWithin: [],
        offset: 0,

        // one of 'top' or 'left'
        direction: 'top',

        // if set, bind click events through delegation
        //  supported since jQuery 1.4.2
        delegateSelector: null,

        // jQuery set of elements you wish to scroll (for $.smoothScroll).
        //  if null (default), $('html, body').firstScrollable() is used.
        scrollElement: null,

        // only use if you want to override default behavior
        scrollTarget: null,

        // fn(opts) function to be called before scrolling occurs.
        // `this` is the element(s) being scrolled
        beforeScroll: function() {},

        // fn(opts) function to be called after scrolling occurs.
        // `this` is the triggering element
        afterScroll: function() {},

        // easing name. jQuery comes with "swing" and "linear." For others, you'll need an easing plugin
        // from jQuery UI or elsewhere
        easing: 'swing',

        // speed can be a number or 'auto'
        // if 'auto', the speed will be calculated based on the formula:
        // (current scroll position - target scroll position) / autoCoeffic
        speed: 400,

        // coefficient for "auto" speed
        autoCoefficient: 2,

        // $.fn.smoothScroll only: whether to prevent the default click action
        preventDefault: true
    };

    var getScrollable = function(opts) {
        var scrollable = [];
        var scrolled = false;
        var dir = opts.dir && opts.dir === 'left' ? 'scrollLeft' : 'scrollTop';

        this.each(function() {
            var el = $(this);

            if (this === document || this === window) {
                return;
            }

            if (document.scrollingElement && (this === document.documentElement || this === document.body)) {
                scrollable.push(document.scrollingElement);

                return false;
            }

            if (el[dir]() > 0) {
                scrollable.push(this);
            } else {
                // if scroll(Top|Left) === 0, nudge the element 1px and see if it moves
                el[dir](1);
                scrolled = el[dir]() > 0;

                if (scrolled) {
                    scrollable.push(this);
                }
                // then put it back, of course
                el[dir](0);
            }
        });

        if (!scrollable.length) {
            this.each(function() {
                // If no scrollable elements and <html> has scroll-behavior:smooth because
                // "When this property is specified on the root element, it applies to the viewport instead."
                // and "The scroll-behavior property of the … body element is *not* propagated to the viewport."
                // → https://drafts.csswg.org/cssom-view/#propdef-scroll-behavior
                if (this === document.documentElement && $(this).css('scrollBehavior') === 'smooth') {
                    scrollable = [this];
                }

                // If still no scrollable elements, fall back to <body>,
                // if it's in the jQuery collection
                // (doing this because Safari sets scrollTop async,
                // so can't set it to 1 and immediately get the value.)
                if (!scrollable.length && this.nodeName === 'BODY') {
                    scrollable = [this];
                }
            });
        }

        // Use the first scrollable element if we're calling firstScrollable()
        if (opts.el === 'first' && scrollable.length > 1) {
            scrollable = [scrollable[0]];
        }

        return scrollable;
    };

    var rRelative = /^([\-\+]=)(\d+)/;
    $.fn.extend({
        scrollable: function(dir) {
            var scrl = getScrollable.call(this, {dir: dir});

            return this.pushStack(scrl);
        },
        firstScrollable: function(dir) {
            var scrl = getScrollable.call(this, {el: 'first', dir: dir});

            return this.pushStack(scrl);
        },

        smoothScroll: function(options, extra) {
            options = options || {};

            if (options === 'options') {
                if (!extra) {
                    return this.first().data('ssOpts');
                }

                return this.each(function() {
                    var $this = $(this);
                    var opts = $.extend($this.data('ssOpts') || {}, extra);

                    $(this).data('ssOpts', opts);
                });
            }

            var opts = $.extend({}, $.fn.smoothScroll.defaults, options);

            var clickHandler = function(event) {
                var escapeSelector = function(str) {
                    return str.replace(/(:|\.|\/)/g, '\\$1');
                };

                var link = this;
                var $link = $(this);
                var thisOpts = $.extend({}, opts, $link.data('ssOpts') || {});
                var exclude = opts.exclude;
                var excludeWithin = thisOpts.excludeWithin;
                var elCounter = 0;
                var ewlCounter = 0;
                var include = true;
                var clickOpts = {};
                var locationPath = $.smoothScroll.filterPath(location.pathname);
                var linkPath = $.smoothScroll.filterPath(link.pathname);
                var hostMatch = location.hostname === link.hostname || !link.hostname;
                var pathMatch = thisOpts.scrollTarget || (linkPath === locationPath);
                var thisHash = escapeSelector(link.hash);

                if (thisHash && !$(thisHash).length) {
                    include = false;
                }

                if (!thisOpts.scrollTarget && (!hostMatch || !pathMatch || !thisHash)) {
                    include = false;
                } else {
                    while (include && elCounter < exclude.length) {
                        if ($link.is(escapeSelector(exclude[elCounter++]))) {
                            include = false;
                        }
                    }

                    while (include && ewlCounter < excludeWithin.length) {
                        if ($link.closest(excludeWithin[ewlCounter++]).length) {
                            include = false;
                        }
                    }
                }

                if (include) {
                    if (thisOpts.preventDefault) {
                        event.preventDefault();
                    }

                    $.extend(clickOpts, thisOpts, {
                        scrollTarget: thisOpts.scrollTarget || thisHash,
                        link: link
                    });

                    $.smoothScroll(clickOpts);
                }
            };

            if (options.delegateSelector !== null) {
                this
                    .off('click.smoothscroll', options.delegateSelector)
                    .on('click.smoothscroll', options.delegateSelector, clickHandler);
            } else {
                this
                    .off('click.smoothscroll')
                    .on('click.smoothscroll', clickHandler);
            }

            return this;
        }
    });

    var getExplicitOffset = function(val) {
        var explicit = {relative: ''};
        var parts = typeof val === 'string' && rRelative.exec(val);

        if (typeof val === 'number') {
            explicit.px = val;
        } else if (parts) {
            explicit.relative = parts[1];
            explicit.px = parseFloat(parts[2]) || 0;
        }

        return explicit;
    };

    $.smoothScroll = function(options, px) {
        if (options === 'options' && typeof px === 'object') {
            return $.extend(optionOverrides, px);
        }
        var opts, $scroller, speed, delta;
        var explicitOffset = getExplicitOffset(options);
        var scrollTargetOffset = {};
        var scrollerOffset = 0;
        var offPos = 'offset';
        var scrollDir = 'scrollTop';
        var aniProps = {};
        var aniOpts = {};

        if (explicitOffset.px) {
            opts = $.extend({link: null}, $.fn.smoothScroll.defaults, optionOverrides);
        } else {
            opts = $.extend({link: null}, $.fn.smoothScroll.defaults, options || {}, optionOverrides);

            if (opts.scrollElement) {
                offPos = 'position';

                if (opts.scrollElement.css('position') === 'static') {
                    opts.scrollElement.css('position', 'relative');
                }
            }

            if (px) {
                explicitOffset = getExplicitOffset(px);
            }
        }

        scrollDir = opts.direction === 'left' ? 'scrollLeft' : scrollDir;

        if (opts.scrollElement) {
            $scroller = opts.scrollElement;

            if (!explicitOffset.px && !(/^(?:HTML|BODY)$/).test($scroller[0].nodeName)) {
                scrollerOffset = $scroller[scrollDir]();
            }
        } else {
            $scroller = $('html, body').firstScrollable(opts.direction);
        }

        // beforeScroll callback function must fire before calculating offset
        opts.beforeScroll.call($scroller, opts);

        scrollTargetOffset = explicitOffset.px ? explicitOffset : {
                relative: '',
                px: ($(opts.scrollTarget)[offPos]() && $(opts.scrollTarget)[offPos]()[opts.direction]) || 0
            };

        aniProps[scrollDir] = scrollTargetOffset.relative + (scrollTargetOffset.px + scrollerOffset + opts.offset);

        speed = opts.speed;

        // automatically calculate the speed of the scroll based on distance / coefficient
        if (speed === 'auto') {

            // $scroller[scrollDir]() is position before scroll, aniProps[scrollDir] is position after
            // When delta is greater, speed will be greater.
            delta = Math.abs(aniProps[scrollDir] - $scroller[scrollDir]());

            // Divide the delta by the coefficient
            speed = delta / opts.autoCoefficient;
        }

        aniOpts = {
            duration: speed,
            easing: opts.easing,
            complete: function() {
                opts.afterScroll.call(opts.link, opts);
            }
        };

        if (opts.step) {
            aniOpts.step = opts.step;
        }

        if ($scroller.length) {
            $scroller.stop().animate(aniProps, aniOpts);
        } else {
            opts.afterScroll.call(opts.link, opts);
        }
    };

    $.smoothScroll.version = version;
    $.smoothScroll.filterPath = function(string) {
        string = string || '';

        return string
            .replace(/^\//, '')
            .replace(/(?:index|default).[a-zA-Z]{3,4}$/, '')
            .replace(/\/$/, '');
    };

    // default options
    $.fn.smoothScroll.defaults = defaults;

}));

/*
 * jQuery appear plugin
 *
 * Copyright (c) 2012 Andrey Sidorov
 * licensed under MIT license.
 *
 * https://github.com/morr/jquery.appear/
 *
 * Version: 0.3.6
 */
(function($) {
    var selectors = [];

    var check_binded = false;
    var check_lock = false;
    var defaults = {
        interval: 250,
        force_process: false
    };
    var $window = $(window);

    var $prior_appeared = [];

    function appeared(selector) {
        return $(selector).filter(function() {
            return $(this).is(':appeared');
        });
    }

    function process() {
        check_lock = false;
        for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
            var $appeared = appeared(selectors[index]);

            $appeared.trigger('appear', [$appeared]);

            if ($prior_appeared[index]) {
                var $disappeared = $prior_appeared[index].not($appeared);
                $disappeared.trigger('disappear', [$disappeared]);
            }
            $prior_appeared[index] = $appeared;
        }
    }

    function add_selector(selector) {
        selectors.push(selector);
        $prior_appeared.push();
    }

    // "appeared" custom filter
    $.expr[':'].appeared = function(element) {
        var $element = $(element);
        if (!$element.is(':visible')) {
            return false;
        }

        var window_left = $window.scrollLeft();
        var window_top = $window.scrollTop() + 50;
        var offset = $element.offset();
        var left = offset.left;
        var top = offset.top;

        if (top + $element.height() >= window_top &&
            top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
            left + $element.width() >= window_left &&
            left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
            return true;
        } else {
            return false;
        }
    };

    $.fn.extend({
        // watching for element's appearance in browser viewport
        appear: function(options) {
            var opts = $.extend({}, defaults, options || {});
            var selector = this.selector || this;
            if (!check_binded) {
                var on_check = function() {
                    if (check_lock) {
                        return;
                    }
                    check_lock = true;

                    setTimeout(process, opts.interval);
                };

                $(window).scroll(on_check).resize(on_check);
                check_binded = true;
            }

            if (opts.force_process) {
                setTimeout(process, opts.interval);
            }
            add_selector(selector);
            return $(selector);
        }
    });

    $.extend({
        // force elements's appearance check
        force_appear: function() {
            if (check_binded) {
                process();
                return true;
            }
            return false;
        }
    });
})(function() {
    if (typeof module !== 'undefined') {
        // Node
        return require('jquery');
    } else {
        return jQuery;
    }
}())
