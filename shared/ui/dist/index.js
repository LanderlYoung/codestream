'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.6' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

_core.inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var _library = false;

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});
});

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var f$1 = _wks;

var _wksExt = {
	f: f$1
};

var defineProperty = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$2 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$2
};

var f$3 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$3
};

// all enumerable object keys, includes symbols



var _enumKeys = function (it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$4
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
};

var _objectGopnExt = {
	f: f$5
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$6
};

// ECMAScript 6 symbols shim





var META = _meta.KEY;



















var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto = Object[PROTOTYPE$2];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$1(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!_isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
_export(_export.S, 'Object', { create: _objectCreate });

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperties: _objectDps });

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

var $getOwnPropertyDescriptor$1 = _objectGopd.f;

_objectSap('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
  };
});

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto$1 = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto$1 : null;
};

// 19.1.2.9 Object.getPrototypeOf(O)



_objectSap('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return _objectGpo(_toObject(it));
  };
});

// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

// 19.1.2.7 Object.getOwnPropertyNames(O)
_objectSap('getOwnPropertyNames', function () {
  return _objectGopnExt.f;
});

// 19.1.2.5 Object.freeze(O)

var meta = _meta.onFreeze;

_objectSap('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
  };
});

// 19.1.2.17 Object.seal(O)

var meta$1 = _meta.onFreeze;

_objectSap('seal', function ($seal) {
  return function seal(it) {
    return $seal && _isObject(it) ? $seal(meta$1(it)) : it;
  };
});

// 19.1.2.15 Object.preventExtensions(O)

var meta$2 = _meta.onFreeze;

_objectSap('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && _isObject(it) ? $preventExtensions(meta$2(it)) : it;
  };
});

// 19.1.2.12 Object.isFrozen(O)


_objectSap('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return _isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

// 19.1.2.13 Object.isSealed(O)


_objectSap('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return _isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

// 19.1.2.11 Object.isExtensible(O)


_objectSap('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return _isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

// 7.2.9 SameValue(x, y)
var _sameValue = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

// 19.1.3.10 Object.is(value1, value2)

_export(_export.S, 'Object', { is: _sameValue });

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

// 19.1.3.6 Object.prototype.toString()

var test = {};
test[_wks('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  _redefine(Object.prototype, 'toString', function toString() {
    return '[object ' + _classof(this) + ']';
  }, true);
}

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

var _bind = Function.bind || function bind(that /* , ...args */) {
  var fn = _aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
  };
  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)


_export(_export.P, 'Function', { bind: _bind });

var dP$2 = _objectDp.f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || _descriptors && dP$2(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

var HAS_INSTANCE = _wks('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) _objectDp.f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !_isObject(O)) return false;
  if (!_isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = _objectGpo(O)) if (this.prototype === O) return true;
  return false;
} });

var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var space = '[' + _stringWs + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = _fails(function () {
    return !!_stringWs[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  _export(_export.P + _export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(_defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

var _stringTrim = exporter;

var $parseInt = _global.parseInt;
var $trim = _stringTrim.trim;

var hex = /^[-+]?0[xX]/;

var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

// 18.2.5 parseInt(string, radix)
_export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

var $parseFloat = _global.parseFloat;
var $trim$1 = _stringTrim.trim;

var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim$1(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

// 18.2.4 parseFloat(string)
_export(_export.G + _export.F * (parseFloat != _parseFloat), { parseFloat: _parseFloat });

var setPrototypeOf = _setProto.set;
var _inheritIfRequired = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

var gOPN$2 = _objectGopn.f;
var gOPD$2 = _objectGopd.f;
var dP$3 = _objectDp.f;
var $trim$2 = _stringTrim.trim;
var NUMBER = 'Number';
var $Number = _global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = _toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim$2(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? _fails(function () { proto.valueOf.call(that); }) : _cof(that) != NUMBER)
        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = _descriptors ? gOPN$2(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j$1 = 0, key; keys.length > j$1; j$1++) {
    if (_has(Base, key = keys[j$1]) && !_has($Number, key)) {
      dP$3($Number, key, gOPD$2(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  _redefine(_global, NUMBER, $Number);
}

var _aNumberValue = function (it, msg) {
  if (typeof it != 'number' && _cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

var _stringRepeat = function repeat(count) {
  var str = String(_defined(this));
  var res = '';
  var n = _toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

var $toFixed = 1.0.toFixed;
var floor$1 = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor$1(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor$1(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + _stringRepeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

_export(_export.P + _export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !_fails(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = _aNumberValue(this, ERROR);
    var f = _toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + _stringRepeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + _stringRepeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

var $toPrecision = 1.0.toPrecision;

_export(_export.P + _export.F * (_fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !_fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = _aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

// 20.1.2.1 Number.EPSILON


_export(_export.S, 'Number', { EPSILON: Math.pow(2, -52) });

// 20.1.2.2 Number.isFinite(number)

var _isFinite = _global.isFinite;

_export(_export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

// 20.1.2.3 Number.isInteger(number)

var floor$2 = Math.floor;
var _isInteger = function isInteger(it) {
  return !_isObject(it) && isFinite(it) && floor$2(it) === it;
};

// 20.1.2.3 Number.isInteger(number)


_export(_export.S, 'Number', { isInteger: _isInteger });

// 20.1.2.4 Number.isNaN(number)


_export(_export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

// 20.1.2.5 Number.isSafeInteger(number)


var abs = Math.abs;

_export(_export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

// 20.1.2.6 Number.MAX_SAFE_INTEGER


_export(_export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

// 20.1.2.10 Number.MIN_SAFE_INTEGER


_export(_export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

// 20.1.2.12 Number.parseFloat(string)
_export(_export.S + _export.F * (Number.parseFloat != _parseFloat), 'Number', { parseFloat: _parseFloat });

// 20.1.2.13 Number.parseInt(string, radix)
_export(_export.S + _export.F * (Number.parseInt != _parseInt), 'Number', { parseInt: _parseInt });

// 20.2.2.20 Math.log1p(x)
var _mathLog1p = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

// 20.2.2.3 Math.acosh(x)


var sqrt = Math.sqrt;
var $acosh = Math.acosh;

_export(_export.S + _export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : _mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

// 20.2.2.5 Math.asinh(x)

var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
_export(_export.S + _export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

// 20.2.2.7 Math.atanh(x)

var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
_export(_export.S + _export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

// 20.2.2.28 Math.sign(x)
var _mathSign = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

// 20.2.2.9 Math.cbrt(x)



_export(_export.S, 'Math', {
  cbrt: function cbrt(x) {
    return _mathSign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

// 20.2.2.11 Math.clz32(x)


_export(_export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

// 20.2.2.12 Math.cosh(x)

var exp = Math.exp;

_export(_export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
var _mathExpm1 = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

// 20.2.2.14 Math.expm1(x)



_export(_export.S + _export.F * (_mathExpm1 != Math.expm1), 'Math', { expm1: _mathExpm1 });

// 20.2.2.16 Math.fround(x)

var pow$1 = Math.pow;
var EPSILON = pow$1(2, -52);
var EPSILON32 = pow$1(2, -23);
var MAX32 = pow$1(2, 127) * (2 - EPSILON32);
var MIN32 = pow$1(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

var _mathFround = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = _mathSign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

// 20.2.2.16 Math.fround(x)


_export(_export.S, 'Math', { fround: _mathFround });

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])

var abs$1 = Math.abs;

_export(_export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs$1(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

// 20.2.2.18 Math.imul(x, y)

var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
_export(_export.S + _export.F * _fails(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

// 20.2.2.21 Math.log10(x)


_export(_export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

// 20.2.2.20 Math.log1p(x)


_export(_export.S, 'Math', { log1p: _mathLog1p });

// 20.2.2.22 Math.log2(x)


_export(_export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

// 20.2.2.28 Math.sign(x)


_export(_export.S, 'Math', { sign: _mathSign });

// 20.2.2.30 Math.sinh(x)


var exp$1 = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
_export(_export.S + _export.F * _fails(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (_mathExpm1(x) - _mathExpm1(-x)) / 2
      : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
  }
});

// 20.2.2.33 Math.tanh(x)


var exp$2 = Math.exp;

_export(_export.S, 'Math', {
  tanh: function tanh(x) {
    var a = _mathExpm1(x = +x);
    var b = _mathExpm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
  }
});

// 20.2.2.34 Math.trunc(x)


_export(_export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
_export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (_toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

_export(_export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = _toIobject(callSite.raw);
    var len = _toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

// 21.1.3.25 String.prototype.trim()
_stringTrim('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _iterators = {};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if (BUGGY || VALUES_BUG || !proto[ITERATOR]) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

var $at$1 = _stringAt(false);
_export(_export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at$1(this, pos);
  }
});

// 7.2.8 IsRegExp(argument)


var MATCH = _wks('match');
var _isRegexp = function (it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
};

// helper for String#{startsWith, endsWith, includes}



var _stringContext = function (that, searchString, NAME) {
  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(_defined(that));
};

var MATCH$1 = _wks('match');
var _failsIsRegexp = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH$1] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

_export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = _stringContext(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = _toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

var INCLUDES = 'includes';

_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~_stringContext(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_export(_export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: _stringRepeat
});

var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = _stringContext(this, searchString, STARTS_WITH);
    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(_defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
var _stringHtml = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  _export(_export.P + _export.F * _fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

// B.2.3.2 String.prototype.anchor(name)
_stringHtml('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

// B.2.3.3 String.prototype.big()
_stringHtml('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

// B.2.3.4 String.prototype.blink()
_stringHtml('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

// B.2.3.5 String.prototype.bold()
_stringHtml('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

// B.2.3.6 String.prototype.fixed()
_stringHtml('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

// B.2.3.7 String.prototype.fontcolor(color)
_stringHtml('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

// B.2.3.8 String.prototype.fontsize(size)
_stringHtml('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

// B.2.3.9 String.prototype.italics()
_stringHtml('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

// B.2.3.10 String.prototype.link(url)
_stringHtml('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

// B.2.3.11 String.prototype.small()
_stringHtml('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

// B.2.3.12 String.prototype.strike()
_stringHtml('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

// B.2.3.13 String.prototype.sub()
_stringHtml('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

// B.2.3.14 String.prototype.sup()
_stringHtml('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

// 20.3.3.1 / 15.9.4.4 Date.now()


_export(_export.S, 'Date', { now: function () { return new Date().getTime(); } });

_export(_export.P + _export.F * _fails(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = _toObject(this);
    var pv = _toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
var _dateToIsoString = (_fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !_fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()



// PhantomJS / old WebKit has a broken implementations
_export(_export.P + _export.F * (Date.prototype.toISOString !== _dateToIsoString), 'Date', {
  toISOString: _dateToIsoString
});

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime$1 = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  _redefine(DateProto, TO_STRING, function toString() {
    var value = getTime$1.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

var NUMBER$1 = 'number';

var _dateToPrimitive = function (hint) {
  if (hint !== 'string' && hint !== NUMBER$1 && hint !== 'default') throw TypeError('Incorrect hint');
  return _toPrimitive(_anObject(this), hint != NUMBER$1);
};

var TO_PRIMITIVE$1 = _wks('toPrimitive');
var proto$1 = Date.prototype;

if (!(TO_PRIMITIVE$1 in proto$1)) _hide(proto$1, TO_PRIMITIVE$1, _dateToPrimitive);

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


_export(_export.S, 'Array', { isArray: _isArray });

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$1 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

var ITERATOR$2 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function () { SAFE_CLOSING = true; };
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$3] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

// WebKit Array.of isn't generic
_export(_export.S + _export.F * _fails(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) _createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

var _strictMethod = function (method, arg) {
  return !!method && _fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

// 22.1.3.13 Array.prototype.join(separator)


var arrayJoin = [].join;

// fallback for not array-like strings
_export(_export.P + _export.F * (_iobject != Object || !_strictMethod(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(_toIobject(this), separator === undefined ? ',' : separator);
  }
});

var arraySlice$1 = [].slice;

// fallback for not array-like ES3 strings and DOM objects
_export(_export.P + _export.F * _fails(function () {
  if (_html) arraySlice$1.call(_html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = _toLength(this.length);
    var klass = _cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice$1.call(this, begin, end);
    var start = _toAbsoluteIndex(begin, len);
    var upTo = _toAbsoluteIndex(end, len);
    var size = _toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

var $sort = [].sort;
var test$1 = [1, 2, 3];

_export(_export.P + _export.F * (_fails(function () {
  // IE8-
  test$1.sort(undefined);
}) || !_fails(function () {
  // V8 bug
  test$1.sort(null);
  // Old WebKit
}) || !_strictMethod($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(_toObject(this))
      : $sort.call(_toObject(this), _aFunction(comparefn));
  }
});

var SPECIES = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

var $forEach = _arrayMethods(0);
var STRICT = _strictMethod([].forEach, true);

_export(_export.P + _export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

var $map = _arrayMethods(1);

_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

var $filter = _arrayMethods(2);

_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

var $some = _arrayMethods(3);

_export(_export.P + _export.F * !_strictMethod([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

var $every = _arrayMethods(4);

_export(_export.P + _export.F * !_strictMethod([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});

var _arrayReduce = function (that, callbackfn, aLen, memo, isRight) {
  _aFunction(callbackfn);
  var O = _toObject(that);
  var self = _iobject(O);
  var length = _toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

_export(_export.P + _export.F * !_strictMethod([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

_export(_export.P + _export.F * !_strictMethod([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

var $indexOf = _arrayIncludes(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

_export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

var $native$1 = [].lastIndexOf;
var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].lastIndexOf(1, -0) < 0;

_export(_export.P + _export.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO$1) return $native$1.apply(this, arguments) || 0;
    var O = _toIobject(this);
    var length = _toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, _toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});

var _arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = _toObject(this);
  var len = _toLength(O.length);
  var to = _toAbsoluteIndex(target, len);
  var from = _toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto$1 = Array.prototype;
if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
var _addToUnscopables = function (key) {
  ArrayProto$1[UNSCOPABLES][key] = true;
};

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


_export(_export.P, 'Array', { copyWithin: _arrayCopyWithin });

_addToUnscopables('copyWithin');

var _arrayFill = function fill(value /* , start = 0, end = @length */) {
  var O = _toObject(this);
  var length = _toLength(O.length);
  var aLen = arguments.length;
  var index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : _toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


_export(_export.P, 'Array', { fill: _arrayFill });

_addToUnscopables('fill');

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $find = _arrayMethods(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
_export(_export.P + _export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY);

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

var $find$1 = _arrayMethods(6);
var KEY$1 = 'findIndex';
var forced$1 = true;
// Shouldn't skip holes
if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
_export(_export.P + _export.F * forced$1, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY$1);

var SPECIES$1 = _wks('species');

var _setSpecies = function (KEY) {
  var C = _global[KEY];
  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
    configurable: true,
    get: function () { return this; }
  });
};

_setSpecies('Array');

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

// 21.2.5.3 get RegExp.prototype.flags

var _flags = function () {
  var that = _anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var dP$4 = _objectDp.f;
var gOPN$3 = _objectGopn.f;


var $RegExp = _global.RegExp;
var Base$1 = $RegExp;
var proto$2 = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (_descriptors && (!CORRECT_NEW || _fails(function () {
  re2[_wks('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = _isRegexp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : _inheritIfRequired(CORRECT_NEW
        ? new Base$1(piRE && !fiU ? p.source : p, f)
        : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
      , tiRE ? this : proto$2, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP$4($RegExp, key, {
      configurable: true,
      get: function () { return Base$1[key]; },
      set: function (it) { Base$1[key] = it; }
    });
  };
  for (var keys$1 = gOPN$3(Base$1), i = 0; keys$1.length > i;) proxy(keys$1[i++]);
  proto$2.constructor = $RegExp;
  $RegExp.prototype = proto$2;
  _redefine(_global, 'RegExp', $RegExp);
}

_setSpecies('RegExp');

// 21.2.5.3 get RegExp.prototype.flags()
if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
  configurable: true,
  get: _flags
});

var TO_STRING$1 = 'toString';
var $toString$1 = /./[TO_STRING$1];

var define = function (fn) {
  _redefine(RegExp.prototype, TO_STRING$1, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (_fails(function () { return $toString$1.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = _anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString$1.name != TO_STRING$1) {
  define(function toString() {
    return $toString$1.call(this);
  });
}

var _fixReWks = function (KEY, length, exec) {
  var SYMBOL = _wks(KEY);
  var fns = exec(_defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (_fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    _redefine(String.prototype, KEY, strfn);
    _hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

// @@match logic
_fixReWks('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

// @@replace logic
_fixReWks('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

// @@search logic
_fixReWks('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

// @@split logic
_fixReWks('split', 2, function (defined, SPLIT, $split) {
  var isRegExp = _isRegexp;
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
  var f = _ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = _iterCall(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)


var SPECIES$2 = _wks('species');
var _speciesConstructor = function (O, D) {
  var C = _anObject(O).constructor;
  var S;
  return C === undefined || (S = _anObject(C)[SPECIES$2]) == undefined ? D : _aFunction(S);
};

var process$1 = _global.process;
var setTask = _global.setImmediate;
var clearTask = _global.clearImmediate;
var MessageChannel = _global.MessageChannel;
var Dispatch = _global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (_cof(process$1) == 'process') {
    defer = function (id) {
      process$1.nextTick(_ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(_ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
    defer = function (id) {
      _global.postMessage(id + '', '*');
    };
    _global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
    defer = function (id) {
      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
        _html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};

var macrotask = _task.set;
var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
var process$2 = _global.process;
var Promise$1 = _global.Promise;
var isNode = _cof(process$2) == 'process';

var _microtask = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process$2.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process$2.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise$1.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(_global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

// 25.4.1.5 NewPromiseCapability(C)


function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = _aFunction(resolve);
  this.reject = _aFunction(reject);
}

var f$7 = function (C) {
  return new PromiseCapability(C);
};

var _newPromiseCapability = {
	f: f$7
};

var _perform = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

var navigator = _global.navigator;

var _userAgent = navigator && navigator.userAgent || '';

var _promiseResolve = function (C, x) {
  _anObject(C);
  if (_isObject(x) && x.constructor === C) return x;
  var promiseCapability = _newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var _redefineAll = function (target, src, safe) {
  for (var key in src) _redefine(target, key, src[key], safe);
  return target;
};

var task = _task.set;
var microtask = _microtask();




var PROMISE = 'Promise';
var TypeError$1 = _global.TypeError;
var process$3 = _global.process;
var versions = process$3 && process$3.versions;
var v8 = versions && versions.v8 || '';
var $Promise = _global[PROMISE];
var isNode$1 = _classof(process$3) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

var USE_NATIVE$1 = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && _userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(_global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = _perform(function () {
        if (isNode$1) {
          process$3.emit('unhandledRejection', value, promise);
        } else if (handler = _global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = _global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(_global, function () {
    var handler;
    if (isNode$1) {
      process$3.emit('rejectionHandled', promise);
    } else if (handler = _global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE$1) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    _anInstance(this, $Promise, PROMISE, '_h');
    _aFunction(executor);
    Internal.call(this);
    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode$1 ? process$3.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = _ctx($resolve, promise, 1);
    this.reject = _ctx($reject, promise, 1);
  };
  _newPromiseCapability.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: $Promise });
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * (!USE_NATIVE$1), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
  }
});
_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = _perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      _forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = _perform(function () {
      _forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

var _validateCollection = function (it, TYPE) {
  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

var dP$5 = _objectDp.f;









var fastKey = _meta.fastKey;

var SIZE = _descriptors ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

var _collectionStrong = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = _objectCreate(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = _validateCollection(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        _validateCollection(this, NAME);
        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(_validateCollection(this, NAME), key);
      }
    });
    if (_descriptors) dP$5(C.prototype, 'size', {
      get: function () {
        return _validateCollection(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    _iterDefine(C, NAME, function (iterated, kind) {
      this._t = _validateCollection(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return _iterStep(1);
      }
      // return step by kind
      if (kind == 'keys') return _iterStep(0, entry.k);
      if (kind == 'values') return _iterStep(0, entry.v);
      return _iterStep(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    _setSpecies(NAME);
  }
};

var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = _global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    _redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    _redefineAll(C.prototype, methods);
    _meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = _fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = _iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        _anInstance(target, C, NAME);
        var that = _inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  _setToStringTag(C, NAME);

  O[NAME] = C;
  _export(_export.G + _export.W + _export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

var MAP = 'Map';

// 23.1 Map Objects
var es6_map = _collection(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
  }
}, _collectionStrong, true);

var SET = 'Set';

// 23.2 Set Objects
var es6_set = _collection(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
  }
}, _collectionStrong);

var getWeak = _meta.getWeak;







var arrayFind = _arrayMethods(5);
var arrayFindIndex = _arrayMethods(6);
var id$1 = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

var _collectionWeak = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id$1++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!_isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
        return data && _has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!_isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
        return data && _has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(_anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

var es6_weakMap = createCommonjsModule(function (module) {
var each = _arrayMethods(0);







var WEAK_MAP = 'WeakMap';
var getWeak = _meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = _collectionWeak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (_isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

// IE11 WeakMap frozen keys fix
if (_fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
  _objectAssign(InternalMap.prototype, methods);
  _meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    _redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (_isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
});

var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
_collection(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
  }
}, _collectionWeak, false, true);

var TYPED = _uid('typed_array');
var VIEW = _uid('view');
var ABV = !!(_global.ArrayBuffer && _global.DataView);
var CONSTR = ABV;
var i$1 = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i$1 < l) {
  if (Typed = _global[TypedArrayConstructors[i$1++]]) {
    _hide(Typed.prototype, TYPED, true);
    _hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

var _typed = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

// https://tc39.github.io/ecma262/#sec-toindex


var _toIndex = function (it) {
  if (it === undefined) return 0;
  var number = _toInteger(it);
  var length = _toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

var _typedBuffer = createCommonjsModule(function (module, exports) {











var gOPN = _objectGopn.f;
var dP = _objectDp.f;


var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = _global[ARRAY_BUFFER];
var $DataView = _global[DATA_VIEW];
var Math = _global.Math;
var RangeError = _global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = _global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = _descriptors ? '_b' : BUFFER;
var $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
var $OFFSET = _descriptors ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = _toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = _toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!_typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = _toIndex(length);
    this._b = _arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    _anInstance(this, $DataView, DATA_VIEW);
    _anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = _toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (_descriptors) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  _redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!_fails(function () {
    $ArrayBuffer(1);
  }) || !_fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || _fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      _anInstance(this, $ArrayBuffer);
      return new BaseBuffer(_toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) _redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
_setToStringTag($ArrayBuffer, ARRAY_BUFFER);
_setToStringTag($DataView, DATA_VIEW);
_hide($DataView[PROTOTYPE], _typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
});

var ArrayBuffer = _global.ArrayBuffer;

var $ArrayBuffer = _typedBuffer.ArrayBuffer;
var $DataView = _typedBuffer.DataView;
var $isView = _typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW$1 = _typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

_export(_export.G + _export.W + _export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

_export(_export.S + _export.F * !_typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || _isObject(it) && VIEW$1 in it;
  }
});

_export(_export.P + _export.U + _export.F * _fails(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(_anObject(this), start); // FF fix
    var len = _anObject(this).byteLength;
    var first = _toAbsoluteIndex(start, len);
    var final = _toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (_speciesConstructor(this, $ArrayBuffer))(_toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

_setSpecies(ARRAY_BUFFER);

_export(_export.G + _export.W + _export.F * !_typed.ABV, {
  DataView: _typedBuffer.DataView
});

var _typedArray = createCommonjsModule(function (module) {
if (_descriptors) {
  var global = _global;
  var fails = _fails;
  var $export = _export;
  var $typed = _typed;
  var $buffer = _typedBuffer;
  var ctx = _ctx;
  var anInstance = _anInstance;
  var propertyDesc = _propertyDesc;
  var hide = _hide;
  var redefineAll = _redefineAll;
  var toInteger = _toInteger;
  var toLength = _toLength;
  var toIndex = _toIndex;
  var toAbsoluteIndex = _toAbsoluteIndex;
  var toPrimitive = _toPrimitive;
  var has = _has;
  var classof = _classof;
  var isObject = _isObject;
  var toObject = _toObject;
  var isArrayIter = _isArrayIter;
  var create = _objectCreate;
  var getPrototypeOf = _objectGpo;
  var gOPN = _objectGopn.f;
  var getIterFn = core_getIteratorMethod;
  var uid = _uid;
  var wks = _wks;
  var createArrayMethod = _arrayMethods;
  var createArrayIncludes = _arrayIncludes;
  var speciesConstructor = _speciesConstructor;
  var ArrayIterators = es6_array_iterator;
  var Iterators = _iterators;
  var $iterDetect = _iterDetect;
  var setSpecies = _setSpecies;
  var arrayFill = _arrayFill;
  var arrayCopyWithin = _arrayCopyWithin;
  var $DP = _objectDp;
  var $GOPD = _objectGopd;
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };
});

_typedArray('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

_typedArray('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)



var rApply = (_global.Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
_export(_export.S + _export.F * !_fails(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = _aFunction(target);
    var L = _anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])







var rConstruct = (_global.Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = _fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !_fails(function () {
  rConstruct(function () { /* empty */ });
});

_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    _aFunction(Target);
    _anObject(args);
    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (_bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return _isObject(result) ? result : instance;
  }
});

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)





// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
_export(_export.S + _export.F * _fails(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(_objectDp.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    _anObject(target);
    propertyKey = _toPrimitive(propertyKey, true);
    _anObject(attributes);
    try {
      _objectDp.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

// 26.1.4 Reflect.deleteProperty(target, propertyKey)

var gOPD$3 = _objectGopd.f;


_export(_export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD$3(_anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

// 26.1.5 Reflect.enumerate(target)


var Enumerate = function (iterated) {
  this._t = _anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
_iterCreate(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

_export(_export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

// 26.1.6 Reflect.get(target, propertyKey [, receiver])







function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (_anObject(target) === receiver) return target[propertyKey];
  if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
}

_export(_export.S, 'Reflect', { get: get });

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)




_export(_export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return _objectGopd.f(_anObject(target), propertyKey);
  }
});

// 26.1.8 Reflect.getPrototypeOf(target)




_export(_export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return _objectGpo(_anObject(target));
  }
});

// 26.1.9 Reflect.has(target, propertyKey)


_export(_export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

// 26.1.10 Reflect.isExtensible(target)


var $isExtensible = Object.isExtensible;

_export(_export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    _anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

// all object keys, includes non-enumerable and symbols



var Reflect$1 = _global.Reflect;
var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
  var keys = _objectGopn.f(_anObject(it));
  var getSymbols = _objectGops.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

// 26.1.11 Reflect.ownKeys(target)


_export(_export.S, 'Reflect', { ownKeys: _ownKeys });

// 26.1.12 Reflect.preventExtensions(target)


var $preventExtensions = Object.preventExtensions;

_export(_export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    _anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])









function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = _objectGopd.f(_anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (_isObject(proto = _objectGpo(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = _propertyDesc(0);
  }
  if (_has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !_isObject(receiver)) return false;
    if (existingDescriptor = _objectGopd.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      _objectDp.f(receiver, propertyKey, existingDescriptor);
    } else _objectDp.f(receiver, propertyKey, _propertyDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

_export(_export.S, 'Reflect', { set: set });

// 26.1.14 Reflect.setPrototypeOf(target, proto)



if (_setProto) _export(_export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    _setProto.check(target, proto);
    try {
      _setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

// https://github.com/tc39/Array.prototype.includes

var $includes = _arrayIncludes(true);

_export(_export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_addToUnscopables('includes');

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray




var IS_CONCAT_SPREADABLE = _wks('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? _ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (_isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : _isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, _toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

var _flattenIntoArray = flattenIntoArray;

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap







_export(_export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = _toObject(this);
    var sourceLen, A;
    _aFunction(callbackfn);
    sourceLen = _toLength(O.length);
    A = _arraySpeciesCreate(O, 0);
    _flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

_addToUnscopables('flatMap');

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten







_export(_export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = _toObject(this);
    var sourceLen = _toLength(O.length);
    var A = _arraySpeciesCreate(O, 0);
    _flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : _toInteger(depthArg));
    return A;
  }
});

_addToUnscopables('flatten');

// https://github.com/mathiasbynens/String.prototype.at

var $at$2 = _stringAt(true);

_export(_export.P, 'String', {
  at: function at(pos) {
    return $at$2(this, pos);
  }
});

// https://github.com/tc39/proposal-string-pad-start-end




var _stringPad = function (that, maxLength, fillString, left) {
  var S = String(_defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = _toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

// https://github.com/tc39/proposal-string-pad-start-end




// https://github.com/zloirock/core-js/issues/280
_export(_export.P + _export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(_userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

// https://github.com/tc39/proposal-string-pad-start-end




// https://github.com/zloirock/core-js/issues/280
_export(_export.P + _export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(_userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
_stringTrim('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
_stringTrim('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

// https://tc39.github.io/String.prototype.matchAll/





var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

_iterCreate($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

_export(_export.P, 'String', {
  matchAll: function matchAll(regexp) {
    _defined(this);
    if (!_isRegexp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : _flags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = _toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

_wksDefine('asyncIterator');

_wksDefine('observable');

// https://github.com/tc39/proposal-object-getownpropertydescriptors






_export(_export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = _toIobject(object);
    var getDesc = _objectGopd.f;
    var keys = _ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) _createProperty(result, key, desc);
    }
    return result;
  }
});

var isEnum$1 = _objectPie.f;
var _objectToArray = function (isEntries) {
  return function (it) {
    var O = _toIobject(it);
    var keys = _objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum$1.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

// https://github.com/tc39/proposal-object-values-entries

var $values = _objectToArray(false);

_export(_export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

// https://github.com/tc39/proposal-object-values-entries

var $entries = _objectToArray(true);

_export(_export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

// Forced replacement prototype accessors methods
var _objectForcedPam = !_fails(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete _global[K];
});

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
_descriptors && _export(_export.P + _objectForcedPam, 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    _objectDp.f(_toObject(this), P, { get: _aFunction(getter), enumerable: true, configurable: true });
  }
});

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
_descriptors && _export(_export.P + _objectForcedPam, 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    _objectDp.f(_toObject(this), P, { set: _aFunction(setter), enumerable: true, configurable: true });
  }
});

var getOwnPropertyDescriptor = _objectGopd.f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
_descriptors && _export(_export.P + _objectForcedPam, 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = _toObject(this);
    var K = _toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = _objectGpo(O));
  }
});

var getOwnPropertyDescriptor$1 = _objectGopd.f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
_descriptors && _export(_export.P + _objectForcedPam, 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = _toObject(this);
    var K = _toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor$1(O, K)) return D.set;
    } while (O = _objectGpo(O));
  }
});

var _arrayFromIterable = function (iter, ITERATOR) {
  var result = [];
  _forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


var _collectionToJson = function (NAME) {
  return function toJSON() {
    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return _arrayFromIterable(this);
  };
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


_export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


_export(_export.P + _export.R, 'Set', { toJSON: _collectionToJson('Set') });

// https://tc39.github.io/proposal-setmap-offrom/


var _setCollectionOf = function (COLLECTION) {
  _export(_export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
_setCollectionOf('Map');

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
_setCollectionOf('Set');

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
_setCollectionOf('WeakMap');

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
_setCollectionOf('WeakSet');

// https://tc39.github.io/proposal-setmap-offrom/





var _setCollectionFrom = function (COLLECTION) {
  _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    _aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) _aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = _ctx(mapFn, arguments[2], 2);
      _forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      _forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
_setCollectionFrom('Map');

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
_setCollectionFrom('Set');

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
_setCollectionFrom('WeakMap');

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
_setCollectionFrom('WeakSet');

// https://github.com/tc39/proposal-global


_export(_export.G, { global: _global });

// https://github.com/tc39/proposal-global


_export(_export.S, 'System', { global: _global });

// https://github.com/ljharb/proposal-is-error



_export(_export.S, 'Error', {
  isError: function isError(it) {
    return _cof(it) === 'Error';
  }
});

// https://rwaldron.github.io/proposal-math-extensions/


_export(_export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

// https://rwaldron.github.io/proposal-math-extensions/


_export(_export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

// https://rwaldron.github.io/proposal-math-extensions/

var RAD_PER_DEG = 180 / Math.PI;

_export(_export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

// https://rwaldron.github.io/proposal-math-extensions/
var _mathScale = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

// https://rwaldron.github.io/proposal-math-extensions/




_export(_export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return _mathFround(_mathScale(x, inLow, inHigh, outLow, outHigh));
  }
});

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703


_export(_export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703


_export(_export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703


_export(_export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

// https://rwaldron.github.io/proposal-math-extensions/


_export(_export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

// https://rwaldron.github.io/proposal-math-extensions/

var DEG_PER_RAD = Math.PI / 180;

_export(_export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

// https://rwaldron.github.io/proposal-math-extensions/


_export(_export.S, 'Math', { scale: _mathScale });

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703


_export(_export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

// http://jfbastien.github.io/papers/Math.signbit.html


_export(_export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });

_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return _promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return _promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

// https://github.com/tc39/proposal-promise-try




_export(_export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = _newPromiseCapability.f(this);
  var result = _perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

var shared$1 = _shared('metadata');
var store = shared$1.store || (shared$1.store = new (es6_weakMap)());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new es6_map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new es6_map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp$3 = function (O) {
  _export(_export.S, 'Reflect', O);
};

var _metadata = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp$3
};

var toMetaKey$1 = _metadata.key;
var ordinaryDefineOwnMetadata$1 = _metadata.set;

_metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata$1(metadataKey, metadataValue, _anObject(target), toMetaKey$1(targetKey));
} });

var toMetaKey$2 = _metadata.key;
var getOrCreateMetadataMap$1 = _metadata.map;
var store$1 = _metadata.store;

_metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey$2(arguments[2]);
  var metadataMap = getOrCreateMetadataMap$1(_anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store$1.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store$1['delete'](target);
} });

var ordinaryHasOwnMetadata$1 = _metadata.has;
var ordinaryGetOwnMetadata$1 = _metadata.get;
var toMetaKey$3 = _metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata$1(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata$1(MetadataKey, O, P);
  var parent = _objectGpo(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

_metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$3(arguments[2]));
} });

var ordinaryOwnMetadataKeys$1 = _metadata.keys;
var toMetaKey$4 = _metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys$1(O, P);
  var parent = _objectGpo(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? _arrayFromIterable(new es6_set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

_metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(_anObject(target), arguments.length < 2 ? undefined : toMetaKey$4(arguments[1]));
} });

var ordinaryGetOwnMetadata$2 = _metadata.get;
var toMetaKey$5 = _metadata.key;

_metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata$2(metadataKey, _anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey$5(arguments[2]));
} });

var ordinaryOwnMetadataKeys$2 = _metadata.keys;
var toMetaKey$6 = _metadata.key;

_metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys$2(_anObject(target), arguments.length < 2 ? undefined : toMetaKey$6(arguments[1]));
} });

var ordinaryHasOwnMetadata$2 = _metadata.has;
var toMetaKey$7 = _metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata$2(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = _objectGpo(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

_metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$7(arguments[2]));
} });

var ordinaryHasOwnMetadata$3 = _metadata.has;
var toMetaKey$8 = _metadata.key;

_metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata$3(metadataKey, _anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey$8(arguments[2]));
} });

var toMetaKey$9 = _metadata.key;
var ordinaryDefineOwnMetadata$2 = _metadata.set;

_metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata$2(
      metadataKey, metadataValue,
      (targetKey !== undefined ? _anObject : _aFunction)(target),
      toMetaKey$9(targetKey)
    );
  };
} });

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask

var microtask$1 = _microtask();
var process$4 = _global.process;
var isNode$2 = _cof(process$4) == 'process';

_export(_export.G, {
  asap: function asap(fn) {
    var domain = isNode$2 && process$4.domain;
    microtask$1(domain ? domain.bind(fn) : fn);
  }
});

// https://github.com/zenparsing/es-observable



var microtask$2 = _microtask();
var OBSERVABLE = _wks('observable');






var RETURN = _forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : _aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  _anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else _aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = _redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = _redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  _anInstance(this, $Observable, 'Observable', '_f')._f = _aFunction(subscriber);
};

_redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (_core.Promise || _global.Promise)(function (resolve, reject) {
      _aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

_redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(_anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = _anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask$2(function () {
        if (!done) {
          try {
            if (_forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask$2(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

_hide($Observable.prototype, OBSERVABLE, function () { return this; });

_export(_export.G, { Observable: $Observable });

_setSpecies('Observable');

// ie9- setTimeout & setInterval additional parameters fix



var slice = [].slice;
var MSIE = /MSIE .\./.test(_userAgent); // <- dirty ie9- check
var wrap$1 = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
_export(_export.G + _export.B + _export.F * MSIE, {
  setTimeout: wrap$1(_global.setTimeout),
  setInterval: wrap$1(_global.setInterval)
});

_export(_export.G + _export.B, {
  setImmediate: _task.set,
  clearImmediate: _task.clear
});

var ITERATOR$4 = _wks('iterator');
var TO_STRING_TAG = _wks('toStringTag');
var ArrayValues = _iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = _objectKeys(DOMIterables), i$2 = 0; i$2 < collections.length; i$2++) {
  var NAME$1 = collections[i$2];
  var explicit = DOMIterables[NAME$1];
  var Collection = _global[NAME$1];
  var proto$3 = Collection && Collection.prototype;
  var key$1;
  if (proto$3) {
    if (!proto$3[ITERATOR$4]) _hide(proto$3, ITERATOR$4, ArrayValues);
    if (!proto$3[TO_STRING_TAG]) _hide(proto$3, TO_STRING_TAG, NAME$1);
    _iterators[NAME$1] = ArrayValues;
    if (explicit) for (key$1 in es6_array_iterator) if (!proto$3[key$1]) _redefine(proto$3, key$1, es6_array_iterator[key$1], true);
  }
}

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = module.exports;

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);
});

if (commonjsGlobal._babelPolyfill && typeof console !== "undefined" && console.warn) {
  console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " + "and may have consequences if different versions of the polyfills are applied sequentially. " + "If you do need to load the polyfill more than once, use @babel/polyfill/noConflict " + "instead to bypass the warning.");
}

commonjsGlobal._babelPolyfill = true;

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty$1.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

var emptyObject_1 = emptyObject;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

var r="function"===typeof Symbol&&Symbol["for"],t=r?Symbol["for"]("react.element"):60103,u=r?Symbol["for"]("react.portal"):60106,v=r?Symbol["for"]("react.fragment"):60107,w=r?Symbol["for"]("react.strict_mode"):60108,x=r?Symbol["for"]("react.provider"):60109,y=r?Symbol["for"]("react.context"):60110,z=r?Symbol["for"]("react.async_mode"):60111,A=r?Symbol["for"]("react.forward_ref"):
60112,B="function"===typeof Symbol&&Symbol.iterator;function C(a){for(var b=arguments.length-1,e="http://reactjs.org/docs/error-decoder.html?invariant\x3d"+a,c=0;c<b;c++)e+="\x26args[]\x3d"+encodeURIComponent(arguments[c+1]);invariant_1(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",e);}var D={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};
function E(a,b,e){this.props=a;this.context=b;this.refs=emptyObject_1;this.updater=e||D;}E.prototype.isReactComponent={};E.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?C("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState");};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=emptyObject_1;this.updater=e||D;}var H=G.prototype=new F;
H.constructor=G;objectAssign(H,E.prototype);H.isPureReactComponent=!0;var I={current:null},J=Object.prototype.hasOwnProperty,K={key:!0,ref:!0,__self:!0,__source:!0};
function L(a,b,e){var c=void 0,d={},g=null,h=null;if(null!=b)for(c in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(g=""+b.key),b)J.call(b,c)&&!K.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var k=Array(f),l=0;l<f;l++)k[l]=arguments[l+2];d.children=k;}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return {$$typeof:t,type:a,key:g,ref:h,props:d,_owner:I.current}}
function M(a){return "object"===typeof a&&null!==a&&a.$$typeof===t}function escape$1(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return "$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var N=/\/+/g,O=[];function P(a,b,e,c){if(O.length){var d=O.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return {result:a,keyPrefix:b,func:e,context:c,count:0}}function Q(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>O.length&&O.push(a);}
function R(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case t:case u:g=!0;}}if(g)return e(c,a,""===b?"."+S(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var h=0;h<a.length;h++){d=a[h];var f=b+S(d,h);g+=R(d,f,e,c);}else if(null===a||"undefined"===typeof a?f=null:(f=B&&a[B]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),
h=0;!(d=a.next()).done;)d=d.value,f=b+S(d,h++),g+=R(d,f,e,c);else"object"===d&&(e=""+a,C("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function S(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape$1(a.key):b.toString(36)}function T(a,b){a.func.call(a.context,b,a.count++);}
function U(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?V(a,c,e,emptyFunction_1.thatReturnsArgument):null!=a&&(M(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(N,"$\x26/")+"/")+e,a={$$typeof:t,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a));}function V(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(N,"$\x26/")+"/");b=P(b,g,c,d);null==a||R(a,"",U,b);Q(b);}
var W={Children:{map:function(a,b,e){if(null==a)return a;var c=[];V(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=P(null,null,b,e);null==a||R(a,"",T,b);Q(b);},count:function(a){return null==a?0:R(a,"",emptyFunction_1.thatReturnsNull,null)},toArray:function(a){var b=[];V(a,b,null,emptyFunction_1.thatReturnsArgument);return b},only:function(a){M(a)?void 0:C("143");return a}},createRef:function(){return {current:null}},Component:E,PureComponent:G,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:y,
_calculateChangedBits:b,_defaultValue:a,_currentValue:a,_changedBits:0,Provider:null,Consumer:null};a.Provider={$$typeof:x,_context:a};return a.Consumer=a},forwardRef:function(a){return {$$typeof:A,render:a}},Fragment:v,StrictMode:w,unstable_AsyncMode:z,createElement:L,cloneElement:function(a,b,e){null===a||void 0===a?C("267",a):void 0;var c=void 0,d=objectAssign({},a.props),g=a.key,h=a.ref,f=a._owner;if(null!=b){void 0!==b.ref&&(h=b.ref,f=I.current);void 0!==b.key&&(g=""+b.key);var k=void 0;a.type&&a.type.defaultProps&&
(k=a.type.defaultProps);for(c in b)J.call(b,c)&&!K.hasOwnProperty(c)&&(d[c]=void 0===b[c]&&void 0!==k?k[c]:b[c]);}c=arguments.length-2;if(1===c)d.children=e;else if(1<c){k=Array(c);for(var l=0;l<c;l++)k[l]=arguments[l+2];d.children=k;}return {$$typeof:t,type:a.type,key:g,ref:h,props:d,_owner:f}},createFactory:function(a){var b=L.bind(null,a);b.type=a;return b},isValidElement:M,version:"16.3.2",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:I,assign:objectAssign}},X=Object.freeze({default:W}),
Y=X&&W||X;var react_production_min=Y["default"]?Y["default"]:Y;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction_1;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1 = warning;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

if (process.env.NODE_ENV !== 'production') {
  var invariant$1 = invariant_1;
  var warning$1 = warning_1;
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant$1(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        warning$1(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$1(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var react_development = createCommonjsModule(function (module) {



if (process.env.NODE_ENV !== "production") {
  (function() {

var _assign = objectAssign;
var invariant = invariant_1;
var emptyObject = emptyObject_1;
var warning = warning_1;
var emptyFunction = emptyFunction_1;
var checkPropTypes = checkPropTypes_1;

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.3.2';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol['for']('react.strict_mode') : 0xeacc;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol['for']('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol['for']('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol['for']('react.async_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol['for']('react.forward_ref') : 0xead0;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

// Relying on the `invariant()` implementation lets us
// have preserve the format and params in the www builds.

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warning(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 */
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };
  {
    Object.seal(refObject);
  }
  return refObject;
}

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown = void 0;
var specialPropRefWarningShown = void 0;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName = void 0;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;

  var propName = void 0;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps = void 0;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child = void 0;
  var nextName = void 0;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          !didWarnAboutMaps ? warning(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum()) : void 0;
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step = void 0;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warning(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _defaultValue: defaultValue,
    _currentValue: defaultValue,
    _changedBits: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };
  context.Consumer = context;

  {
    context._currentRenderer = null;
  }

  return context;
}

function forwardRef(render) {
  {
    !(typeof render === 'function') ? warning(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render) : void 0;
  }

  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  if (typeof type === 'string') {
    return type;
  }
  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'ReactFragment';
    case REACT_PORTAL_TYPE:
      return 'ReactPortal';
    case REACT_CALL_TYPE:
      return 'ReactCall';
    case REACT_RETURN_TYPE:
      return 'ReactReturn';
  }
  if (typeof type === 'object' && type !== null) {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        var functionName = type.render.displayName || type.render.name || '';
        return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
    }
  }
  return null;
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

var currentlyValidatingElement = void 0;
var propTypesMisspellWarningShown = void 0;

var getDisplayName = function () {};
var getStackAddendum = function () {};

{
  currentlyValidatingElement = null;

  propTypesMisspellWarningShown = false;

  getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (element.type === REACT_FRAGMENT_TYPE) {
      return 'React.Fragment';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  getStackAddendum = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
    return stack;
  };
}

function getDeclarationErrorAddendum() {
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step = void 0;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;
  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
    currentlyValidatingElement = null;
  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    !componentClass.getDefaultProps.isReactClassApproved ? warning(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  currentlyValidatingElement = fragment;

  var keys = Object.keys(fragment.props);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key !== 'children' && key !== 'key') {
      warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
      break;
    }
  }

  if (fragment.ref !== null) {
    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
  }

  currentlyValidatingElement = null;
}

function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type);

  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    info += getStackAddendum() || '';

    var typeString = void 0;
    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else {
      typeString = typeof type;
    }

    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;
  // Legacy hook: remove it
  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  createRef: createRef,
  Component: Component,
  PureComponent: PureComponent,

  createContext: createContext,
  forwardRef: forwardRef,

  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  }
};

{
  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3['default'] ? React$3['default'] : React$3;

module.exports = react;
  })();
}
});

var react = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = react_production_min;
} else {
  module.exports = react_development;
}
});
var react_1 = react.Component;
var react_2 = react.Children;
var react_3 = react.createElement;
var react_4 = react.Fragment;
var react_5 = react.isValidElement;
var react_6 = react.PureComponent;

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant_1(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning_1(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning_1(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction_1.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    invariant_1(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var subscriptionShape = propTypes.shape({
  trySubscribe: propTypes.func.isRequired,
  tryUnsubscribe: propTypes.func.isRequired,
  notifyNestedSubs: propTypes.func.isRequired,
  isSubscribed: propTypes.func.isRequired
});

var storeShape = propTypes.shape({
  subscribe: propTypes.func.isRequired,
  dispatch: propTypes.func.isRequired,
  getState: propTypes.func.isRequired
});

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning$2(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  warning$2('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    _inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      _classCallCheck(this, Provider);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return react_2.only(this.props.children);
    };

    return Provider;
  }(react_1);

  if (process.env.NODE_ENV !== 'production') {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.propTypes = {
    store: storeShape.isRequired,
    children: propTypes.element.isRequired
  };
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = storeShape.isRequired, _Provider$childContex[subscriptionKey] = subscriptionShape, _Provider$childContex);

  return Provider;
}

createProvider();

var hoistNonReactStatics = createCommonjsModule(function (module, exports) {
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
(function (global, factory) {
    module.exports = factory();
}(commonjsGlobal, (function () {
    
    var REACT_STATICS = {
        childContextTypes: true,
        contextTypes: true,
        defaultProps: true,
        displayName: true,
        getDefaultProps: true,
        getDerivedStateFromProps: true,
        mixins: true,
        propTypes: true,
        type: true
    };
    
    var KNOWN_STATICS = {
        name: true,
        length: true,
        prototype: true,
        caller: true,
        callee: true,
        arguments: true,
        arity: true
    };
    
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = getPrototypeOf && getPrototypeOf(Object);
    
    return function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
        if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
            
            if (objectPrototype) {
                var inheritedComponent = getPrototypeOf(sourceComponent);
                if (inheritedComponent && inheritedComponent !== objectPrototype) {
                    hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
                }
            }
            
            var keys = getOwnPropertyNames(sourceComponent);
            
            if (getOwnPropertySymbols) {
                keys = keys.concat(getOwnPropertySymbols(sourceComponent));
            }
            
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                    var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                    try { // Avoid failures from read-only properties
                        defineProperty(targetComponent, key, descriptor);
                    } catch (e) {}
                }
            }
            
            return targetComponent;
        }
        
        return targetComponent;
    };
})));
});

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = process.env.NODE_ENV;

var invariant$2 = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var invariant_1$1 = invariant$2;

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription$1 = function () {
  function Subscription(store, parentSub, onStateChange) {
    _classCallCheck$1(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = storeShape, _contextTypes[subscriptionKey] = subscriptionShape, _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = subscriptionShape, _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    invariant_1$1(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + (methodName + '. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      _inherits$1(Connect, _Component);

      function Connect(props, context) {
        _classCallCheck$2(this, Connect);

        var _this = _possibleConstructorReturn$1(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        invariant_1$1(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        invariant_1$1(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new Subscription$1(this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return react_3(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(react_1);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;
    Connect.propTypes = contextTypes;

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.
          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }
          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return hoistNonReactStatics(Connect, WrappedComponent);
  };
}

var hasOwn = Object.prototype.hasOwnProperty;

function is$1(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is$1(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is$1(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */

var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT' + Math.random().toString(36).substring(7).split('').join('.'),
  REPLACE: '@@redux/REPLACE' + Math.random().toString(36).substring(7).split('').join('.')
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning$3(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning$3("You are currently using minified code outside of NODE_ENV === 'production'. " + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root$1.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$2.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$2.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject$1(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$3.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject$1(value)) {
    warning$2(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (process.env.NODE_ENV !== 'production') verifyPlainObject(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}

function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return bindActionCreators(mapDispatchToProps, dispatch);
  }) : undefined;
}

var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}

var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

var _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends$2({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        if (process.env.NODE_ENV !== 'production') verifyPlainObject(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      warning$2('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

function _objectWithoutProperties$1(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutProperties$1(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (process.env.NODE_ENV !== 'production') {
    verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

var _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties$2(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + typeof arg + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? defaultMergePropsFactories : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? finalPropsSelectorFactory : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? shallowEqual : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? shallowEqual : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? shallowEqual : _ref2$areMergedPropsE,
        extraOptions = _objectWithoutProperties$2(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends$3({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

var connect = createConnect();

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		module.exports = classNames;
	} else if (typeof undefined === 'function' && typeof undefined.amd === 'object' && undefined.amd) {
		// register as 'classnames', consistent with npm package name
		undefined('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());
});

var crypt = createCommonjsModule(function (module) {
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();
});

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

var charenc_1 = charenc;

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
};

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

var md5 = createCommonjsModule(function (module) {
(function(){
  var crypt$$1 = crypt,
      utf8 = charenc_1.utf8,
      isBuffer = isBuffer_1,
      bin = charenc_1.bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt$$1.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt$$1.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt$$1.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt$$1.bytesToHex(digestbytes);
  };

})();
});

var strictUriEncode = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

var extract = function (str) {
	return str.split('?')[1] || '';
};

var parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

var stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

var queryString = {
	extract: extract,
	parse: parse,
	stringify: stringify
};

var isRetina = function() {
  var mediaQuery;
  if (typeof window !== "undefined" && window !== null) {
    mediaQuery = "(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)";
    if (window.devicePixelRatio > 1.25) {
      return true;
    }
    if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
      return true;
    }
  }
  return false;
};

var dist = createCommonjsModule(function (module) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(react);



var _md2 = _interopRequireDefault(md5);



var _queryString2 = _interopRequireDefault(queryString);



var _isRetina2 = _interopRequireDefault(isRetina);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gravatar = function (_React$Component) {
  _inherits(Gravatar, _React$Component);

  function Gravatar() {
    _classCallCheck(this, Gravatar);

    return _possibleConstructorReturn(this, (Gravatar.__proto__ || Object.getPrototypeOf(Gravatar)).apply(this, arguments));
  }

  _createClass(Gravatar, [{
    key: 'render',
    value: function render() {
      var base = this.props.protocol + 'www.gravatar.com/avatar/';

      var query = _queryString2.default.stringify({
        s: this.props.size,
        r: this.props.rating,
        d: this.props.default
      });

      var retinaQuery = _queryString2.default.stringify({
        s: this.props.size * 2,
        r: this.props.rating,
        d: this.props.default
      });

      // Gravatar service currently trims and lowercases all registered emails
      var formattedEmail = ('' + this.props.email).trim().toLowerCase();

      var hash = void 0;
      if (this.props.md5) {
        hash = this.props.md5;
      } else if (typeof this.props.email === 'string') {
        hash = (0, _md2.default)(formattedEmail, { encoding: "binary" });
      } else {
        console.warn('Gravatar image can not be fetched. Either the "email" or "md5" prop must be specified.');
        return _react2.default.createElement('script', null);
      }

      var src = '' + base + hash + '?' + query;
      var retinaSrc = '' + base + hash + '?' + retinaQuery;

      var modernBrowser = true; // server-side, we render for modern browsers

      if (typeof window !== 'undefined') {
        // this is not NodeJS
        modernBrowser = 'srcset' in document.createElement('img');
      }

      var className = 'react-gravatar';
      if (this.props.className) {
        className = className + ' ' + this.props.className;
      }

      // Clone this.props and then delete Component specific props so we can
      // spread the rest into the img.

      var rest = _objectWithoutProperties(this.props, []);

      delete rest.md5;
      delete rest.email;
      delete rest.protocol;
      delete rest.rating;
      delete rest.size;
      delete rest.style;
      delete rest.className;
      delete rest.default;
      if (!modernBrowser && (0, _isRetina2.default)()) {
        return _react2.default.createElement('img', _extends({
          alt: 'Gravatar for ' + formattedEmail,
          style: this.props.style,
          src: retinaSrc,
          height: this.props.size,
          width: this.props.size
        }, rest, {
          className: className
        }));
      }
      return _react2.default.createElement('img', _extends({
        alt: 'Gravatar for ' + formattedEmail,
        style: this.props.style,
        src: src,
        srcSet: retinaSrc + ' 2x',
        height: this.props.size,
        width: this.props.size
      }, rest, {
        className: className
      }));
    }
  }]);

  return Gravatar;
}(_react2.default.Component);

Gravatar.displayName = 'Gravatar';
Gravatar.propTypes = {
  email: _propTypes2.default.string,
  md5: _propTypes2.default.string,
  size: _propTypes2.default.number,
  rating: _propTypes2.default.string,
  default: _propTypes2.default.string,
  className: _propTypes2.default.string,
  protocol: _propTypes2.default.string,
  style: _propTypes2.default.object
};
Gravatar.defaultProps = {
  size: 50,
  rating: 'g',
  default: 'retro',
  protocol: '//'
};


module.exports = Gravatar;
});

var Gravatar = unwrapExports(dist);

var underscore = createCommonjsModule(function (module, exports) {
//     Underscore.js 1.9.0
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof commonjsGlobal == 'object' && commonjsGlobal.global === commonjsGlobal && commonjsGlobal ||
            this ||
            {};

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  if (!exports.nodeType) {
    if (!module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.9.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-argument case is omitted because we’re not using it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  var builtinIteratee;

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
    return _.property(value);
  };

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only argCount argument.
  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // Some functions take a variable number of arguments, or a few expected
  // arguments at the beginning and then a variable number of values to operate
  // on. This helper accumulates all remaining arguments past the function’s
  // argument length (or an explicit `startIndex`), into an array that becomes
  // the last argument. Similar to ES6’s "rest parameter".
  var restArguments = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var shallowProperty = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = shallowProperty('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  var createReduce = function(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = restArguments(function(obj, path, args) {
    var contextPath, func;
    if (_.isFunction(path)) {
      func = path;
    } else if (_.isArray(path)) {
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return _.map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection.
  _.shuffle = function(obj) {
    return _.sample(obj, Infinity);
  };

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = _.random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (_.isString(obj)) {
      // Keep surrogate pair characters together
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null || array.length < 1) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null || array.length < 1) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, Boolean);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    output = output || [];
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        // Flatten current level of array or arguments object.
        if (shallow) {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        } else {
          flatten(value, shallow, strict, output);
          idx = output.length;
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = restArguments(function(array, otherArrays) {
    return _.difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = restArguments(function(arrays) {
    return _.uniq(flatten(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = restArguments(function(array, rest) {
    rest = flatten(rest, true, true);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  });

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = restArguments(_.unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of _.pairs.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions.
  var createPredicateIndexFinder = function(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  };

  // Returns the first index on an array-like that passes a predicate test.
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions.
  var createIndexFinder = function(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Chunk a single array into multiple arrays, each containing `count` or fewer
  // items.
  _.chunk = function(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments.
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = restArguments(function(func, context, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArguments(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
  _.partial = restArguments(function(func, boundArgs) {
    var placeholder = _.partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  _.partial.placeholder = _;

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = restArguments(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = _.bind(obj[key], obj);
    }
  });

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  _.restArguments = restArguments;

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  var collectNonEnumProps = function(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  };

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object.
  // In contrast to _.map it returns an object.
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = _.keys(obj),
        length = keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of _.object.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`.
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test.
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Internal pick helper function to determine if `obj` has key `key`.
  var keyInObj = function(value, key, obj) {
    return key in obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = restArguments(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = _.allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the blacklisted properties.
  _.omit = restArguments(function(obj, keys) {
    var iteratee = keys[0], context;
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = _.map(flatten(keys, false, false), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  });

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq, deepEq;
  eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  };

  // Internal recursive comparison function for `isEqual`.
  deepEq = function(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof Int8Array != 'object' && typeof nodelist != 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    return _.isNumber(obj) && isNaN(obj);
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, path) {
    if (!_.isArray(path)) {
      return obj != null && hasOwnProperty.call(obj, path);
    }
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (obj == null || !hasOwnProperty.call(obj, key)) {
        return false;
      }
      obj = obj[key];
    }
    return !!length;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  // Creates a function that, when passed an object, will traverse that object’s
  // properties down the given `path`, specified as an array of keys or indexes.
  _.property = function(path) {
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
  };

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    if (obj == null) {
      return function(){};
    }
    return function(path) {
      return !_.isArray(path) ? obj[path] : deepGet(obj, path);
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  _.result = function(obj, path, fallback) {
    if (!_.isArray(path)) path = [path];
    var length = path.length;
    if (!length) {
      return _.isFunction(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = _.isFunction(prop) ? prop.call(obj) : prop;
    }
    return obj;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return chainResult(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return String(this._wrapped);
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof undefined == 'function' && undefined.amd) {
    undefined('underscore', [], function() {
      return _;
    });
  }
}());
});
var underscore_1 = underscore._;

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty$1 = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends$4 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* eslint-disable no-unused-vars */
var tooltipOptions = function tooltipOptions(_ref) {
	var children = _ref.children,
	    options = objectWithoutProperties(_ref, ["children"]);
	return options;
};
/* eslint-enable no-unused-vars */

var Tooltip = function (_React$Component) {
	inherits(Tooltip, _React$Component);

	function Tooltip() {
		classCallCheck(this, Tooltip);
		return possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));
	}

	createClass(Tooltip, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.configure(this.props);
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(previousProps) {
			var currentOptions = tooltipOptions(this.props);
			if (!underscore.isEqual(tooltipOptions(previousProps), currentOptions)) {
				this.tearDown();
				this.configure(currentOptions);
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.tearDown();
		}
	}, {
		key: "configure",
		value: function configure(props) {
			/* eslint-disable no-unused-vars */
			var children = props.children,
			    target = props.target,
			    options = objectWithoutProperties(props, ["children", "target"]);
			/* eslint-enable no-unused-vars */

			if (global.atom) this.disposable = atom.tooltips.add(target || this.target, options);
		}
	}, {
		key: "tearDown",
		value: function tearDown() {
			this.disposable && this.disposable.dispose();
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			try {
				var child = react.Children.only(this.props.children);
				return react.cloneElement(child, { ref: function ref(element) {
						return _this2.target = element;
					} });
			} catch (e) {
				/* nothing to render */
				return false;
			}
		}
	}]);
	return Tooltip;
}(react.Component);

var Headshot = function (_Component) {
	inherits(Headshot, _Component);

	function Headshot() {
		var _ref;

		var _temp, _this, _ret;

		classCallCheck(this, Headshot);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Headshot.__proto__ || Object.getPrototypeOf(Headshot)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, "state", {
			enumerable: true,
			writable: true,
			value: { img: null }
		}), Object.defineProperty(_this, "_div", {
			enumerable: true,
			writable: true,
			value: react.createRef()
		}), _temp), possibleConstructorReturn(_this, _ret);
	}

	createClass(Headshot, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var img = this._div.current.querySelector("img");
			if (img) this.setState({ img: img });
		}
	}, {
		key: "render",
		value: function render() {
			var person = this.props.person;

			if (!person) return null;

			var defaultImage = encodeURI("https://images.codestream.com/misc/nothing_transparent-36x36.gif");
			var authorInitials = person.email.charAt(0);
			if (person.fullName) {
				authorInitials = person.fullName.replace(/(\w)\w*/g, "$1").replace(/\s/g, "");
				if (authorInitials.length > 2) authorInitials = authorInitials.substring(0, 2);
			} else if (person.username) {
				authorInitials = person.username.charAt(0);
			}
			var classNameInitials = "headshot-initials color-" + person.color;

			return react.createElement(
				"div",
				{ className: "headshot", ref: this._div },
				this.state.img && react.createElement(Tooltip, {
					title: this.props.mine ? "Right click to change your headshot" : this.props.person.fullName,
					delay: "0",
					target: this.state.img
				}),
				react.createElement(Gravatar, {
					className: "headshot-gravatar",
					size: this.props.size,
					"default": defaultImage,
					protocol: "http://",
					email: person.email
				}),
				react.createElement(
					"div",
					{ className: classNameInitials },
					authorInitials
				)
			);
		}
	}]);
	return Headshot;
}(react_1);

var moment = require("moment");
// var Moment_Timezone = require("moment-timezone");

var Timestamp = function (_Component) {
	inherits(Timestamp, _Component);

	function Timestamp(props) {
		classCallCheck(this, Timestamp);

		var _this = possibleConstructorReturn(this, (Timestamp.__proto__ || Object.getPrototypeOf(Timestamp)).call(this, props));

		Object.defineProperty(_this, "prettyDateDay", {
			enumerable: true,
			writable: true,
			value: function value(time, options) {
				options = options || {};
				if (time === 0 || time === null || time === undefined) return "";
				var now = new Date().getTime();
				// now = this.adjustedTime(now, options.timezone_info);
				// time = this.adjustedTime(time, options.timezone_info);
				var today = new Date(now);
				var timeDay = new Date(time);
				if (timeDay.getFullYear() === today.getFullYear()) {
					return moment(time).format("MMM D");
				}
				return moment(time).format("MMM D, YYYY");
			}
		});
		Object.defineProperty(_this, "prettyTime", {
			enumerable: true,
			writable: true,
			value: function value(time, options) {
				options = options || {};
				var prettyTime;
				// time = this.adjustedTime(time, options.timezone_info);
				prettyTime = moment(time).format("h:mm A");
				prettyTime = prettyTime.replace(/^0:/, "12:");
				return prettyTime;
			}
		});

		_this.state = {};
		return _this;
	}

	createClass(Timestamp, [{
		key: "render",
		value: function render() {
			var timeText = this.prettyTime(this.props.time);
			var timeDetails = this.prettyDateDay(this.props.time);

			return react.createElement(
				"time",
				null,
				timeText,
				react.createElement(
					"span",
					{ className: "details" },
					timeDetails
				)
			);
		}
	}, {
		key: "sameDateAs",
		value: function sameDateAs(date1, date2) {
			return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
		}
	}]);
	return Timestamp;
}(react_1);

Button.defaultProps = {
	className: "",
	disabled: false,
	loading: false
};

function Button(_ref) {
	var children = _ref.children,
	    className = _ref.className,
	    disabled = _ref.disabled,
	    isOffline = _ref.isOffline,
	    loading = _ref.loading,
	    extras = objectWithoutProperties(_ref, ["children", "className", "disabled", "isOffline", "loading"]);
	var extraProps = objectWithoutProperties(extras, ["dispatch"]); // remove non-html attributes

	return react.createElement(
		"button",
		_extends$4({
			className: classnames("native-key-bindings btn inline-block-tight", className, {
				"btn-primary": !loading
			}),
			disabled: loading || disabled
		}, extraProps),
		loading ? react.createElement("span", { className: "loading loading-spinner-tiny inline-block" }) : children
	);
}

var PostDetails = function (_Component) {
	inherits(PostDetails, _Component);

	function PostDetails() {
		var _ref;

		var _temp, _this, _ret;

		classCallCheck(this, PostDetails);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = PostDetails.__proto__ || Object.getPrototypeOf(PostDetails)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, "state", {
			enumerable: true,
			writable: true,
			value: {
				patchApplied: false,
				diffShowing: false,
				showDiffButtons: false
			}
		}), Object.defineProperty(_this, "handleInteractionEvent", {
			enumerable: true,
			writable: true,
			value: function value(_ref2) {
				var data = _ref2.data;

				// foobar always lives with view code.
				// will translate postMessages into events to the views
				// this.foobar.on(, () => {});
				if (data.type === "codestream:publish:file-changed") {
					var codeBlocks = _this.props.post.codeBlocks || [];
					codeBlocks.forEach(function (block) {
						if (block.file === data.body.file) _this.setState({ showDiffButtons: data.body.hasDiff });
					});
				}
			}
		}), Object.defineProperty(_this, "handleClickShowDiff", {
			enumerable: true,
			writable: true,
			value: function value(event) {
				event.preventDefault();
				window.parent.postMessage({
					type: "codestream:interaction:show-diff",
					body: _this.props.post.codeBlocks[0]
				}, "*");
				_this.setState({ diffShowing: !_this.state.diffShowing });
			}
		}), Object.defineProperty(_this, "handleClickApplyPatch", {
			enumerable: true,
			writable: true,
			value: function value(event) {
				event.preventDefault();
				window.parent.postMessage({
					type: "codestream:interaction:apply-patch",
					body: _this.props.post.codeBlocks[0]
				}, "*");
				_this.setState({ patchApplied: !_this.state.patchApplied });
			}
		}), _temp), possibleConstructorReturn(_this, _ret);
	}

	createClass(PostDetails, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			window.addEventListener("message", this.handleInteractionEvent, true);

			var codeBlocks = this.props.post.codeBlocks || [];
			codeBlocks.forEach(function (block) {
				window.parent.postMessage({
					type: "codestream:subscription:file-changed",
					body: block
				}, "*");
			});
			// if (this._alert)
			// 	atom.tooltips.add(this._alert, {
			// 		title: "Unknown codeblock location."
			// 	});
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			var codeBlocks = this.props.post.codeBlocks || [];
			codeBlocks.forEach(function (block) {
				window.parent.postMessage({
					type: "codestream:unsubscribe:file-changed",
					body: block
				}, "*");
			});
			window.removeEventListener("message", this.handleInteractionEvent, true);
		}
	}, {
		key: "render",


		// handleShowVersion = async event => {
		// 	console.log("Showing version...");
		// };

		value: function render() {
			var _this2 = this;

			var post = this.props.post;


			if (!post) return null;

			var applyPatchLabel = this.state.patchApplied ? "Revert" : "Apply Patch";
			var showDiffLabel = this.state.diffShowing ? "Hide Diff" : "Show Diff";
			var hasCodeBlock = post.codeBlocks && post.codeBlocks.length ? true : null;

			// if a patch has been applied, we treat it as if there is
			// a diff
			var showDiffButtons = this.state.showDiffButtons || this.state.patchApplied;
			var alert = null;
			// } else if (hasCodeBlock) {
			// 	// TODO: this is the case where we have a codeblock but no marker location
			// 	alert = <span className="icon icon-alert" ref={ref => (this._alert = ref)} />;
			// }

			var commitDiv = null;
			if (hasCodeBlock) {
				commitDiv = react.createElement(
					"div",
					{ className: "posted-to" },
					react.createElement(
						"label",
						null,
						"Posted to:"
					),
					" ",
					react.createElement(
						"span",
						null,
						post.commitHashWhenPosted
					)
				);
				// if (post.commitHashWhenPosted == this.props.currentCommit) {
				// 	commitDiv = <span />;
				// } else {
				// 	commitDiv = (
				// 		<Button
				// 			id="show-version-button"
				// 			className="control-button"
				// 			tabIndex="2"
				// 			type="submit"
				// 			onClick={this.handleShowVersion}
				// 		>
				// 			Warp to {post.commitHashWhenPosted}
				// 		</Button>
				// 	);
				// }
			}

			return react.createElement(
				"div",
				{ className: "post-details", id: post.id, ref: function ref(_ref3) {
						return _this2._div = _ref3;
					} },
				alert,
				!showDiffButtons && hasCodeBlock && react.createElement(
					"div",
					{ className: "no-diffs" },
					"This codeblock matches current"
				),
				commitDiv,
				showDiffButtons && react.createElement(
					"div",
					{ className: "button-group" },
					react.createElement(
						Button,
						{
							id: "show-diff-button",
							className: "control-button",
							tabIndex: "2",
							type: "submit",
							loading: this.props.loading,
							onClick: this.handleClickShowDiff
						},
						showDiffLabel
					),
					react.createElement(
						Button,
						{
							id: "show-diff-button",
							className: "control-button",
							tabIndex: "2",
							type: "submit",
							loading: this.props.loading,
							onClick: this.handleClickApplyPatch
						},
						applyPatchLabel
					)
				)
			);
		}
	}]);
	return PostDetails;
}(react_1);

var RetrySpinner = function (_React$Component) {
	inherits(RetrySpinner, _React$Component);

	function RetrySpinner() {
		var _ref,
		    _this2 = this;

		var _temp, _this, _ret;

		classCallCheck(this, RetrySpinner);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = RetrySpinner.__proto__ || Object.getPrototypeOf(RetrySpinner)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, "state", {
			enumerable: true,
			writable: true,
			value: { loading: false }
		}), Object.defineProperty(_this, "mounted", {
			enumerable: true,
			writable: true,
			value: false
		}), Object.defineProperty(_this, "onRetry", {
			enumerable: true,
			writable: true,
			value: function () {
				var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									event.stopPropagation();

									if (!(_this.state.loading === false)) {
										_context.next = 6;
										break;
									}

									_this.setState({ loading: true });
									_context.next = 5;
									return _this.props.callback();

								case 5:
									if (_this.mounted) _this.setState({ loading: false });

								case 6:
								case "end":
									return _context.stop();
							}
						}
					}, _callee, _this2);
				}));

				function value(_x) {
					return _ref2.apply(this, arguments);
				}

				return value;
			}()
		}), Object.defineProperty(_this, "onCancel", {
			enumerable: true,
			writable: true,
			value: function value(event) {
				event.stopPropagation();
				_this.props.cancel();
			}
		}), _temp), possibleConstructorReturn(_this, _ret);
	}

	createClass(RetrySpinner, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.mounted = true;
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.mounted = false;
		}
	}, {
		key: "render",
		value: function render() {
			return react.createElement(
				"div",
				{ className: "retry-spinner" },
				this.state.loading ? react.createElement("span", { className: "loading loading-spinner-tiny inline-block" }) : react.createElement(
					react_4,
					null,
					react.createElement(
						Tooltip,
						{ title: "Retry", placement: "top" },
						react.createElement("span", { className: "icon icon-sync text-error", onClick: this.onRetry })
					),
					react.createElement(
						Tooltip,
						{ title: "Cancel", placement: "top" },
						react.createElement("span", { className: "icon icon-remove-close", onClick: this.onCancel })
					)
				)
			);
		}
	}]);
	return RetrySpinner;
}(react.Component);

var retryPost = function retryPost() {};

var cancelPost = function cancelPost() {};

var reactContenteditable = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stripNbsp = function stripNbsp(str) {
  return str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');
};

var ContentEditable = function (_React$Component) {
  _inherits(ContentEditable, _React$Component);

  function ContentEditable() {
    _classCallCheck(this, ContentEditable);

    var _this = _possibleConstructorReturn(this, (ContentEditable.__proto__ || Object.getPrototypeOf(ContentEditable)).call(this));

    _this.emitChange = _this.emitChange.bind(_this);
    return _this;
  }

  _createClass(ContentEditable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          tagName = _props.tagName,
          html = _props.html,
          props = _objectWithoutProperties(_props, ['tagName', 'html']);

      return _react2.default.createElement(tagName || 'div', _extends({}, props, {
        ref: function ref(e) {
          return _this2.htmlEl = e;
        },
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: { __html: html }
      }), this.props.children);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var props = this.props,
          htmlEl = this.htmlEl;

      // We need not rerender if the change of props simply reflects the user's edits.
      // Rerendering in this case would make the cursor/caret jump

      // Rerender if there is no element yet... (somehow?)

      if (!htmlEl) {
        return true;
      }

      // ...or if html really changed... (programmatically, not by user edit)
      if (stripNbsp(nextProps.html) !== stripNbsp(htmlEl.innerHTML) && nextProps.html !== props.html) {
        return true;
      }

      var optional = ['style', 'className', 'disabled', 'tagName'];

      // Handle additional properties
      return optional.some(function (name) {
        return props[name] !== nextProps[name];
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
        // Perhaps React (whose VDOM gets outdated because we often prevent
        // rerendering) did not update the DOM. So we update it manually now.
        this.htmlEl.innerHTML = this.props.html;
      }
    }
  }, {
    key: 'emitChange',
    value: function emitChange(evt) {
      if (!this.htmlEl) return;
      var html = this.htmlEl.innerHTML;
      if (this.props.onChange && html !== this.lastHtml) {
        // Clone event with Object.assign to avoid 
        // "Cannot assign to read only property 'target' of object"
        var evt = Object.assign({}, evt, {
          target: {
            value: html
          }
        });
        this.props.onChange(evt);
      }
      this.lastHtml = html;
    }
  }]);

  return ContentEditable;
}(_react2.default.Component);

exports.default = ContentEditable;
module.exports = exports['default'];
});

var ContentEditable = unwrapExports(reactContenteditable);

var regex=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

var regex$1=/[\0-\x1F\x7F-\x9F]/;

var regex$2=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;

var regex$3=/[!-#%-\*,-/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E49\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

var re = function (opts) {
  var re = {};

  // Use direct extract instead of `regenerate` to reduse browserified size
  re.src_Any = regex.source;
  re.src_Cc  = regex$1.source;
  re.src_Z   = regex$2.source;
  re.src_P   = regex$3.source;

  // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
  re.src_ZPCc = [ re.src_Z, re.src_P, re.src_Cc ].join('|');

  // \p{\Z\Cc} (white spaces + control)
  re.src_ZCc = [ re.src_Z, re.src_Cc ].join('|');

  // Experimental. List of chars, completely prohibited in links
  // because can separate it from other part of text
  var text_separators = '[><\uff5c]';

  // All possible word characters (everything without punctuation, spaces & controls)
  // Defined via punctuation & spaces to save space
  // Should be something like \p{\L\N\S\M} (\w but without `_`)
  re.src_pseudo_letter       = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
  // The same as abothe but without [0-9]
  // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

  ////////////////////////////////////////////////////////////////////////////////

  re.src_ip4 =

    '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

  // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
  re.src_auth    = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';

  re.src_port =

    '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

  re.src_host_terminator =

    '(?=$|' + text_separators + '|' + re.src_ZPCc + ')(?!-|_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';

  re.src_path =

    '(?:' +
      '[/?#]' +
        '(?:' +
          '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-]).|' +
          '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' +
          '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' +
          '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' +
          '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' +
          "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +
          "\\'(?=" + re.src_pseudo_letter + '|[-]).|' +  // allow `I'm_king` if no pair found
          '\\.{2,3}[a-zA-Z0-9%/]|' + // github has ... in commit range links. Restrict to
                                     // - english
                                     // - percent-encoded
                                     // - parts of file path
                                     // until more examples found.
          '\\.(?!' + re.src_ZCc + '|[.]).|' +
          (opts && opts['---'] ?
            '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
          :
            '\\-+|'
          ) +
          '\\,(?!' + re.src_ZCc + ').|' +      // allow `,,,` in paths
          '\\!(?!' + re.src_ZCc + '|[!]).|' +
          '\\?(?!' + re.src_ZCc + '|[?]).' +
        ')+' +
      '|\\/' +
    ')?';

  re.src_email_name =

    '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+';

  re.src_xn =

    'xn--[a-z0-9\\-]{1,59}';

  // More to read about domain names
  // http://serverfault.com/questions/638260/

  re.src_domain_root =

    // Allow letters & digits (http://test1)
    '(?:' +
      re.src_xn +
      '|' +
      re.src_pseudo_letter + '{1,63}' +
    ')';

  re.src_domain =

    '(?:' +
      re.src_xn +
      '|' +
      '(?:' + re.src_pseudo_letter + ')' +
      '|' +
      // don't allow `--` in domain names, because:
      // - that can conflict with markdown &mdash; / &ndash;
      // - nobody use those anyway
      '(?:' + re.src_pseudo_letter + '(?:-(?!-)|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' +
    ')';

  re.src_host =

    '(?:' +
    // Don't need IP check, because digits are already allowed in normal domain names
    //   src_ip4 +
    // '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain/*_root*/ + ')' +
    ')';

  re.tpl_host_fuzzy =

    '(?:' +
      re.src_ip4 +
    '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' +
    ')';

  re.tpl_host_no_ip_fuzzy =

    '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';

  re.src_host_strict =

    re.src_host + re.src_host_terminator;

  re.tpl_host_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_host_terminator;

  re.src_host_port_strict =

    re.src_host + re.src_port + re.src_host_terminator;

  re.tpl_host_port_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;

  re.tpl_host_port_no_ip_fuzzy_strict =

    re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;


  ////////////////////////////////////////////////////////////////////////////////
  // Main rules

  // Rude test fuzzy links by host, for quick deny
  re.tpl_host_fuzzy_test =

    'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';

  re.tpl_email_fuzzy =

      '(^|' + text_separators + '|\\(|' + re.src_ZCc + ')(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';

  re.tpl_link_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';

  re.tpl_link_no_ip_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';

  return re;
};

////////////////////////////////////////////////////////////////////////////////
// Helpers

// Merge objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

function _class(obj) { return Object.prototype.toString.call(obj); }
function isString(obj) { return _class(obj) === '[object String]'; }
function isObject(obj) { return _class(obj) === '[object Object]'; }
function isRegExp(obj) { return _class(obj) === '[object RegExp]'; }
function isFunction(obj) { return _class(obj) === '[object Function]'; }


function escapeRE(str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'); }

////////////////////////////////////////////////////////////////////////////////


var defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};


function isOptionsObj(obj) {
  return Object.keys(obj || {}).reduce(function (acc, k) {
    return acc || defaultOptions.hasOwnProperty(k);
  }, false);
}


var defaultSchemas = {
  'http:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.http) {
        // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.http =  new RegExp(
          '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
        );
      }
      if (self.re.http.test(tail)) {
        return tail.match(self.re.http)[0].length;
      }
      return 0;
    }
  },
  'https:':  'http:',
  'ftp:':    'http:',
  '//':      {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.no_http) {
      // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.no_http =  new RegExp(
          '^' +
          self.re.src_auth +
          // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' +
          self.re.src_port +
          self.re.src_host_terminator +
          self.re.src_path,

          'i'
        );
      }

      if (self.re.no_http.test(tail)) {
        // should not be `://` & `///`, that protects from errors in protocol name
        if (pos >= 3 && text[pos - 3] === ':') { return 0; }
        if (pos >= 3 && text[pos - 3] === '/') { return 0; }
        return tail.match(self.re.no_http)[0].length;
      }
      return 0;
    }
  },
  'mailto:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.mailto) {
        self.re.mailto =  new RegExp(
          '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
        );
      }
      if (self.re.mailto.test(tail)) {
        return tail.match(self.re.mailto)[0].length;
      }
      return 0;
    }
  }
};

/*eslint-disable max-len*/

// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

/*eslint-enable max-len*/

////////////////////////////////////////////////////////////////////////////////

function resetScanCache(self) {
  self.__index__ = -1;
  self.__text_cache__   = '';
}

function createValidator(re$$1) {
  return function (text, pos) {
    var tail = text.slice(pos);

    if (re$$1.test(tail)) {
      return tail.match(re$$1)[0].length;
    }
    return 0;
  };
}

function createNormalizer() {
  return function (match, self) {
    self.normalize(match);
  };
}

// Schemas compiler. Build regexps.
//
function compile(self) {

  // Load & clone RE patterns.
  var re$$1 = self.re = re(self.__opts__);

  // Define dynamic patterns
  var tlds = self.__tlds__.slice();

  self.onCompile();

  if (!self.__tlds_replaced__) {
    tlds.push(tlds_2ch_src_re);
  }
  tlds.push(re$$1.src_xn);

  re$$1.src_tlds = tlds.join('|');

  function untpl(tpl) { return tpl.replace('%TLDS%', re$$1.src_tlds); }

  re$$1.email_fuzzy      = RegExp(untpl(re$$1.tpl_email_fuzzy), 'i');
  re$$1.link_fuzzy       = RegExp(untpl(re$$1.tpl_link_fuzzy), 'i');
  re$$1.link_no_ip_fuzzy = RegExp(untpl(re$$1.tpl_link_no_ip_fuzzy), 'i');
  re$$1.host_fuzzy_test  = RegExp(untpl(re$$1.tpl_host_fuzzy_test), 'i');

  //
  // Compile each schema
  //

  var aliases = [];

  self.__compiled__ = {}; // Reset compiled data

  function schemaError(name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
  }

  Object.keys(self.__schemas__).forEach(function (name) {
    var val = self.__schemas__[name];

    // skip disabled methods
    if (val === null) { return; }

    var compiled = { validate: null, link: null };

    self.__compiled__[name] = compiled;

    if (isObject(val)) {
      if (isRegExp(val.validate)) {
        compiled.validate = createValidator(val.validate);
      } else if (isFunction(val.validate)) {
        compiled.validate = val.validate;
      } else {
        schemaError(name, val);
      }

      if (isFunction(val.normalize)) {
        compiled.normalize = val.normalize;
      } else if (!val.normalize) {
        compiled.normalize = createNormalizer();
      } else {
        schemaError(name, val);
      }

      return;
    }

    if (isString(val)) {
      aliases.push(name);
      return;
    }

    schemaError(name, val);
  });

  //
  // Compile postponed aliases
  //

  aliases.forEach(function (alias) {
    if (!self.__compiled__[self.__schemas__[alias]]) {
      // Silently fail on missed schemas to avoid errons on disable.
      // schemaError(alias, self.__schemas__[alias]);
      return;
    }

    self.__compiled__[alias].validate =
      self.__compiled__[self.__schemas__[alias]].validate;
    self.__compiled__[alias].normalize =
      self.__compiled__[self.__schemas__[alias]].normalize;
  });

  //
  // Fake record for guessed links
  //
  self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

  //
  // Build schema condition
  //
  var slist = Object.keys(self.__compiled__)
                      .filter(function (name) {
                        // Filter disabled & fake schemas
                        return name.length > 0 && self.__compiled__[name];
                      })
                      .map(escapeRE)
                      .join('|');
  // (?!_) cause 1.5x slowdown
  self.re.schema_test   = RegExp('(^|(?!_)(?:[><\uff5c]|' + re$$1.src_ZPCc + '))(' + slist + ')', 'i');
  self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re$$1.src_ZPCc + '))(' + slist + ')', 'ig');

  self.re.pretest       = RegExp(
                            '(' + self.re.schema_test.source + ')|' +
                            '(' + self.re.host_fuzzy_test.source + ')|' +
                            '@',
                            'i');

  //
  // Cleanup
  //

  resetScanCache(self);
}

/**
 * class Match
 *
 * Match result. Single element of array, returned by [[LinkifyIt#match]]
 **/
function Match(self, shift) {
  var start = self.__index__,
      end   = self.__last_index__,
      text  = self.__text_cache__.slice(start, end);

  /**
   * Match#schema -> String
   *
   * Prefix (protocol) for matched string.
   **/
  this.schema    = self.__schema__.toLowerCase();
  /**
   * Match#index -> Number
   *
   * First position of matched string.
   **/
  this.index     = start + shift;
  /**
   * Match#lastIndex -> Number
   *
   * Next position after matched string.
   **/
  this.lastIndex = end + shift;
  /**
   * Match#raw -> String
   *
   * Matched string.
   **/
  this.raw       = text;
  /**
   * Match#text -> String
   *
   * Notmalized text of matched string.
   **/
  this.text      = text;
  /**
   * Match#url -> String
   *
   * Normalized url of matched string.
   **/
  this.url       = text;
}

function createMatch(self, shift) {
  var match = new Match(self, shift);

  self.__compiled__[match.schema].normalize(match, self);

  return match;
}


/**
 * class LinkifyIt
 **/

/**
 * new LinkifyIt(schemas, options)
 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Creates new linkifier instance with optional additional schemas.
 * Can be called without `new` keyword for convenience.
 *
 * By default understands:
 *
 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
 * - "fuzzy" links and emails (example.com, foo@bar.com).
 *
 * `schemas` is an object, where each key/value describes protocol/rule:
 *
 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
 *   for example). `linkify-it` makes shure that prefix is not preceeded with
 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
 * - __value__ - rule to check tail after link prefix
 *   - _String_ - just alias to existing rule
 *   - _Object_
 *     - _validate_ - validator function (should return matched length on success),
 *       or `RegExp`.
 *     - _normalize_ - optional function to normalize text & url of matched result
 *       (for example, for @twitter mentions).
 *
 * `options`:
 *
 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
 *   like version numbers. Default `false`.
 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
 *
 **/
function LinkifyIt(schemas, options) {
  if (!(this instanceof LinkifyIt)) {
    return new LinkifyIt(schemas, options);
  }

  if (!options) {
    if (isOptionsObj(schemas)) {
      options = schemas;
      schemas = {};
    }
  }

  this.__opts__           = assign({}, defaultOptions, options);

  // Cache last tested result. Used to skip repeating steps on next `match` call.
  this.__index__          = -1;
  this.__last_index__     = -1; // Next scan position
  this.__schema__         = '';
  this.__text_cache__     = '';

  this.__schemas__        = assign({}, defaultSchemas, schemas);
  this.__compiled__       = {};

  this.__tlds__           = tlds_default;
  this.__tlds_replaced__  = false;

  this.re = {};

  compile(this);
}


/** chainable
 * LinkifyIt#add(schema, definition)
 * - schema (String): rule name (fixed pattern prefix)
 * - definition (String|RegExp|Object): schema definition
 *
 * Add new rule definition. See constructor description for details.
 **/
LinkifyIt.prototype.add = function add(schema, definition) {
  this.__schemas__[schema] = definition;
  compile(this);
  return this;
};


/** chainable
 * LinkifyIt#set(options)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Set recognition options for links without schema.
 **/
LinkifyIt.prototype.set = function set(options) {
  this.__opts__ = assign(this.__opts__, options);
  return this;
};


/**
 * LinkifyIt#test(text) -> Boolean
 *
 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
 **/
LinkifyIt.prototype.test = function test(text) {
  // Reset scan cache
  this.__text_cache__ = text;
  this.__index__      = -1;

  if (!text.length) { return false; }

  var m, ml, me, len, shift, next, re$$1, tld_pos, at_pos;

  // try to scan for link with schema - that's the most simple rule
  if (this.re.schema_test.test(text)) {
    re$$1 = this.re.schema_search;
    re$$1.lastIndex = 0;
    while ((m = re$$1.exec(text)) !== null) {
      len = this.testSchemaAt(text, m[2], re$$1.lastIndex);
      if (len) {
        this.__schema__     = m[2];
        this.__index__      = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break;
      }
    }
  }

  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
    // guess schemaless links
    tld_pos = text.search(this.re.host_fuzzy_test);
    if (tld_pos >= 0) {
      // if tld is located after found link - no need to check fuzzy pattern
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {

          shift = ml.index + ml[1].length;

          if (this.__index__ < 0 || shift < this.__index__) {
            this.__schema__     = '';
            this.__index__      = shift;
            this.__last_index__ = ml.index + ml[0].length;
          }
        }
      }
    }
  }

  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
    // guess schemaless emails
    at_pos = text.indexOf('@');
    if (at_pos >= 0) {
      // We can't skip this check, because this cases are possible:
      // 192.168.1.1@gmail.com, my.in@example.com
      if ((me = text.match(this.re.email_fuzzy)) !== null) {

        shift = me.index + me[1].length;
        next  = me.index + me[0].length;

        if (this.__index__ < 0 || shift < this.__index__ ||
            (shift === this.__index__ && next > this.__last_index__)) {
          this.__schema__     = 'mailto:';
          this.__index__      = shift;
          this.__last_index__ = next;
        }
      }
    }
  }

  return this.__index__ >= 0;
};


/**
 * LinkifyIt#pretest(text) -> Boolean
 *
 * Very quick check, that can give false positives. Returns true if link MAY BE
 * can exists. Can be used for speed optimization, when you need to check that
 * link NOT exists.
 **/
LinkifyIt.prototype.pretest = function pretest(text) {
  return this.re.pretest.test(text);
};


/**
 * LinkifyIt#testSchemaAt(text, name, position) -> Number
 * - text (String): text to scan
 * - name (String): rule (schema) name
 * - position (Number): text offset to check from
 *
 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
 * at given position. Returns length of found pattern (0 on fail).
 **/
LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
  // If not supported schema check requested - terminate
  if (!this.__compiled__[schema.toLowerCase()]) {
    return 0;
  }
  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
};


/**
 * LinkifyIt#match(text) -> Array|null
 *
 * Returns array of found link descriptions or `null` on fail. We strongly
 * recommend to use [[LinkifyIt#test]] first, for best speed.
 *
 * ##### Result match description
 *
 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
 *   protocol-neutral  links.
 * - __index__ - offset of matched text
 * - __lastIndex__ - index of next char after mathch end
 * - __raw__ - matched text
 * - __text__ - normalized text
 * - __url__ - link, generated from matched text
 **/
LinkifyIt.prototype.match = function match(text) {
  var shift = 0, result = [];

  // Try to take previous element from cache, if .test() called before
  if (this.__index__ >= 0 && this.__text_cache__ === text) {
    result.push(createMatch(this, shift));
    shift = this.__last_index__;
  }

  // Cut head if cache was used
  var tail = shift ? text.slice(shift) : text;

  // Scan string until end reached
  while (this.test(tail)) {
    result.push(createMatch(this, shift));

    tail = tail.slice(this.__last_index__);
    shift += this.__last_index__;
  }

  if (result.length) {
    return result;
  }

  return null;
};


/** chainable
 * LinkifyIt#tlds(list [, keepOld]) -> this
 * - list (Array): list of tlds
 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
 *
 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
 * to avoid false positives. By default this algorythm used:
 *
 * - hostname with any 2-letter root zones are ok.
 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
 *   are ok.
 * - encoded (`xn--...`) root zones are ok.
 *
 * If list is replaced, then exact match for 2-chars root zones will be checked.
 **/
LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
  list = Array.isArray(list) ? list : [ list ];

  if (!keepOld) {
    this.__tlds__ = list.slice();
    this.__tlds_replaced__ = true;
    compile(this);
    return this;
  }

  this.__tlds__ = this.__tlds__.concat(list)
                                  .sort()
                                  .filter(function (el, idx, arr) {
                                    return el !== arr[idx - 1];
                                  })
                                  .reverse();

  compile(this);
  return this;
};

/**
 * LinkifyIt#normalize(match)
 *
 * Default normalizer (if schema does not define it's own).
 **/
LinkifyIt.prototype.normalize = function normalize(match) {

  // Do minimal possible changes by default. Need to collect feedback prior
  // to move forward https://github.com/markdown-it/linkify-it/issues/1

  if (!match.schema) { match.url = 'http://' + match.url; }

  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
    match.url = 'mailto:' + match.url;
  }
};


/**
 * LinkifyIt#onCompile()
 *
 * Override to modify basic RegExp-s.
 **/
LinkifyIt.prototype.onCompile = function onCompile() {
};


var linkifyIt = LinkifyIt;

var tlds = [
  "aaa",
  "aarp",
  "abarth",
  "abb",
  "abbott",
  "abbvie",
  "abc",
  "able",
  "abogado",
  "abudhabi",
  "ac",
  "academy",
  "accenture",
  "accountant",
  "accountants",
  "aco",
  "active",
  "actor",
  "ad",
  "adac",
  "ads",
  "adult",
  "ae",
  "aeg",
  "aero",
  "aetna",
  "af",
  "afamilycompany",
  "afl",
  "africa",
  "ag",
  "agakhan",
  "agency",
  "ai",
  "aig",
  "aigo",
  "airbus",
  "airforce",
  "airtel",
  "akdn",
  "al",
  "alfaromeo",
  "alibaba",
  "alipay",
  "allfinanz",
  "allstate",
  "ally",
  "alsace",
  "alstom",
  "am",
  "americanexpress",
  "americanfamily",
  "amex",
  "amfam",
  "amica",
  "amsterdam",
  "analytics",
  "android",
  "anquan",
  "anz",
  "ao",
  "aol",
  "apartments",
  "app",
  "apple",
  "aq",
  "aquarelle",
  "ar",
  "arab",
  "aramco",
  "archi",
  "army",
  "arpa",
  "art",
  "arte",
  "as",
  "asda",
  "asia",
  "associates",
  "at",
  "athleta",
  "attorney",
  "au",
  "auction",
  "audi",
  "audible",
  "audio",
  "auspost",
  "author",
  "auto",
  "autos",
  "avianca",
  "aw",
  "aws",
  "ax",
  "axa",
  "az",
  "azure",
  "ba",
  "baby",
  "baidu",
  "banamex",
  "bananarepublic",
  "band",
  "bank",
  "bar",
  "barcelona",
  "barclaycard",
  "barclays",
  "barefoot",
  "bargains",
  "baseball",
  "basketball",
  "bauhaus",
  "bayern",
  "bb",
  "bbc",
  "bbt",
  "bbva",
  "bcg",
  "bcn",
  "bd",
  "be",
  "beats",
  "beauty",
  "beer",
  "bentley",
  "berlin",
  "best",
  "bestbuy",
  "bet",
  "bf",
  "bg",
  "bh",
  "bharti",
  "bi",
  "bible",
  "bid",
  "bike",
  "bing",
  "bingo",
  "bio",
  "biz",
  "bj",
  "black",
  "blackfriday",
  "blanco",
  "blockbuster",
  "blog",
  "bloomberg",
  "blue",
  "bm",
  "bms",
  "bmw",
  "bn",
  "bnl",
  "bnpparibas",
  "bo",
  "boats",
  "boehringer",
  "bofa",
  "bom",
  "bond",
  "boo",
  "book",
  "booking",
  "bosch",
  "bostik",
  "boston",
  "bot",
  "boutique",
  "box",
  "br",
  "bradesco",
  "bridgestone",
  "broadway",
  "broker",
  "brother",
  "brussels",
  "bs",
  "bt",
  "budapest",
  "bugatti",
  "build",
  "builders",
  "business",
  "buy",
  "buzz",
  "bv",
  "bw",
  "by",
  "bz",
  "bzh",
  "ca",
  "cab",
  "cafe",
  "cal",
  "call",
  "calvinklein",
  "cam",
  "camera",
  "camp",
  "cancerresearch",
  "canon",
  "capetown",
  "capital",
  "capitalone",
  "car",
  "caravan",
  "cards",
  "care",
  "career",
  "careers",
  "cars",
  "cartier",
  "casa",
  "case",
  "caseih",
  "cash",
  "casino",
  "cat",
  "catering",
  "catholic",
  "cba",
  "cbn",
  "cbre",
  "cbs",
  "cc",
  "cd",
  "ceb",
  "center",
  "ceo",
  "cern",
  "cf",
  "cfa",
  "cfd",
  "cg",
  "ch",
  "chanel",
  "channel",
  "chase",
  "chat",
  "cheap",
  "chintai",
  "christmas",
  "chrome",
  "chrysler",
  "church",
  "ci",
  "cipriani",
  "circle",
  "cisco",
  "citadel",
  "citi",
  "citic",
  "city",
  "cityeats",
  "ck",
  "cl",
  "claims",
  "cleaning",
  "click",
  "clinic",
  "clinique",
  "clothing",
  "cloud",
  "club",
  "clubmed",
  "cm",
  "cn",
  "co",
  "coach",
  "codes",
  "coffee",
  "college",
  "cologne",
  "com",
  "comcast",
  "commbank",
  "community",
  "company",
  "compare",
  "computer",
  "comsec",
  "condos",
  "construction",
  "consulting",
  "contact",
  "contractors",
  "cooking",
  "cookingchannel",
  "cool",
  "coop",
  "corsica",
  "country",
  "coupon",
  "coupons",
  "courses",
  "cr",
  "credit",
  "creditcard",
  "creditunion",
  "cricket",
  "crown",
  "crs",
  "cruise",
  "cruises",
  "csc",
  "cu",
  "cuisinella",
  "cv",
  "cw",
  "cx",
  "cy",
  "cymru",
  "cyou",
  "cz",
  "dabur",
  "dad",
  "dance",
  "data",
  "date",
  "dating",
  "datsun",
  "day",
  "dclk",
  "dds",
  "de",
  "deal",
  "dealer",
  "deals",
  "degree",
  "delivery",
  "dell",
  "deloitte",
  "delta",
  "democrat",
  "dental",
  "dentist",
  "desi",
  "design",
  "dev",
  "dhl",
  "diamonds",
  "diet",
  "digital",
  "direct",
  "directory",
  "discount",
  "discover",
  "dish",
  "diy",
  "dj",
  "dk",
  "dm",
  "dnp",
  "do",
  "docs",
  "doctor",
  "dodge",
  "dog",
  "doha",
  "domains",
  "dot",
  "download",
  "drive",
  "dtv",
  "dubai",
  "duck",
  "dunlop",
  "duns",
  "dupont",
  "durban",
  "dvag",
  "dvr",
  "dz",
  "earth",
  "eat",
  "ec",
  "eco",
  "edeka",
  "edu",
  "education",
  "ee",
  "eg",
  "email",
  "emerck",
  "energy",
  "engineer",
  "engineering",
  "enterprises",
  "epost",
  "epson",
  "equipment",
  "er",
  "ericsson",
  "erni",
  "es",
  "esq",
  "estate",
  "esurance",
  "et",
  "etisalat",
  "eu",
  "eurovision",
  "eus",
  "events",
  "everbank",
  "exchange",
  "expert",
  "exposed",
  "express",
  "extraspace",
  "fage",
  "fail",
  "fairwinds",
  "faith",
  "family",
  "fan",
  "fans",
  "farm",
  "farmers",
  "fashion",
  "fast",
  "fedex",
  "feedback",
  "ferrari",
  "ferrero",
  "fi",
  "fiat",
  "fidelity",
  "fido",
  "film",
  "final",
  "finance",
  "financial",
  "fire",
  "firestone",
  "firmdale",
  "fish",
  "fishing",
  "fit",
  "fitness",
  "fj",
  "fk",
  "flickr",
  "flights",
  "flir",
  "florist",
  "flowers",
  "fly",
  "fm",
  "fo",
  "foo",
  "food",
  "foodnetwork",
  "football",
  "ford",
  "forex",
  "forsale",
  "forum",
  "foundation",
  "fox",
  "fr",
  "free",
  "fresenius",
  "frl",
  "frogans",
  "frontdoor",
  "frontier",
  "ftr",
  "fujitsu",
  "fujixerox",
  "fun",
  "fund",
  "furniture",
  "futbol",
  "fyi",
  "ga",
  "gal",
  "gallery",
  "gallo",
  "gallup",
  "game",
  "games",
  "gap",
  "garden",
  "gb",
  "gbiz",
  "gd",
  "gdn",
  "ge",
  "gea",
  "gent",
  "genting",
  "george",
  "gf",
  "gg",
  "ggee",
  "gh",
  "gi",
  "gift",
  "gifts",
  "gives",
  "giving",
  "gl",
  "glade",
  "glass",
  "gle",
  "global",
  "globo",
  "gm",
  "gmail",
  "gmbh",
  "gmo",
  "gmx",
  "gn",
  "godaddy",
  "gold",
  "goldpoint",
  "golf",
  "goo",
  "goodhands",
  "goodyear",
  "goog",
  "google",
  "gop",
  "got",
  "gov",
  "gp",
  "gq",
  "gr",
  "grainger",
  "graphics",
  "gratis",
  "green",
  "gripe",
  "grocery",
  "group",
  "gs",
  "gt",
  "gu",
  "guardian",
  "gucci",
  "guge",
  "guide",
  "guitars",
  "guru",
  "gw",
  "gy",
  "hair",
  "hamburg",
  "hangout",
  "haus",
  "hbo",
  "hdfc",
  "hdfcbank",
  "health",
  "healthcare",
  "help",
  "helsinki",
  "here",
  "hermes",
  "hgtv",
  "hiphop",
  "hisamitsu",
  "hitachi",
  "hiv",
  "hk",
  "hkt",
  "hm",
  "hn",
  "hockey",
  "holdings",
  "holiday",
  "homedepot",
  "homegoods",
  "homes",
  "homesense",
  "honda",
  "honeywell",
  "horse",
  "hospital",
  "host",
  "hosting",
  "hot",
  "hoteles",
  "hotels",
  "hotmail",
  "house",
  "how",
  "hr",
  "hsbc",
  "ht",
  "hu",
  "hughes",
  "hyatt",
  "hyundai",
  "ibm",
  "icbc",
  "ice",
  "icu",
  "id",
  "ie",
  "ieee",
  "ifm",
  "ikano",
  "il",
  "im",
  "imamat",
  "imdb",
  "immo",
  "immobilien",
  "in",
  "industries",
  "infiniti",
  "info",
  "ing",
  "ink",
  "institute",
  "insurance",
  "insure",
  "int",
  "intel",
  "international",
  "intuit",
  "investments",
  "io",
  "ipiranga",
  "iq",
  "ir",
  "irish",
  "is",
  "iselect",
  "ismaili",
  "ist",
  "istanbul",
  "it",
  "itau",
  "itv",
  "iveco",
  "iwc",
  "jaguar",
  "java",
  "jcb",
  "jcp",
  "je",
  "jeep",
  "jetzt",
  "jewelry",
  "jio",
  "jlc",
  "jll",
  "jm",
  "jmp",
  "jnj",
  "jo",
  "jobs",
  "joburg",
  "jot",
  "joy",
  "jp",
  "jpmorgan",
  "jprs",
  "juegos",
  "juniper",
  "kaufen",
  "kddi",
  "ke",
  "kerryhotels",
  "kerrylogistics",
  "kerryproperties",
  "kfh",
  "kg",
  "kh",
  "ki",
  "kia",
  "kim",
  "kinder",
  "kindle",
  "kitchen",
  "kiwi",
  "km",
  "kn",
  "koeln",
  "komatsu",
  "kosher",
  "kp",
  "kpmg",
  "kpn",
  "kr",
  "krd",
  "kred",
  "kuokgroup",
  "kw",
  "ky",
  "kyoto",
  "kz",
  "la",
  "lacaixa",
  "ladbrokes",
  "lamborghini",
  "lamer",
  "lancaster",
  "lancia",
  "lancome",
  "land",
  "landrover",
  "lanxess",
  "lasalle",
  "lat",
  "latino",
  "latrobe",
  "law",
  "lawyer",
  "lb",
  "lc",
  "lds",
  "lease",
  "leclerc",
  "lefrak",
  "legal",
  "lego",
  "lexus",
  "lgbt",
  "li",
  "liaison",
  "lidl",
  "life",
  "lifeinsurance",
  "lifestyle",
  "lighting",
  "like",
  "lilly",
  "limited",
  "limo",
  "lincoln",
  "linde",
  "link",
  "lipsy",
  "live",
  "living",
  "lixil",
  "lk",
  "llc",
  "loan",
  "loans",
  "locker",
  "locus",
  "loft",
  "lol",
  "london",
  "lotte",
  "lotto",
  "love",
  "lpl",
  "lplfinancial",
  "lr",
  "ls",
  "lt",
  "ltd",
  "ltda",
  "lu",
  "lundbeck",
  "lupin",
  "luxe",
  "luxury",
  "lv",
  "ly",
  "ma",
  "macys",
  "madrid",
  "maif",
  "maison",
  "makeup",
  "man",
  "management",
  "mango",
  "map",
  "market",
  "marketing",
  "markets",
  "marriott",
  "marshalls",
  "maserati",
  "mattel",
  "mba",
  "mc",
  "mckinsey",
  "md",
  "me",
  "med",
  "media",
  "meet",
  "melbourne",
  "meme",
  "memorial",
  "men",
  "menu",
  "meo",
  "merckmsd",
  "metlife",
  "mg",
  "mh",
  "miami",
  "microsoft",
  "mil",
  "mini",
  "mint",
  "mit",
  "mitsubishi",
  "mk",
  "ml",
  "mlb",
  "mls",
  "mm",
  "mma",
  "mn",
  "mo",
  "mobi",
  "mobile",
  "mobily",
  "moda",
  "moe",
  "moi",
  "mom",
  "monash",
  "money",
  "monster",
  "mopar",
  "mormon",
  "mortgage",
  "moscow",
  "moto",
  "motorcycles",
  "mov",
  "movie",
  "movistar",
  "mp",
  "mq",
  "mr",
  "ms",
  "msd",
  "mt",
  "mtn",
  "mtr",
  "mu",
  "museum",
  "mutual",
  "mv",
  "mw",
  "mx",
  "my",
  "mz",
  "na",
  "nab",
  "nadex",
  "nagoya",
  "name",
  "nationwide",
  "natura",
  "navy",
  "nba",
  "nc",
  "ne",
  "nec",
  "net",
  "netbank",
  "netflix",
  "network",
  "neustar",
  "new",
  "newholland",
  "news",
  "next",
  "nextdirect",
  "nexus",
  "nf",
  "nfl",
  "ng",
  "ngo",
  "nhk",
  "ni",
  "nico",
  "nike",
  "nikon",
  "ninja",
  "nissan",
  "nissay",
  "nl",
  "no",
  "nokia",
  "northwesternmutual",
  "norton",
  "now",
  "nowruz",
  "nowtv",
  "np",
  "nr",
  "nra",
  "nrw",
  "ntt",
  "nu",
  "nyc",
  "nz",
  "obi",
  "observer",
  "off",
  "office",
  "okinawa",
  "olayan",
  "olayangroup",
  "oldnavy",
  "ollo",
  "om",
  "omega",
  "one",
  "ong",
  "onl",
  "online",
  "onyourside",
  "ooo",
  "open",
  "oracle",
  "orange",
  "org",
  "organic",
  "origins",
  "osaka",
  "otsuka",
  "ott",
  "ovh",
  "pa",
  "page",
  "panasonic",
  "panerai",
  "paris",
  "pars",
  "partners",
  "parts",
  "party",
  "passagens",
  "pay",
  "pccw",
  "pe",
  "pet",
  "pf",
  "pfizer",
  "pg",
  "ph",
  "pharmacy",
  "phd",
  "philips",
  "phone",
  "photo",
  "photography",
  "photos",
  "physio",
  "piaget",
  "pics",
  "pictet",
  "pictures",
  "pid",
  "pin",
  "ping",
  "pink",
  "pioneer",
  "pizza",
  "pk",
  "pl",
  "place",
  "play",
  "playstation",
  "plumbing",
  "plus",
  "pm",
  "pn",
  "pnc",
  "pohl",
  "poker",
  "politie",
  "porn",
  "post",
  "pr",
  "pramerica",
  "praxi",
  "press",
  "prime",
  "pro",
  "prod",
  "productions",
  "prof",
  "progressive",
  "promo",
  "properties",
  "property",
  "protection",
  "pru",
  "prudential",
  "ps",
  "pt",
  "pub",
  "pw",
  "pwc",
  "py",
  "qa",
  "qpon",
  "quebec",
  "quest",
  "qvc",
  "racing",
  "radio",
  "raid",
  "re",
  "read",
  "realestate",
  "realtor",
  "realty",
  "recipes",
  "red",
  "redstone",
  "redumbrella",
  "rehab",
  "reise",
  "reisen",
  "reit",
  "reliance",
  "ren",
  "rent",
  "rentals",
  "repair",
  "report",
  "republican",
  "rest",
  "restaurant",
  "review",
  "reviews",
  "rexroth",
  "rich",
  "richardli",
  "ricoh",
  "rightathome",
  "ril",
  "rio",
  "rip",
  "rmit",
  "ro",
  "rocher",
  "rocks",
  "rodeo",
  "rogers",
  "room",
  "rs",
  "rsvp",
  "ru",
  "rugby",
  "ruhr",
  "run",
  "rw",
  "rwe",
  "ryukyu",
  "sa",
  "saarland",
  "safe",
  "safety",
  "sakura",
  "sale",
  "salon",
  "samsclub",
  "samsung",
  "sandvik",
  "sandvikcoromant",
  "sanofi",
  "sap",
  "sapo",
  "sarl",
  "sas",
  "save",
  "saxo",
  "sb",
  "sbi",
  "sbs",
  "sc",
  "sca",
  "scb",
  "schaeffler",
  "schmidt",
  "scholarships",
  "school",
  "schule",
  "schwarz",
  "science",
  "scjohnson",
  "scor",
  "scot",
  "sd",
  "se",
  "search",
  "seat",
  "secure",
  "security",
  "seek",
  "select",
  "sener",
  "services",
  "ses",
  "seven",
  "sew",
  "sex",
  "sexy",
  "sfr",
  "sg",
  "sh",
  "shangrila",
  "sharp",
  "shaw",
  "shell",
  "shia",
  "shiksha",
  "shoes",
  "shop",
  "shopping",
  "shouji",
  "show",
  "showtime",
  "shriram",
  "si",
  "silk",
  "sina",
  "singles",
  "site",
  "sj",
  "sk",
  "ski",
  "skin",
  "sky",
  "skype",
  "sl",
  "sling",
  "sm",
  "smart",
  "smile",
  "sn",
  "sncf",
  "so",
  "soccer",
  "social",
  "softbank",
  "software",
  "sohu",
  "solar",
  "solutions",
  "song",
  "sony",
  "soy",
  "space",
  "spiegel",
  "sport",
  "spot",
  "spreadbetting",
  "sr",
  "srl",
  "srt",
  "st",
  "stada",
  "staples",
  "star",
  "starhub",
  "statebank",
  "statefarm",
  "statoil",
  "stc",
  "stcgroup",
  "stockholm",
  "storage",
  "store",
  "stream",
  "studio",
  "study",
  "style",
  "su",
  "sucks",
  "supplies",
  "supply",
  "support",
  "surf",
  "surgery",
  "suzuki",
  "sv",
  "swatch",
  "swiftcover",
  "swiss",
  "sx",
  "sy",
  "sydney",
  "symantec",
  "systems",
  "sz",
  "tab",
  "taipei",
  "talk",
  "taobao",
  "target",
  "tatamotors",
  "tatar",
  "tattoo",
  "tax",
  "taxi",
  "tc",
  "tci",
  "td",
  "tdk",
  "team",
  "tech",
  "technology",
  "tel",
  "telecity",
  "telefonica",
  "temasek",
  "tennis",
  "teva",
  "tf",
  "tg",
  "th",
  "thd",
  "theater",
  "theatre",
  "tiaa",
  "tickets",
  "tienda",
  "tiffany",
  "tips",
  "tires",
  "tirol",
  "tj",
  "tjmaxx",
  "tjx",
  "tk",
  "tkmaxx",
  "tl",
  "tm",
  "tmall",
  "tn",
  "to",
  "today",
  "tokyo",
  "tools",
  "top",
  "toray",
  "toshiba",
  "total",
  "tours",
  "town",
  "toyota",
  "toys",
  "tr",
  "trade",
  "trading",
  "training",
  "travel",
  "travelchannel",
  "travelers",
  "travelersinsurance",
  "trust",
  "trv",
  "tt",
  "tube",
  "tui",
  "tunes",
  "tushu",
  "tv",
  "tvs",
  "tw",
  "tz",
  "ua",
  "ubank",
  "ubs",
  "uconnect",
  "ug",
  "uk",
  "unicom",
  "university",
  "uno",
  "uol",
  "ups",
  "us",
  "uy",
  "uz",
  "va",
  "vacations",
  "vana",
  "vanguard",
  "vc",
  "ve",
  "vegas",
  "ventures",
  "verisign",
  "versicherung",
  "vet",
  "vg",
  "vi",
  "viajes",
  "video",
  "vig",
  "viking",
  "villas",
  "vin",
  "vip",
  "virgin",
  "visa",
  "vision",
  "vista",
  "vistaprint",
  "viva",
  "vivo",
  "vlaanderen",
  "vn",
  "vodka",
  "volkswagen",
  "volvo",
  "vote",
  "voting",
  "voto",
  "voyage",
  "vu",
  "vuelos",
  "wales",
  "walmart",
  "walter",
  "wang",
  "wanggou",
  "warman",
  "watch",
  "watches",
  "weather",
  "weatherchannel",
  "webcam",
  "weber",
  "website",
  "wed",
  "wedding",
  "weibo",
  "weir",
  "wf",
  "whoswho",
  "wien",
  "wiki",
  "williamhill",
  "win",
  "windows",
  "wine",
  "winners",
  "wme",
  "wolterskluwer",
  "woodside",
  "work",
  "works",
  "world",
  "wow",
  "ws",
  "wtc",
  "wtf",
  "xbox",
  "xerox",
  "xfinity",
  "xihuan",
  "xin",
  "कॉम", // xn--11b4c3d
  "セール", // xn--1ck2e1b
  "佛山", // xn--1qqw23a
  "ಭಾರತ", // xn--2scrj9c
  "慈善", // xn--30rr7y
  "集团", // xn--3bst00m
  "在线", // xn--3ds443g
  "한국", // xn--3e0b707e
  "ଭାରତ", // xn--3hcrj9c
  "大众汽车", // xn--3oq18vl8pn36a
  "点看", // xn--3pxu8k
  "คอม", // xn--42c2d9a
  "ভাৰত", // xn--45br5cyl
  "ভারত", // xn--45brj9c
  "八卦", // xn--45q11c
  "موقع", // xn--4gbrim
  "বাংলা", // xn--54b7fta0cc
  "公益", // xn--55qw42g
  "公司", // xn--55qx5d
  "香格里拉", // xn--5su34j936bgsg
  "网站", // xn--5tzm5g
  "移动", // xn--6frz82g
  "我爱你", // xn--6qq986b3xl
  "москва", // xn--80adxhks
  "қаз", // xn--80ao21a
  "католик", // xn--80aqecdr1a
  "онлайн", // xn--80asehdb
  "сайт", // xn--80aswg
  "联通", // xn--8y0a063a
  "срб", // xn--90a3ac
  "бг", // xn--90ae
  "бел", // xn--90ais
  "קום", // xn--9dbq2a
  "时尚", // xn--9et52u
  "微博", // xn--9krt00a
  "淡马锡", // xn--b4w605ferd
  "ファッション", // xn--bck1b9a5dre4c
  "орг", // xn--c1avg
  "नेट", // xn--c2br7g
  "ストア", // xn--cck2b3b
  "삼성", // xn--cg4bki
  "சிங்கப்பூர்", // xn--clchc0ea0b2g2a9gcd
  "商标", // xn--czr694b
  "商店", // xn--czrs0t
  "商城", // xn--czru2d
  "дети", // xn--d1acj3b
  "мкд", // xn--d1alf
  "ею", // xn--e1a4c
  "ポイント", // xn--eckvdtc9d
  "新闻", // xn--efvy88h
  "工行", // xn--estv75g
  "家電", // xn--fct429k
  "كوم", // xn--fhbei
  "中文网", // xn--fiq228c5hs
  "中信", // xn--fiq64b
  "中国", // xn--fiqs8s
  "中國", // xn--fiqz9s
  "娱乐", // xn--fjq720a
  "谷歌", // xn--flw351e
  "భారత్", // xn--fpcrj9c3d
  "ලංකා", // xn--fzc2c9e2c
  "電訊盈科", // xn--fzys8d69uvgm
  "购物", // xn--g2xx48c
  "クラウド", // xn--gckr3f0f
  "ભારત", // xn--gecrj9c
  "通販", // xn--gk3at1e
  "भारतम्", // xn--h2breg3eve
  "भारत", // xn--h2brj9c
  "भारोत", // xn--h2brj9c8c
  "网店", // xn--hxt814e
  "संगठन", // xn--i1b6b1a6a2e
  "餐厅", // xn--imr513n
  "网络", // xn--io0a7i
  "ком", // xn--j1aef
  "укр", // xn--j1amh
  "香港", // xn--j6w193g
  "诺基亚", // xn--jlq61u9w7b
  "食品", // xn--jvr189m
  "飞利浦", // xn--kcrx77d1x4a
  "台湾", // xn--kprw13d
  "台灣", // xn--kpry57d
  "手表", // xn--kpu716f
  "手机", // xn--kput3i
  "мон", // xn--l1acc
  "الجزائر", // xn--lgbbat1ad8j
  "عمان", // xn--mgb9awbf
  "ارامكو", // xn--mgba3a3ejt
  "ایران", // xn--mgba3a4f16a
  "العليان", // xn--mgba7c0bbn0a
  "اتصالات", // xn--mgbaakc7dvf
  "امارات", // xn--mgbaam7a8h
  "بازار", // xn--mgbab2bd
  "پاکستان", // xn--mgbai9azgqp6j
  "الاردن", // xn--mgbayh7gpa
  "موبايلي", // xn--mgbb9fbpob
  "بارت", // xn--mgbbh1a
  "بھارت", // xn--mgbbh1a71e
  "المغرب", // xn--mgbc0a9azcg
  "ابوظبي", // xn--mgbca7dzdo
  "السعودية", // xn--mgberp4a5d4ar
  "ڀارت", // xn--mgbgu82a
  "كاثوليك", // xn--mgbi4ecexp
  "سودان", // xn--mgbpl2fh
  "همراه", // xn--mgbt3dhd
  "عراق", // xn--mgbtx2b
  "مليسيا", // xn--mgbx4cd0ab
  "澳門", // xn--mix891f
  "닷컴", // xn--mk1bu44c
  "政府", // xn--mxtq1m
  "شبكة", // xn--ngbc5azd
  "بيتك", // xn--ngbe9e0a
  "عرب", // xn--ngbrx
  "გე", // xn--node
  "机构", // xn--nqv7f
  "组织机构", // xn--nqv7fs00ema
  "健康", // xn--nyqy26a
  "ไทย", // xn--o3cw4h
  "سورية", // xn--ogbpf8fl
  "招聘", // xn--otu796d
  "рус", // xn--p1acf
  "рф", // xn--p1ai
  "珠宝", // xn--pbt977c
  "تونس", // xn--pgbs0dh
  "大拿", // xn--pssy2u
  "みんな", // xn--q9jyb4c
  "グーグル", // xn--qcka1pmc
  "ελ", // xn--qxam
  "世界", // xn--rhqv96g
  "書籍", // xn--rovu88b
  "ഭാരതം", // xn--rvc1e0am3e
  "ਭਾਰਤ", // xn--s9brj9c
  "网址", // xn--ses554g
  "닷넷", // xn--t60b56a
  "コム", // xn--tckwe
  "天主教", // xn--tiq49xqyj
  "游戏", // xn--unup4y
  "vermögensberater", // xn--vermgensberater-ctb
  "vermögensberatung", // xn--vermgensberatung-pwb
  "企业", // xn--vhquv
  "信息", // xn--vuq861b
  "嘉里大酒店", // xn--w4r85el8fhu5dnra
  "嘉里", // xn--w4rs40l
  "مصر", // xn--wgbh1c
  "قطر", // xn--wgbl6a
  "广东", // xn--xhq521b
  "இலங்கை", // xn--xkc2al3hye2a
  "இந்தியா", // xn--xkc2dl3a5ee0h
  "հայ", // xn--y9a3aq
  "新加坡", // xn--yfro4i67o
  "فلسطين", // xn--ygbi2ammx
  "政务", // xn--zfr164b
  "xperia",
  "xxx",
  "xyz",
  "yachts",
  "yahoo",
  "yamaxun",
  "yandex",
  "ye",
  "yodobashi",
  "yoga",
  "yokohama",
  "you",
  "youtube",
  "yt",
  "yun",
  "za",
  "zappos",
  "zara",
  "zero",
  "zip",
  "zippo",
  "zm",
  "zone",
  "zuerich",
  "zw"
];

var Linkify_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkify = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(react);



var _linkifyIt2 = _interopRequireDefault(linkifyIt);



var _tlds2 = _interopRequireDefault(tlds);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var linkify = exports.linkify = new _linkifyIt2.default();
linkify.tlds(_tlds2.default);

var Linkify = function (_React$Component) {
  _inherits(Linkify, _React$Component);

  function Linkify() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Linkify);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Linkify.__proto__ || Object.getPrototypeOf(Linkify)).call.apply(_ref, [this].concat(args))), _this), _this.parseCounter = 0, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Linkify, [{
    key: 'getMatches',
    value: function getMatches(string) {
      return linkify.match(string);
    }
  }, {
    key: 'parseString',
    value: function parseString(string) {
      var _this2 = this;

      var elements = [];
      if (string === '') {
        return elements;
      }

      var matches = this.getMatches(string);
      if (!matches) {
        return string;
      }

      var lastIndex = 0;
      matches.forEach(function (match, idx) {
        // Push the preceding text if there is any
        if (match.index > lastIndex) {
          elements.push(string.substring(lastIndex, match.index));
        }
        // Shallow update values that specified the match
        var props = { href: match.url, key: 'parse' + _this2.parseCounter + 'match' + idx };
        for (var key in _this2.props.properties) {
          var val = _this2.props.properties[key];
          if (val === Linkify.MATCH) {
            val = match.url;
          }

          props[key] = val;
        }
        elements.push(_react2.default.createElement(_this2.props.component, props, match.text));
        lastIndex = match.lastIndex;
      });

      if (lastIndex < string.length) {
        elements.push(string.substring(lastIndex));
      }

      return elements.length === 1 ? elements[0] : elements;
    }
  }, {
    key: 'parse',
    value: function parse(children) {
      var _this3 = this;

      var parsed = children;

      if (typeof children === 'string') {
        parsed = this.parseString(children);
      } else if (_react2.default.isValidElement(children) && children.type !== 'a' && children.type !== 'button') {
        parsed = _react2.default.cloneElement(children, { key: 'parse' + ++this.parseCounter }, this.parse(children.props.children));
      } else if (children instanceof Array) {
        parsed = children.map(function (child) {
          return _this3.parse(child);
        });
      }

      return parsed;
    }
  }, {
    key: 'render',
    value: function render() {
      this.parseCounter = 0;
      var parsedChildren = this.parse(this.props.children);

      return _react2.default.createElement(
        'span',
        { className: this.props.className },
        parsedChildren
      );
    }
  }]);

  return Linkify;
}(_react2.default.Component);

Linkify.MATCH = 'LINKIFY_MATCH';
Linkify.propTypes = {
  className: _propTypes2.default.string,
  component: _propTypes2.default.any,
  properties: _propTypes2.default.object,
  urlRegex: _propTypes2.default.object,
  emailRegex: _propTypes2.default.object
};
Linkify.defaultProps = {
  className: 'Linkify',
  component: 'a',
  properties: {}
};
exports.default = Linkify;
});

var Linkify = unwrapExports(Linkify_1);
var Linkify_2 = Linkify_1.linkify;

var Post = function (_Component) {
	inherits(Post, _Component);

	function Post(props) {
		var _this2 = this;

		classCallCheck(this, Post);

		var _this = possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, props));

		Object.defineProperty(_this, "resubmit", {
			enumerable: true,
			writable: true,
			value: function value() {
				return _this.props.retryPost(_this.props.post.id);
			}
		});
		Object.defineProperty(_this, "cancel", {
			enumerable: true,
			writable: true,
			value: function value() {
				return _this.props.cancelPost(_this.props.post.id);
			}
		});
		Object.defineProperty(_this, "renderEmote", {
			enumerable: true,
			writable: true,
			value: function value(post) {
				var matches = post.text.match(/^\/me\s+(.*)/);
				if (matches) return react.createElement(
					"span",
					{ className: "emote" },
					matches[1]
				);else return null;
			}
		});
		Object.defineProperty(_this, "renderBody", {
			enumerable: true,
			writable: true,
			value: function value(post) {
				if (_this.props.editing) return _this.renderBodyEditing(post);else if (post.text.match(/^\/me\s/)) return null;else return _this.renderBodyLinkified(post);
			}
		});
		Object.defineProperty(_this, "renderBodyLinkified", {
			enumerable: true,
			writable: true,
			value: function value(post) {
				var usernameRegExp = new RegExp("(@(?:" + _this.props.usernames + ")\\b)");
				var bodyParts = post.text.split(usernameRegExp);
				var iterator = 0;
				return bodyParts.map(function (part) {
					if (part.match(usernameRegExp)) {
						if (part === "@" + _this.props.currentUsername) return react.createElement(
							"span",
							{ key: iterator++, className: "at-mention me" },
							part
						);else return react.createElement(
							"span",
							{ key: iterator++, className: "at-mention" },
							part
						);
					} else {
						return react.createElement(
							Linkify,
							{ key: iterator++ },
							part
						);
					}
				});
			}
		});
		Object.defineProperty(_this, "renderBodyEditing", {
			enumerable: true,
			writable: true,
			value: function value(post) {
				var id = "input-div-" + post.id;

				return react.createElement(
					"div",
					{ className: "edit-post" },
					react.createElement(ContentEditable, {
						className: "native-key-bindings",
						id: id,
						rows: "1",
						tabIndex: "-1",
						onChange: _this.handleOnChange,
						onBlur: _this.handleOnBlur,
						html: post.text,
						ref: function ref(_ref) {
							return _this._contentEditable = _ref;
						}
					}),
					react.createElement(
						"div",
						{ className: "button-group" },
						react.createElement(
							Button,
							{
								id: "save-button",
								className: "control-button",
								tabIndex: "2",
								type: "submit",
								loading: _this.props.loading,
								onClick: _this.handleClickSave
							},
							"Save Changes"
						),
						react.createElement(
							Button,
							{
								id: "discard-button",
								className: "control-button cancel",
								tabIndex: "2",
								type: "submit",
								loading: _this.props.loading,
								onClick: _this.handleClickDiscard
							},
							"Discard"
						)
					)
				);
			}
		});
		Object.defineProperty(_this, "handleMenuClick", {
			enumerable: true,
			writable: true,
			value: function () {
				var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									event.stopPropagation();
									_this.setState({ menuOpen: !_this.state.menuOpen });
									console.log("CLICK ON MENU: ");

								case 3:
								case "end":
									return _context.stop();
							}
						}
					}, _callee, _this2);
				}));

				function value(_x) {
					return _ref2.apply(this, arguments);
				}

				return value;
			}()
		});
		Object.defineProperty(_this, "handleSelectMenu", {
			enumerable: true,
			writable: true,
			value: function value(event, id) {
				console.log("Clicked: " + id);
				event.stopPropagation();
				_this.setState({ menuOpen: false });
			}
		});

		_this.state = {
			menuOpen: false
		};
		return _this;
	}

	createClass(Post, [{
		key: "render",
		value: function render() {
			var _this3 = this;

			var post = this.props.post;


			var mine = this.props.currentUsername === post.author.username;

			var postClass = classnames(defineProperty$1({
				post: true,
				mine: mine,
				editing: this.props.editing,
				unread: this.props.unread,
				"new-separator": this.props.newMessageIndicator
			}, "thread-key-" + this.props.threadKey, true));

			var codeBlock = null;
			if (post.codeBlocks && post.codeBlocks.length) {
				var code = post.codeBlocks[0].code;
				codeBlock = react.createElement(
					"div",
					{ className: "code-reference" },
					react.createElement(
						"span",
						null,
						post.codeBlocks[0].file || "-"
					),
					react.createElement(
						"div",
						{ className: "code" },
						code
					)
				);
			}

			// let menuItems = [
			// 	{ label: "Create Thread", key: "make-thread" },
			// 	{ label: "Mark Unread", key: "mark-unread" },
			// 	// { label: "Add Reaction", key: "add-reaction" },
			// 	// { label: "Pin to Stream", key: "pin-to-stream" },
			// 	{ label: "Edit Message", key: "edit-message" },
			// 	{ label: "Delete Message", key: "delete-message" }
			// ];

			// let menu = this.state.menuOpen ? (
			// <Menu items={menuItems} handleSelectMenu={this.handleSelectMenu} />
			// ) : null;

			var parentPost = this.props.replyingTo;
			var alertClass = this.props.alert ? "icon icon-" + this.props.alert : null;

			// this was above Headshot
			// <span className="icon icon-gear" onClick={this.handleMenuClick} />
			// {menu}

			return react.createElement(
				"div",
				{
					className: postClass,
					id: post.id,
					"data-seq-num": post.seqNum,
					thread: post.parentPostId || post.id,
					ref: function ref(_ref4) {
						return _this3._div = _ref4;
					}
				},
				react.createElement(Headshot, { size: 36, person: post.author, mine: mine }),
				react.createElement(
					"span",
					{ className: "author", ref: function ref(_ref3) {
							return _this3._authorDiv = _ref3;
						} },
					post.author.username,
					this.renderEmote(post)
				),
				post.error ? react.createElement(RetrySpinner, { callback: this.resubmit, cancel: this.cancel }) : react.createElement(Timestamp, { time: post.createdAt }),
				react.createElement(
					"div",
					{ className: "body" },
					parentPost && react.createElement(
						"div",
						{ className: "replying-to" },
						react.createElement(
							"span",
							null,
							"reply to"
						),
						" ",
						react.createElement(
							"b",
							null,
							parentPost.text.substr(0, 80)
						)
					),
					codeBlock,
					this.props.showDetails && react.createElement(PostDetails, { post: post, currentCommit: this.props.currentCommit }),
					alertClass && react.createElement("span", { className: alertClass }),
					this.renderBody(post),
					!this.props.editng && post.hasBeenEdited && react.createElement(
						"span",
						{ className: "edited" },
						"(edited)"
					)
				)
			);
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps, _prevState) {
			if (this.props.editing && !prevProps.editing) {
				document.getElementById("input-div-" + this.props.post.id).focus();
			}
		}
	}]);
	return Post;
}(react_1);

var Post$1 = connect(null, { cancelPost: cancelPost, retryPost: retryPost })(Post);

// AtMentionsPopup expects an on/off switch determined by the on property
// on = show the popup, off = hide the popup
// a people list, which is the possible list of people to at-mention
// with the format:
// [id, nickname, full name, email, headshot, presence]
// and a prefix, which is used to filter/match against the list

var AtMentionsPopup = function (_Component) {
	inherits(AtMentionsPopup, _Component);

	function AtMentionsPopup() {
		var _ref,
		    _this2 = this;

		var _temp, _this, _ret;

		classCallCheck(this, AtMentionsPopup);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = AtMentionsPopup.__proto__ || Object.getPrototypeOf(AtMentionsPopup)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, "handleClick", {
			enumerable: true,
			writable: true,
			value: function () {
				var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									console.log("CLICK ON MENTION: " + event.target.innerHTML);

								case 1:
								case "end":
									return _context.stop();
							}
						}
					}, _callee, _this2);
				}));

				function value(_x) {
					return _ref2.apply(this, arguments);
				}

				return value;
			}()
		}), _temp), possibleConstructorReturn(_this, _ret);
	}

	createClass(AtMentionsPopup, [{
		key: "render",
		value: function render() {
			var _this3 = this;

			if (!this.props.on) return null;

			var people = this.props.people;

			return react.createElement(
				"div",
				{ className: "mentions-popup", ref: function ref(_ref3) {
						return _this3._div = _ref3;
					} },
				react.createElement(
					"div",
					{ className: "body" },
					react.createElement(
						"div",
						{ className: "instructions", onClick: function onClick(event) {
								return _this3.handleClickInstructions();
							} },
						"People matching ",
						react.createElement(
							"b",
							null,
							"\"@",
							this.props.prefix,
							"\""
						)
					),
					react.createElement(
						"ul",
						{ className: "compact at-mentions-list" },
						this.props.people.map(function (person) {
							var className = person.id == _this3.props.selected ? "hover" : "none";
							var identifier = person.username || person.email;
							// the handleClickPerson event needs to fire onMouseDown
							// rather than onclick because there is a handleblur
							// event on the parent element that will un-render
							// this component
							return react.createElement(
								"li",
								{
									className: className,
									key: person.id,
									onMouseEnter: function onMouseEnter(event) {
										return _this3.handleMouseEnter(person.id);
									},
									onMouseDown: function onMouseDown(event) {
										return _this3.handleClickPerson(person.id);
									}
								},
								react.createElement(Headshot, { size: 18, person: person }),
								react.createElement(
									"span",
									{ className: "username" },
									identifier
								),
								" ",
								react.createElement(
									"span",
									{ className: "name" },
									person.firstName,
									" ",
									person.lastName
								)
							);
						})
					),
					react.createElement(
						"table",
						null,
						react.createElement(
							"tbody",
							null,
							react.createElement(
								"tr",
								null,
								react.createElement(
									"td",
									null,
									"\u2191 or \u2193 to navigate"
								),
								react.createElement(
									"td",
									null,
									"\u21B5 to select"
								),
								react.createElement(
									"td",
									null,
									"esc to dismiss"
								)
							)
						)
					)
				)
			);
		}
	}, {
		key: "handleMouseEnter",
		value: function handleMouseEnter(id) {
			return this.props.handleHoverAtMention(id);
		}
	}, {
		key: "handleClickPerson",
		value: function handleClickPerson(id) {
			return this.props.handleSelectAtMention(id);
		}
	}, {
		key: "handleClickInstructions",
		value: function handleClickInstructions() {
			return this.props.handleSelectAtMention();
		}
	}, {
		key: "selectFirstAtMention",
		value: function selectFirstAtMention() {
			// FIXME -- how to build this?
		}
	}]);
	return AtMentionsPopup;
}(react_1);

var ComposeBox = function (_React$Component) {
	inherits(ComposeBox, _React$Component);

	function ComposeBox() {
		var _ref;

		var _temp, _this, _ret;

		classCallCheck(this, ComposeBox);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ComposeBox.__proto__ || Object.getPrototypeOf(ComposeBox)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, "state", {
			enumerable: true,
			writable: true,
			value: { newPostText: "", quote: null, autoMentions: [] }
		}), Object.defineProperty(_this, "disposables", {
			enumerable: true,
			writable: true,
			value: []
		}), Object.defineProperty(_this, "handleInteractionEvent", {
			enumerable: true,
			writable: true,
			value: function value(_ref2) {
				var data = _ref2.data;

				if (data.type === "codestream:interaction:code-highlighted") {
					console.log("event data", data.body);
					_this.focus();
					var _data$body = data.body,
					    authors = _data$body.authors,
					    state = objectWithoutProperties(_data$body, ["authors"]);

					_this.setState({ quote: state });

					var toAtmention = authors.map(function (email) {
						return underscore.findWhere(_this.props.teammates, { email: email });
					}).filter(Boolean);
					if (toAtmention.length > 0) {
						// TODO handle users with no username
						var usernames = toAtmention.map(function (user) {
							return "@" + user.username;
						});
						_this.setState({ autoMentions: usernames });
						// the reason for this unicode space is that chrome will
						// not render a space at the end of a contenteditable div
						// unless it is a &nbsp;, which is difficult to insert
						// so we insert this unicode character instead
						var newText = usernames.join(", ") + ":\xA0";
						_this.insertTextAtCursor(newText);
					}
				}
			}
		}), Object.defineProperty(_this, "focus", {
			enumerable: true,
			writable: true,
			value: function value() {
				_this._contentEditable.htmlEl.focus();
			}
		}), Object.defineProperty(_this, "handleHoverAtMention", {
			enumerable: true,
			writable: true,
			value: function value(id) {
				var index = _this.state.atMentionsPeople.findIndex(function (x) {
					return x.id == id;
				});

				_this.setState({
					atMentionsIndex: index,
					selectedAtMention: id
				});
			}
		}), Object.defineProperty(_this, "handleSelectAtMention", {
			enumerable: true,
			writable: true,
			value: function value(id) {
				// if no id is passed, we assume that we're selecting
				// the currently-selected at mention
				if (!id) {
					id = _this.state.selectedAtMention;
				}

				var user = _this.props.teammates.find(function (t) {
					return t.id === id;
				});
				if (!user) return;
				var username = user.username;
				// otherwise explicitly use the one passed in
				// FIXME -- this should anchor at the carat, not end-of-line
				// var re = new RegExp("@" + this.state.atMentionsPrefix);
				_this.setState({
					atMentionsOn: false
				});
				// the reason for this unicode space is that chrome will
				// not render a space at the end of a contenteditable div
				// unless it is a &nbsp;, which is difficult to insert
				// so we insert this unicode character instead
				var toInsert = username + "\xA0";
				setTimeout(function () {
					_this.focus();
				}, 20);
				_this.insertTextAtCursor(toInsert, _this.state.atMentionsPrefix);
				// this.setNewPostText(text);
			}
		}), Object.defineProperty(_this, "handleChange", {
			enumerable: true,
			writable: true,
			value: function value(event) {
				var newPostText = event.target.value;

				var selection = window.getSelection();
				var range = selection.getRangeAt(0);
				var node = range.commonAncestorContainer;
				var nodeText = node.textContent || "";
				var upToCursor = nodeText.substring(0, range.startOffset);
				var match = upToCursor.match(/@([a-zA-Z0-9_.+]*)$/);
				if (_this.state.atMentionsOn) {
					if (match) {
						_this.showAtMentionSelectors(match[0].replace(/@/, ""));
					} else {
						// if the line doesn't end with @word, then hide the popup
						_this.setState({ atMentionsOn: false });
					}
				} else {
					if (match) {
						_this.showAtMentionSelectors(match[0].replace(/@/, ""));
					}
				}
				// track newPostText as the user types
				_this.setState({
					newPostText: newPostText,
					autoMentions: _this.state.autoMentions.filter(function (mention) {
						return newPostText.includes(mention);
					})
				});
			}
		}), Object.defineProperty(_this, "handleBlur", {
			enumerable: true,
			writable: true,
			value: function value(event) {
				event.preventDefault();
				_this.setState({
					atMentionsOn: false
				});
			}
		}), Object.defineProperty(_this, "handleKeyPress", {
			enumerable: true,
			writable: true,
			value: function value(event) {
				var newPostText = _this.state.newPostText;

				// if we have the at-mentions popup open, then the keys
				// do something different than if we have the focus in
				// the textarea
				if (_this.state.atMentionsOn) {
					if (event.key == "Escape") {
						_this.hideAtMentionSelectors();
					} else if (event.key == "Enter" && !event.shiftKey) {
						event.preventDefault();
						_this.selectFirstAtMention();
					} else {
						var match = newPostText.match(/@([a-zA-Z0-9_.]*)$/);
						var text = match ? match[0].replace(/@/, "") : "";
						// this.showAtMentionSelectors(text);
					}
				} else if (event.key === "@") {
					_this.showAtMentionSelectors("");
				} else if (event.key === "Enter" && !event.shiftKey) {
					event.preventDefault();
					if (newPostText.trim().length > 0 && !_this.props.disabled) {
						// convert the text to plaintext so there is no HTML
						var _text = newPostText.replace(/<br>/g, "\n");
						var doc = new DOMParser().parseFromString(_text, "text/html");
						_text = doc.documentElement.textContent;

						_this.props.onSubmit({
							text: _text,
							quote: _this.state.quote,
							mentionedUserIds: _this.props.findMentionedUserIds(_text, _this.props.teammates),
							autoMentions: _this.state.autoMentions
						});
						_this.reset();
					}
				}
			}
		}), Object.defineProperty(_this, "handleClickDismissQuote", {
			enumerable: true,
			writable: true,
			value: function value() {
				_this.focus();
				_this.reset();
			}
		}), _temp), possibleConstructorReturn(_this, _ret);
	}

	createClass(ComposeBox, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			window.addEventListener("message", this.handleInteractionEvent, true);

			// so that HTML doesn't get pasted into the input field. without this,
			// HTML would be rendered as HTML when pasted
			this._contentEditable.htmlEl.addEventListener("paste", function (e) {
				e.preventDefault();
				var text = e.clipboardData.getData("text/plain");
				document.execCommand("insertHTML", false, text.replace(/\n/g, "<br>"));
			});

			// because atom hijacks most keystroke events
			if (global.atom) {
				this.disposables.push(atom.commands.add("atom-workspace", {
					"codestream:focus-input": function codestreamFocusInput(_event) {
						return _this2.focus();
					}
				}), atom.commands.add(".codestream", "codestream:escape", {
					didDispatch: function didDispatch(event) {
						return _this2.handleAtMentionKeyPress(event, "escape");
					},
					hiddenInCommandPalette: true
				}), atom.commands.add(".codestream .compose.mentions-on", "codestream:at-mention-move-up", {
					didDispatch: function didDispatch(event) {
						return _this2.handleAtMentionKeyPress(event, "up");
					},
					hiddenInCommandPalette: true
				}), atom.commands.add(".codestream .compose.mentions-on", "codestream:at-mention-move-down", {
					didDispatch: function didDispatch(event) {
						return _this2.handleAtMentionKeyPress(event, "down");
					},
					hiddenInCommandPalette: true
				}), atom.commands.add(".codestream .compose.mentions-on", "codestream:at-mention-tab", {
					didDispatch: function didDispatch(event) {
						return _this2.handleAtMentionKeyPress(event, "tab");
					},
					hiddenInCommandPalette: true
				}), atom.commands.add(".codestream .native-key-bindings", "codestream:move-up", {
					didDispatch: function didDispatch(event) {
						return _this2.handleNonCapturedKeyPress(event, "up");
					},
					hiddenInCommandPalette: true
				}));
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.disposables.forEach(function (d) {
				return d.dispose();
			});
			window.removeEventListener("message", this.handleInteractionEvent, true);
		}
	}, {
		key: "showAtMentionSelectors",


		// set up the parameters to pass to the at mention popup
		value: function showAtMentionSelectors(prefix) {
			var peopleToShow = [];

			Object.values(this.props.teammates).forEach(function (person) {
				var toMatch = person.firstName + " " + person.lastName + "*" + person.username; // + "*" + person.email;
				var lowered = toMatch.toLowerCase();
				if (lowered.indexOf(prefix) !== -1) {
					peopleToShow.push(person);
				}
			});

			if (peopleToShow.length == 0) {
				this.setState({
					atMentionsOn: false
				});
			} else {
				var selected = peopleToShow[0].id;

				this.setState({
					atMentionsOn: true,
					atMentionsPrefix: prefix,
					atMentionsPeople: peopleToShow,
					atMentionsIndex: 0,
					selectedAtMention: selected
				});
			}
		}
	}, {
		key: "hideAtMentionSelectors",
		value: function hideAtMentionSelectors() {
			this.setState({ atMentionsOn: false });
		}
	}, {
		key: "selectFirstAtMention",
		value: function selectFirstAtMention() {
			this.handleSelectAtMention();
		}

		// insert the given text at the cursor of the input field
		// after first deleting the text in toDelete

	}, {
		key: "insertTextAtCursor",
		value: function insertTextAtCursor(text, toDelete) {
			var sel, range;
			sel = window.getSelection();

			// if for some crazy reason we can't find a selection, return
			// to avoid an error.
			// https://stackoverflow.com/questions/22935320/uncaught-indexsizeerror-failed-to-execute-getrangeat-on-selection-0-is-not
			if (sel.rangeCount == 0) return;

			range = sel.getRangeAt(0);

			// delete the X characters before the caret
			range.setStart(range.commonAncestorContainer, range.startOffset - (toDelete || "").length);
			// range.moveEnd("character", toDelete.length);

			range.deleteContents();
			var textNode = document.createTextNode(text);
			range.insertNode(textNode);
			range.setStartAfter(textNode);
			sel.removeAllRanges();
			sel.addRange(range);
			this._contentEditable.htmlEl.normalize();

			this.setState({ newPostText: this._contentEditable.htmlEl.innerHTML });
		}

		// the keypress handler for tracking up and down arrow
		// and enter, while the at mention popup is open

	}, {
		key: "handleAtMentionKeyPress",
		value: function handleAtMentionKeyPress(event, eventType) {
			if (eventType == "escape") {
				if (this.state.atMentionsOn) this.hideAtMentionSelectors();
				// else this.handleDismissThread();
			} else {
				var newIndex = 0;
				if (eventType == "down") {
					if (this.state.atMentionsIndex < this.state.atMentionsPeople.length - 1) {
						newIndex = this.state.atMentionsIndex + 1;
					} else {
						newIndex = 0;
					}
				} else if (eventType == "up") {
					if (this.state.atMentionsIndex == 0) {
						newIndex = this.state.atMentionsPeople.length - 1;
					} else {
						newIndex = this.state.atMentionsIndex - 1;
					}
				} else if (eventType == "tab") {
					this.selectFirstAtMention();
				}
				this.setState({
					atMentionsIndex: newIndex,
					selectedAtMention: this.state.atMentionsPeople[newIndex].id
				});
			}
		}

		// for keypresses that we can't capture with standard
		// javascript events

	}, {
		key: "handleNonCapturedKeyPress",
		value: function handleNonCapturedKeyPress(event, eventType) {
			if (eventType == "up") {
				if (this.state.newPostText === "") {
					this.props.onEmptyUpArrow(event);
				}
			}
			event.abortKeyBinding();
		}

		// when the user hovers over an at-mention list item, change the
		// state to represent a hovered state


		// depending on the contents of the input field, if the user
		// types a "@" then open the at-mention popup


		// when the input field loses focus, one thing we want to do is
		// to hide the at-mention popup

	}, {
		key: "reset",
		value: function reset() {
			this.setState({ newPostText: "", quote: null, autoMentions: [] });
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    forwardedRef = _props.forwardedRef,
			    placeholder = _props.placeholder;
			var quote = this.state.quote;


			var quoteInfo = void 0;
			var quoteHint = void 0;
			if (quote) {
				quoteInfo = quote ? react.createElement(
					"div",
					{ className: "code" },
					quote.quoteText
				) : "";
				var range = quote.quoteRange;
				var rangeText = null;
				if (range) {
					if (range.start.row === range.end.row) {
						rangeText = "Commenting on line " + (range.start.row + 1);
					} else {
						rangeText = "Commenting on lines " + (range.start.row + 1) + "-" + (range.end.row + 1);
					}
				}
				quoteHint = react.createElement(
					"div",
					{ className: "hint" },
					rangeText,
					react.createElement("span", { onClick: this.handleClickDismissQuote, className: "icon icon-x" })
				);
			}

			return react.createElement(
				"div",
				{
					ref: forwardedRef,
					onKeyPress: this.handleKeyPress,
					onKeyDown: this.handleKeyDown,
					className: classnames("compose", {
						"mentions-on": this.state.atMentionsOn
					})
				},
				react.createElement(AtMentionsPopup, {
					on: this.state.atMentionsOn,
					people: this.state.atMentionsPeople,
					usernames: this.usernameRegExp,
					prefix: this.state.atMentionsPrefix,
					selected: this.state.selectedAtMention,
					handleHoverAtMention: this.handleHoverAtMention,
					handleSelectAtMention: this.handleSelectAtMention
				}),
				quoteInfo,
				quoteHint,
				react.createElement(ContentEditable, {
					className: classnames("native-key-bindings", btoa(placeholder)),
					id: "input-div",
					rows: "1",
					tabIndex: "-1",
					onChange: this.handleChange,
					onBlur: this.handleBlur,
					html: this.state.newPostText,
					placeholder: placeholder,
					ref: function ref(_ref3) {
						return _this3._contentEditable = _ref3;
					}
				})
			);
		}
	}]);
	return ComposeBox;
}(react.Component);

var ComposeBox$1 = react.forwardRef(function (props, ref) {
	return react.createElement(ComposeBox, _extends$4({}, props, { forwardedRef: ref }));
});

var moment$1 = require("moment");
// var Moment_Timezone = require("moment-timezone");

var DateSeparator = function (_Component) {
	inherits(DateSeparator, _Component);

	function DateSeparator(props) {
		classCallCheck(this, DateSeparator);

		var _this = possibleConstructorReturn(this, (DateSeparator.__proto__ || Object.getPrototypeOf(DateSeparator)).call(this, props));

		Object.defineProperty(_this, "prettyDateDay", {
			enumerable: true,
			writable: true,
			value: function value(time, options) {
				options = options || {};
				if (time === 0 || time === null || time === undefined) return "";
				var now = new Date().getTime();
				// now = this.adjustedTime(now, options.timezone_info);
				// time = this.adjustedTime(time, options.timezone_info);
				var today = new Date(now);
				var timeDay = new Date(time);

				if (this.sameDateAs(timeDay, today)) {
					return "Today";
				}
				var nextDay = this.addDays(new Date(timeDay.getTime()), 1);
				if (this.sameDateAs(nextDay, today)) {
					return "Yesterday";
				}

				if (timeDay.getFullYear() === today.getFullYear()) {
					return moment$1(time).format("dddd, MMMM Do");
				}
				return moment$1(time).format("dddd, MMMM Do, YYYY");
			}
		});

		_this.state = {};
		return _this;
	}

	createClass(DateSeparator, [{
		key: "render",
		value: function render() {
			// don't show a separator if the day of this post is the same
			// as the day of the last post
			if (this.sameDateAs(this.props.timestamp1, this.props.timestamp2)) return null;
			if (!this.props.timestamp1 || !this.props.timestamp2) return null;

			return react.createElement(
				"div",
				{ className: "date-separator" },
				react.createElement(
					"span",
					null,
					this.prettyDateDay(this.props.timestamp2)
				)
			);
		}
	}, {
		key: "sameDateAs",
		value: function sameDateAs(time1, time2) {
			var date1 = new Date(time1);
			var date2 = new Date(time2);
			return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
		}
	}, {
		key: "addDays",
		value: function addDays(date, days) {
			date.setDate(date.getDate() + days);
			return date;
		}
	}]);
	return DateSeparator;
}(react_1);

var EditingIndicator = function (_React$Component) {
	inherits(EditingIndicator, _React$Component);

	function EditingIndicator() {
		classCallCheck(this, EditingIndicator);
		return possibleConstructorReturn(this, (EditingIndicator.__proto__ || Object.getPrototypeOf(EditingIndicator)).apply(this, arguments));
	}

	createClass(EditingIndicator, [{
		key: "makeNameList",
		value: function makeNameList(names, hasConflict) {
			var message = "";

			if (hasConflict) {
				if (names.length == 1) message = "Potential merge conflict with " + names[0];else if (names.length == 2) message = "Potential merge conflict with " + names[0] + " and " + names[1];else if (names.length > 2) {
					var last = names.pop();
					message = "Potential merge conflict with " + names.join(", ") + ", and " + last;
				}
			} else {
				if (names.length == 1) message = names[0] + " is editing this file";else if (names.length == 2) message = names[0] + " and " + names[1] + " are editing this file";else if (names.length > 2) {
					var _last = names.pop();
					message = names.join(", ") + ", and " + _last + " are editing this file";
				}
			}
			return message;
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    teamMembers = _props.teamMembers,
			    currentUser = _props.currentUser,
			    _props$editingUsers = _props.editingUsers,
			    editingUsers = _props$editingUsers === undefined ? {} : _props$editingUsers;


			var names = underscore.compact(Object.keys(editingUsers).map(function (userId) {
				return userId !== currentUser.id && editingUsers[userId] ? teamMembers[userId].username : null;
			}));

			// you can test what it looks like by hard-coding this
			// names = ["larry", "fred"];

			var modifiedByMe = Boolean(editingUsers[currentUser.id]);
			var modifiedByOthers = names.length > 0;
			var hasConflict = modifiedByMe && modifiedByOthers;

			var editingIndicatorClass = classnames({
				"editing-indicator": true,
				conflict: hasConflict,
				inactive: this.props.inactive || !modifiedByOthers
			});

			return react.createElement(
				"div",
				{ className: editingIndicatorClass },
				react.createElement(
					"div",
					null,
					this.makeNameList(names, hasConflict)
				)
			);
		}
	}]);
	return EditingIndicator;
}(react.Component);

var localeData = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,function(){return [{locale:"af",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"jaar",relative:{0:"hierdie jaar",1:"volgende jaar","-1":"verlede jaar"},relativeTime:{future:{one:"oor {0} jaar",other:"oor {0} jaar"},past:{one:"{0} jaar gelede",other:"{0} jaar gelede"}}},month:{displayName:"maand",relative:{0:"vandeesmaand",1:"volgende maand","-1":"verlede maand"},relativeTime:{future:{one:"oor {0} minuut",other:"oor {0} minuut"},past:{one:"{0} maand gelede",other:"{0} maande gelede"}}},day:{displayName:"dag",relative:{0:"vandag",1:"môre",2:"oormôre","-2":"eergister","-1":"gister"},relativeTime:{future:{one:"oor {0} minuut",other:"oor {0} minuut"},past:{one:"{0} dag gelede",other:"{0} dae gelede"}}},hour:{displayName:"uur",relative:{0:"hierdie uur"},relativeTime:{future:{one:"oor {0} uur",other:"oor {0} uur"},past:{one:"{0} uur gelede",other:"{0} uur gelede"}}},minute:{displayName:"minuut",relative:{0:"hierdie minuut"},relativeTime:{future:{one:"oor {0} minuut",other:"oor {0} minuut"},past:{one:"{0} minuut gelede",other:"{0} minute gelede"}}},second:{displayName:"sekonde",relative:{0:"nou"},relativeTime:{future:{one:"oor {0} sekonde",other:"oor {0} sekondes"},past:{one:"{0} sekonde gelede",other:"{0} sekondes gelede"}}}}},{locale:"af-NA",parentLocale:"af"},{locale:"agq",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"kɨnûm",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"ndzɔŋ",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"utsuʔ",relative:{0:"nɛ",1:"tsʉtsʉ","-1":"ā zūɛɛ"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"tàm",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"menè",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"sɛkɔ̀n",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ak",pluralRuleFunction:function(e,t){return t?"other":0==e||1==e?"one":"other"},fields:{year:{displayName:"Afe",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Bosome",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Da",relative:{0:"Ndɛ",1:"Ɔkyena","-1":"Ndeda"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Dɔnhwer",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Sema",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sɛkɛnd",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"am",pluralRuleFunction:function(e,t){return t?"other":e>=0&&e<=1?"one":"other"},fields:{year:{displayName:"ዓመት",relative:{0:"በዚህ ዓመት",1:"የሚቀጥለው ዓመት","-1":"ያለፈው ዓመት"},relativeTime:{future:{one:"በ{0} ዓመታት ውስጥ",other:"በ{0} ዓመታት ውስጥ"},past:{one:"ከ{0} ዓመት በፊት",other:"ከ{0} ዓመታት በፊት"}}},month:{displayName:"ወር",relative:{0:"በዚህ ወር",1:"የሚቀጥለው ወር","-1":"ያለፈው ወር"},relativeTime:{future:{one:"በ{0} ወር ውስጥ",other:"በ{0} ወራት ውስጥ"},past:{one:"ከ{0} ወር በፊት",other:"ከ{0} ወራት በፊት"}}},day:{displayName:"ቀን",relative:{0:"ዛሬ",1:"ነገ",2:"ከነገ ወዲያ","-2":"ከትናንት ወዲያ","-1":"ትናንት"},relativeTime:{future:{one:"በ{0} ቀን ውስጥ",other:"በ{0} ቀናት ውስጥ"},past:{one:"ከ{0} ቀን በፊት",other:"ከ{0} ቀናት በፊት"}}},hour:{displayName:"ሰዓት",relative:{0:"ይህ ሰዓት"},relativeTime:{future:{one:"በ{0} ሰዓት ውስጥ",other:"በ{0} ሰዓቶች ውስጥ"},past:{one:"ከ{0} ሰዓት በፊት",other:"ከ{0} ሰዓቶች በፊት"}}},minute:{displayName:"ደቂቃ",relative:{0:"ይህ ደቂቃ"},relativeTime:{future:{one:"በ{0} ደቂቃ ውስጥ",other:"በ{0} ደቂቃዎች ውስጥ"},past:{one:"ከ{0} ደቂቃ በፊት",other:"ከ{0} ደቂቃዎች በፊት"}}},second:{displayName:"ሰከንድ",relative:{0:"አሁን"},relativeTime:{future:{one:"በ{0} ሰከንድ ውስጥ",other:"በ{0} ሰከንዶች ውስጥ"},past:{one:"ከ{0} ሰከንድ በፊት",other:"ከ{0} ሰከንዶች በፊት"}}}}},{locale:"ar",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=Number(a[0])==e&&a[0].slice(-2);return t?"other":0==e?"zero":1==e?"one":2==e?"two":r>=3&&r<=10?"few":r>=11&&r<=99?"many":"other"},fields:{year:{displayName:"السنة",relative:{0:"السنة الحالية",1:"السنة القادمة","-1":"السنة الماضية"},relativeTime:{future:{zero:"خلال {0} سنة",one:"خلال سنة واحدة",two:"خلال سنتين",few:"خلال {0} سنوات",many:"خلال {0} سنة",other:"خلال {0} سنة"},past:{zero:"قبل {0} سنة",one:"قبل سنة واحدة",two:"قبل سنتين",few:"قبل {0} سنوات",many:"قبل {0} سنة",other:"قبل {0} سنة"}}},month:{displayName:"الشهر",relative:{0:"هذا الشهر",1:"الشهر القادم","-1":"الشهر الماضي"},relativeTime:{future:{zero:"خلال {0} شهر",one:"خلال شهر واحد",two:"خلال شهرين",few:"خلال {0} أشهر",many:"خلال {0} شهرًا",other:"خلال {0} شهر"},past:{zero:"قبل {0} شهر",one:"قبل شهر واحد",two:"قبل شهرين",few:"قبل {0} أشهر",many:"قبل {0} شهرًا",other:"قبل {0} شهر"}}},day:{displayName:"يوم",relative:{0:"اليوم",1:"غدًا",2:"بعد الغد","-2":"أول أمس","-1":"أمس"},relativeTime:{future:{zero:"خلال {0} يوم",one:"خلال يوم واحد",two:"خلال يومين",few:"خلال {0} أيام",many:"خلال {0} يومًا",other:"خلال {0} يوم"},past:{zero:"قبل {0} يوم",one:"قبل يوم واحد",two:"قبل يومين",few:"قبل {0} أيام",many:"قبل {0} يومًا",other:"قبل {0} يوم"}}},hour:{displayName:"الساعات",relative:{0:"الساعة الحالية"},relativeTime:{future:{zero:"خلال {0} ساعة",one:"خلال ساعة واحدة",two:"خلال ساعتين",few:"خلال {0} ساعات",many:"خلال {0} ساعة",other:"خلال {0} ساعة"},past:{zero:"قبل {0} ساعة",one:"قبل ساعة واحدة",two:"قبل ساعتين",few:"قبل {0} ساعات",many:"قبل {0} ساعة",other:"قبل {0} ساعة"}}},minute:{displayName:"الدقائق",relative:{0:"هذه الدقيقة"},relativeTime:{future:{zero:"خلال {0} دقيقة",one:"خلال دقيقة واحدة",two:"خلال دقيقتين",few:"خلال {0} دقائق",many:"خلال {0} دقيقة",other:"خلال {0} دقيقة"},past:{zero:"قبل {0} دقيقة",one:"قبل دقيقة واحدة",two:"قبل دقيقتين",few:"قبل {0} دقائق",many:"قبل {0} دقيقة",other:"قبل {0} دقيقة"}}},second:{displayName:"الثواني",relative:{0:"الآن"},relativeTime:{future:{zero:"خلال {0} ثانية",one:"خلال ثانية واحدة",two:"خلال ثانيتين",few:"خلال {0} ثوانٍ",many:"خلال {0} ثانية",other:"خلال {0} ثانية"},past:{zero:"قبل {0} ثانية",one:"قبل ثانية واحدة",two:"قبل ثانيتين",few:"قبل {0} ثوانِ",many:"قبل {0} ثانية",other:"قبل {0} ثانية"}}}}},{locale:"ar-AE",parentLocale:"ar",fields:{year:{displayName:"السنة",relative:{0:"هذه السنة",1:"السنة التالية","-1":"السنة الماضية"},relativeTime:{future:{zero:"خلال {0} سنة",one:"خلال سنة واحدة",two:"خلال سنتين",few:"خلال {0} سنوات",many:"خلال {0} سنة",other:"خلال {0} سنة"},past:{zero:"قبل {0} سنة",one:"قبل سنة واحدة",two:"قبل سنتين",few:"قبل {0} سنوات",many:"قبل {0} سنة",other:"قبل {0} سنة"}}},month:{displayName:"الشهر",relative:{0:"هذا الشهر",1:"الشهر القادم","-1":"الشهر الماضي"},relativeTime:{future:{zero:"خلال {0} شهر",one:"خلال شهر واحد",two:"خلال شهرين",few:"خلال {0} أشهر",many:"خلال {0} شهرًا",other:"خلال {0} شهر"},past:{zero:"قبل {0} شهر",one:"قبل شهر واحد",two:"قبل شهرين",few:"قبل {0} أشهر",many:"قبل {0} شهرًا",other:"قبل {0} شهر"}}},day:{displayName:"يوم",relative:{0:"اليوم",1:"غدًا",2:"بعد الغد","-2":"أول أمس","-1":"أمس"},relativeTime:{future:{zero:"خلال {0} يوم",one:"خلال يوم واحد",two:"خلال يومين",few:"خلال {0} أيام",many:"خلال {0} يومًا",other:"خلال {0} يوم"},past:{zero:"قبل {0} يوم",one:"قبل يوم واحد",two:"قبل يومين",few:"قبل {0} أيام",many:"قبل {0} يومًا",other:"قبل {0} يوم"}}},hour:{displayName:"الساعات",relative:{0:"الساعة الحالية"},relativeTime:{future:{zero:"خلال {0} ساعة",one:"خلال ساعة واحدة",two:"خلال ساعتين",few:"خلال {0} ساعات",many:"خلال {0} ساعة",other:"خلال {0} ساعة"},past:{zero:"قبل {0} ساعة",one:"قبل ساعة واحدة",two:"قبل ساعتين",few:"قبل {0} ساعات",many:"قبل {0} ساعة",other:"قبل {0} ساعة"}}},minute:{displayName:"الدقائق",relative:{0:"هذه الدقيقة"},relativeTime:{future:{zero:"خلال {0} دقيقة",one:"خلال دقيقة واحدة",two:"خلال دقيقتين",few:"خلال {0} دقائق",many:"خلال {0} دقيقة",other:"خلال {0} دقيقة"},past:{zero:"قبل {0} دقيقة",one:"قبل دقيقة واحدة",two:"قبل دقيقتين",few:"قبل {0} دقائق",many:"قبل {0} دقيقة",other:"قبل {0} دقيقة"}}},second:{displayName:"الثواني",relative:{0:"الآن"},relativeTime:{future:{zero:"خلال {0} ثانية",one:"خلال ثانية واحدة",two:"خلال ثانيتين",few:"خلال {0} ثوانٍ",many:"خلال {0} ثانية",other:"خلال {0} ثانية"},past:{zero:"قبل {0} ثانية",one:"قبل ثانية واحدة",two:"قبل ثانيتين",few:"قبل {0} ثوانِ",many:"قبل {0} ثانية",other:"قبل {0} ثانية"}}}}},{locale:"ar-BH",parentLocale:"ar"},{locale:"ar-DJ",parentLocale:"ar"},{locale:"ar-DZ",parentLocale:"ar"},{locale:"ar-EG",parentLocale:"ar"},{locale:"ar-EH",parentLocale:"ar"},{locale:"ar-ER",parentLocale:"ar"},{locale:"ar-IL",parentLocale:"ar"},{locale:"ar-IQ",parentLocale:"ar"},{locale:"ar-JO",parentLocale:"ar"},{locale:"ar-KM",parentLocale:"ar"},{locale:"ar-KW",parentLocale:"ar"},{locale:"ar-LB",parentLocale:"ar"},{locale:"ar-LY",parentLocale:"ar"},{locale:"ar-MA",parentLocale:"ar"},{locale:"ar-MR",parentLocale:"ar"},{locale:"ar-OM",parentLocale:"ar"},{locale:"ar-PS",parentLocale:"ar"},{locale:"ar-QA",parentLocale:"ar"},{locale:"ar-SA",parentLocale:"ar"},{locale:"ar-SD",parentLocale:"ar"},{locale:"ar-SO",parentLocale:"ar"},{locale:"ar-SS",parentLocale:"ar"},{locale:"ar-SY",parentLocale:"ar"},{locale:"ar-TD",parentLocale:"ar"},{locale:"ar-TN",parentLocale:"ar"},{locale:"ar-YE",parentLocale:"ar"},{locale:"ars",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=Number(a[0])==e&&a[0].slice(-2);return t?"other":0==e?"zero":1==e?"one":2==e?"two":r>=3&&r<=10?"few":r>=11&&r<=99?"many":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"as",pluralRuleFunction:function(e,t){return t?1==e||5==e||7==e||8==e||9==e||10==e?"one":2==e||3==e?"two":4==e?"few":6==e?"many":"other":e>=0&&e<=1?"one":"other"},fields:{year:{displayName:"বছৰ",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"মাহ",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"দিন",relative:{0:"আজি",1:"কাইলৈ",2:"পৰহিলৈ","-2":"পৰহি","-1":"কালি"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"ঘণ্টা",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"মিনিট",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"ছেকেণ্ড",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"asa",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Mwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mweji",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Thiku",relative:{0:"Iyoo",1:"Yavo","-1":"Ighuo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Thaa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Dakika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Thekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ast",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?"other":1==e&&a?"one":"other"},fields:{year:{displayName:"añu",relative:{0:"esti añu",1:"l’añu viniente","-1":"l’añu pasáu"},relativeTime:{future:{one:"en {0} añu",other:"en {0} años"},past:{one:"hai {0} añu",other:"hai {0} años"}}},month:{displayName:"mes",relative:{0:"esti mes",1:"el mes viniente","-1":"el mes pasáu"},relativeTime:{future:{one:"en {0} mes",other:"en {0} meses"},past:{one:"hai {0} mes",other:"hai {0} meses"}}},day:{displayName:"día",relative:{0:"güei",1:"mañana",2:"pasao mañana","-2":"antayeri","-1":"ayeri"},relativeTime:{future:{one:"en {0} día",other:"en {0} díes"},past:{one:"hai {0} día",other:"hai {0} díes"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"en {0} hora",other:"en {0} hores"},past:{one:"hai {0} hora",other:"hai {0} hores"}}},minute:{displayName:"minutu",relative:{0:"esti minutu"},relativeTime:{future:{one:"en {0} minutu",other:"en {0} minutos"},past:{one:"hai {0} minutu",other:"hai {0} minutos"}}},second:{displayName:"segundu",relative:{0:"agora"},relativeTime:{future:{one:"en {0} segundu",other:"en {0} segundos"},past:{one:"hai {0} segundu",other:"hai {0} segundos"}}}}},{locale:"az",pluralRuleFunction:function(e,t){var a=String(e).split(".")[0],r=a.slice(-1),i=a.slice(-2),o=a.slice(-3);return t?1==r||2==r||5==r||7==r||8==r||20==i||50==i||70==i||80==i?"one":3==r||4==r||100==o||200==o||300==o||400==o||500==o||600==o||700==o||800==o||900==o?"few":0==a||6==r||40==i||60==i||90==i?"many":"other":1==e?"one":"other"},fields:{year:{displayName:"İl",relative:{0:"bu il",1:"gələn il","-1":"keçən il"},relativeTime:{future:{one:"{0} il ərzində",other:"{0} il ərzində"},past:{one:"{0} il öncə",other:"{0} il öncə"}}},month:{displayName:"Ay",relative:{0:"bu ay",1:"gələn ay","-1":"keçən ay"},relativeTime:{future:{one:"{0} ay ərzində",other:"{0} ay ərzində"},past:{one:"{0} ay öncə",other:"{0} ay öncə"}}},day:{displayName:"Gün",relative:{0:"bu gün",1:"sabah","-1":"dünən"},relativeTime:{future:{one:"{0} gün ərzində",other:"{0} gün ərzində"},past:{one:"{0} gün öncə",other:"{0} gün öncə"}}},hour:{displayName:"Saat",relative:{0:"bu saat"},relativeTime:{future:{one:"{0} saat ərzində",other:"{0} saat ərzində"},past:{one:"{0} saat öncə",other:"{0} saat öncə"}}},minute:{displayName:"Dəqiqə",relative:{0:"bu dəqiqə"},relativeTime:{future:{one:"{0} dəqiqə ərzində",other:"{0} dəqiqə ərzində"},past:{one:"{0} dəqiqə öncə",other:"{0} dəqiqə öncə"}}},second:{displayName:"Saniyə",relative:{0:"indi"},relativeTime:{future:{one:"{0} saniyə ərzində",other:"{0} saniyə ərzində"},past:{one:"{0} saniyə öncə",other:"{0} saniyə öncə"}}}}},{locale:"az-Arab",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"az-Cyrl",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"az-Latn",parentLocale:"az"},{locale:"bas",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"ŋwìi",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"soŋ",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"kɛl",relative:{0:"lɛ̀n",1:"yàni","-1":"yààni"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"ŋgɛŋ",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"ŋget",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"hìŋgeŋget",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"be",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=Number(a[0])==e,i=r&&a[0].slice(-1),o=r&&a[0].slice(-2);return t?2!=i&&3!=i||12==o||13==o?"other":"few":1==i&&11!=o?"one":i>=2&&i<=4&&(o<12||o>14)?"few":r&&0==i||i>=5&&i<=9||o>=11&&o<=14?"many":"other"},fields:{year:{displayName:"год",relative:{0:"у гэтым годзе",1:"у наступным годзе","-1":"у мінулым годзе"},relativeTime:{future:{one:"праз {0} год",few:"праз {0} гады",many:"праз {0} гадоў",other:"праз {0} года"},past:{one:"{0} год таму",few:"{0} гады таму",many:"{0} гадоў таму",other:"{0} года таму"}}},month:{displayName:"месяц",relative:{0:"у гэтым месяцы",1:"у наступным месяцы","-1":"у мінулым месяцы"},relativeTime:{future:{one:"праз {0} месяц",few:"праз {0} месяцы",many:"праз {0} месяцаў",other:"праз {0} месяца"},past:{one:"{0} месяц таму",few:"{0} месяцы таму",many:"{0} месяцаў таму",other:"{0} месяца таму"}}},day:{displayName:"дзень",relative:{0:"сёння",1:"заўтра",2:"паслязаўтра","-2":"пазаўчора","-1":"учора"},relativeTime:{future:{one:"праз {0} дзень",few:"праз {0} дні",many:"праз {0} дзён",other:"праз {0} дня"},past:{one:"{0} дзень таму",few:"{0} дні таму",many:"{0} дзён таму",other:"{0} дня таму"}}},hour:{displayName:"гадзіна",relative:{0:"у гэту гадзіну"},relativeTime:{future:{one:"праз {0} гадзіну",few:"праз {0} гадзіны",many:"праз {0} гадзін",other:"праз {0} гадзіны"},past:{one:"{0} гадзіну таму",few:"{0} гадзіны таму",many:"{0} гадзін таму",other:"{0} гадзіны таму"}}},minute:{displayName:"хвіліна",relative:{0:"у гэту хвіліну"},relativeTime:{future:{one:"праз {0} хвіліну",few:"праз {0} хвіліны",many:"праз {0} хвілін",other:"праз {0} хвіліны"},past:{one:"{0} хвіліну таму",few:"{0} хвіліны таму",many:"{0} хвілін таму",other:"{0} хвіліны таму"}}},second:{displayName:"секунда",relative:{0:"цяпер"},relativeTime:{future:{one:"праз {0} секунду",few:"праз {0} секунды",many:"праз {0} секунд",other:"праз {0} секунды"},past:{one:"{0} секунду таму",few:"{0} секунды таму",many:"{0} секунд таму",other:"{0} секунды таму"}}}}},{locale:"bem",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Umwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Umweshi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ubushiku",relative:{0:"Lelo",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Insa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Mineti",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekondi",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"bez",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Mwaha",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mwedzi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Sihu",relative:{0:"Neng’u ni",1:"Hilawu","-1":"Igolo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Saa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Dakika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"bg",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"година",relative:{0:"тази година",1:"следващата година","-1":"миналата година"},relativeTime:{future:{one:"след {0} година",other:"след {0} години"},past:{one:"преди {0} година",other:"преди {0} години"}}},month:{displayName:"месец",relative:{0:"този месец",1:"следващ месец","-1":"предходен месец"},relativeTime:{future:{one:"след {0} месец",other:"след {0} месеца"},past:{one:"преди {0} месец",other:"преди {0} месеца"}}},day:{displayName:"ден",relative:{0:"днес",1:"утре",2:"вдругиден","-2":"онзи ден","-1":"вчера"},relativeTime:{future:{one:"след {0} ден",other:"след {0} дни"},past:{one:"преди {0} ден",other:"преди {0} дни"}}},hour:{displayName:"час",relative:{0:"в този час"},relativeTime:{future:{one:"след {0} час",other:"след {0} часа"},past:{one:"преди {0} час",other:"преди {0} часа"}}},minute:{displayName:"минута",relative:{0:"в тази минута"},relativeTime:{future:{one:"след {0} минута",other:"след {0} минути"},past:{one:"преди {0} минута",other:"преди {0} минути"}}},second:{displayName:"секунда",relative:{0:"сега"},relativeTime:{future:{one:"след {0} секунда",other:"след {0} секунди"},past:{one:"преди {0} секунда",other:"преди {0} секунди"}}}}},{locale:"bh",pluralRuleFunction:function(e,t){return t?"other":0==e||1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"bm",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"san",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"kalo",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"don",relative:{0:"bi",1:"sini","-1":"kunu"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"lɛrɛ",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"miniti",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"sekondi",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"bm-Nkoo",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"bn",pluralRuleFunction:function(e,t){return t?1==e||5==e||7==e||8==e||9==e||10==e?"one":2==e||3==e?"two":4==e?"few":6==e?"many":"other":e>=0&&e<=1?"one":"other"},fields:{year:{displayName:"বছর",relative:{0:"এই বছর",1:"পরের বছর","-1":"গত বছর"},relativeTime:{future:{one:"{0} বছরে",other:"{0} বছরে"},past:{one:"{0} বছর পূর্বে",other:"{0} বছর পূর্বে"}}},month:{displayName:"মাস",relative:{0:"এই মাস",1:"পরের মাস","-1":"গত মাস"},relativeTime:{future:{one:"{0} মাসে",other:"{0} মাসে"},past:{one:"{0} মাস আগে",other:"{0} মাস আগে"}}},day:{displayName:"দিন",relative:{0:"আজ",1:"আগামীকাল",2:"আগামী পরশু","-2":"গত পরশু","-1":"গতকাল"},relativeTime:{future:{one:"{0} দিনের মধ্যে",other:"{0} দিনের মধ্যে"},past:{one:"{0} দিন আগে",other:"{0} দিন আগে"}}},hour:{displayName:"ঘন্টা",relative:{0:"এই ঘণ্টায়"},relativeTime:{future:{one:"{0} ঘন্টায়",other:"{0} ঘন্টায়"},past:{one:"{0} ঘন্টা আগে",other:"{0} ঘন্টা আগে"}}},minute:{displayName:"মিনিট",relative:{0:"এই মিনিট"},relativeTime:{future:{one:"{0} মিনিটে",other:"{0} মিনিটে"},past:{one:"{0} মিনিট আগে",other:"{0} মিনিট পূর্বে"}}},second:{displayName:"সেকেন্ড",relative:{0:"এখন"},relativeTime:{future:{one:"{0} সেকেন্ডে",other:"{0} সেকেন্ডে"},past:{one:"{0} সেকেন্ড পূর্বে",other:"{0} সেকেন্ড পূর্বে"}}}}},{locale:"bn-IN",parentLocale:"bn"},{locale:"bo",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"ལོ།",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"ཟླ་བ་",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"ཉིན།",relative:{0:"དེ་རིང་",1:"སང་ཉིན་",2:"གནངས་ཉིན་","-2":"ཁས་ཉིན་","-1":"ཁས་ས་"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"ཆུ་ཚོད་",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"སྐར་མ།",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"སྐར་ཆ།",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"bo-IN",parentLocale:"bo"},{locale:"br",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=Number(a[0])==e,i=r&&a[0].slice(-1),o=r&&a[0].slice(-2),n=r&&a[0].slice(-6);return t?"other":1==i&&11!=o&&71!=o&&91!=o?"one":2==i&&12!=o&&72!=o&&92!=o?"two":(3==i||4==i||9==i)&&(o<10||o>19)&&(o<70||o>79)&&(o<90||o>99)?"few":0!=e&&r&&0==n?"many":"other"},fields:{year:{displayName:"bloaz",relative:{0:"hevlene",1:"ar bloaz a zeu","-1":"warlene"},relativeTime:{future:{one:"a-benn {0} bloaz",two:"a-benn {0} vloaz",few:"a-benn {0} bloaz",many:"a-benn {0} a vloazioù",other:"a-benn {0} vloaz"},past:{one:"{0} bloaz zo",two:"{0} vloaz zo",few:"{0} bloaz zo",many:"{0} a vloazioù zo",other:"{0} vloaz zo"}}},month:{displayName:"miz",relative:{0:"ar miz-mañ",1:"ar miz a zeu","-1":"ar miz diaraok"},relativeTime:{future:{one:"a-benn {0} miz",two:"a-benn {0} viz",few:"a-benn {0} miz",many:"a-benn {0} a vizioù",other:"a-benn {0} miz"},past:{one:"{0} miz zo",two:"{0} viz zo",few:"{0} miz zo",many:"{0} a vizioù zo",other:"{0} miz zo"}}},day:{displayName:"deiz",relative:{0:"hiziv",1:"warcʼhoazh","-2":"dercʼhent-decʼh","-1":"decʼh"},relativeTime:{future:{one:"a-benn {0} deiz",two:"a-benn {0} zeiz",few:"a-benn {0} deiz",many:"a-benn {0} a zeizioù",other:"a-benn {0} deiz"},past:{one:"{0} deiz zo",two:"{0} zeiz zo",few:"{0} deiz zo",many:"{0} a zeizioù zo",other:"{0} deiz zo"}}},hour:{displayName:"eur",relative:{0:"this hour"},relativeTime:{future:{one:"a-benn {0} eur",two:"a-benn {0} eur",few:"a-benn {0} eur",many:"a-benn {0} a eurioù",other:"a-benn {0} eur"},past:{one:"{0} eur zo",two:"{0} eur zo",few:"{0} eur zo",many:"{0} a eurioù zo",other:"{0} eur zo"}}},minute:{displayName:"munut",relative:{0:"this minute"},relativeTime:{future:{one:"a-benn {0} munut",two:"a-benn {0} vunut",few:"a-benn {0} munut",many:"a-benn {0} a vunutoù",other:"a-benn {0} munut"},past:{one:"{0} munut zo",two:"{0} vunut zo",few:"{0} munut zo",many:"{0} a vunutoù zo",other:"{0} munut zo"}}},second:{displayName:"eilenn",relative:{0:"bremañ"},relativeTime:{future:{one:"a-benn {0} eilenn",two:"a-benn {0} eilenn",few:"a-benn {0} eilenn",many:"a-benn {0} a eilennoù",other:"a-benn {0} eilenn"},past:{one:"{0} eilenn zo",two:"{0} eilenn zo",few:"{0} eilenn zo",many:"{0} eilenn zo",other:"{0} eilenn zo"}}}}},{locale:"brx",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"बोसोर",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"दान",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"सान",relative:{0:"दिनै",1:"गाबोन","-1":"मैया"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"रिंगा",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"मिनिथ",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"सेखेन्द",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"bs",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=a[1]||"",o=!a[1],n=r.slice(-1),l=r.slice(-2),u=i.slice(-1),s=i.slice(-2);return t?"other":o&&1==n&&11!=l||1==u&&11!=s?"one":o&&n>=2&&n<=4&&(l<12||l>14)||u>=2&&u<=4&&(s<12||s>14)?"few":"other"},fields:{year:{displayName:"godina",relative:{0:"ove godine",1:"sljedeće godine","-1":"prošle godine"},relativeTime:{future:{one:"za {0} godinu",few:"za {0} godine",other:"za {0} godina"},past:{one:"prije {0} godinu",few:"prije {0} godine",other:"prije {0} godina"}}},month:{displayName:"mjesec",relative:{0:"ovaj mjesec",1:"sljedeći mjesec","-1":"prošli mjesec"},relativeTime:{future:{one:"za {0} mjesec",few:"za {0} mjeseca",other:"za {0} mjeseci"},past:{one:"prije {0} mjesec",few:"prije {0} mjeseca",other:"prije {0} mjeseci"}}},day:{displayName:"dan",relative:{0:"danas",1:"sutra",2:"prekosutra","-2":"prekjučer","-1":"jučer"},relativeTime:{future:{one:"za {0} dan",few:"za {0} dana",other:"za {0} dana"},past:{one:"prije {0} dan",few:"prije {0} dana",other:"prije {0} dana"}}},hour:{displayName:"sat",relative:{0:"ovaj sat"},relativeTime:{future:{one:"za {0} sat",few:"za {0} sata",other:"za {0} sati"},past:{one:"prije {0} sat",few:"prije {0} sata",other:"prije {0} sati"}}},minute:{displayName:"minuta",relative:{0:"ova minuta"},relativeTime:{future:{one:"za {0} minutu",few:"za {0} minute",other:"za {0} minuta"},past:{one:"prije {0} minutu",few:"prije {0} minute",other:"prije {0} minuta"}}},second:{displayName:"sekunda",relative:{0:"sada"},relativeTime:{future:{one:"za {0} sekundu",few:"za {0} sekunde",other:"za {0} sekundi"},past:{one:"prije {0} sekundu",few:"prije {0} sekunde",other:"prije {0} sekundi"}}}}},{locale:"bs-Cyrl",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"година",relative:{0:"Ове године",1:"Следеће године","-1":"Прошле године"},relativeTime:{future:{one:"за {0} годину",few:"за {0} године",other:"за {0} година"},past:{one:"пре {0} годину",few:"пре {0} године",other:"пре {0} година"}}},month:{displayName:"месец",relative:{0:"Овог месеца",1:"Следећег месеца","-1":"Прошлог месеца"},relativeTime:{future:{one:"за {0} месец",few:"за {0} месеца",other:"за {0} месеци"},past:{one:"пре {0} месец",few:"пре {0} месеца",other:"пре {0} месеци"}}},day:{displayName:"дан",relative:{0:"данас",1:"сутра",2:"прекосутра","-2":"прекјуче","-1":"јуче"},relativeTime:{future:{one:"за {0} дан",few:"за {0} дана",other:"за {0} дана"},past:{one:"пре {0} дан",few:"пре {0} дана",other:"пре {0} дана"}}},hour:{displayName:"час",relative:{0:"this hour"},relativeTime:{future:{one:"за {0} сат",few:"за {0} сата",other:"за {0} сати"},past:{one:"пре {0} сат",few:"пре {0} сата",other:"пре {0} сати"}}},minute:{displayName:"минут",relative:{0:"this minute"},relativeTime:{future:{one:"за {0} минут",few:"за {0} минута",other:"за {0} минута"},past:{one:"пре {0} минут",few:"пре {0} минута",other:"пре {0} минута"}}},second:{displayName:"секунд",relative:{0:"now"},relativeTime:{future:{one:"за {0} секунд",few:"за {0} секунде",other:"за {0} секунди"},past:{one:"пре {0} секунд",few:"пре {0} секунде",other:"пре {0} секунди"}}}}},{locale:"bs-Latn",parentLocale:"bs"},{locale:"ca",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?1==e||3==e?"one":2==e?"two":4==e?"few":"other":1==e&&a?"one":"other"},fields:{year:{displayName:"any",relative:{0:"enguany",1:"l’any que ve","-1":"l’any passat"},relativeTime:{future:{one:"d’aquí a {0} any",other:"d’aquí a {0} anys"},past:{one:"fa {0} any",other:"fa {0} anys"}}},month:{displayName:"mes",relative:{0:"aquest mes",1:"el mes que ve","-1":"el mes passat"},relativeTime:{future:{one:"d’aquí a {0} mes",other:"d’aquí a {0} mesos"},past:{one:"fa {0} mes",other:"fa {0} mesos"}}},day:{displayName:"dia",relative:{0:"avui",1:"demà",2:"demà passat","-2":"abans-d’ahir","-1":"ahir"},relativeTime:{future:{one:"d’aquí a {0} dia",other:"d’aquí a {0} dies"},past:{one:"fa {0} dia",other:"fa {0} dies"}}},hour:{displayName:"hora",relative:{0:"aquesta hora"},relativeTime:{future:{one:"d’aquí a {0} hora",other:"d’aquí a {0} hores"},past:{one:"fa {0} hora",other:"fa {0} hores"}}},minute:{displayName:"minut",relative:{0:"aquest minut"},relativeTime:{future:{one:"d’aquí a {0} minut",other:"d’aquí a {0} minuts"},past:{one:"fa {0} minut",other:"fa {0} minuts"}}},second:{displayName:"segon",relative:{0:"ara"},relativeTime:{future:{one:"d’aquí a {0} segon",other:"d’aquí a {0} segons"},past:{one:"fa {0} segon",other:"fa {0} segons"}}}}},{locale:"ca-AD",parentLocale:"ca"},{locale:"ca-ES-VALENCIA",parentLocale:"ca-ES",fields:{year:{displayName:"any",relative:{0:"enguany",1:"l’any que ve","-1":"l’any passat"},relativeTime:{future:{one:"d’aquí a {0} any",other:"d’aquí a {0} anys"},past:{one:"fa {0} any",other:"fa {0} anys"}}},month:{displayName:"mes",relative:{0:"aquest mes",1:"el mes que ve","-1":"el mes passat"},relativeTime:{future:{one:"d’aquí a {0} mes",other:"d’aquí a {0} mesos"},past:{one:"fa {0} mes",other:"fa {0} mesos"}}},day:{displayName:"dia",relative:{0:"avui",1:"demà",2:"demà passat","-2":"abans-d’ahir","-1":"ahir"},relativeTime:{future:{one:"d’aquí a {0} dia",other:"d’aquí a {0} dies"},past:{one:"fa {0} dia",other:"fa {0} dies"}}},hour:{displayName:"hora",relative:{0:"aquesta hora"},relativeTime:{future:{one:"d’aquí a {0} hora",other:"d’aquí a {0} hores"},past:{one:"fa {0} hora",other:"fa {0} hores"}}},minute:{displayName:"minut",relative:{0:"aquest minut"},relativeTime:{future:{one:"d’aquí a {0} minut",other:"d’aquí a {0} minuts"},past:{one:"fa {0} minut",other:"fa {0} minuts"}}},second:{displayName:"segon",relative:{0:"ara"},relativeTime:{future:{one:"d’aquí a {0} segon",other:"d’aquí a {0} segons"},past:{one:"fa {0} segon",other:"fa {0} segons"}}}}},{locale:"ca-ES",parentLocale:"ca"},{locale:"ca-FR",parentLocale:"ca"},{locale:"ca-IT",parentLocale:"ca"},{locale:"ce",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"шо",relative:{0:"карарчу шарахь",1:"рогӀерчу шарахь","-1":"даханчу шарахь"},relativeTime:{future:{one:"{0} шо даьлча",other:"{0} шо даьлча"},past:{one:"{0} шо хьалха",other:"{0} шо хьалха"}}},month:{displayName:"бутт",relative:{0:"карарчу баттахь",1:"рогӀерчу баттахь","-1":"баханчу баттахь"},relativeTime:{future:{one:"{0} бутт баьлча",other:"{0} бутт баьлча"},past:{one:"{0} бутт хьалха",other:"{0} бутт хьалха"}}},day:{displayName:"де",relative:{0:"тахана",1:"кхана","-1":"селхана"},relativeTime:{future:{one:"{0} де даьлча",other:"{0} де даьлча"},past:{one:"{0} де хьалха",other:"{0} де хьалха"}}},hour:{displayName:"сахьт",relative:{0:"this hour"},relativeTime:{future:{one:"{0} сахьт даьлча",other:"{0} сахьт даьлча"},past:{one:"{0} сахьт хьалха",other:"{0} сахьт хьалха"}}},minute:{displayName:"минот",relative:{0:"this minute"},relativeTime:{future:{one:"{0} минот яьлча",other:"{0} минот яьлча"},past:{one:"{0} минот хьалха",other:"{0} минот хьалха"}}},second:{displayName:"секунд",relative:{0:"now"},relativeTime:{future:{one:"{0} секунд яьлча",other:"{0} секунд яьлча"},past:{one:"{0} секунд хьалха",other:"{0} секунд хьалха"}}}}},{locale:"cgg",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Omwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Omwezi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Eizooba",relative:{0:"Erizooba",1:"Nyenkyakare","-1":"Nyomwabazyo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Shaaha",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Edakiika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Obucweka/Esekendi",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"chr",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"ᎤᏕᏘᏴᏌᏗᏒᎢ",relative:{0:"ᎯᎠ ᏧᏕᏘᏴᏒᏘ",1:"ᎡᏘᏴᎢ","-1":"ᎡᏘ ᏥᎨᏒ"},relativeTime:{future:{one:"ᎾᎿ {0} ᎤᏕᏘᏴᏌᏗᏒᎢ",other:"ᎾᎿ {0} ᎢᏧᏕᏘᏴᏌᏗᏒᎢ"},past:{one:"{0} ᎤᏕᏘᏴᏌᏗᏒᎢ ᏥᎨᏒ",other:"{0} ᎢᏧᏕᏘᏴᏌᏗᏒᎢ ᏥᎨᏒ"}}},month:{displayName:"ᎧᎸᎢ",relative:{0:"ᎯᎠ ᎧᎸᎢ",1:"ᏔᎵᏁ ᎧᎸᎢ","-1":"ᎧᎸᎢ ᏥᎨᏒ"},relativeTime:{future:{one:"ᎾᎿ {0} ᎧᎸᎢ",other:"ᎾᎿ {0} ᏗᎧᎸᎢ"},past:{one:"ᎾᎿ {0} ᎧᎸᎢ ᏥᎨᏒ",other:"ᎾᎿ {0} ᏗᎧᎸᎢ ᏥᎨᏒ"}}},day:{displayName:"ᎢᎦ",relative:{0:"ᎪᎯ ᎢᎦ",1:"ᏌᎾᎴᎢ","-1":"ᏒᎯ"},relativeTime:{future:{one:"ᎾᎿ {0} ᎢᎦ",other:"ᎾᎿ {0} ᎯᎸᏍᎩ ᏧᏒᎯᏛ"},past:{one:"{0} ᎢᎦ ᏥᎨᏒ",other:"{0} ᎯᎸᏍᎩ ᏧᏒᎯᏛ ᏥᎨᏒ"}}},hour:{displayName:"ᏑᏟᎶᏓ",relative:{0:"ᎯᎠ ᏑᏟᎶᏓ"},relativeTime:{future:{one:"ᎾᎿ {0} ᏑᏟᎶᏓ",other:"ᎾᎿ {0} ᎢᏳᏟᎶᏓ"},past:{one:"{0} ᏑᏟᎶᏓ ᏥᎨᏒ",other:"{0} ᎢᏳᏟᎶᏓ ᏥᎨᏒ"}}},minute:{displayName:"ᎢᏯᏔᏬᏍᏔᏅ",relative:{0:"ᎯᎠ ᎢᏯᏔᏬᏍᏔᏅ"},relativeTime:{future:{one:"ᎾᎿ {0} ᎢᏯᏔᏬᏍᏔᏅ",other:"ᎾᎿ {0} ᎢᏯᏔᏬᏍᏔᏅ"},past:{one:"ᎾᎿ {0} ᎢᏯᏔᏬᏍᏔᏅ ᏥᎨᏒ",other:"ᎾᎿ {0} ᎢᏯᏔᏬᏍᏔᏅ ᏥᎨᏒ"}}},second:{displayName:"ᎠᏎᏢ",relative:{0:"ᏃᏊ"},relativeTime:{future:{one:"ᎾᎿ {0} ᎠᏎᏢ",other:"ᎾᎿ {0} ᏓᏓᎾᏩᏍᎬ ᏥᎨᏒ"},past:{one:"{0} ᎠᏎᏢ ᏥᎨᏒ",other:"{0} ᏓᏓᎾᏩᏍᎬ ᏥᎨᏒ"}}}}},{locale:"ckb",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ckb-IR",parentLocale:"ckb"},{locale:"cs",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=!a[1];return t?"other":1==e&&i?"one":r>=2&&r<=4&&i?"few":i?"other":"many"},fields:{year:{displayName:"rok",relative:{0:"tento rok",1:"příští rok","-1":"minulý rok"},relativeTime:{future:{one:"za {0} rok",few:"za {0} roky",many:"za {0} roku",other:"za {0} let"},past:{one:"před {0} rokem",few:"před {0} lety",many:"před {0} roku",other:"před {0} lety"}}},month:{displayName:"měsíc",relative:{0:"tento měsíc",1:"příští měsíc","-1":"minulý měsíc"},relativeTime:{future:{one:"za {0} měsíc",few:"za {0} měsíce",many:"za {0} měsíce",other:"za {0} měsíců"},past:{one:"před {0} měsícem",few:"před {0} měsíci",many:"před {0} měsíce",other:"před {0} měsíci"}}},day:{displayName:"den",relative:{0:"dnes",1:"zítra",2:"pozítří","-2":"předevčírem","-1":"včera"},relativeTime:{future:{one:"za {0} den",few:"za {0} dny",many:"za {0} dne",other:"za {0} dní"},past:{one:"před {0} dnem",few:"před {0} dny",many:"před {0} dne",other:"před {0} dny"}}},hour:{displayName:"hodina",relative:{0:"tuto hodinu"},relativeTime:{future:{one:"za {0} hodinu",few:"za {0} hodiny",many:"za {0} hodiny",other:"za {0} hodin"},past:{one:"před {0} hodinou",few:"před {0} hodinami",many:"před {0} hodiny",other:"před {0} hodinami"}}},minute:{displayName:"minuta",relative:{0:"tuto minutu"},relativeTime:{future:{one:"za {0} minutu",few:"za {0} minuty",many:"za {0} minuty",other:"za {0} minut"},past:{one:"před {0} minutou",few:"před {0} minutami",many:"před {0} minuty",other:"před {0} minutami"}}},second:{displayName:"sekunda",relative:{0:"nyní"},relativeTime:{future:{one:"za {0} sekundu",few:"za {0} sekundy",many:"za {0} sekundy",other:"za {0} sekund"},past:{one:"před {0} sekundou",few:"před {0} sekundami",many:"před {0} sekundy",other:"před {0} sekundami"}}}}},{locale:"cu",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"cy",pluralRuleFunction:function(e,t){return t?0==e||7==e||8==e||9==e?"zero":1==e?"one":2==e?"two":3==e||4==e?"few":5==e||6==e?"many":"other":0==e?"zero":1==e?"one":2==e?"two":3==e?"few":6==e?"many":"other"},fields:{year:{displayName:"blwyddyn",relative:{0:"eleni",1:"blwyddyn nesaf","-1":"llynedd"},relativeTime:{future:{zero:"ymhen {0} mlynedd",one:"ymhen blwyddyn",two:"ymhen {0} flynedd",few:"ymhen {0} blynedd",many:"ymhen {0} blynedd",other:"ymhen {0} mlynedd"},past:{zero:"{0} o flynyddoedd yn ôl",one:"blwyddyn yn ôl",two:"{0} flynedd yn ôl",few:"{0} blynedd yn ôl",many:"{0} blynedd yn ôl",other:"{0} o flynyddoedd yn ôl"}}},month:{displayName:"mis",relative:{0:"y mis hwn",1:"mis nesaf","-1":"mis diwethaf"},relativeTime:{future:{zero:"ymhen {0} mis",one:"ymhen mis",two:"ymhen deufis",few:"ymhen {0} mis",many:"ymhen {0} mis",other:"ymhen {0} mis"},past:{zero:"{0} mis yn ôl",one:"{0} mis yn ôl",two:"{0} fis yn ôl",few:"{0} mis yn ôl",many:"{0} mis yn ôl",other:"{0} mis yn ôl"}}},day:{displayName:"dydd",relative:{0:"heddiw",1:"yfory",2:"drennydd","-2":"echdoe","-1":"ddoe"},relativeTime:{future:{zero:"ymhen {0} diwrnod",one:"ymhen diwrnod",two:"ymhen deuddydd",few:"ymhen tridiau",many:"ymhen {0} diwrnod",other:"ymhen {0} diwrnod"},past:{zero:"{0} diwrnod yn ôl",one:"{0} diwrnod yn ôl",two:"{0} ddiwrnod yn ôl",few:"{0} diwrnod yn ôl",many:"{0} diwrnod yn ôl",other:"{0} diwrnod yn ôl"}}},hour:{displayName:"awr",relative:{0:"yr awr hon"},relativeTime:{future:{zero:"ymhen {0} awr",one:"ymhen awr",two:"ymhen {0} awr",few:"ymhen {0} awr",many:"ymhen {0} awr",other:"ymhen {0} awr"},past:{zero:"{0} awr yn ôl",one:"awr yn ôl",two:"{0} awr yn ôl",few:"{0} awr yn ôl",many:"{0} awr yn ôl",other:"{0} awr yn ôl"}}},minute:{displayName:"munud",relative:{0:"y funud hon"},relativeTime:{future:{zero:"ymhen {0} munud",one:"ymhen munud",two:"ymhen {0} funud",few:"ymhen {0} munud",many:"ymhen {0} munud",other:"ymhen {0} munud"},past:{zero:"{0} munud yn ôl",one:"{0} munud yn ôl",two:"{0} funud yn ôl",few:"{0} munud yn ôl",many:"{0} munud yn ôl",other:"{0} munud yn ôl"}}},second:{displayName:"eiliad",relative:{0:"nawr"},relativeTime:{future:{zero:"ymhen {0} eiliad",one:"ymhen eiliad",two:"ymhen {0} eiliad",few:"ymhen {0} eiliad",many:"ymhen {0} eiliad",other:"ymhen {0} eiliad"},past:{zero:"{0} eiliad yn ôl",one:"eiliad yn ôl",two:"{0} eiliad yn ôl",few:"{0} eiliad yn ôl",many:"{0} eiliad yn ôl",other:"{0} eiliad yn ôl"}}}}},{locale:"da",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=Number(a[0])==e;return t?"other":1!=e&&(i||0!=r&&1!=r)?"other":"one"},fields:{year:{displayName:"år",relative:{0:"i år",1:"næste år","-1":"sidste år"},relativeTime:{future:{one:"om {0} år",other:"om {0} år"},past:{one:"for {0} år siden",other:"for {0} år siden"}}},month:{displayName:"måned",relative:{0:"denne måned",1:"næste måned","-1":"sidste måned"},relativeTime:{future:{one:"om {0} måned",other:"om {0} måneder"},past:{one:"for {0} måned siden",other:"for {0} måneder siden"}}},day:{displayName:"dag",relative:{0:"i dag",1:"i morgen",2:"i overmorgen","-2":"i forgårs","-1":"i går"},relativeTime:{future:{one:"om {0} dag",other:"om {0} dage"},past:{one:"for {0} dag siden",other:"for {0} dage siden"}}},hour:{displayName:"time",relative:{0:"i den kommende time"},relativeTime:{future:{one:"om {0} time",other:"om {0} timer"},past:{one:"for {0} time siden",other:"for {0} timer siden"}}},minute:{displayName:"minut",relative:{0:"i det kommende minut"},relativeTime:{future:{one:"om {0} minut",other:"om {0} minutter"},past:{one:"for {0} minut siden",other:"for {0} minutter siden"}}},second:{displayName:"sekund",relative:{0:"nu"},relativeTime:{future:{one:"om {0} sekund",other:"om {0} sekunder"},past:{one:"for {0} sekund siden",other:"for {0} sekunder siden"}}}}},{locale:"da-GL",parentLocale:"da"},{locale:"dav",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Mwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mori",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ituku",relative:{0:"Idime",1:"Kesho","-1":"Iguo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Saa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Dakika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"de",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?"other":1==e&&a?"one":"other"},fields:{year:{displayName:"Jahr",relative:{0:"dieses Jahr",1:"nächstes Jahr","-1":"letztes Jahr"},relativeTime:{future:{one:"in {0} Jahr",other:"in {0} Jahren"},past:{one:"vor {0} Jahr",other:"vor {0} Jahren"}}},month:{displayName:"Monat",relative:{0:"diesen Monat",1:"nächsten Monat","-1":"letzten Monat"},relativeTime:{future:{one:"in {0} Monat",other:"in {0} Monaten"},past:{one:"vor {0} Monat",other:"vor {0} Monaten"}}},day:{displayName:"Tag",relative:{0:"heute",1:"morgen",2:"übermorgen","-2":"vorgestern","-1":"gestern"},relativeTime:{future:{one:"in {0} Tag",other:"in {0} Tagen"},past:{one:"vor {0} Tag",other:"vor {0} Tagen"}}},hour:{displayName:"Stunde",relative:{0:"in dieser Stunde"},relativeTime:{future:{one:"in {0} Stunde",other:"in {0} Stunden"},past:{one:"vor {0} Stunde",other:"vor {0} Stunden"}}},minute:{displayName:"Minute",relative:{0:"in dieser Minute"},relativeTime:{future:{one:"in {0} Minute",other:"in {0} Minuten"},past:{one:"vor {0} Minute",other:"vor {0} Minuten"}}},second:{displayName:"Sekunde",relative:{0:"jetzt"},relativeTime:{future:{one:"in {0} Sekunde",other:"in {0} Sekunden"},past:{one:"vor {0} Sekunde",other:"vor {0} Sekunden"}}}}},{locale:"de-AT",parentLocale:"de"},{locale:"de-BE",parentLocale:"de"},{locale:"de-CH",parentLocale:"de"},{locale:"de-IT",parentLocale:"de"},{locale:"de-LI",parentLocale:"de"},{locale:"de-LU",parentLocale:"de"},{locale:"dje",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Jiiri",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Handu",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Zaari",relative:{0:"Hõo",1:"Suba","-1":"Bi"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Guuru",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Miniti",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Miti",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"dsb",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=a[1]||"",o=!a[1],n=r.slice(-2),l=i.slice(-2);return t?"other":o&&1==n||1==l?"one":o&&2==n||2==l?"two":o&&(3==n||4==n)||3==l||4==l?"few":"other"},fields:{year:{displayName:"lěto",relative:{0:"lětosa",1:"znowa","-1":"łoni"},relativeTime:{future:{one:"za {0} lěto",two:"za {0} lěśe",few:"za {0} lěta",other:"za {0} lět"},past:{one:"pśed {0} lětom",two:"pśed {0} lětoma",few:"pśed {0} lětami",other:"pśed {0} lětami"}}},month:{displayName:"mjasec",relative:{0:"ten mjasec",1:"pśiducy mjasec","-1":"slědny mjasec"},relativeTime:{future:{one:"za {0} mjasec",two:"za {0} mjaseca",few:"za {0} mjasecy",other:"za {0} mjasecow"},past:{one:"pśed {0} mjasecom",two:"pśed {0} mjasecoma",few:"pśed {0} mjasecami",other:"pśed {0} mjasecami"}}},day:{displayName:"źeń",relative:{0:"źinsa",1:"witśe","-1":"cora"},relativeTime:{future:{one:"za {0} źeń",two:"za {0} dnja",few:"za {0} dny",other:"za {0} dnjow"},past:{one:"pśed {0} dnjom",two:"pśed {0} dnjoma",few:"pśed {0} dnjami",other:"pśed {0} dnjami"}}},hour:{displayName:"góźina",relative:{0:"this hour"},relativeTime:{future:{one:"za {0} góźinu",two:"za {0} góźinje",few:"za {0} góźiny",other:"za {0} góźin"},past:{one:"pśed {0} góźinu",two:"pśed {0} góźinoma",few:"pśed {0} góźinami",other:"pśed {0} góźinami"}}},minute:{displayName:"minuta",relative:{0:"this minute"},relativeTime:{future:{one:"za {0} minutu",two:"za {0} minuśe",few:"za {0} minuty",other:"za {0} minutow"},past:{one:"pśed {0} minutu",two:"pśed {0} minutoma",few:"pśed {0} minutami",other:"pśed {0} minutami"}}},second:{displayName:"sekunda",relative:{0:"now"},relativeTime:{future:{one:"za {0} sekundu",two:"za {0} sekunźe",few:"za {0} sekundy",other:"za {0} sekundow"},past:{one:"pśed {0} sekundu",two:"pśed {0} sekundoma",few:"pśed {0} sekundami",other:"pśed {0} sekundami"}}}}},{locale:"dua",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"mbú",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"mɔ́di",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"búnyá",relative:{0:"wɛ́ŋgɛ̄",1:"kíɛlɛ","-1":"kíɛlɛ nítómb́í"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"ŋgandɛ",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"ndɔkɔ",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"píndí",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"dv",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"dyo",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Emit",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Fuleeŋ",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Funak",relative:{0:"Jaat",1:"Kajom","-1":"Fucen"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"dz",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"ལོ",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"ལོ་འཁོར་ {0} ནང་"},past:{other:"ལོ་འཁོར་ {0} ཧེ་མ་"}}},month:{displayName:"ཟླ་ཝ་",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"ཟླཝ་ {0} ནང་"},past:{other:"ཟླཝ་ {0} ཧེ་མ་"}}},day:{displayName:"ཚེས་",relative:{0:"ད་རིས་",1:"ནངས་པ་",2:"གནངས་ཚེ","-2":"ཁ་ཉིམ","-1":"ཁ་ཙ་"},relativeTime:{future:{other:"ཉིནམ་ {0} ནང་"},past:{other:"ཉིནམ་ {0} ཧེ་མ་"}}},hour:{displayName:"ཆུ་ཚོད",relative:{0:"this hour"},relativeTime:{future:{other:"ཆུ་ཚོད་ {0} ནང་"},past:{other:"ཆུ་ཚོད་ {0} ཧེ་མ་"}}},minute:{displayName:"སྐར་མ",relative:{0:"this minute"},relativeTime:{future:{other:"སྐར་མ་ {0} ནང་"},past:{other:"སྐར་མ་ {0} ཧེ་མ་"}}},second:{displayName:"སྐར་ཆཱ་",relative:{0:"now"},relativeTime:{future:{other:"སྐར་ཆ་ {0} ནང་"},past:{other:"སྐར་ཆ་ {0} ཧེ་མ་"}}}}},{locale:"ebu",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Mwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mweri",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Mũthenya",relative:{0:"Ũmũnthĩ",1:"Rũciũ","-1":"Ĩgoro"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Ithaa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Ndagĩka",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekondi",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ee",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"ƒe",relative:{0:"ƒe sia",1:"ƒe si gbɔ na","-1":"ƒe si va yi"},relativeTime:{future:{one:"le ƒe {0} me",other:"le ƒe {0} me"},past:{one:"ƒe {0} si va yi",other:"ƒe {0} si wo va yi"}}},month:{displayName:"ɣleti",relative:{0:"ɣleti sia",1:"ɣleti si gbɔ na","-1":"ɣleti si va yi"},relativeTime:{future:{one:"le ɣleti {0} me",other:"le ɣleti {0} wo me"},past:{one:"ɣleti {0} si va yi",other:"ɣleti {0} si wo va yi"}}},day:{displayName:"ŋkeke",relative:{0:"egbe",1:"etsɔ si gbɔna",2:"nyitsɔ si gbɔna","-2":"nyitsɔ si va yi","-1":"etsɔ si va yi"},relativeTime:{future:{one:"le ŋkeke {0} me",other:"le ŋkeke {0} wo me"},past:{one:"ŋkeke {0} si va yi",other:"ŋkeke {0} si wo va yi"}}},hour:{displayName:"gaƒoƒo",relative:{0:"this hour"},relativeTime:{future:{one:"le gaƒoƒo {0} me",other:"le gaƒoƒo {0} wo me"},past:{one:"gaƒoƒo {0} si va yi",other:"gaƒoƒo {0} si wo va yi"}}},minute:{displayName:"aɖabaƒoƒo",relative:{0:"this minute"},relativeTime:{future:{one:"le aɖabaƒoƒo {0} me",other:"le aɖabaƒoƒo {0} wo me"},past:{one:"aɖabaƒoƒo {0} si va yi",other:"aɖabaƒoƒo {0} si wo va yi"}}},second:{displayName:"sekend",relative:{0:"fifi"},relativeTime:{future:{one:"le sekend {0} me",other:"le sekend {0} wo me"},past:{one:"sekend {0} si va yi",other:"sekend {0} si wo va yi"}}}}},{locale:"ee-TG",parentLocale:"ee"},{locale:"el",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"έτος",relative:{0:"φέτος",1:"επόμενο έτος","-1":"πέρσι"},relativeTime:{future:{one:"σε {0} έτος",other:"σε {0} έτη"},past:{one:"πριν από {0} έτος",other:"πριν από {0} έτη"}}},month:{displayName:"μήνας",relative:{0:"τρέχων μήνας",1:"επόμενος μήνας","-1":"προηγούμενος μήνας"},relativeTime:{future:{one:"σε {0} μήνα",other:"σε {0} μήνες"},past:{one:"πριν από {0} μήνα",other:"πριν από {0} μήνες"}}},day:{displayName:"ημέρα",relative:{0:"σήμερα",1:"αύριο",2:"μεθαύριο","-2":"προχθές","-1":"χθες"},relativeTime:{future:{one:"σε {0} ημέρα",other:"σε {0} ημέρες"},past:{one:"πριν από {0} ημέρα",other:"πριν από {0} ημέρες"}}},hour:{displayName:"ώρα",relative:{0:"αυτήν την ώρα"},relativeTime:{future:{one:"σε {0} ώρα",other:"σε {0} ώρες"},past:{one:"πριν από {0} ώρα",other:"πριν από {0} ώρες"}}},minute:{displayName:"λεπτό",relative:{0:"αυτό το λεπτό"},relativeTime:{future:{one:"σε {0} λεπτό",other:"σε {0} λεπτά"},past:{one:"πριν από {0} λεπτό",other:"πριν από {0} λεπτά"}}},second:{displayName:"δευτερόλεπτο",relative:{0:"τώρα"},relativeTime:{future:{one:"σε {0} δευτερόλεπτο",other:"σε {0} δευτερόλεπτα"},past:{one:"πριν από {0} δευτερόλεπτο",other:"πριν από {0} δευτερόλεπτα"}}}}},{locale:"el-CY",parentLocale:"el"},{locale:"en",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=!a[1],i=Number(a[0])==e,o=i&&a[0].slice(-1),n=i&&a[0].slice(-2);return t?1==o&&11!=n?"one":2==o&&12!=n?"two":3==o&&13!=n?"few":"other":1==e&&r?"one":"other"},fields:{year:{displayName:"year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"in {0} year",other:"in {0} years"},past:{one:"{0} year ago",other:"{0} years ago"}}},month:{displayName:"month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"in {0} month",other:"in {0} months"},past:{one:"{0} month ago",other:"{0} months ago"}}},day:{displayName:"day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{one:"in {0} day",other:"in {0} days"},past:{one:"{0} day ago",other:"{0} days ago"}}},hour:{displayName:"hour",relative:{0:"this hour"},relativeTime:{future:{one:"in {0} hour",other:"in {0} hours"},past:{one:"{0} hour ago",other:"{0} hours ago"}}},minute:{displayName:"minute",relative:{0:"this minute"},relativeTime:{future:{one:"in {0} minute",other:"in {0} minutes"},past:{one:"{0} minute ago",other:"{0} minutes ago"}}},second:{displayName:"second",relative:{0:"now"},relativeTime:{future:{one:"in {0} second",other:"in {0} seconds"},past:{one:"{0} second ago",other:"{0} seconds ago"}}}}},{locale:"en-001",parentLocale:"en"},{locale:"en-150",parentLocale:"en-001"},{locale:"en-AG",parentLocale:"en-001"},{locale:"en-AI",parentLocale:"en-001"},{locale:"en-AS",parentLocale:"en"},{locale:"en-AT",parentLocale:"en-150"},{locale:"en-AU",parentLocale:"en-001"},{locale:"en-BB",parentLocale:"en-001"},{locale:"en-BE",parentLocale:"en-001"},{locale:"en-BI",parentLocale:"en"},{locale:"en-BM",parentLocale:"en-001"},{locale:"en-BS",parentLocale:"en-001"},{locale:"en-BW",parentLocale:"en-001"},{locale:"en-BZ",parentLocale:"en-001"},{locale:"en-CA",parentLocale:"en-001"},{locale:"en-CC",parentLocale:"en-001"},{locale:"en-CH",parentLocale:"en-150"},{locale:"en-CK",parentLocale:"en-001"},{locale:"en-CM",parentLocale:"en-001"},{locale:"en-CX",parentLocale:"en-001"},{locale:"en-CY",parentLocale:"en-001"},{locale:"en-DE",parentLocale:"en-150"},{locale:"en-DG",parentLocale:"en-001"},{locale:"en-DK",parentLocale:"en-150"},{locale:"en-DM",parentLocale:"en-001"},{locale:"en-Dsrt",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"en-ER",parentLocale:"en-001"},{locale:"en-FI",parentLocale:"en-150"},{locale:"en-FJ",parentLocale:"en-001"},{locale:"en-FK",parentLocale:"en-001"},{locale:"en-FM",parentLocale:"en-001"},{locale:"en-GB",parentLocale:"en-001"},{locale:"en-GD",parentLocale:"en-001"},{locale:"en-GG",parentLocale:"en-001"},{locale:"en-GH",parentLocale:"en-001"},{locale:"en-GI",parentLocale:"en-001"},{locale:"en-GM",parentLocale:"en-001"},{locale:"en-GU",parentLocale:"en"},{locale:"en-GY",parentLocale:"en-001"},{locale:"en-HK",parentLocale:"en-001"},{locale:"en-IE",parentLocale:"en-001"},{locale:"en-IL",parentLocale:"en-001"},{locale:"en-IM",parentLocale:"en-001"},{locale:"en-IN",parentLocale:"en-001"},{locale:"en-IO",parentLocale:"en-001"},{locale:"en-JE",parentLocale:"en-001"},{locale:"en-JM",parentLocale:"en-001"},{locale:"en-KE",parentLocale:"en-001"},{locale:"en-KI",parentLocale:"en-001"},{locale:"en-KN",parentLocale:"en-001"},{locale:"en-KY",parentLocale:"en-001"},{locale:"en-LC",parentLocale:"en-001"},{locale:"en-LR",parentLocale:"en-001"},{locale:"en-LS",parentLocale:"en-001"},{locale:"en-MG",parentLocale:"en-001"},{locale:"en-MH",parentLocale:"en"},{locale:"en-MO",parentLocale:"en-001"},{locale:"en-MP",parentLocale:"en"},{locale:"en-MS",parentLocale:"en-001"},{locale:"en-MT",parentLocale:"en-001"},{locale:"en-MU",parentLocale:"en-001"},{locale:"en-MW",parentLocale:"en-001"},{locale:"en-MY",parentLocale:"en-001"},{locale:"en-NA",parentLocale:"en-001"},{locale:"en-NF",parentLocale:"en-001"},{locale:"en-NG",parentLocale:"en-001"},{locale:"en-NL",parentLocale:"en-150"},{locale:"en-NR",parentLocale:"en-001"},{locale:"en-NU",parentLocale:"en-001"},{locale:"en-NZ",parentLocale:"en-001"},{locale:"en-PG",parentLocale:"en-001"},{locale:"en-PH",parentLocale:"en-001"},{locale:"en-PK",parentLocale:"en-001"},{locale:"en-PN",parentLocale:"en-001"},{locale:"en-PR",parentLocale:"en"},{locale:"en-PW",parentLocale:"en-001"},{locale:"en-RW",parentLocale:"en-001"},{locale:"en-SB",parentLocale:"en-001"},{locale:"en-SC",parentLocale:"en-001"},{locale:"en-SD",parentLocale:"en-001"},{locale:"en-SE",parentLocale:"en-150"},{locale:"en-SG",parentLocale:"en-001"},{locale:"en-SH",parentLocale:"en-001"},{locale:"en-SI",parentLocale:"en-150"},{locale:"en-SL",parentLocale:"en-001"},{locale:"en-SS",parentLocale:"en-001"},{locale:"en-SX",parentLocale:"en-001"},{locale:"en-SZ",parentLocale:"en-001"},{locale:"en-Shaw",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"en-TC",parentLocale:"en-001"},{locale:"en-TK",parentLocale:"en-001"},{locale:"en-TO",parentLocale:"en-001"},{locale:"en-TT",parentLocale:"en-001"},{locale:"en-TV",parentLocale:"en-001"},{locale:"en-TZ",parentLocale:"en-001"},{locale:"en-UG",parentLocale:"en-001"},{locale:"en-UM",parentLocale:"en"},{locale:"en-US",parentLocale:"en"},{locale:"en-VC",parentLocale:"en-001"},{locale:"en-VG",parentLocale:"en-001"},{locale:"en-VI",parentLocale:"en"},{locale:"en-VU",parentLocale:"en-001"},{locale:"en-WS",parentLocale:"en-001"},{locale:"en-ZA",parentLocale:"en-001"},{locale:"en-ZM",parentLocale:"en-001"},{locale:"en-ZW",parentLocale:"en-001"},{locale:"eo",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"es",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"anteayer","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-419",parentLocale:"es"},{locale:"es-AR",parentLocale:"es-419"},{locale:"es-BO",parentLocale:"es-419"},{locale:"es-BR",parentLocale:"es-419"},{locale:"es-BZ",parentLocale:"es-419"},{locale:"es-CL",parentLocale:"es-419"},{locale:"es-CO",parentLocale:"es-419"},{locale:"es-CR",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-CU",parentLocale:"es-419"},{locale:"es-DO",parentLocale:"es-419",fields:{year:{displayName:"Año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"Mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"Día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"anteayer","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"Minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"Segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-EA",parentLocale:"es"},{locale:"es-EC",parentLocale:"es-419"},{locale:"es-GQ",parentLocale:"es"},{locale:"es-GT",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-HN",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-IC",parentLocale:"es"},{locale:"es-MX",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el año próximo","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el mes próximo","-1":"el mes pasado"},relativeTime:{future:{one:"en {0} mes",other:"en {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-NI",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-PA",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-PE",parentLocale:"es-419"},{locale:"es-PH",parentLocale:"es"},{locale:"es-PR",parentLocale:"es-419"},{locale:"es-PY",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antes de ayer","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-SV",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-US",parentLocale:"es-419"},{locale:"es-UY",parentLocale:"es-419"},{locale:"es-VE",parentLocale:"es-419"},{locale:"et",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?"other":1==e&&a?"one":"other"},fields:{year:{displayName:"aasta",relative:{0:"käesolev aasta",1:"järgmine aasta","-1":"eelmine aasta"},relativeTime:{future:{one:"{0} aasta pärast",other:"{0} aasta pärast"},past:{one:"{0} aasta eest",other:"{0} aasta eest"}}},month:{displayName:"kuu",relative:{0:"käesolev kuu",1:"järgmine kuu","-1":"eelmine kuu"},relativeTime:{future:{one:"{0} kuu pärast",other:"{0} kuu pärast"},past:{one:"{0} kuu eest",other:"{0} kuu eest"}}},day:{displayName:"päev",relative:{0:"täna",1:"homme",2:"ülehomme","-2":"üleeile","-1":"eile"},relativeTime:{future:{one:"{0} päeva pärast",other:"{0} päeva pärast"},past:{one:"{0} päeva eest",other:"{0} päeva eest"}}},hour:{displayName:"tund",relative:{0:"praegusel tunnil"},relativeTime:{future:{one:"{0} tunni pärast",other:"{0} tunni pärast"},past:{one:"{0} tunni eest",other:"{0} tunni eest"}}},minute:{displayName:"minut",relative:{0:"praegusel minutil"},relativeTime:{future:{one:"{0} minuti pärast",other:"{0} minuti pärast"},past:{one:"{0} minuti eest",other:"{0} minuti eest"}}},second:{displayName:"sekund",relative:{0:"nüüd"},relativeTime:{future:{one:"{0} sekundi pärast",other:"{0} sekundi pärast"},past:{one:"{0} sekundi eest",other:"{0} sekundi eest"}}}}},{locale:"eu",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"urtea",relative:{0:"aurten",1:"hurrengo urtea","-1":"aurreko urtea"},relativeTime:{future:{one:"{0} urte barru",other:"{0} urte barru"},past:{one:"Duela {0} urte",other:"Duela {0} urte"}}},month:{displayName:"hilabetea",relative:{0:"hilabete hau",1:"hurrengo hilabetea","-1":"aurreko hilabetea"},relativeTime:{future:{one:"{0} hilabete barru",other:"{0} hilabete barru"},past:{one:"Duela {0} hilabete",other:"Duela {0} hilabete"}}},day:{displayName:"eguna",relative:{0:"gaur",1:"bihar",2:"etzi","-2":"herenegun","-1":"atzo"},relativeTime:{future:{one:"{0} egun barru",other:"{0} egun barru"},past:{one:"Duela {0} egun",other:"Duela {0} egun"}}},hour:{displayName:"ordua",relative:{0:"ordu honetan"},relativeTime:{future:{one:"{0} ordu barru",other:"{0} ordu barru"},past:{one:"Duela {0} ordu",other:"Duela {0} ordu"}}},minute:{displayName:"minutua",relative:{0:"minutu honetan"},relativeTime:{future:{one:"{0} minutu barru",other:"{0} minutu barru"},past:{one:"Duela {0} minutu",other:"Duela {0} minutu"}}},second:{displayName:"segundoa",relative:{0:"orain"},relativeTime:{future:{one:"{0} segundo barru",other:"{0} segundo barru"},past:{one:"Duela {0} segundo",other:"Duela {0} segundo"}}}}},{locale:"ewo",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"M̀bú",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Ngɔn",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Amǒs",relative:{0:"Aná",1:"Okírí","-1":"Angogé"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Awola",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Enútɛn",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Akábəga",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"fa",pluralRuleFunction:function(e,t){return t?"other":e>=0&&e<=1?"one":"other"},fields:{year:{displayName:"سال",relative:{0:"امسال",1:"سال آینده","-1":"سال گذشته"},relativeTime:{future:{one:"{0} سال بعد",other:"{0} سال بعد"},past:{one:"{0} سال پیش",other:"{0} سال پیش"}}},month:{displayName:"ماه",relative:{0:"این ماه",1:"ماه آینده","-1":"ماه گذشته"},relativeTime:{future:{one:"{0} ماه بعد",other:"{0} ماه بعد"},past:{one:"{0} ماه پیش",other:"{0} ماه پیش"}}},day:{displayName:"روز",relative:{0:"امروز",1:"فردا",2:"پس‌فردا","-2":"پریروز","-1":"دیروز"},relativeTime:{future:{one:"{0} روز بعد",other:"{0} روز بعد"},past:{one:"{0} روز پیش",other:"{0} روز پیش"}}},hour:{displayName:"ساعت",relative:{0:"همین ساعت"},relativeTime:{future:{one:"{0} ساعت بعد",other:"{0} ساعت بعد"},past:{one:"{0} ساعت پیش",other:"{0} ساعت پیش"}}},minute:{displayName:"دقیقه",relative:{0:"همین دقیقه"},relativeTime:{future:{one:"{0} دقیقه بعد",other:"{0} دقیقه بعد"},past:{one:"{0} دقیقه پیش",other:"{0} دقیقه پیش"}}},second:{displayName:"ثانیه",relative:{0:"اکنون"},relativeTime:{future:{one:"{0} ثانیه بعد",other:"{0} ثانیه بعد"},past:{one:"{0} ثانیه پیش",other:"{0} ثانیه پیش"}}}}},{locale:"fa-AF",parentLocale:"fa"},{locale:"ff",pluralRuleFunction:function(e,t){return t?"other":e>=0&&e<2?"one":"other"},fields:{year:{displayName:"Hitaande",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Lewru",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ñalnde",relative:{0:"Hannde",1:"Jaŋngo","-1":"Haŋki"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Waktu",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Hoƴom",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Majaango",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ff-CM",parentLocale:"ff"},{locale:"ff-GN",parentLocale:"ff"},{locale:"ff-MR",parentLocale:"ff"},{locale:"fi",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?"other":1==e&&a?"one":"other"},fields:{year:{displayName:"vuosi",relative:{0:"tänä vuonna",1:"ensi vuonna","-1":"viime vuonna"},relativeTime:{future:{one:"{0} vuoden päästä",other:"{0} vuoden päästä"},past:{one:"{0} vuosi sitten",other:"{0} vuotta sitten"}}},month:{displayName:"kuukausi",relative:{0:"tässä kuussa",1:"ensi kuussa","-1":"viime kuussa"},relativeTime:{future:{one:"{0} kuukauden päästä",other:"{0} kuukauden päästä"},past:{one:"{0} kuukausi sitten",other:"{0} kuukautta sitten"}}},day:{displayName:"päivä",relative:{0:"tänään",1:"huomenna",2:"ylihuomenna","-2":"toissa päivänä","-1":"eilen"},relativeTime:{future:{one:"{0} päivän päästä",other:"{0} päivän päästä"},past:{one:"{0} päivä sitten",other:"{0} päivää sitten"}}},hour:{displayName:"tunti",relative:{0:"tämän tunnin aikana"},relativeTime:{future:{one:"{0} tunnin päästä",other:"{0} tunnin päästä"},past:{one:"{0} tunti sitten",other:"{0} tuntia sitten"}}},minute:{displayName:"minuutti",relative:{0:"tämän minuutin aikana"},relativeTime:{future:{one:"{0} minuutin päästä",other:"{0} minuutin päästä"},past:{one:"{0} minuutti sitten",other:"{0} minuuttia sitten"}}},second:{displayName:"sekunti",relative:{0:"nyt"},relativeTime:{future:{one:"{0} sekunnin päästä",other:"{0} sekunnin päästä"},past:{one:"{0} sekunti sitten",other:"{0} sekuntia sitten"}}}}},{locale:"fil",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=a[1]||"",o=!a[1],n=r.slice(-1),l=i.slice(-1);return t?1==e?"one":"other":o&&(1==r||2==r||3==r)||o&&4!=n&&6!=n&&9!=n||!o&&4!=l&&6!=l&&9!=l?"one":"other"},fields:{year:{displayName:"taon",relative:{0:"ngayong taon",1:"susunod na taon","-1":"nakaraang taon"},relativeTime:{future:{one:"sa {0} taon",other:"sa {0} (na) taon"},past:{one:"{0} taon ang nakalipas",other:"{0} (na) taon ang nakalipas"}}},month:{displayName:"buwan",relative:{0:"ngayong buwan",1:"susunod na buwan","-1":"nakaraang buwan"},relativeTime:{future:{one:"sa {0} buwan",other:"sa {0} (na) buwan"},past:{one:"{0} buwan ang nakalipas",other:"{0} (na) buwan ang nakalipas"}}},day:{displayName:"araw",relative:{0:"ngayong araw",1:"bukas",2:"Samakalawa","-2":"Araw bago ang kahapon","-1":"kahapon"},relativeTime:{future:{one:"sa {0} araw",other:"sa {0} (na) araw"},past:{one:"{0} araw ang nakalipas",other:"{0} (na) araw ang nakalipas"}}},hour:{displayName:"oras",relative:{0:"ngayong oras"},relativeTime:{future:{one:"sa {0} oras",other:"sa {0} (na) oras"},past:{one:"{0} oras ang nakalipas",other:"{0} (na) oras ang nakalipas"}}},minute:{displayName:"minuto",relative:{0:"sa minutong ito"},relativeTime:{future:{one:"sa {0} minuto",other:"sa {0} (na) minuto"},past:{one:"{0} minuto ang nakalipas",other:"{0} (na) minuto ang nakalipas"}}},second:{displayName:"segundo",relative:{0:"ngayon"},relativeTime:{future:{one:"sa {0} segundo",other:"sa {0} (na) segundo"},past:{one:"{0} segundo ang nakalipas",other:"{0} (na) segundo ang nakalipas"}}}}},{locale:"fo",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"ár",relative:{0:"í ár",1:"næsta ár","-1":"í fjør"},relativeTime:{future:{one:"um {0} ár",other:"um {0} ár"},past:{one:"{0} ár síðan",other:"{0} ár síðan"}}},month:{displayName:"mánaður",relative:{0:"henda mánaðin",1:"næsta mánað","-1":"seinasta mánað"},relativeTime:{future:{one:"um {0} mánað",other:"um {0} mánaðir"},past:{one:"{0} mánað síðan",other:"{0} mánaðir síðan"}}},day:{displayName:"dagur",relative:{0:"í dag",1:"í morgin",2:"í ovurmorgin","-2":"fyrradagin","-1":"í gjár"},relativeTime:{future:{one:"um {0} dag",other:"um {0} dagar"},past:{one:"{0} dagur síðan",other:"{0} dagar síðan"}}},hour:{displayName:"tími",relative:{0:"hendan tíman"},relativeTime:{future:{one:"um {0} tíma",other:"um {0} tímar"},past:{one:"{0} tími síðan",other:"{0} tímar síðan"}}},minute:{displayName:"minuttur",relative:{0:"hendan minuttin"},relativeTime:{future:{one:"um {0} minutt",other:"um {0} minuttir"},past:{one:"{0} minutt síðan",other:"{0} minuttir síðan"}}},second:{displayName:"sekund",relative:{0:"nú"},relativeTime:{future:{one:"um {0} sekund",other:"um {0} sekund"},past:{one:"{0} sekund síðan",other:"{0} sekund síðan"}}}}},{locale:"fo-DK",parentLocale:"fo"},{locale:"fr",pluralRuleFunction:function(e,t){return t?1==e?"one":"other":e>=0&&e<2?"one":"other"},fields:{year:{displayName:"année",relative:{0:"cette année",1:"l’année prochaine","-1":"l’année dernière"},relativeTime:{future:{one:"dans {0} an",other:"dans {0} ans"},past:{one:"il y a {0} an",other:"il y a {0} ans"}}},month:{displayName:"mois",relative:{0:"ce mois-ci",1:"le mois prochain","-1":"le mois dernier"},relativeTime:{future:{one:"dans {0} mois",other:"dans {0} mois"},past:{one:"il y a {0} mois",other:"il y a {0} mois"}}},day:{displayName:"jour",relative:{0:"aujourd’hui",1:"demain",2:"après-demain","-2":"avant-hier","-1":"hier"},relativeTime:{future:{one:"dans {0} jour",other:"dans {0} jours"},past:{one:"il y a {0} jour",other:"il y a {0} jours"}}},hour:{displayName:"heure",relative:{0:"cette heure-ci"},relativeTime:{future:{one:"dans {0} heure",other:"dans {0} heures"},past:{one:"il y a {0} heure",other:"il y a {0} heures"}}},minute:{displayName:"minute",relative:{0:"cette minute-ci"},relativeTime:{future:{one:"dans {0} minute",other:"dans {0} minutes"},past:{one:"il y a {0} minute",other:"il y a {0} minutes"}}},second:{displayName:"seconde",relative:{0:"maintenant"},relativeTime:{future:{one:"dans {0} seconde",other:"dans {0} secondes"},past:{one:"il y a {0} seconde",other:"il y a {0} secondes"}}}}},{locale:"fr-BE",parentLocale:"fr"},{locale:"fr-BF",parentLocale:"fr"},{locale:"fr-BI",parentLocale:"fr"},{locale:"fr-BJ",parentLocale:"fr"},{locale:"fr-BL",parentLocale:"fr"},{locale:"fr-CA",parentLocale:"fr",fields:{year:{displayName:"année",relative:{0:"cette année",1:"l’année prochaine","-1":"l’année dernière"},relativeTime:{future:{one:"Dans {0} an",other:"Dans {0} ans"},past:{one:"Il y a {0} an",other:"Il y a {0} ans"}}},month:{displayName:"mois",relative:{0:"ce mois-ci",1:"le mois prochain","-1":"le mois dernier"},relativeTime:{future:{one:"dans {0} mois",other:"dans {0} mois"},past:{one:"il y a {0} mois",other:"il y a {0} mois"}}},day:{displayName:"jour",relative:{0:"aujourd’hui",1:"demain",2:"après-demain","-2":"avant-hier","-1":"hier"},relativeTime:{future:{one:"dans {0} jour",other:"dans {0} jours"},past:{one:"il y a {0} jour",other:"il y a {0} jours"}}},hour:{displayName:"heure",relative:{0:"cette heure-ci"},relativeTime:{future:{one:"dans {0} heure",other:"dans {0} heures"},past:{one:"il y a {0} heure",other:"il y a {0} heures"}}},minute:{displayName:"minute",relative:{0:"cette minute-ci"},relativeTime:{future:{one:"dans {0} minute",other:"dans {0} minutes"},past:{one:"il y a {0} minute",other:"il y a {0} minutes"}}},second:{displayName:"seconde",relative:{0:"maintenant"},relativeTime:{future:{one:"dans {0} seconde",other:"dans {0} secondes"},past:{one:"il y a {0} seconde",other:"il y a {0} secondes"}}}}},{locale:"fr-CD",parentLocale:"fr"},{locale:"fr-CF",parentLocale:"fr"},{locale:"fr-CG",parentLocale:"fr"},{locale:"fr-CH",parentLocale:"fr"},{locale:"fr-CI",parentLocale:"fr"},{locale:"fr-CM",parentLocale:"fr"},{locale:"fr-DJ",parentLocale:"fr"},{locale:"fr-DZ",parentLocale:"fr"},{locale:"fr-GA",parentLocale:"fr"},{locale:"fr-GF",parentLocale:"fr"},{locale:"fr-GN",parentLocale:"fr"},{locale:"fr-GP",parentLocale:"fr"},{locale:"fr-GQ",parentLocale:"fr"},{locale:"fr-HT",parentLocale:"fr"},{locale:"fr-KM",parentLocale:"fr"},{locale:"fr-LU",parentLocale:"fr"},{locale:"fr-MA",parentLocale:"fr"},{locale:"fr-MC",parentLocale:"fr"},{locale:"fr-MF",parentLocale:"fr"},{locale:"fr-MG",parentLocale:"fr"},{locale:"fr-ML",parentLocale:"fr"},{locale:"fr-MQ",parentLocale:"fr"},{locale:"fr-MR",parentLocale:"fr"},{locale:"fr-MU",parentLocale:"fr"},{locale:"fr-NC",parentLocale:"fr"},{locale:"fr-NE",parentLocale:"fr"},{locale:"fr-PF",parentLocale:"fr"},{locale:"fr-PM",parentLocale:"fr"},{locale:"fr-RE",parentLocale:"fr"},{locale:"fr-RW",parentLocale:"fr"},{locale:"fr-SC",parentLocale:"fr"},{locale:"fr-SN",parentLocale:"fr"},{locale:"fr-SY",parentLocale:"fr"},{locale:"fr-TD",parentLocale:"fr"},{locale:"fr-TG",parentLocale:"fr"},{locale:"fr-TN",parentLocale:"fr"},{locale:"fr-VU",parentLocale:"fr"},{locale:"fr-WF",parentLocale:"fr"},{locale:"fr-YT",parentLocale:"fr"},{locale:"fur",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"an",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"ca di {0} an",other:"ca di {0} agns"},past:{one:"{0} an indaûr",other:"{0} agns indaûr"}}},month:{displayName:"mês",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"ca di {0} mês",other:"ca di {0} mês"},past:{one:"{0} mês indaûr",other:"{0} mês indaûr"}}},day:{displayName:"dì",relative:{0:"vuê",1:"doman",2:"passantdoman","-2":"îr l’altri","-1":"îr"},relativeTime:{future:{one:"ca di {0} zornade",other:"ca di {0} zornadis"},past:{one:"{0} zornade indaûr",other:"{0} zornadis indaûr"}}},hour:{displayName:"ore",relative:{0:"this hour"},relativeTime:{future:{one:"ca di {0} ore",other:"ca di {0} oris"},past:{one:"{0} ore indaûr",other:"{0} oris indaûr"}}},minute:{displayName:"minût",relative:{0:"this minute"},relativeTime:{future:{one:"ca di {0} minût",other:"ca di {0} minûts"},past:{one:"{0} minût indaûr",other:"{0} minûts indaûr"}}},second:{displayName:"secont",relative:{0:"now"},relativeTime:{future:{one:"ca di {0} secont",other:"ca di {0} seconts"},past:{one:"{0} secont indaûr",other:"{0} seconts indaûr"}}}}},{locale:"fy",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?"other":1==e&&a?"one":"other"},fields:{year:{displayName:"Jier",relative:{0:"dit jier",1:"folgjend jier","-1":"foarich jier"},relativeTime:{future:{one:"Oer {0} jier",other:"Oer {0} jier"},past:{one:"{0} jier lyn",other:"{0} jier lyn"}}},month:{displayName:"Moanne",relative:{0:"dizze moanne",1:"folgjende moanne","-1":"foarige moanne"},relativeTime:{future:{one:"Oer {0} moanne",other:"Oer {0} moannen"},past:{one:"{0} moanne lyn",other:"{0} moannen lyn"}}},day:{displayName:"dei",relative:{0:"vandaag",1:"morgen",2:"Oermorgen","-2":"eergisteren","-1":"gisteren"},relativeTime:{future:{one:"Oer {0} dei",other:"Oer {0} deien"},past:{one:"{0} dei lyn",other:"{0} deien lyn"}}},hour:{displayName:"oere",relative:{0:"this hour"},relativeTime:{future:{one:"Oer {0} oere",other:"Oer {0} oere"},past:{one:"{0} oere lyn",other:"{0} oere lyn"}}},minute:{displayName:"Minút",relative:{0:"this minute"},relativeTime:{future:{one:"Oer {0} minút",other:"Oer {0} minuten"},past:{one:"{0} minút lyn",other:"{0} minuten lyn"}}},second:{displayName:"Sekonde",relative:{0:"nu"},relativeTime:{future:{one:"Oer {0} sekonde",other:"Oer {0} sekonden"},past:{one:"{0} sekonde lyn",other:"{0} sekonden lyn"}}}}},{locale:"ga",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=Number(a[0])==e;return t?1==e?"one":"other":1==e?"one":2==e?"two":r&&e>=3&&e<=6?"few":r&&e>=7&&e<=10?"many":"other"},fields:{year:{displayName:"Bliain",relative:{0:"an bhliain seo",1:"an bhliain seo chugainn","-1":"anuraidh"},relativeTime:{future:{one:"i gceann {0} bhliain",two:"i gceann {0} bhliain",few:"i gceann {0} bliana",many:"i gceann {0} mbliana",other:"i gceann {0} bliain"},past:{one:"{0} bhliain ó shin",two:"{0} bhliain ó shin",few:"{0} bliana ó shin",many:"{0} mbliana ó shin",other:"{0} bliain ó shin"}}},month:{displayName:"Mí",relative:{0:"an mhí seo",1:"an mhí seo chugainn","-1":"an mhí seo caite"},relativeTime:{future:{one:"i gceann {0} mhí",two:"i gceann {0} mhí",few:"i gceann {0} mhí",many:"i gceann {0} mí",other:"i gceann {0} mí"},past:{one:"{0} mhí ó shin",two:"{0} mhí ó shin",few:"{0} mhí ó shin",many:"{0} mí ó shin",other:"{0} mí ó shin"}}},day:{displayName:"Lá",relative:{0:"inniu",1:"amárach",2:"arú amárach","-2":"arú inné","-1":"inné"},relativeTime:{future:{one:"i gceann {0} lá",two:"i gceann {0} lá",few:"i gceann {0} lá",many:"i gceann {0} lá",other:"i gceann {0} lá"},past:{one:"{0} lá ó shin",two:"{0} lá ó shin",few:"{0} lá ó shin",many:"{0} lá ó shin",other:"{0} lá ó shin"}}},hour:{displayName:"Uair",relative:{0:"an uair seo"},relativeTime:{future:{one:"i gceann {0} uair an chloig",two:"i gceann {0} uair an chloig",few:"i gceann {0} huaire an chloig",many:"i gceann {0} n-uaire an chloig",other:"i gceann {0} uair an chloig"},past:{one:"{0} uair an chloig ó shin",two:"{0} uair an chloig ó shin",few:"{0} huaire an chloig ó shin",many:"{0} n-uaire an chloig ó shin",other:"{0} uair an chloig ó shin"}}},minute:{displayName:"Nóiméad",relative:{0:"an nóiméad seo"},relativeTime:{future:{one:"i gceann {0} nóiméad",two:"i gceann {0} nóiméad",few:"i gceann {0} nóiméad",many:"i gceann {0} nóiméad",other:"i gceann {0} nóiméad"},past:{one:"{0} nóiméad ó shin",two:"{0} nóiméad ó shin",few:"{0} nóiméad ó shin",many:"{0} nóiméad ó shin",other:"{0} nóiméad ó shin"}}},second:{displayName:"Soicind",relative:{0:"anois"},relativeTime:{future:{one:"i gceann {0} soicind",two:"i gceann {0} shoicind",few:"i gceann {0} shoicind",many:"i gceann {0} soicind",other:"i gceann {0} soicind"},past:{one:"{0} soicind ó shin",two:"{0} shoicind ó shin",few:"{0} shoicind ó shin",many:"{0} soicind ó shin",other:"{0} soicind ó shin"}}}}},{locale:"gd",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=Number(a[0])==e;return t?"other":1==e||11==e?"one":2==e||12==e?"two":r&&e>=3&&e<=10||r&&e>=13&&e<=19?"few":"other"},fields:{year:{displayName:"bliadhna",relative:{0:"am bliadhna",1:"an ath-bhliadhna","-2":"a-bhòn-uiridh","-1":"an-uiridh"},relativeTime:{future:{one:"an ceann {0} bhliadhna",two:"an ceann {0} bhliadhna",few:"an ceann {0} bliadhnaichean",other:"an ceann {0} bliadhna"},past:{one:"{0} bhliadhna air ais",two:"{0} bhliadhna air ais",few:"{0} bhliadhnaichean air ais",other:"{0} bliadhna air ais"}}},month:{displayName:"mìos",relative:{0:"am mìos seo",1:"an ath-mhìos","-1":"am mìos seo chaidh"},relativeTime:{future:{one:"an ceann {0} mhìosa",two:"an ceann {0} mhìosa",few:"an ceann {0} mìosan",other:"an ceann {0} mìosa"},past:{one:"{0} mhìos air ais",two:"{0} mhìos air ais",few:"{0} mìosan air ais",other:"{0} mìos air ais"}}},day:{displayName:"latha",relative:{0:"an-diugh",1:"a-màireach",2:"an-earar",3:"an-eararais","-2":"a-bhòin-dè","-1":"an-dè"},relativeTime:{future:{one:"an ceann {0} latha",two:"an ceann {0} latha",few:"an ceann {0} làithean",other:"an ceann {0} latha"},past:{one:"{0} latha air ais",two:"{0} latha air ais",few:"{0} làithean air ais",other:"{0} latha air ais"}}},hour:{displayName:"uair a thìde",relative:{0:"this hour"},relativeTime:{future:{one:"an ceann {0} uair a thìde",two:"an ceann {0} uair a thìde",few:"an ceann {0} uairean a thìde",other:"an ceann {0} uair a thìde"},past:{one:"{0} uair a thìde air ais",two:"{0} uair a thìde air ais",few:"{0} uairean a thìde air ais",other:"{0} uair a thìde air ais"}}},minute:{displayName:"mionaid",relative:{0:"this minute"},relativeTime:{future:{one:"an ceann {0} mhionaid",two:"an ceann {0} mhionaid",few:"an ceann {0} mionaidean",other:"an ceann {0} mionaid"},past:{one:"{0} mhionaid air ais",two:"{0} mhionaid air ais",few:"{0} mionaidean air ais",other:"{0} mionaid air ais"}}},second:{displayName:"diog",relative:{0:"an-dràsta"},relativeTime:{future:{one:"an ceann {0} diog",two:"an ceann {0} dhiog",few:"an ceann {0} diogan",other:"an ceann {0} diog"},past:{one:"{0} diog air ais",two:"{0} dhiog air ais",few:"{0} diogan air ais",other:"{0} diog air ais"}}}}},{locale:"gl",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?"other":1==e&&a?"one":"other"},fields:{year:{displayName:"ano",relative:{0:"este ano",1:"o próximo ano","-1":"o ano pasado"},relativeTime:{future:{one:"en {0} ano",other:"en {0} anos"},past:{one:"hai {0} ano",other:"hai {0} anos"}}},month:{displayName:"mes",relative:{0:"este mes",1:"o próximo mes","-1":"o mes pasado"},relativeTime:{future:{one:"en {0} mes",other:"en {0} meses"},past:{one:"hai {0} mes",other:"hai {0} meses"}}},day:{displayName:"día",relative:{0:"hoxe",1:"mañá",2:"pasadomañá","-2":"antonte","-1":"onte"},relativeTime:{future:{one:"en {0} día",other:"en {0} días"},past:{one:"hai {0} día",other:"hai {0} días"}}},hour:{displayName:"hora",relative:{0:"nesta hora"},relativeTime:{future:{one:"en {0} hora",other:"en {0} horas"},past:{one:"hai {0} hora",other:"hai {0} horas"}}},minute:{displayName:"minuto",relative:{0:"neste minuto"},relativeTime:{future:{one:"en {0} minuto",other:"en {0} minutos"},past:{one:"hai {0} minuto",other:"hai {0} minutos"}}},second:{displayName:"segundo",relative:{0:"agora"},relativeTime:{future:{one:"en {0} segundo",other:"en {0} segundos"},past:{one:"hai {0} segundo",other:"hai {0} segundos"}}}}},{locale:"gsw",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Jaar",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Monet",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Tag",relative:{0:"hüt",1:"moorn",2:"übermoorn","-2":"vorgeschter","-1":"geschter"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Schtund",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minuute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"gsw-FR",parentLocale:"gsw"},{locale:"gsw-LI",parentLocale:"gsw"},{locale:"gu",pluralRuleFunction:function(e,t){return t?1==e?"one":2==e||3==e?"two":4==e?"few":6==e?"many":"other":e>=0&&e<=1?"one":"other"},fields:{year:{displayName:"વર્ષ",relative:{0:"આ વર્ષે",1:"આવતા વર્ષે","-1":"ગયા વર્ષે"},relativeTime:{future:{one:"{0} વર્ષમાં",other:"{0} વર્ષમાં"},past:{one:"{0} વર્ષ પહેલાં",other:"{0} વર્ષ પહેલાં"}}},month:{displayName:"મહિનો",relative:{0:"આ મહિને",1:"આવતા મહિને","-1":"ગયા મહિને"},relativeTime:{future:{one:"{0} મહિનામાં",other:"{0} મહિનામાં"},past:{one:"{0} મહિના પહેલાં",other:"{0} મહિના પહેલાં"}}},day:{displayName:"દિવસ",relative:{0:"આજે",1:"આવતીકાલે",2:"પરમદિવસે","-2":"ગયા પરમદિવસે","-1":"ગઈકાલે"},relativeTime:{future:{one:"{0} દિવસમાં",other:"{0} દિવસમાં"},past:{one:"{0} દિવસ પહેલાં",other:"{0} દિવસ પહેલાં"}}},hour:{displayName:"કલાક",relative:{0:"આ કલાક"},relativeTime:{future:{one:"{0} કલાકમાં",other:"{0} કલાકમાં"},past:{one:"{0} કલાક પહેલાં",other:"{0} કલાક પહેલાં"}}},minute:{displayName:"મિનિટ",relative:{0:"આ મિનિટ"},relativeTime:{future:{one:"{0} મિનિટમાં",other:"{0} મિનિટમાં"},past:{one:"{0} મિનિટ પહેલાં",other:"{0} મિનિટ પહેલાં"}}},second:{displayName:"સેકન્ડ",relative:{0:"હમણાં"},relativeTime:{future:{one:"{0} સેકંડમાં",other:"{0} સેકંડમાં"},past:{one:"{0} સેકંડ પહેલાં",other:"{0} સેકંડ પહેલાં"}}}}},{locale:"guw",pluralRuleFunction:function(e,t){return t?"other":0==e||1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"guz",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Omwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Omotienyi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Rituko",relative:{0:"Rero",1:"Mambia","-1":"Igoro"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Ensa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Edakika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Esekendi",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"gv",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=!a[1],o=r.slice(-1),n=r.slice(-2);return t?"other":i&&1==o?"one":i&&2==o?"two":!i||0!=n&&20!=n&&40!=n&&60!=n&&80!=n?i?"other":"many":"few"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ha",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Shekara",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Wata",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Kwana",relative:{0:"Yau",1:"Gobe","-1":"Jiya"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Awa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minti",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Daƙiƙa",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ha-Arab",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ha-GH",parentLocale:"ha"},{locale:"ha-NE",parentLocale:"ha"},{locale:"haw",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"he",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=!a[1],o=Number(a[0])==e,n=o&&a[0].slice(-1);return t?"other":1==e&&i?"one":2==r&&i?"two":i&&(e<0||e>10)&&o&&0==n?"many":"other"},fields:{year:{displayName:"שנה",relative:{0:"השנה",1:"השנה הבאה","-1":"השנה שעברה"},relativeTime:{future:{one:"בעוד שנה",two:"בעוד שנתיים",many:"בעוד {0} שנה",other:"בעוד {0} שנים"},past:{one:"לפני שנה",two:"לפני שנתיים",many:"לפני {0} שנה",other:"לפני {0} שנים"}}},month:{displayName:"חודש",relative:{0:"החודש",1:"החודש הבא","-1":"החודש שעבר"},relativeTime:{future:{one:"בעוד חודש",two:"בעוד חודשיים",many:"בעוד {0} חודשים",other:"בעוד {0} חודשים"},past:{one:"לפני חודש",two:"לפני חודשיים",many:"לפני {0} חודשים",other:"לפני {0} חודשים"}}},day:{displayName:"יום",relative:{0:"היום",1:"מחר",2:"מחרתיים","-2":"שלשום","-1":"אתמול"},relativeTime:{future:{one:"בעוד יום {0}",two:"בעוד יומיים",many:"בעוד {0} ימים",other:"בעוד {0} ימים"},past:{one:"לפני יום {0}",two:"לפני יומיים",many:"לפני {0} ימים",other:"לפני {0} ימים"}}},hour:{displayName:"שעה",relative:{0:"בשעה זו"},relativeTime:{future:{one:"בעוד שעה",two:"בעוד שעתיים",many:"בעוד {0} שעות",other:"בעוד {0} שעות"},past:{one:"לפני שעה",two:"לפני שעתיים",many:"לפני {0} שעות",other:"לפני {0} שעות"}}},minute:{displayName:"דקה",relative:{0:"בדקה זו"},relativeTime:{future:{one:"בעוד דקה",two:"בעוד שתי דקות",many:"בעוד {0} דקות",other:"בעוד {0} דקות"},past:{one:"לפני דקה",two:"לפני שתי דקות",many:"לפני {0} דקות",other:"לפני {0} דקות"}}},second:{displayName:"שנייה",relative:{0:"עכשיו"},relativeTime:{future:{one:"בעוד שנייה",two:"בעוד שתי שניות",many:"בעוד {0} שניות",other:"בעוד {0} שניות"},past:{one:"לפני שנייה",two:"לפני שתי שניות",many:"לפני {0} שניות",other:"לפני {0} שניות"}}}}},{locale:"hi",pluralRuleFunction:function(e,t){return t?1==e?"one":2==e||3==e?"two":4==e?"few":6==e?"many":"other":e>=0&&e<=1?"one":"other"},fields:{year:{displayName:"वर्ष",relative:{0:"इस वर्ष",1:"अगला वर्ष","-1":"पिछला वर्ष"},relativeTime:{future:{one:"{0} वर्ष में",other:"{0} वर्ष में"},past:{one:"{0} वर्ष पहले",other:"{0} वर्ष पहले"}}},month:{displayName:"माह",relative:{0:"इस माह",1:"अगला माह","-1":"पिछला माह"},relativeTime:{future:{one:"{0} माह में",other:"{0} माह में"},past:{one:"{0} माह पहले",other:"{0} माह पहले"}}},day:{displayName:"दिन",relative:{0:"आज",1:"कल",2:"परसों","-2":"बीता परसों","-1":"कल"},relativeTime:{future:{one:"{0} दिन में",other:"{0} दिन में"},past:{one:"{0} दिन पहले",other:"{0} दिन पहले"}}},hour:{displayName:"घंटा",relative:{0:"यह घंटा"},relativeTime:{future:{one:"{0} घंटे में",other:"{0} घंटे में"},past:{one:"{0} घंटे पहले",other:"{0} घंटे पहले"}}},minute:{displayName:"मिनट",relative:{0:"यह मिनट"},relativeTime:{future:{one:"{0} मिनट में",other:"{0} मिनट में"},past:{one:"{0} मिनट पहले",other:"{0} मिनट पहले"}}},second:{displayName:"सेकंड",relative:{0:"अब"},relativeTime:{future:{one:"{0} सेकंड में",other:"{0} सेकंड में"},past:{one:"{0} सेकंड पहले",other:"{0} सेकंड पहले"}}}}},{locale:"hr",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=a[1]||"",o=!a[1],n=r.slice(-1),l=r.slice(-2),u=i.slice(-1),s=i.slice(-2);return t?"other":o&&1==n&&11!=l||1==u&&11!=s?"one":o&&n>=2&&n<=4&&(l<12||l>14)||u>=2&&u<=4&&(s<12||s>14)?"few":"other"},fields:{year:{displayName:"godina",relative:{0:"ove godine",1:"sljedeće godine","-1":"prošle godine"},relativeTime:{future:{one:"za {0} godinu",few:"za {0} godine",other:"za {0} godina"},past:{one:"prije {0} godinu",few:"prije {0} godine",other:"prije {0} godina"}}},month:{displayName:"mjesec",relative:{0:"ovaj mjesec",1:"sljedeći mjesec","-1":"prošli mjesec"},relativeTime:{future:{one:"za {0} mjesec",few:"za {0} mjeseca",other:"za {0} mjeseci"},past:{one:"prije {0} mjesec",few:"prije {0} mjeseca",other:"prije {0} mjeseci"}}},day:{displayName:"dan",relative:{0:"danas",1:"sutra",2:"prekosutra","-2":"prekjučer","-1":"jučer"},relativeTime:{future:{one:"za {0} dan",few:"za {0} dana",other:"za {0} dana"},past:{one:"prije {0} dan",few:"prije {0} dana",other:"prije {0} dana"}}},hour:{displayName:"sat",relative:{0:"ovaj sat"},relativeTime:{future:{one:"za {0} sat",few:"za {0} sata",other:"za {0} sati"},past:{one:"prije {0} sat",few:"prije {0} sata",other:"prije {0} sati"}}},minute:{displayName:"minuta",relative:{0:"ova minuta"},relativeTime:{future:{one:"za {0} minutu",few:"za {0} minute",other:"za {0} minuta"},past:{one:"prije {0} minutu",few:"prije {0} minute",other:"prije {0} minuta"}}},second:{displayName:"sekunda",relative:{0:"sad"},relativeTime:{future:{one:"za {0} sekundu",few:"za {0} sekunde",other:"za {0} sekundi"},past:{one:"prije {0} sekundu",few:"prije {0} sekunde",other:"prije {0} sekundi"}}}}},{locale:"hr-BA",parentLocale:"hr"},{locale:"hsb",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=a[1]||"",o=!a[1],n=r.slice(-2),l=i.slice(-2);return t?"other":o&&1==n||1==l?"one":o&&2==n||2==l?"two":o&&(3==n||4==n)||3==l||4==l?"few":"other"},fields:{year:{displayName:"lěto",relative:{0:"lětsa",1:"klětu","-1":"loni"},relativeTime:{future:{one:"za {0} lěto",two:"za {0} lěće",few:"za {0} lěta",other:"za {0} lět"},past:{one:"před {0} lětom",two:"před {0} lětomaj",few:"před {0} lětami",other:"před {0} lětami"}}},month:{displayName:"měsac",relative:{0:"tutón měsac",1:"přichodny měsac","-1":"zašły měsac"},relativeTime:{future:{one:"za {0} měsac",two:"za {0} měsacaj",few:"za {0} měsacy",other:"za {0} měsacow"},past:{one:"před {0} měsacom",two:"před {0} měsacomaj",few:"před {0} měsacami",other:"před {0} měsacami"}}},day:{displayName:"dźeń",relative:{0:"dźensa",1:"jutře","-1":"wčera"},relativeTime:{future:{one:"za {0} dźeń",two:"za {0} dnjej",few:"za {0} dny",other:"za {0} dnjow"},past:{one:"před {0} dnjom",two:"před {0} dnjomaj",few:"před {0} dnjemi",other:"před {0} dnjemi"}}},hour:{displayName:"hodźina",relative:{0:"this hour"},relativeTime:{future:{one:"za {0} hodźinu",two:"za {0} hodźinje",few:"za {0} hodźiny",other:"za {0} hodźin"},past:{one:"před {0} hodźinu",two:"před {0} hodźinomaj",few:"před {0} hodźinami",other:"před {0} hodźinami"}}},minute:{displayName:"minuta",relative:{0:"this minute"},relativeTime:{future:{one:"za {0} minutu",two:"za {0} minuće",few:"za {0} minuty",other:"za {0} minutow"},past:{one:"před {0} minutu",two:"před {0} minutomaj",few:"před {0} minutami",other:"před {0} minutami"}}},second:{displayName:"sekunda",relative:{0:"now"},relativeTime:{future:{one:"za {0} sekundu",two:"za {0} sekundźe",few:"za {0} sekundy",other:"za {0} sekundow"},past:{one:"před {0} sekundu",two:"před {0} sekundomaj",few:"před {0} sekundami",other:"před {0} sekundami"}}}}},{locale:"hu",pluralRuleFunction:function(e,t){return t?1==e||5==e?"one":"other":1==e?"one":"other"},fields:{year:{displayName:"év",relative:{0:"ez az év",1:"következő év","-1":"előző év"},relativeTime:{future:{one:"{0} év múlva",other:"{0} év múlva"},past:{one:"{0} évvel ezelőtt",other:"{0} évvel ezelőtt"}}},month:{displayName:"hónap",relative:{0:"ez a hónap",1:"következő hónap","-1":"előző hónap"},relativeTime:{future:{one:"{0} hónap múlva",other:"{0} hónap múlva"},past:{one:"{0} hónappal ezelőtt",other:"{0} hónappal ezelőtt"}}},day:{displayName:"nap",relative:{0:"ma",1:"holnap",2:"holnapután","-2":"tegnapelőtt","-1":"tegnap"},relativeTime:{future:{one:"{0} nap múlva",other:"{0} nap múlva"},past:{one:"{0} nappal ezelőtt",other:"{0} nappal ezelőtt"}}},hour:{displayName:"óra",relative:{0:"ebben az órában"},relativeTime:{future:{one:"{0} óra múlva",other:"{0} óra múlva"},past:{one:"{0} órával ezelőtt",other:"{0} órával ezelőtt"}}},minute:{displayName:"perc",relative:{0:"ebben a percben"},relativeTime:{future:{one:"{0} perc múlva",other:"{0} perc múlva"},past:{one:"{0} perccel ezelőtt",other:"{0} perccel ezelőtt"}}},second:{displayName:"másodperc",relative:{0:"most"},relativeTime:{future:{one:"{0} másodperc múlva",other:"{0} másodperc múlva"},past:{one:"{0} másodperccel ezelőtt",other:"{0} másodperccel ezelőtt"}}}}},{locale:"hy",pluralRuleFunction:function(e,t){return t?1==e?"one":"other":e>=0&&e<2?"one":"other"},fields:{year:{displayName:"տարի",relative:{0:"այս տարի",1:"հաջորդ տարի","-1":"նախորդ տարի"},relativeTime:{future:{one:"{0} տարուց",other:"{0} տարուց"},past:{one:"{0} տարի առաջ",other:"{0} տարի առաջ"}}},month:{displayName:"ամիս",relative:{0:"այս ամիս",1:"հաջորդ ամիս","-1":"նախորդ ամիս"},relativeTime:{future:{one:"{0} ամսից",other:"{0} ամսից"},past:{one:"{0} ամիս առաջ",other:"{0} ամիս առաջ"}}},day:{displayName:"օր",relative:{0:"այսօր",1:"վաղը",2:"վաղը չէ մյուս օրը","-2":"երեկ չէ առաջի օրը","-1":"երեկ"},relativeTime:{future:{one:"{0} օրից",other:"{0} օրից"},past:{one:"{0} օր առաջ",other:"{0} օր առաջ"}}},hour:{displayName:"ժամ",relative:{0:"այս ժամին"},relativeTime:{future:{one:"{0} ժամից",other:"{0} ժամից"},past:{one:"{0} ժամ առաջ",other:"{0} ժամ առաջ"}}},minute:{displayName:"րոպե",relative:{0:"այս րոպեին"},relativeTime:{future:{one:"{0} րոպեից",other:"{0} րոպեից"},past:{one:"{0} րոպե առաջ",other:"{0} րոպե առաջ"}}},second:{displayName:"վայրկյան",relative:{0:"այժմ"},relativeTime:{future:{one:"{0} վայրկյանից",other:"{0} վայրկյանից"},past:{one:"{0} վայրկյան առաջ",other:"{0} վայրկյան առաջ"}}}}},{locale:"id",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Tahun",relative:{0:"tahun ini",1:"tahun depan","-1":"tahun lalu"},relativeTime:{future:{other:"Dalam {0} tahun"},past:{other:"{0} tahun yang lalu"}}},month:{displayName:"Bulan",relative:{0:"bulan ini",1:"Bulan berikutnya","-1":"bulan lalu"},relativeTime:{future:{other:"Dalam {0} bulan"},past:{other:"{0} bulan yang lalu"}}},day:{displayName:"Hari",relative:{0:"hari ini",1:"besok",2:"lusa","-2":"kemarin dulu","-1":"kemarin"},relativeTime:{future:{other:"Dalam {0} hari"},past:{other:"{0} hari yang lalu"}}},hour:{displayName:"Jam",relative:{0:"jam ini"},relativeTime:{future:{other:"Dalam {0} jam"},past:{other:"{0} jam yang lalu"}}},minute:{displayName:"Menit",relative:{0:"menit ini"},relativeTime:{future:{other:"Dalam {0} menit"},past:{other:"{0} menit yang lalu"}}},second:{displayName:"Detik",relative:{0:"sekarang"},relativeTime:{future:{other:"Dalam {0} detik"},past:{other:"{0} detik yang lalu"}}}}},{locale:"ig",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Afọ",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Ọnwa",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ụbọchị",relative:{0:"Taata",1:"Echi","-1":"Nnyaafụ"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Elekere",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Nkeji",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Nkejinta",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ii",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"ꈎ",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"ꆪ",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"ꑍ",relative:{0:"ꀃꑍ",1:"ꃆꏂꑍ",2:"ꌕꀿꑍ","-2":"ꎴꂿꋍꑍ","-1":"ꀋꅔꉈ"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"ꄮꈉ",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"ꃏ",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"ꇙ",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"in",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"is",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=Number(a[0])==e,o=r.slice(-1),n=r.slice(-2);return t?"other":i&&1==o&&11!=n||!i?"one":"other"},fields:{year:{displayName:"ár",relative:{0:"á þessu ári",1:"á næsta ári","-1":"á síðasta ári"},relativeTime:{future:{one:"eftir {0} ár",other:"eftir {0} ár"},past:{one:"fyrir {0} ári",other:"fyrir {0} árum"}}},month:{displayName:"mánuður",relative:{0:"í þessum mánuði",1:"í næsta mánuði","-1":"í síðasta mánuði"},relativeTime:{future:{one:"eftir {0} mánuð",other:"eftir {0} mánuði"},past:{one:"fyrir {0} mánuði",other:"fyrir {0} mánuðum"}}},day:{displayName:"dagur",relative:{0:"í dag",1:"á morgun",2:"eftir tvo daga","-2":"í fyrradag","-1":"í gær"},relativeTime:{future:{one:"eftir {0} dag",other:"eftir {0} daga"},past:{one:"fyrir {0} degi",other:"fyrir {0} dögum"}}},hour:{displayName:"klukkustund",relative:{0:"this hour"},relativeTime:{future:{one:"eftir {0} klukkustund",other:"eftir {0} klukkustundir"},past:{one:"fyrir {0} klukkustund",other:"fyrir {0} klukkustundum"}}},minute:{displayName:"mínúta",relative:{0:"this minute"},relativeTime:{future:{one:"eftir {0} mínútu",other:"eftir {0} mínútur"},past:{one:"fyrir {0} mínútu",other:"fyrir {0} mínútum"}}},second:{displayName:"sekúnda",relative:{0:"núna"},relativeTime:{future:{one:"eftir {0} sekúndu",other:"eftir {0} sekúndur"},past:{one:"fyrir {0} sekúndu",other:"fyrir {0} sekúndum"}}}}},{locale:"it",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?11==e||8==e||80==e||800==e?"many":"other":1==e&&a?"one":"other"},fields:{year:{displayName:"anno",relative:{0:"quest’anno",1:"anno prossimo","-1":"anno scorso"},relativeTime:{future:{one:"tra {0} anno",other:"tra {0} anni"},past:{one:"{0} anno fa",other:"{0} anni fa"}}},month:{displayName:"mese",relative:{0:"questo mese",1:"mese prossimo","-1":"mese scorso"},relativeTime:{future:{one:"tra {0} mese",other:"tra {0} mesi"},past:{one:"{0} mese fa",other:"{0} mesi fa"}}},day:{displayName:"giorno",relative:{0:"oggi",1:"domani",2:"dopodomani","-2":"l’altro ieri","-1":"ieri"},relativeTime:{future:{one:"tra {0} giorno",other:"tra {0} giorni"},past:{one:"{0} giorno fa",other:"{0} giorni fa"}}},hour:{displayName:"ora",relative:{0:"quest’ora"},relativeTime:{future:{one:"tra {0} ora",other:"tra {0} ore"},past:{one:"{0} ora fa",other:"{0} ore fa"}}},minute:{displayName:"minuto",relative:{0:"questo minuto"},relativeTime:{future:{one:"tra {0} minuto",other:"tra {0} minuti"},past:{one:"{0} minuto fa",other:"{0} minuti fa"}}},second:{displayName:"secondo",relative:{0:"ora"},relativeTime:{future:{one:"tra {0} secondo",other:"tra {0} secondi"},past:{one:"{0} secondo fa",other:"{0} secondi fa"}}}}},{locale:"it-CH",parentLocale:"it"},{locale:"it-SM",parentLocale:"it"},{locale:"it-VA",parentLocale:"it"},{locale:"iu",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":2==e?"two":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"iu-Latn",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"iw",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=!a[1],o=Number(a[0])==e,n=o&&a[0].slice(-1);return t?"other":1==e&&i?"one":2==r&&i?"two":i&&(e<0||e>10)&&o&&0==n?"many":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ja",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"年",relative:{0:"今年",1:"翌年","-1":"昨年"},relativeTime:{future:{other:"{0} 年後"},past:{other:"{0} 年前"}}},month:{displayName:"月",relative:{0:"今月",1:"翌月","-1":"先月"},relativeTime:{future:{other:"{0} か月後"},past:{other:"{0} か月前"}}},day:{displayName:"日",relative:{0:"今日",1:"明日",2:"明後日","-2":"一昨日","-1":"昨日"},relativeTime:{future:{other:"{0} 日後"},past:{other:"{0} 日前"}}},hour:{displayName:"時",relative:{0:"1 時間以内"},relativeTime:{future:{other:"{0} 時間後"},past:{other:"{0} 時間前"}}},minute:{displayName:"分",relative:{0:"1 分以内"},relativeTime:{future:{other:"{0} 分後"},past:{other:"{0} 分前"}}},second:{displayName:"秒",relative:{0:"今"},relativeTime:{future:{other:"{0} 秒後"},past:{other:"{0} 秒前"}}}}},{locale:"jbo",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"jgo",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"Nǔu ŋguꞋ {0}",other:"Nǔu ŋguꞋ {0}"},past:{one:"Ɛ́gɛ́ mɔ́ ŋguꞋ {0}",other:"Ɛ́gɛ́ mɔ́ ŋguꞋ {0}"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"Nǔu {0} saŋ",other:"Nǔu {0} saŋ"},past:{one:"ɛ́ gɛ́ mɔ́ pɛsaŋ {0}",other:"ɛ́ gɛ́ mɔ́ pɛsaŋ {0}"}}},day:{displayName:"Day",relative:{0:"lɔꞋɔ",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{one:"Nǔu lɛ́Ꞌ {0}",other:"Nǔu lɛ́Ꞌ {0}"},past:{one:"Ɛ́ gɛ́ mɔ́ lɛ́Ꞌ {0}",other:"Ɛ́ gɛ́ mɔ́ lɛ́Ꞌ {0}"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{one:"nǔu háwa {0}",other:"nǔu háwa {0}"},past:{one:"ɛ́ gɛ mɔ́ {0} háwa",other:"ɛ́ gɛ mɔ́ {0} háwa"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{one:"nǔu {0} minút",other:"nǔu {0} minút"},past:{one:"ɛ́ gɛ́ mɔ́ minút {0}",other:"ɛ́ gɛ́ mɔ́ minút {0}"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ji",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?"other":1==e&&a?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"jmc",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Maka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mori",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Mfiri",relative:{0:"Inu",1:"Ngama","-1":"Ukou"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Saa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Dakyika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"jv",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"jw",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ka",pluralRuleFunction:function(e,t){var a=String(e).split(".")[0],r=a.slice(-2);return t?1==a?"one":0==a||r>=2&&r<=20||40==r||60==r||80==r?"many":"other":1==e?"one":"other"},fields:{year:{displayName:"წელი",relative:{0:"ამ წელს",1:"მომავალ წელს","-1":"გასულ წელს"},relativeTime:{future:{one:"{0} წელიწადში",other:"{0} წელიწადში"},past:{one:"{0} წლის წინ",other:"{0} წლის წინ"}}},month:{displayName:"თვე",relative:{0:"ამ თვეში",1:"მომავალ თვეს","-1":"გასულ თვეს"},relativeTime:{future:{one:"{0} თვეში",other:"{0} თვეში"},past:{one:"{0} თვის წინ",other:"{0} თვის წინ"}}},day:{displayName:"დღე",relative:{0:"დღეს",1:"ხვალ",2:"ზეგ","-2":"გუშინწინ","-1":"გუშინ"},relativeTime:{future:{one:"{0} დღეში",other:"{0} დღეში"},past:{one:"{0} დღის წინ",other:"{0} დღის წინ"}}},hour:{displayName:"საათი",relative:{0:"ამ საათში"},relativeTime:{future:{one:"{0} საათში",other:"{0} საათში"},past:{one:"{0} საათის წინ",other:"{0} საათის წინ"}}},minute:{displayName:"წუთი",relative:{0:"ამ წუთში"},relativeTime:{future:{one:"{0} წუთში",other:"{0} წუთში"},past:{one:"{0} წუთის წინ",other:"{0} წუთის წინ"}}},second:{displayName:"წამი",relative:{0:"ახლა"},relativeTime:{future:{one:"{0} წამში",other:"{0} წამში"},past:{one:"{0} წამის წინ",other:"{0} წამის წინ"}}}}},{locale:"kab",pluralRuleFunction:function(e,t){return t?"other":e>=0&&e<2?"one":"other"},fields:{year:{displayName:"Aseggas",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Aggur",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ass",relative:{0:"Ass-a",1:"Azekka","-1":"Iḍelli"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Tamert",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Tamrect",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Tasint",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"kaj",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"kam",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Mwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mwai",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Mũthenya",relative:{0:"Ũmũnthĩ",1:"Ũnĩ","-1":"Ĩyoo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Saa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Ndatĩka",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"sekondi",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"kcg",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"kde",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Mwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mwedi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Lihiku",relative:{0:"Nelo",1:"Nundu","-1":"Lido"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Saa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Dakika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"kea",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Anu",relative:{0:"es anu li",1:"prósimu anu","-1":"anu pasadu"},relativeTime:{future:{other:"di li {0} anu"},past:{other:"a ten {0} anu"}}},month:{displayName:"Mes",relative:{0:"es mes li",1:"prósimu mes","-1":"mes pasadu"},relativeTime:{future:{other:"di li {0} mes"},past:{other:"a ten {0} mes"}}},day:{displayName:"Dia",relative:{0:"oji",1:"manha","-1":"onti"},relativeTime:{future:{other:"di li {0} dia"},past:{other:"a ten {0} dia"}}},hour:{displayName:"Ora",relative:{0:"this hour"},relativeTime:{future:{other:"di li {0} ora"},past:{other:"a ten {0} ora"}}},minute:{displayName:"Minutu",relative:{0:"this minute"},relativeTime:{future:{other:"di li {0} minutu"},past:{other:"a ten {0} minutu"}}},second:{displayName:"Sigundu",relative:{0:"now"},relativeTime:{future:{other:"di li {0} sigundu"},past:{other:"a ten {0} sigundu"}}}}},{locale:"khq",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Jiiri",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Handu",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Jaari",relative:{0:"Hõo",1:"Suba","-1":"Bi"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Guuru",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Miniti",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Miti",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ki",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Mwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mweri",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Mũthenya",relative:{0:"Ũmũthĩ",1:"Rũciũ","-1":"Ira"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Ithaa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Ndagĩka",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"kk",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=Number(a[0])==e,i=r&&a[0].slice(-1);return t?6==i||9==i||r&&0==i&&0!=e?"many":"other":1==e?"one":"other"},fields:{year:{displayName:"жыл",relative:{0:"биылғы жыл",1:"келесі жыл","-1":"былтырғы жыл"},relativeTime:{future:{one:"{0} жылдан кейін",other:"{0} жылдан кейін"},past:{one:"{0} жыл бұрын",other:"{0} жыл бұрын"}}},month:{displayName:"ай",relative:{0:"осы ай",1:"келесі ай","-1":"өткен ай"},relativeTime:{future:{one:"{0} айдан кейін",other:"{0} айдан кейін"},past:{one:"{0} ай бұрын",other:"{0} ай бұрын"}}},day:{displayName:"күн",relative:{0:"бүгін",1:"ертең",2:"бүрсігүні","-2":"алдыңгүні","-1":"кеше"},relativeTime:{future:{one:"{0} күннен кейін",other:"{0} күннен кейін"},past:{one:"{0} күн бұрын",other:"{0} күн бұрын"}}},hour:{displayName:"сағат",relative:{0:"осы сағат"},relativeTime:{future:{one:"{0} сағаттан кейін",other:"{0} сағаттан кейін"},past:{one:"{0} сағат бұрын",other:"{0} сағат бұрын"}}},minute:{displayName:"минут",relative:{0:"осы минут"},relativeTime:{future:{one:"{0} минуттан кейін",other:"{0} минуттан кейін"},past:{one:"{0} минут бұрын",other:"{0} минут бұрын"}}},second:{displayName:"секунд",relative:{0:"қазір"},relativeTime:{future:{one:"{0} секундтан кейін",other:"{0} секундтан кейін"},past:{one:"{0} секунд бұрын",other:"{0} секунд бұрын"}}}}},{locale:"kkj",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"muka",1:"nɛmɛnɔ","-1":"kwey"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"kl",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"om {0} ukioq",other:"om {0} ukioq"},past:{one:"for {0} ukioq siden",other:"for {0} ukioq siden"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"om {0} qaammat",other:"om {0} qaammat"},past:{one:"for {0} qaammat siden",other:"for {0} qaammat siden"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{one:"om {0} ulloq unnuarlu",other:"om {0} ulloq unnuarlu"},past:{one:"for {0} ulloq unnuarlu siden",other:"for {0} ulloq unnuarlu siden"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{one:"om {0} nalunaaquttap-akunnera",other:"om {0} nalunaaquttap-akunnera"},past:{one:"for {0} nalunaaquttap-akunnera siden",other:"for {0} nalunaaquttap-akunnera siden"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{one:"om {0} minutsi",other:"om {0} minutsi"},past:{one:"for {0} minutsi siden",other:"for {0} minutsi siden"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{one:"om {0} sekundi",other:"om {0} sekundi"},past:{one:"for {0} sekundi siden",other:"for {0} sekundi siden"}}}}},{locale:"kln",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Kenyit",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Arawet",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Betut",relative:{0:"Raini",1:"Mutai","-1":"Amut"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Sait",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minitit",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekondit",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"km",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"ឆ្នាំ",relative:{0:"ឆ្នាំ​នេះ",1:"ឆ្នាំ​ក្រោយ","-1":"ឆ្នាំ​មុន"},relativeTime:{future:{other:"{0} ឆ្នាំទៀត"},past:{other:"{0} ឆ្នាំ​មុន"}}},month:{displayName:"ខែ",relative:{0:"ខែ​នេះ",1:"ខែ​ក្រោយ","-1":"ខែ​មុន"},relativeTime:{future:{other:"{0} ខែទៀត"},past:{other:"{0} ខែមុន"}}},day:{displayName:"ថ្ងៃ",relative:{0:"ថ្ងៃ​នេះ",1:"ថ្ងៃ​ស្អែក",2:"​ខាន​ស្អែក","-2":"ម្សិល​ម៉្ងៃ","-1":"ម្សិលមិញ"},relativeTime:{future:{other:"{0} ថ្ងៃទៀត"},past:{other:"{0} ថ្ងៃ​មុន"}}},hour:{displayName:"ម៉ោង",relative:{0:"ម៉ោងនេះ"},relativeTime:{future:{other:"ក្នុង​រយៈ​ពេល {0} ម៉ោង"},past:{other:"{0} ម៉ោង​មុន"}}},minute:{displayName:"នាទី",relative:{0:"នាទីនេះ"},relativeTime:{future:{other:"{0} នាទីទៀត"},past:{other:"{0} នាទី​មុន"}}},second:{displayName:"វិនាទី",relative:{0:"ឥឡូវ"},relativeTime:{future:{other:"{0} វិនាទីទៀត"},past:{other:"{0} វិនាទី​មុន"}}}}},{locale:"kn",pluralRuleFunction:function(e,t){return t?"other":e>=0&&e<=1?"one":"other"},fields:{year:{displayName:"ವರ್ಷ",relative:{0:"ಈ ವರ್ಷ",1:"ಮುಂದಿನ ವರ್ಷ","-1":"ಹಿಂದಿನ ವರ್ಷ"},relativeTime:{future:{one:"{0} ವರ್ಷದಲ್ಲಿ",other:"{0} ವರ್ಷಗಳಲ್ಲಿ"},past:{one:"{0} ವರ್ಷದ ಹಿಂದೆ",other:"{0} ವರ್ಷಗಳ ಹಿಂದೆ"}}},month:{displayName:"ತಿಂಗಳು",relative:{0:"ಈ ತಿಂಗಳು",1:"ಮುಂದಿನ ತಿಂಗಳು","-1":"ಕಳೆದ ತಿಂಗಳು"},relativeTime:{future:{one:"{0} ತಿಂಗಳಲ್ಲಿ",other:"{0} ತಿಂಗಳುಗಳಲ್ಲಿ"},past:{one:"{0} ತಿಂಗಳುಗಳ ಹಿಂದೆ",other:"{0} ತಿಂಗಳುಗಳ ಹಿಂದೆ"}}},day:{displayName:"ದಿನ",relative:{0:"ಇಂದು",1:"ನಾಳೆ",2:"ನಾಡಿದ್ದು","-2":"ಮೊನ್ನೆ","-1":"ನಿನ್ನೆ"},relativeTime:{future:{one:"{0} ದಿನದಲ್ಲಿ",other:"{0} ದಿನಗಳಲ್ಲಿ"},past:{one:"{0} ದಿನದ ಹಿಂದೆ",other:"{0} ದಿನಗಳ ಹಿಂದೆ"}}},hour:{displayName:"ಗಂಟೆ",relative:{0:"ಈ ಗಂಟೆ"},relativeTime:{future:{one:"{0} ಗಂಟೆಯಲ್ಲಿ",other:"{0} ಗಂಟೆಗಳಲ್ಲಿ"},past:{one:"{0} ಗಂಟೆ ಹಿಂದೆ",other:"{0} ಗಂಟೆಗಳ ಹಿಂದೆ"}}},minute:{displayName:"ನಿಮಿಷ",relative:{0:"ಈ ನಿಮಿಷ"},relativeTime:{future:{one:"{0} ನಿಮಿಷದಲ್ಲಿ",other:"{0} ನಿಮಿಷಗಳಲ್ಲಿ"},past:{one:"{0} ನಿಮಿಷಗಳ ಹಿಂದೆ",other:"{0} ನಿಮಿಷಗಳ ಹಿಂದೆ"}}},second:{displayName:"ಸೆಕೆಂಡ್",relative:{0:"ಈಗ"},relativeTime:{future:{one:"{0} ಸೆಕೆಂಡ್‌ನಲ್ಲಿ",other:"{0} ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ"},past:{one:"{0} ಸೆಕೆಂಡ್ ಹಿಂದೆ",other:"{0} ಸೆಕೆಂಡುಗಳ ಹಿಂದೆ"}}}}},{locale:"ko",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"년",relative:{0:"올해",1:"내년","-1":"작년"},relativeTime:{future:{other:"{0}년 후"},past:{other:"{0}년 전"}}},month:{displayName:"월",relative:{0:"이번 달",1:"다음 달","-1":"지난달"},relativeTime:{future:{other:"{0}개월 후"},past:{other:"{0}개월 전"}}},day:{displayName:"일",relative:{0:"오늘",1:"내일",2:"모레","-2":"그저께","-1":"어제"},relativeTime:{future:{other:"{0}일 후"},past:{other:"{0}일 전"}}},hour:{displayName:"시",relative:{0:"현재 시간"},relativeTime:{future:{other:"{0}시간 후"},past:{other:"{0}시간 전"}}},minute:{displayName:"분",relative:{0:"현재 분"},relativeTime:{future:{other:"{0}분 후"},past:{other:"{0}분 전"}}},second:{displayName:"초",relative:{0:"지금"},relativeTime:{future:{other:"{0}초 후"},past:{other:"{0}초 전"}}}}},{locale:"ko-KP",parentLocale:"ko"},{locale:"kok",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ks",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"ؤری",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"رٮ۪تھ",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"دۄہ",relative:{0:"اَز",1:"پگاہ","-1":"راتھ"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"گٲنٛٹہٕ",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"مِنَٹ",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"سٮ۪کَنڑ",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ksb",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Ng’waka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Ng’ezi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Siku",relative:{0:"Evi eo",1:"Keloi","-1":"Ghuo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Saa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Dakika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ksf",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Bǝk",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Ŋwíí",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ŋwós",relative:{0:"Gɛ́ɛnǝ",1:"Ridúrǝ́","-1":"Rinkɔɔ́"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Cámɛɛn",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Mǝnít",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Háu",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ksh",pluralRuleFunction:function(e,t){return t?"other":0==e?"zero":1==e?"one":"other"},fields:{year:{displayName:"Johr",relative:{0:"diß Johr",1:"näx Johr","-1":"läz Johr"},relativeTime:{future:{zero:"en keinem Johr",one:"en {0} Johr",other:"en {0} Johre"},past:{zero:"vör keijnem Johr",one:"vör {0} Johr",other:"vör {0} Johre"}}},month:{displayName:"Mohnd",relative:{0:"diese Mohnd",1:"nächste Mohnd","-1":"lätzde Mohnd"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Daach",relative:{0:"hück",1:"morje",2:"övvermorje","-2":"vörjestere","-1":"jestere"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Schtund",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Menutt",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekond",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ku",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"kw",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":2==e?"two":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ky",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"жыл",relative:{0:"быйыл",1:"эмдиги жылы","-1":"былтыр"},relativeTime:{future:{one:"{0} жылдан кийин",other:"{0} жылдан кийин"},past:{one:"{0} жыл мурун",other:"{0} жыл мурун"}}},month:{displayName:"ай",relative:{0:"бул айда",1:"эмдиги айда","-1":"өткөн айда"},relativeTime:{future:{one:"{0} айдан кийин",other:"{0} айдан кийин"},past:{one:"{0} ай мурун",other:"{0} ай мурун"}}},day:{displayName:"күн",relative:{0:"бүгүн",1:"эртеӊ",2:"бүрсүгүнү","-2":"мурдагы күнү","-1":"кечээ"},relativeTime:{future:{one:"{0} күндөн кийин",other:"{0} күндөн кийин"},past:{one:"{0} күн мурун",other:"{0} күн мурун"}}},hour:{displayName:"саат",relative:{0:"ушул саатта"},relativeTime:{future:{one:"{0} сааттан кийин",other:"{0} сааттан кийин"},past:{one:"{0} саат мурун",other:"{0} саат мурун"}}},minute:{displayName:"мүнөт",relative:{0:"ушул мүнөттө"},relativeTime:{future:{one:"{0} мүнөттөн кийин",other:"{0} мүнөттөн кийин"},past:{one:"{0} мүнөт мурун",other:"{0} мүнөт мурун"}}},second:{displayName:"секунд",relative:{0:"азыр"},relativeTime:{future:{one:"{0} секунддан кийин",other:"{0} секунддан кийин"},past:{one:"{0} секунд мурун",other:"{0} секунд мурун"}}}}},{locale:"lag",pluralRuleFunction:function(e,t){var a=String(e).split(".")[0];return t?"other":0==e?"zero":0!=a&&1!=a||0==e?"other":"one"},fields:{year:{displayName:"Mwaáka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mweéri",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Sikʉ",relative:{0:"Isikʉ",1:"Lamʉtoondo","-1":"Niijo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Sáa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Dakíka",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekúunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"lb",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Joer",relative:{0:"dëst Joer",1:"nächst Joer","-1":"lescht Joer"},relativeTime:{future:{one:"an {0} Joer",other:"a(n) {0} Joer"},past:{one:"virun {0} Joer",other:"viru(n) {0} Joer"}}},month:{displayName:"Mount",relative:{0:"dëse Mount",1:"nächste Mount","-1":"leschte Mount"},relativeTime:{future:{one:"an {0} Mount",other:"a(n) {0} Méint"},past:{one:"virun {0} Mount",other:"viru(n) {0} Méint"}}},day:{displayName:"Dag",relative:{0:"haut",1:"muer","-1":"gëschter"},relativeTime:{future:{one:"an {0} Dag",other:"a(n) {0} Deeg"},past:{one:"virun {0} Dag",other:"viru(n) {0} Deeg"}}},hour:{displayName:"Stonn",relative:{0:"this hour"},relativeTime:{future:{one:"an {0} Stonn",other:"a(n) {0} Stonnen"},past:{one:"virun {0} Stonn",other:"viru(n) {0} Stonnen"}}},minute:{displayName:"Minutt",relative:{0:"this minute"},relativeTime:{future:{one:"an {0} Minutt",other:"a(n) {0} Minutten"},past:{one:"virun {0} Minutt",other:"viru(n) {0} Minutten"}}},second:{displayName:"Sekonn",relative:{0:"now"},relativeTime:{future:{one:"an {0} Sekonn",other:"a(n) {0} Sekonnen"},past:{one:"virun {0} Sekonn",other:"viru(n) {0} Sekonnen"}}}}},{locale:"lg",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Mwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mwezi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Lunaku",relative:{0:"Lwaleero",1:"Nkya","-1":"Ggulo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Saawa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Dakiika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Kasikonda",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"lkt",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Ómakȟa",relative:{0:"Lé ómakȟa kiŋ",1:"Tȟokáta ómakȟa kiŋháŋ","-1":"Ómakȟa kʼuŋ héhaŋ"},relativeTime:{future:{other:"Letáŋhaŋ ómakȟa {0} kiŋháŋ"},past:{other:"Hékta ómakȟa {0} kʼuŋ héhaŋ"}}},month:{displayName:"Wí",relative:{0:"Lé wí kiŋ",1:"Tȟokáta wí kiŋháŋ","-1":"Wí kʼuŋ héhaŋ"},relativeTime:{future:{other:"Letáŋhaŋ wíyawapi {0} kiŋháŋ"},past:{other:"Hékta wíyawapi {0} kʼuŋ héhaŋ"}}},day:{displayName:"Aŋpétu",relative:{0:"Lé aŋpétu kiŋ",1:"Híŋhaŋni kiŋháŋ","-1":"Ȟtálehaŋ"},relativeTime:{future:{other:"Letáŋhaŋ {0}-čháŋ kiŋháŋ"},past:{other:"Hékta {0}-čháŋ k’uŋ héhaŋ"}}},hour:{displayName:"Owápȟe",relative:{0:"this hour"},relativeTime:{future:{other:"Letáŋhaŋ owápȟe {0} kiŋháŋ"},past:{other:"Hékta owápȟe {0} kʼuŋ héhaŋ"}}},minute:{displayName:"Owápȟe oȟʼáŋkȟo",relative:{0:"this minute"},relativeTime:{future:{other:"Letáŋhaŋ oȟ’áŋkȟo {0} kiŋháŋ"},past:{other:"Hékta oȟ’áŋkȟo {0} k’uŋ héhaŋ"}}},second:{displayName:"Okpí",relative:{0:"now"},relativeTime:{future:{other:"Letáŋhaŋ okpí {0} kiŋháŋ"},past:{other:"Hékta okpí {0} k’uŋ héhaŋ"}}}}},{locale:"ln",pluralRuleFunction:function(e,t){return t?"other":0==e||1==e?"one":"other"},fields:{year:{displayName:"Mobú",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Sánzá",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Mokɔlɔ",relative:{0:"Lɛlɔ́",1:"Lóbi ekoyâ","-1":"Lóbi elékí"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Ngonga",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Monúti",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sɛkɔ́ndɛ",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ln-AO",parentLocale:"ln"},{locale:"ln-CF",parentLocale:"ln"},{locale:"ln-CG",parentLocale:"ln"},{locale:"lo",pluralRuleFunction:function(e,t){return t&&1==e?"one":"other"},fields:{year:{displayName:"ປີ",relative:{0:"ປີນີ້",1:"ປີໜ້າ","-1":"ປີກາຍ"},relativeTime:{future:{other:"ໃນອີກ {0} ປີ"},past:{other:"{0} ປີກ່ອນ"}}},month:{displayName:"ເດືອນ",relative:{0:"ເດືອນນີ້",1:"ເດືອນໜ້າ","-1":"ເດືອນແລ້ວ"},relativeTime:{future:{other:"ໃນອີກ {0} ເດືອນ"},past:{other:"{0} ເດືອນກ່ອນ"}}},day:{displayName:"ມື້",relative:{0:"ມື້ນີ້",1:"ມື້ອື່ນ",2:"ມື້ຮື","-2":"ມື້ກ່ອນ","-1":"ມື້ວານ"},relativeTime:{future:{other:"ໃນອີກ {0} ມື້"},past:{other:"{0} ມື້ກ່ອນ"}}},hour:{displayName:"ຊົ່ວໂມງ",relative:{0:"ຊົ່ວໂມງນີ້"},relativeTime:{future:{other:"ໃນອີກ {0} ຊົ່ວໂມງ"},past:{other:"{0} ຊົ່ວໂມງກ່ອນ"}}},minute:{displayName:"ນາທີ",relative:{0:"ນາທີນີ້"},relativeTime:{future:{other:"{0} ໃນອີກ 0 ນາທີ"},past:{other:"{0} ນາທີກ່ອນ"}}},second:{displayName:"ວິນາທີ",relative:{0:"ຕອນນີ້"},relativeTime:{future:{other:"ໃນອີກ {0} ວິນາທີ"},past:{other:"{0} ວິນາທີກ່ອນ"}}}}},{locale:"lrc",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"سال",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"ما",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"روٙز",relative:{0:"أمروٙ",1:"شوٙصوٙ","-1":"دیروٙز"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"ساأت",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"دئیقە",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"ثانیە",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"lrc-IQ",parentLocale:"lrc"},{locale:"lt",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[1]||"",i=Number(a[0])==e,o=i&&a[0].slice(-1),n=i&&a[0].slice(-2);return t?"other":1==o&&(n<11||n>19)?"one":o>=2&&o<=9&&(n<11||n>19)?"few":0!=r?"many":"other"},fields:{year:{displayName:"metai",relative:{0:"šiais metais",1:"kitais metais","-1":"praėjusiais metais"},relativeTime:{future:{one:"po {0} metų",few:"po {0} metų",many:"po {0} metų",other:"po {0} metų"},past:{one:"prieš {0} metus",few:"prieš {0} metus",many:"prieš {0} metų",other:"prieš {0} metų"}}},month:{displayName:"mėnuo",relative:{0:"šį mėnesį",1:"kitą mėnesį","-1":"praėjusį mėnesį"},relativeTime:{future:{one:"po {0} mėnesio",few:"po {0} mėnesių",many:"po {0} mėnesio",other:"po {0} mėnesių"},past:{one:"prieš {0} mėnesį",few:"prieš {0} mėnesius",many:"prieš {0} mėnesio",other:"prieš {0} mėnesių"}}},day:{displayName:"diena",relative:{0:"šiandien",1:"rytoj",2:"poryt","-2":"užvakar","-1":"vakar"},relativeTime:{future:{one:"po {0} dienos",few:"po {0} dienų",many:"po {0} dienos",other:"po {0} dienų"},past:{one:"prieš {0} dieną",few:"prieš {0} dienas",many:"prieš {0} dienos",other:"prieš {0} dienų"}}},hour:{displayName:"valanda",relative:{0:"šią valandą"},relativeTime:{future:{one:"po {0} valandos",few:"po {0} valandų",many:"po {0} valandos",other:"po {0} valandų"},past:{one:"prieš {0} valandą",few:"prieš {0} valandas",many:"prieš {0} valandos",other:"prieš {0} valandų"}}},minute:{displayName:"minutė",relative:{0:"šią minutę"},relativeTime:{future:{one:"po {0} minutės",few:"po {0} minučių",many:"po {0} minutės",other:"po {0} minučių"},past:{one:"prieš {0} minutę",few:"prieš {0} minutes",many:"prieš {0} minutės",other:"prieš {0} minučių"}}},second:{displayName:"sekundė",relative:{0:"dabar"},relativeTime:{future:{one:"po {0} sekundės",few:"po {0} sekundžių",many:"po {0} sekundės",other:"po {0} sekundžių"},past:{one:"prieš {0} sekundę",few:"prieš {0} sekundes",many:"prieš {0} sekundės",other:"prieš {0} sekundžių"}}}}},{locale:"lu",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Tshidimu",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Ngondo",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Dituku",relative:{0:"Lelu",1:"Malaba","-1":"Makelela"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Diba",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Kasunsu",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Kasunsukusu",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"luo",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"higa",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"dwe",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"chieng’",relative:{0:"kawuono",1:"kiny","-1":"nyoro"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"saa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"dakika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"nyiriri mar saa",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"luy",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Muhiga",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mweri",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ridiku",relative:{0:"Lero",1:"Mgamba","-1":"Mgorova"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Isaa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Idagika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"lv",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[1]||"",i=r.length,o=Number(a[0])==e,n=o&&a[0].slice(-1),l=o&&a[0].slice(-2),u=r.slice(-2),s=r.slice(-1);return t?"other":o&&0==n||l>=11&&l<=19||2==i&&u>=11&&u<=19?"zero":1==n&&11!=l||2==i&&1==s&&11!=u||2!=i&&1==s?"one":"other"},fields:{year:{displayName:"gads",relative:{0:"šajā gadā",1:"nākamajā gadā","-1":"pagājušajā gadā"},relativeTime:{future:{zero:"pēc {0} gadiem",one:"pēc {0} gada",other:"pēc {0} gadiem"},past:{zero:"pirms {0} gadiem",one:"pirms {0} gada",other:"pirms {0} gadiem"}}},month:{displayName:"mēnesis",relative:{0:"šajā mēnesī",1:"nākamajā mēnesī","-1":"pagājušajā mēnesī"},relativeTime:{future:{zero:"pēc {0} mēnešiem",one:"pēc {0} mēneša",other:"pēc {0} mēnešiem"},past:{zero:"pirms {0} mēnešiem",one:"pirms {0} mēneša",other:"pirms {0} mēnešiem"}}},day:{displayName:"diena",relative:{0:"šodien",1:"rīt",2:"parīt","-2":"aizvakar","-1":"vakar"},relativeTime:{future:{zero:"pēc {0} dienām",one:"pēc {0} dienas",other:"pēc {0} dienām"},past:{zero:"pirms {0} dienām",one:"pirms {0} dienas",other:"pirms {0} dienām"}}},hour:{displayName:"stundas",relative:{0:"šajā stundā"},relativeTime:{future:{zero:"pēc {0} stundām",one:"pēc {0} stundas",other:"pēc {0} stundām"},past:{zero:"pirms {0} stundām",one:"pirms {0} stundas",other:"pirms {0} stundām"}}},minute:{displayName:"minūtes",relative:{0:"šajā minūtē"},relativeTime:{future:{zero:"pēc {0} minūtēm",one:"pēc {0} minūtes",other:"pēc {0} minūtēm"},past:{zero:"pirms {0} minūtēm",one:"pirms {0} minūtes",other:"pirms {0} minūtēm"}}},second:{displayName:"sekundes",relative:{0:"tagad"},relativeTime:{future:{zero:"pēc {0} sekundēm",one:"pēc {0} sekundes",other:"pēc {0} sekundēm"},past:{zero:"pirms {0} sekundēm",one:"pirms {0} sekundes",other:"pirms {0} sekundēm"}}}}},{locale:"mas",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Ɔlárì",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Ɔlápà",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ɛnkɔlɔ́ŋ",relative:{0:"Táatá",1:"Tááisérè","-1":"Ŋolé"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Ɛ́sáâ",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Oldákikaè",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"mas-TZ",parentLocale:"mas"},{locale:"mer",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Mwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mweri",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ntukũ",relative:{0:"Narua",1:"Rũjũ","-1":"Ĩgoro"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Ĩthaa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Ndagika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekondi",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"mfe",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Lane",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mwa",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Zour",relative:{0:"Zordi",1:"Demin","-1":"Yer"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Ler",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minit",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Segonn",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"mg",pluralRuleFunction:function(e,t){return t?"other":0==e||1==e?"one":"other"},fields:{year:{displayName:"Taona",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Volana",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Andro",relative:{0:"Anio",1:"Rahampitso","-1":"Omaly"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Ora",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minitra",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Segondra",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"mgh",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"yaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"mweri",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"nihuku",relative:{0:"lel’lo",1:"me’llo","-1":"n’chana"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"isaa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"idakika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"isekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"mgo",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"fituʼ",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"iməg",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"+{0} m",other:"+{0} m"},past:{one:"-{0} m",other:"-{0} m"}}},day:{displayName:"anəg",relative:{0:"tèchɔ̀ŋ",1:"isu",2:"isu ywi","-1":"ikwiri"},relativeTime:{future:{one:"+{0} d",other:"+{0} d"},past:{one:"-{0} d",other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{one:"+{0} h",other:"+{0} h"},past:{one:"-{0} h",other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{one:"+{0} min",other:"+{0} min"},past:{one:"-{0} min",other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{one:"+{0} s",other:"+{0} s"},past:{one:"-{0} s",other:"-{0} s"}}}}},{locale:"mk",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=a[1]||"",o=!a[1],n=r.slice(-1),l=r.slice(-2),u=i.slice(-1);return t?1==n&&11!=l?"one":2==n&&12!=l?"two":7!=n&&8!=n||17==l||18==l?"other":"many":o&&1==n||1==u?"one":"other"},fields:{year:{displayName:"година",relative:{0:"оваа година",1:"следната година","-1":"минатата година"},relativeTime:{future:{one:"за {0} година",other:"за {0} години"},past:{one:"пред {0} година",other:"пред {0} години"}}},month:{displayName:"месец",relative:{0:"овој месец",1:"следниот месец","-1":"минатиот месец"},relativeTime:{future:{one:"за {0} месец",other:"за {0} месеци"},past:{one:"пред {0} месец",other:"пред {0} месеци"}}},day:{displayName:"ден",relative:{0:"денес",1:"утре",2:"задутре","-2":"завчера","-1":"вчера"},relativeTime:{future:{one:"за {0} ден",other:"за {0} дена"},past:{one:"пред {0} ден",other:"пред {0} дена"}}},hour:{displayName:"час",relative:{0:"часов"},relativeTime:{future:{one:"за {0} час",other:"за {0} часа"},past:{one:"пред {0} час",other:"пред {0} часа"}}},minute:{displayName:"минута",relative:{0:"оваа минута"},relativeTime:{future:{one:"за {0} минута",other:"за {0} минути"},past:{one:"пред {0} минута",other:"пред {0} минути"}}},second:{displayName:"секунда",relative:{0:"сега"},relativeTime:{future:{one:"за {0} секунда",other:"за {0} секунди"},past:{one:"пред {0} секунда",other:"пред {0} секунди"}}}}},{locale:"ml",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"വർഷം",relative:{0:"ഈ വർ‌ഷം",1:"അടുത്തവർഷം","-1":"കഴിഞ്ഞ വർഷം"},relativeTime:{future:{one:"{0} വർഷത്തിൽ",other:"{0} വർഷത്തിൽ"},past:{one:"{0} വർഷം മുമ്പ്",other:"{0} വർഷം മുമ്പ്"}}},month:{displayName:"മാസം",relative:{0:"ഈ മാസം",1:"അടുത്ത മാസം","-1":"കഴിഞ്ഞ മാസം"},relativeTime:{future:{one:"{0} മാസത്തിൽ",other:"{0} മാസത്തിൽ"},past:{one:"{0} മാസം മുമ്പ്",other:"{0} മാസം മുമ്പ്"}}},day:{displayName:"ദിവസം",relative:{0:"ഇന്ന്",1:"നാളെ",2:"മറ്റന്നാൾ","-2":"മിനിഞ്ഞാന്ന്","-1":"ഇന്നലെ"},relativeTime:{future:{one:"{0} ദിവസത്തിൽ",other:"{0} ദിവസത്തിൽ"},past:{one:"{0} ദിവസം മുമ്പ്",other:"{0} ദിവസം മുമ്പ്"}}},hour:{displayName:"മണിക്കൂർ",relative:{0:"ഈ മണിക്കൂറിൽ"},relativeTime:{future:{one:"{0} മണിക്കൂറിൽ",other:"{0} മണിക്കൂറിൽ"},past:{one:"{0} മണിക്കൂർ മുമ്പ്",other:"{0} മണിക്കൂർ മുമ്പ്"}}},minute:{displayName:"മിനിറ്റ്",relative:{0:"ഈ മിനിറ്റിൽ"},relativeTime:{future:{one:"{0} മിനിറ്റിൽ",other:"{0} മിനിറ്റിൽ"},past:{one:"{0} മിനിറ്റ് മുമ്പ്",other:"{0} മിനിറ്റ് മുമ്പ്"}}},second:{displayName:"സെക്കൻഡ്",relative:{0:"ഇപ്പോൾ"},relativeTime:{future:{one:"{0} സെക്കൻഡിൽ",other:"{0} സെക്കൻഡിൽ"},past:{one:"{0} സെക്കൻഡ് മുമ്പ്",other:"{0} സെക്കൻഡ് മുമ്പ്"}}}}},{locale:"mn",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"жил",relative:{0:"энэ жил",1:"ирэх жил","-1":"өнгөрсөн жил"},relativeTime:{future:{one:"{0} жилийн дараа",other:"{0} жилийн дараа"},past:{one:"{0} жилийн өмнө",other:"{0} жилийн өмнө"}}},month:{displayName:"сар",relative:{0:"энэ сар",1:"ирэх сар","-1":"өнгөрсөн сар"},relativeTime:{future:{one:"{0} сарын дараа",other:"{0} сарын дараа"},past:{one:"{0} сарын өмнө",other:"{0} сарын өмнө"}}},day:{displayName:"өдөр",relative:{0:"өнөөдөр",1:"маргааш",2:"нөгөөдөр","-2":"уржигдар","-1":"өчигдөр"},relativeTime:{future:{one:"{0} өдрийн дараа",other:"{0} өдрийн дараа"},past:{one:"{0} өдрийн өмнө",other:"{0} өдрийн өмнө"}}},hour:{displayName:"цаг",relative:{0:"энэ цаг"},relativeTime:{future:{one:"{0} цагийн дараа",other:"{0} цагийн дараа"},past:{one:"{0} цагийн өмнө",other:"{0} цагийн өмнө"}}},minute:{displayName:"минут",relative:{0:"энэ минут"},relativeTime:{future:{one:"{0} минутын дараа",other:"{0} минутын дараа"},past:{one:"{0} минутын өмнө",other:"{0} минутын өмнө"}}},second:{displayName:"секунд",relative:{0:"одоо"},relativeTime:{future:{one:"{0} секундын дараа",other:"{0} секундын дараа"},past:{one:"{0} секундын өмнө",other:"{0} секундын өмнө"}}}}},{locale:"mn-Mong",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"mo",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=!a[1],i=Number(a[0])==e&&a[0].slice(-2);return t?1==e?"one":"other":1==e&&r?"one":!r||0==e||1!=e&&i>=1&&i<=19?"few":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"mr",pluralRuleFunction:function(e,t){return t?1==e?"one":2==e||3==e?"two":4==e?"few":"other":e>=0&&e<=1?"one":"other"},fields:{year:{displayName:"वर्ष",relative:{0:"हे वर्ष",1:"पुढील वर्ष","-1":"मागील वर्ष"},relativeTime:{future:{one:"{0} वर्षामध्ये",other:"{0} वर्षांमध्ये"},past:{one:"{0} वर्षापूर्वी",other:"{0} वर्षांपूर्वी"}}},month:{displayName:"महिना",relative:{0:"हा महिना",1:"पुढील महिना","-1":"मागील महिना"},relativeTime:{future:{one:"{0} महिन्यामध्ये",other:"{0} महिन्यांमध्ये"},past:{one:"{0} महिन्यापूर्वी",other:"{0} महिन्यांपूर्वी"}}},day:{displayName:"दिवस",relative:{0:"आज",1:"उद्या","-1":"काल"},relativeTime:{future:{one:"{0} दिवसामध्ये",other:"{0} दिवसांमध्ये"},past:{one:"{0} दिवसापूर्वी",other:"{0} दिवसांपूर्वी"}}},hour:{displayName:"तास",relative:{0:"तासात"},relativeTime:{future:{one:"{0} तासामध्ये",other:"{0} तासांमध्ये"},past:{one:"{0} तासापूर्वी",other:"{0} तासांपूर्वी"}}},minute:{displayName:"मिनिट",relative:{0:"या मिनिटात"},relativeTime:{future:{one:"{0} मिनिटामध्ये",other:"{0} मिनिटांमध्ये"},past:{one:"{0} मिनिटापूर्वी",other:"{0} मिनिटांपूर्वी"}}},second:{displayName:"सेकंद",relative:{0:"आत्ता"},relativeTime:{future:{one:"{0} सेकंदामध्ये",other:"{0} सेकंदांमध्ये"},past:{one:"{0} सेकंदापूर्वी",other:"{0} सेकंदांपूर्वी"}}}}},{locale:"ms",pluralRuleFunction:function(e,t){return t&&1==e?"one":"other"},fields:{year:{displayName:"Tahun",relative:{0:"tahun ini",1:"tahun depan","-1":"tahun lalu"},relativeTime:{future:{other:"dalam {0} saat"},past:{other:"{0} tahun lalu"}}},month:{displayName:"Bulan",relative:{0:"bulan ini",1:"bulan depan","-1":"bulan lalu"},relativeTime:{future:{other:"dalam {0} bulan"},past:{other:"{0} bulan lalu"}}},day:{displayName:"Hari",relative:{0:"hari ini",1:"esok",2:"lusa","-2":"kelmarin","-1":"semalam"},relativeTime:{future:{other:"dalam {0} hari"},past:{other:"{0} hari lalu"}}},hour:{displayName:"Jam",relative:{0:"jam ini"},relativeTime:{future:{other:"dalam {0} jam"},past:{other:"{0} jam lalu"}}},minute:{displayName:"Minit",relative:{0:"pada minit ini"},relativeTime:{future:{other:"dalam {0} minit"},past:{other:"{0} minit lalu"}}},second:{displayName:"Saat",relative:{0:"sekarang"},relativeTime:{future:{other:"dalam {0} saat"},past:{other:"{0} saat lalu"}}}}},{locale:"ms-Arab",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ms-BN",parentLocale:"ms"},{locale:"ms-SG",parentLocale:"ms"},{locale:"mt",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=Number(a[0])==e&&a[0].slice(-2);return t?"other":1==e?"one":0==e||r>=2&&r<=10?"few":r>=11&&r<=19?"many":"other"},fields:{year:{displayName:"Sena",relative:{0:"din is-sena",1:"Is-sena d-dieħla","-1":"Is-sena li għaddiet"},relativeTime:{future:{other:"+{0} y"},past:{one:"{0} sena ilu",few:"{0} snin ilu",many:"{0} snin ilu",other:"{0} snin ilu"}}},month:{displayName:"Xahar",relative:{0:"Dan ix-xahar",1:"Ix-xahar id-dieħel","-1":"Ix-xahar li għadda"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Jum",relative:{0:"Illum",1:"Għada","-1":"Ilbieraħ"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Siegħa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minuta",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekonda",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"mua",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Syii",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Fĩi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Zah’nane/ Comme",relative:{0:"Tǝ’nahko",1:"Tǝ’nane","-1":"Tǝsoo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Cok comme",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Cok comme ma laŋne",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Cok comme ma laŋ tǝ biŋ",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"my",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"နှစ်",relative:{0:"ယခုနှစ်",1:"လာမည့်နှစ်","-1":"ယမန်နှစ်"},relativeTime:{future:{other:"{0} နှစ်အတွင်း"},past:{other:"ပြီးခဲ့သည့် {0} နှစ်"}}},month:{displayName:"လ",relative:{0:"ယခုလ",1:"လာမည့်လ","-1":"ပြီးခဲ့သည့်လ"},relativeTime:{future:{other:"{0} လအတွင်း"},past:{other:"ပြီးခဲ့သည့် {0} လ"}}},day:{displayName:"ရက်",relative:{0:"ယနေ့",1:"မနက်ဖြန်",2:"သန်ဘက်ခါ","-2":"တစ်နေ့က","-1":"မနေ့က"},relativeTime:{future:{other:"{0} ရက်အတွင်း"},past:{other:"ပြီးခဲ့သည့် {0} ရက်"}}},hour:{displayName:"နာရီ",relative:{0:"ဤအချိန်"},relativeTime:{future:{other:"{0} နာရီအတွင်း"},past:{other:"ပြီးခဲ့သည့် {0} နာရီ"}}},minute:{displayName:"မိနစ်",relative:{0:"ဤမိနစ်"},relativeTime:{future:{other:"{0} မိနစ်အတွင်း"},past:{other:"ပြီးခဲ့သည့် {0} မိနစ်"}}},second:{displayName:"စက္ကန့်",relative:{0:"ယခု"},relativeTime:{future:{other:"{0} စက္ကန့်အတွင်း"},past:{other:"ပြီးခဲ့သည့် {0} စက္ကန့်"}}}}},{locale:"mzn",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"سال",relative:{0:"امسال",1:"سال دیگه","-1":"پارسال"},relativeTime:{future:{other:"{0} سال دله"},past:{other:"{0} سال پیش"}}},month:{displayName:"ماه",relative:{0:"این ماه",1:"ماه ِبعد","-1":"ماه قبل"},relativeTime:{future:{other:"{0} ماه دله"},past:{other:"{0} ماه پیش"}}},day:{displayName:"روز",relative:{0:"اَمروز",1:"فِردا","-1":"دیروز"},relativeTime:{future:{other:"{0} روز دله"},past:{other:"{0} روز پیش"}}},hour:{displayName:"ساعِت",relative:{0:"this hour"},relativeTime:{future:{other:"{0} ساعِت دله"},past:{other:"{0} ساعِت پیش"}}},minute:{displayName:"دقیقه",relative:{0:"this minute"},relativeTime:{future:{other:"{0} دقیقه دله"},past:{other:"{0} دَقه پیش"}}},second:{displayName:"ثانیه",relative:{0:"now"},relativeTime:{future:{other:"{0} ثانیه دله"},past:{other:"{0} ثانیه پیش"}}}}},{locale:"nah",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"naq",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":2==e?"two":"other"},fields:{year:{displayName:"Kurib",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"ǁKhâb",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Tsees",relative:{0:"Neetsee",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Iiri",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Haib",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"ǀGâub",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"nb",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"år",relative:{0:"i år",1:"neste år","-1":"i fjor"},relativeTime:{future:{one:"om {0} år",other:"om {0} år"},past:{one:"for {0} år siden",other:"for {0} år siden"}}},month:{displayName:"måned",relative:{0:"denne måneden",1:"neste måned","-1":"forrige måned"},relativeTime:{future:{one:"om {0} måned",other:"om {0} måneder"},past:{one:"for {0} måned siden",other:"for {0} måneder siden"}}},day:{displayName:"dag",relative:{0:"i dag",1:"i morgen",2:"i overmorgen","-2":"i forgårs","-1":"i går"},relativeTime:{future:{one:"om {0} døgn",other:"om {0} døgn"},past:{one:"for {0} døgn siden",other:"for {0} døgn siden"}}},hour:{displayName:"time",relative:{0:"denne timen"},relativeTime:{future:{one:"om {0} time",other:"om {0} timer"},past:{one:"for {0} time siden",other:"for {0} timer siden"}}},minute:{displayName:"minutt",relative:{0:"dette minuttet"},relativeTime:{future:{one:"om {0} minutt",other:"om {0} minutter"},past:{one:"for {0} minutt siden",other:"for {0} minutter siden"}}},second:{displayName:"sekund",relative:{0:"nå"},relativeTime:{future:{one:"om {0} sekund",other:"om {0} sekunder"},past:{one:"for {0} sekund siden",other:"for {0} sekunder siden"}}}}},{locale:"nb-SJ",parentLocale:"nb"},{locale:"nd",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Umnyaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Inyangacale",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ilanga",relative:{0:"Lamuhla",1:"Kusasa","-1":"Izolo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Ihola",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Umuzuzu",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Isekendi",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"nds",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"nds-NL",parentLocale:"nds"},{locale:"ne",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=Number(a[0])==e;return t?r&&e>=1&&e<=4?"one":"other":1==e?"one":"other"},fields:{year:{displayName:"वर्ष",relative:{0:"यो वर्ष",1:"अर्को वर्ष","-1":"गत वर्ष"},relativeTime:{future:{one:"{0} वर्षमा",other:"{0} वर्षमा"},past:{one:"{0} वर्ष अघि",other:"{0} वर्ष अघि"}}},month:{displayName:"महिना",relative:{0:"यो महिना",1:"अर्को महिना","-1":"गत महिना"},relativeTime:{future:{one:"{0} महिनामा",other:"{0} महिनामा"},past:{one:"{0} महिना पहिले",other:"{0} महिना पहिले"}}},day:{displayName:"बार",relative:{0:"आज",1:"भोलि",2:"पर्सि","-2":"अस्ति","-1":"हिजो"},relativeTime:{future:{one:"{0} दिनमा",other:"{0} दिनमा"},past:{one:"{0} दिन पहिले",other:"{0} दिन पहिले"}}},hour:{displayName:"घण्टा",relative:{0:"यो घडीमा"},relativeTime:{future:{one:"{0} घण्टामा",other:"{0} घण्टामा"},past:{one:"{0} घण्टा पहिले",other:"{0} घण्टा पहिले"}}},minute:{displayName:"मिनेट",relative:{0:"यही मिनेटमा"},relativeTime:{future:{one:"{0} मिनेटमा",other:"{0} मिनेटमा"},past:{one:"{0} मिनेट पहिले",other:"{0} मिनेट पहिले"}}},second:{displayName:"सेकेन्ड",relative:{0:"अब"},relativeTime:{future:{one:"{0} सेकेण्डमा",other:"{0} सेकेण्डमा"},past:{one:"{0} सेकेण्ड पहिले",other:"{0} सेकेण्ड पहिले"}}}}},{locale:"ne-IN",parentLocale:"ne"},{locale:"nl",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?"other":1==e&&a?"one":"other"},fields:{year:{displayName:"jaar",relative:{0:"dit jaar",1:"volgend jaar","-1":"vorig jaar"},relativeTime:{future:{one:"over {0} jaar",other:"over {0} jaar"},past:{one:"{0} jaar geleden",other:"{0} jaar geleden"}}},month:{displayName:"maand",relative:{0:"deze maand",1:"volgende maand","-1":"vorige maand"},relativeTime:{future:{one:"over {0} maand",other:"over {0} maanden"},past:{one:"{0} maand geleden",other:"{0} maanden geleden"}}},day:{displayName:"dag",relative:{0:"vandaag",1:"morgen",2:"overmorgen","-2":"eergisteren","-1":"gisteren"},relativeTime:{future:{one:"over {0} dag",other:"over {0} dagen"},past:{one:"{0} dag geleden",other:"{0} dagen geleden"}}},hour:{displayName:"uur",relative:{0:"binnen een uur"},relativeTime:{future:{one:"over {0} uur",other:"over {0} uur"},past:{one:"{0} uur geleden",other:"{0} uur geleden"}}},minute:{displayName:"minuut",relative:{0:"binnen een minuut"},relativeTime:{future:{one:"over {0} minuut",other:"over {0} minuten"},past:{one:"{0} minuut geleden",other:"{0} minuten geleden"}}},second:{displayName:"seconde",relative:{0:"nu"},relativeTime:{future:{one:"over {0} seconde",other:"over {0} seconden"},past:{one:"{0} seconde geleden",other:"{0} seconden geleden"}}}}},{locale:"nl-AW",parentLocale:"nl"},{locale:"nl-BE",parentLocale:"nl"},{locale:"nl-BQ",parentLocale:"nl"},{locale:"nl-CW",parentLocale:"nl"},{locale:"nl-SR",parentLocale:"nl"},{locale:"nl-SX",parentLocale:"nl"},{locale:"nmg",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Mbvu",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Ngwɛn",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Duö",relative:{0:"Dɔl",1:"Namáná","-1":"Nakugú"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Wulā",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Mpálâ",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Nyiɛl",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"nn",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"år",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"om {0} år",other:"om {0} år"},past:{one:"for {0} år siden",other:"for {0} år siden"}}},month:{displayName:"månad",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"om {0} måned",other:"om {0} måneder"},past:{one:"for {0} måned siden",other:"for {0} måneder siden"}}},day:{displayName:"dag",relative:{0:"i dag",1:"i morgon",2:"i overmorgon","-2":"i forgårs","-1":"i går"},relativeTime:{future:{one:"om {0} døgn",other:"om {0} døgn"},past:{one:"for {0} døgn siden",other:"for {0} døgn siden"}}},hour:{displayName:"time",relative:{0:"this hour"},relativeTime:{future:{one:"om {0} time",other:"om {0} timer"},past:{one:"for {0} time siden",other:"for {0} timer siden"}}},minute:{displayName:"minutt",relative:{0:"this minute"},relativeTime:{future:{one:"om {0} minutt",other:"om {0} minutter"},past:{one:"for {0} minutt siden",other:"for {0} minutter siden"}}},second:{displayName:"sekund",relative:{0:"now"},relativeTime:{future:{one:"om {0} sekund",other:"om {0} sekunder"},past:{one:"for {0} sekund siden",other:"for {0} sekunder siden"}}}}},{locale:"nnh",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"ngùʼ",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"lyɛ̌ʼ",relative:{0:"lyɛ̌ʼɔɔn",1:"jǔɔ gẅie à ne ntóo","-1":"jǔɔ gẅie à ka tɔ̌g"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"fʉ̀ʼ nèm",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"no",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"nqo",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"nr",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"nso",pluralRuleFunction:function(e,t){return t?"other":0==e||1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"nus",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Ruɔ̱n",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Pay",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Cäŋ",relative:{0:"Walɛ",1:"Ruun","-1":"Pan"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Thaak",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minit",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Thɛkɛni",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ny",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"nyn",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Omwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Omwezi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Eizooba",relative:{0:"Erizooba",1:"Nyenkyakare","-1":"Nyomwabazyo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Shaaha",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Edakiika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Obucweka/Esekendi",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"om",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"om-KE",parentLocale:"om"},{locale:"or",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"os",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Аз",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Мӕй",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Бон",relative:{0:"Абон",1:"Сом",2:"Иннӕбон","-2":"Ӕндӕрӕбон","-1":"Знон"},relativeTime:{future:{one:"{0} боны фӕстӕ",other:"{0} боны фӕстӕ"},past:{one:"{0} бон раздӕр",other:"{0} боны размӕ"}}},hour:{displayName:"Сахат",relative:{0:"this hour"},relativeTime:{future:{one:"{0} сахаты фӕстӕ",other:"{0} сахаты фӕстӕ"},past:{one:"{0} сахаты размӕ",other:"{0} сахаты размӕ"}}},minute:{displayName:"Минут",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Секунд",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"os-RU",parentLocale:"os"},{locale:"pa",pluralRuleFunction:function(e,t){return t?"other":0==e||1==e?"one":"other"},fields:{year:{displayName:"ਸਾਲ",relative:{0:"ਇਹ ਸਾਲ",1:"ਅਗਲਾ ਸਾਲ","-1":"ਪਿਛਲਾ ਸਾਲ"},relativeTime:{future:{one:"{0} ਸਾਲ ਵਿੱਚ",other:"{0} ਸਾਲਾਂ ਵਿੱਚ"},past:{one:"{0} ਸਾਲ ਪਹਿਲਾਂ",other:"{0} ਸਾਲ ਪਹਿਲਾਂ"}}},month:{displayName:"ਮਹੀਨਾ",relative:{0:"ਇਹ ਮਹੀਨਾ",1:"ਅਗਲਾ ਮਹੀਨਾ","-1":"ਪਿਛਲਾ ਮਹੀਨਾ"},relativeTime:{future:{one:"{0} ਮਹੀਨੇ ਵਿੱਚ",other:"{0} ਮਹੀਨਿਆਂ ਵਿੱਚ"},past:{one:"{0} ਮਹੀਨਾ ਪਹਿਲਾਂ",other:"{0} ਮਹੀਨੇ ਪਹਿਲਾਂ"}}},day:{displayName:"ਦਿਨ",relative:{0:"ਅੱਜ",1:"ਭਲਕੇ","-1":"ਬੀਤਿਆ ਕੱਲ੍ਹ"},relativeTime:{future:{one:"{0} ਦਿਨ ਵਿੱਚ",other:"{0} ਦਿਨਾਂ ਵਿੱਚ"},past:{one:"{0} ਦਿਨ ਪਹਿਲਾਂ",other:"{0} ਦਿਨ ਪਹਿਲਾਂ"}}},hour:{displayName:"ਘੰਟਾ",relative:{0:"ਇਸ ਘੰਟੇ"},relativeTime:{future:{one:"{0} ਘੰਟੇ ਵਿੱਚ",other:"{0} ਘੰਟਿਆਂ ਵਿੱਚ"},past:{one:"{0} ਘੰਟਾ ਪਹਿਲਾਂ",other:"{0} ਘੰਟੇ ਪਹਿਲਾਂ"}}},minute:{displayName:"ਮਿੰਟ",relative:{0:"ਇਸ ਮਿੰਟ"},relativeTime:{future:{one:"{0} ਮਿੰਟ ਵਿੱਚ",other:"{0} ਮਿੰਟਾਂ ਵਿੱਚ"},past:{one:"{0} ਮਿੰਟ ਪਹਿਲਾਂ",other:"{0} ਮਿੰਟ ਪਹਿਲਾਂ"}}},second:{displayName:"ਸਕਿੰਟ",relative:{0:"ਹੁਣ"},relativeTime:{future:{one:"{0} ਸਕਿੰਟ ਵਿੱਚ",other:"{0} ਸਕਿੰਟਾਂ ਵਿੱਚ"},past:{one:"{0} ਸਕਿੰਟ ਪਹਿਲਾਂ",other:"{0} ਸਕਿੰਟ ਪਹਿਲਾਂ"}}}}},{locale:"pa-Arab",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"ورھا",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"مہينا",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"دئن",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"گھنٹا",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"منٹ",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"pa-Guru",parentLocale:"pa"},{locale:"pap",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"pl",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=!a[1],o=r.slice(-1),n=r.slice(-2);return t?"other":1==e&&i?"one":i&&o>=2&&o<=4&&(n<12||n>14)?"few":i&&1!=r&&(0==o||1==o)||i&&o>=5&&o<=9||i&&n>=12&&n<=14?"many":"other"},fields:{year:{displayName:"rok",relative:{0:"w tym roku",1:"w przyszłym roku","-1":"w zeszłym roku"},relativeTime:{future:{one:"za {0} rok",few:"za {0} lata",many:"za {0} lat",other:"za {0} roku"},past:{one:"{0} rok temu",few:"{0} lata temu",many:"{0} lat temu",other:"{0} roku temu"}}},month:{displayName:"miesiąc",relative:{0:"w tym miesiącu",1:"w przyszłym miesiącu","-1":"w zeszłym miesiącu"},relativeTime:{future:{one:"za {0} miesiąc",few:"za {0} miesiące",many:"za {0} miesięcy",other:"za {0} miesiąca"},past:{one:"{0} miesiąc temu",few:"{0} miesiące temu",many:"{0} miesięcy temu",other:"{0} miesiąca temu"}}},day:{displayName:"dzień",relative:{0:"dzisiaj",1:"jutro",2:"pojutrze","-2":"przedwczoraj","-1":"wczoraj"},relativeTime:{future:{one:"za {0} dzień",few:"za {0} dni",many:"za {0} dni",other:"za {0} dnia"},past:{one:"{0} dzień temu",few:"{0} dni temu",many:"{0} dni temu",other:"{0} dnia temu"}}},hour:{displayName:"godzina",relative:{0:"ta godzina"},relativeTime:{future:{one:"za {0} godzinę",few:"za {0} godziny",many:"za {0} godzin",other:"za {0} godziny"},past:{one:"{0} godzinę temu",few:"{0} godziny temu",many:"{0} godzin temu",other:"{0} godziny temu"}}},minute:{displayName:"minuta",relative:{0:"ta minuta"},relativeTime:{future:{one:"za {0} minutę",few:"za {0} minuty",many:"za {0} minut",other:"za {0} minuty"},past:{one:"{0} minutę temu",few:"{0} minuty temu",many:"{0} minut temu",other:"{0} minuty temu"}}},second:{displayName:"sekunda",relative:{0:"teraz"},relativeTime:{future:{one:"za {0} sekundę",few:"za {0} sekundy",many:"za {0} sekund",other:"za {0} sekundy"},past:{one:"{0} sekundę temu",few:"{0} sekundy temu",many:"{0} sekund temu",other:"{0} sekundy temu"}}}}},{locale:"prg",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[1]||"",i=r.length,o=Number(a[0])==e,n=o&&a[0].slice(-1),l=o&&a[0].slice(-2),u=r.slice(-2),s=r.slice(-1);return t?"other":o&&0==n||l>=11&&l<=19||2==i&&u>=11&&u<=19?"zero":1==n&&11!=l||2==i&&1==s&&11!=u||2!=i&&1==s?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ps",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"pt",pluralRuleFunction:function(e,t){var a=String(e).split(".")[0];return t?"other":0==a||1==a?"one":"other"},fields:{year:{displayName:"ano",relative:{0:"este ano",1:"próximo ano","-1":"ano passado"},relativeTime:{future:{one:"em {0} ano",other:"em {0} anos"},past:{one:"há {0} ano",other:"há {0} anos"}}},month:{displayName:"mês",relative:{0:"este mês",1:"próximo mês","-1":"mês passado"},relativeTime:{future:{one:"em {0} mês",other:"em {0} meses"},past:{one:"há {0} mês",other:"há {0} meses"}}},day:{displayName:"dia",relative:{0:"hoje",1:"amanhã",2:"depois de amanhã","-2":"anteontem","-1":"ontem"},relativeTime:{future:{one:"em {0} dia",other:"em {0} dias"},past:{one:"há {0} dia",other:"há {0} dias"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"em {0} hora",other:"em {0} horas"},past:{one:"há {0} hora",other:"há {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"em {0} minuto",other:"em {0} minutos"},past:{one:"há {0} minuto",other:"há {0} minutos"}}},second:{displayName:"segundo",relative:{0:"agora"},relativeTime:{future:{one:"em {0} segundo",other:"em {0} segundos"},past:{one:"há {0} segundo",other:"há {0} segundos"}}}}},{locale:"pt-AO",parentLocale:"pt-PT"},{locale:"pt-PT",parentLocale:"pt",fields:{year:{displayName:"ano",relative:{0:"este ano",1:"próximo ano","-1":"ano passado"},relativeTime:{future:{one:"dentro de {0} ano",other:"dentro de {0} anos"},past:{one:"há {0} ano",other:"há {0} anos"}}},month:{displayName:"mês",relative:{0:"este mês",1:"próximo mês","-1":"mês passado"},relativeTime:{future:{one:"dentro de {0} mês",other:"dentro de {0} meses"},past:{one:"há {0} mês",other:"há {0} meses"}}},day:{displayName:"dia",relative:{0:"hoje",1:"amanhã",2:"depois de amanhã","-2":"anteontem","-1":"ontem"},relativeTime:{future:{one:"dentro de {0} dia",other:"dentro de {0} dias"},past:{one:"há {0} dia",other:"há {0} dias"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"há {0} hora",other:"há {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"há {0} minuto",other:"há {0} minutos"}}},second:{displayName:"segundo",relative:{0:"agora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"há {0} segundo",other:"há {0} segundos"}}}}},{locale:"pt-CH",parentLocale:"pt-PT"},{locale:"pt-CV",parentLocale:"pt-PT"},{locale:"pt-GQ",parentLocale:"pt-PT"},{locale:"pt-GW",parentLocale:"pt-PT"},{locale:"pt-LU",parentLocale:"pt-PT"},{locale:"pt-MO",parentLocale:"pt-PT"},{locale:"pt-MZ",parentLocale:"pt-PT"},{locale:"pt-ST",parentLocale:"pt-PT"},{locale:"pt-TL",parentLocale:"pt-PT"},{locale:"qu",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"qu-BO",parentLocale:"qu"},{locale:"qu-EC",parentLocale:"qu"},{locale:"rm",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"onn",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"mais",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Tag",relative:{0:"oz",1:"damaun",2:"puschmaun","-2":"stersas","-1":"ier"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"ura",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"minuta",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"secunda",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"rn",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Umwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Ukwezi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Umusi",relative:{0:"Uyu musi",1:"Ejo (hazoza)","-1":"Ejo (haheze)"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Isaha",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Umunota",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Isegonda",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ro",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=!a[1],i=Number(a[0])==e&&a[0].slice(-2);return t?1==e?"one":"other":1==e&&r?"one":!r||0==e||1!=e&&i>=1&&i<=19?"few":"other"},fields:{year:{displayName:"an",relative:{0:"anul acesta",1:"anul viitor","-1":"anul trecut"},relativeTime:{future:{one:"peste {0} an",few:"peste {0} ani",other:"peste {0} de ani"},past:{one:"acum {0} an",few:"acum {0} ani",other:"acum {0} de ani"}}},month:{displayName:"lună",relative:{0:"luna aceasta",1:"luna viitoare","-1":"luna trecută"},relativeTime:{future:{one:"peste {0} lună",few:"peste {0} luni",other:"peste {0} de luni"},past:{one:"acum {0} lună",few:"acum {0} luni",other:"acum {0} de luni"}}},day:{displayName:"zi",relative:{0:"azi",1:"mâine",2:"poimâine","-2":"alaltăieri","-1":"ieri"},relativeTime:{future:{one:"peste {0} zi",few:"peste {0} zile",other:"peste {0} de zile"},past:{one:"acum {0} zi",few:"acum {0} zile",other:"acum {0} de zile"}}},hour:{displayName:"oră",relative:{0:"ora aceasta"},relativeTime:{future:{one:"peste {0} oră",few:"peste {0} ore",other:"peste {0} de ore"},past:{one:"acum {0} oră",few:"acum {0} ore",other:"acum {0} de ore"}}},minute:{displayName:"minut",relative:{0:"minutul acesta"},relativeTime:{future:{one:"peste {0} minut",few:"peste {0} minute",other:"peste {0} de minute"},past:{one:"acum {0} minut",few:"acum {0} minute",other:"acum {0} de minute"}}},second:{displayName:"secundă",relative:{0:"acum"},relativeTime:{future:{one:"peste {0} secundă",few:"peste {0} secunde",other:"peste {0} de secunde"},past:{one:"acum {0} secundă",few:"acum {0} secunde",other:"acum {0} de secunde"}}}}},{locale:"ro-MD",parentLocale:"ro"},{locale:"rof",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Muaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mweri",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Mfiri",relative:{0:"Linu",1:"Ng’ama","-1":"Hiyo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Isaa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Dakika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ru",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=!a[1],o=r.slice(-1),n=r.slice(-2);return t?"other":i&&1==o&&11!=n?"one":i&&o>=2&&o<=4&&(n<12||n>14)?"few":i&&0==o||i&&o>=5&&o<=9||i&&n>=11&&n<=14?"many":"other"},fields:{year:{displayName:"год",relative:{0:"в этом году",1:"в следующем году","-1":"в прошлом году"},relativeTime:{future:{one:"через {0} год",few:"через {0} года",many:"через {0} лет",other:"через {0} года"},past:{one:"{0} год назад",few:"{0} года назад",many:"{0} лет назад",other:"{0} года назад"}}},month:{displayName:"месяц",relative:{0:"в этом месяце",1:"в следующем месяце","-1":"в прошлом месяце"},relativeTime:{future:{one:"через {0} месяц",few:"через {0} месяца",many:"через {0} месяцев",other:"через {0} месяца"},past:{one:"{0} месяц назад",few:"{0} месяца назад",many:"{0} месяцев назад",other:"{0} месяца назад"}}},day:{displayName:"день",relative:{0:"сегодня",1:"завтра",2:"послезавтра","-2":"позавчера","-1":"вчера"},relativeTime:{future:{one:"через {0} день",few:"через {0} дня",many:"через {0} дней",other:"через {0} дня"},past:{one:"{0} день назад",few:"{0} дня назад",many:"{0} дней назад",other:"{0} дня назад"}}},hour:{displayName:"час",relative:{0:"в этом часе"},relativeTime:{future:{one:"через {0} час",few:"через {0} часа",many:"через {0} часов",other:"через {0} часа"},past:{one:"{0} час назад",few:"{0} часа назад",many:"{0} часов назад",other:"{0} часа назад"}}},minute:{displayName:"минута",relative:{0:"в эту минуту"},relativeTime:{future:{one:"через {0} минуту",few:"через {0} минуты",many:"через {0} минут",other:"через {0} минуты"},past:{one:"{0} минуту назад",few:"{0} минуты назад",many:"{0} минут назад",other:"{0} минуты назад"}}},second:{displayName:"секунда",relative:{0:"сейчас"},relativeTime:{future:{one:"через {0} секунду",few:"через {0} секунды",many:"через {0} секунд",other:"через {0} секунды"},past:{one:"{0} секунду назад",few:"{0} секунды назад",many:"{0} секунд назад",other:"{0} секунды назад"}}}}},{locale:"ru-BY",parentLocale:"ru"},{locale:"ru-KG",parentLocale:"ru"},{locale:"ru-KZ",parentLocale:"ru"},{locale:"ru-MD",parentLocale:"ru"},{locale:"ru-UA",parentLocale:"ru"},{locale:"rw",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"rwk",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Maka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mori",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Mfiri",relative:{0:"Inu",1:"Ngama","-1":"Ukou"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Saa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Dakyika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"sah",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Сыл",relative:{0:"быйыл",1:"эһиил","-1":"Былырыын"},relativeTime:{future:{other:"{0} сылынан"},past:{other:"{0} сыл ынараа өттүгэр"}}},month:{displayName:"Ый",relative:{0:"бу ый",1:"аныгыскы ый","-1":"ааспыт ый"},relativeTime:{future:{other:"{0} ыйынан"},past:{other:"{0} ый ынараа өттүгэр"}}},day:{displayName:"Күн",relative:{0:"Бүгүн",1:"Сарсын",2:"Өйүүн","-2":"Иллэрээ күн","-1":"Бэҕэһээ"},relativeTime:{future:{other:"{0} күнүнэн"},past:{other:"{0} күн ынараа өттүгэр"}}},hour:{displayName:"Чаас",relative:{0:"this hour"},relativeTime:{future:{other:"{0} чааһынан"},past:{other:"{0} чаас ынараа өттүгэр"}}},minute:{displayName:"Мүнүүтэ",relative:{0:"this minute"},relativeTime:{future:{other:"{0} мүнүүтэннэн"},past:{other:"{0} мүнүүтэ ынараа өттүгэр"}}},second:{displayName:"Сөкүүндэ",relative:{0:"билигин"},relativeTime:{future:{other:"{0} сөкүүндэннэн"},past:{other:"{0} сөкүүндэ ынараа өттүгэр"}}}}},{locale:"saq",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Lari",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Lapa",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Mpari",relative:{0:"Duo",1:"Taisere","-1":"Ng’ole"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Saai",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Idakika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Isekondi",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"sbp",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Mwakha",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mwesi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Lusiku",relative:{0:"Ineng’uni",1:"Pamulaawu","-1":"Imehe"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Ilisala",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Idakika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Isekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"sdh",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"se",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":2==e?"two":"other"},fields:{year:{displayName:"jáhki",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"{0} jahki maŋŋilit",two:"{0} jahkki maŋŋilit",other:"{0} jahkki maŋŋilit"},past:{one:"{0} jahki árat",two:"{0} jahkki árat",other:"{0} jahkki árat"}}},month:{displayName:"mánnu",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"{0} mánotbadji maŋŋilit",two:"{0} mánotbadji maŋŋilit",other:"{0} mánotbadji maŋŋilit"},past:{one:"{0} mánotbadji árat",two:"{0} mánotbadji árat",other:"{0} mánotbadji árat"}}},day:{displayName:"beaivi",relative:{0:"odne",1:"ihttin",2:"paijeelittáá","-2":"oovdebpeivvi","-1":"ikte"},relativeTime:{future:{one:"{0} jándor maŋŋilit",two:"{0} jándor amaŋŋilit",other:"{0} jándora maŋŋilit"},past:{one:"{0} jándor árat",two:"{0} jándora árat",other:"{0} jándora árat"}}},hour:{displayName:"diibmu",relative:{0:"this hour"},relativeTime:{future:{one:"{0} diibmu maŋŋilit",two:"{0} diibmur maŋŋilit",other:"{0} diibmur maŋŋilit"},past:{one:"{0} diibmu árat",two:"{0} diibmur árat",other:"{0} diibmur árat"}}},minute:{displayName:"minuhtta",relative:{0:"this minute"},relativeTime:{future:{one:"{0} minuhta maŋŋilit",two:"{0} minuhtta maŋŋilit",other:"{0} minuhtta maŋŋilit"},past:{one:"{0} minuhta árat",two:"{0} minuhtta árat",other:"{0} minuhtta árat"}}},second:{displayName:"sekunda",relative:{0:"now"},relativeTime:{future:{one:"{0} sekunda maŋŋilit",two:"{0} sekundda maŋŋilit",other:"{0} sekundda maŋŋilit"},past:{one:"{0} sekunda árat",two:"{0} sekundda árat",other:"{0} sekundda árat"}}}}},{locale:"se-FI",parentLocale:"se",fields:{year:{displayName:"jahki",relative:{0:"dán jagi",1:"boahtte jagi","-1":"mannan jagi"},relativeTime:{future:{one:"{0} jagi siste",two:"{0} jagi siste",other:"{0} jagi siste"},past:{one:"{0} jagi árat",two:"{0} jagi árat",other:"{0} jagi árat"}}},month:{displayName:"mánnu",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"{0} mánotbadji maŋŋilit",two:"{0} mánotbadji maŋŋilit",other:"{0} mánotbadji maŋŋilit"},past:{one:"{0} mánotbadji árat",two:"{0} mánotbadji árat",other:"{0} mánotbadji árat"}}},day:{displayName:"beaivi",relative:{0:"odne",1:"ihttin",2:"paijeelittáá","-2":"oovdebpeivvi","-1":"ikte"},relativeTime:{future:{one:"{0} jándor maŋŋilit",two:"{0} jándor amaŋŋilit",other:"{0} jándora maŋŋilit"},past:{one:"{0} jándor árat",two:"{0} jándora árat",other:"{0} jándora árat"}}},hour:{displayName:"diibmu",relative:{0:"this hour"},relativeTime:{future:{one:"{0} diibmu maŋŋilit",two:"{0} diibmur maŋŋilit",other:"{0} diibmur maŋŋilit"},past:{one:"{0} diibmu árat",two:"{0} diibmur árat",other:"{0} diibmur árat"}}},minute:{displayName:"minuhtta",relative:{0:"this minute"},relativeTime:{future:{one:"{0} minuhta maŋŋilit",two:"{0} minuhtta maŋŋilit",other:"{0} minuhtta maŋŋilit"},past:{one:"{0} minuhta árat",two:"{0} minuhtta árat",other:"{0} minuhtta árat"}}},second:{displayName:"sekunda",relative:{0:"now"},relativeTime:{future:{one:"{0} sekunda maŋŋilit",two:"{0} sekundda maŋŋilit",other:"{0} sekundda maŋŋilit"},past:{one:"{0} sekunda árat",two:"{0} sekundda árat",other:"{0} sekundda árat"}}}}},{locale:"se-SE",parentLocale:"se"},{locale:"seh",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Chaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mwezi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ntsiku",relative:{0:"Lero",1:"Manguana","-1":"Zuro"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hora",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minuto",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Segundo",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ses",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Jiiri",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Handu",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Zaari",relative:{0:"Hõo",1:"Suba","-1":"Bi"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Guuru",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Miniti",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Miti",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"sg",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Ngû",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Nze",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Lâ",relative:{0:"Lâsô",1:"Kêkerêke","-1":"Bîrï"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Ngbonga",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Ndurü ngbonga",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Nzîna ngbonga",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"sh",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=a[1]||"",o=!a[1],n=r.slice(-1),l=r.slice(-2),u=i.slice(-1),s=i.slice(-2);return t?"other":o&&1==n&&11!=l||1==u&&11!=s?"one":o&&n>=2&&n<=4&&(l<12||l>14)||u>=2&&u<=4&&(s<12||s>14)?"few":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"shi",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=Number(a[0])==e;return t?"other":e>=0&&e<=1?"one":r&&e>=2&&e<=10?"few":"other"},fields:{year:{displayName:"ⴰⵙⴳⴳⵯⴰⵙ",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"ⴰⵢⵢⵓⵔ",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"ⴰⵙⵙ",relative:{0:"ⴰⵙⵙⴰ",1:"ⴰⵙⴽⴽⴰ","-1":"ⵉⴹⵍⵍⵉ"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"ⵜⴰⵙⵔⴰⴳⵜ",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"ⵜⵓⵙⴷⵉⴷⵜ",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"ⵜⴰⵙⵉⵏⵜ",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"shi-Latn",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"asggʷas",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"ayyur",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"ass",relative:{0:"assa",1:"askka","-1":"iḍlli"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"tasragt",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"tusdidt",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"tasint",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"shi-Tfng",parentLocale:"shi"},{locale:"si",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=a[1]||"";return t?"other":0==e||1==e||0==r&&1==i?"one":"other"},fields:{year:{displayName:"වර්ෂය",relative:{0:"මෙම වසර",1:"ඊළඟ වසර","-1":"පසුගිය වසර"},relativeTime:{future:{one:"වසර {0}කින්",other:"වසර {0}කින්"},past:{one:"වසර {0}කට පෙර",other:"වසර {0}කට පෙර"}}},month:{displayName:"මාසය",relative:{0:"මෙම මාසය",1:"ඊළඟ මාසය","-1":"පසුගිය මාසය"},relativeTime:{future:{one:"මාස {0}කින්",other:"මාස {0}කින්"},past:{one:"මාස {0}කට පෙර",other:"මාස {0}කට පෙර"}}},day:{displayName:"දිනය",relative:{0:"අද",1:"හෙට",2:"අනිද්දා","-2":"පෙරේදා","-1":"ඊයේ"},relativeTime:{future:{one:"දින {0}න්",other:"දින {0}න්"},past:{one:"දින {0}කට පෙර",other:"දින {0}කට පෙර"}}},hour:{displayName:"පැය",relative:{0:"මෙම පැය"},relativeTime:{future:{one:"පැය {0}කින්",other:"පැය {0}කින්"},past:{one:"පැය {0}කට පෙර",other:"පැය {0}කට පෙර"}}},minute:{displayName:"මිනිත්තුව",relative:{0:"මෙම මිනිත්තුව"},relativeTime:{future:{one:"මිනිත්තු {0}කින්",other:"මිනිත්තු {0}කින්"},past:{one:"මිනිත්තු {0}කට පෙර",other:"මිනිත්තු {0}කට පෙර"}}},second:{displayName:"තත්පරය",relative:{0:"දැන්"},relativeTime:{future:{one:"තත්පර {0}කින්",other:"තත්පර {0}කින්"},past:{one:"තත්පර {0}කට පෙර",other:"තත්පර {0}කට පෙර"}}}}},{locale:"sk",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=!a[1];return t?"other":1==e&&i?"one":r>=2&&r<=4&&i?"few":i?"other":"many"},fields:{year:{displayName:"rok",relative:{0:"tento rok",1:"budúci rok","-1":"minulý rok"},relativeTime:{future:{one:"o {0} rok",few:"o {0} roky",many:"o {0} roka",other:"o {0} rokov"},past:{one:"pred {0} rokom",few:"pred {0} rokmi",many:"pred {0} roka",other:"pred {0} rokmi"}}},month:{displayName:"mesiac",relative:{0:"tento mesiac",1:"budúci mesiac","-1":"minulý mesiac"},relativeTime:{future:{one:"o {0} mesiac",few:"o {0} mesiace",many:"o {0} mesiaca",other:"o {0} mesiacov"},past:{one:"pred {0} mesiacom",few:"pred {0} mesiacmi",many:"pred {0} mesiaca",other:"pred {0} mesiacmi"}}},day:{displayName:"deň",relative:{0:"dnes",1:"zajtra",2:"pozajtra","-2":"predvčerom","-1":"včera"},relativeTime:{future:{one:"o {0} deň",few:"o {0} dni",many:"o {0} dňa",other:"o {0} dní"},past:{one:"pred {0} dňom",few:"pred {0} dňami",many:"pred {0} dňa",other:"pred {0} dňami"}}},hour:{displayName:"hodina",relative:{0:"v tejto hodine"},relativeTime:{future:{one:"o {0} hodinu",few:"o {0} hodiny",many:"o {0} hodiny",other:"o {0} hodín"},past:{one:"pred {0} hodinou",few:"pred {0} hodinami",many:"pred {0} hodinou",other:"pred {0} hodinami"}}},minute:{displayName:"minúta",relative:{0:"v tejto minúte"},relativeTime:{future:{one:"o {0} minútu",few:"o {0} minúty",many:"o {0} minúty",other:"o {0} minút"},past:{one:"pred {0} minútou",few:"pred {0} minútami",many:"pred {0} minúty",other:"pred {0} minútami"}}},second:{displayName:"sekunda",relative:{0:"teraz"},relativeTime:{future:{one:"o {0} sekundu",few:"o {0} sekundy",many:"o {0} sekundy",other:"o {0} sekúnd"},past:{one:"pred {0} sekundou",few:"pred {0} sekundami",many:"pred {0} sekundy",other:"pred {0} sekundami"}}}}},{locale:"sl",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=!a[1],o=r.slice(-2);return t?"other":i&&1==o?"one":i&&2==o?"two":i&&(3==o||4==o)||!i?"few":"other"},fields:{year:{displayName:"leto",relative:{0:"letos",1:"naslednje leto","-1":"lani"},relativeTime:{future:{one:"čez {0} leto",two:"čez {0} leti",few:"čez {0} leta",other:"čez {0} let"},past:{one:"pred {0} letom",two:"pred {0} letoma",few:"pred {0} leti",other:"pred {0} leti"}}},month:{displayName:"mesec",relative:{0:"ta mesec",1:"naslednji mesec","-1":"prejšnji mesec"},relativeTime:{future:{one:"čez {0} mesec",two:"čez {0} meseca",few:"čez {0} mesece",other:"čez {0} mesecev"},past:{one:"pred {0} mesecem",two:"pred {0} mesecema",few:"pred {0} meseci",other:"pred {0} meseci"}}},day:{displayName:"dan",relative:{0:"danes",1:"jutri",2:"pojutrišnjem","-2":"predvčerajšnjim","-1":"včeraj"},relativeTime:{future:{one:"čez {0} dan",two:"čez {0} dneva",few:"čez {0} dni",other:"čez {0} dni"},past:{one:"pred {0} dnevom",two:"pred {0} dnevoma",few:"pred {0} dnevi",other:"pred {0} dnevi"}}},hour:{displayName:"ura",relative:{0:"v tej uri"},relativeTime:{future:{one:"čez {0} uro",two:"čez {0} uri",few:"čez {0} ure",other:"čez {0} ur"},past:{one:"pred {0} uro",two:"pred {0} urama",few:"pred {0} urami",other:"pred {0} urami"}}},minute:{displayName:"minuta",relative:{0:"to minuto"},relativeTime:{future:{one:"čez {0} minuto",two:"čez {0} minuti",few:"čez {0} minute",other:"čez {0} minut"},past:{one:"pred {0} minuto",two:"pred {0} minutama",few:"pred {0} minutami",other:"pred {0} minutami"}}},second:{displayName:"sekunda",relative:{0:"zdaj"},relativeTime:{future:{one:"čez {0} sekundo",two:"čez {0} sekundi",few:"čez {0} sekunde",other:"čez {0} sekund"},past:{one:"pred {0} sekundo",two:"pred {0} sekundama",few:"pred {0} sekundami",other:"pred {0} sekundami"}}}}},{locale:"sma",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":2==e?"two":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"smi",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":2==e?"two":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"smj",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":2==e?"two":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"smn",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":2==e?"two":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"sms",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":2==e?"two":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"sn",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Gore",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mwedzi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Zuva",relative:{0:"Nhasi",1:"Mangwana","-1":"Nezuro"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Awa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Mineti",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekondi",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"so",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"+{0} y",other:"+{0} y"},past:{one:"-{0} y",other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"+{0} m",other:"+{0} m"},past:{one:"-{0} m",other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"Maanta",1:"Berri","-1":"Shalay"},relativeTime:{future:{one:"+{0} d",other:"+{0} d"},past:{one:"-{0} d",other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{one:"+{0} h",other:"+{0} h"},past:{one:"-{0} h",other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{one:"+{0} min",other:"+{0} min"},past:{one:"-{0} min",other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{one:"+{0} s",other:"+{0} s"},past:{one:"-{0} s",other:"-{0} s"}}}}},{locale:"so-DJ",parentLocale:"so"},{locale:"so-ET",parentLocale:"so"},{locale:"so-KE",parentLocale:"so"},{locale:"sq",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=Number(a[0])==e,i=r&&a[0].slice(-1),o=r&&a[0].slice(-2);return t?1==e?"one":4==i&&14!=o?"many":"other":1==e?"one":"other"},fields:{year:{displayName:"vit",relative:{0:"këtë vit",1:"vitin e ardhshëm","-1":"vitin e kaluar"},relativeTime:{future:{one:"pas {0} viti",other:"pas {0} vjetësh"},past:{one:"{0} vit më parë",other:"{0} vjet më parë"}}},month:{displayName:"muaj",relative:{0:"këtë muaj",1:"muajin e ardhshëm","-1":"muajin e kaluar"},relativeTime:{future:{one:"pas {0} muaji",other:"pas {0} muajsh"},past:{one:"{0} muaj më parë",other:"{0} muaj më parë"}}},day:{displayName:"ditë",relative:{0:"sot",1:"nesër","-1":"dje"},relativeTime:{future:{one:"pas {0} dite",other:"pas {0} ditësh"},past:{one:"{0} ditë më parë",other:"{0} ditë më parë"}}},hour:{displayName:"orë",relative:{0:"këtë orë"},relativeTime:{future:{one:"pas {0} ore",other:"pas {0} orësh"},past:{one:"{0} orë më parë",other:"{0} orë më parë"}}},minute:{displayName:"minutë",relative:{0:"këtë minutë"},relativeTime:{future:{one:"pas {0} minute",other:"pas {0} minutash"},past:{one:"{0} minutë më parë",other:"{0} minuta më parë"}}},second:{displayName:"sekondë",relative:{0:"tani"},relativeTime:{future:{one:"pas {0} sekonde",other:"pas {0} sekondash"},past:{one:"{0} sekondë më parë",other:"{0} sekonda më parë"}}}}},{locale:"sq-MK",parentLocale:"sq"},{locale:"sq-XK",parentLocale:"sq"},{locale:"sr",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=a[1]||"",o=!a[1],n=r.slice(-1),l=r.slice(-2),u=i.slice(-1),s=i.slice(-2);return t?"other":o&&1==n&&11!=l||1==u&&11!=s?"one":o&&n>=2&&n<=4&&(l<12||l>14)||u>=2&&u<=4&&(s<12||s>14)?"few":"other"},fields:{year:{displayName:"година",relative:{0:"ове године",1:"следеће године","-1":"прошле године"},relativeTime:{future:{one:"за {0} годину",few:"за {0} године",other:"за {0} година"},past:{one:"пре {0} године",few:"пре {0} године",other:"пре {0} година"}}},month:{displayName:"месец",relative:{0:"овог месеца",1:"следећег месеца","-1":"прошлог месеца"},relativeTime:{future:{one:"за {0} месец",few:"за {0} месеца",other:"за {0} месеци"},past:{one:"пре {0} месеца",few:"пре {0} месеца",other:"пре {0} месеци"}}},day:{displayName:"дан",relative:{0:"данас",1:"сутра",2:"прекосутра","-2":"прекјуче","-1":"јуче"},relativeTime:{future:{one:"за {0} дан",few:"за {0} дана",other:"за {0} дана"},past:{one:"пре {0} дана",few:"пре {0} дана",other:"пре {0} дана"}}},hour:{displayName:"сат",relative:{0:"овог сата"},relativeTime:{future:{one:"за {0} сат",few:"за {0} сата",other:"за {0} сати"},past:{one:"пре {0} сата",few:"пре {0} сата",other:"пре {0} сати"}}},minute:{displayName:"минут",relative:{0:"овог минута"},relativeTime:{future:{one:"за {0} минут",few:"за {0} минута",other:"за {0} минута"},past:{one:"пре {0} минута",few:"пре {0} минута",other:"пре {0} минута"}}},second:{displayName:"секунд",relative:{0:"сада"},relativeTime:{future:{one:"за {0} секунду",few:"за {0} секунде",other:"за {0} секунди"},past:{one:"пре {0} секунде",few:"пре {0} секунде",other:"пре {0} секунди"}}}}},{locale:"sr-Cyrl",parentLocale:"sr"},{locale:"sr-Cyrl-BA",parentLocale:"sr-Cyrl"},{locale:"sr-Cyrl-ME",parentLocale:"sr-Cyrl"},{locale:"sr-Cyrl-XK",parentLocale:"sr-Cyrl"},{locale:"sr-Latn",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"godina",relative:{0:"ove godine",1:"sledeće godine","-1":"prošle godine"},relativeTime:{future:{one:"za {0} godinu",few:"za {0} godine",other:"za {0} godina"},past:{one:"pre {0} godine",few:"pre {0} godine",other:"pre {0} godina"}}},month:{displayName:"mesec",relative:{0:"ovog meseca",1:"sledećeg meseca","-1":"prošlog meseca"},relativeTime:{future:{one:"za {0} mesec",few:"za {0} meseca",other:"za {0} meseci"},past:{one:"pre {0} meseca",few:"pre {0} meseca",other:"pre {0} meseci"}}},day:{displayName:"dan",relative:{0:"danas",1:"sutra",2:"prekosutra","-2":"prekjuče","-1":"juče"},relativeTime:{future:{one:"za {0} dan",few:"za {0} dana",other:"za {0} dana"},past:{one:"pre {0} dana",few:"pre {0} dana",other:"pre {0} dana"}}},hour:{displayName:"sat",relative:{0:"ovog sata"},relativeTime:{future:{one:"za {0} sat",few:"za {0} sata",other:"za {0} sati"},past:{one:"pre {0} sata",few:"pre {0} sata",other:"pre {0} sati"}}},minute:{displayName:"minut",relative:{0:"ovog minuta"},relativeTime:{future:{one:"za {0} minut",few:"za {0} minuta",other:"za {0} minuta"},past:{one:"pre {0} minuta",few:"pre {0} minuta",other:"pre {0} minuta"}}},second:{displayName:"sekund",relative:{0:"sada"},relativeTime:{future:{one:"za {0} sekundu",few:"za {0} sekunde",other:"za {0} sekundi"},past:{one:"pre {0} sekunde",few:"pre {0} sekunde",other:"pre {0} sekundi"}}}}},{locale:"sr-Latn-BA",parentLocale:"sr-Latn"},{locale:"sr-Latn-ME",parentLocale:"sr-Latn"},{locale:"sr-Latn-XK",parentLocale:"sr-Latn"},{locale:"ss",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ssy",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"st",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"sv",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=!a[1],i=Number(a[0])==e,o=i&&a[0].slice(-1),n=i&&a[0].slice(-2);return t?1!=o&&2!=o||11==n||12==n?"other":"one":1==e&&r?"one":"other"},fields:{year:{displayName:"år",relative:{0:"i år",1:"nästa år","-1":"i fjol"},relativeTime:{future:{one:"om {0} år",other:"om {0} år"},past:{one:"för {0} år sedan",other:"för {0} år sedan"}}},month:{displayName:"månad",relative:{0:"denna månad",1:"nästa månad","-1":"förra månaden"},relativeTime:{future:{one:"om {0} månad",other:"om {0} månader"},past:{one:"för {0} månad sedan",other:"för {0} månader sedan"}}},day:{displayName:"dag",relative:{0:"i dag",1:"i morgon",2:"i övermorgon","-2":"i förrgår","-1":"i går"},relativeTime:{future:{one:"om {0} dag",other:"om {0} dagar"},past:{one:"för {0} dag sedan",other:"för {0} dagar sedan"}}},hour:{displayName:"timme",relative:{0:"denna timme"},relativeTime:{future:{one:"om {0} timme",other:"om {0} timmar"},past:{one:"för {0} timme sedan",other:"för {0} timmar sedan"}}},minute:{displayName:"minut",relative:{0:"denna minut"},relativeTime:{future:{one:"om {0} minut",other:"om {0} minuter"},past:{one:"för {0} minut sedan",other:"för {0} minuter sedan"}}},second:{displayName:"sekund",relative:{0:"nu"},relativeTime:{future:{one:"om {0} sekund",other:"om {0} sekunder"},past:{one:"för {0} sekund sedan",other:"för {0} sekunder sedan"}}}}},{locale:"sv-AX",parentLocale:"sv"},{locale:"sv-FI",parentLocale:"sv"},{locale:"sw",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?"other":1==e&&a?"one":"other"},fields:{year:{displayName:"mwaka",relative:{0:"mwaka huu",1:"mwaka ujao","-1":"mwaka uliopita"},relativeTime:{future:{one:"baada ya mwaka {0}",other:"baada ya miaka {0}"},past:{one:"mwaka {0} uliopita",other:"miaka {0} iliyopita"}}},month:{displayName:"mwezi",relative:{0:"mwezi huu",1:"mwezi ujao","-1":"mwezi uliopita"},relativeTime:{future:{one:"baada ya mwezi {0}",other:"baada ya miezi {0}"},past:{one:"mwezi {0} uliopita",other:"miezi {0} iliyopita"}}},day:{displayName:"siku",relative:{0:"leo",1:"kesho",2:"kesho kutwa","-2":"juzi","-1":"jana"},relativeTime:{future:{one:"baada ya siku {0}",other:"baada ya siku {0}"},past:{one:"siku {0} iliyopita",other:"siku {0} zilizopita"}}},hour:{displayName:"saa",relative:{0:"saa hii"},relativeTime:{future:{one:"baada ya saa {0}",other:"baada ya saa {0}"},past:{one:"saa {0} iliyopita",other:"saa {0} zilizopita"}}},minute:{displayName:"dakika",relative:{0:"dakika hii"},relativeTime:{future:{one:"baada ya dakika {0}",other:"baada ya dakika {0}"},past:{one:"dakika {0} iliyopita",other:"dakika {0} zilizopita"}}},second:{displayName:"sekunde",relative:{0:"sasa hivi"},relativeTime:{future:{one:"baada ya sekunde {0}",other:"baada ya sekunde {0}"},past:{one:"Sekunde {0} iliyopita",other:"Sekunde {0} zilizopita"}}}}},{locale:"sw-CD",parentLocale:"sw"},{locale:"sw-KE",parentLocale:"sw"},{locale:"sw-UG",parentLocale:"sw"},{locale:"syr",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ta",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"ஆண்டு",relative:{0:"இந்த ஆண்டு",1:"அடுத்த ஆண்டு","-1":"கடந்த ஆண்டு"},relativeTime:{future:{one:"{0} ஆண்டில்",other:"{0} ஆண்டுகளில்"},past:{one:"{0} ஆண்டிற்கு முன்",other:"{0} ஆண்டுகளுக்கு முன்"}}},month:{displayName:"மாதம்",relative:{0:"இந்த மாதம்",1:"அடுத்த மாதம்","-1":"கடந்த மாதம்"},relativeTime:{future:{one:"{0} மாதத்தில்",other:"{0} மாதங்களில்"},past:{one:"{0} மாதத்துக்கு முன்",other:"{0} மாதங்களுக்கு முன்"}}},day:{displayName:"நாள்",relative:{0:"இன்று",1:"நாளை",2:"நாளை மறுநாள்","-2":"நேற்று முன் தினம்","-1":"நேற்று"},relativeTime:{future:{one:"{0} நாளில்",other:"{0} நாட்களில்"},past:{one:"{0} நாளுக்கு முன்",other:"{0} நாட்களுக்கு முன்"}}},hour:{displayName:"மணி",relative:{0:"இந்த ஒரு மணிநேரத்தில்"},relativeTime:{future:{one:"{0} மணிநேரத்தில்",other:"{0} மணிநேரத்தில்"},past:{one:"{0} மணிநேரம் முன்",other:"{0} மணிநேரம் முன்"}}},minute:{displayName:"நிமிடம்",relative:{0:"இந்த ஒரு நிமிடத்தில்"},relativeTime:{future:{one:"{0} நிமிடத்தில்",other:"{0} நிமிடங்களில்"},past:{one:"{0} நிமிடத்திற்கு முன்",other:"{0} நிமிடங்களுக்கு முன்"}}},second:{displayName:"விநாடி",relative:{0:"இப்போது"},relativeTime:{future:{one:"{0} விநாடியில்",other:"{0} விநாடிகளில்"},past:{one:"{0} விநாடிக்கு முன்",other:"{0} விநாடிகளுக்கு முன்"}}}}},{locale:"ta-LK",parentLocale:"ta"},{locale:"ta-MY",parentLocale:"ta"},{locale:"ta-SG",parentLocale:"ta"},{locale:"te",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"సంవత్సరం",relative:{0:"ఈ సంవత్సరం",1:"తదుపరి సంవత్సరం","-1":"గత సంవత్సరం"},relativeTime:{future:{one:"{0} సంవత్సరంలో",other:"{0} సంవత్సరాల్లో"},past:{one:"{0} సంవత్సరం క్రితం",other:"{0} సంవత్సరాల క్రితం"}}},month:{displayName:"నెల",relative:{0:"ఈ నెల",1:"తదుపరి నెల","-1":"గత నెల"},relativeTime:{future:{one:"{0} నెలలో",other:"{0} నెలల్లో"},past:{one:"{0} నెల క్రితం",other:"{0} నెలల క్రితం"}}},day:{displayName:"దినం",relative:{0:"ఈ రోజు",1:"రేపు",2:"ఎల్లుండి","-2":"మొన్న","-1":"నిన్న"},relativeTime:{future:{one:"{0} రోజులో",other:"{0} రోజుల్లో"},past:{one:"{0} రోజు క్రితం",other:"{0} రోజుల క్రితం"}}},hour:{displayName:"గంట",relative:{0:"ఈ గంట"},relativeTime:{future:{one:"{0} గంటలో",other:"{0} గంటల్లో"},past:{one:"{0} గంట క్రితం",other:"{0} గంటల క్రితం"}}},minute:{displayName:"నిమిషము",relative:{0:"ఈ నిమిషం"},relativeTime:{future:{one:"{0} నిమిషంలో",other:"{0} నిమిషాల్లో"},past:{one:"{0} నిమిషం క్రితం",other:"{0} నిమిషాల క్రితం"}}},second:{displayName:"సెకను",relative:{0:"ప్రస్తుతం"},relativeTime:{future:{one:"{0} సెకనులో",other:"{0} సెకన్లలో"},past:{one:"{0} సెకను క్రితం",other:"{0} సెకన్ల క్రితం"}}}}},{locale:"teo",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Ekan",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Elap",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Aparan",relative:{0:"Lolo",1:"Moi","-1":"Jaan"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Esaa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Idakika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Isekonde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"teo-KE",parentLocale:"teo"},{locale:"th",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"ปี",relative:{0:"ปีนี้",1:"ปีหน้า","-1":"ปีที่แล้ว"},relativeTime:{future:{other:"ในอีก {0} ปี"},past:{other:"{0} ปีที่แล้ว"}}},month:{displayName:"เดือน",relative:{0:"เดือนนี้",1:"เดือนหน้า","-1":"เดือนที่แล้ว"},relativeTime:{future:{other:"ในอีก {0} เดือน"},past:{other:"{0} เดือนที่ผ่านมา"}}},day:{displayName:"วัน",relative:{0:"วันนี้",1:"พรุ่งนี้",2:"มะรืนนี้","-2":"เมื่อวานซืน","-1":"เมื่อวาน"},relativeTime:{future:{other:"ในอีก {0} วัน"},past:{other:"{0} วันที่ผ่านมา"}}},hour:{displayName:"ชั่วโมง",relative:{0:"ชั่วโมงนี้"},relativeTime:{future:{other:"ในอีก {0} ชั่วโมง"},past:{other:"{0} ชั่วโมงที่ผ่านมา"}}},minute:{displayName:"นาที",relative:{0:"นาทีนี้"},relativeTime:{future:{other:"ในอีก {0} นาที"},past:{other:"{0} นาทีที่ผ่านมา"}}},second:{displayName:"วินาที",relative:{0:"ขณะนี้"},relativeTime:{future:{other:"ในอีก {0} วินาที"},past:{other:"{0} วินาทีที่ผ่านมา"}}}}},{locale:"ti",pluralRuleFunction:function(e,t){return t?"other":0==e||1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ti-ER",parentLocale:"ti"},{locale:"tig",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"tk",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"ýyl",relative:{0:"şu ýyl",1:"indiki ýyl","-1":"geçen ýyl"},relativeTime:{future:{one:"{0} ýyldan",other:"{0} ýyldan"},past:{one:"{0} ýyl öň",other:"{0} ýyl öň"}}},month:{displayName:"aý",relative:{0:"şu aý",1:"indiki aý","-1":"geçen aý"},relativeTime:{future:{one:"{0} aýdan",other:"{0} aýdan"},past:{one:"{0} aý öň",other:"{0} aý öň"}}},day:{displayName:"gün",relative:{0:"şu gün",1:"ertir","-1":"düýn"},relativeTime:{future:{one:"{0} günden",other:"{0} günden"},past:{one:"{0} gün öň",other:"{0} gün öň"}}},hour:{displayName:"sagat",relative:{0:"this hour"},relativeTime:{future:{one:"{0} sagatdan",other:"{0} sagatdan"},past:{one:"{0} sagat öň",other:"{0} sagat öň"}}},minute:{displayName:"minut",relative:{0:"this minute"},relativeTime:{future:{one:"{0} minutdan",other:"{0} minutdan"},past:{one:"{0} minut öň",other:"{0} minut öň"}}},second:{displayName:"sekunt",relative:{0:"now"},relativeTime:{future:{one:"{0} sekuntdan",other:"{0} sekuntdan"},past:{one:"{0} sekunt öň",other:"{0} sekunt öň"}}}}},{locale:"tl",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=a[1]||"",o=!a[1],n=r.slice(-1),l=i.slice(-1);return t?1==e?"one":"other":o&&(1==r||2==r||3==r)||o&&4!=n&&6!=n&&9!=n||!o&&4!=l&&6!=l&&9!=l?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"tn",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"to",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"taʻu",relative:{0:"taʻú ni",1:"taʻu kahaʻu","-1":"taʻu kuoʻosi"},relativeTime:{future:{other:"ʻi he taʻu ʻe {0}"},past:{other:"taʻu ʻe {0} kuoʻosi"}}},month:{displayName:"māhina",relative:{0:"māhiná ni",1:"māhina kahaʻu","-1":"māhina kuoʻosi"},relativeTime:{future:{other:"ʻi he māhina ʻe {0}"},past:{other:"māhina ʻe {0} kuoʻosi"}}},day:{displayName:"ʻaho",relative:{0:"ʻahó ni",1:"ʻapongipongi",2:"ʻahepongipongi","-2":"ʻaneheafi","-1":"ʻaneafi"},relativeTime:{future:{other:"ʻi he ʻaho ʻe {0}"},past:{other:"ʻaho ʻe {0} kuoʻosi"}}},hour:{displayName:"houa",relative:{0:"this hour"},relativeTime:{future:{other:"ʻi he houa ʻe {0}"},past:{other:"houa ʻe {0} kuoʻosi"}}},minute:{displayName:"miniti",relative:{0:"this minute"},relativeTime:{future:{other:"ʻi he miniti ʻe {0}"},past:{other:"miniti ʻe {0} kuoʻosi"}}},second:{displayName:"sekoni",relative:{0:"taimí ni"},relativeTime:{future:{other:"ʻi he sekoni ʻe {0}"},past:{other:"sekoni ʻe {0} kuoʻosi"}}}}},{locale:"tr",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"yıl",relative:{0:"bu yıl",1:"gelecek yıl","-1":"geçen yıl"},relativeTime:{future:{one:"{0} yıl sonra",other:"{0} yıl sonra"},past:{one:"{0} yıl önce",other:"{0} yıl önce"}}},month:{displayName:"ay",relative:{0:"bu ay",1:"gelecek ay","-1":"geçen ay"},relativeTime:{future:{one:"{0} ay sonra",other:"{0} ay sonra"},past:{one:"{0} ay önce",other:"{0} ay önce"}}},day:{displayName:"gün",relative:{0:"bugün",1:"yarın",2:"öbür gün","-2":"evvelsi gün","-1":"dün"},relativeTime:{future:{one:"{0} gün sonra",other:"{0} gün sonra"},past:{one:"{0} gün önce",other:"{0} gün önce"}}},hour:{displayName:"saat",relative:{0:"bu saat"},relativeTime:{future:{one:"{0} saat sonra",other:"{0} saat sonra"},past:{one:"{0} saat önce",other:"{0} saat önce"}}},minute:{displayName:"dakika",relative:{0:"bu dakika"},relativeTime:{future:{one:"{0} dakika sonra",other:"{0} dakika sonra"},past:{one:"{0} dakika önce",other:"{0} dakika önce"}}},second:{displayName:"saniye",relative:{0:"şimdi"},relativeTime:{future:{one:"{0} saniye sonra",other:"{0} saniye sonra"},past:{one:"{0} saniye önce",other:"{0} saniye önce"}}}}},{locale:"tr-CY",parentLocale:"tr"},{locale:"ts",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"twq",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Jiiri",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Handu",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Zaari",relative:{0:"Hõo",1:"Suba","-1":"Bi"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Guuru",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Miniti",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Miti",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"tzm",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=Number(a[0])==e;return t?"other":0==e||1==e||r&&e>=11&&e<=99?"one":"other"},fields:{year:{displayName:"Asseggas",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Ayur",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ass",relative:{0:"Assa",1:"Asekka","-1":"Assenaṭ"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Tasragt",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Tusdat",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Tusnat",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"ug",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"يىل",relative:{0:"بۇ يىل",1:"كېلەر يىل","-1":"ئۆتكەن يىل"},relativeTime:{future:{one:"{0} يىلدىن كېيىن",other:"{0} يىلدىن كېيىن"},past:{one:"{0} يىل ئىلگىرى",other:"{0} يىل ئىلگىرى"}}},month:{displayName:"ئاي",relative:{0:"بۇ ئاي",1:"كېلەر ئاي","-1":"ئۆتكەن ئاي"},relativeTime:{future:{one:"{0} ئايدىن كېيىن",other:"{0} ئايدىن كېيىن"},past:{one:"{0} ئاي ئىلگىرى",other:"{0} ئاي ئىلگىرى"}}},day:{displayName:"كۈن",relative:{0:"بۈگۈن",1:"ئەتە","-1":"تۈنۈگۈن"},relativeTime:{future:{one:"{0} كۈندىن كېيىن",other:"{0} كۈندىن كېيىن"},past:{one:"{0} كۈن ئىلگىرى",other:"{0} كۈن ئىلگىرى"}}},hour:{displayName:"سائەت",relative:{0:"this hour"},relativeTime:{future:{one:"{0} سائەتتىن كېيىن",other:"{0} سائەتتىن كېيىن"},past:{one:"{0} سائەت ئىلگىرى",other:"{0} سائەت ئىلگىرى"}}},minute:{displayName:"مىنۇت",relative:{0:"this minute"},relativeTime:{future:{one:"{0} مىنۇتتىن كېيىن",other:"{0} مىنۇتتىن كېيىن"},past:{one:"{0} مىنۇت ئىلگىرى",other:"{0} مىنۇت ئىلگىرى"}}},second:{displayName:"سېكۇنت",relative:{0:"now"},relativeTime:{future:{one:"{0} سېكۇنتتىن كېيىن",other:"{0} سېكۇنتتىن كېيىن"},past:{one:"{0} سېكۇنت ئىلگىرى",other:"{0} سېكۇنت ئىلگىرى"}}}}},{locale:"uk",pluralRuleFunction:function(e,t){var a=String(e).split("."),r=a[0],i=!a[1],o=Number(a[0])==e,n=o&&a[0].slice(-1),l=o&&a[0].slice(-2),u=r.slice(-1),s=r.slice(-2);return t?3==n&&13!=l?"few":"other":i&&1==u&&11!=s?"one":i&&u>=2&&u<=4&&(s<12||s>14)?"few":i&&0==u||i&&u>=5&&u<=9||i&&s>=11&&s<=14?"many":"other"},fields:{year:{displayName:"рік",relative:{0:"цього року",1:"наступного року","-1":"торік"},relativeTime:{future:{one:"через {0} рік",few:"через {0} роки",many:"через {0} років",other:"через {0} року"},past:{one:"{0} рік тому",few:"{0} роки тому",many:"{0} років тому",other:"{0} року тому"}}},month:{displayName:"місяць",relative:{0:"цього місяця",1:"наступного місяця","-1":"минулого місяця"},relativeTime:{future:{one:"через {0} місяць",few:"через {0} місяці",many:"через {0} місяців",other:"через {0} місяця"},past:{one:"{0} місяць тому",few:"{0} місяці тому",many:"{0} місяців тому",other:"{0} місяця тому"}}},day:{displayName:"день",relative:{0:"сьогодні",1:"завтра",2:"післязавтра","-2":"позавчора","-1":"учора"},relativeTime:{future:{one:"через {0} день",few:"через {0} дні",many:"через {0} днів",other:"через {0} дня"},past:{one:"{0} день тому",few:"{0} дні тому",many:"{0} днів тому",other:"{0} дня тому"}}},hour:{displayName:"година",relative:{0:"цієї години"},relativeTime:{future:{one:"через {0} годину",few:"через {0} години",many:"через {0} годин",other:"через {0} години"},past:{one:"{0} годину тому",few:"{0} години тому",many:"{0} годин тому",other:"{0} години тому"}}},minute:{displayName:"хвилина",relative:{0:"цієї хвилини"},relativeTime:{future:{one:"через {0} хвилину",few:"через {0} хвилини",many:"через {0} хвилин",other:"через {0} хвилини"},past:{one:"{0} хвилину тому",few:"{0} хвилини тому",many:"{0} хвилин тому",other:"{0} хвилини тому"}}},second:{displayName:"секунда",relative:{0:"зараз"},relativeTime:{future:{one:"через {0} секунду",few:"через {0} секунди",many:"через {0} секунд",other:"через {0} секунди"},past:{one:"{0} секунду тому",few:"{0} секунди тому",many:"{0} секунд тому",other:"{0} секунди тому"}}}}},{locale:"ur",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?"other":1==e&&a?"one":"other"},fields:{year:{displayName:"سال",relative:{0:"اس سال",1:"اگلے سال","-1":"گزشتہ سال"},relativeTime:{future:{one:"{0} سال میں",other:"{0} سال میں"},past:{one:"{0} سال پہلے",other:"{0} سال پہلے"}}},month:{displayName:"مہینہ",relative:{0:"اس مہینہ",1:"اگلے مہینہ","-1":"پچھلے مہینہ"},relativeTime:{future:{one:"{0} مہینہ میں",other:"{0} مہینے میں"},past:{one:"{0} مہینہ پہلے",other:"{0} مہینے پہلے"}}},day:{displayName:"دن",relative:{0:"آج",1:"آئندہ کل",2:"آنے والا پرسوں","-2":"گزشتہ پرسوں","-1":"گزشتہ کل"},relativeTime:{future:{one:"{0} دن میں",other:"{0} دنوں میں"},past:{one:"{0} دن پہلے",other:"{0} دنوں پہلے"}}},hour:{displayName:"گھنٹہ",relative:{0:"اس گھنٹے"},relativeTime:{future:{one:"{0} گھنٹہ میں",other:"{0} گھنٹے میں"},past:{one:"{0} گھنٹہ پہلے",other:"{0} گھنٹے پہلے"}}},minute:{displayName:"منٹ",relative:{0:"اس منٹ"},relativeTime:{future:{one:"{0} منٹ میں",other:"{0} منٹ میں"},past:{one:"{0} منٹ پہلے",other:"{0} منٹ پہلے"}}},second:{displayName:"سیکنڈ",relative:{0:"اب"},relativeTime:{future:{one:"{0} سیکنڈ میں",other:"{0} سیکنڈ میں"},past:{one:"{0} سیکنڈ پہلے",other:"{0} سیکنڈ پہلے"}}}}},{locale:"ur-IN",parentLocale:"ur",fields:{year:{displayName:"سال",relative:{0:"اس سال",1:"اگلے سال","-1":"گزشتہ سال"},relativeTime:{future:{one:"{0} سال میں",other:"{0} سالوں میں"},past:{one:"{0} سال پہلے",other:"{0} سال پہلے"}}},month:{displayName:"مہینہ",relative:{0:"اس ماہ",1:"اگلے ماہ","-1":"گزشتہ ماہ"},relativeTime:{future:{one:"{0} ماہ میں",other:"{0} ماہ میں"},past:{one:"{0} ماہ قبل",other:"{0} ماہ قبل"}}},day:{displayName:"دن",relative:{0:"آج",1:"آئندہ کل",2:"آنے والا پرسوں","-2":"گزشتہ پرسوں","-1":"گزشتہ کل"},relativeTime:{future:{one:"{0} دن میں",other:"{0} دنوں میں"},past:{one:"{0} دن پہلے",other:"{0} دنوں پہلے"}}},hour:{displayName:"گھنٹہ",relative:{0:"اس گھنٹے"},relativeTime:{future:{one:"{0} گھنٹہ میں",other:"{0} گھنٹے میں"},past:{one:"{0} گھنٹہ پہلے",other:"{0} گھنٹے پہلے"}}},minute:{displayName:"منٹ",relative:{0:"اس منٹ"},relativeTime:{future:{one:"{0} منٹ میں",other:"{0} منٹ میں"},past:{one:"{0} منٹ قبل",other:"{0} منٹ قبل"}}},second:{displayName:"سیکنڈ",relative:{0:"اب"},relativeTime:{future:{one:"{0} سیکنڈ میں",other:"{0} سیکنڈ میں"},past:{one:"{0} سیکنڈ قبل",other:"{0} سیکنڈ قبل"}}}}},{locale:"uz",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"yil",relative:{0:"shu yil",1:"keyingi yil","-1":"o‘tgan yil"},relativeTime:{future:{one:"{0} yildan keyin",other:"{0} yildan keyin"},past:{one:"{0} yil oldin",other:"{0} yil oldin"}}},month:{displayName:"oy",relative:{0:"shu oy",1:"keyingi oy","-1":"o‘tgan oy"},relativeTime:{future:{one:"{0} oydan keyin",other:"{0} oydan keyin"},past:{one:"{0} oy oldin",other:"{0} oy oldin"}}},day:{displayName:"kun",relative:{0:"bugun",1:"ertaga","-1":"kecha"},relativeTime:{future:{one:"{0} kundan keyin",other:"{0} kundan keyin"},past:{one:"{0} kun oldin",other:"{0} kun oldin"}}},hour:{displayName:"soat",relative:{0:"shu soatda"},relativeTime:{future:{one:"{0} soatdan keyin",other:"{0} soatdan keyin"},past:{one:"{0} soat oldin",other:"{0} soat oldin"}}},minute:{displayName:"daqiqa",relative:{0:"shu daqiqada"},relativeTime:{future:{one:"{0} daqiqadan keyin",other:"{0} daqiqadan keyin"},past:{one:"{0} daqiqa oldin",other:"{0} daqiqa oldin"}}},second:{displayName:"soniya",relative:{0:"hozir"},relativeTime:{future:{one:"{0} soniyadan keyin",other:"{0} soniyadan keyin"},past:{one:"{0} soniya oldin",other:"{0} soniya oldin"}}}}},{locale:"uz-Arab",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"uz-Cyrl",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Йил",relative:{0:"бу йил",1:"кейинги йил","-1":"ўтган йил"},relativeTime:{future:{one:"{0} йилдан сўнг",other:"{0} йилдан сўнг"},past:{one:"{0} йил аввал",other:"{0} йил аввал"}}},month:{displayName:"Ой",relative:{0:"бу ой",1:"кейинги ой","-1":"ўтган ой"},relativeTime:{future:{one:"{0} ойдан сўнг",other:"{0} ойдан сўнг"},past:{one:"{0} ой аввал",other:"{0} ой аввал"}}},day:{displayName:"Кун",relative:{0:"бугун",1:"эртага","-1":"кеча"},relativeTime:{future:{one:"{0} кундан сўнг",other:"{0} кундан сўнг"},past:{one:"{0} кун олдин",other:"{0} кун олдин"}}},hour:{displayName:"Соат",relative:{0:"this hour"},relativeTime:{future:{one:"{0} соатдан сўнг",other:"{0} соатдан сўнг"},past:{one:"{0} соат олдин",other:"{0} соат олдин"}}},minute:{displayName:"Дақиқа",relative:{0:"this minute"},relativeTime:{future:{one:"{0} дақиқадан сўнг",other:"{0} дақиқадан сўнг"},past:{one:"{0} дақиқа олдин",other:"{0} дақиқа олдин"}}},second:{displayName:"Сония",relative:{0:"ҳозир"},relativeTime:{future:{one:"{0} сониядан сўнг",other:"{0} сониядан сўнг"},past:{one:"{0} сония олдин",other:"{0} сония олдин"}}}}},{locale:"uz-Latn",parentLocale:"uz"},{locale:"vai",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"ꕢꘋ",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"ꕪꖃ",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"ꔎꔒ",relative:{0:"ꗦꗷ",1:"ꔻꕯ","-1":"ꖴꖸ"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"ꕌꕎ",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"ꕆꕇ",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"ꕧꕃꕧꕪ",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"vai-Latn",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"saŋ",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"kalo",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"tele",relative:{0:"wɛlɛ",1:"sina","-1":"kunu"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"hawa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"mini",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"jaki-jaka",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"vai-Vaii",parentLocale:"vai"},{locale:"ve",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"vi",pluralRuleFunction:function(e,t){return t&&1==e?"one":"other"},fields:{year:{displayName:"Năm",relative:{0:"năm nay",1:"năm sau","-1":"năm ngoái"},relativeTime:{future:{other:"sau {0} năm nữa"},past:{other:"{0} năm trước"}}},month:{displayName:"Tháng",relative:{0:"tháng này",1:"tháng sau","-1":"tháng trước"},relativeTime:{future:{other:"sau {0} tháng nữa"},past:{other:"{0} tháng trước"}}},day:{displayName:"Ngày",relative:{0:"Hôm nay",1:"Ngày mai",2:"Ngày kia","-2":"Hôm kia","-1":"Hôm qua"},relativeTime:{future:{other:"sau {0} ngày nữa"},past:{other:"{0} ngày trước"}}},hour:{displayName:"Giờ",relative:{0:"giờ này"},relativeTime:{future:{other:"sau {0} giờ nữa"},past:{other:"{0} giờ trước"}}},minute:{displayName:"Phút",relative:{0:"phút này"},relativeTime:{future:{other:"sau {0} phút nữa"},past:{other:"{0} phút trước"}}},second:{displayName:"Giây",relative:{0:"bây giờ"},relativeTime:{future:{other:"sau {0} giây nữa"},past:{other:"{0} giây trước"}}}}},{locale:"vo",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"vun",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Maka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mori",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Mfiri",relative:{0:"Inu",1:"Ngama","-1":"Ukou"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Saa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Dakyika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"wa",pluralRuleFunction:function(e,t){return t?"other":0==e||1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"wae",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Jár",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"I {0} jár",other:"I {0} jár"},past:{one:"vor {0} jár",other:"cor {0} jár"}}},month:{displayName:"Mánet",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"I {0} mánet",other:"I {0} mánet"},past:{one:"vor {0} mánet",other:"vor {0} mánet"}}},day:{displayName:"Tag",relative:{0:"Hitte",1:"Móre",2:"Ubermóre","-2":"Vorgešter","-1":"Gešter"},relativeTime:{future:{one:"i {0} tag",other:"i {0} täg"},past:{one:"vor {0} tag",other:"vor {0} täg"}}},hour:{displayName:"Schtund",relative:{0:"this hour"},relativeTime:{future:{one:"i {0} stund",other:"i {0} stunde"},past:{one:"vor {0} stund",other:"vor {0} stunde"}}},minute:{displayName:"Mínütta",relative:{0:"this minute"},relativeTime:{future:{one:"i {0} minüta",other:"i {0} minüte"},past:{one:"vor {0} minüta",other:"vor {0} minüte"}}},second:{displayName:"Sekunda",relative:{0:"now"},relativeTime:{future:{one:"i {0} sekund",other:"i {0} sekunde"},past:{one:"vor {0} sekund",other:"vor {0} sekunde"}}}}},{locale:"wo",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"xh",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"xog",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Omwaka",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Omwezi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Olunaku",relative:{0:"Olwaleelo (leelo)",1:"Enkyo","-1":"Edho"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Essawa",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Edakiika",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Obutikitiki",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"yav",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"yɔɔŋ",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"oóli",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"puɔ́sɛ́",relative:{0:"ínaan",1:"nakinyám","-1":"púyoó"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"kisikɛl,",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"minít",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"síkɛn",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"yi",pluralRuleFunction:function(e,t){var a=!String(e).split(".")[1];return t?"other":1==e&&a?"one":"other"},fields:{year:{displayName:"יאָר",relative:{0:"הײַ יאָר",1:"איבער א יאָר","-1":"פֿאַראַיאָר"},relativeTime:{future:{one:"איבער {0} יאָר",other:"איבער {0} יאָר"},past:{one:"פֿאַר {0} יאָר",other:"פֿאַר {0} יאָר"}}},month:{displayName:"מאנאַט",relative:{0:"דעם חודש",1:"קומענדיקן חודש","-1":"פֿאַרגאנגענעם חודש"},relativeTime:{future:{one:"איבער {0} חודש",other:"איבער {0} חדשים"},past:{one:"פֿאַר {0} חודש",other:"פֿאַר {0} חדשים"}}},day:{displayName:"טאָג",relative:{0:"היינט",1:"מארגן","-1":"נעכטן"},relativeTime:{future:{one:"אין {0} טאָג אַרום",other:"אין {0} טעג אַרום"},past:{other:"-{0} d"}}},hour:{displayName:"שעה",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"מינוט",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"סעקונדע",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"yo",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Ọdún",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Osù",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ọjọ́",relative:{0:"Òní",1:"Ọ̀la",2:"òtúùnla","-2":"íjẹta","-1":"Àná"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"wákàtí",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Ìsẹ́jú",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Ìsẹ́jú Ààyá",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"yo-BJ",parentLocale:"yo",fields:{year:{displayName:"Ɔdún",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Osù",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Ɔjɔ́",relative:{0:"Òní",1:"Ɔ̀la",2:"òtúùnla","-2":"íjɛta","-1":"Àná"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"wákàtí",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Ìsɛ́jú",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Ìsɛ́jú Ààyá",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"yue",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"年",relative:{0:"今年",1:"下年","-1":"舊年"},relativeTime:{future:{other:"{0} 年後"},past:{other:"{0} 年前"}}},month:{displayName:"月",relative:{0:"今個月",1:"下個月","-1":"上個月"},relativeTime:{future:{other:"{0} 個月後"},past:{other:"{0} 個月前"}}},day:{displayName:"日",relative:{0:"今日",1:"聽日",2:"後天","-2":"前天","-1":"尋日"},relativeTime:{future:{other:"{0} 日後"},past:{other:"{0} 日前"}}},hour:{displayName:"小時",relative:{0:"呢個小時"},relativeTime:{future:{other:"{0} 小時後"},past:{other:"{0} 小時前"}}},minute:{displayName:"分鐘",relative:{0:"呢分鐘"},relativeTime:{future:{other:"{0} 分鐘後"},past:{other:"{0} 分鐘前"}}},second:{displayName:"秒",relative:{0:"宜家"},relativeTime:{future:{other:"{0} 秒後"},past:{other:"{0} 秒前"}}}}},{locale:"yue-Hans",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"zgh",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"ⴰⵙⴳⴳⵯⴰⵙ",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"ⴰⵢⵢⵓⵔ",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"ⴰⵙⵙ",relative:{0:"ⴰⵙⵙⴰ",1:"ⴰⵙⴽⴽⴰ","-1":"ⵉⴹⵍⵍⵉ"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"ⵜⴰⵙⵔⴰⴳⵜ",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"ⵜⵓⵙⴷⵉⴷⵜ",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"ⵜⴰⵙⵉⵏⵜ",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"zh",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"年",relative:{0:"今年",1:"明年","-1":"去年"},relativeTime:{future:{other:"{0}年后"},past:{other:"{0}年前"}}},month:{displayName:"月",relative:{0:"本月",1:"下个月","-1":"上个月"},relativeTime:{future:{other:"{0}个月后"},past:{other:"{0}个月前"}}},day:{displayName:"日",relative:{0:"今天",1:"明天",2:"后天","-2":"前天","-1":"昨天"},relativeTime:{future:{other:"{0}天后"},past:{other:"{0}天前"}}},hour:{displayName:"小时",relative:{0:"这一时间 / 此时"},relativeTime:{future:{other:"{0}小时后"},past:{other:"{0}小时前"}}},minute:{displayName:"分钟",relative:{0:"此刻"},relativeTime:{future:{other:"{0}分钟后"},past:{other:"{0}分钟前"}}},second:{displayName:"秒",relative:{0:"现在"},relativeTime:{future:{other:"{0}秒钟后"},past:{other:"{0}秒钟前"}}}}},{locale:"zh-Hans",parentLocale:"zh"},{locale:"zh-Hans-HK",parentLocale:"zh-Hans",fields:{year:{displayName:"年",relative:{0:"今年",1:"明年","-1":"去年"},relativeTime:{future:{other:"{0}年后"},past:{other:"{0}年前"}}},month:{displayName:"月",relative:{0:"本月",1:"下个月","-1":"上个月"},relativeTime:{future:{other:"{0}个月后"},past:{other:"{0}个月前"}}},day:{displayName:"日",relative:{0:"今天",1:"明天",2:"后天","-2":"前天","-1":"昨天"},relativeTime:{future:{other:"{0}天后"},past:{other:"{0}天前"}}},hour:{displayName:"小时",relative:{0:"这一时间 / 此时"},relativeTime:{future:{other:"{0}小时后"},past:{other:"{0}小时前"}}},minute:{displayName:"分钟",relative:{0:"此刻"},relativeTime:{future:{other:"{0}分钟后"},past:{other:"{0}分钟前"}}},second:{displayName:"秒",relative:{0:"现在"},relativeTime:{future:{other:"{0}秒后"},past:{other:"{0}秒前"}}}}},{locale:"zh-Hans-MO",parentLocale:"zh-Hans",fields:{year:{displayName:"年",relative:{0:"今年",1:"明年","-1":"去年"},relativeTime:{future:{other:"{0}年后"},past:{other:"{0}年前"}}},month:{displayName:"月",relative:{0:"本月",1:"下个月","-1":"上个月"},relativeTime:{future:{other:"{0}个月后"},past:{other:"{0}个月前"}}},day:{displayName:"日",relative:{0:"今天",1:"明天",2:"后天","-2":"前天","-1":"昨天"},relativeTime:{future:{other:"{0}天后"},past:{other:"{0}天前"}}},hour:{displayName:"小时",relative:{0:"这一时间 / 此时"},relativeTime:{future:{other:"{0}小时后"},past:{other:"{0}小时前"}}},minute:{displayName:"分钟",relative:{0:"此刻"},relativeTime:{future:{other:"{0}分钟后"},past:{other:"{0}分钟前"}}},second:{displayName:"秒",relative:{0:"现在"},relativeTime:{future:{other:"{0}秒后"},past:{other:"{0}秒前"}}}}},{locale:"zh-Hans-SG",parentLocale:"zh-Hans",fields:{year:{displayName:"年",relative:{0:"今年",1:"明年","-1":"去年"},relativeTime:{future:{other:"{0}年后"},past:{other:"{0}年前"}}},month:{displayName:"月",relative:{0:"本月",1:"下个月","-1":"上个月"},relativeTime:{future:{other:"{0}个月后"},past:{other:"{0}个月前"}}},day:{displayName:"日",relative:{0:"今天",1:"明天",2:"后天","-2":"前天","-1":"昨天"},relativeTime:{future:{other:"{0}天后"},past:{other:"{0}天前"}}},hour:{displayName:"小时",relative:{0:"这一时间 / 此时"},relativeTime:{future:{other:"{0}小时后"},past:{other:"{0}小时前"}}},minute:{displayName:"分钟",relative:{0:"此刻"},relativeTime:{future:{other:"{0}分钟后"},past:{other:"{0}分钟前"}}},second:{displayName:"秒",relative:{0:"现在"},relativeTime:{future:{other:"{0}秒后"},past:{other:"{0}秒前"}}}}},{locale:"zh-Hant",pluralRuleFunction:function(e,t){return "other"},fields:{year:{displayName:"年",relative:{0:"今年",1:"明年","-1":"去年"},relativeTime:{future:{other:"{0} 年後"},past:{other:"{0} 年前"}}},month:{displayName:"月",relative:{0:"本月",1:"下個月","-1":"上個月"},relativeTime:{future:{other:"{0} 個月後"},past:{other:"{0} 個月前"}}},day:{displayName:"日",relative:{0:"今天",1:"明天",2:"後天","-2":"前天","-1":"昨天"},relativeTime:{future:{other:"{0} 天後"},past:{other:"{0} 天前"}}},hour:{displayName:"小時",relative:{0:"這一小時"},relativeTime:{future:{other:"{0} 小時後"},past:{other:"{0} 小時前"}}},minute:{displayName:"分鐘",relative:{0:"這一分鐘"},relativeTime:{future:{other:"{0} 分鐘後"},past:{other:"{0} 分鐘前"}}},second:{displayName:"秒",relative:{0:"現在"},relativeTime:{future:{other:"{0} 秒後"},past:{other:"{0} 秒前"}}}}},{locale:"zh-Hant-HK",parentLocale:"zh-Hant",fields:{year:{displayName:"年",relative:{0:"今年",1:"下年","-1":"上年"},relativeTime:{future:{other:"{0} 年後"},past:{other:"{0} 年前"}}},month:{displayName:"月",relative:{0:"本月",1:"下個月","-1":"上個月"},relativeTime:{future:{other:"{0} 個月後"},past:{other:"{0} 個月前"}}},day:{displayName:"日",relative:{0:"今日",1:"明日",2:"後日","-2":"前日","-1":"昨日"},relativeTime:{future:{other:"{0} 日後"},past:{other:"{0} 日前"}}},hour:{displayName:"小時",relative:{0:"這個小時"},relativeTime:{future:{other:"{0} 小時後"},past:{other:"{0} 小時前"}}},minute:{displayName:"分鐘",relative:{0:"這分鐘"},relativeTime:{future:{other:"{0} 分鐘後"},past:{other:"{0} 分鐘前"}}},second:{displayName:"秒",relative:{0:"現在"},relativeTime:{future:{other:"{0} 秒後"},past:{other:"{0} 秒前"}}}}},{locale:"zh-Hant-MO",parentLocale:"zh-Hant-HK"},{locale:"zu",pluralRuleFunction:function(e,t){return t?"other":e>=0&&e<=1?"one":"other"},fields:{year:{displayName:"Unyaka",relative:{0:"kulo nyaka",1:"unyaka ozayo","-1":"onyakeni odlule"},relativeTime:{future:{one:"onyakeni ongu-{0} ozayo",other:"eminyakeni engu-{0} ezayo"},past:{one:"{0} unyaka odlule",other:"{0} iminyaka edlule"}}},month:{displayName:"Inyanga",relative:{0:"le nyanga",1:"inyanga ezayo","-1":"inyanga edlule"},relativeTime:{future:{one:"enyangeni engu-{0}",other:"ezinyangeni ezingu-{0} ezizayo"},past:{one:"{0} inyanga edlule",other:"{0} izinyanga ezedlule"}}},day:{displayName:"Usuku",relative:{0:"namhlanje",1:"kusasa",2:"usuku olulandela olwakusasa","-2":"usuku olwandulela olwayizolo","-1":"izolo"},relativeTime:{future:{one:"osukwini olungu-{0} oluzayo",other:"ezinsukwini ezingu-{0} ezizayo"},past:{one:"osukwini olungu-{0} olwedlule",other:"ezinsukwini ezingu-{0} ezedlule."}}},hour:{displayName:"Ihora",relative:{0:"leli hora"},relativeTime:{future:{one:"ehoreni elingu-{0} elizayo",other:"emahoreni angu-{0} ezayo"},past:{one:"{0} ihora eledlule",other:"emahoreni angu-{0} edlule"}}},minute:{displayName:"Iminithi",relative:{0:"leli minithi"},relativeTime:{future:{one:"kuminithi elingu-{0} elizayo",other:"kumaminithi angu-{0} ezayo"},past:{one:"{0} iminithi eledlule",other:"{0} amaminithi edlule"}}},second:{displayName:"Isekhondi",relative:{0:"manje"},relativeTime:{future:{one:"kusekhondi elingu-{0} elizayo",other:"kumasekhondi angu-{0} ezayo"},past:{one:"{0} isekhondi eledlule",other:"{0} amasekhondi edlule"}}}}}]});
});

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

var hop = Object.prototype.hasOwnProperty;

function extend(obj) {
    var sources = Array.prototype.slice.call(arguments, 1),
        i, len, source, key;

    for (i = 0, len = sources.length; i < len; i += 1) {
        source = sources[i];
        if (!source) { continue; }

        for (key in source) {
            if (hop.call(source, key)) {
                obj[key] = source[key];
            }
        }
    }

    return obj;
}

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var defineProperty$2 = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (hop.call(props, k)) {
            defineProperty$2(obj, k, props[k]);
        }
    }

    return obj;
};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

function Compiler(locales, formats, pluralFn) {
    this.locales  = locales;
    this.formats  = formats;
    this.pluralFn = pluralFn;
}

Compiler.prototype.compile = function (ast) {
    this.pluralStack        = [];
    this.currentPlural      = null;
    this.pluralNumberFormat = null;

    return this.compileMessage(ast);
};

Compiler.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new Error('Message AST is not of type: "messageFormatPattern"');
    }

    var elements = ast.elements,
        pattern  = [];

    var i, len, element;

    for (i = 0, len = elements.length; i < len; i += 1) {
        element = elements[i];

        switch (element.type) {
            case 'messageTextElement':
                pattern.push(this.compileMessageText(element));
                break;

            case 'argumentElement':
                pattern.push(this.compileArgument(element));
                break;

            default:
                throw new Error('Message element does not have a valid type');
        }
    }

    return pattern;
};

Compiler.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
        // Create a cache a NumberFormat instance that can be reused for any
        // PluralOffsetString instance in this message.
        if (!this.pluralNumberFormat) {
            this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
        }

        return new PluralOffsetString(
                this.currentPlural.id,
                this.currentPlural.format.offset,
                this.pluralNumberFormat,
                element.value);
    }

    // Unescape the escaped '#'s in the message text.
    return element.value.replace(/\\#/g, '#');
};

Compiler.prototype.compileArgument = function (element) {
    var format = element.format;

    if (!format) {
        return new StringFormat(element.id);
    }

    var formats  = this.formats,
        locales  = this.locales,
        pluralFn = this.pluralFn,
        options;

    switch (format.type) {
        case 'numberFormat':
            options = formats.number[format.style];
            return {
                id    : element.id,
                format: new Intl.NumberFormat(locales, options).format
            };

        case 'dateFormat':
            options = formats.date[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'timeFormat':
            options = formats.time[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'pluralFormat':
            options = this.compileOptions(element);
            return new PluralFormat(
                element.id, format.ordinal, format.offset, options, pluralFn
            );

        case 'selectFormat':
            options = this.compileOptions(element);
            return new SelectFormat(element.id, options);

        default:
            throw new Error('Message element does not have a valid format type');
    }
};

Compiler.prototype.compileOptions = function (element) {
    var format      = element.format,
        options     = format.options,
        optionsHash = {};

    // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.
    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;

    var i, len, option;

    for (i = 0, len = options.length; i < len; i += 1) {
        option = options[i];

        // Compile the sub-pattern and save it under the options's selector.
        optionsHash[option.selector] = this.compileMessage(option.value);
    }

    // Pop the plural stack to put back the original current plural value.
    this.currentPlural = this.pluralStack.pop();

    return optionsHash;
};

// -- Compiler Helper Classes --------------------------------------------------

function StringFormat(id) {
    this.id = id;
}

StringFormat.prototype.format = function (value) {
    if (!value && typeof value !== 'number') {
        return '';
    }

    return typeof value === 'string' ? value : String(value);
};

function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id         = id;
    this.useOrdinal = useOrdinal;
    this.offset     = offset;
    this.options    = options;
    this.pluralFn   = pluralFn;
}

PluralFormat.prototype.getOption = function (value) {
    var options = this.options;

    var option = options['=' + value] ||
            options[this.pluralFn(value - this.offset, this.useOrdinal)];

    return option || options.other;
};

function PluralOffsetString(id, offset, numberFormat, string) {
    this.id           = id;
    this.offset       = offset;
    this.numberFormat = numberFormat;
    this.string       = string;
}

PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);

    return this.string
            .replace(/(^|[^\\])#/g, '$1' + number)
            .replace(/\\#/g, '#');
};

function SelectFormat(id, options) {
    this.id      = id;
    this.options = options;
}

SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
};

var parser = (function() {

  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = function(elements) {
                return {
                    type    : 'messageFormatPattern',
                    elements: elements,
                    location: location()
                };
            },
        peg$c1 = function(text) {
                var string = '',
                    i, j, outerLen, inner, innerLen;

                for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
                    inner = text[i];

                    for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
                        string += inner[j];
                    }
                }

                return string;
            },
        peg$c2 = function(messageText) {
                return {
                    type : 'messageTextElement',
                    value: messageText,
                    location: location()
                };
            },
        peg$c3 = /^[^ \t\n\r,.+={}#]/,
        peg$c4 = { type: "class", value: "[^ \\t\\n\\r,.+={}#]", description: "[^ \\t\\n\\r,.+={}#]" },
        peg$c5 = "{",
        peg$c6 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c7 = ",",
        peg$c8 = { type: "literal", value: ",", description: "\",\"" },
        peg$c9 = "}",
        peg$c10 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c11 = function(id, format) {
                return {
                    type  : 'argumentElement',
                    id    : id,
                    format: format && format[2],
                    location: location()
                };
            },
        peg$c12 = "number",
        peg$c13 = { type: "literal", value: "number", description: "\"number\"" },
        peg$c14 = "date",
        peg$c15 = { type: "literal", value: "date", description: "\"date\"" },
        peg$c16 = "time",
        peg$c17 = { type: "literal", value: "time", description: "\"time\"" },
        peg$c18 = function(type, style) {
                return {
                    type : type + 'Format',
                    style: style && style[2],
                    location: location()
                };
            },
        peg$c19 = "plural",
        peg$c20 = { type: "literal", value: "plural", description: "\"plural\"" },
        peg$c21 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: false,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options,
                    location: location()
                };
            },
        peg$c22 = "selectordinal",
        peg$c23 = { type: "literal", value: "selectordinal", description: "\"selectordinal\"" },
        peg$c24 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: true,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options,
                    location: location()
                }
            },
        peg$c25 = "select",
        peg$c26 = { type: "literal", value: "select", description: "\"select\"" },
        peg$c27 = function(options) {
                return {
                    type   : 'selectFormat',
                    options: options,
                    location: location()
                };
            },
        peg$c28 = "=",
        peg$c29 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c30 = function(selector, pattern) {
                return {
                    type    : 'optionalFormatPattern',
                    selector: selector,
                    value   : pattern,
                    location: location()
                };
            },
        peg$c31 = "offset:",
        peg$c32 = { type: "literal", value: "offset:", description: "\"offset:\"" },
        peg$c33 = function(number) {
                return number;
            },
        peg$c34 = function(offset, options) {
                return {
                    type   : 'pluralFormat',
                    offset : offset,
                    options: options,
                    location: location()
                };
            },
        peg$c35 = { type: "other", description: "whitespace" },
        peg$c36 = /^[ \t\n\r]/,
        peg$c37 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
        peg$c38 = { type: "other", description: "optionalWhitespace" },
        peg$c39 = /^[0-9]/,
        peg$c40 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c41 = /^[0-9a-f]/i,
        peg$c42 = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" },
        peg$c43 = "0",
        peg$c44 = { type: "literal", value: "0", description: "\"0\"" },
        peg$c45 = /^[1-9]/,
        peg$c46 = { type: "class", value: "[1-9]", description: "[1-9]" },
        peg$c47 = function(digits) {
            return parseInt(digits, 10);
        },
        peg$c48 = /^[^{}\\\0-\x1F \t\n\r]/,
        peg$c49 = { type: "class", value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]", description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]" },
        peg$c50 = "\\\\",
        peg$c51 = { type: "literal", value: "\\\\", description: "\"\\\\\\\\\"" },
        peg$c52 = function() { return '\\'; },
        peg$c53 = "\\#",
        peg$c54 = { type: "literal", value: "\\#", description: "\"\\\\#\"" },
        peg$c55 = function() { return '\\#'; },
        peg$c56 = "\\{",
        peg$c57 = { type: "literal", value: "\\{", description: "\"\\\\{\"" },
        peg$c58 = function() { return '\u007B'; },
        peg$c59 = "\\}",
        peg$c60 = { type: "literal", value: "\\}", description: "\"\\\\}\"" },
        peg$c61 = function() { return '\u007D'; },
        peg$c62 = "\\u",
        peg$c63 = { type: "literal", value: "\\u", description: "\"\\\\u\"" },
        peg$c64 = function(digits) {
                return String.fromCharCode(parseInt(digits, 16));
            },
        peg$c65 = function(chars) { return chars.join(''); },

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parsemessageFormatPattern();

      return s0;
    }

    function peg$parsemessageFormatPattern() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsemessageFormatElement();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsemessageFormatElement();
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c0(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsemessageFormatElement() {
      var s0;

      s0 = peg$parsemessageTextElement();
      if (s0 === peg$FAILED) {
        s0 = peg$parseargumentElement();
      }

      return s0;
    }

    function peg$parsemessageText() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s4 = peg$parsechars();
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsechars();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s3 = [s3, s4, s5];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsews();
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsemessageTextElement() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsemessageText();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c2(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseargument() {
      var s0, s1, s2;

      s0 = peg$parsenumber();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c3.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c4); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c3.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c4); }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseargumentElement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c5;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c6); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseargument();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 44) {
                s6 = peg$c7;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c8); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseelementFormat();
                  if (s8 !== peg$FAILED) {
                    s6 = [s6, s7, s8];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s7 = peg$c9;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c10); }
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c11(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseelementFormat() {
      var s0;

      s0 = peg$parsesimpleFormat();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepluralFormat();
        if (s0 === peg$FAILED) {
          s0 = peg$parseselectOrdinalFormat();
          if (s0 === peg$FAILED) {
            s0 = peg$parseselectFormat();
          }
        }
      }

      return s0;
    }

    function peg$parsesimpleFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c12) {
        s1 = peg$c12;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c13); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c14) {
          s1 = peg$c14;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c15); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c16) {
            s1 = peg$c16;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c7;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsechars();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c18(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsepluralFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c19) {
        s1 = peg$c19;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c20); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c7;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c21(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselectOrdinalFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 13) === peg$c22) {
        s1 = peg$c22;
        peg$currPos += 13;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c7;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c24(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselectFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c25) {
        s1 = peg$c25;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c7;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseoptionalFormatPattern();
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parseoptionalFormatPattern();
                }
              } else {
                s5 = peg$FAILED;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c27(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselector() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s2 = peg$c28;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenumber();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parsechars();
      }

      return s0;
    }

    function peg$parseoptionalFormatPattern() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseselector();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c5;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsemessageFormatPattern();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s8 = peg$c9;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c10); }
                    }
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c30(s2, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseoffset() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c31) {
        s1 = peg$c31;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c33(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsepluralStyle() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseoffset();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseoptionalFormatPattern();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseoptionalFormatPattern();
            }
          } else {
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c34(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsews() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      if (peg$c36.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c37); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c36.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c37); }
          }
        }
      } else {
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsews();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsews();
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }

      return s0;
    }

    function peg$parsedigit() {
      var s0;

      if (peg$c39.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }

      return s0;
    }

    function peg$parsehexDigit() {
      var s0;

      if (peg$c41.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c42); }
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 48) {
        s1 = peg$c43;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c44); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$currPos;
        if (peg$c45.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c46); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsedigit();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsedigit();
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c47(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsechar() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      if (peg$c48.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c50) {
          s1 = peg$c50;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c51); }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c52();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c53) {
            s1 = peg$c53;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c54); }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c55();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c56) {
              s1 = peg$c56;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c57); }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c58();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c59) {
                s1 = peg$c59;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c60); }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c61();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c62) {
                  s1 = peg$c62;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c63); }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  s3 = peg$currPos;
                  s4 = peg$parsehexDigit();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsehexDigit();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parsehexDigit();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parsehexDigit();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                  if (s3 !== peg$FAILED) {
                    s2 = input.substring(s2, peg$currPos);
                  } else {
                    s2 = s3;
                  }
                  if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c64(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsechars() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsechar();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsechar();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c65(s1);
      }
      s0 = s1;

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})();

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

// -- MessageFormat --------------------------------------------------------

function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ?
            MessageFormat.__parse(message) : message;

    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new TypeError('A message must be provided as a String or AST.');
    }

    // Creates a new object with the specified `formats` merged with the default
    // formats.
    formats = this._mergeFormats(MessageFormat.formats, formats);

    // Defined first because it's used to build the format pattern.
    defineProperty$2(this, '_locale',  {value: this._resolveLocale(locales)});

    // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.
    var pluralFn = this._findPluralRuleFunction(this._locale);
    var pattern  = this._compilePattern(ast, locales, formats, pluralFn);

    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var messageFormat = this;
    this.format = function (values) {
      try {
        return messageFormat._format(pattern, values);
      } catch (e) {
        if (e.variableId) {
          throw new Error(
            'The intl string context variable \'' + e.variableId + '\'' +
            ' was not provided to the string \'' + message + '\''
          );
        } else {
          throw e;
        }
      }
    };
}

// Default format options used as the prototype of the `formats` provided to the
// constructor. These are used when constructing the internal Intl.NumberFormat
// and Intl.DateTimeFormat instances.
defineProperty$2(MessageFormat, 'formats', {
    enumerable: true,

    value: {
        number: {
            'currency': {
                style: 'currency'
            },

            'percent': {
                style: 'percent'
            }
        },

        date: {
            'short': {
                month: 'numeric',
                day  : 'numeric',
                year : '2-digit'
            },

            'medium': {
                month: 'short',
                day  : 'numeric',
                year : 'numeric'
            },

            'long': {
                month: 'long',
                day  : 'numeric',
                year : 'numeric'
            },

            'full': {
                weekday: 'long',
                month  : 'long',
                day    : 'numeric',
                year   : 'numeric'
            }
        },

        time: {
            'short': {
                hour  : 'numeric',
                minute: 'numeric'
            },

            'medium':  {
                hour  : 'numeric',
                minute: 'numeric',
                second: 'numeric'
            },

            'long': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            },

            'full': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            }
        }
    }
});

// Define internal private properties for dealing with locale data.
defineProperty$2(MessageFormat, '__localeData__', {value: objCreate(null)});
defineProperty$2(MessageFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlMessageFormat is missing a ' +
            '`locale` property'
        );
    }

    MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
}});

// Defines `__parse()` static method as an exposed private.
defineProperty$2(MessageFormat, '__parse', {value: parser.parse});

// Define public `defaultLocale` property which defaults to English, but can be
// set by the developer.
defineProperty$2(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable  : true,
    value     : undefined
});

MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
        locale: this._locale
    };
};

MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler = new Compiler(locales, formats, pluralFn);
    return compiler.compile(ast);
};

MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data       = localeData[locale.toLowerCase()];

    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.
    while (data) {
        if (data.pluralRuleFunction) {
            return data.pluralRuleFunction;
        }

        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error(
        'Locale data added to IntlMessageFormat is missing a ' +
        '`pluralRuleFunction` for :' + locale
    );
};

MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
        i, len, part, id, value, err;

    for (i = 0, len = pattern.length; i < len; i += 1) {
        part = pattern[i];

        // Exist early for string parts.
        if (typeof part === 'string') {
            result += part;
            continue;
        }

        id = part.id;

        // Enforce that all required values are provided by the caller.
        if (!(values && hop.call(values, id))) {
          err = new Error('A value must be provided for: ' + id);
          err.variableId = id;
          throw err;
        }

        value = values[id];

        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (part.options) {
            result += this._format(part.getOption(value), values);
        } else {
            result += part.format(value);
        }
    }

    return result;
};

MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
        type, mergedType;

    for (type in defaults) {
        if (!hop.call(defaults, type)) { continue; }

        mergedFormats[type] = mergedType = objCreate(defaults[type]);

        if (formats && hop.call(formats, type)) {
            extend(mergedType, formats[type]);
        }
    }

    return mergedFormats;
};

MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }

    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(MessageFormat.defaultLocale);

    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data;

    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');

        while (localeParts.length) {
            data = localeData[localeParts.join('-')];
            if (data) {
                // Return the normalized locale string; e.g., we return "en-US",
                // instead of "en-us".
                return data.locale;
            }

            localeParts.pop();
        }
    }

    var defaultLocale = locales.pop();
    throw new Error(
        'No locale data has been added to IntlMessageFormat for: ' +
        locales.join(', ') + ', or the default locale: ' + defaultLocale
    );
};

// GENERATED FILE
var defaultLocale = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}};

/* jslint esnext: true */

MessageFormat.__addLocaleData(defaultLocale);
MessageFormat.defaultLocale = 'en';

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

var round = Math.round;

function daysToYears(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    return days * 400 / 146097;
}

function diff (from, to) {
    // Convert to ms timestamps.
    from = +from;
    to   = +to;

    var millisecond = round(to - from),
        second      = round(millisecond / 1000),
        minute      = round(second / 60),
        hour        = round(minute / 60),
        day         = round(hour / 24),
        week        = round(day / 7);

    var rawYears = daysToYears(day),
        month    = round(rawYears * 12),
        year     = round(rawYears);

    return {
        millisecond    : millisecond,
        second         : second,
        'second-short' : second,
        minute         : minute,
        'minute-short' : minute,
        hour           : hour,
        'hour-short'   : hour,
        day            : day,
        'day-short'    : day,
        week           : week,
        'week-short'   : week,
        month          : month,
        'month-short'  : month,
        year           : year,
        'year-short'   : year
    };
}

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var hop$1 = Object.prototype.hasOwnProperty;
var toString$2 = Object.prototype.toString;

var realDefineProp$1 = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var defineProperty$3 = realDefineProp$1 ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!hop$1.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate$1 = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (hop$1.call(props, k)) {
            defineProperty$3(obj, k, props[k]);
        }
    }

    return obj;
};

var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
    /*jshint validthis:true */
    var arr = this;
    if (!arr.length) {
        return -1;
    }

    for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
        if (arr[i] === search) {
            return i;
        }
    }

    return -1;
};

var isArray = Array.isArray || function (obj) {
    return toString$2.call(obj) === '[object Array]';
};

var dateNow = Date.now || function () {
    return new Date().getTime();
};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

// -----------------------------------------------------------------------------

var FIELDS = [
    'second', 'second-short',
    'minute', 'minute-short',
    'hour', 'hour-short',
    'day', 'day-short',
    'month', 'month-short',
    'year', 'year-short'
];
var STYLES = ['best fit', 'numeric'];

// -- RelativeFormat -----------------------------------------------------------

function RelativeFormat(locales, options) {
    options = options || {};

    // Make a copy of `locales` if it's an array, so that it doesn't change
    // since it's used lazily.
    if (isArray(locales)) {
        locales = locales.concat();
    }

    defineProperty$3(this, '_locale', {value: this._resolveLocale(locales)});
    defineProperty$3(this, '_options', {value: {
        style: this._resolveStyle(options.style),
        units: this._isValidUnits(options.units) && options.units
    }});

    defineProperty$3(this, '_locales', {value: locales});
    defineProperty$3(this, '_fields', {value: this._findFields(this._locale)});
    defineProperty$3(this, '_messages', {value: objCreate$1(null)});

    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var relativeFormat = this;
    this.format = function format(date, options) {
        return relativeFormat._format(date, options);
    };
}

// Define internal private properties for dealing with locale data.
defineProperty$3(RelativeFormat, '__localeData__', {value: objCreate$1(null)});
defineProperty$3(RelativeFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlRelativeFormat is missing a ' +
            '`locale` property value'
        );
    }

    RelativeFormat.__localeData__[data.locale.toLowerCase()] = data;

    // Add data to IntlMessageFormat.
    MessageFormat.__addLocaleData(data);
}});

// Define public `defaultLocale` property which can be set by the developer, or
// it will be set when the first RelativeFormat instance is created by
// leveraging the resolved locale from `Intl`.
defineProperty$3(RelativeFormat, 'defaultLocale', {
    enumerable: true,
    writable  : true,
    value     : undefined
});

// Define public `thresholds` property which can be set by the developer, and
// defaults to relative time thresholds from moment.js.
defineProperty$3(RelativeFormat, 'thresholds', {
    enumerable: true,

    value: {
        second: 45, 'second-short': 45,  // seconds to minute
        minute: 45, 'minute-short': 45, // minutes to hour
        hour  : 22, 'hour-short': 22, // hours to day
        day   : 26, 'day-short': 26, // days to month
        month : 11, 'month-short': 11 // months to year
    }
});

RelativeFormat.prototype.resolvedOptions = function () {
    return {
        locale: this._locale,
        style : this._options.style,
        units : this._options.units
    };
};

RelativeFormat.prototype._compileMessage = function (units) {
    // `this._locales` is the original set of locales the user specified to the
    // constructor, while `this._locale` is the resolved root locale.
    var locales        = this._locales;
    var resolvedLocale = this._locale;

    var field        = this._fields[units];
    var relativeTime = field.relativeTime;
    var future       = '';
    var past         = '';
    var i;

    for (i in relativeTime.future) {
        if (relativeTime.future.hasOwnProperty(i)) {
            future += ' ' + i + ' {' +
                relativeTime.future[i].replace('{0}', '#') + '}';
        }
    }

    for (i in relativeTime.past) {
        if (relativeTime.past.hasOwnProperty(i)) {
            past += ' ' + i + ' {' +
                relativeTime.past[i].replace('{0}', '#') + '}';
        }
    }

    var message = '{when, select, future {{0, plural, ' + future + '}}' +
                                 'past {{0, plural, ' + past + '}}}';

    // Create the synthetic IntlMessageFormat instance using the original
    // locales value specified by the user when constructing the the parent
    // IntlRelativeFormat instance.
    return new MessageFormat(message, locales);
};

RelativeFormat.prototype._getMessage = function (units) {
    var messages = this._messages;

    // Create a new synthetic message based on the locale data from CLDR.
    if (!messages[units]) {
        messages[units] = this._compileMessage(units);
    }

    return messages[units];
};

RelativeFormat.prototype._getRelativeUnits = function (diff$$1, units) {
    var field = this._fields[units];

    if (field.relative) {
        return field.relative[diff$$1];
    }
};

RelativeFormat.prototype._findFields = function (locale) {
    var localeData = RelativeFormat.__localeData__;
    var data       = localeData[locale.toLowerCase()];

    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find `fields` to return.
    while (data) {
        if (data.fields) {
            return data.fields;
        }

        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error(
        'Locale data added to IntlRelativeFormat is missing `fields` for :' +
        locale
    );
};

RelativeFormat.prototype._format = function (date, options) {
    var now = options && options.now !== undefined ? options.now : dateNow();

    if (date === undefined) {
        date = now;
    }

    // Determine if the `date` and optional `now` values are valid, and throw a
    // similar error to what `Intl.DateTimeFormat#format()` would throw.
    if (!isFinite(now)) {
        throw new RangeError(
            'The `now` option provided to IntlRelativeFormat#format() is not ' +
            'in valid range.'
        );
    }

    if (!isFinite(date)) {
        throw new RangeError(
            'The date value provided to IntlRelativeFormat#format() is not ' +
            'in valid range.'
        );
    }

    var diffReport  = diff(now, date);
    var units       = this._options.units || this._selectUnits(diffReport);
    var diffInUnits = diffReport[units];

    if (this._options.style !== 'numeric') {
        var relativeUnits = this._getRelativeUnits(diffInUnits, units);
        if (relativeUnits) {
            return relativeUnits;
        }
    }

    return this._getMessage(units).format({
        '0' : Math.abs(diffInUnits),
        when: diffInUnits < 0 ? 'past' : 'future'
    });
};

RelativeFormat.prototype._isValidUnits = function (units) {
    if (!units || arrIndexOf.call(FIELDS, units) >= 0) {
        return true;
    }

    if (typeof units === 'string') {
        var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);
        if (suggestion && arrIndexOf.call(FIELDS, suggestion) >= 0) {
            throw new Error(
                '"' + units + '" is not a valid IntlRelativeFormat `units` ' +
                'value, did you mean: ' + suggestion
            );
        }
    }

    throw new Error(
        '"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' +
        'must be one of: "' + FIELDS.join('", "') + '"'
    );
};

RelativeFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }

    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(RelativeFormat.defaultLocale);

    var localeData = RelativeFormat.__localeData__;
    var i, len, localeParts, data;

    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');

        while (localeParts.length) {
            data = localeData[localeParts.join('-')];
            if (data) {
                // Return the normalized locale string; e.g., we return "en-US",
                // instead of "en-us".
                return data.locale;
            }

            localeParts.pop();
        }
    }

    var defaultLocale = locales.pop();
    throw new Error(
        'No locale data has been added to IntlRelativeFormat for: ' +
        locales.join(', ') + ', or the default locale: ' + defaultLocale
    );
};

RelativeFormat.prototype._resolveStyle = function (style) {
    // Default to "best fit" style.
    if (!style) {
        return STYLES[0];
    }

    if (arrIndexOf.call(STYLES, style) >= 0) {
        return style;
    }

    throw new Error(
        '"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' +
        'must be one of: "' + STYLES.join('", "') + '"'
    );
};

RelativeFormat.prototype._selectUnits = function (diffReport) {
    var i, l, units;
    var fields = FIELDS.filter(function(field) {
        return field.indexOf('-short') < 1;
    });

    for (i = 0, l = fields.length; i < l; i += 1) {
        units = fields[i];

        if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
            break;
        }
    }

    return units;
};

// GENERATED FILE
var defaultLocale$1 = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"},"fields":{"year":{"displayName":"year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"one":"in {0} year","other":"in {0} years"},"past":{"one":"{0} year ago","other":"{0} years ago"}}},"year-short":{"displayName":"yr.","relative":{"0":"this yr.","1":"next yr.","-1":"last yr."},"relativeTime":{"future":{"one":"in {0} yr.","other":"in {0} yr."},"past":{"one":"{0} yr. ago","other":"{0} yr. ago"}}},"month":{"displayName":"month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"one":"in {0} month","other":"in {0} months"},"past":{"one":"{0} month ago","other":"{0} months ago"}}},"month-short":{"displayName":"mo.","relative":{"0":"this mo.","1":"next mo.","-1":"last mo."},"relativeTime":{"future":{"one":"in {0} mo.","other":"in {0} mo."},"past":{"one":"{0} mo. ago","other":"{0} mo. ago"}}},"day":{"displayName":"day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"one":"in {0} day","other":"in {0} days"},"past":{"one":"{0} day ago","other":"{0} days ago"}}},"day-short":{"displayName":"day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"one":"in {0} day","other":"in {0} days"},"past":{"one":"{0} day ago","other":"{0} days ago"}}},"hour":{"displayName":"hour","relative":{"0":"this hour"},"relativeTime":{"future":{"one":"in {0} hour","other":"in {0} hours"},"past":{"one":"{0} hour ago","other":"{0} hours ago"}}},"hour-short":{"displayName":"hr.","relative":{"0":"this hour"},"relativeTime":{"future":{"one":"in {0} hr.","other":"in {0} hr."},"past":{"one":"{0} hr. ago","other":"{0} hr. ago"}}},"minute":{"displayName":"minute","relative":{"0":"this minute"},"relativeTime":{"future":{"one":"in {0} minute","other":"in {0} minutes"},"past":{"one":"{0} minute ago","other":"{0} minutes ago"}}},"minute-short":{"displayName":"min.","relative":{"0":"this minute"},"relativeTime":{"future":{"one":"in {0} min.","other":"in {0} min."},"past":{"one":"{0} min. ago","other":"{0} min. ago"}}},"second":{"displayName":"second","relative":{"0":"now"},"relativeTime":{"future":{"one":"in {0} second","other":"in {0} seconds"},"past":{"one":"{0} second ago","other":"{0} seconds ago"}}},"second-short":{"displayName":"sec.","relative":{"0":"now"},"relativeTime":{"future":{"one":"in {0} sec.","other":"in {0} sec."},"past":{"one":"{0} sec. ago","other":"{0} sec. ago"}}}}};

/* jslint esnext: true */

RelativeFormat.__addLocaleData(defaultLocale$1);
RelativeFormat.defaultLocale = 'en';

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

// Function.prototype.bind implementation from Mozilla Developer Network:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill

var bind = Function.prototype.bind || function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
};

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var hop$2 = Object.prototype.hasOwnProperty;

var realDefineProp$2 = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var defineProperty$4 = realDefineProp$2 ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!hop$2.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate$2 = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (hop$2.call(props, k)) {
            defineProperty$4(obj, k, props[k]);
        }
    }

    return obj;
};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

// -----------------------------------------------------------------------------

function createFormatCache(FormatConstructor) {
    var cache = objCreate$2(null);

    return function () {
        var args    = Array.prototype.slice.call(arguments);
        var cacheId = getCacheId(args);
        var format  = cacheId && cache[cacheId];

        if (!format) {
            format = new (bind.apply(FormatConstructor, [null].concat(args)))();

            if (cacheId) {
                cache[cacheId] = format;
            }
        }

        return format;
    };
}

// -- Utilities ----------------------------------------------------------------

function getCacheId(inputs) {
    // When JSON is not available in the runtime, we will not create a cache id.
    if (typeof JSON === 'undefined') { return; }

    var cacheId = [];

    var i, len, input;

    for (i = 0, len = inputs.length; i < len; i += 1) {
        input = inputs[i];

        if (input && typeof input === 'object') {
            cacheId.push(orderedProps(input));
        } else {
            cacheId.push(input);
        }
    }

    return JSON.stringify(cacheId);
}

function orderedProps(obj) {
    var props = [],
        keys  = [];

    var key, i, len, prop;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    var orderedKeys = keys.sort();

    for (i = 0, len = orderedKeys.length; i < len; i += 1) {
        key  = orderedKeys[i];
        prop = {};

        prop[key] = obj[key];
        props[i]  = prop;
    }

    return props;
}

/*
 * Copyright 2017, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

// GENERATED FILE
var defaultLocaleData = { "locale": "en", "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";return n == 1 && v0 ? "one" : "other";
  }, "fields": { "year": { "displayName": "year", "relative": { "0": "this year", "1": "next year", "-1": "last year" }, "relativeTime": { "future": { "one": "in {0} year", "other": "in {0} years" }, "past": { "one": "{0} year ago", "other": "{0} years ago" } } }, "month": { "displayName": "month", "relative": { "0": "this month", "1": "next month", "-1": "last month" }, "relativeTime": { "future": { "one": "in {0} month", "other": "in {0} months" }, "past": { "one": "{0} month ago", "other": "{0} months ago" } } }, "day": { "displayName": "day", "relative": { "0": "today", "1": "tomorrow", "-1": "yesterday" }, "relativeTime": { "future": { "one": "in {0} day", "other": "in {0} days" }, "past": { "one": "{0} day ago", "other": "{0} days ago" } } }, "hour": { "displayName": "hour", "relative": { "0": "this hour" }, "relativeTime": { "future": { "one": "in {0} hour", "other": "in {0} hours" }, "past": { "one": "{0} hour ago", "other": "{0} hours ago" } } }, "minute": { "displayName": "minute", "relative": { "0": "this minute" }, "relativeTime": { "future": { "one": "in {0} minute", "other": "in {0} minutes" }, "past": { "one": "{0} minute ago", "other": "{0} minutes ago" } } }, "second": { "displayName": "second", "relative": { "0": "now" }, "relativeTime": { "future": { "one": "in {0} second", "other": "in {0} seconds" }, "past": { "one": "{0} second ago", "other": "{0} seconds ago" } } } } };

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function addLocaleData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var locales = Array.isArray(data) ? data : [data];

  locales.forEach(function (localeData$$1) {
    if (localeData$$1 && localeData$$1.locale) {
      MessageFormat.__addLocaleData(localeData$$1);
      RelativeFormat.__addLocaleData(localeData$$1);
    }
  });
}

function hasLocaleData(locale) {
  var localeParts = (locale || '').split('-');

  while (localeParts.length > 0) {
    if (hasIMFAndIRFLocaleData(localeParts.join('-'))) {
      return true;
    }

    localeParts.pop();
  }

  return false;
}

function hasIMFAndIRFLocaleData(locale) {
  var normalizedLocale = locale && locale.toLowerCase();

  return !!(MessageFormat.__localeData__[normalizedLocale] && RelativeFormat.__localeData__[normalizedLocale]);
}

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck$1 = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends$5 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits$1 = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties$1 = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn$1 = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray$1 = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var bool = propTypes.bool;
var number = propTypes.number;
var string = propTypes.string;
var func = propTypes.func;
var object = propTypes.object;
var oneOf = propTypes.oneOf;
var shape = propTypes.shape;
var any = propTypes.any;
var oneOfType = propTypes.oneOfType;

var localeMatcher = oneOf(['best fit', 'lookup']);
var narrowShortLong = oneOf(['narrow', 'short', 'long']);
var numeric2digit = oneOf(['numeric', '2-digit']);
var funcReq = func.isRequired;

var intlConfigPropTypes = {
  locale: string,
  formats: object,
  messages: object,
  textComponent: any,

  defaultLocale: string,
  defaultFormats: object
};

var intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq
};

var intlShape = shape(_extends$5({}, intlConfigPropTypes, intlFormatPropTypes, {
  formatters: object,
  now: funcReq
}));

var messageDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultMessage: string
};

var dateTimeFormatPropTypes = {
  localeMatcher: localeMatcher,
  formatMatcher: oneOf(['basic', 'best fit']),

  timeZone: string,
  hour12: bool,

  weekday: narrowShortLong,
  era: narrowShortLong,
  year: numeric2digit,
  month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
  day: numeric2digit,
  hour: numeric2digit,
  minute: numeric2digit,
  second: numeric2digit,
  timeZoneName: oneOf(['short', 'long'])
};

var numberFormatPropTypes = {
  localeMatcher: localeMatcher,

  style: oneOf(['decimal', 'currency', 'percent']),
  currency: string,
  currencyDisplay: oneOf(['symbol', 'code', 'name']),
  useGrouping: bool,

  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number
};

var relativeFormatPropTypes = {
  style: oneOf(['best fit', 'numeric']),
  units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year'])
};

var pluralFormatPropTypes = {
  style: oneOf(['cardinal', 'ordinal'])
};

/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

var intlConfigPropNames = Object.keys(intlConfigPropTypes);

var ESCAPED_CHARS = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#x27;'
};

var UNSAFE_CHARS_REGEX = /[&><"']/g;

function escape$2(str) {
  return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
    return ESCAPED_CHARS[match];
  });
}

function filterProps(props, whitelist) {
  var defaults$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return whitelist.reduce(function (filtered, name) {
    if (props.hasOwnProperty(name)) {
      filtered[name] = props[name];
    } else if (defaults$$1.hasOwnProperty(name)) {
      filtered[name] = defaults$$1[name];
    }

    return filtered;
  }, {});
}

function invariantIntlContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      intl = _ref.intl;

  invariant_1$1(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}

function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof$2(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof$2(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function shouldIntlComponentUpdate(_ref2, nextProps, nextState) {
  var props = _ref2.props,
      state = _ref2.state,
      _ref2$context = _ref2.context,
      context = _ref2$context === undefined ? {} : _ref2$context;
  var nextContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _context$intl = context.intl,
      intl = _context$intl === undefined ? {} : _context$intl;
  var _nextContext$intl = nextContext.intl,
      nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;


  return !shallowEquals(nextProps, props) || !shallowEquals(nextState, state) || !(nextIntl === intl || shallowEquals(filterProps(nextIntl, intlConfigPropNames), filterProps(intl, intlConfigPropNames)));
}

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

// This is a "hack" until a proper `intl-pluralformat` package is created.

function resolveLocale(locales) {
  // IntlMessageFormat#_resolveLocale() does not depend on `this`.
  return MessageFormat.prototype._resolveLocale(locales);
}

function findPluralFunction(locale) {
  // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
  return MessageFormat.prototype._findPluralRuleFunction(locale);
}

var IntlPluralFormat = function IntlPluralFormat(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck$1(this, IntlPluralFormat);

  var useOrdinal = options.style === 'ordinal';
  var pluralFn = findPluralFunction(resolveLocale(locales));

  this.format = function (value) {
    return pluralFn(value, useOrdinal);
  };
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var DATE_TIME_FORMAT_OPTIONS = Object.keys(dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(pluralFormatPropTypes);

var RELATIVE_FORMAT_THRESHOLDS = {
  second: 60, // seconds to minute
  minute: 60, // minutes to hour
  hour: 24, // hours to day
  day: 30, // days to month
  month: 12 // months to year
};

function updateRelativeFormatThresholds(newThresholds) {
  var thresholds = RelativeFormat.thresholds;
  thresholds.second = newThresholds.second;
  thresholds.minute = newThresholds.minute;
  thresholds.hour = newThresholds.hour;
  thresholds.day = newThresholds.day;
  thresholds.month = newThresholds.month;
}

function getNamedFormat(formats, type, name) {
  var format = formats && formats[type] && formats[type][name];
  if (format) {
    return format;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('[React Intl] No ' + type + ' format named: ' + name);
  }
}

function formatDate(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;


  var date = new Date(value);
  var defaults$$1 = format && getNamedFormat(formats, 'date', format);
  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[React Intl] Error formatting date.\n' + e);
    }
  }

  return String(date);
}

function formatTime(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;


  var date = new Date(value);
  var defaults$$1 = format && getNamedFormat(formats, 'time', format);
  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
    // Add default formatting options if hour, minute, or second isn't defined.
    filteredOptions = _extends$5({}, filteredOptions, { hour: 'numeric', minute: 'numeric' });
  }

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[React Intl] Error formatting time.\n' + e);
    }
  }

  return String(date);
}

function formatRelative(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;


  var date = new Date(value);
  var now = new Date(options.now);
  var defaults$$1 = format && getNamedFormat(formats, 'relative', format);
  var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults$$1);

  // Capture the current threshold values, then temporarily override them with
  // specific values just for this render.
  var oldThresholds = _extends$5({}, RelativeFormat.thresholds);
  updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);

  try {
    return state.getRelativeFormat(locale, filteredOptions).format(date, {
      now: isFinite(now) ? now : state.now()
    });
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[React Intl] Error formatting relative time.\n' + e);
    }
  } finally {
    updateRelativeFormatThresholds(oldThresholds);
  }

  return String(date);
}

function formatNumber(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;


  var defaults$$1 = format && getNamedFormat(formats, 'number', format);
  var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getNumberFormat(locale, filteredOptions).format(value);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[React Intl] Error formatting number.\n' + e);
    }
  }

  return String(value);
}

function formatPlural(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale;


  var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);

  try {
    return state.getPluralFormat(locale, filteredOptions).format(value);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[React Intl] Error formatting plural.\n' + e);
    }
  }

  return 'other';
}

function formatMessage(config, state) {
  var messageDescriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var values = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      messages = config.messages,
      defaultLocale = config.defaultLocale,
      defaultFormats = config.defaultFormats;
  var id = messageDescriptor.id,
      defaultMessage = messageDescriptor.defaultMessage;

  // `id` is a required field of a Message Descriptor.

  invariant_1$1(id, '[React Intl] An `id` must be provided to format a message.');

  var message = messages && messages[id];
  var hasValues = Object.keys(values).length > 0;

  // Avoid expensive message formatting for simple messages without values. In
  // development messages will always be formatted in case of missing values.
  if (!hasValues && process.env.NODE_ENV === 'production') {
    return message || defaultMessage || id;
  }

  var formattedMessage = void 0;

  if (message) {
    try {
      var formatter = state.getMessageFormat(message, locale, formats);

      formattedMessage = formatter.format(values);
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[React Intl] Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '') + ('\n' + e));
      }
    }
  } else {
    if (process.env.NODE_ENV !== 'production') {
      // This prevents warnings from littering the console in development
      // when no `messages` are passed into the <IntlProvider> for the
      // default locale, and a default message is in the source.
      if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {
        console.error('[React Intl] Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''));
      }
    }
  }

  if (!formattedMessage && defaultMessage) {
    try {
      var _formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);

      formattedMessage = _formatter.format(values);
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[React Intl] Error formatting the default message for: "' + id + '"' + ('\n' + e));
      }
    }
  }

  if (!formattedMessage) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[React Intl] Cannot format message: "' + id + '", ' + ('using message ' + (message || defaultMessage ? 'source' : 'id') + ' as fallback.'));
    }
  }

  return formattedMessage || message || defaultMessage || id;
}

function formatHTMLMessage(config, state, messageDescriptor) {
  var rawValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  // Process all the values before they are used when formatting the ICU
  // Message string. Since the formatted message might be injected via
  // `innerHTML`, all String-based values need to be HTML-escaped.
  var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
    var value = rawValues[name];
    escaped[name] = typeof value === 'string' ? escape$2(value) : value;
    return escaped;
  }, {});

  return formatMessage(config, state, messageDescriptor, escapedValues);
}



var format = Object.freeze({
	formatDate: formatDate,
	formatTime: formatTime,
	formatRelative: formatRelative,
	formatNumber: formatNumber,
	formatPlural: formatPlural,
	formatMessage: formatMessage,
	formatHTMLMessage: formatHTMLMessage
});

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var intlConfigPropNames$1 = Object.keys(intlConfigPropTypes);
var intlFormatPropNames = Object.keys(intlFormatPropTypes);

// These are not a static property on the `IntlProvider` class so the intl
// config values can be inherited from an <IntlProvider> ancestor.
var defaultProps = {
  formats: {},
  messages: {},
  textComponent: 'span',

  defaultLocale: 'en',
  defaultFormats: {}
};

var IntlProvider = function (_Component) {
  inherits$1(IntlProvider, _Component);

  function IntlProvider(props) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck$1(this, IntlProvider);

    var _this = possibleConstructorReturn$1(this, (IntlProvider.__proto__ || Object.getPrototypeOf(IntlProvider)).call(this, props, context));

    invariant_1$1(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');

    var intlContext = context.intl;

    // Used to stabilize time when performing an initial rendering so that
    // all relative times use the same reference "now" time.

    var initialNow = void 0;
    if (isFinite(props.initialNow)) {
      initialNow = Number(props.initialNow);
    } else {
      // When an `initialNow` isn't provided via `props`, look to see an
      // <IntlProvider> exists in the ancestry and call its `now()`
      // function to propagate its value for "now".
      initialNow = intlContext ? intlContext.now() : Date.now();
    }

    // Creating `Intl*` formatters is expensive. If there's a parent
    // `<IntlProvider>`, then its formatters will be used. Otherwise, this
    // memoize the `Intl*` constructors and cache them for the lifecycle of
    // this IntlProvider instance.

    var _ref = intlContext || {},
        _ref$formatters = _ref.formatters,
        formatters = _ref$formatters === undefined ? {
      getDateTimeFormat: createFormatCache(Intl.DateTimeFormat),
      getNumberFormat: createFormatCache(Intl.NumberFormat),
      getMessageFormat: createFormatCache(MessageFormat),
      getRelativeFormat: createFormatCache(RelativeFormat),
      getPluralFormat: createFormatCache(IntlPluralFormat)
    } : _ref$formatters;

    _this.state = _extends$5({}, formatters, {

      // Wrapper to provide stable "now" time for initial render.
      now: function now() {
        return _this._didDisplay ? Date.now() : initialNow;
      }
    });
    return _this;
  }

  createClass$1(IntlProvider, [{
    key: 'getConfig',
    value: function getConfig() {
      var intlContext = this.context.intl;

      // Build a whitelisted config object from `props`, defaults, and
      // `context.intl`, if an <IntlProvider> exists in the ancestry.

      var config = filterProps(this.props, intlConfigPropNames$1, intlContext);

      // Apply default props. This must be applied last after the props have
      // been resolved and inherited from any <IntlProvider> in the ancestry.
      // This matches how React resolves `defaultProps`.
      for (var propName in defaultProps) {
        if (config[propName] === undefined) {
          config[propName] = defaultProps[propName];
        }
      }

      if (!hasLocaleData(config.locale)) {
        var _config = config,
            locale = _config.locale,
            defaultLocale = _config.defaultLocale,
            defaultFormats = _config.defaultFormats;


        if (process.env.NODE_ENV !== 'production') {
          console.error('[React Intl] Missing locale data for locale: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.'));
        }

        // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.
        config = _extends$5({}, config, {
          locale: defaultLocale,
          formats: defaultFormats,
          messages: defaultProps.messages
        });
      }

      return config;
    }
  }, {
    key: 'getBoundFormatFns',
    value: function getBoundFormatFns(config, state) {
      return intlFormatPropNames.reduce(function (boundFormatFns, name) {
        boundFormatFns[name] = format[name].bind(null, config, state);
        return boundFormatFns;
      }, {});
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var config = this.getConfig();

      // Bind intl factories and current config to the format functions.
      var boundFormatFns = this.getBoundFormatFns(config, this.state);

      var _state = this.state,
          now = _state.now,
          formatters = objectWithoutProperties$1(_state, ['now']);


      return {
        intl: _extends$5({}, config, boundFormatFns, {
          formatters: formatters,
          now: now
        })
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._didDisplay = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return react_2.only(this.props.children);
    }
  }]);
  return IntlProvider;
}(react_1);

IntlProvider.displayName = 'IntlProvider';
IntlProvider.contextTypes = {
  intl: intlShape
};
IntlProvider.childContextTypes = {
  intl: intlShape.isRequired
};
process.env.NODE_ENV !== "production" ? IntlProvider.propTypes = _extends$5({}, intlConfigPropTypes, {
  children: propTypes.element.isRequired,
  initialNow: propTypes.any
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedDate = function (_Component) {
  inherits$1(FormattedDate, _Component);

  function FormattedDate(props, context) {
    classCallCheck$1(this, FormattedDate);

    var _this = possibleConstructorReturn$1(this, (FormattedDate.__proto__ || Object.getPrototypeOf(FormattedDate)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass$1(FormattedDate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatDate = _context$intl.formatDate,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;


      var formattedDate = formatDate(value, this.props);

      if (typeof children === 'function') {
        return children(formattedDate);
      }

      return react.createElement(
        Text,
        null,
        formattedDate
      );
    }
  }]);
  return FormattedDate;
}(react_1);

FormattedDate.displayName = 'FormattedDate';
FormattedDate.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedDate.propTypes = _extends$5({}, dateTimeFormatPropTypes, {
  value: propTypes.any.isRequired,
  format: propTypes.string,
  children: propTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedTime = function (_Component) {
  inherits$1(FormattedTime, _Component);

  function FormattedTime(props, context) {
    classCallCheck$1(this, FormattedTime);

    var _this = possibleConstructorReturn$1(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass$1(FormattedTime, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatTime = _context$intl.formatTime,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;


      var formattedTime = formatTime(value, this.props);

      if (typeof children === 'function') {
        return children(formattedTime);
      }

      return react.createElement(
        Text,
        null,
        formattedTime
      );
    }
  }]);
  return FormattedTime;
}(react_1);

FormattedTime.displayName = 'FormattedTime';
FormattedTime.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedTime.propTypes = _extends$5({}, dateTimeFormatPropTypes, {
  value: propTypes.any.isRequired,
  format: propTypes.string,
  children: propTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = 1000 * 60 * 60;
var DAY = 1000 * 60 * 60 * 24;

// The maximum timer delay value is a 32-bit signed integer.
// See: https://mdn.io/setTimeout
var MAX_TIMER_DELAY = 2147483647;

function selectUnits(delta) {
  var absDelta = Math.abs(delta);

  if (absDelta < MINUTE) {
    return 'second';
  }

  if (absDelta < HOUR) {
    return 'minute';
  }

  if (absDelta < DAY) {
    return 'hour';
  }

  // The maximum scheduled delay will be measured in days since the maximum
  // timer delay is less than the number of milliseconds in 25 days.
  return 'day';
}

function getUnitDelay(units) {
  switch (units) {
    case 'second':
      return SECOND;
    case 'minute':
      return MINUTE;
    case 'hour':
      return HOUR;
    case 'day':
      return DAY;
    default:
      return MAX_TIMER_DELAY;
  }
}

function isSameDate(a, b) {
  if (a === b) {
    return true;
  }

  var aTime = new Date(a).getTime();
  var bTime = new Date(b).getTime();

  return isFinite(aTime) && isFinite(bTime) && aTime === bTime;
}

var FormattedRelative = function (_Component) {
  inherits$1(FormattedRelative, _Component);

  function FormattedRelative(props, context) {
    classCallCheck$1(this, FormattedRelative);

    var _this = possibleConstructorReturn$1(this, (FormattedRelative.__proto__ || Object.getPrototypeOf(FormattedRelative)).call(this, props, context));

    invariantIntlContext(context);

    var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now();

    // `now` is stored as state so that `render()` remains a function of
    // props + state, instead of accessing `Date.now()` inside `render()`.
    _this.state = { now: now };
    return _this;
  }

  createClass$1(FormattedRelative, [{
    key: 'scheduleNextUpdate',
    value: function scheduleNextUpdate(props, state) {
      var _this2 = this;

      // Cancel and pending update because we're scheduling a new update.
      clearTimeout(this._timer);

      var value = props.value,
          units = props.units,
          updateInterval = props.updateInterval;

      var time = new Date(value).getTime();

      // If the `updateInterval` is falsy, including `0` or we don't have a
      // valid date, then auto updates have been turned off, so we bail and
      // skip scheduling an update.
      if (!updateInterval || !isFinite(time)) {
        return;
      }

      var delta = time - state.now;
      var unitDelay = getUnitDelay(units || selectUnits(delta));
      var unitRemainder = Math.abs(delta % unitDelay);

      // We want the largest possible timer delay which will still display
      // accurate information while reducing unnecessary re-renders. The delay
      // should be until the next "interesting" moment, like a tick from
      // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.
      var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);

      this._timer = setTimeout(function () {
        _this2.setState({ now: _this2.context.intl.now() });
      }, delay);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scheduleNextUpdate(this.props, this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var nextValue = _ref.value;

      // When the `props.value` date changes, `state.now` needs to be updated,
      // and the next update can be rescheduled.
      if (!isSameDate(nextValue, this.props.value)) {
        this.setState({ now: this.context.intl.now() });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.scheduleNextUpdate(nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatRelative = _context$intl.formatRelative,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;


      var formattedRelative = formatRelative(value, _extends$5({}, this.props, this.state));

      if (typeof children === 'function') {
        return children(formattedRelative);
      }

      return react.createElement(
        Text,
        null,
        formattedRelative
      );
    }
  }]);
  return FormattedRelative;
}(react_1);

FormattedRelative.displayName = 'FormattedRelative';
FormattedRelative.contextTypes = {
  intl: intlShape
};
FormattedRelative.defaultProps = {
  updateInterval: 1000 * 10
};
process.env.NODE_ENV !== "production" ? FormattedRelative.propTypes = _extends$5({}, relativeFormatPropTypes, {
  value: propTypes.any.isRequired,
  format: propTypes.string,
  updateInterval: propTypes.number,
  initialNow: propTypes.any,
  children: propTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedNumber = function (_Component) {
  inherits$1(FormattedNumber, _Component);

  function FormattedNumber(props, context) {
    classCallCheck$1(this, FormattedNumber);

    var _this = possibleConstructorReturn$1(this, (FormattedNumber.__proto__ || Object.getPrototypeOf(FormattedNumber)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass$1(FormattedNumber, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatNumber = _context$intl.formatNumber,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;


      var formattedNumber = formatNumber(value, this.props);

      if (typeof children === 'function') {
        return children(formattedNumber);
      }

      return react.createElement(
        Text,
        null,
        formattedNumber
      );
    }
  }]);
  return FormattedNumber;
}(react_1);

FormattedNumber.displayName = 'FormattedNumber';
FormattedNumber.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedNumber.propTypes = _extends$5({}, numberFormatPropTypes, {
  value: propTypes.any.isRequired,
  format: propTypes.string,
  children: propTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedPlural = function (_Component) {
  inherits$1(FormattedPlural, _Component);

  function FormattedPlural(props, context) {
    classCallCheck$1(this, FormattedPlural);

    var _this = possibleConstructorReturn$1(this, (FormattedPlural.__proto__ || Object.getPrototypeOf(FormattedPlural)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass$1(FormattedPlural, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatPlural = _context$intl.formatPlural,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          other = _props.other,
          children = _props.children;


      var pluralCategory = formatPlural(value, this.props);
      var formattedPlural = this.props[pluralCategory] || other;

      if (typeof children === 'function') {
        return children(formattedPlural);
      }

      return react.createElement(
        Text,
        null,
        formattedPlural
      );
    }
  }]);
  return FormattedPlural;
}(react_1);

FormattedPlural.displayName = 'FormattedPlural';
FormattedPlural.contextTypes = {
  intl: intlShape
};
FormattedPlural.defaultProps = {
  style: 'cardinal'
};
process.env.NODE_ENV !== "production" ? FormattedPlural.propTypes = _extends$5({}, pluralFormatPropTypes, {
  value: propTypes.any.isRequired,

  other: propTypes.node.isRequired,
  zero: propTypes.node,
  one: propTypes.node,
  two: propTypes.node,
  few: propTypes.node,
  many: propTypes.node,

  children: propTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedMessage = function (_Component) {
  inherits$1(FormattedMessage, _Component);

  function FormattedMessage(props, context) {
    classCallCheck$1(this, FormattedMessage);

    var _this = possibleConstructorReturn$1(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass$1(FormattedMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;


      if (!shallowEquals(nextValues, values)) {
        return true;
      }

      // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.
      var nextPropsToCheck = _extends$5({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatMessage = _context$intl.formatMessage,
          Text = _context$intl.textComponent;
      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          values = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;


      var tokenDelimiter = void 0;
      var tokenizedValues = void 0;
      var elements = void 0;

      var hasValues = values && Object.keys(values).length > 0;
      if (hasValues) {
        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);

        var generateToken = function () {
          var counter = 0;
          return function () {
            return 'ELEMENT-' + uid + '-' + (counter += 1);
          };
        }();

        // Splitting with a delimiter to support IE8. When using a regex
        // with a capture group IE8 does not include the capture group in
        // the resulting array.
        tokenDelimiter = '@__' + uid + '__@';
        tokenizedValues = {};
        elements = {};

        // Iterates over the `props` to keep track of any React Element
        // values so they can be represented by the `token` as a placeholder
        // when the `message` is formatted. This allows the formatted
        // message to then be broken-up into parts with references to the
        // React Elements inserted back in.
        Object.keys(values).forEach(function (name) {
          var value = values[name];

          if (react_5(value)) {
            var token = generateToken();
            tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
            elements[token] = value;
          } else {
            tokenizedValues[name] = value;
          }
        });
      }

      var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
      var formattedMessage = formatMessage(descriptor, tokenizedValues || values);

      var nodes = void 0;

      var hasElements = elements && Object.keys(elements).length > 0;
      if (hasElements) {
        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This
        // approach allows messages to render with React Elements while
        // keeping React's virtual diffing working properly.
        nodes = formattedMessage.split(tokenDelimiter).filter(function (part) {
          return !!part;
        }).map(function (part) {
          return elements[part] || part;
        });
      } else {
        nodes = [formattedMessage];
      }

      if (typeof children === 'function') {
        return children.apply(undefined, toConsumableArray$1(nodes));
      }

      // Needs to use `createElement()` instead of JSX, otherwise React will
      // warn about a missing `key` prop with rich-text message formatting.
      return react_3.apply(undefined, [Component$$1, null].concat(toConsumableArray$1(nodes)));
    }
  }]);
  return FormattedMessage;
}(react_1);

FormattedMessage.displayName = 'FormattedMessage';
FormattedMessage.contextTypes = {
  intl: intlShape
};
FormattedMessage.defaultProps = {
  values: {}
};
process.env.NODE_ENV !== "production" ? FormattedMessage.propTypes = _extends$5({}, messageDescriptorPropTypes, {
  values: propTypes.object,
  tagName: propTypes.string,
  children: propTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedHTMLMessage = function (_Component) {
  inherits$1(FormattedHTMLMessage, _Component);

  function FormattedHTMLMessage(props, context) {
    classCallCheck$1(this, FormattedHTMLMessage);

    var _this = possibleConstructorReturn$1(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass$1(FormattedHTMLMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;


      if (!shallowEquals(nextValues, values)) {
        return true;
      }

      // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.
      var nextPropsToCheck = _extends$5({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatHTMLMessage = _context$intl.formatHTMLMessage,
          Text = _context$intl.textComponent;
      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          rawValues = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;


      var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
      var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);

      if (typeof children === 'function') {
        return children(formattedHTMLMessage);
      }

      // Since the message presumably has HTML in it, we need to set
      // `innerHTML` in order for it to be rendered and not escaped by React.
      // To be safe, all string prop values were escaped when formatting the
      // message. It is assumed that the message is not UGC, and came from the
      // developer making it more like a template.
      //
      // Note: There's a perf impact of using this component since there's no
      // way for React to do its virtual DOM diffing.
      var html = { __html: formattedHTMLMessage };
      return react.createElement(Component$$1, { dangerouslySetInnerHTML: html });
    }
  }]);
  return FormattedHTMLMessage;
}(react_1);

FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
FormattedHTMLMessage.contextTypes = {
  intl: intlShape
};
FormattedHTMLMessage.defaultProps = {
  values: {}
};
process.env.NODE_ENV !== "production" ? FormattedHTMLMessage.propTypes = _extends$5({}, messageDescriptorPropTypes, {
  values: propTypes.object,
  tagName: propTypes.string,
  children: propTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(defaultLocaleData);

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(localeData);

var _this = undefined;

var markStreamRead = function markStreamRead(streamId) {
  return function () {
    var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (streamId) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:

              window.parent.postMessage({ type: "codestream:action:mark-stream-read", body: streamId }, "*");
              // const markReadData = await http.put(
              //   "/read/" + streamId,
              //   {},
              //   session.accessToken
              // );
              // dispatch({ type: "CLEAR_UMI", payload: streamId });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var createPost = function createPost(streamId, parentPostId, text, codeBlocks, mentions, extra) {
  return function () {
    var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var editPost = function editPost() {};

var deletePost = function deletePost() {};

var actions = /*#__PURE__*/Object.freeze({
	markStreamRead: markStreamRead,
	createPost: createPost,
	editPost: editPost,
	deletePost: deletePost
});

var toMapBy = function toMapBy(key, entities) {
	return entities.reduce(function (result, entity) {
		return _extends$4({}, result, defineProperty$1({}, entity[key], entity));
	}, {});
};

// Selectors
var getStreamForTeam = function getStreamForTeam(state, teamId) {
	var streams = state.byTeam[teamId] || {};
	return Object.values(streams).find(function (stream) {
		return stream.isTeamStream && stream.name === "general";
	});
};

var getStreamForRepoAndFile = function getStreamForRepoAndFile(state, repoId, file) {
	var filesForRepo = (state.byRepo[repoId] || {}).byFile;
	if (filesForRepo) return filesForRepo[file];
};

// If stream for a pending post is created, the pending post will be lost (not displayed)
// TODO: reconcile pending posts for a file with stream when the stream is created
var getPostsForStream = function getPostsForStream(_ref2) {
	var byStream = _ref2.byStream,
	    pending = _ref2.pending;
	var streamId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

	if (streamId === "") return [];
	var pendingForStream = pending.filter(function (it) {
		try {
			return it.streamId === streamId || it.stream.file === streamId;
		} catch (e) {
			return false;
		}
	});
	return [].concat(toConsumableArray(underscore.sortBy(byStream[streamId], "seqNum")), toConsumableArray(pendingForStream));
};

var rangeToLocation = function rangeToLocation(range) {
  var location = [range.start.row, range.start.column, range.end.row, range.end.column];
  location = location.map(function (index) {
    return index != undefined ? index + 1 : index;
  });
  location.push({}); // meta
  return location;
};

var SimpleStream = function (_Component) {
  inherits(SimpleStream, _Component);

  function SimpleStream(props) {
    classCallCheck(this, SimpleStream);

    var _this = possibleConstructorReturn(this, (SimpleStream.__proto__ || Object.getPrototypeOf(SimpleStream)).call(this, props));

    Object.defineProperty(_this, "disposables", {
      enumerable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(_this, "handleInteractionEvent", {
      enumerable: true,
      writable: true,
      value: function value(_ref) {
        var data = _ref.data;

        if (data.type === "codestream:interaction:marker-selected") {
          _this.selectPost(data.body.postId);
        }
      }
    });
    Object.defineProperty(_this, "handleResizeCompose", {
      enumerable: true,
      writable: true,
      value: function value() {
        _this.resizeStream();
      }
    });
    Object.defineProperty(_this, "resizeStream", {
      enumerable: true,
      writable: true,
      value: function value() {
        if (!_this._div || !_this._compose) return;
        var streamHeight = _this._div.offsetHeight;
        var postslistHeight = _this._postslist.offsetHeight;
        var composeHeight = _this._compose.current.offsetHeight;
        var headerHeight = _this._header.offsetHeight;
        if (postslistHeight < streamHeight) {
          var newHeight = streamHeight - postslistHeight + _this._intro.offsetHeight - composeHeight;
          _this._intro.style.height = newHeight + "px";
        }
        var padding = composeHeight + headerHeight;
        // this._div.style.paddingBottom = padding + "px";
        _this._mainPanel.style.paddingBottom = padding + "px";
        // we re-measure the height of postslist here because we just changed
        // it with the style declaration immediately above
        _this._threadpostslist.style.height = _this._postslist.offsetHeight + "px";
        // this._threadpostslist.style.top = headerHeight + "px";
        // if (this._atMentionsPopup)
        // this._atMentionsPopup.style.bottom = this._compose.offsetHeight + "px";

        var scrollHeight = _this._postslist.scrollHeight;
        var currentScroll = _this._postslist.scrollTop;
        var offBottom = scrollHeight - currentScroll - streamHeight + composeHeight + headerHeight;
        // if i am manually scrolling, don't programatically scroll to bottom
        // offBottom is how far we've scrolled off the bottom of the posts list
        console.log("OFF BOTTOM IS: ", offBottom);
        if (offBottom < 100) _this.scrollToBottom();
      }
    });
    Object.defineProperty(_this, "scrollToBottom", {
      enumerable: true,
      writable: true,
      value: function value(force) {
        // don't scroll to bottom if we're in the middle of an edit,
        // unless the force parameter is called
        if (_this.state.editingPostId && !force) return;
        if (_this._postslist) _this._postslist.scrollTop = 100000;
      }
    });
    Object.defineProperty(_this, "calculateScrolledOffBottom", {
      enumerable: true,
      writable: true,
      value: function value() {}
    });
    Object.defineProperty(_this, "handleClickHelpLink", {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.preventDefault();
        window.parent.postMessage({
          type: "codestream:interaction:clicked-link",
          body: "https://help.codestream.com"
        }, "*");
      }
    });
    Object.defineProperty(_this, "renderIntro", {
      enumerable: true,
      writable: true,
      value: function value() {
        return [react.createElement(
          "label",
          { key: "welcome" },
          react.createElement(FormattedMessage, {
            id: "stream.intro.welcome",
            defaultMessage: "Welcome to CodeStream!"
          })
        ), react.createElement(
          "label",
          { key: "info" },
          react.createElement(
            "ul",
            null,
            react.createElement(
              "li",
              null,
              react.createElement(FormattedMessage, {
                id: "stream.intro.eachFile",
                defaultMessage: "Post a message and any of your teammates can join the discussion."
              })
            ),
            react.createElement(
              "li",
              null,
              react.createElement(FormattedMessage, {
                id: "stream.intro.comment",
                defaultMessage: 'Comment on a specific block of code by selecting it and then clicking the "+" button.'
              })
            ),
            react.createElement(
              "li",
              null,
              react.createElement(
                FormattedMessage,
                {
                  id: "stream.intro.share",
                  defaultMessage: "Select \"Codestream: Invite\" from the command palette to invite your team."
                },
                function () {
                  return react.createElement(
                    react.Fragment,
                    null,
                    "Select",
                    " ",
                    react.createElement(
                      "a",
                      { onClick: _this.props.goToInvitePage },
                      "Codestream: Invite"
                    ),
                    " ",
                    "from the command palette to invite your team."
                  );
                }
              )
            )
          )
        ), react.createElement(
          "label",
          { key: "learn-more" },
          "Learn more at",
          " ",
          react.createElement(
            "a",
            { onClick: _this.handleClickHelpLink },
            "help.codestream.com"
          )
        )];
      }
    });
    Object.defineProperty(_this, "renderThreadPosts", {
      enumerable: true,
      writable: true,
      value: function value(threadId) {
        var lastTimestamp = 0;
        return _this.props.posts.map(function (post) {
          if (post.deactivated) return null;
          if (!threadId || threadId !== post.parentPostId) {
            return null;
          }
          // this needs to be done by storing the return value of the render,
          // then setting lastTimestamp, otherwise you wouldn't be able to
          // compare the current one to the prior one.
          var returnValue = react.createElement(
            "div",
            { key: post.id },
            react.createElement(DateSeparator, {
              timestamp1: lastTimestamp,
              timestamp2: post.createdAt
            }),
            react.createElement(Post$1, {
              post: post,
              usernames: _this.props.usernamesRegexp,
              currentUsername: _this.props.currentUser.username,
              showDetails: "1",
              currentCommit: _this.props.currentCommit,
              editing: post.id === _this.state.editingPostId
            })
          );
          lastTimestamp = post.createdAt;
          return returnValue;
        });
      }
    });
    Object.defineProperty(_this, "editLastPost", {
      enumerable: true,
      writable: true,
      value: function value(event) {
        // find the most recent post I authored
        console.log("up! ", event);
        var postDiv = event.target.closest(".post");
        var seqNum = postDiv ? postDiv.dataset.seqNum : 9999999999;
        var editingPost = _this.findMyPostBeforeSeqNum(seqNum);
        if (editingPost) _this.setState({ editingPostId: editingPost.id });
      }
    });
    Object.defineProperty(_this, "handleClickUnreads", {
      enumerable: true,
      writable: true,
      value: function value(event) {
        var scrollDiv = _this._postslist;
        var umiDivs = scrollDiv.getElementsByClassName("unread");
        var type = event.target.getAttribute("type");
        console.log("TYPE IS: ", type);
        var active = type === "above" ? umiDivs[0] : umiDivs[umiDivs.length - 1];
        if (active) active.scrollIntoView(type === "above");
        // ...and then a little more, so it is off the border
        scrollDiv.scrollTop += type === "above" ? -10 : 10;
      }
    });
    Object.defineProperty(_this, "handleDismissThread", {
      enumerable: true,
      writable: true,
      value: function value() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$track = _ref2.track,
            track = _ref2$track === undefined ? true : _ref2$track;

        window.parent.postMessage({
          type: "codestream:interaction:thread-closed",
          body: _this.findPostById(_this.state.threadId)
        }, "*");
        _this.setState({ threadActive: false });
        _this.focusInput();
        if (track) window.parent.postMessage({
          type: "codestream:analytics",
          body: {
            label: "Page Viewed",
            payload: { "Page Name": "Source Stream" }
          }
        }, "*");
      }
    });
    Object.defineProperty(_this, "handleEditHeadshot", {
      enumerable: true,
      writable: true,
      value: function value(_event) {
        atom.confirm({
          message: "Edit Headshot",
          detailedMessage: "Until we have built-in CodeStream headshots, you can edit your headshot by setting it up on Gravatar.com for " + _this.props.currentUser.email + ".\n\nNote that it might take a few minutes for your headshot to appear here.\n\n-Team CodeStream"
        });
      }
    });
    Object.defineProperty(_this, "handleEditPost", {
      enumerable: true,
      writable: true,
      value: function value(event) {
        var postDiv = event.target.closest(".post");
        if (!postDiv) return;
        _this.setState({ editingPostId: postDiv.id });
      }
    });
    Object.defineProperty(_this, "handleDeletePost", {
      enumerable: true,
      writable: true,
      value: function value(event) {
        var postDiv = event.target.closest(".post");
        if (!postDiv || !postDiv.id) return;

        var answer = atom.confirm({
          message: "Are you sure?",
          buttons: ["Delete Post", "Cancel"]
        });

        if (answer === 0) {
          console.log("Calling delete post with: ", postDiv.id);
          _this.props.deletePost(postDiv.id);
        }
      }
    });
    Object.defineProperty(_this, "findMentionedUserIds", {
      enumerable: true,
      writable: true,
      value: function value(text, users) {
        var mentionedUserIds = [];
        users.forEach(function (user) {
          var matcher = user.username.replace(/\+/g, "\\+").replace(/\./g, "\\.");
          if (text.match("@" + matcher + "\\b")) {
            mentionedUserIds.push(user.id);
          }
        });
        return mentionedUserIds;
      }
    });
    Object.defineProperty(_this, "replacePostText", {
      enumerable: true,
      writable: true,
      value: function value(postId, newText) {
        // convert the text to plaintext so there is no HTML
        var doc = new DOMParser().parseFromString(newText, "text/html");
        var replaceText = doc.documentElement.textContent;
        var mentionUserIds = _this.findMentionedUserIds(replaceText, _this.props.teammates);

        _this.props.editPost(postId, replaceText, mentionUserIds);
      }
    });
    Object.defineProperty(_this, "handleClickPost", {
      enumerable: true,
      writable: true,
      value: function value(event) {
        var postDiv = event.target.closest(".post");
        if (!postDiv) return;

        // if they clicked a link, follow the link rather than selecting the post
        if (event && event.target && event.target.tagName === "A") return false;

        // console.log(event.target.id);
        if (event.target.id === "discard-button") {
          // if the user clicked on the cancel changes button,
          // presumably because she is editing a post, abort
          _this.setState({ editingPostId: null });
          return;
        } else if (event.target.id === "save-button") {
          // if the user clicked on the save changes button,
          // save the new post text
          var newText = document.getElementById("input-div-" + postDiv.id).innerHTML.replace(/<br>/g, "\n");

          _this.replacePostText(postDiv.id, newText);
          _this.setState({ editingPostId: null });
          return;
        } else if (postDiv.classList.contains("editing")) {
          // otherwise, if we aren't currently editing the
          // post, go to the thread for that post, but if
          // we are editing, then do nothing.
          return;
        } else if (window.getSelection().toString().length > 0) {
          // in this case the user has selected a string
          // by dragging
          return;
        }
        _this.selectPost(postDiv.id, true);
      }
    });
    Object.defineProperty(_this, "selectPost", {
      enumerable: true,
      writable: true,
      value: function value(id) {
        var wasClicked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        window.parent.postMessage({
          type: "codestream:analytics",
          body: { label: "Page Viewed", payload: { "Page Name": "Thread View" } }
        }, "*");
        var post = _this.findPostById(id);
        if (!post) return;

        // if it is a child in the thread, it'll have a parentPostId,
        // otherwise use the id. any post can become the head of a thread
        var threadId = post.parentPostId || post.id;
        _this.setState({ threadId: threadId, threadActive: true });

        _this.focusInput();
        if (wasClicked) {
          window.parent.postMessage({
            type: "codestream:interaction:thread-selected",
            body: { threadId: threadId, streamId: _this.props.postStreamId, post: post }
          }, "*");
        }
      }
    });
    Object.defineProperty(_this, "focusInput", {
      enumerable: true,
      writable: true,
      value: function value() {
        var input = document.getElementById("input-div");
        if (input) input.focus();
      }
    });
    Object.defineProperty(_this, "handleClickScrollToNewMessages", {
      enumerable: true,
      writable: true,
      value: function value() {
        _this.scrollToBottom();
      }
    });
    Object.defineProperty(_this, "submitPost", {
      enumerable: true,
      writable: true,
      value: function value(_ref3) {
        var text = _ref3.text,
            quote = _ref3.quote,
            mentionedUserIds = _ref3.mentionedUserIds,
            autoMentions = _ref3.autoMentions;

        var codeBlocks = [];
        var threadActive = _this.state.threadActive;
        var _this$props = _this.props,
            postStreamId = _this$props.postStreamId,
            fileStreamId = _this$props.fileStreamId,
            createPost$$1 = _this$props.createPost,
            currentFile = _this$props.currentFile,
            repoId = _this$props.repoId;


        var substitute = text.match(/^s\/(.+)\/(.*)\/$/);
        if (_this.substituteLastPost(substitute)) return;else console.log("did not substitute");

        var threadId = threadActive ? _this.state.threadId : null;

        if (quote) {
          var codeBlock = {
            code: quote.quoteText,
            location: rangeToLocation(quote.quoteRange),
            preContext: quote.preContext,
            postContext: quote.postContext,
            repoId: repoId,
            file: currentFile
          };

          // if we have a streamId, send it. otherwise the
          // API server will create one based on the file
          // and the repoId.
          if (fileStreamId) codeBlock.streamId = fileStreamId;

          codeBlocks.push(codeBlock);
        }

        // FIXME: can't and shouldn't do this here
        // const editor = atom.workspace.getActiveTextEditor();
        // const editorText = editor ? editor.getText() : undefined;

        createPost$$1(postStreamId, threadId, text, codeBlocks, mentionedUserIds, {
          autoMentions: autoMentions
        });
      }
    });


    _this.state = {
      threadId: null,
      threadActive: false,
      fileForIntro: props.currentFile
    };
    _this._compose = react.createRef();
    return _this;
  }

  createClass(SimpleStream, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener("message", this.handleInteractionEvent, true);

      // this listener pays attention to when the input field resizes,
      // presumably because the user has typed more than one line of text
      // in it, and calls a function to handle the new size
      new ResizeObserver(this.handleResizeCompose).observe(this._compose.current);

      if (this._postslist) {
        this._postslist.addEventListener("scroll", this.handleScroll.bind(this));
        // this resize observer fires when the height of the
        // postslist changes, when the window resizes in width
        // or height, but notably not when new posts are added
        // this is because the height of the HTML element is
        // set explicitly
        new ResizeObserver(function () {
          _this2.handleScroll();
        }).observe(this._postslist);
      }

      this.scrollToBottom();
      if (global.atom) {
        this.disposables.push(atom.keymaps.add("codestream", {
          "atom-workspace": {
            escape: "codestream:escape",
            "cmd-c": "codestream:copy"
          }
        }), atom.commands.add("atom-workspace", "codestream:escape", {
          didDispatch: function didDispatch(event) {
            return _this2.handleEscape(event);
          },
          hiddenInCommandPalette: true
        }), atom.commands.add("atom-workspace", "codestream:copy", {
          didDispatch: function didDispatch(event) {
            return _this2.copy(event);
          },
          hiddenInCommandPalette: true
        }), atom.commands.add(".codestream .post.mine", "codestream:edit-headshot", {
          didDispatch: function didDispatch(event) {
            return _this2.handleEditHeadshot(event);
          },
          hiddenInCommandPalette: true
        }), atom.commands.add(".codestream .post.mine", "codestream:edit-post", {
          didDispatch: function didDispatch(event) {
            return _this2.handleEditPost(event);
          },
          hiddenInCommandPalette: true
        }), atom.commands.add(".codestream .post.mine", "codestream:delete-post", {
          didDispatch: function didDispatch(event) {
            return _this2.handleDeletePost(event);
          },
          hiddenInCommandPalette: true
        }));
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var switchingFileStreams = nextProps.fileStreamId !== this.props.fileStreamId;
      var switchingPostStreams = nextProps.postStreamId !== this.props.postStreamId;

      if (nextProps.fileStreamId && switchingFileStreams && nextProps.posts.length === 0) ;

      if (switchingPostStreams) {
        this.handleDismissThread({ track: false });

        // keep track of the new message indicator in "this" instead of looking
        // directly at currentUser.lastReads, because that will change and trigger
        // a re-render, which would remove the "new messages" line
        // console.log("Switch to: ", nextProps.postStreamId);
      }
      // this.postWithNewMessageIndicator = 10;

      // TODO: DELETE
      if (nextProps.firstTimeInAtom && !this.state.fileForIntro) {
        this.setState({ fileForIntro: nextProps.currentFile });
      }

      if (nextProps.hasFocus && !this.props.hasFocus) {
        this.postWithNewMessageIndicator = null;
      }
      if (!nextProps.hasFocus && this.props.hasFocus) {
        this.postWithNewMessageIndicator = null;
        if (this.props.currentUser && this.props.currentUser.lastReads) {
          this.postWithNewMessageIndicator = this.props.currentUser.lastReads[nextProps.postStreamId];
        }
      }
      if (this.props.currentUser && this.props.currentUser.lastReads) {
        this.postWithNewMessageIndicator = this.props.currentUser.lastReads[nextProps.postStreamId];
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("message", this.handleInteractionEvent, true);
      this.disposables.forEach(function (d) {
        return d.dispose();
      });
    }
  }, {
    key: "copy",
    value: function copy(event) {
      var selectedText = window.getSelection().toString();
      atom.clipboard.write(selectedText);
      event.abortKeyBinding();
    }
  }, {
    key: "checkMarkStreamRead",
    value: function checkMarkStreamRead() {
      // if we have focus, and there are no unread indicators which would mean an
      // unread is out of view, we assume the entire thread has been observed
      // and we mark the stream read
      if (this.props.hasFocus && !this.state.unreadsAbove && !this.state.unreadsBelow) {
        try {
          if (this.props.currentUser.lastReads[this.props.postStreamId]) {
            this.props.markStreamRead(this.props.postStreamId);
          }
        } catch (e) {
          /* lastReads is probably undefined */
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props,
          postStreamId = _props.postStreamId,
          markStreamRead$$1 = _props.markStreamRead;

      // this.scrollToBottom();

      // if we just switched to a new stream, (eagerly) mark both old and new as read

      if (postStreamId !== prevProps.postStreamId) {
        markStreamRead$$1(postStreamId);

        markStreamRead$$1(prevProps.postStreamId);
        this.resizeStream();
      }

      // if we just got the focus, mark the new stream read
      if (this.props.hasFocus && !prevProps.hasFocus) {
        this.checkMarkStreamRead();
      }

      if (!this.state.unreadsAbove && !this.state.unreadsBelow && (prevState.unreadsAbove || prevState.unreadsBelow)) {
        console.log("CDU: cmsr");
        this.checkMarkStreamRead();
      }

      if (prevState.threadId !== this.state.threadId) {
        this.resizeStream();
      }

      if (prevProps.hasFocus !== this.props.hasFocus) this.handleScroll();

      if (this.props.posts.length !== prevProps.posts.length) {
        var lastPost = this.props.posts[this.props.posts.length - 1];

        if (lastPost) {
          // if the latest post is mine, scroll to the bottom always
          // otherwise, if we've scrolled up, then just call
          // handleScroll to make sure new message indicators
          // appear as appropriate.
          var mine = this.props.currentUser.username === lastPost.author.username;
          if (mine || !this.state.scrolledOffBottom) this.scrollToBottom();else this.handleScroll();
        } else {
          console.log("Could not find lastPost for ", this.props.posts);
        }
      }

      // FIXME this doesn't seem to always scroll to the bottom when it should
      if (this.state.editingPostId !== prevState.editingPostId) {
        // special-case the editing of the bottom-most post...
        // scroll it into view. in all other cases we let the
        // focus of the input field make sure the post is focused
        var _lastPost = this.props.posts[this.props.posts.length - 1];
        if (this.state.editingPostId == _lastPost.id) this.scrollToBottom(true);
      }
    }
  }, {
    key: "findPostById",


    // return the post, if any, with the given ID
    value: function findPostById(id) {
      return this.props.posts.find(function (post) {
        return id === post.id;
      });
    }
  }, {
    key: "render",


    // we render both a main stream (postslist) plus also a postslist related
    // to the currently selected thread (if it exists). the reason for this is
    // to be able to animate between the two streams, since they will both be
    // visible during the transition
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          configs = _props2.configs,
          posts = _props2.posts;


      var streamClass = classnames({
        stream: true,
        "no-headshots": !configs.showHeadshots,
        "reduced-motion": configs.reduceMotion
      });
      var postsListClass = classnames({
        postslist: true
      });
      var threadPostsListClass = classnames({
        postslist: true,
        threadlist: true
      });
      var mainPanelClass = classnames({
        "main-panel": true,
        "inactive-panel": this.state.threadActive
      });
      var threadPanelClass = classnames({
        "thread-panel": true,
        "inactive-panel": !this.state.threadActive
      });

      var lastTimestamp = null;
      var threadId = this.state.threadId;
      var threadPost = this.findPostById(threadId);

      var placeholderText = "Add comment";
      if (this.state.threadActive && threadPost) {
        placeholderText = "Reply to " + threadPost.author.username;
      }

      var streamDivId = "stream-" + this.props.postStreamId;
      var unread = false;

      var unreadsAboveClass = classnames({
        unreads: true,
        active: this.state.unreadsAbove
      });
      var unreadsBelowClass = classnames({
        unreads: true,
        active: this.state.unreadsBelow
      });
      var unreadsAbove = this.state.threadActive ? null : react.createElement(
        "div",
        {
          className: unreadsAboveClass,
          type: "above",
          onClick: this.handleClickUnreads
        },
        "\u2191 Unread Messages \u2191"
      );

      var teamName = this.props.team ? this.props.team.name : "";

      return react.createElement(
        "div",
        { className: streamClass, ref: function ref(_ref9) {
            return _this3._div = _ref9;
          } },
        react.createElement(EditingIndicator, {
          editingUsers: this.props.editingUsers,
          inactive: this.state.threadActive // or if no fileStream
          , currentUser: this.props.currentUser,
          teamMembers: this.props.teamMembersById
        }),
        react.createElement(
          "div",
          { className: mainPanelClass, ref: function ref(_ref7) {
              return _this3._mainPanel = _ref7;
            } },
          react.createElement(
            "div",
            { className: "stream-header", ref: function ref(_ref4) {
                return _this3._header = _ref4;
              } },
            react.createElement(
              "span",
              null,
              teamName
            ),
            react.createElement("span", {
              onClick: this.props.goToInvitePage,
              className: "icon icon-organization"
            })
          ),
          unreadsAbove,
          react.createElement(
            "div",
            {
              className: postsListClass,
              ref: function ref(_ref6) {
                return _this3._postslist = _ref6;
              },
              onClick: this.handleClickPost,
              id: streamDivId
            },
            react.createElement(
              "div",
              { className: "intro", ref: function ref(_ref5) {
                  return _this3._intro = _ref5;
                } },
              this.renderIntro()
            ),
            posts.map(function (post) {
              if (post.deactivated) return null;
              // this needs to be done by storing the return value of the render,
              // then setting lastTimestamp, otherwise you wouldn't be able to
              // compare the current one to the prior one.
              var parentPost = post.parentPostId ? posts.find(function (p) {
                return p.id === post.parentPostId;
              }) : null;
              var newMessageIndicator = post.seqNum && post.seqNum === Number(_this3.postWithNewMessageIndicator);
              unread = unread || newMessageIndicator;
              var returnValue = react.createElement(
                "div",
                { key: post.id },
                react.createElement(DateSeparator, {
                  timestamp1: lastTimestamp,
                  timestamp2: post.createdAt
                }),
                react.createElement(Post$1, {
                  post: post,
                  usernames: _this3.props.usernamesRegexp,
                  currentUsername: _this3.props.currentUser.username,
                  replyingTo: parentPost,
                  newMessageIndicator: newMessageIndicator,
                  unread: unread,
                  editing: !_this3.state.threadActive && post.id === _this3.state.editingPostId
                })
              );
              lastTimestamp = post.createdAt;
              return returnValue;
            })
          )
        ),
        react.createElement(
          "div",
          { className: threadPanelClass },
          react.createElement(
            "div",
            {
              id: "close-thread",
              className: "stream-header",
              onClick: this.handleDismissThread
            },
            react.createElement(
              "span",
              null,
              "< Back to Stream "
            ),
            react.createElement(
              "span",
              { className: "keybinding" },
              "[esc]"
            )
          ),
          react.createElement(
            "div",
            {
              className: threadPostsListClass,
              ref: function ref(_ref8) {
                return _this3._threadpostslist = _ref8;
              },
              onClick: this.handleClickPost
            },
            threadPost && react.createElement(Post$1, {
              post: threadPost,
              usernames: this.props.usernamesRegexp,
              currentUsername: this.props.currentUser.username,
              key: threadPost.id,
              showDetails: "1",
              currentCommit: this.props.currentCommit,
              editing: this.state.threadActive && threadPost.id === this.state.editingPostId
            }),
            this.renderThreadPosts(threadId)
          )
        ),
        react.createElement(
          "div",
          {
            className: unreadsBelowClass,
            type: "below",
            onClick: this.handleClickUnreads
          },
          "\u2193 Unread Messages \u2193"
        ),
        react.createElement(ComposeBox$1, {
          placeholder: placeholderText,
          teammates: this.props.teammates,
          ref: this._compose,
          disabled: this.props.isOffline,
          onSubmit: this.submitPost,
          onEmptyUpArrow: this.editLastPost,
          findMentionedUserIds: this.findMentionedUserIds
        })
      );
    }
  }, {
    key: "findMyPostBeforeSeqNum",
    value: function findMyPostBeforeSeqNum(seqNum) {
      var me = this.props.currentUser.username;
      return underscore.chain(this.props.posts).filter(function (post) {
        return post.author.username === me && post.seqNum < seqNum;
      }).last().value();
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(_event) {
      var _this4 = this;

      var scrollDiv = this._postslist;

      if (!scrollDiv) {
        // console.log("Couldn't find scrollDiv for ", event);
        return;
      }

      var scrollTop = scrollDiv.scrollTop;
      var containerHeight = scrollDiv.parentNode.offsetHeight;
      var scrollHeight = scrollDiv.scrollHeight;
      var offBottom = scrollHeight - scrollTop - scrollDiv.offsetHeight;
      var scrolledOffBottom = offBottom > 100;
      // console.log("OB IS: ", offBottom);
      if (scrolledOffBottom !== this.state.scrolledOffBottom) this.setState({ scrolledOffBottom: scrolledOffBottom });

      var unreadsAbove = false;
      var unreadsBelow = false;

      var umiDivs = scrollDiv.getElementsByClassName("unread");
      Array.from(umiDivs).forEach(function (umi) {
        var top = umi.offsetTop;
        if (top - scrollTop + 10 < 0) {
          if (!unreadsAbove) unreadsAbove = umi;
        } else if (top - scrollTop + 60 + umi.offsetHeight > containerHeight) {
          unreadsBelow = umi;
        } else if (_this4.props.hasFocus) {
          umi.classList.remove("unread");
        }
      });
      if (this.state.unreadsAbove != unreadsAbove) this.setState({ unreadsAbove: unreadsAbove });
      if (this.state.unreadsBelow != unreadsBelow) this.setState({ unreadsBelow: unreadsBelow });
    }

    // dismiss the thread stream and return to the main stream


    // by clicking on the post, we select it


    // show the thread related to the given post, and if there is
    // a codeblock, scroll to it and select it


    // not using a gutter for now
    // installGutter() {
    // 	let editor = atom.workspace.getActiveTextEditor();
    // 	if (editor && !editor.gutterWithName("CodeStream")) {
    // 		editor.addGutter({ name: "CodeStream", priority: 150 });
    // 	}
    // }

  }, {
    key: "handleEscape",
    value: function handleEscape(event) {
      if (this.state.editingPostId) this.handleDismissEdit();else if (this.state.threadActive) this.handleDismissThread();else event.abortKeyBinding();
    }
  }, {
    key: "handleDismissEdit",
    value: function handleDismissEdit() {
      this.setState({ editingPostId: null });
      this.focusInput();
    }

    // return true if we are able to use substitute
    // to edit the text of my last post

  }, {
    key: "substituteLastPost",
    value: function substituteLastPost(substitute) {
      // nothing to substitute? return false
      if (!substitute) return false;

      // if we can't find my last post in the stream, return false
      var myLastPost = this.findMyPostBeforeSeqNum(9999999999);
      if (!myLastPost) return false;

      var find = substitute[1];
      var replace = substitute[2];
      // const modifier = substitute[3]; // not used yet
      var newText = myLastPost.text.replace(find, replace);
      if (newText !== myLastPost.text) {
        this.replacePostText(myLastPost.id, newText);
        return true;
      } else return false;
    }

    // create a new post

  }]);
  return SimpleStream;
}(react_1);

var mapStateToProps = function mapStateToProps(_ref10) {
  var configs = _ref10.configs,
      connectivity = _ref10.connectivity,
      session = _ref10.session,
      context = _ref10.context,
      streams = _ref10.streams,
      users = _ref10.users,
      posts = _ref10.posts,
      messaging = _ref10.messaging,
      teams = _ref10.teams,
      onboarding = _ref10.onboarding;

  // TODO: figure out a way to do this elsewhere
  Object.keys(users).forEach(function (key, index) {
    users[key].color = index % 10;
    if (!users[key].username) {
      var email = users[key].email;
      if (email) users[key].username = email.replace(/@.*/, "");
    }
  });

  var fileStream = getStreamForRepoAndFile(streams, context.currentRepoId, context.currentFile) || {};

  var teamMembers = teams[context.currentTeamId].memberIds.map(function (id) {
    return users[id];
  }).filter(Boolean);

  // this usenames regexp is a pipe-separated list of
  // either usernames or if no username exists for the
  // user then his email address. it is sorted by length
  // so that the longest possible match will be made.
  var usernamesRegexp = teamMembers.map(function (user) {
    return user.username || "";
  }).sort(function (a, b) {
    return b.length - a.length;
  }).join("|").replace(/\|\|+/g, "|") // remove blank identifiers
  .replace(/\+/g, "\\+") // replace + and . with escaped versions so
  .replace(/\./g, "\\."); // that the regexp matches the literal chars

  var isOffline = connectivity.offline || messaging.failedSubscriptions.length > 0 || messaging.timedOut;

  // FIXME -- eventually we'll allow the user to switch to other streams, like DMs and channels
  var teamStream = getStreamForTeam(streams, context.currentTeamId) || {};
  var streamPosts = getPostsForStream(posts, teamStream.id);

  return {
    configs: configs,
    isOffline: isOffline,
    teamMembersById: toMapBy("id", teamMembers),
    teammates: teamMembers.filter(function (_ref11) {
      var id = _ref11.id;
      return id !== session.userId;
    }),
    postStreamId: teamStream.id,
    fileStreamId: fileStream.id,
    teamId: context.currentTeamId,
    repoId: context.currentRepoId,
    hasFocus: context.hasFocus,
    firstTimeInAtom: onboarding.firstTimeInAtom,
    currentFile: context.currentFile,
    currentCommit: context.currentCommit,
    editingUsers: fileStream.editingUsers,
    usernamesRegexp: usernamesRegexp,
    currentUser: users[session.userId],
    team: teams[context.currentTeamId],
    posts: streamPosts.map(function (post) {
      var user = users[post.creatorId];
      if (!user) {
        console.warn("Redux store doesn't have a user with id " + post.creatorId + " for post with id " + post.id);
        user = {
          username: "Unknown user",
          email: "",
          firstName: "",
          lastName: ""
        };
      }
      var _user = user,
          username = _user.username,
          email = _user.email,
          _user$firstName = _user.firstName,
          firstName = _user$firstName === undefined ? "" : _user$firstName,
          _user$lastName = _user.lastName,
          lastName = _user$lastName === undefined ? "" : _user$lastName,
          color = _user.color;

      return _extends$4({}, post, {
        author: {
          username: username,
          email: email,
          color: color,
          fullName: (firstName + " " + lastName).trim()
        }
      });
    })
  };
};

var Stream = connect(mapStateToProps, _extends$4({}, actions, {
  goToInvitePage: function goToInvitePage() {} // FIXME: routingActions.goToInvitePage
}))(SimpleStream);

var index = {
  ComposeBox: ComposeBox$1,
  DateSeparator: DateSeparator,
  EditingIndicator: EditingIndicator,
  Post: Post$1,
  Stream: Stream
};

module.exports = index;
