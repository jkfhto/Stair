(function() {
    var a = function(a, b, c) {
            a[b] || (Object.defineProperty && Object.defineProperty(a, b, {
                value: c,
                configurable: !0,
                enumerable: !1,
                writable: !0
            }),
                a[b] || (a[b] = c))
        }
        ;
    "undefined" == typeof window && "undefined" != typeof GLOBAL && (GLOBAL.window = GLOBAL,
        window.self = window,
        window.alert = console.log),
        "undefined" != typeof module && module.exports,
        a(console, "error", console.log),
        a(console, "warn", console.log),
        a(console, "info", console.log),
        a(console, "dir", console.log),
        a(console, "table", console.log),
        a(Array.prototype, "JSQEX_xRemove", function(a) {
            var b = this.indexOf(a);
            return -1 !== b ? this.splice(b, 1)[0] : void 0
        }),
//        a(Array.prototype, "xInsert", function(a, b) {
//            var c = Array.prototype.slice.call(arguments, 1);
//            return c.splice(0, 0, a, 0),
//                Array.prototype.splice.apply(this, c),
//                this.length
//        }),
//        a(Array.prototype, "xFirst", function() {
//            return this[0]
//        }),
//        a(Array.prototype, "xLast", function() {
//            return this[this.length - 1]
//        }),
//        a(Array.prototype, "xPushCollection", function(a) {
//            return Array.prototype.push.apply(this, a)
//        }),
//        a(Array.prototype, "xInsertCollection", function(a, b) {
//            var c = b.slice(0);
//            return c.splice(0, 0, a, 0),
//                Array.prototype.splice.apply(this, c),
//                this.length
//        }),
//        a(Array, "of", function() {
//            return Array.prototype.slice.call(arguments)
//        }),
//        a(Array, "from", function() {
//            var a = Object.prototype.toString
//                , b = function(b) {
//                    return "function" == typeof b || "[object Function]" === a.call(b)
//                }
//                , c = function(a) {
//                    var b = Number(a);
//                    return isNaN(b) ? 0 : 0 !== b && isFinite(b) ? (b > 0 ? 1 : -1) * Math.floor(Math.abs(b)) : b
//                }
//                , d = Math.pow(2, 53) - 1
//                , e = function(a) {
//                    var b = c(a);
//                    return Math.min(Math.max(b, 0), d)
//                }
//                ;
//            return function(a) {
//                var c = function(a, b) {
//                        return h ? j[b] = "undefined" == typeof g ? h(a, b) : h.call(g, a, b) : j[b] = a,
//                            b + 1
//                    }
//                    , d = this
//                    , f = Object(a);
//                if (null  == a)
//                    throw new TypeError("Array.from requires an array-like object - not null or undefined");
//                var g, h = arguments.length > 1 ? arguments[1] : void 0;
//                if ("undefined" != typeof h) {
//                    if (!b(h))
//                        throw new TypeError("Array.from: when provided, the second argument must be a function");
//                    arguments.length > 2 && (g = arguments[2])
//                }
//                var i = e(f.length)
//                    , j = b(d) ? Object(new d(i)) : new Array(i)
//                    , k = 0;
//                if (f.next)
//                    for (var l = f.next().value; l; )
//                        k = c(l, k),
//                            l = f.next().value;
//                else
//                    for (; i > k; )
//                        k = c(f[k], k);
//                return j.length = k,
//                    j
//            }
//        }()),
        a(Array.prototype, "includes", function(a, b) {
            var c = Object(this)
                , d = parseInt(c.length) || 0;
            if (0 === d)
                return !1;
            var e, f = parseInt(arguments[1]) || 0;
            f >= 0 ? e = f : (e = d + f,
                0 > e && (e = 0));
            for (var g; d > e; ) {
                if (g = c[e],
                    a === g || a !== a && g !== g)
                    return !0;
                e++
            }
            return !1
        }),
//        a(Array.prototype, "find", function(a, b) {
//            for (var c = this.length, d = 0; c > d; d++) {
//                var e = this[d];
//                if (a.call(b, e, d, this))
//                    return e
//            }
//            return void 0
//        }),
//        a(Array.prototype, "findIndex", function(a, b) {
//            for (var c = this.length, d = 0; c > d; d++) {
//                var e = this[d];
//                if (a.call(b, e, d, this))
//                    return d
//            }
//            return -1
//        }),
//        a(Date, "now", function() {
//            return (new Date).getTime()
//        }),
        window.Element && a(Element.prototype, "remove", function() {
        this.parentElement.removeChild(this)
    }),
        window.Event && (a(Event.prototype, "preventDefault", function() {
        this.returnValue = !1
    }),
        a(Event.prototype, "stopPropagation", function() {
            this.cancelBubble = !0
        })),
        a(Math, "cbrt", function(a) {
            var b = Math.pow(Math.abs(a), 1 / 3);
            return 0 > a ? -b : b
        }),
        a(Math, "hypot", function() {
            for (var a = 0, b = arguments.length, c = 0; b > c; c++) {
                if (arguments[c] === 1 / 0 || arguments[c] === -(1 / 0))
                    return 1 / 0;
                a += arguments[c] * arguments[c]
            }
            return Math.sqrt(a)
        }),
        a(Math, "log2", function() {
            var a = 1 / Math.LN2;
            return function(b) {
                return Math.log(b) * a
            }
        }()),
        a(Math, "sign", function(a) {
            return a = +a,
                    0 === a || isNaN(a) ? a : a > 0 ? 1 : -1
        }),
        a(Math, "trunc", function(a) {
            return 0 > a ? Math.ceil(a) : Math.floor(a)
        }),
        a(Number, "isFinite", function(a) {
            return "number" == typeof a && isFinite(a)
        }),
        a(Number, "isInteger", function(a) {
            return "number" == typeof a && isFinite(a) && Math.floor(a) === a
        }),
        a(Number, "isNaN", function(a) {
            return "number" == typeof a && a !== a
        }),
        a(Number, "parseFloat", parseFloat),
        a(Number, "parseInt", parseInt),
        a(Object, "xValues", function(a) {
            return Object.keys(a).map(function(b) {
                return a[b]
            })
        }),
        a(Object, "xEntries", function(a) {
            return Object.keys(a).map(function(b) {
                return [b, a[b]]
            })
        }),
        a(Object, "assign", function(a) {
            if (void 0 === a || null  === a)
                throw new TypeError("Cannot convert first argument to object");
            for (var b = Object(a), c = 1; c < arguments.length; c++) {
                var d = arguments[c];
                if (void 0 !== d && null  !== d) {
                    d = Object(d);
                    for (var e = Object.keys(d), f = 0, g = e.length; g > f; f++) {
                        var h = e[f]
                            , i = Object.getOwnPropertyDescriptor(d, h);
                        void 0 !== i && i.enumerable && (b[h] = d[h])
                    }
                }
            }
            return b
        }),
        a(String.prototype, "includes", function(a, b) {
            return -1 !== String.prototype.indexOf.apply(this, arguments)
        }),
        a(String.prototype, "startsWith", function(a, b) {
            return b = b || 0,
                this.indexOf(a, b) === b
        }),
        a(String.prototype, "endsWith", function(a, b) {
            var c = this.toString();
            (void 0 === b || b > c.length) && (b = c.length),
                b -= a.length;
            var d = c.indexOf(a, b);
            return -1 !== d && d === b
        }),
        a(window, "performance", {}),
        a(window.performance, "now", Date.now),
        a(window, "requestAnimationFrame", window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a, b) {
                setTimeout(a, 100)
            }
        )
})();

//JSQEX_Collection = function() {}
//;
//JSQEX_getCount = function(a) {
//    return "function" == typeof a.getCount ? a.getCount() : JSQEXUtilities.JSQEX_isArrayLike(a) || JSQEXUtilities.JSQEX_isString(a) ? a.length : goog.object.getCount(a)
//}
//;
//JSQEX_getValues = function(a) {
//    if ("function" == typeof a.getValues)
//        return a.getValues();
//    if (goog.isString(a))
//        return a.split("");
//    if (goog.isArrayLike(a)) {
//        for (var b = [], c = a.length, d = 0; d < c; d++)
//            b.push(a[d]);
//        return b
//    }
//    return goog.object.getValues(a)
//}
//;
//JSQEX_getKeys = function(a) {
//    if ("function" == typeof a.getKeys)
//        return a.getKeys();
//    if ("function" != typeof a.getValues) {
//        if (goog.isArrayLike(a) || goog.isString(a)) {
//            var b = [];
//            a = a.length;
//            for (var c = 0; c < a; c++)
//                b.push(c);
//            return b
//        }
//        return goog.object.getKeys(a)
//    }
//}
//;
//JSQEX_contains = function(a, b) {
//    return "function" == typeof a.contains ? a.contains(b) : "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b)
//}
//;
//JSQEX_isEmpty = function(a) {
//    return "function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a)
//}
//;
//JSQEX_clear = function(a) {
//    "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a)
//}
//;
//JSQEX_forEach = function(a, b, c) {
//    if ("function" == typeof a.forEach)
//        a.forEach(b, c);
//    else if (goog.isArrayLike(a) || goog.isString(a))
//        goog.array.forEach(a, b, c);
//    else
//        for (var d = JSQEX_getKeys(a), e = JSQEX_getValues(a), f = e.length, g = 0; g < f; g++)
//            b.call(c, e[g], d && d[g], a)
//}
//;

JSQEX_getPre = function( arr, i ) {
    var len = arr.length;
    return i - 1 < 0 ? len - 1 : i - 1;
};

JSQEX_getNext = function( arr, i ) {
    var len = arr.length;
    return ( i + 1 ) % len;
};

//JSQEX_filter = function(a, b, c) {
//    if ("function" == typeof a.filter)
//        return a.filter(b, c);
//    if (goog.isArrayLike(a) || goog.isString(a))
//        return goog.array.filter(a, b, c);
//    var d, e = JSQEX_getKeys(a), f = JSQEX_getValues(a), g = f.length;
//    if (e) {
//        d = {};
//        for (var h = 0; h < g; h++)
//            b.call(c, f[h], e[h], a) && (d[e[h]] = f[h])
//    } else
//        for (d = [],
//                 h = 0; h < g; h++)
//            b.call(c, f[h], void 0, a) && d.push(f[h]);
//    return d
//}
//;
//JSQEX_map = function(a, b, c) {
//    if ("function" == typeof a.map)
//        return a.map(b, c);
//    if (goog.isArrayLike(a) || goog.isString(a))
//        return goog.array.map(a, b, c);
//    var d, e = JSQEX_getKeys(a), f = JSQEX_getValues(a), g = f.length;
//    if (e) {
//        d = {};
//        for (var h = 0; h < g; h++)
//            d[e[h]] = b.call(c, f[h], e[h], a)
//    } else
//        for (d = [],
//                 h = 0; h < g; h++)
//            d[h] = b.call(c, f[h], void 0, a);
//    return d
//}
//;
//JSQEX_some = function(a, b, c) {
//    if ("function" == typeof a.some)
//        return a.some(b, c);
//    if (goog.isArrayLike(a) || goog.isString(a))
//        return goog.array.some(a, b, c);
//    for (var d = JSQEX_getKeys(a), e = JSQEX_getValues(a), f = e.length, g = 0; g < f; g++)
//        if (b.call(c, e[g], d && d[g], a))
//            return !0;
//    return !1
//}
//;
//JSQEX_every = function(a, b, c) {
//    if ("function" == typeof a.every)
//        return a.every(b, c);
//    if (goog.isArrayLike(a) || goog.isString(a))
//        return goog.array.every(a, b, c);
//    for (var d = JSQEX_getKeys(a), e = JSQEX_getValues(a), f = e.length, g = 0; g < f; g++)
//        if (!b.call(c, e[g], d && d[g], a))
//            return !1;
//    return !0
//}
//;
//JSQEX_Set = function(a) {
//    this.map_ = new JSQEX_Map;
//    a && this.addAll(a)
//}
//;
//JSQEX_Set.getKey_ = function(a) {
//    var b = typeof a;
//    return "object" == b && a || "function" == b ? "o" + goog.getUid(a) : b.substr(0, 1) + a
//}
//;
//JSQEX_Set.prototype.getCount = function() {
//    return this.map_.getCount()
//}
//;
//JSQEX_Set.prototype.add = function(a) {
//    this.map_.set(JSQEX_Set.getKey_(a), a)
//}
//;
//JSQEX_Set.prototype.addAll = function(a) {
//    a = JSQEX_getValues(a);
//    for (var b = a.length, c = 0; c < b; c++)
//        this.add(a[c])
//}
//;
//JSQEX_Set.prototype.removeAll = function(a) {
//    a = JSQEX_getValues(a);
//    for (var b = a.length, c = 0; c < b; c++)
//        this.remove(a[c])
//}
//;
//JSQEX_Set.prototype.remove = function(a) {
//    return this.map_.remove(JSQEX_Set.getKey_(a))
//}
//;
//JSQEX_Set.prototype.clear = function() {
//    this.map_.clear()
//}
//;
//JSQEX_Set.prototype.isEmpty = function() {
//    return this.map_.isEmpty()
//}
//;
//JSQEX_Set.prototype.contains = function(a) {
//    return this.map_.containsKey(JSQEX_Set.getKey_(a))
//}
//;
//JSQEX_Set.prototype.containsAll = function(a) {
//    return JSQEX_every(a, this.contains, this)
//}
//;
//JSQEX_Set.prototype.intersection = function(a) {
//    var b = new JSQEX_Set;
//    a = JSQEX_getValues(a);
//    for (var c = 0; c < a.length; c++) {
//        var d = a[c];
//        this.contains(d) && b.add(d)
//    }
//    return b
//}
//;
//JSQEX_Set.prototype.difference = function(a) {
//    var b = this.clone();
//    b.removeAll(a);
//    return b
//}
//;
//JSQEX_Set.prototype.getValues = function() {
//    return this.map_.getValues()
//}
//;
//JSQEX_Set.prototype.clone = function() {
//    return new JSQEX_Set(this)
//}
//;
//JSQEX_Set.prototype.equals = function(a) {
//    return this.getCount() == JSQEX_getCount(a) && this.isSubsetOf(a)
//}
//;
//JSQEX_Set.prototype.isSubsetOf = function(a) {
//    var b = JSQEX_getCount(a);
//    if (this.getCount() > b)
//        return !1;
//    !(a instanceof JSQEX_Set) && 5 < b && (a = new JSQEX_Set(a));
//    return JSQEX_every(this, function(b) {
//        return JSQEX_contains(a, b)
//    })
//}
//;
//JSQEX_Set.prototype.__iterator__ = function(a) {
//    return this.map_.__iterator__(!1)
//}
//;
//
//JSQEX_Map = function(a, b) {
//    this.map_ = {};
//    this.keys_ = [];
//    this.version_ = this.count_ = 0;
//    var c = arguments.length;
//    if (1 < c) {
//        if (c % 2)
//            throw Error("Uneven number of arguments");
//        for (var d = 0; d < c; d += 2)
//            this.set(arguments[d], arguments[d + 1])
//    } else
//        a && this.addAll(a)
//}
//;
//JSQEX_Map.prototype.getCount = function() {
//    return this.count_
//}
//;
//JSQEX_Map.prototype.getValues = function() {
//    this.cleanupKeysArray_();
//    for (var a = [], b = 0; b < this.keys_.length; b++)
//        a.push(this.map_[this.keys_[b]]);
//    return a
//}
//;
//JSQEX_Map.prototype.getKeys = function() {
//    this.cleanupKeysArray_();
//    return this.keys_.concat()
//}
//;
//JSQEX_Map.prototype.containsKey = function(a) {
//    return JSQEX_Map.hasKey_(this.map_, a)
//}
//;
//JSQEX_Map.prototype.containsValue = function(a) {
//    for (var b = 0; b < this.keys_.length; b++) {
//        var c = this.keys_[b];
//        if (JSQEX_Map.hasKey_(this.map_, c) && this.map_[c] == a)
//            return !0
//    }
//    return !1
//}
//;
//JSQEX_Map.prototype.equals = function(a, b) {
//    if (this === a)
//        return !0;
//    if (this.count_ != a.getCount())
//        return !1;
//    var c = b || JSQEX_Map.defaultEquals;
//    this.cleanupKeysArray_();
//    for (var d, e = 0; d = this.keys_[e]; e++)
//        if (!c(this.get(d), a.get(d)))
//            return !1;
//    return !0
//}
//;
//JSQEX_Map.defaultEquals = function(a, b) {
//    return a === b
//}
//;
//JSQEX_Map.prototype.isEmpty = function() {
//    return 0 == this.count_
//}
//;
//JSQEX_Map.prototype.clear = function() {
//    this.map_ = {};
//    this.version_ = this.count_ = this.keys_.length = 0
//}
//;
//JSQEX_Map.prototype.remove = function(a) {
//    return JSQEX_Map.hasKey_(this.map_, a) ? (delete this.map_[a],
//        this.count_--,
//        this.version_++,
//        this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(),
//        !0) : !1
//}
//;
//JSQEX_Map.prototype.cleanupKeysArray_ = function() {
//    if (this.count_ != this.keys_.length) {
//        for (var a = 0, b = 0; a < this.keys_.length; ) {
//            var c = this.keys_[a];
//            JSQEX_Map.hasKey_(this.map_, c) && (this.keys_[b++] = c);
//            a++
//        }
//        this.keys_.length = b
//    }
//    if (this.count_ != this.keys_.length) {
//        for (var d = {}, b = a = 0; a < this.keys_.length; )
//            c = this.keys_[a],
//                JSQEX_Map.hasKey_(d, c) || (this.keys_[b++] = c,
//                d[c] = 1),
//                a++;
//        this.keys_.length = b
//    }
//}
//;
//JSQEX_Map.prototype.get = function(a, b) {
//    return JSQEX_Map.hasKey_(this.map_, a) ? this.map_[a] : b
//}
//;
//JSQEX_Map.prototype.set = function(a, b) {
//    JSQEX_Map.hasKey_(this.map_, a) || (this.count_++,
//        this.keys_.push(a),
//        this.version_++);
//    this.map_[a] = b
//}
//;
//JSQEX_Map.prototype.addAll = function(a) {
//    var b;
//    a instanceof JSQEX_Map ? (b = a.getKeys(),
//        a = a.getValues()) : (b = goog.object.getKeys(a),
//        a = goog.object.getValues(a));
//    for (var c = 0; c < b.length; c++)
//        this.set(b[c], a[c])
//}
//;
//JSQEX_Map.prototype.forEach = function(a, b) {
//    for (var c = this.getKeys(), d = 0; d < c.length; d++) {
//        var e = c[d]
//            , f = this.get(e);
//        a.call(b, f, e, this)
//    }
//}
//;
//JSQEX_Map.prototype.clone = function() {
//    return new JSQEX_Map(this)
//}
//;
//JSQEX_Map.prototype.transpose = function() {
//    for (var a = new JSQEX_Map, b = 0; b < this.keys_.length; b++) {
//        var c = this.keys_[b];
//        a.set(this.map_[c], c)
//    }
//    return a
//}
//;
//JSQEX_Map.prototype.toObject = function() {
//    this.cleanupKeysArray_();
//    for (var a = {}, b = 0; b < this.keys_.length; b++) {
//        var c = this.keys_[b];
//        a[c] = this.map_[c]
//    }
//    return a
//}
//;
//JSQEX_Map.prototype.getKeyIterator = function() {
//    return this.__iterator__(!0)
//}
//;
//JSQEX_Map.prototype.getValueIterator = function() {
//    return this.__iterator__(!1)
//}
//;
//JSQEX_Map.prototype.__iterator__ = function(a) {
//    this.cleanupKeysArray_();
//    var b = 0
//        , c = this.version_
//        , d = this
//        , e = new goog.iter.Iterator;
//    e.next = function() {
//        if (c != d.version_)
//            throw Error("The map has changed since the iterator was created");
//        if (b >= d.keys_.length)
//            throw goog.iter.StopIteration;
//        var e = d.keys_[b++];
//        return a ? e : d.map_[e]
//    }
//    ;
//    return e
//}
//;
//JSQEX_Map.hasKey_ = function(a, b) {
//    return Object.prototype.hasOwnProperty.call(a, b)
//}
//;
//
function JSQEX_insertPointFromArray( smallArr, bigArr ) {
    var curPos = 0;

    function getIndex( arr, vec ) {
        for ( var j = 0; j < arr.length; j++ ) {
            if ( JSQEXMathematics.JSQEX_isSamePoint( arr[j], vec ) ) return j;

        }
        return -1;
    }
    for ( var i = 0; i < bigArr.length; i++ ) {
        var pos = getIndex( smallArr, bigArr[i] );
        if ( pos > -1 ) curPos = pos;
        else {
            for ( var j = 0; j < smallArr.length; j++ ) {
                var next = ( j + 1 ) % smallArr.length;
                if ( JSQEXMathematics.JSQEX_isPointInLineSegment( bigArr[i], smallArr[j], smallArr[next] ) ) {
                    smallArr.splice(next, 0, bigArr[i]);
                    break;
                }
            }
        }
    }
}

