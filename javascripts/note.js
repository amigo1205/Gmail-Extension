/*
 * jQuery JavaScript Library v1.4.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Nov 11 19:04:53 2010 -0500
 */
(function (window, undefined) {
    var document = window.document;
    var jQuery = (function () {
        var jQuery = function (selector, context) {
                return new jQuery.fn.init(selector, context);
            },
            _jQuery = window.jQuery,
            _$ = window.$,
            rootjQuery, quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
            isSimple = /^.[^:#\[\.,]*$/,
            rnotwhite = /\S/,
            rwhite = /\s/,
            trimLeft = /^\s+/,
            trimRight = /\s+$/,
            rnonword = /\W/,
            rdigit = /\d/,
            rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
            rvalidchars = /^[\],:{}\s]*$/,
            rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
            rwebkit = /(webkit)[ \/]([\w.]+)/,
            ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            rmsie = /(msie) ([\w.]+)/,
            rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
            userAgent = navigator.userAgent,
            browserMatch, readyBound = false,
            readyList = [],
            DOMContentLoaded, toString = Object.prototype.toString,
            hasOwn = Object.prototype.hasOwnProperty,
            push = Array.prototype.push,
            slice = Array.prototype.slice,
            trim = String.prototype.trim,
            indexOf = Array.prototype.indexOf,
            class2type = {};
        jQuery.fn = jQuery.prototype = {
            init: function (selector, context) {
                var match, elem, ret, doc;
                if (!selector) {
                    return this;
                }
                if (selector.nodeType) {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this;
                }
                if (selector === "body" && !context && document.body) {
                    this.context = document;
                    this[0] = document.body;
                    this.selector = "body";
                    this.length = 1;
                    return this;
                }
                if (typeof selector === "string") {
                    match = quickExpr.exec(selector);
                    if (match && (match[1] || !context)) {
                        if (match[1]) {
                            doc = (context ? context.ownerDocument || context : document);
                            ret = rsingleTag.exec(selector);
                            if (ret) {
                                if (jQuery.isPlainObject(context)) {
                                    selector = [document.createElement(ret[1])];
                                    jQuery.fn.attr.call(selector, context, true);
                                } else {
                                    selector = [doc.createElement(ret[1])];
                                }
                            } else {
                                ret = jQuery.buildFragment([match[1]], [doc]);
                                selector = (ret.cacheable ? ret.fragment.cloneNode(true) : ret.fragment).childNodes;
                            }
                            return jQuery.merge(this, selector);
                        } else {
                            elem = document.getElementById(match[2]);
                            if (elem && elem.parentNode) {
                                if (elem.id !== match[2]) {
                                    return rootjQuery.find(selector);
                                }
                                this.length = 1;
                                this[0] = elem;
                            }
                            this.context = document;
                            this.selector = selector;
                            return this;
                        }
                    } else {
                        if (!context && !rnonword.test(selector)) {
                            this.selector = selector;
                            this.context = document;
                            selector = document.getElementsByTagName(selector);
                            return jQuery.merge(this, selector);
                        } else {
                            if (!context || context.jquery) {
                                return (context || rootjQuery).find(selector);
                            } else {
                                return jQuery(context).find(selector);
                            }
                        }
                    }
                } else {
                    if (jQuery.isFunction(selector)) {
                        return rootjQuery.ready(selector);
                    }
                }
                if (selector.selector !== undefined) {
                    this.selector = selector.selector;
                    this.context = selector.context;
                }
                return jQuery.makeArray(selector, this);
            },
            selector: "",
            jquery: "1.4.4",
            length: 0,
            size: function () {
                return this.length;
            },
            toArray: function () {
                return slice.call(this, 0);
            },
            get: function (num) {
                return num == null ? this.toArray() : (num < 0 ? this.slice(num)[0] : this[num]);
            },
            pushStack: function (elems, name, selector) {
                var ret = jQuery();
                if (jQuery.isArray(elems)) {
                    push.apply(ret, elems);
                } else {
                    jQuery.merge(ret, elems);
                }
                ret.prevObject = this;
                ret.context = this.context;
                if (name === "find") {
                    ret.selector = this.selector + (this.selector ? " " : "") + selector;
                } else {
                    if (name) {
                        ret.selector = this.selector + "." + name + "(" + selector + ")";
                    }
                }
                return ret;
            },
            each: function (callback, args) {
                return jQuery.each(this, callback, args);
            },
            ready: function (fn) {
                jQuery.bindReady();
                if (jQuery.isReady) {
                    fn.call(document, jQuery);
                } else {
                    if (readyList) {
                        readyList.push(fn);
                    }
                }
                return this;
            },
            eq: function (i) {
                return i === -1 ? this.slice(i) : this.slice(i, +i + 1);
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            slice: function () {
                return this.pushStack(slice.apply(this, arguments), "slice", slice.call(arguments).join(","));
            },
            map: function (callback) {
                return this.pushStack(jQuery.map(this, function (elem, i) {
                    return callback.call(elem, i, elem);
                }));
            },
            end: function () {
                return this.prevObject || jQuery(null);
            },
            push: push,
            sort: [].sort,
            splice: [].splice
        };
        jQuery.fn.init.prototype = jQuery.fn;
        jQuery.extend = jQuery.fn.extend = function () {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2;
            }
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {};
            }
            if (length === i) {
                target = this;
                --i;
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && jQuery.isArray(src) ? src : [];
                            } else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }
                            target[name] = jQuery.extend(deep, clone, copy);
                        } else {
                            if (copy !== undefined) {
                                target[name] = copy;
                            }
                        }
                    }
                }
            }
            return target;
        };
        jQuery.extend({
            noConflict: function (deep) {
                window.$ = _$;
                if (deep) {
                    window.jQuery = _jQuery;
                }
                return jQuery;
            },
            isReady: false,
            readyWait: 1,
            ready: function (wait) {
                if (wait === true) {
                    jQuery.readyWait--;
                }
                if (!jQuery.readyWait || (wait !== true && !jQuery.isReady)) {
                    if (!document.body) {
                        return setTimeout(jQuery.ready, 1);
                    }
                    jQuery.isReady = true;
                    if (wait !== true && --jQuery.readyWait > 0) {
                        return;
                    }
                    if (readyList) {
                        var fn, i = 0,
                            ready = readyList;
                        readyList = null;
                        while ((fn = ready[i++])) {
                            fn.call(document, jQuery);
                        }
                        if (jQuery.fn.trigger) {
                            jQuery(document).trigger("ready").unbind("ready");
                        }
                    }
                }
            },
            bindReady: function () {
                if (readyBound) {
                    return;
                }
                readyBound = true;
                if (document.readyState === "complete") {
                    return setTimeout(jQuery.ready, 1);
                }
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                    window.addEventListener("load", jQuery.ready, false);
                } else {
                    if (document.attachEvent) {
                        document.attachEvent("onreadystatechange", DOMContentLoaded);
                        window.attachEvent("onload", jQuery.ready);
                        var toplevel = false;
                        try {
                            toplevel = window.frameElement == null;
                        } catch (e) {}
                        if (document.documentElement.doScroll && toplevel) {
                            doScrollCheck();
                        }
                    }
                }
            },
            isFunction: function (obj) {
                return jQuery.type(obj) === "function";
            },
            isArray: Array.isArray || function (obj) {
                return jQuery.type(obj) === "array";
            },
            isWindow: function (obj) {
                return obj && typeof obj === "object" && "setInterval" in obj;
            },
            isNaN: function (obj) {
                return obj == null || !rdigit.test(obj) || isNaN(obj);
            },
            type: function (obj) {
                return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
            },
            isPlainObject: function (obj) {
                if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                    return false;
                }
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
                var key;
                for (key in obj) {}
                return key === undefined || hasOwn.call(obj, key);
            },
            isEmptyObject: function (obj) {
                for (var name in obj) {
                    return false;
                }
                return true;
            },
            error: function (msg) {
                throw msg;
            },
            parseJSON: function (data) {
                if (typeof data !== "string" || !data) {
                    return null;
                }
                data = jQuery.trim(data);
                if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                    return window.JSON && window.JSON.parse ? window.JSON.parse(data) : (new Function("return " + data))();
                } else {
                    jQuery.error("Invalid JSON: " + data);
                }
            },
            noop: function () {},
            globalEval: function (data) {
                if (data && rnotwhite.test(data)) {
                    var head = document.getElementsByTagName("head")[0] || document.documentElement,
                        script = document.createElement("script");
                    script.type = "text/javascript";
                    if (jQuery.support.scriptEval) {
                        script.appendChild(document.createTextNode(data));
                    } else {
                        script.text = data;
                    }
                    head.insertBefore(script, head.firstChild);
                    head.removeChild(script);
                }
            },
            nodeName: function (elem, name) {
                return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
            },
            each: function (object, callback, args) {
                var name, i = 0,
                    length = object.length,
                    isObj = length === undefined || jQuery.isFunction(object);
                if (args) {
                    if (isObj) {
                        for (name in object) {
                            if (callback.apply(object[name], args) === false) {
                                break;
                            }
                        }
                    } else {
                        for (; i < length;) {
                            if (callback.apply(object[i++], args) === false) {
                                break;
                            }
                        }
                    }
                } else {
                    if (isObj) {
                        for (name in object) {
                            if (callback.call(object[name], name, object[name]) === false) {
                                break;
                            }
                        }
                    } else {
                        for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
                    }
                }
                return object;
            },
            trim: trim ? function (text) {
                return text == null ? "" : trim.call(text);
            } : function (text) {
                return text == null ? "" : text.toString().replace(trimLeft, "").replace(trimRight, "");
            },
            makeArray: function (array, results) {
                var ret = results || [];
                if (array != null) {
                    var type = jQuery.type(array);
                    if (array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(array)) {
                        push.call(ret, array);
                    } else {
                        jQuery.merge(ret, array);
                    }
                }
                return ret;
            },
            inArray: function (elem, array) {
                if (array.indexOf) {
                    return array.indexOf(elem);
                }
                for (var i = 0, length = array.length; i < length; i++) {
                    if (array[i] === elem) {
                        return i;
                    }
                }
                return -1;
            },
            merge: function (first, second) {
                var i = first.length,
                    j = 0;
                if (typeof second.length === "number") {
                    for (var l = second.length; j < l; j++) {
                        first[i++] = second[j];
                    }
                } else {
                    while (second[j] !== undefined) {
                        first[i++] = second[j++];
                    }
                }
                first.length = i;
                return first;
            },
            grep: function (elems, callback, inv) {
                var ret = [],
                    retVal;
                inv = !!inv;
                for (var i = 0, length = elems.length; i < length; i++) {
                    retVal = !!callback(elems[i], i);
                    if (inv !== retVal) {
                        ret.push(elems[i]);
                    }
                }
                return ret;
            },
            map: function (elems, callback, arg) {
                var ret = [],
                    value;
                for (var i = 0, length = elems.length; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret[ret.length] = value;
                    }
                }
                return ret.concat.apply([], ret);
            },
            guid: 1,
            proxy: function (fn, proxy, thisObject) {
                if (arguments.length === 2) {
                    if (typeof proxy === "string") {
                        thisObject = fn;
                        fn = thisObject[proxy];
                        proxy = undefined;
                    } else {
                        if (proxy && !jQuery.isFunction(proxy)) {
                            thisObject = proxy;
                            proxy = undefined;
                        }
                    }
                }
                if (!proxy && fn) {
                    proxy = function () {
                        return fn.apply(thisObject || this, arguments);
                    };
                }
                if (fn) {
                    proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
                }
                return proxy;
            },
            access: function (elems, key, value, exec, fn, pass) {
                var length = elems.length;
                if (typeof key === "object") {
                    for (var k in key) {
                        jQuery.access(elems, k, key[k], exec, fn, value);
                    }
                    return elems;
                }
                if (value !== undefined) {
                    exec = !pass && exec && jQuery.isFunction(value);
                    for (var i = 0; i < length; i++) {
                        fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
                    }
                    return elems;
                }
                return length ? fn(elems[0], key) : undefined;
            },
            now: function () {
                return (new Date()).getTime();
            },
            uaMatch: function (ua) {
                ua = ua.toLowerCase();
                var match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                };
            },
            browser: {}
        });
        jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });
        browserMatch = jQuery.uaMatch(userAgent);
        if (browserMatch.browser) {
            jQuery.browser[browserMatch.browser] = true;
            jQuery.browser.version = browserMatch.version;
        }
        if (jQuery.browser.webkit) {
            jQuery.browser.safari = true;
        }
        if (indexOf) {
            jQuery.inArray = function (elem, array) {
                return indexOf.call(array, elem);
            };
        }
        if (!rwhite.test("\xA0")) {
            trimLeft = /^[\s\xA0]+/;
            trimRight = /[\s\xA0]+$/;
        }
        rootjQuery = jQuery(document);
        if (document.addEventListener) {
            DOMContentLoaded = function () {
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                jQuery.ready();
            };
        } else {
            if (document.attachEvent) {
                DOMContentLoaded = function () {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", DOMContentLoaded);
                        jQuery.ready();
                    }
                };
            }
        }

        function doScrollCheck() {
            if (jQuery.isReady) {
                return;
            }
            try {
                document.documentElement.doScroll("left");
            } catch (e) {
                setTimeout(doScrollCheck, 1);
                return;
            }
            jQuery.ready();
        }
        return (window.jQuery = window.$ = jQuery);
    })();
    (function () {
        jQuery.support = {};
        var root = document.documentElement,
            script = document.createElement("script"),
            div = document.createElement("div"),
            id = "script" + jQuery.now();
        div.style.display = "none";
        div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var all = div.getElementsByTagName("*"),
            a = div.getElementsByTagName("a")[0],
            select = document.createElement("select"),
            opt = select.appendChild(document.createElement("option"));
        if (!all || !all.length || !a) {
            return;
        }
        jQuery.support = {
            leadingWhitespace: div.firstChild.nodeType === 3,
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !!div.getElementsByTagName("link").length,
            style: /red/.test(a.getAttribute("style")),
            hrefNormalized: a.getAttribute("href") === "/a",
            opacity: /^0.55$/.test(a.style.opacity),
            cssFloat: !!a.style.cssFloat,
            checkOn: div.getElementsByTagName("input")[0].value === "on",
            optSelected: opt.selected,
            deleteExpando: true,
            optDisabled: false,
            checkClone: false,
            scriptEval: false,
            noCloneEvent: true,
            boxModel: null,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableHiddenOffsets: true
        };
        select.disabled = true;
        jQuery.support.optDisabled = !opt.disabled;
        script.type = "text/javascript";
        try {
            script.appendChild(document.createTextNode("window." + id + "=1;"));
        } catch (e) {}
        root.insertBefore(script, root.firstChild);
        if (window[id]) {
            jQuery.support.scriptEval = true;
            delete window[id];
        }
        try {
            delete script.test;
        } catch (e) {
            jQuery.support.deleteExpando = false;
        }
        root.removeChild(script);
        if (div.attachEvent && div.fireEvent) {
            div.attachEvent("onclick", function click() {
                jQuery.support.noCloneEvent = false;
                div.detachEvent("onclick", click);
            });
            div.cloneNode(true).fireEvent("onclick");
        }
        div = document.createElement("div");
        div.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
        var fragment = document.createDocumentFragment();
        fragment.appendChild(div.firstChild);
        jQuery.support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        jQuery(function () {
            var div = document.createElement("div");
            div.style.width = div.style.paddingLeft = "1px";
            document.body.appendChild(div);
            jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;
            if ("zoom" in div.style) {
                div.style.display = "inline";
                div.style.zoom = 1;
                jQuery.support.inlineBlockNeedsLayout = div.offsetWidth === 2;
                div.style.display = "";
                div.innerHTML = "<div style='width:4px;'></div>";
                jQuery.support.shrinkWrapBlocks = div.offsetWidth !== 2;
            }
            div.innerHTML = "<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
            var tds = div.getElementsByTagName("td");
            jQuery.support.reliableHiddenOffsets = tds[0].offsetHeight === 0;
            tds[0].style.display = "";
            tds[1].style.display = "none";
            jQuery.support.reliableHiddenOffsets = jQuery.support.reliableHiddenOffsets && tds[0].offsetHeight === 0;
            div.innerHTML = "";
            document.body.removeChild(div).style.display = "none";
            div = tds = null;
        });
        var eventSupported = function (eventName) {
            var el = document.createElement("div");
            eventName = "on" + eventName;
            var isSupported = (eventName in el);
            if (!isSupported) {
                el.setAttribute(eventName, "return;");
                isSupported = typeof el[eventName] === "function";
            }
            el = null;
            return isSupported;
        };
        jQuery.support.submitBubbles = eventSupported("submit");
        jQuery.support.changeBubbles = eventSupported("change");
        root = script = div = all = a = null;
    })();
    var windowData = {},
        rbrace = /^(?:\{.*\}|\[.*\])$/;
    jQuery.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + jQuery.now(),
        noData: {
            "embed": true,
            "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            "applet": true
        },
        data: function (elem, name, data) {
            if (!jQuery.acceptData(elem)) {
                return;
            }
            elem = elem == window ? windowData : elem;
            var isNode = elem.nodeType,
                id = isNode ? elem[jQuery.expando] : null,
                cache = jQuery.cache,
                thisCache;
            if (isNode && !id && typeof name === "string" && data === undefined) {
                return;
            }
            if (!isNode) {
                cache = elem;
            } else {
                if (!id) {
                    elem[jQuery.expando] = id = ++jQuery.uuid;
                }
            }
            if (typeof name === "object") {
                if (isNode) {
                    cache[id] = jQuery.extend(cache[id], name);
                } else {
                    jQuery.extend(cache, name);
                }
            } else {
                if (isNode && !cache[id]) {
                    cache[id] = {};
                }
            }
            thisCache = isNode ? cache[id] : cache;
            if (data !== undefined) {
                thisCache[name] = data;
            }
            return typeof name === "string" ? thisCache[name] : thisCache;
        },
        removeData: function (elem, name) {
            if (!jQuery.acceptData(elem)) {
                return;
            }
            elem = elem == window ? windowData : elem;
            var isNode = elem.nodeType,
                id = isNode ? elem[jQuery.expando] : elem,
                cache = jQuery.cache,
                thisCache = isNode ? cache[id] : id;
            if (name) {
                if (thisCache) {
                    delete thisCache[name];
                    if (isNode && jQuery.isEmptyObject(thisCache)) {
                        jQuery.removeData(elem);
                    }
                }
            } else {
                if (isNode && jQuery.support.deleteExpando) {
                    delete elem[jQuery.expando];
                } else {
                    if (elem.removeAttribute) {
                        elem.removeAttribute(jQuery.expando);
                    } else {
                        if (isNode) {
                            delete cache[id];
                        } else {
                            for (var n in elem) {
                                delete elem[n];
                            }
                        }
                    }
                }
            }
        },
        acceptData: function (elem) {
            if (elem.nodeName) {
                var match = jQuery.noData[elem.nodeName.toLowerCase()];
                if (match) {
                    return !(match === true || elem.getAttribute("classid") !== match);
                }
            }
            return true;
        }
    });
    jQuery.fn.extend({
        data: function (key, value) {
            var data = null;
            if (typeof key === "undefined") {
                if (this.length) {
                    var attr = this[0].attributes,
                        name;
                    data = jQuery.data(this[0]);
                    for (var i = 0, l = attr.length; i < l; i++) {
                        name = attr[i].name;
                        if (name.indexOf("data-") === 0) {
                            name = name.substr(5);
                            dataAttr(this[0], name, data[name]);
                        }
                    }
                }
                return data;
            } else {
                if (typeof key === "object") {
                    return this.each(function () {
                        jQuery.data(this, key);
                    });
                }
            }
            var parts = key.split(".");
            parts[1] = parts[1] ? "." + parts[1] : "";
            if (value === undefined) {
                data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);
                if (data === undefined && this.length) {
                    data = jQuery.data(this[0], key);
                    data = dataAttr(this[0], key, data);
                }
                return data === undefined && parts[1] ? this.data(parts[0]) : data;
            } else {
                return this.each(function () {
                    var $this = jQuery(this),
                        args = [parts[0], value];
                    $this.triggerHandler("setData" + parts[1] + "!", args);
                    jQuery.data(this, key, value);
                    $this.triggerHandler("changeData" + parts[1] + "!", args);
                });
            }
        },
        removeData: function (key) {
            return this.each(function () {
                jQuery.removeData(this, key);
            });
        }
    });

    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            data = elem.getAttribute("data-" + key);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : !jQuery.isNaN(data) ? parseFloat(data) : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                jQuery.data(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }
    jQuery.extend({
        queue: function (elem, type, data) {
            if (!elem) {
                return;
            }
            type = (type || "fx") + "queue";
            var q = jQuery.data(elem, type);
            if (!data) {
                return q || [];
            }
            if (!q || jQuery.isArray(data)) {
                q = jQuery.data(elem, type, jQuery.makeArray(data));
            } else {
                q.push(data);
            }
            return q;
        },
        dequeue: function (elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                fn = queue.shift();
            if (fn === "inprogress") {
                fn = queue.shift();
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                fn.call(elem, function () {
                    jQuery.dequeue(elem, type);
                });
            }
        }
    });
    jQuery.fn.extend({
        queue: function (type, data) {
            if (typeof type !== "string") {
                data = type;
                type = "fx";
            }
            if (data === undefined) {
                return jQuery.queue(this[0], type);
            }
            return this.each(function (i) {
                var queue = jQuery.queue(this, type, data);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        },
        delay: function (time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function () {
                var elem = this;
                setTimeout(function () {
                    jQuery.dequeue(elem, type);
                }, time);
            });
        },
        clearQueue: function (type) {
            return this.queue(type || "fx", []);
        }
    });
    var rclass = /[\n\t]/g,
        rspaces = /\s+/,
        rreturn = /\r/g,
        rspecialurl = /^(?:href|src|style)$/,
        rtype = /^(?:button|input)$/i,
        rfocusable = /^(?:button|input|object|select|textarea)$/i,
        rclickable = /^a(?:rea)?$/i,
        rradiocheck = /^(?:radio|checkbox)$/i;
    jQuery.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    jQuery.fn.extend({
        attr: function (name, value) {
            return jQuery.access(this, name, value, true, jQuery.attr);
        },
        removeAttr: function (name, fn) {
            return this.each(function () {
                jQuery.attr(this, name, "");
                if (this.nodeType === 1) {
                    this.removeAttribute(name);
                }
            });
        },
        addClass: function (value) {
            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    self.addClass(value.call(this, i, self.attr("class")));
                });
            }
            if (value && typeof value === "string") {
                var classNames = (value || "").split(rspaces);
                for (var i = 0, l = this.length; i < l; i++) {
                    var elem = this[i];
                    if (elem.nodeType === 1) {
                        if (!elem.className) {
                            elem.className = value;
                        } else {
                            var className = " " + elem.className + " ",
                                setClass = elem.className;
                            for (var c = 0, cl = classNames.length; c < cl; c++) {
                                if (className.indexOf(" " + classNames[c] + " ") < 0) {
                                    setClass += " " + classNames[c];
                                }
                            }
                            elem.className = jQuery.trim(setClass);
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function (value) {
            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    self.removeClass(value.call(this, i, self.attr("class")));
                });
            }
            if ((value && typeof value === "string") || value === undefined) {
                var classNames = (value || "").split(rspaces);
                for (var i = 0, l = this.length; i < l; i++) {
                    var elem = this[i];
                    if (elem.nodeType === 1 && elem.className) {
                        if (value) {
                            var className = (" " + elem.className + " ").replace(rclass, " ");
                            for (var c = 0, cl = classNames.length; c < cl; c++) {
                                className = className.replace(" " + classNames[c] + " ", " ");
                            }
                            elem.className = jQuery.trim(className);
                        } else {
                            elem.className = "";
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function (value, stateVal) {
            var type = typeof value,
                isBool = typeof stateVal === "boolean";
            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    self.toggleClass(value.call(this, i, self.attr("class"), stateVal), stateVal);
                });
            }
            return this.each(function () {
                if (type === "string") {
                    var className, i = 0,
                        self = jQuery(this),
                        state = stateVal,
                        classNames = value.split(rspaces);
                    while ((className = classNames[i++])) {
                        state = isBool ? state : !self.hasClass(className);
                        self[state ? "addClass" : "removeClass"](className);
                    }
                } else {
                    if (type === "undefined" || type === "boolean") {
                        if (this.className) {
                            jQuery.data(this, "__className__", this.className);
                        }
                        this.className = this.className || value === false ? "" : jQuery.data(this, "__className__") || "";
                    }
                }
            });
        },
        hasClass: function (selector) {
            var className = " " + selector + " ";
            for (var i = 0, l = this.length; i < l; i++) {
                if ((" " + this[i].className + " ").replace(rclass, " ").indexOf(className) > -1) {
                    return true;
                }
            }
            return false;
        },
        val: function (value) {
            if (!arguments.length) {
                var elem = this[0];
                if (elem) {
                    if (jQuery.nodeName(elem, "option")) {
                        var val = elem.attributes.value;
                        return !val || val.specified ? elem.value : elem.text;
                    }
                    if (jQuery.nodeName(elem, "select")) {
                        var index = elem.selectedIndex,
                            values = [],
                            options = elem.options,
                            one = elem.type === "select-one";
                        if (index < 0) {
                            return null;
                        }
                        for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) {
                            var option = options[i];
                            if (option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                                value = jQuery(option).val();
                                if (one) {
                                    return value;
                                }
                                values.push(value);
                            }
                        }
                        return values;
                    }
                    if (rradiocheck.test(elem.type) && !jQuery.support.checkOn) {
                        return elem.getAttribute("value") === null ? "on" : elem.value;
                    }
                    return (elem.value || "").replace(rreturn, "");
                }
                return undefined;
            }
            var isFunction = jQuery.isFunction(value);
            return this.each(function (i) {
                var self = jQuery(this),
                    val = value;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, self.val());
                }
                if (val == null) {
                    val = "";
                } else {
                    if (typeof val === "number") {
                        val += "";
                    } else {
                        if (jQuery.isArray(val)) {
                            val = jQuery.map(val, function (value) {
                                return value == null ? "" : value + "";
                            });
                        }
                    }
                }
                if (jQuery.isArray(val) && rradiocheck.test(this.type)) {
                    this.checked = jQuery.inArray(self.val(), val) >= 0;
                } else {
                    if (jQuery.nodeName(this, "select")) {
                        var values = jQuery.makeArray(val);
                        jQuery("option", this).each(function () {
                            this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
                        });
                        if (!values.length) {
                            this.selectedIndex = -1;
                        }
                    } else {
                        this.value = val;
                    }
                }
            });
        }
    });
    jQuery.extend({
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        attr: function (elem, name, value, pass) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8) {
                return undefined;
            }
            if (pass && name in jQuery.attrFn) {
                return jQuery(elem)[name](value);
            }
            var notxml = elem.nodeType !== 1 || !jQuery.isXMLDoc(elem),
                set = value !== undefined;
            name = notxml && jQuery.props[name] || name;
            var special = rspecialurl.test(name);
            if (name === "selected" && !jQuery.support.optSelected) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
            }
            if ((name in elem || elem[name] !== undefined) && notxml && !special) {
                if (set) {
                    if (name === "type" && rtype.test(elem.nodeName) && elem.parentNode) {
                        jQuery.error("type property can't be changed");
                    }
                    if (value === null) {
                        if (elem.nodeType === 1) {
                            elem.removeAttribute(name);
                        }
                    } else {
                        elem[name] = value;
                    }
                }
                if (jQuery.nodeName(elem, "form") && elem.getAttributeNode(name)) {
                    return elem.getAttributeNode(name).nodeValue;
                }
                if (name === "tabIndex") {
                    var attributeNode = elem.getAttributeNode("tabIndex");
                    return attributeNode && attributeNode.specified ? attributeNode.value : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
                }
                return elem[name];
            }
            if (!jQuery.support.style && notxml && name === "style") {
                if (set) {
                    elem.style.cssText = "" + value;
                }
                return elem.style.cssText;
            }
            if (set) {
                elem.setAttribute(name, "" + value);
            }
            if (!elem.attributes[name] && (elem.hasAttribute && !elem.hasAttribute(name))) {
                return undefined;
            }
            var attr = !jQuery.support.hrefNormalized && notxml && special ? elem.getAttribute(name, 2) : elem.getAttribute(name);
            return attr === null ? undefined : attr;
        }
    });
    var rnamespaces = /\.(.*)$/,
        rformElems = /^(?:textarea|input|select)$/i,
        rperiod = /\./g,
        rspace = / /g,
        rescape = /[^\w\s.|`]/g,
        fcleanup = function (nm) {
            return nm.replace(rescape, "\\$&");
        },
        focusCounts = {
            focusin: 0,
            focusout: 0
        };
    jQuery.event = {
        add: function (elem, types, handler, data) {
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (jQuery.isWindow(elem) && (elem !== window && !elem.frameElement)) {
                elem = window;
            }
            if (handler === false) {
                handler = returnFalse;
            } else {
                if (!handler) {
                    return;
                }
            }
            var handleObjIn, handleObj;
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            var elemData = jQuery.data(elem);
            if (!elemData) {
                return;
            }
            var eventKey = elem.nodeType ? "events" : "__events__",
                events = elemData[eventKey],
                eventHandle = elemData.handle;
            if (typeof events === "function") {
                eventHandle = events.handle;
                events = events.events;
            } else {
                if (!events) {
                    if (!elem.nodeType) {
                        elemData[eventKey] = elemData = function () {};
                    }
                    elemData.events = events = {};
                }
            }
            if (!eventHandle) {
                elemData.handle = eventHandle = function () {
                    return typeof jQuery !== "undefined" && !jQuery.event.triggered ? jQuery.event.handle.apply(eventHandle.elem, arguments) : undefined;
                };
            }
            eventHandle.elem = elem;
            types = types.split(" ");
            var type, i = 0,
                namespaces;
            while ((type = types[i++])) {
                handleObj = handleObjIn ? jQuery.extend({}, handleObjIn) : {
                    handler: handler,
                    data: data
                };
                if (type.indexOf(".") > -1) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    handleObj.namespace = namespaces.slice(0).sort().join(".");
                } else {
                    namespaces = [];
                    handleObj.namespace = "";
                }
                handleObj.type = type;
                if (!handleObj.guid) {
                    handleObj.guid = handler.guid;
                }
                var handlers = events[type],
                    special = jQuery.event.special[type] || {};
                if (!handlers) {
                    handlers = events[type] = [];
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        } else {
                            if (elem.attachEvent) {
                                elem.attachEvent("on" + type, eventHandle);
                            }
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                handlers.push(handleObj);
                jQuery.event.global[type] = true;
            }
            elem = null;
        },
        global: {},
        remove: function (elem, types, handler, pos) {
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (handler === false) {
                handler = returnFalse;
            }
            var ret, type, fn, j, i = 0,
                all, namespaces, namespace, special, eventType, handleObj, origType, eventKey = elem.nodeType ? "events" : "__events__",
                elemData = jQuery.data(elem),
                events = elemData && elemData[eventKey];
            if (!elemData || !events) {
                return;
            }
            if (typeof events === "function") {
                elemData = events;
                events = events.events;
            }
            if (types && types.type) {
                handler = types.handler;
                types = types.type;
            }
            if (!types || typeof types === "string" && types.charAt(0) === ".") {
                types = types || "";
                for (type in events) {
                    jQuery.event.remove(elem, type + types);
                }
                return;
            }
            types = types.split(" ");
            while ((type = types[i++])) {
                origType = type;
                handleObj = null;
                all = type.indexOf(".") < 0;
                namespaces = [];
                if (!all) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespace = new RegExp("(^|\\.)" + jQuery.map(namespaces.slice(0).sort(), fcleanup).join("\\.(?:.*\\.)?") + "(\\.|$)");
                }
                eventType = events[type];
                if (!eventType) {
                    continue;
                }
                if (!handler) {
                    for (j = 0; j < eventType.length; j++) {
                        handleObj = eventType[j];
                        if (all || namespace.test(handleObj.namespace)) {
                            jQuery.event.remove(elem, origType, handleObj.handler, j);
                            eventType.splice(j--, 1);
                        }
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                for (j = pos || 0; j < eventType.length; j++) {
                    handleObj = eventType[j];
                    if (handler.guid === handleObj.guid) {
                        if (all || namespace.test(handleObj.namespace)) {
                            if (pos == null) {
                                eventType.splice(j--, 1);
                            }
                            if (special.remove) {
                                special.remove.call(elem, handleObj);
                            }
                        }
                        if (pos != null) {
                            break;
                        }
                    }
                }
                if (eventType.length === 0 || pos != null && eventType.length === 1) {
                    if (!special.teardown || special.teardown.call(elem, namespaces) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    ret = null;
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                var handle = elemData.handle;
                if (handle) {
                    handle.elem = null;
                }
                delete elemData.events;
                delete elemData.handle;
                if (typeof elemData === "function") {
                    jQuery.removeData(elem, eventKey);
                } else {
                    if (jQuery.isEmptyObject(elemData)) {
                        jQuery.removeData(elem);
                    }
                }
            }
        },
        trigger: function (event, data, elem) {
            var type = event.type || event,
                bubbling = arguments[3];
            if (!bubbling) {
                event = typeof event === "object" ? event[jQuery.expando] ? event : jQuery.extend(jQuery.Event(type), event) : jQuery.Event(type);
                if (type.indexOf("!") >= 0) {
                    event.type = type = type.slice(0, -1);
                    event.exclusive = true;
                }
                if (!elem) {
                    event.stopPropagation();
                    if (jQuery.event.global[type]) {
                        jQuery.each(jQuery.cache, function () {
                            if (this.events && this.events[type]) {
                                jQuery.event.trigger(event, data, this.handle.elem);
                            }
                        });
                    }
                }
                if (!elem || elem.nodeType === 3 || elem.nodeType === 8) {
                    return undefined;
                }
                event.result = undefined;
                event.target = elem;
                data = jQuery.makeArray(data);
                data.unshift(event);
            }
            event.currentTarget = elem;
            var handle = elem.nodeType ? jQuery.data(elem, "handle") : (jQuery.data(elem, "__events__") || {}).handle;
            if (handle) {
                handle.apply(elem, data);
            }
            var parent = elem.parentNode || elem.ownerDocument;
            try {
                if (!(elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()])) {
                    if (elem["on" + type] && elem["on" + type].apply(elem, data) === false) {
                        event.result = false;
                        event.preventDefault();
                    }
                }
            } catch (inlineError) {}
            if (!event.isPropagationStopped() && parent) {
                jQuery.event.trigger(event, data, parent, true);
            } else {
                if (!event.isDefaultPrevented()) {
                    var old, target = event.target,
                        targetType = type.replace(rnamespaces, ""),
                        isClick = jQuery.nodeName(target, "a") && targetType === "click",
                        special = jQuery.event.special[targetType] || {};
                    if ((!special._default || special._default.call(elem, event) === false) && !isClick && !(target && target.nodeName && jQuery.noData[target.nodeName.toLowerCase()])) {
                        try {
                            if (target[targetType]) {
                                old = target["on" + targetType];
                                if (old) {
                                    target["on" + targetType] = null;
                                }
                                jQuery.event.triggered = true;
                                target[targetType]();
                            }
                        } catch (triggerError) {}
                        if (old) {
                            target["on" + targetType] = old;
                        }
                        jQuery.event.triggered = false;
                    }
                }
            }
        },
        handle: function (event) {
            var all, handlers, namespaces, namespace_re, events, namespace_sort = [],
                args = jQuery.makeArray(arguments);
            event = args[0] = jQuery.event.fix(event || window.event);
            event.currentTarget = this;
            all = event.type.indexOf(".") < 0 && !event.exclusive;
            if (!all) {
                namespaces = event.type.split(".");
                event.type = namespaces.shift();
                namespace_sort = namespaces.slice(0).sort();
                namespace_re = new RegExp("(^|\\.)" + namespace_sort.join("\\.(?:.*\\.)?") + "(\\.|$)");
            }
            event.namespace = event.namespace || namespace_sort.join(".");
            events = jQuery.data(this, this.nodeType ? "events" : "__events__");
            if (typeof events === "function") {
                events = events.events;
            }
            handlers = (events || {})[event.type];
            if (events && handlers) {
                handlers = handlers.slice(0);
                for (var j = 0, l = handlers.length; j < l; j++) {
                    var handleObj = handlers[j];
                    if (all || namespace_re.test(handleObj.namespace)) {
                        event.handler = handleObj.handler;
                        event.data = handleObj.data;
                        event.handleObj = handleObj;
                        var ret = handleObj.handler.apply(this, args);
                        if (ret !== undefined) {
                            event.result = ret;
                            if (ret === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                        if (event.isImmediatePropagationStopped()) {
                            break;
                        }
                    }
                }
            }
            return event.result;
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function (event) {
            if (event[jQuery.expando]) {
                return event;
            }
            var originalEvent = event;
            event = jQuery.Event(originalEvent);
            for (var i = this.props.length, prop; i;) {
                prop = this.props[--i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = event.srcElement || document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            if (!event.relatedTarget && event.fromElement) {
                event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
            }
            if (event.pageX == null && event.clientX != null) {
                var doc = document.documentElement,
                    body = document.body;
                event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
            }
            if (event.which == null && (event.charCode != null || event.keyCode != null)) {
                event.which = event.charCode != null ? event.charCode : event.keyCode;
            }
            if (!event.metaKey && event.ctrlKey) {
                event.metaKey = event.ctrlKey;
            }
            if (!event.which && event.button !== undefined) {
                event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
            }
            return event;
        },
        guid: 100000000,
        proxy: jQuery.proxy,
        special: {
            ready: {
                setup: jQuery.bindReady,
                teardown: jQuery.noop
            },
            live: {
                add: function (handleObj) {
                    jQuery.event.add(this, liveConvert(handleObj.origType, handleObj.selector), jQuery.extend({}, handleObj, {
                        handler: liveHandler,
                        guid: handleObj.handler.guid
                    }));
                },
                remove: function (handleObj) {
                    jQuery.event.remove(this, liveConvert(handleObj.origType, handleObj.selector), handleObj);
                }
            },
            beforeunload: {
                setup: function (data, namespaces, eventHandle) {
                    if (jQuery.isWindow(this)) {
                        this.onbeforeunload = eventHandle;
                    }
                },
                teardown: function (namespaces, eventHandle) {
                    if (this.onbeforeunload === eventHandle) {
                        this.onbeforeunload = null;
                    }
                }
            }
        }
    };
    jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    } : function (elem, type, handle) {
        if (elem.detachEvent) {
            elem.detachEvent("on" + type, handle);
        }
    };
    jQuery.Event = function (src) {
        if (!this.preventDefault) {
            return new jQuery.Event(src);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
        } else {
            this.type = src;
        }
        this.timeStamp = jQuery.now();
        this[jQuery.expando] = true;
    };

    function returnFalse() {
        return false;
    }

    function returnTrue() {
        return true;
    }
    jQuery.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function () {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    };
    var withinElement = function (event) {
            var parent = event.relatedTarget;
            try {
                while (parent && parent !== this) {
                    parent = parent.parentNode;
                }
                if (parent !== this) {
                    event.type = event.data;
                    jQuery.event.handle.apply(this, arguments);
                }
            } catch (e) {}
        },
        delegate = function (event) {
            event.type = event.data;
            jQuery.event.handle.apply(this, arguments);
        };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (orig, fix) {
        jQuery.event.special[orig] = {
            setup: function (data) {
                jQuery.event.add(this, fix, data && data.selector ? delegate : withinElement, orig);
            },
            teardown: function (data) {
                jQuery.event.remove(this, fix, data && data.selector ? delegate : withinElement);
            }
        };
    });
    if (!jQuery.support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function (data, namespaces) {
                if (this.nodeName.toLowerCase() !== "form") {
                    jQuery.event.add(this, "click.specialSubmit", function (e) {
                        var elem = e.target,
                            type = elem.type;
                        if ((type === "submit" || type === "image") && jQuery(elem).closest("form").length) {
                            e.liveFired = undefined;
                            return trigger("submit", this, arguments);
                        }
                    });
                    jQuery.event.add(this, "keypress.specialSubmit", function (e) {
                        var elem = e.target,
                            type = elem.type;
                        if ((type === "text" || type === "password") && jQuery(elem).closest("form").length && e.keyCode === 13) {
                            e.liveFired = undefined;
                            return trigger("submit", this, arguments);
                        }
                    });
                } else {
                    return false;
                }
            },
            teardown: function (namespaces) {
                jQuery.event.remove(this, ".specialSubmit");
            }
        };
    }
    if (!jQuery.support.changeBubbles) {
        var changeFilters, getVal = function (elem) {
                var type = elem.type,
                    val = elem.value;
                if (type === "radio" || type === "checkbox") {
                    val = elem.checked;
                } else {
                    if (type === "select-multiple") {
                        val = elem.selectedIndex > -1 ? jQuery.map(elem.options, function (elem) {
                            return elem.selected;
                        }).join("-") : "";
                    } else {
                        if (elem.nodeName.toLowerCase() === "select") {
                            val = elem.selectedIndex;
                        }
                    }
                }
                return val;
            },
            testChange = function testChange(e) {
                var elem = e.target,
                    data, val;
                if (!rformElems.test(elem.nodeName) || elem.readOnly) {
                    return;
                }
                data = jQuery.data(elem, "_change_data");
                val = getVal(elem);
                if (e.type !== "focusout" || elem.type !== "radio") {
                    jQuery.data(elem, "_change_data", val);
                }
                if (data === undefined || val === data) {
                    return;
                }
                if (data != null || val) {
                    e.type = "change";
                    e.liveFired = undefined;
                    return jQuery.event.trigger(e, arguments[1], elem);
                }
            };
        jQuery.event.special.change = {
            filters: {
                focusout: testChange,
                beforedeactivate: testChange,
                click: function (e) {
                    var elem = e.target,
                        type = elem.type;
                    if (type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select") {
                        return testChange.call(this, e);
                    }
                },
                keydown: function (e) {
                    var elem = e.target,
                        type = elem.type;
                    if ((e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") || (e.keyCode === 32 && (type === "checkbox" || type === "radio")) || type === "select-multiple") {
                        return testChange.call(this, e);
                    }
                },
                beforeactivate: function (e) {
                    var elem = e.target;
                    jQuery.data(elem, "_change_data", getVal(elem));
                }
            },
            setup: function (data, namespaces) {
                if (this.type === "file") {
                    return false;
                }
                for (var type in changeFilters) {
                    jQuery.event.add(this, type + ".specialChange", changeFilters[type]);
                }
                return rformElems.test(this.nodeName);
            },
            teardown: function (namespaces) {
                jQuery.event.remove(this, ".specialChange");
                return rformElems.test(this.nodeName);
            }
        };
        changeFilters = jQuery.event.special.change.filters;
        changeFilters.focus = changeFilters.beforeactivate;
    }

    function trigger(type, elem, args) {
        args[0].type = type;
        return jQuery.event.handle.apply(elem, args);
    }
    if (document.addEventListener) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function (orig, fix) {
            jQuery.event.special[fix] = {
                setup: function () {
                    if (focusCounts[fix]++ === 0) {
                        document.addEventListener(orig, handler, true);
                    }
                },
                teardown: function () {
                    if (--focusCounts[fix] === 0) {
                        document.removeEventListener(orig, handler, true);
                    }
                }
            };

            function handler(e) {
                e = jQuery.event.fix(e);
                e.type = fix;
                return jQuery.event.trigger(e, null, e.target);
            }
        });
    }
    jQuery.each(["bind", "one"], function (i, name) {
        jQuery.fn[name] = function (type, data, fn) {
            if (typeof type === "object") {
                for (var key in type) {
                    this[name](key, data, type[key], fn);
                }
                return this;
            }
            if (jQuery.isFunction(data) || data === false) {
                fn = data;
                data = undefined;
            }
            var handler = name === "one" ? jQuery.proxy(fn, function (event) {
                jQuery(this).unbind(event, handler);
                return fn.apply(this, arguments);
            }) : fn;
            if (type === "unload" && name !== "one") {
                this.one(type, data, fn);
            } else {
                for (var i = 0, l = this.length; i < l; i++) {
                    jQuery.event.add(this[i], type, handler, data);
                }
            }
            return this;
        };
    });
    jQuery.fn.extend({
        unbind: function (type, fn) {
            if (typeof type === "object" && !type.preventDefault) {
                for (var key in type) {
                    this.unbind(key, type[key]);
                }
            } else {
                for (var i = 0, l = this.length; i < l; i++) {
                    jQuery.event.remove(this[i], type, fn);
                }
            }
            return this;
        },
        delegate: function (selector, types, data, fn) {
            return this.live(types, data, fn, selector);
        },
        undelegate: function (selector, types, fn) {
            if (arguments.length === 0) {
                return this.unbind("live");
            } else {
                return this.die(types, null, fn, selector);
            }
        },
        trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function (type, data) {
            if (this[0]) {
                var event = jQuery.Event(type);
                event.preventDefault();
                event.stopPropagation();
                jQuery.event.trigger(event, data, this[0]);
                return event.result;
            }
        },
        toggle: function (fn) {
            var args = arguments,
                i = 1;
            while (i < args.length) {
                jQuery.proxy(fn, args[i++]);
            }
            return this.click(jQuery.proxy(fn, function (event) {
                var lastToggle = (jQuery.data(this, "lastToggle" + fn.guid) || 0) % i;
                jQuery.data(this, "lastToggle" + fn.guid, lastToggle + 1);
                event.preventDefault();
                return args[lastToggle].apply(this, arguments) || false;
            }));
        },
        hover: function (fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });
    var liveMap = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    jQuery.each(["live", "die"], function (i, name) {
        jQuery.fn[name] = function (types, data, fn, origSelector) {
            var type, i = 0,
                match, namespaces, preType, selector = origSelector || this.selector,
                context = origSelector ? this : jQuery(this.context);
            if (typeof types === "object" && !types.preventDefault) {
                for (var key in types) {
                    context[name](key, data, types[key], selector);
                }
                return this;
            }
            if (jQuery.isFunction(data)) {
                fn = data;
                data = undefined;
            }
            types = (types || "").split(" ");
            while ((type = types[i++]) != null) {
                match = rnamespaces.exec(type);
                namespaces = "";
                if (match) {
                    namespaces = match[0];
                    type = type.replace(rnamespaces, "");
                }
                if (type === "hover") {
                    types.push("mouseenter" + namespaces, "mouseleave" + namespaces);
                    continue;
                }
                preType = type;
                if (type === "focus" || type === "blur") {
                    types.push(liveMap[type] + namespaces);
                    type = type + namespaces;
                } else {
                    type = (liveMap[type] || type) + namespaces;
                }
                if (name === "live") {
                    for (var j = 0, l = context.length; j < l; j++) {
                        jQuery.event.add(context[j], "live." + liveConvert(type, selector), {
                            data: data,
                            selector: selector,
                            handler: fn,
                            origType: type,
                            origHandler: fn,
                            preType: preType
                        });
                    }
                } else {
                    context.unbind("live." + liveConvert(type, selector), fn);
                }
            }
            return this;
        };
    });

    function liveHandler(event) {
        var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret, elems = [],
            selectors = [],
            events = jQuery.data(this, this.nodeType ? "events" : "__events__");
        if (typeof events === "function") {
            events = events.events;
        }
        if (event.liveFired === this || !events || !events.live || event.button && event.type === "click") {
            return;
        }
        if (event.namespace) {
            namespace = new RegExp("(^|\\.)" + event.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
        }
        event.liveFired = this;
        var live = events.live.slice(0);
        for (j = 0; j < live.length; j++) {
            handleObj = live[j];
            if (handleObj.origType.replace(rnamespaces, "") === event.type) {
                selectors.push(handleObj.selector);
            } else {
                live.splice(j--, 1);
            }
        }
        match = jQuery(event.target).closest(selectors, event.currentTarget);
        for (i = 0, l = match.length; i < l; i++) {
            close = match[i];
            for (j = 0; j < live.length; j++) {
                handleObj = live[j];
                if (close.selector === handleObj.selector && (!namespace || namespace.test(handleObj.namespace))) {
                    elem = close.elem;
                    related = null;
                    if (handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave") {
                        event.type = handleObj.preType;
                        related = jQuery(event.relatedTarget).closest(handleObj.selector)[0];
                    }
                    if (!related || related !== elem) {
                        elems.push({
                            elem: elem,
                            handleObj: handleObj,
                            level: close.level
                        });
                    }
                }
            }
        }
        for (i = 0, l = elems.length; i < l; i++) {
            match = elems[i];
            if (maxLevel && match.level > maxLevel) {
                break;
            }
            event.currentTarget = match.elem;
            event.data = match.handleObj.data;
            event.handleObj = match.handleObj;
            ret = match.handleObj.origHandler.apply(match.elem, arguments);
            if (ret === false || event.isPropagationStopped()) {
                maxLevel = match.level;
                if (ret === false) {
                    stop = false;
                }
                if (event.isImmediatePropagationStopped()) {
                    break;
                }
            }
        }
        return stop;
    }

    function liveConvert(type, selector) {
        return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`").replace(rspace, "&");
    }
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error").split(" "), function (i, name) {
        jQuery.fn[name] = function (data, fn) {
            if (fn == null) {
                fn = data;
                data = null;
            }
            return arguments.length > 0 ? this.bind(name, data, fn) : this.trigger(name);
        };
        if (jQuery.attrFn) {
            jQuery.attrFn[name] = true;
        }
    });
    if (window.attachEvent && !window.addEventListener) {
        jQuery(window).bind("unload", function () {
            for (var id in jQuery.cache) {
                if (jQuery.cache[id].handle) {
                    try {
                        jQuery.event.remove(jQuery.cache[id].handle.elem);
                    } catch (e) {}
                }
            }
        });
        /*
         * Sizzle CSS Selector Engine - v1.0
         *  Copyright 2009, The Dojo Foundation
         *  Released under the MIT, BSD, and GPL Licenses.
         *  More information: http://sizzlejs.com/
         */
    }(function () {
        var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            done = 0,
            toString = Object.prototype.toString,
            hasDuplicate = false,
            baseHasDuplicate = true;
        [0, 0].sort(function () {
            baseHasDuplicate = false;
            return 0;
        });
        var Sizzle = function (selector, context, results, seed) {
            results = results || [];
            context = context || document;
            var origContext = context;
            if (context.nodeType !== 1 && context.nodeType !== 9) {
                return [];
            }
            if (!selector || typeof selector !== "string") {
                return results;
            }
            var m, set, checkSet, extra, ret, cur, pop, i, prune = true,
                contextXML = Sizzle.isXML(context),
                parts = [],
                soFar = selector;
            do {
                chunker.exec("");
                m = chunker.exec(soFar);
                if (m) {
                    soFar = m[3];
                    parts.push(m[1]);
                    if (m[2]) {
                        extra = m[3];
                        break;
                    }
                }
            } while (m);
            if (parts.length > 1 && origPOS.exec(selector)) {
                if (parts.length === 2 && Expr.relative[parts[0]]) {
                    set = posProcess(parts[0] + parts[1], context);
                } else {
                    set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
                    while (parts.length) {
                        selector = parts.shift();
                        if (Expr.relative[selector]) {
                            selector += parts.shift();
                        }
                        set = posProcess(selector, set);
                    }
                }
            } else {
                if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
                    ret = Sizzle.find(parts.shift(), context, contextXML);
                    context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
                }
                if (context) {
                    ret = seed ? {
                        expr: parts.pop(),
                        set: makeArray(seed)
                    } : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
                    set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
                    if (parts.length > 0) {
                        checkSet = makeArray(set);
                    } else {
                        prune = false;
                    }
                    while (parts.length) {
                        cur = parts.pop();
                        pop = cur;
                        if (!Expr.relative[cur]) {
                            cur = "";
                        } else {
                            pop = parts.pop();
                        }
                        if (pop == null) {
                            pop = context;
                        }
                        Expr.relative[cur](checkSet, pop, contextXML);
                    }
                } else {
                    checkSet = parts = [];
                }
            }
            if (!checkSet) {
                checkSet = set;
            }
            if (!checkSet) {
                Sizzle.error(cur || selector);
            }
            if (toString.call(checkSet) === "[object Array]") {
                if (!prune) {
                    results.push.apply(results, checkSet);
                } else {
                    if (context && context.nodeType === 1) {
                        for (i = 0; checkSet[i] != null; i++) {
                            if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
                                results.push(set[i]);
                            }
                        }
                    } else {
                        for (i = 0; checkSet[i] != null; i++) {
                            if (checkSet[i] && checkSet[i].nodeType === 1) {
                                results.push(set[i]);
                            }
                        }
                    }
                }
            } else {
                makeArray(checkSet, results);
            }
            if (extra) {
                Sizzle(extra, origContext, results, seed);
                Sizzle.uniqueSort(results);
            }
            return results;
        };
        Sizzle.uniqueSort = function (results) {
            if (sortOrder) {
                hasDuplicate = baseHasDuplicate;
                results.sort(sortOrder);
                if (hasDuplicate) {
                    for (var i = 1; i < results.length; i++) {
                        if (results[i] === results[i - 1]) {
                            results.splice(i--, 1);
                        }
                    }
                }
            }
            return results;
        };
        Sizzle.matches = function (expr, set) {
            return Sizzle(expr, null, null, set);
        };
        Sizzle.matchesSelector = function (node, expr) {
            return Sizzle(expr, null, null, [node]).length > 0;
        };
        Sizzle.find = function (expr, context, isXML) {
            var set;
            if (!expr) {
                return [];
            }
            for (var i = 0, l = Expr.order.length; i < l; i++) {
                var match, type = Expr.order[i];
                if ((match = Expr.leftMatch[type].exec(expr))) {
                    var left = match[1];
                    match.splice(1, 1);
                    if (left.substr(left.length - 1) !== "\\") {
                        match[1] = (match[1] || "").replace(/\\/g, "");
                        set = Expr.find[type](match, context, isXML);
                        if (set != null) {
                            expr = expr.replace(Expr.match[type], "");
                            break;
                        }
                    }
                }
            }
            if (!set) {
                set = context.getElementsByTagName("*");
            }
            return {
                set: set,
                expr: expr
            };
        };
        Sizzle.filter = function (expr, set, inplace, not) {
            var match, anyFound, old = expr,
                result = [],
                curLoop = set,
                isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);
            while (expr && set.length) {
                for (var type in Expr.filter) {
                    if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
                        var found, item, filter = Expr.filter[type],
                            left = match[1];
                        anyFound = false;
                        match.splice(1, 1);
                        if (left.substr(left.length - 1) === "\\") {
                            continue;
                        }
                        if (curLoop === result) {
                            result = [];
                        }
                        if (Expr.preFilter[type]) {
                            match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
                            if (!match) {
                                anyFound = found = true;
                            } else {
                                if (match === true) {
                                    continue;
                                }
                            }
                        }
                        if (match) {
                            for (var i = 0;
                                (item = curLoop[i]) != null; i++) {
                                if (item) {
                                    found = filter(item, match, i, curLoop);
                                    var pass = not ^ !!found;
                                    if (inplace && found != null) {
                                        if (pass) {
                                            anyFound = true;
                                        } else {
                                            curLoop[i] = false;
                                        }
                                    } else {
                                        if (pass) {
                                            result.push(item);
                                            anyFound = true;
                                        }
                                    }
                                }
                            }
                        }
                        if (found !== undefined) {
                            if (!inplace) {
                                curLoop = result;
                            }
                            expr = expr.replace(Expr.match[type], "");
                            if (!anyFound) {
                                return [];
                            }
                            break;
                        }
                    }
                }
                if (expr === old) {
                    if (anyFound == null) {
                        Sizzle.error(expr);
                    } else {
                        break;
                    }
                }
                old = expr;
            }
            return curLoop;
        };
        Sizzle.error = function (msg) {
            throw "Syntax error, unrecognized expression: " + msg;
        };
        var Expr = Sizzle.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function (elem) {
                    return elem.getAttribute("href");
                }
            },
            relative: {
                "+": function (checkSet, part) {
                    var isPartStr = typeof part === "string",
                        isTag = isPartStr && !/\W/.test(part),
                        isPartStrNotTag = isPartStr && !isTag;
                    if (isTag) {
                        part = part.toLowerCase();
                    }
                    for (var i = 0, l = checkSet.length, elem; i < l; i++) {
                        if ((elem = checkSet[i])) {
                            while ((elem = elem.previousSibling) && elem.nodeType !== 1) {}
                            checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part;
                        }
                    }
                    if (isPartStrNotTag) {
                        Sizzle.filter(part, checkSet, true);
                    }
                },
                ">": function (checkSet, part) {
                    var elem, isPartStr = typeof part === "string",
                        i = 0,
                        l = checkSet.length;
                    if (isPartStr && !/\W/.test(part)) {
                        part = part.toLowerCase();
                        for (; i < l; i++) {
                            elem = checkSet[i];
                            if (elem) {
                                var parent = elem.parentNode;
                                checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                            }
                        }
                    } else {
                        for (; i < l; i++) {
                            elem = checkSet[i];
                            if (elem) {
                                checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
                            }
                        }
                        if (isPartStr) {
                            Sizzle.filter(part, checkSet, true);
                        }
                    }
                },
                "": function (checkSet, part, isXML) {
                    var nodeCheck, doneName = done++,
                        checkFn = dirCheck;
                    if (typeof part === "string" && !/\W/.test(part)) {
                        part = part.toLowerCase();
                        nodeCheck = part;
                        checkFn = dirNodeCheck;
                    }
                    checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
                },
                "~": function (checkSet, part, isXML) {
                    var nodeCheck, doneName = done++,
                        checkFn = dirCheck;
                    if (typeof part === "string" && !/\W/.test(part)) {
                        part = part.toLowerCase();
                        nodeCheck = part;
                        checkFn = dirNodeCheck;
                    }
                    checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
                }
            },
            find: {
                ID: function (match, context, isXML) {
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        return m && m.parentNode ? [m] : [];
                    }
                },
                NAME: function (match, context) {
                    if (typeof context.getElementsByName !== "undefined") {
                        var ret = [],
                            results = context.getElementsByName(match[1]);
                        for (var i = 0, l = results.length; i < l; i++) {
                            if (results[i].getAttribute("name") === match[1]) {
                                ret.push(results[i]);
                            }
                        }
                        return ret.length === 0 ? null : ret;
                    }
                },
                TAG: function (match, context) {
                    return context.getElementsByTagName(match[1]);
                }
            },
            preFilter: {
                CLASS: function (match, curLoop, inplace, result, not, isXML) {
                    match = " " + match[1].replace(/\\/g, "") + " ";
                    if (isXML) {
                        return match;
                    }
                    for (var i = 0, elem;
                        (elem = curLoop[i]) != null; i++) {
                        if (elem) {
                            if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0)) {
                                if (!inplace) {
                                    result.push(elem);
                                }
                            } else {
                                if (inplace) {
                                    curLoop[i] = false;
                                }
                            }
                        }
                    }
                    return false;
                },
                ID: function (match) {
                    return match[1].replace(/\\/g, "");
                },
                TAG: function (match, curLoop) {
                    return match[1].toLowerCase();
                },
                CHILD: function (match) {
                    if (match[1] === "nth") {
                        var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
                        match[2] = (test[1] + (test[2] || 1)) - 0;
                        match[3] = test[3] - 0;
                    }
                    match[0] = done++;
                    return match;
                },
                ATTR: function (match, curLoop, inplace, result, not, isXML) {
                    var name = match[1].replace(/\\/g, "");
                    if (!isXML && Expr.attrMap[name]) {
                        match[1] = Expr.attrMap[name];
                    }
                    if (match[2] === "~=") {
                        match[4] = " " + match[4] + " ";
                    }
                    return match;
                },
                PSEUDO: function (match, curLoop, inplace, result, not) {
                    if (match[1] === "not") {
                        if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) {
                            match[3] = Sizzle(match[3], null, null, curLoop);
                        } else {
                            var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
                            if (!inplace) {
                                result.push.apply(result, ret);
                            }
                            return false;
                        }
                    } else {
                        if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
                            return true;
                        }
                    }
                    return match;
                },
                POS: function (match) {
                    match.unshift(true);
                    return match;
                }
            },
            filters: {
                enabled: function (elem) {
                    return elem.disabled === false && elem.type !== "hidden";
                },
                disabled: function (elem) {
                    return elem.disabled === true;
                },
                checked: function (elem) {
                    return elem.checked === true;
                },
                selected: function (elem) {
                    elem.parentNode.selectedIndex;
                    return elem.selected === true;
                },
                parent: function (elem) {
                    return !!elem.firstChild;
                },
                empty: function (elem) {
                    return !elem.firstChild;
                },
                has: function (elem, i, match) {
                    return !!Sizzle(match[3], elem).length;
                },
                header: function (elem) {
                    return (/h\d/i).test(elem.nodeName);
                },
                text: function (elem) {
                    return "text" === elem.type;
                },
                radio: function (elem) {
                    return "radio" === elem.type;
                },
                checkbox: function (elem) {
                    return "checkbox" === elem.type;
                },
                file: function (elem) {
                    return "file" === elem.type;
                },
                password: function (elem) {
                    return "password" === elem.type;
                },
                submit: function (elem) {
                    return "submit" === elem.type;
                },
                image: function (elem) {
                    return "image" === elem.type;
                },
                reset: function (elem) {
                    return "reset" === elem.type;
                },
                button: function (elem) {
                    return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
                },
                input: function (elem) {
                    return (/input|select|textarea|button/i).test(elem.nodeName);
                }
            },
            setFilters: {
                first: function (elem, i) {
                    return i === 0;
                },
                last: function (elem, i, match, array) {
                    return i === array.length - 1;
                },
                even: function (elem, i) {
                    return i % 2 === 0;
                },
                odd: function (elem, i) {
                    return i % 2 === 1;
                },
                lt: function (elem, i, match) {
                    return i < match[3] - 0;
                },
                gt: function (elem, i, match) {
                    return i > match[3] - 0;
                },
                nth: function (elem, i, match) {
                    return match[3] - 0 === i;
                },
                eq: function (elem, i, match) {
                    return match[3] - 0 === i;
                }
            },
            filter: {
                PSEUDO: function (elem, match, i, array) {
                    var name = match[1],
                        filter = Expr.filters[name];
                    if (filter) {
                        return filter(elem, i, match, array);
                    } else {
                        if (name === "contains") {
                            return (elem.textContent || elem.innerText || Sizzle.getText([elem]) || "").indexOf(match[3]) >= 0;
                        } else {
                            if (name === "not") {
                                var not = match[3];
                                for (var j = 0, l = not.length; j < l; j++) {
                                    if (not[j] === elem) {
                                        return false;
                                    }
                                }
                                return true;
                            } else {
                                Sizzle.error("Syntax error, unrecognized expression: " + name);
                            }
                        }
                    }
                },
                CHILD: function (elem, match) {
                    var type = match[1],
                        node = elem;
                    switch (type) {
                        case "only":
                        case "first":
                            while ((node = node.previousSibling)) {
                                if (node.nodeType === 1) {
                                    return false;
                                }
                            }
                            if (type === "first") {
                                return true;
                            }
                            node = elem;
                        case "last":
                            while ((node = node.nextSibling)) {
                                if (node.nodeType === 1) {
                                    return false;
                                }
                            }
                            return true;
                        case "nth":
                            var first = match[2],
                                last = match[3];
                            if (first === 1 && last === 0) {
                                return true;
                            }
                            var doneName = match[0],
                                parent = elem.parentNode;
                            if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)) {
                                var count = 0;
                                for (node = parent.firstChild; node; node = node.nextSibling) {
                                    if (node.nodeType === 1) {
                                        node.nodeIndex = ++count;
                                    }
                                }
                                parent.sizcache = doneName;
                            }
                            var diff = elem.nodeIndex - last;
                            if (first === 0) {
                                return diff === 0;
                            } else {
                                return (diff % first === 0 && diff / first >= 0);
                            }
                    }
                },
                ID: function (elem, match) {
                    return elem.nodeType === 1 && elem.getAttribute("id") === match;
                },
                TAG: function (elem, match) {
                    return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
                },
                CLASS: function (elem, match) {
                    return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1;
                },
                ATTR: function (elem, match) {
                    var name = match[1],
                        result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name),
                        value = result + "",
                        type = match[2],
                        check = match[4];
                    return result == null ? type === "!=" : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
                },
                POS: function (elem, match, i, array) {
                    var name = match[2],
                        filter = Expr.setFilters[name];
                    if (filter) {
                        return filter(elem, i, match, array);
                    }
                }
            }
        };
        var origPOS = Expr.match.POS,
            fescape = function (all, num) {
                return "\\" + (num - 0 + 1);
            };
        for (var type in Expr.match) {
            Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
            Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape));
        }
        var makeArray = function (array, results) {
            array = Array.prototype.slice.call(array, 0);
            if (results) {
                results.push.apply(results, array);
                return results;
            }
            return array;
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
        } catch (e) {
            makeArray = function (array, results) {
                var i = 0,
                    ret = results || [];
                if (toString.call(array) === "[object Array]") {
                    Array.prototype.push.apply(ret, array);
                } else {
                    if (typeof array.length === "number") {
                        for (var l = array.length; i < l; i++) {
                            ret.push(array[i]);
                        }
                    } else {
                        for (; array[i]; i++) {
                            ret.push(array[i]);
                        }
                    }
                }
                return ret;
            };
        }
        var sortOrder, siblingCheck;
        if (document.documentElement.compareDocumentPosition) {
            sortOrder = function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                    return a.compareDocumentPosition ? -1 : 1;
                }
                return a.compareDocumentPosition(b) & 4 ? -1 : 1;
            };
        } else {
            sortOrder = function (a, b) {
                var al, bl, ap = [],
                    bp = [],
                    aup = a.parentNode,
                    bup = b.parentNode,
                    cur = aup;
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                } else {
                    if (aup === bup) {
                        return siblingCheck(a, b);
                    } else {
                        if (!aup) {
                            return -1;
                        } else {
                            if (!bup) {
                                return 1;
                            }
                        }
                    }
                }
                while (cur) {
                    ap.unshift(cur);
                    cur = cur.parentNode;
                }
                cur = bup;
                while (cur) {
                    bp.unshift(cur);
                    cur = cur.parentNode;
                }
                al = ap.length;
                bl = bp.length;
                for (var i = 0; i < al && i < bl; i++) {
                    if (ap[i] !== bp[i]) {
                        return siblingCheck(ap[i], bp[i]);
                    }
                }
                return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
            };
            siblingCheck = function (a, b, ret) {
                if (a === b) {
                    return ret;
                }
                var cur = a.nextSibling;
                while (cur) {
                    if (cur === b) {
                        return -1;
                    }
                    cur = cur.nextSibling;
                }
                return 1;
            };
        }
        Sizzle.getText = function (elems) {
            var ret = "",
                elem;
            for (var i = 0; elems[i]; i++) {
                elem = elems[i];
                if (elem.nodeType === 3 || elem.nodeType === 4) {
                    ret += elem.nodeValue;
                } else {
                    if (elem.nodeType !== 8) {
                        ret += Sizzle.getText(elem.childNodes);
                    }
                }
            }
            return ret;
        };
        (function () {
            var form = document.createElement("div"),
                id = "script" + (new Date()).getTime(),
                root = document.documentElement;
            form.innerHTML = "<a name='" + id + "'/>";
            root.insertBefore(form, root.firstChild);
            if (document.getElementById(id)) {
                Expr.find.ID = function (match, context, isXML) {
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
                    }
                };
                Expr.filter.ID = function (elem, match) {
                    var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                    return elem.nodeType === 1 && node && node.nodeValue === match;
                };
            }
            root.removeChild(form);
            root = form = null;
        })();
        (function () {
            var div = document.createElement("div");
            div.appendChild(document.createComment(""));
            if (div.getElementsByTagName("*").length > 0) {
                Expr.find.TAG = function (match, context) {
                    var results = context.getElementsByTagName(match[1]);
                    if (match[1] === "*") {
                        var tmp = [];
                        for (var i = 0; results[i]; i++) {
                            if (results[i].nodeType === 1) {
                                tmp.push(results[i]);
                            }
                        }
                        results = tmp;
                    }
                    return results;
                };
            }
            div.innerHTML = "<a href='#'></a>";
            if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") {
                Expr.attrHandle.href = function (elem) {
                    return elem.getAttribute("href", 2);
                };
            }
            div = null;
        })();
        if (document.querySelectorAll) {
            (function () {
                var oldSizzle = Sizzle,
                    div = document.createElement("div"),
                    id = "__sizzle__";
                div.innerHTML = "<p class='TEST'></p>";
                if (div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) {
                    return;
                }
                Sizzle = function (query, context, extra, seed) {
                    context = context || document;
                    query = query.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!seed && !Sizzle.isXML(context)) {
                        if (context.nodeType === 9) {
                            try {
                                return makeArray(context.querySelectorAll(query), extra);
                            } catch (qsaError) {}
                        } else {
                            if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                                var old = context.getAttribute("id"),
                                    nid = old || id;
                                if (!old) {
                                    context.setAttribute("id", nid);
                                }
                                try {
                                    return makeArray(context.querySelectorAll("#" + nid + " " + query), extra);
                                } catch (pseudoError) {} finally {
                                    if (!old) {
                                        context.removeAttribute("id");
                                    }
                                }
                            }
                        }
                    }
                    return oldSizzle(query, context, extra, seed);
                };
                for (var prop in oldSizzle) {
                    Sizzle[prop] = oldSizzle[prop];
                }
                div = null;
            })();
        }(function () {
            var html = document.documentElement,
                matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector,
                pseudoWorks = false;
            try {
                matches.call(document.documentElement, "[test!='']:sizzle");
            } catch (pseudoError) {
                pseudoWorks = true;
            }
            if (matches) {
                Sizzle.matchesSelector = function (node, expr) {
                    expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!Sizzle.isXML(node)) {
                        try {
                            if (pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr)) {
                                return matches.call(node, expr);
                            }
                        } catch (e) {}
                    }
                    return Sizzle(expr, null, null, [node]).length > 0;
                };
            }
        })();
        (function () {
            var div = document.createElement("div");
            div.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) {
                return;
            }
            div.lastChild.className = "e";
            if (div.getElementsByClassName("e").length === 1) {
                return;
            }
            Expr.order.splice(1, 0, "CLASS");
            Expr.find.CLASS = function (match, context, isXML) {
                if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
                    return context.getElementsByClassName(match[1]);
                }
            };
            div = null;
        })();

        function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var match = false;
                    elem = elem[dir];
                    while (elem) {
                        if (elem.sizcache === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        if (elem.nodeType === 1 && !isXML) {
                            elem.sizcache = doneName;
                            elem.sizset = i;
                        }
                        if (elem.nodeName.toLowerCase() === cur) {
                            match = elem;
                            break;
                        }
                        elem = elem[dir];
                    }
                    checkSet[i] = match;
                }
            }
        }

        function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var match = false;
                    elem = elem[dir];
                    while (elem) {
                        if (elem.sizcache === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        if (elem.nodeType === 1) {
                            if (!isXML) {
                                elem.sizcache = doneName;
                                elem.sizset = i;
                            }
                            if (typeof cur !== "string") {
                                if (elem === cur) {
                                    match = true;
                                    break;
                                }
                            } else {
                                if (Sizzle.filter(cur, [elem]).length > 0) {
                                    match = elem;
                                    break;
                                }
                            }
                        }
                        elem = elem[dir];
                    }
                    checkSet[i] = match;
                }
            }
        }
        if (document.documentElement.contains) {
            Sizzle.contains = function (a, b) {
                return a !== b && (a.contains ? a.contains(b) : true);
            };
        } else {
            if (document.documentElement.compareDocumentPosition) {
                Sizzle.contains = function (a, b) {
                    return !!(a.compareDocumentPosition(b) & 16);
                };
            } else {
                Sizzle.contains = function () {
                    return false;
                };
            }
        }
        Sizzle.isXML = function (elem) {
            var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        var posProcess = function (selector, context) {
            var match, tmpSet = [],
                later = "",
                root = context.nodeType ? [context] : context;
            while ((match = Expr.match.PSEUDO.exec(selector))) {
                later += match[0];
                selector = selector.replace(Expr.match.PSEUDO, "");
            }
            selector = Expr.relative[selector] ? selector + "*" : selector;
            for (var i = 0, l = root.length; i < l; i++) {
                Sizzle(selector, root[i], tmpSet);
            }
            return Sizzle.filter(later, tmpSet);
        };
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.filters;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
    })();
    var runtil = /Until$/,
        rparentsprev = /^(?:parents|prevUntil|prevAll)/,
        rmultiselector = /,/,
        isSimple = /^.[^:#\[\.,]*$/,
        slice = Array.prototype.slice,
        POS = jQuery.expr.match.POS;
    jQuery.fn.extend({
        find: function (selector) {
            var ret = this.pushStack("", "find", selector),
                length = 0;
            for (var i = 0, l = this.length; i < l; i++) {
                length = ret.length;
                jQuery.find(selector, this[i], ret);
                if (i > 0) {
                    for (var n = length; n < ret.length; n++) {
                        for (var r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break;
                            }
                        }
                    }
                }
            }
            return ret;
        },
        has: function (target) {
            var targets = jQuery(target);
            return this.filter(function () {
                for (var i = 0, l = targets.length; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        not: function (selector) {
            return this.pushStack(winnow(this, selector, false), "not", selector);
        },
        filter: function (selector) {
            return this.pushStack(winnow(this, selector, true), "filter", selector);
        },
        is: function (selector) {
            return !!selector && jQuery.filter(selector, this).length > 0;
        },
        closest: function (selectors, context) {
            var ret = [],
                i, l, cur = this[0];
            if (jQuery.isArray(selectors)) {
                var match, selector, matches = {},
                    level = 1;
                if (cur && selectors.length) {
                    for (i = 0, l = selectors.length; i < l; i++) {
                        selector = selectors[i];
                        if (!matches[selector]) {
                            matches[selector] = jQuery.expr.match.POS.test(selector) ? jQuery(selector, context || this.context) : selector;
                        }
                    }
                    while (cur && cur.ownerDocument && cur !== context) {
                        for (selector in matches) {
                            match = matches[selector];
                            if (match.jquery ? match.index(cur) > -1 : jQuery(cur).is(match)) {
                                ret.push({
                                    selector: selector,
                                    elem: cur,
                                    level: level
                                });
                            }
                        }
                        cur = cur.parentNode;
                        level++;
                    }
                }
                return ret;
            }
            var pos = POS.test(selectors) ? jQuery(selectors, context || this.context) : null;
            for (i = 0, l = this.length; i < l; i++) {
                cur = this[i];
                while (cur) {
                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break;
                    } else {
                        cur = cur.parentNode;
                        if (!cur || !cur.ownerDocument || cur === context) {
                            break;
                        }
                    }
                }
            }
            ret = ret.length > 1 ? jQuery.unique(ret) : ret;
            return this.pushStack(ret, "closest", selectors);
        },
        index: function (elem) {
            if (!elem || typeof elem === "string") {
                return jQuery.inArray(this[0], elem ? jQuery(elem) : this.parent().children());
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
        },
        add: function (selector, context) {
            var set = typeof selector === "string" ? jQuery(selector, context || this.context) : jQuery.makeArray(selector),
                all = jQuery.merge(this.get(), set);
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all));
        },
        andSelf: function () {
            return this.add(this.prevObject);
        }
    });

    function isDisconnected(node) {
        return !node || !node.parentNode || node.parentNode.nodeType === 11;
    }
    jQuery.each({
        parent: function (elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function (elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function (elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function (elem) {
            return jQuery.nth(elem, 2, "nextSibling");
        },
        prev: function (elem) {
            return jQuery.nth(elem, 2, "previousSibling");
        },
        nextAll: function (elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function (elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function (elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function (elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function (elem) {
            return jQuery.sibling(elem.parentNode.firstChild, elem);
        },
        children: function (elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function (elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.makeArray(elem.childNodes);
        }
    }, function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (!runtil.test(name)) {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }
            ret = this.length > 1 ? jQuery.unique(ret) : ret;
            if ((this.length > 1 || rmultiselector.test(selector)) && rparentsprev.test(name)) {
                ret = ret.reverse();
            }
            return this.pushStack(ret, name, slice.call(arguments).join(","));
        };
    });
    jQuery.extend({
        filter: function (expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")";
            }
            return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
        },
        dir: function (elem, dir, until) {
            var matched = [],
                cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },
        nth: function (cur, result, dir, elem) {
            result = result || 1;
            var num = 0;
            for (; cur; cur = cur[dir]) {
                if (cur.nodeType === 1 && ++num === result) {
                    break;
                }
            }
            return cur;
        },
        sibling: function (n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            return r;
        }
    });

    function winnow(elements, qualifier, keep) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function (elem, i) {
                var retVal = !!qualifier.call(elem, i, elem);
                return retVal === keep;
            });
        } else {
            if (qualifier.nodeType) {
                return jQuery.grep(elements, function (elem, i) {
                    return (elem === qualifier) === keep;
                });
            } else {
                if (typeof qualifier === "string") {
                    var filtered = jQuery.grep(elements, function (elem) {
                        return elem.nodeType === 1;
                    });
                    if (isSimple.test(qualifier)) {
                        return jQuery.filter(qualifier, filtered, !keep);
                    } else {
                        qualifier = jQuery.filter(qualifier, filtered);
                    }
                }
            }
        }
        return jQuery.grep(elements, function (elem, i) {
            return (jQuery.inArray(elem, qualifier) >= 0) === keep;
        });
    }
    var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnocache = /<(?:script|object|embed|option|style)/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        raction = /\=([^="'>\s]+\/)>/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!jQuery.support.htmlSerialize) {
        wrapMap._default = [1, "div<div>", "</div>"];
    }
    jQuery.fn.extend({
        text: function (text) {
            if (jQuery.isFunction(text)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    self.text(text.call(this, i, self.text()));
                });
            }
            if (typeof text !== "object" && text !== undefined) {
                return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(text));
            }
            return jQuery.text(this);
        },
        wrapAll: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function () {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function () {
                var self = jQuery(this),
                    contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function (html) {
            return this.each(function () {
                jQuery(this).wrapAll(html);
            });
        },
        unwrap: function () {
            return this.parent().each(function () {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        },
        append: function () {
            return this.domManip(arguments, true, function (elem) {
                if (this.nodeType === 1) {
                    this.appendChild(elem);
                }
            });
        },
        prepend: function () {
            return this.domManip(arguments, true, function (elem) {
                if (this.nodeType === 1) {
                    this.insertBefore(elem, this.firstChild);
                }
            });
        },
        before: function () {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function (elem) {
                    this.parentNode.insertBefore(elem, this);
                });
            } else {
                if (arguments.length) {
                    var set = jQuery(arguments[0]);
                    set.push.apply(set, this.toArray());
                    return this.pushStack(set, "before", arguments);
                }
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function (elem) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                });
            } else {
                if (arguments.length) {
                    var set = this.pushStack(this, "after", arguments);
                    set.push.apply(set, jQuery(arguments[0]).toArray());
                    return set;
                }
            }
        },
        remove: function (selector, keepData) {
            for (var i = 0, elem;
                (elem = this[i]) != null; i++) {
                if (!selector || jQuery.filter(selector, [elem]).length) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(elem.getElementsByTagName("*"));
                        jQuery.cleanData([elem]);
                    }
                    if (elem.parentNode) {
                        elem.parentNode.removeChild(elem);
                    }
                }
            }
            return this;
        },
        empty: function () {
            for (var i = 0, elem;
                (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(elem.getElementsByTagName("*"));
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
            }
            return this;
        },
        clone: function (events) {
            var ret = this.map(function () {
                if (!jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this)) {
                    var html = this.outerHTML,
                        ownerDocument = this.ownerDocument;
                    if (!html) {
                        var div = ownerDocument.createElement("div");
                        div.appendChild(this.cloneNode(true));
                        html = div.innerHTML;
                    }
                    return jQuery.clean([html.replace(rinlinejQuery, "").replace(raction, '="$1">').replace(rleadingWhitespace, "")], ownerDocument)[0];
                } else {
                    return this.cloneNode(true);
                }
            });
            if (events === true) {
                cloneCopyEvent(this, ret);
                cloneCopyEvent(this.find("*"), ret.find("*"));
            }
            return ret;
        },
        html: function (value) {
            if (value === undefined) {
                return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(rinlinejQuery, "") : null;
            } else {
                if (typeof value === "string" && !rnocache.test(value) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (var i = 0, l = this.length; i < l; i++) {
                            if (this[i].nodeType === 1) {
                                jQuery.cleanData(this[i].getElementsByTagName("*"));
                                this[i].innerHTML = value;
                            }
                        }
                    } catch (e) {
                        this.empty().append(value);
                    }
                } else {
                    if (jQuery.isFunction(value)) {
                        this.each(function (i) {
                            var self = jQuery(this);
                            self.html(value.call(this, i, self.html()));
                        });
                    } else {
                        this.empty().append(value);
                    }
                }
            }
            return this;
        },
        replaceWith: function (value) {
            if (this[0] && this[0].parentNode) {
                if (jQuery.isFunction(value)) {
                    return this.each(function (i) {
                        var self = jQuery(this),
                            old = self.html();
                        self.replaceWith(value.call(this, i, old));
                    });
                }
                if (typeof value !== "string") {
                    value = jQuery(value).detach();
                }
                return this.each(function () {
                    var next = this.nextSibling,
                        parent = this.parentNode;
                    jQuery(this).remove();
                    if (next) {
                        jQuery(next).before(value);
                    } else {
                        jQuery(parent).append(value);
                    }
                });
            } else {
                return this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value);
            }
        },
        detach: function (selector) {
            return this.remove(selector, true);
        },
        domManip: function (args, table, callback) {
            var results, first, fragment, parent, value = args[0],
                scripts = [];
            if (!jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test(value)) {
                return this.each(function () {
                    jQuery(this).domManip(args, table, callback, true);
                });
            }
            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined);
                    self.domManip(args, table, callback);
                });
            }
            if (this[0]) {
                parent = value && value.parentNode;
                if (jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length) {
                    results = {
                        fragment: parent
                    };
                } else {
                    results = jQuery.buildFragment(args, this, scripts);
                }
                fragment = results.fragment;
                if (fragment.childNodes.length === 1) {
                    first = fragment = fragment.firstChild;
                } else {
                    first = fragment.firstChild;
                }
                if (first) {
                    table = table && jQuery.nodeName(first, "tr");
                    for (var i = 0, l = this.length; i < l; i++) {
                        callback.call(table ? root(this[i], first) : this[i], i > 0 || results.cacheable || this.length > 1 ? fragment.cloneNode(true) : fragment);
                    }
                }
                if (scripts.length) {
                    jQuery.each(scripts, evalScript);
                }
            }
            return this;
        }
    });

    function root(elem, cur) {
        return jQuery.nodeName(elem, "table") ? (elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody"))) : elem;
    }

    function cloneCopyEvent(orig, ret) {
        var i = 0;
        ret.each(function () {
            if (this.nodeName !== (orig[i] && orig[i].nodeName)) {
                return;
            }
            var oldData = jQuery.data(orig[i++]),
                curData = jQuery.data(this, oldData),
                events = oldData && oldData.events;
            if (events) {
                delete curData.handle;
                curData.events = {};
                for (var type in events) {
                    for (var handler in events[type]) {
                        jQuery.event.add(this, type, events[type][handler], events[type][handler].data);
                    }
                }
            }
        });
    }
    jQuery.buildFragment = function (args, nodes, scripts) {
        var fragment, cacheable, cacheresults, doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document);
        if (args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document && !rnocache.test(args[0]) && (jQuery.support.checkClone || !rchecked.test(args[0]))) {
            cacheable = true;
            cacheresults = jQuery.fragments[args[0]];
            if (cacheresults) {
                if (cacheresults !== 1) {
                    fragment = cacheresults;
                }
            }
        }
        if (!fragment) {
            fragment = doc.createDocumentFragment();
            jQuery.clean(args, doc, fragment, scripts);
        }
        if (cacheable) {
            jQuery.fragments[args[0]] = cacheresults ? fragment : 1;
        }
        return {
            fragment: fragment,
            cacheable: cacheable
        };
    };
    jQuery.fragments = {};
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var ret = [],
                insert = jQuery(selector),
                parent = this.length === 1 && this[0].parentNode;
            if (parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
                insert[original](this[0]);
                return this;
            } else {
                for (var i = 0, l = insert.length; i < l; i++) {
                    var elems = (i > 0 ? this.clone(true) : this).get();
                    jQuery(insert[i])[original](elems);
                    ret = ret.concat(elems);
                }
                return this.pushStack(ret, name, insert.selector);
            }
        };
    });
    jQuery.extend({
        clean: function (elems, context, fragment, scripts) {
            context = context || document;
            if (typeof context.createElement === "undefined") {
                context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
            }
            var ret = [];
            for (var i = 0, elem;
                (elem = elems[i]) != null; i++) {
                if (typeof elem === "number") {
                    elem += "";
                }
                if (!elem) {
                    continue;
                }
                if (typeof elem === "string" && !rhtml.test(elem)) {
                    elem = context.createTextNode(elem);
                } else {
                    if (typeof elem === "string") {
                        elem = elem.replace(rxhtmlTag, "<$1></$2>");
                        var tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(),
                            wrap = wrapMap[tag] || wrapMap._default,
                            depth = wrap[0],
                            div = context.createElement("div");
                        div.innerHTML = wrap[1] + elem + wrap[2];
                        while (depth--) {
                            div = div.lastChild;
                        }
                        if (!jQuery.support.tbody) {
                            var hasBody = rtbody.test(elem),
                                tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
                            for (var j = tbody.length - 1; j >= 0; --j) {
                                if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                    tbody[j].parentNode.removeChild(tbody[j]);
                                }
                            }
                        }
                        if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
                        }
                        elem = div.childNodes;
                    }
                }
                if (elem.nodeType) {
                    ret.push(elem);
                } else {
                    ret = jQuery.merge(ret, elem);
                }
            }
            if (fragment) {
                for (i = 0; ret[i]; i++) {
                    if (scripts && jQuery.nodeName(ret[i], "script") && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript")) {
                        scripts.push(ret[i].parentNode ? ret[i].parentNode.removeChild(ret[i]) : ret[i]);
                    } else {
                        if (ret[i].nodeType === 1) {
                            ret.splice.apply(ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))));
                        }
                        fragment.appendChild(ret[i]);
                    }
                }
            }
            return ret;
        },
        cleanData: function (elems) {
            var data, id, cache = jQuery.cache,
                special = jQuery.event.special,
                deleteExpando = jQuery.support.deleteExpando;
            for (var i = 0, elem;
                (elem = elems[i]) != null; i++) {
                if (elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) {
                    continue;
                }
                id = elem[jQuery.expando];
                if (id) {
                    data = cache[id];
                    if (data && data.events) {
                        for (var type in data.events) {
                            if (special[type]) {
                                jQuery.event.remove(elem, type);
                            } else {
                                jQuery.removeEvent(elem, type, data.handle);
                            }
                        }
                    }
                    if (deleteExpando) {
                        delete elem[jQuery.expando];
                    } else {
                        if (elem.removeAttribute) {
                            elem.removeAttribute(jQuery.expando);
                        }
                    }
                    delete cache[id];
                }
            }
        }
    });

    function evalScript(i, elem) {
        if (elem.src) {
            jQuery.ajax({
                url: elem.src,
                async: false,
                dataType: "script"
            });
        } else {
            jQuery.globalEval(elem.text || elem.textContent || elem.innerHTML || "");
        }
        if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }
    }
    var ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity=([^)]*)/,
        rdashAlpha = /-([a-z])/ig,
        rupper = /([A-Z])/g,
        rnumpx = /^-?\d+(?:px)?$/i,
        rnum = /^-?\d/,
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssWidth = ["Left", "Right"],
        cssHeight = ["Top", "Bottom"],
        curCSS, getComputedStyle, currentStyle, fcamelCase = function (all, letter) {
            return letter.toUpperCase();
        };
    jQuery.fn.css = function (name, value) {
        if (arguments.length === 2 && value === undefined) {
            return this;
        }
        return jQuery.access(this, name, value, true, function (elem, name, value) {
            return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
        });
    };
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function (elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity", "opacity");
                        return ret === "" ? "1" : ret;
                    } else {
                        return elem.style.opacity;
                    }
                }
            }
        },
        cssNumber: {
            "zIndex": true,
            "fontWeight": true,
            "opacity": true,
            "zoom": true,
            "lineHeight": true
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret, origName = jQuery.camelCase(name),
                style = elem.style,
                hooks = jQuery.cssHooks[origName];
            name = jQuery.cssProps[origName] || origName;
            if (value !== undefined) {
                if (typeof value === "number" && isNaN(value) || value == null) {
                    return;
                }
                if (typeof value === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value)) !== undefined) {
                    try {
                        style[name] = value;
                    } catch (e) {}
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function (elem, name, extra) {
            var ret, origName = jQuery.camelCase(name),
                hooks = jQuery.cssHooks[origName];
            name = jQuery.cssProps[origName] || origName;
            if (hooks && "get" in hooks && (ret = hooks.get(elem, true, extra)) !== undefined) {
                return ret;
            } else {
                if (curCSS) {
                    return curCSS(elem, name, origName);
                }
            }
        },
        swap: function (elem, options, callback) {
            var old = {};
            for (var name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            callback.call(elem);
            for (name in options) {
                elem.style[name] = old[name];
            }
        },
        camelCase: function (string) {
            return string.replace(rdashAlpha, fcamelCase);
        }
    });
    jQuery.curCSS = jQuery.css;
    jQuery.each(["height", "width"], function (i, name) {
        jQuery.cssHooks[name] = {
            get: function (elem, computed, extra) {
                var val;
                if (computed) {
                    if (elem.offsetWidth !== 0) {
                        val = getWH(elem, name, extra);
                    } else {
                        jQuery.swap(elem, cssShow, function () {
                            val = getWH(elem, name, extra);
                        });
                    }
                    if (val <= 0) {
                        val = curCSS(elem, name, name);
                        if (val === "0px" && currentStyle) {
                            val = currentStyle(elem, name, name);
                        }
                        if (val != null) {
                            return val === "" || val === "auto" ? "0px" : val;
                        }
                    }
                    if (val < 0 || val == null) {
                        val = elem.style[name];
                        return val === "" || val === "auto" ? "0px" : val;
                    }
                    return typeof val === "string" ? val : val + "px";
                }
            },
            set: function (elem, value) {
                if (rnumpx.test(value)) {
                    value = parseFloat(value);
                    if (value >= 0) {
                        return value + "px";
                    }
                } else {
                    return value;
                }
            }
        };
    });
    if (!jQuery.support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function (elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : computed ? "1" : "";
            },
            set: function (elem, value) {
                var style = elem.style;
                style.zoom = 1;
                var opacity = jQuery.isNaN(value) ? "" : "alpha(opacity=" + value * 100 + ")",
                    filter = style.filter || "";
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : style.filter + " " + opacity;
            }
        };
    }
    if (document.defaultView && document.defaultView.getComputedStyle) {
        getComputedStyle = function (elem, newName, name) {
            var ret, defaultView, computedStyle;
            name = name.replace(rupper, "-$1").toLowerCase();
            if (!(defaultView = elem.ownerDocument.defaultView)) {
                return undefined;
            }
            if ((computedStyle = defaultView.getComputedStyle(elem, null))) {
                ret = computedStyle.getPropertyValue(name);
                if (ret === "" && !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
                    ret = jQuery.style(elem, name);
                }
            }
            return ret;
        };
    }
    if (document.documentElement.currentStyle) {
        currentStyle = function (elem, name) {
            var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name],
                style = elem.style;
            if (!rnumpx.test(ret) && rnum.test(ret)) {
                left = style.left;
                rsLeft = elem.runtimeStyle.left;
                elem.runtimeStyle.left = elem.currentStyle.left;
                style.left = name === "fontSize" ? "1em" : (ret || 0);
                ret = style.pixelLeft + "px";
                style.left = left;
                elem.runtimeStyle.left = rsLeft;
            }
            return ret === "" ? "auto" : ret;
        };
    }
    curCSS = getComputedStyle || currentStyle;

    function getWH(elem, name, extra) {
        var which = name === "width" ? cssWidth : cssHeight,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight;
        if (extra === "border") {
            return val;
        }
        jQuery.each(which, function () {
            if (!extra) {
                val -= parseFloat(jQuery.css(elem, "padding" + this)) || 0;
            }
            if (extra === "margin") {
                val += parseFloat(jQuery.css(elem, "margin" + this)) || 0;
            } else {
                val -= parseFloat(jQuery.css(elem, "border" + this + "Width")) || 0;
            }
        });
        return val;
    }
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function (elem) {
            var width = elem.offsetWidth,
                height = elem.offsetHeight;
            return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css(elem, "display")) === "none");
        };
        jQuery.expr.filters.visible = function (elem) {
            return !jQuery.expr.filters.hidden(elem);
        };
    }
    var jsc = jQuery.now(),
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        rselectTextarea = /^(?:select|textarea)/i,
        rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        rnoContent = /^(?:GET|HEAD)$/,
        rbracket = /\[\]$/,
        jsre = /\=\?(&|$)/,
        rquery = /\?/,
        rts = /([?&])_=[^&]*/,
        rurl = /^(\w+:)?\/\/([^\/?#]+)/,
        r20 = /%20/g,
        rhash = /#.*$/,
        _load = jQuery.fn.load;
    jQuery.fn.extend({
        load: function (url, params, callback) {
            if (typeof url !== "string" && _load) {
                return _load.apply(this, arguments);
            } else {
                if (!this.length) {
                    return this;
                }
            }
            var off = url.indexOf(" ");
            if (off >= 0) {
                var selector = url.slice(off, url.length);
                url = url.slice(0, off);
            }
            var type = "GET";
            if (params) {
                if (jQuery.isFunction(params)) {
                    callback = params;
                    params = null;
                } else {
                    if (typeof params === "object") {
                        params = jQuery.param(params, jQuery.ajaxSettings.traditional);
                        type = "POST";
                    }
                }
            }
            var self = this;
            jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params,
                complete: function (res, status) {
                    if (status === "success" || status === "notmodified") {
                        self.html(selector ? jQuery("<div>").append(res.responseText.replace(rscript, "")).find(selector) : res.responseText);
                    }
                    if (callback) {
                        self.each(callback, [res.responseText, status, res]);
                    }
                }
            });
            return this;
        },
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? jQuery.makeArray(this.elements) : this;
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
            }).map(function (i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val, i) {
                    return {
                        name: elem.name,
                        value: val
                    };
                }) : {
                    name: elem.name,
                    value: val
                };
            }).get();
        }
    });
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (i, o) {
        jQuery.fn[o] = function (f) {
            return this.bind(o, f);
        };
    });
    jQuery.extend({
        get: function (url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = null;
            }
            return jQuery.ajax({
                type: "GET",
                url: url,
                data: data,
                success: callback,
                dataType: type
            });
        },
        getScript: function (url, callback) {
            return jQuery.get(url, null, callback, "script");
        },
        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        post: function (url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = {};
            }
            return jQuery.ajax({
                type: "POST",
                url: url,
                data: data,
                success: callback,
                dataType: type
            });
        },
        ajaxSetup: function (settings) {
            jQuery.extend(jQuery.ajaxSettings, settings);
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: function () {
                return new window.XMLHttpRequest();
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        ajax: function (origSettings) {
            var s = jQuery.extend(true, {}, jQuery.ajaxSettings, origSettings),
                jsonp, status, data, type = s.type.toUpperCase(),
                noContent = rnoContent.test(type);
            s.url = s.url.replace(rhash, "");
            s.context = origSettings && origSettings.context != null ? origSettings.context : s;
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            if (s.dataType === "jsonp") {
                if (type === "GET") {
                    if (!jsre.test(s.url)) {
                        s.url += (rquery.test(s.url) ? "&" : "?") + (s.jsonp || "callback") + "=?";
                    }
                } else {
                    if (!s.data || !jsre.test(s.data)) {
                        s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
                    }
                }
                s.dataType = "json";
            }
            if (s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url))) {
                jsonp = s.jsonpCallback || ("jsonp" + jsc++);
                if (s.data) {
                    s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
                }
                s.url = s.url.replace(jsre, "=" + jsonp + "$1");
                s.dataType = "script";
                var customJsonp = window[jsonp];
                window[jsonp] = function (tmp) {
                    if (jQuery.isFunction(customJsonp)) {
                        customJsonp(tmp);
                    } else {
                        window[jsonp] = undefined;
                        try {
                            delete window[jsonp];
                        } catch (jsonpError) {}
                    }
                    data = tmp;
                    jQuery.handleSuccess(s, xhr, status, data);
                    jQuery.handleComplete(s, xhr, status, data);
                    if (head) {
                        head.removeChild(script);
                    }
                };
            }
            if (s.dataType === "script" && s.cache === null) {
                s.cache = false;
            }
            if (s.cache === false && noContent) {
                var ts = jQuery.now();
                var ret = s.url.replace(rts, "$1_=" + ts);
                s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
            }
            if (s.data && noContent) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
            }
            if (s.global && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            var parts = rurl.exec(s.url),
                remote = parts && (parts[1] && parts[1].toLowerCase() !== location.protocol || parts[2].toLowerCase() !== location.host);
            if (s.dataType === "script" && type === "GET" && remote) {
                var head = document.getElementsByTagName("head")[0] || document.documentElement;
                var script = document.createElement("script");
                if (s.scriptCharset) {
                    script.charset = s.scriptCharset;
                }
                script.src = s.url;
                if (!jsonp) {
                    var done = false;
                    script.onload = script.onreadystatechange = function () {
                        if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                            done = true;
                            jQuery.handleSuccess(s, xhr, status, data);
                            jQuery.handleComplete(s, xhr, status, data);
                            script.onload = script.onreadystatechange = null;
                            if (head && script.parentNode) {
                                head.removeChild(script);
                            }
                        }
                    };
                }
                head.insertBefore(script, head.firstChild);
                return undefined;
            }
            var requestDone = false;
            var xhr = s.xhr();
            if (!xhr) {
                return;
            }
            if (s.username) {
                xhr.open(type, s.url, s.async, s.username, s.password);
            } else {
                xhr.open(type, s.url, s.async);
            }
            try {
                if ((s.data != null && !noContent) || (origSettings && origSettings.contentType)) {
                    xhr.setRequestHeader("Content-Type", s.contentType);
                }
                if (s.ifModified) {
                    if (jQuery.lastModified[s.url]) {
                        xhr.setRequestHeader("If-Modified-Since", jQuery.lastModified[s.url]);
                    }
                    if (jQuery.etag[s.url]) {
                        xhr.setRequestHeader("If-None-Match", jQuery.etag[s.url]);
                    }
                }
                if (!remote) {
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                }
                xhr.setRequestHeader("Accept", s.dataType && s.accepts[s.dataType] ? s.accepts[s.dataType] + ", */*; q=0.01" : s.accepts._default);
            } catch (headerError) {}
            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global && jQuery.active-- === 1) {
                    jQuery.event.trigger("ajaxStop");
                }
                xhr.abort();
                return false;
            }
            if (s.global) {
                jQuery.triggerGlobal(s, "ajaxSend", [xhr, s]);
            }
            var onreadystatechange = xhr.onreadystatechange = function (isTimeout) {
                if (!xhr || xhr.readyState === 0 || isTimeout === "abort") {
                    if (!requestDone) {
                        jQuery.handleComplete(s, xhr, status, data);
                    }
                    requestDone = true;
                    if (xhr) {
                        xhr.onreadystatechange = jQuery.noop;
                    }
                } else {
                    if (!requestDone && xhr && (xhr.readyState === 4 || isTimeout === "timeout")) {
                        requestDone = true;
                        xhr.onreadystatechange = jQuery.noop;
                        status = isTimeout === "timeout" ? "timeout" : !jQuery.httpSuccess(xhr) ? "error" : s.ifModified && jQuery.httpNotModified(xhr, s.url) ? "notmodified" : "success";
                        var errMsg;
                        if (status === "success") {
                            try {
                                data = jQuery.httpData(xhr, s.dataType, s);
                            } catch (parserError) {
                                status = "parsererror";
                                errMsg = parserError;
                            }
                        }
                        if (status === "success" || status === "notmodified") {
                            if (!jsonp) {
                                jQuery.handleSuccess(s, xhr, status, data);
                            }
                        } else {
                            jQuery.handleError(s, xhr, status, errMsg);
                        }
                        if (!jsonp) {
                            jQuery.handleComplete(s, xhr, status, data);
                        }
                        if (isTimeout === "timeout") {
                            xhr.abort();
                        }
                        if (s.async) {
                            xhr = null;
                        }
                    }
                }
            };
            try {
                var oldAbort = xhr.abort;
                xhr.abort = function () {
                    if (xhr) {
                        Function.prototype.call.call(oldAbort, xhr);
                    }
                    onreadystatechange("abort");
                };
            } catch (abortError) {}
            if (s.async && s.timeout > 0) {
                setTimeout(function () {
                    if (xhr && !requestDone) {
                        onreadystatechange("timeout");
                    }
                }, s.timeout);
            }
            try {
                xhr.send(noContent || s.data == null ? null : s.data);
            } catch (sendError) {
                jQuery.handleError(s, xhr, null, sendError);
                jQuery.handleComplete(s, xhr, status, data);
            }
            if (!s.async) {
                onreadystatechange();
            }
            return xhr;
        },
        param: function (a, traditional) {
            var s = [],
                add = function (key, value) {
                    value = jQuery.isFunction(value) ? value() : value;
                    s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                };
            if (traditional === undefined) {
                traditional = jQuery.ajaxSettings.traditional;
            }
            if (jQuery.isArray(a) || a.jquery) {
                jQuery.each(a, function () {
                    add(this.name, this.value);
                });
            } else {
                for (var prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add);
                }
            }
            return s.join("&").replace(r20, "+");
        }
    });

    function buildParams(prefix, obj, traditional, add) {
        if (jQuery.isArray(obj) && obj.length) {
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" || jQuery.isArray(v) ? i : "") + "]", v, traditional, add);
                }
            });
        } else {
            if (!traditional && obj != null && typeof obj === "object") {
                if (jQuery.isEmptyObject(obj)) {
                    add(prefix, "");
                } else {
                    jQuery.each(obj, function (k, v) {
                        buildParams(prefix + "[" + k + "]", v, traditional, add);
                    });
                }
            } else {
                add(prefix, obj);
            }
        }
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        handleError: function (s, xhr, status, e) {
            if (s.error) {
                s.error.call(s.context, xhr, status, e);
            }
            if (s.global) {
                jQuery.triggerGlobal(s, "ajaxError", [xhr, s, e]);
            }
        },
        handleSuccess: function (s, xhr, status, data) {
            if (s.success) {
                s.success.call(s.context, data, status, xhr);
            }
            if (s.global) {
                jQuery.triggerGlobal(s, "ajaxSuccess", [xhr, s]);
            }
        },
        handleComplete: function (s, xhr, status) {
            if (s.complete) {
                s.complete.call(s.context, xhr, status);
            }
            if (s.global) {
                jQuery.triggerGlobal(s, "ajaxComplete", [xhr, s]);
            }
            if (s.global && jQuery.active-- === 1) {
                jQuery.event.trigger("ajaxStop");
            }
        },
        triggerGlobal: function (s, type, args) {
            (s.context && s.context.url == null ? jQuery(s.context) : jQuery.event).trigger(type, args);
        },
        httpSuccess: function (xhr) {
            try {
                return !xhr.status && location.protocol === "file:" || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 1223;
            } catch (e) {}
            return false;
        },
        httpNotModified: function (xhr, url) {
            var lastModified = xhr.getResponseHeader("Last-Modified"),
                etag = xhr.getResponseHeader("Etag");
            if (lastModified) {
                jQuery.lastModified[url] = lastModified;
            }
            if (etag) {
                jQuery.etag[url] = etag;
            }
            return xhr.status === 304;
        },
        httpData: function (xhr, type, s) {
            var ct = xhr.getResponseHeader("content-type") || "",
                xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
                data = xml ? xhr.responseXML : xhr.responseText;
            if (xml && data.documentElement.nodeName === "parsererror") {
                jQuery.error("parsererror");
            }
            if (s && s.dataFilter) {
                data = s.dataFilter(data, type);
            }
            if (typeof data === "string") {
                if (type === "json" || !type && ct.indexOf("json") >= 0) {
                    data = jQuery.parseJSON(data);
                } else {
                    if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                        jQuery.globalEval(data);
                    }
                }
            }
            return data;
        }
    });
    if (window.ActiveXObject) {
        jQuery.ajaxSettings.xhr = function () {
            if (window.location.protocol !== "file:") {
                try {
                    return new window.XMLHttpRequest();
                } catch (xhrError) {}
            }
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            } catch (activeError) {}
        };
    }
    jQuery.support.ajax = !!jQuery.ajaxSettings.xhr();
    var elemdisplay = {},
        rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = /^([+\-]=)?([\d+.\-]+)(.*)$/,
        timerId, fxAttrs = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];
    jQuery.fn.extend({
        show: function (speed, easing, callback) {
            var elem, display;
            if (speed || speed === 0) {
                return this.animate(genFx("show", 3), speed, easing, callback);
            } else {
                for (var i = 0, j = this.length; i < j; i++) {
                    elem = this[i];
                    display = elem.style.display;
                    if (!jQuery.data(elem, "olddisplay") && display === "none") {
                        display = elem.style.display = "";
                    }
                    if (display === "" && jQuery.css(elem, "display") === "none") {
                        jQuery.data(elem, "olddisplay", defaultDisplay(elem.nodeName));
                    }
                }
                for (i = 0; i < j; i++) {
                    elem = this[i];
                    display = elem.style.display;
                    if (display === "" || display === "none") {
                        elem.style.display = jQuery.data(elem, "olddisplay") || "";
                    }
                }
                return this;
            }
        },
        hide: function (speed, easing, callback) {
            if (speed || speed === 0) {
                return this.animate(genFx("hide", 3), speed, easing, callback);
            } else {
                for (var i = 0, j = this.length; i < j; i++) {
                    var display = jQuery.css(this[i], "display");
                    if (display !== "none") {
                        jQuery.data(this[i], "olddisplay", display);
                    }
                }
                for (i = 0; i < j; i++) {
                    this[i].style.display = "none";
                }
                return this;
            }
        },
        _toggle: jQuery.fn.toggle,
        toggle: function (fn, fn2, callback) {
            var bool = typeof fn === "boolean";
            if (jQuery.isFunction(fn) && jQuery.isFunction(fn2)) {
                this._toggle.apply(this, arguments);
            } else {
                if (fn == null || bool) {
                    this.each(function () {
                        var state = bool ? fn : jQuery(this).is(":hidden");
                        jQuery(this)[state ? "show" : "hide"]();
                    });
                } else {
                    this.animate(genFx("toggle", 3), fn, fn2, callback);
                }
            }
            return this;
        },
        fadeTo: function (speed, to, easing, callback) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function (prop, speed, easing, callback) {
            var optall = jQuery.speed(speed, easing, callback);
            if (jQuery.isEmptyObject(prop)) {
                return this.each(optall.complete);
            }
            return this[optall.queue === false ? "each" : "queue"](function () {
                var opt = jQuery.extend({}, optall),
                    p, isElement = this.nodeType === 1,
                    hidden = isElement && jQuery(this).is(":hidden"),
                    self = this;
                for (p in prop) {
                    var name = jQuery.camelCase(p);
                    if (p !== name) {
                        prop[name] = prop[p];
                        delete prop[p];
                        p = name;
                    }
                    if (prop[p] === "hide" && hidden || prop[p] === "show" && !hidden) {
                        return opt.complete.call(this);
                    }
                    if (isElement && (p === "height" || p === "width")) {
                        opt.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (jQuery.css(this, "display") === "inline" && jQuery.css(this, "float") === "none") {
                            if (!jQuery.support.inlineBlockNeedsLayout) {
                                this.style.display = "inline-block";
                            } else {
                                var display = defaultDisplay(this.nodeName);
                                if (display === "inline") {
                                    this.style.display = "inline-block";
                                } else {
                                    this.style.display = "inline";
                                    this.style.zoom = 1;
                                }
                            }
                        }
                    }
                    if (jQuery.isArray(prop[p])) {
                        (opt.specialEasing = opt.specialEasing || {})[p] = prop[p][1];
                        prop[p] = prop[p][0];
                    }
                }
                if (opt.overflow != null) {
                    this.style.overflow = "hidden";
                }
                opt.curAnim = jQuery.extend({}, prop);
                jQuery.each(prop, function (name, val) {
                    var e = new jQuery.fx(self, opt, name);
                    if (rfxtypes.test(val)) {
                        e[val === "toggle" ? hidden ? "show" : "hide" : val](prop);
                    } else {
                        var parts = rfxnum.exec(val),
                            start = e.cur() || 0;
                        if (parts) {
                            var end = parseFloat(parts[2]),
                                unit = parts[3] || "px";
                            if (unit !== "px") {
                                jQuery.style(self, name, (end || 1) + unit);
                                start = ((end || 1) / e.cur()) * start;
                                jQuery.style(self, name, start + unit);
                            }
                            if (parts[1]) {
                                end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
                            }
                            e.custom(start, end, unit);
                        } else {
                            e.custom(start, val, "");
                        }
                    }
                });
                return true;
            });
        },
        stop: function (clearQueue, gotoEnd) {
            var timers = jQuery.timers;
            if (clearQueue) {
                this.queue([]);
            }
            this.each(function () {
                for (var i = timers.length - 1; i >= 0; i--) {
                    if (timers[i].elem === this) {
                        if (gotoEnd) {
                            timers[i](true);
                        }
                        timers.splice(i, 1);
                    }
                }
            });
            if (!gotoEnd) {
                this.dequeue();
            }
            return this;
        }
    });

    function genFx(type, num) {
        var obj = {};
        jQuery.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)), function () {
            obj[this] = type;
        });
        return obj;
    }
    jQuery.each({
        slideDown: genFx("show", 1),
        slideUp: genFx("hide", 1),
        slideToggle: genFx("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (name, props) {
        jQuery.fn[name] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.extend({
        speed: function (speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
            opt.old = opt.complete;
            opt.complete = function () {
                if (opt.queue !== false) {
                    jQuery(this).dequeue();
                }
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this);
                }
            };
            return opt;
        },
        easing: {
            linear: function (p, n, firstNum, diff) {
                return firstNum + diff * p;
            },
            swing: function (p, n, firstNum, diff) {
                return ((-Math.cos(p * Math.PI) / 2) + 0.5) * diff + firstNum;
            }
        },
        timers: [],
        fx: function (elem, options, prop) {
            this.options = options;
            this.elem = elem;
            this.prop = prop;
            if (!options.orig) {
                options.orig = {};
            }
        }
    });
    jQuery.fx.prototype = {
        update: function () {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }(jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this);
        },
        cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop];
            }
            var r = parseFloat(jQuery.css(this.elem, this.prop));
            return r && r > -10000 ? r : 0;
        },
        custom: function (from, to, unit) {
            var self = this,
                fx = jQuery.fx;
            this.startTime = jQuery.now();
            this.start = from;
            this.end = to;
            this.unit = unit || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;

            function t(gotoEnd) {
                return self.step(gotoEnd);
            }
            t.elem = this.elem;
            if (t() && jQuery.timers.push(t) && !timerId) {
                timerId = setInterval(fx.tick, fx.interval);
            }
        },
        show: function () {
            this.options.orig[this.prop] = jQuery.style(this.elem, this.prop);
            this.options.show = true;
            this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            jQuery(this.elem).show();
        },
        hide: function () {
            this.options.orig[this.prop] = jQuery.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0);
        },
        step: function (gotoEnd) {
            var t = jQuery.now(),
                done = true;
            if (gotoEnd || t >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                for (var i in this.options.curAnim) {
                    if (this.options.curAnim[i] !== true) {
                        done = false;
                    }
                }
                if (done) {
                    if (this.options.overflow != null && !jQuery.support.shrinkWrapBlocks) {
                        var elem = this.elem,
                            options = this.options;
                        jQuery.each(["", "X", "Y"], function (index, value) {
                            elem.style["overflow" + value] = options.overflow[index];
                        });
                    }
                    if (this.options.hide) {
                        jQuery(this.elem).hide();
                    }
                    if (this.options.hide || this.options.show) {
                        for (var p in this.options.curAnim) {
                            jQuery.style(this.elem, p, this.options.orig[p]);
                        }
                    }
                    this.options.complete.call(this.elem);
                }
                return false;
            } else {
                var n = t - this.startTime;
                this.state = n / this.options.duration;
                var specialEasing = this.options.specialEasing && this.options.specialEasing[this.prop];
                var defaultEasing = this.options.easing || (jQuery.easing.swing ? "swing" : "linear");
                this.pos = jQuery.easing[specialEasing || defaultEasing](this.state, n, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update();
            }
            return true;
        }
    };
    jQuery.extend(jQuery.fx, {
        tick: function () {
            var timers = jQuery.timers;
            for (var i = 0; i < timers.length; i++) {
                if (!timers[i]()) {
                    timers.splice(i--, 1);
                }
            }
            if (!timers.length) {
                jQuery.fx.stop();
            }
        },
        interval: 13,
        stop: function () {
            clearInterval(timerId);
            timerId = null;
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (fx) {
                jQuery.style(fx.elem, "opacity", fx.now);
            },
            _default: function (fx) {
                if (fx.elem.style && fx.elem.style[fx.prop] != null) {
                    fx.elem.style[fx.prop] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
                } else {
                    fx.elem[fx.prop] = fx.now;
                }
            }
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function (elem) {
            return jQuery.grep(jQuery.timers, function (fn) {
                return elem === fn.elem;
            }).length;
        };
    }

    function defaultDisplay(nodeName) {
        if (!elemdisplay[nodeName]) {
            var elem = jQuery("<" + nodeName + ">").appendTo("body"),
                display = elem.css("display");
            elem.remove();
            if (display === "none" || display === "") {
                display = "block";
            }
            elemdisplay[nodeName] = display;
        }
        return elemdisplay[nodeName];
    }
    var rtable = /^t(?:able|d|h)$/i,
        rroot = /^(?:body|html)$/i;
    if ("getBoundingClientRect" in document.documentElement) {
        jQuery.fn.offset = function (options) {
            var elem = this[0],
                box;
            if (options) {
                return this.each(function (i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            if (!elem || !elem.ownerDocument) {
                return null;
            }
            if (elem === elem.ownerDocument.body) {
                return jQuery.offset.bodyOffset(elem);
            }
            try {
                box = elem.getBoundingClientRect();
            } catch (e) {}
            var doc = elem.ownerDocument,
                docElem = doc.documentElement;
            if (!box || !jQuery.contains(docElem, elem)) {
                return box || {
                    top: 0,
                    left: 0
                };
            }
            var body = doc.body,
                win = getWindow(doc),
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                scrollTop = (win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop || body.scrollTop),
                scrollLeft = (win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft),
                top = box.top + scrollTop - clientTop,
                left = box.left + scrollLeft - clientLeft;
            return {
                top: top,
                left: left
            };
        };
    } else {
        jQuery.fn.offset = function (options) {
            var elem = this[0];
            if (options) {
                return this.each(function (i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            if (!elem || !elem.ownerDocument) {
                return null;
            }
            if (elem === elem.ownerDocument.body) {
                return jQuery.offset.bodyOffset(elem);
            }
            jQuery.offset.initialize();
            var computedStyle, offsetParent = elem.offsetParent,
                prevOffsetParent = elem,
                doc = elem.ownerDocument,
                docElem = doc.documentElement,
                body = doc.body,
                defaultView = doc.defaultView,
                prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle,
                top = elem.offsetTop,
                left = elem.offsetLeft;
            while ((elem = elem.parentNode) && elem !== body && elem !== docElem) {
                if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
                    break;
                }
                computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
                top -= elem.scrollTop;
                left -= elem.scrollLeft;
                if (elem === offsetParent) {
                    top += elem.offsetTop;
                    left += elem.offsetLeft;
                    if (jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName))) {
                        top += parseFloat(computedStyle.borderTopWidth) || 0;
                        left += parseFloat(computedStyle.borderLeftWidth) || 0;
                    }
                    prevOffsetParent = offsetParent;
                    offsetParent = elem.offsetParent;
                }
                if (jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
                    top += parseFloat(computedStyle.borderTopWidth) || 0;
                    left += parseFloat(computedStyle.borderLeftWidth) || 0;
                }
                prevComputedStyle = computedStyle;
            }
            if (prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
                top += body.offsetTop;
                left += body.offsetLeft;
            }
            if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
                top += Math.max(docElem.scrollTop, body.scrollTop);
                left += Math.max(docElem.scrollLeft, body.scrollLeft);
            }
            return {
                top: top,
                left: left
            };
        };
    }
    jQuery.offset = {
        initialize: function () {
            var body = document.body,
                container = document.createElement("div"),
                innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat(jQuery.css(body, "marginTop")) || 0,
                html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            jQuery.extend(container.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            container.innerHTML = html;
            body.insertBefore(container, body.firstChild);
            innerDiv = container.firstChild;
            checkDiv = innerDiv.firstChild;
            td = innerDiv.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (td.offsetTop === 5);
            checkDiv.style.position = "fixed";
            checkDiv.style.top = "20px";
            this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
            checkDiv.style.position = checkDiv.style.top = "";
            innerDiv.style.overflow = "hidden";
            innerDiv.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);
            this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);
            body.removeChild(container);
            body = container = innerDiv = checkDiv = table = td = null;
            jQuery.offset.initialize = jQuery.noop;
        },
        bodyOffset: function (body) {
            var top = body.offsetTop,
                left = body.offsetLeft;
            jQuery.offset.initialize();
            if (jQuery.offset.doesNotIncludeMarginInBodyOffset) {
                top += parseFloat(jQuery.css(body, "marginTop")) || 0;
                left += parseFloat(jQuery.css(body, "marginLeft")) || 0;
            }
            return {
                top: top,
                left: left
            };
        },
        setOffset: function (elem, options, i) {
            var position = jQuery.css(elem, "position");
            if (position === "static") {
                elem.style.position = "relative";
            }
            var curElem = jQuery(elem),
                curOffset = curElem.offset(),
                curCSSTop = jQuery.css(elem, "top"),
                curCSSLeft = jQuery.css(elem, "left"),
                calculatePosition = (position === "absolute" && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1),
                props = {},
                curPosition = {},
                curTop, curLeft;
            if (calculatePosition) {
                curPosition = curElem.position();
            }
            curTop = calculatePosition ? curPosition.top : parseInt(curCSSTop, 10) || 0;
            curLeft = calculatePosition ? curPosition.left : parseInt(curCSSLeft, 10) || 0;
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }
            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        position: function () {
            if (!this[0]) {
                return null;
            }
            var elem = this[0],
                offsetParent = this.offsetParent(),
                offset = this.offset(),
                parentOffset = rroot.test(offsetParent[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : offsetParent.offset();
            offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
            offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
            parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
            parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;
            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            };
        },
        offsetParent: function () {
            return this.map(function () {
                var offsetParent = this.offsetParent || document.body;
                while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent;
            });
        }
    });
    jQuery.each(["Left", "Top"], function (i, name) {
        var method = "scroll" + name;
        jQuery.fn[method] = function (val) {
            var elem = this[0],
                win;
            if (!elem) {
                return null;
            }
            if (val !== undefined) {
                return this.each(function () {
                    win = getWindow(this);
                    if (win) {
                        win.scrollTo(!i ? val : jQuery(win).scrollLeft(), i ? val : jQuery(win).scrollTop());
                    } else {
                        this[method] = val;
                    }
                });
            } else {
                win = getWindow(elem);
                return win ? ("pageXOffset" in win) ? win[i ? "pageYOffset" : "pageXOffset"] : jQuery.support.boxModel && win.document.documentElement[method] || win.document.body[method] : elem[method];
            }
        };
    });

    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    jQuery.each(["Height", "Width"], function (i, name) {
        var type = name.toLowerCase();
        jQuery.fn["inner" + name] = function () {
            return this[0] ? parseFloat(jQuery.css(this[0], type, "padding")) : null;
        };
        jQuery.fn["outer" + name] = function (margin) {
            return this[0] ? parseFloat(jQuery.css(this[0], type, margin ? "margin" : "border")) : null;
        };
        jQuery.fn[type] = function (size) {
            var elem = this[0];
            if (!elem) {
                return size == null ? null : this;
            }
            if (jQuery.isFunction(size)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    self[type](size.call(this, i, self[type]()));
                });
            }
            if (jQuery.isWindow(elem)) {
                return elem.document.compatMode === "CSS1Compat" && elem.document.documentElement["client" + name] || elem.document.body["client" + name];
            } else {
                if (elem.nodeType === 9) {
                    return Math.max(elem.documentElement["client" + name], elem.body["scroll" + name], elem.documentElement["scroll" + name], elem.body["offset" + name], elem.documentElement["offset" + name]);
                } else {
                    if (size === undefined) {
                        var orig = jQuery.css(elem, type),
                            ret = parseFloat(orig);
                        return jQuery.isNaN(ret) ? orig : ret;
                    } else {
                        return this.css(type, typeof size === "string" ? size : size + "px");
                    }
                }
            }
        };
    });
})(window);
(function ($) {
    function toIntegersAtLease(n) {
        return n < 10 ? "0" + n : n;
    }
    Date.prototype.toJSON = function (date) {
        return this.getUTCFullYear() + "-" + toIntegersAtLease(this.getUTCMonth()) + "-" + toIntegersAtLease(this.getUTCDate());
    };
    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    var meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    $.quoteString = function (string) {
        if (escapeable.test(string)) {
            return '"' + string.replace(escapeable, function (a) {
                var c = meta[a];
                if (typeof c === "string") {
                    return c;
                }
                c = a.charCodeAt();
                return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };
    $.toJSON = function (o, compact) {
        var type = typeof (o);
        if (type == "undefined") {
            return "undefined";
        } else {
            if (type == "number" || type == "boolean") {
                return o + "";
            } else {
                if (o === null) {
                    return "null";
                }
            }
        }
        if (type == "string") {
            return $.quoteString(o);
        }
        if (type == "object" && typeof o.toJSON == "function") {
            return o.toJSON(compact);
        }
        if (type != "function" && typeof (o.length) == "number") {
            var ret = [];
            for (var i = 0; i < o.length; i++) {
                ret.push($.toJSON(o[i], compact));
            }
            if (compact) {
                return "[" + ret.join(",") + "]";
            } else {
                return "[" + ret.join(", ") + "]";
            }
        }
        if (type == "function") {
            throw new TypeError("Unable to convert object of type 'function' to json.");
        }
        var ret = [];
        for (var k in o) {
            var name;
            type = typeof (k);
            if (type == "number") {
                name = '"' + k + '"';
            } else {
                if (type == "string") {
                    name = $.quoteString(k);
                } else {
                    continue;
                }
            }
            var val = $.toJSON(o[k], compact);
            if (typeof (val) != "string") {
                continue;
            }
            if (compact) {
                ret.push(name + ":" + val);
            } else {
                ret.push(name + ": " + val);
            }
        }
        return "{" + ret.join(", ") + "}";
    };
    $.compactJSON = function (o) {
        return $.toJSON(o, true);
    };
    $.evalJSON = function (src) {
        return eval("(" + src + ")");
    };
    $.secureEvalJSON = function (src) {
        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, "@");
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]");
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, "");
        if (/^[\],:{}\s]*$/.test(filtered)) {
            return eval("(" + src + ")");
        } else {
            throw new SyntaxError("Error parsing JSON, source is not valid.");
        }
    };
})(jQuery);
(function ($) {
    var DEFAULT_SETTINGS = {
        method: "GET",
        queryParam: "q",
        searchDelay: 300,
        minChars: 0,
        propertyToSearch: "name",
        jsonContainer: null,
        contentType: "json",
        excludeCurrent: false,
        excludeCurrentParameter: "x",
        useCache: false,
        prePopulate: null,
        processPrePopulate: false,
        hintText: "Type in a search term",
        noResultsText: "No results",
        searchingText: "Searching...",
        deleteText: "&#215;",
        animateDropdown: true,
        placeholder: null,
        theme: null,
        zindex: 999,
        resultsLimit: null,
        enableHTML: false,
        resultsFormatter: function (item) {
            var string = item[this.propertyToSearch];
            return "<li>" + (this.enableHTML ? string : _escapeHTML(string)) + "</li>";
        },
        tokenFormatter: function (item) {
            var string = item[this.propertyToSearch];
            return "<li><p>" + (this.enableHTML ? string : _escapeHTML(string)) + "</p></li>";
        },
        tokenLimit: null,
        tokenDelimiter: ",",
        preventDuplicates: false,
        tokenValue: "id",
        allowFreeTagging: false,
        allowTabOut: false,
        autoSelectFirstResult: false,
        onResult: null,
        onCachedResult: null,
        onAdd: null,
        onFreeTaggingAdd: null,
        onDelete: null,
        onReady: null,
        idPrefix: "token-input-",
        disabled: false
    };
    var DEFAULT_CLASSES = {
        tokenList: "token-input-list",
        token: "token-input-token",
        tokenReadOnly: "token-input-token-readonly",
        tokenDelete: "token-input-delete-token",
        selectedToken: "token-input-selected-token",
        highlightedToken: "token-input-highlighted-token",
        dropdown: "token-input-dropdown",
        dropdownItem: "token-input-dropdown-item",
        dropdownItem2: "token-input-dropdown-item2",
        selectedDropdownItem: "token-input-selected-dropdown-item",
        inputToken: "token-input-input-token",
        focused: "token-input-focused",
        disabled: "token-input-disabled"
    };
    var POSITION = {
        BEFORE: 0,
        AFTER: 1,
        END: 2
    };
    var KEY = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        ESCAPE: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        NUMPAD_ENTER: 108,
        COMMA: 188
    };
    var HTML_ESCAPES = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;"
    };
    var HTML_ESCAPE_CHARS = /[&<>"'\/]/g;

    function coerceToString(val) {
        return String((val === null || val === undefined) ? "" : val);
    }

    function _escapeHTML(text) {
        return coerceToString(text).replace(HTML_ESCAPE_CHARS, function (match) {
            return HTML_ESCAPES[match];
        });
    }
    var methods = {
        init: function (url_or_data_or_function, options) {
            var settings = $.extend({}, DEFAULT_SETTINGS, options || {});
            return this.each(function () {
                $(this).data("settings", settings);
                $(this).data("tokenInputObject", new $.TokenList(this, url_or_data_or_function, settings));
            });
        },
        clear: function () {
            this.data("tokenInputObject").clear();
            return this;
        },
        add: function (item) {
            this.data("tokenInputObject").add(item);
            return this;
        },
        remove: function (item) {
            this.data("tokenInputObject").remove(item);
            return this;
        },
        get: function () {
            return this.data("tokenInputObject").getTokens();
        },
        toggleDisabled: function (disable) {
            this.data("tokenInputObject").toggleDisabled(disable);
            return this;
        },
        setOptions: function (options) {
            $(this).data("settings", $.extend({}, $(this).data("settings"), options || {}));
            return this;
        },
        destroy: function () {
            if (this.data("tokenInputObject")) {
                this.data("tokenInputObject").clear();
                var tmpInput = this;
                var closest = this.parent();
                closest.empty();
                tmpInput.show();
                closest.append(tmpInput);
                return tmpInput;
            }
        }
    };
    $.fn.tokenInput = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.init.apply(this, arguments);
        }
    };
    $.TokenList = function (input, url_or_data, settings) {
        if (typeof (url_or_data) === "string" || typeof (url_or_data) === "function") {
            $(input).data("settings").url = url_or_data;
            var url = computeURL();
            if ($(input).data("settings").crossDomain === undefined && typeof url === "string") {
                if (url.indexOf("://") === -1) {
                    $(input).data("settings").crossDomain = false;
                } else {
                    $(input).data("settings").crossDomain = (location.href.split(/\/+/g)[1] !== url.split(/\/+/g)[1]);
                }
            }
        } else {
            if (typeof (url_or_data) === "object") {
                $(input).data("settings").local_data = url_or_data;
            }
        }
        if ($(input).data("settings").classes) {
            $(input).data("settings").classes = $.extend({}, DEFAULT_CLASSES, $(input).data("settings").classes);
        } else {
            if ($(input).data("settings").theme) {
                $(input).data("settings").classes = {};
                $.each(DEFAULT_CLASSES, function (key, value) {
                    $(input).data("settings").classes[key] = value + "-" + $(input).data("settings").theme;
                });
            } else {
                $(input).data("settings").classes = DEFAULT_CLASSES;
            }
        }
        var saved_tokens = [];
        var token_count = 0;
        var cache = new $.TokenList.Cache();
        var timeout;
        var input_val;
        var input_box = $('<input type="text" autocomplete="false" autocapitalize="off"/>').css({
            outline: "none"
        }).attr("id", $(input).data("settings").idPrefix + input.id).focus(function () {
            if ($(input).data("settings").disabled) {
                return false;
            } else {
                if ($(input).data("settings").tokenLimit === null || $(input).data("settings").tokenLimit !== token_count) {
                    show_dropdown_hint();
                }
            }
            token_list.addClass($(input).data("settings").classes.focused);
        }).blur(function () {
            hide_dropdown();
            if ($(input).data("settings").allowFreeTagging) {
                add_freetagging_tokens();
            }
            $(this).val("");
            token_list.removeClass($(input).data("settings").classes.focused);
        }).bind("keyup keydown blur update", resize_input).keydown(function (event) {
            var previous_token;
            var next_token;
            switch (event.keyCode) {
                case KEY.LEFT:
                case KEY.RIGHT:
                case KEY.UP:
                case KEY.DOWN:
                    if (this.value.length === 0) {
                        previous_token = input_token.prev();
                        next_token = input_token.next();
                        if ((previous_token.length && previous_token.get(0) === selected_token) || (next_token.length && next_token.get(0) === selected_token)) {
                            if (event.keyCode === KEY.LEFT || event.keyCode === KEY.UP) {
                                deselect_token($(selected_token), POSITION.BEFORE);
                            } else {
                                deselect_token($(selected_token), POSITION.AFTER);
                            }
                        } else {
                            if ((event.keyCode === KEY.LEFT || event.keyCode === KEY.UP) && previous_token.length) {
                                select_token($(previous_token.get(0)));
                            } else {
                                if ((event.keyCode === KEY.RIGHT || event.keyCode === KEY.DOWN) && next_token.length) {
                                    select_token($(next_token.get(0)));
                                }
                            }
                        }
                    } else {
                        var dropdown_item = null;
                        if (event.keyCode === KEY.DOWN || event.keyCode === KEY.RIGHT) {
                            dropdown_item = $(dropdown).find("li").first();
                            if (selected_dropdown_item) {
                                dropdown_item = $(selected_dropdown_item).next();
                            }
                        } else {
                            dropdown_item = $(dropdown).find("li").last();
                            if (selected_dropdown_item) {
                                dropdown_item = $(selected_dropdown_item).prev();
                            }
                        }
                        select_dropdown_item(dropdown_item);
                    }
                    break;
                case KEY.BACKSPACE:
                    previous_token = input_token.prev();
                    if (this.value.length === 0) {
                        if (selected_token) {
                            delete_token($(selected_token));
                            hiddenInput.change();
                        } else {
                            if (previous_token.length) {
                                select_token($(previous_token.get(0)));
                            }
                        }
                        return false;
                    } else {
                        if ($(this).val().length === 1) {
                            hide_dropdown();
                        } else {
                            setTimeout(function () {
                                do_search();
                            }, 5);
                        }
                    }
                    break;
                case KEY.TAB:
                case KEY.ENTER:
                case KEY.NUMPAD_ENTER:
                case KEY.COMMA:
                    if (selected_dropdown_item) {
                        add_token($(selected_dropdown_item).data("tokeninput"));
                        hiddenInput.change();
                    } else {
                        if ($(input).data("settings").allowFreeTagging) {
                            if ($(input).data("settings").allowTabOut && $(this).val() === "") {
                                return true;
                            } else {
                                add_freetagging_tokens();
                            }
                        } else {
                            $(this).val("");
                            if ($(input).data("settings").allowTabOut) {
                                return true;
                            }
                        }
                        event.stopPropagation();
                        event.preventDefault();
                    }
                    return false;
                case KEY.ESCAPE:
                    hide_dropdown();
                    return true;
                default:
                    if (String.fromCharCode(event.which)) {
                        setTimeout(function () {
                            do_search();
                        }, 5);
                    }
                    break;
            }
        });
        if (settings.placeholder) {
            input_box.attr("placeholder", settings.placeholder);
        }
        var hiddenInput = $(input).hide().val("").focus(function () {
            focusWithTimeout(input_box);
        }).blur(function () {
            input_box.blur();
            return hiddenInput;
        });
        var selected_token = null;
        var selected_token_index = 0;
        var selected_dropdown_item = null;
        var token_list = $("<ul />").addClass($(input).data("settings").classes.tokenList).click(function (event) {
            var li = $(event.target).closest("li");
            if (li && li.get(0) && $.data(li.get(0), "tokeninput")) {
                toggle_select_token(li);
            } else {
                if (selected_token) {
                    deselect_token($(selected_token), POSITION.END);
                }
                focusWithTimeout(input_box);
            }
        }).mouseover(function (event) {
            var li = $(event.target).closest("li");
            if (li && selected_token !== this) {
                li.addClass($(input).data("settings").classes.highlightedToken);
            }
        }).mouseout(function (event) {
            var li = $(event.target).closest("li");
            if (li && selected_token !== this) {
                li.removeClass($(input).data("settings").classes.highlightedToken);
            }
        }).insertBefore(hiddenInput);
        var input_token = $("<li />").addClass($(input).data("settings").classes.inputToken).appendTo(token_list).append(input_box);
        var dropdown = $("<div/>").addClass($(input).data("settings").classes.dropdown).appendTo("body").hide();
        var input_resizer = $("<tester/>").insertAfter(input_box).css({
            position: "absolute",
            top: -9999,
            left: -9999,
            width: "auto",
            fontSize: input_box.css("fontSize"),
            fontFamily: input_box.css("fontFamily"),
            fontWeight: input_box.css("fontWeight"),
            letterSpacing: input_box.css("letterSpacing"),
            whiteSpace: "nowrap"
        });
        hiddenInput.val("");
        var li_data = $(input).data("settings").prePopulate || hiddenInput.data("pre");
        if ($(input).data("settings").processPrePopulate && $.isFunction($(input).data("settings").onResult)) {
            li_data = $(input).data("settings").onResult.call(hiddenInput, li_data);
        }
        if (li_data && li_data.length) {
            $.each(li_data, function (index, value) {
                insert_token(value);
                checkTokenLimit();
                input_box.attr("placeholder", null);
            });
        }
        if ($(input).data("settings").disabled) {
            toggleDisabled(true);
        }
        if (typeof ($(input).data("settings").onReady) === "function") {
            $(input).data("settings").onReady.call();
        }
        this.clear = function () {
            token_list.children("li").each(function () {
                if ($(this).children("input").length === 0) {
                    delete_token($(this));
                }
            });
        };
        this.add = function (item) {
            add_token(item);
        };
        this.remove = function (item) {
            token_list.children("li").each(function () {
                if ($(this).children("input").length === 0) {
                    var currToken = $(this).data("tokeninput");
                    var match = true;
                    for (var prop in item) {
                        if (item[prop] !== currToken[prop]) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        delete_token($(this));
                    }
                }
            });
        };
        this.getTokens = function () {
            return saved_tokens;
        };
        this.toggleDisabled = function (disable) {
            toggleDisabled(disable);
        };
        resize_input();

        function escapeHTML(text) {
            return $(input).data("settings").enableHTML ? text : _escapeHTML(text);
        }

        function toggleDisabled(disable) {
            if (typeof disable === "boolean") {
                $(input).data("settings").disabled = disable;
            } else {
                $(input).data("settings").disabled = !$(input).data("settings").disabled;
            }
            input_box.attr("disabled", $(input).data("settings").disabled);
            token_list.toggleClass($(input).data("settings").classes.disabled, $(input).data("settings").disabled);
            if (selected_token) {
                deselect_token($(selected_token), POSITION.END);
            }
            hiddenInput.attr("disabled", $(input).data("settings").disabled);
        }

        function checkTokenLimit() {
            if ($(input).data("settings").tokenLimit !== null && token_count >= $(input).data("settings").tokenLimit) {
                input_box.hide();
                hide_dropdown();
                return;
            }
        }

        function resize_input() {
            if (input_val === (input_val = input_box.val())) {
                return;
            }
            var width_left = token_list.width() - input_box.offset().left - token_list.offset().left;
            input_resizer.html(_escapeHTML(input_val) || _escapeHTML(settings.placeholder));
            input_box.width(Math.min(token_list.width(), Math.max(width_left, input_resizer.width() + 30)));
        }

        function add_freetagging_tokens() {
            var value = $.trim(input_box.val());
            var tokens = value.split($(input).data("settings").tokenDelimiter);
            $.each(tokens, function (i, token) {
                if (!token) {
                    return;
                }
                if ($.isFunction($(input).data("settings").onFreeTaggingAdd)) {
                    token = $(input).data("settings").onFreeTaggingAdd.call(hiddenInput, token);
                }
                var object = {};
                object[$(input).data("settings").tokenValue] = object[$(input).data("settings").propertyToSearch] = token;
                add_token(object);
            });
        }

        function insert_token(item) {
            var $this_token = $($(input).data("settings").tokenFormatter(item));
            var readonly = item.readonly === true;
            if (readonly) {
                $this_token.addClass($(input).data("settings").classes.tokenReadOnly);
            }
            $this_token.addClass($(input).data("settings").classes.token).insertBefore(input_token);
            if (!readonly) {
                $("<span>" + $(input).data("settings").deleteText + "</span>").addClass($(input).data("settings").classes.tokenDelete).appendTo($this_token).click(function () {
                    if (!$(input).data("settings").disabled) {
                        delete_token($(this).parent());
                        hiddenInput.change();
                        return false;
                    }
                });
            }
            var token_data = item;
            $.data($this_token.get(0), "tokeninput", item);
            saved_tokens = saved_tokens.slice(0, selected_token_index).concat([token_data]).concat(saved_tokens.slice(selected_token_index));
            selected_token_index++;
            update_hiddenInput(saved_tokens, hiddenInput);
            token_count += 1;
            if ($(input).data("settings").tokenLimit !== null && token_count >= $(input).data("settings").tokenLimit) {
                input_box.hide();
                hide_dropdown();
            }
            return $this_token;
        }

        function add_token(item) {
            var callback = $(input).data("settings").onAdd;
            if (token_count > 0 && $(input).data("settings").preventDuplicates) {
                var found_existing_token = null;
                token_list.children().each(function () {
                    var existing_token = $(this);
                    var existing_data = $.data(existing_token.get(0), "tokeninput");
                    if (existing_data && existing_data[settings.tokenValue] === item[settings.tokenValue]) {
                        found_existing_token = existing_token;
                        return false;
                    }
                });
                if (found_existing_token) {
                    select_token(found_existing_token);
                    input_token.insertAfter(found_existing_token);
                    focusWithTimeout(input_box);
                    return;
                }
            }
            input_box.width(1);
            if ($(input).data("settings").tokenLimit == null || token_count < $(input).data("settings").tokenLimit) {
                insert_token(item);
                input_box.attr("placeholder", null);
                checkTokenLimit();
            }
            input_box.val("");
            hide_dropdown();
            if ($.isFunction(callback)) {
                callback.call(hiddenInput, item);
            }
        }

        function select_token(token) {
            if (!$(input).data("settings").disabled) {
                token.addClass($(input).data("settings").classes.selectedToken);
                selected_token = token.get(0);
                input_box.val("");
                hide_dropdown();
            }
        }

        function deselect_token(token, position) {
            token.removeClass($(input).data("settings").classes.selectedToken);
            selected_token = null;
            if (position === POSITION.BEFORE) {
                input_token.insertBefore(token);
                selected_token_index--;
            } else {
                if (position === POSITION.AFTER) {
                    input_token.insertAfter(token);
                    selected_token_index++;
                } else {
                    input_token.appendTo(token_list);
                    selected_token_index = token_count;
                }
            }
            focusWithTimeout(input_box);
        }

        function toggle_select_token(token) {
            var previous_selected_token = selected_token;
            if (selected_token) {
                deselect_token($(selected_token), POSITION.END);
            }
            if (previous_selected_token === token.get(0)) {
                deselect_token(token, POSITION.END);
            } else {
                select_token(token);
            }
        }

        function delete_token(token) {
            var token_data = $.data(token.get(0), "tokeninput");
            var callback = $(input).data("settings").onDelete;
            var index = token.prevAll().length;
            if (index > selected_token_index) {
                index--;
            }
            token.remove();
            selected_token = null;
            focusWithTimeout(input_box);
            saved_tokens = saved_tokens.slice(0, index).concat(saved_tokens.slice(index + 1));
            if (saved_tokens.length == 0) {
                input_box.attr("placeholder", settings.placeholder);
            }
            if (index < selected_token_index) {
                selected_token_index--;
            }
            update_hiddenInput(saved_tokens, hiddenInput);
            token_count -= 1;
            if ($(input).data("settings").tokenLimit !== null) {
                input_box.show().val("");
                focusWithTimeout(input_box);
            }
            if ($.isFunction(callback)) {
                callback.call(hiddenInput, token_data);
            }
        }

        function update_hiddenInput(saved_tokens, hiddenInput) {
            var token_values = $.map(saved_tokens, function (el) {
                if (typeof $(input).data("settings").tokenValue == "function") {
                    return $(input).data("settings").tokenValue.call(this, el);
                }
                return el[$(input).data("settings").tokenValue];
            });
            hiddenInput.val(token_values.join($(input).data("settings").tokenDelimiter));
        }

        function hide_dropdown() {
            dropdown.hide().empty();
            selected_dropdown_item = null;
        }

        function show_dropdown() {
            dropdown.css({
                position: "absolute",
                top: token_list.offset().top + token_list.outerHeight(true),
                left: token_list.offset().left,
                width: token_list.width(),
                "z-index": $(input).data("settings").zindex
            }).show();
        }

        function show_dropdown_searching() {
            if ($(input).data("settings").searchingText) {
                dropdown.html("<p>" + escapeHTML($(input).data("settings").searchingText) + "</p>");
                show_dropdown();
            }
        }

        function show_dropdown_hint() {
            if ($(input).data("settings").hintText) {
                dropdown.html("<p>" + escapeHTML($(input).data("settings").hintText) + "</p>");
                show_dropdown();
            }
        }
        var regexp_special_chars = new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]", "g");

        function regexp_escape(term) {
            return term.replace(regexp_special_chars, "\\$&");
        }

        function highlight_term(value, term) {
            return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + regexp_escape(term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), function (match, p1) {
                return "<b>" + escapeHTML(p1) + "</b>";
            });
        }

        function find_value_and_highlight_term(template, value, term) {
            return template.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + regexp_escape(value) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), highlight_term(value, term));
        }

        function excludeCurrent(results) {
            if ($(input).data("settings").excludeCurrent) {
                var currentTokens = $(input).data("tokenInputObject").getTokens(),
                    trimmedList = [];
                if (currentTokens.length) {
                    $.each(results, function (index, value) {
                        var notFound = true;
                        $.each(currentTokens, function (cIndex, cValue) {
                            if (value[$(input).data("settings").propertyToSearch] == cValue[$(input).data("settings").propertyToSearch]) {
                                notFound = false;
                                return false;
                            }
                        });
                        if (notFound) {
                            trimmedList.push(value);
                        }
                    });
                    results = trimmedList;
                }
            }
            return results;
        }

        function populateDropdown(query, results) {
            results = excludeCurrent(results);
            if (results && results.length) {
                dropdown.empty();
                var dropdown_ul = $("<ul/>").appendTo(dropdown).mouseover(function (event) {
                    select_dropdown_item($(event.target).closest("li"));
                }).mousedown(function (event) {
                    add_token($(event.target).closest("li").data("tokeninput"));
                    hiddenInput.change();
                    return false;
                }).hide();
                if ($(input).data("settings").resultsLimit && results.length > $(input).data("settings").resultsLimit) {
                    results = results.slice(0, $(input).data("settings").resultsLimit);
                }
                $.each(results, function (index, value) {
                    var this_li = $(input).data("settings").resultsFormatter(value);
                    this_li = find_value_and_highlight_term(this_li, value["name"], query);
                    this_li = find_value_and_highlight_term(this_li, value["id"], query);
                    this_li = $(this_li).appendTo(dropdown_ul);
                    if (index % 2) {
                        this_li.addClass($(input).data("settings").classes.dropdownItem);
                    } else {
                        this_li.addClass($(input).data("settings").classes.dropdownItem2);
                    }
                    if (index === 0 && $(input).data("settings").autoSelectFirstResult) {
                        select_dropdown_item(this_li);
                    }
                    $.data(this_li.get(0), "tokeninput", value);
                });
                show_dropdown();
                if ($(input).data("settings").animateDropdown) {
                    dropdown_ul.slideDown("fast");
                } else {
                    dropdown_ul.show();
                }
            } else {
                if ($(input).data("settings").noResultsText) {
                    dropdown.html("<p>" + escapeHTML($(input).data("settings").noResultsText) + "</p>");
                    show_dropdown();
                }
            }
        }

        function select_dropdown_item(item) {
            if (item) {
                if (selected_dropdown_item) {
                    deselect_dropdown_item($(selected_dropdown_item));
                }
                item.addClass($(input).data("settings").classes.selectedDropdownItem);
                selected_dropdown_item = item.get(0);
            }
        }

        function deselect_dropdown_item(item) {
            item.removeClass($(input).data("settings").classes.selectedDropdownItem);
            selected_dropdown_item = null;
        }

        function do_search() {
            var query = input_box.val();
            if (true) {
                if (selected_token) {
                    deselect_token($(selected_token), POSITION.AFTER);
                }
                if (query.length >= $(input).data("settings").minChars) {
                    clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        run_search(query);
                    }, $(input).data("settings").searchDelay);
                } else {
                    hide_dropdown();
                }
            }
        }

        function run_search(query) {
            var cache_key = query + computeURL();
            var cached_results = cache.get(cache_key);
            if (cached_results && $(input).data("useCache") == true) {
                if ($.isFunction($(input).data("settings").onCachedResult)) {
                    cached_results = $(input).data("settings").onCachedResult.call(hiddenInput, cached_results);
                }
                populateDropdown(query, cached_results);
            } else {
                if ($(input).data("settings").url) {
                    var url = computeURL();
                    var ajax_params = {};
                    ajax_params.data = {};
                    if (url.indexOf("?") > -1) {
                        var parts = url.split("?");
                        ajax_params.url = parts[0];
                        var param_array = parts[1].split("&");
                        $.each(param_array, function (index, value) {
                            var kv = value.split("=");
                            ajax_params.data[kv[0]] = kv[1];
                        });
                    } else {
                        ajax_params.url = url;
                    }
                    ajax_params.data[$(input).data("settings").queryParam] = query;
                    ajax_params.type = $(input).data("settings").method;
                    ajax_params.dataType = $(input).data("settings").contentType;
                    if ($(input).data("settings").crossDomain) {
                        ajax_params.dataType = "jsonp";
                    }
                    if ($(input).data("settings").excludeCurrent) {
                        var currentTokens = $(input).data("tokenInputObject").getTokens();
                        var tokenList = $.map(currentTokens, function (el) {
                            if (typeof $(input).data("settings").tokenValue == "function") {
                                return $(input).data("settings").tokenValue.call(this, el);
                            }
                            return el[$(input).data("settings").tokenValue];
                        });
                        ajax_params.data[$(input).data("settings").excludeCurrentParameter] = tokenList.join($(input).data("settings").tokenDelimiter);
                    }
                    ajax_params.success = function (results) {
                        cache.add(cache_key, $(input).data("settings").jsonContainer ? results[$(input).data("settings").jsonContainer] : results);
                        if ($.isFunction($(input).data("settings").onResult)) {
                            results = $(input).data("settings").onResult.call(hiddenInput, results);
                        }
                        if (input_box.val() === query) {
                            populateDropdown(query, $(input).data("settings").jsonContainer ? results[$(input).data("settings").jsonContainer] : results);
                        }
                    };
                    if (settings.onSend) {
                        settings.onSend(ajax_params);
                    }
                    $.ajax(ajax_params);
                } else {
                    if ($(input).data("settings").local_data) {
                        var results = $.grep($(input).data("settings").local_data, function (row) {
                            return row[$(input).data("settings").propertyToSearch].toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                        cache.add(cache_key, results);
                        if ($.isFunction($(input).data("settings").onResult)) {
                            results = $(input).data("settings").onResult.call(hiddenInput, results);
                        }
                        populateDropdown(query, results);
                    }
                }
            }
        }

        function computeURL() {
            var settings = $(input).data("settings");
            return typeof settings.url == "function" ? settings.url.call(settings) : settings.url;
        }

        function focusWithTimeout(object) {
            setTimeout(function () {
                object.focus();
                do_search();
            }, 50);
        }
    };
    $.TokenList.Cache = function (options) {
        var settings, data = {},
            size = 0,
            flush;
        settings = $.extend({
            max_size: 500
        }, options);
        flush = function () {
            data = {};
            size = 0;
        };
        this.add = function (query, results) {
            if (size > settings.max_size) {
                flush();
            }
            if (!data[query]) {
                size += 1;
            }
            data[query] = results;
        };
        this.get = function (query) {
            return data[query];
        };
    };
}(jQuery));
(function (factory) {
    factory(jQuery);
}(function ($, undefined) {
    var pluginName = "drilldown";
    var defaults = {
        event: "click",
        selector: "a",
        speed: 100,
        handleAction: function (e, $trigger, next) {
            next();
        },
        cssClass: {
            container: pluginName + "-container",
            root: pluginName + "-root",
            sub: pluginName + "-sub",
            back: pluginName + "-back"
        }
    };
    var Plugin = (function () {
        function Plugin(element, options) {
            var inst = this;
            this._name = pluginName;
            this._defaults = defaults;
            this.element = element;
            this.$element = $(element);
            this.options = $.extend({}, defaults, options);
            this._history = [];
            this._css = {
                "float": "left",
                width: null
            };
            this.$container = this.$element.find("." + this.options.cssClass.container);
            this.$element.bind(this.options.event + "." + pluginName, function (e) {
                if ($(e.target).is(inst.options.selector)) {
                    handleAction.call(inst, e, $(e.target));
                }
            });
        }
        Plugin.prototype = {
            destroy: function () {
                this.reset();
                this.$element.unbind(this.options.event + "." + pluginName);
            },
            reset: function () {
                var $root;
                if (this._history.length) {
                    $root = this._history[0];
                    this.$container.empty().append($root);
                    restoreState.call(this, $root);
                }
                this._history = [];
                this._css = {
                    "float": "left",
                    width: null
                };
            }
        };

        function handleAction(e, $trigger) {
            var $next = $trigger.nextAll("." + this.options.cssClass.sub);
            var preventDefault = true;
            if ($next.length) {
                this.options.handleAction.call(this, "down", e, $trigger, function () {
                    down.call(this, $next);
                });
            } else {
                if ($trigger.closest("." + this.options.cssClass.back).length) {
                    this.options.handleAction.call(this, "up", e, $trigger, function () {
                        up.call(this);
                    });
                } else {
                    preventDefault = false;
                }
            }
            if (preventDefault && $trigger.is("a")) {
                e.preventDefault();
            }
        }

        function down($next) {
            if (!$next.length) {
                return;
            }
            this._css.width = this.$element.outerWidth();
            this.$container.width(this._css.width * 2);
            $next = $next.clone(true).removeClass(this.options.cssClass.sub).addClass(this.options.cssClass.root);
            this.$container.append($next);
            animateDrilling.call(this, -1 * this._css.width, function () {
                var $current = $next.prev();
                this._history.push($current.detach());
                restoreState.call(this, $next);
            }.bind(this));
        }

        function up() {
            var $next = this._history.pop();
            this._css.width = this.$element.outerWidth();
            this.$container.width(this._css.width * 2);
            this.$container.prepend($next);
            animateDrilling.call(this, 0, function () {
                var $current = $next.next();
                $current.remove();
                restoreState.call(this, $next);
            }.bind(this));
        }

        function animateDrilling(marginLeft, callback) {
            var $menus = this.$container.children("." + this.options.cssClass.root);
            $menus.css(this._css);
            callback.call(this);
        }

        function restoreState($menu) {
            $menu.css({
                "float": "",
                width: "",
                marginLeft: ""
            });
            this.$container.css("width", "");
        }
        return Plugin;
    })();
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            var inst = $.data(this, pluginName);
            var method = options;
            if (!inst) {
                $.data(this, pluginName, new Plugin(this, options));
            } else {
                if (typeof method === "string") {
                    if (method === "destroy") {
                        $.removeData(this, pluginName);
                    }
                    if (typeof inst[method] === "function") {
                        inst[method]();
                    }
                }
            }
        });
    };
}));
(function () {
    function Bc(a, b) {
        return new R(a, b);
    }

    function v(a, b) {
        for (var c in a) {
            if (B(a, c) && !1 === b.call(a, a[c], c, a)) {
                break;
            }
        }
    }

    function Cc(a) {
        function b(a, b, c) {
            C(d, a, function (a, e, f) {
                a = Ob(a, e, f);
                me(d, a.methods, b, c, a.w);
                return d;
            });
        }
        var c = "Object" === a,
            d = Dc(a);
        b("defineStatic", 1);
        b("defineInstance", 2);
        b("defineInstanceAndStatic", 3);
        b("defineStaticWithArguments", 1, !0);
        b("defineInstanceWithArguments", 2, !0);
        C(d, "defineStaticPolyfill", function (b, c, g) {
            b = Ob(b, c, g);
            mb(Fa[a], b.methods, !0, b.w);
            return d;
        });
        C(d, "defineInstancePolyfill", function (b, c, g) {
            b = Ob(b, c, g);
            mb(Fa[a].prototype, b.methods, !0, b.w);
            v(b.methods, function (a, b) {
                nb(d, b, a);
            });
            return d;
        });
        C(d, "alias", function (a, b) {
            var c = d,
                e = "string" === typeof b ? d[b] : b;
            c[a] = e;
            e.instance && nb(c, a, e.instance);
            return d;
        });
        C(d, "extend", function (b) {
            function e(a, c) {
                var d = b[a];
                if (d) {
                    for (var e = 0, f; f = d[e]; e++) {
                        if (f === c) {
                            return !0;
                        }
                    }
                }
                return !1;
            }

            function g(a, c, d) {
                if (!c[a] || !d) {
                    return !1;
                }
                for (a = 0; a < d.length; a++) {
                    if (!1 === b[d[a]]) {
                        return !0;
                    }
                }
            }
            var k = Fa[a],
                h = k.prototype,
                n = {},
                t = {},
                q;
            b = b || {};
            q = b.methods;
            if (!e("except", k) && (!b.namespaces || e("namespaces", k))) {
                return c && "boolean" === typeof b.objectPrototype && (Pb = b.objectPrototype), v(q || d, function (a, b) {
                    q && (b = a, a = d[b]);
                    !B(a, "instance") || c && h === h && (!Pb || "get" === b || "set" === b) || g(b, h, a.flags) || e("except", b) || (t[b] = a.instance);
                    !B(a, "static") || c && k === h && (!Pb || "get" === b || "set" === b) || g(b, k, a.flags) || e("except", b) || (n[b] = a);
                }), mb(k, n), mb(h, t), q || C(d, "active", !0), d;
            }
        });
        ob[a] = d;
        Ec["[object " + a + "]"] = d;
        Qb(a);
        ne(d);
        return m[a] = d;
    }

    function oe() {
        return "Sugar";
    }

    function me(a, b, c, d, e) {
        v(b, function (b, g) {
            var f, h = b;
            d && (h = Fc(b));
            e && (h.flags = e);
            c & 2 && !b.instance && (f = d ? Fc(b, !0) : pe(b), C(h, "instance", f));
            c & 1 && C(h, "static", !0);
            f = h;
            a[g] = f;
            f.instance && nb(a, g, f.instance);
            a.active && a.extend(g);
        });
    }

    function Ob(a, b, c) {
        var d;
        "string" === typeof a ? (d = {}, d[a] = b, a = c) : (d = a, a = b);
        return {
            w: a,
            methods: d
        };
    }

    function Fc(a, b) {
        var c = a.length - 1 - (b ? 1 : 0);
        return function () {
            var d = [],
                e = [],
                f;
            b && d.push(this);
            f = Math.max(arguments.length, c);
            for (var g = 0; g < f; g++) {
                g < c ? d.push(arguments[g]) : e.push(arguments[g]);
            }
            d.push(e);
            return a.apply(this, d);
        };
    }

    function pe(a) {
        switch (a.length) {
            case 0:
            case 1:
                return function () {
                    return a(this);
                };
            case 2:
                return function (b) {
                    return a(this, b);
                };
            case 3:
                return function (b, c) {
                    return a(this, b, c);
                };
            case 4:
                return function (b, c, d) {
                    return a(this, b, c, d);
                };
            case 5:
                return function (b, c, d, e) {
                    return a(this, b, c, d, e);
                };
        }
    }

    function mb(a, b, c, d) {
        v(b, function (b, f) {
            c && !d && a[f] || C(a, f, b);
        });
    }

    function Dc(a) {
        function b(a, d) {
            if (!(this instanceof b)) {
                return new b(a, d);
            }
            this.constructor !== b && (a = this.constructor.apply(a, arguments));
            this.raw = a;
        }
        C(b, "toString", function () {
            return "Sugar" + a;
        });
        C(b.prototype, "valueOf", function () {
            return this.raw;
        });
        return b;
    }

    function nb(a, b, c) {
        c = qe(c);
        var d, e, f;
        f = Gc.prototype;
        e = (d = f[b]) && d !== Object.prototype[b];
        d && d.N || (f[b] = e ? re(b) : c);
        a.prototype[b] = c;
        a === m.Object && se(b, c);
    }

    function ne(a) {
        v(m.Object && m.Object.prototype, function (b, c) {
            if ("function" === typeof b) {
                var d = a.prototype;
                B(d, c) || (d[c] = b);
            }
        });
    }

    function se(a, b) {
        v(ob, function (c) {
            c = c.prototype;
            B(c, a) || (c[a] = b);
        });
    }

    function qe(a) {
        return function () {
            return new Gc(a.apply(this.raw, arguments));
        };
    }

    function re(a) {
        function b() {
            var b = this.raw,
                d;
            null != b && (d = Ec[W(b)]);
            d || (d = m.Object);
            return (new d(b))[a].apply(this, arguments);
        }
        b.N = !0;
        return b;
    }

    function Qb(a, b) {
        var c = ob[a],
            d = Fa[a].prototype;
        !b && Hc && (b = Hc(d));
        v(b, function (a) {
            if ("constructor" !== a && "valueOf" !== a && "__proto__" !== a) {
                try {
                    var b = d[a];
                    if ("function" !== typeof b) {
                        return;
                    }
                } catch (g) {
                    return;
                }
                nb(c, a, b);
            }
        });
    }

    function te(a, b, c) {
        a[b] = c.value;
    }

    function C(a, b, c, d) {
        pb(a, b, {
            value: c,
            enumerable: !!d,
            configurable: !0,
            writable: !0
        });
    }

    function W(a) {
        return Rb.call(a);
    }

    function B(a, b) {
        return !!a && ue.call(a, b);
    }

    function u(a, b) {
        if (B(a, b)) {
            return a[b];
        }
    }

    function qb(a, b, c) {
        c || (c = W(a));
        return c === "[object " + b + "]";
    }

    function ya(a) {
        return function (b, c, d) {
            b[a](c, d);
        };
    }

    function Ga(a, b, c) {
        K(a, Ic(b, c), void 0);
    }

    function ve(a, b) {
        Sb(a, Ic("Boolean Number String Date RegExp Function Array Error Set Map", b), void 0);
    }

    function Ic(a, b) {
        var c = {};
        A(a) && (a = ga(a));
        y(a, function (a, e) {
            b(c, a, e);
        });
        return c;
    }

    function ha(a) {
        function b(b) {
            var c = arguments;
            return a(b, c[1], c[2], c.length - 1);
        }
        b.instance = function (b) {
            var c = arguments;
            return a(this, b, c[1], c.length);
        };
        return b;
    }

    function Jc(a, b, c) {
        C(a, b, c);
    }

    function Tb(a, b) {
        function c(a) {
            return d[a];
        }
        var d = ba({}, b);
        C(a, "getOption", c);
        Jc(a, "setOption", function (a, c) {
            var e;
            1 === arguments.length ? e = a : (e = {}, e[a] = c);
            v(e, function (a, c) {
                null === a && (a = b[c]);
                d[c] = a;
            });
        });
        return c;
    }

    function Kc(a, b) {
        var c = a.prototype;
        v(b, function (a, b) {
            c[b] = a;
        });
    }

    function Lc(a) {
        if (!a) {
            throw new TypeError("Argument required");
        }
    }

    function rb(a) {
        if (!L(a)) {
            throw new TypeError("Function is not callable");
        }
    }

    function za(a) {
        a = +a || 0;
        if (0 > a || !H(a) || !isFinite(a)) {
            throw new RangeError("Invalid number");
        }
        return S(a);
    }

    function r(a) {
        return void 0 !== a;
    }

    function z(a) {
        return void 0 === a;
    }

    function Wa(a) {
        var b = "_sugar_" + a;
        return function (a, d) {
            return 1 < arguments.length ? (C(a, b, d), a) : a[b];
        };
    }

    function Mc(a, b) {
        a.prototype.constructor = function () {
            return b.apply(this, arguments);
        };
    }

    function ia(a) {
        if (!qa(a)) {
            var b = W(a);
            if (ja(a, b)) {
                return we(a);
            }
            if (U(a, b)) {
                return xe(a);
            }
            if (L(a, b)) {
                return ye(a);
            }
            if (sb(a, b)) {
                return ze(a);
            }
        }
        return Ae(a);
    }

    function ze(a) {
        var b = {};
        return function (c, d, e) {
            var f = !0;
            if (!M(c)) {
                return !1;
            }
            v(a, function (a, k) {
                b[k] = u(b, k) || ia(a);
                !1 === b[k].call(e, c[k], d, e) && (f = !1);
                return f;
            });
            return f;
        };
    }

    function Ae(a) {
        return function (b) {
            return Aa(b, a);
        };
    }

    function we(a) {
        a = RegExp(a);
        return function (b) {
            return a.test(b);
        };
    }

    function xe(a) {
        var b = a.getTime();
        return function (a) {
            return !(!a || !a.getTime) && a.getTime() === b;
        };
    }

    function ye(a) {
        return function (b, c, d) {
            return b === a || a.call(d, b, c, d);
        };
    }

    function tb(a, b, c) {
        return Ha(a, b, c, !1);
    }

    function Ha(a, b, c, d, e, f, g) {
        var k, h, n, t, q, p, l;
        k = a || void 0;
        if (null != b) {
            if (M(b)) {
                a = [b];
            } else {
                b = String(b);
                if (-1 !== b.indexOf("..")) {
                    return Be(a, b, c, g);
                }
                a = b.split("[");
            }
            t = r(g);
            for (var m = 0, E = a.length; m < E; m++) {
                h = a[m];
                A(h) && (h = h.split("."));
                for (var u = 0, v = h.length; u < v; u++) {
                    if (b = h[u], q = m === E - 1 && u === v - 1, n = b.indexOf("]"), l = -1 !== n, p = t && 0 === n, n = 1 < E && u === v - 1, p ? b = k.length : l && (b = b.slice(0, -1)), l && 0 > b && (b = +b + k.length), m || b || 1 === E) {
                        if (l = c ? b in k : B(k, b), !e || q && !f || l) {
                            if (d) {
                                if (q || !l) {
                                    return l;
                                }
                            } else {
                                if (t && q) {
                                    if (qa(k)) {
                                        throw new TypeError("Property cannot be written");
                                    }
                                    k[b] = g;
                                }
                            }
                            k = l ? k[b] : void 0;
                        } else {
                            k = k[b] = n || f && q ? [] : {};
                        }
                    }
                }
            }
            return k;
        }
    }

    function Be(a, b, c, d) {
        var e, f, g;
        if (e = b.match(Ce)) {
            b = r(d);
            a = (f = e[1]) ? Ha(a, f, c, !1, b ? !0 : !1, !0) : a;
            if (!I(a)) {
                throw new TypeError("Array required");
            }
            g = e[4];
            f = e[2] ? +e[2] : 0;
            e = e[3] ? +e[3] : a.length;
            e = -1 === e ? a.length : e + 1;
            if (b) {
                for (b = f; b < e; b++) {
                    Ha(a, b + g, c, !1, !0, !1, d);
                }
            } else {
                if (a = a.slice(f, e), g) {
                    return "." === g.charAt(0) && (g = g.slice(1)), a.map(function (a) {
                        return Ha(a, g);
                    });
                }
            }
            return a;
        }
    }

    function Ub(a, b) {
        if (B(a, b)) {
            return b;
        }
    }

    function M(a) {
        return !!a && "object" === typeof a;
    }

    function qa(a, b) {
        b = b || typeof a;
        return null == a || "string" === b || "number" === b || "boolean" === b;
    }

    function sb(a, b) {
        var c;
        if (c = M(a) && qb(a, "Object", b)) {
            c = "constructor" in a, c = !c && !("toString" in a) || c && !B(a, "constructor") && B(a.constructor.prototype, "isPrototypeOf");
        }
        if (c) {
            a: {
                c = Object.prototype;
                for (var d in a) {
                    var e = a[d];
                    if (!B(a, d) && e !== c[d]) {
                        c = !1;
                        break a;
                    }
                }
                c = !0;
            }
        }
        return c;
    }

    function ub(a, b) {
        for (var c = 0; c < a; c++) {
            b(c);
        }
    }

    function ba(a, b) {
        v(b, function (b, d) {
            a[d] = b;
        });
        return a;
    }

    function Xa(a) {
        qa(a) && (a = Object(a));
        if (De && A(a)) {
            for (var b = a, c = 0, d; d = b.charAt(c);) {
                b[c++] = d;
            }
        }
        return a;
    }

    function Aa(a, b, c) {
        var d, e;
        if (a === b) {
            return 0 !== a || 1 / a === 1 / b;
        }
        d = W(a);
        e = W(b);
        return d !== e ? !1 : vb(a, d) && vb(b, e) ? Ee(a, b, c) : wb(a, d) && wb(b, e) ? a.size === b.size && Aa(Nc(a), Nc(b), c) : xb(a, d) && xb(b, e) ? a.size === b.size && Aa(Oc(a), Oc(b), c) : yb(a, d) && yb(b, e) ? a.toString() === b.toString() : !1;
    }

    function Ee(a, b, c) {
        var d, e;
        if (typeof a !== typeof b) {
            return !1;
        }
        if (M(a.valueOf())) {
            if (a.length !== b.length) {
                return !1;
            }
            e = 0;
            d = !0;
            Pc(a, !1, c, function (a, c, k, h) {
                k || a in b && Aa(c, b[a], h) || (d = !1);
                e++;
                return d;
            });
            if (!d || e !== Object.keys(b).length) {
                return !1;
            }
        }
        return a.valueOf().toString() === b.valueOf().toString();
    }

    function Ia(a, b, c) {
        var d = typeof a,
            e, f;
        if (qa(a, d) && (null == a || a === a)) {
            return d + a;
        }
        e = W(a);
        if (vb(a, e)) {
            M(a) ? f = Fe(a, b, c) + a.toString() : -Infinity === 1 / a ? f = "-0" : a.valueOf && (f = a.valueOf());
        } else {
            return c = Vb(b, a), -1 === c && (c = b.length, b.push(a)), c;
        }
        return d + e + f;
    }

    function Fe(a, b, c) {
        var d = "";
        Pc(a, !0, c, function (a, c, g, k) {
            d += g ? "CYC" : a + Ia(c, b, k);
        });
        return d;
    }

    function Pc(a, b, c, d) {
        function e(a, b) {
            var e = !1;
            if (1 < c.length) {
                for (var f = c.length; f--;) {
                    c[f] === a && (e = !0);
                }
            }
            c.push(a);
            d(b, a, e, c);
            c.pop();
        }

        function f() {
            for (var b = Object.keys(a).sort(), c, d = 0; d < b.length; d++) {
                c = b[d], e(a[c], b[d]);
            }
        }
        c || (c = []);
        b ? f() : v(a, e);
    }

    function Ge(a, b) {
        var c = [],
            d;
        for (d in a) {
            d >>> 0 == d && 4294967295 != d && d >= b && c.push(+d);
        }
        c.sort(function (a, c) {
            var d = a > b;
            return d !== c > b ? d ? -1 : 1 : a - c;
        });
        return c;
    }

    function Qc(a, b, c, d) {
        var e, f = a.length;
        if (!I(b)) {
            return Rc(a, b, f, c, d);
        }
        e = Array(b.length);
        y(b, function (b, k) {
            e[k] = Rc(a, b, f, c, d);
        });
        return e;
    }

    function Wb(a, b, c) {
        a && c && (a %= b);
        0 > a && (a = b + a);
        return a;
    }

    function Rc(a, b, c, d, e) {
        b = Wb(b, c, d);
        return e ? a.charAt(b) : a[b];
    }

    function ra(a, b, c, d) {
        return b ? b.apply ? b.apply(c, d || []) : I(b) ? b.map(function (b) {
            return ra(a, b, c, d);
        }) : L(a[b]) ? a[b].call(a) : tb(a, b) : a;
    }

    function ga(a) {
        return a.split(" ");
    }

    function y(a, b) {
        for (var c = 0, d = a.length; c < d; c++) {
            if (!(c in a)) {
                for (var d = a, e = b, f = Ge(d, c), g = 0, k = f.length; g < k; g++) {
                    c = f[g], e.call(d, d[c], c, d);
                }
                break;
            }
            b(a[c], c);
        }
    }

    function Xb(a, b) {
        for (var c = [], d = 0, e = a.length; d < e; d++) {
            var f = a[d];
            d in a && b(f, d) && c.push(f);
        }
        return c;
    }

    function sa(a, b) {
        for (var c = [], d = 0, e = a.length; d < e; d++) {
            d in a && c.push(b(a[d], d));
        }
        return c;
    }

    function Vb(a, b) {
        for (var c = 0, d = a.length; c < d; c++) {
            if (c in a && a[c] === b) {
                return c;
            }
        }
        return -1;
    }

    function Ya(a, b, c) {
        var d = zb(10, ca(b || 0));
        c = c || Za;
        0 > b && (d = 1 / d);
        return c(a * d) / d;
    }

    function Ja(a, b, c, d, e) {
        d = ca(a).toString(d || 10);
        d = Ab(e || "0", b - d.replace(/\.\d+/, "").length) + d;
        if (c || 0 > a) {
            d = (0 > a ? "-" : "+") + d;
        }
        return d;
    }

    function Sc(a) {
        if (11 <= a && 13 >= a) {
            return "th";
        }
        switch (a % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    function Yb(a, b) {
        var c, d;
        c = a.replace(Tc, function (a) {
            a = u(Ba, a);
            "." === a && (d = !0);
            return a;
        });
        return d ? parseFloat(c) : parseInt(c, b || 10);
    }

    function Ab(a, b) {
        var c = "";
        for (a = a.toString(); 0 < b;) {
            if (b & 1 && (c += a), b >>= 1) {
                a += a;
            }
        }
        return c;
    }

    function Ka(a) {
        return a.charAt(0).toUpperCase() + a.slice(1);
    }

    function Uc(a, b, c) {
        function d(d, e) {
            var k, h, n, t, q = e[2],
                m = e[3],
                r = e[5];
            e[4] && b ? (h = r, k = b) : q ? (h = q, k = a) : n = m && b ? m : e[1] || e[0];
            k && (g(c, q, r), t = function (a, b) {
                return k(a, h, b);
            });
            d.push(t || f(n));
        }

        function e(a, b, c, d) {
            if (d > c) {
                var e = b.slice(c, d);
                k(e, "{");
                k(e, "}");
                a.push(function () {
                    return e;
                });
            }
        }

        function f(a) {
            return function () {
                return a;
            };
        }

        function g(a, b, c) {
            if (a && !a(b, c)) {
                throw new TypeError("Invalid token " + (b || c) + " in format string");
            }
        }

        function k(a, b) {
            if (-1 !== a.indexOf(b)) {
                throw new TypeError("Unmatched " + b + " in format string");
            }
        }
        var h = He,
            n = Ie(function (a) {
                var b = [],
                    c = 0,
                    f;
                for (h.lastIndex = 0; f = h.exec(a);) {
                    e(b, a, c, f.index), d(b, f), c = h.lastIndex;
                }
                e(b, a, c, a.length);
                return b;
            });
        return function (a, b, c) {
            a = n(a);
            for (var d = "", e = 0; e < a.length; e++) {
                d += a[e](b, c);
            }
            return d;
        };
    }

    function Vc(a) {
        return F.human && F.human.L(a) || a;
    }

    function La(a, b) {
        function c(a, c) {
            if (a || -1 < b.indexOf(c)) {
                d += c;
            }
        }
        var d = "";
        b = b || "";
        c(a.global, "g");
        c(a.ignoreCase, "i");
        c(a.multiline, "m");
        c(a.ba, "y");
        return d;
    }

    function Ma(a) {
        A(a) || (a = String(a));
        return a.replace(/([\\\/\'*+?|()\[\]{}.^$-])/g, "\\$1");
    }

    function O(a, b) {
        return a["get" + (P(a) ? "UTC" : "") + b]();
    }

    function Na(a, b, c, d) {
        if (!d || c !== O(a, b)) {
            a["set" + (P(a) ? "UTC" : "") + b](c);
        }
    }

    function Ie(a) {
        var b = {},
            c = 0;
        return function (d) {
            if (B(b, d)) {
                return b[d];
            }
            c === Je && (b = {}, c = 0);
            c++;
            return b[d] = a(d);
        };
    }

    function Nc(a) {
        var b = Array(a.size),
            c = 0;
        a.forEach(function (a) {
            b[c++] = a;
        });
        return b;
    }

    function Oc(a) {
        var b = Array(a.size),
            c = 0;
        a.forEach(function (a, e) {
            b[c++] = [e, a];
        });
        return b;
    }

    function Zb(a) {
        if (null == a) {
            throw new TypeError("String required.");
        }
        return String(a);
    }

    function $b(a) {
        if (ja(a)) {
            throw new TypeError;
        }
        return String(a);
    }

    function Ca() {
        return Ke("newDateInternal")();
    }

    function ta(a) {
        var b = new Date(a.getTime());
        P(b, !!P(a));
        return b;
    }

    function Wc(a) {
        if (isNaN(a.getTime())) {
            throw new TypeError("Date is not valid");
        }
    }

    function J(a) {
        return O(a, "Day");
    }

    function da(a) {
        return O(a, "Date");
    }

    function X(a) {
        return O(a, "Month");
    }

    function ka(a) {
        return O(a, "FullYear");
    }

    function la(a, b) {
        Na(a, "Date", b);
    }

    function Xc(a) {
        return 32 - O(new Date(ka(a), X(a), 32), "Date");
    }

    function ua(a, b, c) {
        if (H(b)) {
            var d = J(a);
            if (c) {
                c = 0 < c ? 1 : -1;
                var e = b % 7 - d;
                e && e / ca(e) !== c && (b += 7 * c);
            }
            la(a, da(a) + b - d);
            return a.getTime();
        }
    }

    function ac(a, b) {
        var c = P(a) ? 0 : a.getTimezoneOffset(),
            d, e;
        e = !0 === b ? ":" : "";
        if (!c && b) {
            return "Z";
        }
        d = Ja(S(-c / 60), 2, !0);
        c = Ja(ca(c % 60), 2);
        return d + e + c;
    }

    function Yc(a, b) {
        var c = a[0],
            d = a[1];
        if (b && A(c)) {
            var e, f = {};
            if (c = c.match(/^(-?\d*[\d.]\d*)?\s?(\w+?)s?$/i)) {
                z(e) && (e = +c[1], isNaN(e) && (e = 1)), f[c[2].toLowerCase()] = e;
            }
            c = f;
        } else {
            H(c) && H(d) ? (c = Le(a), d = null) : M(c) && (c = ba({}, c));
        }
        return [c, d];
    }

    function Le(a) {
        var b = {},
            c = 0;
        Zc(7, function (d) {
            var e = a[c++];
            r(e) && (b[d.name] = e);
        });
        return b;
    }

    function bc(a, b, c) {
        c = c || 0;
        for (z(b) && (b = 7); b >= c && !1 !== a(ma[b], b); b--) {}
    }

    function Zc(a, b) {
        for (; 0 <= a && !1 !== b(ma[a], a);) {
            a = $a(a);
        }
    }

    function $a(a) {
        return 6 === a ? 4 : 5 === a ? 3 : a - 1;
    }

    function Bb(a, b, c, d) {
        bc(function (c, d) {
            var e;
            e = c.name;
            var f = u(a, cc(a, e));
            r(f) && b(e, f, c, d);
            e = void 0;
            !1 !== e && 4 === d && (e = u(a, cc(a, "weekday")), r(e) && b("weekday", e, c, d), e = void 0);
            return e;
        }, c, d);
    }

    function Me(a, b) {
        Bb(a, b, 7, 4);
    }

    function Da(a, b, c, d) {
        var e = {};
        e[b] = c;
        return va(a, e, d, 1);
    }

    function $c(a, b, c) {
        b = Yc(b, !0);
        return va(a, b[0], b[1], c);
    }

    function ab(a, b) {
        ua(a, 7 * Oa((J(a) - b) / 7) + b);
        return a;
    }

    function ad(a, b) {
        var c = b - 1;
        ua(a, 7 * na((J(a) - c) / 7) + c);
        return a;
    }

    function bb(a, b, c) {
        5 === b && ab(a, D.get(c).s());
        return Y(a, $a(b));
    }

    function Cb(a, b, c, d) {
        5 === b && ad(a, D.get(c).s());
        return Y(a, $a(b), d, !0);
    }

    function Y(a, b, c, d) {
        Zc(b, function (b, f) {
            var e = d ? b.end : b.start;
            L(e) && (e = e(a));
            Na(a, b.method, e);
            return !r(c) || f > c;
        });
        return a;
    }

    function cc(a, b) {
        return Ub(a, b) || Ub(a, b + "s") || "day" === b && Ub(a, "date");
    }

    function Ne(a) {
        var b = {},
            c;
        b[a] = 1;
        Bb(b, function (a, b, f, g) {
            c = g;
            return !1;
        });
        return c;
    }

    function Db(a, b, c) {
        var d = b > a,
            e;
        d || (e = b, b = a, a = e);
        e = b - a;
        1 < c.f && (e = S(e / c.f));
        if (c.m) {
            for (a = ta(a), e && Da(a, c.name, e); a < b;) {
                Da(a, c.name, 1);
                if (a > b) {
                    break;
                }
                e += 1;
            }
        }
        return d ? -e : e;
    }

    function bd(a, b) {
        if (H(b)) {
            var c = ta(a),
                d = J(a);
            Y(c, 6);
            la(c, 4);
            ab(c, 1);
            la(c, da(c) + 7 * (b - 1));
            var e = ka(c);
            Na(a, "FullYear", e);
            e = X(c);
            Na(a, "Month", e);
            la(a, da(c));
            ua(a, d || 7);
        }
        return a.getTime();
    }

    function Pa(a, b, c, d) {
        var e, f = 0;
        z(c) && (c = 1);
        z(d) && (d = 4);
        var g = e = ad(ta(a), c),
            k = c,
            h = d;
        Y(g, 6);
        la(g, h);
        ab(g, k);
        b && a < e && (b = e = ab(ta(a), c), Y(b, 6), la(b, d), ab(b, c));
        for (; e <= a;) {
            la(e, da(e) + 7), f++;
        }
        return f;
    }

    function cd(a, b, c) {
        var d, e, f, g;
        d = ka(a);
        e = X(a);
        if (0 === e || 11 === e) {
            c || (c = D.get(b), f = c.s(b), g = c.G(b)), a = Pa(a, !1, f, g), 0 === e && 0 === a ? --d : 11 === e && 1 === a && (d += 1);
        }
        return d;
    }

    function dd(a, b, c, d) {
        var e;
        Wc(a);
        L(c) ? d = c : e = c;
        c = Oe(a, b);
        if (d && (d = d.apply(a, c.concat(D.get(e))))) {
            return ed(a, d, e);
        }
        0 === c[1] && (c[1] = 1, c[0] = 1);
        a = b ? "duration" : 0 < c[2] ? "future" : "past";
        return D.get(e).U(c, a);
    }

    function fd(a, b) {
        var c = 0,
            d = 0;
        bc(function (a, f) {
            d = ca(b(a));
            if (1 <= d) {
                return c = f, !1;
            }
        });
        return [d, c, a];
    }

    function Pe(a) {
        return fd(a, function (b) {
            return S(Ya(a / b.f, 1));
        });
    }

    function Oe(a, b) {
        b || (b = Ca(), a > b && (b = new Date(b.getTime() - 10)));
        return fd(a - b, function (c) {
            return ca(Db(a, b, c));
        });
    }

    function ed(a, b, c) {
        Wc(a);
        b = gd[b] || b || "{long}";
        return Eb(b, a, c);
    }

    function dc(a, b) {
        var c = O(a, "Hours");
        return D.get(b).ampm[S(c / 12)] || "";
    }

    function hd(a, b, c) {
        var d;
        if (!isNaN(a.getTime())) {
            if (A(b)) {
                switch (b = b.trim().toLowerCase(), !0) {
                    case "future" === b:
                        return a.getTime() > Ca().getTime();
                    case "past" === b:
                        return a.getTime() < Ca().getTime();
                    case "today" === b:
                        return ec(a);
                    case "tomorrow" === b:
                        return ec(a, 1);
                    case "yesterday" === b:
                        return ec(a, -1);
                    case "weekday" === b:
                        return 0 < J(a) && 6 > J(a);
                    case "weekend" === b:
                        return 0 === J(a) || 6 === J(a);
                    case r(d = Ea.weekdayMap[b]):
                        return J(a) === d;
                    case r(d = Ea.monthMap[b]):
                        return X(a) === d;
                }
            }
            return id(a, b, c);
        }
    }

    function id(a, b, c, d, e) {
        var f = 0,
            g = 0,
            k, h, n;
        P(a) && (e = e || {}, e.fromUTC = !0, e.setUTC = !0);
        b = cb(null, b, e, !0);
        0 < c && (f = g = c, h = !0);
        if (isNaN(b.date.getTime())) {
            return !1;
        }
        if (b.set && b.set.specificity) {
            if (r(b.set.edge) || r(b.set.shift)) {
                k = !0, bb(b.date, b.set.specificity, d);
            }
            k || 6 === b.set.specificity ? n = Cb(ta(b.date), b.set.specificity, d).getTime() : (n = ma[b.set.specificity], n = Da(ta(b.date), n.name, 1).getTime() - 1);
            !h && r(b.set.sign) && b.set.specificity && (f = 50, g = -50);
        }
        c = a.getTime();
        h = b.date.getTime();
        n = n || h;
        if (a = b.set && b.set.specificity ? 0 : 60000 * (b.date.getTimezoneOffset() - a.getTimezoneOffset())) {
            h -= a, n -= a;
        }
        return c >= h - f && c <= n + g;
    }

    function ec(a, b) {
        var c = Ca();
        b && la(c, da(c) + b);
        return ka(a) === ka(c) && X(a) === X(c) && da(a) === da(c);
    }

    function oa(a, b, c) {
        return cb(null, a, b, c).date;
    }

    function cb(a, b, c, d) {
        function e(a, b) {
            var c = u(E, "params") || {};
            y(b.to, function (b, d) {
                var e = a[d + 1],
                    f;
                if (e) {
                    if ("yy" === b || "y" === b) {
                        b = "year";
                        f = u(E, "prefer");
                        var e = +e,
                            g, e = e + (50 > e ? 2000 : 1900);
                        f && (g = e - ka(p), g / ca(g) !== f && (e += 100 * f));
                    } else {
                        (f = u(fc, b)) ? (b = f.h || b, g = f.C ? f.C : f.sign ? "+" === e ? 1 : -1 : f.aa ? !!g : +e.replace(/,/, "."), "month" === f.h && --g, e = g) : e = m.V(b, e);
                    }
                    c[b] = e;
                }
            });
            return c;
        }

        function f(a, b) {
            P(a) && !r(u(E, "fromUTC")) && (E.fromUTC = !0);
            P(a) && !r(u(E, "setUTC")) && (E.setUTC = !0);
            b && (a = new Date(a.getTime()));
            return a;
        }

        function g() {
            y(v, function (a) {
                a.call();
            });
        }

        function k(a) {
            a = a.toLowerCase();
            m = D.get(u(E, "locale"));
            for (var b = 0, c, d; c = m.compiledFormats[b]; b++) {
                if (d = a.match(c.reg)) {
                    m.M(c, b);
                    l = e(d, c);
                    if (r(l.timestamp)) {
                        a = l.timestamp;
                        l = null;
                        break;
                    }
                    r(l.ampm) && (b = l.ampm, 1 === b && 12 > l.hour ? l.hour += 12 : 0 === b && 12 === l.hour && (l.hour = 0));
                    if (l.utc || r(l.tzHour)) {
                        if (b = l.tzHour, c = l.tzMinute, d = l.tzSign, P(p, !0), b = (d || 1) * (60 * (b || 0) + (c || 0))) {
                            l.minute = (l.minute || 0) - b;
                        }
                    }
                    r(l.shift) && z(l.unit) && (r(l.month) ? l.unit = 7 : r(l.weekday) && (l.unit = 5));
                    r(l.num) && z(l.unit) && (r(l.weekday) ? t(l.num) : r(l.month) && (l.date = l.num));
                    l.midday && h(l.midday);
                    r(l.day) && (Y(p, 3), z(l.unit) && (l.unit = 4, l.num = l.day, delete l.day));
                    r(l.unit) && (b = l.unit, c = r(l.num) ? l.num : 1, r(l.weekday) && (6 === b ? (t(c), c = 1) : (va(p, {
                        weekday: l.weekday
                    }, !0), delete l.weekday)), l.half && (c *= l.half), r(l.shift) ? c *= l.shift : l.sign && (c *= l.sign), r(l.day) && (c += l.day, delete l.day), q(b), l[Ea.units[b]] = c, x = !0);
                    l.edge && n(l.edge, l);
                    l.yearSign && (l.year *= l.yearSign);
                    break;
                }
            }
            l ? x ? va(p, l, !1, 1) : (P(p) && Y(p, 3), va(p, l, !0, 0, u(E, "prefer"), w)) : (p = new Date(a), u(E, "fromUTC") && p.setTime(p.getTime() + 60000 * p.getTimezoneOffset()));
            g();
            return p;
        }

        function h(a) {
            l.hour = a % 24;
            23 < a && v.push(function () {
                Da(p, "date", S(a / 24));
            });
        }

        function n(a, b) {
            var c = b.unit,
                d;
            c || Me(b, function (a, d, e, f) {
                "weekday" === a && r(b.month) || (c = f);
            });
            6 === c && r(b.weekday) && (d = b.weekday, delete b.weekday);
            v.push(function () {
                var b;
                0 > a ? bb(p, c, u(E, "locale")) : 0 < a && (1 === a && (b = 4, bb(p, 4)), Cb(p, c, u(E, "locale"), b));
                r(d) && (ua(p, d, -a), Y(p, 3));
            });
            b.specificity = 6 === c ? 4 : c - 1;
        }

        function t(a) {
            l.weekday = 7 * (a - 1) + l.weekday;
            w = l.date = 1;
        }

        function q(a) {
            var b;
            Bb(l, function (c, d, e, f) {
                if (f >= a) {
                    return p.setTime(NaN), !1;
                }
                f < a && (b = b || {}, b[c] = d, delete l[cc(l, c)]);
            });
            b && (v.push(function () {
                va(p, b, !0, !1, u(E, "prefer"), w);
            }), l.edge && (n(l.edge, b), delete l.edge));
        }
        var p, l, m, E, v, x, w;
        v = [];
        E = function (a) {
            a = A(a) ? {
                locale: a
            } : a || {};
            a.prefer = +!!u(a, "future") - +!!u(a, "past");
            return a;
        }(c);
        p = a && b ? f(a, !0) : Ca();
        P(p, u(E, "fromUTC"));
        A(b) ? p = k(b) : U(b) ? p = f(b, B(E, "clone") || d) : M(b) ? (l = ba({}, b), va(p, l, !0)) : (H(b) || null === b) && p.setTime(b);
        P(p, !!u(E, "setUTC"));
        return {
            set: l,
            date: p
        };
    }

    function va(a, b, c, d, e, f) {
        function g() {
            var a = ma[h];
            d = e;
            k(a.name, 1, a, h);
        }

        function k(c, g, k, p) {
            var n = k.method,
                t;
            e && !h && (h = "weekday" === c ? 5 : 4 === p ? 6 : p + 1);
            p > b.specificity || (b.specificity = p);
            if (t = g % 1) {
                if (p) {
                    var q = ma[$a(p)];
                    t = Za(k.f / q.f * t);
                    b[q.name] = t;
                }
                g = S(g);
            }
            if ("weekday" === c) {
                d || ua(a, g, f);
            } else {
                if (c = 6 === p && 28 < da(a), d && !k.m) {
                    a.setTime(a.getTime() + g * d * k.f);
                } else {
                    d && (5 === p && (g *= 7, n = ma[4].method), g = g * d + O(a, n));
                    k = n;
                    p = g;
                    n = d;
                    "ISOWeek" === k ? bd(a, p) : Na(a, k, p, n);
                    if (k = c) {
                        0 > g && (g = g % 12 + 12), k = g % 12 !== X(a);
                    }
                    k && la(a, 0);
                }
            }
        }
        var h;
        if (H(b) && d) {
            b = {
                millisecond: b
            };
        } else {
            if (H(b)) {
                return a.setTime(b), a;
            }
        }
        Bb(b, k);
        c && b.specificity && Y(a, $a(b.specificity));
        a: {
            if (h && !(7 < h)) {
                switch (e) {
                    case -1:
                        c = a > Ca();
                        break a;
                    case 1:
                        c = a < Ca();
                        break a;
                }
            }
            c = void 0;
        }
        c && g();
        return a;
    }

    function Fb(a) {
        var b = a.join("");
        return a && a.length ? b.length === a.length ? "[" + b + "]" : sa(a, Ma).join("|") : "";
    }

    function Z(a, b) {
        1 < a.length && (a = "(?:" + a + ")");
        b && (a += "?");
        return a;
    }

    function Qe(a, b, c) {
        a = jd[a];
        return b = a.A ? Z(b + Z(c)) : a.J ? b + Z(a.J + "|" + c) : b + Z(c, !0);
    }

    function kd(a, b, c, d) {
        var e;
        1 < c && (e = a[b + (c - 1) * d]);
        return e || a[b];
    }

    function ld(a) {
        function b(a) {
            this.X(a);
        }
        b.prototype = {
            H: function (a, b) {
                return this.monthSuffix ? a + 1 + this.monthSuffix : kd(this.months, a, b, 12);
            },
            I: function (a, b) {
                return kd(this.weekdays, a, b, 7);
            },
            V: function (a, b) {
                var c = this[a + "Map"],
                    d;
                c && (d = c[b]);
                z(d) && (d = this.R(b), "month" === a && --d);
                return d;
            },
            R: function (a) {
                var b = this.numeralMap[a];
                if (r(b)) {
                    return b;
                }
                b = +a.replace(/,/, ".");
                if (!isNaN(b)) {
                    return b;
                }
                b = this.S(a);
                isNaN(b) || (this.numeralMap[a] = b);
                return b;
            },
            S: function (a) {
                var b = 1,
                    c = 0,
                    f, g, k;
                k = a.split("");
                for (var h = k.length - 1; g = k[h]; h--) {
                    a = u(this.numeralMap, g), z(a) && (a = u(Ba, g) || 0), (g = 0 < a && 0 === a % 10) ? (f && (c += b), h ? b = a : c += a) : (c += a * b, b *= 10), f = g;
                }
                return c;
            },
            T: function (a) {
                return this.ordinalSuffix || Sc(a);
            },
            U: function (a, b) {
                return this.F(a, b);
            },
            P: function (a) {
                return this.F(Pe(G(0, a)), "duration");
            },
            s: function () {
                var a = this.firstDayOfWeek;
                return r(a) ? a : 1;
            },
            G: function () {
                return this.firstDayOfWeekYear || 4;
            },
            F: function (a, b) {
                var c, d, g = a[0],
                    k = a[1],
                    h = a[2],
                    n = this[b] || this.relative;
                if (L(n)) {
                    return n.call(this, g, k, h, b);
                }
                d = this.units[8 * (this.plural && 1 !== g ? 1 : 0) + k] || this.units[k];
                c = this[0 < h ? "fromNow" : "ago"];
                return n.replace(/\{(.*?)\}/g, function (a, b) {
                    switch (b) {
                        case "num":
                            return g;
                        case "unit":
                            return d;
                        case "sign":
                            return c;
                    }
                });
            },
            M: function (a, b) {
                this.compiledFormats.splice(b, 1);
                this.compiledFormats.unshift(a);
            },
            addFormat: function (a, b) {
                function c(a) {
                    var c, e, f = a.match(/\?$/),
                        k = a.match(/^(\d+)\??$/),
                        p = a.match(/(\d)(?:-(\d))?/),
                        l = a.replace(/[^a-z]+$/i, "");
                    if (e = u(g.parsingAliases, l)) {
                        return a = d(e), f && (a = Z(a, !0)), a;
                    }
                    k ? a = g.tokens[k[1]] : (e = u(fc, l)) ? a = e.src : (e = u(g.parsingTokens, l) || u(g, l), l = l.replace(/s$/, ""), e || (e = u(g.parsingTokens, l) || u(g, l + "s")), A(e) ? (a = e, c = g[l + "Suffix"]) : (p && (e = Xb(e, function (a, b) {
                        var c = b % (g.units ? 8 : e.length);
                        return c >= p[1] && c <= (p[2] || p[1]);
                    })), a = Fb(e)));
                    if (!a) {
                        return "";
                    }
                    k ? a = Z(a) : (b.push(l), a = "(" + a + ")");
                    c && (a = Qe(l, a, c));
                    f && (a += "?");
                    return a;
                }

                function d(a) {
                    a = a.replace(/ /g, " ?");
                    return a.replace(/\{([^,]+?)\}/g, function (a, b) {
                        var d = b.split("|");
                        return 1 < d.length ? Z(sa(d, c).join("|")) : c(b);
                    });
                }
                var g = this;
                b || (b = [], a = d(a));
                g.addRawFormat(a, b);
            },
            addRawFormat: function (a, b) {
                this.compiledFormats.unshift({
                    reg: RegExp("^ *" + a + " *$", "i"),
                    to: b
                });
            },
            X: function (a) {
                function b(a, b, d, e) {
                    var f = a,
                        g = [],
                        k;
                    h[f] || (f += "s");
                    d || (d = {}, k = !0);
                    c(f, function (a, c, f) {
                        c = c * b + f;
                        f = e ? e(f) : f;
                        d[a] = f;
                        d[a.toLowerCase()] = f;
                        g[c] = a;
                    });
                    h[f] = g;
                    k && (h[a + "Map"] = d);
                }

                function c(a, b) {
                    y(h[a], function (a, c) {
                        f(a, function (a, d) {
                            b(a, d, c);
                        });
                    });
                }

                function f(a, b) {
                    var c = sa(a.split("+"), function (a) {
                        return a.replace(/(.+):(.+)$/, function (a, b, c) {
                            return sa(c.split("|"), function (a) {
                                return b + a;
                            }).join("|");
                        });
                    }).join("|");
                    y(c.split("|"), b);
                }

                function g(a, b, c) {
                    y(h[a], function (a) {
                        b && (a = c ? Z("{time}[,\\s\\u3000]", !0) + a : a + k());
                        h.addFormat(a);
                    });
                }

                function k() {
                    var a = ",?[\\s\\u3000]",
                        b;
                    (b = Fb(h.timeMarkers)) && (a += "| (?:" + b + ") ");
                    a = Z(a, h.timeMarkerOptional);
                    return Z(a + "{time}", !0);
                }
                var h = this;
                h.compiledFormats = [];
                h.parsingAliases = {};
                h.parsingTokens = {};
                ba(h, a);
                (function () {
                    y(Re, function (a) {
                        var b = h[a];
                        A(b) ? h[a] = b.split(",") : b || (h[a] = []);
                    });
                })();
                b("month", 12);
                b("weekday", 7);
                b("unit", 8);
                b("ampm", 2);
                (function () {
                    var a = {};
                    b("numeral", 10, a);
                    b("article", 1, a, function () {
                        return 1;
                    });
                    b("placeholder", 4, a, function (a) {
                        return zb(10, a + 1);
                    });
                    h.numeralMap = a;
                })();
                h.parsingAliases.time = h.ampmFront ? "{ampm?} {hour} (?:{minute} (?::?{second})?)?" : h.ampm.length ? "{hour}(?:[.:]{minute}(?:[.:]{second})? {ampm?}| {ampm})" : "{hour}(?:[.:]{minute}(?:[.:]{second})?)";
                h.parsingAliases.tzOffset = "(?:{Z}|{GMT?}(?:{tzSign}{tzHour}(?::?{tzMinute}(?: \\([\\w\\s]+\\))?)?)?)?";
                (function () {
                    v(jd, function (a, b) {
                        var c, d;
                        c = a.i ? fc[a.i].src : a.src;
                        if (a.$ || h.numeralUnits) {
                            var e = "";
                            d = h.numerals.concat(h.placeholders).concat(h.articles);
                            h.allowsFullWidth && (d = d.concat(md.split("")));
                            d.length && (e = "|(?:" + Fb(d) + ")+");
                            c += e;
                        }(d = h[b + "s"]) && d.length && (c += "|" + Fb(d));
                        h.parsingTokens[b] = c;
                    });
                })();
                (function () {
                    bc(function (a, b) {
                        var c = h.timeSuffixes[b];
                        c && (h[(a.alias || a.name) + "Suffix"] = c);
                    });
                })();
                (function () {
                    y(h.modifiers, function (a) {
                        var b = a.name,
                            c = b + "Map",
                            d;
                        d = h[c] || {};
                        f(a.src, function (c, e) {
                            var f = u(h.parsingTokens, b),
                                g = a.value;
                            d[c] = g;
                            h.parsingTokens[b] = f ? f + "|" + c : c;
                            "sign" === a.name && 0 === e && (h[1 === g ? "fromNow" : "ago"] = c);
                        });
                        h[c] = d;
                    });
                })();
                (function () {
                    y(Se, function (a) {
                        var b = a.src;
                        a.mdy && h.mdy && (b = a.mdy);
                        a.time ? (h.addFormat(Z("{time}[,\\s\\u3000]", !0) + b), h.addFormat(b + k())) : h.addFormat(b);
                    });
                    h.addFormat("{time}");
                })();
                g("parse");
                g("timeParse", !0);
                g("timeFrontParse", !0, !0);
            }
        };
        return new b(a);
    }

    function Gb(a, b) {
        return Ab(r(b) ? b : " ", a);
    }

    function nd(a, b, c, d, e) {
        var f;
        if (a.length <= b) {
            return a.toString();
        }
        d = z(d) ? "..." : d;
        switch (c) {
            case "left":
                return a = e ? db(a, b, !0) : a.slice(a.length - b), d + a;
            case "middle":
                return c = na(b / 2), f = Oa(b / 2), b = e ? db(a, c) : a.slice(0, c), a = e ? db(a, f, !0) : a.slice(a.length - f), b + d + a;
            default:
                return b = e ? db(a, b) : a.slice(0, b), b + d;
        }
    }

    function eb(a, b, c) {
        var d, e, f = [];
        L(b) ? (c = b, e = /[\s\S]/g) : b ? A(b) ? e = RegExp(Ma(b), "gi") : ja(b) && (e = RegExp(b.source, La(b, "g"))) : e = /[\s\S]/g;
        b = [];
        for (var g; null != (d = e.exec(a));) {
            e.lastIndex === g ? e.lastIndex += 1 : b.push(d[0]), g = e.lastIndex;
        }
        if (b) {
            for (g = 0, e = b.length; g < e; g++) {
                if (d = b[g], f[g] = d, c) {
                    if (d = c.call(a, d, g, b), !1 === d) {
                        break;
                    } else {
                        r(d) && (f[g] = d);
                    }
                }
            }
        }
        return f;
    }

    function Te(a, b) {
        return eb(a.trim(), /\S+/g, b);
    }

    function od(a, b) {
        var c = Array(a.length),
            d, e;
        d = 0;
        for (e = a.length; d < e; d++) {
            var f = a.charCodeAt(d);
            c[d] = f;
            b && b.call(a, f, d, a);
        }
        return c;
    }

    function fb(a) {
        var b = F.acronyms && F.acronyms.reg;
        return a.replace(/[-\s]+/g, "_").replace(b, function (a, b) {
            return (0 < b ? "_" : "") + a.toLowerCase();
        }).replace(/([A-Z\d]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").toLowerCase();
    }

    function Ue(a, b) {
        a = fb(a);
        return a.replace(Ve, function (a, d, e, f) {
            a = !1 !== b || 0 < f;
            return (d = F.acronyms && F.acronyms.find(e)) && a ? d : a ? gc(e, !0) : e;
        });
    }

    function gc(a, b, c) {
        b && (a = a.toLowerCase());
        return c ? a.replace(We, Ka) : Ka(a);
    }

    function Xe(a) {
        var b = /[.:;!]$/,
            c;
        a = Vc(a);
        a = fb(a).replace(/_/g, " ");
        return Te(a, function (a, e, f) {
            a = F.human && F.human.find(a) || a;
            a = F.acronyms && F.acronyms.find(a) || a;
            var d;
            d = 0 == e;
            f = e == f.length - 1;
            e = b.test(a);
            d = d || f || e || c;
            c = e;
            return d || -1 === Vb(Ye, a) ? gc(a, !1, !0) : a;
        }).join(" ");
    }

    function db(a, b, c) {
        if (c) {
            return db(a.split("").reverse().join(""), b).split("").reverse().join("");
        }
        var d = 0;
        return Xb(a.split(Ze), function (a) {
            d += a.length;
            return d <= b;
        }).join("");
    }

    function $e(a) {
        return a.replace(af, function (a, c, d) {
            return pd[d] || N(c ? parseInt(d, 16) : +d);
        });
    }

    function qd(a, b, c) {
        var d = 0,
            e;
        A(b) ? b = RegExp(Ma(b), "g") : b && !b.global && (b = RegExp(b.source, La(b, "g")));
        c ? (e = c, c = function () {
            var a = e[d++];
            return null != a ? a : "";
        }) : c = "";
        return a.replace(b, c);
    }

    function rd(a, b, c, d) {
        b = A(b) ? [b] : b;
        b = sa(b || [], function (a) {
            return Ma(a);
        }).join("|");
        b = b.replace("all", "") || "[^\\s>]+";
        return sd(a.toString(), RegExp("<(\\/)?(" + b + ")(\\s+[^<>]*?)?\\s*(\\/)?>", "gi"), d, c);
    }

    function sd(a, b, c, d, e) {
        function f(f, g, n, l, t) {
            var p = a.slice(h, f),
                q = "",
                m = "";
            A(d) ? m = d : d && (m = d.call(e, g, p, n, e) || "");
            c ? q = m : p = m;
            p && (p = sd(p, b, c, d, e));
            k += q + p + (t ? "" : q);
            h = f + (l || 0);
        }
        var g, k = "",
            h = 0,
            n, t, q = 0;
        e = e || a;
        for (b = RegExp(b.source, "gi"); g = b.exec(a);) {
            var p = g[2],
                l = (g[3] || "").slice(1),
                m = !!g[1],
                r = !!g[4],
                u = g[0].length,
                v = -1 !== Vb(bf, p.toLowerCase()),
                r = !m && !r && !v,
                w = p === n;
            n || (k += a.slice(h, g.index), h = g.index);
            r ? n ? w && q++ : (n = p, t = l, q++, h += u) : m && w ? (q--, 0 === q && (f(g.index, n, t, u, v), t = n = null)) : n || f(g.index, p, l, u, v);
        }
        n && f(a.length, n, t);
        return k += a.slice(h);
    }

    function td(a, b, c) {
        A(b) && (b = a.indexOf(b), -1 === b && (b = c ? a.length : 0));
        return b;
    }

    function ud(a, b) {
        var c;
        a && a.constructor && I(a.constructor.prototype) ? c = b ? Qa(a) : a : M(a) || A(a) ? c = Array.from(a) : r(a) && (c = [a]);
        return c || [];
    }

    function Qa(a) {
        var b = Array(a.length);
        y(a, function (a, d) {
            b[d] = a;
        });
        return b;
    }

    function cf(a) {
        var b = [];
        b.push(a);
        return b;
    }

    function df(a, b) {
        var c = Qa(a),
            d = c.length,
            e;
        e = I(b) ? b : [b];
        c.length += e.length;
        y(e, function (a, b) {
            c[d + b] = a;
        });
        return c;
    }

    function vd(a, b, c) {
        c = +c;
        isNaN(c) && (c = a.length);
        c = [c, 0];
        r(b) && (c = c.concat(b));
        a.splice.apply(a, c);
        return a;
    }

    function wd(a, b) {
        var c = [],
            d = {},
            e = [];
        y(a, function (f, g) {
            var k = b ? ra(f, b, a, [f, g, a]) : f,
                k = Ia(k, e);
            B(d, k) || (c.push(f), d[k] = !0);
        });
        return c;
    }

    function xd(a, b, c) {
        var d = [];
        b = b || Infinity;
        c = c || 0;
        y(a, function (a) {
            I(a) && c < b ? d = d.concat(xd(a, b, c + 1)) : d.push(a);
        });
        return d;
    }

    function ef(a, b) {
        return Xb(a, function (a) {
            return a || !b && null != a && a.valueOf() === a.valueOf();
        });
    }

    function ff(a, b, c) {
        var d = {},
            e;
        y(a, function (c, g) {
            e = ra(c, b, a, [c, g, a]);
            B(d, e) || (d[e] = []);
            d[e].push(c);
        });
        c && v(d, c);
        return d;
    }

    function yd(a, b, c) {
        var d = [],
            e = {},
            f = [];
        I(b) || (b = cf(b));
        y(b, function (a) {
            e[Ia(a, f)] = !0;
        });
        y(a, function (a) {
            var b = Ia(a, f);
            B(e, b) !== c && (delete e[b], d.push(a));
        });
        return d;
    }

    function zd(a, b) {
        var c, d;
        if (A(a) && A(b)) {
            return c = Ra("sortCollate"), c(a, b);
        }
        if (I(a) && I(b)) {
            if (a.length < b.length) {
                return -1;
            }
            if (a.length > b.length) {
                return 1;
            }
            for (d = 0; d < a.length; d++) {
                if (c = zd(a[d], b[d]), 0 !== c) {
                    return c;
                }
            }
            return 0;
        }
        return a < b ? -1 : a > b ? 1 : 0;
    }

    function Ad(a, b, c) {
        A(a) || (a = String(a));
        c && (a = a.toLowerCase());
        b && (a = a.replace(b, ""));
        return a;
    }

    function Bd(a, b, c) {
        a = a.charAt(b);
        return u(c, a) || a;
    }

    function hc(a, b, c, d, e) {
        if (I(a)) {
            for (var f, g, k = [], h = 0, n = a.length; h < n; h++) {
                f = a[h], f = (g = d + (d && b ? "[]" : "")) || M(f) ? hc(f, b, c, g, e) : ic(f), k.push(f);
            }
            d = k.join("&");
        } else {
            M(a) && a.toString === Rb ? d = gf(a, b, c, d, e) : d ? (a = c ? c(a, d) : U(a) ? a.getTime() : a, d = ic(d) + "=" + ic(a)) : d = "";
        }
        return d;
    }

    function gf(a, b, c, d, e) {
        var f = [];
        v(a, function (a, k) {
            f.push(hc(a, b, c, d && b ? d + "[" + k + "]" : d ? d + e + k : k, e));
        });
        return f.join("&");
    }

    function ic(a) {
        return a || !1 === a || 0 === a ? encodeURIComponent(a) : "";
    }

    function hf(a, b) {
        var c = String(a || "").replace(/^.*?\?/, ""),
            d = {},
            e;
        b = b || {};
        c && y(c.split("&"), function (a) {
            a = a.split("=");
            var c = decodeURIComponent(a[0]);
            a = 2 === a.length ? decodeURIComponent(a[1]) : "";
            e = !1 !== b.auto;
            var f = c,
                h = b.deep,
                c = e,
                n = b.separator,
                t = b.transform,
                q;
            if (n) {
                for (var f = f.split(n), h = f[0], n = 1, p = f.length; n < p; n++) {
                    h += "[" + f[n] + "]";
                }
                f = h;
                h = !0;
            }!0 === h && (q = f.match(jf)) ? kf(d, q, a, c, t) : Cd(d, f, a, c, t);
        });
        return d;
    }

    function kf(a, b, c, d, e) {
        var f = b[1];
        b = b[2].slice(1, -1).split("][");
        y(b, function (b) {
            B(a, f) || (a[f] = b ? {} : []);
            a = u(a, f);
            f = b ? b : a.length.toString();
        });
        Cd(a, f, c, d, e);
    }

    function Cd(a, b, c, d, e) {
        var f;
        e && (f = e(c, b, a));
        r(f) ? c = f : d && (c = lf(a, b, c));
        a[b] = c;
    }

    function lf(a, b, c) {
        if (c) {
            if ("true" === c) {
                return !0;
            }
            if ("false" === c) {
                return !1;
            }
        } else {
            return null;
        }
        var d = +c;
        if (!isNaN(d) && "" !== c && !mf.test(c)) {
            return d;
        }
        a = u(a, b);
        return c && a ? I(a) ? a.concat(c) : [a, c] : c;
    }

    function jc(a, b, c) {
        c = c || {};
        return Hb(a, b, c.deep, c.resolve, c.hidden, c.descriptor);
    }

    function kc(a, b, c) {
        I(b) || (b = [b]);
        y(b, function (b) {
            return jc(a, b, c);
        });
        return a;
    }

    function nf(a, b, c) {
        lc && a ? Dd(lc, b, c, a) : v(b, c);
        Ed && Dd(Ed, b, c, a);
    }

    function Dd(a, b, c, d) {
        a = a(b);
        for (var e, f = 0, g; g = a[f]; f++) {
            e = Fd(b, g), (e.enumerable || d) && c(b[g], g);
        }
    }

    function Hb(a, b, c, d, e, f) {
        var g = L(d),
            k = !1 !== d;
        z(a) ? a = Gd(b) : k && U(a) && U(b) && a.setTime(b.getTime());
        if (qa(a)) {
            return b;
        }
        qa(b) && (b = Xa(b));
        nf(e, b, function (h, n) {
            var t, q, p, l;
            t = b[n];
            q = u(a, n);
            if (g) {
                l = d(n, q, t, a, b);
                if (z(l)) {
                    return;
                }
                r(l) && l !== m && (t = l, p = !0);
            } else {
                if (z(t)) {
                    return;
                }
            }
            if ((p = !p && c && M(t) && !ja(t)) || k || !r(q)) {
                p && (t = Hb(q, t, c, d, e, f)), lc && f ? (q = a, p = Fd(b, n), r(p.value) && (p.value = t), pb(q, n, p)) : a[n] = t;
            }
        });
        return a;
    }

    function Gd(a) {
        var b = W(a);
        if (I(a, b)) {
            return [];
        }
        if (sb(a, b)) {
            return {};
        }
        if (U(a, b)) {
            return new Date(a.getTime());
        }
        if (ja(a, b)) {
            return RegExp(a.source, La(a));
        }
        if (qa(a && a.valueOf())) {
            return a;
        }
        throw new TypeError("Must be a basic data type");
    }

    function mc(a, b) {
        var c = Gd(a);
        return Hb(c, a, b, !0, !0, !0);
    }

    function of (a) {
        var b = [];
        v(a, function (a) {
            b.push(a);
        });
        return b;
    }

    function pf(a, b) {
        var c = b;
        L(b) || (c = function () {
            if (b) {
                a[b]();
            }
        });
        c.call(a, a);
        return a;
    }

    function Hd(a, b, c) {
        var d, e = {};
        b = [].concat(b);
        v(a, function (a, g) {
            d = !1;
            for (var f = 0; f < b.length; f++) {
                var h = b[f],
                    n = g;
                (ja(h) ? h.test(n) : M(h) ? n in h : n === String(h)) && (d = !0);
            }
            d === c && (e[g] = a);
        });
        return e;
    }

    function qf(a, b) {
        var c = ia(b);
        v(a, function (b, e) {
            c(b, e, a) && delete a[e];
        });
        return a;
    }

    function rf(a, b) {
        var c = {},
            d = ia(b);
        v(a, function (b, f) {
            d(b, f, a) || (c[f] = b);
        });
        return c;
    }

    function Id(a, b, c) {
        if (!M(a)) {
            return c ? a : {};
        }
        b = Xa(b);
        return Hb({}, a, !1, function (a, e, f) {
            if ((a in b && Aa(f, b[a])) !== c) {
                return f;
            }
        });
    }

    function Jd(a, b) {
        var c = 0;
        gb(a, b, function (a) {
            c += a;
        });
        return c;
    }

    function Kd(a, b) {
        var c = 0,
            d = 0;
        gb(a, b, function (a) {
            c += a;
            d++;
        });
        return c / (d || 1);
    }

    function Ld(a, b) {
        var c = [],
            d, e;
        gb(a, b, function (a) {
            c.push(a);
        });
        e = c.length;
        if (!e) {
            return 0;
        }
        c.sort(function (a, b) {
            return (a || 0) - (b || 0);
        });
        d = S(e / 2);
        return e % 2 ? c[d] : (c[d - 1] + c[d]) / 2;
    }

    function hb(a, b, c, d, e) {
        var f = [],
            g, k, h;
        Sa(b) && (h = b, b = c);
        gb(a, b, function (b, c) {
            if (z(b)) {
                throw new TypeError("Cannot compare with undefined");
            }
            g = e ? c : a[c];
            if (b === k) {
                f.push(g);
            } else {
                if (z(k) || d && b > k || !d && b < k) {
                    f = [g], k = b;
                }
            }
        });
        return Md(f, a, h, e);
    }

    function Ib(a, b, c, d, e) {
        var f = {},
            g = [],
            k, h;
        Sa(b) && (h = b, b = c);
        gb(a, b, function (b, c) {
            var d = Ia(b, g),
                h = u(f, d) || [];
            h.push(e ? c : a[c]);
            f[d] = h;
        });
        d = hb(f, !!h, "length", d, !0);
        h ? (k = [], v(d, function (a) {
            k = k.concat(a);
        })) : k = u(f, d);
        return Md(k, a, h, e);
    }

    function Md(a, b, c, d) {
        if (d && c) {
            return a.reduce(function (a, c) {
                a[c] = b[c];
                return a;
            }, {});
        }
        a && !c && (a = a[0]);
        return a;
    }

    function gb(a, b, c) {
        var d = I(a);
        v(a, function (e, f) {
            if (d) {
                if (f >>> 0 != f || 4294967295 == f) {
                    return;
                }
                f = +f;
            }
            var g = ra(e, b, a, [e, f, a]);
            c(g, f);
        });
    }

    function Nd(a, b) {
        if (L(a)) {
            return a;
        }
        if (a) {
            return function (c, d, e) {
                return ra(c, a, b, [c, d, e]);
            };
        }
    }

    function wa(a) {
        var b;
        if (L(a)) {
            return a;
        }
        b = ia(a);
        return function (a, d, e) {
            return b(a, d, e);
        };
    }

    function Ta(a, b) {
        var c = Array.prototype[a];
        return function (a, e, f, g) {
            var d = Array(2);
            Lc(0 < g);
            d[0] = b(e, f);
            d[1] = f;
            return c.apply(a, d);
        };
    }

    function sf(a, b) {
        rb(b);
        v(a, function (c, d) {
            b(c, d, a);
        });
        return a;
    }

    function tf(a, b) {
        var c = {};
        v(a, function (d, e) {
            c[e] = ra(d, b, a, [d, e, a]);
        });
        return c;
    }

    function uf(a, b, c) {
        var d = r(c);
        v(a, function (e, f) {
            d ? c = b(c, e, f, a) : (c = e, d = !0);
        });
        return c;
    }

    function vf(a, b) {
        var c = ia(b),
            d = {};
        v(a, function (b, f) {
            c(b, f, a) && (d[f] = b);
        });
        return d;
    }

    function wf(a, b) {
        var c = ia(b),
            d = 0;
        v(a, function (b, f) {
            c(b, f, a) && d++;
        });
        return d;
    }

    function nc(a) {
        var b = Array.prototype[a];
        return function (a, d) {
            var c = ia(d);
            return b.call(Object.keys(a), function (b) {
                return c(a[b], b, a);
            });
        };
    }

    function oc(a, b, c, d) {
        var e = a.toFixed(20),
            f = e.search(/\./),
            e = e.search(/[1-9]/),
            f = f - e,
            g, k;
        0 < f && --f;
        e = c.split(",");
        1 === e.length && (e = c.split(""));
        g = e.indexOf("|"); - 1 === g && (g = "_" === e[0] ? 0 : e.length);
        k = G(ea(Oa(f / 3), e.length - g - 1), -g);
        for (c = e[k + g];
            "_" === c;) {
            k += 0 > k ? -1 : 1, c = e[k + g];
        }
        "|" === c && (c = ""); - 9 > f && (b = ca(f) - 9);
        d = d ? zb(2, 10 * k) : zb(10, 3 * k);
        return Od(Ya(a / d, b || 0)) + c;
    }

    function Od(a, b) {
        var c = "",
            d, e, f, g, k;
        e = Pd("decimal");
        d = Pd("thousands");
        k = H(b) ? Ya(a, b || 0).toFixed(G(b, 0)) : a.toString();
        k = k.replace(/^-/, "");
        f = k.split(".");
        g = f[0];
        f = f[1];
        if (/e/.test(k)) {
            c = k;
        } else {
            for (k = g.length; 0 < k; k -= 3) {
                k < g.length && (c = d + c), c = g.slice(G(0, k - 3), k) + c;
            }
        }
        f && (c += e + Ab("0", (b || 0) - f.length) + f);
        return (0 > a ? "-" : "") + c;
    }

    function pc(a) {
        return function (b, c) {
            return c ? Ya(b, c, a) : a(b);
        };
    }

    function Ua(a, b, c, d, e) {
        b = za(b || 0);
        Jb(a) || Jb(a, []);
        qc(a, !1);
        Jb(a).push(setTimeout(function () {
            qc(a) || c.apply(d, e || []);
        }, b));
    }

    function Qd(a) {
        var b = Jb(a),
            c;
        if (I(b)) {
            for (; c = b.shift();) {
                clearTimeout(c);
            }
        }
        qc(a, !0);
        return a;
    }

    function Rd(a, b, c, d) {
        function e() {
            if (f.length < d - (g && c ? 1 : 0)) {
                for (var a = [], b = 0, n = arguments.length; b < n; b++) {
                    a.push(arguments[b]);
                }
                f.push([this, a]);
            }
            g || (g = !0, c ? k() : Ua(e, h, k));
            return t;
        }
        var f = [],
            g = !1,
            k, h, n, t;
        b = b || 1;
        d = d || Infinity;
        h = na(b);
        n = Za(h / b) || 1;
        k = function () {
            var b = f.length,
                c;
            if (0 != b) {
                for (c = G(b - n, 0); b > c;) {
                    t = Function.prototype.apply.apply(a, f.shift()), b--;
                }
                Ua(e, h, function () {
                    g = !1;
                    k();
                });
            }
        };
        return e;
    }

    function xf() {
        for (var a = arguments, b = a.length, c = Array(b); b--;) {
            c[b] = a[b];
        }
        return c;
    }

    function yf(a, b, c) {
        var d = {},
            e = [],
            f = 0;
        return function () {
            var g = b.apply(this, arguments),
                g = Ia(g, e);
            if (B(d, g)) {
                return u(d, g);
            }
            f === c && (d = {}, e = [], f = 0);
            f++;
            return d[g] = a.apply(this, arguments);
        };
    }

    function R(a, b) {
        this.start = rc(a);
        this.end = rc(b);
    }

    function Sd(a) {
        return A(a) ? a.charCodeAt(0) : a;
    }

    function Td(a) {
        return null == a ? a : U(a) ? a.getTime() : a.valueOf();
    }

    function Ud(a) {
        a = a.toString().split(".");
        return a[1] ? a[1].length : 0;
    }

    function rc(a) {
        return U(a) ? new Date(a.getTime()) : Td(a);
    }

    function Vd(a) {
        var b = Td(a);
        return (!!b || 0 === b) && -Infinity !== a && Infinity !== a;
    }

    function Kb(a) {
        return Vd(a.start) && Vd(a.end) && typeof a.start === typeof a.end;
    }

    function Lb(a, b, c, d) {
        var e, f, g, k = a.start,
            h = a.end,
            n = h < k,
            t = k,
            q = 0,
            p = [];
        if (!Kb(a)) {
            return c ? NaN : [];
        }
        L(b) && (d = b, b = null);
        b = b || 1;
        H(k) ? (f = G(Ud(k), Ud(b)), e = function () {
            return Ya(t + b, f);
        }) : A(k) ? e = function () {
            return N(t.charCodeAt(0) + b);
        } : U(k) && (e = Wd(b), b = e[0], g = e[1], e = function () {
            return Xd(t, b, g);
        });
        for (n && 0 < b && (b *= -1); n ? t >= h : t <= h;) {
            c || p.push(t), d && d(t, q, a), t = e(), q++;
        }
        return c ? q - 1 : p;
    }

    function Wd(a) {
        var b;
        if (H(a)) {
            return [a, "Milliseconds"];
        }
        b = a.match(zf);
        a = +b[1] || 1;
        b = Ka(b[2].toLowerCase());
        b.match(/hour|minute|second/i) ? b += "s" : "Year" === b ? b = "FullYear" : "Week" === b ? (b = "Date", a *= 7) : "Day" === b && (b = "Date");
        return [a, b];
    }

    function Xd(a, b, c) {
        var d = Yd[c];
        d ? d = new Date(a.getTime() + b * d) : (d = new Date(a), Na(d, c, O(a, c) + b));
        return d;
    }

    function sc(a, b) {
        var c = a.start,
            d = a.end,
            e = d < c ? d : c,
            c = c > d ? c : d;
        return rc(b < e ? e : b > c ? c : b);
    }

    function Va(a) {
        return U(a) ? a : null == a ? new Date : T.create ? T.create(a) : new Date(a);
    }

    function w(a, b) {
        b = b || a;
        ib("plural", a, b);
        A(a) && x(b, a);
    }

    function x(a, b) {
        ib("singular", a, b);
    }

    function pa(a, b) {
        var c = RegExp(a + "$", "i"),
            d = RegExp(b + "$", "i");
        w(c, b);
        w(d, b);
        x(d, a);
        x(c, a);
    }

    function Af() {
        y(ga("equipment information rice money species series fish deer sheep jeans"), function (a) {
            w(a);
        });
    }

    function Zd(a, b) {
        ib("human", a, b);
    }

    function Bf() {
        var a = [];
        v(F.acronyms.map, function (b, c) {
            c === b && a.push(b);
        });
        a.sort(function (a, c) {
            return c.length - a.length;
        });
        F.acronyms.reg = RegExp("\\b" + a.join("|") + "\\b", "g");
    }

    function ib(a, b, c) {
        F[a] || (F[a] = new tc);
        F[a].add(b, c);
    }

    function uc(a, b, c, d) {
        var e = Mb[d];
        b = (b || "").replace(/all/, "").replace(/(\w)lphabet|umbers?|atakana|paces?|unctuation/g, "$1");
        return a.replace(c, function (a) {
            var c = e[a],
                d;
            if (c) {
                if ("" === b && c.all) {
                    return c.all;
                }
                for (var f = 0, n = b.length; f < n; f++) {
                    if (d = c[b.charAt(f)]) {
                        return d;
                    }
                }
            }
            return a;
        });
    }
    var m, Fa = "undefined" !== typeof global && global.Object === Object ? global : this,
        Cf = "undefined" !== typeof module && module.O,
        Pb = !1,
        ob = {},
        Ec = {},
        pb = Object.defineProperty && Object.defineProperties ? Object.defineProperty : te,
        Gc = Dc("Chainable"),
        Hc = Object.getOwnPropertyNames,
        Rb = Object.prototype.toString,
        ue = Object.prototype.hasOwnProperty;
    (function () {
        m = Fa.Sugar;
        if (!m) {
            m = function (a) {
                v(m, function (b, c) {
                    B(ob, c) && b.extend(a);
                });
                return m;
            };
            if (Cf) {
                module.O = m;
            } else {
                try {
                    Fa.Sugar = m;
                } catch (a) {}
            }
            v("Object Number String Array Date RegExp Function".split(" "), function (a) {
                Cc(a);
            });
            C(m, "extend", m);
            C(m, "toString", oe);
            C(m, "createNamespace", Cc);
            C(m, "util", {
                hasOwn: B,
                getOwn: u,
                setProperty: C,
                classToString: W,
                defineProperty: pb,
                forEachProperty: v,
                mapNativeToChainable: Qb
            });
        }
    })();
    var De = !("0" in Object("a")),
        Ce = /^(.*?)\[([-\d]*)\.\.([-\d]*)\](.*)$/,
        He = /([{}])\1|\{([^}]*)\}|(%)%|(%(\w*))/g,
        jb = m.Object,
        V = m.Array,
        T = m.Date,
        aa = m.String,
        fa = m.Number,
        $d = m.Function,
        ae = m.RegExp,
        B = m.util.hasOwn,
        u = m.util.getOwn,
        C = m.util.setProperty,
        W = m.util.classToString,
        pb = m.util.defineProperty,
        v = m.util.forEachProperty,
        Qb = m.util.mapNativeToChainable,
        vb, Sa, H, A, U, ja, L, I, wb, xb, yb, be = ya("alias"),
        xa = ya("defineStatic"),
        K = ya("defineInstance"),
        ce = ya("defineStaticPolyfill"),
        vc = ya("defineInstancePolyfill"),
        Sb = ya("defineInstanceAndStatic"),
        kb = ya("defineInstanceWithArguments"),
        S = Math.trunc || function (a) {
            return 0 !== a && isFinite(a) ? 0 > a ? na(a) : Oa(a) : a;
        },
        Tc, Ba, md, ca = Math.abs,
        zb = Math.pow,
        ea = Math.min,
        G = Math.max,
        na = Math.ceil,
        Oa = Math.floor,
        Za = Math.round,
        N = String.fromCharCode,
        F = {},
        P = Wa("utc"),
        Je = 1000;
    (function () {
        function a(a) {
            f["[object " + a + "]"] = !0;
        }

        function b(a, b) {
            return b && qb(new b, "Object") ? c(b) : d(a);
        }

        function c(a) {
            var b = String(a);
            return function (a) {
                return String(a.constructor) === b;
            };
        }

        function d(a) {
            return function (b, c) {
                return qb(b, a, c);
            };
        }

        function e(a) {
            var b = a.toLowerCase();
            return function (c) {
                var d = typeof c;
                return d === b || "object" === d && qb(c, a);
            };
        }
        var f = {};
        (function () {
            var c = ga("Boolean Number String Date RegExp Function Array Error Set Map");
            Sa = e(c[0]);
            H = e(c[1]);
            A = e(c[2]);
            U = b(c[3]);
            ja = b(c[4]);
            L = b(c[5]);
            I = Array.isArray || b(c[6]);
            yb = b(c[7]);
            wb = b(c[8], "undefined" !== typeof Set && Set);
            xb = b(c[9], "undefined" !== typeof Map && Map);
            a("Arguments");
            a(c[0]);
            a(c[1]);
            a(c[2]);
            a(c[3]);
            a(c[4]);
            a(c[6]);
        })();
        (function () {
            y(ga("Int8 Uint8 Uint8Clamped Int16 Uint16 Int32 Uint32 Float32 Float64"), function (b) {
                a(b + "Array");
            });
        })();
        vb = function (a, b) {
            b = b || W(a);
            return f[b] || sb(a, b);
        };
    })();
    (function () {
        var a = "";
        Ba = {};
        for (var b = 0, c; 9 >= b; b++) {
            c = N(b + 65296), a += c, Ba[c] = N(b + 48);
        }
        Ba[","] = "";
        Ba["\uff0e"] = ".";
        Ba["."] = ".";
        Tc = RegExp("[" + (a + "\uff0e,.") + "]", "g");
        md = a;
    })();
    vc(aa, {
        includes: function (a) {
            var b = arguments[1],
                c = Zb(this);
            a = $b(a);
            return -1 !== c.indexOf(a, b);
        },
        startsWith: function (a) {
            var b = arguments[1],
                c, d, e;
            c = Zb(this);
            a = $b(a);
            d = c.length;
            b = ea(G(+b || 0, 0), d);
            e = a.length;
            return e + b > d ? !1 : c.substr(b, e) === a ? !0 : !1;
        },
        endsWith: function (a) {
            var b = arguments[1],
                c, d, e;
            c = Zb(this);
            a = $b(a);
            d = e = c.length;
            r(b) && (d = +b || 0);
            d = ea(G(d, 0), e);
            b = a.length;
            d -= b;
            return 0 > d ? !1 : c.substr(d, b) === a ? !0 : !1;
        },
        repeat: function (a) {
            a = za(a);
            return Ab(this, a);
        }
    });
    ce(fa, {
        isNaN: function (a) {
            return null != a && a !== a;
        }
    });
    ce(V, {
        from: function (a) {
            var b = arguments[1],
                c = arguments[2],
                d, e;
            r(b) && rb(b);
            if (null == a) {
                throw new TypeError("Object required.");
            }
            a = Xa(a);
            d = S(G(0, a.length || 0));
            if (d >>> 0 != d || 4294967295 == d) {
                throw new RangeError("Invalid array length");
            }
            L(this) ? (e = new this(d), e.length = d) : e = Array(d);
            for (var f = 0; f < d; f++) {
                C(e, f, r(b) ? b.call(c, a[f], f) : a[f], !0);
            }
            return e;
        }
    });
    vc(V, {
        find: function (a) {
            var b = arguments[1];
            rb(a);
            for (var c = 0, d = this.length; c < d; c++) {
                if (a.call(b, this[c], c, this)) {
                    return this[c];
                }
            }
        },
        findIndex: function (a) {
            var b = arguments[1];
            rb(a);
            for (var c = 0, d = this.length; c < d; c++) {
                if (a.call(b, this[c], c, this)) {
                    return c;
                }
            }
            return -1;
        }
    });
    vc(V, {
        includes: function (a) {
            var b = arguments[1],
                c;
            if (A(this)) {
                return this.includes(a, b);
            }
            b = b ? b.valueOf() : 0;
            c = this.length;
            for (0 > b && (b = G(0, b + c)); b < c; b++) {
                var d = this[b];
                if (null != a && a !== a ? null != d && d !== d : a === d && (0 !== a || 1 / a === 1 / d)) {
                    return !0;
                }
            }
            return !1;
        }
    });
    var Re = "months weekdays units numerals placeholders articles tokens timeMarkers ampm timeSuffixes parse timeParse timeFrontParse modifiers".split(" "),
        Df = /(\w{3})[()\s\d]*$/,
        fc = {
            yyyy: {
                h: "year",
                src: "\\d{4}"
            },
            MM: {
                h: "month",
                src: "[01]?\\d"
            },
            dd: {
                h: "date",
                src: "[0123]?\\d"
            },
            hh: {
                h: "hour",
                src: "[0-2]?\\d"
            },
            mm: {
                h: "minute",
                src: "[0-5]\\d"
            },
            ss: {
                h: "second",
                src: "[0-5]\\d(?:[,.]\\d+)?"
            },
            yy: {
                h: "year",
                src: "\\d{2}"
            },
            y: {
                h: "year",
                src: "\\d"
            },
            yearSign: {
                src: "[+-]",
                sign: !0
            },
            tzHour: {
                src: "[0-1]\\d"
            },
            tzMinute: {
                src: "[0-5]\\d"
            },
            tzSign: {
                src: "[+\u2212-]",
                sign: !0
            },
            ihh: {
                h: "hour",
                src: "[0-2]?\\d(?:[,.]\\d+)?"
            },
            imm: {
                h: "minute",
                src: "[0-5]\\d(?:[,.]\\d+)?"
            },
            GMT: {
                h: "utc",
                src: "GMT",
                C: 1
            },
            Z: {
                h: "utc",
                src: "Z",
                C: 1
            },
            timestamp: {
                src: "\\d+"
            }
        },
        jd = {
            year: {
                i: "yyyy",
                A: !0
            },
            month: {
                i: "MM",
                A: !0
            },
            date: {
                i: "dd",
                A: !0
            },
            hour: {
                i: "hh",
                J: ":"
            },
            minute: {
                i: "mm"
            },
            second: {
                i: "ss"
            },
            num: {
                src: "\\d+",
                $: !0
            }
        },
        Se = [{
            src: "{MM}[-.\\/]{yyyy}"
        }, {
            time: !0,
            src: "{dd}[-.\\/]{MM}(?:[-.\\/]{yyyy|yy|y})?",
            mdy: "{MM}[-.\\/]{dd}(?:[-.\\/]{yyyy|yy|y})?"
        }, {
            time: !0,
            src: "{yyyy}[-.\\/]{MM}(?:[-.\\/]{dd})?"
        }, {
            src: "\\\\/Date\\({timestamp}(?:[+-]\\d{4,4})?\\)\\\\/"
        }, {
            src: "{yearSign?}{yyyy}(?:-?{MM}(?:-?{dd}(?:T{ihh}(?::?{imm}(?::?{ss})?)?)?)?)?{tzOffset?}"
        }],
        gd = {
            ISO8601: "{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{SSS}{Z}",
            RFC1123: "{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {ZZ}",
            RFC1036: "{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {ZZ}"
        },
        Ef = [{
            b: "Dow",
            a: "a",
            j: "dow",
            get: function (a, b) {
                return D.get(b).I(J(a), 2);
            }
        }, {
            b: "Weekday",
            a: "A",
            j: "weekday",
            D: !0,
            get: function (a, b, c) {
                return D.get(b).I(J(a), c);
            }
        }, {
            b: "Mon",
            a: "b h",
            j: "mon",
            get: function (a, b) {
                return D.get(b).H(X(a), 2);
            }
        }, {
            b: "Month",
            a: "B",
            j: "month",
            D: !0,
            get: function (a, b, c) {
                return D.get(b).H(X(a), c);
            }
        }, {
            a: "C",
            get: function (a) {
                return ka(a).toString().slice(0, 2);
            }
        }, {
            b: "d date day",
            a: "d",
            g: 2,
            c: "dd",
            l: "do",
            get: function (a) {
                return da(a);
            }
        }, {
            a: "e",
            get: function (a) {
                return Ja(da(a), 2, !1, 10, " ");
            }
        }, {
            b: "H 24hr",
            a: "H",
            g: 2,
            c: "HH",
            get: function (a) {
                return O(a, "Hours");
            }
        }, {
            b: "h hours 12hr",
            a: "I",
            g: 2,
            c: "hh",
            get: function (a) {
                return O(a, "Hours") % 12 || 12;
            }
        }, {
            b: "D",
            a: "j",
            g: 3,
            c: "DDD",
            get: function (a) {
                var b = Y(ta(a), 6);
                return Db(a, b, ma[4]) + 1;
            }
        }, {
            b: "M",
            a: "m",
            g: 2,
            l: "Mo",
            c: "MM",
            get: function (a) {
                return X(a) + 1;
            }
        }, {
            b: "m minutes",
            a: "M",
            g: 2,
            c: "mm",
            get: function (a) {
                return O(a, "Minutes");
            }
        }, {
            b: "Q",
            get: function (a) {
                return na((X(a) + 1) / 3);
            }
        }, {
            b: "TT",
            a: "p",
            get: function (a, b) {
                return dc(a, b);
            }
        }, {
            b: "tt",
            a: "P",
            get: function (a, b) {
                return dc(a, b).toLowerCase();
            }
        }, {
            b: "T",
            j: "t",
            get: function (a, b) {
                return dc(a, b).charAt(0);
            }
        }, {
            b: "s seconds",
            a: "S",
            g: 2,
            c: "ss",
            get: function (a) {
                return O(a, "Seconds");
            }
        }, {
            b: "S ms",
            g: 3,
            c: "SSS",
            get: function (a) {
                return O(a, "Milliseconds");
            }
        }, {
            b: "e",
            a: "u",
            l: "eo",
            get: function (a) {
                return J(a) || 7;
            }
        }, {
            a: "U",
            g: 2,
            get: function (a) {
                return Pa(a, !1, 0);
            }
        }, {
            b: "W",
            a: "V",
            g: 2,
            l: "Wo",
            c: "WW",
            get: function (a) {
                return Pa(a, !0);
            }
        }, {
            a: "w",
            get: function (a) {
                return J(a);
            }
        }, {
            b: "w",
            l: "wo",
            c: "ww",
            get: function (a, b) {
                var c = D.get(b);
                return Pa(a, !0, c.s(b), c.G(b));
            }
        }, {
            a: "W",
            g: 2,
            get: function (a) {
                return Pa(a, !1);
            }
        }, {
            c: "gggg",
            u: "gg",
            get: function (a, b) {
                return cd(a, b);
            }
        }, {
            a: "G",
            g: 4,
            B: "g",
            c: "GGGG",
            u: "GG",
            get: function (a, b) {
                return cd(a, b, !0);
            }
        }, {
            b: "year",
            c: "yyyy",
            u: "yy",
            a: "Y",
            g: 4,
            B: "y",
            get: function (a) {
                return ka(a);
            }
        }, {
            b: "ZZ",
            a: "z",
            get: function (a) {
                return ac(a);
            }
        }, {
            b: "X",
            get: function (a) {
                return S(a.getTime() / 1000);
            }
        }, {
            b: "x",
            get: function (a) {
                return a.getTime();
            }
        }, {
            b: "Z",
            get: function (a) {
                return ac(a, !0);
            }
        }, {
            b: "z",
            a: "Z",
            get: function (a) {
                return (a = a.toString().match(Df)) ? a[1] : "";
            }
        }, {
            a: "D",
            alias: "%m/%d/%y"
        }, {
            a: "F",
            alias: "%Y-%m-%d"
        }, {
            a: "r",
            alias: "%I:%M:%S %p"
        }, {
            a: "R",
            alias: "%H:%M"
        }, {
            a: "T",
            alias: "%H:%M:%S"
        }, {
            a: "x",
            alias: "{short}"
        }, {
            a: "X",
            alias: "{time}"
        }, {
            a: "c",
            alias: "{stamp}"
        }],
        ma = [{
            name: "millisecond",
            method: "Milliseconds",
            f: 1,
            start: 0,
            end: 999
        }, {
            name: "second",
            method: "Seconds",
            f: 1000,
            start: 0,
            end: 59
        }, {
            name: "minute",
            method: "Minutes",
            f: 60000,
            start: 0,
            end: 59
        }, {
            name: "hour",
            method: "Hours",
            f: 3600000,
            start: 0,
            end: 23
        }, {
            name: "day",
            alias: "date",
            method: "Date",
            m: !0,
            f: 86400000,
            start: 1,
            end: function (a) {
                return Xc(a);
            }
        }, {
            name: "week",
            method: "ISOWeek",
            m: !0,
            f: 604800000
        }, {
            name: "month",
            method: "Month",
            m: !0,
            f: 2629800000,
            start: 0,
            end: 11
        }, {
            name: "year",
            method: "FullYear",
            m: !0,
            f: 31557600000,
            start: 0
        }],
        Ke = Tb(T, {
            newDateInternal: function () {
                return new Date;
            }
        }),
        Q, lb, Eb, Ea, D;
    xa(T, {
        create: function (a, b) {
            return oa(a, b);
        },
        getLocale: function (a) {
            return D.get(a, !a);
        },
        getAllLocales: function () {
            return D.getAll();
        },
        getAllLocaleCodes: function () {
            return Object.keys(D.getAll());
        },
        setLocale: function (a) {
            return D.set(a);
        },
        addLocale: function (a, b) {
            return D.add(a, b);
        },
        removeLocale: function (a) {
            return D.remove(a);
        }
    });
    kb(T, {
        set: function (a, b) {
            b = Yc(b);
            return va(a, b[0], b[1]);
        },
        advance: function (a, b) {
            return $c(a, b, 1);
        },
        rewind: function (a, b) {
            return $c(a, b, -1);
        }
    });
    K(T, {
        get: function (a, b, c) {
            return cb(a, b, c, void 0).date;
        },
        setWeekday: function (a, b) {
            return ua(a, b);
        },
        setISOWeek: function (a, b) {
            return bd(a, b);
        },
        getISOWeek: function (a) {
            return Pa(a, !0);
        },
        beginningOfISOWeek: function (a) {
            var b = J(a);
            0 === b ? b = -6 : 1 !== b && (b = 1);
            ua(a, b);
            return Y(a, 3);
        },
        endOfISOWeek: function (a) {
            0 !== J(a) && ua(a, 7);
            return Cb(a, 4);
        },
        getUTCOffset: function (a, b) {
            return ac(a, b);
        },
        setUTC: function (a, b) {
            return P(a, b);
        },
        isUTC: function (a) {
            return !!P(a) || 0 === a.getTimezoneOffset();
        },
        isValid: function (a) {
            return !isNaN(a.getTime());
        },
        isAfter: function (a, b, c) {
            return a.getTime() > oa(b).getTime() - (c || 0);
        },
        isBefore: function (a, b, c) {
            return a.getTime() < oa(b).getTime() + (c || 0);
        },
        isBetween: function (a, b, c, d) {
            a = a.getTime();
            b = oa(b).getTime();
            var e = oa(c).getTime();
            c = ea(b, e);
            b = G(b, e);
            d = d || 0;
            return c - d <= a && b + d >= a;
        },
        isLeapYear: function (a) {
            a = ka(a);
            return 0 === a % 4 && 0 !== a % 100 || 0 === a % 400;
        },
        daysInMonth: function (a) {
            return Xc(a);
        },
        format: function (a, b, c) {
            return ed(a, b, c);
        },
        relative: function (a, b, c) {
            return dd(a, null, b, c);
        },
        relativeTo: function (a, b, c) {
            return dd(a, oa(b), c);
        },
        is: function (a, b, c) {
            return hd(a, b, c);
        },
        reset: function (a, b, c) {
            b = b ? Ne(b) : 4;
            bb(a, b, c);
            return a;
        },
        clone: function (a) {
            return ta(a);
        },
        iso: function (a) {
            return a.toISOString();
        },
        getWeekday: function (a) {
            return J(a);
        },
        getUTCWeekday: function (a) {
            return a.getUTCDay();
        }
    });
    K(fa, {
        duration: function (a, b) {
            return D.get(b).P(a);
        }
    });
    var wc = {
            code: "en",
            plural: !0,
            timeMarkers: "at",
            ampm: "AM|A.M.|a,PM|P.M.|p",
            units: "millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s",
            months: "Jan:uary|,Feb:ruary|,Mar:ch|,Apr:il|,May,Jun:e|,Jul:y|,Aug:ust|,Sep:tember|t|,Oct:ober|,Nov:ember|,Dec:ember|",
            weekdays: "Sun:day|,Mon:day|,Tue:sday|,Wed:nesday|,Thu:rsday|,Fri:day|,Sat:urday|+weekend",
            numerals: "zero,one|first,two|second,three|third,four:|th,five|fifth,six:|th,seven:|th,eight:|h,nin:e|th,ten:|th",
            articles: "a,an,the",
            tokens: "the,st|nd|rd|th,of|in,a|an,on",
            time: "{H}:{mm}",
            past: "{num} {unit} {sign}",
            future: "{num} {unit} {sign}",
            duration: "{num} {unit}",
            modifiers: [{
                name: "half",
                src: "half",
                value: 0.5
            }, {
                name: "midday",
                src: "noon",
                value: 12
            }, {
                name: "midday",
                src: "midnight",
                value: 24
            }, {
                name: "day",
                src: "yesterday",
                value: -1
            }, {
                name: "day",
                src: "today|tonight",
                value: 0
            }, {
                name: "day",
                src: "tomorrow",
                value: 1
            }, {
                name: "sign",
                src: "ago|before",
                value: -1
            }, {
                name: "sign",
                src: "from now|after|from|in|later",
                value: 1
            }, {
                name: "edge",
                src: "first day|first|beginning",
                value: -2
            }, {
                name: "edge",
                src: "last day",
                value: 1
            }, {
                name: "edge",
                src: "end|last",
                value: 2
            }, {
                name: "shift",
                src: "last",
                value: -1
            }, {
                name: "shift",
                src: "the|this",
                value: 0
            }, {
                name: "shift",
                src: "next",
                value: 1
            }],
            parse: "(?:just)? now;{shift} {unit:5-7};{months?} (?:{year}|'{yy});{midday} {4?} {day|weekday};{months},?(?:[-.\\/\\s]{year})?;{edge} of (?:day)? {day|weekday};{0} {num}{1?} {weekday} {2} {months},? {year?};{shift?} {day?} {weekday?} {timeMarker?} {midday};{sign?} {3?} {half} {3?} {unit:3-4|unit:7} {sign?};{0?} {edge} {weekday?} {2} {shift?} {unit:4-7?} {months?},? {year?}".split(";"),
            timeParse: "{day|weekday};{shift} {unit:5?} {weekday};{0?} {date}{1?} {2?} {months?};{weekday} {2?} {shift} {unit:5};{0?} {num} {2?} {months}\\.?,? {year?};{num?} {unit:4-5} {sign} {day|weekday};{year}[-.\\/\\s]{months}[-.\\/\\s]{date};{0|months} {date?}{1?} of {shift} {unit:6-7};{0?} {num}{1?} {weekday} of {shift} {unit:6};{date}[-.\\/\\s]{months}[-.\\/\\s](?:{year}|'?{yy});{weekday?}\\.?,? {months}\\.?,? {date}{1?},? (?:{year}|'{yy})?".split(";"),
            timeFrontParse: ["{sign} {num} {unit}", "{num} {unit} {sign}", "{4?} {day|weekday}"]
        },
        de = ba(ba({}, wc), {
            mdy: !0,
            firstDayOfWeek: 0,
            firstDayOfWeekYear: 1,
            "short": "{MM}/{dd}/{yyyy}",
            medium: "{Month} {d}, {yyyy}",
            "long": "{Month} {d}, {yyyy} {time}",
            full: "{Weekday}, {Month} {d}, {yyyy} {time}",
            stamp: "{Dow} {Mon} {d} {yyyy} {time}",
            time: "{h}:{mm} {TT}"
        }),
        ee = ba(ba({}, wc), {
            "short": "{dd}/{MM}/{yyyy}",
            medium: "{d} {Month} {yyyy}",
            "long": "{d} {Month} {yyyy} {H}:{mm}",
            full: "{Weekday}, {d} {Month}, {yyyy} {time}",
            stamp: "{Dow} {d} {Mon} {yyyy} {time}"
        }),
        Ff = ba(ba({}, wc), {
            "short": "{yyyy}-{MM}-{dd}",
            medium: "{d} {Month}, {yyyy}",
            "long": "{d} {Month}, {yyyy} {H}:{mm}",
            full: "{Weekday}, {d} {Month}, {yyyy} {time}",
            stamp: "{Dow} {d} {Mon} {yyyy} {time}"
        }),
        fe = {
            "en-US": de,
            "en-GB": ee,
            "en-AU": ee,
            "en-CA": Ff
        };
    (function () {
        function a(a) {
            this.o = {};
            this.add(a);
        }
        a.prototype = {
            get: function (a, c) {
                var b = this.o[a];
                !b && fe[a] ? b = this.add(a, fe[a]) : !b && a && (b = this.o[a.slice(0, 2)]);
                return b || !1 === c ? b : this.current;
            },
            getAll: function () {
                return this.o;
            },
            set: function (a) {
                var b = this.get(a, !1);
                if (!b) {
                    throw new TypeError("Invalid Locale: " + a);
                }
                return this.current = b;
            },
            add: function (a, c) {
                c ? c.code = a : (c = a, a = c.code);
                var b = c.compiledFormats ? c : ld(c);
                this.o[a] = b;
                this.current || (this.current = b);
                return b;
            },
            remove: function (a) {
                this.current.code === a && (this.current = this.get("en"));
                return delete this.o[a];
            }
        };
        Ea = ld(de);
        D = new a(Ea);
    })();
    (function () {
        function a(a, b, c) {
            b && y(ga(b), function (b) {
                a[b] = c;
            });
        }

        function b(a) {
            return function (b, c) {
                return a(b, c).toLowerCase();
            };
        }

        function c(a) {
            return function (b, c) {
                var d = a(b, c);
                return d + D.get(c).T(d);
            };
        }

        function d(a, b) {
            return function (c, d) {
                return Ja(a(c, d), b);
            };
        }

        function e(a) {
            return function (b, c) {
                return a(b, c) % 100;
            };
        }

        function f(a) {
            return function (b, c) {
                return Eb(a, b, c);
            };
        }

        function g(c, d) {
            function e(a, b) {
                return c.get(a, b, d);
            }
            a(Q, c.b + d, e);
            c.j && (Q[c.j + d] = b(e));
        }

        function k(a) {
            return function (b, c) {
                var d = D.get(c);
                return Eb(d[a], b, c);
            };
        }
        Q = {};
        lb = {};
        y(Ef, function (h) {
            var k = h.get,
                t;
            h.j && (Q[h.j] = b(k));
            h.l && (Q[h.l] = c(k));
            h.c && (Q[h.c] = d(k, h.c.length));
            h.u && (Q[h.u] = d(e(k), 2));
            h.B && (lb[h.B] = d(e(k), 2));
            h.g && (t = d(k, h.g));
            h.alias && (k = f(h.alias));
            if (h.D) {
                for (var m = 1; 5 >= m; m++) {
                    g(h, m);
                }
            }
            a(Q, h.b, k);
            a(lb, h.a, t || k);
        });
        v(gd, function (b, c) {
            a(Q, c, f(b));
        });
        Ga(T, "short medium long full", function (b, c) {
            var d = k(c);
            a(Q, c, d);
            b[c] = d;
        });
        a(Q, "time", k("time"));
        a(Q, "stamp", k("stamp"));
    })();
    (function () {
        Eb = Uc(function (a, b, c) {
            return u(Q, b)(a, c);
        }, function (a, b, c) {
            return u(lb, b)(a, c);
        }, function (a, b) {
            return B(Q, a) || B(lb, b);
        });
    })();
    (function () {
        Ga(T, ma, function (a, b, c) {
            var d = b.name,
                e = Ka(d);
            4 < c && y(["Last", "This", "Next"], function (b) {
                a["is" + b + e] = function (a, c) {
                    return id(a, b + " " + d, 0, c, {
                        locale: "en"
                    });
                };
            });
            3 < c && (a["beginningOf" + e] = function (a, b) {
                return bb(a, c, b);
            }, a["endOf" + e] = function (a, b) {
                return Cb(a, c, b);
            });
            a["add" + e + "s"] = function (a, b, c) {
                return Da(a, d, b, c);
            };
            a[d + "sAgo"] = a[d + "sUntil"] = function (a, c, d) {
                return Db(cb(a, c, d, !0).date, a, b);
            };
            a[d + "sSince"] = a[d + "sFromNow"] = function (a, c, d) {
                return Db(a, cb(a, c, d, !0).date, b);
            };
        });
    })();
    (function () {
        Ga(fa, ma, function (a, b) {
            var c = b.name,
                d, e, f;
            d = function (a) {
                return Za(a * b.f);
            };
            e = function (a, b, d) {
                return Da(oa(b, d, !0), c, a);
            };
            f = function (a, b, d) {
                return Da(oa(b, d, !0), c, -a);
            };
            a[c] = d;
            a[c + "s"] = d;
            a[c + "Before"] = f;
            a[c + "sBefore"] = f;
            a[c + "Ago"] = f;
            a[c + "sAgo"] = f;
            a[c + "After"] = e;
            a[c + "sAfter"] = e;
            a[c + "FromNow"] = e;
            a[c + "sFromNow"] = e;
        });
    })();
    (function () {
        var a = ga("Today Yesterday Tomorrow Weekday Weekend Future Past"),
            b = Ea.weekdays.slice(0, 7),
            c = Ea.months.slice(0, 12);
        Ga(T, a.concat(b).concat(c), function (a, b) {
            a["is" + b] = function (a) {
                return hd(a, b);
            };
        });
    })();
    Mc(T, oa);
    var We = /[^\u0000-\u0040\u005B-\u0060\u007B-\u007F]+('s)?/g,
        Ve = /(^|_)([^_]+)/g,
        af = /&#?(x)?([\w\d]{0,5});/gi,
        Gf = /[&<>]/g,
        pd = {
            lt: "<",
            gt: ">",
            amp: "&",
            nbsp: " ",
            quot: '"',
            apos: "'"
        },
        xc, Ye = "and or nor a an the so but to of at by from into on onto off out in over with for".split(" "),
        bf = "area base br col command embed hr img input keygen link meta param source track wbr".split(" "),
        Hf = RegExp("^[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u2028\u2029\u3000\ufeff]+"),
        If = RegExp("[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u2028\u2029\u3000\ufeff]+$"),
        Ze = RegExp("(?=[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u2028\u2029\u3000\ufeff])"),
        Jf = String.prototype.includes,
        yc, zc, Kf = Uc(tb);
    K(aa, {
        includes: ha(function (a, b, c) {
            if (!ja(b)) {
                return Jf.call(a, b, c);
            }
            c && (a = a.slice(c));
            return b.test(a);
        })
    }, ["enhance", "enhanceString"]);
    K(aa, {
        at: function (a, b, c) {
            return Qc(a, b, c, !0);
        },
        escapeURL: function (a, b) {
            return b ? encodeURIComponent(a) : encodeURI(a);
        },
        unescapeURL: function (a, b) {
            return b ? decodeURI(a) : decodeURIComponent(a);
        },
        escapeHTML: function (a) {
            return a.replace(Gf, function (a) {
                return u(xc, a);
            });
        },
        unescapeHTML: function (a) {
            return $e(a);
        },
        stripTags: function (a, b, c) {
            return rd(a, b, c, !0);
        },
        removeTags: function (a, b, c) {
            return rd(a, b, c, !1);
        },
        encodeBase64: function (a) {
            return yc(a);
        },
        decodeBase64: function (a) {
            return zc(a);
        },
        forEach: function (a, b, c) {
            return eb(a, b, c);
        },
        chars: function (a, b, c) {
            return eb(a, b, c);
        },
        words: function (a, b) {
            return eb(a.trim(), /\S+/g, b);
        },
        lines: function (a, b) {
            return eb(a.trim(), /^.*$/gm, b);
        },
        codes: function (a, b) {
            return od(a, b);
        },
        shift: function (a, b) {
            var c = "";
            b = b || 0;
            od(a, function (a) {
                c += N(a + b);
            });
            return c;
        },
        isBlank: function (a) {
            return 0 === a.trim().length;
        },
        isEmpty: function (a) {
            return 0 === a.length;
        },
        insert: function (a, b, c) {
            c = z(c) ? a.length : c;
            return a.slice(0, c) + b + a.slice(c);
        },
        remove: function (a, b) {
            return a.replace(b, "");
        },
        removeAll: function (a, b) {
            return qd(a, b);
        },
        reverse: function (a) {
            return a.split("").reverse().join("");
        },
        compact: function (a) {
            return a.trim().replace(/([\r\n\s\u3000])+/g, function (a, c) {
                return "\u3000" === c ? c : " ";
            });
        },
        from: function (a, b) {
            return a.slice(td(a, b, !0));
        },
        to: function (a, b) {
            z(b) && (b = a.length);
            return a.slice(0, td(a, b));
        },
        dasherize: function (a) {
            return fb(a).replace(/_/g, "-");
        },
        underscore: function (a) {
            return fb(a);
        },
        camelize: function (a, b) {
            return Ue(a, b);
        },
        spacify: function (a) {
            return fb(a).replace(/_/g, " ");
        },
        titleize: function (a) {
            return Xe(a);
        },
        parameterize: function (a, b) {
            var c, d = b;
            void 0 === d && (d = "-");
            c = a.replace(/[^a-z0-9\-_]+/gi, d);
            d && (d = RegExp(["^", "+|", "+$|(", ")", "+"].join(Ma(d)), "g"), c = c.replace(d, "$1"));
            return encodeURI(c.toLowerCase());
        },
        truncate: function (a, b, c, d) {
            return nd(a, b, c, d);
        },
        truncateOnWord: function (a, b, c, d) {
            return nd(a, b, c, d, !0);
        },
        pad: function (a, b, c) {
            var d;
            b = za(b);
            d = G(0, b - a.length) / 2;
            b = Oa(d);
            d = na(d);
            return Gb(b, c) + a + Gb(d, c);
        },
        padLeft: function (a, b, c) {
            b = za(b);
            return Gb(G(0, b - a.length), c) + a;
        },
        padRight: function (a, b, c) {
            b = za(b);
            return a + Gb(G(0, b - a.length), c);
        },
        first: function (a, b) {
            z(b) && (b = 1);
            return a.substr(0, b);
        },
        last: function (a, b) {
            z(b) && (b = 1);
            return a.substr(0 > a.length - b ? 0 : a.length - b);
        },
        toNumber: function (a, b) {
            return Yb(a, b);
        },
        capitalize: function (a, b, c) {
            return gc(a, b, c);
        },
        trimLeft: function (a) {
            return a.replace(Hf, "");
        },
        trimRight: function (a) {
            return a.replace(If, "");
        }
    });
    kb(aa, {
        replaceAll: function (a, b, c) {
            return qd(a, b, c);
        },
        format: function (a, b) {
            var c = b[0] && b[0].valueOf();
            1 === b.length && M(c) && (b = c);
            return Kf(a, b);
        }
    });
    (function () {
        function a(a) {
            return function (b) {
                try {
                    return a(b);
                } catch (g) {
                    return "";
                }
            };
        }
        var b, c;
        if ("undefined" !== typeof Buffer) {
            yc = function (a) {
                return (new Buffer(a)).toString("base64");
            }, zc = function (a) {
                return (new Buffer(a, "base64")).toString("utf8");
            };
        } else {
            if ("undefined" !== typeof btoa) {
                b = a(btoa), c = a(atob);
            } else {
                var d = /[^A-Za-z0-9\+\/\=]/g;
                b = function (a) {
                    var b = "",
                        c, d, e, n, m, q, p = 0;
                    do {
                        c = a.charCodeAt(p++), d = a.charCodeAt(p++), e = a.charCodeAt(p++), n = c >> 2, c = (c & 3) << 4 | d >> 4, m = (d & 15) << 2 | e >> 6, q = e & 63, isNaN(d) ? m = q = 64 : isNaN(e) && (q = 64), b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(n), b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c), b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(m), b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(q);
                    } while (p < a.length);
                    return b;
                };
                c = function (a) {
                    var b = "",
                        c, e, h, n, m, q = 0;
                    if (a.match(d)) {
                        return "";
                    }
                    a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    do {
                        c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(q++)), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(q++)), n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(q++)), m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(q++)), c = c << 2 | e >> 4, e = (e & 15) << 4 | n >> 2, h = (n & 3) << 6 | m, b += N(c), 64 != n && (b += N(e)), 64 != m && (b += N(h));
                    } while (q < a.length);
                    return b;
                };
            }
            yc = function (a) {
                return b(unescape(encodeURIComponent(a)));
            };
            zc = function (a) {
                return decodeURIComponent(escape(c(a)));
            };
        }
    })();
    (function () {
        xc = {};
        v(pd, function (a, b) {
            xc[a] = "&" + b + ";";
        });
    })();
    var Lf = !("0" in [].concat(void 0).concat()),
        Mf = {
            sortIgnore: null,
            sortNatural: !0,
            sortIgnoreCase: !0,
            sortOrder: function () {
                return sa("A\u00c1\u00c0\u00c2\u00c3\u0104BC\u0106\u010c\u00c7D\u010e\u00d0E\u00c9\u00c8\u011a\u00ca\u00cb\u0118FG\u011eH\u0131I\u00cd\u00cc\u0130\u00ce\u00cfJKL\u0141MN\u0143\u0147\u00d1O\u00d3\u00d2\u00d4PQR\u0158S\u015a\u0160\u015eT\u0164U\u00da\u00d9\u016e\u00db\u00dcVWXY\u00ddZ\u0179\u017b\u017d\u00de\u00c6\u0152\u00d8\u00d5\u00c5\u00c4\u00d6".split(""), function (a) {
                    return a + a.toLowerCase();
                }).join("");
            }(),
            sortCollate: function (a, b) {
                var c, d, e, f, g = 0,
                    k = 0,
                    h = Ra("sortOrder");
                c = Ra("sortIgnore");
                var n = Ra("sortNatural");
                d = Ra("sortIgnoreCase");
                var m = Ra("sortEquivalents");
                a = Ad(a, c, d);
                b = Ad(b, c, d);
                do {
                    e = Bd(a, g, m), f = Bd(b, g, m), c = e ? h.indexOf(e) : null, d = f ? h.indexOf(f) : null, -1 === c || -1 === d ? (c = a.charCodeAt(g) || null, d = b.charCodeAt(g) || null, n && (48 <= c && 57 >= c || 65296 <= c && 65305 >= c) && (48 <= d && 57 >= d || 65296 <= d && 65305 >= d) && (c = Yb(a.slice(g)), d = Yb(b.slice(g)))) : (e = e !== a.charAt(g), f = f !== b.charAt(g), e !== f && 0 === k && (k = e - f)), g += 1;
                } while (null != c && null != d && c === d);
                return c === d ? k : c - d;
            },
            sortEquivalents: function () {
                var a = {};
                y(ga("A\u00c1\u00c0\u00c2\u00c3\u00c4 C\u00c7 E\u00c9\u00c8\u00ca\u00cb I\u00cd\u00cc\u0130\u00ce\u00cf O\u00d3\u00d2\u00d4\u00d5\u00d6 S\u00df U\u00da\u00d9\u00db\u00dc"), function (b) {
                    var c = b.charAt(0);
                    y(b.slice(1).split(""), function (b) {
                        a[b] = c;
                        a[b.toLowerCase()] = c.toLowerCase();
                    });
                });
                return a;
            }()
        },
        Ra = Tb(V, Mf);
    xa(V, {
        create: function (a, b) {
            return ud(a, b);
        },
        construct: function (a, b) {
            a = za(a);
            return Array.from(Array(a), function (a, d) {
                return b && b(d);
            });
        }
    });
    K(V, {
        isEmpty: function (a) {
            return 0 === a.length;
        },
        isEqual: function (a, b) {
            return Aa(a, b);
        },
        clone: function (a) {
            return Qa(a);
        },
        at: function (a, b, c) {
            return Qc(a, b, c);
        },
        add: function (a, b, c) {
            return vd(Qa(a), b, c);
        },
        subtract: function (a, b) {
            return yd(a, b, !0);
        },
        append: function (a, b, c) {
            return vd(a, b, c);
        },
        removeAt: function (a, b, c) {
            if (z(b)) {
                return a;
            }
            z(c) && (c = b);
            a.splice(b, c - b + 1);
            return a;
        },
        unique: function (a, b) {
            return wd(a, b);
        },
        flatten: function (a, b) {
            return xd(a, b);
        },
        first: function (a, b) {
            if (z(b)) {
                return a[0];
            }
            0 > b && (b = 0);
            return a.slice(0, b);
        },
        last: function (a, b) {
            return z(b) ? a[a.length - 1] : a.slice(0 > a.length - b ? 0 : a.length - b);
        },
        from: function (a, b) {
            return a.slice(b);
        },
        to: function (a, b) {
            z(b) && (b = a.length);
            return a.slice(0, b);
        },
        compact: function (a, b) {
            return ef(a, b);
        },
        groupBy: function (a, b, c) {
            return ff(a, b, c);
        },
        inGroups: function (a, b, c) {
            var d = r(c),
                e = Array(b),
                f = na(a.length / b);
            ub(b, function (b) {
                var g = b * f,
                    h = a.slice(g, g + f);
                d && h.length < f && ub(f - h.length, function () {
                    h.push(c);
                });
                e[b] = h;
            });
            return e;
        },
        inGroupsOf: function (a, b, c) {
            var d = [],
                e = a.length,
                f;
            if (0 === e || 0 === b) {
                return a;
            }
            z(b) && (b = 1);
            z(c) && (c = null);
            ub(na(e / b), function (e) {
                for (f = a.slice(b * e, b * e + b); f.length < b;) {
                    f.push(c);
                }
                d.push(f);
            });
            return d;
        },
        shuffle: function (a) {
            a = Qa(a);
            for (var b = a.length, c, d; b;) {
                c = Math.random() * b | 0, d = a[--b], a[b] = a[c], a[c] = d;
            }
            return a;
        },
        sample: function (a, b, c) {
            var d = [],
                e, f;
            Sa(b) || (e = b, b = c);
            z(e) && (e = 1, f = !0);
            b || (a = Qa(a));
            e = ea(e, a.length);
            for (b = 0; b < e; b++) {
                c = S(Math.random() * a.length), d.push(a[c]), a.splice(c, 1);
            }
            return f ? d[0] : d;
        },
        sortBy: function (a, b, c) {
            a.sort(function (d, e) {
                var f = ra(d, b, a, [d]),
                    g = ra(e, b, a, [e]);
                return zd(f, g) * (c ? -1 : 1);
            });
            return a;
        },
        remove: function (a, b) {
            for (var c = ia(b), d = 0; d < a.length;) {
                c(a[d], d, a) ? a.splice(d, 1) : d++;
            }
            return a;
        },
        exclude: function (a, b) {
            for (var c = [], d = ia(b), e = 0; e < a.length; e++) {
                d(a[e], e, a) || c.push(a[e]);
            }
            return c;
        },
        union: function (a, b) {
            var c;
            c = Lf ? df(a, b) : a.concat(b);
            return wd(c);
        },
        intersect: function (a, b) {
            return yd(a, b, !1);
        }
    });
    kb(V, {
        zip: function (a, b) {
            return sa(a, function (a, d) {
                return [a].concat(sa(b, function (a) {
                    return d in a ? a[d] : null;
                }));
            });
        }
    });
    be(V, "insert", "append");
    Mc(V, ud);
    var jf = /^(.+?)(\[.*\])$/,
        mf = /[^\d.-]/,
        lc = Object.getOwnPropertyNames,
        Ed = Object.getOwnPropertySymbols,
        Fd = Object.getOwnPropertyDescriptor,
        Rb = Object.prototype.toString;
    xa(jb, {
        fromQueryString: function (a, b) {
            return hf(a, b);
        }
    });
    Sb(jb, {
        has: function (a, b, c) {
            return Ha(a, b, c, !0);
        },
        get: function (a, b, c) {
            return tb(a, b, c);
        },
        set: function (a, b, c) {
            Ha(a, b, !1, !1, !0, !1, c);
            return a;
        },
        size: function (a) {
            return Object.keys(Xa(a)).length;
        },
        isEmpty: function (a) {
            return 0 === Object.keys(Xa(a)).length;
        },
        toQueryString: function (a, b) {
            var c;
            c = b || {};
            z(c.separator) && (c.separator = "_");
            return hc(a, c.deep, c.transform, c.prefix || "", c.separator);
        },
        isEqual: function (a, b) {
            return Aa(a, b);
        },
        merge: function (a, b, c) {
            return jc(a, b, c);
        },
        add: function (a, b, c) {
            return jc(mc(a), b, c);
        },
        mergeAll: function (a, b, c) {
            return kc(a, b, c);
        },
        addAll: function (a, b, c) {
            return kc(mc(a), b, c);
        },
        defaults: function (a, b, c) {
            c = c || {};
            c.resolve = c.resolve || !1;
            return kc(a, b, c);
        },
        intersect: function (a, b) {
            return Id(a, b, !1);
        },
        subtract: function (a, b) {
            return Id(a, b, !0);
        },
        clone: function (a, b) {
            return mc(a, b);
        },
        values: function (a) {
            return of(a);
        },
        invert: function (a, b) {
            var c = {};
            b = !0 === b;
            v(a, function (a, e) {
                B(c, a) && b ? c[a].push(e) : c[a] = b ? [e] : e;
            });
            return c;
        },
        tap: function (a, b) {
            return pf(a, b);
        },
        isArguments: function (a) {
            var b;
            b = b || W(a);
            return !qa(a) && "length" in a && ("[object Arguments]" === b || !!a.callee);
        },
        isObject: function (a) {
            return sb(a);
        },
        remove: function (a, b) {
            return qf(a, b);
        },
        exclude: function (a, b) {
            return rf(a, b);
        },
        select: function (a, b) {
            return Hd(a, b, !0);
        },
        reject: function (a, b) {
            return Hd(a, b, !1);
        }
    });
    K(jb, {
        keys: function (a) {
            return Object.keys(a);
        }
    });
    (function () {
        var a = [Sa, H, A, U, ja, L, I, yb, wb, xb];
        ve(jb, function (b, c, d) {
            b["is" + c] = a[d];
        });
    })();
    var ge = Ta("some", wa),
        he = Ta("filter", wa);
    K(V, {
        map: ha(Ta("map", Nd)),
        some: ha(ge),
        every: ha(Ta("every", wa)),
        filter: ha(he),
        find: ha(Ta("find", wa)),
        findIndex: ha(Ta("findIndex", wa))
    }, ["enhance", "enhanceArray"]);
    K(V, {
        none: ha(function () {
            return !ge.apply(this, arguments);
        }),
        count: ha(function (a, b) {
            return z(b) ? a.length : he.apply(this, arguments).length;
        }),
        min: function (a, b, c) {
            return hb(a, b, c);
        },
        max: function (a, b, c) {
            return hb(a, b, c, !0);
        },
        least: function (a, b, c) {
            return Ib(a, b, c);
        },
        most: function (a, b, c) {
            return Ib(a, b, c, !0);
        },
        sum: function (a, b) {
            return Jd(a, b);
        },
        average: function (a, b) {
            return Kd(a, b);
        },
        median: function (a, b) {
            return Ld(a, b);
        }
    });
    var ie = nc("some");
    Sb(jb, {
        forEach: function (a, b) {
            return sf(a, b);
        },
        map: function (a, b) {
            return tf(a, b);
        },
        some: ie,
        every: nc("every"),
        filter: function (a, b) {
            return vf(a, b);
        },
        reduce: function (a, b, c) {
            return uf(a, b, c);
        },
        find: nc("find"),
        count: function (a, b) {
            return wf(a, b);
        },
        none: function (a, b) {
            return !ie(a, b);
        },
        sum: function (a, b) {
            return Jd(a, b);
        },
        average: function (a, b) {
            return Kd(a, b);
        },
        median: function (a, b) {
            return Ld(a, b);
        },
        min: function (a, b, c) {
            return hb(a, b, c, !1, !0);
        },
        max: function (a, b, c) {
            return hb(a, b, c, !0, !0);
        },
        least: function (a, b, c) {
            return Ib(a, b, c, !1, !0);
        },
        most: function (a, b, c) {
            return Ib(a, b, c, !0, !0);
        }
    });
    (function () {
        function a(a, b, c) {
            var d = a;
            b && (d = a.slice(b), c && (d = d.concat(a.slice(0, b))));
            return d;
        }

        function b(a, b) {
            return ea(b, G(0, a));
        }

        function c(a, b, c, d, e, m) {
            return function (d, f, g) {
                g = Wb(g + b, e, m);
                return c.call(a, d, f, g, a);
            };
        }

        function d(a, b, c, d, e, m) {
            return function (f, g) {
                g = Wb(g + b, e, m);
                return c.call(d, a[g], g, a);
            };
        }

        function e(c, e) {
            var f = e.i || Array.prototype[c],
                g = e.apply || d,
                n = e.slice || a,
                m = e.clamp || b,
                q = e.result,
                p = e.v;
            return function (a, b, c) {
                var d = [],
                    e = 0,
                    h, k, l;
                h = a.length;
                Sa(c[0]) && (k = c[e++]);
                l = c[e++];
                e = c[e];
                0 > b && (b += h);
                b = m(b, h);
                Lc(c.length);
                l = p ? p(l, e) : l;
                d.push(g(a, b, l, e, h, k));
                e && d.push(e);
                a = f.apply(n(a, b, k), d);
                q && (a = q(a, b, h));
                return a;
            };
        }
        v({
            forEach: {
                i: function (a) {
                    y(this, a);
                }
            },
            map: {
                v: Nd
            },
            "some every": {
                v: wa
            },
            findIndex: {
                v: wa,
                result: function (a, b, c) {
                    -1 !== a && (a = (a + b) % c);
                    return a;
                }
            },
            reduce: {
                apply: c
            },
            "filter find": {
                v: wa
            },
            reduceRight: {
                apply: c,
                slice: function (a, b, c) {
                    c || (a = a.slice(0, G(0, b + 1)));
                    return a;
                },
                clamp: function (a, b) {
                    return ea(b, G(-1, a));
                }
            }
        }, function (a, b) {
            y(ga(b), function (b) {
                kb(V, b + "FromIndex", e(b, a));
            });
        });
    })();
    var Pd = Tb(fa, {
        decimal: ".",
        thousands: ","
    });
    xa(fa, {
        random: function (a, b) {
            var c, d;
            1 == arguments.length && (b = a, a = 0);
            c = ea(a || 0, z(b) ? 1 : b);
            d = G(a || 0, z(b) ? 1 : b) + 1;
            return S(Math.random() * (d - c) + c);
        }
    });
    K(fa, {
        isInteger: function (a) {
            return 0 === a % 1;
        },
        isOdd: function (a) {
            return 0 === a % 1 && 0 !== a % 2;
        },
        isEven: function (a) {
            return 0 === a % 2;
        },
        isMultipleOf: function (a, b) {
            return 0 === a % b;
        },
        log: function (a, b) {
            return Math.log(a) / (b ? Math.log(b) : 1);
        },
        abbr: function (a, b) {
            return oc(a, b, "|kmbt");
        },
        metric: function (a, b, c) {
            "all" === c ? c = "yzafpn\u03bcm|KMGTPEZY" : c || (c = "n\u03bcm|k");
            return oc(a, b, c);
        },
        bytes: function (a, b, c, d) {
            "binary" === d || !d && c ? d = "|,Ki,Mi,Gi,Ti,Pi,Ei" : "si" !== d && d || (d = "|KMGTPE");
            return oc(a, b, d, c) + "B";
        },
        format: function (a, b) {
            return Od(a, b);
        },
        hex: function (a, b) {
            return Ja(a, b || 1, !1, 16);
        },
        times: function (a, b) {
            for (var c, d, e = 0; e < a; e++) {
                d = b.call(a, e), r(d) && (c || (c = []), c.push(d));
            }
            return c;
        },
        chr: function (a) {
            return N(a);
        },
        pad: function (a, b, c, d) {
            return Ja(a, b, c, d);
        },
        ordinalize: function (a) {
            var b = +ca(a).toString().slice(-2);
            return a + Sc(b);
        },
        toNumber: function (a) {
            return a.valueOf();
        },
        round: pc(Za),
        ceil: pc(na),
        floor: pc(Oa)
    });
    (function () {
        Ga(fa, "abs pow sin asin cos acos tan atan exp pow sqrt", function (a, b) {
            a[b] = function (a, d) {
                return Math[b](a.valueOf(), d);
            };
        });
    })();
    var Nb = Wa("lock"),
        Jb = Wa("timers"),
        je = Wa("partial"),
        qc = Wa("canceled"),
        Nf = Object.create || function (a) {
            function b() {}
            b.prototype = a;
            return new b;
        };
    K($d, {
        lazy: function (a, b, c, d) {
            return Rd(a, b, c, d);
        },
        throttle: function (a, b) {
            return Rd(a, b, !0, 1);
        },
        debounce: function (a, b) {
            function c() {
                for (var d = [], e = 0, f = arguments.length; e < f; e++) {
                    d.push(arguments[e]);
                }
                Qd(c);
                Ua(c, b, a, this, d);
            }
            return c;
        },
        cancel: function (a) {
            return Qd(a);
        },
        after: function (a, b) {
            var c = 0,
                d = [];
            b = za(b);
            return function () {
                for (var e = [], f = 0, g = arguments.length; f < g; f++) {
                    e.push(arguments[f]);
                }
                d.push(e);
                c++;
                if (c >= b) {
                    return a.call(this, d);
                }
            };
        },
        once: function (a) {
            var b = !1,
                c;
            return function () {
                if (b) {
                    return c;
                }
                b = !0;
                return c = a.apply(this, arguments);
            };
        },
        memoize: function (a, b, c) {
            var d, e;
            H(b) || (d = b, b = c);
            A(d) ? (e = d, d = function (a) {
                return tb(a, e);
            }) : d || (d = xf);
            return yf(a, d, b);
        },
        lock: function (a, b) {
            var c;
            if (je(a)) {
                return Nb(a, H(b) ? b : null), a;
            }
            c = function () {
                arguments.length = ea(Nb(c), arguments.length);
                return a.apply(this, arguments);
            };
            Nb(c, H(b) ? b : a.length);
            return c;
        }
    });
    kb($d, {
        partial: function (a, b) {
            function c() {
                var e = 0,
                    f = [],
                    g = this,
                    k = Nb(c),
                    h;
                for (h = 0; h < d; h++) {
                    var m = b[h];
                    f[h] = r(m) ? m : arguments[e++];
                }
                for (h = e; h < arguments.length; h++) {
                    f.push(arguments[h]);
                }
                null === k && (k = d);
                H(k) && (f.length = ea(f.length, k));
                return g instanceof c ? (g = Nf(a.prototype), e = a.apply(g, f), M(e) ? e : g) : a.apply(g, f);
            }
            var d = b.length;
            je(c, !0);
            return c;
        },
        delay: function (a, b, c) {
            Ua(a, b, a, a, c);
            return a;
        },
        every: function (a, b, c) {
            function d() {
                Ua(a, b, d);
                a.apply(a, c);
            }
            Ua(a, b, d);
            return a;
        }
    });
    xa(ae, {
        escape: function (a) {
            return Ma(a);
        }
    });
    K(ae, {
        getFlags: function (a) {
            return La(a);
        },
        setFlags: function (a, b) {
            return RegExp(a.source, b);
        },
        addFlags: function (a, b) {
            return RegExp(a.source, La(a, b));
        },
        removeFlags: function (a, b) {
            var c = RegExp("[" + b + "]", "g");
            return RegExp(a.source, La(a).replace(c, ""));
        }
    });
    var zf = /(\d+)?\s*(year|month|week|day|hour|minute|second|millisecond)s?/i,
        Yd = {
            Hours: 3600000,
            Minutes: 60000,
            Seconds: 1000,
            Milliseconds: 1
        };
    Kc(R, {
        toString: function () {
            return Kb(this) ? this.start + ".." + this.end : "Invalid Range";
        },
        isValid: function () {
            return Kb(this);
        },
        span: function () {
            var a = Sd(this.end) - Sd(this.start);
            return Kb(this) ? ca(a) + 1 : NaN;
        },
        contains: function (a) {
            return null == a ? !1 : a.start && a.end ? a.start >= this.start && a.start <= this.end && a.end >= this.start && a.end <= this.end : a >= this.start && a <= this.end;
        },
        every: function (a, b) {
            return Lb(this, a, !1, b);
        },
        toArray: function () {
            return Lb(this);
        },
        union: function (a) {
            return new R(this.start < a.start ? this.start : a.start, this.end > a.end ? this.end : a.end);
        },
        intersect: function (a) {
            return a.start > this.end || a.end < this.start ? new R(NaN, NaN) : new R(this.start > a.start ? this.start : a.start, this.end < a.end ? this.end : a.end);
        },
        clone: function () {
            return new R(this.start, this.end);
        },
        clamp: function (a) {
            return sc(this, a);
        }
    });
    xa(fa, {
        range: Bc
    });
    K(fa, {
        upto: function (a, b, c, d) {
            return Lb(new R(a, b), c, !1, d);
        },
        clamp: function (a, b, c) {
            return sc(new R(b, c), a);
        },
        cap: function (a, b) {
            return sc(new R(void 0, b), a);
        }
    });
    be(fa, "downto", "upto");
    xa(aa, {
        range: Bc
    });
    var Of = /(?:from)?\s*(.+)\s+(?:to|until)\s+(.+)$/i,
        Pf = /(.+)\s*for\s*((?:\d+)?\s*(?:year|month|week|day|hour|minute|second|millisecond))s?/i,
        Qf = /(?:for)?\s*((?:\d+)?\s*(?:year|month|week|day|hour|minute|second|millisecond))s?\s*(?:starting)?\s(?:at\s)?(.+)/i;
    xa(T, {
        range: function (a, b) {
            var c;
            if (1 === arguments.length && A(a)) {
                var d, e, f;
                if (T.get && (c = a.match(Of))) {
                    d = Va(c[1].replace("from", "at")), f = T.get(d, c[2]), c = new R(d, f);
                } else {
                    if (c = a.match(Qf)) {
                        e = c[1], d = c[2];
                    }
                    if (c = a.match(Pf)) {
                        d = c[1], e = c[2];
                    }
                    d && e ? (d = Va(d), c = Wd(e), f = Xd(d, c[0], c[1])) : d = a;
                    c = new R(Va(d), Va(f));
                }
            } else {
                c = new R(Va(a), Va(b));
            }
            return c;
        }
    });
    (function () {
        var a = {};
        y("year month week day hour minute second millisecond".split(" "), function (b, c) {
            var d = b + "s",
                e, f;
            4 > c ? f = function () {
                return Lb(this, b, !0);
            } : (e = Yd[Ka(d)], f = function () {
                return S((this.end - this.start) / e);
            });
            a[d] = f;
        });
        Kc(R, a);
    })();
    var tc, Ac, ke;
    K(aa, {
        pluralize: function (a, b) {
            a = String(a);
            return 1 === b || 0 === a.length ? a : Ac("plural", a);
        },
        singularize: function (a) {
            return Ac("singular", String(a));
        },
        humanize: function (a) {
            a = ke(a);
            a = a.replace(/(_)?([a-z\d]*)/gi, function (a, c, d) {
                d = F.human && F.human.find(d) || d;
                d = F.acronyms && F.acronyms.find(d) || d.toLowerCase();
                return (c ? " " : "") + d;
            });
            return Ka(a);
        }
    });
    Jc(aa, "addAcronym", function (a) {
        ib("acronyms", a, a);
        ib("acronyms", a.toLowerCase(), a);
        Bf();
    });
    C(aa, "addPlural", w);
    C(aa, "addHuman", Zd);
    (function () {
        tc = function () {
            this.map = {};
            this.rules = [];
        };
        tc.prototype = {
            add: function (a, b) {
                A(a) ? this.map[a] = b : this.rules.unshift({
                    K: a,
                    Y: b
                });
            },
            W: function (a) {
                var b, c;
                a = a.split(" ");
                b = a.length - 1;
                c = a[b];
                a[b] = this.find(c) || this.L(c);
                return a.join(" ");
            },
            find: function (a) {
                return u(this.map, a);
            },
            L: function (a) {
                for (var b = 0, c; c = this.rules[b]; b++) {
                    if (c.K.test(a)) {
                        a = a.replace(c.K, c.Y);
                        break;
                    }
                }
                return a;
            }
        };
    })();
    (function () {
        Ac = function (a, b) {
            return F[a] && F[a].W(b) || b;
        };
        w(/$/, "s");
        w(/s$/i, "s");
        w(/(ax|test)is$/i, "$1es");
        w(/(octop|fung|foc|radi|alumn|cact)(i|us)$/i, "$1i");
        w(/(census|alias|status|fetus|genius|virus)$/i, "$1es");
        w(/(bu)s$/i, "$1ses");
        w(/(buffal|tomat)o$/i, "$1oes");
        w(/([ti])um$/i, "$1a");
        w(/([ti])a$/i, "$1a");
        w(/sis$/i, "ses");
        w(/f+e?$/i, "ves");
        w(/(cuff|roof)$/i, "$1s");
        w(/([ht]ive)$/i, "$1s");
        w(/([^aeiouy]o)$/i, "$1es");
        w(/([^aeiouy]|qu)y$/i, "$1ies");
        w(/(x|ch|ss|sh)$/i, "$1es");
        w(/(tr|vert)(?:ix|ex)$/i, "$1ices");
        w(/([ml])ouse$/i, "$1ice");
        w(/([ml])ice$/i, "$1ice");
        w(/^(ox)$/i, "$1en");
        w(/^(oxen)$/i, "$1");
        w(/(quiz)$/i, "$1zes");
        w(/(phot|cant|hom|zer|pian|portic|pr|quart|kimon)o$/i, "$1os");
        w(/(craft)$/i, "$1");
        w(/([ft])[eo]{2}(th?)$/i, "$1ee$2");
        x(/s$/i, "");
        x(/([pst][aiu]s)$/i, "$1");
        x(/([aeiouy])ss$/i, "$1ss");
        x(/(n)ews$/i, "$1ews");
        x(/([ti])a$/i, "$1um");
        x(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, "$1$2sis");
        x(/(^analy)ses$/i, "$1sis");
        x(/(i)(f|ves)$/i, "$1fe");
        x(/([aeolr]f?)(f|ves)$/i, "$1f");
        x(/([ht]ive)s$/i, "$1");
        x(/([^aeiouy]|qu)ies$/i, "$1y");
        x(/(s)eries$/i, "$1eries");
        x(/(m)ovies$/i, "$1ovie");
        x(/(x|ch|ss|sh)es$/i, "$1");
        x(/([ml])(ous|ic)e$/i, "$1ouse");
        x(/(bus)(es)?$/i, "$1");
        x(/(o)es$/i, "$1");
        x(/(shoe)s?$/i, "$1");
        x(/(cris|ax|test)[ie]s$/i, "$1is");
        x(/(octop|fung|foc|radi|alumn|cact)(i|us)$/i, "$1us");
        x(/(census|alias|status|fetus|genius|virus)(es)?$/i, "$1");
        x(/^(ox)(en)?/i, "$1");
        x(/(vert)(ex|ices)$/i, "$1ex");
        x(/tr(ix|ices)$/i, "trix");
        x(/(quiz)(zes)?$/i, "$1");
        x(/(database)s?$/i, "$1");
        x(/ee(th?)$/i, "oo$1");
        pa("person", "people");
        pa("man", "men");
        pa("human", "humans");
        pa("child", "children");
        pa("sex", "sexes");
        pa("move", "moves");
        pa("save", "saves");
        pa("goose", "geese");
        pa("zombie", "zombies");
        Af();
    })();
    ke = Vc;
    Zd(/_id$/g, "");
    var le = /[\u0020-\u00A5]|[\uFF61-\uFF9F][\uff9e\uff9f]?/g,
        Rf = /[\u2212\u3000-\u301C\u301A-\u30FC\uFF01-\uFF60\uFFE0-\uFFE6]/g,
        Sf = /[\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c6\u30c8\u30cf\u30d2\u30d5\u30d8\u30db]/,
        Tf = /[\u30cf\u30d2\u30d5\u30d8\u30db\u30f2]/,
        Uf = [{
            name: "Arabic",
            src: "\u0600-\u06ff"
        }, {
            name: "Cyrillic",
            src: "\u0400-\u04ff"
        }, {
            name: "Devanagari",
            src: "\u0900-\u097f"
        }, {
            name: "Greek",
            src: "\u0370-\u03ff"
        }, {
            name: "Hangul",
            src: "\uac00-\ud7af\u1100-\u11ff"
        }, {
            name: "Han Kanji",
            src: "\u4e00-\u9fff\uf900-\ufaff"
        }, {
            name: "Hebrew",
            src: "\u0590-\u05ff"
        }, {
            name: "Hiragana",
            src: "\u3040-\u309f\u30fb-\u30fc"
        }, {
            name: "Kana",
            src: "\u3040-\u30ff\uff61-\uff9f"
        }, {
            name: "Katakana",
            src: "\u30a0-\u30ff\uff61-\uff9f"
        }, {
            name: "Latin",
            src: "\u0001-\u007f\u0080-\u00ff\u0100-\u017f\u0180-\u024f"
        }, {
            name: "Thai",
            src: "\u0e00-\u0e7f"
        }],
        Vf = [{
            type: "a",
            start: 65,
            end: 90
        }, {
            type: "a",
            start: 97,
            end: 122
        }, {
            type: "n",
            start: 48,
            end: 57
        }, {
            type: "p",
            start: 33,
            end: 47
        }, {
            type: "p",
            start: 58,
            end: 64
        }, {
            type: "p",
            start: 91,
            end: 96
        }, {
            type: "p",
            start: 123,
            end: 126
        }],
        Mb;
    K(aa, {
        hankaku: function (a, b) {
            return uc(a, b, Rf, "hankaku");
        },
        zenkaku: function (a, b) {
            return uc(a, b, le, "zenkaku");
        },
        hiragana: function (a, b) {
            !1 !== b && (a = uc(a, "k", le, "zenkaku"));
            return a.replace(/[\u30A1-\u30F6]/g, function (a) {
                return N(a.charCodeAt(0) + -96);
            });
        },
        katakana: function (a) {
            return a.replace(/[\u3041-\u3096]/g, function (a) {
                return N(a.charCodeAt(0) + 96);
            });
        }
    });
    (function () {
        Ga(aa, Uf, function (a, b) {
            var c = RegExp("^[" + b.src + "\\s]+$"),
                d = RegExp("[" + b.src + "]");
            y(ga(b.name), function (b) {
                a["is" + b] = function (a) {
                    return c.test(a.trim());
                };
                a["has" + b] = function (a) {
                    return d.test(a.trim());
                };
            });
        });
    })();
    (function () {
        function a(a, c, f) {
            b("zenkaku", a, c, f);
            b("hankaku", a, f, c);
        }

        function b(a, b, c, g, k) {
            var d = Mb[a][c] || {};
            !1 !== k && (d.all = g);
            d[b] = g;
            Mb[a][c] = d;
        }
        var c;
        Mb = {
            zenkaku: {},
            hankaku: {}
        };
        y(Vf, function (b) {
            ub(b.end - b.start + 1, function (c) {
                c += b.start;
                a(b.type, N(c), N(c + 65248));
            });
        });
        (function () {
            for (var b = 0; 57 > b; b++) {
                var e = "\u30a2\u30a4\u30a6\u30a8\u30aa\u30a1\u30a3\u30a5\u30a7\u30a9\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c3\u30c6\u30c8\u30ca\u30cb\u30cc\u30cd\u30ce\u30cf\u30d2\u30d5\u30d8\u30db\u30de\u30df\u30e0\u30e1\u30e2\u30e4\u30e3\u30e6\u30e5\u30e8\u30e7\u30e9\u30ea\u30eb\u30ec\u30ed\u30ef\u30f2\u30f3\u30fc\u30fb".charAt(b);
                c = "\uff71\uff72\uff73\uff74\uff75\uff67\uff68\uff69\uff6a\uff6b\uff76\uff77\uff78\uff79\uff7a\uff7b\uff7c\uff7d\uff7e\uff7f\uff80\uff81\uff82\uff6f\uff83\uff84\uff85\uff86\uff87\uff88\uff89\uff8a\uff8b\uff8c\uff8d\uff8e\uff8f\uff90\uff91\uff92\uff93\uff94\uff6c\uff95\uff6d\uff96\uff6e\uff97\uff98\uff99\uff9a\uff9b\uff9c\uff66\uff9d\uff70\uff65".charAt(b);
                a("k", c, e);
                e.match(Sf) && a("k", c + "\uff9e", N(e.charCodeAt(0) + 1));
                e.match(Tf) && a("k", c + "\uff9f", N(e.charCodeAt(0) + 2));
            }
        })();
        (function () {
            for (var b = 0; 7 > b; b++) {
                a("p", "\uff61\uff64\uff62\uff63\u00a5\u00a2\u00a3".charAt(b), "\u3002\u3001\u300c\u300d\uffe5\uffe0\uffe1".charAt(b));
            }
        })();
        a("s", " ", "\u3000");
        a("k", "\uff73\uff9e", "\u30f4");
        a("k", "\uff66\uff9e", "\u30fa");
        b("hankaku", "n", "\u2212", "-");
        b("hankaku", "n", "\u30fc", "-", !1);
        b("zenkaku", "n", "-", "\uff0d", !1);
    })();
    m.Date.addLocale("ca", {
        plural: !0,
        units: "milisegon:|s,segon:|s,minut:|s,hor:a|es,di:a|es,setman:a|es,mes:|os,any:|s",
        months: "gen:er|,febr:er|,mar:\u00e7|,abr:il|,mai:g|,jun:y|,jul:iol|,ag:ost|,set:embre|,oct:ubre|,nov:embre|,des:embre|",
        weekdays: "diumenge|dg,dilluns|dl,dimarts|dt,dimecres|dc,dijous|dj,divendres|dv,dissabte|ds",
        numerals: "zero,un,dos,tres,quatre,cinc,sis,set,vuit,nou,deu",
        tokens: "el,la,de",
        "short": "{dd}/{MM}/{yyyy}",
        medium: "{d} {month} {yyyy}",
        "long": "{d} {month} {yyyy} {time}",
        full: "{weekday} {d} {month} {yyyy} {time}",
        stamp: "{dow} {d} {mon} {yyyy} {time}",
        time: "{H}:{mm}",
        past: "{sign} {num} {unit}",
        future: "{sign} {num} {unit}",
        duration: "{num} {unit}",
        timeMarkers: "a las",
        ampm: "am,pm",
        modifiers: [{
            name: "day",
            src: "abans d'ahir",
            value: -2
        }, {
            name: "day",
            src: "ahir",
            value: -1
        }, {
            name: "day",
            src: "avui",
            value: 0
        }, {
            name: "day",
            src: "dem\u00e0|dema",
            value: 1
        }, {
            name: "sign",
            src: "fa",
            value: -1
        }, {
            name: "sign",
            src: "en",
            value: 1
        }, {
            name: "shift",
            src: "passat",
            value: -1
        }, {
            name: "shift",
            src: "el proper|la propera",
            value: 1
        }],
        parse: ["{sign} {num} {unit}", "{num} {unit} {sign}", "{0?}{1?} {unit:5-7} {shift}", "{0?}{1?} {shift} {unit:5-7}"],
        timeParse: ["{shift} {weekday}", "{weekday} {shift}", "{date?} {2?} {months}\\.? {2?} {year?}"]
    });
    m.Date.addLocale("da", {
        plural: !0,
        units: "millisekund:|er,sekund:|er,minut:|ter,tim:e|er,dag:|e,ug:e|er|en,m\u00e5ned:|er|en+maaned:|er|en,\u00e5r:||et+aar:||et",
        months: "jan:uar|,feb:ruar|,mar:ts|,apr:il|,maj,jun:i|,jul:i|,aug:ust|,sep:tember|,okt:ober|,nov:ember|,dec:ember|",
        weekdays: "s\u00f8n:dag|+son:dag|,man:dag|,tir:sdag|,ons:dag|,tor:sdag|,fre:dag|,l\u00f8r:dag|+lor:dag|",
        numerals: "nul,en|et,to,tre,fire,fem,seks,syv,otte,ni,ti",
        tokens: "den,for",
        articles: "den",
        "short": "{dd}-{MM}-{yyyy}",
        medium: "{d}. {month} {yyyy}",
        "long": "{d}. {month} {yyyy} {time}",
        full: "{weekday} d. {d}. {month} {yyyy} {time}",
        stamp: "{dow} {d} {mon} {yyyy} {time}",
        time: "{H}:{mm}",
        past: "{num} {unit} {sign}",
        future: "{sign} {num} {unit}",
        duration: "{num} {unit}",
        ampm: "am,pm",
        modifiers: [{
            name: "day",
            src: "forg\u00e5rs|i forg\u00e5rs|forgaars|i forgaars",
            value: -2
        }, {
            name: "day",
            src: "i g\u00e5r|ig\u00e5r|i gaar|igaar",
            value: -1
        }, {
            name: "day",
            src: "i dag|idag",
            value: 0
        }, {
            name: "day",
            src: "i morgen|imorgen",
            value: 1
        }, {
            name: "day",
            src: "over morgon|overmorgen|i over morgen|i overmorgen|iovermorgen",
            value: 2
        }, {
            name: "sign",
            src: "siden",
            value: -1
        }, {
            name: "sign",
            src: "om",
            value: 1
        }, {
            name: "shift",
            src: "i sidste|sidste",
            value: -1
        }, {
            name: "shift",
            src: "denne",
            value: 0
        }, {
            name: "shift",
            src: "n\u00e6ste|naeste",
            value: 1
        }],
        parse: ["{months} {year?}", "{num} {unit} {sign}", "{sign} {num} {unit}", "{1?} {num} {unit} {sign}", "{shift} {unit:5-7}"],
        timeParse: ["{day|weekday}", "{date} {months?}\\.? {year?}"],
        timeFrontParse: ["{shift} {weekday}", "{0?} {weekday?},? {date}\\.? {months?}\\.? {year?}"]
    });
    m.Date.addLocale("de", {
        plural: !0,
        units: "Millisekunde:|n,Sekunde:|n,Minute:|n,Stunde:|n,Tag:|en,Woche:|n,Monat:|en,Jahr:|en|e",
        months: "Jan:uar|,Feb:ruar|,M:\u00e4r|\u00e4rz|ar|arz,Apr:il|,Mai,Juni,Juli,Aug:ust|,Sept:ember|,Okt:ober|,Nov:ember|,Dez:ember|",
        weekdays: "So:nntag|,Mo:ntag|,Di:enstag|,Mi:ttwoch|,Do:nnerstag|,Fr:eitag|,Sa:mstag|",
        numerals: "null,ein:|e|er|en|em,zwei,drei,vier,fuenf,sechs,sieben,acht,neun,zehn",
        tokens: "der",
        "short": "{dd}.{MM}.{yyyy}",
        medium: "{d}. {Month} {yyyy}",
        "long": "{d}. {Month} {yyyy} {time}",
        full: "{Weekday}, {d}. {Month} {yyyy} {time}",
        stamp: "{Dow} {d} {Mon} {yyyy} {time}",
        time: "{H}:{mm}",
        past: "{sign} {num} {unit}",
        future: "{sign} {num} {unit}",
        duration: "{num} {unit}",
        timeMarkers: "um",
        ampm: "am,pm",
        modifiers: [{
            name: "day",
            src: "vorgestern",
            value: -2
        }, {
            name: "day",
            src: "gestern",
            value: -1
        }, {
            name: "day",
            src: "heute",
            value: 0
        }, {
            name: "day",
            src: "morgen",
            value: 1
        }, {
            name: "day",
            src: "\u00fcbermorgen|ubermorgen|uebermorgen",
            value: 2
        }, {
            name: "sign",
            src: "vor:|her",
            value: -1
        }, {
            name: "sign",
            src: "in",
            value: 1
        }, {
            name: "shift",
            src: "letzte:|r|n|s",
            value: -1
        }, {
            name: "shift",
            src: "n\u00e4chste:|r|n|s+nachste:|r|n|s+naechste:|r|n|s+kommende:n|r",
            value: 1
        }],
        parse: ["{months} {year?}", "{sign} {num} {unit}", "{num} {unit} {sign}", "{shift} {unit:5-7}"],
        timeParse: ["{shift?} {day|weekday}", "{weekday?},? {date}\\.? {months?}\\.? {year?}"],
        timeFrontParse: ["{shift} {weekday}", "{weekday?},? {date}\\.? {months?}\\.? {year?}"]
    });
    m.Date.addLocale("es", {
        plural: !0,
        units: "milisegundo:|s,segundo:|s,minuto:|s,hora:|s,d\u00eda|d\u00edas|dia|dias,semana:|s,mes:|es,a\u00f1o|a\u00f1os|ano|anos",
        months: "ene:ro|,feb:rero|,mar:zo|,abr:il|,may:o|,jun:io|,jul:io|,ago:sto|,sep:tiembre|,oct:ubre|,nov:iembre|,dic:iembre|",
        weekdays: "dom:ingo|,lun:es|,mar:tes|,mi\u00e9:rcoles|+mie:rcoles|,jue:ves|,vie:rnes|,s\u00e1b:ado|+sab:ado|",
        numerals: "cero,uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez",
        tokens: "el,la,de",
        "short": "{dd}/{MM}/{yyyy}",
        medium: "{d} de {Month} de {yyyy}",
        "long": "{d} de {Month} de {yyyy} {time}",
        full: "{weekday}, {d} de {month} de {yyyy} {time}",
        stamp: "{dow} {d} {mon} {yyyy} {time}",
        time: "{H}:{mm}",
        past: "{sign} {num} {unit}",
        future: "{sign} {num} {unit}",
        duration: "{num} {unit}",
        timeMarkers: "a las",
        ampm: "am,pm",
        modifiers: [{
            name: "day",
            src: "anteayer",
            value: -2
        }, {
            name: "day",
            src: "ayer",
            value: -1
        }, {
            name: "day",
            src: "hoy",
            value: 0
        }, {
            name: "day",
            src: "ma\u00f1ana|manana",
            value: 1
        }, {
            name: "sign",
            src: "hace",
            value: -1
        }, {
            name: "sign",
            src: "dentro de",
            value: 1
        }, {
            name: "shift",
            src: "pasad:o|a",
            value: -1
        }, {
            name: "shift",
            src: "pr\u00f3ximo|pr\u00f3xima|proximo|proxima",
            value: 1
        }],
        parse: ["{months} {2?} {year?}", "{sign} {num} {unit}", "{num} {unit} {sign}", "{0?}{1?} {unit:5-7} {shift}", "{0?}{1?} {shift} {unit:5-7}"],
        timeParse: ["{shift?} {day|weekday} {shift?}", "{date} {2?} {months?}\\.? {2?} {year?}"],
        timeFrontParse: ["{shift?} {weekday} {shift?}", "{date} {2?} {months?}\\.? {2?} {year?}"]
    });
    m.Date.addLocale("fi", {
        plural: !0,
        units: "millisekun:ti|tia|nin|teja|tina,sekun:ti|tia|nin|teja|tina,minuut:ti|tia|in|teja|tina,tun:ti|tia|nin|teja|tina,p\u00e4iv:\u00e4|\u00e4\u00e4|\u00e4n|i\u00e4|\u00e4n\u00e4,viik:ko|koa|on|olla|koja|kona,kuukau:si|tta|den+kuussa,vuo:si|tta|den|sia|tena|nna",
        months: "tammi:kuuta||kuu,helmi:kuuta||kuu,maalis:kuuta||kuu,huhti:kuuta||kuu,touko:kuuta||kuu,kes\u00e4:kuuta||kuu,hein\u00e4:kuuta||kuu,elo:kuuta||kuu,syys:kuuta||kuu,loka:kuuta||kuu,marras:kuuta||kuu,joulu:kuuta||kuu",
        weekdays: "su:nnuntai||nnuntaina,ma:anantai||anantaina,ti:istai||istaina,ke:skiviikko||skiviikkona,to:rstai||rstaina,pe:rjantai||rjantaina,la:uantai||uantaina",
        numerals: "nolla,yksi|ensimm\u00e4inen,kaksi|toinen,kolm:e|as,nelj\u00e4:|s,vii:si|des,kuu:si|des,seitsem\u00e4:n|s,kahdeksa:n|s,yhdeks\u00e4:n|s,kymmene:n|s",
        "short": "{d}.{M}.{yyyy}",
        medium: "{d}. {month} {yyyy}",
        "long": "{d}. {month} {yyyy} klo {time}",
        full: "{weekday} {d}. {month} {yyyy} klo {time}",
        stamp: "{dow} {d} {mon} {yyyy} {time}",
        time: "{H}.{mm}",
        timeMarkers: "klo,kello",
        ordinalSuffix: ".",
        relative: function (a, b, c, d) {
            c = this.units;
            switch (d) {
                case "duration":
                    return a + " " + c[8 * (1 === a ? 0 : 1) + b];
                case "past":
                    return a + " " + c[8 * (1 === a ? 0 : 1) + b] + " sitten";
                case "future":
                    return a + " " + c[16 + b] + " kuluttua";
            }
        },
        modifiers: [{
            name: "day",
            src: "toissa p\u00e4iv\u00e4n\u00e4",
            value: -2
        }, {
            name: "day",
            src: "eilen|eilist\u00e4",
            value: -1
        }, {
            name: "day",
            src: "t\u00e4n\u00e4\u00e4n",
            value: 0
        }, {
            name: "day",
            src: "huomenna|huomista",
            value: 1
        }, {
            name: "day",
            src: "ylihuomenna|ylihuomista",
            value: 2
        }, {
            name: "sign",
            src: "sitten|aiemmin",
            value: -1
        }, {
            name: "sign",
            src: "p\u00e4\u00e4st\u00e4|kuluttua|my\u00f6hemmin",
            value: 1
        }, {
            name: "edge",
            src: "lopussa",
            value: 2
        }, {
            name: "edge",
            src: "ensimm\u00e4inen|ensimm\u00e4isen\u00e4",
            value: -2
        }, {
            name: "shift",
            src: "edel:linen|lisen\u00e4",
            value: -1
        }, {
            name: "shift",
            src: "viime",
            value: -1
        }, {
            name: "shift",
            src: "t\u00e4:ll\u00e4|ss\u00e4|n\u00e4|m\u00e4",
            value: 0
        }, {
            name: "shift",
            src: "seuraava|seuraavana|tuleva|tulevana|ensi",
            value: 1
        }],
        parse: ["{months} {year?}", "{shift} {unit:5-7}"],
        timeParse: ["{shift?} {day|weekday}", "{weekday?},? {date}\\.? {months?}\\.? {year?}"],
        timeFrontParse: ["{shift?} {day|weekday}", "{num?} {unit} {sign}", "{weekday?},? {date}\\.? {months?}\\.? {year?}"]
    });
    m.Date.addLocale("fr", {
        plural: !0,
        units: "milliseconde:|s,seconde:|s,minute:|s,heure:|s,jour:|s,semaine:|s,mois,an:|s|n\u00e9e|nee",
        months: "janv:ier|,f\u00e9vr:ier|+fevr:ier|,mars,avr:il|,mai,juin,juil:let|,ao\u00fbt,sept:embre|,oct:obre|,nov:embre|,d\u00e9c:embre|+dec:embre|",
        weekdays: "dim:anche|,lun:di|,mar:di|,mer:credi|,jeu:di|,ven:dredi|,sam:edi|",
        numerals: "z\u00e9ro,un:|e,deux,trois,quatre,cinq,six,sept,huit,neuf,dix",
        tokens: "l'|la|le,er",
        "short": "{dd}/{MM}/{yyyy}",
        medium: "{d} {month} {yyyy}",
        "long": "{d} {month} {yyyy} {time}",
        full: "{weekday} {d} {month} {yyyy} {time}",
        stamp: "{dow} {d} {mon} {yyyy} {time}",
        time: "{H}:{mm}",
        past: "{sign} {num} {unit}",
        future: "{sign} {num} {unit}",
        duration: "{num} {unit}",
        timeMarkers: "\u00e0",
        ampm: "am,pm",
        modifiers: [{
            name: "day",
            src: "hier",
            value: -1
        }, {
            name: "day",
            src: "aujourd'hui",
            value: 0
        }, {
            name: "day",
            src: "demain",
            value: 1
        }, {
            name: "sign",
            src: "il y a",
            value: -1
        }, {
            name: "sign",
            src: "dans|d'ici",
            value: 1
        }, {
            name: "shift",
            src: "derni:\u00e8r|er|\u00e8re|ere",
            value: -1
        }, {
            name: "shift",
            src: "prochain:|e",
            value: 1
        }],
        parse: ["{months} {year?}", "{sign} {num} {unit}", "{0?} {unit:5-7} {shift}"],
        timeParse: ["{day|weekday} {shift?}", "{weekday?},? {0?} {date}{1?} {months}\\.? {year?}"],
        timeFrontParse: ["{0?} {weekday} {shift}", "{weekday?},? {0?} {date}{1?} {months}\\.? {year?}"]
    });
    m.Date.addLocale("it", {
        plural: !0,
        units: "millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i",
        months: "gen:naio|,feb:braio|,mar:zo|,apr:ile|,mag:gio|,giu:gno|,lug:lio|,ago:sto|,set:tembre|,ott:obre|,nov:embre|,dic:embre|",
        weekdays: "dom:enica|,lun:ed\u00ec||edi,mar:ted\u00ec||tedi,mer:coled\u00ec||coledi,gio:ved\u00ec||vedi,ven:erd\u00ec||erdi,sab:ato|",
        numerals: "zero,un:|a|o|',due,tre,quattro,cinque,sei,sette,otto,nove,dieci",
        tokens: "l'|la|il",
        "short": "{dd}/{MM}/{yyyy}",
        medium: "{d} {month} {yyyy}",
        "long": "{d} {month} {yyyy} {time}",
        full: "{weekday}, {d} {month} {yyyy} {time}",
        stamp: "{dow} {d} {mon} {yyyy} {time}",
        time: "{H}:{mm}",
        past: "{num} {unit} {sign}",
        future: "{num} {unit} {sign}",
        duration: "{num} {unit}",
        timeMarkers: "alle",
        ampm: "am,pm",
        modifiers: [{
            name: "day",
            src: "ieri",
            value: -1
        }, {
            name: "day",
            src: "oggi",
            value: 0
        }, {
            name: "day",
            src: "domani",
            value: 1
        }, {
            name: "day",
            src: "dopodomani",
            value: 2
        }, {
            name: "sign",
            src: "fa",
            value: -1
        }, {
            name: "sign",
            src: "da adesso",
            value: 1
        }, {
            name: "shift",
            src: "scors:o|a",
            value: -1
        }, {
            name: "shift",
            src: "prossim:o|a",
            value: 1
        }],
        parse: ["{months} {year?}", "{num} {unit} {sign}", "{0?} {unit:5-7} {shift}", "{0?} {shift} {unit:5-7}"],
        timeParse: ["{shift?} {day|weekday}", "{weekday?},? {date} {months?}\\.? {year?}"],
        timeFrontParse: ["{shift?} {day|weekday}", "{weekday?},? {date} {months?}\\.? {year?}"]
    });
    m.Date.addLocale("ja", {
        ampmFront: !0,
        numeralUnits: !0,
        allowsFullWidth: !0,
        timeMarkerOptional: !0,
        firstDayOfWeek: 0,
        firstDayOfWeekYear: 1,
        units: "\u30df\u30ea\u79d2,\u79d2,\u5206,\u6642\u9593,\u65e5,\u9031\u9593|\u9031,\u30f6\u6708|\u30f5\u6708|\u6708,\u5e74|\u5e74\u5ea6",
        weekdays: "\u65e5:\u66dc\u65e5||\u66dc,\u6708:\u66dc\u65e5||\u66dc,\u706b:\u66dc\u65e5||\u66dc,\u6c34:\u66dc\u65e5||\u66dc,\u6728:\u66dc\u65e5||\u66dc,\u91d1:\u66dc\u65e5||\u66dc,\u571f:\u66dc\u65e5||\u66dc",
        numerals: "\u3007,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d,\u4e03,\u516b,\u4e5d",
        placeholders: "\u5341,\u767e,\u5343,\u4e07",
        timeSuffixes: ",\u79d2,\u5206,\u6642,\u65e5,,\u6708,\u5e74\u5ea6?",
        "short": "{yyyy}/{MM}/{dd}",
        medium: "{yyyy}\u5e74{M}\u6708{d}\u65e5",
        "long": "{yyyy}\u5e74{M}\u6708{d}\u65e5{time}",
        full: "{yyyy}\u5e74{M}\u6708{d}\u65e5{time} {weekday}",
        stamp: "{yyyy}\u5e74{M}\u6708{d}\u65e5 {H}:{mm} {dow}",
        time: "{tt}{h}\u6642{mm}\u5206",
        past: "{num}{unit}{sign}",
        future: "{num}{unit}{sign}",
        duration: "{num}{unit}",
        ampm: "\u5348\u524d,\u5348\u5f8c",
        modifiers: [{
            name: "day",
            src: "\u4e00\u6628\u3005\u65e5|\u524d\u3005\u3005\u65e5",
            value: -3
        }, {
            name: "day",
            src: "\u4e00\u6628\u65e5|\u304a\u3068\u3068\u3044|\u524d\u3005\u65e5",
            value: -2
        }, {
            name: "day",
            src: "\u6628\u65e5|\u524d\u65e5",
            value: -1
        }, {
            name: "day",
            src: "\u4eca\u65e5|\u5f53\u65e5|\u672c\u65e5",
            value: 0
        }, {
            name: "day",
            src: "\u660e\u65e5|\u7fcc\u65e5|\u6b21\u65e5",
            value: 1
        }, {
            name: "day",
            src: "\u660e\u5f8c\u65e5|\u7fcc\u3005\u65e5",
            value: 2
        }, {
            name: "day",
            src: "\u660e\u3005\u5f8c\u65e5|\u7fcc\u3005\u3005\u65e5",
            value: 3
        }, {
            name: "sign",
            src: "\u524d",
            value: -1
        }, {
            name: "sign",
            src: "\u5f8c",
            value: 1
        }, {
            name: "edge",
            src: "\u59cb|\u521d\u65e5|\u982d",
            value: -2
        }, {
            name: "edge",
            src: "\u672b|\u5c3b",
            value: 2
        }, {
            name: "edge",
            src: "\u672b\u65e5",
            value: 1
        }, {
            name: "shift",
            src: "\u4e00\u6628\u3005|\u524d\u3005\u3005",
            value: -3
        }, {
            name: "shift",
            src: "\u4e00\u6628|\u524d\u3005|\u5148\u3005",
            value: -2
        }, {
            name: "shift",
            src: "\u5148|\u6628|\u53bb|\u524d",
            value: -1
        }, {
            name: "shift",
            src: "\u4eca|\u672c|\u5f53",
            value: 0
        }, {
            name: "shift",
            src: "\u6765|\u660e|\u7fcc|\u6b21",
            value: 1
        }, {
            name: "shift",
            src: "\u660e\u5f8c|\u7fcc\u3005|\u6b21\u3005|\u518d\u6765|\u3055\u6765",
            value: 2
        }, {
            name: "shift",
            src: "\u660e\u3005\u5f8c|\u7fcc\u3005\u3005",
            value: 3
        }],
        parse: ["{month}{edge}", "{num}{unit}{sign}", "{year?}{month}", "{year}"],
        timeParse: "{day|weekday} {shift}{unit:5}{weekday?} {shift}{unit:7}{month}{edge} {shift}{unit:7}{month?}{date?} {shift}{unit:6}{edge?}{date?} {year?}{month?}{date}".split(" ")
    });
    m.Date.addLocale("ko", {
        ampmFront: !0,
        numeralUnits: !0,
        units: "\ubc00\ub9ac\ucd08,\ucd08,\ubd84,\uc2dc\uac04,\uc77c,\uc8fc,\uac1c\uc6d4|\ub2ec,\ub144|\ud574",
        weekdays: "\uc77c:\uc694\uc77c|,\uc6d4:\uc694\uc77c|,\ud654:\uc694\uc77c|,\uc218:\uc694\uc77c|,\ubaa9:\uc694\uc77c|,\uae08:\uc694\uc77c|,\ud1a0:\uc694\uc77c|",
        numerals: "\uc601|\uc81c\ub85c,\uc77c|\ud55c,\uc774,\uc0bc,\uc0ac,\uc624,\uc721,\uce60,\ud314,\uad6c,\uc2ed",
        "short": "{yyyy}.{MM}.{dd}",
        medium: "{yyyy}\ub144 {M}\uc6d4 {d}\uc77c",
        "long": "{yyyy}\ub144 {M}\uc6d4 {d}\uc77c {time}",
        full: "{yyyy}\ub144 {M}\uc6d4 {d}\uc77c {weekday} {time}",
        stamp: "{yyyy}\ub144 {M}\uc6d4 {d}\uc77c {H}:{mm} {dow}",
        time: "{tt} {h}\uc2dc {mm}\ubd84",
        past: "{num}{unit} {sign}",
        future: "{num}{unit} {sign}",
        duration: "{num}{unit}",
        timeSuffixes: ",\ucd08,\ubd84,\uc2dc,\uc77c,,\uc6d4,\ub144",
        ampm: "\uc624\uc804,\uc624\ud6c4",
        modifiers: [{
            name: "day",
            src: "\uadf8\uc800\uaed8",
            value: -2
        }, {
            name: "day",
            src: "\uc5b4\uc81c",
            value: -1
        }, {
            name: "day",
            src: "\uc624\ub298",
            value: 0
        }, {
            name: "day",
            src: "\ub0b4\uc77c",
            value: 1
        }, {
            name: "day",
            src: "\ubaa8\ub808",
            value: 2
        }, {
            name: "sign",
            src: "\uc804",
            value: -1
        }, {
            name: "sign",
            src: "\ud6c4",
            value: 1
        }, {
            name: "shift",
            src: "\uc9c0\ub09c|\uc791",
            value: -1
        }, {
            name: "shift",
            src: "\uc774\ubc88|\uc62c",
            value: 0
        }, {
            name: "shift",
            src: "\ub2e4\uc74c|\ub0b4",
            value: 1
        }],
        parse: ["{num}{unit} {sign}", "{shift?} {unit:5-7}", "{year?} {month}", "{year}"],
        timeParse: ["{day|weekday}", "{shift} {unit:5?} {weekday}", "{year?} {month?} {date} {weekday?}"]
    });
    m.Date.addLocale("nl", {
        plural: !0,
        units: "milliseconde:|n,seconde:|n,minu:ut|ten,uur,dag:|en,we:ek|ken,maand:|en,jaar",
        months: "jan:uari|,feb:ruari|,maart|mrt,apr:il|,mei,jun:i|,jul:i|,aug:ustus|,sep:tember|,okt:ober|,nov:ember|,dec:ember|",
        weekdays: "zondag|zo,maandag|ma,dinsdag|di,woensdag|wo|woe,donderdag|do,vrijdag|vr|vrij,zaterdag|za",
        numerals: "nul,een,twee,drie,vier,vijf,zes,zeven,acht,negen,tien",
        "short": "{dd}-{MM}-{yyyy}",
        medium: "{d} {month} {yyyy}",
        "long": "{d} {Month} {yyyy} {time}",
        full: "{weekday} {d} {Month} {yyyy} {time}",
        stamp: "{dow} {d} {Mon} {yyyy} {time}",
        time: "{H}:{mm}",
        past: "{num} {unit} {sign}",
        future: "{num} {unit} {sign}",
        duration: "{num} {unit}",
        timeMarkers: "'s,om",
        modifiers: [{
            name: "day",
            src: "gisteren",
            value: -1
        }, {
            name: "day",
            src: "vandaag",
            value: 0
        }, {
            name: "day",
            src: "morgen",
            value: 1
        }, {
            name: "day",
            src: "overmorgen",
            value: 2
        }, {
            name: "sign",
            src: "geleden",
            value: -1
        }, {
            name: "sign",
            src: "vanaf nu",
            value: 1
        }, {
            name: "shift",
            src: "laatste|vorige|afgelopen",
            value: -1
        }, {
            name: "shift",
            src: "volgend:|e",
            value: 1
        }],
        parse: ["{months} {year?}", "{num} {unit} {sign}", "{0?} {unit:5-7} {shift}", "{0?} {shift} {unit:5-7}"],
        timeParse: ["{shift?} {day|weekday}", "{weekday?},? {date} {months?}\\.? {year?}"],
        timeFrontParse: ["{shift?} {day|weekday}", "{weekday?},? {date} {months?}\\.? {year?}"]
    });
    m.Date.addLocale("no", {
        plural: !0,
        units: "millisekund:|er,sekund:|er,minutt:|er,tim:e|er,dag:|er,uk:e|er|en,m\u00e5ned:|er|en+maaned:|er|en,\u00e5r:||et+aar:||et",
        months: "januar,februar,mars,april,mai,juni,juli,august,september,oktober,november,desember",
        weekdays: "s\u00f8ndag|sondag,mandag,tirsdag,onsdag,torsdag,fredag,l\u00f8rdag|lordag",
        numerals: "en|et,to,tre,fire,fem,seks,sju|syv,\u00e5tte,ni,ti",
        tokens: "den,for",
        articles: "den",
        "short": "d. {d}. {month} {yyyy}",
        "long": "den {d}. {month} {yyyy} {H}:{mm}",
        full: "{Weekday} den {d}. {month} {yyyy} {H}:{mm}:{ss}",
        past: "{num} {unit} {sign}",
        future: "{sign} {num} {unit}",
        duration: "{num} {unit}",
        ampm: "am,pm",
        modifiers: [{
            name: "day",
            src: "forg\u00e5rs|i forg\u00e5rs|forgaars|i forgaars",
            value: -2
        }, {
            name: "day",
            src: "i g\u00e5r|ig\u00e5r|i gaar|igaar",
            value: -1
        }, {
            name: "day",
            src: "i dag|idag",
            value: 0
        }, {
            name: "day",
            src: "i morgen|imorgen",
            value: 1
        }, {
            name: "day",
            src: "overimorgen|overmorgen|over i morgen",
            value: 2
        }, {
            name: "sign",
            src: "siden",
            value: -1
        }, {
            name: "sign",
            src: "om",
            value: 1
        }, {
            name: "shift",
            src: "i siste|siste",
            value: -1
        }, {
            name: "shift",
            src: "denne",
            value: 0
        }, {
            name: "shift",
            src: "neste",
            value: 1
        }],
        parse: ["{num} {unit} {sign}", "{sign} {num} {unit}", "{1?} {num} {unit} {sign}", "{shift} {unit:5-7}"],
        timeParse: ["{date} {month}", "{shift} {weekday}", "{0?} {weekday?},? {date?} {month}\\.? {year}"]
    });
    m.Date.addLocale("pl", {
        plural: !0,
        units: "milisekund:a|y|,sekund:a|y|,minut:a|y|,godzin:a|y|,dzie\u0144|dni|dni,tydzie\u0144|tygodnie|tygodni,miesi\u0105c|miesi\u0105ce|miesi\u0119cy,rok|lata|lat",
        months: "sty:cznia||cze\u0144,lut:ego||y,mar:ca||zec,kwi:etnia||ecie\u0144,maj:a|,cze:rwca||rwiec,lip:ca||iec,sie:rpnia||rpie\u0144,wrz:e\u015bnia||esie\u0144,pa\u017a:dziernika||dziernik,lis:topada||topad,gru:dnia||dzie\u0144",
        weekdays: "nie:dziela||dziel\u0119,pon:iedzia\u0142ek|,wt:orek|,\u015br:oda||od\u0119,czw:artek|,pi\u0105tek|pt,sobota|sb|sobot\u0119",
        numerals: "zero,jeden|jedn\u0105,dwa|dwie,trzy,cztery,pi\u0119\u0107,sze\u015b\u0107,siedem,osiem,dziewi\u0119\u0107,dziesi\u0119\u0107",
        tokens: "w|we,roku",
        "short": "{dd}.{MM}.{yyyy}",
        medium: "{d} {month} {yyyy}",
        "long": "{d} {month} {yyyy} {time}",
        full: "{weekday}, {d} {month} {yyyy} {time}",
        stamp: "{dow} {d} {mon} {yyyy} {time}",
        time: "{H}:{mm}",
        timeMarkers: "o",
        ampm: "am,pm",
        modifiers: [{
            name: "day",
            src: "przedwczoraj",
            value: -2
        }, {
            name: "day",
            src: "wczoraj",
            value: -1
        }, {
            name: "day",
            src: "dzisiaj|dzi\u015b",
            value: 0
        }, {
            name: "day",
            src: "jutro",
            value: 1
        }, {
            name: "day",
            src: "pojutrze",
            value: 2
        }, {
            name: "sign",
            src: "temu|przed",
            value: -1
        }, {
            name: "sign",
            src: "za",
            value: 1
        }, {
            name: "shift",
            src: "zesz\u0142y|zesz\u0142a|ostatni|ostatnia",
            value: -1
        }, {
            name: "shift",
            src: "nast\u0119pny|nast\u0119pna|nast\u0119pnego|przysz\u0142y|przysz\u0142a|przysz\u0142ego",
            value: 1
        }],
        relative: function (a, b, c, d) {
            if (4 === b) {
                if (1 === a && "past" === d) {
                    return "wczoraj";
                }
                if (1 === a && "future" === d) {
                    return "jutro";
                }
                if (2 === a && "past" === d) {
                    return "przedwczoraj";
                }
                if (2 === a && "future" === d) {
                    return "pojutrze";
                }
            }
            c = +a.toFixed(0).slice(-1);
            var e = +a.toFixed(0).slice(-2);
            switch (!0) {
                case 1 === a:
                    c = 0;
                    break;
                case 12 <= e && 14 >= e:
                    c = 2;
                    break;
                case 2 <= c && 4 >= c:
                    c = 1;
                    break;
                default:
                    c = 2;
            }
            b = this.units[8 * c + b];
            c = a + " ";
            "past" !== d && "future" !== d || 1 !== a || (b = b.replace(/a$/, "\u0119"));
            b = c + b;
            switch (d) {
                case "duration":
                    return b;
                case "past":
                    return b + " temu";
                case "future":
                    return "za " + b;
            }
        },
        parse: ["{num} {unit} {sign}", "{sign} {num} {unit}", "{months} {year?}", "{shift} {unit:5-7}", "{0} {shift?} {weekday}"],
        timeFrontParse: ["{day|weekday}", "{date} {months} {year?} {1?}", "{0?} {shift?} {weekday}"]
    });
    m.Date.addLocale("pt", {
        plural: !0,
        units: "milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,m\u00eas|m\u00eases|mes|meses,ano:|s",
        months: "jan:eiro|,fev:ereiro|,mar:\u00e7o|,abr:il|,mai:o|,jun:ho|,jul:ho|,ago:sto|,set:embro|,out:ubro|,nov:embro|,dez:embro|",
        weekdays: "dom:ingo|,seg:unda-feira|,ter:\u00e7a-feira|,qua:rta-feira|,qui:nta-feira|,sex:ta-feira|,s\u00e1b:ado||ado",
        numerals: "zero,um:|a,dois|duas,tr\u00eas|tres,quatro,cinco,seis,sete,oito,nove,dez",
        tokens: "a,de",
        "short": "{dd}/{MM}/{yyyy}",
        medium: "{d} de {Month} de {yyyy}",
        "long": "{d} de {Month} de {yyyy} {time}",
        full: "{Weekday}, {d} de {Month} de {yyyy} {time}",
        stamp: "{Dow} {d} {Mon} {yyyy} {time}",
        time: "{H}:{mm}",
        past: "{num} {unit} {sign}",
        future: "{sign} {num} {unit}",
        duration: "{num} {unit}",
        timeMarkers: "\u00e0s",
        ampm: "am,pm",
        modifiers: [{
            name: "day",
            src: "anteontem",
            value: -2
        }, {
            name: "day",
            src: "ontem",
            value: -1
        }, {
            name: "day",
            src: "hoje",
            value: 0
        }, {
            name: "day",
            src: "amanh:\u00e3|a",
            value: 1
        }, {
            name: "sign",
            src: "atr\u00e1s|atras|h\u00e1|ha",
            value: -1
        }, {
            name: "sign",
            src: "daqui a",
            value: 1
        }, {
            name: "shift",
            src: "passad:o|a",
            value: -1
        }, {
            name: "shift",
            src: "pr\u00f3ximo|pr\u00f3xima|proximo|proxima",
            value: 1
        }],
        parse: ["{months} {1?} {year?}", "{num} {unit} {sign}", "{sign} {num} {unit}", "{0?} {unit:5-7} {shift}", "{0?} {shift} {unit:5-7}"],
        timeParse: ["{shift?} {day|weekday}", "{0?} {shift} {weekday}", "{date} {1?} {months?} {1?} {year?}"],
        timeFrontParse: ["{shift?} {day|weekday}", "{date} {1?} {months?} {1?} {year?}"]
    });
    m.Date.addLocale("ru", {
        firstDayOfWeekYear: 1,
        units: "\u043c\u0438\u043b\u043b\u0438\u0441\u0435\u043a\u0443\u043d\u0434:\u0430|\u0443|\u044b|,\u0441\u0435\u043a\u0443\u043d\u0434:\u0430|\u0443|\u044b|,\u043c\u0438\u043d\u0443\u0442:\u0430|\u0443|\u044b|,\u0447\u0430\u0441:||\u0430|\u043e\u0432,\u0434\u0435\u043d\u044c|\u0434\u0435\u043d\u044c|\u0434\u043d\u044f|\u0434\u043d\u0435\u0439,\u043d\u0435\u0434\u0435\u043b:\u044f|\u044e|\u0438|\u044c|\u0435,\u043c\u0435\u0441\u044f\u0446:||\u0430|\u0435\u0432|\u0435,\u0433\u043e\u0434|\u0433\u043e\u0434|\u0433\u043e\u0434\u0430|\u043b\u0435\u0442|\u0433\u043e\u0434\u0443",
        months: "\u044f\u043d\u0432:\u0430\u0440\u044f||.|\u0430\u0440\u044c,\u0444\u0435\u0432:\u0440\u0430\u043b\u044f||\u0440.|\u0440\u0430\u043b\u044c,\u043c\u0430\u0440:\u0442\u0430||\u0442,\u0430\u043f\u0440:\u0435\u043b\u044f||.|\u0435\u043b\u044c,\u043c\u0430\u044f|\u043c\u0430\u0439,\u0438\u044e\u043d:\u044f||\u044c,\u0438\u044e\u043b:\u044f||\u044c,\u0430\u0432\u0433:\u0443\u0441\u0442\u0430||.|\u0443\u0441\u0442,\u0441\u0435\u043d:\u0442\u044f\u0431\u0440\u044f||\u0442.|\u0442\u044f\u0431\u0440\u044c,\u043e\u043a\u0442:\u044f\u0431\u0440\u044f||.|\u044f\u0431\u0440\u044c,\u043d\u043e\u044f:\u0431\u0440\u044f||\u0431\u0440\u044c,\u0434\u0435\u043a:\u0430\u0431\u0440\u044f||.|\u0430\u0431\u0440\u044c",
        weekdays: "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435|\u0432\u0441,\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a|\u043f\u043d,\u0432\u0442\u043e\u0440\u043d\u0438\u043a|\u0432\u0442,\u0441\u0440\u0435\u0434\u0430|\u0441\u0440,\u0447\u0435\u0442\u0432\u0435\u0440\u0433|\u0447\u0442,\u043f\u044f\u0442\u043d\u0438\u0446\u0430|\u043f\u0442,\u0441\u0443\u0431\u0431\u043e\u0442\u0430|\u0441\u0431",
        numerals: "\u043d\u043e\u043b\u044c,\u043e\u0434:\u0438\u043d|\u043d\u0443,\u0434\u0432:\u0430|\u0435,\u0442\u0440\u0438,\u0447\u0435\u0442\u044b\u0440\u0435,\u043f\u044f\u0442\u044c,\u0448\u0435\u0441\u0442\u044c,\u0441\u0435\u043c\u044c,\u0432\u043e\u0441\u0435\u043c\u044c,\u0434\u0435\u0432\u044f\u0442\u044c,\u0434\u0435\u0441\u044f\u0442\u044c",
        tokens: "\u0432|\u043d\u0430,\u0433\\.?(?:\u043e\u0434\u0430)?",
        "short": "{dd}.{MM}.{yyyy}",
        medium: "{d} {month} {yyyy} \u0433.",
        "long": "{d} {month} {yyyy} \u0433., {time}",
        full: "{weekday}, {d} {month} {yyyy} \u0433., {time}",
        stamp: "{dow} {d} {mon} {yyyy} {time}",
        time: "{H}:{mm}",
        timeMarkers: "\u0432",
        ampm: " \u0443\u0442\u0440\u0430, \u0432\u0435\u0447\u0435\u0440\u0430",
        modifiers: [{
            name: "day",
            src: "\u043f\u043e\u0437\u0430\u0432\u0447\u0435\u0440\u0430",
            value: -2
        }, {
            name: "day",
            src: "\u0432\u0447\u0435\u0440\u0430",
            value: -1
        }, {
            name: "day",
            src: "\u0441\u0435\u0433\u043e\u0434\u043d\u044f",
            value: 0
        }, {
            name: "day",
            src: "\u0437\u0430\u0432\u0442\u0440\u0430",
            value: 1
        }, {
            name: "day",
            src: "\u043f\u043e\u0441\u043b\u0435\u0437\u0430\u0432\u0442\u0440\u0430",
            value: 2
        }, {
            name: "sign",
            src: "\u043d\u0430\u0437\u0430\u0434",
            value: -1
        }, {
            name: "sign",
            src: "\u0447\u0435\u0440\u0435\u0437",
            value: 1
        }, {
            name: "shift",
            src: "\u043f\u0440\u043e\u0448\u043b:\u044b\u0439|\u043e\u0439|\u043e\u043c",
            value: -1
        }, {
            name: "shift",
            src: "\u0441\u043b\u0435\u0434\u0443\u044e\u0449:\u0438\u0439|\u0435\u0439|\u0435\u043c",
            value: 1
        }],
        relative: function (a, b, c, d) {
            c = a.toString().slice(-1);
            switch (!0) {
                case 11 <= a && 15 >= a:
                    c = 3;
                    break;
                case 1 == c:
                    c = 1;
                    break;
                case 2 <= c && 4 >= c:
                    c = 2;
                    break;
                default:
                    c = 3;
            }
            a = a + " " + this.units[8 * c + b];
            switch (d) {
                case "duration":
                    return a;
                case "past":
                    return a + " \u043d\u0430\u0437\u0430\u0434";
                case "future":
                    return "\u0447\u0435\u0440\u0435\u0437 " + a;
            }
        },
        parse: ["{num} {unit} {sign}", "{sign} {num} {unit}", "{months} {year?}", "{0?} {shift} {unit:5-7}"],
        timeParse: ["{day|weekday}", "{0?} {shift} {weekday}", "{date} {months?} {year?} {1?}"],
        timeFrontParse: ["{0?} {shift} {weekday}", "{date} {months?} {year?} {1?}"]
    });
    m.Date.addLocale("sv", {
        plural: !0,
        units: "millisekund:|er,sekund:|er,minut:|er,timm:e|ar,dag:|ar,veck:a|or|an,m\u00e5nad:|er|en+manad:|er|en,\u00e5r:||et+ar:||et",
        months: "jan:uari|,feb:ruari|,mar:s|,apr:il|,maj,jun:i|,jul:i|,aug:usti|,sep:tember|,okt:ober|,nov:ember|,dec:ember|",
        weekdays: "s\u00f6n:dag|+son:dag|,m\u00e5n:dag||dagen+man:dag||dagen,tis:dag|,ons:dag|,tor:sdag|,fre:dag|,l\u00f6r:dag||dag",
        numerals: "noll,en|ett,tv\u00e5|tva,tre,fyra,fem,sex,sju,\u00e5tta|atta,nio,tio",
        tokens: "den,f\u00f6r|for",
        articles: "den",
        "short": "{yyyy}-{MM}-{dd}",
        medium: "{d} {month} {yyyy}",
        "long": "{d} {month} {yyyy} {time}",
        full: "{weekday} {d} {month} {yyyy} {time}",
        stamp: "{dow} {d} {mon} {yyyy} {time}",
        time: "{H}:{mm}",
        past: "{num} {unit} {sign}",
        future: "{sign} {num} {unit}",
        duration: "{num} {unit}",
        ampm: "am,pm",
        modifiers: [{
            name: "day",
            src: "f\u00f6rrg\u00e5r|i f\u00f6rrg\u00e5r|if\u00f6rrg\u00e5r|forrgar|i forrgar|iforrgar",
            value: -2
        }, {
            name: "day",
            src: "g\u00e5r|i g\u00e5r|ig\u00e5r|gar|i gar|igar",
            value: -1
        }, {
            name: "day",
            src: "dag|i dag|idag",
            value: 0
        }, {
            name: "day",
            src: "morgon|i morgon|imorgon",
            value: 1
        }, {
            name: "day",
            src: "\u00f6ver morgon|\u00f6vermorgon|i \u00f6ver morgon|i \u00f6vermorgon|i\u00f6vermorgon|over morgon|overmorgon|i over morgon|i overmorgon|iovermorgon",
            value: 2
        }, {
            name: "sign",
            src: "sedan|sen",
            value: -1
        }, {
            name: "sign",
            src: "om",
            value: 1
        }, {
            name: "shift",
            src: "i f\u00f6rra|f\u00f6rra|i forra|forra",
            value: -1
        }, {
            name: "shift",
            src: "denna",
            value: 0
        }, {
            name: "shift",
            src: "n\u00e4sta|nasta",
            value: 1
        }],
        parse: ["{months} {year?}", "{num} {unit} {sign}", "{sign} {num} {unit}", "{1?} {num} {unit} {sign}", "{shift} {unit:5-7}"],
        timeParse: ["{day|weekday}", "{shift} {weekday}", "{0?} {weekday?},? {date} {months?}\\.? {year?}"],
        timeFrontParse: ["{day|weekday}", "{shift} {weekday}", "{0?} {weekday?},? {date} {months?}\\.? {year?}"]
    });
    m.Date.addLocale("zh-CN", {
        ampmFront: !0,
        numeralUnits: !0,
        allowsFullWidth: !0,
        timeMarkerOptional: !0,
        units: "\u6beb\u79d2,\u79d2\u949f,\u5206\u949f,\u5c0f\u65f6,\u5929,\u4e2a\u661f\u671f|\u5468,\u4e2a\u6708,\u5e74",
        weekdays: "\u661f\u671f\u65e5|\u65e5|\u5468\u65e5|\u661f\u671f\u5929,\u661f\u671f\u4e00|\u4e00|\u5468\u4e00,\u661f\u671f\u4e8c|\u4e8c|\u5468\u4e8c,\u661f\u671f\u4e09|\u4e09|\u5468\u4e09,\u661f\u671f\u56db|\u56db|\u5468\u56db,\u661f\u671f\u4e94|\u4e94|\u5468\u4e94,\u661f\u671f\u516d|\u516d|\u5468\u516d",
        numerals: "\u3007,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d,\u4e03,\u516b,\u4e5d",
        placeholders: "\u5341,\u767e,\u5343,\u4e07",
        "short": "{yyyy}-{MM}-{dd}",
        medium: "{yyyy}\u5e74{M}\u6708{d}\u65e5",
        "long": "{yyyy}\u5e74{M}\u6708{d}\u65e5{time}",
        full: "{yyyy}\u5e74{M}\u6708{d}\u65e5{weekday}{time}",
        stamp: "{yyyy}\u5e74{M}\u6708{d}\u65e5{H}:{mm}{dow}",
        time: "{tt}{h}\u70b9{mm}\u5206",
        past: "{num}{unit}{sign}",
        future: "{num}{unit}{sign}",
        duration: "{num}{unit}",
        timeSuffixes: ",\u79d2,\u5206\u949f?,\u70b9|\u65f6,\u65e5|\u53f7,,\u6708,\u5e74",
        ampm: "\u4e0a\u5348,\u4e0b\u5348",
        modifiers: [{
            name: "day",
            src: "\u5927\u524d\u5929",
            value: -3
        }, {
            name: "day",
            src: "\u524d\u5929",
            value: -2
        }, {
            name: "day",
            src: "\u6628\u5929",
            value: -1
        }, {
            name: "day",
            src: "\u4eca\u5929",
            value: 0
        }, {
            name: "day",
            src: "\u660e\u5929",
            value: 1
        }, {
            name: "day",
            src: "\u540e\u5929",
            value: 2
        }, {
            name: "day",
            src: "\u5927\u540e\u5929",
            value: 3
        }, {
            name: "sign",
            src: "\u524d",
            value: -1
        }, {
            name: "sign",
            src: "\u540e",
            value: 1
        }, {
            name: "shift",
            src: "\u4e0a|\u53bb",
            value: -1
        }, {
            name: "shift",
            src: "\u8fd9",
            value: 0
        }, {
            name: "shift",
            src: "\u4e0b|\u660e",
            value: 1
        }],
        parse: ["{num}{unit}{sign}", "{shift}{unit:5-7}", "{year?}{month}", "{year}"],
        timeParse: ["{day|weekday}", "{shift}{weekday}", "{year?}{month?}{date}"]
    });
    m.Date.addLocale("zh-TW", {
        ampmFront: !0,
        numeralUnits: !0,
        allowsFullWidth: !0,
        timeMarkerOptional: !0,
        units: "\u6beb\u79d2,\u79d2\u9418,\u5206\u9418,\u5c0f\u6642,\u5929,\u500b\u661f\u671f|\u9031,\u500b\u6708,\u5e74",
        weekdays: "\u661f\u671f\u65e5|\u65e5|\u9031\u65e5|\u661f\u671f\u5929,\u661f\u671f\u4e00|\u4e00|\u9031\u4e00,\u661f\u671f\u4e8c|\u4e8c|\u9031\u4e8c,\u661f\u671f\u4e09|\u4e09|\u9031\u4e09,\u661f\u671f\u56db|\u56db|\u9031\u56db,\u661f\u671f\u4e94|\u4e94|\u9031\u4e94,\u661f\u671f\u516d|\u516d|\u9031\u516d",
        numerals: "\u3007,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d,\u4e03,\u516b,\u4e5d",
        placeholders: "\u5341,\u767e,\u5343,\u4e07",
        "short": "{yyyy}/{MM}/{dd}",
        medium: "{yyyy}\u5e74{M}\u6708{d}\u65e5",
        "long": "{yyyy}\u5e74{M}\u6708{d}\u65e5{time}",
        full: "{yyyy}\u5e74{M}\u6708{d}\u65e5{weekday}{time}",
        stamp: "{yyyy}\u5e74{M}\u6708{d}\u65e5{H}:{mm}{dow}",
        time: "{tt}{h}\u9ede{mm}\u5206",
        past: "{num}{unit}{sign}",
        future: "{num}{unit}{sign}",
        duration: "{num}{unit}",
        timeSuffixes: ",\u79d2,\u5206\u9418?,\u9ede|\u6642,\u65e5|\u865f,,\u6708,\u5e74",
        ampm: "\u4e0a\u5348,\u4e0b\u5348",
        modifiers: [{
            name: "day",
            src: "\u5927\u524d\u5929",
            value: -3
        }, {
            name: "day",
            src: "\u524d\u5929",
            value: -2
        }, {
            name: "day",
            src: "\u6628\u5929",
            value: -1
        }, {
            name: "day",
            src: "\u4eca\u5929",
            value: 0
        }, {
            name: "day",
            src: "\u660e\u5929",
            value: 1
        }, {
            name: "day",
            src: "\u5f8c\u5929",
            value: 2
        }, {
            name: "day",
            src: "\u5927\u5f8c\u5929",
            value: 3
        }, {
            name: "sign",
            src: "\u524d",
            value: -1
        }, {
            name: "sign",
            src: "\u5f8c",
            value: 1
        }, {
            name: "shift",
            src: "\u4e0a|\u53bb",
            value: -1
        }, {
            name: "shift",
            src: "\u9019",
            value: 0
        }, {
            name: "shift",
            src: "\u4e0b|\u660e",
            value: 1
        }],
        parse: ["{num}{unit}{sign}", "{shift}{unit:5-7}", "{year?}{month}", "{year}"],
        timeParse: ["{day|weekday}", "{shift}{weekday}", "{year?}{month?}{date}"]
    });
}).call(this);
(function (a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cu(a) {
        if (!cj[a]) {
            var b = c.body,
                d = f("<" + a + ">").appendTo(b),
                e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck);
                if (!cl || !ck.createElement) cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close();
                d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck)
            }
            cj[a] = e
        }
        return cj[a]
    }

    function ct(a, b) {
        var c = {};
        f.each(cp.concat.apply([], cp.slice(0, b)), function () {
            c[this] = a
        });
        return c
    }

    function cs() {
        cq = b
    }

    function cr() {
        setTimeout(cs, 0);
        return cq = f.now()
    }

    function ci() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }

    function ch() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function cb(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes,
            e = {},
            g, h, i = d.length,
            j, k = d[0],
            l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)
                for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l;
            else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function ca(a, c, d) {
        var e = a.contents,
            f = a.dataTypes,
            g = a.responseFields,
            h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)
            for (i in e)
                if (e[i] && e[i].test(h)) {
                    f.unshift(i);
                    break
                }
        if (f[0] in d) j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function b_(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function (b, e) {
            c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
        });
        else if (!c && f.type(b) === "object")
            for (var e in b) b_(a + "[" + e + "]", b[e], c, d);
        else d(a, b)
    }

    function b$(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function bZ(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f],
            i = 0,
            j = h ? h.length : 0,
            k = a === bS,
            l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
        return l
    }

    function bY(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bO),
                    e = 0,
                    g = d.length,
                    h, i, j;
                for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function bB(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight,
            e = b === "width" ? 1 : 0,
            g = 4;
        if (d > 0) {
            if (c !== "border")
                for (; e < g; e += 2) c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
            return d + "px"
        }
        d = by(a, b);
        if (d < 0 || d == null) d = a.style[b];
        if (bt.test(d)) return d;
        d = parseFloat(d) || 0;
        if (c)
            for (; e < g; e += 2) d += parseFloat(f.css(a, "padding" + bx[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0);
        return d + "px"
    }

    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
    }

    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
    }

    function bj(a, b) {
        if (b.nodeType === 1 && !!f.hasData(a)) {
            var c, d, e, g = f._data(a),
                h = f._data(b, g),
                i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i)
                    for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c, i[c][d])
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement)
            while (b.length) c.createElement(b.pop());
        return c
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function (a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return f.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function K() {
        return !0
    }

    function J() {
        return !1
    }

    function n(a, b, c) {
        var d = b + "defer",
            e = b + "queue",
            g = b + "mark",
            h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1
        }
        return !0
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {}
                f.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b = g[a] = {},
            c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b
    }
    var c = a.document,
        d = a.navigator,
        e = a.location,
        f = function () {
            function J() {
                if (!e.isReady) {
                    try {
                        c.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(J, 1);
                        return
                    }
                    e.ready()
                }
            }
            var e = function (a, b) {
                    return new e.fn.init(a, b, h)
                },
                f = a.jQuery,
                g = a.$,
                h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                j = /\S/,
                k = /^\s+/,
                l = /\s+$/,
                m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                n = /^[\],:{}\s]*$/,
                o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                q = /(?:^|:|,)(?:\s*\[)+/g,
                r = /(webkit)[ \/]([\w.]+)/,
                s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                t = /(msie) ([\w.]+)/,
                u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                v = /-([a-z]|[0-9])/ig,
                w = /^-ms-/,
                x = function (a, b) {
                    return (b + "").toUpperCase()
                },
                y = d.userAgent,
                z, A, B, C = Object.prototype.toString,
                D = Object.prototype.hasOwnProperty,
                E = Array.prototype.push,
                F = Array.prototype.slice,
                G = String.prototype.trim,
                H = Array.prototype.indexOf,
                I = {};
            e.fn = e.prototype = {
                constructor: e,
                init: function (a, d, f) {
                    var g, h, j, k;
                    if (!a) return this;
                    if (a.nodeType) {
                        this.context = this[0] = a, this.length = 1;
                        return this
                    }
                    if (a === "body" && !d && c.body) {
                        this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                        return this
                    }
                    if (typeof a == "string") {
                        a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                        if (g && (g[1] || !d)) {
                            if (g[1]) {
                                d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                                return e.merge(this, a)
                            }
                            h = c.getElementById(g[2]);
                            if (h && h.parentNode) {
                                if (h.id !== g[2]) return f.find(a);
                                this.length = 1, this[0] = h
                            }
                            this.context = c, this.selector = a;
                            return this
                        }
                        return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                    }
                    if (e.isFunction(a)) return f.ready(a);
                    a.selector !== b && (this.selector = a.selector, this.context = a.context);
                    return e.makeArray(a, this)
                },
                selector: "",
                jquery: "1.7.2",
                length: 0,
                size: function () {
                    return this.length
                },
                toArray: function () {
                    return F.call(this, 0)
                },
                get: function (a) {
                    return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                },
                pushStack: function (a, b, c) {
                    var d = this.constructor();
                    e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                    return d
                },
                each: function (a, b) {
                    return e.each(this, a, b)
                },
                ready: function (a) {
                    e.bindReady(), A.add(a);
                    return this
                },
                eq: function (a) {
                    a = +a;
                    return a === -1 ? this.slice(a) : this.slice(a, a + 1)
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                slice: function () {
                    return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
                },
                map: function (a) {
                    return this.pushStack(e.map(this, function (b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: E,
                sort: [].sort,
                splice: [].splice
            }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
                var a, c, d, f, g, h, i = arguments[0] || {},
                    j = 1,
                    k = arguments.length,
                    l = !1;
                typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
                for (; j < k; j++)
                    if ((a = arguments[j]) != null)
                        for (c in a) {
                            d = i[c], f = a[c];
                            if (i === f) continue;
                            l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
                        }
                return i
            }, e.extend({
                noConflict: function (b) {
                    a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
                    return e
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function (a) {
                    a ? e.readyWait++ : e.ready(!0)
                },
                ready: function (a) {
                    if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                        if (!c.body) return setTimeout(e.ready, 1);
                        e.isReady = !0;
                        if (a !== !0 && --e.readyWait > 0) return;
                        A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                    }
                },
                bindReady: function () {
                    if (!A) {
                        A = e.Callbacks("once memory");
                        if (c.readyState === "complete") return setTimeout(e.ready, 1);
                        if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1);
                        else if (c.attachEvent) {
                            c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                            var b = !1;
                            try {
                                b = a.frameElement == null
                            } catch (d) {}
                            c.documentElement.doScroll && b && J()
                        }
                    }
                },
                isFunction: function (a) {
                    return e.type(a) === "function"
                },
                isArray: Array.isArray || function (a) {
                    return e.type(a) === "array"
                },
                isWindow: function (a) {
                    return a != null && a == a.window
                },
                isNumeric: function (a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                },
                type: function (a) {
                    return a == null ? String(a) : I[C.call(a)] || "object"
                },
                isPlainObject: function (a) {
                    if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                    try {
                        if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (c) {
                        return !1
                    }
                    var d;
                    for (d in a);
                    return d === b || D.call(a, d)
                },
                isEmptyObject: function (a) {
                    for (var b in a) return !1;
                    return !0
                },
                error: function (a) {
                    throw new Error(a)
                },
                parseJSON: function (b) {
                    if (typeof b != "string" || !b) return null;
                    b = e.trim(b);
                    if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                    if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                    e.error("Invalid JSON: " + b)
                },
                parseXML: function (c) {
                    if (typeof c != "string" || !c) return null;
                    var d, f;
                    try {
                        a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                    } catch (g) {
                        d = b
                    }(!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                    return d
                },
                noop: function () {},
                globalEval: function (b) {
                    b && j.test(b) && (a.execScript || function (b) {
                        a.eval.call(a, b)
                    })(b)
                },
                camelCase: function (a) {
                    return a.replace(w, "ms-").replace(v, x)
                },
                nodeName: function (a, b) {
                    return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                },
                each: function (a, c, d) {
                    var f, g = 0,
                        h = a.length,
                        i = h === b || e.isFunction(a);
                    if (d) {
                        if (i) {
                            for (f in a)
                                if (c.apply(a[f], d) === !1) break
                        } else
                            for (; g < h;)
                                if (c.apply(a[g++], d) === !1) break
                    } else if (i) {
                        for (f in a)
                            if (c.call(a[f], f, a[f]) === !1) break
                    } else
                        for (; g < h;)
                            if (c.call(a[g], g, a[g++]) === !1) break;
                    return a
                },
                trim: G ? function (a) {
                    return a == null ? "" : G.call(a)
                } : function (a) {
                    return a == null ? "" : (a + "").replace(k, "").replace(l, "")
                },
                makeArray: function (a, b) {
                    var c = b || [];
                    if (a != null) {
                        var d = e.type(a);
                        a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                    }
                    return c
                },
                inArray: function (a, b, c) {
                    var d;
                    if (b) {
                        if (H) return H.call(b, a, c);
                        d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                        for (; c < d; c++)
                            if (c in b && b[c] === a) return c
                    }
                    return -1
                },
                merge: function (a, c) {
                    var d = a.length,
                        e = 0;
                    if (typeof c.length == "number")
                        for (var f = c.length; e < f; e++) a[d++] = c[e];
                    else
                        while (c[e] !== b) a[d++] = c[e++];
                    a.length = d;
                    return a
                },
                grep: function (a, b, c) {
                    var d = [],
                        e;
                    c = !!c;
                    for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
                    return d
                },
                map: function (a, c, d) {
                    var f, g, h = [],
                        i = 0,
                        j = a.length,
                        k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                    if (k)
                        for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f);
                    else
                        for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
                    return h.concat.apply([], h)
                },
                guid: 1,
                proxy: function (a, c) {
                    if (typeof c == "string") {
                        var d = a[c];
                        c = a, a = d
                    }
                    if (!e.isFunction(a)) return b;
                    var f = F.call(arguments, 2),
                        g = function () {
                            return a.apply(c, f.concat(F.call(arguments)))
                        };
                    g.guid = a.guid = a.guid || g.guid || e.guid++;
                    return g
                },
                access: function (a, c, d, f, g, h, i) {
                    var j, k = d == null,
                        l = 0,
                        m = a.length;
                    if (d && typeof d == "object") {
                        for (l in d) e.access(a, c, l, d[l], 1, h, f);
                        g = 1
                    } else if (f !== b) {
                        j = i === b && e.isFunction(f), k && (j ? (j = c, c = function (a, b, c) {
                            return j.call(e(a), c)
                        }) : (c.call(a, f), c = null));
                        if (c)
                            for (; l < m; l++) c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
                        g = 1
                    }
                    return g ? a : k ? c.call(a) : m ? c(a[0], d) : h
                },
                now: function () {
                    return (new Date).getTime()
                },
                uaMatch: function (a) {
                    a = a.toLowerCase();
                    var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                    return {
                        browser: b[1] || "",
                        version: b[2] || "0"
                    }
                },
                sub: function () {
                    function a(b, c) {
                        return new a.fn.init(b, c)
                    }
                    e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                        f && f instanceof e && !(f instanceof a) && (f = a(f));
                        return e.fn.init.call(this, d, f, b)
                    }, a.fn.init.prototype = a.fn;
                    var b = a(c);
                    return a
                },
                browser: {}
            }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
                I["[object " + b + "]"] = b.toLowerCase()
            }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
                c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
            } : c.attachEvent && (B = function () {
                c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
            });
            return e
        }(),
        g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [],
            d = [],
            e, i, j, k, l, m, n = function (b) {
                var d, e, g, h, i;
                for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g)
            },
            o = function (b, f) {
                f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length;
                for (; c && m < l; m++)
                    if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
                        e = !0;
                        break
                    }
                j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])))
            },
            p = {
                add: function () {
                    if (c) {
                        var a = c.length;
                        n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]))
                    }
                    return this
                },
                remove: function () {
                    if (c) {
                        var b = arguments,
                            d = 0,
                            e = b.length;
                        for (; d < e; d++)
                            for (var f = 0; f < c.length; f++)
                                if (b[d] === c[f]) {
                                    j && f <= l && (l--, f <= m && m--), c.splice(f--, 1);
                                    if (a.unique) break
                                }
                    }
                    return this
                },
                has: function (a) {
                    if (c) {
                        var b = 0,
                            d = c.length;
                        for (; b < d; b++)
                            if (a === c[b]) return !0
                    }
                    return !1
                },
                empty: function () {
                    c = [];
                    return this
                },
                disable: function () {
                    c = d = e = b;
                    return this
                },
                disabled: function () {
                    return !c
                },
                lock: function () {
                    d = b, (!e || e === !0) && p.disable();
                    return this
                },
                locked: function () {
                    return !d
                },
                fireWith: function (b, c) {
                    d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
                    return this
                },
                fire: function () {
                    p.fireWith(this, arguments);
                    return this
                },
                fired: function () {
                    return !!i
                }
            };
        return p
    };
    var i = [].slice;
    f.extend({
        Deferred: function (a) {
            var b = f.Callbacks("once memory"),
                c = f.Callbacks("once memory"),
                d = f.Callbacks("memory"),
                e = "pending",
                g = {
                    resolve: b,
                    reject: c,
                    notify: d
                },
                h = {
                    done: b.add,
                    fail: c.add,
                    progress: d.add,
                    state: function () {
                        return e
                    },
                    isResolved: b.fired,
                    isRejected: c.fired,
                    then: function (a, b, c) {
                        i.done(a).fail(b).progress(c);
                        return this
                    },
                    always: function () {
                        i.done.apply(i, arguments).fail.apply(i, arguments);
                        return this
                    },
                    pipe: function (a, b, c) {
                        return f.Deferred(function (d) {
                            f.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function (a, b) {
                                var c = b[0],
                                    e = b[1],
                                    g;
                                f.isFunction(c) ? i[a](function () {
                                    g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                }) : i[a](d[e])
                            })
                        }).promise()
                    },
                    promise: function (a) {
                        if (a == null) a = h;
                        else
                            for (var b in h) a[b] = h[b];
                        return a
                    }
                },
                i = h.promise({}),
                j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            i.done(function () {
                e = "resolved"
            }, c.disable, d.lock).fail(function () {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(i, i);
            return i
        },
        when: function (a) {
            function m(a) {
                return function (b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                }
            }

            function l(a) {
                return function (c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                }
            }
            var b = i.call(arguments, 0),
                c = 0,
                d = b.length,
                e = Array(d),
                g = d,
                h = d,
                j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(),
                k = j.promise();
            if (d > 1) {
                for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b)
            } else j !== a && j.resolveWith(j, d ? [a] : []);
            return k
        }
    }), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"),
            q = c.documentElement;
        p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !!p.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: p.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            pixelMargin: !0
        }, f.boxModel = b.boxModel = c.compatMode === "CSS1Compat", i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete p.test
        } catch (r) {
            b.deleteExpando = !1
        }!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p);
        if (p.attachEvent)
            for (n in {
                    submit: 1,
                    change: 1,
                    focusin: 1
                }) m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"), b[n + "Bubbles"] = o;
        j.removeChild(p), j = g = h = p = i = null, f(function () {
            var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
            !u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {
                marginRight: 0
            }).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {
                doesNotAddBorder: g.offsetTop !== 5,
                doesAddBorderForTableAndCells: i.offsetTop === 5
            }, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {
                marginTop: 0
            }).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/,
        k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (a) {
            a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
            return !!a && !m(a)
        },
        data: function (a, c, d, e) {
            if (!!f.acceptData(a)) {
                var g, h, i, j = f.expando,
                    k = typeof c == "string",
                    l = a.nodeType,
                    m = l ? f.cache : a,
                    n = l ? a[j] : a[j] && j,
                    o = c === "events";
                if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
                n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
                if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
                g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
                if (o && !h[c]) return g.events;
                k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
                return i
            }
        },
        removeData: function (a, b, c) {
            if (!!f.acceptData(a)) {
                var d, e, g, h = f.expando,
                    i = a.nodeType,
                    j = i ? f.cache : a,
                    k = i ? a[h] : h;
                if (!j[k]) return;
                if (b) {
                    d = c ? j[k] : j[k].data;
                    if (d) {
                        f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                        for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                        if (!(c ? m : f.isEmptyObject)(d)) return
                    }
                }
                if (!c) {
                    delete j[k].data;
                    if (!m(j[k])) return
                }
                f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
            }
        },
        _data: function (a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), f.fn.extend({
        data: function (a, c) {
            var d, e, g, h, i, j = this[0],
                k = 0,
                m = null;
            if (a === b) {
                if (this.length) {
                    m = f.data(j);
                    if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
                        g = j.attributes;
                        for (i = g.length; k < i; k++) h = g[k].name, h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]));
                        f._data(j, "parsedAttrs", !0)
                    }
                }
                return m
            }
            if (typeof a == "object") return this.each(function () {
                f.data(this, a)
            });
            d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!";
            return f.access(this, function (c) {
                if (c === b) {
                    m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m));
                    return m === b && d[1] ? this.data(d[0]) : m
                }
                d[1] = c, this.each(function () {
                    var b = f(this);
                    b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d)
                })
            }, null, c, arguments.length > 1, null, !1)
        },
        removeData: function (a) {
            return this.each(function () {
                f.removeData(this, a)
            })
        }
    }), f.extend({
        _mark: function (a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
        },
        _unmark: function (a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark",
                    e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
            }
        },
        queue: function (a, b, c) {
            var d;
            if (a) {
                b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                return d || []
            }
        },
        dequeue: function (a, b) {
            b = b || "fx";
            var c = f.queue(a, b),
                d = c.shift(),
                e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
                f.dequeue(a, b)
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
        }
    }), f.fn.extend({
        queue: function (a, c) {
            var d = 2;
            typeof a != "string" && (c = a, a = "fx", d--);
            if (arguments.length < d) return f.queue(this[0], a);
            return c === b ? this : this.each(function () {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
            })
        },
        dequeue: function (a) {
            return this.each(function () {
                f.dequeue(this, a)
            })
        },
        delay: function (a, b) {
            a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function (a) {
            return this.queue(a || "fx", [])
        },
        promise: function (a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }
            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(),
                e = this,
                g = e.length,
                h = 1,
                i = a + "defer",
                j = a + "queue",
                k = a + "mark",
                l;
            while (g--)
                if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
            m();
            return d.promise(c)
        }
    });
    var o = /[\n\t\r]/g,
        p = /\s+/,
        q = /\r/g,
        r = /^(?:button|input)$/i,
        s = /^(?:button|input|object|select|textarea)$/i,
        t = /^a(?:rea)?$/i,
        u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        v = f.support.getSetAttribute,
        w, x, y;
    f.fn.extend({
        attr: function (a, b) {
            return f.access(this, f.attr, a, b, arguments.length > 1)
        },
        removeAttr: function (a) {
            return this.each(function () {
                f.removeAttr(this, a)
            })
        },
        prop: function (a, b) {
            return f.access(this, f.prop, a, b, arguments.length > 1)
        },
        removeProp: function (a) {
            a = f.propFix[a] || a;
            return this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {}
            })
        },
        addClass: function (a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).addClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1)
                        if (!e.className && b.length === 1) e.className = a;
                        else {
                            g = " " + e.className + " ";
                            for (h = 0, i = b.length; h < i; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                            e.className = f.trim(g)
                        }
                }
            }
            return this
        },
        removeClass: function (a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).removeClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className)
                        if (a) {
                            h = (" " + g.className + " ").replace(o, " ");
                            for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
                            g.className = f.trim(h)
                        } else g.className = ""
                }
            }
            return this
        },
        toggleClass: function (a, b) {
            var c = typeof a,
                d = typeof b == "boolean";
            if (f.isFunction(a)) return this.each(function (c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b)
            });
            return this.each(function () {
                if (c === "string") {
                    var e, g = 0,
                        h = f(this),
                        i = b,
                        j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
            })
        },
        hasClass: function (a) {
            var b = " " + a + " ",
                c = 0,
                d = this.length;
            for (; c < d; c++)
                if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1
        },
        val: function (a) {
            var c, d, e, g = this[0]; {
                if (!!arguments.length) {
                    e = f.isFunction(a);
                    return this.each(function (d) {
                        var g = f(this),
                            h;
                        if (this.nodeType === 1) {
                            e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                                return a == null ? "" : a + ""
                            })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
                            if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
                        }
                    })
                }
                if (g) {
                    c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
                    if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
                    d = g.value;
                    return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
                }
            }
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function (a) {
                    var b, c, d, e, g = a.selectedIndex,
                        h = [],
                        i = a.options,
                        j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b)
                        }
                    }
                    if (j && !h.length && i.length) return f(i[g]).val();
                    return h
                },
                set: function (a, b) {
                    var c = f.makeArray(b);
                    f(a).find("option").each(function () {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1);
                    return c
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function (a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!!a && j !== 3 && j !== 8 && j !== 2) {
                if (e && c in f.attrFn) return f(a)[c](d);
                if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
                i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
                if (d !== b) {
                    if (d === null) {
                        f.removeAttr(a, c);
                        return
                    }
                    if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
                    a.setAttribute(c, "" + d);
                    return d
                }
                if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
                g = a.getAttribute(c);
                return g === null ? b : g
            }
        },
        removeAttr: function (a, b) {
            var c, d, e, g, h, i = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; i < g; i++) e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
                    else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        a.setAttribute("type", b), c && (a.value = c);
                        return b
                    }
                }
            },
            value: {
                get: function (a, b) {
                    if (w && f.nodeName(a, "button")) return w.get(a, b);
                    return b in a ? a.value : null
                },
                set: function (a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!!a && i !== 3 && i !== 8 && i !== 2) {
                h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
                return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
            }
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function (a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        },
        set: function (a, b, c) {
            var d;
            b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
            return c
        }
    }, v || (y = {
        name: !0,
        id: !0,
        coords: !0
    }, w = f.valHooks.button = {
        get: function (a, c) {
            var d;
            d = a.getAttributeNode(c);
            return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        },
        set: function (a, b, d) {
            var e = a.getAttributeNode(d);
            e || (e = c.createAttribute(d), a.setAttributeNode(e));
            return e.nodeValue = b + ""
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function (a, c) {
                if (c === "") {
                    a.setAttribute(b, "auto");
                    return c
                }
            }
        })
    }), f.attrHooks.contenteditable = {
        get: w.get,
        set: function (a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c)
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }), f.support.style || (f.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b
        },
        set: function (a, b) {
            return a.style.cssText = "" + b
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
            return null
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {
            get: function (a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function (a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i,
        A = /^([^\.]*)?(?:\.(.+))?$/,
        B = /(?:^|\s)hover(\.\S+)?\b/,
        C = /^key/,
        D = /^(?:mouse|contextmenu)|click/,
        E = /^(?:focusinfocus|focusoutblur)$/,
        F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        G = function (
            a) {
            var b = F.exec(a);
            b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
            return b
        },
        H = function (a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
        },
        I = function (a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
    f.event = {
            add: function (a, c, d, e, g) {
                var h, i, j, k, l, m, n, o, p, q, r, s;
                if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                    d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                        return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                    }, i.elem = a), c = f.trim(I(c)).split(" ");
                    for (k = 0; k < c.length; k++) {
                        l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                            type: m,
                            origType: l[1],
                            data: e,
                            handler: d,
                            guid: d.guid,
                            selector: g,
                            quick: g && G(g),
                            namespace: n.join(".")
                        }, p), r = j[m];
                        if (!r) {
                            r = j[m] = [], r.delegateCount = 0;
                            if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                        }
                        s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
                    }
                    a = null
                }
            },
            global: {},
            remove: function (a, b, c, d, e) {
                var g = f.hasData(a) && f._data(a),
                    h, i, j, k, l, m, n, o, p, q, r, s;
                if (!!g && !!(o = g.events)) {
                    b = f.trim(I(b || "")).split(" ");
                    for (h = 0; h < b.length; h++) {
                        i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                        if (!j) {
                            for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                            continue
                        }
                        p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                        for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                        r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
                    }
                    f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
                }
            },
            customEvent: {
                getData: !0,
                setData: !0,
                changeData: !0
            },
            trigger: function (c, d, e, g) {
                if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                    var h = c.type || c,
                        i = [],
                        j, k, l, m, n, o, p, q, r, s;
                    if (E.test(h + f.event.triggered)) return;
                    h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                    if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                    c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                    if (!e) {
                        j = f.cache;
                        for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                        return
                    }
                    c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                    if (p.trigger && p.trigger.apply(e, d) === !1) return;
                    r = [
                        [e, p.bindType || h]
                    ];
                    if (!g && !p.noBubble && !f.isWindow(e)) {
                        s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                        for (; m; m = m.parentNode) r.push([m, s]), n = m;
                        n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                    }
                    for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                    c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
                    return c.result
                }
            },
            dispatch: function (c) {
                c = f.event.fix(c || a.event);
                var d = (f._data(this, "events") || {})[c.type] || [],
                    e = d.delegateCount,
                    g = [].slice.call(arguments, 0),
                    h = !c.exclusive && !c.namespace,
                    i = f.event.special[c.type] || {},
                    j = [],
                    k, l, m, n, o, p, q, r, s, t, u;
                g[0] = c, c.delegateTarget = this;
                if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
                    if (e && (!c.button || c.type !== "click")) {
                        n = f(this), n.context = this.ownerDocument || this;
                        for (m = c.target; m != this; m = m.parentNode || this)
                            if (m.disabled !== !0) {
                                p = {}, r = [], n[0] = m;
                                for (k = 0; k < e; k++) s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s);
                                r.length && j.push({
                                    elem: m,
                                    matches: r
                                })
                            }
                    }
                    d.length > e && j.push({
                        elem: this,
                        matches: d.slice(e)
                    });
                    for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
                        q = j[k], c.currentTarget = q.elem;
                        for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
                            s = q.matches[l];
                            if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace)) c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()))
                        }
                    }
                    i.postDispatch && i.postDispatch.call(this, c);
                    return c.result
                }
            },
            props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (a, b) {
                    a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                    return a
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (a, d) {
                    var e, f, g, h = d.button,
                        i = d.fromElement;
                    a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                    return a
                }
            },
            fix: function (a) {
                if (a[f.expando]) return a;
                var d, e, g = a,
                    h = f.event.fixHooks[a.type] || {},
                    i = h.props ? this.props.concat(h.props) : this.props;
                a = f.Event(g);
                for (d = i.length; d;) e = i[--d], a[e] = g[e];
                a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
                return h.filter ? h.filter(a, g) : a
            },
            special: {
                ready: {
                    setup: f.bindReady
                },
                load: {
                    noBubble: !0
                },
                focus: {
                    delegateType: "focusin"
                },
                blur: {
                    delegateType: "focusout"
                },
                beforeunload: {
                    setup: function (a, b, c) {
                        f.isWindow(this) && (this.onbeforeunload = c)
                    },
                    teardown: function (a, b) {
                        this.onbeforeunload === b && (this.onbeforeunload = null)
                    }
                }
            },
            simulate: function (a, b, c, d) {
                var e = f.extend(new f.Event, c, {
                    type: a,
                    isSimulated: !0,
                    originalEvent: {}
                });
                d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
            }
        }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1)
        } : function (a, b, c) {
            a.detachEvent && a.detachEvent("on" + b, c)
        }, f.Event = function (a, b) {
            if (!(this instanceof f.Event)) return new f.Event(a, b);
            a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
        }, f.Event.prototype = {
            preventDefault: function () {
                this.isDefaultPrevented = K;
                var a = this.originalEvent;
                !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
            },
            stopPropagation: function () {
                this.isPropagationStopped = K;
                var a = this.originalEvent;
                !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
            },
            stopImmediatePropagation: function () {
                this.isImmediatePropagationStopped = K, this.stopPropagation()
            },
            isDefaultPrevented: J,
            isPropagationStopped: J,
            isImmediatePropagationStopped: J
        }, f.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function (a, b) {
            f.event.special[a] = {
                delegateType: b,
                bindType: b,
                handle: function (a) {
                    var c = this,
                        d = a.relatedTarget,
                        e = a.handleObj,
                        g = e.selector,
                        h;
                    if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                    return h
                }
            }
        }), f.support.submitBubbles || (f.event.special.submit = {
            setup: function () {
                if (f.nodeName(this, "form")) return !1;
                f.event.add(this, "click._submit keypress._submit", function (a) {
                    var c = a.target,
                        d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                    d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                        a._submit_bubble = !0
                    }), d._submit_attached = !0)
                })
            },
            postDispatch: function (a) {
                a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
            },
            teardown: function () {
                if (f.nodeName(this, "form")) return !1;
                f.event.remove(this, "._submit")
            }
        }), f.support.changeBubbles || (f.event.special.change = {
            setup: function () {
                if (z.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function (a) {
                        a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                    }), f.event.add(this, "click._change", function (a) {
                        this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                    });
                    return !1
                }
                f.event.add(this, "beforeactivate._change", function (a) {
                    var b = a.target;
                    z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                        this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                    }), b._change_attached = !0)
                })
            },
            handle: function (a) {
                var b = a.target;
                if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
            },
            teardown: function () {
                f.event.remove(this, "._change");
                return z.test(this.nodeName)
            }
        }), f.support.focusinBubbles || f.each({
            focus: "focusin",
            blur: "focusout"
        }, function (a, b) {
            var d = 0,
                e = function (a) {
                    f.event.simulate(b, a.target, f.event.fix(a), !0)
                };
            f.event.special[b] = {
                setup: function () {
                    d++ === 0 && c.addEventListener(a, e, !0)
                },
                teardown: function () {
                    --d === 0 && c.removeEventListener(a, e, !0)
                }
            }
        }), f.fn.extend({
            on: function (a, c, d, e, g) {
                var h, i;
                if (typeof a == "object") {
                    typeof c != "string" && (d = d || c, c = b);
                    for (i in a) this.on(i, c, d, a[i], g);
                    return this
                }
                d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
                if (e === !1) e = J;
                else if (!e) return this;
                g === 1 && (h = e, e = function (a) {
                    f().off(a);
                    return h.apply(this, arguments)
                }, e.guid = h.guid || (h.guid = f.guid++));
                return this.each(function () {
                    f.event.add(this, a, e, d, c)
                })
            },
            one: function (a, b, c, d) {
                return this.on(a, b, c, d, 1)
            },
            off: function (a, c, d) {
                if (a && a.preventDefault && a.handleObj) {
                    var e = a.handleObj;
                    f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
                    return this
                }
                if (typeof a == "object") {
                    for (var g in a) this.off(g, c, a[g]);
                    return this
                }
                if (c === !1 || typeof c == "function") d = c, c = b;
                d === !1 && (d = J);
                return this.each(function () {
                    f.event.remove(this, a, d, c)
                })
            },
            bind: function (a, b, c) {
                return this.on(a, null, b, c)
            },
            unbind: function (a, b) {
                return this.off(a, null, b)
            },
            live: function (a, b, c) {
                f(this.context).on(a, this.selector, b, c);
                return this
            },
            die: function (a, b) {
                f(this.context).off(a, this.selector || "**", b);
                return this
            },
            delegate: function (a, b, c, d) {
                return this.on(b, a, c, d)
            },
            undelegate: function (a, b, c) {
                return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
            },
            trigger: function (a, b) {
                return this.each(function () {
                    f.event.trigger(a, b, this)
                })
            },
            triggerHandler: function (a, b) {
                if (this[0]) return f.event.trigger(a, b, this[0], !0)
            },
            toggle: function (a) {
                var b = arguments,
                    c = a.guid || f.guid++,
                    d = 0,
                    e = function (c) {
                        var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                        f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
                        return b[e].apply(this, arguments) || !1
                    };
                e.guid = c;
                while (d < b.length) b[d++].guid = c;
                return this.click(e)
            },
            hover: function (a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            }
        }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
            f.fn[b] = function (a, c) {
                c == null && (c = a, a = null);
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
        }),
        function () {
            function x(a, b, c, e, f, g) {
                for (var h = 0, i = e.length; h < i; h++) {
                    var j = e[h];
                    if (j) {
                        var k = !1;
                        j = j[a];
                        while (j) {
                            if (j[d] === c) {
                                k = e[j.sizset];
                                break
                            }
                            if (j.nodeType === 1) {
                                g || (j[d] = c, j.sizset = h);
                                if (typeof b != "string") {
                                    if (j === b) {
                                        k = !0;
                                        break
                                    }
                                } else if (m.filter(b, [j]).length > 0) {
                                    k = j;
                                    break
                                }
                            }
                            j = j[a]
                        }
                        e[h] = k
                    }
                }
            }

            function w(a, b, c, e, f, g) {
                for (var h = 0, i = e.length; h < i; h++) {
                    var j = e[h];
                    if (j) {
                        var k = !1;
                        j = j[a];
                        while (j) {
                            if (j[d] === c) {
                                k = e[j.sizset];
                                break
                            }
                            j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                            if (j.nodeName.toLowerCase() === b) {
                                k = j;
                                break
                            }
                            j = j[a]
                        }
                        e[h] = k
                    }
                }
            }
            var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                d = "sizcache" + (Math.random() + "").replace(".", ""),
                e = 0,
                g = Object.prototype.toString,
                h = !1,
                i = !0,
                j = /\\/g,
                k = /\r\n/g,
                l = /\W/;
            [0, 0].sort(function () {
                i = !1;
                return 0
            });
            var m = function (b, d, e, f) {
                e = e || [], d = d || c;
                var h = d;
                if (d.nodeType !== 1 && d.nodeType !== 9) return [];
                if (!b || typeof b != "string") return e;
                var i, j, k, l, n, q, r, t, u = !0,
                    v = m.isXML(d),
                    w = [],
                    x = b;
                do {
                    a.exec(""), i = a.exec(x);
                    if (i) {
                        x = i[3], w.push(i[1]);
                        if (i[2]) {
                            l = i[3];
                            break
                        }
                    }
                } while (i);
                if (w.length > 1 && p.exec(b))
                    if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f);
                    else {
                        j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                        while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
                    }
                else {
                    !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                    if (d) {
                        n = f ? {
                            expr: w.pop(),
                            set: s(f)
                        } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                        while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                    } else k = w = []
                }
                k || (k = j), k || m.error(q || b);
                if (g.call(k) === "[object Array]")
                    if (!u) e.push.apply(e, k);
                    else if (d && d.nodeType === 1)
                    for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
                else
                    for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]);
                else s(k, e);
                l && (m(l, h, e, f), m.uniqueSort(e));
                return e
            };
            m.uniqueSort = function (a) {
                if (u) {
                    h = i, a.sort(u);
                    if (h)
                        for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
                }
                return a
            }, m.matches = function (a, b) {
                return m(a, null, null, b)
            }, m.matchesSelector = function (a, b) {
                return m(b, null, null, [a]).length > 0
            }, m.find = function (a, b, c) {
                var d, e, f, g, h, i;
                if (!a) return [];
                for (e = 0, f = o.order.length; e < f; e++) {
                    h = o.order[e];
                    if (g = o.leftMatch[h].exec(a)) {
                        i = g[1], g.splice(1, 1);
                        if (i.substr(i.length - 1) !== "\\") {
                            g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                            if (d != null) {
                                a = a.replace(o.match[h], "");
                                break
                            }
                        }
                    }
                }
                d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
                return {
                    set: d,
                    expr: a
                }
            }, m.filter = function (a, c, d, e) {
                var f, g, h, i, j, k, l, n, p, q = a,
                    r = [],
                    s = c,
                    t = c && c[0] && m.isXML(c[0]);
                while (a && c.length) {
                    for (h in o.filter)
                        if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                            k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                            if (l.substr(l.length - 1) === "\\") continue;
                            s === r && (r = []);
                            if (o.preFilter[h]) {
                                f = o.preFilter[h](f, s, d, r, e, t);
                                if (!f) g = i = !0;
                                else if (f === !0) continue
                            }
                            if (f)
                                for (n = 0;
                                    (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                            if (i !== b) {
                                d || (s = r), a = a.replace(o.match[h], "");
                                if (!g) return [];
                                break
                            }
                        }
                    if (a === q)
                        if (g == null) m.error(a);
                        else break;
                    q = a
                }
                return s
            }, m.error = function (a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            };
            var n = m.getText = function (a) {
                    var b, c, d = a.nodeType,
                        e = "";
                    if (d) {
                        if (d === 1 || d === 9 || d === 11) {
                            if (typeof a.textContent == "string") return a.textContent;
                            if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                            for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
                        } else if (d === 3 || d === 4) return a.nodeValue
                    } else
                        for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
                    return e
                },
                o = m.selectors = {
                    order: ["ID", "NAME", "TAG"],
                    match: {
                        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                    },
                    leftMatch: {},
                    attrMap: {
                        "class": "className",
                        "for": "htmlFor"
                    },
                    attrHandle: {
                        href: function (a) {
                            return a.getAttribute("href")
                        },
                        type: function (a) {
                            return a.getAttribute("type")
                        }
                    },
                    relative: {
                        "+": function (a, b) {
                            var c = typeof b == "string",
                                d = c && !l.test(b),
                                e = c && !d;
                            d && (b = b.toLowerCase());
                            for (var f = 0, g = a.length, h; f < g; f++)
                                if (h = a[f]) {
                                    while ((h = h.previousSibling) && h.nodeType !== 1);
                                    a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                                }
                            e && m.filter(b, a, !0)
                        },
                        ">": function (a, b) {
                            var c, d = typeof b == "string",
                                e = 0,
                                f = a.length;
                            if (d && !l.test(b)) {
                                b = b.toLowerCase();
                                for (; e < f; e++) {
                                    c = a[e];
                                    if (c) {
                                        var g = c.parentNode;
                                        a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                    }
                                }
                            } else {
                                for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                                d && m.filter(b, a, !0)
                            }
                        },
                        "": function (a, b, c) {
                            var d, f = e++,
                                g = x;
                            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                        },
                        "~": function (a, b, c) {
                            var d, f = e++,
                                g = x;
                            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                        }
                    },
                    find: {
                        ID: function (a, b, c) {
                            if (typeof b.getElementById != "undefined" && !c) {
                                var d = b.getElementById(a[1]);
                                return d && d.parentNode ? [d] : []
                            }
                        },
                        NAME: function (a, b) {
                            if (typeof b.getElementsByName != "undefined") {
                                var c = [],
                                    d = b.getElementsByName(a[1]);
                                for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                                return c.length === 0 ? null : c
                            }
                        },
                        TAG: function (a, b) {
                            if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
                        }
                    },
                    preFilter: {
                        CLASS: function (a, b, c, d, e, f) {
                            a = " " + a[1].replace(j, "") + " ";
                            if (f) return a;
                            for (var g = 0, h;
                                (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                            return !1
                        },
                        ID: function (a) {
                            return a[1].replace(j, "")
                        },
                        TAG: function (a, b) {
                            return a[1].replace(j, "").toLowerCase()
                        },
                        CHILD: function (a) {
                            if (a[1] === "nth") {
                                a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                                var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                                a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                            } else a[2] && m.error(a[0]);
                            a[0] = e++;
                            return a
                        },
                        ATTR: function (a, b, c, d, e, f) {
                            var g = a[1] = a[1].replace(j, "");
                            !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
                            return a
                        },
                        PSEUDO: function (b, c, d, e, f) {
                            if (b[1] === "not")
                                if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c);
                                else {
                                    var g = m.filter(b[3], c, d, !0 ^ f);
                                    d || e.push.apply(e, g);
                                    return !1
                                }
                            else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                            return b
                        },
                        POS: function (a) {
                            a.unshift(!0);
                            return a
                        }
                    },
                    filters: {
                        enabled: function (a) {
                            return a.disabled === !1 && a.type !== "hidden"
                        },
                        disabled: function (a) {
                            return a.disabled === !0
                        },
                        checked: function (a) {
                            return a.checked === !0
                        },
                        selected: function (a) {
                            a.parentNode && a.parentNode.selectedIndex;
                            return a.selected === !0
                        },
                        parent: function (a) {
                            return !!a.firstChild
                        },
                        empty: function (a) {
                            return !a.firstChild
                        },
                        has: function (a, b, c) {
                            return !!m(c[3], a).length
                        },
                        header: function (a) {
                            return /h\d/i.test(a.nodeName)
                        },
                        text: function (a) {
                            var b = a.getAttribute("type"),
                                c = a.type;
                            return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                        },
                        radio: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                        },
                        checkbox: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                        },
                        file: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "file" === a.type
                        },
                        password: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "password" === a.type
                        },
                        submit: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return (b === "input" || b === "button") && "submit" === a.type
                        },
                        image: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "image" === a.type
                        },
                        reset: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return (b === "input" || b === "button") && "reset" === a.type
                        },
                        button: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return b === "input" && "button" === a.type || b === "button"
                        },
                        input: function (a) {
                            return /input|select|textarea|button/i.test(a.nodeName)
                        },
                        focus: function (a) {
                            return a === a.ownerDocument.activeElement
                        }
                    },
                    setFilters: {
                        first: function (a, b) {
                            return b === 0
                        },
                        last: function (a, b, c, d) {
                            return b === d.length - 1
                        },
                        even: function (a, b) {
                            return b % 2 === 0
                        },
                        odd: function (a, b) {
                            return b % 2 === 1
                        },
                        lt: function (a, b, c) {
                            return b < c[3] - 0
                        },
                        gt: function (a, b, c) {
                            return b > c[3] - 0
                        },
                        nth: function (a, b, c) {
                            return c[3] - 0 === b
                        },
                        eq: function (a, b, c) {
                            return c[3] - 0 === b
                        }
                    },
                    filter: {
                        PSEUDO: function (a, b, c, d) {
                            var e = b[1],
                                f = o.filters[e];
                            if (f) return f(a, c, b, d);
                            if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                            if (e === "not") {
                                var g = b[3];
                                for (var h = 0, i = g.length; h < i; h++)
                                    if (g[h] === a) return !1;
                                return !0
                            }
                            m.error(e)
                        },
                        CHILD: function (a, b) {
                            var c, e, f, g, h, i, j, k = b[1],
                                l = a;
                            switch (k) {
                                case "only":
                                case "first":
                                    while (l = l.previousSibling)
                                        if (l.nodeType === 1) return !1;
                                    if (k === "first") return !0;
                                    l = a;
                                case "last":
                                    while (l = l.nextSibling)
                                        if (l.nodeType === 1) return !1;
                                    return !0;
                                case "nth":
                                    c = b[2], e = b[3];
                                    if (c === 1 && e === 0) return !0;
                                    f = b[0], g = a.parentNode;
                                    if (g && (g[d] !== f || !a.nodeIndex)) {
                                        i = 0;
                                        for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                                        g[d] = f
                                    }
                                    j = a.nodeIndex - e;
                                    return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                            }
                        },
                        ID: function (a, b) {
                            return a.nodeType === 1 && a.getAttribute("id") === b
                        },
                        TAG: function (a, b) {
                            return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
                        },
                        CLASS: function (a, b) {
                            return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                        },
                        ATTR: function (a, b) {
                            var c = b[1],
                                d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                                e = d + "",
                                f = b[2],
                                g = b[4];
                            return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                        },
                        POS: function (a, b, c, d) {
                            var e = b[2],
                                f = o.setFilters[e];
                            if (f) return f(a, c, b, d)
                        }
                    }
                },
                p = o.match.POS,
                q = function (a, b) {
                    return "\\" + (b - 0 + 1)
                };
            for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
            o.match.globalPOS = p;
            var s = function (a, b) {
                a = Array.prototype.slice.call(a, 0);
                if (b) {
                    b.push.apply(b, a);
                    return b
                }
                return a
            };
            try {
                Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
            } catch (t) {
                s = function (a, b) {
                    var c = 0,
                        d = b || [];
                    if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
                    else if (typeof a.length == "number")
                        for (var e = a.length; c < e; c++) d.push(a[c]);
                    else
                        for (; a[c]; c++) d.push(a[c]);
                    return d
                }
            }
            var u, v;
            c.documentElement.compareDocumentPosition ? u = function (a, b) {
                    if (a === b) {
                        h = !0;
                        return 0
                    }
                    if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
                    return a.compareDocumentPosition(b) & 4 ? -1 : 1
                } : (u = function (a, b) {
                    if (a === b) {
                        h = !0;
                        return 0
                    }
                    if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
                    var c, d, e = [],
                        f = [],
                        g = a.parentNode,
                        i = b.parentNode,
                        j = g;
                    if (g === i) return v(a, b);
                    if (!g) return -1;
                    if (!i) return 1;
                    while (j) e.unshift(j), j = j.parentNode;
                    j = i;
                    while (j) f.unshift(j), j = j.parentNode;
                    c = e.length, d = f.length;
                    for (var k = 0; k < c && k < d; k++)
                        if (e[k] !== f[k]) return v(e[k], f[k]);
                    return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
                }, v = function (a, b, c) {
                    if (a === b) return c;
                    var d = a.nextSibling;
                    while (d) {
                        if (d === b) return -1;
                        d = d.nextSibling
                    }
                    return 1
                }),
                function () {
                    var a = c.createElement("div"),
                        d = "script" + (new Date).getTime(),
                        e = c.documentElement;
                    a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                        if (typeof c.getElementById != "undefined" && !d) {
                            var e = c.getElementById(a[1]);
                            return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                        }
                    }, o.filter.ID = function (a, b) {
                        var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                        return a.nodeType === 1 && c && c.nodeValue === b
                    }), e.removeChild(a), e = a = null
                }(),
                function () {
                    var a = c.createElement("div");
                    a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                        var c = b.getElementsByTagName(a[1]);
                        if (a[1] === "*") {
                            var d = [];
                            for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                            c = d
                        }
                        return c
                    }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                        return a.getAttribute("href", 2)
                    }), a = null
                }(), c.querySelectorAll && function () {
                    var a = m,
                        b = c.createElement("div"),
                        d = "__sizzle__";
                    b.innerHTML = "<p class='TEST'></p>";
                    if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                        m = function (b, e, f, g) {
                            e = e || c;
                            if (!g && !m.isXML(e)) {
                                var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                                if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                                    if (h[1]) return s(e.getElementsByTagName(b), f);
                                    if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
                                }
                                if (e.nodeType === 9) {
                                    if (b === "body" && e.body) return s([e.body], f);
                                    if (h && h[3]) {
                                        var i = e.getElementById(h[3]);
                                        if (!i || !i.parentNode) return s([], f);
                                        if (i.id === h[3]) return s([i], f)
                                    }
                                    try {
                                        return s(e.querySelectorAll(b), f)
                                    } catch (j) {}
                                } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                                    var k = e,
                                        l = e.getAttribute("id"),
                                        n = l || d,
                                        p = e.parentNode,
                                        q = /^\s*[+~]/.test(b);
                                    l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                                    try {
                                        if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                                    } catch (r) {} finally {
                                        l || k.removeAttribute("id")
                                    }
                                }
                            }
                            return a(b, e, f, g)
                        };
                        for (var e in a) m[e] = a[e];
                        b = null
                    }
                }(),
                function () {
                    var a = c.documentElement,
                        b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
                    if (b) {
                        var d = !b.call(c.createElement("div"), "div"),
                            e = !1;
                        try {
                            b.call(c.documentElement, "[test!='']:sizzle")
                        } catch (f) {
                            e = !0
                        }
                        m.matchesSelector = function (a, c) {
                            c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                            if (!m.isXML(a)) try {
                                if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                                    var f = b.call(a, c);
                                    if (f || !d || a.document && a.document.nodeType !== 11) return f
                                }
                            } catch (g) {}
                            return m(c, null, null, [a]).length > 0
                        }
                    }
                }(),
                function () {
                    var a = c.createElement("div");
                    a.innerHTML = "<div class='test e'></div><div class='test'></div>";
                    if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                        a.lastChild.className = "e";
                        if (a.getElementsByClassName("e").length === 1) return;
                        o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                            if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
                        }, a = null
                    }
                }(), c.documentElement.contains ? m.contains = function (a, b) {
                    return a !== b && (a.contains ? a.contains(b) : !0)
                } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
                    return !!(a.compareDocumentPosition(b) & 16)
                } : m.contains = function () {
                    return !1
                }, m.isXML = function (a) {
                    var b = (a ? a.ownerDocument || a : 0).documentElement;
                    return b ? b.nodeName !== "HTML" : !1
                };
            var y = function (a, b, c) {
                var d, e = [],
                    f = "",
                    g = b.nodeType ? [b] : b;
                while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
                a = o.relative[a] ? a + "*" : a;
                for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
                return m.filter(f, e)
            };
            m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
        }();
    var L = /Until$/,
        M = /^(?:parents|prevUntil|prevAll)/,
        N = /,/,
        O = /^.[^:#\[\.,]*$/,
        P = Array.prototype.slice,
        Q = f.expr.match.globalPOS,
        R = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    f.fn.extend({
        find: function (a) {
            var b = this,
                c, d;
            if (typeof a != "string") return f(a).filter(function () {
                for (c = 0, d = b.length; c < d; c++)
                    if (f.contains(b[c], this)) return !0
            });
            var e = this.pushStack("", "find", a),
                g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0)
                    for (h = g; h < e.length; h++)
                        for (i = 0; i < g; i++)
                            if (e[i] === e[h]) {
                                e.splice(h--, 1);
                                break
                            }
            }
            return e
        },
        has: function (a) {
            var b = f(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; a < c; a++)
                    if (f.contains(this, b[a])) return !0
            })
        },
        not: function (a) {
            return this.pushStack(T(this, a, !1), "not", a)
        },
        filter: function (a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        },
        is: function (a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function (a, b) {
            var c = [],
                d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
                        selector: a[d],
                        elem: g,
                        level: h
                    });
                    g = g.parentNode, h++
                }
                return c
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
                }
            }
            c = c.length > 1 ? f.unique(c) : c;
            return this.pushStack(c, "closest", a)
        },
        index: function (a) {
            if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
            if (typeof a == "string") return f.inArray(this[0], f(a));
            return f.inArray(a.jquery ? a[0] : a, this)
        },
        add: function (a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
                d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        },
        andSelf: function () {
            return this.add(this.prevObject)
        }
    }), f.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        },
        parents: function (a) {
            return f.dir(a, "parentNode")
        },
        parentsUntil: function (a, b, c) {
            return f.dir(a, "parentNode", c)
        },
        next: function (a) {
            return f.nth(a, 2, "nextSibling")
        },
        prev: function (a) {
            return f.nth(a, 2, "previousSibling")
        },
        nextAll: function (a) {
            return f.dir(a, "nextSibling")
        },
        prevAll: function (a) {
            return f.dir(a, "previousSibling")
        },
        nextUntil: function (a, b, c) {
            return f.dir(a, "nextSibling", c)
        },
        prevUntil: function (a, b, c) {
            return f.dir(a, "previousSibling", c)
        },
        siblings: function (a) {
            return f.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function (a) {
            return f.sibling(a.firstChild)
        },
        contents: function (a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({
        filter: function (a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        },
        dir: function (a, c, d) {
            var e = [],
                g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
            return e
        },
        nth: function (a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c])
                if (a.nodeType === 1 && ++e === b) break;
            return a
        },
        sibling: function (a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        W = / jQuery\d+="(?:\d+|null)"/g,
        X = /^\s+/,
        Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        Z = /<([\w:]+)/,
        $ = /<tbody/i,
        _ = /<|&#?\w+;/,
        ba = /<(?:script|style)/i,
        bb = /<(?:script|object|embed|option|style)/i,
        bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"),
        bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
        be = /\/(java|ecma)script/i,
        bf = /^\s*<!(?:\[CDATA\[|\-\-)/,
        bg = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function (a) {
            return f.access(this, function (a) {
                return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
            }, null, a, arguments.length)
        },
        wrapAll: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapInner(a.call(this, b))
            });
            return this.each(function () {
                var b = f(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function (a) {
            var b = f.isFunction(a);
            return this.each(function (c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = f
                    .clean(arguments);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, f.clean(arguments));
                return a
            }
        },
        remove: function (a, b) {
            for (var c = 0, d;
                (d = this[c]) != null; c++)
                if (!a || f.filter(a, [d]).length) !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function () {
            for (var a = 0, b;
                (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild)
            }
            return this
        },
        clone: function (a, b) {
            a = a == null ? !1 : a, b = b == null ? a : b;
            return this.map(function () {
                return f.clone(this, a, b)
            })
        },
        html: function (a) {
            return f.access(this, function (a) {
                var c = this[0] || {},
                    d = 0,
                    e = this.length;
                if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;
                if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(Y, "<$1></$2>");
                    try {
                        for (; d < e; d++) c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                        c = 0
                    } catch (g) {}
                }
                c && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function (a) {
            if (this[0] && this[0].parentNode) {
                if (f.isFunction(a)) return this.each(function (b) {
                    var c = f(this),
                        d = c.html();
                    c.replaceWith(a.call(this, b, d))
                });
                typeof a != "string" && (a = f(a).detach());
                return this.each(function () {
                    var b = this.nextSibling,
                        c = this.parentNode;
                    f(this).remove(), b ? f(b).before(a) : f(c).append(a)
                })
            }
            return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function (a) {
            return this.remove(a, !0)
        },
        domManip: function (a, c, d) {
            var e, g, h, i, j = a[0],
                k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function () {
                f(this).domManip(a, c, d, !0)
            });
            if (f.isFunction(j)) return this.each(function (e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                    fragment: i
                } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                }
                k.length && f.each(k, function (a, b) {
                    b.src ? f.ajax({
                        type: "GET",
                        global: !1,
                        url: b.src,
                        async: !1,
                        dataType: "script"
                    }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }
    }), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return {
            fragment: e,
            cacheable: g
        }
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        f.fn[a] = function (c) {
            var d = [],
                e = f(c),
                g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({
        clone: function (a, b, c) {
            var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h), d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g])
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a), e = bl(h);
                    for (g = 0; d[g]; ++g) bj(d[g], e[g])
                }
            }
            d = e = null;
            return h
        },
        clean: function (a, b, d, e) {
            var g, h, i, j = [];
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            for (var k = 0, l;
                (l = a[k]) != null; k++) {
                typeof l == "number" && (l += "");
                if (!l) continue;
                if (typeof l == "string")
                    if (!_.test(l)) l = b.createTextNode(l);
                    else {
                        l = l.replace(Y, "<$1></$2>");
                        var m = (Z.exec(l) || ["", ""])[1].toLowerCase(),
                            n = bg[m] || bg._default,
                            o = n[0],
                            p = b.createElement("div"),
                            q = bh.childNodes,
                            r;
                        b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];
                        while (o--) p = p.lastChild;
                        if (!f.support.tbody) {
                            var s = $.test(l),
                                t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
                            for (i = t.length - 1; i >= 0; --i) f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
                        }!f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)))
                    }
                var u;
                if (!f.support.appendChecked)
                    if (l[0] && typeof (u = l.length) == "number")
                        for (i = 0; i < u; i++) bn(l[i]);
                    else bn(l);
                l.nodeType ? j.push(l) : j = f.merge(j, l)
            }
            if (d) {
                g = function (a) {
                    return !a.type || be.test(a.type)
                };
                for (k = 0; j[k]; k++) {
                    h = j[k];
                    if (e && f.nodeName(h, "script") && (!h.type || be.test(h.type))) e.push(h.parentNode ? h.parentNode.removeChild(h) : h);
                    else {
                        if (h.nodeType === 1) {
                            var v = f.grep(h.getElementsByTagName("script"), g);
                            j.splice.apply(j, [k + 1, 0].concat(v))
                        }
                        d.appendChild(h)
                    }
                }
            }
            return j
        },
        cleanData: function (a) {
            var b, c, d = f.cache,
                e = f.event.special,
                g = f.support.deleteExpando;
            for (var h = 0, i;
                (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                }
            }
        }
    });
    var bp = /alpha\([^)]*\)/i,
        bq = /opacity=([^)]*)/,
        br = /([A-Z]|^ms)/g,
        bs = /^[\-+]?(?:\d*\.)?\d+$/i,
        bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        bu = /^([\-+])=([\-+.\de]+)/,
        bv = /^margin/,
        bw = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        bx = ["Top", "Right", "Bottom", "Left"],
        by, bz, bA;
    f.fn.css = function (a, c) {
        return f.access(this, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        }, a, c, arguments.length > 1)
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = by(a, "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (a, c, d, e) {
            if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                var g, h, i = f.camelCase(c),
                    j = a.style,
                    k = f.cssHooks[i];
                c = f.cssProps[i] || i;
                if (d === b) {
                    if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
                    return j[c]
                }
                h = typeof d, h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
                if (d == null || h === "number" && isNaN(d)) return;
                h === "number" && !f.cssNumber[i] && (d += "px");
                if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                    j[c] = d
                } catch (l) {}
            }
        },
        css: function (a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (by) return by(a, c)
        },
        swap: function (a, b, c) {
            var d = {},
                e, f;
            for (f in b) d[f] = a.style[f], a.style[f] = b[f];
            e = c.call(a);
            for (f in b) a.style[f] = d[f];
            return e
        }
    }), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (bz = function (a, b) {
        var c, d, e, g, h = a.style;
        b = b.replace(br, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g);
        return c
    }), c.documentElement.currentStyle && (bA = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b],
            g = a.style;
        f == null && g && (e = g[b]) && (f = e), bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }), by = bz || bA, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {
            get: function (a, c, d) {
                if (c) return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw, function () {
                    return bB(a, b, d)
                })
            },
            set: function (a, b) {
                return bs.test(b) ? b + "px" : b
            }
        }
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function (a, b) {
            return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function (a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bp, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return
            }
            c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e
        }
    }), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function (a, b) {
                return f.swap(a, {
                    display: "inline-block"
                }, function () {
                    return b ? by(a, "margin-right") : a.style.marginRight
                })
            }
        })
    }), f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth,
            c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function (a) {
        return !f.expr.filters.hidden(a)
    }), f.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (a, b) {
        f.cssHooks[a + b] = {
            expand: function (c) {
                var d, e = typeof c == "string" ? c.split(" ") : [c],
                    f = {};
                for (d = 0; d < 4; d++) f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];
                return f
            }
        }
    });
    var bC = /%20/g,
        bD = /\[\]$/,
        bE = /\r?\n/g,
        bF = /#.*$/,
        bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        bJ = /^(?:GET|HEAD)$/,
        bK = /^\/\//,
        bL = /\?/,
        bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bN = /^(?:select|textarea)/i,
        bO = /\s+/,
        bP = /([?&])_=[^&]*/,
        bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        bR = f.fn.load,
        bS = {},
        bT = {},
        bU, bV, bW = ["*/"] + ["*"];
    try {
        bU = e.href
    } catch (bX) {
        bU = c.createElement("a"), bU.href = "", bU = bU.href
    }
    bV = bQ.exec(bU.toLowerCase()) || [], f.fn.extend({
        load: function (a, c, d) {
            if (typeof a != "string" && bR) return bR.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            f.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function (a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function (a) {
                        c = a
                    }), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)), d && i.each(d, [c, b, a])
                }
            });
            return this
        },
        serialize: function () {
            return f.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
            }).map(function (a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                    return {
                        name: b.name,
                        value: a.replace(bE, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(bE, "\r\n")
                }
            }).get()
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: g
            })
        }
    }), f.extend({
        getScript: function (a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function (a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function (a, b) {
            b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b$(a, b);
            return a
        },
        ajaxSettings: {
            url: bU,
            isLocal: bI.test(bV[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bW
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: bY(bS),
        ajaxTransport: bY(bT),
        ajax: function (a, c) {
            function w(a, c, l, m) {
                if (s !== 2) {
                    s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                    var o, r, u, w = c,
                        x = l ? ca(d, v, l) : b,
                        y, z;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (d.ifModified) {
                            if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                            if (z = v.getResponseHeader("Etag")) f.etag[k] = z
                        }
                        if (a === 304) w = "notmodified", o = !0;
                        else try {
                            r = cb(d, x), w = "success", o = !0
                        } catch (A) {
                            w = "parsererror", u = A
                        }
                    } else {
                        u = w;
                        if (!w || a) w = "error", a < 0 && (a = 0)
                    }
                    v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
                }
            }
            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c),
                e = d.context || d,
                g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
                h = f.Deferred(),
                i = f.Callbacks("once memory"),
                j = d.statusCode || {},
                k, l = {},
                m = {},
                n, o, p, q, r, s = 0,
                t, u, v = {
                    readyState: 0,
                    setRequestHeader: function (a, b) {
                        if (!s) {
                            var c = a.toLowerCase();
                            a = m[c] = m[c] || a, l[a] = b
                        }
                        return this
                    },
                    getAllResponseHeaders: function () {
                        return s === 2 ? n : null
                    },
                    getResponseHeader: function (a) {
                        var c;
                        if (s === 2) {
                            if (!o) {
                                o = {};
                                while (c = bG.exec(n)) o[c[1].toLowerCase()] = c[2]
                            }
                            c = o[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    },
                    overrideMimeType: function (a) {
                        s || (d.mimeType = a);
                        return this
                    },
                    abort: function (a) {
                        a = a || "abort", p && p.abort(a), w(0, a);
                        return this
                    }
                };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
                if (a) {
                    var b;
                    if (s < 2)
                        for (b in a) j[b] = [j[b], a[b]];
                    else b = a[v.status], v.then(b, b)
                }
                return this
            }, d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO), d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), bZ(bS, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bJ.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(),
                        y = d.url.replace(bP, "$1_=" + x);
                    d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "")
                }
            }(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                v.abort();
                return !1
            }
            for (u in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[u](d[u]);
            p = bZ(bT, d, c, v);
            if (!p) w(-1, "No Transport");
            else {
                v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                    v.abort("timeout")
                }, d.timeout));
                try {
                    s = 1, p.send(l, w)
                } catch (z) {
                    if (s < 2) w(-1, z);
                    else throw z
                }
            }
            return v
        },
        param: function (a, c) {
            var d = [],
                e = function (a, b) {
                    b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function () {
                e(this.name, this.value)
            });
            else
                for (var g in a) b_(g, a[g], c, e);
            return d.join("&").replace(bC, "+")
        }
    }), f.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cc = f.now(),
        cd = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            return f.expando + "_" + cc++
        }
    }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                i = a[h],
                j = b.url,
                k = b.data,
                l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a]
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function () {
                g || f.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return "script"
        }
    }), f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (a) {
                f.globalEval(a);
                return a
            }
        }
    }), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function (f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                    }, e.insertBefore(d, e.firstChild)
                },
                abort: function () {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var ce = a.ActiveXObject ? function () {
            for (var a in cg) cg[a](0, 1)
        } : !1,
        cf = 0,
        cg;
    f.ajaxSettings.xhr = a.ActiveXObject ? function () {
            return !this.isLocal && ch() || ci()
        } : ch,
        function (a) {
            f.extend(f.support, {
                ajax: !!a,
                cors: !!a && "withCredentials" in a
            })
        }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
            if (!c.crossDomain || f.support.cors) {
                var d;
                return {
                    send: function (e, g) {
                        var h = c.xhr(),
                            i, j;
                        c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                        if (c.xhrFields)
                            for (j in c.xhrFields) h[j] = c.xhrFields[j];
                        c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (j in e) h.setRequestHeader(j, e[j])
                        } catch (k) {}
                        h.send(c.hasContent && c.data || null), d = function (a, e) {
                            var j, k, l, m, n;
                            try {
                                if (d && (e || h.readyState === 4)) {
                                    d = b, i && (h.onreadystatechange = f.noop, ce && delete cg[i]);
                                    if (e) h.readyState !== 4 && h.abort();
                                    else {
                                        j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);
                                        try {
                                            m.text = h.responseText
                                        } catch (a) {}
                                        try {
                                            k = h.statusText
                                        } catch (o) {
                                            k = ""
                                        }!j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                    }
                                }
                            } catch (p) {
                                e || g(-1, p)
                            }
                            m && g(j, k, m, l)
                        }, !c.async || h.readyState === 4 ? d() : (i = ++cf, ce && (cg || (cg = {}, f(a).unload(ce)), cg[i] = d), h.onreadystatechange = d)
                    },
                    abort: function () {
                        d && d(0, 1)
                    }
                }
            }
        });
    var cj = {},
        ck, cl, cm = /^(?:toggle|show|hide)$/,
        cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        co, cp = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        cq;
    f.fn.extend({
        show: function (a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(ct("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
                }
            }
            return this
        },
        hide: function (a, b, c) {
            if (a || a === 0) return this.animate(ct("hide", 3), a, b, c);
            var d, e, g = 0,
                h = this.length;
            for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this
        },
        _toggle: f.fn.toggle,
        toggle: function (a, b, c) {
            var d = typeof a == "boolean";
            f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(ct("toggle", 3), a, b, c);
            return this
        },
        fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function (a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e),
                    c = this.nodeType === 1,
                    d = c && f(this).is(":hidden"),
                    g, h, i, j, k, l, m, n, o, p, q;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]);
                    if ((k = f.cssHooks[g]) && "expand" in k) {
                        l = k.expand(a[g]), delete a[g];
                        for (i in l) i in a || (a[i] = l[i])
                    }
                }
                for (g in a) {
                    h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
                return !0
            }
            var e = f.speed(b, c, d);
            if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
            a = f.extend({}, a);
            return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
        },
        stop: function (a, c, d) {
            typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
            return this.each(function () {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d)
                }
                var b, c = !1,
                    e = f.timers,
                    g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null)
                    for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
                else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }), f.each({
        slideDown: ct("show", 1),
        slideUp: ct("hide", 1),
        slideToggle: ct("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({
        speed: function (a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            d.old = d.complete, d.complete = function (a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            };
            return d
        },
        easing: {
            linear: function (a) {
                return a
            },
            swing: function (a) {
                return -Math.cos(a * Math.PI) / 2 + .5
            }
        },
        timers: [],
        fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), f.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
        },
        cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var a, b = f.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
        },
        custom: function (a, c, d) {
            function h(a) {
                return e.step(a)
            }
            var e = this,
                g = f.fx;
            this.startTime = cq || cr(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
                f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
            }, h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
        },
        show: function () {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
        },
        hide: function () {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function (a) {
            var b, c, d, e = cq || cr(),
                g = !0,
                h = this.elem,
                i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show)
                        for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
            return !0
        }
    }, f.extend(f.fx, {
        tick: function () {
            var a, b = f.timers,
                c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop()
        },
        interval: 13,
        stop: function () {
            clearInterval(co), co = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (a) {
                f.style(a.elem, "opacity", a.now)
            },
            _default: function (a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), f.each(cp.concat.apply([], cp), function (a, b) {
        b.indexOf("margin") && (f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        })
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers, function (b) {
            return a === b.elem
        }).length
    });
    var cv, cw = /^t(?:able|d|h)$/i,
        cx = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? cv = function (a, b, c, d) {
        try {
            d = a.getBoundingClientRect()
        } catch (e) {}
        if (!d || !f.contains(c, a)) return d ? {
            top: d.top,
            left: d.left
        } : {
            top: 0,
            left: 0
        };
        var g = b.body,
            h = cy(b),
            i = c.clientTop || g.clientTop || 0,
            j = c.clientLeft || g.clientLeft || 0,
            k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop,
            l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft,
            m = d.top + k - i,
            n = d.left + l - j;
        return {
            top: m,
            left: n
        }
    } : cv = function (a, b, c) {
        var d, e = a.offsetParent,
            g = a,
            h = b.body,
            i = b.defaultView,
            j = i ? i.getComputedStyle(a, null) : a.currentStyle,
            k = a.offsetTop,
            l = a.offsetLeft;
        while ((a = a.parentNode) && a !== h && a !== c) {
            if (f.support.fixedPosition && j.position === "fixed") break;
            d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), j = d
        }
        if (j.position === "relative" || j.position === "static") k += h.offsetTop, l += h.offsetLeft;
        f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft));
        return {
            top: k,
            left: l
        }
    }, f.fn.offset = function (a) {
        if (arguments.length) return a === b ? this : this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        var c = this[0],
            d = c && c.ownerDocument;
        if (!d) return null;
        if (c === d.body) return f.offset.bodyOffset(c);
        return cv(c, d, d.documentElement)
    }, f.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop,
                c = a.offsetLeft;
            f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
            return {
                top: b,
                left: c
            }
        },
        setOffset: function (a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a),
                g = e.offset(),
                h = f.css(a, "top"),
                i = f.css(a, "left"),
                j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
                k = {},
                l = {},
                m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
        }
    }, f.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                d = cx.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
            return {
                top: c.top - d.top,
                left: c.left - d.left
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a
            })
        }
    }), f.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (a, c) {
        var d = /Y/.test(c);
        f.fn[a] = function (e) {
            return f.access(this, function (a, e, g) {
                var h = cy(a);
                if (g === b) return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
                h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g
            }, a, e, arguments.length, null)
        }
    }), f.each({
        Height: "height",
        Width: "width"
    }, function (a, c) {
        var d = "client" + a,
            e = "scroll" + a,
            g = "offset" + a;
        f.fn["inner" + a] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
        }, f.fn["outer" + a] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
        }, f.fn[c] = function (a) {
            return f.access(this, function (a, c, h) {
                var i, j, k, l;
                if (f.isWindow(a)) {
                    i = a.document, j = i.documentElement[d];
                    return f.support.boxModel && j || i.body && i.body[d] || j
                }
                if (a.nodeType === 9) {
                    i = a.documentElement;
                    if (i[d] >= i[e]) return i[d];
                    return Math.max(a.body[e], i[e], a.body[g], i[g])
                }
                if (h === b) {
                    k = f.css(a, c), l = parseFloat(k);
                    return f.isNumeric(l) ? l : k
                }
                f(a).css(c, h)
            }, c, a, arguments.length, null)
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f
    })
})(window);

(function($) {
	var lang = {
		en: {
			days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			months: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
			sep: '-',
			format: 'YYYY-MM-DD hh:mm',
			prevMonth: 'Previous month',
			nextMonth: 'Next month',
			today: 'Today'
		},
		ro:{
			days: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
			months: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			sep: '.',
			format: 'DD.MM.YYYY hh:mm',
			prevMonth: 'Luna precedentă',
			nextMonth: 'Luna următoare',
			today: 'Azi'
		},

		ja: {
			days: ['日', '月', '火', '水', '木', '金', '土'],
			months: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
			sep: '/',
			format: 'YYYY/MM/DD hh:mm'
		},
		ru: {
			days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			months: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
			format: 'DD.MM.YYYY hh:mm'
		},
		br: {
			days: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
			months: [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ],
			format: 'DD/MM/YYYY hh:mm'
		},
		pt: {
			days: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
			months: [ "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro" ]
		},
		cn: {
			days: ['日', '一', '二', '三', '四', '五', '六'],
			months: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ]
		},
		da: {
			days: ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'],
			months: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dec" ],
			sep: '-',
			format: 'DD-MM-YYYY hh:mm',
			prevMonth: 'Forrige måned',
			nextMonth: 'Næste måned',
			today: 'I dag'
		},
		de: {
			days: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
			months: [ "Jan", "Feb", "März", "Apr", "Mai", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dez" ],
			format: 'DD.MM.YYYY hh:mm'
		},
		sv: {
			days: ['Sö', 'Må', 'Ti', 'On', 'To', 'Fr', 'Lö'],
			months: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dec" ]
		},
		id: {
			days: ['Min','Sen','Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
			months: [ "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des" ]
		},
		it: {
			days: ['Dom','Lun','Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
			months: [ "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic" ],
			format: 'DD/MM/YYYY hh:mm'
		},
		tr: {
			days: ['Pz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cu', 'Cts'],
			months: [ "Ock", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Agu", "Eyl", "Ekm", "Kas", "Arlk" ]
		},
		es: {
			days: ['dom', 'lun', 'mar', 'miér', 'jue', 'vie', 'sáb'],
			months: [ "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic" ],
			format: 'DD/MM/YYYY hh:mm'
		},
		ko: {
			days: ['일', '월', '화', '수', '목', '금', '토'],
			months: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
			sep: '/',
			prevMonth: '이전 달',
			nextMonth: '다음 달',
			today: '오늘'
		},
		nl: {
			days: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
			months: [ "jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec" ],
			format: 'DD-MM-YYYY hh:mm'
		},
		no: {
			days: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
			months: [ "Jan", "Feb", "Mar", "Apr", "Mi", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des" ],
			sep: '.',
			format: 'YYYY-MM-DD hh:mm',
			prevMonth: 'Forrige Måned',
			nextMonth: 'Neste Måned',
			today: 'I dag'
		},
		cz: {
			days: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
			months: [ "Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čvc", "Srp", "Zář", "Říj", "Lis", "Pro" ],
			format: 'DD.MM.YYYY hh:mm'
		},
		fr: {
			days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
			months: [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ],
			format: 'DD-MM-YYYY hh:mm'
		},
		pl: {
			days: ['N', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
			months: [ "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień" ],
			sep: '-',
			format: 'YYYY-MM-DD hh:mm',
			prevMonth: 'Poprzedni miesiąc',
			nextMonth: 'Następny miesiąc',
			today: 'Dzisiaj'
		},
		gr: {
			days: ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σα'],
			months: [ "Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαϊ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ" ],
			sep: '-',
			format: 'DD-MM-YYYY hh:mm',
			prevMonth: 'Προηγ. μήνας',
			nextMonth: 'Επόμ. μήνας',
			today: 'Σήμερα'
		},
		ua: {
			days: ["Неділя","Понеділок","Вівторок","Cереда","Четвер","П'ятниця","Субота"],
			months: ["Cічень","Лютий","Березень","Квітень","Травень","Червня","Липня","Серпня","Вересня","Жовтень","Листопада","Грудня"],
			format: 'YYYY-MM-DD hh:mm',
			prevMonth: 'Попередній місяць',
			nextMonth: 'Наступний місяць',
			today: 'Cьогодні'
		},
		et: {
			days: ['P', 'E', 'T', 'K', 'N', 'R', 'L'],
			months: [ "Jaan", "Veebr", "Märts", "Apr", "Mai", "Juun", "Juul", "Aug", "Sept", "Okt", "Nov", "Dets" ],
			sep: '.',
			format: 'DD.MM.YYYY hh:mm',
			prevMonth: 'Eelmine kuu',
			nextMonth: 'Järgmine kuu',
			today: 'Täna'
		},
		hu: {
			days: ['Va', 'Hé', 'Ke', 'Sze', 'Cs', 'Pé', 'Szo'],
			months: [ "Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec" ],
			sep: '-',
			format: 'YYYY-MM-DD hh:mm:00',
			prevMonth: 'Előző hónap',
			nextMonth: 'Következő hónap',
			today: 'Ma'
		},
		fa: {
			days: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه'],
			months: [ "ژانویه", "فبریه", "مارچ", "آپریل", "می", "ژوئن", "جولای", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر" ],
			sep: '-',
			format: 'YYYY-MM-DD hh:mm',
			prevMonth: 'ماه قبل',
			nextMonth: 'ماه بعد',
			today: 'امروز'
		},
		lv: {
			days: ['Sv', 'P', 'O', 'T', 'C', 'P', 'S'],
			months: [ "Jan", "Feb", "Mar", "Apr", "Mai", "Jūn", "Jūl", "Avg", "Sep", "Okt", "Nov", "Dec" ],
			format: 'DD.MM.YYYY hh:mm'
		},
		lt: {
			days: ['Pr', 'A', 'T', 'K', 'P', 'Š', 'S'],
			months: [ "Saus.", "Vas.", "Kovas", "Bal.", "Geg.", "Birž.", "Liepa", "Rugp.", "Rugs.", "Spal.", "Lapkr.", "Gruod." ],
			sep: '-',
			format: 'YYYY-MM-DD hh:mm',
			prevMonth: 'Praeitas mėnesis',
			nextMonth: 'Sekantis mėnesis',
			today: 'Šiandien'
		}
	};
	/* ----- */

	/**
		PickerHandler Object
	**/
	var PickerHandler = function($picker, $input){
		this.$pickerObject = $picker;
		this.$inputObject = $input;
	};

	/* Get a picker */
	PickerHandler.prototype.getPicker = function(){
		return this.$pickerObject;
	};

	/* Get a input-field */
	PickerHandler.prototype.getInput = function(){
		return this.$inputObject;
	};

	/* Get the display state of a picker */
	PickerHandler.prototype.isShow = function(){
		var is_show = true;
		if (this.$pickerObject.css('display') == 'none') {
			is_show = false;
		}
		return is_show;
	};

	/* Show a picker */
	PickerHandler.prototype.show = function(){
		var $picker = this.$pickerObject;
		var $input = this.$inputObject;

		$picker.show();

		ActivePickerId = $input.data('pickerId');

		if ($input != null && $picker.data('isInline') === false) { // Float mode
			// Relocate a picker to position of the appended input-field
			this._relocate();
		}
	};

	/* Hide a picker */
	PickerHandler.prototype.hide = function(){
		var $picker = this.$pickerObject;
		var $input = this.$inputObject;
		$picker.hide();
	};

	/* Get a selected date from a picker */
	PickerHandler.prototype.getDate = function(){
		var $picker = this.$pickerObject;
		var $input = this.$inputObject;
		return getPickedDate($picker);
	};

	/* Set a specific date to a picker */
	PickerHandler.prototype.setDate = function(date){
		var $picker = this.$pickerObject;
		var $input = this.$inputObject;
		if (!isObj('Date', date)) {
			date = new Date(date);
		}

		draw_date($picker, {
			"isAnim": true,
			"isOutputToInputObject": true
		}, date);
	};

	/* Set a specific min date to a picker and redraw */
	PickerHandler.prototype.setMinDate = function(date){
		var $picker = this.$pickerObject;
		var $input = this.$inputObject;
		if (!isObj('Date', date)) {
			date = new Date(date);
		}
		$picker.data("minDate", date);
		if ($input.val()) {
			datepicked = new Date(getPickedDate($picker));
			draw_date($picker, {
				"isAnim": true,
				"isOutputToInputObject": true
			}, ((datepicked > date) ? datepicked : date));
		} else {
			draw_date($picker, {
				"isAnim": true,
				"isOutputToInputObject": false
			}, date);
		}
	};

	/* Set a specific max date to a picker and redraw */
	PickerHandler.prototype.setMaxDate = function(date){
		var $picker = this.$pickerObject;
		var $input = this.$inputObject;
		if (!isObj('Date', date)) {
			date = new Date(date);
		}
		$picker.data("maxDate", date);
		if ($input.val()) {
			datepicked = new Date(getPickedDate($picker));
			draw_date($picker, {
				"isAnim": true,
				"isOutputToInputObject": true
			}, ((datepicked < date) ? datepicked : date));
		} else {
			draw_date($picker, {
				"isAnim": true,
				"isOutputToInputObject": false
			}, date);
		}
	};

	/* Destroy a picker */
	PickerHandler.prototype.destroy = function(){
		var $picker = this.$pickerObject;
		var picker_id = $picker.data('pickerId');
		PickerObjects[picker_id] = null;
		$picker.remove();
	};

	/* Relocate a picker to position of the appended input-field. */
	PickerHandler.prototype._relocate = function(){
		var $picker = this.$pickerObject;
		var $input = this.$inputObject;

		if ($input != null && $picker.data('isInline') === false) { // Float mode
			// Move position of a picker - vertical
			var input_outer_height = $input.outerHeight({'margin': true});
			if (!isObj('Number', input_outer_height)) {
				input_outer_height = $input.outerHeight();
			}
			var picker_outer_height = $picker.outerHeight({'margin': true});
			if (!isObj('Number', picker_outer_height)) {
				picker_outer_height = $picker.outerHeight();
			}

			// Set width to assure date and time are side by side
			if($(".datepicker_calendar", $picker).width() !== 0 && $(".datepicker_timelist", $picker).width() !== 0){
				$picker.parent().width($(".datepicker_calendar", $picker).width() + $(".datepicker_timelist", $picker).width() + 6);
			}
			if(parseInt($(window).height()) <=  ($input.offset().top - $(document).scrollTop() + input_outer_height + picker_outer_height) ){
				// Display to top of an input-field
				$picker.parent().css('top', ($input.offset().top - (input_outer_height / 2) - picker_outer_height) + 'px');
			} else {
				// Display to bottom of an input-field
				$picker.parent().css('top', ($input.offset().top + input_outer_height) + 'px');
			}
			// Move position of a picker - horizontal
			if($picker.parent().width() + $input.offset().left > $(window).width()) {
				// Display left side stick to window
				$picker.parent().css('left', (($(window).width() - $picker.parent().width()) / 2) + 'px');
			} else {
				// Display left side stick to input
				$picker.parent().css('left', $input.offset().left + 'px');
			}
			// Display on most top of the z-index
			$picker.parent().css('z-index', 100000);
		}
	};

	/* ----- */

	var PickerObjects = [];
	var InputObjects = [];
	var ActivePickerId = -1;

	var getParentPickerObject = function(obj) {
		return $(obj).closest('.datepicker');
	};

	var getPickersInputObject = function($obj) {
		var $picker = getParentPickerObject($obj);
		if ($picker.data("inputObjectId") != null) {
			return $(InputObjects[$picker.data("inputObjectId")]);
		}
		return null;
	};

	var setToNow = function($obj) {
		var $picker = getParentPickerObject($obj);
		var date = new Date();
		draw($picker, {
			"isAnim": true,
			"isOutputToInputObject": true
		}, date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
	};

	var beforeMonth = function($obj) {
		var $picker = getParentPickerObject($obj);

		if ($picker.data('stateAllowBeforeMonth') === false) { // Not allowed
			return;
		}

		var date = getShownDate($picker);
		var targetMonth_lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
		if (targetMonth_lastDay < date.getDate()) {
			date.setDate(targetMonth_lastDay);
		}
		draw($picker, {
			"isAnim": true,
			"isOutputToInputObject": false,
			"keepPickedDate": true
		}, date.getFullYear(), date.getMonth() - 1, date.getDate(), date.getHours(), date.getMinutes());

		var todayDate = new Date();
		if ($picker.data("futureOnly") && $picker.data("current")) {
			todayDate = new Date($picker.data("current"));
		}

		var isCurrentYear = todayDate.getFullYear() == date.getFullYear();
		var isCurrentMonth = isCurrentYear && todayDate.getMonth() == date.getMonth();

		if (!isCurrentMonth || !$picker.data("futureOnly")) {
			if (targetMonth_lastDay < date.getDate()) {
				date.setDate(targetMonth_lastDay);
			}
			var newdate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate(), date.getHours(), date.getMinutes());
			if ($picker.data("minDate") && newdate < $picker.data("minDate"))
				newdate = $picker.data("minDate");
			draw($picker, {
				"isAnim": true,
				"isOutputToInputObject": false,
				"keepPickedDate": true
			}, newdate.getFullYear(), newdate.getMonth(), newdate.getDate(), newdate.getHours(), newdate.getMinutes());
		}
	};

	var nextMonth = function($obj) {
		var $picker = getParentPickerObject($obj);
		var date = getShownDate($picker);
		var targetMonth_lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		if (targetMonth_lastDay < date.getDate()) {
			date.setDate(targetMonth_lastDay);
		}

		// Check a last date of a next month
		if (getLastDate(date.getFullYear(), date.getMonth() + 1) < date.getDate()) {
			date.setDate(getLastDate(date.getFullYear(), date.getMonth() + 1));
		}
		var newdate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes());
		if ($picker.data("maxDate") && newdate > $picker.data("maxDate"))
			newdate = $picker.data("maxDate");
		draw($picker, {
			"isAnim": true,
			"isOutputToInputObject": false,
			"keepPickedDate": true
		}, newdate.getFullYear(), newdate.getMonth(), newdate.getDate(), newdate.getHours(), newdate.getMinutes());
	};

	/**
		Check a last date of a specified year and month
	**/
	var getLastDate = function(year, month) {
		var date = new Date(year, month + 1, 0);
		return date.getDate();
	};

	var getDateFormat = function (format, locale, is_date_only, is_time_only) {
		if (format == "default") {
			// Default format
			format = translate(locale,'format');
			if (is_date_only) {
				// Convert the format to date-only (ex: YYYY/MM/DD)
				format = format.substring(0, format.search(' '));
			}
			else if (is_time_only) {
				format = format.substring(format.search(' ') + 1);
			}
		}
		return format; // Return date-format
	};

	var normalizeYear = function (year) {
		if (year < 99) { // change year for 4 digits
			var date = new Date();
			return parseInt(year) + parseInt(date.getFullYear().toString().substr(0, 2) + "00");
		}
		return year;
	};
	var parseDate = function (str, opt_date_format) {
		var re, m, date;
		if(opt_date_format != null){
			// Parse date & time with date-format

			// Match a string with date format
			var df = opt_date_format.replace(/hh:mm.*/,'(?:$&)?')
				.replace(/\s/,'\\s?')
				.replace(/(-|\/)/g, '[-\/]')
				.replace(/YYYY/gi, '(\\d{2,4})')
				.replace(/(YY|MM|DD|HH|hh|mm)/g, '(\\d{1,2})')
				.replace(/(M|D|H|h|m)/g, '(\\d{1,2})')
				.replace(/(tt|TT)/g, '([aApP][mM])');
			re = new RegExp(df);
			m = re.exec(str);
			if( m != null){

				// Generate the formats array (convert-table)
				var formats = [];
				var format_buf = '';
				var format_before_c = '';
				var df_ = opt_date_format;
				while (df_ != null && 0 < df_.length) {
					var format_c = df_.substring(0, 1); df_ = df_.substring(1, df_.length);
					if (format_before_c != format_c) {
						if(/(YYYY|YY|MM|DD|mm|dd|M|D|HH|H|hh|h|m|tt|TT)/.test(format_buf)){
							formats.push( format_buf );
							format_buf = '';
						} else {
							format_buf = '';
						}
					}
					format_buf += format_c;
					format_before_c = format_c;
				}
				if (format_buf !== '' && /(YYYY|YY|MM|DD|mm|dd|M|D|HH|H|hh|h|m|tt|TT)/.test(format_buf)){
					formats.push( format_buf );
				}

				// Convert a string (with convert-table) to a date object
				var year, month, day, hour, min;
				var is_successful = false;
				var pm = false;
				var H = false;
				for(var i = 0; i < formats.length; i++){
					if(m.length < i){
						break;
					}

					var f = formats[i];
					var d = m[i+1]; // Matched part of date
					if(f == 'YYYY'){
						year = normalizeYear(d);
						is_successful = true;
					} else if(f == 'YY'){
						year = parseInt(d) + 2000;
						is_successful = true;
					} else if(f == 'MM' || f == 'M'){
						month = parseInt(d) - 1;
						is_successful = true;
					} else if(f == 'DD' || f == 'D'){
						day = d;
						is_successful = true;
					} else if(f == 'hh' || f == 'h'){
						hour = (typeof d != 'undefined') ? d : 0;
						is_successful = true;
					} else if(f == 'HH' || f == 'H'){
						hour = (typeof d != 'undefined') ? d : 0;
						H = true;
						is_successful = true;
					} else if(f == 'mm' || f == 'm'){
						min = (typeof d != 'undefined') ? d : 0;
						is_successful = true;
					} else if(f == 'tt' || f == 'TT'){
						if(d == 'pm' || d == 'PM'){
							pm = true;
						}
						is_successful = true;
					}
				}
				if(H) {
					if(pm) {
						if(hour != 12) {
							hour = parseInt(hour) + 12;
						}
					} else if(hour == 12) {
						hour = 0;
					}
				}
				date = new Date(year, month, day, hour, min);

				if(is_successful === true && isNaN(date) === false && isNaN(date.getDate()) === false){ // Parse successful
					return date;
				}
			}
		}

		// Parse date & time with common format
		re = /^(\d{2,4})[-\/](\d{1,2})[-\/](\d{1,2}) (\d{1,2}):(\d{1,2})$/;
		m = re.exec(str);
		if (m !== null) {
			m[1] = normalizeYear(m[1]);
			date = new Date(m[1], m[2] - 1, m[3], m[4], m[5]);
		} else {
			// Parse for date-only
			re = /^(\d{2,4})[-\/](\d{1,2})[-\/](\d{1,2})$/;
			m = re.exec(str);
			if(m !== null) {
				m[1] = normalizeYear(m[1]);
				date = new Date(m[1], m[2] - 1, m[3]);
			}
		}

		if(isNaN(date) === false && isNaN(date.getDate()) === false){ // Parse successful
			return date;
		}
		return false;
	};
	var getFormattedDate = function(date, date_format) {
		if(date == null){
			date = new Date();
		}

		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var hou = date.getHours();
		var min = date.getMinutes();

		date_format = date_format.replace(/YYYY/gi, y)
		.replace(/YY/g, y - 2000)/* century */
		.replace(/MM/g, zpadding(m))
		.replace(/M/g, m)
		.replace(/DD/g, zpadding(d))
		.replace(/D/g, d)
		.replace(/hh/g, zpadding(hou))
		.replace(/h/g, hou)
		.replace(/HH/g, (hou > 12? zpadding(hou - 12) : (hou < 1? 12 : zpadding(hou))))
		.replace(/H/g, (hou > 12? hou - 12 : (hou < 1? 12 : hou)))
		.replace(/mm/g, zpadding(min))
		.replace(/m/g, min)
		.replace(/tt/g, (hou >= 12? "pm" : "am"))
		.replace(/TT/g, (hou >= 12? "PM" : "AM"));
		return date_format;
	};

	var outputToInputObject = function($picker) {
		var $inp = getPickersInputObject($picker);
		if ($inp == null) {
			return;
		}
		var date = getPickedDate($picker);
		var locale = $picker.data("locale");
		var format = getDateFormat($picker.data("dateFormat"), locale, $picker.data('dateOnly'), $picker.data('timeOnly'));
		var old = $inp.val();
		$inp.val(getFormattedDate(date, format));
		if (old != $inp.val()) { // only trigger if it actually changed to avoid a nasty loop condition
			$inp.trigger("change");
		}
	};

	var getShownDate = function($obj) {
		var $picker = getParentPickerObject($obj);
		return $picker.data("shownDate");
	};

	var getPickedDate = function($obj) {
		var $picker = getParentPickerObject($obj);
		return $picker.data("pickedDate");
	};

	var zpadding = function(num) {
		num = ("0" + num).slice(-2);
		return num;
	};

	var draw_date = function($picker, option, date) {
		//console.log("draw_date - " + date.toString());
		draw($picker, option, date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
	};
	var translate = function(locale, s) {
		if (typeof lang[locale][s] !== "undefined"){
			return lang[locale][s];
		}
		return lang.en[s];
	};
	var draw = function($picker, option, year, month, day, hour, min) {
		var date = new Date();

		if (hour != null) {
			date = new Date(year, month, day, hour, min, 0);
		} else if (year != null) {
			date = new Date(year, month, day);
		} else {
			date = new Date();
		}

		/* Read options */
		var isTodayButton = $picker.data("todayButton");
		var isCloseButton = $picker.data("closeButton");
		var isScroll = option.isAnim; /* It same with isAnim */
		if($picker.data("timelistScroll") === false) {// If disabled by user option.
			isScroll = false;
		}

		var isAnim = option.isAnim;
		if($picker.data("animation") === false){ // If disabled by user option.
			isAnim = false;
		}

		var isFutureOnly = $picker.data("futureOnly");
		var minDate = $picker.data("minDate");
		var maxDate = $picker.data("maxDate");

		var isOutputToInputObject = option.isOutputToInputObject;
		var keepPickedDate = option.keepPickedDate;
		if (typeof keepPickedDate === "undefined") keepPickedDate = false;

		var minuteInterval = $picker.data("minuteInterval");
		var firstDayOfWeek = $picker.data("firstDayOfWeek");

		var allowWdays = $picker.data("allowWdays");
		if (allowWdays == null || isObj('Array', allowWdays) === false || allowWdays.length <= 0) {
			allowWdays = null;
		}

		var minTime = $picker.data("minTime");
		var maxTime = $picker.data("maxTime");

		/* Check a specified date */
		var todayDate = new Date();
	

		if (isFutureOnly) {
			if ($picker.data("current")) {
				todayDate = new Date($picker.data("current"));
			}
			if (date.getTime() < todayDate.getTime()) { // Already passed
				date.setTime(todayDate.getTime());
			}
		}
		if(allowWdays != null && allowWdays.length <= 6) {
			while (true) {
				if ($.inArray(date.getDay(), allowWdays) == -1) { // Unallowed wday
					// Slide a date
					date.setDate(date.getDate() + 1);
				} else {
					break;
				}
			}
		}

		/* Read locale option */
		var locale = $picker.data("locale");
		if (!lang.hasOwnProperty(locale)) {
			locale = 'en';
		}

		/* Calculate dates */
		var firstWday = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - firstDayOfWeek;
		var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		var beforeMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
		var dateBeforeMonth = new Date(date.getFullYear(), date.getMonth(), 0);
		var dateNextMonth = new Date(date.getFullYear(), date.getMonth() + 2, 0);
		var isCurrentYear = todayDate.getFullYear() == date.getFullYear();
		var isCurrentMonth = isCurrentYear && todayDate.getMonth() == date.getMonth();
		var isCurrentDay = isCurrentMonth && todayDate.getDate() == date.getDate();
		var isNextYear = (todayDate.getFullYear() + 1 == date.getFullYear());
		var isNextMonth = (isCurrentYear && todayDate.getMonth() + 1 == date.getMonth()) ||
			(isNextYear && todayDate.getMonth() === 11 && date.getMonth() === 0);
		var isPastMonth = false;
		if (date.getFullYear() < todayDate.getFullYear() || (isCurrentYear && date.getMonth() < todayDate.getMonth())) {
			isPastMonth = true;
		}

		/* Collect each part */
		var $header = $picker.children('.datepicker_header');
		var $inner = $picker.children('.datepicker_inner_container');
		var $calendar = $picker.children('.datepicker_inner_container').children('.datepicker_calendar');
		var $table = $calendar.children('.datepicker_table');
		var $timelist = $picker.children('.datepicker_inner_container').children('.datepicker_timelist');

		/* Grasp a point that will be changed */
		var changePoint = "";
		var oldDate = getPickedDate($picker);
		if(oldDate != null){
			if(oldDate.getMonth() != date.getMonth() || oldDate.getDate() != date.getDate()){
				changePoint = "calendar";
			} else if (oldDate.getHours() != date.getHours() || oldDate.getMinutes() != date.getMinutes()){
				if(date.getMinutes() === 0 || date.getMinutes() % minuteInterval === 0){
					changePoint = "timelist";
				}
			}
		}

		/* Save newly date to Picker data */
		if (keepPickedDate === false) {
			$($picker).data("pickedDate", date);
		}
		$($picker).data("shownDate", date);

		/* Fade-out animation */
		if (isAnim === true) {
			if(changePoint == "calendar"){
				$calendar.stop().queue([]);
				$calendar.fadeTo("fast", 0.8);
			}else if(changePoint == "timelist"){
				$timelist.stop().queue([]);
				$timelist.fadeTo("fast", 0.8);
			}
		}
		/* Remind timelist scroll state */
		var drawBefore_timeList_scrollTop = $timelist.scrollTop();

		/* New timelist  */
		var timelist_activeTimeCell_offsetTop = -1;

		/* Header ----- */
		$header.children().remove();

		var cDate =  new Date(date.getTime());
		cDate.setMinutes(59);
		cDate.setHours(23);
		cDate.setSeconds(59);
		cDate.setDate(0); // last day of previous month

		var $link_before_month = null;
		if ((!isFutureOnly || !isCurrentMonth) && ((minDate == null) || (minDate < cDate.getTime()))
		) {
			$link_before_month = $('<a>');
			$link_before_month.text('<');
			$link_before_month.prop('alt', translate(locale,'prevMonth'));
			$link_before_month.prop('title', translate(locale,'prevMonth') );
			$link_before_month.click(function() {
				beforeMonth($picker);
			});
			$picker.data('stateAllowBeforeMonth', true);
		} else {
			$picker.data('stateAllowBeforeMonth', false);
		}

		cDate.setMinutes(0);
		cDate.setHours(0);
		cDate.setSeconds(0);
		cDate.setDate(1); // First day of next month
		cDate.setMonth(date.getMonth() + 1);

		var $now_month = $('<span>');
		$now_month.text(date.getFullYear() + " " + translate(locale, 'sep') + " " + translate(locale, 'months')[date.getMonth()]);

		var $link_next_month = null;
		if ((maxDate == null) || (maxDate > cDate.getTime())) {
			$link_next_month = $('<a>');
			$link_next_month.text('>');
			$link_next_month.prop('alt', translate(locale,'nextMonth'));
			$link_next_month.prop('title', translate(locale,'nextMonth'));
			$link_next_month.click(function() {
				nextMonth($picker);
			});
		}

		if (isTodayButton) {
			var $link_today = $('<a><div/></a>');
			$link_today.addClass('icon-home');
			$link_today.prop('alt', translate(locale,'today'));
			$link_today.prop('title', translate(locale,'today'));
			$link_today.click(function() {
				setToNow($picker);
			});
			$header.append($link_today);
		}
		if (isCloseButton) {
			var $link_close = $('<a><div/></a>');
			$link_close.addClass('icon-close');
			$link_close.prop('alt', translate(locale,'close'));
			$link_close.prop('title', translate(locale,'close'));
			$link_close.click(function() {
				$picker.hide();
			});
			$header.append($link_close);
		}

		if ($link_before_month != null) {
			$header.append($link_before_month);
		}
		$header.append($now_month);
		if ($link_next_month != null) {
			$header.append($link_next_month);
		}

		/* Calendar > Table ----- */
		$table.children().remove();
		var $tr = $('<tr>');
		$table.append($tr);

		/* Output wday cells */
		var firstDayDiff = 7 + firstDayOfWeek;
		var daysOfWeek = translate(locale,'days');
		var $td;
		for (var i = 0; i < 7; i++) {
			$td = $('<th>');
			$td.text(daysOfWeek[((i + firstDayDiff) % 7)]);
			$tr.append($td);
		}

		/* Output day cells */
		var cellNum = Math.ceil((firstWday + lastDay) / 7) * 7;
		i = 0;
		if(firstWday < 0){
			i = -7;
		}
		var realDayObj =  new Date(date.getTime());
		realDayObj.setHours(0);
		realDayObj.setMinutes(0);
		realDayObj.setSeconds(0);
		var pickedDate = getPickedDate($picker);
		var shownDate = getShownDate($picker);
		for (var zz = 0; i < cellNum; i++) {
			var realDay = i + 1 - firstWday;

			var isPast = isPastMonth ||
				(isCurrentMonth && realDay < todayDate.getDate()) ||
				(isNextMonth && firstWday > i && (beforeMonthLastDay + realDay) < todayDate.getDate());

			if (i % 7 === 0) {
				$tr = $('<tr>');
				$table.append($tr);
			}

			$td = $('<td>');
			$td.data("day", realDay);

			$tr.append($td);

			if (firstWday > i) {/* Before months day */
				$td.text(beforeMonthLastDay + realDay);
				$td.addClass('day_another_month');
				$td.data("dateStr", dateBeforeMonth.getFullYear() + "/" + (dateBeforeMonth.getMonth() + 1) + "/" + (beforeMonthLastDay + realDay));
				realDayObj.setDate(beforeMonthLastDay + realDay);
				realDayObj.setMonth(dateBeforeMonth.getMonth() );
				realDayObj.setYear(dateBeforeMonth.getFullYear() );
			} else if (i < firstWday + lastDay) {/* Now months day */
				$td.text(realDay);
				$td.data("dateStr", (date.getFullYear()) + "/" + (date.getMonth() + 1) + "/" + realDay);
				realDayObj.setDate( realDay );
				realDayObj.setMonth( date.getMonth()  );
				realDayObj.setYear( date.getFullYear() );
			} else {/* Next months day */
				$td.text(realDay - lastDay);
				$td.addClass('day_another_month');
				$td.data("dateStr", dateNextMonth.getFullYear() + "/" + (dateNextMonth.getMonth() + 1) + "/" + (realDay - lastDay));
				realDayObj.setDate( realDay - lastDay );
				realDayObj.setMonth( dateNextMonth.getMonth() );
				realDayObj.setYear( dateNextMonth.getFullYear() );
			}

			/* Check a wday */
			var wday = ((i + firstDayDiff) % 7);
			if(allowWdays != null) {
				if ($.inArray(wday, allowWdays) == -1) {
					$td.addClass('day_in_unallowed');
					continue; // Skip
				}
			} else if (wday === 0) {/* Sunday */
				$td.addClass('wday_sun');
			} else if (wday == 6) {/* Saturday */
				$td.addClass('wday_sat');
			}

			/* Set a special mark class */
			if (shownDate.getFullYear() == pickedDate.getFullYear() && shownDate.getMonth() == pickedDate.getMonth() && realDay == pickedDate.getDate()) { /* selected day */
				$td.addClass('active');
			}

			if (isCurrentMonth && realDay == todayDate.getDate()) { /* today */
				$td.addClass('today');
			}

			var realDayObjMN =  new Date(realDayObj.getTime());
			realDayObjMN.setHours(23);
			realDayObjMN.setMinutes(59);
			realDayObjMN.setSeconds(59);

			if (
				// compare to 23:59:59 on the current day (if MIN is 1pm, then we still need to show this day
				((minDate != null) && (minDate > realDayObjMN.getTime())) || ((maxDate != null) && (maxDate < realDayObj.getTime())) // compare to 00:00:00
			) { // Out of range day
				$td.addClass('out_of_range');
			} else if (isFutureOnly && isPast) { // Past day
				$td.addClass('day_in_past');
			} else {
				/* Set event-handler to day cell */
				$td.click(function(ev) {
					ev.stopPropagation();
					if ($(this).hasClass('hover')) {
						$(this).removeClass('hover');
					}
					$(this).addClass('active');

					var $picker = getParentPickerObject($(this));
					var targetDate = new Date($(this).data("dateStr"));
					var selectedDate = getPickedDate($picker);
					draw($picker, {
						"isAnim": false,
						"isOutputToInputObject": true
					}, targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), selectedDate.getHours(), selectedDate.getMinutes());

					// Generate the handler of a picker
					var $input = $(this);
					var handler = new PickerHandler($picker, $input);

					// Call a event-hanlder for onSelect
					var func = $picker.data('onSelect');
					if (func != null) {
						func(handler, targetDate);
					}

					if ($picker.data("dateOnly") === true && $picker.data("isInline") === false && $picker.data("closeOnSelected")){
						// Close a picker
						ActivePickerId = -1;
						$picker.hide();
					}
				});

				$td.hover(function() {
					if (! $(this).hasClass('active')) {
						$(this).addClass('hover');
					}
				}, function() {
					if ($(this).hasClass('hover')) {
						$(this).removeClass('hover');
					}
				});
			}

			/* ---- */
		}

		if ($picker.data('timeOnly') === true) {
			$calendar.css("display", "none");
			$now_month.css("display", "none");
			if ($link_next_month != null)
				$link_next_month.css("display", "none");
			if ($link_before_month != null)
				$link_before_month.css("display", "none");
		}

		if ($picker.data("dateOnly") === true) {
			/* dateOnly mode */
			$timelist.css("display", "none");
		} else {
			/* Timelist ----- */
			$timelist.children().remove();

			/* Set height to Timelist (Calendar innerHeight - Calendar padding) */
			if ($calendar.innerHeight() > 0) {
				$timelist.css("height", $calendar.innerHeight() - 10 + 'px');
			}

			realDayObj =  new Date(date.getTime());
			$timelist.css("height", Math.max($calendar.innerHeight() - 10, 200) + 'px');

			/* Output time cells */
			var hour_ = minTime[0];
			var min_ = minTime[1];

			while( hour_*100+min_ < maxTime[0]*100+maxTime[1] ){

				var $o = $('<div>');
				var is_past_time = hour_ < todayDate.getHours() || (hour_ == todayDate.getHours() && min_ < todayDate.getMinutes());
				var is_past = isCurrentDay && is_past_time;

				$o.addClass('timelist_item');
				var oText = "";
				if($picker.data("amPmInTimeList")){
					oText = /*zpadding*/(hour_ > 12? hour_ - 12 : (hour_ < 1? 12 : hour_));
					oText += ":" + zpadding(min_);
					oText += (hour_ >= 12? "PM" : "AM");
				} else {
					oText = zpadding(hour_) + ":" + zpadding(min_);
				}
				$o.text(oText);
				$o.data("hour", hour_);
				$o.data("min", min_);

				$timelist.append($o);

				realDayObj.setHours(hour_);
				realDayObj.setMinutes(min_);

				if (
					((minDate != null) && (minDate > realDayObj.getTime())) || ((maxDate != null) && (maxDate < realDayObj.getTime()))
				) { // Out of range cell
					$o.addClass('out_of_range');
				} else if (isFutureOnly && is_past) { // Past cell
					$o.addClass('time_in_past');
				} else { // Normal cell
					/* Set event handler to time cell */
					$o.click(function(ev) {
						ev.stopPropagation();
						if ($(this).hasClass('hover')) {
							$(this).removeClass('hover');
						}
						$(this).addClass('active');

						var $picker = getParentPickerObject($(this));
						var date = getPickedDate($picker);
						var hour = $(this).data("hour");
						var min = $(this).data("min");
						draw($picker, {
							"isAnim": false,
							"isOutputToInputObject": true
						}, date.getFullYear(), date.getMonth(), date.getDate(), hour, min);

						if ($picker.data("isInline") === false && $picker.data("closeOnSelected")){
							// Close a picker
							ActivePickerId = -1;
							$picker.hide();
						}
					});

					$o.hover(function() {
						if (! $(this).hasClass('active')) {
							$(this).addClass('hover');
						}
					}, function() {
						if ($(this).hasClass('hover')) {
							$(this).removeClass('hover');
						}
					});
				}

				if (hour_ == date.getHours() && min_ == date.getMinutes()) { /* selected time */
					$o.addClass('active');
					timelist_activeTimeCell_offsetTop = $o.offset().top;
				}

				min_ += minuteInterval;
				if (min_ >= 60){
					min_ = min_ - 60;
					hour_++;
				}

			}

			/* Scroll the timelist */
			/*if(isScroll === true){
				 Scroll to new active time-cell position
				$timelist.scrollTop(timelist_activeTimeCell_offsetTop - $timelist.offset().top);
			}else{
				 Scroll to position that before redraw. 
				$timelist.scrollTop(drawBefore_timeList_scrollTop);
            }*/
		}

		/* Fade-in animation */
		if (isAnim === true) {
			if (changePoint == 'calendar' && $picker.data('timeOnly') === false) {
				$calendar.fadeTo('fast', 1.0);
			} else if (changePoint == 'timelist' && $picker.data('dateOnly') === false) {
				$timelist.fadeTo('fast', 1.0);
			}
		}

		/* Output to InputForm */
		if (isOutputToInputObject === true) {
			outputToInputObject($picker);
		}
	};

	/* Check for object type */
	var isObj = function(type, obj) {
		/* http://qiita.com/Layzie/items/465e715dae14e2f601de */
		var clas = Object.prototype.toString.call(obj).slice(8, -1);
		return obj !== undefined && obj !== null && clas === type;
	};

	var init = function($obj, opt) {
		/* Container */
		var $picker = $('<div>');

		$picker.destroy = function() {
			window.alert('destroy!');
		};

		$picker.addClass('datepicker');
		$obj.append($picker);

		/* Set current date */
		if(!opt.current) {
			opt.current = new Date();
		} else {
			var format = getDateFormat(opt.dateFormat, opt.locale, opt.dateOnly, opt.timeOnly);
			var date = parseDate(opt.current, format);
			if (date) {
				opt.current = date;
			} else {
				opt.current = new Date();
			}
		}

		/* Set options data to container object  */
		if (opt.inputObjectId != null) $picker.data("inputObjectId", opt.inputObjectId);
		if (opt.timeOnly) opt.todayButton = false;
		$picker.data("timeOnly", opt.timeOnly);
		$picker.data("dateOnly", opt.dateOnly);
		$picker.data("pickerId", PickerObjects.length);
		$picker.data("dateFormat", opt.dateFormat);
		$picker.data("locale", opt.locale);
		$picker.data("firstDayOfWeek", opt.firstDayOfWeek);
		$picker.data("animation", opt.animation);
		$picker.data("closeOnSelected", opt.closeOnSelected);
		$picker.data("timelistScroll", opt.timelistScroll);
		$picker.data("calendarMouseScroll", opt.calendarMouseScroll);
		$picker.data("todayButton", opt.todayButton);
		$picker.data("closeButton", opt.closeButton);
		$picker.data('futureOnly', opt.futureOnly);
		$picker.data('onShow', opt.onShow);
		$picker.data('onHide', opt.onHide);
		$picker.data('onSelect', opt.onSelect);
		$picker.data('onInit', opt.onInit);
		$picker.data('allowWdays', opt.allowWdays);
		$picker.data('current', opt.current);

		if(opt.amPmInTimeList === true){
			$picker.data('amPmInTimeList', true);
		} else {
			$picker.data('amPmInTimeList', false);
		}

		var minDate = Date.parse(opt.minDate);
		if (isNaN(minDate)) { // invalid date?
			$picker.data('minDate', null); // set to null
		} else {
			$picker.data('minDate', minDate);
		}

		var maxDate = Date.parse(opt.maxDate);
		if (isNaN(maxDate)) { // invalid date?
			$picker.data('maxDate', null);  // set to null
		} else {
			$picker.data('maxDate', maxDate);
		}
		$picker.data("state", 0);

		if( 5 <= opt.minuteInterval && opt.minuteInterval <= 30 ){
			$picker.data("minuteInterval", opt.minuteInterval);
		} else {
			$picker.data("minuteInterval", 30);
		}
			opt.minTime = opt.minTime.split(':');
			opt.maxTime = opt.maxTime.split(':');

		if(! ((opt.minTime[0] >= 0 ) && (opt.minTime[0] <24 ))){
			opt.minTime[0]="00";
		}
		if(! ((opt.maxTime[0] >= 0 ) && (opt.maxTime[0] <24 ))){
			opt.maxTime[0]="23";
		}
		if(! ((opt.minTime[1] >= 0 ) && (opt.minTime[1] <60 ))){
			opt.minTime[1]="00";
		}
		if(! ((opt.maxTime[1] >= 0 ) && (opt.maxTime[1] <24 ))){
			opt.maxTime[1]="59";
		}
		opt.minTime[0]=parseInt(opt.minTime[0], 10); // parse as decimal number
		opt.minTime[1]=parseInt(opt.minTime[1], 10);
		opt.maxTime[0]=parseInt(opt.maxTime[0], 10);
		opt.maxTime[1]=parseInt(opt.maxTime[1], 10);
		$picker.data('minTime', opt.minTime);
		$picker.data('maxTime', opt.maxTime);

		/* Header */
		var $header = $('<div>');
		$header.addClass('datepicker_header');
		$picker.append($header);
		/* InnerContainer*/
		var $inner = $('<div>');
		$inner.addClass('datepicker_inner_container');
		$picker.append($inner);
		/* Calendar */
		var $calendar = $('<div>');
		$calendar.addClass('datepicker_calendar');
		var $table = $('<table>');
		$table.addClass('datepicker_table');
		$calendar.append($table);
		$inner.append($calendar);
		/* Timelist */
		/*var $timelist = $('<div>');
		$timelist.addClass('datepicker_timelist');
		$inner.append($timelist);

		/* Set event-handler to calendar */
		if (opt.calendarMouseScroll) {
			if (window.sidebar) { // Mozilla Firefox
				$calendar.bind('DOMMouseScroll', function(e){ // Change a month with mouse wheel scroll for Fx
					var $picker = getParentPickerObject($(this));

					// up,left [delta < 0] down,right [delta > 0]
					var delta = e.originalEvent.detail;
					/*
					// this code need to be commented - it's seems to be unnecessary
					// normalization (/3) is not needed as we move one month back or forth
					if(e.originalEvent.axis !== undefined && e.originalEvent.axis == e.originalEvent.HORIZONTAL_AXIS){
						e.deltaX = delta;
						e.deltaY = 0;
					} else {
						e.deltaX = 0;
						e.deltaY = delta;
					}
					e.deltaX /= 3;
					e.deltaY /= 3;
					*/
					if(delta > 0) {
						nextMonth($picker);
					} else {
						beforeMonth($picker);
					}
					return false;
				});
			} else { // Other browsers
				$calendar.bind('mousewheel', function(e){ // Change a month with mouse wheel scroll
					var $picker = getParentPickerObject($(this));
					// up [delta > 0] down [delta < 0]
					if(e.originalEvent.wheelDelta /120 > 0) {
						beforeMonth($picker);
					} else {
						nextMonth($picker);
					}
					return false;
				});
			}
		}

		PickerObjects.push($picker);

		draw_date($picker, {
			"isAnim": true,
			"isOutputToInputObject": opt.autodateOnStart
		}, opt.current);
	};

	var getDefaults = function() {
		return {
			"current": null,
			"dateFormat": "default",
			"locale": "en",
			"animation": true,
			"minuteInterval": 30,
			"firstDayOfWeek": 0,
			"closeOnSelected": false,
			"timelistScroll": true,
			"calendarMouseScroll": true,
			"todayButton": true,
			"closeButton": true,
			"dateOnly": false,
			"timeOnly": false,
			"futureOnly": false,
			"minDate" : null,
			"maxDate" : null,
			"autodateOnStart": true,
			"minTime":"00:00",
			"maxTime":"23:59",
			"onShow": null,
			"onHide": null,
			"onSelect": null,
			"allowWdays": null,
			"amPmInTimeList": false,
			"externalLocale": null
		};
	};

	/**
	 * Initialize dtpicker
	 */
	 $.fn.dtpicker = function(config) {
		var date = new Date();
		var defaults = getDefaults();

		if(typeof config === "undefined" || config.closeButton !== true){
			defaults.closeButton = false;
		}

		defaults.inputObjectId = undefined;
		var options = $.extend(defaults, config);

		return this.each(function(i) {
			init($(this), options);
		});
	 };

	/**
	 * Initialize dtpicker, append to Text input field
	 * */
	 $.fn.appendDtpicker = function(config) {
		var date = new Date();
		var defaults = getDefaults();

		if(typeof config !== "undefined" && config.inline === true && config.closeButton !== true){
			defaults.closeButton = false;
		}

		defaults.inline = false;
		var options = $.extend(defaults, config);

		if (options.externalLocale != null) {
			lang = $.extend(lang, options.externalLocale);
		}

		return this.each(function(i) {
			/* Checking exist a picker */
			var input = this;
			if(0 < $(PickerObjects[$(input).data('pickerId')]).length) {
				console.log("dtpicker - Already exist appended picker");
				return;
			}

			/* Add input-field with inputsObjects array */
			var inputObjectId = InputObjects.length;
			InputObjects.push(input);

			options.inputObjectId = inputObjectId;

			/* Current date */
			var date, strDate, strTime;
			if($(input).val() != null && $(input).val() !== ""){
				options.current = $(input).val();
			}

			/* Make parent-div for picker */
			var $d = $('<div>');
			if(options.inline){ // Inline mode
				$d.insertAfter(input);
			} else { // Float mode
				$d.css("position","absolute");
				$('body').append($d);
			}

			/* Initialize picker */

			var pickerId = PickerObjects.length;

			var $picker_parent = $($d).dtpicker(options); // call dtpicker() method

			var $picker = $picker_parent.children('.datepicker');

			/* Link input-field with picker*/
			$(input).data('pickerId', pickerId);

			/* Set event handler to input-field */

			$(input).keyup(function() {
				var $input = $(this);
				var $picker = $(PickerObjects[$input.data('pickerId')]);
				if ($input.val() != null && (
					$input.data('beforeVal') == null ||
					( $input.data('beforeVal') != null && $input.data('beforeVal') != $input.val())	)
					) { /* beforeValue == null || beforeValue != nowValue  */
					var format = getDateFormat($picker.data('dateFormat'), $picker.data('locale'), $picker.data('dateOnly'), $picker.data('timeOnly'));
					var date = parseDate($input.val(), format);
					//console.log("dtpicker - inputKeyup - format: " + format + ", date: " + $input.val() + " -> " + date);
					if (date) {
						draw_date($picker, {
							"isAnim":true,
							"isOutputToInputObject":false
						}, date);
					}
				}
				$input.data('beforeVal', $input.val());
			});

			$(input).change(function(){
				$(this).trigger('keyup');
			});

			var handler = new PickerHandler($picker, $(input));

			if(options.inline === true){
				/* inline mode */
				$picker.data('isInline',true);
			} else {
				/* float mode */
				$picker.data('isInline',false);
				$picker_parent.css({
					"zIndex": 100
				});
				$picker.css("width","auto");

				/* Hide this picker */
				$picker.hide();

				/* Set onClick event handler for input-field */
				$(input).on('click, focus',function(ev){
					ev.stopPropagation();
					var $input = $(this);
					var $picker = $(PickerObjects[$input.data('pickerId')]);

					// Generate the handler of a picker
					var handler = new PickerHandler($picker, $input);
					// Get the display state of a picker
					var is_showed = handler.isShow();
					if (!is_showed) {
						// Show a picker
						handler.show();

						// Call a event-hanlder
						var func = $picker.data('onShow');
						if (func != null) {
							console.log("dtpicker- Call the onShow handler");
							func(handler);
						}
					}
				});

				// Set an event handler for resizing of a window
				(function(handler){
					$(window).resize(function(){
						handler._relocate();
					});
					$(window).scroll(function(){
						handler._relocate();
					});
				})(handler);
			}

			// Set an event handler for removing of an input-field
			$(input).bind('destroyed', function() {
				var $input = $(this);
				var $picker = $(PickerObjects[$input.data('pickerId')]);
				// Generate the handler of a picker
				var handler = new PickerHandler($picker, $input);
				// Destroy a picker
				handler.destroy();
			});

			// Call a event-handler
			var func = $picker.data('onInit');
			if (func != null) {
				console.log("dtpicker- Call the onInit handler");
				func(handler);
			}
		});
	};

	/**
	 * Handle a appended dtpicker
	 * */
	var methods = {
		show : function( ) {
			var $input = $(this);
			var $picker = $(PickerObjects[$input.data('pickerId')]);
			if ($picker != null) {
				var handler = new PickerHandler($picker, $input);
				// Show a picker
				handler.show();
			}
		},
		hide : function( ) {
			var $input = $(this);
			var $picker = $(PickerObjects[$input.data('pickerId')]);
			if ($picker != null) {
				var handler = new PickerHandler($picker, $input);
				// Hide a picker
				handler.hide();
			}
		},
		setDate : function( date ) {
			var $input = $(this);
			var $picker = $(PickerObjects[$input.data('pickerId')]);
			if ($picker != null) {
				var handler = new PickerHandler($picker, $input);
				// Set a date
				handler.setDate(date);
			}
		},
		setMinDate : function( date ) {
			var $input = $(this);
			var $picker = $(PickerObjects[$input.data('pickerId')]);
			if ($picker != null) {
				var handler = new PickerHandler($picker, $input);
				// Set a min date
				handler.setMinDate(date);
			}
		},
		setMaxDate : function( date ) {
			var $input = $(this);
			var $picker = $(PickerObjects[$input.data('pickerId')]);
			if ($picker != null) {
				var handler = new PickerHandler($picker, $input);
				// Set a max date
				handler.setMaxDate(date);
			}
		},
		getDate : function( ) {
			var $input = $(this);
			var $picker = $(PickerObjects[$input.data('pickerId')]);
			if ($picker != null) {
				var handler = new PickerHandler($picker, $input);
				// Get a date
				return handler.getDate();
			}
		},
		destroy : function( ) {
			var $input = $(this);
			var $picker = $(PickerObjects[$input.data('pickerId')]);
			if ($picker != null) {
				var handler = new PickerHandler($picker, $input);
				// Destroy a picker
				handler.destroy();
			}
		}
	};

	$.fn.handleDtpicker = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.handleDtpicker' );
		}
	};

	if (!window.console) { // Not available a console on this environment.
		window.console = {};
		window.console.log = function(){};
	}

	/* Define a special event for catch when destroy of an input-field. */
	$.event.special.destroyed = {
		remove: function(o) {
			if (o.handler) {
				o.handler.apply(this, arguments);
			}
		}
  	};

	/* Set event handler to Body element, for hide a floated-picker */
	$(function() {
		$('body').click(function() {
			for (var i=0;i<PickerObjects.length;i++) {
				var $picker = $(PickerObjects[i]);
				if ($picker.data('inputObjectId') != null && !$picker.data('isInline') && $picker.css('display') != 'none') {
					/* if append input-field && float picker */
					
					// Check overlapping of cursor and picker
					if ($picker.is(':hover')) continue;

					// Check overlapping of cursor and input-field
					var $input = $(InputObjects[$picker.data('inputObjectId')]);
					if ($input.is(':focus')) continue;

					// Hide a picker
					var handler = new PickerHandler($picker, $input);
					handler.hide();

					// Call a event-hanlder
					var func = $picker.data('onHide');
					if (func != null) {
						console.log('dtpicker- Call the onHide handler');
						func(handler);
					}
				}
			}
		});
	});

})(jQuery);
window.LockableStorage = (function () {
    function now() {
        return new Date().getTime();
    }

    function someNumber() {
        return Math.random() * 1000000000 | 0;
    }
    var myId = now() + ":" + someNumber();

    function getter(lskey) {
        return function () {
            var value = localStorage[lskey];
            if (!value) {
                return null;
            }
            var splitted = value.split(/\|/);
            if (parseInt(splitted[1]) < now()) {
                return null;
            }
            return splitted[0];
        };
    }

    function _mutexTransaction(key, callback, synchronous) {
        var xKey = key + "__MUTEX_x",
            yKey = key + "__MUTEX_y",
            getY = getter(yKey);

        function criticalSection() {
            try {
                callback();
            } finally {
                localStorage.removeItem(yKey);
            }
        }
        localStorage[xKey] = myId;
        if (getY()) {
            if (!synchronous) {
                setTimeout(function () {
                    _mutexTransaction(key, callback);
                }, 0);
            }
            return false;
        }
        localStorage[yKey] = myId + "|" + (now() + 40);
        if (localStorage[xKey] !== myId) {
            if (!synchronous) {
                setTimeout(function () {
                    if (getY() !== myId) {
                        setTimeout(function () {
                            _mutexTransaction(key, callback);
                        }, 0);
                    } else {
                        criticalSection();
                    }
                }, 50);
            }
            return false;
        } else {
            criticalSection();
            return true;
        }
    }

    function lockImpl(key, callback, maxDuration, synchronous) {
        maxDuration = maxDuration || 5000;
        var mutexKey = key + "__MUTEX",
            getMutex = getter(mutexKey),
            mutexValue = myId + ":" + someNumber() + "|" + (now() + maxDuration);

        function restart() {
            setTimeout(function () {
                lockImpl(key, callback, maxDuration);
            }, 10);
        }
        if (getMutex()) {
            if (!synchronous) {
                restart();
            }
            return false;
        }
        var aquiredSynchronously = _mutexTransaction(key, function () {
            if (getMutex()) {
                if (!synchronous) {
                    restart();
                }
                return false;
            }
            localStorage[mutexKey] = mutexValue;
            if (!synchronous) {
                setTimeout(mutexAquired, 0);
            }
        }, synchronous);
        if (synchronous && aquiredSynchronously) {
            mutexAquired();
            return true;
        }
        return false;

        function mutexAquired() {
            try {
                callback();
            } finally {
                _mutexTransaction(key, function () {
                    if (localStorage[mutexKey] !== mutexValue) {
                        throw key + " was locked by a different process while I held the lock";
                    }
                    localStorage.removeItem(mutexKey);
                });
            }
        }
    }
    var LockableStorage = {
        lock: function (key, callback, maxDuration) {
            lockImpl(key, callback, maxDuration, false);
        },
        trySyncLock: function (key, callback, maxDuration) {
            return lockImpl(key, callback, maxDuration, true);
        }
    };
    return LockableStorage;
})();
g_notif_win = null;
c_cmn = function () {
    var fn_get_function_name = function (func) {
        try {
            if (typeof func == "function" || typeof func == "object") {
                var fName = ("" + func).match(/function\s*([\w\$]*)\s*\(/);
                if (fName !== null) {
                    return fName[1];
                }
            }
        } catch (e) {}
        return "unknown";
    };
    this.fn_log = function (message, serverCategory, serverLevel) {
        try {
            if (window.top && window.top.console) {
                window.top.console.log(message);
            } else {
                if (window.console) {
                    window.console.log(message);
                }
            }
        } catch (e) {}
        if (serverCategory) {
            if (g_logger) {
                var level = serverLevel ? serverLevel : "debug";
                g_logger.log(level, serverCategory, message);
            }
        }
    };
    this.fn_refresh_all = function (obj, operation) {
        var d = null;
        if (obj != null) {
            d = {
                "obj": $.toJSON(obj),
                "operation": $.toJSON(operation)
            };
        }
        var ajax_params = {
            type: "GET",
            url: g_server_url + "main_cloud_fs_interface/refresh_cloudhq_dir",
            dataType: "json",
            data: d,
            async: true
        };
        c_cmn.fn_execute_via_background("fn_ajax", ajax_params, function (response) {
            if (response["s"] && response["s"]["error"]) {} else {
                $("#left_jstree_container").jstree("refresh");
                $("#right_jstree_container").jstree("refresh");
                $("#synchpopup_jstree_container").jstree("refresh");
                $("#copypopup_jstree_container").jstree("refresh");
            }
        }, function (response) {});
    };
    this.fn_loggily = function (description, continuation) {
        return function () {
            try {
                return continuation.apply(this, arguments);
            } catch (e) {
                c_cmn.fn_log("cloudHQ exception: " + description + ": " + e, "google docs", "error");
                throw e;
            }
        };
    };
    this.c_logger = function (server, minLevel) {
        var bad_params = {
            user_id: 1,
            type: 1,
            timestamp: 1,
            controller: 1,
            action: 1,
            callback: 1,
            category: 1,
            level: 1,
            path: 1,
            format: 1
        };
        var levels = {
            all: 0,
            debug: 10,
            info: 20,
            warn: 30,
            warning: 30,
            error: 40,
            fatal: 100
        };
        var callbackCount = (new Date()).getTime();
        this.server = server;
        this.minLevel = minLevel;
        this.baseUrl = function (level, category) {
            return this.server + "logger?c=" + encodeURIComponent(category) + "&l=" + encodeURIComponent(level);
        };
        this.log = function (level, category, message, params) {
            if (message === undefined && params === undefined) {
                throw new Error("Please specify level, category and message");
            }
            if (levels[level] < levels[this.minLevel]) {
                return;
            }
            message = "[" + g_google_id + "] " + message;
            var callback = "logger-" + callbackCount;
            callbackCount += 1;
            var data = {
                "level": level,
                "category": category,
                "message": message,
                "callback": callback,
                "params": params
            };
            chrome.extension.sendRequest({
                "action_name": "fn_logger",
                "action_params": data
            }, function (r) {});
        };
        this.debug = function (category, message, params) {
            this.log("debug", category, message, params);
        };
        this.info = function (category, message, params) {
            this.log("info", category, message, params);
        };
        this.warning = this.warn = function (category, message, params) {
            this.log("warning", category, message, params);
        };
        this.error = function (category, message, params) {
            this.log("error", category, message, params);
        };
        this.fatal = function (category, message, params) {
            this.log("fatal", category, message, params);
        };
        this.track = function (message, params, probability) {
            if (undefined !== probability) {
                params.probability = probability;
            }
            this.log("info", "track", message, params);
        };
    };
    this.fn_delayed_conditional_execute = function (options) {
        var default_options = {
            poll_delay: 200,
            max_poll_attempts: 1,
            retry_message: "Scheduling another delayedConditionalExecute search.",
            failure_message: null,
            error_message: "Condition threw an exception!",
            error_continuation: null,
            condition: null,
            continuation: null,
            log_category: "gmail",
            log_level_on_failure: "error",
            log_level_on_error: null
        };
        options = $.extend(default_options, options);
        var attempts = 0;

        function log(message, additional_message, category, level) {
            if (typeof (message) === "function") {
                message = message();
            }
            if (message) {
                c_cmn.fn_log(message + " " + (additional_message || ""), category, level);
            }
        }

        function doAttempt() {
            var condition;
            try {
                condition = options.condition();
            } catch (e) {
                var eStr = e.message ? e.message : e;
                log(options.error_message, "(after " + attempts + " attempts, '" + eStr + "')", options.log_category, (options.log_level_on_error || options.log_level_on_failure));
                return;
            }
            if (condition) {
                options.continuation();
            } else {
                if (attempts < options.max_poll_attempts) {
                    attempts += 1;
                    if (options.retry_message) {
                        log(options.retry_message, "Attempts so far: " + attempts);
                    }
                    window.setTimeout(c_cmn.fn_loggily("fn_delayed_conditional_execute attempt", doAttempt), options.poll_delay);
                } else {
                    if (options.failure_message) {
                        c_cmn.fn_log(options.failure_message, null, options.log_category, options.log_level_on_failure);
                        g_sdk.ButterBar.showMessage({
                            text: options.failure_message,
                            messageKey: "cloudHQ_butter_error"
                        });
                    }
                    if (options.error_continuation) {
                        options.error_continuation();
                    }
                }
            }
        }
        doAttempt();
    };
    this.fn_execute_via_background = function (action_name, action_params, func_ok, func_error) {
        chrome.extension.sendRequest({
            "action_name": action_name,
            "action_params": action_params
        }, function (data) {
            try {
                c_cmn.fn_log("received answer from background.html on request to run " + action_name, "gdoc", "debug");
                var t;
                if (data == null) {
                    t = "Failed to call " + action_name + ". Unable to connect to background.html";
                    if (jQuery.isFunction(func_error)) {
                        c_cmn.fn_log(t, "gdoc", "debug");
                        func_error(null);
                    } else {
                        throw (t);
                    }
                } else {
                    if (data.error) {
                        t = "Action " + action_name + " failed. error: " + JSON.stringify(data.error);
                        if (jQuery.isFunction(func_error)) {
                            c_cmn.fn_log(t, "gdoc", "debug");
                            func_error(data.error);
                        } else {
                            throw (t);
                        }
                    } else {
                        if (jQuery.isFunction(func_ok)) {
                            func_ok(data.result);
                        }
                    }
                }
            } catch (e) {}
        });
    };
    this.fn_insert_overlay = function () {
        $g_overlay = $('<div id="cloudHQ_overlay" class="ui-widget-overlay" style="z-index: 9999;"></div>').hide();
        $("body").append($g_overlay);
    };
    this.fn_insert_notif_error_win = function () {
        $("body").append('<div id="cloudHQ_notif_win_msg" style="display:none;">' + '<div id="cloudHQ_notif_win_msg_content">' + "<span>" + "TESt1 <br/>" + "TEST2" + "</span>" + "</div>" + "</div>" + "</div>");
        $("body").append('<div id="cloudHQ_error_win_msg" style="display:none;">' + '<div id="cloudHQ_error_win_msg_content">' + "<span>" + "TEST1 <br/>" + "TEST2" + "</span>" + "</div>" + "</div>" + "</div>");
        $("#cloudHQ_notif_win_msg_content").bind("click", function () {
            c_cmn.fn_notif_win(false);
        });
        $("#cloudHQ_error_win_msg_content").bind("click", function () {
            c_cmn.fn_error_win(false);
        });
    };
    this.fn_notif_win = function (display_flag, msg, display_timeout) {
        $("#cloudHQ_error_win_msg").hide();
        g_error_win = null;
        if (display_flag == true) {
            $("#cloudHQ_notif_win_msg").hide();
            g_notif_win = null;
            $("#cloudHQ_notif_win_msg_content").html(msg);
            $("#cloudHQ_notif_win_msg").show();
            if (display_timeout != null) {
                if (g_notif_win == null) {
                    g_notif_win = setTimeout(function () {
                        $("#cloudHQ_notif_win_msg").hide();
                        g_notif_win = null;
                    }, display_timeout);
                }
            }
        } else {
            $("#cloudHQ_notif_win_msg").hide();
            g_notif_win = null;
        }
    };
    this.fn_error_win = function (display_flag, msg, display_timeout) {
        $("#cloudHQ_notif_win_msg").hide();
        g_notif_win = null;
        if (display_flag == true) {
            $("#cloudHQ_error_win_msg").hide();
            g_error_win = null;
            $("#cloudHQ_error_win_msg_content").html(msg);
            $("#cloudHQ_error_win_msg").show();
            if (display_timeout != null) {
                if (g_error_win == null) {
                    g_error_win = setTimeout(function () {
                        $("#cloudHQ_error_win_msg").hide();
                        g_notif_win = null;
                    }, display_timeout);
                }
            }
        } else {
            $("#cloudHQ_error_win_msg").hide();
            g_error_win = null;
        }
    };
};
window.FileBrowser = function (el, g_server_url, services, callback) {
    var service_list = null;
    var main_el = null;
    var navi_bar = null;
    var active_xhr = null;
    var history = [];
    var browser = null;
    var that = this;

    function abort_active_xhr() {
        if (active_xhr && active_xhr.readyState != 4) {
            active_xhr.abort();
        }
    }

    function find_service(what) {
        for (var i = 0; i < services.length; i++) {
            if (services[i]["what"] == what) {
                return services[i];
            }
        }
    }

    function set_title(title) {
        navi_bar.find(".navi-title").text(title);
    }

    function create_browser(handler) {
        main_el.empty();
        history = [];
        var browser = $('<div class="browser"></div>').appendTo(main_el);
        var container = $('<div class="browser-container"></div>').appendTo(browser);
        var root = $('<div class="browser-root"></div>').appendTo(container);
        browser.drilldown({
            speed: 100,
            handleAction: handler,
            cssClass: {
                container: "browser-container",
                root: "browser-root",
                sub: "browser-sub",
                back: "browser-back"
            }
        });
        that.browser = browser;
        return browser;
    }

    function show_splash(title, html) {
        var splash = $('<div class="main-splash"></div>');
        main_el.empty();
        main_el.append(splash);
        splash.html(html);
        if (title) {
            set_title(title);
        }
        return splash;
    }

    function hide_splash() {
        main_el.find(".main-splash").remove();
    }

    function browser_loading(show) {
        var browser = that.browser;
        if (browser) {
            if (show) {
                main_el.addClass("loading");
                browser.hide();
            } else {
                main_el.removeClass("loading");
                browser.show();
            }
        }
    }

    function create_service_dir(service) {
        abort_active_xhr();
        if (service["services"] && service["services"].length > 0) {
            var ul = $("<ul></ul>");
            var browser = create_browser(function (action, e, trigger, next) {
                var li = trigger.closest("li");
                var ul = li.closest("ul");
                var obj = li.data("obj");
                var that = this;
                ul.find("li").removeClass("checked");
                if (action == "down" && obj) {
                    browser_loading(true);
                    history.push(obj);
                    cloudhq_dir(obj, function (state, items) {
                        browser_loading(false);
                        var ul = trigger.next("ul");
                        if (state == "success") {
                            set_title(obj["title_no_html"]);
                            create_list(ul, items, {
                                has_back: true
                            });
                            next.call(that);
                        }
                    });
                } else {
                    if (action == "up") {
                        history.pop();
                        if (history.length > 0) {
                            set_title(history[history.length - 1]["title_no_html"]);
                        } else {
                            set_title(service["what_nice"]);
                        }
                        next.call(that);
                    }
                }
            });
            browser.find(".browser-root").append(ul);
            set_title(service["what_nice"]);
            create_list(ul, service["services"]);
        } else {
            var html = $("<div></div>");
            var a = $('<a href="#" onclick="return false;">Add ' + service["what_nice"] + " Account</a>").click(function () {
                window.location = g_server_url + "main_services/add/" + service["what"] + "?next_page=" + encodeURIComponent(window.location.href) + "&auto_click=1&chrome_extension_callback=file_browser";
            });
            html.append('<p class="muted">You haven\'t added your ' + service["what_nice"] + " account yet!</p>");
            html.append(a);
            show_splash(service["what_nice"], html);
        }
        return ul;
    }

    function create_list(ul, items, params) {
        params = $.extend({
            has_back: false
        }, params || {});
        ul.empty();
        if (params.has_back) {
            var li = $('<li class="browser-back"><a href="#" onclick="return false;">&laquo; Back</a></li>');
            li.append('<i class="img"></i>');
            ul.append(li);
        }
        $.each(items, function (i, item) {
            var li = $("<li></li>").data("obj", item);
            li.append('<i class="img"></i>');
            if (item["is_folder"]) {
                var a = $('<a href="#" onclick="return false;"></a>').appendTo(li);
                a.text(item["title_no_html"]);
                li.addClass("is-folder").append('<ul class="browser-sub"></ul>');
            } else {
                var span = $('<span style="cursor:default"></span>').appendTo(li);
                span.text(item["title_no_html"]);
            }
            if (!item["is_root"]) {
                li.click(function (e) {
                    var target = $(e.target);
                    var targetLi = $(this).closest("li");
                    if (!target.is("a")) {
                        var obj = targetLi.data("obj");
                        var service = find_service(obj["what"]);
                        if ((obj["is_folder"] && service["can_share_folder"]) || (!obj["is_folder"] && service["can_share_file"])) {
                            targetLi.toggleClass("checked");
                        }
                    }
                });
            }
            li.mouseenter(function () {
                $(this).closest("li").addClass("hover");
            });
            li.mouseleave(function () {
                $(this).closest("li").removeClass("hover");
            });
            li.appendTo(ul);
        });
    }

    function cloudhq_dir(obj, next) {
        var that = this;
        abort_active_xhr();
        active_xhr = $.ajax({
            type: "POST",
            url: g_server_url + "main_cloud_fs_interface/cloudhq_dir",
            dataType: "json",
            data: {
                "obj": $.toJSON(obj),
                "file_flag": $.toJSON(true)
            },
            async: true,
            success: function (res, t, x) {
                if (res.error) {
                    next.call(that, "error", res, t, x);
                } else {
                    var items = $.map(res, function (item, i) {
                        return item["metadata"];
                    });
                    items.sort(function (a, b) {
                        var a1 = !a["is_folder"] * 1 + "_" + a["title_no_html"].toLowerCase();
                        var b1 = !b["is_folder"] * 1 + "_" + b["title_no_html"].toLowerCase();
                        if (a1 == b1) {
                            return 0;
                        }
                        return a1 > b1 ? 1 : -1;
                    });
                    next.call(that, "success", items, t, x);
                }
            },
            error: function (res, t, x) {
                next.call(that, "error", res, t, x);
            }
        });
    }

    function cloudhq_refresh(obj, next) {
        var that = this;
        abort_active_xhr();
        active_xhr = $.ajax({
            type: "POST",
            url: g_server_url + "main_cloud_fs_interface/refresh_cloudhq_dir",
            dataType: "json",
            data: {
                "obj": $.toJSON(obj)
            },
            async: true,
            success: function (res, t, x) {
                if (res.error) {
                    next.call(that, "error", res, t, x);
                } else {
                    next.call(that, "success", res, t, x);
                }
            },
            failure: function (res, t, x) {
                next.call(that, "error", res, t, x);
            }
        });
    }

    function fn_init() {
        var el_wrapper = $('<div class="file-browser"></div>').appendTo(el);
        $.ajax({
            type: "POST",
            url: g_server_url + "main_cloud_fs_interface/cloudhq_init",
            dataType: "json",
            data: {
                "raise_authorization_error_flag": false
            },
            async: true,
            success: function (res, t, x) {
                callback.call(that);
                if (res.error) {} else {
                    var el_left = $('<div class="left-side"></div>').appendTo(el_wrapper);
                    var el_left_header = $('<div class="left-header"></div>').appendTo(el_left);
                    navi_bar = $('<div class="navi-bar"><span class="navi-title"></span></div>').appendTo(el_wrapper);
                    main_el = $('<div class="main"><div class="browser"></div></div>').appendTo(el_wrapper);
                    service_list = $('<ul class="service-list"></ul>').appendTo(el_left);
                    var el_left_links = $('<div class="left-bottom"></div>').appendTo(el_left);
                    $('<a target="_blank">Add Cloud Accounts</a>').attr("href", g_server_url + "main_services/select_services_to_add").appendTo(el_left_links);
                    $('<a target="_blank" class="brand"></a>').attr("href", g_server_url).appendTo(el_left_header);
                    $('<a class="btn-refresh" href="#" onclick="return false;"></a>').click(function () {
                        var obj = fn_get_selected_parent_obj();
                        if (obj) {
                            browser_loading(true);
                            cloudhq_refresh(obj, function (status, res) {
                                if (status == "success") {
                                    cloudhq_dir(obj, function (state, items) {
                                        browser_loading(false);
                                        var ul = main_el.find("ul.browser-root");
                                        create_list(ul, items, {
                                            has_back: true
                                        });
                                    });
                                } else {
                                    browser_loading(false);
                                }
                            });
                        }
                    }).attr("title", "Refresh folder").prependTo(navi_bar);
                    $.each(services, function (i, service) {
                        service["services"] = [];
                        $.each(res, function (i, obj) {
                            var md = obj["metadata"];
                            var what = md["what"];
                            if (service["what"] == what) {
                                service["services"].push(md);
                            }
                        });
                    });
                    $.each(services, function (k, v) {
                        var li = $("<li></li>");
                        var a = $('<a href="#" onclick="return false;" class="icon icon-' + v["what"] + '"></a>').appendTo(li);
                        a.css("display", "block");
                        a.text(v["what_nice"]);
                        a.click(function () {
                            create_service_dir(v);
                            service_list.find("a.selected").removeClass("selected");
                            a.addClass("selected");
                        });
                        li.appendTo(service_list);
                    });
                    var html = $('<div><p class="muted">Pick a cloud app from a list on the left.</p></div>');
                    show_splash("", html);
                }
            },
            error: function (response, t, x) {
                callback.call(that);
            }
        });
    }

    function fn_get_selected_objs() {
        var objs = [];
        main_el.find("ul.browser-root > li.checked").each(function (i, el) {
            objs.push($(el).data("obj"));
        });
        return objs;
    }

    function fn_get_selected_parent_obj() {
        if (history.length > 0) {
            return history[history.length - 1];
        }
        return null;
    }
    fn_init();
    return {
        getSelected: fn_get_selected_objs,
        getSelectedParent: fn_get_selected_parent_obj
    };
};

function addJavascript(jsname) {
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	//s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}

function fn_is_early_adopter() {
    return true;
}

function fn_get_query_string_by_name(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return "";
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function fn_get_redirect_url(params) {
    var url = window.location.href;
    url = url.split(/[?#]/)[0];
    if (params) {
        var qs = [];
        $.each(params, function (key, value) {
            qs.push(key + "=" + encodeURIComponent(value));
        });
        url = url + "?" + qs.join("&");
    }
    url = url + window.location.hash;
    return url;
}

function fn_get_state_from_local_storage(next_step) {
    chrome.storage.sync.get(g_key_for_local_storage, function (obj) {
        if (obj && obj[g_key_for_local_storage]) {
            if (typeof obj[g_key_for_local_storage]["g_do_not_show_get_started_splash_screen"] !== "undefined") {
                g_do_not_show_get_started_splash_screen = obj[g_key_for_local_storage]["g_do_not_show_get_started_splash_screen"];
            }
            if (typeof obj[g_key_for_local_storage]["g_draft_ids_per_thread_id"] !== "undefined") {
                g_draft_ids_per_thread_id = obj[g_key_for_local_storage]["g_draft_ids_per_thread_id"];
            }
            if (typeof obj[g_key_for_local_storage]["g_channel_notifications_per_channel_id"] !== "undefined") {
                g_channel_notifications_per_channel_id = obj[g_key_for_local_storage]["g_channel_notifications_per_channel_id"];
            }
            if (typeof obj[g_key_for_local_storage]["g_autoexpand_flag"] !== "undefined") {
                g_autoexpand_flag = obj[g_key_for_local_storage]["g_autoexpand_flag"];
            }
            if (typeof obj[g_key_for_local_storage]["g_do_not_show_smart_labels_splash_screen"] !== "undefined") {
                g_do_not_show_smart_labels_splash_screen = obj[g_key_for_local_storage]["g_do_not_show_smart_labels_splash_screen"];
            }
            if (typeof obj[g_key_for_local_storage]["g_do_not_show_schedule_email_splash_screen"] !== "undefined") {
                g_do_not_show_schedule_email_splash_screen = obj[g_key_for_local_storage]["g_do_not_show_schedule_email_splash_screen"];
            }
            if (typeof obj[g_key_for_local_storage]["g_do_not_show_docit_buttons"] !== "undefined") {
                g_do_not_show_docit_buttons = obj[g_key_for_local_storage]["g_do_not_show_docit_buttons"];
            }
            if (typeof obj[g_key_for_local_storage]["g_do_not_show_suggested_autolabels"] !== "undefined") {
                g_do_not_show_suggested_autolabels = obj[g_key_for_local_storage]["g_do_not_show_suggested_autolabels"];
            }
            if (typeof obj[g_key_for_local_storage]["g_do_not_show_notes_splash_screen"] !== "undefined") {
                g_do_not_show_notes_splash_screen = obj[g_key_for_local_storage]["g_do_not_show_notes_splash_screen"];
            }
            console.log("fn_get_state_from_local_storage: g_autoexpand_flag=" + g_autoexpand_flag);
            console.log("fn_get_state_from_local_storage: g_do_not_show_get_started_splash_screen=" + g_do_not_show_get_started_splash_screen);
            console.log("fn_get_state_from_local_storage: g_draft_ids_per_thread_id=" + JSON.stringify(g_draft_ids_per_thread_id).toString());
            console.log("fn_get_state_from_local_storage: g_do_not_show_smart_labels_splash_screen=" + JSON.stringify(g_do_not_show_smart_labels_splash_screen).toString());
            console.log("fn_get_state_from_local_storage: g_do_not_show_schedule_email_splash_screen=" + JSON.stringify(g_do_not_show_schedule_email_splash_screen).toString());
            console.log("fn_get_state_from_local_storage: g_do_not_show_docit_buttons=" + JSON.stringify(g_do_not_show_docit_buttons).toString());
            console.log("fn_get_state_from_local_storage: g_do_not_show_suggested_autolabels=" + JSON.stringify(g_do_not_show_suggested_autolabels).toString());
            console.log("fn_get_state_from_local_storage: g_do_not_show_notes_splash_screen=" + JSON.stringify(g_do_not_show_notes_splash_screen).toString());
        }
        if (next_step) {
            next_step();
        }
    });
}

function fn_save_state_to_local_storage(next_step) {
    var data_to_store = {};
    data_to_store[g_key_for_local_storage] = {
        "g_do_not_show_get_started_splash_screen": g_do_not_show_get_started_splash_screen,
        "g_draft_ids_per_thread_id": g_draft_ids_per_thread_id,
        "g_channel_notifications_per_channel_id": g_channel_notifications_per_channel_id,
        "g_autoexpand_flag": g_autoexpand_flag,
        "g_do_not_show_smart_labels_splash_screen": g_do_not_show_smart_labels_splash_screen,
        "g_do_not_show_schedule_email_splash_screen": g_do_not_show_schedule_email_splash_screen,
        "g_do_not_show_docit_buttons": g_do_not_show_docit_buttons,
        "g_do_not_show_suggested_autolabels": g_do_not_show_suggested_autolabels,
        "g_do_not_show_notes_splash_screen": g_do_not_show_notes_splash_screen
    };
    chrome.storage.sync.set(data_to_store, function () {
        if (next_step) {
            next_step();
        }
    });
    console.log("fn_save_state_to_local_storage: g_autoexpand_flag=" + g_autoexpand_flag);
    console.log("fn_save_state_to_local_storage: g_do_not_show_get_started_splash_screen=" + g_do_not_show_get_started_splash_screen);
    console.log("fn_save_state_to_local_storage: g_channel_notifications_per_channel_id=" + JSON.stringify(g_channel_notifications_per_channel_id).toString());
    console.log("fn_save_state_to_local_storage: g_draft_ids_per_thread_id=" + JSON.stringify(g_draft_ids_per_thread_id).toString());
    console.log("fn_save_state_to_local_storage: g_do_not_show_smart_labels_splash_screen=" + JSON.stringify(g_do_not_show_smart_labels_splash_screen).toString());
    console.log("fn_save_state_to_local_storage: g_do_not_show_schedule_email_splash_screen=" + JSON.stringify(g_do_not_show_schedule_email_splash_screen).toString());
    console.log("fn_save_state_to_local_storage: g_do_not_show_docit_buttons=" + JSON.stringify(g_do_not_show_docit_buttons).toString());
    console.log("fn_save_state_to_local_storage: g_do_not_show_suggested_autolabels=" + JSON.stringify(g_do_not_show_suggested_autolabels).toString());
    console.log("fn_save_state_to_local_storage: g_do_not_show_notes_splash_screen=" + JSON.stringify(g_do_not_show_notes_splash_screen).toString());
}

/*function fn_create_popup(html, direction) {
    var popup = $('<div class="popover ' + direction + '"><div class="arrow"></div></div>');
    var btn_close = $('<div class="close">&times;</div>').appendTo(popup).click(function () {
        fn_save_state_to_local_storage();
        popup.remove();
    });
    var content = $('<div class="popover-content"></div>').appendTo(popup);
    $(html).appendTo(content);
    return popup;
}*/

function fn_get_compose_view_el(compose_view) {
    return $(compose_view.getBodyElement()).closest(".inboxsdk__compose");
}

function fn_display_error_butter_bar() {
    if (g_misc_modal_view) {
        try {
            g_misc_modal_view.close();
        } catch (err) {}
    }
    g_sdk.ButterBar.showMessage({
        text: "Temporary Error. Please refresh your browser.",
        messageKey: "cloudHQ_butter_1"
    });
}

function fn_close_misc_dialog() {
    if (g_misc_modal_view) {
        try {
            g_misc_modal_view.close();
        } catch (err) {}
    }
}

function fn_display_misc_dialog(text_dialog, dialog_title, text_butter, add_ok_button_flag) {
    fn_close_misc_dialog();
    if (add_ok_button_flag) {
        buttons = [{
            text: "OK",
            string: "OK",
            onClick: function () {
                modal_view.close();
            }
        }];
    } else {
        buttons = null;
    }
    if (g_misc_modal_view) {
        try {
            g_misc_modal_view.close();
        } catch (err) {}
    }
    modal_view = g_sdk.Widgets.showModalView({
        el: $('<div id="div_for_misc_dialog" style="width: 400px; height: auto">' + text_dialog + "</div>").get(0),
        title: dialog_title,
        buttons: buttons
    });
    if (text_butter) {
        g_sdk.ButterBar.showMessage({
            text: text_butter,
            messageKey: "cloudHQ_butter_1"
        });
    }
    g_misc_modal_view = modal_view;
    return modal_view;
}

function fn_show_inbox_modal_for_signup(options) {
    var modal_view;
    options = $.extend({
        id: "chq_dialog_" + (new Date().getTime()),
        title: "cloudHQ",
        content: "",
        buttons: []
    }, options);
    var el = $('<div id="div_for_login_or_signup_dialog" style="width: auto; height: auto"></div>');
    var contentstr = options["content"];
    var regexone = /(<h1>)[^\<]*<(\/h1>)/;
    var regextwo = /(\/header>)[^\<]*</;
    var regexthree = /(<small>)[^]*(<\/small>)/;
    contentstr = contentstr.replace(regexone,'$1<$2');
    contentstr = contentstr.replace(regextwo,'$1<');
    contentstr = contentstr.replace(regexthree,'$1$2');
    el.html(contentstr);
    var buttons = [];
    if (g_misc_modal_view) {
        try {
            g_misc_modal_view.close();
        } catch (err) {}
    }
    modal_view = g_sdk.Widgets.showModalView({
        el: el.get(0)
    });
    $("#cloudHQ_signup_btn").click(function () {
        var form = $("#cloudHQ_signup_form");
        form.submit();
    });
    $("#cloudHQ_do_not_show_spash_screen_checkbox").unbind("click").bind("click", function (event) {
        if ($("#cloudHQ_do_not_show_spash_screen_checkbox").is(":checked")) {
            g_do_not_show_get_started_splash_screen = true;
            fn_save_state_to_local_storage();
            modal_view.close();
        }
    });
    return modal_view;
}

function fn_show_inbox_modal(options) {
    var modal_view;
    options = $.extend({
        id: "chq_dialog_" + (new Date().getTime()),
        title: "cloudHQ",
        content: "",
        buttons: []
    }, options);
    var el = $('<div id="' + options.id + '" style="width: auto; height: auto; ' + options.css + '"></div>');
    el.html(options["content"]);
    var buttons = [];
    $.each(options["buttons"], function (e) {
        var button = this;
        if (button["action"] == "SUBMIT") {
            button["onClick"] = function () {
                var selector = button.form_id ? ("#" + button.form_id) : "form";
                var form = $("#" + options.id).find(selector);
                if (button["butter_message"]) {
                    g_sdk.ButterBar.showMessage({
                        text: button["butter_message"],
                        messageKey: "cloudHQ_butter_1"
                    });
                } else {
                    if (button["modal_message"]) {
                        fn_display_misc_dialog('<div style="width: 400px"><center>' + '' + "</center></div>", "", null);
                    }
                }
                if (button.ajax == true) {
                    $.ajax({
                        type: form.attr("method"),
                        url: form.attr("action"),
                        data: form.serialize(),
                        success: function (res) {
                            if (options && $.isFunction(options.ajaxSuccess)) {
                                options.ajaxSuccess.call(this, button, res);
                            }
                        },
                        failure: function (res) {
                            if (options && $.isFunction(options.ajaxFailure)) {
                                options.ajaxFailure.call(this, button, res);
                            }
                        }
                    });
                } else {
                    form.submit();
                    fn_display_misc_dialog('<div style="width: 400px"><center>Working... <br/>(might take a few seconds)</center></div>', "", null);
                }
                modal_view.close();
            };
        } else {
            if (button["action"] == "CLOSE_DIALOG") {
                button["onClick"] = function () {
                    modal_view.close();
                };
            } else {
                if (button["action"] == "LINK") {
                    button["onClick"] = function () {
                        window.location = button["url"];
                    };
                } else {
                    if (button["action"] == "CALL") {
                        button["onClick"] = function () {
                            button["function_to_call"]();
                            modal_view.close();
                        };
                    } else {
                        button["onClick"] = function () {
                            if (options.onButtonClicked) {
                                options.onButtonClicked.call(modal_view, button);
                            }
                        };
                    }
                }
            }
        }
        buttons.push(button);
    });
    if (g_misc_modal_view) {
        try {
            g_misc_modal_view.close();
        } catch (err) {}
    }
    modal_view = g_sdk.Widgets.showModalView({
        title: options["title"],
        el: el.get(0),
        buttons: buttons
    });
    return modal_view;
}

function fn_display_inbox_modal_info(modal_el, text, params) {
    var p = $.extend({
        timeout: 6000,
        color: "#666"
    }, params || {});
    var c = $(modal_el).closest(".inboxsdk__modal_content");
    var b = c.next(".inboxsdk__modal_buttons");
    var i = $('<span class="modal_buttons_text" style="float:right;font-size:12px;color:' + p["color"] + ';line-height: 29px"></span>');
    b.find(".modal_buttons_text").remove();
    i.text(text);
    i.prependTo(b);
    window.setTimeout(function () {
        i.remove();
    }, p["timeout"] * 1);
}

function fn_display_invitation_dialog() {
    $.ajax({
        type: "GET",
        url: g_server_url + "main_share/chrome_extension_invitation_dialog",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1"
        },
        async: true,
        success: function (response, t, x) {
            if (!response || (response && response["error"])) {
                fn_display_error_butter_bar();
            } else {
                fn_show_inbox_modal($.extend(response, {
                    id: "div_for_invitation_dialog"
                }));
            }
        },
        error: function (response, t, x) {
            fn_display_error_butter_bar();
        }
    });
}

/*function fn_display_share_label_dialog(selected_label_name, options) {
    if (!g_logged_in) {
        fn_check_login_and_signup_dialog_if_needed();
        return;
    }
    options = $.extend({
        show_as_splash_screen: true,
        skip_no_labels_screen: false
    }, options || {});
    var show_as_splash_screen = (options["show_as_splash_screen"] == true) ? "1" : "0";
    var skip_no_labels_screen = (options["skip_no_labels_screen"] == true) ? "1" : "0";
    var timeout = window.setTimeout(function () {
        g_sdk.ButterBar.showMessage({
            text: "Loading Label Sharing Dialog... ",
            messageKey: "cloudHQ_butter_1",
            time: 30000
        });
    }, 1250);
    var contact_list = fn_get_label_contacts(selected_label_name);
    $.ajax({
        type: "GET",
        url: g_server_url + "main_share/chrome_extension_share_label_dialog",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1",
            "selected_label_name": selected_label_name,
            "show_as_splash_screen": show_as_splash_screen,
            "skip_no_labels_screen": skip_no_labels_screen,
            "return_url": fn_get_redirect_url()
        },
        async: true,
        success: function (response, t, x) {
            c_cmn.fn_log("fn_display_share_label_dialog: response:" + response);
            if (!response || (response && response["error"])) {
                fn_display_error_butter_bar();
            } else {
                if (timeout != null) {
                    try {
                        window.clearTimeout(timeout);
                    } catch (err) {}
                }
                g_sdk.ButterBar.hideMessage("cloudHQ_butter_1");
                var modal = fn_show_inbox_modal($.extend(response, {
                    id: "div_for_login_or_signup_dialog"
                }));
                if (response["event"] == "share_new_no_labels") {
                    $(".inboxsdk__modal_container .inboxsdk__modal_buttons .inboxsdk__button").click(function () {
                        modal.close();
                        fn_display_share_label_dialog(null, {
                            skip_no_labels_screen: true
                        });
                    });
                    return;
                }
                shared_with = response["shared_with"] || [];
                var suggested_contacts = [];
                var suggested_contacts_emails = [];
                for (var i = 0; i < contact_list.length; i++) {
                    var email_addr = contact_list[i].emailAddress;
                    if (shared_with.indexOf(email_addr) < 0) {
                        suggested_contacts.push({
                            id: email_addr,
                            name: contact_list[i].name
                        });
                        suggested_contacts_emails.push(email_addr);
                    }
                }
                if (g_email_suggestions) {
                    for (var i = 0; i < g_email_suggestions.length; i++) {
                        var email_addr = g_email_suggestions[i].id;
                        if (shared_with.indexOf(email_addr) < 0 && suggested_contacts_emails.indexOf(g_email_suggestions[i].id) < 0) {
                            suggested_contacts.push(g_email_suggestions[i]);
                        }
                    }
                }
                var inputToken = $("#div_for_login_or_signup_dialog #token_input").tokenInput(suggested_contacts, {
                    hintText: "",
                    noResultsText: "",
                    searchingText: "Enter email address",
                    theme: "gmail",
                    preventDuplicates: true,
                    animateDropdown: false,
                    autoSelectFirstResult: true,
                    tokenDelimiter: ",",
                    propertyToSearch: "id",
                    useCache: false,
                    searchDelay: 100,
                    resultsLimit: 5,
                    resultsFormatter: function (item) {
                        if (item.name == item.id) {
                            return "<li><div>" + item.id + "</div></li>";
                        } else {
                            return "<li><div>" + item.name + '</div><div class="muted">' + item.id + "</div></li>";
                        }
                    },
                    onResult: function (results) {
                        function validateEmail(email) {
                            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                            return re.test(email);
                        }
                        var val = $("#div_for_login_or_signup_dialog #token-input-token_input").val();
                        if (validateEmail(val)) {
                            results.push({
                                id: val,
                                name: val
                            });
                        }
                        return results;
                    }
                });
                var input = $("#div_for_login_or_signup_dialog input[name=target_label_name]");
                input.bind("change", function () {
                    window.setTimeout(function () {
                        if ($.trim($(input).val()) == "") {
                            select.focus();
                        } else {
                            select.val("");
                        }
                    }, 250);
                });
                var select = $("#div_for_login_or_signup_dialog select[name=target_dir]");
                select.bind("change", function () {
                    window.setTimeout(function () {
                        if ($.trim($(select).val()) == "") {
                            input.focus();
                        } else {
                            input.val("");
                        }
                    }, 150);
                });
            }
        },
        error: function (response, t, x) {
            fn_check_login_and_signup_dialog_if_needed();
        }
    });
}*/

function fn_display_tutorial_dialog() {
    $.ajax({
        type: "GET",
        url: g_server_url + "main_share/chrome_extension_tutorial_dialog",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1",
            "return_url": fn_get_redirect_url()
        },
        async: true,
        success: function (response, t, x) {
            c_cmn.fn_log("fn_display_tutorial_dialog: response:" + response);
            if (!response || (response && response["error"])) {
                fn_display_error_butter_bar();
            } else {
                g_sdk.ButterBar.hideMessage("cloudHQ_butter_1");
                var modal = fn_show_inbox_modal($.extend(response, {
                    title: null,
                    id: "div_for_tutorial_dialog"
                }));
                $(".inboxsdk__modal_container .inboxsdk__modal_buttons .inboxsdk__button").click(function () {
                    fn_display_misc_dialog('<div style="width: 400px"><center>Working... <br/>(might take a few seconds)</center></div>', "", null);
                    modal.close();
                    fn_display_share_label_dialog(null, {
                        show_as_splash_screen: true
                    });
                });
                $(".inboxsdk__modal_container .inboxsdk__modal_buttons").prepend($('<div style="float:right;font-size:11px;margin-top:10px"></div>').append('<input type="checkbox" id="tutorial_dialog_do_not_show" style="vertical-align: bottom;" /> ').change(function () {
                    var el = $("#div_for_tutorial_dialog");
                    var value = $("#tutorial_dialog_do_not_show").is(":checked") ? "1" : "0";
                    $.ajax({
                        type: "GET",
                        url: g_server_url + "main_share/chrome_extension_share_label_dialog_show_tutorial_dialog",
                        dataType: "json",
                        data: {
                            "do_not_show": value
                        }
                    });
                }).append('<label for="tutorial_dialog_do_not_show">Do not show this dialog again</label>'));
            }
        },
        error: function (response, t, x) {
            fn_check_login_and_signup_dialog_if_needed();
        }
    });
}
g_observer_for_share_buttons_list = [];
g_observer_for_share_buttons_2 = null;
g_css_search_for_label_actions_wapper_div = ".aeH";
g_css_search_for_label_actions_container_div = ".Cq.aqL";
g_css_search_for_div_with_button_in_label_actions_container = ".G-Ni.J-J5-Ji";

function fn_handle_cloudHQ_autosave_impl() {
    if (!g_logged_in) {
        fn_check_login_and_signup_dialog_if_needed();
        return;
    }
    c_cmn.fn_log("fn_handle_cloudHQ_autosave_button: ENTERING");
    fn_display_misc_dialog('<div style="width: 400px"><center>Loading... <br/>(might take a few seconds)</center></div>', "", null);
    $.ajax({
        type: "GET",
        url: g_server_url + "main_share/chrome_extension_autosave_dialog",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1"
        },
        async: true,
        success: function (response, t, x) {
            c_cmn.fn_log("fn_handle_cloudHQ_autosave_impl: response:" + JSON.stringify(response));
            if (!response || (response && response["error"])) {
                fn_close_misc_dialog();
                fn_check_login_and_signup_dialog_if_needed();
            } else {
                g_sdk.ButterBar.hideMessage("cloudHQ_butter_1");
                fn_show_inbox_modal($.extend(response, {
                    id: "div_for_rename_subject"
                }));
            }
        },
        error: function (response, t, x) {
            fn_close_misc_dialog();
            fn_check_login_and_signup_dialog_if_needed();
        }
    });
    c_cmn.fn_log("fn_handle_cloudHQ_autosave_impl: EXITING");
}

function fn_insert_cloudHQ_autosave_button_impl(parent_div) {
    var btn = parent_div.find(".sync_via_cloudHQ_button");
    if (btn.length < 1) {
        btn = $('<div class="G-Ni J-J5-Ji sync_via_cloudHQ_button">' + '<div class="T-I J-J5-Ji lS T-I-ax7 ar7">' + '<span class="crystal-import-toolbar-button" data-status="ready" data-reactid=".r">' + "<span>Save emails and attachments</span>" + "</span>" + "</div>" + "</div>").bind("click", function () {
            fn_handle_cloudHQ_autosave_impl();
        });
        parent_div.find(g_css_search_for_div_with_button_in_label_actions_container).last().after(btn);
    } else {
        if (!btn.is(":visible")) {
            btn.show();
        }
    }
}

/*function fn_insert_cloudHQ_share_button_impl(parent_div) {
    c_cmn.fn_log("fn_insert_cloudHQ_share_button_impl: ENTERING");
    var href_value = document.location.href;
    var btn = parent_div.find(".share_via_cloudHQ_button");
    if (href_value.match(/#label/) && g_logged_in && !href_value.match(/#search/)) {} else {
        if (btn.length < 1) {
            btn = $('<div class="G-Ni J-J5-Ji share_via_cloudHQ_button">' + '<div class="T-I J-J5-Ji lS T-I-ax7 ar7">' + '<span class="crystal-import-toolbar-button" data-status="ready" data-reactid=".r">' + "<span>Share label</span>" + "</span>" + "</div>" + "</div>").bind("click", function () {
                fn_display_misc_dialog('<div style="width: 300px"><center>Loading...</center></div>', "", null);
                var href_value = window.location.hash;
                var selected_label_name = decodeURI(href_value.replace(/.*#label\//, "")).replace(/^\//, "").replace(/\+/g, " ");
                if (g_logged_in) {
                    fn_display_share_label_dialog(selected_label_name);
                } else {
                    fn_check_login_and_signup_dialog_if_needed();
                }
                return false;
            });
            parent_div.find(g_css_search_for_div_with_button_in_label_actions_container).last().after(btn);
            btn = parent_div.find(".share_via_cloudHQ_button");
        } else {
            if (!btn.is(":visible")) {
                btn.show();
            }
        }
    }
    if (btn.length > 0) {
        if (g_observer_for_share_buttons_2) {
            g_observer_for_share_buttons_2.disconnect();
        }
        g_observer_for_share_buttons_2 = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                invalidate_buttons();
            });
        });
        g_observer_for_share_buttons_2.observe(btn.get(0), {
            attributes: true
        });
    }
    c_cmn.fn_log("fn_insert_cloudHQ_share_button_impl: EXITING");
}*/
var g_css_search_for_label_menu_wapper_div = ".aj9.pp";

/*function fn_insert_cloudHQ_menu_impl() {
    if (!fn_is_ext_enabled("shared_labels")) {
        return;
    }
    c_cmn.fn_log("fn_insert_cloudHQ_menu_impl: ENTERING");
    if ($(g_css_search_for_label_menu_wapper_div).find("#share_via_cloudHQ").length < 1) {
        c_cmn.fn_log("fn_insert_cloudHQ_menu_impl: menu detected");
        $(g_css_search_for_label_dropdown).each(function () {
            var elSeparator = $(this).find(".J-Kh").first();
            elSeparator.after('<div class="J-N" style="padding-top:2px; padding-bottom:2px"><img style="margin-left:-21px;height:16px;width:60px" src="' + g_server_url + "images/logo_no_tag_line.png" + '"></div>' + '<div id="share_via_cloudHQ"  class="J-N" role="menuitem" aria-hidden="false" style="-webkit-user-select: none;"><div class="J-N-Jz">Share Label ...</div></div>' + '<div class="J-Kh" aria-disabled="true" role="separator" id=":od" aria-hidden="false" style="-webkit-user-select: none;"></div>');
        });
        $("#share_via_cloudHQ").hover(function () {
            $(this).addClass("J-N-JT");
        }, function () {
            $(this).removeClass("J-N-JT");
        });
        $("#share_via_cloudHQ").unbind("click").bind("click", function () {
            fn_display_misc_dialog('<div style="width: 300px"><center>Loading...</center></div>', "", null);
            var selected_label_elem = $(".cloudHQ-label-selected");
            var selected_label_name = "";
            if (selected_label_elem.length > 0) {
                var label_a_elem = $(".cloudHQ-label-selected").find(".J-Ke.n0");
                var href_value = label_a_elem.attr("href");
                selected_label_name = decodeURI(href_value.replace(/.*#label\//, "")).replace(/^\//, "").replace(/\+/g, " ");
            }
            if (selected_label_name.match("/")) {
                var target_dir = "/google_gmail (" + g_email_or_login + ")/" + selected_label_name;
                var url = g_server_url + "share/create?referer=gmail_extension_share_sublabel&target_dir=" + encodeURIComponent(target_dir);
                fn_display_misc_dialog("<b>We strongly suggest not to share sub-labels!</b><br/>When you share a top level label, you will automatically share all sub-labels. But if you really need to share <b>" + selected_label_name + '</b> sublabel <a href="' + url + '">click here to use our wizard on cloudhq.net</a>.', "cloudHQ Label Sharing", "", true);
            } else {
                if (g_logged_in) {
                    fn_display_share_label_dialog(selected_label_name);
                } else {
                    fn_check_login_and_signup_dialog_if_needed();
                }
            }
            return false;
        });
        c_cmn.fn_log("fn_insert_cloudHQ_menu_impl: menu added");
    }
    c_cmn.fn_log("fn_insert_cloudHQ_menu_impl: EXITING");
}*/

function fn_prepend_compose_view_bar(compose_view, options) {
    var options = $.extend({
        el: "<div></div>",
        closable: true
    }, options || {});
    var el_compose = fn_get_compose_view_el(compose_view);
    var el_toolbar = el_compose.find(".aDj > .aDh > .IZ");
    var el_container = el_toolbar.parent();
    var el_status_bar = $('<div class="aDh inboxsdk__compose_statusbar" data-orderhint="0"></div>').css({
        "font-size": "10px",
        "padding": "6px 12px",
        "border-top": "1px solid #cfcfcf",
        "line-height": "20px",
        "overflow": "hidden",
        "height": "auto"
    });
    var methods = {
        el: el_status_bar,
        setElement: function (new_el) {
            this.el.find(".cloudHQ_compose_bar_element").html($(new_el));
            this.refresh();
        },
        getElement: function () {
            return this.el.find(".cloudHQ_compose_bar_element");
        },
        destroy: function () {
            el_status_bar.remove();
            this.refresh();
        },
        refresh: function () {
            el_container.css("height", Math.ceil(el_toolbar.outerHeight() + el_status_bar.outerHeight()) + "px");
        }
    };
    if (options.closable) {
        el_status_bar.prepend($("<div>&times;</div>").css({
            "float": "right",
            "line-height": "20px",
            "width": "20px",
            "cursor": "pointer",
            "color": "#666",
            "font-size": "16px",
            "font-weight": "bolder",
            "text-align": "center"
        }).attr("title", "Do not apply label").click(function () {
            methods.destroy();
        }));
    }
    el_status_bar.append('<div class="cloudHQ_compose_bar_element"></div>');
    el_status_bar.prependTo(el_container);
    methods.setElement(options.el);
    return methods;
}

function fn_handle_cloudHQ_schedule_email_button(compose_view, draft_id_list, message_id_list, schedule_time_utc_as_timestamp, only_if_nobody_replies) {
    if (!g_logged_in) {
        fn_check_login_and_signup_dialog_if_needed();
        return;
    }
    c_cmn.fn_log("fn_handle_cloudHQ_schedule_email_button: ENTERING draft_id_list=" + draft_id_list);
    fn_alert("Scheduling...");
    //fn_display_misc_dialog('<div style="width: 400px"><center>Scheduling...</center></div>');
    $.ajax({
        type: "POST",
        url: g_server_url + "main_share/chrome_extension_schedule_email_ajax",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1",
            "draft_id_list": draft_id_list,
            "message_id_list": message_id_list,
            "schedule_time_utc_as_timestamp": schedule_time_utc_as_timestamp,
            "only_if_nobody_replies": only_if_nobody_replies,
            "gmail_timezone_offset": g_gmail_timezone_offset,
            "gmail_language": g_lang_of_html
        },
        async: true,
        success: function (response, t, x) {
            c_cmn.fn_log("fn_handle_cloudHQ_schedule_email_button: response:" + JSON.stringify(response));
            if (!response || (response && response["error"])) {
                fn_close_misc_dialog();
                fn_alert(respone["error"]);
                //fn_display_misc_dialog('<div style="width: 400px"><center>' + response["error"] + "</center></div>", "ERROR");
            } else {
                fn_alert(response["content"]);
                //fn_display_misc_dialog('<div style="width: 400px"><center>' + response["content"] + "</center></div>", "Success");
                if (compose_view) {
                    if (compose_view.isInlineReplyForm()) {
                        g_sdk.Router.goto(g_sdk.Router.NativeRouteIDs.INBOX);
                    } else {
                        compose_view.close();
                    }
                }
                g_thread_metadata_by_thread_id_cache = null;
                if (g_thread_row_comment_button_list_visible) {
                    fn_create_thread_row_comment_button_list(g_thread_row_comment_button_list_visible);
                }
                return;
            }
        },
        error: function (response, t, x) {
            fn_display_misc_dialog('<div style="width: 400px"><center>Failed to schedule the email. Please try again.<br/>And please email us at support@cloudHQ.net if this error persists.</center></div>', "ERROR");
        }
    });
    c_cmn.fn_log("fn_handle_cloudHQ_schedule_email_button: EXITING");
}

function fn_alert(message) {
      g_sdk.ButterBar.showMessage({
        text: message,
        time: 5000,
        priority: 999
      })
    }
function fn_display_schedule_email_dialog(compose_view, e, is_reply, draft_id_list, message_id_list) {
    $(e.dropdown.el).html('<div style="width: 271px;height:550px"><div class="SK AX"><div class="gmelius_dropdown gmelius_dropdown_conversation gmelius_dropdown_schedule" >' +
                           '<div class="gmelius_helper_text gmelius_pad">Send Message:</div>' +
                            '<ul class="gmelius_preset gmelius_user">'+
                                '<li id="cloudHQ__schedule_time_val1">In 1 hour</li>'+
                                '<li id="cloudHQ__schedule_time_val2">In 2 hours</li>'+
                                '<li id="cloudHQ__schedule_time_val3">In 4 hours</li></ul>'+
                            '<div class="gmelius_hr" role="separator"></div>'+
                            '<ul class="gmelius_preset gmelius_moments">'+
                                '<li id="cloudHQ__schedule_time_val4">Tomorrow morning</li>'+
                                '<li id="cloudHQ__schedule_time_val5">Tomorrow afternoon </li></ul>'+
                            '<div class="gmelius_hr" role="separator"></div>'+
                             '<ul class="gmelius_preset gmelius_moments1">'+
                             '<li id="cloudHQ__schedule_time_val6">In 2 days</li>'+
                             '<li id="cloudHQ__schedule_time_val7">In 4 days</li>'+
                             '<li id="cloudHQ__schedule_time_val8">In 1 Weeks</li>'+
                             '<li id="cloudHQ__schedule_time_val8">In 2 Weeks</li>'+
                             '<li id="cloudHQ__schedule_time_val8">In 1 month</li></ul>'+
                            '<div class="gmelius_hr" role="separator"></div>'+
                            '<div class="gmelius_select_time gmelius_pad" data-primary="1"><i class="material-icons gm_size_18">event</i>' +'<a id="sel_time"> Select date and time'+'</a></div>' + 
                            '<div><input type="datetime-local" id="cloudHQ__schedule_time_local" style="margin:10px 23px 3px 20px" value=""/>'+
                            '<div id="cloudHQ__schedule_email_btn" class="T-I J-J5-Ji ar7 L3 inboxsdk__button T-I-atl" style="margin:10px 23px 3px 100px" role="button"  tabindex="0"><div><span class="inboxsdk__button_text" >Send Later</span></div></div></div>'+
                         '<div style="display:none">'+
                         '<input type="checkbox" id="cloudHQ__only_if_nobody_replies" checked="checked"/> <label for="cloudHQ__only_if_nobody_replies">Snooze only if nobody replies</label>'+"<br/><br/>"+'<input type="text" id="cloudHQ__snooze_note" style="padding: 5px; width: 320px;" placeholder="short note about this snooze"/>'+"<br/><br/>"+
                            "</div></div></div></div>");
    var time_now = new Date();

    $("#cloudHQ__schedule_time_val1").click(function () {
        var time_val1 = new Date();
        time_val1.setDate(time_val1.getDate());
        time_val1.setHours(time_val1.getHours()+1);
        time_val1.setMinutes(0);
        time_val1.setSeconds(0);
        time_val1.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val1.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{ms}");
        return false;
    });

    $("#cloudHQ__schedule_time_val2").click(function () {
        var time_val2 = new Date();
        time_val2.setDate(time_val2.getDate());
        time_val2.setHours(time_val2.getHours()+2);
        time_val2.setMinutes(0);
        time_val2.setSeconds(0);
        time_val2.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val2.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{ms}");
        return false;
    });

    $("#cloudHQ__schedule_time_val3").click(function () {
        var time_val3 = new Date();
        time_val3.setDate(time_val3.getDate()+4);
        time_val3.setHours(8);
        time_val3.setMinutes(0);
        time_val3.setSeconds(0);
        time_val3.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val3.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{ms}");
        return false;
    });

    $("#cloudHQ__schedule_time_val4").click(function () {
        var time_val4 = new Date();
        time_val4.setDate(time_val4.getDate()+2)
        time_val4.setHours(8);
        time_val4.setSeconds(0);
        time_val4.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val4.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{ms}");
        return false;
    });

    $("#cloudHQ__schedule_time_val5").click(function () {
        var time_val5 = new Date();
        time_val5.setDate(time_val5.getDate()+2);
        time_val5.setHours(12);
        time_val5.setSeconds(0);
        time_val5.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val5.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{ms}");
        return false;
    });

    $("#cloudHQ__schedule_time_val6").click(function () {
            var time_val6 = new Date();
            time_val6.setDate(time_val6.getDate()+2);
            time_val6.setHours(time_val6.getHours());
            time_val6.setMinutes(0);
            time_val6.setSeconds(0);
            time_val6.setMilliseconds(0);
            $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
                $("#cloudHQ__schedule_time_local").show();
            });
            $("#cloudHQ__schedule_time_local")[0].value = time_val6.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{ms}");
            return false;
        });

  

    $("#cloudHQ__schedule_time_val7").click(function () {
        var time_val7 = new Date();
        time_val7.setDate(time_val7.getDate()+4);
        time_val7.setHours(time_val7.getHours());
        time_val7.setMinutes(time_val7.getMinutes() + 3);
        time_val7.setSeconds(0);
        time_val7.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val7.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{ms}");
        return false;
     });




    $("#cloudHQ__schedule_time_val8").click(function () {
        var time_val7 = new Date();
        time_val7.setDate(time_val7.getDate()+7);
        time_val7.setHours(time_val7.getHours());
        time_val7.setMinutes(0);
        time_val7.setSeconds(0);
        time_val7.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val7.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{ms}");
        return false;
    });

    $("#cloudHQ__schedule_time_val9").click(function () {
        var time_val9 = new Date();
        time_val9.setDate(time_val9.getDate()+14);
        time_val9.setHours(time_val9.getHours());
        time_val9.setMinutes(0);
        time_val9.setSeconds(0);
        time_val9.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val7.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{ms}");
        return false;
    });

    $("#cloudHQ__schedule_time_val10").click(function () {
        var time_val10 = new Date();
        time_val10.setMonth(time_val10.getMonth()+1);
        time_val10.setDate(time_val10.getDate());
        time_val10.setHours(time_val10.getHours());
        time_val10.setMinutes(0);
        time_val10.setSeconds(0);
        time_val10.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val7.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{ms}");
        return false;
    });
    time_now.setMilliseconds(0);
    time_now.setSeconds(0);
    $("#cloudHQ__schedule_time_local")[0].valueAsNumber = time_now.getTime();
    if (!is_reply) {
        $("#cloudHQ__only_if_nobody_replies_wrapper").hide();
    }
    $("#cloudHQ__schedule_email_btn").click(function () {
        var schedule_time_utc_as_timestamp = Date.create($("#cloudHQ__schedule_time_local")[0].value).getTime();
        var only_if_nobody_replies = $("#cloudHQ__only_if_nobody_replies").is(":checked");
        if (!draft_id_list || !draft_id_list[0]) {
            fn_display_misc_dialog('<div style="width: 400px"><center>Draft seems to be empty (or not yet saved in Gmail). <br/>Please specify at least one recipient, ensure that draft is not empty and retry.</center></div>', "ERROR");
        } else {
            if (compose_view.getToRecipients().length == 0) {
                fn_display_misc_dialog('<div style="width: 400px"><center>Please specify at least one recipient.</center></div>', "ERROR");
            } else {
                fn_handle_cloudHQ_schedule_email_button(compose_view, draft_id_list, message_id_list, schedule_time_utc_as_timestamp, only_if_nobody_replies);
            }
        }
    });
}
function fn_display_reminder_email_dialog(compose_view, e, is_reply, draft_id_list, message_id_list) {
    $(e.dropdown.el).html('<div style="width: 271px;height:550px"><div class="SK AX"><div class="gmelius_dropdown gmelius_dropdown_conversation gmelius_dropdown_schedule" >' +
                           '<div class="gmelius_helper_text gmelius_pad"></div>' +
                            '<ul class="gmelius_preset gmelius_user">'+
                                '<li id="cloudHQ__reminder_time_val1">In 1 hour</li>'+
                                '<li id="cloudHQ__reminder_time_val2">In 2 hours</li>'+
                                '<li id="cloudHQ__reminder_time_val3">In 4 hours</li></ul>'+
                            '<div class="gmelius_hr" role="separator"></div>'+
                            '<ul class="gmelius_preset gmelius_moments">'+
                                '<li id="cloudHQ__reminder_time_val4">Tomorrow morning</li>'+
                                '<li id="cloudHQ__reminder_time_val5">Tomorrow afternoon </li></ul>'+
                            '<div class="gmelius_hr" role="separator"></div>'+
                             '<ul class="gmelius_preset gmelius_moments1">'+
                             '<li id="cloudHQ__reminder_time_val6">In 2 days</li>'+
                             '<li id="cloudHQ__reminder_time_val7">In 4 days</li>'+
                             '<li id="cloudHQ__reminder_time_val8">In 1 Weeks</li>'+
                             '<li id="cloudHQ__reminder_time_val8">In 2 Weeks</li>'+
                             '<li id="cloudHQ__schedule_time_val8">In 1 month</li></ul>'+
                            '<div class="gmelius_hr" role="separator"></div>'+
                            '<div class="gmelius_select_time gmelius_pad" data-primary="1"><i class="material-icons gm_size_18">event</i>' +'<a id="sel_time"> Select date and time'+'</a></div>' + 
                            '<div><input type="datetime-local" id="cloudHQ__schedule_time_local" style="margin:10px 23px 3px 20px" value=""/>'+
                            '<div id="cloudHQ__reminder_email_btn" class="T-I J-J5-Ji ar7 L3 inboxsdk__button T-I-atl" style="margin:10px 23px 3px 100px" role="button"  tabindex="0"><div><span class="inboxsdk__button_text" >follow-up</span></div></div></div>'+
                         '<div style="display:none">'+
                         '<input type="checkbox" id="cloudHQ__only_if_nobody_replies" checked="checked"/> <label for="cloudHQ__only_if_nobody_replies">Snooze only if nobody replies</label>'+"<br/><br/>"+'<input type="text" id="cloudHQ__snooze_note" style="padding: 5px; width: 200px;" placeholder="short note about this snooze"/>'+"<br/><br/>"+
                            "</div></div></div></div>");
    var time_now = new Date();

    $("#cloudHQ__reminder_time_val1").click(function () {
        var time_val1 = new Date();
        time_val1.setDate(time_val1.getDate());
        time_val1.setHours(time_val1.getHours(8));
        time_val1.setMinutes(time_val1.getMinutes()+2);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val1.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        return false;
    });

    $("#cloudHQ__reminder_time_val2").click(function () {
        var time_val2 = new Date();
        time_val2.setDate(time_val2.getDate());
        time_val2.setHours(time_val2.getHours()+2);
        time_val2.setMinutes(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val2.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        return false;
    });

    $("#cloudHQ__reminder_time_val3").click(function () {
        var time_val3 = new Date();
        time_val3.setDate(time_val3.getDate()+4);
        time_val3.setHours(8);
        time_val3.setMinutes(0);
        time_val3.setSeconds(0);
        time_val3.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val3.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        return false;
    });

    $("#cloudHQ__reminder_time_val4").click(function () {
        var time_val4 = new Date();
        time_val4.setDate(time_val4.getDate()+2)
        time_val4.setHours(8);
        time_val4.setSeconds(0);
        time_val4.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val4.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        return false;
    });

    $("#cloudHQ__reminder_time_val5").click(function () {
        var time_val5 = new Date();
        time_val5.setDate(time_val5.getDate()+2);
        time_val5.setHours(12);
        time_val5.setSeconds(0);
        time_val5.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val5.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        return false;
    });

    $("#cloudHQ__reminder_time_val6").click(function () {
            var time_val6 = new Date();
            time_val6.setDate(time_val6.getDate()+2);
            time_val6.setHours(time_val6.getHours());
            time_val6.setMinutes(0);
            time_val6.setSeconds(0);
            time_val6.setMilliseconds(0);
            $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
                $("#cloudHQ__schedule_time_local").show();
            });
            $("#cloudHQ__schedule_time_local")[0].value = time_val6.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
            return false;
        });

  

    $("#cloudHQ__reminder_time_val7").click(function () {
        var time_val7 = new Date();
        time_val7.setDate(time_val7.getDate()+4);
        time_val7.setHours(time_val7.getHours());
        time_val7.setMinutes(time_val7.getMinutes() + 3);
        time_val7.setSeconds(0);
        time_val7.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val7.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        return false;
     });




    $("#cloudHQ__reminder_time_val8").click(function () {
        var time_val7 = new Date();
        time_val7.setDate(time_val7.getDate()+7);
        time_val7.setHours(time_val7.getHours());
        time_val7.setMinutes(0);
        time_val7.setSeconds(0);
        time_val7.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val7.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        return false;
    });

    $("#cloudHQ__reminder_time_val9").click(function () {
        var time_val9 = new Date();
        time_val9.setDate(time_val9.getDate()+14);
        time_val9.setHours(time_val9.getHours());
        time_val9.setMinutes(0);
        time_val9.setSeconds(0);
        time_val9.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val7.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        return false;
    });

    $("#cloudHQ__reminder_time_val10").click(function () {
        var time_val10 = new Date();
        time_val10.setMonth(time_val10.getMonth()+1);
        time_val10.setDate(time_val10.getDate());
        time_val10.setHours(time_val10.getHours());
        time_val10.setMinutes(0);
        time_val10.setSeconds(0);
        time_val10.setMilliseconds(0);
        $("#cloudHQ__schedule_time_local").fadeOut("slow", function () {
            $("#cloudHQ__schedule_time_local").show();
        });
        $("#cloudHQ__schedule_time_local")[0].value = time_val7.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        return false;
    });
    time_now.setMilliseconds(0);
    time_now.setSeconds(0);
    $("#cloudHQ__schedule_time_local")[0].valueAsNumber = time_now.getTime();
    if (!is_reply) {
        $("#cloudHQ__only_if_nobody_replies_wrapper").hide();
    }
    $("#cloudHQ__reminder_email_btn").click(function () {
        var schedule_time_utc_as_timestamp = Date.create($("#cloudHQ__schedule_time_local")[0].value).getTime();
        var only_if_nobody_replies = $("#cloudHQ__only_if_nobody_replies").is(":checked");
        var snooze_note = $("#cloudHQ__snooze_note").val();
        var thread_list;
        if (!message_id_list) {
            thread_list = [];
            thread_list.push(e.message_id);
        } else {
            thread_list = JSON.parse(JSON.stringify(message_id_list));
        }
        var options = {
            thread_id_list: thread_list,
            snooze_time_utc_as_timestamp: schedule_time_utc_as_timestamp,
            only_if_nobody_replies: only_if_nobody_replies,
            snooze_note: snooze_note
        };
        g_intention_to_gmail_snooze_email = JSON.parse(JSON.stringify(options));
        fn_save_state_to_local_storage(function () {
            fn_handle_cloudHQ_thread_toolbar_snooze_email_button(options);
        });     
        
      


          
    });
}

function fn_insert_cloudHQ_schedule_email_button(compose_view) {
    var composer_view_bar = null;
    var btn_title = "Schedule email";
    $("<style></style>").html(".chqBtnScheduleEmail { padding-left: 5px; padding-right: 5px } ").appendTo($("head"));
    compose_view.addButton({
        title: btn_title,
        type: "SEND_ACTION",
        iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAACdklEQVR4Ae2WA6wdWxSGv2PVBzXj2ogaq7Z9EdW2HdRuXNttbBfvvVqvtnntlZ1J5kxHQfXtcNa/13/2QnL4JfiLjy7M5SjXeEseebzlKkeYRSe8uKYBa3lGscF5zErq4pgUu8ij2OTkspU4DhjJe4otnjcMwhYBdqNN8Im9ZNCBOEGCJOhABvv4pNWwFT8WiXFBc/EWY4iQjijjuKNRnhadCQFN+m9MxW+ins53jYUfU1RxuE0zrNCSu5pCmTBCSS+RxCoprqh7g34sfK9+fRI7pNQrXlMDQ3aK6Gv64kjUoFCqF5sNt1at1VSwbQAzJJ5jtN1r1GD6HRkEVJlWkAYvTyU8BhwZQIYoHuFBRxcJfiTi2CDGZ9F0RMccCe0FxwZwQDSz0HFUQhmuDLJFcwgdVyXUwZVBZ9H8i463Eoq7MkipddMhO0DQlUFINLluDDo6MlAlSpgaFLGbpHmJnDS5O/dE9Z4J+Eya7GBMIcwivqskXe2M6WwJ7cOMJpymWKnrouWgfJ9p/LhPRDGnJ/dF/5npCMT4YlxoL08kOA4rhFksxdqMQJZkeIiHNKyW8B0CmKKK9YKqAEBQjcBy0lJf7cJ0rFNb18UcamPANvV3pQV2aU2O3N6AIQm1bndJYYdaqumvqI4xDFEDeIWUjfT/qHv9MWG7kt6lpcXi3Fd3NmKKn7NK/p0ZJhMVZDY5Sn8SH+YQFQt5BxnESEeMLO5plCeIYBE/Uii1rQfIpjMpQoRI0ZlsDqqtldnBhy2G8IZii+cl/XBAnK3kmibPYT3VcEw9VvHYMPkDllEb13jpyGwO8x9vyCWH1/zLQWbQDg+/AH8pATD+BDyGyAvuAAAAAElFTkSuQmCC",
        iconClass: "chqBtnScheduleEmail",
        hasDropdown: true,
        orderHint: 0,
        onClick: function (e) {
            compose_view.getCurrentDraftID().then(function (draft_id) {
                var is_reply = compose_view.isReply();
                var message_id = compose_view.getMessageID();
                fn_display_schedule_email_dialog(compose_view, e, is_reply, [draft_id], [message_id]);
            });
        }
    });
    if (!g_do_not_show_schedule_email_splash_screen) {
        g_do_not_show_schedule_email_splash_screen = true;
        c_cmn.fn_delayed_conditional_execute({
            poll_delay: 500,
            max_poll_attempts: 20,
            retry_message: null,
            condition: function () {
                return (compose_view && $(".popover").length == 0 && $(".inboxsdk__modal_fullscreen").length == 0 && $(compose_view.getBodyElement()).closest(".inboxsdk__compose").find('[data-tooltip="Smart labels"]').find(".inboxsdk__button_icon").length > 0);
            },
            continuation: function () {
                g_do_not_show_schedule_email_splash_screen = true;
                fn_save_state_to_local_storage();
                var el = $(compose_view.getBodyElement()).closest(".inboxsdk__compose");
                var btn = null;
                el.find(".inboxsdk__button").each(function () {
                    if ($(this).attr("data-tooltip") == btn_title) {
                        btn = $(this);
                    }
                });
                fn_create_popup_for_compose_button(compose_view, el, btn, {
                    title: "Schedule email",
                    text: 'Use this button to send emails at a later date. Scheduled messages can be found in your "-Scheduled" label.',
                    btn_text: "Got It",
                    btn_click: function () {}
                });
            }
        });
    }
}
function fn_insert_cloudHQ_reminder_email_button(compose_view){
    var composer_view_bar = null;
    var btn_title = "Reminder email";
    $("<style></style>").html(".chqBtnScheduleEmail { padding-left: 5px; padding-right: 5px } ").appendTo($("head"));
    compose_view.addButton({
        title: btn_title,
        type: "SEND_ACTION",
        iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAABJElEQVR4Ae3UNVbHQBSF8Q93bXGXveBe49bjUOIOW0j93wW+C6ZCGxwGiodDzokMmt8tc99kogReCkQzhUIxRTRGTKElUxih0BKFEfpFfJfP4KsTDJKPb0oIoT9IiBJ80MYV+pNc0YZHw2jsM4wHDdyhJXv0U07SQ8rpZw8tuaMBl9I5Qm4F3YTxUjjdXMvRQ9JxZV4WuKWaj1RzK415XIjjVMZn+MyMNE6Iw7EWGT4mgc8kciKtZhxbl9Fl7CxLaw3HtmS0EjtV0tp0/2vLxk62tPZx7FxG47ATL61z9/9O973gBMEJghN89wkmHJ9gwsXyDk7g6BQTaJeZcL+8j6fQHmP+BP+XQr+IwnfWqxNY+C6TQ7TkkEwwcQoLhcIik8Avcg+GFpHQsWm/FAAAAABJRU5ErkJggg==",
        iconClass: "chqBtnScheduleEmail",
        hasDropdown: true,
        orderHint: 0,
        onClick: function (e) {
            compose_view.getCurrentDraftID().then(function (draft_id) {
                var is_reply = compose_view.isReply();
                var message_id = compose_view.getMessageID();
                fn_display_reminder_email_dialog(compose_view, e, is_reply, [draft_id], [message_id]);
            });
        }
    });
}

/*function fn_insert_cloudHQ_suggested_label_button(compose_view) {
    var composer_view_bar = null;
    var btn_title = "Smart labels";
    compose_view.addButton({
        title: btn_title,
        type: "MODIFIER",
        iconUrl: g_server_url + "images/smart_label.png",
        orderHint: 0,
        onClick: function (e) {
            if (composer_view_bar) {
                composer_view_bar.destroy();
            }
            var recipients = compose_view.getToRecipients();
            if (recipients.length == 0) {
                fn_show_inbox_modal({
                    id: "div_for_empty_recipients_list",
                    title: btn_title,
                    content: "Please enter email recipient before using this action!",
                    buttons: [{
                        text: "OK",
                        action: "CLOSE_DIALOG"
                    }]
                });
                return;
            }
            composer_view_bar = fn_prepend_compose_view_bar(compose_view, {
                el: $('<b>cloudHQ smart labels:&nbsp;&nbsp;</b> <span class="cloudHQ_loading">Loading ...</span>')
            });
            $.post(g_server_url + "main_share/chrome_extension_get_label_suggestions", {
                "email_or_login": g_email_or_login,
                "switch_login": "1",
                "recipients": JSON.stringify(recipients)
            }, function (res) {
                var select_from = $('<select name="From" style="width:180px"></select>');
                var select_from_email_addresses = [];
                var select_from_email_domains = [];
                $.each(compose_view.getToRecipients(), function (i, x) {
                    var email_addr = x.emailAddress.toLowerCase();
                    if (select_from_email_addresses.indexOf(email_addr) < 0) {
                        select_from_email_addresses.push(email_addr);
                    }
                    var email_domain = email_addr.split("@")[1];
                    if (select_from_email_domains.indexOf(email_domain) < 0) {
                        select_from_email_domains.push(email_domain);
                    }
                });
                $.each(select_from_email_addresses.concat(select_from_email_domains), function (i, x) {
                    var option = $('<option value=""></option>').val(x);
                    if (x.indexOf("@") == -1) {
                        option.text("@" + x);
                    } else {
                        option.text(x);
                    }
                    option.appendTo(select_from);
                });
                var el_wrapper = $('<div id="cloudHQ_autolabel_wrapper"></div>');
                var el = $("<div></div>").append("<span>Automatically label conversations with </span>").append(select_from).append("<span> with label: </span>");
                select_wrapper = $("<div style='display: inline-block'></div>");
                var select_label = $('<select name="Label" style="width:120px"></select>');
                $.each(g_suggested_labels_list, function (i, x) {
                    var option = $("<option></option>").attr("value", x).text(x);
                    select_label.append(option);
                });
                var select_sublabel = $('<select name="SubLabel" style="width:160px"></select>');
                $.each(res.sublabels, function (i, x) {
                    var option = $("<option></option>").attr("value", x[1]).text(x[0]);
                    select_sublabel.append(option);
                });
                select_wrapper.append(select_label);
                select_wrapper.append("<span>&nbsp;/&nbsp;<span>");
                select_wrapper.append(select_sublabel);
                select_wrapper.append('<span>&nbsp;&nbsp;&nbsp;<button id="btn_apply_smart_label">Apply</button><span>');
                el.append(select_wrapper);
                el_wrapper.append(el);
                composer_view_bar.setElement(el_wrapper);
                $("#btn_apply_smart_label").unbind("click").bind("click", function () {
                    var el = composer_view_bar.getElement();
                    var select_label = el.find("[name=Label]");
                    var select_sublabel = el.find("[name=SubLabel]");
                    if (select_label.length == 1 && select_sublabel.length == 1) {
                        var email_address_to_catch = el.find("[name=From]").val();
                        var sublabel_val = $.trim(select_sublabel.val());
                        if (sublabel_val == "") {
                            return;
                        }
                        var sublabel = select_sublabel.find("option:selected").text();
                        var label_name = select_label.val() + "/" + sublabel;
                        var condition = "from:" + email_address_to_catch + " OR to:" + email_address_to_catch;
                        $("#cloudHQ_autolabel_wrapper").html("<b>cloudHQ smart labels:&nbsp;&nbsp;</b>Creating filter ...");
                        $.ajax({
                            type: "POST",
                            url: g_server_url + "main_share/chrome_extension_create_label_and_apply_filter",
                            dataType: "json",
                            data: {
                                "email_or_login": g_email_or_login,
                                "switch_login": "1",
                                "label_name": label_name,
                                "condition": condition
                            },
                            async: true,
                            success: function (res, t, x) {
                                $("#cloudHQ_autolabel_wrapper").html("<b>cloudHQ smart labels:&nbsp;&nbsp;</b>Label and filer is created. All emails from and to <b>" + email_address_to_catch + "</b> will be under label <b>" + label_name + "</b>");
                            },
                            error: function (res, t, x) {
                                $("#cloudHQ_autolabel_wrapper").html("<b>cloudHQ smart labels:&nbsp;&nbsp;</b>Temporary error - please refresh your browser. Please email us at support@cloudHQ.net if error persists.");
                            }
                        });
                    }
                });
            });
        }
    });
    if (!g_do_not_show_smart_labels_splash_screen) {
        c_cmn.fn_delayed_conditional_execute({
            poll_delay: 500,
            max_poll_attempts: 20,
            retry_message: null,
            condition: function () {
                return (compose_view && $(".popover").length == 0 && $(".inboxsdk__modal_fullscreen").length == 0 && $(compose_view.getBodyElement()).closest(".inboxsdk__compose").find('[data-tooltip="Smart labels"]').find(".inboxsdk__button_icon").length > 0);
            },
            continuation: function () {
                g_do_not_show_smart_labels_splash_screen = true;
                fn_save_state_to_local_storage();
                var el = $(compose_view.getBodyElement()).closest(".inboxsdk__compose");
                var btn = null;
                el.find(".inboxsdk__button").each(function () {
                    if ($(this).attr("data-tooltip") == btn_title) {
                        btn = $(this);
                    }
                });
                fn_create_popup_for_compose_button(compose_view, el, btn, {
                    title: "Smart labels",
                    text: "Use this button to automatically label all conversations with this person, so you can quickly find all of their emails.",
                    btn_text: "Got It",
                    btn_click: function () {}
                });
            }
        });
    }
}*/

function fn_handle_cloudHQ_compose_view(compose_view) {
    g_email_sent_flag = false;
    var compose_thread_id = compose_view.getThreadID();
    c_cmn.fn_log("fn_handle_cloudHQ_compose_view: ENTERING: compose_thread_id=" + compose_thread_id);
    if (!compose_thread_id) {
        c_cmn.fn_log("fn_handle_cloudHQ_compose_view: EXITING: nothing to do compose_thread_id=" + compose_thread_id);
        return;
    }
    if (!compose_view.isReply()) {
        c_cmn.fn_log("fn_handle_cloudHQ_compose_view: EXITING: nothing to do since not reply compose_thread_id=" + compose_thread_id);
        return;
    }
    c_cmn.fn_delayed_conditional_execute({
        poll_delay: 500,
        max_poll_attempts: 20,
        retry_message: null,
        condition: function () {
            return ($("iframe.cloudhq_channel[data-thread-id=" + compose_thread_id + "]").length > 0);
        },
        continuation: function () {
            var iframe = $("iframe.cloudhq_channel[data-thread-id=" + compose_thread_id + "]");
            if (iframe.length > 0 && iframe.attr("data-cid")) {
                function set_draft_id_to_thread(draft_id) {
                    if (!has_draft_id_for_thread(draft_id)) {
                        if (!g_draft_ids_per_thread_id[compose_thread_id]) {
                            g_draft_ids_per_thread_id[compose_thread_id] = [];
                        }
                        console.log("SET DRAFT", draft_id);
                        g_draft_ids_per_thread_id[compose_thread_id].push(draft_id);
                        fn_save_state_to_local_storage();
                    }
                }

                function remove_draft_id_from_thread(draft_id) {
                    if (!has_draft_id_for_thread(draft_id)) {
                        if (!g_draft_ids_per_thread_id[compose_thread_id]) {
                            g_draft_ids_per_thread_id[compose_thread_id] = [];
                        }
                        console.log("REMOVE DRAFT", draft_id);
                        var index = g_draft_ids_per_thread_id[compose_thread_id].indexOf(draft_id);
                        if (index > -1) {
                            g_draft_ids_per_thread_id[compose_thread_id].splice(index, 1);
                            fn_save_state_to_local_storage();
                        }
                    }
                }

                function has_draft_id_for_thread(draft_id) {
                    if (g_draft_ids_per_thread_id[compose_thread_id] && g_draft_ids_per_thread_id[compose_thread_id].indexOf(draft_id) > -1) {
                        return true;
                    }
                    return false;
                }
                try {
                    var draft_id = null;
                    compose_view.getCurrentDraftID().then(function (id) {
                        if (id != null && !has_draft_id_for_thread(id)) {
                            draft_id = id;
                            console.log("ADDING DRAFT:", draft_id);
                            set_draft_id_to_thread(draft_id);
                            return;
                        }
                    });
                    compose_view.getDraftID().then(function (id) {
                        if (!id) {
                            return;
                        }
                        draft_id = id;
                        if (!has_draft_id_for_thread(draft_id)) {
                            var iframe = $("iframe.cloudhq_channel[data-thread-id=" + compose_thread_id + "]");
                            console.log("NEW DRAFT:", draft_id);
                            set_draft_id_to_thread(draft_id);
                            iframe.get(0).contentWindow.postMessage({
                                action: "sendMessage",
                                message: "Started composing reply ...",
                                data: {
                                    isReadOnly: true,
                                    kind: "reply_status",
                                    draft_id: draft_id
                                }
                            }, "*");
                        } else {
                            console.log("OLD DRAFT:", draft_id);
                        }
                    });
                    compose_view.on("sent", function (event_data) {
                        console.log("SENT MESSAGE", event_data);
                        var iframe = $("iframe.cloudhq_channel[data-thread-id=" + compose_thread_id + "]");
                        var chat_thread_id = iframe.attr("data-thread-id");
                        if (chat_thread_id == event_data.threadID) {
                            g_email_sent_flag = true;
                            iframe.get(0).contentWindow.postMessage({
                                action: "sendMessage",
                                message: "Reply was sent!",
                                data: {
                                    isReadOnly: true,
                                    kind: "reply_status",
                                    draft_id: draft_id
                                }
                            }, "*");
                            remove_draft_id_from_thread(draft_id);
                        }
                    });
                    compose_view.on("destroy", function (message_id) {
                        var iframe = $("iframe.cloudhq_channel[data-thread-id=" + compose_thread_id + "]");
                        window.setTimeout(function () {
                            fn_update_stored_drafts_on_server(function (resp) {
                                if (!g_email_sent_flag) {
                                    if (!draft_id) {
                                        console.log("draft_id is null");
                                        return;
                                    }
                                    console.log("DESTROY_DRAFT_ID", draft_id);
                                    var draft_exists = false;
                                    for (var i = 0; i < g_stored_drafts_on_server.length; i++) {
                                        if (g_stored_drafts_on_server[i]["id"] == draft_id) {
                                            draft_exists = true;
                                            break;
                                        }
                                    }
                                    if (!draft_exists) {
                                        remove_draft_id_from_thread(draft_id);
                                        iframe.get(0).contentWindow.postMessage({
                                            action: "sendMessage",
                                            message: "Reply draft discarded (reply is not composed any more).",
                                            data: {
                                                isReadOnly: true,
                                                kind: "reply_status",
                                                draft_id: draft_id
                                            }
                                        }, "*");
                                    }
                                }
                            });
                        }, 1000);
                    });
                } catch (e) {
                    c_cmn.fn_log("fn_handle_cloudHQ_compose_view: FAILED");
                }
            }
        }
    });
    c_cmn.fn_log("fn_handle_cloudHQ_compose_view: EXITING: compose_thread_id=" + compose_thread_id);
}

/*function fn_insert_cloudHQ_menu() {
    if (g_insert_cloudHQ_menu_done) {
        return;
    }
    c_cmn.fn_log("fn_insert_cloudHQ_menu: ENTERING");
    if ($(g_css_search_for_label_dropdown).length > 0) {
        fn_insert_cloudHQ_menu_impl();
    } else {
        c_cmn.fn_log("fn_insert_cloudHQ_menu: start monitor for change");
        var elem_to_observe = ($(g_css_search_for_label_menu_wapper_div))[0];
        var config = {
            childList: true
        };
        if (elem_to_observe) {
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if ($(g_css_search_for_label_dropdown).length > 0) {
                        fn_insert_cloudHQ_menu_impl();
                        observer.disconnect();
                    }
                });
            });
            observer.observe(elem_to_observe, config);
        }
    }
    g_insert_cloudHQ_menu_done = true;
    c_cmn.fn_log("fn_insert_cloudHQ_menu: EXITING");
}*/

function invalidate_buttons() {
    $(g_css_search_for_label_actions_container_div).each(function () {
        //fn_insert_cloudHQ_share_button_impl($(this));
    });
}

function fn_insert_cloudHQ_main_buttons() {
    try {
        var elem_to_observe_list = $(g_css_search_for_label_actions_wapper_div);
        elem_to_observe_list.each(function (index, elem_to_observe) {
            g_observer_for_share_buttons_list.forEach(function (observer) {
                observer.disconnect();
            });
            g_observer_for_share_buttons_list = [];
            observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    invalidate_buttons();
                });
            });
            observer.observe(elem_to_observe, {
                childList: true
            });
            g_observer_for_share_buttons_list.push(observer);
        });
        invalidate_buttons();
    } catch (err) {}
}

function fn_create_section_container_for_route_view(options) {
    var container = $("<div> </div>").addClass("section-container");
    var header = $("<div> </div>").addClass("section-header").appendTo(container);
    var content = $("<div> </div>").addClass("section-content").appendTo(container);
    var contentGrip = $("<div>&middot;&middot;&middot;</div>").addClass("section-grip").appendTo(container);
    var actionText = options["actionText"] || "Open Chat";
    if (options.allLabelNotes) {
        $('<div class="is-collapsed" />').append('<div id="btn-cloudHQ-open-chat-all-label" class="btn-toggle-section" role="button" tabindex="0" gh="cm" style="min-width:80px;-webkit-user-select: none;">Click here to add a note </div>').appendTo(header);
        $('<div class="is-expanded" />').append('<div class="btn-toggle-section" class="btn-toggle-section" role="button" tabindex="0" gh="cm" style="min-width:80px;-webkit-user-select: none;">Open</div>').appendTo(header);
    } else {
        $('<div class="is-collapsed" />').append('<div id="btn-cloudHQ-open-chat" class="btn-toggle-section" role="button" tabindex="0" gh="cm" style="min-width:80px;-webkit-user-select: none;">Click here to add a note</div>').appendTo(header);
        $('<div class="is-expanded" />').append('<div class="btn-toggle-section" class="btn-toggle-section" role="button" tabindex="0" gh="cm" style="min-width:80px;-webkit-user-select: none;">Open</div>').appendTo(header);
    }

    function toggleView() {
        container.toggleClass("section-expanded");
        if (container.hasClass("section-expanded")) {
            g_autoexpand_flag = true;
            if (options.onExpanded) {
                options.onExpanded.call(this, content);
            }
        } else {
            g_autoexpand_flag = false;
            if (options.onCollapsed) {
                options.onCollapsed.call(this, content);
            }
        }
        fn_save_state_to_local_storage();
    }
    container.find(".btn-toggle-section").data("toggleView", toggleView).click(function () {
        toggleView();
    });
    content.height(options.height || 450);
    (function () {
        var pageY = null;
        contentGrip.mousedown(function (e) {
            pageY = e.pageY;
            content.prepend('<div class="section-overlay"> </div>');
            e.stopPropagation();
            e.preventDefault();
        });
        $(document).mouseup(function () {
            pageY = null;
            content.find(".section-overlay").remove();
        });
        $(document).mousemove(function (e) {
            if (pageY != null) {
                pageYDiff = e.pageY - pageY;
                var height = content.height() + pageYDiff;
                var minHeight = (options.minHeight || 300);
                if (height >= minHeight) {
                    pageY = e.pageY;
                    content.find(".section-resizable").height(height);
                    content.height(height);
                }
            }
        });
    })();
    if (options.hideHeader) {
        header.hide();
        container.addClass("section-expanded");
    }
    if (options.isExpanded) {
        toggleView();
    }
    return container;
}

function fn_cloudHQ_label_chat_touch_channel(channel_id) {
    var iframe = $("#chq_notif_iframe");
    if (iframe.length > 0) {
        iframe.get(0).contentWindow.postMessage({
            action: "touch",
            channel_id: channel_id
        }, "*");
    }
    if (g_channel_notifications_per_channel_id) {
        var t = new Date();
        t.setSeconds(t.getSeconds() + 1);
        if (g_channel_notifications_per_channel_id[channel_id]) {
            g_channel_notifications_per_channel_id[channel_id]["last_viewed_by_me_date"] = t.toISOString();
            fn_save_state_to_local_storage();
        }
    }
}

function fn_register_cloudHQ_label_chat_status_checker_message_listener() {
    var iframe = $('<iframe id="chq_notif_iframe" style="display:none"></iframe>').appendTo($("body"));
    var listener_url = g_server_url + "main_share/label_sharing_chat_status?switch_login=1&email_or_login=" + encodeURIComponent(g_email_or_login);
    var wrapper_page_url = chrome.extension.getURL("html/label_sharing_chat_wrapper.html" + "?iframe_src=" + encodeURIComponent(listener_url));
    iframe.attr("src", wrapper_page_url);
    window.addEventListener("message", function (e) {
        if (g_server_url.startsWith(e.origin) || e.origin == "chrome-extension://" + chrome.runtime.id) {
            if (e.data.has_changed) {
                var label_obj = fn_find_label_obj_by_channel_id(e.data.channel_id);
                var iframe = fn_get_active_iframe();
                g_thread_metadata_by_thread_id_cache = null;
                if (label_obj) {
                    var iframe_thread_id = iframe.attr("data-thread-id");
                    if (label_obj.title != iframe.attr("data-label") || iframe.height() == 1 || iframe_thread_id) {
                        var label_element = fn_find_right_toolbar_label(label_obj);
                        if (label_element) {
                            var span = label_element.closest("span");
                            if (!span.hasClass("chq-chat-notif")) {
                                span.addClass("chq-chat-notif");
                                label_element.append("<span>&nbsp;(&#x2605;)</span>");
                            }
                            var last_viewed_by_me_date;
                            var modified_date;
                            if (g_channel_notifications_per_channel_id[e.data.channel_id]) {
                                try {
                                    last_viewed_by_me_date = new Date(g_channel_notifications_per_channel_id[e.data.channel_id]["last_viewed_by_me_date"]);
                                    modified_date = new Date(e.data.modified_date);
                                } catch (e) {
                                    modified_date = new Date();
                                    last_viewed_by_me_date = new Date();
                                    modified_date.setSeconds(modified_date.getSeconds() + 1);
                                }
                            }
                            if (!g_channel_notifications_per_channel_id[e.data.channel_id] || !g_channel_notifications_per_channel_id[e.data.channel_id]["version_id"] || (g_channel_notifications_per_channel_id[e.data.channel_id]["version_id"] < e.data.version_id && last_viewed_by_me_date < modified_date)) {
                                c_cmn.fn_log("fn_register_cloudHQ_label_chat_status_checker_message_listener: valid notification " + "e.data.modified_date=" + e.data.modified_date + " last_viewed_by_me_date=" + last_viewed_by_me_date);
                                g_channel_notifications_per_channel_id[e.data.channel_id] = {
                                    "modified_date": e.data.modified_date,
                                    "modified_by_me_date": e.data.modified_by_me_date,
                                    "last_viewed_by_me_date": e.data.last_viewed_by_me_date,
                                    "version_id": e.data.version_id
                                };
                                fn_save_state_to_local_storage();
                                try {
                                    $.ajax({
                                        type: "POST",
                                        dataType: "json",
                                        url: g_server_url + "main_share/label_sharing_chat_latest_message/" + label_obj.share_config_id,
                                        data: {
                                            "email_or_login": g_email_or_login,
                                            "switch_login": "1"
                                        },
                                        success: function (res) {
                                            if (!iframe_thread_id || iframe_thread_id != res["thread_id"]) {
                                                c_cmn.fn_log("fn_register_cloudHQ_label_chat_status_checker_message_listener: label_sharing_chat_latest_message returned");
                                                var url = "https://mail.google.com/mail/u/" + g_email_or_login + "/#label/" + label_obj.title;
                                                if (res["thread_id"]) {
                                                    url = url + "/" + res["thread_id"];
                                                }
                                                var message_content_as_text = "";
                                                if (res["message"]["content"] && res["message"]["content"]["notification_text"]) {
                                                    message_content_as_text = res["message"]["content"]["notification_text"];
                                                } else {
                                                    message_content_as_text = res["message"]["content"];
                                                }
                                                var notification = new Notification("Comment by " + res["message"]["senderName"] + " in " + label_obj.title, {
                                                    icon: "https://www.cloudhq.net/images/cHQ.png",
                                                    body: res["thread_subject"] + ": " + message_content_as_text,
                                                    data: {
                                                        url: url
                                                    }
                                                });
                                                notification.onclick = function (event_data) {
                                                    if (res["thread_id"]) {
                                                        g_sdk.Router.goto(g_sdk.Router.NativeRouteIDs.THREAD, {
                                                            "threadID": res["thread_id"]
                                                        });
                                                    } else {
                                                        g_sdk.Router.goto(g_sdk.Router.NativeRouteIDs.LABEL, {
                                                            "labelName": label_obj.title
                                                        });
                                                    }
                                                    return false;
                                                };
                                                if (res["thread_id"]) {
                                                    message_key = "cloudHQ_butter_" + res["thread_id"];
                                                } else {
                                                    message_key = "cloudHQ_butter_1";
                                                }
                                                g_sdk.ButterBar.showMessage({
                                                    text: "Comment by " + res["message"]["senderName"] + " in " + label_obj.title + ":<br/>" + res["thread_subject"] + ": " + message_content_as_text,
                                                    html: "Comment by " + res["message"]["senderName"] + " in " + label_obj.title + ":<br/>" + '<a id="click_' + message_key + '" href="#">' + res["thread_subject"] + "</a>: " + message_content_as_text,
                                                    time: 10000,
                                                    messageKey: message_key
                                                });
                                                $("#click_" + message_key).bind("click", function (event_data) {
                                                    if (res["thread_id"]) {
                                                        g_sdk.Router.goto(g_sdk.Router.NativeRouteIDs.THREAD, {
                                                            "threadID": res["thread_id"]
                                                        });
                                                    } else {
                                                        g_sdk.Router.goto(g_sdk.Router.NativeRouteIDs.LABEL, {
                                                            "labelName": label_obj.title
                                                        });
                                                    }
                                                    return false;
                                                });
                                            }
                                            if (g_thread_row_comment_button_list_visible) {
                                                fn_create_thread_row_comment_button_list(g_thread_row_comment_button_list_visible);
                                            }
                                        },
                                        error: function () {
                                            var notification = new Notification("cloudHQ Label Sharing", {
                                                icon: "https://www.cloudhq.net/images/cHQ.png",
                                                body: "A new comment in " + label_obj.title + " shared label!",
                                                data: {
                                                    url: "https://mail.google.com/mail/u/" + g_email_or_login + "/#label/" + label_obj.title
                                                }
                                            });
                                            notification.onclick = function (event_data) {
                                                g_sdk.Router.goto(g_sdk.Router.NativeRouteIDs.LABEL, {
                                                    "labelName": label_obj.title
                                                });
                                                return false;
                                            };
                                        }
                                    });
                                } catch (e) {}
                            }
                            fn_cloudHQ_label_chat_touch_channel(e.data.channel_id);
                        }
                    }
                } else {
                    var channel_id = e.data.channel_id;
                    if (g_channel_notifications_per_channel_id) {
                        if (!g_channel_notifications_per_channel_id[channel_id]) {
                            g_channel_notifications_per_channel_id[channel_id] = {};
                        }
                        g_channel_notifications_per_channel_id[e.data.channel_id] = {
                            "modified_date": e.data.modified_date,
                            modified_by_me_date: e.data.modified_by_me_date,
                            "last_viewed_by_me_date": e.data.last_viewed_by_me_date,
                            "version_id": e.data.version_id
                        };
                        var channel_obj = fn_find_channel_obj_by_channel_id(e.data.channel_id);
                        fn_save_state_to_local_storage();
                        if (channel_obj != null) {
                            if (document.location.hash.endsWith(channel_obj.thread_id)) {
                                fn_cloudHQ_label_chat_touch_channel(channel_id);
                            } else {
                                g_sdk.ButterBar.showMessage({
                                    text: "New messages in " + channel_obj.channel_title + " project!",
                                    time: 5000,
                                    messageKey: "cloudHQ_butter_1"
                                });
                                try {
                                    var notification = new Notification("cloudHQ Projects", {
                                        icon: "https://www.cloudhq.net/images/cHQ.png",
                                        title: "cloudHQ Projects",
                                        body: "A new message in " + channel_obj.channel_title + " project!",
                                        data: {
                                            url: "https://mail.google.com/mail/u/" + g_email_or_login + "/#label/!Projects/" + channel_obj.thread_id
                                        }
                                    });
                                    notification.onclick = function (event_data) {
                                        document.location.href = event_data.currentTarget.data.url;
                                    };
                                } catch (e) {}
                            }
                        }
                    }
                }
            } else {
                if (e.data.from == "channels") {
                    if (e.data.event == "redirect") {
                        var iframe = fn_get_active_iframe();
                        iframe.attr("src", e.data.href);
                    } else {
                        if (e.data.event == "service:ready") {
                            var iframe = fn_get_active_iframe();
                            if (iframe.length == 1) {
                                var labelName = iframe.attr("data-label");
                                if (labelName) {
                                    iframe.get(0).contentWindow.postMessage({
                                        action: "setEmailSuggestions",
                                        message: JSON.stringify(g_email_suggestions)
                                    }, "*");
                                    for (i = 0; i < g_shared_labels_list_with_some_users.length; i++) {
                                        if (g_shared_labels_list_with_some_users[i].title == labelName) {
                                            return;
                                        }
                                    }
                                }
                            }
                        } else {
                            if (e.data.event == "objlink:click") {
                                var linkedObj = e.data.args[0];
                                if (linkedObj) {
                                    if (linkedObj["kind"] == "gmail:thread") {
                                        $(".cloudhq_notif_window").remove();
                                        $(".inboxsdk__menu").remove();
                                        g_sdk.ButterBar.showMessage({
                                            text: "Loading email thread ...",
                                            messageKey: "cloudHQ_butter_1"
                                        });
                                        $.ajax({
                                            type: "GET",
                                            url: g_server_url + "main_share/label_sharing_find_thread_link",
                                            dataType: "json",
                                            data: {
                                                "email_or_login": g_email_or_login,
                                                "switch_login": "1",
                                                "label_name": linkedObj["label_name"],
                                                "thread_subject": linkedObj["name"],
                                                "thread_date": linkedObj["thread_date"],
                                                "gmail_timezone_offset": linkedObj["gmail_timezone_offset"]
                                            },
                                            success: function (res, t, x) {
                                                console.log("label_sharing_find_thread_link", res);
                                                if (res && !res["error"]) {
                                                    window.location.hash = res["href"];
                                                } else {
                                                    g_sdk.ButterBar.showMessage({
                                                        text: res["reason"],
                                                        messageKey: "cloudHQ_butter_1"
                                                    });
                                                }
                                            },
                                            error: function (response, t, x) {
                                                g_sdk.ButterBar.showMessage({
                                                    text: "This thread can not be found ...",
                                                    messageKey: "cloudHQ_butter_1"
                                                });
                                            }
                                        });
                                    }
                                }
                            } else {
                                if (e.data.event == "cmd:exe:backup") {
                                    var iframe = fn_get_active_iframe();
                                    if (iframe.length == 1) {
                                        var selected_label_name = iframe.attr("data-label");
                                        fn_display_misc_dialog('<div style="width: 300px"><center>Loading cloudHQ backup wizard... <br/>(might take a few seconds)</center></div>', "", null);
                                        var source_path = "/google_gmail (" + g_email_or_login + ")" + "/" + selected_label_name;
                                        window.location = g_server_url + "synch_wizard_start_with/" + "?switch_login=1&source_path=" + encodeURIComponent(source_path) + "&user_email=" + encodeURIComponent(g_email_or_login) + "&wizard_type=backup";
                                    } else {
                                        fn_display_misc_dialog('<div style="width: 300px"><center>Loading cloudHQ backup wizard... <br/>(might take a few seconds)</center></div>', "", null);
                                        window.location = g_server_url + "synch_wizard_start_with/" + "?switch_login=1&user_email=" + encodeURIComponent(g_email_or_login) + "&wizard_type=backup";
                                    }
                                } else {
                                    if (e.data.event == "cmd:exe:docit") {
                                        var iframe = fn_get_active_iframe();
                                        var thread_id = e.data.connection.thread_id;
                                        var options = {
                                            thread_id: thread_id
                                        };
                                        fn_handle_cloudHQ_thread_docit(options);
                                    } else {
                                        if (e.data.event == "cmd:exe:file") {
                                            var modal_title = "Insert File";
                                            var btn_title = "Insert File";
                                            modal_view = g_sdk.Widgets.showModalView({
                                                title: modal_title,
                                                el: $('<div id="cloudHQ_modal_file_browser_loader" style="width: auto; height: auto"><div class="file-browser loading"></div></div>').get(0)
                                            });
                                            var el = $('<div id="cloudHQ_modal_file_browser" style="width: auto; height: auto"></div>');
                                            var file_browser = new FileBrowser(el, g_server_url, g_file_browser_services, function () {
                                                modal_view.close();
                                                modal_view = g_sdk.Widgets.showModalView({
                                                    title: modal_title,
                                                    el: el.get(0),
                                                    buttons: [{
                                                        "text": "Insert",
                                                        "type": "PRIMARY_ACTION",
                                                        "onClick": function (e) {
                                                            if (modal_view.is_getting_links) {
                                                                return;
                                                            }
                                                            var objs = file_browser.getSelected();
                                                            if (objs.length == 0) {
                                                               // fn_display_inbox_modal_info(el, "No files or folders selected!");
                                                                return;
                                                            }
                                                            modal_view.is_getting_links = true;
                                                           /* fn_display_inbox_modal_info(el, "Inserting share link ...", {
                                                                timeout: 30000
                                                            });*/
                                                            $.ajax({
                                                                type: "POST",
                                                                url: g_server_url + "main_share/chrome_extension_get_shared_links",
                                                                dataType: "json",
                                                                data: {
                                                                    objs: JSON.stringify(objs)
                                                                },
                                                                async: true,
                                                                success: function (res, t, x) {
                                                                    if (res && res["links"] && res["links"].length > 0) {
                                                                        $(res["links"]).each(function (i, link) {
                                                                            var iframe = fn_get_active_iframe();
                                                                            if (iframe.length > 0) {
                                                                                iframe.get(0).contentWindow.postMessage({
                                                                                    action: "sendMessage",
                                                                                    message: {
                                                                                        html: '<a target="_blank" href="' + link["url"] + '">' + link["text"] + "</a>"
                                                                                    },
                                                                                    keepAlive: 10000
                                                                                }, "*");
                                                                            }
                                                                        });
                                                                        modal_view.close();
                                                                        return;
                                                                    }
                                                                    modal_view.is_getting_links = false;
                                                                    fn_display_inbox_modal_info(el, "Can not create links for selected files!", {
                                                                        color: "#CC0000"
                                                                    });
                                                                },
                                                                error: function (res, t, x) {
                                                                    modal_view.is_getting_links = false;
                                                                    fn_display_inbox_modal_info(el, "Something went wrong :( Please retry.", {
                                                                        color: "#CC0000"
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    }, {
                                                        "text": "Cancel",
                                                        "type": "SECONDARY",
                                                        "onClick": function () {
                                                            modal_view.close();
                                                        }
                                                    }]
                                                });
                                                $(".inboxsdk__modal_container .Kj-JD-K7-K0").append(' <span style="font-size: 0.7em"> <a target="_blank" href="https://www.youtube.com/watch?v=fvYTUblHOKE">how does this works?</a></span>');
                                            });
                                        } else {
                                            if (e.data.event == "server:label_applied") {
                                                modal_view = g_sdk.Widgets.showModalView({
                                                    el: $('<div id="cloudHQ_modal_file_browser_loader" style="width: auto; height: auto">Label applied. Click on Refresh to refresh your browser</div>').get(0),
                                                    buttons: [{
                                                        "text": "Refresh",
                                                        "string": "Refresh Browser",
                                                        "type": "PRIMARY_ACTION",
                                                        "onClick": function (e) {
                                                            location.reload();
                                                        }
                                                    }, {
                                                        "text": "Close",
                                                        "string": "Close",
                                                        "onClick": function (e) {
                                                            modal_view.close();
                                                        }
                                                    }]
                                                });
                                            } else {
                                                if (e.data.event == "server:update_status") {
                                                    g_thread_metadata_by_thread_id_cache = null;
                                                    if (g_thread_row_comment_button_list_visible) {
                                                        fn_create_thread_row_comment_button_list(g_thread_row_comment_button_list_visible);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {}
    }, false);
}

function fn_get_iframe_from_cache(frame_id, fn_create) {
    var iframe = $("#" + frame_id);
    if (iframe.length != 1) {
        iframe.remove();
        iframe = fn_create.call(this).addClass("cached_cloudhq_iframe").attr("id", frame_id).appendTo($(".AO").css("overflow", "hidden"));
    }
    return iframe;
}

function fn_get_active_iframe() {
    var iframe = null;
    $("iframe.cached_cloudhq_iframe").each(function () {
        var t = $(this);
        if (t.is(":visible")) {
            iframe = t;
        }
    });
    if (iframe == null) {
        iframe = $("iframenotfound");
    }
    return iframe;
}
var fn_reload_iframe_xhr = null;

function fn_reload_iframe(iframe, wrapper, load_url, callback) {
    if (fn_reload_iframe_xhr && fn_reload_iframe_xhr.readyState != 4) {
        fn_reload_iframe_xhr.abort();
    }
    fn_position_iframe(null, wrapper);
    fn_reload_iframe_xhr = $.ajax({
        url: load_url,
        method: "GET",
        success: function (res) {
            if (res["channel_key"]) {
                var iframe_new = fn_create_cloudHQ_channel_iframe(res["channel_key"], wrapper);
                fn_position_iframe(iframe_new, wrapper);
                callback.call(this, iframe_new);
            } else {
                iframe.get(0).contentWindow.postMessage({
                    action: "reconfigure",
                    message: JSON.stringify(res)
                }, "*");
                fn_position_iframe(iframe, wrapper);
                callback.call(this, iframe);
            }
        },
        failure: function (res) {
            callback.call(this, null);
        }
    });
}
g_postioning_interval = null;

function fn_position_wrapper(wrapper) {
    if (!wrapper) {
        return;
    }
    try {
        var parents_sidebar = wrapper.parents(".Bu.y3");
        var parents_content_panel = parents_sidebar.find("div").first();
        var last_margin_top = 0;
        $("[data-inboxsdk-currentthreadid]").closest(".age").unbind("scroll").bind("scroll", function (e) {
            parents_content_panel.css("margin-top", -wrapper.parents().find(".Bu.y3").position().top);
        });
        if (g_postioning_interval) {
            try {
                window.clearInterval(g_postioning_interval);
            } catch (e) {}
        }
        g_postioning_interval = setInterval(function () {
            if (wrapper.length == 0) {
                window.clearInterval(g_postioning_interval);
            } else {
                try {
                    parents_content_panel.css("margin-top", -wrapper.parents().find(".Bu.y3").position().top);
                    var wrapper_container_height = parents_content_panel.height();
                    var maximum_height;
                    var closest_in_vertial_view = $("[data-inboxsdk-currentthreadid]").closest(".age");
                    if (closest_in_vertial_view.length > 0) {
                        maximum_height = closest_in_vertial_view.filter(function () {
                            return $(this).is(":visible");
                        }).parent().height();
                        if (maximum_height) {
                            if (wrapper_container_height > maximum_height) {
                                wrapper.height(maximum_height - 120);
                            }
                        }
                    } else {
                        maximum_height = parents_content_panel.closest(".Tm.aeJ").height();
                        if (maximum_height) {
                            if (wrapper_container_height > maximum_height) {
                                wrapper.height(maximum_height - 120);
                            }
                        }
                    }
                } catch (e) {}
            }
        }, 600);
    } catch (e) {}
}
document.addEventListener("focusout", function () {
    window.setTimeout(function () {
        if (document.activeElement instanceof HTMLIFrameElement) {
            var iframe = $(document.activeElement);
            if (iframe && iframe.hasClass("cached_cloudhq_iframe")) {
                iframe.css({
                    "z-index": 1000
                });
            }
        }
    }, 0);
});

function fn_position_iframe(iframe, wrapper) {
    $(".cached_cloudhq_iframe").css({
        height: "1px",
        top: "-10px"
    });
    if (!iframe) {
        return;
    }
    var wOffset = wrapper.position();
    var interval = setInterval(function () {
        if (document.activeElement == iframe.get(0)) {
            iframe.css({
                "z-index": 1000
            });
        } else {
            iframe.css({
                "z-index": 0
            });
        }
        if (wrapper.length == 0 || (wrapper.is(":hidden") && !(($(".inboxsdk__modal_fullscreen").length > 0) && $(".inboxsdk__modal_fullscreen").is(":visible")))) {
            if ($(".signals-gmail-overlay").length > 0 && $(".signals-insights-container .signals-sidekick-overlay").is(":visible") && wrapper.length > 0) {
                fn_position_iframe(null, wrapper);
            } else {
                window.clearInterval(interval);
                fn_position_iframe(null, wrapper);
            }
        } else {
            var wOffset = wrapper.offset();
            var iOffset = iframe.offset();
            var left = wOffset.left;
            var top = wOffset.top;
            if (Math.abs(top - iOffset.top) > 1 || Math.abs(left - iOffset.left) > 1 || Math.abs(wrapper.height() - iframe.height()) > 1 || Math.abs(wrapper.width() - iframe.width()) > 1) {
                iframe.css({
                    "transform": "translateZ(0)",
                    "-webkit-transform": "translateZ(0)",
                    position: "fixed",
                    top: top + "px",
                    left: (left + 1) + "px",
                    width: (wrapper.width() - 1) + "px",
                    height: wrapper.height() + "px"
                });
            }
        }
    }, 100);
}

function fn_create_cloudHQ_label_chat_iframe(wrapper, shared_label_obj, label_name, thread_date, thread_subject, thread_sender, thread_id) {
    var chat_url = g_server_url + "main_share/label_sharing_chat/" + shared_label_obj.share_config_id + "?only_settings=1&label_name=" + encodeURIComponent(label_name) + "&gmail_timezone_offset=" + g_gmail_timezone_offset + "&switch_login=1&email_or_login=" + encodeURIComponent(g_email_or_login);
    if (thread_subject && thread_date) {
        chat_url = chat_url + "&thread_subject=" + encodeURIComponent(thread_subject) + "&thread_date=" + encodeURIComponent(thread_date) + "&thread_id=" + encodeURIComponent(thread_id) + "&thread_sender=" + encodeURIComponent(thread_sender);
    }
    var iframe_id = "cloudhq_frame_share_config_id_" + shared_label_obj.share_config_id;
    var iframe = fn_get_iframe_from_cache(iframe_id, function () {
        var iframe = $('<iframe border="0" style="border:0;width:100%" class="section-resizable cloudhq_channel"></iframe>');
        iframe.attr("data-label", shared_label_obj.title).attr("data-cid", shared_label_obj.share_config_id);
        var chat_url_no_settings = chat_url.replace("only_settings=1&", "");
        var wrapper_page_url = chrome.extension.getURL("html/label_sharing_chat_wrapper.html" + "?iframe_src=" + encodeURIComponent(chat_url_no_settings));
        iframe.attr("src", wrapper_page_url);
        return iframe;
    });
    if (thread_id) {
        iframe.attr("data-thread-id", thread_id);
    } else {
        iframe.removeAttr("data-thread-id");
    }
    fn_reload_iframe(iframe, $(wrapper), chat_url, function () {});
    if (shared_label_obj && shared_label_obj.share_config_channel_id) {
        fn_cloudHQ_label_chat_touch_channel(shared_label_obj.share_config_channel_id);
    }
    var labelEl = fn_find_right_toolbar_label(shared_label_obj);
    if (labelEl) {
        labelEl.closest("span").removeClass("chq-chat-notif");
        labelEl.find("span").remove();
    }
    return iframe;
}

function fn_create_cloudHQ_label_chat_thread_view_element(shared_label_obj, label_name, thread_date, thread_subject, thread_sender, thread_id, isExpanded) {
    var label_view_iframe = null;
    var container = fn_create_section_container_for_route_view({
        height: Math.max(300, window.innerHeight - 250),
        onExpanded: function (content) {
            fn_position_wrapper(content);
            if (label_view_iframe == null) {
                label_view_iframe = fn_create_cloudHQ_label_chat_iframe(content, shared_label_obj, label_name, thread_date, thread_subject, thread_sender, thread_id);
            } else {
                fn_position_iframe(label_view_iframe, content);
            }
        },
        onCollapsed: function (content) {
            fn_position_wrapper(content);
            fn_position_iframe(null, content);
        }
    });
    var header = container.find(".section-header");
    if (isExpanded) {
        c_cmn.fn_delayed_conditional_execute({
            poll_delay: 300,
            max_poll_attempts: 20,
            retry_message: null,
            condition: function () {
                return ($("#btn-cloudHQ-open-chat").length > 0);
            },
            continuation: function () {
                $("#btn-cloudHQ-open-chat").trigger("click");
                return true;
            }
        });
    }
    return container;
}

function fn_create_cloudHQ_channel_iframe(channel_key, wrapper, thread_date, thread_subject, thread_sender, thread_id) {
    var chat_url = g_server_url;
    var iframe_id = "cloudhq_frame_channel_";
    if (!channel_key) {
        iframe_id = iframe_id + "notes_and_commands";
        chat_url = chat_url + "main_share/label_sharing_chat_notes_and_commands";
        chat_url = chat_url + "?switch_login=1&only_settings=1&email_or_login=" + encodeURIComponent(g_email_or_login) + "&gmail_timezone_offset=" + g_gmail_timezone_offset + "&switch_login=1&email_or_login=" + encodeURIComponent(g_email_or_login);
        if (thread_subject) {
            chat_url = chat_url + "&thread_subject=" + encodeURIComponent(thread_subject) + "&thread_date=" + encodeURIComponent(thread_date) + "&thread_id=" + encodeURIComponent(thread_id) + "&thread_sender=" + encodeURIComponent(thread_sender);
        }
    } else {
        iframe_id = iframe_id + channel_key;
        chat_url = chat_url + "channels/show/" + channel_key + "?switch_login=1&email_or_login=" + encodeURIComponent(g_email_or_login) + "&origin=" + encodeURIComponent("https://mail.google.com/");
    }
    var iframe = fn_get_iframe_from_cache(iframe_id, function () {
        var iframe = $('<iframe border="0" style="border:0;width:100%" class="section-resizable cloudhq_channel"></iframe>');
        var chat_url_no_settings = chat_url.replace("only_settings=1&", "");
        var wrapper_page_url = chrome.extension.getURL("html/label_sharing_chat_wrapper.html" + "?iframe_src=" + encodeURIComponent(chat_url_no_settings));
        iframe.attr("src", wrapper_page_url);
        return iframe;
    });
    if (thread_id) {
        iframe.attr("data-thread-id", thread_id);
    } else {
        iframe.removeAttr("data-thread-id");
    }
    fn_reload_iframe(iframe, $(wrapper), chat_url, function (iframe) {
        var section_title = (iframe.attr("src").indexOf("/channels/") > -1) ? "Team Comments" : "Notes";
        var tab_title_el = iframe.closest(".Bu.y3").find(".aKz");
        tab_title_el.text(section_title);
    });
    return iframe;
}

function fn_create_cloudHQ_notes_and_commands_view_element(channel_key, thread_date, thread_subject, thread_sender, thread_id, isExpanded) {
    c_cmn.fn_log("fn_create_cloudHQ_notes_and_commands_view_element: ENTERING thread_id=" + thread_id);
    var iframe = null;
    var container = fn_create_section_container_for_route_view({
        height: Math.max(300, window.innerHeight - 250),
        actionText: "Open",
        onExpanded: function (content) {
            var content = container.find(".section-content");
            fn_position_wrapper(content);
            if (iframe == null) {
                iframe = fn_create_cloudHQ_channel_iframe(channel_key, content, thread_date, thread_subject, thread_sender, thread_id);
            } else {
                fn_position_iframe(iframe, content);
            }
        }
    });
    if (isExpanded) {
        c_cmn.fn_delayed_conditional_execute({
            poll_delay: 20,
            max_poll_attempts: 1000,
            retry_message: null,
            condition: function () {
                return ($("#btn-cloudHQ-open-chat").length > 0);
            },
            continuation: function () {
                c_cmn.fn_log("fn_create_cloudHQ_notes_and_commands_view_element: expand");
                $("#btn-cloudHQ-open-chat").trigger("click");
                return true;
            }
        });
    }
    return container;
}

/*function fn_handle_cloudHQ_label_list_view(routeView, isExpanded) {
    if (!fn_is_ext_enabled("shared_labels")) {
        return;
    }
    var routeParams = routeView.getParams();
    var labelName = routeParams.labelName;
    var sharedLabelName = labelName.split("/")[0];
    var sharedLabelObj = null;
    for (var i = 0; i < g_shared_labels_list.length; i++) {
        if (g_shared_labels_list[i]["title"].toLowerCase() == sharedLabelName.toLowerCase()) {
            sharedLabelObj = g_shared_labels_list[i];
        }
    }
    var shared_label_obj_with_some_users = null;
    for (var i = 0; i < g_shared_labels_list_with_some_users.length; i++) {
        if (g_shared_labels_list_with_some_users[i]["title"].toLowerCase() == sharedLabelName.toLowerCase()) {
            shared_label_obj_with_some_users = g_shared_labels_list_with_some_users[i];
        }
    }
    var label_section_subtitle = "Label";
    if (shared_label_obj_with_some_users) {
        label_section_subtitle = "Shared Label";
    }
    if (labelName == "!Projects") {
        var section = routeView.addSection({
            title: routeParams.labelName.replace("/", " Â» "),
            subtitle: "All your instant projects",
            contentElement: $("<div></div>").get(0)
        });
        return;
    }
    if (sharedLabelObj) {
        var label_view_iframe = null;
        var chatElement = fn_create_section_container_for_route_view({
            height: Math.max(300, window.innerHeight - 250),
            allLabelNotes: true,
            onExpanded: function (content) {
                fn_position_wrapper(content);
                if (label_view_iframe == null) {
                    label_view_iframe = fn_create_cloudHQ_label_chat_iframe(content, sharedLabelObj, labelName);
                } else {
                    fn_position_iframe(label_view_iframe, content);
                }
            },
            onCollapsed: function (content) {
                fn_position_wrapper(content);
                fn_position_iframe(null, content);
            },
        }).hide();
        var section = routeView.addSection({
            title: routeParams.labelName.replace("/", " Â» "),
            subtitle: label_section_subtitle,
            contentElement: chatElement.get(0)
        });
        section.on("destroy", function (e) {
            if (sharedLabelObj && sharedLabelObj.share_config_channel_id) {
                fn_cloudHQ_label_chat_touch_channel(sharedLabelObj.share_config_channel_id);
            }
            chatElement.remove();
        });
        if (shared_label_obj_with_some_users) {
            $(".inboxsdk__resultsSection_title > h3").css({
                color: "#D74A36",
                "font-weight": "bold"
            });
        }
        var sectionHeader = $(".inboxsdk__resultsSection_header");
        sectionHeader.removeClass("Wg").attr({
            "padding": "20px 0 5px 0",
            "border-bottom": "1px #e5e5e5 solid",
            "position": "relative"
        });
        var sectionToolbar = $('<div style="float:right; margin: -10px -10px 0 0;"></div>').appendTo(sectionHeader);
        var btnShareText = "Share label";
        var btnShareLabel = $('<div class="J-J5-Ji" />').append('<div id="cloudHQ-btn-share" class="btn-toggle-section T-I J-J5-Ji T-I-KE L3" role="button" tabindex="0" gh="cm" style="-webkit-user-select: none;">' + btnShareText + "</div>").prependTo(sectionToolbar).click(function () {
            var labelToShare = labelName.split("/")[0];
            fn_display_share_label_dialog(labelToShare);
        });
        var btnUpdates = $('<div class="J-J5-Ji" />').append('<div id="cloudHQ-btn-updates" class="btn-toggle-section T-I J-J5-Ji T-I-KE L3" style="min-width:16px" role="button" tabindex="0" gh="cm" style="-webkit-user-select: none;">&#x1f514;</div>').prependTo(sectionToolbar).click(function (e) {
            fn_close_notif_window();
            e.stopPropagation();
            var origin = window.location.href.split(/\?|#/)[0];
            var url = g_server_url + "main_share/label_sharing_latest_messages/" + sharedLabelObj.share_config_id + "?origin=" + encodeURIComponent(origin) + "&email_or_login=" + encodeURIComponent(g_email_or_login) + "&switch_login=1";
            var btn = $(this);
            var width = 240;
            var left = btn.offset().left + (btn.outerWidth() / 2) - 8;
            var top = btn.offset().top + btn.outerHeight() + 1;
            var tooltip = $('<div class="inboxsdk__tooltip inboxsdk__appButton_tooltip cloudhq_notif_window" tabindex="-1" style="left: -1000px; top: -1000px;"><div class="T-P aRL" style="width: ' + width + 'px; border-radius: 3px;z-index: 10000;"><div class="T-P-Jz-UR"><div class="aRM" tabindex="0"></div></div><div class="T-P-hFsbo-UR T-P-hFsbo T-P-atB inboxsdk__tooltip_arrow" style="left: -1000px; top: -1000px;"><div class="T-P-atD"></div><div class="T-P-atC" style=""></div></div></div></div>');
            var tooltip_arrow = tooltip.find(".inboxsdk__tooltip_arrow");
            var tooltip_container = tooltip.find(".aRM");
            tooltip.css("left", (left - (width / 2)) + "px");
            tooltip.css("top", (top + 8) + "px");
            tooltip_arrow.css("left", left + "px");
            tooltip_arrow.css("top", top + "px");
            tooltip_container.css({
                "width": "100%",
                "min-height": "245px",
                "background-repeat": "no-repeat",
                "background-position": "center center",
                "background-color": "white",
                "background-image": "url(" + g_server_url + "images/loading.gif)"
            });
            var wrapper_page_url = chrome.extension.getURL("html/label_sharing_chat_wrapper.html" + "?iframe_src=" + encodeURIComponent(url));
            tooltip_container.html('<iframe width="240px" height="245px" style="border:none;padding-top:3px" border="0" src="' + wrapper_page_url + '"><html><body>Loading ...</html></body></iframe>');
            if (!g_is_preview_pane_mode) {
                tooltip_container.append($("<div><center>Show label chat</center></div>").css({
                    "cursor": "pointer",
                    "font-size": "10px",
                    "text-transform": "uppercase",
                    "color": "#333",
                    "display": "block",
                    "background": "#f9f9f9",
                    "border-top": "1px solid #ddd",
                    "padding": "6px 8px"
                }).click(function () {
                    chatElement.show();
                    chatElement.find(".btn-toggle-section").data("toggleView").call();
                }));
            }
            tooltip.appendTo($("body"));
        });
    } else {
        var btnShareText = "Share label";
        var btnShareLabel = $('<div class="J-J5-Ji" />').append('<div class="btn-toggle-section T-I J-J5-Ji T-I-KE L3" role="button" tabindex="0" gh="cm" style="-webkit-user-select: none;">' + btnShareText + "</div>").click(function () {
            var labelToShare = routeParams.labelName.split("/")[0];
            fn_display_share_label_dialog(labelToShare);
        });
        var section = routeView.addSection({
            title: routeParams.labelName.replace("/", " Â» "),
            subtitle: "Label",
            contentElement: $('<div style="height:1px"></div>').get(0)
        });
        var sectionHeader = $(".inboxsdk__resultsSection_header");
        sectionHeader.append($('<div style="float:right; margin: -10px -10px 0 0;"></div>').append(btnShareLabel));
        sectionHeader.removeClass("Wg").attr({
            "padding": "20px 0 5px 0",
            "border-bottom": "1px #e5e5e5 solid",
            "position": "relative"
        });
    }
}*/

function fn_close_notif_window() {
    $(".cloudhq_notif_window").remove();
}
function fn_get_current_label_name() {
    var route_view = g_sdk.Router.getCurrentRouteView();
    var label_name = null;
    var thread_id = route_view.getParams().threadID;
    var path = fn_get_gmail_current_path();
    if (route_view.getRouteType() == g_sdk.Router.RouteTypes.THREAD) {
        var path_tokens = path.trim().replace("/" + thread_id, "").split("/");
        if (path_tokens[0] == "label") {
            path_tokens.shift();
            label_name = path_tokens.join("/");
        } else {
            var label_name_list = $(".Bs.nH.iY .hN[name]").map(function () {
                return $(this).attr("name");
            }).get();
            label_name_list = jQuery.grep(label_name_list, function (value) {
                return value != "^i" && value != "!Projects";
            });
            if (label_name_list.length > 0) {
                label_name = label_name_list[0];
            }
        }
    } else {
        if (route_view.getRouteType() == g_sdk.Router.RouteTypes.LIST) {
            var path_tokens = path.trim().replace("/" + thread_id, "").split("/");
            if (path_tokens[0] == "label") {
                path_tokens.shift();
                label_name = path_tokens[0];
            }
        }
    }
    return label_name;
}
function fn_get_current_label_name1() {
    /*var label_name = null;
    //var thread_id = route_view.getParams().threadID;
    var path = fn_get_gmail_current_path();
   if (route_view.getRouteType() == g_sdk.Router.RouteTypes.THREAD) {
        var path_tokens = path.trim().replace("/" + thread_id, "").split("/");
        label_name=path_tokens[0];
        return label_name;
    if (path_tokens[0] == "label")
     {
       path_tokens.shift();
       label_name = path_tokens.join("/");
     } else {
            var label_name_list = $(".Bs.nH.iY .hN[name]").map(function () {
                return $(this).attr("name");
            }).get();
            label_name_list = jQuery.grep(label_name_list, function (value) {
                return value != "^i" && value != "!Projects";
            });
            if (label_name_list.length > 0) {
                label_name = label_name_list[0];
            }
        }
    
     }else {
        if (route_view.getRouteType() == g_sdk.Router.RouteTypes.LIST) {
            var path_tokens = path.trim().replace("/" + thread_id, "").split("/");
            if (path_tokens[0] == "label") {
                path_tokens.shift();
                label_name = path_tokens[0];
            }
        }
    }*/
    var label_name=null;
    var path=fn_get_gmail_current_path();
    var path_tokens = path.trim().replace("/" + thread_id, "").split("/");
    if(path_tokens[0]=="inbox"){
        label_name="INBOX";
    }
    if (path_tokens[0] == "label")
     {
       path_tokens.shift();
       label_name = path_tokens.join("/");
     }
     else {
            var label_name_list = $(".Bs.nH.iY .hN[name]").map(function () {
                return $(this).attr("name");
            }).get();
            label_name_list = jQuery.grep(label_name_list, function (value) {
                return value != "^i" && value != "!Projects";
            });
            if (label_name_list.length > 0) {
                label_name = label_name_list[0];
            }
        }
    return label_name;
}

function fn_get_current_shared_label_obj() {
    var route_view = g_sdk.Router.getCurrentRouteView();
    var shared_label_obj = null;
    var thread_id = route_view.getParams().threadID;
    var path = fn_get_gmail_current_path();
    if (route_view.getRouteType() == g_sdk.Router.RouteTypes.THREAD) {
        var path_tokens = path.trim().replace("/" + thread_id, "").split("/");
        if (path_tokens[0] == "label") {
            path_tokens.shift();
            var label_name = path_tokens.join("/");
            var shared_label_name = path_tokens[0];
            for (var i = 0; i < g_shared_labels_list.length; i++) {
                if (g_shared_labels_list[i] && g_shared_labels_list[i]["title"] && g_shared_labels_list[i]["title"].toLowerCase() == shared_label_name.toLowerCase()) {
                    shared_label_obj = g_shared_labels_list[i];
                }
            }
        }
        if (!shared_label_obj) {
            var label_name_list = $(".Bs.nH.iY .hN[name]").map(function () {
                return $(this).attr("name");
            }).get();
            for (var i = 0; i < g_shared_labels_list.length; i++) {
                for (var j = 0; j < label_name_list.length; j++) {
                    var shared_label_name = label_name_list[j].split("/")[0];
                    if (g_shared_labels_list[i] && g_shared_labels_list[i]["title"] && g_shared_labels_list[i]["title"].toLowerCase() == shared_label_name.toLowerCase()) {
                        shared_label_obj = g_shared_labels_list[i];
                    }
                }
            }
        }
    } else {
        if (route_view.getRouteType() == g_sdk.Router.RouteTypes.LIST) {
            var path_tokens = path.trim().replace("/" + thread_id, "").split("/");
            if (path_tokens[0] == "label") {
                path_tokens.shift();
                var label_name = path_tokens.join("/");
                var shared_label_name = path_tokens[0];
                for (var i = 0; i < g_shared_labels_list.length; i++) {
                    if (g_shared_labels_list[i]["title"] && g_shared_labels_list[i]["title"].toLowerCase() == shared_label_name.toLowerCase()) {
                        shared_label_obj = g_shared_labels_list[i];
                    }
                }
            }
            if (!shared_label_obj) {
                var label_name_list = $(".Bs.nH .hN[name]").filter(function () {
                    return $(this).is(":visible");
                }).map(function () {
                    return $(this).attr("name");
                }).get();
                for (var i = 0; i < g_shared_labels_list.length; i++) {
                    for (var j = 0; j < label_name_list.length; j++) {
                        var shared_label_name = label_name_list[j].split("/")[0];
                        if (g_shared_labels_list[i] && g_shared_labels_list[i]["title"] && g_shared_labels_list[i]["title"].toLowerCase() == shared_label_name.toLowerCase()) {
                            shared_label_obj = g_shared_labels_list[i];
                        }
                    }
                }
            }
        }
    }
    return shared_label_obj;
}

function fn_create_popup_for_compose_button(compose_view, el, btn, options) {
    var h = 210;
    var w = 190;
    var html = $("<center></center>");
    var tour_highlight_top_1 = $('<div class="cloudHQ__tour_highlight_top_1 cloudHQ__tour_highlight"></div>');
    var tour_highlight_top_2 = $('<div class="cloudHQ__tour_highlight_top_2 cloudHQ__tour_highlight"></div>');
    var tour_highlight_top_3 = $('<div class="cloudHQ__tour_highlight_top_3 cloudHQ__tour_highlight"></div>');
    var tour_highlight_top_4 = $('<div class="cloudHQ__tour_highlight_top_3 cloudHQ__tour_highlight"></div>');
    var tour_highlight_bottom_1 = $('<div class="cloudHQ__tour_highlight_bottom_1 cloudHQ__tour_highlight"></div>');
    var tour_highlight_bottom_2 = $('<div class="cloudHQ__tour_highlight_bottom_2 cloudHQ__tour_highlight"></div>');
    var tour_highlight_bottom_3 = $('<div class="cloudHQ__tour_highlight_bottom_3 cloudHQ__tour_highlight"></div>');
    var tour_highlight_bottom_4 = $('<div class="cloudHQ__tour_highlight_bottom_4 cloudHQ__tour_highlight"></div>');
    $("<h3>" + options.title + "</h3>").appendTo(html);
    $('<div style="color:#666">' + options.text + "</div>").appendTo(html);
    $('<div class="T-I J-J5-Ji aoO T-I-atl L3" role="button" tabindex="1" style="-webkit-user-select: none;margin-top:15px">Got It</div>').click(function () {
        hide_and_remember();
    }).appendTo(html);
    var popup = $('<div class="popover top"><div class="arrow"></div></div>');
    var btn_close = $('<div class="close">&times;</div>').appendTo(popup).click(function () {
        g_do_not_show_smart_labels_splash_screen = true;
        fn_save_state_to_local_storage();
        popup.remove();
        tour_highlight_top_1.remove();
        tour_highlight_top_2.remove();
        tour_highlight_top_3.remove();
        tour_highlight_top_4.remove();
        tour_highlight_bottom_1.remove();
        tour_highlight_bottom_2.remove();
        tour_highlight_bottom_3.remove();
        tour_highlight_bottom_4.remove();
        options.btn_click.call(this);
    });
    var content = $('<div class="popover-content"></div>').appendTo(popup);
    $(html).appendTo(content);
    var btn_wrapper = btn.closest("[data-tooltip]");
    popup.css({
        width: w + "px",
        height: h + "px",
        display: "block"
    }).appendTo($("body"));

    function hide_and_remember() {
        tour_highlight_top_1.remove();
        tour_highlight_top_2.remove();
        tour_highlight_top_3.remove();
        tour_highlight_top_4.remove();
        tour_highlight_bottom_1.remove();
        tour_highlight_bottom_2.remove();
        tour_highlight_bottom_3.remove();
        tour_highlight_bottom_4.remove();
        popup.remove();
        g_do_not_show_smart_labels_splash_screen = true;
        fn_save_state_to_local_storage();
    }

    function set_position() {
        popup.offset({
            top: btn.offset().top - h - (btn.height() / 2),
            left: (btn.offset().left + (btn.width() / 2)) - (w / 2)
        });
        tour_highlight_top_1_height = popup.offset().top + popup.height() + 16;
        tour_highlight_top_1_width = "100%";
        tour_highlight_top_1.css({
            top: "0px",
            height: tour_highlight_top_1_height,
            width: tour_highlight_top_1_width
        });
        tour_highlight_top_2_height = "100%";
        tour_highlight_top_2_width = btn_wrapper.offset().left;
        tour_highlight_top_2_top = tour_highlight_top_1.offset().top + tour_highlight_top_1.height();
        tour_highlight_top_2.css({
            top: tour_highlight_top_2_top,
            height: tour_highlight_top_2_height,
            width: tour_highlight_top_2_width
        });
        tour_highlight_top_3_height = "100%";
        tour_highlight_top_3_width = "100%";
        tour_highlight_top_3_top = popup.offset().top + popup.height() + 16;
        tour_highlight_top_3_left = btn_wrapper.offset().left + btn_wrapper.outerWidth();
        tour_highlight_top_3.css({
            top: tour_highlight_top_3_top,
            left: tour_highlight_top_3_left,
            height: tour_highlight_top_3_height,
            width: tour_highlight_top_3_width
        });
        tour_highlight_bottom_1_top = btn_wrapper.offset().top + btn_wrapper.outerHeight();
        tour_highlight_bottom_1_height = "100%";
        tour_highlight_bottom_1_width = btn_wrapper.outerWidth();
        tour_highlight_bottom_1_left = btn_wrapper.offset().left;
        tour_highlight_bottom_1.css({
            top: tour_highlight_bottom_1_top,
            height: tour_highlight_bottom_1_height,
            left: tour_highlight_bottom_1_left,
            width: tour_highlight_bottom_1_width
        });
    }
    tour_highlight_top_1.appendTo($("body"));
    tour_highlight_top_2.appendTo($("body"));
    tour_highlight_top_3.appendTo($("body"));
    tour_highlight_top_4.appendTo($("body"));
    tour_highlight_bottom_1.appendTo($("body"));
    tour_highlight_bottom_2.appendTo($("body"));
    tour_highlight_bottom_3.appendTo($("body"));
    tour_highlight_bottom_4.appendTo($("body"));
    set_position();
    $(window).resize(function () {
        set_position();
    });
    setTimeout(function () {
        set_position();
    }, 2000);
    $(compose_view.getBodyElement()).click(function () {
        g_do_not_show_smart_labels_splash_screen = true;
        fn_save_state_to_local_storage();
        tour_highlight_top_1.remove();
        tour_highlight_top_2.remove();
        tour_highlight_top_3.remove();
        tour_highlight_top_4.remove();
        tour_highlight_bottom_1.remove();
        tour_highlight_bottom_2.remove();
        tour_highlight_bottom_3.remove();
        tour_highlight_bottom_4.remove();
        popup.remove();
    });
}

function fn_create_popup_for_toolbar_button(el, btn, options) {
    if ($(".popover").length > 0 || $(".inboxsdk__modal_fullscreen").length > 0) {
        return;
    }
    var h = 190;
    var w = 350;
    var html = $("<center></center>");
    var tour_highlight_top_1 = $('<div class="cloudHQ__tour_highlight_top_1 cloudHQ__tour_highlight"></div>');
    var tour_highlight_top_2 = $('<div class="cloudHQ__tour_highlight_top_2 cloudHQ__tour_highlight"></div>');
    var tour_highlight_top_3 = $('<div class="cloudHQ__tour_highlight_top_3 cloudHQ__tour_highlight"></div>');
    var tour_highlight_top_4 = $('<div class="cloudHQ__tour_highlight_top_3 cloudHQ__tour_highlight"></div>');
    var tour_highlight_bottom_1 = $('<div class="cloudHQ__tour_highlight_bottom_1 cloudHQ__tour_highlight"></div>');
    var tour_highlight_bottom_2 = $('<div class="cloudHQ__tour_highlight_bottom_2 cloudHQ__tour_highlight"></div>');
    var tour_highlight_bottom_3 = $('<div class="cloudHQ__tour_highlight_bottom_3 cloudHQ__tour_highlight"></div>');
    var tour_highlight_bottom_4 = $('<div class="cloudHQ__tour_highlight_bottom_4 cloudHQ__tour_highlight"></div>');
    $("<h3>" + options.title + "</h3>").appendTo(html);
    $('<div style="color:#666">' + options.text + "</div>").appendTo(html);
    $('<div class="T-I J-J5-Ji aoO T-I-atl L3" role="button" tabindex="1" style="-webkit-user-select: none;margin-top:15px">' + options.btn_text + "</div>").click(function () {
        popup.remove();
        tour_highlight_top_1.remove();
        tour_highlight_top_2.remove();
        tour_highlight_top_3.remove();
        tour_highlight_top_4.remove();
        tour_highlight_bottom_1.remove();
        tour_highlight_bottom_2.remove();
        tour_highlight_bottom_3.remove();
        tour_highlight_bottom_4.remove();
        options.btn_click.call(this);
    }).appendTo(html);
    var popup = $('<div class="popover bottom"><div class="arrow"></div></div>');
    var btn_close = $('<div class="close">&times;</div>').appendTo(popup).click(function () {
        popup.remove();
        tour_highlight_top_1.remove();
        tour_highlight_top_2.remove();
        tour_highlight_top_3.remove();
        tour_highlight_top_4.remove();
        tour_highlight_bottom_1.remove();
        tour_highlight_bottom_2.remove();
        tour_highlight_bottom_3.remove();
        tour_highlight_bottom_4.remove();
        options.btn_click.call(this);
    });
   // var content = $('<div class="popover-content"></div>').appendTo(popup);
    //$(html).appendTo(content);
    var btn_wrapper = btn.closest("[data-tooltip]");
    popup.css({
        width: w + "px",
        height: h + "px",
        display: "block"
    }).appendTo(el);
    tour_highlight_top_1.appendTo($("body"));
    tour_highlight_top_2.appendTo($("body"));
    tour_highlight_top_3.appendTo($("body"));
    tour_highlight_top_4.appendTo($("body"));
    tour_highlight_bottom_1.appendTo($("body"));
    tour_highlight_bottom_2.appendTo($("body"));
    tour_highlight_bottom_3.appendTo($("body"));
    tour_highlight_bottom_4.appendTo($("body"));

    function set_position() {
        popup.offset({
            top: btn.offset().top + btn.height() + 15,
            left: btn.offset().left - (w / 2) + (btn.width() / 2)
        });
        tour_highlight_top_1_height = btn_wrapper.offset().top;
        tour_highlight_top_1_width = "100%";
        tour_highlight_top_1.css({
            top: "0px",
            height: tour_highlight_top_1_height,
            width: tour_highlight_top_1_width
        });
        tour_highlight_top_2_height = "100%";
        tour_highlight_top_2_width = popup.offset().left;
        tour_highlight_top_2_top = tour_highlight_top_1.offset().top + tour_highlight_top_1.height();
        tour_highlight_top_2.css({
            top: tour_highlight_top_2_top,
            height: tour_highlight_top_2_height,
            width: tour_highlight_top_2_width
        });
        tour_highlight_top_3_height = btn_wrapper.offset().top;
        tour_highlight_top_3_width = btn_wrapper.offset().left - popup.offset().left;
        tour_highlight_top_3_top = tour_highlight_top_1.offset().top + tour_highlight_top_1.height();
        tour_highlight_top_3_left = popup.offset().left;
        tour_highlight_top_3.css({
            top: tour_highlight_top_3_top,
            left: tour_highlight_top_3_left,
            height: tour_highlight_top_3_height,
            width: tour_highlight_top_3_width
        });
        tour_highlight_bottom_1_top = popup.offset().top + popup.height();
        tour_highlight_bottom_1_height = "100%";
        tour_highlight_bottom_1_width = "100%";
        tour_highlight_bottom_1_left = popup.offset().left;
        tour_highlight_bottom_1.css({
            top: tour_highlight_bottom_1_top,
            height: tour_highlight_bottom_1_height,
            left: tour_highlight_bottom_1_left,
            width: tour_highlight_bottom_1_width
        });
        tour_highlight_bottom_2_top = btn_wrapper.offset().top;
        tour_highlight_bottom_2_left = btn_wrapper.offset().left + btn_wrapper.outerWidth();
        tour_highlight_bottom_2_height = tour_highlight_bottom_2_height = popup.height() + btn_wrapper.height() + 16;
        tour_highlight_bottom_2_width = "100%";
        tour_highlight_bottom_2.css({
            top: tour_highlight_bottom_2_top,
            left: tour_highlight_bottom_2_left,
            height: tour_highlight_bottom_2_height,
            width: tour_highlight_bottom_2_width
        });
        tour_highlight_bottom_3_top = btn_wrapper.offset().top + btn_wrapper.outerHeight();
        tour_highlight_bottom_3_left = btn_wrapper.offset().left;
        tour_highlight_bottom_3_height = 16;
        tour_highlight_bottom_3_width = btn_wrapper.outerWidth();
        tour_highlight_bottom_3.css({
            top: tour_highlight_bottom_3_top,
            left: tour_highlight_bottom_3_left,
            height: tour_highlight_bottom_3_height,
            width: tour_highlight_bottom_3_width
        });
    }
    set_position();
    $(window).resize(function () {
        set_position();
    });
    setTimeout(function () {
        set_position();
    }, 2000);
}

function fn_show_snooze_email_splash_screen(thread_view) {
    var btn = $(".chqBtnSnoozeEmail");
    fn_create_popup_for_toolbar_button($("body"), btn, {
        title: "Snooze your email",
        text: "Use this button to snooze your email. The snoozed emails will be archived and then bumped to the top of your inbox at the scheduled time.",
        btn_text: "Got It",
        btn_click: function () {}
    });
}

function fn_show_save_to_splash_screen(thread_view) {
    var btn = $(".chqBtnSaveToDropdown");
    fn_create_popup_for_toolbar_button($("body"), btn, {
        title: "Save email to cloud storage (Dropbox, Google Drive, etc.)",
        text: "Use this button to save emails and attachments to your cloud storage as PDF.",
        btn_text: "Got It",
        btn_click: function () {
            fn_show_snooze_email_splash_screen(thread_view);
        }
    });
}

function fn_show_rename_subject_splash_screen(thread_view) {
    var btn = $(".chqBtnRenameSubject");
    fn_create_popup_for_toolbar_button($("body"), btn, {
        title: "Rename subject of the email",
        text: "Use this button to rename subject your email. For example, you can rename customer emails to have subject describing the problem / question in more details.",
        btn_text: "Got It",
        btn_click: function () {
            fn_show_save_to_splash_screen(thread_view);
        }
    });
}

function fn_show_docit_splash_screen(thread_view) {
    var btn = $(".chqBtnShareEmail");
    fn_create_popup_for_toolbar_button($("body"), btn, {
        title: "Share email as link",
        text: "Use this button to create a shareable link to this email. You can use the link to share this email on Slack, Skype, or any other messaging service.",
        btn_text: "Got It",
        btn_click: function () {
            fn_show_rename_subject_splash_screen(thread_view);
        }
    });
}

function fn_handle_cloudHQ_thread_view(thread_view) {
    var route_view = g_sdk.Router.getCurrentRouteView();
    var thread_subject = thread_view.getSubject();
    var thread_date;
    var thread_sender = "";
    $(".nH.if").each(function (counter) {
        var header_elem = $(this).find("h2.hP");
        if (header_elem && header_elem.text() == thread_subject) {
            thread_date = Sugar.Date.create($(this).find(".gH .g3").attr("title"), g_lang_of_html).toISOString();
        }
    });
    if (!thread_date) {
        thread_date = Sugar.Date.create($(".gH .g3").attr("title"), g_lang_of_html).toISOString();
    }
    try {
        thread_sender = thread_view.getMessageViews()[0].getSender()["emailAddress"];
    } catch (e) {}
    if (route_view.getRouteType() == g_sdk.Router.RouteTypes.THREAD || route_view.getRouteType() == g_sdk.Router.RouteTypes.LIST) {
        var thread_id = route_view.getParams().threadID;
        var shared_label_obj = fn_get_current_shared_label_obj();
        var chatElement = null;
        var chatTitle = null;
        var chatImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEUAAABNkP72YfJdAAAAAXRSTlMAQObYZgAAADpJREFUGNNjwAfY/wPBAwZ+EPWBFOoDAxBjo+iikjDFDqFAgB9CsUMoZgjFCKEYoFQBhDKAUAL4ggwAkSGA3zhYUN4AAAAASUVORK5CYII=";
        var channel_key = null;
        var channel_id = null;
        for (var i = 0, len = g_thread_list_with_project.length; i < len; i++) {
            var value = g_thread_list_with_project[i];
            if (value && value["thread_subject"] == thread_subject && value["thread_date"] == thread_date) {
                channel_key = value["channel_key"];
                channel_id = value["channel_id"];
            }
        }
        if (channel_key) {} else {
            if (shared_label_obj) {
                chatTitle = "Notes (shared)";
                chatElement = fn_create_cloudHQ_label_chat_thread_view_element(shared_label_obj, shared_label_obj["title"], thread_date, thread_subject, thread_sender, thread_id, g_autoexpand_flag).css("margin-top", 0);
                var view = thread_view.addSidebarContentPanel({
                    id: "cloudHQ__notes_shared",
                    title: chatTitle,
                    iconUrl: chatImage,
                    el: chatElement.get(0)
                });
                view.on("destroy", function () {
                    if (shared_label_obj.share_config_channel_id) {
                        fn_cloudHQ_label_chat_touch_channel(shared_label_obj.share_config_channel_id);
                    }
                    chatElement.remove();
                });
                if (g_does_it_need_to_upgrade && false) {
                    var message_views_list = thread_view.getMessageViews();
                    for (i = 0; i < message_views_list.length; i++) {
                        var message_view = message_views_list[i];
                        if (message_view.isLoaded() && message_view.getViewState() == g_sdk.Conversations.MessageViewViewStates.EXPANDED) {
                            html_of_message = message_view.getBodyElement();
                            if (html_of_message && $(html_of_message).length > 0) {
                                $(html_of_message).append('<span style="font-style: italic">This email was shared using the free version of Gmail Label Sharing. <a target="_blank" href="' + g_server_url + 'purchase?cycle=M&extra_licenses=0&subscription_what=1&from=label_sharing">Upgrade</a> to remove this message.</span><br/>');
                            }
                        }
                    }
                }
            } else {
                chatTitle = "Notes";
                chatElement = fn_create_cloudHQ_notes_and_commands_view_element(null, thread_date, thread_subject, thread_sender, thread_id, g_autoexpand_flag).css("margin-top", 0);
                var view = thread_view.addSidebarContentPanel({
                    id: "cloudHQ__notes",
                    title: chatTitle,
                    iconUrl: chatImage,
                    el: chatElement.get(0)
                });
                view.on("destroy", function () {
                    chatElement.remove();
                });
            }
        }
        if (!g_do_not_show_notes_splash_screen) {
            c_cmn.fn_delayed_conditional_execute({
                poll_delay: 500,
                max_poll_attempts: 20,
                retry_message: null,
                condition: function () {
                    return (($(document).find(".Bu.y3 .section-container.section-expanded")).length > 0);
                },
                continuation: function () {
                    if ($(".popover").length > 0 || $(".inboxsdk__modal_fullscreen").length > 0) {
                        return;
                    }
                    g_do_not_show_notes_splash_screen = true;
                    fn_save_state_to_local_storage();
                    var h = 180;
                    var w = 350;
                    var inboxsdk_sidebar = null;
                    var html = $("<center></center>");
                    $("<h3>Notes</h3>").appendTo(html);
                   // $('<div style="color:#666">Here you can write notes about your email. And if this email is shared then notes are also shared. Type /help for more info.</div>').appendTo(html);
                    $('<div class="T-I J-J5-Ji aoO T-I-atl L3" role="button" tabindex="1" style="-webkit-user-select: none;margin-top:15px">Got It</div>').click(function () {
                        hide_and_remember();
                    }).appendTo(html);
                    $(document).find(".Bu.y3 .section-container.section-expanded").each(function () {
                        inboxsdk_sidebar = $(this);
                    });
                  //  var popup = $('<div class="popover left"><div class="arrow"></div></div>');
                    var btn_close = $('<div class="close">&times;</div>').appendTo(popup).click(function () {
                        fn_save_state_to_local_storage();
                        tour_highlight_top_1.remove();
                        tour_highlight_top_2.remove();
                        tour_highlight_top_3.remove();
                        tour_highlight_top_4.remove();
                        tour_highlight_bottom_1.remove();
                        tour_highlight_bottom_2.remove();
                        tour_highlight_bottom_3.remove();
                        tour_highlight_bottom_4.remove();
                        popup.remove();
                        fn_show_docit_splash_screen(thread_view);
                    });
                    var content = $('<div class="popover-content"></div>').appendTo(popup);
                    $(html).appendTo(content);
                    var tour_highlight_top_1 = $('<div class="cloudHQ__tour_highlight_top_1 cloudHQ__tour_highlight"></div>');
                    var tour_highlight_top_2 = $('<div class="cloudHQ__tour_highlight_top_2 cloudHQ__tour_highlight"></div>');
                    var tour_highlight_top_3 = $('<div class="cloudHQ__tour_highlight_top_3 cloudHQ__tour_highlight"></div>');
                    var tour_highlight_top_4 = $('<div class="cloudHQ__tour_highlight_top_3 cloudHQ__tour_highlight"></div>');
                    var tour_highlight_bottom_1 = $('<div class="cloudHQ__tour_highlight_bottom_1 cloudHQ__tour_highlight"></div>');
                    var tour_highlight_bottom_2 = $('<div class="cloudHQ__tour_highlight_bottom_2 cloudHQ__tour_highlight"></div>');
                    var tour_highlight_bottom_3 = $('<div class="cloudHQ__tour_highlight_bottom_3 cloudHQ__tour_highlight"></div>');
                    var tour_highlight_bottom_4 = $('<div class="cloudHQ__tour_highlight_bottom_4 cloudHQ__tour_highlight"></div>');
                    popup.css({
                        width: w + "px",
                        height: h + "px",
                        display: "block"
                    }).appendTo($("body"));
                    tour_highlight_top_1.appendTo($("body"));
                    tour_highlight_top_2.appendTo($("body"));
                    tour_highlight_top_3.appendTo($("body"));
                    tour_highlight_top_4.appendTo($("body"));
                    tour_highlight_bottom_1.appendTo($("body"));
                    tour_highlight_bottom_2.appendTo($("body"));
                    tour_highlight_bottom_3.appendTo($("body"));
                    tour_highlight_bottom_4.appendTo($("body"));

                    function hide_and_remember() {
                        popup.remove();
                        tour_highlight_top_1.remove();
                        tour_highlight_top_2.remove();
                        tour_highlight_top_3.remove();
                        tour_highlight_top_4.remove();
                        tour_highlight_bottom_1.remove();
                        tour_highlight_bottom_2.remove();
                        tour_highlight_bottom_3.remove();
                        tour_highlight_bottom_4.remove();
                        g_do_not_show_notes_splash_screen = true;
                        fn_save_state_to_local_storage();
                        fn_show_docit_splash_screen(thread_view);
                    }

                    function set_position() {
                        popup.offset({
                            top: inboxsdk_sidebar.offset().top + inboxsdk_sidebar.height() - 1.2 * h,
                            left: inboxsdk_sidebar.offset().left - w
                        });
                        tour_highlight_top_1_height = inboxsdk_sidebar.offset().top - 40;
                        tour_highlight_top_1_width = "100%";
                        tour_highlight_top_1.css({
                            top: "0px",
                            height: tour_highlight_top_1_height,
                            width: tour_highlight_top_1_width
                        });
                        tour_highlight_top_2_height = "100%";
                        tour_highlight_top_2_width = popup.offset().left;
                        tour_highlight_top_2_top = tour_highlight_top_1.offset().top + tour_highlight_top_1.height();
                        tour_highlight_top_2.css({
                            top: tour_highlight_top_2_top,
                            height: tour_highlight_top_2_height,
                            width: tour_highlight_top_2_width
                        });
                        tour_highlight_top_3_height = popup.offset().top;
                        tour_highlight_top_3_width = inboxsdk_sidebar.offset().left - popup.offset().left;
                        tour_highlight_top_3_top = tour_highlight_top_1.offset().top + tour_highlight_top_1.height();
                        tour_highlight_top_3_left = popup.offset().left;
                        tour_highlight_top_3.css({
                            top: tour_highlight_top_3_top,
                            left: tour_highlight_top_3_left,
                            height: tour_highlight_top_3_height,
                            width: tour_highlight_top_3_width
                        });
                        tour_highlight_bottom_1_top = popup.offset().top + popup.height();
                        tour_highlight_bottom_1_height = popup.position().top + popup.offset().top + popup.outerHeight(true);
                        tour_highlight_bottom_1_width = inboxsdk_sidebar.offset().left - popup.offset().left;
                        tour_highlight_bottom_1_left = popup.offset().left;
                        tour_highlight_bottom_1.css({
                            top: tour_highlight_bottom_1_top,
                            height: tour_highlight_bottom_1_height,
                            left: tour_highlight_bottom_1_left,
                            width: tour_highlight_bottom_1_width
                        });
                        tour_highlight_bottom_2_top = inboxsdk_sidebar.offset().top + inboxsdk_sidebar.height();
                        tour_highlight_bottom_2_left = inboxsdk_sidebar.offset().left;
                        tour_highlight_bottom_2_height = inboxsdk_sidebar.position().top + inboxsdk_sidebar.offset().top + inboxsdk_sidebar.outerHeight(true);
                        tour_highlight_bottom_2_width = "100%";
                        tour_highlight_bottom_2.css({
                            top: tour_highlight_bottom_2_top,
                            left: tour_highlight_bottom_2_left,
                            height: tour_highlight_bottom_2_height,
                            width: tour_highlight_bottom_2_width
                        });
                        tour_highlight_bottom_3_top = tour_highlight_top_1.offset().top + tour_highlight_top_1.height();
                        tour_highlight_bottom_3_left = inboxsdk_sidebar.offset().left + inboxsdk_sidebar.width();
                        tour_highlight_bottom_3_height = inboxsdk_sidebar.height() + 40;
                        tour_highlight_bottom_3_width = "100%";
                        tour_highlight_bottom_3.css({
                            top: tour_highlight_bottom_3_top,
                            left: tour_highlight_bottom_3_left,
                            height: tour_highlight_bottom_3_height,
                            width: tour_highlight_bottom_3_width
                        });
                    }
                    set_position();
                    $(window).resize(function () {
                        set_position();
                    });
                }
            });
        }
    }
    return true;
}

function fn_analize_and_store_contacts_on_thread(threadId, contactList) {
    var labelName = null;
    var route = g_sdk.Router.getCurrentRouteView();
    if (route && route.getRouteID() == g_sdk.Router.NativeListRouteIDs.LABEL) {
        labelName = route.getParams()["labelName"];
    } else {
        return;
    }
    if (!g_label_contacts_db[labelName]) {
        g_label_contacts_db[labelName] = {
            "scaned": [],
            "map": {}
        };
    }
    if (g_label_contacts_db[labelName]["scaned"].indexOf(threadId) > -1) {
        return;
    }
    g_label_contacts_db[labelName]["scaned"].push(threadId);
    var contact, contactKey;
    for (var i = 0; i < contactList.length; i++) {
        contact = contactList[i];
        contactKey = contact["emailAddress"];
        if (!g_label_contacts_db[labelName]["map"][contactKey]) {
            g_label_contacts_db[labelName]["map"][contactKey] = contact;
        }
        g_label_contacts_db[labelName]["map"][contactKey].weight = ((g_label_contacts_db[labelName]["map"][contactKey].weight || 0) + 1);
    }
}

function fn_get_label_contacts(labelName) {
    var db = g_label_contacts_db[labelName];
    if (!db) {
        return [];
    }
    var map = db["map"];
    var list = [];
    var maxWeight = 0;
    if (map) {
        for (var key in map) {
            maxWeight = Math.max(map[key].weight, maxWeight);
        }
        var w = maxWeight;
        while (w > 0) {
            for (var key in map) {
                if (map[key].weight == w) {
                    list.push(map[key]);
                }
            }
            w = w - 1;
        }
    }
    return list;
}

function fn_thread_row_view_add_label(threadRowView, this_thread_status_text) {
    try {
        $(threadRowView._threadRowViewDriver._elements).find(".inboxsdk__thread_row_label").remove();
    } catch (e) {}
    try {
        threadRowView.addLabel({
            title: this_thread_status_text,
            iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEUAAABNkP72YfJdAAAAAXRSTlMAQObYZgAAADpJREFUGNNjwAfY/wPBAwZ+EPWBFOoDAxBjo+iikjDFDqFAgB9CsUMoZgjFCKEYoFQBhDKAUAL4ggwAkSGA3zhYUN4AAAAASUVORK5CYII="
        });
      
    } catch (e) {}
}

function fn_handle_cloudHQ_thread_row_view(threadRowView) {
    var list = threadRowView.getContacts();
    if (list) {
        fn_analize_and_store_contacts_on_thread(threadRowView.getThreadID(), list);
    }
}
g_thread_row_comment_button_timeout = null;
g_thread_row_comment_button_list_current = null;
g_thread_row_comment_button_list_visible = null;
g_thread_metadata_by_thread_id_cache = null;

function fn_handle_cloudHQ_thread_row_button(thread_row_view) {
    if (g_thread_row_comment_button_list_current == null) {
        g_thread_row_comment_button_list_current = [];
    }
    g_thread_row_comment_button_list_current.push(thread_row_view);
    if (g_thread_row_comment_button_timeout) {
        window.clearTimeout(g_thread_row_comment_button_timeout);
    }
    thread_row_comment_button_timeout = window.setTimeout(function () {
        if (g_thread_row_comment_button_list_current) {
            fn_create_thread_row_comment_button_list(g_thread_row_comment_button_list_current);
            if (g_do_not_show_docit_buttons) {} else {
                fn_create_thread_row_docit_button_list(g_thread_row_comment_button_list_current);
            }
            g_thread_row_comment_button_list_visible = g_thread_row_comment_button_list_current;
            g_thread_row_comment_button_list_current = null;
        }
    }, 1000);
}

function fn_create_thread_row_docit_button_list(thread_row_views, callback) {
    try {
        if (!thread_row_views) {
            return;
        }
        for (var i = 0; i < thread_row_views.length; i++) {
            fn_create_thread_row_docit_button(thread_row_views[i]);
        }
    } catch (err) {
        console.log("fn_create_thread_row_docit_button_list: ERROR: err=", err);
    }
}

function fn_get_current_shared_label_obj_given_thread_id(thread_id) {
    try {
        var shared_label_obj = null;
        var label_name_list = null;
        var route_view = g_sdk.Router.getCurrentRouteView();
        label_name_list = $('.inboxsdk__thread_row[data-inboxsdk-threadid="' + thread_id + '"] .at').filter(function () {
            return $(this).is(":visible");
        }).map(function () {
            return $(this).attr("title");
        }).get();
        for (var i = 0; i < g_shared_labels_list.length; i++) {
            for (var j = 0; j < label_name_list.length; j++) {
                var shared_label_name = label_name_list[j].split("/")[0];
                if (g_shared_labels_list[i] && g_shared_labels_list[i]["title"] && g_shared_labels_list[i]["title"].toLowerCase() == shared_label_name.toLowerCase()) {
                    shared_label_obj = g_shared_labels_list[i];
                }
            }
        }
        if (route_view && route_view.getRouteType() == g_sdk.Router.RouteTypes.LIST) {
            var path = fn_get_gmail_current_path();
            var path_tokens = path.trim().replace("/" + thread_id, "").split("/");
            if (path_tokens[0] == "label") {
                path_tokens.shift();
                var label_name = path_tokens.join("/");
                var shared_label_name = path_tokens[0];
                for (var i = 0; i < g_shared_labels_list.length; i++) {
                    if (g_shared_labels_list[i]["title"] && g_shared_labels_list[i]["title"].toLowerCase() == shared_label_name.toLowerCase()) {
                        shared_label_obj = g_shared_labels_list[i];
                    }
                }
            }
        }
        return shared_label_obj;
    } catch (err) {
        console.log("fn_get_current_shared_label_obj_given_thread_id: ERROR: err=", err);
    }
}

function fn_get_is_read_given_thread_id(thread_id) {
    try {
        var is_read = $('.inboxsdk__thread_row[data-inboxsdk-threadid="' + thread_id + '"] b').length == 0;
        var cur_label=fn_get_current_label_name();
        if(cur_label=="-Snoozed"){
            is_read=true;
        }
        return is_read;
    } catch (err) {
        console.log("fn_get_current_shared_label_obj_given_thread_id: ERROR: err=", err);
    }
}

function fn_create_thread_row_comment_button_list(thread_row_views) {
    var thread_list = [];
    try {
        if (!thread_row_views) {
            return;
        }
        var current_label_name = fn_get_current_label_name();
        for (var i = 0; i < thread_row_views.length; i++) {
            try {
                if (thread_row_views[i]) {
                    var thread_id = thread_row_views[i].getThreadID();
                    if (thread_id) {
                        thread_entry = {
                            "thread_id": thread_id + ""
                        };
                        var shared_label_obj = fn_get_current_shared_label_obj_given_thread_id(thread_id + "");
                        if (shared_label_obj) {
                            thread_entry["share_config_id"] = shared_label_obj.share_config_id;
                        }
                        var is_read = fn_get_is_read_given_thread_id(thread_id + "");
                        if(current_label_name=="-Snoozed"){
                            is_read=true;
                        }
                        thread_entry["is_read"] = is_read;
                        thread_list.push(thread_entry);
                    }
                }
            } catch (err) {
                console.log("fn_create_thread_row_comment_button_list: ERROR: thread_row_views err=", err);
            }
        }
    } catch (err) {
        console.log("fn_create_thread_row_comment_button_list: ERROR: err=", err);
    }
    var is_cache_current;
    if (g_thread_metadata_by_thread_id_cache) {
        is_cache_current = true;
        for (var i = 0; i < thread_row_views.length; i++) {
            if (thread_row_views[i]) {
                var thread_id = thread_row_views[i].getThreadID();
                if (thread_id) {
                    if (!g_thread_metadata_by_thread_id_cache[thread_id]) {
                        is_cache_current = false;
                        break;
                    }
                    if (g_thread_metadata_by_thread_id_cache[thread_id]["snooze_time"] && current_label_name == "-Snoozed") {
                        is_cache_current = false;
                        break;
                    }
                    if (g_thread_metadata_by_thread_id_cache[thread_id]["snooze_time"] && !current_label_name) {
                        is_cache_current = false;
                        break;
                    }
                }
            }
        }
    } else {
        is_cache_current = false;
        g_thread_metadata_by_thread_id_cache = [];
    }
    if (is_cache_current) {
        var thread_metadata_by_thread_id = [];
        for (var i = 0; i < thread_row_views.length; i++) {
            thread_row_view = thread_row_views[i];
            thread_id = thread_row_view.getThreadID();
            if (g_thread_metadata_by_thread_id_cache[thread_id] && g_thread_metadata_by_thread_id_cache[thread_id] != "nothing") {
                thread_metadata_by_thread_id[thread_id] = g_thread_metadata_by_thread_id_cache[thread_id];
            }
        }
        fn_update_thread_row_comment_button_list_impl(thread_row_views, thread_metadata_by_thread_id);
    } else {
        fn_create_thread_row_comment_button_list_update(thread_row_views, thread_list);
    }
}

function fn_create_thread_row_comment_button_list_update(thread_row_views, thread_list) {
    try {
        console.log("fn_create_thread_row_comment_button_list_update: LOOKUP: thread_list", thread_list);
        var data = {
            "thread_list": JSON.stringify(thread_list),
            "email_or_login": g_email_or_login,
            "switch_login": "1"
        };
        $.ajax({
            type: "POST",
            dataType: "json",
            url: g_server_url + "main_share/label_sharing_get_metadata_for_thread_list",
            data: data,
            async: true,
            success: function (thread_metadata_by_thread_id, t, x) {
                if (!g_thread_metadata_by_thread_id_cache) {
                    g_thread_metadata_by_thread_id_cache = [];
                }
                for (var i = 0; i < thread_row_views.length; i++) {
                    thread_row_view = thread_row_views[i];
                    thread_id = thread_row_view.getThreadID();
                    g_thread_metadata_by_thread_id_cache[thread_id] = "nothing";
                    for (var key in thread_metadata_by_thread_id) {
                        if (key == thread_id) {
                            g_thread_metadata_by_thread_id_cache[thread_id] = thread_metadata_by_thread_id[thread_id];
                        }
                    }
                }
                fn_update_thread_row_comment_button_list_impl(thread_row_views, thread_metadata_by_thread_id);
            },
            error: function (res, t, x) {
                console.log("ERR", res);
            }
        });
    } catch (err) {
        console.log("fn_create_thread_row_comment_button_list_update: ERROR: err=", err);
    }
}

function fn_update_thread_row_comment_button_list_impl(thread_row_views, thread_metadata_by_thread_id) {
    var thread_row_view = null;
    var thread_id = null;
    var current_label_name = fn_get_current_label_name();
    for (var i = 0; i < thread_row_views.length; i++) {
        thread_row_view = thread_row_views[i];
        thread_id = thread_row_view.getThreadID();
        for (var key in thread_metadata_by_thread_id) {
            if (key == thread_id) {
                if (thread_metadata_by_thread_id[thread_id] && thread_metadata_by_thread_id[thread_id]["chat_entries"]) {
                    fn_create_thread_row_comment_button(thread_row_view);
                }
                if (thread_metadata_by_thread_id[thread_id] && thread_metadata_by_thread_id[thread_id]["thread_status_text"]) {
                    fn_thread_row_view_add_label(thread_row_view, thread_metadata_by_thread_id[thread_id]["thread_status_text"]);
                }
                if (thread_metadata_by_thread_id[thread_id] && thread_metadata_by_thread_id[thread_id]["thread_flag"]) {
                    fn_create_thread_row_flag_button(thread_row_view, thread_metadata_by_thread_id[thread_id]["thread_flag"]);
                }
                if (current_label_name == "-Snoozed") {
                    if (thread_metadata_by_thread_id[thread_id] && thread_metadata_by_thread_id[thread_id]["snooze_time"]) {
                        var read=fn_get_is_read_given_thread_id();
                        read=true;
                        thread_row_view.is_read=read;
                        fn_create_thread_row_snooze_time(thread_row_view, thread_metadata_by_thread_id[thread_id]["snooze_time"], thread_metadata_by_thread_id[thread_id]["snooze_note"]);
                    }
                }
                if (current_label_name == "INBOX"||!current_label_name) {
                    if (thread_metadata_by_thread_id[thread_id] && thread_metadata_by_thread_id[thread_id]["wakeup_time"]) {
                        fn_create_thread_row_snooze_note(thread_row_view, thread_metadata_by_thread_id[thread_id]["wakeup_time"], thread_metadata_by_thread_id[thread_id]["snooze_note"]);
                    }
                }
                if (thread_metadata_by_thread_id[thread_id] && thread_metadata_by_thread_id[thread_id]["schedule_time"]) {
                    fn_create_thread_row_schedule_time(thread_row_view, thread_metadata_by_thread_id[thread_id]["schedule_time"]);
                }
            }
        }
    }
}
function fn_create_thread_unread_label(){
     threadRowView.addLabel({
                "title": "New",
                backgroundColor: "#ef6c00", 
                "text":"New",
                tooltip:"New",

            });
}
function fn_create_thread_row_snooze_time(threadRowView, snooze_time, snooze_note) {
    var snooze_time_as_string = "";
    snooze_time_as_string = new Date(snooze_time).format("%x, %X");
    /*try {
        $(threadRowView._threadRowViewDriver._elements).find(".inboxsdk__thread_row_custom_date").remove();
    } catch (e) {}*/
    threadRowView.replaceDate({
        text:  snooze_time_as_string
    });
    if (!snooze_note) {
        try {
            $(threadRowView._threadRowViewDriver._elements).find(".inboxsdk__thread_row_label").remove();
        } catch (e) {}
        try {
            threadRowView.addLabel({
                "title": "Snooze",
                backgroundColor: "#ef6c00", 
                "text":snooze_time_as_string,
                tooltip:"Snooze",
                //iconUrl:"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDY5OS40MjggNjk5LjQyOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjk5LjQyOCA2OTkuNDI4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGcgaWQ9IkJlbGwiPgoJCTxnPgoJCQk8cGF0aCBkPSJNNjE4LjY2Niw0ODcuMjYyYy00Mi4xMTktMzYuNDE0LTcyLjIzOC0xMzMuMTc2LTcyLjIzOC0yNDYuODMzYzAtODYuMDMtNTUuMjk4LTE1OC45NjctMTMyLjIzNS0xODUuNjc2ICAgICBDNDA5LjAxMywyMy43MTUsMzgyLjIxNiwwLDM0OS43MTQsMGMtMzIuNTAxLDAtNTkuMjk4LDIzLjcxNS02NC40NzksNTQuNzUyQzIwOC4yOTgsODEuNDYxLDE1MywxNTQuMzk5LDE1MywyNDAuNDI5ICAgICBjMCwxMTMuNjM2LTMwLjA5NywyMTAuMzc0LTcyLjIzOCwyNDYuODMzYy0yMy41MTgsMjAuMzUtMzcuMDQ4LDQ5LjktMzcuMDQ4LDgxLjAyM2MwLDM2LjIxOSwyOS4zNTQsNjUuNTcyLDY1LjU3MSw2NS41NzIgICAgIGgxNzQuODU3YzAsMzYuMjE3LDI5LjM1NCw2NS41Nyw2NS41NzEsNjUuNTdjMzYuMjE3LDAsNjUuNTcxLTI5LjM1NCw2NS41NzEtNjUuNTdoMTc0Ljg1N2MzNi4yMTcsMCw2NS41NzEtMjkuMzU0LDY1LjU3MS02NS41NzIgICAgIEM2NTUuNzE0LDUzNy4xODQsNjQyLjIwNiw1MDcuNjExLDYxOC42NjYsNDg3LjI2MnogTTEwOS4yODUsNTY4LjI4NWMwLTEyLjA2NCw1LjI0Ni0yMy41MzksMTQuMzYtMzEuNDMgICAgIGM1OC41NTUtNTAuNjIxLDk0LjkyNS0xNjQuMjEzLDk0LjkyNS0yOTYuNDI3YzAtNzIuMzI1LDU4LjgxOC0xMzEuMTQzLDEzMS4xNDMtMTMxLjE0M3MxMzEuMTQzLDU4LjgxOCwxMzEuMTQzLDEzMS4xNDMgICAgIGMwLDEzMi4yMTQsMzYuMzcsMjQ1LjgwNiw5NC45MjYsMjk2LjQyN2M5LjEzNyw3LjkxMiwxNC4zNiwxOS4zNjUsMTQuMzYsMzEuNDNIMTA5LjI4NXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
            });
        } catch (e) {}
        try {
            $(threadRowView._threadRowViewDriver._elements).find(".inboxsdk__thread_row_label .av").css({
                "max-width": "200px"
            });
        } catch (e) {}
    }
}

function fn_create_thread_row_snooze_note(threadRowView, wakeup_time, snooze_note) {
      var snooze_time_as_string = "";
    snooze_time_as_string = new Date(wakeup_time).format("%x, %X");
    try {
        $(threadRowView._threadRowViewDriver._elements).find(".inboxsdk__thread_row_label").remove();
    } catch (e) {}
    try {
        $(threadRowView._threadRowViewDriver._elements).find(".inboxsdk__thread_row_attachment_icon").remove();
    } catch (e) {}
    try {
        threadRowView.addLabel({
                "title": "back",
                backgroundColor: "#ef6c00", 
                "text":snooze_time_as_string,
                tooltip:"back",

            });
        
    } catch (e) {}
    try {
        $(threadRowView._threadRowViewDriver._elements).find(".inboxsdk__thread_row_label .av").css({
            "max-width": "200px"
        });
    } catch (e) {}
}

function fn_create_thread_row_schedule_time(threadRowView, schedule_time) {
    var schedule_time_as_string = "";
    schedule_time_as_string = new Date(schedule_time).format("%x, %X");
    threadRowView.replaceDate({
        text: schedule_time_as_string
    });
}
g_img_map = ["", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADCUlEQVQ4jV2TP2xbVRjFf9991892HNtp49SiSSNQQ/hTIZRSAUIK/5qyIJAAiYWhCwMgQRcWJkYGloqwkKEVExMwdEDqHyHaIpBK+FNKSdUSStJGaeI6tf3s5+f77r0MTiLKkb7t6JxP3zmfWGcwzrDY/I1Q5RgdnMR7i/eeLXg8hUyZpWjh2dPLn3+2d2j/7J7C5KfFcBi1RQpEk9g2cRoB4LzdHiUBxvWYXz8510w3JhfqP87Or5/67na8Mq23BEQUxqVYDIGUcOK23fN6kMv1799cal2+v5IfxXvPerz89A+3Tpzd3mCLnKQxzlu8dzhvCVWWtmlk5mtnPsnrIvi+WepT9pYePXaXgJKAxHawPkVEIQhhkOfi7XMf17sr+QFdAqBjGgxlq90Du1545y4BLQrjEoxLCJRmIFOi1r05dql+9kgxHMYDHuikLaYqzx0Z0KVEbTlnVBaRAOtSEhcjKEQUP9dOH49tmzDIIyK0ejXGBx9efLD8+FycRv0UFIpuGu3O6QJahcRpRDbIs9T6c/rqxk8z5bCC9w7rDB7PgV2HDmeCbD8hJZp/oj9e+/bmF39fuXPhqMcXi+EQzlt+qZ05JqIIRKNE0UjWmRh67OT44EPn26aB9w5J0g5fLR5drXVXqlplKIbDt/bteOot45KR+fVTc4VMGQDjEqxPeeW+d/fsyN5zIzZNQNDnV788sRpfr47kx/He0bVR9cLaN18r0QzoIoKACM1ejSerLx2t5MZutE0Dkf79ddu0cqHK00mb5IICWTWAE4sHRILN2O5QyY11Htk5/X5i+z0RpB/91MjMof0jM6+XMjuvRGaDnuuiJECJ2qyWJ04jpkYOvlfIlG3qEpQE/Z6IQv5qXkSLJnWG5Wjhg+utSx/GaSub1yW0Cmkka+wuTFx9+d63J3u2h/Vm03uzfN472qaB846J8tRHT1RfnBwv7jue2A5Rr46IYqpy8LBIQOL669v/jFxr/IqxXQSFl/7jKALW4qVnfq+fmx0ffODa86NvvNoxTZx3/B//AsIygzPTiwhUAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABF0lEQVQokV3SMUvWURzF8c+9PMiDg8hDyDM0SaNj9D4SgyJojKaWwN0X0Btoc8hF/mOECE6KVGuDRENTSIOTg4Tc0/C/4D/PdLnnew/n/vgVXWGG1+FZoQaFWwz40M+jGotwHN6G1UnIar87bqwzJtXCx7DXuepOi3CNvc7Uip1wVjnF93AYZhnho8KPMnpfsC0MjY1ebTfsh83GVkj41ustwzDDWuWP8ZOn4WvhCje4DD+7d9lYn2VSOPzCezxECyd4x//QEDYaa+Gs8XgyvSfhvHvLMJTwPDwq3ITflYNpYONVYWF8dCHUxlHjU3jgnsKye59DrYWGF4V5H/F8As+xU5iHl4VWJuYK3uCpu9VoYSjjavyFf7qHc6nRoEdQAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABGklEQVQokW3SL0ukURTH8c/zOBhFRBDBoljdomywzJjFIDL4B0HZIGi1bBFOEXwFLhhEweAfxCQGGTD4CjQqYtgkg0Fkg4gYPLNM8MCBe3/3y7m/c+4ttCJUsII6ylTfcYod4d3/g9CDC1QwKVSFKqZSu0hGIZQ4x6Zw7bsI49jAZIeaOv4JB0K3mgFXnhMcVvMh3KkZRF8Fs1jNWg38EEZyf4sbjGIHf0p0CU8J3KOJl8wmHvK2J3RV2nzuY1342+a+XxgQ9oWl1pRehF5cYuGblhdxmcxrIcxhCFs58wb2Ev6FCczgNx5LHKOKn74e7QMnOMp1HWPJHBbpv7cN2hXeUu/EMuZRF5pFW9OdWMO0ry9RZp5hu1XkE+DASAVkFaGJAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2UlEQVQ4jZ2SsQ6CMBRFj86Gb2B0duIrGIkzcfAD+AcmP4vBxITBMDATJ1YdHMh1eZBqoCU2ado0vef13lfwDEEiaOW7FABUguJf8U7wtjUT1IKr4OgTlYLE9ntBL8gFg0DOnIeY506QChoT/ooluPpekc4Ifme95DkW3APiQZCZZnp2ZYG9VohzK1YIWqzPhR1eVgB6K1YJEvRt4xQANNad3VKAkeDhAaSL6TuQwwzkbt3pxn8SgkRm52LBxk7gZRDggKbvvHRnG2CcgdsGnqurOtXHFns9fwCEKOBsxUGE6QAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABF0lEQVQ4jZ3RPUoDURTF8d+EjFgFsXQpYjEMgkYLwVbsxCVo4ReKjYq4AUGw0NJORWGYBYiNWYErELGQDAQLX+QRYzSe6t3z7v9c3ruJSHlZjWMRy8F6xhOuiyxt6aOkn5mXVQNHWI3snSJL9/4UEAWt4SCy9rFVZOmXURsUUGTpIS4iaxO7cc/AgKCznno7L6vpPwXkZVXDep+rie7hxz/Iy2oUI1jBcbA7YWjH54bOf9rCKK7QQDOEzGAD9xgLre/fnhDBs5jEDU7RLLL0AY9R+2ttANzVG9pFlnZCfYI2XjCf/ALfYaHI0veeQVN4KbK0lQwL9yrJy2okwHPDwnyu5PK/cDegE9W3w8BQx1IIqWNpGBg+AHFEW2OZU9tAAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMElEQVQ4jcXSPUucQRQF4GeWZVlE/A0pLUUsxEJEkHSCpgj4lvYi2iyuS0A0lluGFKnCgAQCfjRipRbaWViIvyMkIsviWOy8sIqKKcRTzdx7zv3mvRFSNIyfGPsP3R0uUIQUnWMcf7CTnS+hggUM4qyKEXQxhL9YDcXTyhRBO4u7GKlm369sXMENWs9k38IydjNvvpIdHXzGEdZT1Hgi+xrWcJi53bIfEAq3mMMptlO01CdeztmP8SkUOqWvbKFEBbX8bqfoJtva2VbrT/qgghQN4EBvIy1c4ju+6a3sCyawl6L64wB1/MYUmqGwiRlc4wofQ2EjB57O3Bq9Q/qXP1V8DYVmX1X1vvmUtm008hA7IUUnmNRby77XYRYDOA4p+oAfGH08oBdQnvLiK/lviHuitFPlUUWtQwAAAABJRU5ErkJggg=="];

function fn_create_thread_row_flag_button(threadRowView, thread_flag) {
    if (threadRowView["cloudHQ_checked_flag_displayed"] && threadRowView["cloudHQ_checked_flag_displayed"] == thread_flag) {} else {
        var old_thread_flag = threadRowView["cloudHQ_checked_flag_displayed"];
        if (g_is_preview_pane_mode && g_is_preview_pane_mode == "vertical") {
            if (old_thread_flag && old_thread_flag != thread_flag) {
                try {
                    $(threadRowView._threadRowViewDriver._elements).find(".inboxsdk__thread_row_label").remove();
                } catch (e) {}
            }
            threadRowView.addLabel({
                "iconUrl": g_img_map[thread_flag],
                "iconClass": "cHQIconTransperent",
                "backgroundColor": "transparent",
                "iconBackgroundColor": "transparent"
            });
        } else {
            if (old_thread_flag && old_thread_flag != thread_flag) {
                $(threadRowView._threadRowViewDriver._elements).find('.inboxsdk__button_iconImg[src="' + g_img_map[old_thread_flag] + '"]').attr("src", g_img_map[thread_flag]);
            } else {
                threadRowView.addButton({
                    "iconUrl": g_img_map[thread_flag],
                    "iconClass": "cHQIconTransperent",
                    "backgroundColor": "transparent",
                    "iconBackgroundColor": "transparent"
                });
            }
        }
        threadRowView["cloudHQ_checked_flag_displayed"] = thread_flag;
    }
}

function fn_create_thread_row_docit_button(threadRowView) {
    if (threadRowView["cloudHQ_docit_displayed"]) {} else {
        threadRowView["cloudHQ_docit_displayed"] = true;
        threadRowView.addButton({
            hasDropdown: true,
            title: "create a sharable link",
            iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACUUlEQVQ4jc2TXUhTYRzGn31o22metY2gL7qoNHF+sEXEkMqQyMC7rtIgqs0pZSpOipeKKFw3UcyRzmnOaoIKUeYuDMLL6tKLXVitbprQiHNOsu9p/rvQY57ssoseeOF/8/x43vf/vMC/kCT9UBxRlJDL5UFEuH3n7j6zxeICwHiev9zt6bES0d8BgiAilUyDiEBE8PX5HQAYAGatqm6V51Bo9KDsVckAANBo1MhksigsFRCNRvVNTc1neb5E73S6nq/QyjdOz5m8vb3uTC67XMjl7isSCIIEIsLXeBznL1zUOWprqxsbG8uDQ8PaxcVFDAQCmJubw+EjjktrSX5LFCWkUikQER489FXIUQEws9ninHo1fYCIMBIa3abRahlnKOlSAJLJVXNw6HEVAKbRaFhLa1tF3Yn6OgDM1eKuf/vufREADwA2PjG5XwEgIgwNr5r1eq7rWXhs53QksjUWi2Fm5rXB5/fvKCoqbgfAfH1++6YtTEciewGw4uIt1+fnP+g6OruOAmAnTzUca+/oLNXpuWtr5kNEhHQ6owSYzJarANiLl1PbiQjj4xOlPG90b3wLd2tbDREhny9AEMR1rxYAJFEw1Njswp7du74PBAZxrrn502Aw+GVsLFyWSCR0Vmvlx9MNDelUMg2oALVarQToOC7/ORYzv5mdNWUzGelRf78lHA6fWViIL42EQpN2my1NK4Tln8tQqVTYpNEnT8vkqDU2u0uevd57x+VW5vOF9ZrLxVNsodvTU2kwGK4AYLzR2Hbj5q3yjXf+87/8P/oFWvY0QvBU0BwAAAAASUVORK5CYII=",
            onClick: function (e) {
                var thread_id = threadRowView.getThreadID();
                var options = {
                    thread_id: thread_id
                };
                fn_handle_cloudHQ_thread_docit(options);
            }
        });
    }
}

function fn_create_thread_row_comment_button(threadRowView) {
    if (threadRowView["cloudHQ_comment_displayed"]) {} else {
        if (g_is_preview_pane_mode && g_is_preview_pane_mode == "vertical") {
            threadRowView["cloudHQ_comment_displayed"] = true;
            threadRowView.addLabel({
                "iconUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEUAAABNkP72YfJdAAAAAXRSTlMAQObYZgAAADpJREFUGNNjwAfY/wPBAwZ+EPWBFOoDAxBjo+iikjDFDqFAgB9CsUMoZgjFCKEYoFQBhDKAUAL4ggwAkSGA3zhYUN4AAAAASUVORK5CYII=",
                "iconClass": "cHQIconTransperent",
                "backgroundColor": "transparent",
                "iconBackgroundColor": "transparent"
            });
        } else {
            threadRowView["cloudHQ_comment_displayed"] = true;
            threadRowView.addImage({
            imageClass: "cHQIconTransperent",
            iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEUAAABNkP72YfJdAAAAAXRSTlMAQObYZgAAADpJREFUGNNjwAfY/wPBAwZ+EPWBFOoDAxBjo+iikjDFDqFAgB9CsUMoZgjFCKEYoFQBhDKAUAL4ggwAkSGA3zhYUN4AAAAASUVORK5CYII=",
            //tooltip: noteTooltip.output
            })
            threadRowView.addButton({
                hasDropdown: true,
                iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEUAAABNkP72YfJdAAAAAXRSTlMAQObYZgAAADpJREFUGNNjwAfY/wPBAwZ+EPWBFOoDAxBjo+iikjDFDqFAgB9CsUMoZgjFCKEYoFQBhDKAUAL4ggwAkSGA3zhYUN4AAAAASUVORK5CYII=",
                onClick: function (e) {
                    var dd = e.dropdown;
                    var el = dd.el;
                    var origin = window.location.href.split(/\?|#/)[0];
                    var url = g_server_url + "main_share/label_sharing_latest_thread_messages/" + "?origin=" + encodeURIComponent(origin) + "&thread_id=" + encodeURIComponent(threadRowView.getThreadID()) + "&email_or_login=" + encodeURIComponent(g_email_or_login) + "&switch_login=1";
                    var container = $("<div></div>").css({
                        "min-width": "240px",
                        "min-height": "245px",
                        "background-repeat": "no-repeat",
                        "background-position": "center center",
                        "background-color": "white",
                        "background-image": "url(" + g_server_url + "images/loading.gif)"
                    }).appendTo(el);
                    var wrapper_page_url = chrome.extension.getURL("html/label_sharing_chat_wrapper.html" + "?iframe_src=" + encodeURIComponent(url));
                    container.html('<iframe width="240px" height="245px" style="border:none;padding-top:3px" border="0" src="' + wrapper_page_url + '"><body><html>Loading ...</html></body></iframe>');
                }
            });
        }
    }
}

function fn_handle_cloudHQ_thread_toolbar(action, e, action_data) {
    if (action == "create_project") {
        var thread_view = e.threadView;
        var iframe = fn_get_active_iframe();
        if (iframe.length == 1) {
            if (iframe.attr("src").indexOf("/channels/") > -1) {
                var text = prompt("Enter task text:");
                if (text && text != "") {
                    iframe.get(0).contentWindow.postMessage({
                        action: "sendMessage",
                        message: "/todo " + text
                    }, "*");
                }
                return;
            }

            function create_project() {
                try {
                    iframe.get(0).contentWindow.postMessage({
                        action: "sendMessage",
                        message: "/project"
                    }, "*");
                    g_sdk.ButterBar.showMessage({
                        text: "Setting up project. Please wait a moment ...",
                        time: 5000,
                        messageKey: "cloudHQ_butter_1"
                    });
                } catch (err) {}
            }
            fn_display_misc_dialog('<div style="width: 300px"><center>Preparing... <br/>(might take a few seconds)</center></div>', "", null);
            var thread_id = e.threadView.getThreadID();
            $.post(g_server_url + "/main_share/label_sharing_chat_get_contacts_in_thread", {
                "email_or_login": g_email_or_login,
                "switch_login": "1",
                "thread_id": thread_id
            }, function (res) {
                fn_close_misc_dialog();
                var modal_text = "Create a project from this email thread. " + "We'll create an instant project where you can chat, share files, share todo list, and many other things. <br/><br/>" + "All your projects are listed under !Projects label. <br/><br/>" + "We will send invites to join this project to: <br />" + res["contacts"] + ".";
                var modal_view = g_sdk.Widgets.showModalView({
                    el: $('<div id="div_for_misc_dialog" style="width: 400px; height: auto"></div>').append(modal_text).get(0),
                    title: "Create Project from Email",
                    buttons: [{
                        text: "Cancel",
                        string: "CANCEL",
                        onClick: function () {
                            modal_view.close();
                        }
                    }, {
                        text: "Create Project",
                        string: "OK",
                        type: "PRIMARY_ACTION",
                        onClick: function () {
                            create_project();
                            modal_view.close();
                        }
                    }]
                });
            });
        }
    }
}

function fn_setup_gmail_label_links() {
    if (g_setup_gmail_label_links_done) {
        return;
    }
    c_cmn.fn_log("fn_setup_gmail_label_links: ENTERING");
    var i = 0;
    g_shared_labels_hash = {};
    g_shared_labels_hash_with_some_users = {};
    for (i = 0; i < g_shared_labels_list_with_some_users.length; i++) {
        label_name = g_shared_labels_list_with_some_users[i].title;
        g_shared_labels_hash_with_some_users[label_name] = g_shared_labels_list_with_some_users[i];
    }
    if (g_invitations_list && g_invitations_list.length > 0) {
        fn_display_invitation_dialog();
    } else {
        if (g_flash) {
            if (g_flash["error"]) {
                fn_display_misc_dialog(g_flash["error"], "Error");
            } else {
                if (g_flash["notice"]) {
                    fn_display_misc_dialog(g_flash["notice"], "cloudHQ Notification", null, true);
                }
            }
            g_flash = null;
        }
    }
    c_cmn.fn_delayed_conditional_execute({
        poll_delay: 1000,
        max_poll_attempts: 60,
        retry_message: null,
        condition: function () {
            return ($(g_css_search_for_label_tree_entry).length > 0);
        },
        continuation: function () {
            c_cmn.fn_log("fn_setup_gmail_label_links: update label statuses: continuation");

            function appendIcon(labelEl) {
                if (labelEl.find(".shared-label-icon").length > 0) {
                    return;
                }
                var a = labelEl.find("a.J-Ke.n0");
                var href_value = a.attr("href");
                var label_name = decodeURI(href_value.replace(/.*#label/, "")).replace(/^\//, "").replace(/\+/g, " ");
                if (g_shared_labels_hash_with_some_users[label_name]) {
                    var icon = $('<svg class="shared-label-icon" style="float:left;margin-left:-10px" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" focusable="false" fill="#333"><path d="M5,7 C6.11,7 7,6.1 7,5 C7,3.9 6.11,3 5,3 C3.9,3 3,3.9 3,5 C3,6.1 3.9,7 5,7 L5,7 Z M11,7 C12.11,7 13,6.1 13,5 C13,3.9 12.11,3 11,3 C9.89,3 9,3.9 9,5 C9,6.1 9.9,7 11,7 L11,7 Z M5,8.2 C3.33,8.2 0,9.03 0,10.7 L0,12 L10,12 L10,10.7 C10,9.03 6.67,8.2 5,8.2 L5,8.2 Z M11,8.2 C10.75,8.2 10.46,8.22 10.16,8.26 C10.95,8.86 11.5,9.66 11.5,10.7 L11.5,12 L16,12 L16,10.7 C16,9.03 12.67,8.2 11,8.2 L11,8.2 Z"></path></svg>').css("height", Math.max(labelEl.height(), 12) + "px").prependTo(labelEl);
                }
            }
            $(g_css_search_for_top_level_div_for_label).each(function () {
                try {
                    var is_valid = ($(this).find("a.J-Ke.n0").length > 0);
                    if (is_valid) {
                        c_cmn.fn_log("fn_setup_gmail_label_links: update label statuses: " + $(this).find("a.J-Ke.n0").attr("href"));
                        $(this).bind("click", function (event) {
                            $(".cloudHQ-label-selected").removeClass("cloudHQ-label-selected");
                            $(event.target).parents(".aim").addClass("cloudHQ-label-selected");
                        });
                        appendIcon($(this));
                    }
                } catch (e) {
                    c_cmn.fn_log("fn_setup_gmail_label_links: e=" + e);
                }
            });
            $(g_css_search_for_top_level_div_for_list).get(0).addEventListener("DOMNodeInserted", function (e) {
                var target = $(e.target);
                if (target.hasClass("aim")) {
                    $(target).bind("click", function (event) {
                        $(".cloudHQ-label-selected").removeClass("cloudHQ-label-selected");
                        $(event.target).parents(".aim").addClass("cloudHQ-label-selected");
                    });
                    window.setTimeout(function () {
                        appendIcon(target);
                    }, 50);
                }
            });
            return true;
        }
    });
    g_setup_gmail_label_links_done = true;
    c_cmn.fn_log("fn_setup_gmail_label_links: EXITING");
}

function fn_check_login_and_signup_dialog_if_needed(next_step) {
    c_cmn.fn_log("fn_check_login_and_signup_dialog_if_needed: ENTERING");
    $.ajax({
        type: "GET",
        url: g_server_url + "main_share/chrome_extension_login_or_signup_dialog",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1"
        },
        async: true,
        success: function (response, t, x) {
            if (!response || (response && response["error"])) {
                fn_display_error_butter_bar();
            } else {
                if (response["status"] == "OK") {
                    g_logged_in = true;
                    if (next_step) {
                        next_step();
                    }
                } else {
                   fn_show_inbox_modal_for_signup(response);
                }
            }
        },
        error: function (response, t, x) {
            g_fatal_error_flag = true;
            fn_display_error_butter_bar();
        }
    });
    c_cmn.fn_log("fn_check_login_and_signup_dialog_if_needed: EXITING");
}

function fn_get_status_from_server(options, next_step) {
    c_cmn.fn_log("fn_get_status_from_server: ENTERING");
    $.ajax({
        type: "GET",
        url: g_server_url + "main_share/chrome_extension_get_status",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1",
            "gmail_timezone_offset": g_gmail_timezone_offset,
            "options": JSON.stringify(options)
        },
        async: true,
        success: function (response, t, x) {
            c_cmn.fn_log("fn_get_status_from_server: response:" + response);
            if (!response || (response && response["error"])) {
                try {
                    if (g_do_not_show_get_started_splash_screen) {} else {
                        fn_check_login_and_signup_dialog_if_needed();
                    }
                } catch (e) {}
            } else {
                try {
                    g_logged_in = true;
                    g_shared_labels_list = response["shared_labels_list"];
                    g_all_labels_list = response["all_labels_list"];
                    g_shared_labels_list_with_some_users = response["shared_labels_list_with_some_users"];
                    if (g_do_not_show_suggested_autolabels) {
                        g_suggested_labels_list = [];
                    } else {
                        g_suggested_labels_list = g_suggested_system_labels_list.sort();
                    }
                    g_suggested_labels_list = g_suggested_labels_list.concat($.map(g_all_labels_list, function (x) {
                        return g_suggested_labels_list.indexOf(x["title"]) == -1 ? x["title"] : null;
                    }).sort());
                    g_invitations_list = response["invitations_list"];
                    g_email_suggestions = response["email_suggestions"];
                    g_do_not_show_tutorial_dialog = !!response["do_not_show_tutorial_dialog"];
                    g_file_browser_services = response["file_browser_services"];
                    g_callback = response["callback"];
                    g_thread_list_with_project = response["thread_list_with_project"];
                    g_is_ambassador = response["is_ambassador"];
                    g_stored_drafts_on_server = response["stored_drafts"] || [];
                    g_has_labels = response["has_labels"];
                    g_does_it_need_to_upgrade = response["does_it_need_to_upgrade"];
                    c_cmn.fn_log("fn_get_status_from_server: g_shared_labels_list_with_some_users=" + JSON.stringify(g_shared_labels_list_with_some_users).toString());
                    if (!g_flash_received) {
                        g_flash = response["flash"];
                        g_flash_received = true;
                    }
                    next_step();
                } catch (e) {}
            }
        },
        error: function (response, t, x) {
            try {
                if (g_do_not_show_get_started_splash_screen) {} else {
                    fn_check_login_and_signup_dialog_if_needed();
                }
            } catch (e) {}
        }
    });
    c_cmn.fn_log("fn_get_status_from_server: EXITING");
}

function fn_get_gmail_current_path() {
    return decodeURIComponent(window.location.hash.substring(1)).replace(/^\//, "").replace(/\+/g, " ").replace(/\?.*/, "");
}

function fn_find_right_toolbar_label(label_obj) {
    var label_el = null;
    $(g_css_search_for_label_tree_entry).each(function () {
        var href_value = $(this).attr("href");
        var label_name = decodeURI(href_value.replace(/.*#label/, "")).replace(/^\//, "").replace(/\+/g, " ");
        if (label_name == label_obj.title) {
            label_el = $(this);
        }
    });
    return label_el;
}

function fn_find_label_obj_by_channel_id(channel_id) {
    if (g_shared_labels_list) {
        for (var i = 0; i < g_shared_labels_list.length; i++) {
            var labelObj = g_shared_labels_list[i];
            if (labelObj.share_config_channel_id && labelObj.share_config_channel_id == channel_id) {
                return labelObj;
            }
        }
    }
    return null;
}

function fn_find_channel_id_by_thread_id(thread_id) {
    var value;
    for (var i = 0, len = g_thread_list_with_project.length; i < len; i++) {
        value = g_thread_list_with_project[i];
        if (value && value["thread_id"] == thread_id) {
            return value["channel_id"];
        }
    }
    return null;
}

function fn_find_channel_obj_by_channel_id(channel_id) {
    for (var i = 0, len = g_thread_list_with_project.length; i < len; i++) {
        value = g_thread_list_with_project[i];
        if (value && value["channel_id"] == channel_id) {
            return value;
        }
    }
}

function fn_update_stored_drafts_on_server(success, failure) {
    return $.ajax({
        type: "GET",
        url: g_server_url + "main_share/chrome_extension_get_drafts",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1"
        },
        async: true,
        success: function (resp) {
            if (resp["stored_drafts"]) {
                g_stored_drafts_on_server = resp["stored_drafts"];
                success.call(this, resp);
            }
        },
        failure: failure
    });
}

function fn_cleanup_drafts_in_local_storage() {
    if (g_draft_ids_per_thread_id) {
        var draft_ids = [];
        var thread_ids_to_remove = [];
        for (var i = 0; i < g_stored_drafts_on_server.length; i++) {
            draft_ids.push(g_stored_drafts_on_server[i]["id"]);
        }

        function does_draft_exists(draft_id) {
            return (draft_ids.indexOf(draft_id) > -1);
        }
        for (var thread_id in g_draft_ids_per_thread_id) {
            g_draft_ids_per_thread_id[thread_id] = (g_draft_ids_per_thread_id[thread_id] || []).filter(does_draft_exists);
            if (g_draft_ids_per_thread_id[thread_id].length == 0) {
                thread_ids_to_remove.push(thread_id);
            }
        }
        var thread_id = null;
        for (var i = 0; i < thread_ids_to_remove.length; i++) {
            thread_id = thread_ids_to_remove[i];
            delete g_draft_ids_per_thread_id[thread_id];
        }
        fn_save_state_to_local_storage();
    }
}

function fn_insert_add_shared_todo_list_button(composeView) {
    if (!fn_is_ext_enabled("shared_todo")) {
        return;
    }
    var html_identifier = "chq_shared_todos";

    function get_content_editor_obj() {
        var content_el = $(composeView.getBodyElement());
        var hidden = null;
        content_el.find("input[type=hidden]").each(function () {
            if ($(this).val && $(this).val().startsWith(html_identifier)) {
                hidden = $(this);
            }
        });
        if (hidden != null) {
            var val = hidden.val().substring(html_identifier.length);
            var data = JSON.parse(val);
            return {
                data: data,
                el: hidden.parent()
            };
        } else {
            return null;
        }
    }

    function refresh_content(tasks) {
        var html = render_todos(tasks);
        var content_obj = get_content_editor_obj();
        if (content_obj && content_obj.el) {
            content_obj.el.replaceWith(html);
        } else {
            composeView.insertHTMLIntoBodyAtCursor(html + "<br />");
        }
        $(get_content_editor_obj().el).css("cursor", "pointer").click(function () {
            show_modal();
        });
    }

    function render_todos(list) {
        if (list.length == 0) {
            return "<br />";
        }
        var c = $("<div></div>");
        var h = $('<input type="hidden" />').val(html_identifier + JSON.stringify(list)).appendTo(c);
        var ul = $("<ul></ul>").appendTo(c);
        $(list).each(function (i, n) {
            var li = $("<li></li>");
            li.text(n);
            li.appendTo(ul);
        });
        var header = '<div style="height: 18px; max-height: 18px; padding: 5px; color: rgb(34, 34, 34); font-family: arial; font-style: normal; font-weight: bold; font-size: 13px; cursor: default; border-bottom: 1px solid rgb(221, 221, 221); line-height: 18px; background-color: rgb(245, 245, 245);">Shared todo list</div>';
        var html = '<div contenteditable="false" style="border: 1px solid #ddd; padding: 0px">' + header + c.html() + "</div>";
        return html;
    }

    function show_modal() {
        var el = $('<div id="cloudHQ_modal_shared_todo_list" style="width: auto; height: auto"></div>');
        var el_todos = $('<div id="cloudHQ_modal_todos" style="width:360px;"></div>').appendTo(el);
        var el_list = $('<div style="height: 336px;overflow:auto"></div>').appendTo(el_todos);

        function invalidate(suppress_new) {
            var has_focus = false;
            $(el).find(".cloudHQ_modal_todos_todo").each(function () {
                var t = $(this);
                var t_i = t.find("input");
                if (t_i.is(":focus")) {
                    has_focus = true;
                }
                if (t_i.val().trim() == "" && !t_i.is(":focus")) {
                    t.remove();
                }
            });
            if (!has_focus && suppress_new !== true) {
                return add_task("");
            }
            return;
        }

        function add_task(text, afterEl) {
            var t = $('<div class="cloudHQ_modal_todos_todo" style="padding: 0 0 8px 32px; clear: both; min-height: 32px;display: block"></div>').append('<div style="margin: 7px 0 7px -32px; height: 18px; width: 18px; border: 1px solid #ddd;border-radius: 2px;float: left"> </div>').append(t_i);
            var t_i = $('<input type="text" style="border: 1px solid #ddd; line-height: 30px; height: 30px;width:300px; padding-left: 6px" placeholder="Enter task text here ..." />').appendTo(t).blur(function () {
                invalidate();
            }).keydown(function (e) {
                var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                switch (key) {
                    case 9:
                    case 13:
                        if (t_i.val().trim() != "") {
                            invalidate(true);
                            add_task("", t).find("input").focus();
                        }
                        break;
                    case 38:
                        if (t.prev().find("input").focus()) {
                            invalidate();
                        }
                        break;
                    case 40:
                        if (t.next().find("input").focus()) {
                            invalidate();
                        }
                        break;
                    default:
                        return;
                }
                e.preventDefault();
                e.stopPropagation();
            }).val(text);
            if (afterEl) {
                afterEl.after(t);
            } else {
                el_list.append(t);
            }
            return t;
        }

        function get_todos() {
            var tasks = $(el).find(".cloudHQ_modal_todos_todo input").map(function () {
                return $(this).val();
            });
            tasks = $.grep(tasks.toArray(), function (n, i) {
                return ((n + "").trim() != "");
            });
            return tasks;
        }

        function set_todos(list) {
            $(list).each(function (n) {
                add_task(n);
            });
            invalidate();
        }
        modal_view = g_sdk.Widgets.showModalView({
            title: "Shared todo list",
            el: el.get(0),
            buttons: [{
                "text": "Done",
                "type": "PRIMARY_ACTION",
                "onClick": function (e) {
                    var tasks = get_todos();
                    refresh_content(tasks);
                    modal_view.close();
                }
            }, {
                "text": "Cancel",
                "type": "SECONDARY",
                "onClick": function () {
                    modal_view.close();
                }
            }]
        });
        var content_obj = get_content_editor_obj();
        if (content_obj) {
            for (var i = 0; i < content_obj.data.length; i++) {
                add_task(content_obj.data[i]);
            }
        }
        invalidate().find("input").focus();
    }
    composeView.addButton({
        title: "Edit Shared Todo List",
        type: "MODIFIER",
        iconUrl: g_server_url + "images/promote_us_check.png",
        orderHint: 0,
        onClick: show_modal
    });
    var unique_key = null;
    var task_list = null;
    composeView.on("presending", function (cancel) {
        var content_obj = get_content_editor_obj();
        if (content_obj && content_obj.el) {
            unique_key = Math.random().toString(36).substr(2, 9);
            task_list = content_obj.data;
            var el = content_obj.el;
            var url = g_server_url + "channels/redir/" + unique_key;
            var btn = $('<div style="padding: 16px 0"><a href="' + url + '" style="background-color:#4d90fe;border:1px solid #3079ed;border-radius:2px;color:white;display:inline-block;font-family:Roboto,Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;min-height:29px;line-height:29px;min-width:54px;outline:0px;padding:0 8px;text-align:center;text-decoration:none" target="_blank">Join Shared ToDo</a></div>');
            el.after(btn);
        }
    });
    composeView.on("sent", function (params) {
        if (unique_key) {
            var thread_id = params.threadID;
            console.log("thread_id", thread_id);
            $.ajax({
                url: g_server_url + "channels/create",
                type: "POST",
                data: {
                    thread_id: thread_id,
                    unique_key: unique_key,
                    email_or_login: g_email_or_login,
                    switch_login: "1",
                    do_not_send_email: true,
                    init_tasks: (task_list || [])
                },
                dataType: "json",
                success: function (res) {
                    console.log("CHANNELS_CREATE", res);
                },
                failure: function (res) {
                    console.log("CHANNELS_CREATE", res);
                }
            });
        }
    });
    var content_obj = get_content_editor_obj();
    if (content_obj && content_obj.data) {
        refresh_content(content_obj.data);
    }
}

function fn_show_share_contacts_dialog() {
    if (!g_logged_in) {
        fn_check_login_and_signup_dialog_if_needed();
        return;
    }
    fn_display_misc_dialog('<div style="width: 300px"><center>Loading...</center></div>', "", null);
    $.ajax({
        type: "GET",
        url: g_server_url + "main_share/chrome_extension_share_contacts_dialog",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1"
        },
        async: true,
        success: function (response, t, x) {
            c_cmn.fn_log("fn_show_share_contacts_dialog: response:" + response);
            if (!response || (response && response["error"])) {
                fn_display_error_butter_bar();
            } else {
                g_sdk.ButterBar.hideMessage("cloudHQ_butter_1");
                fn_show_inbox_modal($.extend(response, {
                    id: "div_for_sync_salesforce_contacts_dialog",
                    ajaxSuccess: function (button, res) {
                        console.log(res);
                        alert("Thank you! We will contact you in next 24 hours.");
                    },
                    ajaxFailure: function (button, res) {
                        g_sdk.ButterBar.showMessage({
                            text: "Something went wrong! Please try again ...",
                            messageKey: "cloudHQ_butter_1"
                        });
                    }
                }));
            }
        },
        error: function (response, t, x) {
            fn_close_misc_dialog();
            fn_check_login_and_signup_dialog_if_needed();
        }
    });
}

function fn_show_sync_salesforce_contacts_dialog() {
    if (!g_logged_in) {
        fn_check_login_and_signup_dialog_if_needed();
        return;
    }
    fn_display_misc_dialog('<div style="width: 300px"><center>Loading...</center></div>', "", null);
    $.ajax({
        type: "GET",
        url: g_server_url + "main_share/chrome_extension_sync_salesforce_contacts_dialog",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1"
        },
        async: true,
        success: function (response, t, x) {
            c_cmn.fn_log("fn_show_sync_salesforce_contacts_dialog: response:" + response);
            if (!response || (response && response["error"])) {
                fn_display_error_butter_bar();
            } else {
                g_sdk.ButterBar.hideMessage("cloudHQ_butter_1");
                var modal = fn_show_inbox_modal($.extend(response, {
                    id: "div_for_sync_salesforce_contacts_dialog"
                }));
                $(".inboxsdk__modal_container .inboxsdk__modal_buttons .inboxsdk__button").click(function () {
                    var next_page = g_server_url + "main_synch_wizard/link/salesforce?page_type=synch_to_google_contacts&auto_oauth=1";
                    var form = $("#div_for_sync_salesforce_contacts_dialog").find("form");
                    form.append($('<input type="hidden" name="next_page" />').attr("value", next_page));
                    form.submit();
                    modal.close();
                    g_sdk.ButterBar.showMessage({
                        text: "Redirecting to Salesforce ...",
                        messageKey: "cloudHQ_butter_1"
                    });
                });
            }
        },
        error: function (response, t, x) {
            fn_close_misc_dialog();
            fn_check_login_and_signup_dialog_if_needed();
        }
    });
}

function fn_show_options_dialog() {
    if (!g_logged_in) {
        fn_check_login_and_signup_dialog_if_needed();
        return;
    }
    var content = "<label>" + '<input type="checkbox" id="cloudHQ_show_docit_buttons" value="">' + " &nbsp;Show button to share emails in thread list view" + "</label>" + "<br/><br/>" + "<label>" + '<input type="checkbox" id="cloudHQ_autoexpand_flag" value="">' + " &nbsp;Automatically expand notes view on the right side" + "</label>" + "<br/><br/>" + '<input type="checkbox" id="cloudHQ_do_not_show_suggested_autolabels" value="">' + " &nbsp;Add '!Clients', '!Leads', '!Prospects', '!Opportunities' to suggested smart labels list" + "</label>" + "<br/><br/>" + '<a target="blank" href="' + g_server_url + 'main_share">Manage Label Sharing Options</a><br/>';
    fn_show_inbox_modal({
        id: "div_for_show_options_list",
        title: "Label Sharing Chrome Extension Options",
        content: content,
        buttons: [{
            "text": "Save",
            "action": "CALL",
            "type": "PRIMARY_ACTION",
            "function_to_call": function () {
                if ($("#cloudHQ_show_docit_buttons").is(":checked")) {
                    g_do_not_show_docit_buttons = false;
                } else {
                    g_do_not_show_docit_buttons = true;
                }
                if ($("#cloudHQ_autoexpand_flag").is(":checked")) {
                    g_autoexpand_flag = true;
                } else {
                    g_autoexpand_flag = false;
                }
                if ($("#cloudHQ_do_not_show_suggested_autolabels").is(":checked")) {
                    g_do_not_show_suggested_autolabels = false;
                } else {
                    g_do_not_show_suggested_autolabels = true;
                }
                fn_save_state_to_local_storage(function () {
                    location.reload();
                });
            }
        }]
    });
    if (g_do_not_show_docit_buttons) {
        $("#cloudHQ_show_docit_buttons").attr("checked", false);
    } else {
        $("#cloudHQ_show_docit_buttons").attr("checked", true);
    }
    if (g_autoexpand_flag) {
        $("#cloudHQ_autoexpand_flag").attr("checked", true);
    } else {
        $("#cloudHQ_autoexpand_flag").attr("checked", false);
    }
    if (g_do_not_show_suggested_autolabels) {
        $("#cloudHQ_do_not_show_suggested_autolabels").attr("checked", false);
    } else {
        $("#cloudHQ_do_not_show_suggested_autolabels").attr("checked", true);
    }
    return;
}

function fn_show_referrals_dialog() {
    if (!g_logged_in) {
        fn_check_login_and_signup_dialog_if_needed();
        return;
    }
    fn_display_misc_dialog('<div style="width: 300px"><center>Loading...</center></div>', "", null);
    $.ajax({
        type: "GET",
        url: g_server_url + "main_share/chrome_extension_referrals_dialog",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1"
        },
        async: true,
        success: function (response, t, x) {
            c_cmn.fn_log("fn_display_share_label_dialog: response:" + response);
            if (!response || (response && response["error"])) {
                fn_display_error_butter_bar();
            } else {
                g_sdk.ButterBar.hideMessage("cloudHQ_butter_1");
                fn_show_inbox_modal($.extend(response, {
                    id: "div_for_referrals_dialog",
                    ajaxSuccess: function (button, res) {
                        console.log(res);
                        if (button.action == "SUBMIT") {
                            g_sdk.ButterBar.showMessage({
                                text: (res["msg"] || "Invitation sent to friends!"),
                                messageKey: "cloudHQ_butter_1"
                            });
                            if (res["valid"] == 0) {
                                window.setTimeout(fn_show_referrals_dialog, 1500);
                            }
                        }
                    },
                    ajaxFailure: function (button, res) {
                        g_sdk.ButterBar.showMessage({
                            text: "Something went wrong! Please try again ...",
                            messageKey: "cloudHQ_butter_1"
                        });
                    }
                }));
                var email_suggestions = response["email_suggestions"] || [];
                var inputToken = $("#div_for_referrals_dialog #referrals_token_input").tokenInput(email_suggestions, {
                    hintText: "",
                    noResultsText: "",
                    searchingText: "Enter email address",
                    theme: "gmail",
                    preventDuplicates: true,
                    animateDropdown: false,
                    autoSelectFirstResult: true,
                    tokenDelimiter: ",",
                    propertyToSearch: "id",
                    useCache: false,
                    searchDelay: 100,
                    resultsLimit: 5,
                    resultsFormatter: function (item) {
                        if (item.name == item.id) {
                            return "<li><div>" + item.id + "</div></li>";
                        } else {
                            return "<li><div>" + item.name + '</div><div class="muted">' + item.id + "</div></li>";
                        }
                    },
                    onResult: function (results) {
                        function validateEmail(email) {
                            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                            return re.test(email);
                        }
                        var val = $("#div_for_referrals_dialog #token-input-referrals_token_input").val();
                        if (validateEmail(val)) {
                            results.push({
                                id: val,
                                name: val
                            });
                        }
                        return results;
                    }
                });
            }
        },
        error: function (response, t, x) {
            fn_check_login_and_signup_dialog_if_needed();
        }
    });
}

function fn_handle_cloudHQ_thread_toolbar_snooze_email_button(options) {
    if (!g_logged_in) {
        fn_display_misc_dialog('<div style="width: 400px"><center>Signing in ...</center></div>', "", null);
        fn_check_login_and_signup_dialog_if_needed(function (is_logged_in) {
            if (is_logged_in) {
                fn_handle_cloudHQ_thread_toolbar_snooze_email_button_impl(options);
            }
        });
    } else {
        fn_handle_cloudHQ_thread_toolbar_snooze_email_button_impl(options);
    }
}
function fn_unsoonze(options){
     if (!g_logged_in) {
        fn_display_misc_dialog('<div style="width: 400px"><center>Signing in ...</center></div>', "", null);
        fn_check_login_and_signup_dialog_if_needed(function (is_logged_in) {
            if (is_logged_in) {
                fn_unsoonze_imp(options);
            }
        });
    } else {
        fn_unsoonze_imp(options);
    }
}
function fn_unsoonze_imp(options){
     var thread_id_list = options["thread_id_list"];
    var snooze_time_utc_as_timestamp = options["snooze_time_utc_as_timestamp"];
    var only_if_nobody_replies = options["only_if_nobody_replies"];
    var snooze_note = options["snooze_note"];
    c_cmn.fn_log("fn_handle_cloudHQ_thread_toolbar_snooze_email_button: ENTERING options=" + JSON.stringify(options));
    fn_alert("waiting...");
    $.ajax({
        type: "POST",
        url: g_server_url + "main_share/chrome_extension_snooze_email_ajax",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1",
            "thread_id_list": thread_id_list,
            "snooze_time_utc_as_timestamp": snooze_time_utc_as_timestamp,
            "snooze_note": snooze_note,
            "only_if_nobody_replies": only_if_nobody_replies,
            "gmail_timezone_offset": g_gmail_timezone_offset,
            "gmail_language": g_lang_of_html
        },
        async: true,
        success: function (response, t, x) {
            c_cmn.fn_log("fn_handle_cloudHQ_thread_toolbar_snooze_email: response:" + JSON.stringify(response));
            if (!response || (response && response["error"])) {
                fn_close_misc_dialog();
            //    fn_display_misc_dialog('<div style="width: 400px"><center> Waiting for a minutes</center></div>');
            } else {
                g_intention_to_gmail_snooze_email = null;
                fn_save_state_to_local_storage(function () {
                   // fn_display_misc_dialog('<div style="width: 400px"><center></center></div>');
                    if (g_current_list_route_view && !g_current_list_route_view.destroyed) {
                        g_current_list_route_view.refresh();
                    } else {
                        g_sdk.Router.goto(g_sdk.Router.NativeRouteIDs.INBOX);
                    }
                    g_thread_metadata_by_thread_id_cache = null;
                    if (g_thread_row_comment_button_list_visible) {

                      //fn_create_thread_row_comment_button_list(g_thread_row_comment_button_list_visible);
                        var thread_row_view = null;
                        var thread_id = null;
                        var current_label_name = fn_get_current_label_name();
                        for (var i = 0; i < g_thread_row_comment_button_list_visible.length; i++) {
                            thread_row_view = g_thread_row_comment_button_list_visible[i];                           
                                                
                        }
                    }
                });

                return;
            }
        },
        error: function (response, t, x) {
            fn_display_misc_dialog('<div style="width: 400px"><center>Failed to snooze the email. Please try again.<br/>And please email us at support@cloudHQ.net if this error persists.</center></div>', "ERROR");
        }
    });
    c_cmn.fn_log("fn_handle_cloudHQ_thread_toolbar_snooze_email: EXITING");

}
function fn_handle_cloudHQ_thread_toolbar_snooze_email_button_impl(options) {
    var thread_id_list = options["thread_id_list"];
    var snooze_time_utc_as_timestamp = options["snooze_time_utc_as_timestamp"];
    var only_if_nobody_replies = options["only_if_nobody_replies"];
    var snooze_note = options["snooze_note"];
    c_cmn.fn_log("fn_handle_cloudHQ_thread_toolbar_snooze_email_button: ENTERING options=" + JSON.stringify(options));
   // fn_display_misc_dialog('<div style="width: 400px"><center>Snoozing...</center></div>');
    fn_alert("Your message is being snoozed");
    $.ajax({
        type: "POST",
        url: g_server_url + "main_share/chrome_extension_snooze_email_ajax",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1",
            "thread_id_list": thread_id_list,
            "snooze_time_utc_as_timestamp": snooze_time_utc_as_timestamp,
            "snooze_note": snooze_note,
            "only_if_nobody_replies": only_if_nobody_replies,
            "gmail_timezone_offset": g_gmail_timezone_offset,
            "gmail_language": g_lang_of_html
        },
        async: true,
        success: function (response, t, x) {
            c_cmn.fn_log("fn_handle_cloudHQ_thread_toolbar_snooze_email: response:" + JSON.stringify(response));
            if (!response || (response && response["error"])) {
                fn_close_misc_dialog();
                fn_alert(response["error"]);
                //fn_display_misc_dialog('<div style="width: 400px"><center>' + response["error"] + "</center></div>", "ERROR");
            } else {
                g_intention_to_gmail_snooze_email = null;
                fn_save_state_to_local_storage(function () {
                   // fn_display_misc_dialog('<div style="width: 400px"><center>' + response["content"] + "</center></div>", "Success");
                   fn_alert("Done! Your message was snoozed");
                    if (g_current_list_route_view && !g_current_list_route_view.destroyed) {
                        g_current_list_route_view.refresh();
                    } else {
                        g_sdk.Router.goto(g_sdk.Router.NativeRouteIDs.INBOX);
                    }
                    g_thread_metadata_by_thread_id_cache = null;
                    if (g_thread_row_comment_button_list_visible) {
                        fn_create_thread_row_comment_button_list(g_thread_row_comment_button_list_visible);
                    }
                });

                return;
            }
        },
        error: function (response, t, x) {
            fn_display_misc_dialog('<div style="width: 400px"><center>Failed to snooze the email. Please try again.<br/>And please email us at support@cloudHQ.net if this error persists.</center></div>', "ERROR");
        }
    });
    c_cmn.fn_log("fn_handle_cloudHQ_thread_toolbar_snooze_email: EXITING");
}

function fn_handle_cloudHQ_thread_toolbar_rename_subject(e) {
    if (!g_logged_in) {
        fn_check_login_and_signup_dialog_if_needed();
        return;
    }
    c_cmn.fn_log("fn_handle_cloudHQ_thread_toolbar_rename_subject: ENTERING e.threadView.getThreadID()=" + e.threadView.getThreadID() + " e.threadView.getSubject()=" + e.threadView.getSubject());
    fn_display_misc_dialog('<div style="width: 400px"><center>Loading... <br/>(might take a few seconds)</center></div>', "", null);
    var thread_id = e.threadView.getThreadID();
    var thread_subject = e.threadView.getSubject();
    $.ajax({
        type: "GET",
        url: g_server_url + "main_share/chrome_extension_rename_subject_dialog",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1",
            "thread_id": thread_id
        },
        async: true,
        success: function (response, t, x) {
            c_cmn.fn_log("chrome_extension_rename_subject_dialog: response:" + JSON.stringify(response));
            if (!response || (response && response["error"])) {
                fn_close_misc_dialog();
                fn_check_login_and_signup_dialog_if_needed();
            } else {
                g_sdk.ButterBar.hideMessage("cloudHQ_butter_1");
                fn_show_inbox_modal($.extend(response, {
                    id: "div_for_rename_subject"
                }));
            }
        },
        error: function (response, t, x) {
            fn_close_misc_dialog();
            fn_check_login_and_signup_dialog_if_needed();
        }
    });
    c_cmn.fn_log("fn_handle_cloudHQ_thread_toolbar_rename_subject: EXITING");
}

function fn_get_visible_thread_row_list() {
    return $(g_css_selector_thread_row_lists).find(":visible");
}

function fn_get_selected_thread_ids() {
    var list = [];
    var thread_id;
    var thread_row_list = fn_get_visible_thread_row_list();
    var thread_row_checkbox;
    thread_row_list.find("[data-inboxsdk-threadid]").each(function () {
        thread_id = $.trim($(this).attr("data-inboxsdk-threadid"));
        thread_row_checkbox = $(this).find('[role="checkbox"]');
        if (thread_row_checkbox.attr("aria-checked") == "false") {
            if (list.indexOf(thread_id)<0) {
                console.log("fn_get_selected_thread_ids:" + thread_id);
                list.push(thread_id);
            }
        }
    });
    return list;
}

function fn_get_selected_message_ids() {
    var list = [];
    var thread_id;
    var thread_row_list = fn_get_visible_thread_row_list();
    var thread_row_checkbox;
    thread_row_list.find("[data-inboxsdk-threadid]").each(function () {
        thread_id = $.trim($(this).attr("data-inboxsdk-threadid"));
        thread_row_checkbox = $(this).find('[role="checkbox"]');
        if (thread_row_checkbox.attr("aria-checked") == "true") {
            if ($(this).find("span[email]").parent().clone().children().remove().end().text().replace(/.*[ ,\.]+\([0-9]+\).*/, "zzzzz") != "zzzzz") {
                if (list.indexOf(thread_id) < 0) {
                    console.log("fn_get_selected_message_ids:" + thread_id);
                    list.push(thread_id);
                }
            }
        }
    });
    return list;
}
function fn_get_date(){
    var week = new Array('Sun', 'Mon', 'Thues', 'Wed', 'Thur', 'Fri', 'Sat'); 
     var today = new Date().getDay(); 
     if(today<3){
         todaylabel=week[3];
     }else if(today==3){
         todaylabel=week[5];
     }else{
         return " ";
     }
     return todaylabel;

}
function fn_timeConverter(time_val){
  var time_val= new Date();
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var week = new Array('Sun', 'Mon', 'Thues', 'Wed', 'Thur', 'Fri', 'Sat');
  var today_week=week[time_val.getDay()]; 
  var year = time_val.getFullYear();
  var month = months[time_val.getMonth()];
  var date = time_val.getDate();
  var hour = time_val.getHours();
  var str;
  if(hour<12){
      str='AM';
  }else{
      str='PM';
      hour=hour-12;
  }
  var min = time_val.getMinutes();
  var time = today_week+','+date + ' ' + month + ',' + year + ',' + hour + ':' + min+' '+str ;
  return time;
}


function fn_display_snooze_email_dialog(e,time, thread_id_list) {
    
 
    $(e.dropdown.el).html(
     '<div style="width: 290px;height:540px"><div class="SK AX"><div class="gmelius_dropdown gmelius_dropdown_conversation gmelius_dropdown_snooze" >' + '<div class="gmelius_helper_text gmelius_pad">SNOOZE...</div>' +
     '<ul class="gmelius_preset gmelius_user">'+
       '<div class="gmelius_helper_text gmelius_pad gmelius_dp_snoozed" id="gmelius_helper" style="display:none" ><span id="cur_time" style="float:left;margin-left:-10px"></span><span id="unsoonze" style="margin-left:5px">Unsoonze</span></div>'+     
        '<li id="cloudHQ__snooze_time_val1">in 1 hour<span id="s1"></span></li>'+
        '<li id="cloudHQ__snooze_time_val2">in 2 hours<span id="s2"></span></li></ul>'+
    '<div class="gmelius_hr" role="separator"></div>'+
    '<ul class="gmelius_preset gmelius_moments">'+
        '<li id="cloudHQ__snooze_time_val3"><i class="material-icons gm_size_18">brightness_4</i>Later today<span>5:00 pm</span></li>'+
        '<li id="cloudHQ__snooze_time_val4"><i class="material-icons gm_size_18">brightness_5</i>Tomorrow morning<span>9:00 am</span></li>'+
        '<li id="cloudHQ__snooze_time_val5"><i class="material-icons gm_size_18">brightness_77</i>Tomorrow afternoon<span> 3:00 pm</span></li>'+
        '<li id="cloudHQ__snooze_time_val6"><i class="material-icons gm_size_18">weekend</i>This weekend<span>Sat, 9:00 am</span></li>'+
        '<li id="cloudHQ__snooze_time_val7"><i class="material-icons gm_size_18">next_week</i>Next week<span>Monday, 9:00 am</span></li>'+
        '<li id="cloudHQ__snooze_time_val8"><i class="material-icons gm_size_18">next_week</i>Later this week<span id="span1"></span></li></ul>'+
    '<div class="gmelius_hr" role="separator"></div>'+
    "<br/><br/>"+'<div id="cloudHQ__snooze_email_btn" class="T-I J-J5-Ji ar7 L3 inboxsdk__button T-I-atl" role="button" style="margin:1px 50px 30px 90px" tabindex="0"><div><span class="inboxsdk__button_text" style={margin:10px 10px 50px 90px}>Snooze</span></div></div>'+
    '<div class="gmelius_select_time gmelius_pad" data-primary="1"><i class="material-icons gm_size_18">event</i>' +'<a id="sel_time"> Select date and time'+'</a></div>' + 
 	'<input type="text" id="cloudHQ__snooze_time_local" name="date2" style="margin:10px 23px 3px 20px" value="2017/06/06 9:00">'+
   '<div style="display:none">'+ 
   '<input type="checkbox" id="cloudHQ__only_if_nobody_replies" checked="checked"/> <label for="cloudHQ__only_if_nobody_replies">Snooze only if nobody replies</label>'+"<br/><br/>"+'<input type="text" id="cloudHQ__snooze_note" style="padding: 5px; width: 320px;" placeholder="short note about this snooze"/>'+"<br/><br/>"+
     "</div></div></div></div>");

           
     document.getElementById('cloudHQ__snooze_time_local').style.display = 'none';
      var date_label=fn_get_date(); 
      if(date_label==" "){
          document.getElementById('cloudHQ__snooze_time_val8').style.display='none';

      }    
  
     document.getElementById("span1").innerHTML=date_label+', 9:00 am';
    
     var label=fn_get_current_label_name1();
     var x = document.getElementById('gmelius_helper');
      if(label.indexOf("-Snoozed") >= 0){
        x.style.display = 'block';
           
       }
      else if(label=="INBOX"){
                x.style.display = 'none';
        }
  
     var time_now=new Date();
     var time1=time_now.getHours(8)+1;
     var min1=time_now.getMinutes();
     var time2=time_now.getHours(8)+2;
     var min2=time_now.getMinutes();
     document.getElementById("s1").innerHTML='Today at'+' '+time1+':'+min1;
     document.getElementById("s2").innerHTML='Today at'+' '+time2+':'+min2;
     if(time_now.getHours()>17){
         document.getElementById("cloudHQ__snooze_time_val3").style.display='none';
     }else{
         document.getElementById("cloudHQ__snooze_time_val3").style.display='block';
     }
     var timestamp;
     //IN 1 HOURS
     $("#cloudHQ__snooze_time_val1").click(function () {
        var time_val1 = new Date();
        time_val1.setDate(time_val1.getDate());
        time_val1.setHours(time_val1.getHours(8));
        time_val1.setMinutes(time_val1.getMinutes()+1);
        var snooze_time_utc_as_timestamp = Date.create(time_val1).getTime();
        $("#cloudHQ__snooze_time_local")[0].value = time_val1.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        timestamp= $("#cloudHQ__snooze_time_local")[0].value;       
        var only_if_nobody_replies = $("#cloudHQ__only_if_nobody_replies").is(":checked");
        var snooze_note = $("#cloudHQ__snooze_note").val();
        var thread_list;
        if (!thread_id_list) {
            thread_list = [];
            thread_list.push(e.threadView.getThreadID());
        } else {
            thread_list = JSON.parse(JSON.stringify(thread_id_list));
        }
        var options = {
            thread_id_list: thread_list,
            snooze_time_utc_as_timestamp: snooze_time_utc_as_timestamp,
            only_if_nobody_replies: only_if_nobody_replies,
            snooze_note: snooze_note
        };
        g_intention_to_gmail_snooze_email = JSON.parse(JSON.stringify(options));
        fn_save_state_to_local_storage(function () {
            fn_handle_cloudHQ_thread_toolbar_snooze_email_button(options);
        });        
     });

    //IN 2 HOURS

    $("#cloudHQ__snooze_time_val2").click(function(){
        var time_val2 = new Date();
        time_val2.setDate(time_val2.getDate());
        time_val2.setHours(time_val2.getHours(8)+2);
        time_val2.setMinutes(0);
        var snooze_time_utc_as_timestamp = Date.create(time_val2).getTime();
        $("#cloudHQ__snooze_time_local")[0].value = time_val2.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        timestamp= $("#cloudHQ__snooze_time_local")[0].value;       
        var only_if_nobody_replies = $("#cloudHQ__only_if_nobody_replies").is(":checked");
        var snooze_note = $("#cloudHQ__snooze_note").val();
        var thread_list;
        if (!thread_id_list) {
            thread_list = [];
            thread_list.push(e.threadView.getThreadID());
        } else {
            thread_list = JSON.parse(JSON.stringify(thread_id_list));
        }
        var options = {
            thread_id_list: thread_list,
            snooze_time_utc_as_timestamp: snooze_time_utc_as_timestamp,
            only_if_nobody_replies: only_if_nobody_replies,
            snooze_note: snooze_note
        };
        g_intention_to_gmail_snooze_email = JSON.parse(JSON.stringify(options));
        fn_save_state_to_local_storage(function () {
            fn_handle_cloudHQ_thread_toolbar_snooze_email_button(options);
        });        

    });

    //later Today

    $("#cloudHQ__snooze_time_val3").click(function () {
        var time_val3 = new Date();
        time_val3.setDate(time_val3.getDate());
        time_val3.setHours(17);
        time_val3.setMinutes(0);
        var snooze_time_utc_as_timestamp = Date.create(time_val3).getTime();
        $("#cloudHQ__snooze_time_local")[0].value = time_val3.format("{yyyy}-{MM}-{dd}-{HH}:{mm}");
        timestamp= $("#cloudHQ__snooze_time_local")[0].value;       
        var only_if_nobody_replies = $("#cloudHQ__only_if_nobody_replies").is(":checked");
        var snooze_note = $("#cloudHQ__snooze_note").val();
        var thread_list;
        if (!thread_id_list) {
            thread_list = [];
            thread_list.push(e.threadView.getThreadID());
        } else {
            thread_list = JSON.parse(JSON.stringify(thread_id_list));
        }
        var options = {
            thread_id_list: thread_list,
            snooze_time_utc_as_timestamp: snooze_time_utc_as_timestamp,
            only_if_nobody_replies: only_if_nobody_replies,
            snooze_note: snooze_note
        };
        g_intention_to_gmail_snooze_email = JSON.parse(JSON.stringify(options));
        fn_save_state_to_local_storage(function () {
            fn_handle_cloudHQ_thread_toolbar_snooze_email_button(options);
        });     
        
        
    });
    //Tomorrow morning
    $("#cloudHQ__snooze_time_val4").click(function () {
        var time_val4 = new Date();
        time_val4.setDate(time_val4.getDate()+1);
        time_val4.setHours(9);
        time_val4.setMinutes(0);
         var snooze_time_utc_as_timestamp = Date.create(time_val4).getTime();
        $("#cloudHQ__snooze_time_local")[0].value = time_val4.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        timestamp= $("#cloudHQ__snooze_time_local")[0].value;       
        var only_if_nobody_replies = $("#cloudHQ__only_if_nobody_replies").is(":checked");
        var snooze_note = $("#cloudHQ__snooze_note").val();
        var thread_list;
        if (!thread_id_list) {
            thread_list = [];
            thread_list.push(e.threadView.getThreadID());
        } else {
            thread_list = JSON.parse(JSON.stringify(thread_id_list));
        }
        var options = {
            thread_id_list: thread_list,
            snooze_time_utc_as_timestamp: snooze_time_utc_as_timestamp,
            only_if_nobody_replies: only_if_nobody_replies,
            snooze_note: snooze_note
        };
        g_intention_to_gmail_snooze_email = JSON.parse(JSON.stringify(options));
        fn_save_state_to_local_storage(function () {
            fn_handle_cloudHQ_thread_toolbar_snooze_email_button(options);
        });     

       
    });

    //Tomorrow afternoon
    $("#cloudHQ__snooze_time_val5").click(function () {
        var time_val5 = new Date();
        time_val5.setDate(time_val5.getDate()+1);
        time_val5.setHours(15);
        time_val5.setMinutes();
        var snooze_time_utc_as_timestamp = Date.create(time_val5).getTime();
        $("#cloudHQ__snooze_time_local")[0].value = time_val5.format("{yyyy}-{MM}-{dd}-{HH}:{mm}");
        timestamp= $("#cloudHQ__snooze_time_local")[0].value;       
        var only_if_nobody_replies = $("#cloudHQ__only_if_nobody_replies").is(":checked");
        var snooze_note = $("#cloudHQ__snooze_note").val();
        var thread_list;
        if (!thread_id_list) {
            thread_list = [];
            thread_list.push(e.threadView.getThreadID());
        } else {
            thread_list = JSON.parse(JSON.stringify(thread_id_list));
        }
        var options = {
            thread_id_list: thread_list,
            snooze_time_utc_as_timestamp: snooze_time_utc_as_timestamp,
            only_if_nobody_replies: only_if_nobody_replies,
            snooze_note: snooze_note
        };
        g_intention_to_gmail_snooze_email = JSON.parse(JSON.stringify(options));
        fn_save_state_to_local_storage(function () {
            fn_handle_cloudHQ_thread_toolbar_snooze_email_button(options);
        });             
    });


    $("#sel_time").click(function(){
       if(document.getElementById('cloudHQ__snooze_time_local').style.display=='none'){
           document.getElementById('cloudHQ__snooze_time_local').style.display = 'block';
          $(function(){
            $('*[name=date2]').appendDtpicker({"inline": true});
            $('*[name=date2]').handleDtpicker('show');
          });
       }else if(document.getElementById('cloudHQ__snooze_time_local').style.display == 'block'){
            document.getElementById('cloudHQ__snooze_time_local').style.display = 'none';
          $(function(){
            $('*[name=date2]').handleDtpicker('hide');

          });

       }
         

    })
  // $("#cloudHQ__snooze_time_local")[0].valueAsNumber = time_now.getTime().format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
    //Select Date and Time
    $("#cloudHQ__snooze_email_btn").click(function () {       
        var snooze_time_utc_as_timestamp = Date.create($("#cloudHQ__snooze_time_local")[0].value).getTime();
        timestamp= $("#cloudHQ__snooze_time_local")[0].value;       
        var only_if_nobody_replies = $("#cloudHQ__only_if_nobody_replies").is(":checked");
        var snooze_note = $("#cloudHQ__snooze_note").val();
        var thread_list;
        if (!thread_id_list) {
            thread_list = [];
            thread_list.push(e.threadView.getThreadID());
        } else {
            thread_list = JSON.parse(JSON.stringify(thread_id_list));
        }
        var options = {
            thread_id_list: thread_list,
            snooze_time_utc_as_timestamp: snooze_time_utc_as_timestamp,
            only_if_nobody_replies: only_if_nobody_replies,
            snooze_note: snooze_note
        };
        g_intention_to_gmail_snooze_email = JSON.parse(JSON.stringify(options));
        fn_save_state_to_local_storage(function () {
            fn_handle_cloudHQ_thread_toolbar_snooze_email_button(options);
        });

    });
    
    //This WeekEnd
    $("#cloudHQ__snooze_time_val6").click(function () {
            var time_val6 = new Date();
            time_val6.setDate(time_val6.getDate()+6-time_val6.getDay())
            time_val6.setHours(9);
            time_val6.setMinutes(0);
            var snooze_time_utc_as_timestamp = Date.create(time_val6).getTime();
            $("#cloudHQ__snooze_time_local")[0].value = time_val6.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
            timestamp= $("#cloudHQ__snooze_time_local")[0].value;       
            var only_if_nobody_replies = $("#cloudHQ__only_if_nobody_replies").is(":checked");
            var snooze_note = $("#cloudHQ__snooze_note").val();
            var thread_list;
            if (!thread_id_list) {
                thread_list = [];
                thread_list.push(e.threadView.getThreadID());
            } else {
                thread_list = JSON.parse(JSON.stringify(thread_id_list));
            }
            var options = {
                thread_id_list: thread_list,
                snooze_time_utc_as_timestamp: snooze_time_utc_as_timestamp,
                only_if_nobody_replies: only_if_nobody_replies,
                snooze_note: snooze_note
            };
            g_intention_to_gmail_snooze_email = JSON.parse(JSON.stringify(options));
            fn_save_state_to_local_storage(function () {
                fn_handle_cloudHQ_thread_toolbar_snooze_email_button(options);
            });        
     });

    //Next Week
    $("#cloudHQ__snooze_time_val7").click(function () {
        var time_val7 = new Date();
        time_val7.setDate(time_val7.getDate()+8-time_val7.getDay());
        time_val7.setHours(9);
        time_val7.setMinutes(0);
        var snooze_time_utc_as_timestamp = Date.create(time_val7).getTime();
        $("#cloudHQ__snooze_time_local")[0].value = time_val7.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        timestamp= $("#cloudHQ__snooze_time_local")[0].value;       
        var only_if_nobody_replies = $("#cloudHQ__only_if_nobody_replies").is(":checked");
        var snooze_note = $("#cloudHQ__snooze_note").val();
        var thread_list;
        if (!thread_id_list) {
            thread_list = [];
            thread_list.push(e.threadView.getThreadID());
        } else {
            thread_list = JSON.parse(JSON.stringify(thread_id_list));
        }
        var options = {
            thread_id_list: thread_list,
            snooze_time_utc_as_timestamp: snooze_time_utc_as_timestamp,
            only_if_nobody_replies: only_if_nobody_replies,
            snooze_note: snooze_note
        };
        g_intention_to_gmail_snooze_email = JSON.parse(JSON.stringify(options));
        fn_save_state_to_local_storage(function () {
            fn_handle_cloudHQ_thread_toolbar_snooze_email_button(options);
        });         });
    $("#cloudHQ__snooze_time_val8").click(function () {
        var time_val8 = new Date();
        var today = new Date().getDay(); 
            if(today==0){
                today=3;
            }else if(today==3){
                today=6;
            }
        time_val8.setDate(time_val8.getDate()+time_val8.getDay(0)+today);
        time_val8.setHours(9);
        time_val8.setMinutes(0); 
        var snooze_time_utc_as_timestamp = Date.create(time_val8).getTime();
        $("#cloudHQ__snooze_time_local")[0].value = time_val8.format("{yyyy}-{MM}-{dd}T{HH}:{mm}");
        timestamp= $("#cloudHQ__snooze_time_local")[0].value;       
        var only_if_nobody_replies = $("#cloudHQ__only_if_nobody_replies").is(":checked");
        var snooze_note = $("#cloudHQ__snooze_note").val();
        var thread_list;
        if (!thread_id_list) {
            thread_list = [];
            thread_list.push(e.threadView.getThreadID());
        } else {
            thread_list = JSON.parse(JSON.stringify(thread_id_list));
        }
        var options = {
            thread_id_list: thread_list,
            snooze_time_utc_as_timestamp: snooze_time_utc_as_timestamp,
            only_if_nobody_replies: only_if_nobody_replies,
            snooze_note: snooze_note
        };
        g_intention_to_gmail_snooze_email = JSON.parse(JSON.stringify(options));
        fn_save_state_to_local_storage(function () {
            fn_handle_cloudHQ_thread_toolbar_snooze_email_button(options);
        });     
    });
 
   

    $("#unsoonze").click(function(){
        var time_val8 = new Date();
        time_val8.setDate(time_val8.getDate());
        time_val8.setHours(time_val8.getHours());
        time_val8.setMinutes(time_val8.getMinutes()+2);      
        snooze_time_utc_as_timestamp = Date.create(time_val8).getTime();
        var only_if_nobody_replies = $("#cloudHQ__only_if_nobody_replies").is(":checked");
        var snooze_note = $("#cloudHQ__snooze_note").val();
        var thread_list;
        if (!thread_id_list) {
            thread_list = [];
            thread_list.push(e.threadView.getThreadID());
        } else {
             thread_list = JSON.parse(JSON.stringify(thread_id_list));
        }
         var options = {
            thread_id_list: thread_list,
            snooze_time_utc_as_timestamp: snooze_time_utc_as_timestamp,
            only_if_nobody_replies: only_if_nobody_replies,
            snooze_note: snooze_note
            };
            g_intention_to_gmail_snooze_email = JSON.parse(JSON.stringify(options));
            fn_save_state_to_local_storage(function () {
                fn_unsoonze(options);
            }); 
    })
    document.getElementById("cur_time").innerHTML= time; 
   
}
var vars = [{key:"key", value:"value"}];

function fn_register_cloudHQ_toolbar_buttons(sdk) {
    $("<style></style>").html(".chqBtnSnoozeEmail { -webkit-filter: grayscale(100%); filter: grayscale(100%); opacity: 0.55; " + ".chqBtnSnoozeEmail:hover { -webkit-filter: grayscale(100%); opacity: 1.0; } " + ".T-I-JW .chqBtnSnoozeEmail { -webkit-filter: grayscale(100%); opacity: 1.0; } ").appendTo($("head"));
    sdk.Toolbars.registerToolbarButtonForThreadView({
        title: "Snooze Email",
        section: "INBOX_STATE",
        iconClass: "chqBtnSnoozeEmail",
        iconUrl: g_server_url + "images/gmail_snooze.png",
        hasDropdown: true,
        onClick: function (e) {
            var time='';
           if(vars[0].key==e.threadView.getThreadID()){
               time=vars[0].value;
           } 
            fn_display_snooze_email_dialog(e,time);
        }
    });
    sdk.Toolbars.registerToolbarButtonForList({
        title: "Snooze Emails",
        section: "INBOX_STATE",
        iconClass: "chqBtnSnoozeEmail",
        iconUrl: g_server_url + "images/gmail_snooze.png",
        hasDropdown: true,
        onClick: function (e) {
            thread_list = fn_get_selected_thread_ids();
            fn_display_snooze_email_dialog(e,time, thread_list);
        },
        hideFor: function (route) {}
    });
}
function fn_register_cloudHQ_label_buttons(sdk){
    var userEmailAddress = sdk.User.getEmailAddress();
	chrome.storage.sync.get({
		icons: true,
		text: true
	}, function (items) {
		if (items.icons || items.text) {
			sdk.Lists.registerThreadRowViewHandler(function (threadRowView) {
				try {
					var contact = threadRowView.getContacts();
					var email = contact[0].emailAddress;
					if (email === userEmailAddress) {
						for (var c = 1; c < contact.length; c++) {
							if (contact[c].emailAddress !== userEmailAddress) {
								email = contact[c].emailAddress;
								break;
							}
						}
					}
					var domain = email.toLowerCase().split("@")[1];
					var parts = domain.split(".");
					var len = parts.length;
					if (len > 2) {
						if (["com", "org", "io", "net"].indexOf(parts[len - 1]) !== -1) {
							domain = parts[len - 2] + "." + parts[len - 1];
						}
					}
					if (items.icons) {
						threadRowView.addButton({
							tooltip: email,
							iconUrl: g_server_url + "images/gmail_snooze.png",
                            hasDropdown: true,
                             onClick: function (e) {
                                    thread_list = e.threadRowView._threadRowViewDriver._cachedThreadID;
                                    var read=fn_get_is_read_given_thread_id(thread_list);
                                    var cur_label=fn_get_current_label_name();
                                    if(cur_label=="-Snoozed"){
                                        threadRowView.is_read=true;
                                    }
                                    var time = '';
                                    var times = $(".inboxsdk__thread_row_custom_date");
                                    
                                    for(var i = 0; i < times.length; i ++){
                                        if(times[i].parentElement.parentElement.getAttribute("data-inboxsdk-threadid") == thread_list){
                                            time = times[i].innerText;
                                            break;
                                        }
                                    }
                                    vars[0].key=thread_list;
                                    vars[0].value=time;
                                    fn_display_snooze_email_dialog(e,time,thread_list);
                                }
						});
					}
					
				} catch (f) {}
			});
		}
	});

}
function fn_register_cloudHQ_label_text(sdk){
   chrome.storage.sync.get({
		icons: true,
		text: true
	}, function (items) {
		if (items.icons || items.text) {
			sdk.Lists.registerThreadRowViewHandler(function (threadRowView) {
				try {
					
					if (items.text) {
                        if(threadRowView.is_read=false){
                            threadRowView.addLabel({
							 "title": "Unsoonze",
                             backgroundColor: "#ef6c00", 
                             "text":"Unsoonz",
                             tooltip:"Unsoonze",
							//iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAACdklEQVR4Ae2WA6wdWxSGv2PVBzXj2ogaq7Z9EdW2HdRuXNttbBfvvVqvtnntlZ1J5kxHQfXtcNa/13/2QnL4JfiLjy7M5SjXeEseebzlKkeYRSe8uKYBa3lGscF5zErq4pgUu8ij2OTkspU4DhjJe4otnjcMwhYBdqNN8Im9ZNCBOEGCJOhABvv4pNWwFT8WiXFBc/EWY4iQjijjuKNRnhadCQFN+m9MxW+ins53jYUfU1RxuE0zrNCSu5pCmTBCSS+RxCoprqh7g34sfK9+fRI7pNQrXlMDQ3aK6Gv64kjUoFCqF5sNt1at1VSwbQAzJJ5jtN1r1GD6HRkEVJlWkAYvTyU8BhwZQIYoHuFBRxcJfiTi2CDGZ9F0RMccCe0FxwZwQDSz0HFUQhmuDLJFcwgdVyXUwZVBZ9H8i463Eoq7MkipddMhO0DQlUFINLluDDo6MlAlSpgaFLGbpHmJnDS5O/dE9Z4J+Eya7GBMIcwivqskXe2M6WwJ7cOMJpymWKnrouWgfJ9p/LhPRDGnJ/dF/5npCMT4YlxoL08kOA4rhFksxdqMQJZkeIiHNKyW8B0CmKKK9YKqAEBQjcBy0lJf7cJ0rFNb18UcamPANvV3pQV2aU2O3N6AIQm1bndJYYdaqumvqI4xDFEDeIWUjfT/qHv9MWG7kt6lpcXi3Fd3NmKKn7NK/p0ZJhMVZDY5Sn8SH+YQFQt5BxnESEeMLO5plCeIYBE/Uii1rQfIpjMpQoRI0ZlsDqqtldnBhy2G8IZii+cl/XBAnK3kmibPYT3VcEw9VvHYMPkDllEb13jpyGwO8x9vyCWH1/zLQWbQDg+/AH8pATD+BDyGyAvuAAAAAElFTkSuQmCC"
						});

                        }
						
					}
				} catch (f) {}
			});
		}
	});
}

function fn_create_rename_subject_threadview_button(sdk) {
    if (g_fn_create_rename_subject_button_done) {
        return;
    }
    $("<style></style>").html(".chqBtnRenameSubject { -webkit-filter: grayscale(100%); filter: grayscale(100%); opacity: 0.55 } " + ".chqBtnRenameSubject:hover { -webkit-filter: grayscale(100%); opacity: 1.0; } " + ".T-I-JW .chqBtnRenameSubject { -webkit-filter: grayscale(100%); opacity: 1.0; } ").appendTo($("head"));
    sdk.Toolbars.registerToolbarButtonForThreadView({
        title: "Rename",
        section: "INBOX_STATE",
        iconClass: "chqBtnRenameSubject",
        iconUrl: "https://www.cloudHQ.net/images/gmail_subject_rename.png",
        hasDropdown: false,
        onClick: function (e) {
            fn_handle_cloudHQ_thread_toolbar_rename_subject(e);
        }
    });
    g_fn_create_rename_subject_button_done = true;
}

function fn_copy_to_clipboard(text, next_step_ok, next_step_error) {
    if (window.clipboardData && window.clipboardData.setData) {
        return clipboardData.setData("Text", text);
    } else {
        if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");
                next_step_ok();
            } catch (ex) {
                next_step_error();
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }
}

/*function fn_handle_cloudHQ_thread_docit(options) {
    var thread_id = options["thread_id"];
    var thread_ids = options["thread_ids"] || null;
    var message_ids = options["message_ids"] || null;
    if (!g_logged_in) {
        fn_check_login_and_signup_dialog_if_needed();
        return;
    }
    c_cmn.fn_log("fn_handle_cloudHQ_thread_docit: ENTERING thread_id" + thread_id);
    fn_display_misc_dialog('<div style="width: 400px"><center>Creating a link... <br/>(might take a few seconds)</center></div>', "", null);
    $.ajax({
        type: "GET",
        url: g_server_url + "main_gmail_share_email/chrome_extension_create_link",
        dataType: "json",
        data: {
            "email_or_login": g_email_or_login,
            "switch_login": "1",
            "thread_id": thread_id,
            "thread_ids": thread_ids,
            "message_ids": message_ids
        },
        async: true,
        success: function (response, t, x) {
            c_cmn.fn_log("fn_handle_cloudHQ_thread_docit: response:" + JSON.stringify(response));
            if (!response || (response && response["error"])) {
                fn_close_misc_dialog();
                fn_check_login_and_signup_dialog_if_needed();
            } else {
                g_sdk.ButterBar.hideMessage("cloudHQ_butter_1");
                g_intention_to_gmail_share_email = null;
                fn_save_state_to_local_storage(function () {
                    var modal_view = fn_show_inbox_modal($.extend(response, {
                        id: "div_for_gmail_share_email",
                        onButtonClicked: function (button) {
                            if (button["action"] == "COPY_TO_CLIPBOARD") {
                                var link = response["shared_email_link"];
                                fn_copy_to_clipboard(link, function () {
                                    $("#cloudHQ_docit_share_copy_wrapper").html("Link copied to clipboard!");
                                }, function () {
                                    $("#cloudHQ_docit_share_copy_wrapper").html("Copy failed :( Please user Ctrl+C or Cmd+C to copy the link.");
                                });
                            }
                        }
                    }));
                });
            }
        },
        error: function (response, t, x) {
            fn_close_misc_dialog();
            fn_check_login_and_signup_dialog_if_needed();
        }
    });
    c_cmn.fn_log("fn_handle_cloudHQ_thread_docit: EXITING");
}*/

/*function fn_create_docit_toolbar_button(sdk) {
    if ($(".cloudhq__share_email_button").length == 0) {
        $("body").append('<div class="cloudhq__share_email_button" />');
    } else {
        return;
    }
    $("<style></style>").html(".chqBtnShareEmail { -webkit-filter: grayscale(100%); filter: grayscale(100%); opacity: 0.55; }" + ".chqBtnShareEmail:hover { -webkit-filter: grayscale(100%); opacity: 1.0; } " + ".T-I-JW .chqBtnShareEmail { -webkit-filter: grayscale(100%); opacity: 1.0; } ").appendTo($("head"));
    sdk.Toolbars.registerToolbarButtonForThreadView({
        title: "Share link to this email",
        section: "INBOX_STATE",
        iconClass: "chqBtnShareEmail",
        iconUrl: g_server_url + "images/gmail_docit.png",
        hasDropdown: false,
        onClick: function (e) {
            var thread_id = e.threadView.getThreadID();
            var options = {
                thread_id: thread_id
            };
            fn_handle_cloudHQ_thread_docit(options);
        }
    });
    $("<style></style>").html(".chq_share_email_btn { -webkit-filter: grayscale(100%); filter: grayscale(100%); opacity: 0.55; }" + ".chq_share_email_btn:hover { -webkit-filter: grayscale(100%); opacity: 1.0; } " + ".T-I-JW .chq_share_email_btn { -webkit-filter: grayscale(100%); opacity: 1.0; } ").appendTo($("head"));
    sdk.Toolbars.registerToolbarButtonForList({
        title: "Share link to this email(s)",
        iconUrl: g_server_url + "images/gmail_docit.png",
        iconClass: "chq_share_email_btn",
        section: "INBOX_STATE",
        hasDropdown: false,
        onClick: function (e) {
            var thread_ids = fn_get_selected_thread_ids();
            var message_ids = fn_get_selected_message_ids();
            var options = {
                thread_ids: thread_ids,
                message_ids: message_ids
            };
            fn_handle_cloudHQ_thread_docit(options);
        }
    });
    $(window).resize(function () {});
}*/

function fn_create_extension_toolbar(sdk, cb) {
    var tb = null;
    $('.inboxsdk__button_iconImg[src="https://www.cloudhq.net/images/cHQ_34x34.png"]').hide();
    $('.inboxsdk__appButton_title:contains("Gmail Extension")').hide();
    $(".cloudhq__has_toolbar").remove();
    if ($(".cloudhq__has_toolbar").length == 0) {
        $("body").append('<div class="cloudhq__has_toolbar" />');
    } else {
        return;
    }

    function add_toolbar_item(el, title, method, css) {
        var a = $('<a href="#"></a>').css({
            "display": "block",
            "padding": "10px 14px",
            "color": "#195070",
            "text-align": "left",
            "font-size": "13px",
            "text-decoration": "none"
        }).hover(function () {
            a.css({
                "background-color": "#195070",
                "color": "#fff"
            });
        }, function () {
            a.css({
                "background-color": "#fff",
                "color": (css && css["color"]) || "#195070"
            });
        }).appendTo(el);
        a.text(title);
        if ($.isFunction(method)) {
            a.click(method).attr("onclick", "return false;");
        } else {
            a.attr("href", method).attr("target", "_blank");
        }
        a.click(function () {
            tb.close();
        });
        if (css) {
            a.css(css);
        }
        return a;
    }

    function add_toolbar_separator(el) {
        el.append($("<div></div>").css({
            "border-top": "1px solid #BACBD5",
            "height": "1px",
            "margin": "2px 0"
        }));
    }
    tb = sdk.Toolbars.addToolbarButtonForApp({
        title: "Gmail Extension",
        iconUrl: "https://www.cloudhq.net/images/cHQ_34x34.png?a=1",
        arrowColor: "#195070",
        onClick: function (e) {
            var dd = e.dropdown;
            var el = $(dd.el);
            if (cb && $.isFunction(cb) && cb.call(this, add_toolbar_item)) {
                add_toolbar_separator(el);
            }
            add_toolbar_item(el, "Share label", function (e) {
                fn_display_share_label_dialog();
            }, {
                "font-weight": "bold"
            });
            add_toolbar_item(el, "Automatic email save", function (e) {
                fn_handle_cloudHQ_autosave_impl();
            }, {
                "font-weight": "bold"
            });
            add_toolbar_item(el, "Share contacts", function (e) {
                fn_show_share_contacts_dialog(tb);
            }, {
                "font-weight": "bold"
            });
            add_toolbar_item(el, "Import and sync Salesforce contacts", function (e) {
                fn_show_sync_salesforce_contacts_dialog(tb);
            }, {
                "font-weight": "bold"
            });
            add_toolbar_separator(el);
            add_toolbar_item(el, "How to guides", "https://support.cloudhq.net/category/sharing/");
            add_toolbar_item(el, "Support - contact us", "https://mail.google.com/mail/u/0/?view=cm&fs=1&to=support@cloudHQ.net&su=Question about label and email sharing&body=Hi,&tf=1");
            add_toolbar_separator(el);
            add_toolbar_item(el, "Refer a friend", function (e) {
                fn_show_referrals_dialog(tb);
            });
            add_toolbar_item(el, "Upgrade (better support, email backup, ...)", g_server_url + "upgrade?email_or_login=" + encodeURIComponent(g_email_or_login) + "&switch_login=1" + "&user_email=" + encodeURIComponent(g_email_or_login));
            add_toolbar_separator(el);
            add_toolbar_item(el, "Options", function (e) {
                fn_show_options_dialog(tb);
            });
            add_toolbar_item(el, "My cloudHQ account", g_server_url + "account?email_or_login=" + encodeURIComponent(g_email_or_login) + "&switch_login=1&user_email=" + encodeURIComponent(g_email_or_login));
            add_toolbar_separator(el);
            add_toolbar_item(el, "Get more extensions", g_server_url + "chrome_extensions?email_or_login=" + encodeURIComponent(g_email_or_login) + "&switch_login=1");
            el.parent().parent().css({
                "min-width": "180px",
                "border": "2px solid #195070",
                "border-radius": "3px",
                "z-index": "10000"
            });
        }
    });
    c_cmn.fn_delayed_conditional_execute({
        poll_delay: 100,
        max_poll_attempts: 10,
        retry_message: null,
        condition: function () {
            var pass = false;
            $(".inboxsdk__appButton_title").each(function (i, val) {
                if ($(this).text() == "cloudHQ") {
                    $(this).css({
                        "color": "#183648",
                        "font-weight": "bold"
                    });
                    pass = true;
                }
            });
            return pass;
        },
        continuation: function () {
            return true;
        }
    });
}

function fn_add_cloudHQ_thread_view_shared_dropdown_button(options) {
    var button_id = options.id;
    var button_title = options.buttonTitle;
    var menu_id = options.menuItemId;
    var menu_title = options.menuItemTitle;
    var event_name = "on" + button_id + "Click";
    var sdk_event = null;

    function on_menu_click(e) {
        sdk_event = e;
        var dd = $(e.dropdown.el);
        var element_id = button_id + "MenuEl";
        dd.attr("id", element_id);
        e.dropdown.setPlacementOptions({
            hAlign: "left",
            forceHAlign: false
        });
        window.postMessage({
            eventName: event_name,
            eventData: {
                dropdownId: element_id,
                threadID: e.threadView.getThreadID(),
                threadSubject: e.threadView.getSubject(),
                threadMessageIDs: $.map(e.threadView.getMessageViewsAll(), function (val) {
                    if (val.isLoaded()) {
                        return val.getMessageID();
                    } else {
                        return "message_id_not_lodaed";
                    }
                })
            }
        }, "*");
    }
    window.addEventListener("message", function (e) {
        var data = e.data;
        if (data && data.eventName == event_name) {
            var event_data = data.eventData;
            var dd = $("#" + event_data.dropdownId);
            var div_id = "mi999";
            var div = $('<div class="J-N" selector="all" role="menuitem" id="' + div_id + '" style="user-select: none;"></div>').append('<div class="J-N-Jz" style="user-select: none; padding: 2px 0; font-style: italic">' + menu_title + "</div>").hover(function (e) {
                div.addClass("J-N-JT");
            }, function (e) {
                div.removeClass("J-N-JT");
            }).appendTo(dd);
            div.click(function () {
                if ($.isFunction(options.onClick)) {
                    window.postMessage({
                        eventName: event_name + "_CLOSE"
                    }, "*");
                    options.onClick(event_data);
                }
            });
        } else {
            if (data && data.eventName == event_name + "_CLOSE") {
                if (sdk_event && sdk_event.dropdown) {
                    sdk_event.dropdown.close();
                }
            }
        }
    });
    if ($(".cloudhq__save_to_dropdown").length == 0) {
        if ($(".cloudhq__save_to_dropdown").length == 0) {
            $("body").append('<div class="cloudhq__save_to_dropdown" />');
        } else {
            return;
        }
        $("<style></style>").html("." + button_id + " { -webkit-filter: grayscale(100%); filter: grayscale(100%); }" + "." + button_id + ":after { padding-left: 6px; }" + "[data-toolbar-icononly=true] ." + button_id + ':after  { padding-left: 6px; content: "' + button_title + '";}').appendTo($("head"));
        try {
            g_sdk.Toolbars.registerToolbarButtonForThreadView({
                title: button_title,
                section: "INBOX_STATE",
                iconClass: button_id,
                iconUrl: "https://www.cloudhq.net/images/cHQ_34x34.png",
                hasDropdown: true,
                onClick: function (e) {
                    on_menu_click(e);
                }
            });
        } catch (err) {
            console.log("fn_add_cloudHQ_thread_view_shared_dropdown_button", err);
        }
    }
}

function fn_handle_cloudHQ_thread_toolbar_save_to_install() {
    document.location.href = g_server_url + "chrome_extensions?data_tag=save_to_cloud&email_or_login=" + encodeURIComponent(g_email_or_login) + "&switch_login=1";
}

function fn_create_save_to_install_dropbown(sdk) {
    setTimeout(function () {
        if ($(".cloudhq__has_save_to_extensions_other").length == 0) {
            $("body").append('<div class="cloudhq__has_save_to_extensions_other" />');
        } else {
            return;
        }
        fn_add_cloudHQ_thread_view_shared_dropdown_button({
            id: "chqBtnSaveToDropdown",
            buttonTitle: "Save to",
            menuItemId: "chqBtnSaveAsInstall",
            menuItemTitle: "Install Save to Extensions ...",
            onClick: function (e) {
                fn_handle_cloudHQ_thread_toolbar_save_to_install(e);
            }
        });
    }, 2000);
}

function fn_pre_user_check() {
    $.ajax({
        type: "POST",
        url: g_server_url + "main_pre_user/check",
        dataType: "json",
        data: {
            "email": g_email_or_login,
            "email_or_login": g_email_or_login,
            "chrome_extension_name": "label_sharing",
            "switch_login": "1",
        }
    });
}
var g_cloudHQ_feature_share_email = "gmail_share_email";
var g_cloudHQ_feature_rename = "gmail_rename_email";
var g_cloudHQ_feature_snooze = "gmail_snooze_email";
var g_cloudHQ_feature_schedule = "gmail_schedule_email";

function fn_should_register_cloudHQ_feature(name) {
    var class_name = "data-cloudhq-has-" + name.replace(/_/g, "-");
    if ($("head").attr(class_name) != "true") {
        $("head").attr(class_name, "true");
        return true;
    }
    return false;
}
g_fn_create_rename_subject_button_done = false;
g_fn_create_docit_button_done = false;
g_fn_create_snooze_email_button_done = false;

function fn_init() {
    g_server_url = "https://www.cloudhq.net/";
    g_server_log_level = "debug";
    g_login_path = "login?next_step=";
    g_create_account_path = "create_account?auto_click=1&source=chrome_extension_email&last_step=";
    g_inbox_sdk_id = "sdk_orecons_2e35303768";
    g_misc_modal_view = null;
    g_logger = null;
    g_logged_in = false;
    g_email_suggestions = null;
    g_shared_labels_list = null;
    g_shared_labels_list_with_some_users = null;
    g_suggested_system_labels_list = ["!Clients", "!Leads", "!Prospects", "!Opportunities"];
    g_suggested_labels_list = null;
    g_invitations_list = null;
    g_shared_labels_hash = null;
    g_shared_labels_hash_with_some_users = null;
    g_thread_row_view_per_thread_id = {};
    g_channel_notifications_per_channel_id = {};
    g_label_contacts_db = {};
    g_flash = null;
    g_flash_received = false;
    g_email_or_login = null;
    g_is_ambassador = false;
    g_sdk = null;
    g_has_labels = null;
    g_do_not_show_get_started_splash_screen = null;
    g_do_not_show_smart_labels_splash_screen = null;
    g_do_not_show_schedule_email_splash_screen = null;
    g_do_not_show_docit_buttons = true;
    g_do_not_show_tutorial_dialog = null;
    g_do_not_show_suggested_autolabels = null;
    g_do_not_show_notes_splash_screen = null;
    g_current_list_route_view = null;
    g_autoexpand_flag = true;
    g_key_for_local_storage = "cloudHQ_email_extension";
    g_local_state = {};
    g_file_browser_services = [];
    g_thread_list_with_project = [];
    g_callback = null;
    g_gmail_timezone_offset = new Date().getTimezoneOffset();
    g_draft_ids_per_thread_id = {};
    g_stored_drafts_on_server = [];
    g_is_preview_pane_mode = false;
    g_css_search_for_label_tree_entry = ".zw a.J-Ke.n0";
    g_css_search_for_label_dropdown = ".J-M.J-M-ayU.aka";
    g_css_search_for_top_level_div_for_list = ".zw";
    g_css_search_for_top_level_div_for_label = ".aim";
    g_css_search_for_top_level_which_selected = ".aim .TO .pM.aj0.aj1";
    g_css_search_for_section_header = ".J-KU-Jg-K9.aAA .J-KU-KO.aAy";
    g_css_selector_thread_row_lists = ".AO .nH .nH";
    g_setup_gmail_label_links_done = false;
    g_insert_cloudHQ_menu_done = false;
    g_insert_cloudHQ_button_done = false;
    var snooze_time_utc_as_timestamp;
    g_extension_list = {
        "shared_labels": "Gmail label sharing",
        "shared_todo": "Gmail Shared Todo"
    };
    var flag=false;
    g_registered_extensions = [];
    g_fatal_error_flag = false;
    try {
        c_cmn.fn_log("Bootstrapping cloudHQ on " + document.location.href);
        if (document.location.href.match(g_server_url)) {
            c_cmn.fn_log("We are on cloudHQ page.");
        } else {
            console.log("main: loading ref=", document.location.href);
            setTimeout(function () {
                InboxSDK.load("1.0", g_inbox_sdk_id, {
                    "appName": "cloudHQ",
                    sidebarBeta: true
                }).then(function (sdk) {
                    try {
                        console.log("main: START ref=", document.location.href);
                        g_lang_of_html = $("html").attr("lang");
                        $(document).ajaxSend(function (e, xhr, options) {
                            try {
                                if ($("meta[name='csrf-token']").size > 0) {
                                    var token = $("meta[name='csrf-token']").attr("content");
                                    if (token) {
                                        xhr.setRequestHeader("X-CSRF-Token", token);
                                    }
                                }
                            } catch (e) {}
                        });
                        g_sdk = sdk;
                        g_email_or_login = g_sdk.User.getEmailAddress();
                        g_key_for_local_storage = g_key_for_local_storage + "_" + g_email_or_login;
                        console.log("main: START (after sleep) ref=" + document.location.href);
                        fn_pre_user_check();
                        sdk.Router.handleAllRoutes(function (routeView) {
                            fn_close_notif_window();
                            $(".popover").remove();
                            $(".cloudHQ__tour_highlight").remove();
                        });
                         STYLE_URL="https://gmelius.io/app/gmelius.bundle.min.css?version=7.7.0";
                         $("head").append('<link rel="stylesheet" type="text/css" href="' + STYLE_URL + '">')
                         $("head").append('<link rel="stylesheet" type="text/css" href="' + chrome.extension.getURL('stylesheets/jquery.simple-dtpicker.css') + '">')


                        $("<style></style>").html(".inboxsdk__tab_icon { background-image: none }" + ".cHQIconTransperent img { height: 16px !important; width: 16px !important }" + ".chqBtnProject:after { padding-left: 6px; } " + '[data-toolbar-icononly=true] .chqBtnProject:after { padding-left: 6px; content: "Add task";} ' + g_css_search_for_section_header + " {  overflow: hidden;} " + ".cqhProjectChat " + g_css_search_for_section_header + " { background: #D2473D !important; color: white; overflow: hidden;} " + ".cqhProjectChat " + g_css_search_for_section_header + " .inboxsdk__tab_title { color: white !important; } " + ".cqhProjectChat " + g_css_search_for_section_header + " .inboxsdk__tab_icon { -webkit-filter: grayscale(1); -webkit-filter: invert(1); } " + "div.section-container .section-header { background: white; height: 18px; overflow: hidden; padding: 0 10px; z-index: 10000; } " + "div.section-container .section-header div.btn-toggle-section { font-size: 9px; text-transform: uppercase; text-align: center; color: #D2473D; cursor: pointer } " + "div.section-container.section-expanded .section-header .is-expanded { display: block; } " + "div [data-group-order-hint=" + g_inbox_sdk_id + "] .inboxsdk__tab_icon { opacity: 100  !important; }" + "div [data-group-order-hint=" + g_inbox_sdk_id + "] .inboxsdk__tab_icon img { margin-left: 7px; margin-top: 5px; } " + ".cloudHQ__tour_highlight { position: absolute; z-index: 100; top: 0px; height: 0px; width: 0px; background: black; opacity: 0.5; } ").appendTo($("head"));
                        fn_get_state_from_local_storage(function () {
                            g_registered_extensions = localStorage["cloudhq_ext_registered"];
                          /*  if (fn_should_register_cloudHQ_feature(g_cloudHQ_feature_rename)) {
                                fn_create_rename_subject_threadview_button(sdk);
                            }*/
                           /* if (fn_should_register_cloudHQ_feature(g_cloudHQ_feature_share_email)) {
                                fn_create_docit_toolbar_button(sdk);
                            }*/
                            if (fn_should_register_cloudHQ_feature(g_cloudHQ_feature_snooze)) {
                                fn_register_cloudHQ_toolbar_buttons(sdk);
                                fn_register_cloudHQ_label_buttons(sdk);



                            }
                            if (fn_should_register_cloudHQ_feature(g_cloudHQ_feature_schedule)) {
                                g_should_register_cloudHQ_feature_schedule = true;
                            } else {
                                g_should_register_cloudHQ_feature_schedule = false;
                            }
                            fn_create_extension_toolbar(sdk);
                            if(flag=true){
                                fn_register_cloudHQ_label_text(sdk);
                            }                           
                           // fn_create_save_to_install_dropbown(sdk);
                            options = {};
                            fn_get_status_from_server(options, function () {
                                g_registered_extensions = localStorage["cloudhq_ext_registered"];
                               // fn_insert_cloudHQ_menu();
                                fn_insert_cloudHQ_main_buttons();
                                sdk.Compose.registerComposeViewHandler(function (composeView) {
                                   // fn_insert_cloudHQ_suggested_label_button(composeView);
                                    fn_insert_cloudHQ_reminder_email_button(composeView);
                                    if (g_should_register_cloudHQ_feature_schedule) {
                                        fn_insert_cloudHQ_schedule_email_button(composeView);
                                    }
                                    fn_handle_cloudHQ_compose_view(composeView);
                                });
                                sdk.Router.handleListRoute(sdk.Router.NativeListRouteIDs.ANY_LIST, function (route_view) {
                                    g_current_list_route_view = route_view;
                                    if (route_view && route_view.getRouteID() == g_sdk.Router.NativeListRouteIDs.LABEL) {
                                        //fn_handle_cloudHQ_label_list_view(route_view);
                                    }
                                });
                                sdk.Conversations.registerThreadViewHandler(function (threadView) {
                                    fn_handle_cloudHQ_thread_view(threadView);
                                });
                                sdk.Lists.registerThreadRowViewHandler(function (threadRowView) {
                                    fn_handle_cloudHQ_thread_row_view(threadRowView);
                                    fn_handle_cloudHQ_thread_row_button(threadRowView);
                                });
                                var iframe = fn_get_active_iframe();
                                fn_setup_gmail_label_links();
                                fn_register_cloudHQ_label_chat_status_checker_message_listener();
                                fn_cleanup_drafts_in_local_storage();
                                var invitations_pending = g_invitations_list && g_invitations_list.length > 0;
                                if (!invitations_pending && jQuery.isEmptyObject(g_shared_labels_hash_with_some_users)) {
                                    if (!g_do_not_show_tutorial_dialog && g_shared_labels_list.length == 0) {
                                       // fn_display_tutorial_dialog();
                                    }
                                }
                                if (fn_get_query_string_by_name("salesforce_dialog") == "1") {
                                    fn_show_sync_salesforce_contacts_dialog();
                                }
                                var user_preview_pane_mode = $("head").attr("data-inboxsdk-user-preview-pane-mode");
                                if (user_preview_pane_mode == "horizontal" || user_preview_pane_mode == "vertical") {
                                    console.log("Preview pane mode", user_preview_pane_mode);
                                    g_is_preview_pane_mode = user_preview_pane_mode;
                                    $("<style></style>").html("<style>.G-atb { margin-left: 0px !important; padding-left: 0px !important; }</style>").appendTo($("head"));
                                }
                                try {
                                    if (Notification.permission !== "granted") {
                                        Notification.requestPermission();
                                    }
                                } catch (e) {}
                            });
                        });
                    } catch (e) {
                        g_fatal_error_flag = true;
                    }
                });
            }, 1000);
        }
        $(document).click(function () {
            fn_close_notif_window();
        });
    } catch (e) {
        g_fatal_error = true;
    }
}
$(window).unload(function () {
    localStorage["cloudhq_ext_lock"] = "";
    localStorage["cloudhq_ext_registered"] = "[]";
});

function fn_is_ext_enabled(key) {
    if (key == "shared_labels") {
        return true;
    } else {
        return false;
    }
    var ext_manifest_name = g_extension_list[key];
    if (ext_manifest_name && g_registered_extensions.indexOf(ext_manifest_name) > -1) {
        return true;
    }
    return false;
}

function fn_run() {
    console.log("ENTERING: fn_run");
    c_cmn = new c_cmn();
    fn_init();
    setTimeout(function () {
        if (g_fatal_error_flag) {
            fn_init();
            setTimeout(function () {
                if (g_fatal_error_flag) {
                    fn_init();
                }
            }, 30000);
        }
    }, 20000);
}
Sugar.extend();
var g_lang_of_html = navigator.languages[0];
if (window.self == window.top) {
    fn_run();
}