THREE.Vector2.prototype.rotate = function(theta) {
    var b = Math.cos(theta);
    var a = Math.sin(theta);
    var c = this.y * b + this.x * a;
    this.x = this.x * b - this.y * a;
    this.y = c;
    return this;
};

THREE.Vector2.prototype.scale = function( a, b ) {
    var c = ( "number" == typeof b ) ? b : a;
    this.x *= a;
    this.y *= c;
    return this;
};

THREE.Vector2.prototype.JSQEX_rotateAroundPoint = function( b, c) {
    this.sub(b).rotate(c).add(b);
    return this;
};

THREE.Vector2.rotate = function(v, theta) {
    var vv = new THREE.Vector2(v.x, v.y );
    var b = Math.cos(theta);
    var a = Math.sin(theta);
    var c = vv.y * b + vv.x * a;
    vv.x = vv.x * b - vv.y * a;
    vv.y = c;
    return vv;
};

THREE.Vector2.JSQEX_dot = function ( v1, v2 ) {
    return v1.x * v2.x + v1.y * v2.y;
};

THREE.Vector2.JSQEX_rotateAroundPoint = function(a, b, c) {
    var vv = new THREE.Vector2(a.x, a.y );
    vv.sub(b).rotate(c).add(b);
    return vv;
};

THREE.Vector2.JSQEX_difference = function(a, b) {
    var vv = new THREE.Vector2();
    vv.subVectors( a, b );
    return vv;
};

THREE.Vector2.prototype.JSQEX_randomUnit = function() {
    var a = Math.random() * Math.PI * 2;
    this.set(Math.cos(a),Math.sin(a));
    return this;
};

THREE.Vector2.prototype.equals = function(a) {
    return a && this.x == a.x && this.y == a.y;
};

THREE.Vector2.prototype.JSQEX_squaredMagnitude = function() {
    return this.x * this.x + this.y * this.y;
};

function JSQEX_getAttPlaneSize ( planeMesh ) {
    var size = new THREE.Vector2();
    if ( planeMesh ) {
        var planeGeo = planeMesh.geometry;
        var vertices = planeGeo.vertices;
        size.x = Math.abs( vertices[ 0 ].x - vertices[ 1 ].x ) * planeMesh.scale.x;
        size.y = Math.abs( vertices[ 0 ].y - vertices[ 2 ].y ) * planeMesh.scale.y;
    }
    return size;
};
/**
 * Created by JSQ on 2016/5/28.
 */
var JSQEXMathematics = {};
var JSQEXUtilities = {};
var JSQEXCommands = {};

JSQEXMathematics.JSQEX_randomInt = function(a) {
    return Math.floor(Math.random() * a)
}
;
JSQEXMathematics.JSQEX_uniformRandom = function(a, b) {
    return a + Math.random() * (b - a)
}
;
JSQEXMathematics.JSQEX_clamp = function(a, b, c) {
    return Math.min(Math.max(a, b), c)
}
;
JSQEXMathematics.JSQEX_modulo = function(a, b) {
    var c = a % b;
    return 0 > c * b ? c + b : c
}
;
JSQEXMathematics.JSQEX_checkValide = function() {
    var inf = 1e6;
    for ( var i = 0; i < arguments.length; i++ ) {
        if ( Math.abs( arguments[i] ) > inf || Math.abs( arguments[i] ) == Infinity ) return false;
    }
    return true;
}
;
JSQEXMathematics.JSQEX_lerp = function(a, b, c) {
    return a + c * (b - a)
}
;
JSQEXMathematics.JSQEX_abs_nearlyEquals = function(a, b, c) {
    return Math.abs(a - b) <= (c || 1E-6)
}
;
JSQEXMathematics.JSQEX_standardAngle = function(a) {
    return JSQEXMathematics.JSQEX_modulo(a, 360)
}
;
JSQEXMathematics.JSQEX_standardAngleInRadians = function(a) {
    return JSQEXMathematics.JSQEX_modulo(a, 2 * Math.PI)
}
;
JSQEXMathematics.JSQEX_toRadians = function(a) {
    return a * Math.PI / 180
}
;
JSQEXMathematics.JSQEX_toDegrees = function(a) {
    return 180 * a / Math.PI
}
;
JSQEXMathematics.JSQEX_angleDx = function(a, b) {
    return b * Math.cos(JSQEXMathematics.JSQEX_toRadians(a))
}
;
JSQEXMathematics.JSQEX_angleDy = function(a, b) {
    return b * Math.sin(JSQEXMathematics.JSQEX_toRadians(a))
}
;
JSQEXMathematics.JSQEX_angle = function(a, b, c, d) {
    return JSQEXMathematics.JSQEX_standardAngle(JSQEXMathematics.JSQEX_toDegrees(Math.atan2(d - b, c - a)))
}
;
JSQEXMathematics.JSQEX_angleDifference = function(a, b) {
    var c = JSQEXMathematics.JSQEX_standardAngle(b) - JSQEXMathematics.JSQEX_standardAngle(a);
    180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
    return c
}
;
JSQEXMathematics.JSQEX_sign = function(a) {
    return 0 == a ? 0 : 0 > a ? -1 : 1
}
;
JSQEXMathematics.JSQEX_longestCommonSubsequence = function(a, b, c, d) {
    c = c || function(a, b) {
        return a == b
    }
    ;
    d = d || function(b, c) {
        return a[b]
    }
    ;
    for (var e = a.length, f = b.length, g = [], h = 0; h < e + 1; h++)
        g[h] = [],
            g[h][0] = 0;
    for (var m = 0; m < f + 1; m++)
        g[0][m] = 0;
    for (h = 1; h <= e; h++)
        for (m = 1; m <= f; m++)
            c(a[h - 1], b[m - 1]) ? g[h][m] = g[h - 1][m - 1] + 1 : g[h][m] = Math.max(g[h - 1][m], g[h][m - 1]);
    for (var n = [], h = e, m = f; 0 < h && 0 < m; )
        c(a[h - 1], b[m - 1]) ? (n.unshift(d(h - 1, m - 1)),
            h--,
            m--) : g[h - 1][m] > g[h][m - 1] ? h-- : m--;
    return n
}
;
JSQEXMathematics.JSQEX_sum = function(a) {
    return JSQEXUtilities.JSQEX_array.reduce(arguments, function(a, c) {
        return a + c
    }, 0)
}
;
JSQEXMathematics.JSQEX_average = function(a) {
    return JSQEXMathematics.JSQEX_sum.apply(null , arguments) / arguments.length
}
;
JSQEXMathematics.JSQEX_sampleVariance = function(a) {
    var b = arguments.length;
    if (2 > b)
        return 0;
    var c = JSQEXMathematics.JSQEX_average.apply(null , arguments);
    return JSQEXMathematics.JSQEX_sum.apply(null , JSQEXUtilities.JSQEX_array.map(arguments, function(a) {
        return Math.pow(a - c, 2)
    })) / (b - 1)
}
;
JSQEXMathematics.JSQEX_standardDeviation = function(a) {
    return Math.sqrt(JSQEXMathematics.JSQEX_sampleVariance.apply(null , arguments))
}
;
JSQEXMathematics.JSQEX_isInt = function(a) {
    return isFinite(a) && 0 == a % 1
}
;
JSQEXMathematics.JSQEX_isFiniteNumber = function(a) {
    return isFinite(a) && !isNaN(a)
}
;
JSQEXMathematics.JSQEX_log10Floor = function(a) {
    if (0 < a) {
        var b = Math.round(Math.log(a) * Math.LOG10E);
        return b - (parseFloat("1e" + b) > a)
    }
    return 0 == a ? -Infinity : NaN
}
;
JSQEXMathematics.JSQEX_safeFloor = function(a, b) {

    return Math.floor(a + (b || 2E-15))
}
;
JSQEXMathematics.JSQEX_safeCeil = function(a, b) {

    return Math.ceil(a - (b || 2E-15))
}
;

JSQEXMathematics.JSQEX_Box = function(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d
}
;
JSQEXMathematics.JSQEX_Box.JSQEX_boundingBox = function(a) {
    for (var b = new JSQEXMathematics.JSQEX_Box(arguments[0].y,arguments[0].x,arguments[0].y,arguments[0].x), c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        b.top = Math.min(b.top, d.y);
        b.right = Math.max(b.right, d.x);
        b.bottom = Math.max(b.bottom, d.y);
        b.left = Math.min(b.left, d.x)
    }
    return b
}
;
JSQEXMathematics.JSQEX_Box.prototype.JSQEX_getWidth = function() {
    return this.right - this.left
}
;
JSQEXMathematics.JSQEX_Box.prototype.JSQEX_getHeight = function() {
    return this.bottom - this.top
}
;
JSQEXMathematics.JSQEX_Box.prototype.JSQEX_clone = function() {
    return new JSQEXMathematics.JSQEX_Box(this.top,this.right,this.bottom,this.left)
}
;

JSQEXMathematics.JSQEX_Box.prototype.JSQEX_contains = function(a) {
    return JSQEXMathematics.JSQEX_Box.JSQEX_contains(this, a)
}
;
JSQEXMathematics.JSQEX_Box.prototype.JSQEX_expand = function(a, b, c, d) {
    JSQEXUtilities.JSQEX_isObject(a) ? (this.top -= a.top,
        this.right += a.right,
        this.bottom += a.bottom,
        this.left -= a.left) : (this.top -= a,
        this.right += b,
        this.bottom += c,
        this.left -= d);
    return this
}
;
JSQEXMathematics.JSQEX_Box.prototype.JSQEX_expandToInclude = function(a) {
    this.left = Math.min(this.left, a.left);
    this.top = Math.min(this.top, a.top);
    this.right = Math.max(this.right, a.right);
    this.bottom = Math.max(this.bottom, a.bottom)
}
;
JSQEXMathematics.JSQEX_Box.JSQEX_equals = function(a, b) {
    return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1
}
;
JSQEXMathematics.JSQEX_Box.JSQEX_contains = function(a, b) {
    return a && b ? b instanceof JSQEXMathematics.JSQEX_Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom : !1
}
;
JSQEXMathematics.JSQEX_Box.relativePositionX = function(a, b) {
    return b.x < a.left ? b.x - a.left : b.x > a.right ? b.x - a.right : 0
}
;
JSQEXMathematics.JSQEX_Box.JSQEX_relativePositionY = function(a, b) {
    return b.y < a.top ? b.y - a.top : b.y > a.bottom ? b.y - a.bottom : 0
}
;
JSQEXMathematics.JSQEX_Box.JSQEX_distance = function(a, b) {
    var c = JSQEXMathematics.JSQEX_Box.JSQEX_relativePositionX(a, b)
        , d = JSQEXMathematics.JSQEX_Box.JSQEX_relativePositionY(a, b);
    return Math.sqrt(c * c + d * d)
}
;
JSQEXMathematics.JSQEX_Box.JSQEX_intersects = function(a, b) {
    return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom
}
;
JSQEXMathematics.JSQEX_Box.JSQEX_intersectsWithPadding = function(a, b, c) {
    return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c
}
;
JSQEXMathematics.JSQEX_Box.prototype.JSQEX_ceil = function() {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this
}
;
JSQEXMathematics.JSQEX_Box.prototype.JSQEX_floor = function() {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this
}
;
JSQEXMathematics.JSQEX_Box.prototype.JSQEX_round = function() {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this
}
;
JSQEXMathematics.JSQEX_Box.prototype.JSQEX_translate = function(a, b) {
    a instanceof JSQEXMathematics.JSQEX_Coordinate ? (this.left += a.x,
        this.right += a.x,
        this.top += a.y,
        this.bottom += a.y) : (this.left += a,
        this.right += a,
        JSQEXUtilities.JSQEX_isNumber(b) && (this.top += b,
        this.bottom += b));
    return this
}
;
JSQEXMathematics.JSQEX_Box.prototype.JSQEX_scale = function(a, b) {
    var c = JSQEXUtilities.JSQEX_isNumber(b) ? b : a;
    this.left *= a;
    this.right *= a;
    this.top *= c;
    this.bottom *= c;
    return this
}
;
JSQEXMathematics.JSQEX_Rect = function(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d
}
;
JSQEXMathematics.JSQEX_Rect.prototype.clone = function() {
    return new JSQEXMathematics.JSQEX_Rect(this.left,this.top,this.width,this.height)
}
;
JSQEXMathematics.JSQEX_Rect.prototype.toBox = function() {
    return new JSQEXMathematics.JSQEX_Box(this.top,this.left + this.width,this.top + this.height,this.left)
}
;
JSQEXMathematics.JSQEX_Rect.createFromBox = function(a) {
    return new JSQEXMathematics.JSQEX_Rect(a.left,a.top,a.right - a.left,a.bottom - a.top)
}
;

JSQEXMathematics.JSQEX_Rect.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height : !1
}
;
JSQEXMathematics.JSQEX_Rect.prototype.intersection = function(a) {
    var b = Math.max(this.left, a.left)
        , c = Math.min(this.left + this.width, a.left + a.width);
    if (b <= c) {
        var d = Math.max(this.top, a.top);
        a = Math.min(this.top + this.height, a.top + a.height);
        if (d <= a)
            return this.left = b,
                this.top = d,
                this.width = c - b,
                this.height = a - d,
                !0
    }
    return !1
}
;
JSQEXMathematics.JSQEX_Rect.intersection = function(a, b) {
    var c = Math.max(a.left, b.left)
        , d = Math.min(a.left + a.width, b.left + b.width);
    if (c <= d) {
        var e = Math.max(a.top, b.top)
            , f = Math.min(a.top + a.height, b.top + b.height);
        if (e <= f)
            return new JSQEXMathematics.JSQEX_Rect(c,e,d - c,f - e)
    }
    return null
}
;
JSQEXMathematics.JSQEX_Rect.intersects = function(a, b) {
    return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height
}
;
JSQEXMathematics.JSQEX_Rect.prototype.intersects = function(a) {
    return JSQEXMathematics.JSQEX_Rect.intersects(this, a)
}
;
JSQEXMathematics.JSQEX_Rect.difference = function(a, b) {
    var c = JSQEXMathematics.JSQEX_Rect.intersection(a, b);
    if (!c || !c.height || !c.width)
        return [a.clone()];
    var c = []
        , d = a.top
        , e = a.height
        , f = a.left + a.width
        , g = a.top + a.height
        , h = b.left + b.width
        , m = b.top + b.height;
    b.top > a.top && (c.push(new JSQEXMathematics.JSQEX_Rect(a.left,a.top,a.width,b.top - a.top)),
        d = b.top,
        e -= b.top - a.top);
    m < g && (c.push(new JSQEXMathematics.JSQEX_Rect(a.left,m,a.width,g - m)),
        e = m - d);
    b.left > a.left && c.push(new JSQEXMathematics.JSQEX_Rect(a.left,d,b.left - a.left,e));
    h < f && c.push(new JSQEXMathematics.JSQEX_Rect(h,d,f - h,e));
    return c
}
;
JSQEXMathematics.JSQEX_Rect.prototype.difference = function(a) {
    return JSQEXMathematics.JSQEX_Rect.difference(this, a)
}
;
JSQEXMathematics.JSQEX_Rect.prototype.boundingRect = function(a) {
    var b = Math.max(this.left + this.width, a.left + a.width)
        , c = Math.max(this.top + this.height, a.top + a.height);
    this.left = Math.min(this.left, a.left);
    this.top = Math.min(this.top, a.top);
    this.width = b - this.left;
    this.height = c - this.top
}
;
JSQEXMathematics.JSQEX_Rect.boundingRect = function(a, b) {
    if (!a || !b)
        return null ;
    var c = a.clone();
    c.boundingRect(b);
    return c
}
;
JSQEXMathematics.JSQEX_Rect.prototype.contains = function(a) {
    return a instanceof JSQEXMathematics.JSQEX_Rect ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
}
;
JSQEXMathematics.JSQEX_Rect.prototype.squaredDistance = function(a) {
    var b = a.x < this.left ? this.left - a.x : Math.max(a.x - (this.left + this.width), 0);
    a = a.y < this.top ? this.top - a.y : Math.max(a.y - (this.top + this.height), 0);
    return b * b + a * a
}
;
JSQEXMathematics.JSQEX_Rect.prototype.distance = function(a) {
    return Math.sqrt(this.squaredDistance(a))
}
;
JSQEXMathematics.JSQEX_Rect.prototype.getSize = function() {
    return new JSQEXMathematics.JSQEX_Size(this.width,this.height)
}
;
JSQEXMathematics.JSQEX_Rect.prototype.getTopLeft = function() {
    return new JSQEXMathematics.JSQEX_Coordinate(this.left,this.top)
}
;
JSQEXMathematics.JSQEX_Rect.prototype.getCenter = function() {
    return new JSQEXMathematics.JSQEX_Coordinate(this.left + this.width / 2,this.top + this.height / 2)
}
;
JSQEXMathematics.JSQEX_Rect.prototype.getBottomRight = function() {
    return new JSQEXMathematics.JSQEX_Coordinate(this.left + this.width,this.top + this.height)
}
;
JSQEXMathematics.JSQEX_Rect.prototype.ceil = function() {
    this.left = Math.ceil(this.left);
    this.top = Math.ceil(this.top);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
}
;
JSQEXMathematics.JSQEX_Rect.prototype.floor = function() {
    this.left = Math.floor(this.left);
    this.top = Math.floor(this.top);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
}
;
JSQEXMathematics.JSQEX_Rect.prototype.round = function() {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
}
;
JSQEXMathematics.JSQEX_Rect.prototype.translate = function(a, b) {
    a instanceof JSQEXMathematics.JSQEX_Coordinate ? (this.left += a.x,
        this.top += a.y) : (this.left += a,
        JSQEXUtilities.JSQEX_isNumber(b) && (this.top += b));
    return this
}
;
JSQEXMathematics.JSQEX_Rect.prototype.scale = function(a, b) {
    var c = JSQEXUtilities.JSQEX_isNumber(b) ? b : a;
    this.left *= a;
    this.width *= a;
    this.top *= c;
    this.height *= c;
    return this
}
;

/**
 * Created by JSQ on 2016/5/30.
 */
JSQEXMathematics.JSQEX_precisionDigits = 3;
JSQEXMathematics.JSQEX_defaultTolerance = Math.pow(.1, JSQEXMathematics.JSQEX_precisionDigits);

JSQEXMathematics.JSQEX_Line = function(a, b, c, d) {
    this.x0 = a;
    this.y0 = b;
    this.x1 = c;
    this.y1 = d
}
;
JSQEXMathematics.JSQEX_Line.prototype.clone = function() {
    return new JSQEXMathematics.JSQEX_Line(this.x0,this.y0,this.x1,this.y1)
}
;
JSQEXMathematics.JSQEX_Line.prototype.equals = function(a) {
    return this.x0 == a.x0 && this.y0 == a.y0 && this.x1 == a.x1 && this.y1 == a.y1
}
;
JSQEXMathematics.JSQEX_Line.prototype.JSQEX_getSegmentLengthSquared = function() {
    var a = this.x1 - this.x0
        , b = this.y1 - this.y0;
    return a * a + b * b
}
;
JSQEXMathematics.JSQEX_Line.prototype.JSQEX_getSegmentLength = function() {
    return Math.sqrt(this.JSQEX_getSegmentLengthSquared())
}
;
JSQEXMathematics.JSQEX_Line.prototype.JSQEX_getClosestLinearInterpolation_ = function(a, b) {
    var c;
    a instanceof THREE.Vector2 ? (c = a.y,
        a = a.x) : c = b;
    var d = this.x0
        , e = this.y0;
    return ((a - d) * (this.x1 - d) + (c - e) * (this.y1 - e)) / this.JSQEX_getSegmentLengthSquared()
}
;
JSQEXMathematics.JSQEX_Line.prototype.JSQEX_getInterpolatedPoint = function(a) {
    return new THREE.Vector2(JSQEXMathematics.JSQEX_lerp(this.x0, this.x1, a),JSQEXMathematics.JSQEX_lerp(this.y0, this.y1, a))
}
;
JSQEXMathematics.JSQEX_Line.prototype.JSQEX_getClosestPoint = function(a, b) {
    return this.JSQEX_getInterpolatedPoint(this.JSQEX_getClosestLinearInterpolation_(a, b))
}
;
JSQEXMathematics.JSQEX_Line.prototype.getClosestSegmentPoint = function(a, b) {
    return this.JSQEX_getInterpolatedPoint(JSQEXMathematics.JSQEX_clamp(this.JSQEX_getClosestLinearInterpolation_(a, b), 0, 1))
}


JSQEXMathematics.JSQEX_nearlyEquals = function(a, b, c) {
    void 0 === c && (c = JSQEXMathematics.JSQEX_defaultTolerance);
    return JSQEXMathematics.JSQEX_abs_nearlyEquals(a, b, c)
}
;
JSQEXMathematics.JSQEX_isZero = function(a, b) {
    return JSQEXMathematics.JSQEX_nearlyEquals(a, 0, b)
}
;
JSQEXMathematics.JSQEX_isPointInPolygon = function(a, b, c, d) {
    if (!b || 3 > b.length)
        return !1;
    c = c || !1;
    for (var e = !1, f = b.length, g = 0, h = f - 1; g < f; h = g++) {
        if (JSQEXMathematics.JSQEX_isPointInLineSegment(a, b[h], b[g], d))
            return c;
        b[g].y > a.y !== b[h].y > a.y && a.x < (b[h].x - b[g].x) * (a.y - b[g].y) / (b[h].y - b[g].y) + b[g].x && (e = !e)
    }
    return e
}
;
JSQEXMathematics.JSQEX_isPolygonInPolygon = function(a, b, c) {
    if (!a || 3 > a.length || !b || 3 > b.length)
        return !1;
    for (var d = 0, e = a.length - 1; d < e; d++) {
        var f = a[d]
            , g = a[d + 1];
        if (!JSQEXMathematics.JSQEX_isPointInPolygon(f, b, !1, c))
            return !1;
        a: {
            for (var h = 0, m = b.length - 1; h < m; h++)
                if (JSQEXMathematics.JSQEX_segmentSegmentIntersection(f, g, b[h], b[h + 1], c)) {
                    f = !0;
                    break a
                }
            f = !1
        }
        if (f)
            return !1
    }
    return !0
}
;
JSQEXMathematics.JSQEX_isPolygonOverlapped = function(a, b, c, ignoreBorder) {
    if (!a || 3 > a.length || !b || 3 > b.length)
        return !1;
    var d = function(a, b) {
            for (var d = 0, e = a.length; d < e; d++)
                if (JSQEXMathematics.JSQEX_isPointOnPolygon(a[d], b, c, ignoreBorder))
                    return !0;
            return !1
        }
        , e = function(a, b) {
            for (var d = 0, e = a.length - 1; d < e; d++)
                if (JSQEXMathematics.JSQEX_isSegmentIntersectedWithPolygon(a[d], a[d + 1], b, c))
                    return !0;
            return !1
        }
        ;
    return d(a, b) || d(b, a) || e(a, b)
}
;
JSQEXMathematics.JSQEX_isSegmentIntersectedWithPolygon = function(a, b, c, d) {
    if (!c || 3 > c.length)
        return !1;
    for (var e = 0, f = c.length - 1; e < f; e++)
        if (JSQEXMathematics.JSQEX_segmentSegmentIntersection(a, b, c[e], c[e + 1], d, true))
            return !0;
    return !1
}
;

JSQEXMathematics.JSQEX_getSegmentIntersectedWithPolygon = function(a, b, c, d) {
    var cps = [];
    if (!c || 3 > c.length)
        return cps;

    for (var e = 0, f = c.length - 1; e < f; e++) {
        var p = JSQEXMathematics.JSQEX_segmentSegmentIntersection(a, b, c[e], c[e + 1], d);
        if (p)
            cps.push( p );
    }
    return cps;
}
;
JSQEXMathematics.JSQEX_isPointOnPolygon = function(a, b, c, ignoreBorder) {
    return b && 0 !== b.length ? JSQEXMathematics.JSQEX_isPointInPolygon(a, b, !ignoreBorder, c) : !1
}
;

JSQEXMathematics.JSQEX_calcOuterPoint = function( points, isInner, dis ) {
    var outPoints = [];
    for ( var i = 0; i < points.length; i++ ) {
        var nextPointInd, prePointInd;

        nextPointInd = ( i + 1 ) % points.length;
        if ( points[i] instanceof THREE.Vector3 ) {
            while (( Math.abs(points[i].x - points[nextPointInd].x) < 0.005 ) && ( Math.abs(points[i].z - points[nextPointInd].z) < 0.005 ))
                nextPointInd = ( nextPointInd + 1 ) % points.length;
            prePointInd = ( i - 1 < 0 ) ? points.length - 1 : i - 1;
            while (( Math.abs(points[i].x - points[prePointInd].x) < 0.005 ) && ( Math.abs(points[i].z - points[prePointInd].z) < 0.005 ))
                prePointInd = ( prePointInd - 1 < 0 ) ? points.length - 1 : prePointInd - 1;
        }
        else {
            while (( Math.abs(points[i].x - points[nextPointInd].x) < 0.005 ) && ( Math.abs(points[i].y - points[nextPointInd].y) < 0.005 ))
                nextPointInd = ( nextPointInd + 1 ) % points.length;
            prePointInd = ( i - 1 < 0 ) ? points.length - 1 : i - 1;
            while (( Math.abs(points[i].x - points[prePointInd].x) < 0.005 ) && ( Math.abs(points[i].y - points[prePointInd].y) < 0.005 ))
                prePointInd = ( prePointInd - 1 < 0 ) ? points.length - 1 : prePointInd - 1;
        }
        var point1 = ( points[prePointInd] instanceof THREE.Vector3 ) ? points[prePointInd] : new THREE.Vector3( points[prePointInd].x, 0, points[prePointInd].y );
        var point2 = ( points[nextPointInd] instanceof THREE.Vector3 ) ? points[nextPointInd] : new THREE.Vector3( points[nextPointInd].x, 0, points[nextPointInd].y );
        var point0 = ( points[i] instanceof THREE.Vector3 ) ? points[i] : new THREE.Vector3( points[i].x, 0, points[i].y );
        var midVec = new THREE.Vector3(1, 0, 0);

        var vec1 = new THREE.Vector3();
        if (nextPointInd !== i)
            vec1.subVectors(point2, point0);
        else vec1.subVectors(point0, point1);
        vec1.normalize();
        var flag = singleVertexStatus(point0, point1, point2);
        if (flag) {
            var vec2 = new THREE.Vector3();
            vec2.subVectors(point1, point0);
            vec2.normalize();

            midVec.addVectors(vec1, vec2);
            if (!isInner) {
                if (flag > 0) midVec.multiplyScalar(-1);
            }
            else {
                if (flag < 0) midVec.multiplyScalar(-1);
            }

        }
        else {
            var q = new THREE.Quaternion();
            if (!isInner)
                q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
            else q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
            midVec.copy(vec1);
            midVec.applyQuaternion(q);
        }
        midVec.normalize();
        var angle = midVec.angleTo(vec1);

        midVec.multiplyScalar(Math.abs(dis / Math.sin(angle)));
        var outerPoint;
        if ( points[i] instanceof THREE.Vector3 ) {
            outerPoint = new THREE.Vector3();
            outerPoint.addVectors(point0, midVec);
        }
        else {
            outerPoint = new THREE.Vector2( point0.x + midVec.x, point0.z + midVec.z );

        }
        outPoints.push(outerPoint);
    }

    return outPoints;
};

JSQEXMathematics.JSQEX_isPointInLine = function(a, b, c, d) {
    d = d || JSQEXMathematics.JSQEX_defaultTolerance;
    return JSQEXMathematics.JSQEX_closestDistance(a, b, c) < d
}
;
JSQEXMathematics.JSQEX_closestDistance = function(a, b, c) {
    b = JSQEXMathematics.JSQEX_getPerpendicularIntersect(a, b, c);
    return (new JSQEXMathematics.JSQEX_Line(b.x,b.y,a.x,a.y)).JSQEX_getSegmentLength()
}
;
JSQEXMathematics.JSQEX_getVerticalVec = function( from, to, right ) {
    var vf = new THREE.Vector3();
    var vt = new THREE.Vector3();
    if ( from.z !== undefined ) {
        vf.copy( from );
        vt.copy( to );
    }
    else {
        vf.set( from.x, 0, from.y );
        vt.set( to.x, 0, to.y );
    }
    vf.subVectors( vt, vf );
    var q = new THREE.Quaternion();
    right ? q.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), -Math.PI / 2 ) : q.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
    vf.applyQuaternion(q).normalize();
    if ( from.z !== undefined ) return vf;
    else {
        return new THREE.Vector2( vf.x, vf.z );
    }
};
JSQEXMathematics.JSQEX_isPointInLineSegment = function(a, b, c, d) {
    d = d || JSQEXMathematics.JSQEX_defaultTolerance;
    var e = new JSQEXMathematics.JSQEX_Line(b.x,b.y,c.x,c.y)
        , f = e.JSQEX_getClosestPoint(a.x, a.y);
    if (!JSQEXMathematics.JSQEX_isSamePoint(f, a, Math.abs(d)))
        return !1;
    a = e.JSQEX_getSegmentLength();
    a = -d / a;
    d = new THREE.Vector2(b.x, b.y);
    d.lerp( c, a );
    var g = new THREE.Vector2(c.x, c.y);
    g.lerp( b, a );
    return Math.min(d.x, g.x) <= f.x && Math.max(d.x, g.x) >= f.x && Math.min(d.y, g.y) <= f.y && Math.max(d.y, g.y) >= f.y
}
;


JSQEXMathematics.JSQEX_isPointsOnSameSide = function(a, b, c, d) {
    d = new THREE.Vector2(d.y - c.y,c.x - d.x);
    a = new THREE.Vector2(a.x - c.x,a.y - c.y);
    b = new THREE.Vector2(b.x - c.x,b.y - c.y);
    return 0 < (d.x * a.x + d.y * a.y) * (d.x * b.x + d.y * b.y)
}
;
JSQEXMathematics.JSQEX_isSegmentsOverlapped = function(a, b, c, d, e) {
    e = e || JSQEXMathematics.JSQEX_defaultTolerance;
    if (JSQEXMathematics.JSQEX_isSameLineSegment(a, b, c, d, e))
        return !0;
    if (!JSQEXMathematics.JSQEX_isSameLine(a, b, c, d, e))
        return !1;
    var f = JSQEXMathematics.JSQEX_getLerpNumber(c, d, a)
        , g = JSQEXMathematics.JSQEX_getLerpNumber(c, d, b);
    c = JSQEXMathematics.JSQEX_getLerpNumber(a, b, c);
    a = JSQEXMathematics.JSQEX_getLerpNumber(a, b, d);
    b = 1 - e;
    return f > e && f < b || g > e && g < b || c > e && c < b || a > e && a < b
}
;

JSQEXMathematics.JSQEX_isSegmentsPartialOverlapped = function(a, b, c, d, e) {
    e = e || JSQEXMathematics.JSQEX_defaultTolerance;
    var l1 = THREE.Vector2.JSQEX_difference( a, b).length();
    var l2 = THREE.Vector2.JSQEX_difference( c, d).length();
    var tol = ( l1 + l2 ) / 4 / l1;
    if (JSQEXMathematics.JSQEX_isSameLineSegment(a, b, c, d, e))
        return !0;
    if (!JSQEXMathematics.JSQEX_isSameLine(a, b, c, d, e))
        return !1;
    var f = JSQEXMathematics.JSQEX_getLerpNumber(c, d, a)
        , g = JSQEXMathematics.JSQEX_getLerpNumber(c, d, b);
    c = JSQEXMathematics.JSQEX_getLerpNumber(a, b, c);
    a = JSQEXMathematics.JSQEX_getLerpNumber(a, b, d);

    b = 1 - e;
    var ret = f > e && f < b || g > e && g < b || c > e && c < b || a > e && a < b;
    if ( ret ) {
        if ( f > e && f < b && g > 1 && f > tol ) return false;
        else if ( g > e && g < b && f > 1 && g > tol ) return false;
        else if ( f > e && f < b && g < e && f < tol ) return false;
        else if ( g > e && g < b && f < e && g < tol ) return false;
    }
    return ret;
};

JSQEXMathematics.JSQEX_isSameDirection = function(a, b, c) {
    return Math.abs(a.x * b.y - a.y * b.x) < c && 0 < a.dot( b );
}
;
JSQEXMathematics.JSQEX_getLerpNumber = function(a, b, c) {
    c = JSQEXMathematics.JSQEX_getPerpendicularIntersect(c, a, b);
    return Math.abs(a.x - b.x) > Math.abs(a.y - b.y) ? (c.x - a.x) / (b.x - a.x) : (c.y - a.y) / (b.y - a.y)
}
;
JSQEXMathematics.JSQEX_rotatePointCW = function(a, b, c) {

    return THREE.Vector2.JSQEX_rotateAroundPoint(b, a, -JSQEXMathematics.JSQEX_toRadians(c))
}
;
JSQEXMathematics.JSQEX_getAngleHorizontaleCCW = function(a, b) {
    return JSQEXMathematics.JSQEX_toDegrees(Math.atan2(b.y - a.y, b.x - a.x))
}
;
JSQEXMathematics.JSQEX_getNearestParallelAngle = function() {
    var a = function(a) {
            a %= 360;
            0 > a && (a += 360);
            return a
        }
        ;
    return function(b, c) {
        c = a(c);
        var d = Math.abs(a(b) - c);
        90 < d && 270 > d && (c += 180);
        return c
    }
}();
JSQEXMathematics.JSQEX_getPerpendicularIntersect = function(a, b, c) {
    return (new JSQEXMathematics.JSQEX_Line(b.x,b.y,c.x,c.y)).JSQEX_getClosestPoint(a.x, a.y)
}
;
JSQEXMathematics.JSQEX_getClosestSegmentPoint = function(a, b, c) {
    return (new JSQEXMathematics.JSQEX_Line(b.x,b.y,c.x,c.y)).getClosestSegmentPoint(a.x, a.y)
}
;
JSQEXMathematics.JSQEX_closestDistanceToPolygon = function(a, b) {
    if (b) {
        for (var c = void 0, d = 0; d < b.length; d++) {
            var e = JSQEXMathematics.JSQEX_closestDistanceToSegment(a, b[d], b[(d + 1) % b.length]);
            if (void 0 === c || e < c)
                c = e
        }
        return c
    }
}
;
JSQEXMathematics.JSQEX_closestPointToPolygon = function(a, b) {
    if (b) {
        for (var c = void 0, d = void 0, e = 0; e < b.length; e++) {
            var f = JSQEXMathematics.JSQEX_getClosestSegmentPoint(a, b[e], b[(e + 1) % b.length])
                , g = JSQEXMathematics.JSQEX_pointLength(a, f);
            if (void 0 === c || g < c)
                c = g,
                    d = f
        }
        return d
    }
}
;
JSQEXMathematics.JSQEX_closestDistanceToSegment = function(a, b, c) {
    b = JSQEXMathematics.JSQEX_getClosestSegmentPoint(a, b, c);
    return JSQEXMathematics.JSQEX_pointLength(a, b)
}
;
JSQEXMathematics.JSQEX_scalePoint = function(a, b, c) {
    b = new JSQEXMathematics.JSQEX_Line(a.x,a.y,b.x,b.y);
    var d = b.JSQEX_getSegmentLength();
    return JSQEXMathematics.JSQEX_nearlyEquals(d, 0) ?
        a : b.JSQEX_getInterpolatedPoint(c / d)
}
;
JSQEXMathematics.JSQEX_pointLength = function(a, b) {
    return (new JSQEXMathematics.JSQEX_Line(a.x,a.y,b.x,b.y)).JSQEX_getSegmentLength()
}
;
JSQEXMathematics.JSQEX_getLineAngle = function(a, b) {
    var c = b.x - a.x;
    if (0 === c)
        return a.y >= b.y ? 90 : 270;
    var c = Math.atan((b.y - a.y) / c)
        , d = 180 * c / Math.PI;
    return 0 < c ? a.x > b.x ? d : d + 180 : a.x > b.x ? d + 360 : d + 180
}
;
JSQEXMathematics.JSQEX_snapAngle = function(a, b, c) {
    var d = a;
    b = b || 45;
    c = c || 10;
    var e = a % b;
    a = Math.round(a / b);
    Math.abs(e) < c && (d = b * a);
    return d
}
;
JSQEXMathematics.JSQEX_snapPoint = function() {
    return function(a) {
        return {
            x: .5 * Math.round(20 * a.x),
            y: .5 * Math.round(20 * a.y)
        }
    }
}();
JSQEXMathematics.JSQEX_isAligned = function() {
    return function(a, b, c) {
        c = c || JSQEXMathematics.JSQEX_defaultTolerance;
        return JSQEXMathematics.JSQEX_nearlyEquals(a.x, b.x, c) ? 1 : JSQEXMathematics.JSQEX_nearlyEquals(a.y, b.y, c) ? 2 : 0
    }
}();
JSQEXMathematics.JSQEX_snapDimension = function() {
    return function(a, b) {
        var c = this.JSQEX_pointLength(a, b);
        if (JSQEXMathematics.JSQEX_nearlyEquals(c, 0))
            return b;
        c = .5 * Math.round(20 * c);
        return this.JSQEX_scalePoint(a, b, c)
    }
}();
JSQEXMathematics.JSQEX_isSamePoint = function(a, b, c) {
    return a === b ? !0 : ( !a || !b ) || ( JSQEXMathematics.JSQEX_nearlyEquals(a.x, b.x, c) && JSQEXMathematics.JSQEX_nearlyEquals(a.y, b.y, c) )
}
;
JSQEXMathematics.JSQEX_isSamePoint3 = function(a, b, c) {
    return JSQEXMathematics.JSQEX_nearlyEquals(a.x, b.x, c) && JSQEXMathematics.JSQEX_nearlyEquals(a.y, b.y, c) && JSQEXMathematics.JSQEX_nearlyEquals(a.z, b.z, c)
}
;

JSQEXMathematics.JSQEX_projectOnWall = function(p1, p2, p3D, dis) {
    var point = new THREE.Vector2();
    if ( p3D instanceof THREE.Vector3 || p3D.z !== undefined ) point.set( p3D.x, p3D.z );
    else point.copy( p3D );

    if ( p1.z == undefined ) {
        var A = p2.y - p1.y;
        var B = p1.x - p2.x;
        var C = p2.x * p1.y - p2.y * p1.x;
        var D = A * A + B * B;
        var a = ( B * B * point.x - A * B * point.y - A * C ) / D;
        var b = ( A * A * point.y - ( A * B ) * point.x - B * C ) / D;
    }
    else {
        A = p2.z - p1.z;
        B = p1.x - p2.x;
        C = p2.x * p1.z - p2.z * p1.x;
        D = A * A + B * B;
        a = ( B * B * point.x - A * B * point.y - A * C ) / D;
        b = ( A * A * point.y - ( A * B ) * point.x - B * C ) / D;
    }

    var res = ( p3D instanceof THREE.Vector3 || p3D.z !== undefined ) ? new THREE.Vector3( a, p3D.y, b ) : new THREE.Vector3( a, 0, b );
    if ( dis ) {

        var dir = ( p1.z == undefined ) ? new THREE.Vector3( p2.x - p1.x, 0, p2.y - p1.y ) : new THREE.Vector3( p2.x - p1.x, 0, p2.z - p1.z );
        var q = new THREE.Quaternion();
        q.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), -Math.PI / 2 );
        dir.applyQuaternion( q ).normalize();
        dir.multiplyScalar( dis );
        res.addVectors( res, dir );
    }

    return res;
};

JSQEXMathematics.JSQEX_isParallel = function(a, b, c, d, e) {
    return JSQEXMathematics.JSQEX_nearlyEquals((a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x), 0, e)
}
;
JSQEXMathematics.JSQEX_isPerpendicular = function(a, b, c, d, e) {
    a = new THREE.Vector2(b.x - a.x,b.y - a.y);
    c = new THREE.Vector2(d.x - c.x,d.y - c.y);
    a.normalize();
    c.normalize();
    return JSQEXMathematics.JSQEX_nearlyEquals(a.dot( c ), 0, e)
}
;
JSQEXMathematics.JSQEX_isSameLine = function(a, b, c, d, e) {
    e = e || JSQEXMathematics.JSQEX_defaultTolerance;
    return JSQEXMathematics.JSQEX_isParallel(a, b, c, d, e) && JSQEXMathematics.JSQEX_isPointInLine(a, c, d, e)
}
;
JSQEXMathematics.JSQEX_isSamePolygon = function(a, b, c) {
    c = c || JSQEXMathematics.JSQEX_defaultTolerance;
    if (a.length !== b.length)
        return !1;
    for (var d = 0; d < a.length; d++) {
        for (var e = a[d], f = !1, g = 0; g < b.length; g++)
            if (JSQEXMathematics.JSQEX_isSamePoint(e, b[g], c)) {
                f = !0;
                break
            }
        if (!f)
            return !1
    }
    return !0
}
;
JSQEXMathematics.JSQEX_isSameLineSegment = function(a, b, c, d, e) {
    e = e || JSQEXMathematics.JSQEX_defaultTolerance;
    return JSQEXMathematics.JSQEX_isSamePoint(a, c, e) && JSQEXMathematics.JSQEX_isSamePoint(b, d, e) || JSQEXMathematics.JSQEX_isSamePoint(a, d, e) && JSQEXMathematics.JSQEX_isSamePoint(b, c, e)
}
;
JSQEXMathematics.JSQEX_lineLineIntersection = function(a, b, c, d) {
    var e = 1 / ((a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x))
        , f = a.x * b.y - a.y * b.x
        , g = c.x * d.y - c.y * d.x;
    var cross = new THREE.Vector2( (f * (c.x - d.x) - (a.x - b.x) * g) * e, (f * (c.y - d.y) - (a.y - b.y) * g) * e );
    return cross;
}
;
JSQEXMathematics.JSQEX_segmentSegmentIntersection = function(a, b, c, d, e, ignoreBorder) {
    e = e || JSQEXMathematics.JSQEX_defaultTolerance;
    var f = JSQEXMathematics.JSQEX_lineLineIntersection(a, b, c, d);
    a = JSQEXMathematics.JSQEX_getLerpNumber(a, b, f);
    c = JSQEXMathematics.JSQEX_getLerpNumber(c, d, f);
    if ( !ignoreBorder ) {
        if (a > -e && a < 1 + e && c > -e && c < 1 + e && !isNaN(f.x) && !isNaN(f.y))
            return f
    }
    else {
        if (a > e && a < 1 - e && c > e && c < 1 - e && !isNaN(f.x) && !isNaN(f.y))
            return f
    }
}
;
JSQEXMathematics.JSQEX_raySegmentIntersection = function(a, b, c, d, e) {
    e = e || JSQEXMathematics.JSQEX_defaultTolerance;
    var f = JSQEXMathematics.JSQEX_lineLineIntersection(a, b, c, d);
    if (f && (b = b.clone().sub(a).normalize(),
        a = f.clone().sub(a).normalize(),
        c = JSQEXMathematics.JSQEX_getLerpNumber(c, d, f),
        JSQEXMathematics.JSQEX_nearlyEquals(b.x, a.x, e) && JSQEXMathematics.JSQEX_nearlyEquals(b.y, a.y, e) && c > -e && c < 1 + e))
        return f
}
;
JSQEXMathematics.JSQEX_lineLineAngle = function(a, b, c, d) {
    for (a = Math.abs(JSQEXMathematics.JSQEX_lineLineAngleCCW(a, b, c, d)); 180 < a; )
        a -= 180;
    return Math.min(a, Math.abs(180 - a))
}
;
JSQEXMathematics.JSQEX_lineLineAngleCCW = function(a, b, c, d) {
    a = JSQEXMathematics.JSQEX_getAngleHorizontaleCCW(a, b);
    c = JSQEXMathematics.JSQEX_getAngleHorizontaleCCW(c, d);
    return a - c
}
;
JSQEXMathematics.JSQEX_getPolygonPerimeter = function(a) {
    var b = a;
    JSQEXMathematics.JSQEX_isSamePoint(a[0], a[a.length - 1]) || (b = a.slice(0),
        b.push(b[0]));
    for (var c = a = 0; c < b.length - 1; c++) {
        var d = b[c]
            , e = b[c + 1]
            , d = new JSQEXMathematics.JSQEX_Line(d.x,d.y,e.x,e.y);
        a += d.JSQEX_getSegmentLength()
    }
    return a
}
;
JSQEXMathematics.JSQEX_getMassProperties = function() {
    var a, b, c;
    return function(d) {
        for (var e = 0, f = 0, g = 0, h = 0, m = d.length; h < m - 1; ++h)
            a = d[h],
                b = d[h + 1],
                c = a.x * b.y - b.x * a.y,
                f += (a.x + b.x) * c,
                g += (a.y + b.y) * c,
                e += c;
        return [e / 2, f / (3 * e), g / (3 * e)]
    }
}();
JSQEXMathematics.JSQEX_getBounds = function(a) {
    if (a.length) {
        var x_max, y_max;
        for (var b = x_max = a[0].x, c = y_max = a[0].y, d = 1, e = a.length; d < e - 1; ++d)
            a[d].x < b ? b = a[d].x : a[d].x > x_max && (x_max = a[d].x),
                    a[d].y < c ? c = a[d].y : a[d].y > y_max && (y_max = a[d].y);
        return [b, c, x_max - b, y_max - c]
    }
}
;
JSQEXMathematics.JSQEX_roundToPowerOf2 = function(a) {
    return Math.pow(2, Math.round(Math.log2(a)))
}
;
JSQEXMathematics.JSQEX_toPersistentPrecision = function(a) {
    return Number(a.toFixed(JSQEXMathematics.JSQEX_precisionDigits))
}
;
JSQEXMathematics.JSQEX_randomInRange = function(a, b) {
    Array.isArray(a) && (b = a[1],
        a = a[0]);
    return Math.random() * (b - a) + a
}
;
JSQEXMathematics.JSQEX_computeOutline = function(a, b, c, d) {
    var e = new THREE.Vector2()
        , f = JSQEXMathematics.JSQEX_rotatePointCW(e, new THREE.Vector2(
            -b / 2,
            c / 2), d || 0).add(a);
    b = JSQEXMathematics.JSQEX_rotatePointCW(e, new THREE.Vector2(
        b / 2,
        c / 2 ), d || 0).add(a);
    c = [];
    c[0] = f;
    c[1] = new THREE.Vector2(
            2 * a.x - b.x,
            2 * a.y - b.y
    );
    c[2] = new THREE.Vector2(
        2 * a.x - f.x,
        2 * a.y - f.y
    );
    c[3] = b;
    return c
}
;
JSQEXMathematics.JSQEX_getCentralLineOfLineSegment = function(a, b) {
    var c = new THREE.Vector2();
    c.lerp(a, b, 0.5);
    var d = new THREE.Vector2();

    d.set( b.y - a.y, -(b.x - a.x) );

    return {
        from: c,
        to: c.clone().add(d)
    }
}
;


JSQEXUtilities.JSQEX_object_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
JSQEXUtilities.JSQEX_object_extend = function(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d)
            a[c] = d[c];
        for (var f = 0; f < JSQEXUtilities.JSQEX_object_PROTOTYPE_FIELDS_.length; f++)
            c = JSQEXUtilities.JSQEX_object_PROTOTYPE_FIELDS_[f],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
}
;


JSQEXUtilities.JSQEX_nullFunction = function() {}
JSQEXUtilities.JSQEX_object_defineField = function(a, b, c) {
    var d = c.get
        , e = c.set;
    if (d || e)
        console.log( "defined field error" );
    else
        var f = c.JSQEX_initialValue
            , g = c.JSQEX_willChange || JSQEXUtilities.JSQEX_nullFunction
            , h = c.JSQEX_changed || JSQEXUtilities.JSQEX_nullFunction
            , d = function() {
                return f
            }
            , e = function(c) {
                if (c !== f) {
                    var d = f;
                    g.call(a, d, c, b, a);
                    f = c;
                    h.call(a, d, c, b, a)
                }
            }
            ;
    Object.defineProperty(a, b, {
        writeable: !0,
        enumerable: !0,
        configurable: !0,
        get: d,
        set: e
    })
}
;
JSQEXUtilities.JSQEX_object_defineReadonlyField = function(a, b, c) {
    var d = c;
    "function" !== typeof c && (d = function() {
        return c
    }
        );
    Object.defineProperty(a, b, {
        writeable: !1,
        enumerable: !1,
        configurable: !0,
        get: d,
        set: function() {
            console.error("right error" + b)
        }
    })
}
;
JSQEXUtilities.JSQEX_object_defineFields = function(a, b) {
    Object.xEntries(b).forEach(function(b) {
        var d = b[0];
        b = b[1];
        var e = b.JSQEX_readonly || !1;
        b.get && !b.set && (e = !0);
        e ? JSQEXUtilities.JSQEX_object_defineReadonlyField(a, d, b.get || b.JSQEX_initialValue) : JSQEXUtilities.JSQEX_object_defineField(a, d, b)
    })
};

JSQEXUtilities.JSQEX_isDef = function(a) {
    return void 0 !== a
}
;

JSQEXUtilities.JSQEX_functions = {};
JSQEXUtilities.JSQEX_functions.JSQEX_constant = function(a) {
    return function() {
        return a
    }
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_FALSE = JSQEXUtilities.JSQEX_functions.JSQEX_constant(!1);
JSQEXUtilities.JSQEX_functions.JSQEX_TRUE = JSQEXUtilities.JSQEX_functions.JSQEX_constant(!0);
JSQEXUtilities.JSQEX_functions.JSQEX_NULL = JSQEXUtilities.JSQEX_functions.JSQEX_constant(null );
JSQEXUtilities.JSQEX_functions.JSQEX_identity = function(a, b) {
    return a
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_error = function(a) {
    return function() {
        throw Error(a);
    }
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_fail = function(a) {
    return function() {
        throw a;
    }
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_lock = function(a, b) {
    b = b || 0;
    return function() {
        return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
    }
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_nth = function(a) {
    return function() {
        return arguments[a]
    }
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_withReturnValue = function(a, b) {
    return JSQEXUtilities.JSQEX_functions.JSQEX_sequence(a, JSQEXUtilities.JSQEX_functions.JSQEX_constant(b))
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_equalTo = function(a, b) {
    return function(c) {
        return b ? a == c : a === c
    }
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_compose = function(a, b) {
    var c = arguments
        , d = c.length;
    return function() {
        var a;
        d && (a = c[d - 1].apply(this, arguments));
        for (var b = d - 2; 0 <= b; b--)
            a = c[b].call(this, a);
        return a
    }
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_sequence = function(a) {
    var b = arguments
        , c = b.length;
    return function() {
        for (var a, e = 0; e < c; e++)
            a = b[e].apply(this, arguments);
        return a
    }
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_and = function(a) {
    var b = arguments
        , c = b.length;
    return function() {
        for (var a = 0; a < c; a++)
            if (!b[a].apply(this, arguments))
                return !1;
        return !0
    }
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_or = function(a) {
    var b = arguments
        , c = b.length;
    return function() {
        for (var a = 0; a < c; a++)
            if (b[a].apply(this, arguments))
                return !0;
        return !1
    }
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_not = function(a) {
    return function() {
        return !a.apply(this, arguments)
    }
}
;
JSQEXUtilities.JSQEX_functions.JSQEX_create = function(a, b) {
    var c = function() {}
        ;
    c.prototype = a.prototype;
    c = new c;
    a.apply(c, Array.prototype.slice.call(arguments, 1));
    return c
}
;

JSQEXUtilities.JSQEX_functions.JSQEX_cacheReturnValue = function(a) {
    var b = !1, c;
    return function() {

        b || (c = a(),
            b = !0);
        return c
    }
}
;

JSQEXUtilities.JSQEX_getUid = function(a) {
    return a[JSQEXUtilities.JSQEX_UID_PROPERTY_] || (a[JSQEXUtilities.JSQEX_UID_PROPERTY_] = ++JSQEXUtilities.JSQEX_uidCounter_)
}
;
JSQEXUtilities.JSQEX_hasUid = function(a) {
    return !!a[JSQEXUtilities.JSQEX_UID_PROPERTY_]
}
;
JSQEXUtilities.JSQEX_removeUid = function(a) {
    "removeAttribute" in a && a.removeAttribute(JSQEXUtilities.JSQEX_UID_PROPERTY_);
    try {
        delete a[JSQEXUtilities.JSQEX_UID_PROPERTY_]
    } catch (b) {}
}
;
JSQEXUtilities.JSQEX_UID_PROPERTY_ = "JSQEX_closure_uid_" + (1E9 * Math.random() >>> 0);
JSQEXUtilities.JSQEX_uidCounter_ = 0;


JSQEXUtilities.JSQEX_bindNative_ = function(a, b, c) {
    return a.call.apply(a.bind, arguments)
}
;
JSQEXUtilities.JSQEX_bindJs_ = function(a, b, c) {
    if (!a)
        throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
}
;
JSQEXUtilities.JSQEX_bind = function(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? JSQEXUtilities.JSQEX_bind = JSQEXUtilities.JSQEX_bindNative_ : JSQEXUtilities.JSQEX_bind = JSQEXUtilities.JSQEX_bindJs_;
    return JSQEXUtilities.JSQEX_bind.apply(null , arguments)
}
;
JSQEXUtilities.JSQEX_partial = function(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var b = c.slice();
        b.push.apply(b, arguments);
        return a.apply(this, b)
    }
}
;

JSQEXUtilities.JSQEX_mixin = function(a, b) {
    for (var c in b)
        a[c] = b[c]
}
;

JSQEXUtilities.JSQEX_mergeObject = function( a, b ) {
    var c = {};
    Object.keys( a ).forEach( function( id ) {
        c[id] = a[id];
    } );
    Object.keys( b ).forEach( function( id ) {
        c[id] = b[id];
    } );

    return c;
};

JSQEXUtilities.JSQEX_inherits = function(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.base = function(a, c, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)
            g[h - 2] = arguments[h];
        return b.prototype[c].apply(a, g)
    }
}
;
//JSQEXUtilities.JSQEX_StopIteration = {
//    message: "StopIteration",
//    stack: ""
//};
//
//JSQEXUtilities.JSQEX_Iterator = function() {}
//;
//
//JSQEXUtilities.JSQEX_Iterator.prototype.next = function() {
//    throw JSQEXUtilities.JSQEX_StopIteration;
//}
//;
//JSQEXUtilities.JSQEX_Iterator.prototype.__iterator__ = function(a) {
//    return this
//}
//;
//JSQEXUtilities.JSQEX_toIterator = function(a) {
//    if (a instanceof JSQEXUtilities.JSQEX_Iterator)
//        return a;
//    if ("function" == typeof a.__iterator__)
//        return a.__iterator__(!1);
//    if (JSQEXUtilities.JSQEX_isArrayLike(a)) {
//        var b = 0
//            , c = new JSQEXUtilities.JSQEX_Iterator;
//        c.next = function() {
//            for (; ; ) {
//                if (b >= a.length)
//                    throw JSQEXUtilities.JSQEX_StopIteration;
//                if (b in a)
//                    return a[b++];
//                b++
//            }
//        }
//        ;
//        return c
//    }
//    throw Error("Not implemented");
//}
//;
//JSQEXUtilities.JSQEX_forEach = function(a, b, c) {
//    if (JSQEXUtilities.JSQEX_isArrayLike(a))
//        try {
//            JSQEXUtilities.JSQEX_array.forEach(a, b, c)
//        } catch (d) {
//            if (d !== JSQEXUtilities.JSQEX_StopIteration)
//                throw d;
//        }
//    else {
//        a = JSQEXUtilities.JSQEX_toIterator(a);
//        try {
//            for (; ; )
//                b.call(c, a.next(), void 0, a)
//        } catch (e) {
//            if (e !== JSQEXUtilities.JSQEX_StopIteration)
//                throw e;
//        }
//    }
//}
//;
//JSQEXUtilities.JSQEX_filter = function(a, b, c) {
//    var d = JSQEXUtilities.JSQEX_toIterator(a);
//    a = new JSQEXUtilities.JSQEX_Iterator;
//    a.next = function() {
//        for (; ; ) {
//            var a = d.next();
//            if (b.call(c, a, void 0, d))
//                return a
//        }
//    }
//    ;
//    return a
//}
//;
//JSQEXUtilities.JSQEX_filterFalse = function(a, b, c) {
//    return JSQEXUtilities.JSQEX_filter(a, JSQEXUtilities.JSQEX_functions.JSQEX_not(b), c)
//}
//;
//JSQEXUtilities.JSQEX_range = function(a, b, c) {
//    var d = 0
//        , e = a
//        , f = c || 1;
//    1 < arguments.length && (d = a,
//        e = b);
//    if (0 == f)
//        throw Error("Range step argument must not be zero");
//    var g = new JSQEXUtilities.JSQEX_Iterator;
//    g.next = function() {
//        if (0 < f && d >= e || 0 > f && d <= e)
//            throw JSQEXUtilities.JSQEX_StopIteration;
//        var a = d;
//        d += f;
//        return a
//    }
//    ;
//    return g
//}
//;
//JSQEXUtilities.JSQEX_join = function(a, b) {
//    return JSQEXUtilities.JSQEX_toArray(a).join(b)
//}
//;
//JSQEXUtilities.JSQEX_map = function(a, b, c) {
//    var d = JSQEXUtilities.JSQEX_toIterator(a);
//    a = new JSQEXUtilities.JSQEX_Iterator;
//    a.next = function() {
//        var a = d.next();
//        return b.call(c, a, void 0, d)
//    }
//    ;
//    return a
//}
//;
//JSQEXUtilities.JSQEX_reduce = function(a, b, c, d) {
//    var e = c;
//    JSQEXUtilities.JSQEX_forEach(a, function(a) {
//        e = b.call(d, e, a)
//    });
//    return e
//}
//;
//JSQEXUtilities.JSQEX_some = function(a, b, c) {
//    a = JSQEXUtilities.JSQEX_toIterator(a);
//    try {
//        for (; ; )
//            if (b.call(c, a.next(), void 0, a))
//                return !0
//    } catch (d) {
//        if (d !== JSQEXUtilities.JSQEX_StopIteration)
//            throw d;
//    }
//    return !1
//}
//;
//JSQEXUtilities.JSQEX_every = function(a, b, c) {
//    a = JSQEXUtilities.JSQEX_toIterator(a);
//    try {
//        for (; ; )
//            if (!b.call(c, a.next(), void 0, a))
//                return !1
//    } catch (d) {
//        if (d !== JSQEXUtilities.JSQEX_StopIteration)
//            throw d;
//    }
//    return !0
//}
//;
//JSQEXUtilities.JSQEX_chain = function(a) {
//    return JSQEXUtilities.JSQEX_chainFromIterable(arguments)
//}
//;
//JSQEXUtilities.JSQEX_chainFromIterable = function(a) {
//    var b = JSQEXUtilities.JSQEX_toIterator(a);
//    a = new JSQEXUtilities.JSQEX_Iterator;
//    var c = null ;
//    a.next = function() {
//        for (; ; ) {
//            if (null  == c) {
//                var a = b.next();
//                c = JSQEXUtilities.JSQEX_toIterator(a)
//            }
//            try {
//                return c.next()
//            } catch (e) {
//                if (e !== JSQEXUtilities.JSQEX_StopIteration)
//                    throw e;
//                c = null
//            }
//        }
//    }
//    ;
//    return a
//}
//;
//JSQEXUtilities.JSQEX_dropWhile = function(a, b, c) {
//    var d = JSQEXUtilities.JSQEX_toIterator(a);
//    a = new JSQEXUtilities.JSQEX_Iterator;
//    var e = !0;
//    a.next = function() {
//        for (; ; ) {
//            var a = d.next();
//            if (!e || !b.call(c, a, void 0, d))
//                return e = !1,
//                    a
//        }
//    }
//    ;
//    return a
//}
//;
//JSQEXUtilities.JSQEX_takeWhile = function(a, b, c) {
//    var d = JSQEXUtilities.JSQEX_toIterator(a);
//    a = new JSQEXUtilities.JSQEX_Iterator;
//    a.next = function() {
//        var a = d.next();
//        if (b.call(c, a, void 0, d))
//            return a;
//        throw JSQEXUtilities.JSQEX_StopIteration;
//    }
//    ;
//    return a
//}
//;
//JSQEXUtilities.JSQEX_toArray = function(a) {
//    if (JSQEXUtilities.JSQEX_isArrayLike(a))
//        return JSQEXUtilities.JSQEX_array.toArray(a);
//    a = JSQEXUtilities.JSQEX_toIterator(a);
//    var b = [];
//    JSQEXUtilities.JSQEX_forEach(a, function(a) {
//        b.push(a)
//    });
//    return b
//}
//;
//JSQEXUtilities.JSQEX_equals = function(a, b, c) {
//    a = JSQEXUtilities.JSQEX_zipLongest({}, a, b);
//    var d = c || JSQEXUtilities.JSQEX_array.defaultCompareEquality;
//    return JSQEXUtilities.JSQEX_every(a, function(a) {
//        return d(a[0], a[1])
//    })
//}
//;
//JSQEXUtilities.JSQEX_nextOrValue = function(a, b) {
//    try {
//        return JSQEXUtilities.JSQEX_toIterator(a).next()
//    } catch (c) {
//        if (c != JSQEXUtilities.JSQEX_StopIteration)
//            throw c;
//        return b
//    }
//}
//;
//JSQEXUtilities.JSQEX_product = function(a) {
//    if (JSQEXUtilities.JSQEX_array.some(arguments, function(a) {
//        return !a.length
//    }) || !arguments.length)
//        return new JSQEXUtilities.JSQEX_Iterator;
//    var b = new JSQEXUtilities.JSQEX_Iterator
//        , c = arguments
//        , d = JSQEXUtilities.JSQEX_array.repeat(0, c.length);
//    b.next = function() {
//        if (d) {
//            for (var a = JSQEXUtilities.JSQEX_array.map(d, function(a, b) {
//                return c[b][a]
//            }), b = d.length - 1; 0 <= b; b--) {
//
//                if (d[b] < c[b].length - 1) {
//                    d[b]++;
//                    break
//                }
//                if (0 == b) {
//                    d = null ;
//                    break
//                }
//                d[b] = 0
//            }
//            return a
//        }
//        throw JSQEXUtilities.JSQEX_StopIteration;
//    }
//    ;
//    return b
//}
//;
//JSQEXUtilities.JSQEX_cycle = function(a) {
//    var b = JSQEXUtilities.JSQEX_toIterator(a)
//        , c = []
//        , d = 0;
//    a = new JSQEXUtilities.JSQEX_Iterator;
//    var e = !1;
//    a.next = function() {
//        var a = null ;
//        if (!e)
//            try {
//                return a = b.next(),
//                    c.push(a),
//                    a
//            } catch (g) {
//                if (g != JSQEXUtilities.JSQEX_StopIteration || JSQEXUtilities.JSQEX_array.isEmpty(c))
//                    throw g;
//                e = !0
//            }
//        a = c[d];
//        d = (d + 1) % c.length;
//        return a
//    }
//    ;
//    return a
//}
//;
//JSQEXUtilities.JSQEX_count = function(a, b) {
//    var c = a || 0
//        , d = JSQEXUtilities.JSQEX_isDef(b) ? b : 1
//        , e = new JSQEXUtilities.JSQEX_Iterator;
//    e.next = function() {
//        var a = c;
//        c += d;
//        return a
//    }
//    ;
//    return e
//}
//;
//JSQEXUtilities.JSQEX_repeat = function(a) {
//    var b = new JSQEXUtilities.JSQEX_Iterator;
//    b.next = JSQEXUtilities.JSQEX_functions.JSQEX_constant(a);
//    return b
//}
//;
//JSQEXUtilities.JSQEX_accumulate = function(a) {
//    var b = JSQEXUtilities.JSQEX_toIterator(a)
//        , c = 0;
//    a = new JSQEXUtilities.JSQEX_Iterator;
//    a.next = function() {
//        return c += b.next()
//    }
//    ;
//    return a
//}
//;
//JSQEXUtilities.JSQEX_zip = function(a) {
//    var b = arguments
//        , c = new JSQEXUtilities.JSQEX_Iterator;
//    if (0 < b.length) {
//        var d = JSQEXUtilities.JSQEX_array.map(b, JSQEXUtilities.JSQEX_toIterator);
//        c.next = function() {
//            return JSQEXUtilities.JSQEX_array.map(d, function(a) {
//                return a.next()
//            })
//        }
//    }
//    return c
//}
//;
//JSQEXUtilities.JSQEX_zipLongest = function(a, b) {
//    var c = JSQEXUtilities.JSQEX_array.slice(arguments, 1)
//        , d = new JSQEXUtilities.JSQEX_Iterator;
//    if (0 < c.length) {
//        var e = JSQEXUtilities.JSQEX_array.map(c, JSQEXUtilities.JSQEX_toIterator);
//        d.next = function() {
//            var b = !1
//                , c = JSQEXUtilities.JSQEX_array.map(e, function(c) {
//                    var d;
//                    try {
//                        d = c.next(),
//                            b = !0
//                    } catch (e) {
//                        if (e !== JSQEXUtilities.JSQEX_StopIteration)
//                            throw e;
//                        d = a
//                    }
//                    return d
//                });
//            if (!b)
//                throw JSQEXUtilities.JSQEX_StopIteration;
//            return c
//        }
//    }
//    return d
//}
//;
//JSQEXUtilities.JSQEX_compress = function(a, b) {
//    var c = JSQEXUtilities.JSQEX_toIterator(b);
//    return JSQEXUtilities.JSQEX_filter(a, function() {
//        return !!c.next()
//    })
//}
//;
//JSQEXUtilities.JSQEX_GroupByIterator_ = function(a, b) {
//    this.iterator = JSQEXUtilities.JSQEX_toIterator(a);
//    this.keyFunc = b || JSQEXUtilities.JSQEX_functions.JSQEX_identity
//}
//;
//JSQEXUtilities.JSQEX_inherits(JSQEXUtilities.JSQEX_GroupByIterator_, JSQEXUtilities.JSQEX_Iterator);
//JSQEXUtilities.JSQEX_GroupByIterator_.prototype.next = function() {
//    for (; this.currentKey == this.targetKey; )
//        this.currentValue = this.iterator.next(),
//            this.currentKey = this.keyFunc(this.currentValue);
//    this.targetKey = this.currentKey;
//    return [this.currentKey, this.groupItems_(this.targetKey)]
//}
//;
//JSQEXUtilities.JSQEX_GroupByIterator_.prototype.groupItems_ = function(a) {
//    for (var b = []; this.currentKey == a; ) {
//        b.push(this.currentValue);
//        try {
//            this.currentValue = this.iterator.next()
//        } catch (c) {
//            if (c !== JSQEXUtilities.JSQEX_StopIteration)
//                throw c;
//            break
//        }
//        this.currentKey = this.keyFunc(this.currentValue)
//    }
//    return b
//}
//;
//JSQEXUtilities.JSQEX_groupBy = function(a, b) {
//    return new JSQEXUtilities.JSQEX_GroupByIterator_(a,b)
//}
//;
//JSQEXUtilities.JSQEX_starMap = function(a, b, c) {
//    var d = JSQEXUtilities.JSQEX_toIterator(a);
//    a = new JSQEXUtilities.JSQEX_Iterator;
//    a.next = function() {
//        var a = JSQEXUtilities.JSQEX_toArray(d.next());
//        return b.apply(c, JSQEXUtilities.JSQEX_array.concat(a, void 0, d))
//    }
//    ;
//    return a
//}
//;
//JSQEXUtilities.JSQEX_tee = function(a, b) {
//    var c = JSQEXUtilities.JSQEX_toIterator(a)
//        , d = JSQEXUtilities.JSQEX_isNumber(b) ? b : 2
//        , e = JSQEXUtilities.JSQEX_array.map(JSQEXUtilities.JSQEX_array.range(d), function() {
//            return []
//        })
//        , f = function() {
//            var a = c.next();
//            JSQEXUtilities.JSQEX_array.forEach(e, function(b) {
//                b.push(a)
//            })
//        }
//        ;
//    return JSQEXUtilities.JSQEX_array.map(e, function(a) {
//        var b = new JSQEXUtilities.JSQEX_Iterator;
//        b.next = function() {
//            JSQEXUtilities.JSQEX_array.isEmpty(a) && f();
//            return a.shift()
//        }
//        ;
//        return b
//    })
//}
//;
//JSQEXUtilities.JSQEX_enumerate = function(a, b) {
//    return JSQEXUtilities.JSQEX_zip(JSQEXUtilities.JSQEX_count(b), a)
//}
//;
//JSQEXUtilities.JSQEX_limit = function(a, b) {
//
//    var c = JSQEXUtilities.JSQEX_toIterator(a)
//        , d = new JSQEXUtilities.JSQEX_Iterator
//        , e = b;
//    d.next = function() {
//        if (0 < e--)
//            return c.next();
//        throw JSQEXUtilities.JSQEX_StopIteration;
//    }
//    ;
//    return d
//}
//;
//JSQEXUtilities.JSQEX_consume = function(a, b) {
//
//    for (var c = JSQEXUtilities.JSQEX_toIterator(a); 0 < b--; )
//        JSQEXUtilities.JSQEX_nextOrValue(c, null );
//    return c
//}
//;
//JSQEXUtilities.JSQEX_slice = function(a, b, c) {
//
//    a = JSQEXUtilities.JSQEX_consume(a, b);
//    JSQEXUtilities.JSQEX_isNumber(c) && ( a = JSQEXUtilities.JSQEX_limit(a, c - b));
//    return a
//}
//;
//JSQEXUtilities.JSQEX_hasDuplicates_ = function(a) {
//    var b = [];
//    JSQEXUtilities.JSQEX_array.removeDuplicates(a, b);
//    return a.length != b.length
//}
//;
//JSQEXUtilities.JSQEX_permutations = function(a, b) {
//    var c = JSQEXUtilities.JSQEX_toArray(a)
//        , d = JSQEXUtilities.JSQEX_isNumber(b) ? b : c.length
//        , c = JSQEXUtilities.JSQEX_array.repeat(c, d)
//        , c = JSQEXUtilities.JSQEX_product.apply(void 0, c);
//    return JSQEXUtilities.JSQEX_filter(c, function(a) {
//        return !JSQEXUtilities.JSQEX_hasDuplicates_(a)
//    })
//}
//;
//JSQEXUtilities.JSQEX_combinations = function(a, b) {
//    function c(a) {
//        return d[a]
//    }
//    var d = JSQEXUtilities.JSQEX_toArray(a)
//        , e = JSQEXUtilities.JSQEX_range(d.length)
//        , e = JSQEXUtilities.JSQEX_permutations(e, b)
//        , f = JSQEXUtilities.JSQEX_filter(e, function(a) {
//            return JSQEXUtilities.JSQEX_array.isSorted(a)
//        })
//        , e = new JSQEXUtilities.JSQEX_Iterator;
//    e.next = function() {
//        return JSQEXUtilities.JSQEX_array.map(f.next(), c)
//    }
//    ;
//    return e
//}
//;
//JSQEXUtilities.JSQEX_combinationsWithReplacement = function(a, b) {
//    function c(a) {
//        return d[a]
//    }
//    var d = JSQEXUtilities.JSQEX_toArray(a)
//        , e = JSQEXUtilities.JSQEX_array.range(d.length)
//        , e = JSQEXUtilities.JSQEX_array.repeat(e, b)
//        , e = JSQEXUtilities.JSQEX_product.apply(void 0, e)
//        , f = JSQEXUtilities.JSQEX_filter(e, function(a) {
//            return JSQEXUtilities.JSQEX_array.isSorted(a)
//        })
//        , e = new JSQEXUtilities.JSQEX_Iterator;
//    e.next = function() {
//        return JSQEXUtilities.JSQEX_array.map(f.next(), c)
//    }
//    ;
//    return e
//}
//;

JSQEXUtilities.JSQEX_typeOf = function(a) {
    var b = typeof a;
    if ("object" == b)
        if (a) {
            if (a instanceof Array)
                return "array";
            if (a instanceof Object)
                return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c)
                return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                return "function"
        } else
            return "null";
    else if ("function" == b && "undefined" == typeof a.call)
        return "object";
    return b
}
;
JSQEXUtilities.JSQEX_isNull = function(a) {
    return null  === a
}
;
JSQEXUtilities.JSQEX_isDefAndNotNull = function(a) {
    return null  != a
}
;
JSQEXUtilities.JSQEX_isArray = function(a) {
    return "array" == JSQEXUtilities.JSQEX_typeOf(a)
}
;
JSQEXUtilities.JSQEX_isArrayLike = function(a) {
    var b = JSQEXUtilities.JSQEX_typeOf(a);
    return "array" == b || "object" == b && "number" == typeof a.length
}
;
JSQEXUtilities.JSQEX_isDateLike = function(a) {
    return JSQEXUtilities.JSQEX_isObject(a) && "function" == typeof a.getFullYear
}
;
JSQEXUtilities.JSQEX_isString = function(a) {
    return "string" == typeof a
}
;
JSQEXUtilities.JSQEX_isBoolean = function(a) {
    return "boolean" == typeof a
}
;
JSQEXUtilities.JSQEX_isNumber = function(a) {
    return "number" == typeof a
}
;
JSQEXUtilities.JSQEX_isFunction = function(a) {
    return "function" == JSQEXUtilities.JSQEX_typeOf(a)
}
;
JSQEXUtilities.JSQEX_isObject = function(a) {
    var b = typeof a;
    return "object" == b && null  != a || "function" == b
}
;

JSQEXUtilities.JSQEX_array = {};

JSQEXUtilities.JSQEX_array.peek = function(a) {
    return a[a.length - 1]
}
;
JSQEXUtilities.JSQEX_array.last = JSQEXUtilities.JSQEX_array.peek;
JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_ = Array.prototype;
JSQEXUtilities.JSQEX_array.indexOf = function(a, b, c) {
    c = null  == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
    if (JSQEXUtilities.JSQEX_isString(a))
        return JSQEXUtilities.JSQEX_isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
    for (; c < a.length; c++)
        if (c in a && a[c] === b)
            return c;
    return -1
}
;
JSQEXUtilities.JSQEX_array.lastIndexOf = function(a, b, c) {
    c = null  == c ? a.length - 1 : c;
    0 > c && (c = Math.max(0, a.length + c));
    if (JSQEXUtilities.JSQEX_isString(a))
        return JSQEXUtilities.JSQEX_isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
    for (; 0 <= c; c--)
        if (c in a && a[c] === b)
            return c;
    return -1
}
;
JSQEXUtilities.JSQEX_array.forEach = function(a, b, c) {
    for (var d = a.length, e = JSQEXUtilities.JSQEX_isString(a) ? a.split("") : a, f = 0; f < d; f++)
        f in e && b.call(c, e[f], f, a)
}
;
JSQEXUtilities.JSQEX_array.forEachRight = function(a, b, c) {
    for (var d = a.length, e = JSQEXUtilities.JSQEX_isString(a) ? a.split("") : a, d = d - 1; 0 <= d; --d)
        d in e && b.call(c, e[d], d, a)
}
;
JSQEXUtilities.JSQEX_array.filter = function(a, b, c) {
    for (var d = a.length, e = [], f = 0, g = JSQEXUtilities.JSQEX_isString(a) ? a.split("") : a, h = 0; h < d; h++)
        if (h in g) {
            var m = g[h];
            b.call(c, m, h, a) && (e[f++] = m)
        }
    return e
}
;
JSQEXUtilities.JSQEX_array.map = function(a, b, c) {
    for (var d = a.length, e = Array(d), f = JSQEXUtilities.JSQEX_isString(a) ? a.split("") : a, g = 0; g < d; g++)
        g in f && (e[g] = b.call(c, f[g], g, a));
    return e
}
;
JSQEXUtilities.JSQEX_array.reduce = function(a, b, c, d) {
    var e = c;
    JSQEXUtilities.JSQEX_array.forEach(a, function(c, g) {
        e = b.call(d, e, c, g, a)
    });
    return e
}
;
JSQEXUtilities.JSQEX_array.reduceRight = function(a, b, c, d) {
    var e = c;
    JSQEXUtilities.JSQEX_array.forEachRight(a, function(c, g) {
        e = b.call(d, e, c, g, a)
    });
    return e
}
;
JSQEXUtilities.JSQEX_array.some = function(a, b, c) {
    for (var d = a.length, e = JSQEXUtilities.JSQEX_isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a))
            return !0;
    return !1
}
;
JSQEXUtilities.JSQEX_array.every = function(a, b, c) {
    for (var d = a.length, e = JSQEXUtilities.JSQEX_isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && !b.call(c, e[f], f, a))
            return !1;
    return !0
}
;
JSQEXUtilities.JSQEX_array.count = function(a, b, c) {
    var d = 0;
    JSQEXUtilities.JSQEX_array.forEach(a, function(a, f, g) {
        b.call(c, a, f, g) && ++d
    }, c);
    return d
}
;
JSQEXUtilities.JSQEX_array.find = function(a, b, c) {
    b = JSQEXUtilities.JSQEX_array.findIndex(a, b, c);
    return 0 > b ? null  : JSQEXUtilities.JSQEX_isString(a) ? a.charAt(b) : a[b]
}
;
JSQEXUtilities.JSQEX_array.findIndex = function(a, b, c) {
    for (var d = a.length, e = JSQEXUtilities.JSQEX_isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a))
            return f;
    return -1
}
;
JSQEXUtilities.JSQEX_array.findRight = function(a, b, c) {
    b = JSQEXUtilities.JSQEX_array.findIndexRight(a, b, c);
    return 0 > b ? null  : JSQEXUtilities.JSQEX_isString(a) ? a.charAt(b) : a[b]
}
;
JSQEXUtilities.JSQEX_array.findIndexRight = function(a, b, c) {
    for (var d = a.length, e = JSQEXUtilities.JSQEX_isString(a) ? a.split("") : a, d = d - 1; 0 <= d; d--)
        if (d in e && b.call(c, e[d], d, a))
            return d;
    return -1
}
;
JSQEXUtilities.JSQEX_array.contains = function(a, b) {
    return 0 <= JSQEXUtilities.JSQEX_array.indexOf(a, b)
}
;
JSQEXUtilities.JSQEX_array.isEmpty = function(a) {
    return 0 == a.length
}
;
JSQEXUtilities.JSQEX_array.clear = function(a) {
    if (!JSQEXUtilities.JSQEX_isArray(a))
        for (var b = a.length - 1; 0 <= b; b--)
            delete a[b];
    a.length = 0
}
;
JSQEXUtilities.JSQEX_array.insert = function(a, b) {
    JSQEXUtilities.JSQEX_array.contains(a, b) || a.push(b)
}
;
JSQEXUtilities.JSQEX_array.insertAt = function(a, b, c) {
    JSQEXUtilities.JSQEX_array.splice(a, c, 0, b)
}
;
JSQEXUtilities.JSQEX_array.insertArrayAt = function(a, b, c) {
    JSQEXUtilities.JSQEX_partial(JSQEXUtilities.JSQEX_array.splice, a, c, 0).apply(null , b)
}
;
JSQEXUtilities.JSQEX_array.insertBefore = function(a, b, c) {
    var d;
    2 == arguments.length || 0 > (d = JSQEXUtilities.JSQEX_array.indexOf(a, c)) ? a.push(b) : JSQEXUtilities.JSQEX_array.insertAt(a, b, d)
}
;
JSQEXUtilities.JSQEX_array.remove = function(a, b) {
    var c = JSQEXUtilities.JSQEX_array.indexOf(a, b), d;
    (d = 0 <= c) && JSQEXUtilities.JSQEX_array.removeAt(a, c);
    return d
}
;
JSQEXUtilities.JSQEX_array.removeAt = function(a, b) {

    return 1 == JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length
}
;
JSQEXUtilities.JSQEX_array.removeIf = function(a, b, c) {
    b = JSQEXUtilities.JSQEX_array.findIndex(a, b, c);
    return 0 <= b ? (JSQEXUtilities.JSQEX_array.removeAt(a, b),
        !0) : !1
}
;
JSQEXUtilities.JSQEX_array.removeAllIf = function(a, b, c) {
    var d = 0;
    JSQEXUtilities.JSQEX_array.forEachRight(a, function(e, f) {
        b.call(c, e, f, a) && JSQEXUtilities.JSQEX_array.removeAt(a, f) && d++
    });
    return d
}
;
JSQEXUtilities.JSQEX_array.concat = function(a) {
    return JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_.concat.apply(JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_, arguments)
}
;
JSQEXUtilities.JSQEX_array.join = function(a) {
    return JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_.concat.apply(JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_, arguments)
}
;
JSQEXUtilities.JSQEX_array.toArray = function(a) {
    var b = a.length;
    if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++)
            c[d] = a[d];
        return c
    }
    return []
}
;
JSQEXUtilities.JSQEX_array.clone = JSQEXUtilities.JSQEX_array.toArray;
JSQEXUtilities.JSQEX_array.extend = function(a, b) {
    for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (JSQEXUtilities.JSQEX_isArrayLike(d)) {
            var e = a.length || 0
                , f = d.length || 0;
            a.length = e + f;
            for (var g = 0; g < f; g++)
                a[e + g] = d[g]
        } else
            a.push(d)
    }
}
;
JSQEXUtilities.JSQEX_array.splice = function(a, b, c, d) {

    return JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_.splice.apply(a, JSQEXUtilities.JSQEX_array.slice(arguments, 1))
}
;
JSQEXUtilities.JSQEX_array.slice = function(a, b, c) {

    return 2 >= arguments.length ? JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_.slice.call(a, b) : JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_.slice.call(a, b, c)
}
;
JSQEXUtilities.JSQEX_array.removeDuplicates = function(a, b, c) {
    b = b || a;
    var d = function(a) {
            return JSQEXUtilities.JSQEX_isObject(g) ? "o" + JSQEXUtilities.JSQEX_getUid(g) : (typeof g).charAt(0) + g
        }
        ;
    c = c || d;
    for (var d = {}, e = 0, f = 0; f < a.length; ) {
        var g = a[f++]
            , h = c(g);
        Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0,
            b[e++] = g)
    }
    b.length = e
}
;
JSQEXUtilities.JSQEX_array.binarySearch = function(a, b, c) {
    return JSQEXUtilities.JSQEX_array.binarySearch_(a, c || JSQEXUtilities.JSQEX_array.defaultCompare, !1, b)
}
;
JSQEXUtilities.JSQEX_array.binarySelect = function(a, b, c) {
    return JSQEXUtilities.JSQEX_array.binarySearch_(a, b, !0, void 0, c)
}
;
JSQEXUtilities.JSQEX_array.binarySearch_ = function(a, b, c, d, e) {
    for (var f = 0, g = a.length, h; f < g; ) {
        var m = f + g >> 1, n;
        n = c ? b.call(e, a[m], m, a) : b(d, a[m]);
        0 < n ? f = m + 1 : (g = m,
            h = !n)
    }
    return h ? f : ~f
}
;
JSQEXUtilities.JSQEX_array.sort = function(a, b) {
    a.sort(b || JSQEXUtilities.JSQEX_array.defaultCompare)
}
;
JSQEXUtilities.JSQEX_array.stableSort = function(a, b) {
    for (var c = 0; c < a.length; c++)
        a[c] = {
            index: c,
            value: a[c]
        };
    var d = b || JSQEXUtilities.JSQEX_array.defaultCompare;
    JSQEXUtilities.JSQEX_array.sort(a, function(a, b) {
        return d(a.value, b.value) || a.index - b.index
    });
    for (c = 0; c < a.length; c++)
        a[c] = a[c].value
}
;
JSQEXUtilities.JSQEX_array.sortByKey = function(a, b, c) {
    var d = c || JSQEXUtilities.JSQEX_array.defaultCompare;
    JSQEXUtilities.JSQEX_array.sort(a, function(a, c) {
        return d(b(a), b(c))
    })
}
;
JSQEXUtilities.JSQEX_array.sortObjectsByKey = function(a, b, c) {
    JSQEXUtilities.JSQEX_array.sortByKey(a, function(a) {
        return a[b]
    }, c)
}
;
JSQEXUtilities.JSQEX_array.isSorted = function(a, b, c) {
    b = b || JSQEXUtilities.JSQEX_array.defaultCompare;
    for (var d = 1; d < a.length; d++) {
        var e = b(a[d - 1], a[d]);
        if (0 < e || 0 == e && c)
            return !1
    }
    return !0
}
;
JSQEXUtilities.JSQEX_array.equals = function(a, b, c) {
    if (!JSQEXUtilities.JSQEX_isArrayLike(a) || !JSQEXUtilities.JSQEX_isArrayLike(b) || a.length != b.length)
        return !1;
    var d = a.length;
    c = c || JSQEXUtilities.JSQEX_array.defaultCompareEquality;
    for (var e = 0; e < d; e++)
        if (!c(a[e], b[e]))
            return !1;
    return !0
}
;
JSQEXUtilities.JSQEX_array.compare3 = function(a, b, c) {
    c = c || JSQEXUtilities.JSQEX_array.defaultCompare;
    for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
        var f = c(a[e], b[e]);
        if (0 != f)
            return f
    }
    return JSQEXUtilities.JSQEX_array.defaultCompare(a.length, b.length)
}
;
JSQEXUtilities.JSQEX_array.defaultCompare = function(a, b) {
    return a > b ? 1 : a < b ? -1 : 0
}
;
JSQEXUtilities.JSQEX_array.inverseDefaultCompare = function(a, b) {
    return -JSQEXUtilities.JSQEX_array.defaultCompare(a, b)
}
;
JSQEXUtilities.JSQEX_array.defaultCompareEquality = function(a, b) {
    return a === b
}
;
JSQEXUtilities.JSQEX_array.binaryInsert = function(a, b, c) {
    c = JSQEXUtilities.JSQEX_array.binarySearch(a, b, c);
    return 0 > c ? (JSQEXUtilities.JSQEX_array.insertAt(a, b, -(c + 1)),
        !0) : !1
}
;
JSQEXUtilities.JSQEX_array.binaryRemove = function(a, b, c) {
    b = JSQEXUtilities.JSQEX_array.binarySearch(a, b, c);
    return 0 <= b ? JSQEXUtilities.JSQEX_array.removeAt(a, b) : !1
}
;
JSQEXUtilities.JSQEX_array.bucket = function(a, b, c) {
    for (var d = {}, e = 0; e < a.length; e++) {
        var f = a[e]
            , g = b.call(c, f, e, a);
        JSQEXUtilities.JSQEX_isDef(g) && (d[g] || (d[g] = [])).push(f)
    }
    return d
}
;
JSQEXUtilities.JSQEX_array.toObject = function(a, b, c) {
    var d = {};
    JSQEXUtilities.JSQEX_array.forEach(a, function(e, f) {
        d[b.call(c, e, f, a)] = e
    });
    return d
}
;
JSQEXUtilities.JSQEX_array.range = function(a, b, c) {
    var d = []
        , e = 0
        , f = a;
    c = c || 1;
    void 0 !== b && (e = a,
        f = b);
    if (0 > c * (f - e))
        return [];
    if (0 < c)
        for (a = e; a < f; a += c)
            d.push(a);
    else
        for (a = e; a > f; a += c)
            d.push(a);
    return d
}
;
JSQEXUtilities.JSQEX_array.repeat = function(a, b) {
    for (var c = [], d = 0; d < b; d++)
        c[d] = a;
    return c
}
;
JSQEXUtilities.JSQEX_array.flatten = function(a) {
    for (var b = [], c = 0; c < arguments.length; c++) {
        var d = arguments[c];
        if (JSQEXUtilities.JSQEX_isArray(d))
            for (var e = 0; e < d.length; e += 8192)
                for (var f = JSQEXUtilities.JSQEX_array.slice(d, e, e + 8192), f = JSQEXUtilities.JSQEX_array.flatten.apply(null , f), g = 0; g < f.length; g++)
                    b.push(f[g]);
        else
            b.push(d)
    }
    return b
}
;
JSQEXUtilities.JSQEX_array.rotate = function(a, b) {
    a.length && (b %= a.length,
            0 < b ? JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : 0 > b && JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
    return a
}
;
JSQEXUtilities.JSQEX_array.moveItem = function(a, b, c) {

    b = JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_.splice.call(a, b, 1);
    JSQEXUtilities.JSQEX_array.ARRAY_PROTOTYPE_.splice.call(a, c, 0, b[0])
}
;
JSQEXUtilities.JSQEX_array.zip = function(a) {
    if (!arguments.length)
        return [];
    for (var b = [], c = 0; ; c++) {
        for (var d = [], e = 0; e < arguments.length; e++) {
            var f = arguments[e];
            if (c >= f.length)
                return b;
            d.push(f[c])
        }
        b.push(d)
    }
}
;
JSQEXUtilities.JSQEX_array.shuffle = function(a, b) {
    for (var c = b || Math.random, d = a.length - 1; 0 < d; d--) {
        var e = Math.floor(c() * (d + 1))
            , f = a[d];
        a[d] = a[e];
        a[e] = f
    }
}
;
JSQEXUtilities.JSQEX_array.copyByIndex = function(a, b) {
    var c = [];
    JSQEXUtilities.JSQEX_array.forEach(b, function(b) {
        c.push(a[b])
    });
    return c
}
;

JSQEXUtilities.JSQEX_Collision_AABBIntersect = function() {
    var a = function(a, c) {
            var d = a.clone();
            d.left -= c;
            d.top -= c;
            d.width += 2 * c;
            d.height += 2 * c;
            return d
        }
        ;
    return function(b, c, d) {
        d = d || 0;
        return JSQEXMathematics.JSQEX_Rect.intersects(a(b, d), a(c, d))
    }
}();
/*SAT Plugin*/
function v() {
    function c(b, d) {
        this.x = b || 0;
        this.y = d || 0
    }
    function m(b, d) {
        this.pos = b || new c;
        this.points = d || [];
        this.recalc()
    }
    function y(b, d, a) {
        this.pos = b || new c;
        this.w = d || 0;
        this.h = a || 0
    }
    function w() {
        this.b = this.a = null ;
        this.overlapN = new c;
        this.overlapV = new c;
        this.clear()
    }
    function z(b, d, a) {
        for (var k = Number.MAX_VALUE, c = -Number.MAX_VALUE, h = b.length, e = 0; e < h; e++) {
            var f = b[e].c(d);
            f < k && (k = f);
            f > c && (c = f)
        }
        a[0] = k;
        a[1] = c
    }
    function A(b, d, a, k, c, h) {
        var l = q.pop()
            , f = q.pop();
        b = e.pop().copy(d).sub(b);
        d = b.c(c);
        z(a, c, l);
        z(k, c,
            f);
        f[0] += d;
        f[1] += d;
        if (l[0] > f[1] || f[0] > l[1])
            return e.push(b),
                q.push(l),
                q.push(f),
                !0;
        h && (a = 0,
                l[0] < f[0] ? (h.aInB = !1,
                l[1] < f[1] ? (a = l[1] - f[0],
            h.bInA = !1) : (a = l[1] - f[0],
            k = f[1] - l[0],
            a = a < k ? a : -k)) : (h.bInA = !1,
                l[1] > f[1] ? (a = l[0] - f[1],
            h.aInB = !1) : (a = l[1] - f[0],
            k = f[1] - l[0],
            a = a < k ? a : -k)),
            k = Math.abs(a),
            k < h.overlap && (h.overlap = k,
            h.overlapN.copy(c),
            0 > a && h.overlapN.reverse()));
        e.push(b);
        q.push(l);
        q.push(f);
        return !1
    }
    function x(b, d) {
        var a = b.d()
            , c = d.c(b);
        return 0 > c ? -1 : c > a ? 1 : 0
    }
    function B(b, d, a) {
        for (var c = e.pop().copy(d.pos).sub(b.pos),
                 t = d.r, h = t * t, l = b.points, f = l.length, g = e.pop(), p = e.pop(), m = 0; m < f; m++) {
            var s = m === f - 1 ? 0 : m + 1
                , q = 0 === m ? f - 1 : m - 1
                , u = 0
                , r = null ;
            g.copy(b.edges[m]);
            p.copy(c).sub(l[m]);
            a && p.d() > h && (a.aInB = !1);
            var n = x(g, p);
            if (-1 === n) {
                g.copy(b.edges[q]);
                s = e.pop().copy(c).sub(l[q]);
                n = x(g, s);
                if (1 === n) {
                    n = p.e();
                    if (n > t)
                        return e.push(c),
                            e.push(g),
                            e.push(p),
                            e.push(s),
                            !1;
                    a && (a.bInA = !1,
                        r = p.normalize(),
                        u = t - n)
                }
                e.push(s)
            } else if (1 === n) {
                if (g.copy(b.edges[s]),
                    p.copy(c).sub(l[s]),
                    n = x(g, p),
                    -1 === n) {
                    n = p.e();
                    if (n > t)
                        return e.push(c),
                            e.push(g),
                            e.push(p),
                            !1;
                    a && (a.bInA = !1,
                        r = p.normalize(),
                        u = t - n)
                }
            } else {
                s = g.f().normalize();
                n = p.c(s);
                q = Math.abs(n);
                if (0 < n && q > t)
                    return e.push(c),
                        e.push(s),
                        e.push(p),
                        !1;
                a && (r = s,
                    u = t - n,
                    0 <= n || u < 2 * t) && (a.bInA = !1)
            }
            r && a && Math.abs(u) < Math.abs(a.overlap) && (a.overlap = u,
                a.overlapN.copy(r))
        }
        a && (a.a = b,
            a.b = d,
            a.overlapV.copy(a.overlapN).scale(a.overlap));
        e.push(c);
        e.push(g);
        e.push(p);
        return !0
    }
    var g = {};
    g.Vector = c;
    g.V = c;
    c.prototype.copy = c.prototype.copy = function(b) {
        this.x = b.x;
        this.y = b.y;
        return this
    }
    ;
    c.prototype.perp = c.prototype.f = function() {
        var b =
            this.x;
        this.x = this.y;
        this.y = -b;
        return this
    }
    ;
    c.prototype.rotate = c.prototype.rotate = function(b) {
        var d = this.x
            , a = this.y;
        this.x = d * Math.cos(b) - a * Math.sin(b);
        this.y = d * Math.sin(b) + a * Math.cos(b);
        return this
    }
    ;
    c.prototype.reverse = c.prototype.reverse = function() {
        this.x = -this.x;
        this.y = -this.y;
        return this
    }
    ;
    c.prototype.normalize = c.prototype.normalize = function() {
        var b = this.e();
        0 < b && (this.x /= b,
            this.y /= b);
        return this
    }
    ;
    c.prototype.add = c.prototype.add = function(b) {
        this.x += b.x;
        this.y += b.y;
        return this
    }
    ;
    c.prototype.sub = c.prototype.sub =
        function(b) {
            this.x -= b.x;
            this.y -= b.y;
            return this
        }
    ;
    c.prototype.scale = c.prototype.scale = function(b, d) {
        this.x *= b;
        this.y *= d || b;
        return this
    }
    ;
    c.prototype.project = c.prototype.g = function(b) {
        var d = this.c(b) / b.d();
        this.x = d * b.x;
        this.y = d * b.y;
        return this
    }
    ;
    c.prototype.projectN = c.prototype.i = function(b) {
        var d = this.c(b);
        this.x = d * b.x;
        this.y = d * b.y;
        return this
    }
    ;
    c.prototype.reflect = function(b) {
        var d = this.x
            , a = this.y;
        this.g(b).scale(2);
        this.x -= d;
        this.y -= a;
        return this
    }
    ;
    c.prototype.reflectN = function(b) {
        var d = this.x
            , a = this.y;
        this.i(b).scale(2);
        this.x -= d;
        this.y -= a;
        return this
    }
    ;
    c.prototype.dot = c.prototype.c = function(b) {
        return this.x * b.x + this.y * b.y
    }
    ;
    c.prototype.len2 = c.prototype.d = function() {
        return this.c(this)
    }
    ;
    c.prototype.len = c.prototype.e = function() {
        return Math.sqrt(this.d())
    }
    ;
    g.Circle = function(b, d) {
        this.pos = b || new c;
        this.r = d || 0
    }
    ;
    g.Polygon = m;
    m.prototype.recalc = m.prototype.recalc = function() {
        this.edges = [];
        this.normals = [];
        for (var b = this.points, d = b.length, a = 0; a < d; a++) {
            var k = b[a]
                , k = (new c).copy(a < d - 1 ? b[a + 1] : b[0]).sub(k)
                , e =
                    (new c).copy(k).f().normalize();
            this.edges.push(k);
            this.normals.push(e)
        }
        return this
    }
    ;
    m.prototype.rotate = m.prototype.rotate = function(b) {
        var d, a = this.points, c = this.edges, e = this.normals, h = a.length;
        for (d = 0; d < h; d++)
            a[d].rotate(b),
                c[d].rotate(b),
                e[d].rotate(b);
        return this
    }
    ;
    m.prototype.translate = m.prototype.translate = function(b, d) {
        var a, c = this.points, e = c.length;
        for (a = 0; a < e; a++)
            c[a].x += b,
                c[a].y += d;
        return this
    }
    ;
    g.Box = y;
    y.prototype.toPolygon = function() {
        var b = this.pos
            , d = this.w
            , a = this.h;
        return new m(new c(b.x,
            b.y),[new c, new c(d,0), new c(d,a), new c(0,a)])
    }
    ;
    g.Response = w;
    w.prototype.clear = w.prototype.clear = function() {
        this.bInA = this.aInB = !0;
        this.overlap = Number.MAX_VALUE;
        return this
    }
    ;
    for (var e = [], r = 0; 10 > r; r++)
        e.push(new c);
    for (var q = [], r = 0; 5 > r; r++)
        q.push([]);
    g.testCircleCircle = function(b, c, a) {
        var k = e.pop().copy(c.pos).sub(b.pos)
            , g = b.r + c.r
            , h = k.d();
        if (h > g * g)
            return e.push(k),
                !1;
        a && (h = Math.sqrt(h),
            a.a = b,
            a.b = c,
            a.overlap = g - h,
            a.overlapN.copy(k.normalize()),
            a.overlapV.copy(k).scale(a.overlap),
            a.aInB = b.r <= c.r && h <=
                c.r - b.r,
            a.bInA = c.r <= b.r && h <= b.r - c.r);
        e.push(k);
        return !0
    }
    ;
    g.testPolygonCircle = B;
    g.testCirclePolygon = function(b, c, a) {
        if ((b = B(c, b, a)) && a) {
            c = a.a;
            var e = a.aInB;
            a.overlapN.reverse();
            a.overlapV.reverse();
            a.a = a.b;
            a.b = c;
            a.aInB = a.bInA;
            a.bInA = e
        }
        return b
    }
    ;
    g.JSQEX_testPolygonPolygon = function(b, c, a) {
        for (var e = b.points, g = e.length, h = c.points, l = h.length, f = 0; f < g; f++)
            if (A(b.pos, c.pos, e, h, b.normals[f], a))
                return !1;
        for (f = 0; f < l; f++)
            if (A(b.pos, c.pos, e, h, c.normals[f], a))
                return !1;
        a && (a.a = b,
            a.b = c,
            a.overlapV.copy(a.overlapN).scale(a.overlap));
        return !0
    }
    ;
    return g
}
"function" === typeof define && define.amd ? define(v) : "object" === typeof exports ? module.exports = v() : this.JSQEX_SAT = v();

/**SAT Plugin**/

JSQEXUtilities.JSQEX_Collision_ClipType = {
    JSQEX_union: 0,
    JSQEX_diff: 1,
    JSQEX_inter: 2,
    JSQEX_xor: 3
};
Object.freeze(JSQEXUtilities.JSQEX_Collision_ClipType);
JSQEXUtilities.JSQEX_Collision_PolyFillType = {
    JSQEX_evenOdd: 0,
    JSQEX_nonZero: 1,
    JSQEX_positive: 2,
    JSQEX_negative: 3
};
Object.freeze(JSQEXUtilities.JSQEX_Collision_PolyFillType);
JSQEXUtilities.JSQEX_Collision_JoinType = {
    JSQEX_miter: 0,
    JSQEX_square: 1,
    JSQEX_round: 2
};
Object.freeze(JSQEXUtilities.JSQEX_Collision_JoinType);
JSQEXUtilities.JSQEX_Collision_EndType = {
    JSQEX_openSquare: 0,
    JSQEX_openRound: 1,
    JSQEX_openButt: 2,
    JSQEX_closedLine: 3,
    JSQEX_closedPolygon: 4
};
Object.freeze(JSQEXUtilities.JSQEX_Collision_EndType);

JSQEXUtilities.JSQEX_Collision_OutlineIntersect = function(a, b, c) {

    if (!Array.isArray(a) || 3 > a.length || !Array.isArray(b) || 3 > b.length)
        return !1;
    a = a.map(function(a) {
        return new JSQEX_SAT.Vector(a.x,a.y)
    });
    var d = b.map(function(a) {
        return new JSQEX_SAT.Vector(a.x,a.y)
    });
    b = new JSQEX_SAT.Response;
    a = JSQEX_SAT.JSQEX_testPolygonPolygon(new JSQEX_SAT.Polygon(void 0,a), new JSQEX_SAT.Polygon(void 0,d), b);
    c && JSQEXUtilities.JSQEX_object_extend(c,
        b);
    return a
};

JSQEXUtilities.JSQEX_Collision_ClipPolygon = function(a, b, c) {

    if (!b || 0 === b.length)
        return a;
    var d = function(a) {
            return a.map(function(a) {
                return a.map(function(a) {
                    return {
                        X: a.x,
                        Y: a.y
                    }
                })
            })
        }
        ;
    a = d(a);
    b = d(b);
    var e = function(a) {
            var b = JSQEXUtilities.JSQEX_Collision_PolyFillType;
            switch (a) {
                case b.JSQEX_evenOdd:
                    return ClipperLib.PolyFillType.pftEvenOdd;
                case b.JSQEX_nonZero:
                    return ClipperLib.PolyFillType.pftNonZero;
                case b.JSQEX_positive:
                    return ClipperLib.PolyFillType.pftPositive;
                case b.JSQEX_negative:
                    return ClipperLib.PolyFillType.pftNegative;
                default:
                    return ClipperLib.PolyFillType.pftNonZero
            }
        }
        , f = function(a) {
            var b = JSQEXUtilities.JSQEX_Collision_ClipType;
            switch (a) {
                case b.JSQEX_union:
                    return ClipperLib.ClipType.ctUnion;
                case b.JSQEX_diff:
                    return ClipperLib.ClipType.ctDifference;
                case b.JSQEX_inter:
                    return ClipperLib.ClipType.ctIntersection;
                case b.JSQEX_xor:
                    return ClipperLib.ClipType.ctXor;
                default:
                    return ClipperLib.ClipType.ctIntersection
            }
        }
        ;
    ClipperLib.JS.ScaleUpPaths(a, 1E6);
    ClipperLib.JS.ScaleUpPaths(b, 1E6);
    var d = new ClipperLib.Clipper
        , g = !0;
    c && void 0 !== c.closed && (g = c.closed);
    d.AddPaths(a,
        ClipperLib.PolyType.ptSubject, g);
    d.AddPaths(b, ClipperLib.PolyType.ptClip, !0);
    b = a = ClipperLib.PolyFillType.pftNonZero;
    var h = ClipperLib.ClipType.ctIntersection;
    c && (void 0 !== c.JSQEX_subject_fillType && (a = e(c.JSQEX_subject_fillType)),
        void 0 !== c.JSQEX_clip_fillType && (b = e(c.JSQEX_clip_fillType)),
        void 0 !== c.JSQEX_operation && (h = f(c.JSQEX_operation)));
    if (g) {
        var m = new ClipperLib.Paths;
        d.Execute(h, m, a, b)
    } else
        c = new ClipperLib.PolyTree,
            d.Execute(h, c, a, b),
            c = ClipperLib.JS.PolyTreeToExPolygons(c),
            m = [],
            c.forEach(function(a) {
                m.push(a.outer);
                m = m.concat(a.holes)
            });
    c = [];
    for (var i = 0; i < m.length; i++) {
        d = [];
        for (var j = 0; j < m[i].length; j++)
            d.push({
                x: m[i][j].X / 1E6,
                y: m[i][j].Y / 1E6
            });
        c.push(d)
    }
    return c
}
;
JSQEXUtilities.JSQEX_Collision_OffsetPolygon = function(a, b, c) {

    if (!a || 0 === a.length)
        return [];
    var d = function(a) {
            var b = JSQEXUtilities.JSQEX_Collision_JoinType;
            switch (a) {
                case b.JSQEX_miter:
                    return ClipperLib.JoinType.jtMiter;
                case b.JSQEX_square:
                    return ClipperLib.JoinType.jtSquare;
                case b.JSQEX_round:
                    return ClipperLib.JoinType.jtRound;
                default:
                    return ClipperLib.JoinType.jtMiter
            }
        }
        , e = function(a) {
            var b = JSQEXUtilities.JSQEX_Collision_EndType;
            switch (a) {
                case b.JSQEX_openSquare:
                    return ClipperLib.EndType.etOpenSquare;
                case b.JSQEX_openRound:
                    return ClipperLib.EndType.etOpenRound;
                case b.JSQEX_openButt:
                    return ClipperLib.EndType.etOpenButt;
                case b.JSQEX_closedLine:
                    return ClipperLib.EndType.etClosedLine;
                case b.JSQEX_closedPolygon:
                    return ClipperLib.EndType.etClosedPolygon;
                default:
                    return ClipperLib.EndType.etClosedPolygon
            }
        }
        ;
    a = function(a) {
        return a.map(function(a) {
            return a.map(function(a) {
                return {
                    X: a.x,
                    Y: a.y
                }
            })
        })
    }(a);
    ClipperLib.JS.ScaleUpPaths(a, 1E6);
    var f = 2
        , g = .25
        , h = ClipperLib.JoinType.jtMiter
        , m = ClipperLib.EndType.etClosedPolygon;
    c && (void 0 !== c.JSQEX_miterLimit &&
        (f = 1E6 * c.JSQEX_miterLimit),
        void 0 !== c.JSQEX_arcTolerance && (g = 1E6 * c.JSQEX_arcTolerance),
        void 0 !== c.JSQEX_joinType && (h = d(c.JSQEX_joinType)),
        void 0 !== c.JSQEX_endType && (m = e(c.JSQEX_endType)));
    c = new ClipperLib.ClipperOffset(f,g);
    c.AddPaths(a, h, m);
    b *= 1E6;
    a = new ClipperLib.Paths;
    c.Execute(a, b);
    b = [];
    for (var i = 0; i < a.length; i++) {
        h = [];
        for (j = 0; j < a[i].length; j++)
            h.push({
                x: a[i][j].X / 1E6,
                y: a[i][j].Y / 1E6
            });
        b.push(h)
    }
    return b
}
;
JSQEXUtilities.JSQEX_Collision_SimplifyPolygons = function(a) {

    a = function(a) {
        return a.map(function(a) {
            return a.map(function(a) {
                return {
                    X: a.x,
                    Y: a.y
                }
            })
        })
    }(a);
    ClipperLib.JS.ScaleUpPaths(a, 1E6);
    return ClipperLib.Clipper.SimplifyPolygons(a, ClipperLib.PolyFillType.pftEvenOdd).map(function(a) {
        return a.map(function(a) {
            return {
                x: a.X / 1E6,
                y: a.Y / 1E6
            }
        })
    })
}
;
JSQEXUtilities.JSQEX_Collision_Orientation = function(a) {
    a = function(a) {
        return a.map(function(a) {
            return {
                X: a.x,
                Y: a.y
            }
        })
    }(a);
    return ClipperLib.Clipper.Orientation(a)
}
;

JSQEXUtilities.JSQEX_dispatchEvent = function( eventName, obj ) {
    var cevent = document.createEvent('Events');
    cevent.initEvent(eventName, true, false);
    if ( obj ) {
        var data = {
            JSQEX_EventObj: obj
        };

    }
    else data = {};
    cevent.dataType = 'json';
    cevent.data = data;
    document.dispatchEvent(cevent);
};

JSQEXUtilities.JSQEX_Flags = {};

JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag = {
    JSQEX_ChildRemoved: "JSQEX_ChildRemoved",
    JSQEX_ChildAdded: "JSQEX_ChildAdded",
    JSQEX_FieldChanged: "JSQEX_FieldChanged",
    JSQEX_NeedUpdate: "JSQEX_NeedUpdate",
    JSQEX_StartDrawQueue: "JSQEX_StartDrawQueue",
    JSQEX_waitToUpdate: "JSQEX_waitToUpdate",
    JSQEX_clearUpdate: "JSQEX_clearUpdate",
};
