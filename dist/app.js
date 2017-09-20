/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

window.JSCompiler_renameProperty = function (prop, obj) {
  return prop;
};

/** @namespace */
let Polymer;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["dashToCamelCase"] = dashToCamelCase;
/* harmony export (immutable) */ __webpack_exports__["camelToDashCase"] = camelToDashCase;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


const caseMap = {};
const DASH_TO_CAMEL = /-[a-z]/g;
const CAMEL_TO_DASH = /([A-Z])/g;

function dashToCamelCase(dash) {
  return caseMap[dash] || (caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL, m => m[1].toUpperCase()));
}

function camelToDashCase(camel) {
  return caseMap[camel] || (caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase());
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return resolveCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return resolveUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pathFromUrl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


let CSS_URL_RX = /(url\()([^)]*)(\))/g;
let ABS_URL = /(^\/)|(^#)|(^[\w-\d]*:)/;
let workingURL;
let resolveDoc;
/**
 * Resolves the given URL against the provided `baseUri'.
 *
 * @memberof Polymer.ResolveUrl
 * @param {string} url Input URL to resolve
 * @param {?string=} baseURI Base URI to resolve the URL against
 * @return {string} resolved URL
 */
function resolveUrl(url, baseURI) {
  if (url && ABS_URL.test(url)) {
    return url;
  }
  // Lazy feature detection.
  if (workingURL === undefined) {
    workingURL = false;
    try {
      const u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      workingURL = u.href === 'http://a/c%20d';
    } catch (e) {
      // silently fail
    }
  }
  if (!baseURI) {
    baseURI = document.baseURI || window.location.href;
  }
  if (workingURL) {
    return new URL(url, baseURI).href;
  }
  // Fallback to creating an anchor into a disconnected document.
  if (!resolveDoc) {
    resolveDoc = document.implementation.createHTMLDocument('temp');
    resolveDoc.base = resolveDoc.createElement('base');
    resolveDoc.head.appendChild(resolveDoc.base);
    resolveDoc.anchor = resolveDoc.createElement('a');
    resolveDoc.body.appendChild(resolveDoc.anchor);
  }
  resolveDoc.base.href = baseURI;
  resolveDoc.anchor.href = url;
  return resolveDoc.anchor.href || url;
}

/**
 * Resolves any relative URL's in the given CSS text against the provided
 * `ownerDocument`'s `baseURI`.
 *
 * @memberof Polymer.ResolveUrl
 * @param {string} cssText CSS text to process
 * @param {string} baseURI Base URI to resolve the URL against
 * @return {string} Processed CSS text with resolved URL's
 */
function resolveCss(cssText, baseURI) {
  return cssText.replace(CSS_URL_RX, function (m, pre, url, post) {
    return pre + '\'' + resolveUrl(url.replace(/["']/g, ''), baseURI) + '\'' + post;
  });
}

/**
 * Returns a path from a given `url`. The path includes the trailing
 * `/` from the url.
 *
 * @memberof Polymer.ResolveUrl
 * @param {string} url Input URL to transform
 * @return {string} resolved path
 */
function pathFromUrl(url) {
  return url.substring(0, url.lastIndexOf('/') + 1);
}





/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


// unique global id for deduping mixins.
let dedupeId = 0;

/**
 * @constructor
 * @extends {Function}
 */
function MixinFunction() {}
/** @type {(WeakMap | undefined)} */
MixinFunction.prototype.__mixinApplications;
/** @type {(Object | undefined)} */
MixinFunction.prototype.__mixinSet;

const dedupingMixin = function (mixin) {
  let mixinApplications = /** @type {!MixinFunction} */mixin.__mixinApplications;
  if (!mixinApplications) {
    mixinApplications = new WeakMap();
    /** @type {!MixinFunction} */mixin.__mixinApplications = mixinApplications;
  }
  // maintain a unique id for each mixin
  let mixinDedupeId = dedupeId++;
  function dedupingMixin(base) {
    let baseSet = /** @type {!MixinFunction} */base.__mixinSet;
    if (baseSet && baseSet[mixinDedupeId]) {
      return base;
    }
    let map = mixinApplications;
    let extended = map.get(base);
    if (!extended) {
      extended = /** @type {!Function} */mixin(base);
      map.set(base, extended);
    }
    // copy inherited mixin set from the extended class, or the base class
    // NOTE: we avoid use of Set here because some browser (IE11)
    // cannot extend a base Set via the constructor.
    let mixinSet = Object.create( /** @type {!MixinFunction} */extended.__mixinSet || baseSet || null);
    mixinSet[mixinDedupeId] = true;
    /** @type {!MixinFunction} */extended.__mixinSet = mixinSet;
    return extended;
  }

  return dedupingMixin;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = dedupingMixin;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Settings */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rootPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sanitizeDOMValue; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resolve_url_js__ = __webpack_require__(2);



/**
 * Legacy settings.
 * @namespace
 * @memberof Polymer
 */
const settings = undefined || {};
const useShadow = !window.ShadyDOM;
/* unused harmony export useShadow */

const useNativeCSSProperties = Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
/* unused harmony export useNativeCSSProperties */

const useNativeCustomElements = !window.customElements.polyfillWrapFlushCallback;
/* unused harmony export useNativeCustomElements */



/**
 * Globally settable property that is automatically assigned to
 * `Polymer.ElementMixin` instances, useful for binding in templates to
 * make URL's relative to an application's root.  Defaults to the main
 * document URL, but can be overridden by users.  It may be useful to set
 * `Polymer.rootPath` to provide a stable application mount path when
 * using client side routing.
 *
 * @memberof Polymer
 */
let rootPath = undefined || Object(__WEBPACK_IMPORTED_MODULE_1__resolve_url_js__["a" /* pathFromUrl */])(document.baseURI || window.location.href);



const setRootPath = function (path) {
  rootPath = path;
};
/* unused harmony export setRootPath */


/**
 * A global callback used to sanitize any value before inserting it into the DOM. The callback signature is:
 *
 *     Polymer = {
 *       sanitizeDOMValue: function(value, name, type, node) { ... }
 *     }
 *
 * Where:
 *
 * `value` is the value to sanitize.
 * `name` is the name of an attribute or property (for example, href).
 * `type` indicates where the value is being inserted: one of property, attribute, or text.
 * `node` is the node where the value is being inserted.
 *
 * @type {(function(*,string,string,Node):*)|undefined}
 * @memberof Polymer
 */
let sanitizeDOMValue = undefined;



const setSanitizeDOMValue = function (newSanitizeDOMValue) {
  sanitizeDOMValue = newSanitizeDOMValue;
};
/* unused harmony export setSanitizeDOMValue */


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fh_clubs__ = __webpack_require__(7);




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_polymer_element__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_html__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__template_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__props__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polymer_polymer_lib_elements_dom_repeat__ = __webpack_require__(21);







class FengHuangClubs extends __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_polymer_element__["a" /* Element */] {

  static get template() {
    return __WEBPACK_IMPORTED_MODULE_1__template_html___default.a;
  }

  static get properties() {
    return __WEBPACK_IMPORTED_MODULE_2__props__["a" /* default */];
  }

  _computeSelectedDay(selected) {
    const classes = ['button', 'button-small', 'button-outline'];
    return selected ? classes.filter(elem => {
      return elem !== 'button-outline';
    }).join(' ') : classes.join(' ');
  }

  _computeText(data) {
    return `Cerca tra i ${data.length} club della scuola Feng Huang (per nome o paese)`;
  }

  _filter() {
    this.filtered = this._search(this.data);
    this.markers = this._getMarkers(this.filtered);
  }

  _updateQuery(evt) {
    this.query = evt.currentTarget.value;
    this._filter();
  }

  _search(data) {
    if (this.query.length) {
      const query = this.query.toLowerCase();
      return data.filter((e, i) => {
        const byName = e.name.toLowerCase().search(query) > -1;
        const byCity = e.city.toLowerCase().search(query) > -1;
        return byName || byCity;
      });
    } else {
      return data;
    }
  }

  _getMarkers(data) {
    const filtered = data.map((e, i) => {
      e.days ? e.days.map(elem => {
        elem.name = e.name;
        return elem;
      }) : null;
      return {
        "days": e.days,
        "name": e.name
      };
    }).filter((e, i) => {
      return e.days;
    });
    if (data.length > 1) {
      return filtered.reduce((a, b) => {
        const concat = a.days ? a.days.concat(b.days) : a.concat(b.days);
        return concat;
      });
    } else {
      return filtered[0] ? filtered[0].days : filtered;
    }
  }

  _selectDays(evt) {
    const index = parseInt(evt.currentTarget.dataset.index);
    const selected = !this.daysOpts[index].selected;
    this.daysOpts = [...this.daysOpts.slice(0, index), Object.assign({}, this.daysOpts[index], { selected: selected }), ...this.daysOpts.slice(index + 1)];
    console.log(index, selected, this.daysOpts);
  }

  _selectMarker(evt) {
    const name = evt.target.dataset.name;
    this.query = name;
    this._filter();
  }

  connectedCallback() {
    super.connectedCallback();
    this._filter();
  }
}

customElements.define('fh-clubs', FengHuangClubs);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Element; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_mixins_element_mixin_js__ = __webpack_require__(9);


/**
 * Base class that provides the core API for Polymer's meta-programming
 * features including template stamping, data-binding, attribute deserialization,
 * and property change observation.
 *
 * @customElement
 * @polymer
 * @memberof Polymer
 * @constructor
 * @implements {Polymer_ElementMixin}
 * @extends HTMLElement
 * @appliesMixin Polymer.ElementMixin
 * @summary Custom element base class that provides the core API for Polymer's
 *   key meta-programming features including template stamping, data-binding,
 *   attribute deserialization, and property change observation
 */
const Element = Object(__WEBPACK_IMPORTED_MODULE_0__lib_mixins_element_mixin_js__["a" /* ElementMixin */])(HTMLElement);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export instanceCount */
/* unused harmony export _regLog */
/* unused harmony export register */
/* unused harmony export dumpRegistrations */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_settings_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_mixin_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_style_gather_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_resolve_url_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__property_effects_js__ = __webpack_require__(12);










const ElementMixin = Object(__WEBPACK_IMPORTED_MODULE_2__utils_mixin_js__["a" /* dedupingMixin */])(base => {

  /**
   * @constructor
   * @extends {base}
   * @implements {Polymer_PropertyEffects}
   */
  const polymerElementBase = Object(__WEBPACK_IMPORTED_MODULE_7__property_effects_js__["a" /* PropertyEffects */])(base);

  let caseMap = __WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__;

  /**
   * Returns the `properties` object specifically on `klass`. Use for:
   * (1) super chain mixes togther to make `propertiesForClass` which is
   * then used to make `observedAttributes`.
   * (2) properties effects and observers are created from it at `finalize` time.
   *
   * @param {HTMLElement} klass Element class
   * @return {Object} Object containing own properties for this class
   * @private
   */
  function ownPropertiesForClass(klass) {
    if (!klass.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', klass))) {
      klass.__ownProperties = klass.hasOwnProperty(JSCompiler_renameProperty('properties', klass)) ?
      /** @type PolymerElementConstructor */klass.properties : {};
    }
    return klass.__ownProperties;
  }

  /**
   * Returns the `observers` array specifically on `klass`. Use for
   * setting up observers.
   *
   * @param {HTMLElement} klass Element class
   * @return {Array} Array containing own observers for this class
   * @private
   */
  function ownObserversForClass(klass) {
    if (!klass.hasOwnProperty(JSCompiler_renameProperty('__ownObservers', klass))) {
      klass.__ownObservers = klass.hasOwnProperty(JSCompiler_renameProperty('observers', klass)) ?
      /** @type PolymerElementConstructor */klass.observers : [];
    }
    return klass.__ownObservers;
  }

  /**
   * Mixes `props` into `flattenedProps` but upgrades shorthand type
   * syntax to { type: Type}.
   *
   * @param {Object} flattenedProps Bag to collect flattened properties into
   * @param {Object} props Bag of properties to add to `flattenedProps`
   * @return {Object} The input `flattenedProps` bag
   * @private
   */
  function flattenProperties(flattenedProps, props) {
    for (let p in props) {
      let o = props[p];
      if (typeof o == 'function') {
        o = { type: o };
      }
      flattenedProps[p] = o;
    }
    return flattenedProps;
  }

  /**
   * Returns a flattened list of properties mixed together from the chain of all
   * constructor's `config.properties`. This list is used to create
   * (1) observedAttributes,
   * (2) class property default values
   *
   * @param {PolymerElementConstructor} klass Element class
   * @return {PolymerElementProperties} Flattened properties for this class
   * @suppress {missingProperties} class.prototype is not a property for some reason?
   * @private
   */
  function propertiesForClass(klass) {
    if (!klass.hasOwnProperty(JSCompiler_renameProperty('__classProperties', klass))) {
      klass.__classProperties = flattenProperties({}, ownPropertiesForClass(klass));
      let superCtor = Object.getPrototypeOf(klass.prototype).constructor;
      if (superCtor.prototype instanceof PolymerElement) {
        klass.__classProperties = Object.assign(Object.create(propertiesForClass( /** @type PolymerElementConstructor */superCtor)), klass.__classProperties);
      }
    }
    return klass.__classProperties;
  }

  /**
   * Returns a list of properties with default values.
   * This list is created as an optimization since it is a subset of
   * the list returned from `propertiesForClass`.
   * This list is used in `_initializeProperties` to set property defaults.
   *
   * @param {PolymerElementConstructor} klass Element class
   * @return {PolymerElementProperties} Flattened properties for this class
   *   that have default values
   * @private
   */
  function propertyDefaultsForClass(klass) {
    if (!klass.hasOwnProperty(JSCompiler_renameProperty('__classPropertyDefaults', klass))) {
      klass.__classPropertyDefaults = null;
      let props = propertiesForClass(klass);
      for (let p in props) {
        let info = props[p];
        if ('value' in info) {
          klass.__classPropertyDefaults = klass.__classPropertyDefaults || {};
          klass.__classPropertyDefaults[p] = info;
        }
      }
    }
    return klass.__classPropertyDefaults;
  }

  /**
   * Returns true if a `klass` has finalized. Called in `ElementClass.finalize()`
   * @param {PolymerElementConstructor} klass Element class
   * @return {boolean} True if all metaprogramming for this class has been
   *   completed
   * @private
   */
  function hasClassFinalized(klass) {
    return klass.hasOwnProperty(JSCompiler_renameProperty('__finalized', klass));
  }

  /**
   * Called by `ElementClass.finalize()`. Ensures this `klass` and
   * *all superclasses* are finalized by traversing the prototype chain
   * and calling `klass.finalize()`.
   *
   * @param {PolymerElementConstructor} klass Element class
   * @private
   */
  function finalizeClassAndSuper(klass) {
    let proto = /** @type PolymerElementConstructor */klass.prototype;
    let superCtor = Object.getPrototypeOf(proto).constructor;
    if (superCtor.prototype instanceof PolymerElement) {
      superCtor.finalize();
    }
    finalizeClass(klass);
  }

  /**
   * Configures a `klass` based on a staic `klass.config` object and
   * a `template`. This includes creating accessors and effects
   * for properties in `config` and the `template` as well as preparing the
   * `template` for stamping.
   *
   * @param {PolymerElementConstructor} klass Element class
   * @private
   */
  function finalizeClass(klass) {
    klass.__finalized = true;
    let proto = /** @type PolymerElementConstructor */klass.prototype;
    if (klass.hasOwnProperty(JSCompiler_renameProperty('is', klass)) && klass.is) {
      register(proto);
    }
    let props = ownPropertiesForClass(klass);
    if (props) {
      finalizeProperties(proto, props);
    }
    let observers = ownObserversForClass(klass);
    if (observers) {
      finalizeObservers(proto, observers, props);
    }
    // note: create "working" template that is finalized at instance time
    let template = /** @type PolymerElementConstructor */klass.template;
    if (template) {
      if (typeof template === 'string') {
        let t = document.createElement('template');
        t.innerHTML = template;
        template = t;
      } else {
        template = template.cloneNode(true);
      }
      proto._template = template;
    }
  }

  /**
   * Configures a `proto` based on a `properties` object.
   * Leverages `PropertyEffects` to create property accessors and effects
   * supporting, observers, reflecting to attributes, change notification,
   * computed properties, and read only properties.
   * @param {PolymerElement} proto Element class prototype to add accessors
   *    and effects to
   * @param {Object} properties Flattened bag of property descriptors for
   *    this class
   * @private
   */
  function finalizeProperties(proto, properties) {
    for (let p in properties) {
      createPropertyFromConfig(proto, p, properties[p], properties);
    }
  }

  /**
   * Configures a `proto` based on a `observers` array.
   * Leverages `PropertyEffects` to create observers.
   * @param {PolymerElement} proto Element class prototype to add accessors
   *   and effects to
   * @param {Object} observers Flattened array of observer descriptors for
   *   this class
   * @param {Object} dynamicFns Object containing keys for any properties
   *   that are functions and should trigger the effect when the function
   *   reference is changed
   * @private
   */
  function finalizeObservers(proto, observers, dynamicFns) {
    for (let i = 0; i < observers.length; i++) {
      proto._createMethodObserver(observers[i], dynamicFns);
    }
  }

  /**
   * Creates effects for a property.
   *
   * Note, once a property has been set to
   * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
   * these values may not be changed. For example, a subclass cannot
   * alter these settings. However, additional `observers` may be added
   * by subclasses.
   *
   * The info object should may contain property metadata as follows:
   *
   * * `type`: {function} type to which an attribute matching the property
   * is deserialized. Note the property is camel-cased from a dash-cased
   * attribute. For example, 'foo-bar' attribute is dersialized to a
   * property named 'fooBar'.
   *
   * * `readOnly`: {boolean} creates a readOnly property and
   * makes a private setter for the private of the form '_setFoo' for a
   * property 'foo',
   *
   * * `computed`: {string} creates a computed property. A computed property
   * also automatically is set to `readOnly: true`. The value is calculated
   * by running a method and arguments parsed from the given string. For
   * example 'compute(foo)' will compute a given property when the
   * 'foo' property changes by executing the 'compute' method. This method
   * must return the computed value.
   *
   * * `reflectToAttriute`: {boolean} If true, the property value is reflected
   * to an attribute of the same name. Note, the attribute is dash-cased
   * so a property named 'fooBar' is reflected as 'foo-bar'.
   *
   * * `notify`: {boolean} sends a non-bubbling notification event when
   * the property changes. For example, a property named 'foo' sends an
   * event named 'foo-changed' with `event.detail` set to the value of
   * the property.
   *
   * * observer: {string} name of a method that runs when the property
   * changes. The arguments of the method are (value, previousValue).
   *
   * Note: Users may want control over modifying property
   * effects via subclassing. For example, a user might want to make a
   * reflectToAttribute property not do so in a subclass. We've chosen to
   * disable this because it leads to additional complication.
   * For example, a readOnly effect generates a special setter. If a subclass
   * disables the effect, the setter would fail unexpectedly.
   * Based on feedback, we may want to try to make effects more malleable
   * and/or provide an advanced api for manipulating them.
   * Also consider adding warnings when an effect cannot be changed.
   *
   * @param {PolymerElement} proto Element class prototype to add accessors
   *   and effects to
   * @param {string} name Name of the property.
   * @param {Object} info Info object from which to create property effects.
   * Supported keys:
   * @param {Object} allProps Flattened map of all properties defined in this
   *   element (including inherited properties)
   * @private
   */
  function createPropertyFromConfig(proto, name, info, allProps) {
    // computed forces readOnly...
    if (info.computed) {
      info.readOnly = true;
    }
    // Note, since all computed properties are readOnly, this prevents
    // adding additional computed property effects (which leads to a confusing
    // setup where multiple triggers for setting a property)
    // While we do have `hasComputedEffect` this is set on the property's
    // dependencies rather than itself.
    if (info.computed && !proto._hasReadOnlyEffect(name)) {
      proto._createComputedProperty(name, info.computed, allProps);
    }
    if (info.readOnly && !proto._hasReadOnlyEffect(name)) {
      proto._createReadOnlyProperty(name, !info.computed);
    }
    if (info.reflectToAttribute && !proto._hasReflectEffect(name)) {
      proto._createReflectedProperty(name);
    }
    if (info.notify && !proto._hasNotifyEffect(name)) {
      proto._createNotifyingProperty(name);
    }
    // always add observer
    if (info.observer) {
      proto._createPropertyObserver(name, info.observer, allProps[info.observer]);
    }
  }

  /**
   * Configures an element `proto` to function with a given `template`.
   * The element name `is` and extends `ext` must be specified for ShadyCSS
   * style scoping.
   *
   * @param {PolymerElement} proto Element class prototype to add accessors
   *   and effects to
   * @param {!HTMLTemplateElement} template Template to process and bind
   * @param {string} baseURI URL against which to resolve urls in
   *   style element cssText
   * @param {string} is Tag name (or type extension name) for this element
   * @param {string=} ext For type extensions, the tag name that was extended
   * @private
   */
  function finalizeTemplate(proto, template, baseURI, is, ext) {
    // support `include="module-name"`
    let cssText = Object(__WEBPACK_IMPORTED_MODULE_4__utils_style_gather_js__["a" /* cssFromModuleImports */])(is) + Object(__WEBPACK_IMPORTED_MODULE_4__utils_style_gather_js__["b" /* cssFromTemplate */])(template, baseURI);
    if (cssText) {
      let style = document.createElement('style');
      style.textContent = cssText;
      template.content.insertBefore(style, template.content.firstChild);
    }
    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(template, is, ext);
    }
    proto._bindTemplate(template);
  }

  /**
   * @polymer
   * @mixinClass
   * @unrestricted
   * @implements {Polymer_ElementMixin}
   */
  class PolymerElement extends polymerElementBase {

    /**
     * Standard Custom Elements V1 API.  The default implementation returns
     * a list of dash-cased attributes based on a flattening of all properties
     * declared in `static get properties()` for this element and any
     * superclasses.
     *
     * @return {Array} Observed attribute list
     */
    static get observedAttributes() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('__observedAttributes', this))) {
        let list = [];
        let properties = propertiesForClass(this);
        for (let prop in properties) {
          list.push(Object(__WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__["camelToDashCase"])(prop));
        }
        this.__observedAttributes = list;
      }
      return this.__observedAttributes;
    }

    /**
     * Called automatically when the first element instance is created to
     * ensure that class finalization work has been completed.
     * May be called by users to eagerly perform class finalization work
     * prior to the creation of the first element instance.
     *
     * Class finalization work generally includes meta-programming such as
     * creating property accessors and any property effect metadata needed for
     * the features used.
     *
     * @public
     */
    static finalize() {
      if (!hasClassFinalized(this)) {
        finalizeClassAndSuper(this);
      }
    }

    /**
     * Returns the template that will be stamped into this element's shadow root.
     *
     * If a `static get is()` getter is defined, the default implementation
     * will return the first `<template>` in a `dom-module` whose `id`
     * matches this element's `is`.
     *
     * Users may override this getter to return an arbitrary template
     * (in which case the `is` getter is unnecessary). The template returned
     * may be either an `HTMLTemplateElement` or a string that will be
     * automatically parsed into a template.
     *
     * Note that when subclassing, if the super class overrode the default
     * implementation and the subclass would like to provide an alternate
     * template via a `dom-module`, it should override this getter and
     * return `Polymer.DomModule.import(this.is, 'template')`.
     *
     * If a subclass would like to modify the super class template, it should
     * clone it rather than modify it in place.  If the getter does expensive
     * work such as cloning/modifying a template, it should memoize the
     * template for maximum performance:
     *
     *   let memoizedTemplate;
     *   class MySubClass extends MySuperClass {
     *     static get template() {
     *       if (!memoizedTemplate) {
     *         memoizedTemplate = super.template.cloneNode(true);
     *         let subContent = document.createElement('div');
     *         subContent.textContent = 'This came from MySubClass';
     *         memoizedTemplate.content.appendChild(subContent);
     *       }
     *       return memoizedTemplate;
     *     }
     *   }
     *
     * @return {HTMLTemplateElement|string} Template to be stamped
     */
    static get template() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('_template', this))) {
        this._template = __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__["a" /* DomModule */] && __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__["a" /* DomModule */].import(
        /** @type PolymerElementConstructor*/this.is, 'template') ||
        // note: implemented so a subclass can retrieve the super
        // template; call the super impl this way so that `this` points
        // to the superclass.
        Object.getPrototypeOf( /** @type PolymerElementConstructor*/this.prototype).constructor.template;
      }
      return this._template;
    }

    /**
     * Path matching the url from which the element was imported.
     * This path is used to resolve url's in template style cssText.
     * The `importPath` property is also set on element instances and can be
     * used to create bindings relative to the import path.
     * Defaults to the path matching the url containing a `dom-module` element
     * matching this element's static `is` property.
     * Note, this path should contain a trailing `/`.
     *
     * @return {string} The import path for this element class
     */
    static get importPath() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
        const module = __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__["a" /* DomModule */] && __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__["a" /* DomModule */].import( /** @type PolymerElementConstructor */this.is);
        this._importPath = module ? module.assetpath : '' || Object.getPrototypeOf( /** @type PolymerElementConstructor*/this.prototype).constructor.importPath;
      }
      return this._importPath;
    }

    constructor() {
      super();
      /** @type {HTMLTemplateElement} */
      this._template;
      /** @type {string} */
      this._importPath;
      /** @type {string} */
      this.rootPath;
      /** @type {string} */
      this.importPath;
      /** @type {StampedTemplate | HTMLElement | ShadowRoot} */
      this.root;
      /** @type {!Object<string, !Node>} */
      this.$;
    }

    /**
     * Overrides the default `Polymer.PropertyAccessors` to ensure class
     * metaprogramming related to property accessors and effects has
     * completed (calls `finalize`).
     *
     * It also initializes any property defaults provided via `value` in
     * `properties` metadata.
     *
     * @override
     * @suppress {invalidCasts}
     */
    _initializeProperties() {
      instanceCount++;
      this.constructor.finalize();
      const importPath = this.constructor.importPath;
      // note: finalize template when we have access to `localName` to
      // avoid dependence on `is` for polyfilling styling.
      if (this._template && !this._template.__polymerFinalized) {
        this._template.__polymerFinalized = true;
        const baseURI = importPath ? Object(__WEBPACK_IMPORTED_MODULE_5__utils_resolve_url_js__["c" /* resolveUrl */])(importPath) : '';
        finalizeTemplate( /** @type {!PolymerElement} */this.__proto__, this._template, baseURI,
        /**@type {!HTMLElement}*/this.localName);
      }
      super._initializeProperties();
      // set path defaults
      this.rootPath = __WEBPACK_IMPORTED_MODULE_1__utils_settings_js__["a" /* rootPath */];
      this.importPath = importPath;
      // apply property defaults...
      let p$ = propertyDefaultsForClass(this.constructor);
      if (!p$) {
        return;
      }
      for (let p in p$) {
        let info = p$[p];
        // Don't set default value if there is already an own property, which
        // happens when a `properties` property with default but no effects had
        // a property set (e.g. bound) by its host before upgrade
        if (!this.hasOwnProperty(p)) {
          let value = typeof info.value == 'function' ? info.value.call(this) : info.value;
          // Set via `_setProperty` if there is an accessor, to enable
          // initializing readOnly property defaults
          if (this._hasAccessor(p)) {
            this._setPendingProperty(p, value, true);
          } else {
            this[p] = value;
          }
        }
      }
    }

    /**
     * Provides a default implementation of the standard Custom Elements
     * `connectedCallback`.
     *
     * The default implementation enables the property effects system and
     * flushes any pending properties, and updates shimmed CSS properties
     * when using the ShadyCSS scoping/custom properties polyfill.
     *
     * @suppress {invalidCasts}
     */
    connectedCallback() {
      if (window.ShadyCSS && this._template) {
        window.ShadyCSS.styleElement( /** @type {!HTMLElement} */this);
      }
      this._enableProperties();
    }

    /**
     * Provides a default implementation of the standard Custom Elements
     * `disconnectedCallback`.
     */
    disconnectedCallback() {}

    /**
     * Stamps the element template.
     *
     * @override
     */
    ready() {
      if (this._template) {
        this.root = this._stampTemplate(this._template);
        this.$ = this.root.$;
      }
      super.ready();
    }

    /**
     * Implements `PropertyEffects`'s `_readyClients` call. Attaches
     * element dom by calling `_attachDom` with the dom stamped from the
     * element's template via `_stampTemplate`. Note that this allows
     * client dom to be attached to the element prior to any observers
     * running.
     *
     * @override
     */
    _readyClients() {
      if (this._template) {
        this.root = this._attachDom( /** @type {StampedTemplate} */this.root);
      }
      // The super._readyClients here sets the clients initialized flag.
      // We must wait to do this until after client dom is created/attached
      // so that this flag can be checked to prevent notifications fired
      // during this process from being handled before clients are ready.
      super._readyClients();
    }

    /**
     * Attaches an element's stamped dom to itself. By default,
     * this method creates a `shadowRoot` and adds the dom to it.
     * However, this method may be overridden to allow an element
     * to put its dom in another location.
     *
     * @throws {Error}
     * @suppress {missingReturn}
     * @param {StampedTemplate} dom to attach to the element.
     * @return {ShadowRoot} node to which the dom has been attached.
     */
    _attachDom(dom) {
      if (this.attachShadow) {
        if (dom) {
          if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
          }
          this.shadowRoot.appendChild(dom);
          return this.shadowRoot;
        }
        return null;
      } else {
        throw new Error('ShadowDOM not available. ' +
        // TODO(sorvell): move to compile-time conditional when supported
        'Polymer.Element can create dom as children instead of in ' + 'ShadowDOM by setting `this.root = this;\` before \`ready\`.');
      }
    }

    /**
     * Provides a default implementation of the standard Custom Elements
     * `attributeChangedCallback`.
     *
     * By default, attributes declared in `properties` metadata are
     * deserialized using their `type` information to properties of the
     * same name.  "Dash-cased" attributes are deserialzed to "camelCase"
     * properties.
     *
     * @param {string} name Name of attribute.
     * @param {?string} old Old value of attribute.
     * @param {?string} value Current value of attribute.
     * @override
     */
    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        let property = caseMap.dashToCamelCase(name);
        let type = propertiesForClass(this.constructor)[property].type;
        if (!this._hasReadOnlyEffect(property)) {
          this._attributeToProperty(name, value, type);
        }
      }
    }

    /**
     * When using the ShadyCSS scoping and custom property shim, causes all
     * shimmed styles in this element (and its subtree) to be updated
     * based on current custom property values.
     *
     * The optional parameter overrides inline custom property styles with an
     * object of properties where the keys are CSS properties, and the values
     * are strings.
     *
     * Example: `this.updateStyles({'--color': 'blue'})`
     *
     * These properties are retained unless a value of `null` is set.
     *
     * @param {Object=} properties Bag of custom property key/values to
     *   apply to this element.
     * @suppress {invalidCasts}
     */
    updateStyles(properties) {
      if (window.ShadyCSS) {
        window.ShadyCSS.styleSubtree( /** @type {!HTMLElement} */this, properties);
      }
    }

    /**
     * Rewrites a given URL relative to a base URL. The base URL defaults to
     * the original location of the document containing the `dom-module` for
     * this element. This method will return the same URL before and after
     * bundling.
     *
     * @param {string} url URL to resolve.
     * @param {string=} base Optional base URL to resolve against, defaults
     * to the element's `importPath`
     * @return {string} Rewritten URL relative to base
     */
    resolveUrl(url, base) {
      if (!base && this.importPath) {
        base = Object(__WEBPACK_IMPORTED_MODULE_5__utils_resolve_url_js__["c" /* resolveUrl */])(this.importPath);
      }
      return Object(__WEBPACK_IMPORTED_MODULE_5__utils_resolve_url_js__["c" /* resolveUrl */])(url, base);
    }

    /**
     * Overrides `PropertyAccessors` to add map of dynamic functions on
     * template info, for consumption by `PropertyEffects` template binding
     * code. This map determines which method templates should have accessors
     * created for them.
     *
     * @override
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateContent(template, templateInfo, nodeInfo) {
      templateInfo.dynamicFns = templateInfo.dynamicFns || propertiesForClass(this);
      return super._parseTemplateContent(template, templateInfo, nodeInfo);
    }

  }

  return PolymerElement;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = ElementMixin;


let instanceCount = 0;
const registrations = [];
/* unused harmony export registrations */


function _regLog(prototype) {
  console.log('[' + prototype.is + ']: registered');
}

function register(prototype) {
  registrations.push(prototype);
  undefined && _regLog(prototype);
}

function dumpRegistrations() {
  registrations.forEach(_regLog);
}

const updateStyles = function (props) {
  if (window.ShadyCSS) {
    window.ShadyCSS.styleDocument(props);
  }
};
/* unused harmony export updateStyles */


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export cssFromModules */
/* unused harmony export cssFromModule */
/* harmony export (immutable) */ __webpack_exports__["b"] = cssFromTemplate;
/* harmony export (immutable) */ __webpack_exports__["a"] = cssFromModuleImports;
/* unused harmony export _cssFromModuleImports */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resolve_url_js__ = __webpack_require__(2);


const MODULE_STYLE_LINK_SELECTOR = 'link[rel=import][type~=css]';
const INCLUDE_ATTR = 'include';

function importModule(moduleId) {
  const /** Polymer.DomModule */PolymerDomModule = customElements.get('dom-module');
  if (!PolymerDomModule) {
    return null;
  }
  return PolymerDomModule.import(moduleId);
}

/** @typedef {{assetpath: string}} */
let templateWithAssetPath; // eslint-disable-line no-unused-vars

function cssFromModules(moduleIds) {
  let modules = moduleIds.trim().split(/\s+/);
  let cssText = '';
  for (let i = 0; i < modules.length; i++) {
    cssText += cssFromModule(modules[i]);
  }
  return cssText;
}

function cssFromModule(moduleId) {
  let m = importModule(moduleId);
  if (m && m._cssText === undefined) {
    // module imports: <link rel="import" type="css">
    let cssText = _cssFromModuleImports(m);
    // include css from the first template in the module
    let t = m.querySelector('template');
    if (t) {
      cssText += cssFromTemplate(t, /** @type {templateWithAssetPath} */m.assetpath);
    }
    m._cssText = cssText || null;
  }
  if (!m) {
    console.warn('Could not find style data in module named', moduleId);
  }
  return m && m._cssText || '';
}

function cssFromTemplate(template, baseURI) {
  let cssText = '';
  // if element is a template, get content from its .content
  let e$ = template.content.querySelectorAll('style');
  for (let i = 0; i < e$.length; i++) {
    let e = e$[i];
    // support style sharing by allowing styles to "include"
    // other dom-modules that contain styling
    let include = e.getAttribute(INCLUDE_ATTR);
    if (include) {
      cssText += cssFromModules(include);
    }
    e.parentNode.removeChild(e);
    cssText += baseURI ? Object(__WEBPACK_IMPORTED_MODULE_0__resolve_url_js__["b" /* resolveCss */])(e.textContent, baseURI) : e.textContent;
  }
  return cssText;
}

function cssFromModuleImports(moduleId) {
  let m = importModule(moduleId);
  return m ? _cssFromModuleImports(m) : '';
}

function _cssFromModuleImports(module) {
  let cssText = '';
  let p$ = module.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);
  for (let i = 0; i < p$.length; i++) {
    let p = p$[i];
    if (p.import) {
      let importDoc = p.import;
      // NOTE: polyfill affordance.
      // under the HTMLImports polyfill, there will be no 'body',
      // but the import pseudo-doc can be used directly.
      let container = importDoc.body ? importDoc.body : importDoc;
      cssText += Object(__WEBPACK_IMPORTED_MODULE_0__resolve_url_js__["b" /* resolveCss */])(container.textContent, importDoc.baseURI);
    }
  }
  return cssText;
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DomModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_resolve_url_js__ = __webpack_require__(2);



let modules = {};
let lcModules = {};
function findModule(id) {
  return modules[id] || lcModules[id.toLowerCase()];
}

function styleOutsideTemplateCheck(inst) {
  if (inst.querySelector('style')) {
    console.warn('dom-module %s has style outside template', inst.id);
  }
}

/**
 * The `dom-module` element registers the dom it contains to the name given
 * by the module's id attribute. It provides a unified database of dom
 * accessible via its static `import` API.
 *
 * A key use case of `dom-module` is for providing custom element `<template>`s
 * via HTML imports that are parsed by the native HTML parser, that can be
 * relocated during a bundling pass and still looked up by `id`.
 *
 * Example:
 *
 *     <dom-module id="foo">
 *       <img src="stuff.png">
 *     </dom-module>
 *
 * Then in code in some other location that cannot access the dom-module above
 *
 *     let img = customElements.get('dom-module').import('foo', 'img');
 *
 * @customElement
 * @extends HTMLElement
 * @memberof Polymer
 * @summary Custom element that provides a registry of relocatable DOM content
 *   by `id` that is agnostic to bundling.
 * @unrestricted
 */
class DomModule extends HTMLElement {

  static get observedAttributes() {
    return ['id'];
  }

  /**
   * Retrieves the element specified by the css `selector` in the module
   * registered by `id`. For example, this.import('foo', 'img');
   * @param {string} id The id of the dom-module in which to search.
   * @param {string=} selector The css selector by which to find the element.
   * @return {Element} Returns the element which matches `selector` in the
   * module registered at the specified `id`.
   */
  static import(id, selector) {
    if (id) {
      let m = findModule(id);
      if (m && selector) {
        return m.querySelector(selector);
      }
      return m;
    }
    return null;
  }

  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this.register();
    }
  }

  /**
   * The absolute URL of the original location of this `dom-module`.
   *
   * This value will differ from this element's `ownerDocument` in the
   * following ways:
   * - Takes into account any `assetpath` attribute added during bundling
   *   to indicate the original location relative to the bundled location
   * - Uses the HTMLImports polyfill's `importForElement` API to ensure
   *   the path is relative to the import document's location since
   *   `ownerDocument` is not currently polyfilled
   */
  get assetpath() {
    // Don't override existing assetpath.
    if (!this.__assetpath) {
      // note: assetpath set via an attribute must be relative to this
      // element's location; accomodate polyfilled HTMLImports
      const owner = window.HTMLImports && HTMLImports.importForElement ? HTMLImports.importForElement(this) || document : this.ownerDocument;
      const url = Object(__WEBPACK_IMPORTED_MODULE_1__utils_resolve_url_js__["c" /* resolveUrl */])(this.getAttribute('assetpath') || '', owner.baseURI);
      this.__assetpath = Object(__WEBPACK_IMPORTED_MODULE_1__utils_resolve_url_js__["a" /* pathFromUrl */])(url);
    }
    return this.__assetpath;
  }

  /**
   * Registers the dom-module at a given id. This method should only be called
   * when a dom-module is imperatively created. For
   * example, `document.createElement('dom-module').register('foo')`.
   * @param {string=} id The id at which to register the dom-module.
   */
  register(id) {
    id = id || this.id;
    if (id) {
      this.id = id;
      // store id separate from lowercased id so that
      // in all cases mixedCase id will stored distinctly
      // and lowercase version is a fallback
      modules[id] = this;
      lcModules[id.toLowerCase()] = this;
      styleOutsideTemplateCheck(this);
    }
  }
}

DomModule.prototype['modules'] = modules;

customElements.define('dom-module', DomModule);



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_path_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__property_accessors_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__template_stamp_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_settings_js__ = __webpack_require__(4);









/** @const {Object} */
const CaseMap = __WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__;

// Monotonically increasing unique ID used for de-duping effects triggered
// from multiple properties in the same turn
let dedupeId = 0;

/**
 * Property effect types; effects are stored on the prototype using these keys
 * @enum {string}
 */
const TYPES = {
  COMPUTE: '__computeEffects',
  REFLECT: '__reflectEffects',
  NOTIFY: '__notifyEffects',
  PROPAGATE: '__propagateEffects',
  OBSERVE: '__observeEffects',
  READ_ONLY: '__readOnly'
};

/**
 * @typedef {{
 * name: (string | undefined),
 * structured: (boolean | undefined),
 * wildcard: (boolean | undefined)
 * }}
 */
let DataTrigger; //eslint-disable-line no-unused-vars

/**
 * @typedef {{
 * info: ?,
 * trigger: (!DataTrigger | undefined),
 * fn: (!Function | undefined)
 * }}
 */
let DataEffect; //eslint-disable-line no-unused-vars

let PropertyEffectsType; //eslint-disable-line no-unused-vars

/**
 * Ensures that the model has an own-property map of effects for the given type.
 * The model may be a prototype or an instance.
 *
 * Property effects are stored as arrays of effects by property in a map,
 * by named type on the model. e.g.
 *
 *   __computeEffects: {
 *     foo: [ ... ],
 *     bar: [ ... ]
 *   }
 *
 * If the model does not yet have an effect map for the type, one is created
 * and returned.  If it does, but it is not an own property (i.e. the
 * prototype had effects), the the map is deeply cloned and the copy is
 * set on the model and returned, ready for new effects to be added.
 *
 * @param {Object} model Prototype or instance
 * @param {string} type Property effect type
 * @return {Object} The own-property map of effects for the given type
 * @private
 */
function ensureOwnEffectMap(model, type) {
  let effects = model[type];
  if (!effects) {
    effects = model[type] = {};
  } else if (!model.hasOwnProperty(type)) {
    effects = model[type] = Object.create(model[type]);
    for (let p in effects) {
      let protoFx = effects[p];
      let instFx = effects[p] = Array(protoFx.length);
      for (let i = 0; i < protoFx.length; i++) {
        instFx[i] = protoFx[i];
      }
    }
  }
  return effects;
}

// -- effects ----------------------------------------------

/**
 * Runs all effects of a given type for the given set of property changes
 * on an instance.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} effects Object map of property-to-Array of effects
 * @param {Object} props Bag of current property changes
 * @param {Object=} oldProps Bag of previous values for changed properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */
function runEffects(inst, effects, props, oldProps, hasPaths, extraArgs) {
  if (effects) {
    let ran = false;
    let id = dedupeId++;
    for (let prop in props) {
      if (runEffectsForProperty(inst, effects, id, prop, props, oldProps, hasPaths, extraArgs)) {
        ran = true;
      }
    }
    return ran;
  }
  return false;
}

/**
 * Runs a list of effects for a given property.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} effects Object map of property-to-Array of effects
 * @param {number} dedupeId Counter used for de-duping effects
 * @param {string} prop Name of changed property
 * @param {*} props Changed properties
 * @param {*} oldProps Old properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */
function runEffectsForProperty(inst, effects, dedupeId, prop, props, oldProps, hasPaths, extraArgs) {
  let ran = false;
  let rootProperty = hasPaths ? Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["g" /* root */])(prop) : prop;
  let fxs = effects[rootProperty];
  if (fxs) {
    for (let i = 0, l = fxs.length, fx; i < l && (fx = fxs[i]); i++) {
      if ((!fx.info || fx.info.lastRun !== dedupeId) && (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
        if (fx.info) {
          fx.info.lastRun = dedupeId;
        }
        fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
        ran = true;
      }
    }
  }
  return ran;
}

/**
 * Determines whether a property/path that has changed matches the trigger
 * criteria for an effect.  A trigger is a descriptor with the following
 * structure, which matches the descriptors returned from `parseArg`.
 * e.g. for `foo.bar.*`:
 * ```
 * trigger: {
 *   name: 'a.b',
 *   structured: true,
 *   wildcard: true
 * }
 * ```
 * If no trigger is given, the path is deemed to match.
 *
 * @param {string} path Path or property that changed
 * @param {DataTrigger} trigger Descriptor
 * @return {boolean} Whether the path matched the trigger
 */
function pathMatchesTrigger(path, trigger) {
  if (trigger) {
    let triggerPath = trigger.name;
    return triggerPath == path || trigger.structured && Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["b" /* isAncestor */])(triggerPath, path) || trigger.wildcard && Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["c" /* isDescendant */])(triggerPath, path);
  } else {
    return true;
  }
}

/**
 * Implements the "observer" effect.
 *
 * Calls the method with `info.methodName` on the instance, passing the
 * new and old values.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @private
 */
function runObserverEffect(inst, property, props, oldProps, info) {
  let fn = inst[info.methodName];
  let changedProp = info.property;
  if (fn) {
    fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
  } else if (!info.dynamicFn) {
    console.warn('observer method `' + info.methodName + '` not defined');
  }
}

/**
 * Runs "notify" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * will dispatch path notification events in the case that the property
 * changed was a path and the root property for that path didn't have a
 * "notify" effect.  This is to maintain 1.0 behavior that did not require
 * `notify: true` to ensure object sub-property notifications were
 * sent.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} notifyProps Bag of properties to notify
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @private
 */
function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
  // Notify
  let fxs = inst[TYPES.NOTIFY];
  let notified;
  let id = dedupeId++;
  // Try normal notify effects; if none, fall back to try path notification
  for (let prop in notifyProps) {
    if (notifyProps[prop]) {
      if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
        notified = true;
      } else if (hasPaths && notifyPath(inst, prop, props)) {
        notified = true;
      }
    }
  }
  // Flush host if we actually notified and host was batching
  // And the host has already initialized clients; this prevents
  // an issue with a host observing data changes before clients are ready.
  let host;
  if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
    host._invalidateProperties();
  }
}

/**
 * Dispatches {property}-changed events with path information in the detail
 * object to indicate a sub-path of the property was changed.
 *
 * @param {!PropertyEffectsType} inst The element from which to fire the event
 * @param {string} path The path that was changed
 * @param {Object} props Bag of current property changes
 * @return {boolean} Returns true if the path was notified
 * @private
 */
function notifyPath(inst, path, props) {
  let rootProperty = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["g" /* root */])(path);
  if (rootProperty !== path) {
    let eventName = Object(__WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__["camelToDashCase"])(rootProperty) + '-changed';
    dispatchNotifyEvent(inst, eventName, props[path], path);
    return true;
  }
  return false;
}

/**
 * Dispatches {property}-changed events to indicate a property (or path)
 * changed.
 *
 * @param {!PropertyEffectsType} inst The element from which to fire the event
 * @param {string} eventName The name of the event to send ('{property}-changed')
 * @param {*} value The value of the changed property
 * @param {string | null | undefined} path If a sub-path of this property changed, the path
 *   that changed (optional).
 * @private
 * @suppress {invalidCasts}
 */
function dispatchNotifyEvent(inst, eventName, value, path) {
  let detail = {
    value: value,
    queueProperty: true
  };
  if (path) {
    detail.path = path;
  }
  /** @type {!HTMLElement} */inst.dispatchEvent(new CustomEvent(eventName, { detail }));
}

/**
 * Implements the "notify" effect.
 *
 * Dispatches a non-bubbling event named `info.eventName` on the instance
 * with a detail object containing the new `value`.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @private
 */
function runNotifyEffect(inst, property, props, oldProps, info, hasPaths) {
  let rootProperty = hasPaths ? Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["g" /* root */])(property) : property;
  let path = rootProperty != property ? property : null;
  let value = path ? Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(inst, path) : inst.__data[property];
  if (path && value === undefined) {
    value = props[property]; // specifically for .splices
  }
  dispatchNotifyEvent(inst, info.eventName, value, path);
}

/**
 * Handler function for 2-way notification events. Receives context
 * information captured in the `addNotifyListener` closure from the
 * `__notifyListeners` metadata.
 *
 * Sets the value of the notified property to the host property or path.  If
 * the event contained path information, translate that path to the host
 * scope's name for that path first.
 *
 * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
 * @param {!PropertyEffectsType} inst Host element instance handling the notification event
 * @param {string} fromProp Child element property that was bound
 * @param {string} toPath Host property/path that was bound
 * @param {boolean} negate Whether the binding was negated
 * @private
 */
function handleNotification(event, inst, fromProp, toPath, negate) {
  let value;
  let detail = /** @type {Object} */event.detail;
  let fromPath = detail && detail.path;
  if (fromPath) {
    toPath = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["i" /* translate */])(fromProp, toPath, fromPath);
    value = detail && detail.value;
  } else {
    value = event.target[fromProp];
  }
  value = negate ? !value : value;
  if (!inst[TYPES.READ_ONLY] || !inst[TYPES.READ_ONLY][toPath]) {
    if (inst._setPendingPropertyOrPath(toPath, value, true, Boolean(fromPath)) && (!detail || !detail.queueProperty)) {
      inst._invalidateProperties();
    }
  }
}

/**
 * Implements the "reflect" effect.
 *
 * Sets the attribute named `info.attrName` to the given property value.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @private
 */
function runReflectEffect(inst, property, props, oldProps, info) {
  let value = inst.__data[property];
  if (__WEBPACK_IMPORTED_MODULE_6__utils_settings_js__["b" /* sanitizeDOMValue */]) {
    value = Object(__WEBPACK_IMPORTED_MODULE_6__utils_settings_js__["b" /* sanitizeDOMValue */])(value, info.attrName, 'attribute', /** @type {Node} */inst);
  }
  inst._propertyToAttribute(property, info.attrName, value);
}

/**
 * Runs "computed" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * continues to run computed effects based on the output of each pass until
 * there are no more newly computed properties.  This ensures that all
 * properties that will be computed by the initial set of changes are
 * computed before other effects (binding propagation, observers, and notify)
 * run.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {!Object} changedProps Bag of changed properties
 * @param {!Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @private
 */
function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
  let computeEffects = inst[TYPES.COMPUTE];
  if (computeEffects) {
    let inputProps = changedProps;
    while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
      Object.assign(oldProps, inst.__dataOld);
      Object.assign(changedProps, inst.__dataPending);
      inputProps = inst.__dataPending;
      inst.__dataPending = null;
    }
  }
}

/**
 * Implements the "computed property" effect by running the method with the
 * values of the arguments specified in the `info` object and setting the
 * return value to the computed property specified.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @private
 */
function runComputedEffect(inst, property, props, oldProps, info) {
  let result = runMethodEffect(inst, property, props, oldProps, info);
  let computedProp = info.methodInfo;
  if (inst.__dataHasAccessor && inst.__dataHasAccessor[computedProp]) {
    inst._setPendingProperty(computedProp, result, true);
  } else {
    inst[computedProp] = result;
  }
}

/**
 * Computes path changes based on path links set up using the `linkPaths`
 * API.
 *
 * @param {!PropertyEffectsType} inst The instance whose props are changing
 * @param {string | !Array<(string|number)>} path Path that has changed
 * @param {*} value Value of changed path
 * @private
 */
function computeLinkedPaths(inst, path, value) {
  let links = inst.__dataLinkedPaths;
  if (links) {
    let link;
    for (let a in links) {
      let b = links[a];
      if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["c" /* isDescendant */])(a, path)) {
        link = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["i" /* translate */])(a, b, path);
        inst._setPendingPropertyOrPath(link, value, true, true);
      } else if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["c" /* isDescendant */])(b, path)) {
        link = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["i" /* translate */])(b, a, path);
        inst._setPendingPropertyOrPath(link, value, true, true);
      }
    }
  }
}

// -- bindings ----------------------------------------------

/**
 * Adds binding metadata to the current `nodeInfo`, and binding effects
 * for all part dependencies to `templateInfo`.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {NodeInfo} nodeInfo Node metadata for current template node
 * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
 * @param {string} target Target property name
 * @param {!Array<!BindingPart>} parts Array of binding part metadata
 * @param {string=} literal Literal text surrounding binding parts (specified
 *   only for 'property' bindings, since these must be initialized as part
 *   of boot-up)
 * @private
 */
function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
  // Create binding metadata and add to nodeInfo
  nodeInfo.bindings = nodeInfo.bindings || [];
  let /** Binding */binding = { kind, target, parts, literal, isCompound: parts.length !== 1 };
  nodeInfo.bindings.push(binding);
  // Add listener info to binding metadata
  if (shouldAddListener(binding)) {
    let { event, negate } = binding.parts[0];
    binding.listenerEvent = event || CaseMap.camelToDashCase(target) + '-changed';
    binding.listenerNegate = negate;
  }
  // Add "propagate" property effects to templateInfo
  let index = templateInfo.nodeInfoList.length;
  for (let i = 0; i < binding.parts.length; i++) {
    let part = binding.parts[i];
    part.compoundIndex = i;
    addEffectForBindingPart(constructor, templateInfo, binding, part, index);
  }
}

/**
 * Adds property effects to the given `templateInfo` for the given binding
 * part.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {number} index Index into `nodeInfoList` for this node
 */
function addEffectForBindingPart(constructor, templateInfo, binding, part, index) {
  if (!part.literal) {
    if (binding.kind === 'attribute' && binding.target[0] === '-') {
      console.warn('Cannot set attribute ' + binding.target + ' because "-" is not a valid attribute starting character');
    } else {
      let dependencies = part.dependencies;
      let info = { index, binding, part, evaluator: constructor };
      for (let j = 0; j < dependencies.length; j++) {
        let trigger = dependencies[j];
        if (typeof trigger == 'string') {
          trigger = parseArg(trigger);
          trigger.wildcard = true;
        }
        constructor._addTemplatePropertyEffect(templateInfo, trigger.rootProperty, {
          fn: runBindingEffect,
          info, trigger
        });
      }
    }
  }
}

/**
 * Implements the "binding" (property/path binding) effect.
 *
 * Note that binding syntax is overridable via `_parseBindings` and
 * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
 * non-literal parts returned from `_parseBindings`.  However,
 * there is no support for _path_ bindings via custom binding parts,
 * as this is specific to Polymer's path binding syntax.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} path Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
 *   metadata
 * @private
 */
function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
  let node = nodeList[info.index];
  let binding = info.binding;
  let part = info.part;
  // Subpath notification: transform path and set to client
  // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
  if (hasPaths && part.source && path.length > part.source.length && binding.kind == 'property' && !binding.isCompound && node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
    let value = props[path];
    path = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["i" /* translate */])(part.source, binding.target, path);
    if (node._setPendingPropertyOrPath(path, value, false, true)) {
      inst._enqueueClient(node);
    }
  } else {
    let value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);
    // Propagate value to child
    applyBindingValue(inst, node, binding, part, value);
  }
}

/**
 * Sets the value for an "binding" (binding) effect to a node,
 * either as a property or attribute.
 *
 * @param {!PropertyEffectsType} inst The instance owning the binding effect
 * @param {Node} node Target node for binding
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {*} value Value to set
 * @private
 */
function applyBindingValue(inst, node, binding, part, value) {
  value = computeBindingValue(node, value, binding, part);
  if (__WEBPACK_IMPORTED_MODULE_6__utils_settings_js__["b" /* sanitizeDOMValue */]) {
    value = Object(__WEBPACK_IMPORTED_MODULE_6__utils_settings_js__["b" /* sanitizeDOMValue */])(value, binding.target, binding.kind, node);
  }
  if (binding.kind == 'attribute') {
    // Attribute binding
    inst._valueToNodeAttribute( /** @type {Element} */node, value, binding.target);
  } else {
    // Property binding
    let prop = binding.target;
    if (node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
      if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
        if (node._setPendingProperty(prop, value)) {
          inst._enqueueClient(node);
        }
      }
    } else {
      inst._setUnmanagedPropertyToNode(node, prop, value);
    }
  }
}

/**
 * Transforms an "binding" effect value based on compound & negation
 * effect metadata, as well as handling for special-case properties
 *
 * @param {Node} node Node the value will be set to
 * @param {*} value Value to set
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @return {*} Transformed value to set
 * @private
 */
function computeBindingValue(node, value, binding, part) {
  if (binding.isCompound) {
    let storage = node.__dataCompoundStorage[binding.target];
    storage[part.compoundIndex] = value;
    value = storage.join('');
  }
  if (binding.kind !== 'attribute') {
    // Some browsers serialize `undefined` to `"undefined"`
    if (binding.target === 'textContent' || node.localName == 'input' && binding.target == 'value') {
      value = value == undefined ? '' : value;
    }
  }
  return value;
}

/**
 * Returns true if a binding's metadata meets all the requirements to allow
 * 2-way binding, and therefore a `<property>-changed` event listener should be
 * added:
 * - used curly braces
 * - is a property (not attribute) binding
 * - is not a textContent binding
 * - is not compound
 *
 * @param {!Binding} binding Binding metadata
 * @return {boolean} True if 2-way listener should be added
 * @private
 */
function shouldAddListener(binding) {
  return Boolean(binding.target) && binding.kind != 'attribute' && binding.kind != 'text' && !binding.isCompound && binding.parts[0].mode === '{';
}

/**
 * Setup compound binding storage structures, notify listeners, and dataHost
 * references onto the bound nodeList.
 *
 * @param {!PropertyEffectsType} inst Instance that bas been previously bound
 * @param {TemplateInfo} templateInfo Template metadata
 * @private
 */
function setupBindings(inst, templateInfo) {
  // Setup compound storage, dataHost, and notify listeners
  let { nodeList, nodeInfoList } = templateInfo;
  if (nodeInfoList.length) {
    for (let i = 0; i < nodeInfoList.length; i++) {
      let info = nodeInfoList[i];
      let node = nodeList[i];
      let bindings = info.bindings;
      if (bindings) {
        for (let i = 0; i < bindings.length; i++) {
          let binding = bindings[i];
          setupCompoundStorage(node, binding);
          addNotifyListener(node, inst, binding);
        }
      }
      node.__dataHost = inst;
    }
  }
}

/**
 * Initializes `__dataCompoundStorage` local storage on a bound node with
 * initial literal data for compound bindings, and sets the joined
 * literal parts to the bound property.
 *
 * When changes to compound parts occur, they are first set into the compound
 * storage array for that property, and then the array is joined to result in
 * the final value set to the property/attribute.
 *
 * @param {Node} node Bound node to initialize
 * @param {Binding} binding Binding metadata
 * @private
 */
function setupCompoundStorage(node, binding) {
  if (binding.isCompound) {
    // Create compound storage map
    let storage = node.__dataCompoundStorage || (node.__dataCompoundStorage = {});
    let parts = binding.parts;
    // Copy literals from parts into storage for this binding
    let literals = new Array(parts.length);
    for (let j = 0; j < parts.length; j++) {
      literals[j] = parts[j].literal;
    }
    let target = binding.target;
    storage[target] = literals;
    // Configure properties with their literal parts
    if (binding.literal && binding.kind == 'property') {
      node[target] = binding.literal;
    }
  }
}

/**
 * Adds a 2-way binding notification event listener to the node specified
 *
 * @param {Object} node Child element to add listener to
 * @param {!PropertyEffectsType} inst Host element instance to handle notification event
 * @param {Binding} binding Binding metadata
 * @private
 */
function addNotifyListener(node, inst, binding) {
  if (binding.listenerEvent) {
    let part = binding.parts[0];
    node.addEventListener(binding.listenerEvent, function (e) {
      handleNotification(e, inst, binding.target, part.source, part.negate);
    });
  }
}

// -- for method-based effects (complexObserver & computed) --------------

/**
 * Adds property effects for each argument in the method signature (and
 * optionally, for the method name if `dynamic` is true) that calls the
 * provided effect function.
 *
 * @param {Element | Object} model Prototype or instance
 * @param {!MethodSignature} sig Method signature metadata
 * @param {string} type Type of property effect to add
 * @param {Function} effectFn Function to run when arguments change
 * @param {*=} methodInfo Effect-specific information to be included in
 *   method effect metadata
 * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
 *   method names should be included as a dependency to the effect. Note,
 *   defaults to true if the signature is static (sig.static is true).
 * @private
 */
function createMethodEffect(model, sig, type, effectFn, methodInfo, dynamicFn) {
  dynamicFn = sig.static || dynamicFn && (typeof dynamicFn !== 'object' || dynamicFn[sig.methodName]);
  let info = {
    methodName: sig.methodName,
    args: sig.args,
    methodInfo,
    dynamicFn
  };
  for (let i = 0, arg; i < sig.args.length && (arg = sig.args[i]); i++) {
    if (!arg.literal) {
      model._addPropertyEffect(arg.rootProperty, type, {
        fn: effectFn, info: info, trigger: arg
      });
    }
  }
  if (dynamicFn) {
    model._addPropertyEffect(sig.methodName, type, {
      fn: effectFn, info: info
    });
  }
}

/**
 * Calls a method with arguments marshaled from properties on the instance
 * based on the method signature contained in the effect metadata.
 *
 * Multi-property observers, computed properties, and inline computing
 * functions call this function to invoke the method, then use the return
 * value accordingly.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {*} Returns the return value from the method invocation
 * @private
 */
function runMethodEffect(inst, property, props, oldProps, info) {
  // Instances can optionally have a _methodHost which allows redirecting where
  // to find methods. Currently used by `templatize`.
  let context = inst._methodHost || inst;
  let fn = context[info.methodName];
  if (fn) {
    let args = marshalArgs(inst.__data, info.args, property, props);
    return fn.apply(context, args);
  } else if (!info.dynamicFn) {
    console.warn('method `' + info.methodName + '` not defined');
  }
}

const emptyArray = [];

// Regular expressions used for binding
const IDENT = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
const NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
const SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
const DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
const STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
const ARGUMENT = '(?:(' + IDENT + '|' + NUMBER + '|' + STRING + ')\\s*' + ')';
const ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
const ARGUMENT_LIST = '(?:' + '\\(\\s*' + '(?:' + ARGUMENTS + '?' + ')' + '\\)\\s*' + ')';
const BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
const OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
const CLOSE_BRACKET = '(?:]]|}})';
const NEGATE = '(?:(!)\\s*)?'; // Group 2
const EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
const bindingRegex = new RegExp(EXPRESSION, "g");

/**
 * Create a string from binding parts of all the literal parts
 *
 * @param {!Array<BindingPart>} parts All parts to stringify
 * @return {string} String made from the literal parts
 */
function literalFromParts(parts) {
  let s = '';
  for (let i = 0; i < parts.length; i++) {
    let literal = parts[i].literal;
    s += literal || '';
  }
  return s;
}

/**
 * Parses an expression string for a method signature, and returns a metadata
 * describing the method in terms of `methodName`, `static` (whether all the
 * arguments are literals), and an array of `args`
 *
 * @param {string} expression The expression to parse
 * @return {?MethodSignature} The method metadata object if a method expression was
 *   found, otherwise `undefined`
 * @private
 */
function parseMethod(expression) {
  // tries to match valid javascript property names
  let m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
  if (m) {
    let methodName = m[1];
    let sig = { methodName, static: true, args: emptyArray };
    if (m[2].trim()) {
      // replace escaped commas with comma entity, split on un-escaped commas
      let args = m[2].replace(/\\,/g, '&comma;').split(',');
      return parseArgs(args, sig);
    } else {
      return sig;
    }
  }
  return null;
}

/**
 * Parses an array of arguments and sets the `args` property of the supplied
 * signature metadata object. Sets the `static` property to false if any
 * argument is a non-literal.
 *
 * @param {!Array<string>} argList Array of argument names
 * @param {!MethodSignature} sig Method signature metadata object
 * @return {!MethodSignature} The updated signature metadata object
 * @private
 */
function parseArgs(argList, sig) {
  sig.args = argList.map(function (rawArg) {
    let arg = parseArg(rawArg);
    if (!arg.literal) {
      sig.static = false;
    }
    return arg;
  }, this);
  return sig;
}

/**
 * Parses an individual argument, and returns an argument metadata object
 * with the following fields:
 *
 *   {
 *     value: 'prop',        // property/path or literal value
 *     literal: false,       // whether argument is a literal
 *     structured: false,    // whether the property is a path
 *     rootProperty: 'prop', // the root property of the path
 *     wildcard: false       // whether the argument was a wildcard '.*' path
 *   }
 *
 * @param {string} rawArg The string value of the argument
 * @return {!MethodArg} Argument metadata object
 * @private
 */
function parseArg(rawArg) {
  // clean up whitespace
  let arg = rawArg.trim()
  // replace comma entity with comma
  .replace(/&comma;/g, ',')
  // repair extra escape sequences; note only commas strictly need
  // escaping, but we allow any other char to be escaped since its
  // likely users will do this
  .replace(/\\(.)/g, '\$1');
  // basic argument descriptor
  let a = {
    name: arg,
    value: '',
    literal: false
  };
  // detect literal value (must be String or Number)
  let fc = arg[0];
  if (fc === '-') {
    fc = arg[1];
  }
  if (fc >= '0' && fc <= '9') {
    fc = '#';
  }
  switch (fc) {
    case "'":
    case '"':
      a.value = arg.slice(1, -1);
      a.literal = true;
      break;
    case '#':
      a.value = Number(arg);
      a.literal = true;
      break;
  }
  // if not literal, look for structured path
  if (!a.literal) {
    a.rootProperty = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["g" /* root */])(arg);
    // detect structured path (has dots)
    a.structured = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["d" /* isPath */])(arg);
    if (a.structured) {
      a.wildcard = arg.slice(-2) == '.*';
      if (a.wildcard) {
        a.name = arg.slice(0, -2);
      }
    }
  }
  return a;
}

/**
 * Gather the argument values for a method specified in the provided array
 * of argument metadata.
 *
 * The `path` and `value` arguments are used to fill in wildcard descriptor
 * when the method is being called as a result of a path notification.
 *
 * @param {Object} data Instance data storage object to read properties from
 * @param {!Array<!MethodArg>} args Array of argument metadata
 * @param {string} path Property/path name that triggered the method effect
 * @param {Object} props Bag of current property changes
 * @return {Array<*>} Array of argument values
 * @private
 */
function marshalArgs(data, args, path, props) {
  let values = [];
  for (let i = 0, l = args.length; i < l; i++) {
    let arg = args[i];
    let name = arg.name;
    let v;
    if (arg.literal) {
      v = arg.value;
    } else {
      if (arg.structured) {
        v = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(data, name);
        // when data is not stored e.g. `splices`
        if (v === undefined) {
          v = props[name];
        }
      } else {
        v = data[name];
      }
    }
    if (arg.wildcard) {
      // Only send the actual path changed info if the change that
      // caused the observer to run matched the wildcard
      let baseChanged = name.indexOf(path + '.') === 0;
      let matches = path.indexOf(name) === 0 && !baseChanged;
      values[i] = {
        path: matches ? path : name,
        value: matches ? props[path] : v,
        base: v
      };
    } else {
      values[i] = v;
    }
  }
  return values;
}

// data api

/**
 * Sends array splice notifications (`.splices` and `.length`)
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!PropertyEffectsType} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {Array} splices Array of splice records
 * @private
 */
function notifySplices(inst, array, path, splices) {
  let splicesPath = path + '.splices';
  inst.notifyPath(splicesPath, { indexSplices: splices });
  inst.notifyPath(path + '.length', array.length);
  // Null here to allow potentially large splice records to be GC'ed.
  inst.__data[splicesPath] = { indexSplices: null };
}

/**
 * Creates a splice record and sends an array splice notification for
 * the described mutation
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!PropertyEffectsType} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {number} index Index at which the array mutation occurred
 * @param {number} addedCount Number of added items
 * @param {Array} removed Array of removed items
 * @private
 */
function notifySplice(inst, array, path, index, addedCount, removed) {
  notifySplices(inst, array, path, [{
    index: index,
    addedCount: addedCount,
    removed: removed,
    object: array,
    type: 'splice'
  }]);
}

/**
 * Returns an upper-cased version of the string.
 *
 * @param {string} name String to uppercase
 * @return {string} Uppercased string
 * @private
 */
function upper(name) {
  return name[0].toUpperCase() + name.substring(1);
}

const PropertyEffects = Object(__WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @constructor
   * @extends {superClass}
   * @implements {Polymer_PropertyAccessors}
   * @implements {Polymer_TemplateStamp}
   * @unrestricted
   */
  const propertyEffectsBase = Object(__WEBPACK_IMPORTED_MODULE_5__template_stamp_js__["a" /* TemplateStamp */])(Object(__WEBPACK_IMPORTED_MODULE_4__property_accessors_js__["a" /* PropertyAccessors */])(superClass));

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyEffects}
   * @extends {propertyEffectsBase}
   * @unrestricted
   */
  class PropertyEffects extends propertyEffectsBase {

    constructor() {
      super();
      /** @type {boolean} */
      this.__dataClientsReady;
      /** @type {Array} */
      this.__dataPendingClients;
      /** @type {Object} */
      this.__dataToNotify;
      /** @type {Object} */
      this.__dataLinkedPaths;
      /** @type {boolean} */
      this.__dataHasPaths;
      /** @type {Object} */
      this.__dataCompoundStorage;
      /** @type {Polymer_PropertyEffects} */
      this.__dataHost;
      /** @type {!Object} */
      this.__dataTemp;
      /** @type {boolean} */
      this.__dataClientsInitialized;
      /** @type {!Object} */
      this.__data;
      /** @type {!Object} */
      this.__dataPending;
      /** @type {!Object} */
      this.__dataOld;
      /** @type {Object} */
      this.__computeEffects;
      /** @type {Object} */
      this.__reflectEffects;
      /** @type {Object} */
      this.__notifyEffects;
      /** @type {Object} */
      this.__propagateEffects;
      /** @type {Object} */
      this.__observeEffects;
      /** @type {Object} */
      this.__readOnly;
      /** @type {number} */
      this.__dataCounter;
      /** @type {!TemplateInfo} */
      this.__templateInfo;
    }

    get PROPERTY_EFFECT_TYPES() {
      return TYPES;
    }

    _initializeProperties() {
      super._initializeProperties();
      hostStack.registerHost(this);
      this.__dataClientsReady = false;
      this.__dataPendingClients = null;
      this.__dataToNotify = null;
      this.__dataLinkedPaths = null;
      this.__dataHasPaths = false;
      // May be set on instance prior to upgrade
      this.__dataCompoundStorage = this.__dataCompoundStorage || null;
      this.__dataHost = this.__dataHost || null;
      this.__dataTemp = {};
      this.__dataClientsInitialized = false;
    }

    /**
     * Overrides `Polymer.PropertyAccessors` implementation to provide a
     * more efficient implementation of initializing properties from
     * the prototype on the instance.
     *
     * @override
     * @param {Object} props Properties to initialize on the prototype
     */
    _initializeProtoProperties(props) {
      this.__data = Object.create(props);
      this.__dataPending = Object.create(props);
      this.__dataOld = {};
    }

    /**
     * Overrides `Polymer.PropertyAccessors` implementation to avoid setting
     * `_setProperty`'s `shouldNotify: true`.
     *
     * @override
     * @param {Object} props Properties to initialize on the instance
     */
    _initializeInstanceProperties(props) {
      let readOnly = this[TYPES.READ_ONLY];
      for (let prop in props) {
        if (!readOnly || !readOnly[prop]) {
          this.__dataPending = this.__dataPending || {};
          this.__dataOld = this.__dataOld || {};
          this.__data[prop] = this.__dataPending[prop] = props[prop];
        }
      }
    }

    // Prototype setup ----------------------------------------

    /**
     * Equivalent to static `addPropertyEffect` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @protected
     */
    _addPropertyEffect(property, type, effect) {
      this._createPropertyAccessor(property, type == TYPES.READ_ONLY);
      // effects are accumulated into arrays per property based on type
      let effects = ensureOwnEffectMap(this, type)[property];
      if (!effects) {
        effects = this[type][property] = [];
      }
      effects.push(effect);
    }

    /**
     * Removes the given property effect.
     *
     * @param {string} property Property the effect was associated with
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object to remove
     */
    _removePropertyEffect(property, type, effect) {
      let effects = ensureOwnEffectMap(this, type)[property];
      let idx = effects.indexOf(effect);
      if (idx >= 0) {
        effects.splice(idx, 1);
      }
    }

    /**
     * Returns whether the current prototype/instance has a property effect
     * of a certain type.
     *
     * @param {string} property Property name
     * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasPropertyEffect(property, type) {
      let effects = this[type];
      return Boolean(effects && effects[property]);
    }

    /**
     * Returns whether the current prototype/instance has a "read only"
     * accessor for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasReadOnlyEffect(property) {
      return this._hasPropertyEffect(property, TYPES.READ_ONLY);
    }

    /**
     * Returns whether the current prototype/instance has a "notify"
     * property effect for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasNotifyEffect(property) {
      return this._hasPropertyEffect(property, TYPES.NOTIFY);
    }

    /**
     * Returns whether the current prototype/instance has a "reflect to attribute"
     * property effect for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasReflectEffect(property) {
      return this._hasPropertyEffect(property, TYPES.REFLECT);
    }

    /**
     * Returns whether the current prototype/instance has a "computed"
     * property effect for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasComputedEffect(property) {
      return this._hasPropertyEffect(property, TYPES.COMPUTE);
    }

    // Runtime ----------------------------------------

    /**
     * Sets a pending property or path.  If the root property of the path in
     * question had no accessor, the path is set, otherwise it is enqueued
     * via `_setPendingProperty`.
     *
     * This function isolates relatively expensive functionality necessary
     * for the public API (`set`, `setProperties`, `notifyPath`, and property
     * change listeners via {{...}} bindings), such that it is only done
     * when paths enter the system, and not at every propagation step.  It
     * also sets a `__dataHasPaths` flag on the instance which is used to
     * fast-path slower path-matching code in the property effects host paths.
     *
     * `path` can be a path string or array of path parts as accepted by the
     * public API.
     *
     * @param {string | !Array<number|string>} path Path to set
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify Set to true if this change should
     *  cause a property notification event dispatch
     * @param {boolean=} isPathNotification If the path being set is a path
     *   notification of an already changed value, as opposed to a request
     *   to set and notify the change.  In the latter `false` case, a dirty
     *   check is performed and then the value is set to the path before
     *   enqueuing the pending property change.
     * @return {boolean} Returns true if the property/path was enqueued in
     *   the pending changes bag.
     * @protected
     */
    _setPendingPropertyOrPath(path, value, shouldNotify, isPathNotification) {
      if (isPathNotification || Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["g" /* root */])(Array.isArray(path) ? path[0] : path) !== path) {
        // Dirty check changes being set to a path against the actual object,
        // since this is the entry point for paths into the system; from here
        // the only dirty checks are against the `__dataTemp` cache to prevent
        // duplicate work in the same turn only. Note, if this was a notification
        // of a change already set to a path (isPathNotification: true),
        // we always let the change through and skip the `set` since it was
        // already dirty checked at the point of entry and the underlying
        // object has already been updated
        if (!isPathNotification) {
          let old = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path);
          path = /** @type {string} */Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["h" /* set */])(this, path, value);
          // Use property-accessor's simpler dirty check
          if (!path || !super._shouldPropertyChange(path, value, old)) {
            return false;
          }
        }
        this.__dataHasPaths = true;
        if (this._setPendingProperty( /**@type{string}*/path, value, shouldNotify)) {
          computeLinkedPaths(this, path, value);
          return true;
        }
      } else {
        if (this.__dataHasAccessor && this.__dataHasAccessor[path]) {
          return this._setPendingProperty( /**@type{string}*/path, value, shouldNotify);
        } else {
          this[path] = value;
        }
      }
      return false;
    }

    /**
     * Applies a value to a non-Polymer element/node's property.
     *
     * The implementation makes a best-effort at binding interop:
     * Some native element properties have side-effects when
     * re-setting the same value (e.g. setting `<input>.value` resets the
     * cursor position), so we do a dirty-check before setting the value.
     * However, for better interop with non-Polymer custom elements that
     * accept objects, we explicitly re-set object changes coming from the
     * Polymer world (which may include deep object changes without the
     * top reference changing), erring on the side of providing more
     * information.
     *
     * Users may override this method to provide alternate approaches.
     *
     * @param {Node} node The node to set a property on
     * @param {string} prop The property to set
     * @param {*} value The value to set
     * @protected
     */
    _setUnmanagedPropertyToNode(node, prop, value) {
      // It is a judgment call that resetting primitives is
      // "bad" and resettings objects is also "good"; alternatively we could
      // implement a whitelist of tag & property values that should never
      // be reset (e.g. <input>.value && <select>.value)
      if (value !== node[prop] || typeof value == 'object') {
        node[prop] = value;
      }
    }

    /**
     * Overrides the `PropertyAccessors` implementation to introduce special
     * dirty check logic depending on the property & value being set:
     *
     * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
     *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
     * 2. Object set to simple property (e.g. 'prop': {...})
     *    Stored in `__dataTemp` and `__data`, dirty checked against
     *    `__dataTemp` by default implementation of `_shouldPropertyChange`
     * 3. Primitive value set to simple property (e.g. 'prop': 42)
     *    Stored in `__data`, dirty checked against `__data`
     *
     * The dirty-check is important to prevent cycles due to two-way
     * notification, but paths and objects are only dirty checked against any
     * previous value set during this turn via a "temporary cache" that is
     * cleared when the last `_propertiesChaged` exits. This is so:
     * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
     *    due to array mutations like shift/unshift/splice; this is fine
     *    since path changes are dirty-checked at user entry points like `set`
     * b. dirty-checking for objects only lasts one turn to allow the user
     *    to mutate the object in-place and re-set it with the same identity
     *    and have all sub-properties re-propagated in a subsequent turn.
     *
     * The temp cache is not necessarily sufficient to prevent invalid array
     * paths, since a splice can happen during the same turn (with pathological
     * user code); we could introduce a "fixup" for temporarily cached array
     * paths if needed: https://github.com/Polymer/polymer/issues/4227
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify True if property should fire notification
     *   event (applies only for `notify: true` properties)
     * @return {boolean} Returns true if the property changed
     * @override
     */
    _setPendingProperty(property, value, shouldNotify) {
      let isPath = this.__dataHasPaths && Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["d" /* isPath */])(property);
      let prevProps = isPath ? this.__dataTemp : this.__data;
      if (this._shouldPropertyChange(property, value, prevProps[property])) {
        if (!this.__dataPending) {
          this.__dataPending = {};
          this.__dataOld = {};
        }
        // Ensure old is captured from the last turn
        if (!(property in this.__dataOld)) {
          this.__dataOld[property] = this.__data[property];
        }
        // Paths are stored in temporary cache (cleared at end of turn),
        // which is used for dirty-checking, all others stored in __data
        if (isPath) {
          this.__dataTemp[property] = value;
        } else {
          this.__data[property] = value;
        }
        // All changes go into pending property bag, passed to _propertiesChanged
        this.__dataPending[property] = value;
        // Track properties that should notify separately
        if (isPath || this[TYPES.NOTIFY] && this[TYPES.NOTIFY][property]) {
          this.__dataToNotify = this.__dataToNotify || {};
          this.__dataToNotify[property] = shouldNotify;
        }
        return true;
      }
      return false;
    }

    /**
     * Overrides base implementation to ensure all accessors set `shouldNotify`
     * to true, for per-property notification tracking.
     *
     * @override
     */
    _setProperty(property, value) {
      if (this._setPendingProperty(property, value, true)) {
        this._invalidateProperties();
      }
    }

    /**
     * Overrides `PropertyAccessor`'s default async queuing of
     * `_propertiesChanged`: if `__dataReady` is false (has not yet been
     * manually flushed), the function no-ops; otherwise flushes
     * `_propertiesChanged` synchronously.
     *
     * @override
     */
    _invalidateProperties() {
      if (this.__dataReady) {
        this._flushProperties();
      }
    }

    /**
     * Enqueues the given client on a list of pending clients, whose
     * pending property changes can later be flushed via a call to
     * `_flushClients`.
     *
     * @param {Object} client PropertyEffects client to enqueue
     * @protected
     */
    _enqueueClient(client) {
      this.__dataPendingClients = this.__dataPendingClients || [];
      if (client !== this) {
        this.__dataPendingClients.push(client);
      }
    }

    /**
     * Flushes any clients previously enqueued via `_enqueueClient`, causing
     * their `_flushProperties` method to run.
     *
     * @protected
     */
    _flushClients() {
      if (!this.__dataClientsReady) {
        this.__dataClientsReady = true;
        this._readyClients();
        // Override point where accessors are turned on; importantly,
        // this is after clients have fully readied, providing a guarantee
        // that any property effects occur only after all clients are ready.
        this.__dataReady = true;
      } else {
        this.__enableOrFlushClients();
      }
    }

    // NOTE: We ensure clients either enable or flush as appropriate. This
    // handles two corner cases:
    // (1) clients flush properly when connected/enabled before the host
    // enables; e.g.
    //   (a) Templatize stamps with no properties and does not flush and
    //   (b) the instance is inserted into dom and
    //   (c) then the instance flushes.
    // (2) clients enable properly when not connected/enabled when the host
    // flushes; e.g.
    //   (a) a template is runtime stamped and not yet connected/enabled
    //   (b) a host sets a property, causing stamped dom to flush
    //   (c) the stamped dom enables.
    __enableOrFlushClients() {
      let clients = this.__dataPendingClients;
      if (clients) {
        this.__dataPendingClients = null;
        for (let i = 0; i < clients.length; i++) {
          let client = clients[i];
          if (!client.__dataEnabled) {
            client._enableProperties();
          } else if (client.__dataPending) {
            client._flushProperties();
          }
        }
      }
    }

    /**
     * Perform any initial setup on client dom. Called before the first
     * `_flushProperties` call on client dom and before any element
     * observers are called.
     *
     * @protected
     */
    _readyClients() {
      this.__enableOrFlushClients();
    }

    /**
     * Sets a bag of property changes to this instance, and
     * synchronously processes all effects of the properties as a batch.
     *
     * Property names must be simple properties, not paths.  Batched
     * path propagation is not supported.
     *
     * @param {Object} props Bag of one or more key-value pairs whose key is
     *   a property and value is the new value to set for that property.
     * @param {boolean=} setReadOnly When true, any private values set in
     *   `props` will be set. By default, `setProperties` will not set
     *   `readOnly: true` root properties.
     * @public
     */
    setProperties(props, setReadOnly) {
      for (let path in props) {
        if (setReadOnly || !this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][path]) {
          //TODO(kschaaf): explicitly disallow paths in setProperty?
          // wildcard observers currently only pass the first changed path
          // in the `info` object, and you could do some odd things batching
          // paths, e.g. {'foo.bar': {...}, 'foo': null}
          this._setPendingPropertyOrPath(path, props[path], true);
        }
      }
      this._invalidateProperties();
    }

    /**
     * Overrides `PropertyAccessors` so that property accessor
     * side effects are not enabled until after client dom is fully ready.
     * Also calls `_flushClients` callback to ensure client dom is enabled
     * that was not enabled as a result of flushing properties.
     *
     * @override
     */
    ready() {
      // It is important that `super.ready()` is not called here as it
      // immediately turns on accessors. Instead, we wait until `readyClients`
      // to enable accessors to provide a guarantee that clients are ready
      // before processing any accessors side effects.
      this._flushProperties();
      // If no data was pending, `_flushProperties` will not `flushClients`
      // so ensure this is done.
      if (!this.__dataClientsReady) {
        this._flushClients();
      }
      // Before ready, client notifications do not trigger _flushProperties.
      // Therefore a flush is necessary here if data has been set.
      if (this.__dataPending) {
        this._flushProperties();
      }
    }

    /**
     * Implements `PropertyAccessors`'s properties changed callback.
     *
     * Runs each class of effects for the batch of changed properties in
     * a specific order (compute, propagate, reflect, observe, notify).
     *
     * @override
     */
    _propertiesChanged(currentProps, changedProps, oldProps) {
      // ----------------------------
      // let c = Object.getOwnPropertyNames(changedProps || {});
      // window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
      // if (window.debug) { debugger; }
      // ----------------------------
      let hasPaths = this.__dataHasPaths;
      this.__dataHasPaths = false;
      // Compute properties
      runComputedEffects(this, changedProps, oldProps, hasPaths);
      // Clear notify properties prior to possible reentry (propagate, observe),
      // but after computing effects have a chance to add to them
      let notifyProps = this.__dataToNotify;
      this.__dataToNotify = null;
      // Propagate properties to clients
      this._propagatePropertyChanges(changedProps, oldProps, hasPaths);
      // Flush clients
      this._flushClients();
      // Reflect properties
      runEffects(this, this[TYPES.REFLECT], changedProps, oldProps, hasPaths);
      // Observe properties
      runEffects(this, this[TYPES.OBSERVE], changedProps, oldProps, hasPaths);
      // Notify properties to host
      if (notifyProps) {
        runNotifyEffects(this, notifyProps, changedProps, oldProps, hasPaths);
      }
      // Clear temporary cache at end of turn
      if (this.__dataCounter == 1) {
        this.__dataTemp = {};
      }
      // ----------------------------
      // window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
      // ----------------------------
    }

    /**
     * Called to propagate any property changes to stamped template nodes
     * managed by this element.
     *
     * @param {Object} changedProps Bag of changed properties
     * @param {Object} oldProps Bag of previous values for changed properties
     * @param {boolean} hasPaths True with `props` contains one or more paths
     * @protected
     */
    _propagatePropertyChanges(changedProps, oldProps, hasPaths) {
      if (this[TYPES.PROPAGATE]) {
        runEffects(this, this[TYPES.PROPAGATE], changedProps, oldProps, hasPaths);
      }
      let templateInfo = this.__templateInfo;
      while (templateInfo) {
        runEffects(this, templateInfo.propertyEffects, changedProps, oldProps, hasPaths, templateInfo.nodeList);
        templateInfo = templateInfo.nextTemplateInfo;
      }
    }

    /**
     * Aliases one data path as another, such that path notifications from one
     * are routed to the other.
     *
     * @param {string | !Array<string|number>} to Target path to link.
     * @param {string | !Array<string|number>} from Source path to link.
     * @public
     */
    linkPaths(to, from) {
      to = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* normalize */])(to);
      from = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* normalize */])(from);
      this.__dataLinkedPaths = this.__dataLinkedPaths || {};
      this.__dataLinkedPaths[to] = from;
    }

    /**
     * Removes a data path alias previously established with `_linkPaths`.
     *
     * Note, the path to unlink should be the target (`to`) used when
     * linking the paths.
     *
     * @param {string | !Array<string|number>} path Target path to unlink.
     * @public
     */
    unlinkPaths(path) {
      path = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* normalize */])(path);
      if (this.__dataLinkedPaths) {
        delete this.__dataLinkedPaths[path];
      }
    }

    /**
     * Notify that an array has changed.
     *
     * Example:
     *
     *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
     *     ...
     *     this.items.splice(1, 1, {name: 'Sam'});
     *     this.items.push({name: 'Bob'});
     *     this.notifySplices('items', [
     *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1, obect: this.items, type: 'splice' },
     *       { index: 3, removed: [], addedCount: 1, object: this.items, type: 'splice'}
     *     ]);
     *
     * @param {string} path Path that should be notified.
     * @param {Array} splices Array of splice records indicating ordered
     *   changes that occurred to the array. Each record should have the
     *   following fields:
     *    * index: index at which the change occurred
     *    * removed: array of items that were removed from this index
     *    * addedCount: number of new items added at this index
     *    * object: a reference to the array in question
     *    * type: the string literal 'splice'
     *
     *   Note that splice records _must_ be normalized such that they are
     *   reported in index order (raw results from `Object.observe` are not
     *   ordered and must be normalized/merged before notifying).
     * @public
    */
    notifySplices(path, splices) {
      let info = { path: '' };
      let array = /** @type {Array} */Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info);
      notifySplices(this, array, info.path, splices);
    }

    /**
     * Convenience method for reading a value from a path.
     *
     * Note, if any part in the path is undefined, this method returns
     * `undefined` (this method does not throw when dereferencing undefined
     * paths).
     *
     * @param {(string|!Array<(string|number)>)} path Path to the value
     *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
     *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
     *   bracketed expressions are not supported; string-based path parts
     *   *must* be separated by dots.  Note that when dereferencing array
     *   indices, the index may be used as a dotted part directly
     *   (e.g. `users.12.name` or `['users', 12, 'name']`).
     * @param {Object=} root Root object from which the path is evaluated.
     * @return {*} Value at the path, or `undefined` if any part of the path
     *   is undefined.
     * @public
     */
    get(path, root) {
      return Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(root || this, path);
    }

    /**
     * Convenience method for setting a value to a path and notifying any
     * elements bound to the same path.
     *
     * Note, if any part in the path except for the last is undefined,
     * this method does nothing (this method does not throw when
     * dereferencing undefined paths).
     *
     * @param {(string|!Array<(string|number)>)} path Path to the value
     *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
     *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
     *   bracketed expressions are not supported; string-based path parts
     *   *must* be separated by dots.  Note that when dereferencing array
     *   indices, the index may be used as a dotted part directly
     *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
     * @param {*} value Value to set at the specified path.
     * @param {Object=} root Root object from which the path is evaluated.
     *   When specified, no notification will occur.
     * @public
    */
    set(path, value, root) {
      if (root) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["h" /* set */])(root, path, value);
      } else {
        if (!this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][/** @type {string} */path]) {
          if (this._setPendingPropertyOrPath(path, value, true)) {
            this._invalidateProperties();
          }
        }
      }
    }

    /**
     * Adds items onto the end of the array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.push`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @param {...*} items Items to push onto array
     * @return {number} New length of the array.
     * @public
     */
    push(path, ...items) {
      let info = { path: '' };
      let array = /** @type {Array}*/Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info);
      let len = array.length;
      let ret = array.push(...items);
      if (items.length) {
        notifySplice(this, array, info.path, len, items.length, []);
      }
      return ret;
    }

    /**
     * Removes an item from the end of array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.pop`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @return {*} Item that was removed.
     * @public
     */
    pop(path) {
      let info = { path: '' };
      let array = /** @type {Array} */Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info);
      let hadLength = Boolean(array.length);
      let ret = array.pop();
      if (hadLength) {
        notifySplice(this, array, info.path, array.length, 0, [ret]);
      }
      return ret;
    }

    /**
     * Starting from the start index specified, removes 0 or more items
     * from the array and inserts 0 or more new items in their place.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.splice`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @param {number} start Index from which to start removing/inserting.
     * @param {number} deleteCount Number of items to remove.
     * @param {...*} items Items to insert into array.
     * @return {Array} Array of removed items.
     * @public
     */
    splice(path, start, deleteCount, ...items) {
      let info = { path: '' };
      let array = /** @type {Array} */Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info);
      // Normalize fancy native splice handling of crazy start values
      if (start < 0) {
        start = array.length - Math.floor(-start);
      } else {
        start = Math.floor(start);
      }
      if (!start) {
        start = 0;
      }
      let ret = array.splice(start, deleteCount, ...items);
      if (items.length || ret.length) {
        notifySplice(this, array, info.path, start, items.length, ret);
      }
      return ret;
    }

    /**
     * Removes an item from the beginning of array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.pop`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @return {*} Item that was removed.
     * @public
     */
    shift(path) {
      let info = { path: '' };
      let array = /** @type {Array} */Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info);
      let hadLength = Boolean(array.length);
      let ret = array.shift();
      if (hadLength) {
        notifySplice(this, array, info.path, 0, 0, [ret]);
      }
      return ret;
    }

    /**
     * Adds items onto the beginning of the array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.push`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @param {...*} items Items to insert info array
     * @return {number} New length of the array.
     * @public
     */
    unshift(path, ...items) {
      let info = { path: '' };
      let array = /** @type {Array} */Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info);
      let ret = array.unshift(...items);
      if (items.length) {
        notifySplice(this, array, info.path, 0, items.length, []);
      }
      return ret;
    }

    /**
     * Notify that a path has changed.
     *
     * Example:
     *
     *     this.item.user.name = 'Bob';
     *     this.notifyPath('item.user.name');
     *
     * @param {string} path Path that should be notified.
     * @param {*=} value Value at the path (optional).
     * @public
    */
    notifyPath(path, value) {
      /** @type {string} */
      let propPath;
      if (arguments.length == 1) {
        // Get value if not supplied
        let info = { path: '' };
        value = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info);
        propPath = info.path;
      } else if (Array.isArray(path)) {
        // Normalize path if needed
        propPath = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* normalize */])(path);
      } else {
        propPath = /** @type{string} */path;
      }
      if (this._setPendingPropertyOrPath(propPath, value, true, true)) {
        this._invalidateProperties();
      }
    }

    /**
     * Equivalent to static `createReadOnlyProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @param {boolean=} protectedSetter Creates a custom protected setter
     *   when `true`.
     * @protected
     */
    _createReadOnlyProperty(property, protectedSetter) {
      this._addPropertyEffect(property, TYPES.READ_ONLY);
      if (protectedSetter) {
        this['_set' + upper(property)] = /** @this {PropertyEffects} */function (value) {
          this._setProperty(property, value);
        };
      }
    }

    /**
     * Equivalent to static `createPropertyObserver` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @param {string} methodName Name of observer method to call
     * @param {boolean=} dynamicFn Whether the method name should be included as
     *   a dependency to the effect.
     * @protected
     */
    _createPropertyObserver(property, methodName, dynamicFn) {
      let info = { property, methodName, dynamicFn: Boolean(dynamicFn) };
      this._addPropertyEffect(property, TYPES.OBSERVE, {
        fn: runObserverEffect, info, trigger: { name: property }
      });
      if (dynamicFn) {
        this._addPropertyEffect(methodName, TYPES.OBSERVE, {
          fn: runObserverEffect, info, trigger: { name: methodName }
        });
      }
    }

    /**
     * Equivalent to static `createMethodObserver` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @protected
     */
    _createMethodObserver(expression, dynamicFn) {
      let sig = parseMethod(expression);
      if (!sig) {
        throw new Error("Malformed observer expression '" + expression + "'");
      }
      createMethodEffect(this, sig, TYPES.OBSERVE, runMethodEffect, null, dynamicFn);
    }

    /**
     * Equivalent to static `createNotifyingProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @protected
     */
    _createNotifyingProperty(property) {
      this._addPropertyEffect(property, TYPES.NOTIFY, {
        fn: runNotifyEffect,
        info: {
          eventName: CaseMap.camelToDashCase(property) + '-changed',
          property: property
        }
      });
    }

    /**
     * Equivalent to static `createReflectedProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @protected
     */
    _createReflectedProperty(property) {
      let attr = CaseMap.camelToDashCase(property);
      if (attr[0] === '-') {
        console.warn('Property ' + property + ' cannot be reflected to attribute ' + attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property thisead.');
      } else {
        this._addPropertyEffect(property, TYPES.REFLECT, {
          fn: runReflectEffect,
          info: {
            attrName: attr
          }
        });
      }
    }

    /**
     * Equivalent to static `createComputedProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Name of computed property to set
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @protected
     */
    _createComputedProperty(property, expression, dynamicFn) {
      let sig = parseMethod(expression);
      if (!sig) {
        throw new Error("Malformed computed expression '" + expression + "'");
      }
      createMethodEffect(this, sig, TYPES.COMPUTE, runComputedEffect, property, dynamicFn);
    }

    // -- static class methods ------------

    /**
     * Ensures an accessor exists for the specified property, and adds
     * to a list of "property effects" that will run when the accessor for
     * the specified property is set.  Effects are grouped by "type", which
     * roughly corresponds to a phase in effect processing.  The effect
     * metadata should be in the following form:
     *
     *     {
     *       fn: effectFunction, // Reference to function to call to perform effect
     *       info: { ... }       // Effect metadata passed to function
     *       trigger: {          // Optional triggering metadata; if not provided
     *         name: string      // the property is treated as a wildcard
     *         structured: boolean
     *         wildcard: boolean
     *       }
     *     }
     *
     * Effects are called from `_propertiesChanged` in the following order by
     * type:
     *
     * 1. COMPUTE
     * 2. PROPAGATE
     * 3. REFLECT
     * 4. OBSERVE
     * 5. NOTIFY
     *
     * Effect functions are called with the following signature:
     *
     *     effectFunction(inst, path, props, oldProps, info, hasPaths)
     *
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @protected
     */
    static addPropertyEffect(property, type, effect) {
      this.prototype._addPropertyEffect(property, type, effect);
    }

    /**
     * Creates a single-property observer for the given property.
     *
     * @param {string} property Property name
     * @param {string} methodName Name of observer method to call
     * @param {boolean=} dynamicFn Whether the method name should be included as
     *   a dependency to the effect.
     * @protected
     */
    static createPropertyObserver(property, methodName, dynamicFn) {
      this.prototype._createPropertyObserver(property, methodName, dynamicFn);
    }

    /**
     * Creates a multi-property "method observer" based on the provided
     * expression, which should be a string in the form of a normal Javascript
     * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
     * should correspond to a property or path in the context of this
     * prototype (or instance), or may be a literal string or number.
     *
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @protected
     */
    static createMethodObserver(expression, dynamicFn) {
      this.prototype._createMethodObserver(expression, dynamicFn);
    }

    /**
     * Causes the setter for the given property to dispatch `<property>-changed`
     * events to notify of changes to the property.
     *
     * @param {string} property Property name
     * @protected
     */
    static createNotifyingProperty(property) {
      this.prototype._createNotifyingProperty(property);
    }

    /**
     * Creates a read-only accessor for the given property.
     *
     * To set the property, use the protected `_setProperty` API.
     * To create a custom protected setter (e.g. `_setMyProp()` for
     * property `myProp`), pass `true` for `protectedSetter`.
     *
     * Note, if the property will have other property effects, this method
     * should be called first, before adding other effects.
     *
     * @param {string} property Property name
     * @param {boolean=} protectedSetter Creates a custom protected setter
     *   when `true`.
     * @protected
     */
    static createReadOnlyProperty(property, protectedSetter) {
      this.prototype._createReadOnlyProperty(property, protectedSetter);
    }

    /**
     * Causes the setter for the given property to reflect the property value
     * to a (dash-cased) attribute of the same name.
     *
     * @param {string} property Property name
     * @protected
     */
    static createReflectedProperty(property) {
      this.prototype._createReflectedProperty(property);
    }

    /**
     * Creates a computed property whose value is set to the result of the
     * method described by the given `expression` each time one or more
     * arguments to the method changes.  The expression should be a string
     * in the form of a normal Javascript function signature:
     * `'methodName(arg1, [..., argn])'`
     *
     * @param {string} property Name of computed property to set
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
     *   method names should be included as a dependency to the effect.
     * @protected
     */
    static createComputedProperty(property, expression, dynamicFn) {
      this.prototype._createComputedProperty(property, expression, dynamicFn);
    }

    /**
     * Parses the provided template to ensure binding effects are created
     * for them, and then ensures property accessors are created for any
     * dependent properties in the template.  Binding effects for bound
     * templates are stored in a linked list on the instance so that
     * templates can be efficiently stamped and unstamped.
     *
     * @param {HTMLTemplateElement} template Template containing binding
     *   bindings
     * @return {Object} Template metadata object
     * @protected
     */
    static bindTemplate(template) {
      return this.prototype._bindTemplate(template);
    }

    // -- binding ----------------------------------------------

    /**
     * Equivalent to static `bindTemplate` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * This method may be called on the prototype (for prototypical template
     * binding, to avoid creating accessors every instance) once per prototype,
     * and will be called with `runtimeBinding: true` by `_stampTemplate` to
     * create and link an instance of the template metadata associated with a
     * particular stamping.
     *
     * @param {HTMLTemplateElement} template Template containing binding
     *   bindings
     * @param {boolean=} instanceBinding When false (default), performs
     *   "prototypical" binding of the template and overwrites any previously
     *   bound template for the class. When true (as passed from
     *   `_stampTemplate`), the template info is instanced and linked into
     *   the list of bound templates.
     * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
     *   this is an instance of the prototypical template info
     * @protected
     */
    _bindTemplate(template, instanceBinding) {
      let templateInfo = this.constructor._parseTemplate(template);
      let wasPreBound = this.__templateInfo == templateInfo;
      // Optimization: since this is called twice for proto-bound templates,
      // don't attempt to recreate accessors if this template was pre-bound
      if (!wasPreBound) {
        for (let prop in templateInfo.propertyEffects) {
          this._createPropertyAccessor(prop);
        }
      }
      if (instanceBinding) {
        // For instance-time binding, create instance of template metadata
        // and link into list of templates if necessary
        templateInfo = /** @type {!TemplateInfo} */Object.create(templateInfo);
        templateInfo.wasPreBound = wasPreBound;
        if (!wasPreBound && this.__templateInfo) {
          let last = this.__templateInfoLast || this.__templateInfo;
          this.__templateInfoLast = last.nextTemplateInfo = templateInfo;
          templateInfo.previousTemplateInfo = last;
          return templateInfo;
        }
      }
      return this.__templateInfo = templateInfo;
    }

    /**
     * Adds a property effect to the given template metadata, which is run
     * at the "propagate" stage of `_propertiesChanged` when the template
     * has been bound to the element via `_bindTemplate`.
     *
     * The `effect` object should match the format in `_addPropertyEffect`.
     *
     * @param {Object} templateInfo Template metadata to add effect to
     * @param {string} prop Property that should trigger the effect
     * @param {Object=} effect Effect metadata object
     * @protected
     */
    static _addTemplatePropertyEffect(templateInfo, prop, effect) {
      let hostProps = templateInfo.hostProps = templateInfo.hostProps || {};
      hostProps[prop] = true;
      let effects = templateInfo.propertyEffects = templateInfo.propertyEffects || {};
      let propEffects = effects[prop] = effects[prop] || [];
      propEffects.push(effect);
    }

    /**
     * Stamps the provided template and performs instance-time setup for
     * Polymer template features, including data bindings, declarative event
     * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
     * is returned containing the stamped DOM, ready for insertion into the
     * DOM.
     *
     * This method may be called more than once; however note that due to
     * `shadycss` polyfill limitations, only styles from templates prepared
     * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
     * to the shadow root and support CSS custom properties), and note that
     * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
     * any styles required by in runtime-stamped templates must be included
     * in the main element template.
     *
     * @param {!HTMLTemplateElement} template Template to stamp
     * @return {!StampedTemplate} Cloned template content
     * @override
     * @protected
     */
    _stampTemplate(template) {
      // Ensures that created dom is `_enqueueClient`'d to this element so
      // that it can be flushed on next call to `_flushProperties`
      hostStack.beginHosting(this);
      let dom = super._stampTemplate(template);
      hostStack.endHosting(this);
      let templateInfo = /** @type {!TemplateInfo} */this._bindTemplate(template, true);
      // Add template-instance-specific data to instanced templateInfo
      templateInfo.nodeList = dom.nodeList;
      // Capture child nodes to allow unstamping of non-prototypical templates
      if (!templateInfo.wasPreBound) {
        let nodes = templateInfo.childNodes = [];
        for (let n = dom.firstChild; n; n = n.nextSibling) {
          nodes.push(n);
        }
      }
      dom.templateInfo = templateInfo;
      // Setup compound storage, 2-way listeners, and dataHost for bindings
      setupBindings(this, templateInfo);
      // Flush properties into template nodes if already booted
      if (this.__dataReady) {
        runEffects(this, templateInfo.propertyEffects, this.__data, null, false, templateInfo.nodeList);
      }
      return dom;
    }

    /**
     * Removes and unbinds the nodes previously contained in the provided
     * DocumentFragment returned from `_stampTemplate`.
     *
     * @param {!StampedTemplate} dom DocumentFragment previously returned
     *   from `_stampTemplate` associated with the nodes to be removed
     * @protected
     */
    _removeBoundDom(dom) {
      // Unlink template info
      let templateInfo = dom.templateInfo;
      if (templateInfo.previousTemplateInfo) {
        templateInfo.previousTemplateInfo.nextTemplateInfo = templateInfo.nextTemplateInfo;
      }
      if (templateInfo.nextTemplateInfo) {
        templateInfo.nextTemplateInfo.previousTemplateInfo = templateInfo.previousTemplateInfo;
      }
      if (this.__templateInfoLast == templateInfo) {
        this.__templateInfoLast = templateInfo.previousTemplateInfo;
      }
      templateInfo.previousTemplateInfo = templateInfo.nextTemplateInfo = null;
      // Remove stamped nodes
      let nodes = templateInfo.childNodes;
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        node.parentNode.removeChild(node);
      }
    }

    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
     * array is added to `nodeInfo` and populated with binding metadata
     * with information capturing the binding target, and a `parts` array
     * with one or more metadata objects capturing the source(s) of the
     * binding.
     *
     * @override
     * @param {Node} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateNode(node, templateInfo, nodeInfo) {
      let noted = super._parseTemplateNode(node, templateInfo, nodeInfo);
      if (node.nodeType === Node.TEXT_NODE) {
        let parts = this._parseBindings(node.textContent, templateInfo);
        if (parts) {
          // Initialize the textContent with any literal parts
          // NOTE: default to a space here so the textNode remains; some browsers
          // (IE) evacipate an empty textNode following cloneNode/importNode.
          node.textContent = literalFromParts(parts) || ' ';
          addBinding(this, templateInfo, nodeInfo, 'text', 'textContent', parts);
          noted = true;
        }
      }
      return noted;
    }

    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * parsing bindings from attributes.  A `bindings`
     * array is added to `nodeInfo` and populated with binding metadata
     * with information capturing the binding target, and a `parts` array
     * with one or more metadata objects capturing the source(s) of the
     * binding.
     *
     * @override
     * @param {Element} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
      let parts = this._parseBindings(value, templateInfo);
      if (parts) {
        // Attribute or property
        let origName = name;
        let kind = 'property';
        if (name[name.length - 1] == '$') {
          name = name.slice(0, -1);
          kind = 'attribute';
        }
        // Initialize attribute bindings with any literal parts
        let literal = literalFromParts(parts);
        if (literal && kind == 'attribute') {
          node.setAttribute(name, literal);
        }
        // Clear attribute before removing, since IE won't allow removing
        // `value` attribute if it previously had a value (can't
        // unconditionally set '' before removing since attributes with `$`
        // can't be set using setAttribute)
        if (node.localName === 'input' && origName === 'value') {
          node.setAttribute(origName, '');
        }
        // Remove annotation
        node.removeAttribute(origName);
        // Case hackery: attributes are lower-case, but bind targets
        // (properties) are case sensitive. Gambit is to map dash-case to
        // camel-case: `foo-bar` becomes `fooBar`.
        // Attribute bindings are excepted.
        if (kind === 'property') {
          name = Object(__WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__["dashToCamelCase"])(name);
        }
        addBinding(this, templateInfo, nodeInfo, kind, name, parts, literal);
        return true;
      } else {
        return super._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value);
      }
    }

    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * binding the properties that a nested template depends on to the template
     * as `_host_<property>`.
     *
     * @override
     * @param {Node} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateNestedTemplate(node, templateInfo, nodeInfo) {
      let noted = super._parseTemplateNestedTemplate(node, templateInfo, nodeInfo);
      // Merge host props into outer template and add bindings
      let hostProps = nodeInfo.templateInfo.hostProps;
      let mode = '{';
      for (let source in hostProps) {
        let parts = [{ mode, source, dependencies: [source] }];
        addBinding(this, templateInfo, nodeInfo, 'property', '_host_' + source, parts);
      }
      return noted;
    }

    /**
     * Called to parse text in a template (either attribute values or
     * textContent) into binding metadata.
     *
     * Any overrides of this method should return an array of binding part
     * metadata  representing one or more bindings found in the provided text
     * and any "literal" text in between.  Any non-literal parts will be passed
     * to `_evaluateBinding` when any dependencies change.  The only required
     * fields of each "part" in the returned array are as follows:
     *
     * - `dependencies` - Array containing trigger metadata for each property
     *   that should trigger the binding to update
     * - `literal` - String containing text if the part represents a literal;
     *   in this case no `dependencies` are needed
     *
     * Additional metadata for use by `_evaluateBinding` may be provided in
     * each part object as needed.
     *
     * The default implementation handles the following types of bindings
     * (one or more may be intermixed with literal strings):
     * - Property binding: `[[prop]]`
     * - Path binding: `[[object.prop]]`
     * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
     * - Two-way property or path bindings (supports negation):
     *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
     * - Inline computed method (supports negation):
     *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
     *
     * @param {string} text Text to parse from attribute or textContent
     * @param {Object} templateInfo Current template metadata
     * @return {Array<!BindingPart>} Array of binding part metadata
     * @protected
     */
    static _parseBindings(text, templateInfo) {
      let parts = [];
      let lastIndex = 0;
      let m;
      // Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
      // Regex matches:
      //        Iteration 1:  Iteration 2:
      // m[1]: '{{'          '[['
      // m[2]: ''            '!'
      // m[3]: 'prop'        'compute(foo,bar)'
      while ((m = bindingRegex.exec(text)) !== null) {
        // Add literal part
        if (m.index > lastIndex) {
          parts.push({ literal: text.slice(lastIndex, m.index) });
        }
        // Add binding part
        let mode = m[1][0];
        let negate = Boolean(m[2]);
        let source = m[3].trim();
        let customEvent = false,
            notifyEvent = '',
            colon = -1;
        if (mode == '{' && (colon = source.indexOf('::')) > 0) {
          notifyEvent = source.substring(colon + 2);
          source = source.substring(0, colon);
          customEvent = true;
        }
        let signature = parseMethod(source);
        let dependencies = [];
        if (signature) {
          // Inline computed function
          let { args, methodName } = signature;
          for (let i = 0; i < args.length; i++) {
            let arg = args[i];
            if (!arg.literal) {
              dependencies.push(arg);
            }
          }
          let dynamicFns = templateInfo.dynamicFns;
          if (dynamicFns && dynamicFns[methodName] || signature.static) {
            dependencies.push(methodName);
            signature.dynamicFn = true;
          }
        } else {
          // Property or path
          dependencies.push(source);
        }
        parts.push({
          source, mode, negate, customEvent, signature, dependencies,
          event: notifyEvent
        });
        lastIndex = bindingRegex.lastIndex;
      }
      // Add a final literal part
      if (lastIndex && lastIndex < text.length) {
        let literal = text.substring(lastIndex);
        if (literal) {
          parts.push({
            literal: literal
          });
        }
      }
      if (parts.length) {
        return parts;
      } else {
        return null;
      }
    }

    /**
     * Called to evaluate a previously parsed binding part based on a set of
     * one or more changed dependencies.
     *
     * @param {this} inst Element that should be used as scope for
     *   binding dependencies
     * @param {BindingPart} part Binding part metadata
     * @param {string} path Property/path that triggered this effect
     * @param {Object} props Bag of current property changes
     * @param {Object} oldProps Bag of previous values for changed properties
     * @param {boolean} hasPaths True with `props` contains one or more paths
     * @return {*} Value the binding part evaluated to
     * @protected
     */
    static _evaluateBinding(inst, part, path, props, oldProps, hasPaths) {
      let value;
      if (part.signature) {
        value = runMethodEffect(inst, path, props, oldProps, part.signature);
      } else if (path != part.source) {
        value = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(inst, part.source);
      } else {
        if (hasPaths && Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["d" /* isPath */])(path)) {
          value = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(inst, path);
        } else {
          value = inst.__data[path];
        }
      }
      if (part.negate) {
        value = !value;
      }
      return value;
    }

  }

  // make a typing for closure :P
  PropertyEffectsType = PropertyEffects;

  return PropertyEffects;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = PropertyEffects;


/**
 * Helper api for enqueing client dom created by a host element.
 *
 * By default elements are flushed via `_flushProperties` when
 * `connectedCallback` is called. Elements attach their client dom to
 * themselves at `ready` time which results from this first flush.
 * This provides an ordering guarantee that the client dom an element
 * creates is flushed before the element itself (i.e. client `ready`
 * fires before host `ready`).
 *
 * However, if `_flushProperties` is called *before* an element is connected,
 * as for example `Templatize` does, this ordering guarantee cannot be
 * satisfied because no elements are connected. (Note: Bound elements that
 * receive data do become enqueued clients and are properly ordered but
 * unbound elements are not.)
 *
 * To maintain the desired "client before host" ordering guarantee for this
 * case we rely on the "host stack. Client nodes registers themselves with
 * the creating host element when created. This ensures that all client dom
 * is readied in the proper order, maintaining the desired guarantee.
 *
 * @private
 */
let hostStack = {

  stack: [],

  /**
   * @param {*} inst Instance to add to hostStack
   * @this {hostStack}
   */
  registerHost(inst) {
    if (this.stack.length) {
      let host = this.stack[this.stack.length - 1];
      host._enqueueClient(inst);
    }
  },

  /**
   * @param {*} inst Instance to begin hosting
   * @this {hostStack}
   */
  beginHosting(inst) {
    this.stack.push(inst);
  },

  /**
   * @param {*} inst Instance to end hosting
   * @this {hostStack}
   */
  endHosting(inst) {
    let stackLen = this.stack.length;
    if (stackLen && this.stack[stackLen - 1] == inst) {
      this.stack.pop();
    }
  }

};

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = isPath;
/* harmony export (immutable) */ __webpack_exports__["g"] = root;
/* harmony export (immutable) */ __webpack_exports__["b"] = isAncestor;
/* harmony export (immutable) */ __webpack_exports__["c"] = isDescendant;
/* harmony export (immutable) */ __webpack_exports__["i"] = translate;
/* harmony export (immutable) */ __webpack_exports__["e"] = matches;
/* harmony export (immutable) */ __webpack_exports__["f"] = normalize;
/* unused harmony export split */
/* harmony export (immutable) */ __webpack_exports__["a"] = get;
/* harmony export (immutable) */ __webpack_exports__["h"] = set;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


function isPath(path) {
  return path.indexOf('.') >= 0;
}

function root(path) {
  let dotIndex = path.indexOf('.');
  if (dotIndex === -1) {
    return path;
  }
  return path.slice(0, dotIndex);
}

function isAncestor(base, path) {
  //     base.startsWith(path + '.');
  return base.indexOf(path + '.') === 0;
}

function isDescendant(base, path) {
  //     path.startsWith(base + '.');
  return path.indexOf(base + '.') === 0;
}

function translate(base, newBase, path) {
  return newBase + path.slice(base.length);
}

function matches(base, path) {
  return base === path || isAncestor(base, path) || isDescendant(base, path);
}

function normalize(path) {
  if (Array.isArray(path)) {
    let parts = [];
    for (let i = 0; i < path.length; i++) {
      let args = path[i].toString().split('.');
      for (let j = 0; j < args.length; j++) {
        parts.push(args[j]);
      }
    }
    return parts.join('.');
  } else {
    return path;
  }
}

function split(path) {
  if (Array.isArray(path)) {
    return normalize(path).split('.');
  }
  return path.toString().split('.');
}

function get(root, path, info) {
  let prop = root;
  let parts = split(path);
  // Loop over path parts[0..n-1] and dereference
  for (let i = 0; i < parts.length; i++) {
    if (!prop) {
      return;
    }
    let part = parts[i];
    prop = prop[part];
  }
  if (info) {
    info.path = parts.join('.');
  }
  return prop;
}

function set(root, path, value) {
  let prop = root;
  let parts = split(path);
  let last = parts[parts.length - 1];
  if (parts.length > 1) {
    // Loop over path parts[0..n-2] and dereference
    for (let i = 0; i < parts.length - 1; i++) {
      let part = parts[i];
      prop = prop[part];
      if (!prop) {
        return;
      }
    }
    // Set value to object at end of path
    prop[last] = value;
  } else {
    // Simple property set
    prop[path] = value;
  }
  return parts.join('.');
}

const isDeep = isPath;
/* unused harmony export isDeep */


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_case_map_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_async_js__ = __webpack_require__(15);





let caseMap = __WEBPACK_IMPORTED_MODULE_2__utils_case_map_js__;

let microtask = __WEBPACK_IMPORTED_MODULE_3__utils_async_js__["a" /* microTask */];

// Save map of native properties; this forms a blacklist or properties
// that won't have their values "saved" by `saveAccessorValue`, since
// reading from an HTMLElement accessor from the context of a prototype throws
const nativeProperties = {};
let proto = HTMLElement.prototype;
while (proto) {
  let props = Object.getOwnPropertyNames(proto);
  for (let i = 0; i < props.length; i++) {
    nativeProperties[props[i]] = true;
  }
  proto = Object.getPrototypeOf(proto);
}

/**
 * Used to save the value of a property that will be overridden with
 * an accessor. If the `model` is a prototype, the values will be saved
 * in `__dataProto`, and it's up to the user (or downstream mixin) to
 * decide how/when to set these values back into the accessors.
 * If `model` is already an instance (it has a `__data` property), then
 * the value will be set as a pending property, meaning the user should
 * call `_invalidateProperties` or `_flushProperties` to take effect
 *
 * @param {Object} model Prototype or instance
 * @param {string} property Name of property
 * @private
 */
function saveAccessorValue(model, property) {
  // Don't read/store value for any native properties since they could throw
  if (!nativeProperties[property]) {
    let value = model[property];
    if (value !== undefined) {
      if (model.__data) {
        // Adding accessor to instance; update the property
        // It is the user's responsibility to call _flushProperties
        model._setPendingProperty(property, value);
      } else {
        // Adding accessor to proto; save proto's value for instance-time use
        if (!model.__dataProto) {
          model.__dataProto = {};
        } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
          model.__dataProto = Object.create(model.__dataProto);
        }
        model.__dataProto[property] = value;
      }
    }
  }
}

const PropertyAccessors = Object(__WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyAccessors}
   * @extends HTMLElement
   * @unrestricted
   */
  class PropertyAccessors extends superClass {

    /**
     * Generates property accessors for all attributes in the standard
     * static `observedAttributes` array.
     *
     * Attribute names are mapped to property names using the `dash-case` to
     * `camelCase` convention
     *
     */
    static createPropertiesForAttributes() {
      let a$ = this.observedAttributes;
      for (let i = 0; i < a$.length; i++) {
        this.prototype._createPropertyAccessor(caseMap.dashToCamelCase(a$[i]));
      }
    }

    constructor() {
      super();
      /** @type {boolean} */
      this.__serializing;
      /** @type {number} */
      this.__dataCounter;
      /** @type {boolean} */
      this.__dataEnabled;
      /** @type {boolean} */
      this.__dataReady;
      /** @type {boolean} */
      this.__dataInvalid;
      /** @type {!Object} */
      this.__data;
      /** @type {Object} */
      this.__dataPending;
      /** @type {Object} */
      this.__dataOld;
      /** @type {Object} */
      this.__dataProto;
      /** @type {Object} */
      this.__dataHasAccessor;
      /** @type {Object} */
      this.__dataInstanceProps;
      this._initializeProperties();
    }

    /**
     * Implements native Custom Elements `attributeChangedCallback` to
     * set an attribute value to a property via `_attributeToProperty`.
     *
     * @param {string} name Name of attribute that changed
     * @param {?string} old Old attribute value
     * @param {?string} value New attribute value
     */
    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this._attributeToProperty(name, value);
      }
    }

    /**
     * Initializes the local storage for property accessors.
     *
     * Provided as an override point for performing any setup work prior
     * to initializing the property accessor system.
     *
     * @protected
     */
    _initializeProperties() {
      this.__serializing = false;
      this.__dataCounter = 0;
      this.__dataEnabled = false;
      this.__dataReady = false;
      this.__dataInvalid = false;
      this.__data = {};
      this.__dataPending = null;
      this.__dataOld = null;
      if (this.__dataProto) {
        this._initializeProtoProperties(this.__dataProto);
        this.__dataProto = null;
      }
      // Capture instance properties; these will be set into accessors
      // during first flush. Don't set them here, since we want
      // these to overwrite defaults/constructor assignments
      for (let p in this.__dataHasAccessor) {
        if (this.hasOwnProperty(p)) {
          this.__dataInstanceProps = this.__dataInstanceProps || {};
          this.__dataInstanceProps[p] = this[p];
          delete this[p];
        }
      }
    }

    /**
     * Called at instance time with bag of properties that were overwritten
     * by accessors on the prototype when accessors were created.
     *
     * The default implementation sets these properties back into the
     * setter at instance time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @protected
     */
    _initializeProtoProperties(props) {
      for (let p in props) {
        this._setProperty(p, props[p]);
      }
    }

    /**
     * Called at ready time with bag of instance properties that overwrote
     * accessors when the element upgraded.
     *
     * The default implementation sets these properties back into the
     * setter at ready time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @protected
     */
    _initializeInstanceProperties(props) {
      Object.assign(this, props);
    }

    /**
     * Ensures the element has the given attribute. If it does not,
     * assigns the given value to the attribute.
     *
     *
     * @param {string} attribute Name of attribute to ensure is set.
     * @param {string} value of the attribute.
     */
    _ensureAttribute(attribute, value) {
      if (!this.hasAttribute(attribute)) {
        this._valueToNodeAttribute(this, value, attribute);
      }
    }

    /**
     * Deserializes an attribute to its associated property.
     *
     * This method calls the `_deserializeValue` method to convert the string to
     * a typed value.
     *
     * @param {string} attribute Name of attribute to deserialize.
     * @param {?string} value of the attribute.
     * @param {*=} type type to deserialize to.
     */
    _attributeToProperty(attribute, value, type) {
      // Don't deserialize back to property if currently reflecting
      if (!this.__serializing) {
        let property = caseMap.dashToCamelCase(attribute);
        this[property] = this._deserializeValue(value, type);
      }
    }

    /**
     * Serializes a property to its associated attribute.
     *
     * @param {string} property Property name to reflect.
     * @param {string=} attribute Attribute name to reflect.
     * @param {*=} value Property value to refect.
     */
    _propertyToAttribute(property, attribute, value) {
      this.__serializing = true;
      value = arguments.length < 3 ? this[property] : value;
      this._valueToNodeAttribute(this, value, attribute || caseMap.camelToDashCase(property));
      this.__serializing = false;
    }

    /**
     * Sets a typed value to an HTML attribute on a node.
     *
     * This method calls the `_serializeValue` method to convert the typed
     * value to a string.  If the `_serializeValue` method returns `undefined`,
     * the attribute will be removed (this is the default for boolean
     * type `false`).
     *
     * @param {Element} node Element to set attribute to.
     * @param {*} value Value to serialize.
     * @param {string} attribute Attribute name to serialize to.
     */
    _valueToNodeAttribute(node, value, attribute) {
      let str = this._serializeValue(value);
      if (str === undefined) {
        node.removeAttribute(attribute);
      } else {
        node.setAttribute(attribute, str);
      }
    }

    /**
     * Converts a typed JavaScript value to a string.
     *
     * This method is called by Polymer when setting JS property values to
     * HTML attributes.  Users may override this method on Polymer element
     * prototypes to provide serialization for custom types.
     *
     * @param {*} value Property value to serialize.
     * @return {string | undefined} String serialized from the provided property value.
     */
    _serializeValue(value) {
      /* eslint-disable no-fallthrough */
      switch (typeof value) {
        case 'boolean':
          return value ? '' : undefined;

        case 'object':
          if (value instanceof Date) {
            return value.toString();
          } else if (value) {
            try {
              return JSON.stringify(value);
            } catch (x) {
              return '';
            }
          }

        default:
          return value != null ? value.toString() : undefined;
      }
    }

    /**
     * Converts a string to a typed JavaScript value.
     *
     * This method is called by Polymer when reading HTML attribute values to
     * JS properties.  Users may override this method on Polymer element
     * prototypes to provide deserialization for custom `type`s.  Note,
     * the `type` argument is the value of the `type` field provided in the
     * `properties` configuration object for a given property, and is
     * by convention the constructor for the type to deserialize.
     *
     * Note: The return value of `undefined` is used as a sentinel value to
     * indicate the attribute should be removed.
     *
     * @param {?string} value Attribute value to deserialize.
     * @param {*=} type Type to deserialize the string to.
     * @return {*} Typed value deserialized from the provided string.
     */
    _deserializeValue(value, type) {
      /**
       * @type {*}
       */
      let outValue;
      switch (type) {
        case Number:
          outValue = Number(value);
          break;

        case Boolean:
          outValue = value !== null;
          break;

        case Object:
          try {
            outValue = JSON.parse( /** @type string */value);
          } catch (x) {
            // allow non-JSON literals like Strings and Numbers
          }
          break;

        case Array:
          try {
            outValue = JSON.parse( /** @type string */value);
          } catch (x) {
            outValue = null;
            console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${value}`);
          }
          break;

        case Date:
          outValue = new Date(value);
          break;

        case String:
        default:
          outValue = value;
          break;
      }

      return outValue;
    }
    /* eslint-enable no-fallthrough */

    /**
     * Creates a setter/getter pair for the named property with its own
     * local storage.  The getter returns the value in the local storage,
     * and the setter calls `_setProperty`, which updates the local storage
     * for the property and enqueues a `_propertiesChanged` callback.
     *
     * This method may be called on a prototype or an instance.  Calling
     * this method may overwrite a property value that already exists on
     * the prototype/instance by creating the accessor.  When calling on
     * a prototype, any overwritten values are saved in `__dataProto`,
     * and it is up to the subclasser to decide how/when to set those
     * properties back into the accessor.  When calling on an instance,
     * the overwritten value is set via `_setPendingProperty`, and the
     * user should call `_invalidateProperties` or `_flushProperties`
     * for the values to take effect.
     *
     * @param {string} property Name of the property
     * @param {boolean=} readOnly When true, no setter is created; the
     *   protected `_setProperty` function must be used to set the property
     * @protected
     */
    _createPropertyAccessor(property, readOnly) {
      if (!this.hasOwnProperty('__dataHasAccessor')) {
        this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
      }
      if (!this.__dataHasAccessor[property]) {
        this.__dataHasAccessor[property] = true;
        saveAccessorValue(this, property);
        Object.defineProperty(this, property, {
          /* eslint-disable valid-jsdoc */
          /** @this {PropertyAccessors} */
          get: function () {
            return this.__data[property];
          },
          /** @this {PropertyAccessors} */
          set: readOnly ? function () {} : function (value) {
            this._setProperty(property, value);
          }
          /* eslint-enable */
        });
      }
    }

    /**
     * Returns true if this library created an accessor for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if an accessor was created
     */
    _hasAccessor(property) {
      return this.__dataHasAccessor && this.__dataHasAccessor[property];
    }

    /**
     * Updates the local storage for a property (via `_setPendingProperty`)
     * and enqueues a `_proeprtiesChanged` callback.
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @protected
     */
    _setProperty(property, value) {
      if (this._setPendingProperty(property, value)) {
        this._invalidateProperties();
      }
    }

    /**
     * Updates the local storage for a property, records the previous value,
     * and adds it to the set of "pending changes" that will be passed to the
     * `_propertiesChanged` callback.  This method does not enqueue the
     * `_propertiesChanged` callback.
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @return {boolean} Returns true if the property changed
     * @protected
     */
    _setPendingProperty(property, value) {
      let old = this.__data[property];
      let changed = this._shouldPropertyChange(property, value, old);
      if (changed) {
        if (!this.__dataPending) {
          this.__dataPending = {};
          this.__dataOld = {};
        }
        // Ensure old is captured from the last turn
        if (this.__dataOld && !(property in this.__dataOld)) {
          this.__dataOld[property] = old;
        }
        this.__data[property] = value;
        this.__dataPending[property] = value;
      }
      return changed;
    }

    /**
     * Returns true if the specified property has a pending change.
     *
     * @param {string} prop Property name
     * @return {boolean} True if property has a pending change
     * @protected
     */
    _isPropertyPending(prop) {
      return Boolean(this.__dataPending && prop in this.__dataPending);
    }

    /**
     * Marks the properties as invalid, and enqueues an async
     * `_propertiesChanged` callback.
     *
     * @protected
     */
    _invalidateProperties() {
      if (!this.__dataInvalid && this.__dataReady) {
        this.__dataInvalid = true;
        microtask.run(() => {
          if (this.__dataInvalid) {
            this.__dataInvalid = false;
            this._flushProperties();
          }
        });
      }
    }

    /**
     * Call to enable property accessor processing. Before this method is
     * called accessor values will be set but side effects are
     * queued. When called, any pending side effects occur immediately.
     * For elements, generally `connectedCallback` is a normal spot to do so.
     * It is safe to call this method multiple times as it only turns on
     * property accessors once.
     */
    _enableProperties() {
      if (!this.__dataEnabled) {
        this.__dataEnabled = true;
        if (this.__dataInstanceProps) {
          this._initializeInstanceProperties(this.__dataInstanceProps);
          this.__dataInstanceProps = null;
        }
        this.ready();
      }
    }

    /**
     * Calls the `_propertiesChanged` callback with the current set of
     * pending changes (and old values recorded when pending changes were
     * set), and resets the pending set of changes. Generally, this method
     * should not be called in user code.
     *
     *
     * @protected
     */
    _flushProperties() {
      if (this.__dataPending && this.__dataOld) {
        let changedProps = this.__dataPending;
        this.__dataPending = null;
        this.__dataCounter++;
        this._propertiesChanged(this.__data, changedProps, this.__dataOld);
        this.__dataCounter--;
      }
    }

    /**
     * Lifecycle callback called the first time properties are being flushed.
     * Prior to `ready`, all property sets through accessors are queued and
     * their effects are flushed after this method returns.
     *
     * Users may override this function to implement behavior that is
     * dependent on the element having its properties initialized, e.g.
     * from defaults (initialized from `constructor`, `_initializeProperties`),
     * `attributeChangedCallback`, or values propagated from host e.g. via
     * bindings.  `super.ready()` must be called to ensure the data system
     * becomes enabled.
     *
     * @public
     */
    ready() {
      this.__dataReady = true;
      // Run normal flush
      this._flushProperties();
    }

    /**
     * Callback called when any properties with accessors created via
     * `_createPropertyAccessor` have been set.
     *
     * @param {!Object} currentProps Bag of all current accessor values
     * @param {!Object} changedProps Bag of properties changed since the last
     *   call to `_propertiesChanged`
     * @param {!Object} oldProps Bag of previous values for each property
     *   in `changedProps`
     * @protected
     */
    _propertiesChanged(currentProps, changedProps, oldProps) {} // eslint-disable-line no-unused-vars


    /**
     * Method called to determine whether a property value should be
     * considered as a change and cause the `_propertiesChanged` callback
     * to be enqueued.
     *
     * The default implementation returns `true` for primitive types if a
     * strict equality check fails, and returns `true` for all Object/Arrays.
     * The method always returns false for `NaN`.
     *
     * Override this method to e.g. provide stricter checking for
     * Objects/Arrays when using immutable patterns.
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     *   and enqueue a `_proeprtiesChanged` callback
     * @protected
     */
    _shouldPropertyChange(property, value, old) {
      return (
        // Strict equality check
        old !== value && (
        // This ensures (old==NaN, value==NaN) always returns false
        old === old || value === value)
      );
    }

  }

  return PropertyAccessors;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = PropertyAccessors;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


/** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */
let AsyncInterface; // eslint-disable-line no-unused-vars

// Microtask implemented using Mutation Observer
let microtaskCurrHandle = 0;
let microtaskLastHandle = 0;
let microtaskCallbacks = [];
let microtaskNodeContent = 0;
let microtaskNode = document.createTextNode('');
new window.MutationObserver(microtaskFlush).observe(microtaskNode, { characterData: true });

function microtaskFlush() {
  const len = microtaskCallbacks.length;
  for (let i = 0; i < len; i++) {
    let cb = microtaskCallbacks[i];
    if (cb) {
      try {
        cb();
      } catch (e) {
        setTimeout(() => {
          throw e;
        });
      }
    }
  }
  microtaskCallbacks.splice(0, len);
  microtaskLastHandle += len;
}

const timeOut = {
  /**
   * Returns a sub-module with the async interface providing the provided
   * delay.
   *
   * @memberof Polymer.Async.timeOut
   * @param {number} delay Time to wait before calling callbacks in ms
   * @return {AsyncInterface} An async timeout interface
   */
  after(delay) {
    return {
      run(fn) {
        return setTimeout(fn, delay);
      },
      cancel: window.clearTimeout.bind(window)
    };
  },
  /**
   * Enqueues a function called in the next task.
   *
   * @memberof Polymer.Async.timeOut
   * @param {Function} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run: window.setTimeout.bind(window),
  /**
   * Cancels a previously enqueued `timeOut` callback.
   *
   * @memberof Polymer.Async.timeOut
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel: window.clearTimeout.bind(window)
};
/* harmony export (immutable) */ __webpack_exports__["b"] = timeOut;


const animationFrame = {
  /**
   * Enqueues a function called at `requestAnimationFrame` timing.
   *
   * @memberof Polymer.Async.animationFrame
   * @param {Function} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run: window.requestAnimationFrame.bind(window),
  /**
   * Cancels a previously enqueued `animationFrame` callback.
   *
   * @memberof Polymer.Async.timeOut
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel: window.cancelAnimationFrame.bind(window)
};
/* unused harmony export animationFrame */


const idlePeriod = {
  /**
   * Enqueues a function called at `requestIdleCallback` timing.
   *
   * @memberof Polymer.Async.idlePeriod
   * @param {function(IdleDeadline)} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run(fn) {
    return window.requestIdleCallback ? window.requestIdleCallback(fn) : window.setTimeout(fn, 16);
  },
  /**
   * Cancels a previously enqueued `idlePeriod` callback.
   *
   * @memberof Polymer.Async.idlePeriod
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel(handle) {
    window.cancelIdleCallback ? window.cancelIdleCallback(handle) : window.clearTimeout(handle);
  }
};
/* unused harmony export idlePeriod */


const microTask = {

  /**
   * Enqueues a function called at microtask timing.
   *
   * @memberof Polymer.Async.microTask
   * @param {Function} callback Callback to run
   * @return {number} Handle used for canceling task
   */
  run(callback) {
    microtaskNode.textContent = microtaskNodeContent++;
    microtaskCallbacks.push(callback);
    return microtaskCurrHandle++;
  },

  /**
   * Cancels a previously enqueued `microTask` callback.
   *
   * @memberof Polymer.Async.microTask
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel(handle) {
    const idx = handle - microtaskLastHandle;
    if (idx >= 0) {
      if (!microtaskCallbacks[idx]) {
        throw new Error('invalid async handle: ' + handle);
      }
      microtaskCallbacks[idx] = null;
    }
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = microTask;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__ = __webpack_require__(3);



// 1.x backwards-compatible auto-wrapper for template type extensions
// This is a clear layering violation and gives favored-nation status to
// dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
// a.) to ease 1.x backwards-compatibility due to loss of `is`, and
// b.) to maintain if/repeat capability in parser-constrained elements
//     (e.g. table, select) in lieu of native CE type extensions without
//     massive new invention in this space (e.g. directive system)
const templateExtensions = {
  'dom-if': true,
  'dom-repeat': true
};
function wrapTemplateExtension(node) {
  let is = node.getAttribute('is');
  if (is && templateExtensions[is]) {
    let t = node;
    t.removeAttribute('is');
    node = t.ownerDocument.createElement(is);
    t.parentNode.replaceChild(node, t);
    node.appendChild(t);
    while (t.attributes.length) {
      node.setAttribute(t.attributes[0].name, t.attributes[0].value);
      t.removeAttribute(t.attributes[0].name);
    }
  }
  return node;
}

function findTemplateNode(root, nodeInfo) {
  // recursively ascend tree until we hit root
  let parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo);
  // unwind the stack, returning the indexed node at each level
  if (parent) {
    // note: marginally faster than indexing via childNodes
    // (http://jsperf.com/childnodes-lookup)
    for (let n = parent.firstChild, i = 0; n; n = n.nextSibling) {
      if (nodeInfo.parentIndex === i++) {
        return n;
      }
    }
  } else {
    return root;
  }
}

// construct `$` map (from id annotations)
function applyIdToMap(inst, map, node, nodeInfo) {
  if (nodeInfo.id) {
    map[nodeInfo.id] = node;
  }
}

// install event listeners (from event annotations)
function applyEventListener(inst, node, nodeInfo) {
  if (nodeInfo.events && nodeInfo.events.length) {
    for (let j = 0, e$ = nodeInfo.events, e; j < e$.length && (e = e$[j]); j++) {
      inst._addMethodEventListenerToNode(node, e.name, e.value, inst);
    }
  }
}

// push configuration references at configure time
function applyTemplateContent(inst, node, nodeInfo) {
  if (nodeInfo.templateInfo) {
    node._templateInfo = nodeInfo.templateInfo;
  }
}

function createNodeEventHandler(context, eventName, methodName) {
  // Instances can optionally have a _methodHost which allows redirecting where
  // to find methods. Currently used by `templatize`.
  context = context._methodHost || context;
  let handler = function (e) {
    if (context[methodName]) {
      context[methodName](e, e.detail);
    } else {
      console.warn('listener method `' + methodName + '` not defined');
    }
  };
  return handler;
}

const TemplateStamp = Object(__WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_TemplateStamp}
   */
  class TemplateStamp extends superClass {

    /**
     * Scans a template to produce template metadata.
     *
     * Template-specific metadata are stored in the object returned, and node-
     * specific metadata are stored in objects in its flattened `nodeInfoList`
     * array.  Only nodes in the template that were parsed as nodes of
     * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
     * contains an `index` (`childNodes` index in parent) and optionally
     * `parent`, which points to node info of its parent (including its index).
     *
     * The template metadata object returned from this method has the following
     * structure (many fields optional):
     *
     * ```js
     *   {
     *     // Flattened list of node metadata (for nodes that generated metadata)
     *     nodeInfoList: [
     *       {
     *         // `id` attribute for any nodes with id's for generating `$` map
     *         id: {string},
     *         // `on-event="handler"` metadata
     *         events: [
     *           {
     *             name: {string},   // event name
     *             value: {string},  // handler method name
     *           }, ...
     *         ],
     *         // Notes when the template contained a `<slot>` for shady DOM
     *         // optimization purposes
     *         hasInsertionPoint: {boolean},
     *         // For nested `<template>`` nodes, nested template metadata
     *         templateInfo: {object}, // nested template metadata
     *         // Metadata to allow efficient retrieval of instanced node
     *         // corresponding to this metadata
     *         parentInfo: {number},   // reference to parent nodeInfo>
     *         parentIndex: {number},  // index in parent's `childNodes` collection
     *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
     *       },
     *       ...
     *     ],
     *     // When true, the template had the `strip-whitespace` attribute
     *     // or was nested in a template with that setting
     *     stripWhitespace: {boolean},
     *     // For nested templates, nested template content is moved into
     *     // a document fragment stored here; this is an optimization to
     *     // avoid the cost of nested template cloning
     *     content: {DocumentFragment}
     *   }
     * ```
     *
     * This method kicks off a recursive treewalk as follows:
     *
     * ```
     *    _parseTemplate <---------------------+
     *      _parseTemplateContent              |
     *        _parseTemplateNode  <------------|--+
     *          _parseTemplateNestedTemplate --+  |
     *          _parseTemplateChildNodes ---------+
     *          _parseTemplateNodeAttributes
     *            _parseTemplateNodeAttribute
     *
     * ```
     *
     * These methods may be overridden to add custom metadata about templates
     * to either `templateInfo` or `nodeInfo`.
     *
     * Note that this method may be destructive to the template, in that
     * e.g. event annotations may be removed after being noted in the
     * template metadata.
     *
     * @param {!HTMLTemplateElement} template Template to parse
     * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
     *   template, for parsing nested templates
     * @return {!TemplateInfo} Parsed template metadata
     */
    static _parseTemplate(template, outerTemplateInfo) {
      // since a template may be re-used, memo-ize metadata
      if (!template._templateInfo) {
        let templateInfo = template._templateInfo = {};
        templateInfo.nodeInfoList = [];
        templateInfo.stripWhiteSpace = outerTemplateInfo && outerTemplateInfo.stripWhiteSpace || template.hasAttribute('strip-whitespace');
        this._parseTemplateContent(template, templateInfo, { parent: null });
      }
      return template._templateInfo;
    }

    static _parseTemplateContent(template, templateInfo, nodeInfo) {
      return this._parseTemplateNode(template.content, templateInfo, nodeInfo);
    }

    /**
     * Parses template node and adds template and node metadata based on
     * the current node, and its `childNodes` and `attributes`.
     *
     * This method may be overridden to add custom node or template specific
     * metadata based on this node.
     *
     * @param {Node} node Node to parse
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNode(node, templateInfo, nodeInfo) {
      let noted;
      let element = /** @type Element */node;
      if (element.localName == 'template' && !element.hasAttribute('preserve-content')) {
        noted = this._parseTemplateNestedTemplate(element, templateInfo, nodeInfo) || noted;
      } else if (element.localName === 'slot') {
        // For ShadyDom optimization, indicating there is an insertion point
        templateInfo.hasInsertionPoint = true;
      }
      if (element.firstChild) {
        noted = this._parseTemplateChildNodes(element, templateInfo, nodeInfo) || noted;
      }
      if (element.hasAttributes && element.hasAttributes()) {
        noted = this._parseTemplateNodeAttributes(element, templateInfo, nodeInfo) || noted;
      }
      return noted;
    }

    /**
     * Parses template child nodes for the given root node.
     *
     * This method also wraps whitelisted legacy template extensions
     * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
     * wrappers, collapses text nodes, and strips whitespace from the template
     * if the `templateInfo.stripWhitespace` setting was provided.
     *
     * @param {Node} root Root node whose `childNodes` will be parsed
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     */
    static _parseTemplateChildNodes(root, templateInfo, nodeInfo) {
      for (let node = root.firstChild, parentIndex = 0, next; node; node = next) {
        // Wrap templates
        if (node.localName == 'template') {
          node = wrapTemplateExtension(node);
        }
        // collapse adjacent textNodes: fixes an IE issue that can cause
        // text nodes to be inexplicably split =(
        // note that root.normalize() should work but does not so we do this
        // manually.
        next = node.nextSibling;
        if (node.nodeType === Node.TEXT_NODE) {
          let /** Node */n = next;
          while (n && n.nodeType === Node.TEXT_NODE) {
            node.textContent += n.textContent;
            next = n.nextSibling;
            root.removeChild(n);
            n = next;
          }
          // optionally strip whitespace
          if (templateInfo.stripWhiteSpace && !node.textContent.trim()) {
            root.removeChild(node);
            continue;
          }
        }
        let childInfo = { parentIndex, parentInfo: nodeInfo };
        if (this._parseTemplateNode(node, templateInfo, childInfo)) {
          childInfo.infoIndex = templateInfo.nodeInfoList.push( /** @type {!NodeInfo} */childInfo) - 1;
        }
        // Increment if not removed
        if (node.parentNode) {
          parentIndex++;
        }
      }
    }

    /**
     * Parses template content for the given nested `<template>`.
     *
     * Nested template info is stored as `templateInfo` in the current node's
     * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
     * It will then be the responsibility of the host to set it back to the
     * template and for users stamping nested templates to use the
     * `_contentForTemplate` method to retrieve the content for this template
     * (an optimization to avoid the cost of cloning nested template content).
     *
     * @param {HTMLTemplateElement} node Node to parse (a <template>)
     * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
     *   that includes the template `node`
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNestedTemplate(node, outerTemplateInfo, nodeInfo) {
      let templateInfo = this._parseTemplate(node, outerTemplateInfo);
      let content = templateInfo.content = node.content.ownerDocument.createDocumentFragment();
      content.appendChild(node.content);
      nodeInfo.templateInfo = templateInfo;
      return true;
    }

    /**
     * Parses template node attributes and adds node metadata to `nodeInfo`
     * for nodes of interest.
     *
     * @param {Element} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNodeAttributes(node, templateInfo, nodeInfo) {
      // Make copy of original attribute list, since the order may change
      // as attributes are added and removed
      let noted = false;
      let attrs = Array.from(node.attributes);
      for (let i = attrs.length - 1, a; a = attrs[i]; i--) {
        noted = this._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, a.name, a.value) || noted;
      }
      return noted;
    }

    /**
     * Parses a single template node attribute and adds node metadata to
     * `nodeInfo` for attributes of interest.
     *
     * This implementation adds metadata for `on-event="handler"` attributes
     * and `id` attributes.
     *
     * @param {Element} node Node to parse
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @param {string} name Attribute name
     * @param {string} value Attribute value
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
      // events (on-*)
      if (name.slice(0, 3) === 'on-') {
        node.removeAttribute(name);
        nodeInfo.events = nodeInfo.events || [];
        nodeInfo.events.push({
          name: name.slice(3),
          value
        });
        return true;
      }
      // static id
      else if (name === 'id') {
          nodeInfo.id = value;
          return true;
        }
      return false;
    }

    /**
     * Returns the `content` document fragment for a given template.
     *
     * For nested templates, Polymer performs an optimization to cache nested
     * template content to avoid the cost of cloning deeply nested templates.
     * This method retrieves the cached content for a given template.
     *
     * @param {HTMLTemplateElement} template Template to retrieve `content` for
     * @return {DocumentFragment} Content fragment
     */
    static _contentForTemplate(template) {
      let templateInfo = /** @type {HTMLTemplateElementWithInfo} */template._templateInfo;
      return templateInfo && templateInfo.content || template.content;
    }

    /**
     * Clones the provided template content and returns a document fragment
     * containing the cloned dom.
     *
     * The template is parsed (once and memoized) using this library's
     * template parsing features, and provides the following value-added
     * features:
     * * Adds declarative event listeners for `on-event="handler"` attributes
     * * Generates an "id map" for all nodes with id's under `$` on returned
     *   document fragment
     * * Passes template info including `content` back to templates as
     *   `_templateInfo` (a performance optimization to avoid deep template
     *   cloning)
     *
     * Note that the memoized template parsing process is destructive to the
     * template: attributes for bindings and declarative event listeners are
     * removed after being noted in notes, and any nested `<template>.content`
     * is removed and stored in notes as well.
     *
     * @param {!HTMLTemplateElement} template Template to stamp
     * @return {!StampedTemplate} Cloned template content
     */
    _stampTemplate(template) {
      // Polyfill support: bootstrap the template if it has not already been
      if (template && !template.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
        HTMLTemplateElement.decorate(template);
      }
      let templateInfo = this.constructor._parseTemplate(template);
      let nodeInfo = templateInfo.nodeInfoList;
      let content = templateInfo.content || template.content;
      let dom = /** @type DocumentFragment */document.importNode(content, true);
      // NOTE: ShadyDom optimization indicating there is an insertion point
      dom.__noInsertionPoint = !templateInfo.hasInsertionPoint;
      let nodes = dom.nodeList = new Array(nodeInfo.length);
      dom.$ = {};
      for (let i = 0, l = nodeInfo.length, info; i < l && (info = nodeInfo[i]); i++) {
        let node = nodes[i] = findTemplateNode(dom, info);
        applyIdToMap(this, dom.$, node, info);
        applyTemplateContent(this, node, info);
        applyEventListener(this, node, info);
      }
      return (/** @type {!StampedTemplate} */dom
      );
    }

    /**
     * Adds an event listener by method name for the event provided.
     *
     * This method generates a handler function that looks up the method
     * name at handling time.
     *
     * @param {Node} node Node to add listener on
     * @param {string} eventName Name of event
     * @param {string} methodName Name of method
     * @param {*=} context Context the method will be called on (defaults
     *   to `node`)
     * @return {Function} Generated handler function
     */
    _addMethodEventListenerToNode(node, eventName, methodName, context) {
      context = context || node;
      let handler = createNodeEventHandler(context, eventName, methodName);
      this._addEventListenerToNode(node, eventName, handler);
      return handler;
    }

    /**
     * Override point for adding custom or simulated event handling.
     *
     * @param {Node} node Node to add event listener to
     * @param {string} eventName Name of event
     * @param {Function} handler Listener function to add
     */
    _addEventListenerToNode(node, eventName, handler) {
      node.addEventListener(eventName, handler);
    }

    /**
     * Override point for adding custom or simulated event handling.
     *
     * @param {Node} node Node to remove event listener from
     * @param {string} eventName Name of event
     * @param {Function} handler Listener function to remove
     */
    _removeEventListenerFromNode(node, eventName, handler) {
      node.removeEventListener(eventName, handler);
    }

  }

  return TemplateStamp;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = TemplateStamp;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clubs_json__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clubs_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__clubs_json__);




/* harmony default export */ __webpack_exports__["a"] = ({
  key: {
    type: String,
    value: "AIzaSyD6Ltm32QJIxRFDSdWyQ6--2Y_j0YxEwlg"
  },
  map: {
    type: Object,
    value: {
      lat: 45.4737012,
      long: 9.1908025
    }
  },
  daysOpts: {
    type: Array,
    value: [{ label: 'Lunedì' }, { label: 'Martedì' }, { label: 'Mercoledì' }, { label: 'Giovedì' }, { label: 'Venerdì' }]
  },
  query: {
    type: String,
    value: ''
  },
  data: {
    type: Array,
    value: __WEBPACK_IMPORTED_MODULE_0__clubs_json___default.a || []
  },
  filtered: {
    type: Array,
    value: []
  },
  markers: {
    type: Array,
    value: []
  },
  days: {
    type: Array,
    value: []
  }
});

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "\n<style>\n\n</style>\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"column\">\n      <label for=\"query\">[[_computeText(data)]]</label>\n      <input type=\"text\" name=\"query\" value=\"[[query]]\"\n      on-keyup=\"_updateQuery\"\n      placeholder=\"Milano, Pavia, ...\">\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"column\">\n      <google-map api-key=\"[[key]]\" latitude=\"[[map.lat]]\" longitude=\"[[map.long]]\"\n      fit-to-markers disable-zoom max-zoom=\"16\" min-zoom=\"10\" single-info-window>\n        <template is=\"dom-repeat\" items=\"[[markers]]\">\n          <google-map-marker\n            latitude=\"[[item.latitude]]\"\n            longitude=\"[[item.longitude]]\"\n            title=\"[[item.name]]\"\n            animation=\"DROP\"\n            on-google-map-marker-click=\"_selectMarker\"\n            click-events data-name$=\"[[item.name]]\"\n          ></google-map-marker>\n        </template>\n      </google-map>\n    </div>\n  </div>\n\n  <div class=\"row days\">\n    <div class=\"column column-33\">\n      <p>Giorni di allenamento:</p>\n    </div>\n    <div class=\"column\">\n      <template is=\"dom-repeat\" items=\"[[daysOpts]]\">\n        <button\n          data-index$=\"[[index]]\"\n          on-tap=\"_selectDays\"\n          class$=\"[[_computeSelectedDay(item.selected)]]\">\n            [[item.label]]\n        </button>\n      </template>\n    </div>\n  </div>\n\n\n  <div class=\"row row-wrap cards\">\n    <template is=\"dom-repeat\" items=\"[[filtered]]\">\n    <div class=\"column column-25\">\n      <article class=\"card\">\n        <header class=\"card__thumb\">\n          <img src=\"[[item.logo]]\">\n        </header>\n        <!-- <div class=\"card__date\">\n          <span class=\"card__date__day\">12</span>\n          <span class=\"card__date__month\">Mai</span>\n        </div> -->\n        <div class=\"card__body\">\n          <!-- <div class=\"card__category\">\n            <a href=\"#\">Engineering</a>\n          </div> -->\n          <h2 class=\"card__title\">\n            <a href=\"[[item.url]]\" target=\"_blank\">[[item.name]]</a>\n          </h2>\n          <p><small>[[item.city]]</small></p>\n          <!--<div class=\"card__subtitle\">A Head In The Polls </div>\n            <p class=\"card__description\">\n              With a warning label this big, you know they gotta be fun! This is the worst part. The calm before the battle. No! The cat shelter's on to me. Yes, I saw. You were doing well, until everyone died. Daylight and everything.\n          </p> -->\n          <p></p>\n        </div>\n      </article>\n    </div>\n    </template>\n  </div>\n</div>\n"

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = [{"name":"Tang Lang","city":"Pieve Emanuele (Milano)","logo":"http://www.fenghuang.org/images/loghi-club/Tang-Lan-Chuan.png","days":[{"day":1,"latitude":45.35068,"longitude":9.20059},{"day":3,"latitude":45.35068,"longitude":9.20059}],"url":"http://www.fenghuang.org/kung-fu-milano-pavia/pieve-emanuele-milano-sud"},{"name":"Yĩng Bũ Zhàng Chì","city":"Lacchiarella (Milano)","logo":"http://www.fenghuang.org/images/loghi-club/Yuin-Bu-Zhang-Chi.png","days":[{"day":2,"latitude":45.323792,"longitude":9.140073},{"day":4,"latitude":45.31967,"longitude":9.138918}],"url":"http://www.fenghuang.org/kung-fu-milano-pavia/palestra-lacchiarella-milano"},{"name":"Mat Troi Dang Len","city":"Milano (Famagosta)","logo":"http://www.fenghuang.org/images/loghi-club/Mat-Troi-Dan-Len.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/corso-milano-famagosta","days":[{"day":0,"latitude":45.432146,"longitude":9.157363},{"day":2,"latitude":45.432146,"longitude":9.157363}]},{"name":"Long Ho","city":"Landriano (Pavia)","logo":"http://www.fenghuang.org/images/loghi-club/Long-Ho.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/kung-fu-landriano-pavia","days":[{"day":0,"latitude":45.312194,"longitude":9.259746},{"day":3,"latitude":45.312194,"longitude":9.259746}]},{"name":"Da Cam Thach","city":"Pero (Milano)","logo":"http://www.fenghuang.org/images/loghi-club/Da-Cam-Thach.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/palestra-pero","days":[{"day":1,"latitude":45.509753,"longitude":9.089593},{"day":3,"latitude":45.509753,"longitude":9.089593}]},{"name":"Da Cam Thach","city":"Pessano con Bornago (Milano) ","logo":"http://www.fenghuang.org/images/loghi-club/Da-Cam-Thach.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/palestra-pero","days":[{"day":0,"latitude":45.551348,"longitude":9.386223},{"day":2,"latitude":45.545882,"longitude":9.389233}]},{"name":"Pa Chi Chuan","city":"Zenone Al Lambro (Milano)","logo":"http://www.fenghuang.org/images/loghi-club/PACHICHUAN_Logo.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/palestra-zenone-al-lambro","days":[{"day":1,"latitude":45.326934,"longitude":9.357902},{"day":4,"latitude":45.326934,"longitude":9.357902}]},{"name":"Nghich ma cuoc","city":"Torrevecchia Pia (Pavia)","logo":"http://www.fenghuang.org/images/loghi-club/logo-Nghich-ma-cuoc.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/palestra-torrevecchia-pia","days":[{"day":2,"latitude":45.283727,"longitude":9.298005},{"day":4,"latitude":45.283727,"longitude":9.298005}]},{"name":"Yun Chi","city":"Rozzano (Milano)","logo":"http://www.fenghuang.org/images/loghi-club/logo-Yun-Chi-Rozzano.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/corso-rozzano","days":[{"day":0,"latitude":45.378776,"longitude":9.154653},{"day":2,"latitude":45.378776,"longitude":9.154653}]},{"name":"Ho Trao","city":"San Giuliano Milanese (Milano)","logo":"http://www.fenghuang.org/images/loghi-club/Ho-Trao.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/palestra-san-giuliano-milanese","days":[{"day":0,"latitude":45.395334,"longitude":9.288501},{"day":3,"latitude":45.395334,"longitude":9.288501}]},{"name":"Shoen","city":"Senago (Milano)","logo":"http://www.fenghuang.org/images/loghi-club/Shoen.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/corso-senago","days":[{"day":0,"latitude":45.574262,"longitude":9.118499},{"day":3,"latitude":45.574262,"longitude":9.118499}]},{"name":"Dai Long Trao","city":"Corsico (Milano)","logo":"http://www.fenghuang.org/images/loghi-club/logo-Dai-Long-Trao-Corsico.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/palestra-corsico","days":[{"day":1,"latitude":45.441871,"longitude":9.111886},{"day":3,"latitude":45.441871,"longitude":9.111886}]},{"name":"Qian Gong","city":"Ceranova (Pavia)","logo":"http://www.fenghuang.org/images/loghi-club/Qian-Gong.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/corso-ceranova-pavia","days":[{"day":1,"latitude":45.257298,"longitude":9.237621},{"day":3,"latitude":45.257298,"longitude":9.237621}]},{"name":"Shì Hòu","city":"Vidigulfo (Pavia)","logo":"http://www.fenghuang.org/images/loghi-club/Shi-Hou.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/palestra-vidigulfo-pavia","days":[{"day":1,"latitude":45.2931523,"longitude":9.2355102},{"day":3,"latitude":45.2931523,"longitude":9.2355102}]},{"name":"Bac Ho","city":"Marcignago (Pavia)","logo":"http://www.fenghuang.org/images/loghi-club/Bac-Ho_Tosoni.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/palestra-marcignago-pavia","days":[{"day":0,"latitude":45.25845,"longitude":9.075061},{"day":2,"latitude":45.25845,"longitude":9.075061}]},{"name":"Xuan Long","city":"Buccinasco/Assago (Milano)","logo":"http://www.fenghuang.org/images/loghi-club/Xuang-Long.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/palestra-buccinasco-milano","days":[{"day":0,"latitude":45.403395,"longitude":9.136541},{"day":3,"latitude":45.403395,"longitude":9.136541}]},{"name":"Pan Jua Shi","city":"Gorla Minore (Varese)","logo":"http://www.fenghuang.org/images/loghi-club/Xuang-Long.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/palestra-gorla-minore-va","days":[{"day":0,"latitude":45.70708,"longitude":8.877291},{"day":2,"latitude":45.70708,"longitude":8.877291}]},{"name":"Sho Ying","city":"Cesano Boscone (Milano)","logo":"http://www.fenghuang.org/images/loghi-club/logo-Sho-Ying.png","url":"http://www.fenghuang.org/kung-fu-milano-pavia/palestra-cesano-boscone","days":[{"day":0,"latitude":45.445651,"longitude":9.090596},{"day":3,"latitude":45.445651,"longitude":9.090596}]}]

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_mixin_js__ = __webpack_require__(3);


// Common implementation for mixin & behavior
function mutablePropertyChange(inst, property, value, old, mutableData) {
  let isObject;
  if (mutableData) {
    isObject = typeof value === 'object' && value !== null;
    // Pull `old` for Objects from temp cache, but treat `null` as a primitive
    if (isObject) {
      old = inst.__dataTemp[property];
    }
  }
  // Strict equality check, but return false for NaN===NaN
  let shouldChange = old !== value && (old === old || value === value);
  // Objects are stored in temporary cache (cleared at end of
  // turn), which is used for dirty-checking
  if (isObject && shouldChange) {
    inst.__dataTemp[property] = value;
  }
  return shouldChange;
}

const MutableData = Object(__WEBPACK_IMPORTED_MODULE_0__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_MutableData}
   */
  class MutableData extends superClass {
    /**
     * Overrides `Polymer.PropertyEffects` to provide option for skipping
     * strict equality checking for Objects and Arrays.
     *
     * This method pulls the value to dirty check against from the `__dataTemp`
     * cache (rather than the normal `__data` cache) for Objects.  Since the temp
     * cache is cleared at the end of a turn, this implementation allows
     * side-effects of deep object changes to be processed by re-setting the
     * same object (using the temp cache as an in-turn backstop to prevent
     * cycles due to 2-way notification).
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     * @protected
     */
    _shouldPropertyChange(property, value, old) {
      return mutablePropertyChange(this, property, value, old, true);
    }

  }
  /** @type {boolean} */
  MutableData.prototype.mutableData = false;

  return MutableData;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = MutableData;


const OptionalMutableData = Object(__WEBPACK_IMPORTED_MODULE_0__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @mixinClass
   * @polymer
   * @implements {Polymer_OptionalMutableData}
   */
  class OptionalMutableData extends superClass {

    static get properties() {
      return {
        /**
         * Instance-level flag for configuring the dirty-checking strategy
         * for this element.  When true, Objects and Arrays will skip dirty
         * checking, otherwise strict equality checking will be used.
         */
        mutableData: Boolean
      };
    }

    /**
     * Overrides `Polymer.PropertyEffects` to provide option for skipping
     * strict equality checking for Objects and Arrays.
     *
     * When `this.mutableData` is true on this instance, this method
     * pulls the value to dirty check against from the `__dataTemp` cache
     * (rather than the normal `__data` cache) for Objects.  Since the temp
     * cache is cleared at the end of a turn, this implementation allows
     * side-effects of deep object changes to be processed by re-setting the
     * same object (using the temp cache as an in-turn backstop to prevent
     * cycles due to 2-way notification).
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     * @protected
     */
    _shouldPropertyChange(property, value, old) {
      return mutablePropertyChange(this, property, value, old, this.mutableData);
    }
  }

  return OptionalMutableData;
});
/* harmony export (immutable) */ __webpack_exports__["b"] = OptionalMutableData;


// Export for use by legacy behavior
MutableData._mutablePropertyChange = mutablePropertyChange;

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DomRepeat */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_element_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_debounce_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_flush_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_mutable_data_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_path_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_async_js__ = __webpack_require__(15);








let TemplateInstanceBase = __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__["a" /* TemplateInstanceBase */]; // eslint-disable-line

/**
 * @constructor
 * @implements {Polymer_OptionalMutableData}
 * @extends {Polymer.Element}
 */
const domRepeatBase = Object(__WEBPACK_IMPORTED_MODULE_4__mixins_mutable_data_js__["b" /* OptionalMutableData */])(__WEBPACK_IMPORTED_MODULE_0__polymer_element_js__["a" /* Element */]);

/**
 * The `<dom-repeat>` element will automatically stamp and binds one instance
 * of template content to each object in a user-provided array.
 * `dom-repeat` accepts an `items` property, and one instance of the template
 * is stamped for each item into the DOM at the location of the `dom-repeat`
 * element.  The `item` property will be set on each instance's binding
 * scope, thus templates should bind to sub-properties of `item`.
 *
 * Example:
 *
 * ```html
 * <dom-module id="employee-list">
 *
 *   <template>
 *
 *     <div> Employee list: </div>
 *     <template is="dom-repeat" items="{{employees}}">
 *         <div>First name: <span>{{item.first}}</span></div>
 *         <div>Last name: <span>{{item.last}}</span></div>
 *     </template>
 *
 *   </template>
 *
 *   <script>
 *     Polymer({
 *       is: 'employee-list',
 *       ready: function() {
 *         this.employees = [
 *             {first: 'Bob', last: 'Smith'},
 *             {first: 'Sally', last: 'Johnson'},
 *             ...
 *         ];
 *       }
 *     });
 *   < /script>
 *
 * </dom-module>
 * ```
 *
 * Notifications for changes to items sub-properties will be forwarded to template
 * instances, which will update via the normal structured data notification system.
 *
 * Mutations to the `items` array itself should be made using the Array
 * mutation API's on `Polymer.Base` (`push`, `pop`, `splice`, `shift`,
 * `unshift`), and template instances will be kept in sync with the data in the
 * array.
 *
 * Events caught by event handlers within the `dom-repeat` template will be
 * decorated with a `model` property, which represents the binding scope for
 * each template instance.  The model is an instance of Polymer.Base, and should
 * be used to manipulate data on the instance, for example
 * `event.model.set('item.checked', true);`.
 *
 * Alternatively, the model for a template instance for an element stamped by
 * a `dom-repeat` can be obtained using the `modelForElement` API on the
 * `dom-repeat` that stamped it, for example
 * `this.$.domRepeat.modelForElement(event.target).set('item.checked', true);`.
 * This may be useful for manipulating instance data of event targets obtained
 * by event handlers on parents of the `dom-repeat` (event delegation).
 *
 * A view-specific filter/sort may be applied to each `dom-repeat` by supplying a
 * `filter` and/or `sort` property.  This may be a string that names a function on
 * the host, or a function may be assigned to the property directly.  The functions
 * should implemented following the standard `Array` filter/sort API.
 *
 * In order to re-run the filter or sort functions based on changes to sub-fields
 * of `items`, the `observe` property may be set as a space-separated list of
 * `item` sub-fields that should cause a re-filter/sort when modified.  If
 * the filter or sort function depends on properties not contained in `items`,
 * the user should observe changes to those properties and call `render` to update
 * the view based on the dependency change.
 *
 * For example, for an `dom-repeat` with a filter of the following:
 *
 * ```js
 * isEngineer: function(item) {
 *     return item.type == 'engineer' || item.manager.type == 'engineer';
 * }
 * ```
 *
 * Then the `observe` property should be configured as follows:
 *
 * ```html
 * <template is="dom-repeat" items="{{employees}}"
 *           filter="isEngineer" observe="type manager.type">
 * ```
 *
 * @customElement
 * @polymer
 * @memberof Polymer
 * @extends {domRepeatBase}
 * @appliesMixin Polymer.OptionalMutableData
 * @summary Custom element for stamping instance of a template bound to
 *   items in an array.
 */
class DomRepeat extends domRepeatBase {

  // Not needed to find template; can be removed once the analyzer
  // can find the tag name from customElements.define call
  static get is() {
    return 'dom-repeat';
  }

  static get template() {
    return null;
  }

  static get properties() {

    /**
     * Fired whenever DOM is added or removed by this template (by
     * default, rendering occurs lazily).  To force immediate rendering, call
     * `render`.
     *
     * @event dom-change
     */
    return {

      /**
       * An array containing items determining how many instances of the template
       * to stamp and that that each template instance should bind to.
       */
      items: {
        type: Array
      },

      /**
       * The name of the variable to add to the binding scope for the array
       * element associated with a given template instance.
       */
      as: {
        type: String,
        value: 'item'
      },

      /**
       * The name of the variable to add to the binding scope with the index
       * of the instance in the sorted and filtered list of rendered items.
       * Note, for the index in the `this.items` array, use the value of the
       * `itemsIndexAs` property.
       */
      indexAs: {
        type: String,
        value: 'index'
      },

      /**
       * The name of the variable to add to the binding scope with the index
       * of the instance in the `this.items` array. Note, for the index of
       * this instance in the sorted and filtered list of rendered items,
       * use the value of the `indexAs` property.
       */
      itemsIndexAs: {
        type: String,
        value: 'itemsIndex'
      },

      /**
       * A function that should determine the sort order of the items.  This
       * property should either be provided as a string, indicating a method
       * name on the element's host, or else be an actual function.  The
       * function should match the sort function passed to `Array.sort`.
       * Using a sort function has no effect on the underlying `items` array.
       */
      sort: {
        type: Function,
        observer: '__sortChanged'
      },

      /**
       * A function that can be used to filter items out of the view.  This
       * property should either be provided as a string, indicating a method
       * name on the element's host, or else be an actual function.  The
       * function should match the sort function passed to `Array.filter`.
       * Using a filter function has no effect on the underlying `items` array.
       */
      filter: {
        type: Function,
        observer: '__filterChanged'
      },

      /**
       * When using a `filter` or `sort` function, the `observe` property
       * should be set to a space-separated list of the names of item
       * sub-fields that should trigger a re-sort or re-filter when changed.
       * These should generally be fields of `item` that the sort or filter
       * function depends on.
       */
      observe: {
        type: String,
        observer: '__observeChanged'
      },

      /**
       * When using a `filter` or `sort` function, the `delay` property
       * determines a debounce time after a change to observed item
       * properties that must pass before the filter or sort is re-run.
       * This is useful in rate-limiting shuffing of the view when
       * item changes may be frequent.
       */
      delay: Number,

      /**
       * Count of currently rendered items after `filter` (if any) has been applied.
       * If "chunking mode" is enabled, `renderedItemCount` is updated each time a
       * set of template instances is rendered.
       *
       */
      renderedItemCount: {
        type: Number,
        notify: true,
        readOnly: true
      },

      /**
       * Defines an initial count of template instances to render after setting
       * the `items` array, before the next paint, and puts the `dom-repeat`
       * into "chunking mode".  The remaining items will be created and rendered
       * incrementally at each animation frame therof until all instances have
       * been rendered.
       */
      initialCount: {
        type: Number,
        observer: '__initializeChunking'
      },

      /**
       * When `initialCount` is used, this property defines a frame rate to
       * target by throttling the number of instances rendered each frame to
       * not exceed the budget for the target frame rate.  Setting this to a
       * higher number will allow lower latency and higher throughput for
       * things like event handlers, but will result in a longer time for the
       * remaining items to complete rendering.
       */
      targetFramerate: {
        type: Number,
        value: 20
      },

      _targetFrameTime: {
        type: Number,
        computed: '__computeFrameTime(targetFramerate)'
      }

    };
  }

  static get observers() {
    return ['__itemsChanged(items.*)'];
  }

  constructor() {
    super();
    this.__instances = [];
    this.__limit = Infinity;
    this.__pool = [];
    this.__renderDebouncer = null;
    this.__itemsIdxToInstIdx = {};
    this.__chunkCount = null;
    this.__lastChunkTime = null;
    this.__sortFn = null;
    this.__filterFn = null;
    this.__observePaths = null;
    this.__ctor = null;
    this.__isDetached = true;
    this.template = null;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.__isDetached = true;
    for (let i = 0; i < this.__instances.length; i++) {
      this.__detachInstance(i);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // only perform attachment if the element was previously detached.
    if (this.__isDetached) {
      this.__isDetached = false;
      let parent = this.parentNode;
      for (let i = 0; i < this.__instances.length; i++) {
        this.__attachInstance(i, parent);
      }
    }
  }

  __ensureTemplatized() {
    // Templatizing (generating the instance constructor) needs to wait
    // until ready, since won't have its template content handed back to
    // it until then
    if (!this.__ctor) {
      let template = this.template = this.querySelector('template');
      if (!template) {
        // // Wait until childList changes and template should be there by then
        let observer = new MutationObserver(() => {
          if (this.querySelector('template')) {
            observer.disconnect();
            this.__render();
          } else {
            throw new Error('dom-repeat requires a <template> child');
          }
        });
        observer.observe(this, { childList: true });
        return false;
      }
      // Template instance props that should be excluded from forwarding
      let instanceProps = {};
      instanceProps[this.as] = true;
      instanceProps[this.indexAs] = true;
      instanceProps[this.itemsIndexAs] = true;
      this.__ctor = __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__["b" /* Templatize */].templatize(template, this, {
        mutableData: this.mutableData,
        parentModel: true,
        instanceProps: instanceProps,
        /**
         * @this {this}
         * @param {string} prop Property to set
         * @param {*} value Value to set property to
         */
        forwardHostProp: function (prop, value) {
          let i$ = this.__instances;
          for (let i = 0, inst; i < i$.length && (inst = i$[i]); i++) {
            inst.forwardHostProp(prop, value);
          }
        },
        /**
         * @this {this}
         * @param {Object} inst Instance to notify
         * @param {string} prop Property to notify
         * @param {*} value Value to notify
         */
        notifyInstanceProp: function (inst, prop, value) {
          if (Object(__WEBPACK_IMPORTED_MODULE_5__utils_path_js__["e" /* matches */])(this.as, prop)) {
            let idx = inst[this.itemsIndexAs];
            if (prop == this.as) {
              this.items[idx] = value;
            }
            let path = Object(__WEBPACK_IMPORTED_MODULE_5__utils_path_js__["i" /* translate */])(this.as, 'items.' + idx, prop);
            this.notifyPath(path, value);
          }
        }
      });
    }
    return true;
  }

  __getMethodHost() {
    // Technically this should be the owner of the outermost template.
    // In shadow dom, this is always getRootNode().host, but we can
    // approximate this via cooperation with our dataHost always setting
    // `_methodHost` as long as there were bindings (or id's) on this
    // instance causing it to get a dataHost.
    return this.__dataHost._methodHost || this.__dataHost;
  }

  __sortChanged(sort) {
    let methodHost = this.__getMethodHost();
    this.__sortFn = sort && (typeof sort == 'function' ? sort : function () {
      return methodHost[sort].apply(methodHost, arguments);
    });
    if (this.items) {
      this.__debounceRender(this.__render);
    }
  }

  __filterChanged(filter) {
    let methodHost = this.__getMethodHost();
    this.__filterFn = filter && (typeof filter == 'function' ? filter : function () {
      return methodHost[filter].apply(methodHost, arguments);
    });
    if (this.items) {
      this.__debounceRender(this.__render);
    }
  }

  __computeFrameTime(rate) {
    return Math.ceil(1000 / rate);
  }

  __initializeChunking() {
    if (this.initialCount) {
      this.__limit = this.initialCount;
      this.__chunkCount = this.initialCount;
      this.__lastChunkTime = performance.now();
    }
  }

  __tryRenderChunk() {
    // Debounced so that multiple calls through `_render` between animation
    // frames only queue one new rAF (e.g. array mutation & chunked render)
    if (this.items && this.__limit < this.items.length) {
      this.__debounceRender(this.__requestRenderChunk);
    }
  }

  __requestRenderChunk() {
    requestAnimationFrame(() => this.__renderChunk());
  }

  __renderChunk() {
    // Simple auto chunkSize throttling algorithm based on feedback loop:
    // measure actual time between frames and scale chunk count by ratio
    // of target/actual frame time
    let currChunkTime = performance.now();
    let ratio = this._targetFrameTime / (currChunkTime - this.__lastChunkTime);
    this.__chunkCount = Math.round(this.__chunkCount * ratio) || 1;
    this.__limit += this.__chunkCount;
    this.__lastChunkTime = currChunkTime;
    this.__debounceRender(this.__render);
  }

  __observeChanged() {
    this.__observePaths = this.observe && this.observe.replace('.*', '.').split(' ');
  }

  __itemsChanged(change) {
    if (this.items && !Array.isArray(this.items)) {
      console.warn('dom-repeat expected array for `items`, found', this.items);
    }
    // If path was to an item (e.g. 'items.3' or 'items.3.foo'), forward the
    // path to that instance synchronously (retuns false for non-item paths)
    if (!this.__handleItemPath(change.path, change.value)) {
      // Otherwise, the array was reset ('items') or spliced ('items.splices'),
      // so queue a full refresh
      this.__initializeChunking();
      this.__debounceRender(this.__render);
    }
  }

  __handleObservedPaths(path) {
    if (this.__observePaths) {
      path = path.substring(path.indexOf('.') + 1);
      let paths = this.__observePaths;
      for (let i = 0; i < paths.length; i++) {
        if (path.indexOf(paths[i]) === 0) {
          this.__debounceRender(this.__render, this.delay);
          return true;
        }
      }
    }
  }

  /**
   * @param {function(this:DomRepeat)} fn Function to debounce.
   * @param {number=} delay Delay in ms to debounce by.
   */
  __debounceRender(fn, delay = 0) {
    this.__renderDebouncer = __WEBPACK_IMPORTED_MODULE_2__utils_debounce_js__["a" /* Debouncer */].debounce(this.__renderDebouncer, delay > 0 ? __WEBPACK_IMPORTED_MODULE_6__utils_async_js__["b" /* timeOut */].after(delay) : __WEBPACK_IMPORTED_MODULE_6__utils_async_js__["a" /* microTask */], fn.bind(this));
    Object(__WEBPACK_IMPORTED_MODULE_3__utils_flush_js__["a" /* enqueueDebouncer */])(this.__renderDebouncer);
  }

  /**
   * Forces the element to render its content. Normally rendering is
   * asynchronous to a provoking change. This is done for efficiency so
   * that multiple changes trigger only a single render. The render method
   * should be called if, for example, template rendering is required to
   * validate application state.
   */
  render() {
    // Queue this repeater, then flush all in order
    this.__debounceRender(this.__render);
    Object(__WEBPACK_IMPORTED_MODULE_3__utils_flush_js__["b" /* flush */])();
  }

  __render() {
    if (!this.__ensureTemplatized()) {
      // No template found yet
      return;
    }
    this.__applyFullRefresh();
    // Reset the pool
    // TODO(kschaaf): Reuse pool across turns and nested templates
    // Now that objects/arrays are re-evaluated when set, we can safely
    // reuse pooled instances across turns, however we still need to decide
    // semantics regarding how long to hold, how many to hold, etc.
    this.__pool.length = 0;
    // Set rendered item count
    this._setRenderedItemCount(this.__instances.length);
    // Notify users
    this.dispatchEvent(new CustomEvent('dom-change', {
      bubbles: true,
      composed: true
    }));
    // Check to see if we need to render more items
    this.__tryRenderChunk();
  }

  __applyFullRefresh() {
    let items = this.items || [];
    let isntIdxToItemsIdx = new Array(items.length);
    for (let i = 0; i < items.length; i++) {
      isntIdxToItemsIdx[i] = i;
    }
    // Apply user filter
    if (this.__filterFn) {
      isntIdxToItemsIdx = isntIdxToItemsIdx.filter((i, idx, array) => this.__filterFn(items[i], idx, array));
    }
    // Apply user sort
    if (this.__sortFn) {
      isntIdxToItemsIdx.sort((a, b) => this.__sortFn(items[a], items[b]));
    }
    // items->inst map kept for item path forwarding
    const itemsIdxToInstIdx = this.__itemsIdxToInstIdx = {};
    let instIdx = 0;
    // Generate instances and assign items
    const limit = Math.min(isntIdxToItemsIdx.length, this.__limit);
    for (; instIdx < limit; instIdx++) {
      let inst = this.__instances[instIdx];
      let itemIdx = isntIdxToItemsIdx[instIdx];
      let item = items[itemIdx];
      itemsIdxToInstIdx[itemIdx] = instIdx;
      if (inst && instIdx < this.__limit) {
        inst._setPendingProperty(this.as, item);
        inst._setPendingProperty(this.indexAs, instIdx);
        inst._setPendingProperty(this.itemsIndexAs, itemIdx);
        inst._flushProperties();
      } else {
        this.__insertInstance(item, instIdx, itemIdx);
      }
    }
    // Remove any extra instances from previous state
    for (let i = this.__instances.length - 1; i >= instIdx; i--) {
      this.__detachAndRemoveInstance(i);
    }
  }

  __detachInstance(idx) {
    let inst = this.__instances[idx];
    for (let i = 0; i < inst.children.length; i++) {
      let el = inst.children[i];
      inst.root.appendChild(el);
    }
    return inst;
  }

  __attachInstance(idx, parent) {
    let inst = this.__instances[idx];
    parent.insertBefore(inst.root, this);
  }

  __detachAndRemoveInstance(idx) {
    let inst = this.__detachInstance(idx);
    if (inst) {
      this.__pool.push(inst);
    }
    this.__instances.splice(idx, 1);
  }

  __stampInstance(item, instIdx, itemIdx) {
    let model = {};
    model[this.as] = item;
    model[this.indexAs] = instIdx;
    model[this.itemsIndexAs] = itemIdx;
    return new this.__ctor(model);
  }

  __insertInstance(item, instIdx, itemIdx) {
    let inst = this.__pool.pop();
    if (inst) {
      // TODO(kschaaf): If the pool is shared across turns, hostProps
      // need to be re-set to reused instances in addition to item
      inst._setPendingProperty(this.as, item);
      inst._setPendingProperty(this.indexAs, instIdx);
      inst._setPendingProperty(this.itemsIndexAs, itemIdx);
      inst._flushProperties();
    } else {
      inst = this.__stampInstance(item, instIdx, itemIdx);
    }
    let beforeRow = this.__instances[instIdx + 1];
    let beforeNode = beforeRow ? beforeRow.children[0] : this;
    this.parentNode.insertBefore(inst.root, beforeNode);
    this.__instances[instIdx] = inst;
    return inst;
  }

  // Implements extension point from Templatize mixin
  _showHideChildren(hidden) {
    for (let i = 0; i < this.__instances.length; i++) {
      this.__instances[i]._showHideChildren(hidden);
    }
  }

  // Called as a side effect of a host items.<key>.<path> path change,
  // responsible for notifying item.<path> changes to inst for key
  __handleItemPath(path, value) {
    let itemsPath = path.slice(6); // 'items.'.length == 6
    let dot = itemsPath.indexOf('.');
    let itemsIdx = dot < 0 ? itemsPath : itemsPath.substring(0, dot);
    // If path was index into array...
    if (itemsIdx == parseInt(itemsIdx, 10)) {
      let itemSubPath = dot < 0 ? '' : itemsPath.substring(dot + 1);
      // If the path is observed, it will trigger a full refresh
      this.__handleObservedPaths(itemSubPath);
      // Note, even if a rull refresh is triggered, always do the path
      // notification because unless mutableData is used for dom-repeat
      // and all elements in the instance subtree, a full refresh may
      // not trigger the proper update.
      let instIdx = this.__itemsIdxToInstIdx[itemsIdx];
      let inst = this.__instances[instIdx];
      if (inst) {
        let itemPath = this.as + (itemSubPath ? '.' + itemSubPath : '');
        // This is effectively `notifyPath`, but avoids some of the overhead
        // of the public API
        inst._setPendingPropertyOrPath(itemPath, value, false, true);
        inst._flushProperties();
      }
      return true;
    }
  }

  /**
   * Returns the item associated with a given element stamped by
   * this `dom-repeat`.
   *
   * Note, to modify sub-properties of the item,
   * `modelForElement(el).set('item.<sub-prop>', value)`
   * should be used.
   *
   * @param {HTMLElement} el Element for which to return the item.
   * @return {*} Item associated with the element.
   */
  itemForElement(el) {
    let instance = this.modelForElement(el);
    return instance && instance[this.as];
  }

  /**
   * Returns the inst index for a given element stamped by this `dom-repeat`.
   * If `sort` is provided, the index will reflect the sorted order (rather
   * than the original array order).
   *
   * @param {HTMLElement} el Element for which to return the index.
   * @return {*} Row index associated with the element (note this may
   *   not correspond to the array index if a user `sort` is applied).
   */
  indexForElement(el) {
    let instance = this.modelForElement(el);
    return instance && instance[this.indexAs];
  }

  /**
   * Returns the template "model" associated with a given element, which
   * serves as the binding scope for the template instance the element is
   * contained in. A template model is an instance of `Polymer.Base`, and
   * should be used to manipulate data associated with this template instance.
   *
   * Example:
   *
   *   let model = modelForElement(el);
   *   if (model.index < 10) {
   *     model.set('item.checked', true);
   *   }
   *
   * @param {HTMLElement} el Element for which to return a template model.
   * @return {TemplateInstanceBase} Model representing the binding scope for
   *   the element.
   */
  modelForElement(el) {
    return __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__["b" /* Templatize */].modelForElement(this.template, el);
  }

}

customElements.define(DomRepeat.is, DomRepeat);



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Templatize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateInstanceBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_property_effects_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_mutable_data_js__ = __webpack_require__(20);




// Base class for HTMLTemplateElement extension that has property effects
// machinery for propagating host properties to children. This is an ES5
// class only because Babel (incorrectly) requires super() in the class
// constructor even though no `this` is used and it returns an instance.
let newInstance = null;
/**
 * @constructor
 * @extends {HTMLTemplateElement}
 */
function HTMLTemplateElementExtension() {
  return newInstance;
}
HTMLTemplateElementExtension.prototype = Object.create(HTMLTemplateElement.prototype, {
  constructor: {
    value: HTMLTemplateElementExtension,
    writable: true
  }
});
/**
 * @constructor
 * @implements {Polymer_PropertyEffects}
 * @extends {HTMLTemplateElementExtension}
 */
const DataTemplate = Object(__WEBPACK_IMPORTED_MODULE_1__mixins_property_effects_js__["a" /* PropertyEffects */])(HTMLTemplateElementExtension);
/**
 * @constructor
 * @implements {Polymer_MutableData}
 * @extends {DataTemplate}
 */
const MutableDataTemplate = Object(__WEBPACK_IMPORTED_MODULE_2__mixins_mutable_data_js__["a" /* MutableData */])(DataTemplate);

// Applies a DataTemplate subclass to a <template> instance
function upgradeTemplate(template, constructor) {
  newInstance = template;
  Object.setPrototypeOf(template, constructor.prototype);
  new constructor();
  newInstance = null;
}

// Base class for TemplateInstance's
/**
 * @constructor
 * @implements {Polymer_PropertyEffects}
 */
const base = Object(__WEBPACK_IMPORTED_MODULE_1__mixins_property_effects_js__["a" /* PropertyEffects */])(class {});

/**
 * @polymer
 * @customElement
 * @appliesMixin Polymer.PropertyEffects
 * @unrestricted
 */
class TemplateInstanceBase extends base {
  constructor(props) {
    super();
    this._configureProperties(props);
    this.root = this._stampTemplate(this.__dataHost);
    // Save list of stamped children
    let children = this.children = [];
    for (let n = this.root.firstChild; n; n = n.nextSibling) {
      children.push(n);
      n.__templatizeInstance = this;
    }
    if (this.__templatizeOwner.__hideTemplateChildren__) {
      this._showHideChildren(true);
    }
    // Flush props only when props are passed if instance props exist
    // or when there isn't instance props.
    let options = this.__templatizeOptions;
    if (props && options.instanceProps || !options.instanceProps) {
      this._enableProperties();
    }
  }
  /**
   * Configure the given `props` by calling `_setPendingProperty`. Also
   * sets any properties stored in `__hostProps`.
   * @private
   * @param {Object} props Object of property name-value pairs to set.
   */
  _configureProperties(props) {
    let options = this.__templatizeOptions;
    if (props) {
      for (let iprop in options.instanceProps) {
        if (iprop in props) {
          this._setPendingProperty(iprop, props[iprop]);
        }
      }
    }
    for (let hprop in this.__hostProps) {
      this._setPendingProperty(hprop, this.__dataHost['_host_' + hprop]);
    }
  }
  /**
   * Forwards a host property to this instance.  This method should be
   * called on instances from the `options.forwardHostProp` callback
   * to propagate changes of host properties to each instance.
   *
   * Note this method enqueues the change, which are flushed as a batch.
   *
   * @param {string} prop Property or path name
   * @param {*} value Value of the property to forward
   */
  forwardHostProp(prop, value) {
    if (this._setPendingPropertyOrPath(prop, value, false, true)) {
      this.__dataHost._enqueueClient(this);
    }
  }
  /**
   * @override
   */
  _addEventListenerToNode(node, eventName, handler) {
    if (this._methodHost && this.__templatizeOptions.parentModel) {
      // If this instance should be considered a parent model, decorate
      // events this template instance as `model`
      this._methodHost._addEventListenerToNode(node, eventName, e => {
        e.model = this;
        handler(e);
      });
    } else {
      // Otherwise delegate to the template's host (which could be)
      // another template instance
      let templateHost = this.__dataHost.__dataHost;
      if (templateHost) {
        templateHost._addEventListenerToNode(node, eventName, handler);
      }
    }
  }
  /**
   * Shows or hides the template instance top level child elements. For
   * text nodes, `textContent` is removed while "hidden" and replaced when
   * "shown."
   * @param {boolean} hide Set to true to hide the children;
   * set to false to show them.
   * @protected
   */
  _showHideChildren(hide) {
    let c = this.children;
    for (let i = 0; i < c.length; i++) {
      let n = c[i];
      // Ignore non-changes
      if (Boolean(hide) != Boolean(n.__hideTemplateChildren__)) {
        if (n.nodeType === Node.TEXT_NODE) {
          if (hide) {
            n.__polymerTextContent__ = n.textContent;
            n.textContent = '';
          } else {
            n.textContent = n.__polymerTextContent__;
          }
        } else if (n.style) {
          if (hide) {
            n.__polymerDisplay__ = n.style.display;
            n.style.display = 'none';
          } else {
            n.style.display = n.__polymerDisplay__;
          }
        }
      }
      n.__hideTemplateChildren__ = hide;
      if (n._showHideChildren) {
        n._showHideChildren(hide);
      }
    }
  }
  /**
   * Overrides default property-effects implementation to intercept
   * textContent bindings while children are "hidden" and cache in
   * private storage for later retrieval.
   *
   * @override
   */
  _setUnmanagedPropertyToNode(node, prop, value) {
    if (node.__hideTemplateChildren__ && node.nodeType == Node.TEXT_NODE && prop == 'textContent') {
      node.__polymerTextContent__ = value;
    } else {
      super._setUnmanagedPropertyToNode(node, prop, value);
    }
  }
  /**
   * Find the parent model of this template instance.  The parent model
   * is either another templatize instance that had option `parentModel: true`,
   * or else the host element.
   *
   * @return {Polymer_PropertyEffects} The parent model of this instance
   */
  get parentModel() {
    let model = this.__parentModel;
    if (!model) {
      let options;
      model = this;
      do {
        // A template instance's `__dataHost` is a <template>
        // `model.__dataHost.__dataHost` is the template's host
        model = model.__dataHost.__dataHost;
      } while ((options = model.__templatizeOptions) && !options.parentModel);
      this.__parentModel = model;
    }
    return model;
  }
}

/** @type {!DataTemplate} */
TemplateInstanceBase.prototype.__dataHost;
/** @type {!TemplatizeOptions} */
TemplateInstanceBase.prototype.__templatizeOptions;
/** @type {!Polymer_PropertyEffects} */
TemplateInstanceBase.prototype._methodHost;
/** @type {!Object} */
TemplateInstanceBase.prototype.__templatizeOwner;
/** @type {!Object} */
TemplateInstanceBase.prototype.__hostProps;

/**
 * @constructor
 * @extends {TemplateInstanceBase}
 * @implements {Polymer_MutableData}
 */
const MutableTemplateInstanceBase = Object(__WEBPACK_IMPORTED_MODULE_2__mixins_mutable_data_js__["a" /* MutableData */])(TemplateInstanceBase);

function findMethodHost(template) {
  // Technically this should be the owner of the outermost template.
  // In shadow dom, this is always getRootNode().host, but we can
  // approximate this via cooperation with our dataHost always setting
  // `_methodHost` as long as there were bindings (or id's) on this
  // instance causing it to get a dataHost.
  let templateHost = template.__dataHost;
  return templateHost && templateHost._methodHost || templateHost;
}

/* eslint-disable valid-jsdoc */
/**
 * @suppress {missingProperties} class.prototype is not defined for some reason
 */
function createTemplatizerClass(template, templateInfo, options) {
  // Anonymous class created by the templatize
  let base = options.mutableData ? MutableTemplateInstanceBase : TemplateInstanceBase;
  /**
   * @constructor
   * @extends {base}
   */
  let klass = class extends base {};
  klass.prototype.__templatizeOptions = options;
  klass.prototype._bindTemplate(template);
  addNotifyEffects(klass, template, templateInfo, options);
  return klass;
}

/**
 * @suppress {missingProperties} class.prototype is not defined for some reason
 */
function addPropagateEffects(template, templateInfo, options) {
  let userForwardHostProp = options.forwardHostProp;
  if (userForwardHostProp) {
    // Provide data API and property effects on memoized template class
    let klass = templateInfo.templatizeTemplateClass;
    if (!klass) {
      let base = options.mutableData ? MutableDataTemplate : DataTemplate;
      klass = templateInfo.templatizeTemplateClass = class TemplatizedTemplate extends base {};
      // Add template - >instances effects
      // and host <- template effects
      let hostProps = templateInfo.hostProps;
      for (let prop in hostProps) {
        klass.prototype._addPropertyEffect('_host_' + prop, klass.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE, { fn: createForwardHostPropEffect(prop, userForwardHostProp) });
        klass.prototype._createNotifyingProperty('_host_' + prop);
      }
    }
    upgradeTemplate(template, klass);
    // Mix any pre-bound data into __data; no need to flush this to
    // instances since they pull from the template at instance-time
    if (template.__dataProto) {
      // Note, generally `__dataProto` could be chained, but it's guaranteed
      // to not be since this is a vanilla template we just added effects to
      Object.assign(template.__data, template.__dataProto);
    }
    // Clear any pending data for performance
    template.__dataTemp = {};
    template.__dataPending = null;
    template.__dataOld = null;
    template._enableProperties();
  }
}
/* eslint-enable valid-jsdoc */

function createForwardHostPropEffect(hostProp, userForwardHostProp) {
  return function forwardHostProp(template, prop, props) {
    userForwardHostProp.call(template.__templatizeOwner, prop.substring('_host_'.length), props[prop]);
  };
}

function addNotifyEffects(klass, template, templateInfo, options) {
  let hostProps = templateInfo.hostProps || {};
  for (let iprop in options.instanceProps) {
    delete hostProps[iprop];
    let userNotifyInstanceProp = options.notifyInstanceProp;
    if (userNotifyInstanceProp) {
      klass.prototype._addPropertyEffect(iprop, klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, { fn: createNotifyInstancePropEffect(iprop, userNotifyInstanceProp) });
    }
  }
  if (options.forwardHostProp && template.__dataHost) {
    for (let hprop in hostProps) {
      klass.prototype._addPropertyEffect(hprop, klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, { fn: createNotifyHostPropEffect() });
    }
  }
}

function createNotifyInstancePropEffect(instProp, userNotifyInstanceProp) {
  return function notifyInstanceProp(inst, prop, props) {
    userNotifyInstanceProp.call(inst.__templatizeOwner, inst, prop, props[prop]);
  };
}

function createNotifyHostPropEffect() {
  return function notifyHostProp(inst, prop, props) {
    inst.__dataHost._setPendingPropertyOrPath('_host_' + prop, props[prop], true, true);
  };
}

/**
 * Module for preparing and stamping instances of templates that utilize
 * Polymer's data-binding and declarative event listener features.
 *
 * Example:
 *
 *     // Get a template from somewhere, e.g. light DOM
 *     let template = this.querySelector('template');
 *     // Prepare the template
 *     let TemplateClass = Polymer.Templatize.templatize(template);
 *     // Instance the template with an initial data model
 *     let instance = new TemplateClass({myProp: 'initial'});
 *     // Insert the instance's DOM somewhere, e.g. element's shadow DOM
 *     this.shadowRoot.appendChild(instance.root);
 *     // Changing a property on the instance will propagate to bindings
 *     // in the template
 *     instance.myProp = 'new value';
 *
 * The `options` dictionary passed to `templatize` allows for customizing
 * features of the generated template class, including how outer-scope host
 * properties should be forwarded into template instances, how any instance
 * properties added into the template's scope should be notified out to
 * the host, and whether the instance should be decorated as a "parent model"
 * of any event handlers.
 *
 *     // Customze property forwarding and event model decoration
 *     let TemplateClass = Polymer.Templatize.templatize(template, this, {
 *       parentModel: true,
 *       instanceProps: {...},
 *       forwardHostProp(property, value) {...},
 *       notifyInstanceProp(instance, property, value) {...},
 *     });
 *
 *
 * @namespace
 * @memberof Polymer
 * @summary Module for preparing and stamping instances of templates
 *   utilizing Polymer templating features.
 */

const Templatize = {

  /**
   * Returns an anonymous `Polymer.PropertyEffects` class bound to the
   * `<template>` provided.  Instancing the class will result in the
   * template being stamped into document fragment stored as the instance's
   * `root` property, after which it can be appended to the DOM.
   *
   * Templates may utilize all Polymer data-binding features as well as
   * declarative event listeners.  Event listeners and inline computing
   * functions in the template will be called on the host of the template.
   *
   * The constructor returned takes a single argument dictionary of initial
   * property values to propagate into template bindings.  Additionally
   * host properties can be forwarded in, and instance properties can be
   * notified out by providing optional callbacks in the `options` dictionary.
   *
   * Valid configuration in `options` are as follows:
   *
   * - `forwardHostProp(property, value)`: Called when a property referenced
   *   in the template changed on the template's host. As this library does
   *   not retain references to templates instanced by the user, it is the
   *   templatize owner's responsibility to forward host property changes into
   *   user-stamped instances.  The `instance.forwardHostProp(property, value)`
   *    method on the generated class should be called to forward host
   *   properties into the template to prevent unnecessary property-changed
   *   notifications. Any properties referenced in the template that are not
   *   defined in `instanceProps` will be notified up to the template's host
   *   automatically.
   * - `instanceProps`: Dictionary of property names that will be added
   *   to the instance by the templatize owner.  These properties shadow any
   *   host properties, and changes within the template to these properties
   *   will result in `notifyInstanceProp` being called.
   * - `mutableData`: When `true`, the generated class will skip strict
   *   dirty-checking for objects and arrays (always consider them to be
   *   "dirty").
   * - `notifyInstanceProp(instance, property, value)`: Called when
   *   an instance property changes.  Users may choose to call `notifyPath`
   *   on e.g. the owner to notify the change.
   * - `parentModel`: When `true`, events handled by declarative event listeners
   *   (`on-event="handler"`) will be decorated with a `model` property pointing
   *   to the template instance that stamped it.  It will also be returned
   *   from `instance.parentModel` in cases where template instance nesting
   *   causes an inner model to shadow an outer model.
   *
   * Note that the class returned from `templatize` is generated only once
   * for a given `<template>` using `options` from the first call for that
   * template, and the cached class is returned for all subsequent calls to
   * `templatize` for that template.  As such, `options` callbacks should not
   * close over owner-specific properties since only the first `options` is
   * used; rather, callbacks are called bound to the `owner`, and so context
   * needed from the callbacks (such as references to `instances` stamped)
   * should be stored on the `owner` such that they can be retrieved via `this`.
   *
   * @memberof Polymer.Templatize
   * @param {!HTMLTemplateElement} template Template to templatize
   * @param {!Polymer_PropertyEffects} owner Owner of the template instances;
   *   any optional callbacks will be bound to this owner.
   * @param {Object=} options Options dictionary (see summary for details)
   * @return {function(new:TemplateInstanceBase)} Generated class bound to the template
   *   provided
   * @suppress {invalidCasts}
   */
  templatize(template, owner, options) {
    options = /** @type {!TemplatizeOptions} */options || {};
    if (template.__templatizeOwner) {
      throw new Error('A <template> can only be templatized once');
    }
    template.__templatizeOwner = owner;
    let templateInfo = owner.constructor._parseTemplate(template);
    // Get memoized base class for the prototypical template, which
    // includes property effects for binding template & forwarding
    let baseClass = templateInfo.templatizeInstanceClass;
    if (!baseClass) {
      baseClass = createTemplatizerClass(template, templateInfo, options);
      templateInfo.templatizeInstanceClass = baseClass;
    }
    // Host property forwarding must be installed onto template instance
    addPropagateEffects(template, templateInfo, options);
    // Subclass base class and add reference for this specific template
    let klass = class TemplateInstance extends baseClass {};
    klass.prototype._methodHost = findMethodHost(template);
    klass.prototype.__dataHost = template;
    klass.prototype.__templatizeOwner = owner;
    klass.prototype.__hostProps = templateInfo.hostProps;
    return (/** @type {function(new:TemplateInstanceBase)} */klass
    );
  },

  /**
   * Returns the template "model" associated with a given element, which
   * serves as the binding scope for the template instance the element is
   * contained in. A template model is an instance of
   * `TemplateInstanceBase`, and should be used to manipulate data
   * associated with this template instance.
   *
   * Example:
   *
   *   let model = modelForElement(el);
   *   if (model.index < 10) {
   *     model.set('item.checked', true);
   *   }
   *
   * @memberof Polymer.Templatize
   * @param {HTMLTemplateElement} template The model will be returned for
   *   elements stamped from this template
   * @param {Node} node Node for which to return a template model.
   * @return {TemplateInstanceBase} Template instance representing the
   *   binding scope for the element
   */
  modelForElement(template, node) {
    let model;
    while (node) {
      // An element with a __templatizeInstance marks the top boundary
      // of a scope; walk up until we find one, and then ensure that
      // its __dataHost matches `this`, meaning this dom-repeat stamped it
      if (model = node.__templatizeInstance) {
        // Found an element stamped by another template; keep walking up
        // from its __dataHost
        if (model.__dataHost != template) {
          node = model.__dataHost;
        } else {
          return model;
        }
      } else {
        // Still in a template scope, keep going up until
        // a __templatizeInstance is found
        node = node.parentNode;
      }
    }
    return null;
  }
};




/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Debouncer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixin_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__async_js__ = __webpack_require__(15);




/** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */
let AsyncModule; // eslint-disable-line no-unused-vars

/**
 * @summary Collapse multiple callbacks into one invocation after a timer.
 * @memberof Polymer
 */
class Debouncer {
  constructor() {
    this._asyncModule = null;
    this._callback = null;
    this._timer = null;
  }
  /**
   * Sets the scheduler; that is, a module with the Async interface,
   * a callback and optional arguments to be passed to the run function
   * from the async module.
   *
   * @param {!AsyncModule} asyncModule Object with Async interface.
   * @param {function()} callback Callback to run.
   */
  setConfig(asyncModule, callback) {
    this._asyncModule = asyncModule;
    this._callback = callback;
    this._timer = this._asyncModule.run(() => {
      this._timer = null;
      this._callback();
    });
  }
  /**
   * Cancels an active debouncer and returns a reference to itself.
   */
  cancel() {
    if (this.isActive()) {
      this._asyncModule.cancel(this._timer);
      this._timer = null;
    }
  }
  /**
   * Flushes an active debouncer and returns a reference to itself.
   */
  flush() {
    if (this.isActive()) {
      this.cancel();
      this._callback();
    }
  }
  /**
   * Returns true if the debouncer is active.
   *
   * @return {boolean} True if active.
   */
  isActive() {
    return this._timer != null;
  }
  /**
   * Creates a debouncer if no debouncer is passed as a parameter
   * or it cancels an active debouncer otherwise. The following
   * example shows how a debouncer can be called multiple times within a
   * microtask and "debounced" such that the provided callback function is
   * called once. Add this method to a custom element:
   *
   * _debounceWork() {
   *   this._debounceJob = Polymer.Debouncer.debounce(this._debounceJob,
   *       Polymer.Async.microTask, () => {
   *     this._doWork();
   *   });
   * }
   *
   * If the `_debounceWork` method is called multiple times within the same
   * microtask, the `_doWork` function will be called only once at the next
   * microtask checkpoint.
   *
   * Note: In testing it is often convenient to avoid asynchrony. To accomplish
   * this with a debouncer, you can use `Polymer.enqueueDebouncer` and
   * `Polymer.flush`. For example, extend the above example by adding
   * `Polymer.enqueueDebouncer(this._debounceJob)` at the end of the
   * `_debounceWork` method. Then in a test, call `Polymer.flush` to ensure
   * the debouncer has completed.
   *
   * @param {Debouncer?} debouncer Debouncer object.
   * @param {!AsyncModule} asyncModule Object with Async interface
   * @param {function()} callback Callback to run.
   * @return {!Debouncer} Returns a debouncer object.
   */
  static debounce(debouncer, asyncModule, callback) {
    if (debouncer instanceof Debouncer) {
      debouncer.cancel();
    } else {
      debouncer = new Debouncer();
    }
    debouncer.setConfig(asyncModule, callback);
    return debouncer;
  }
}



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


let debouncerQueue = [];

const enqueueDebouncer = function (debouncer) {
  debouncerQueue.push(debouncer);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = enqueueDebouncer;


function flushDebouncers() {
  const didFlush = Boolean(debouncerQueue.length);
  while (debouncerQueue.length) {
    try {
      debouncerQueue.shift().flush();
    } catch (e) {
      setTimeout(() => {
        throw e;
      });
    }
  }
  return didFlush;
}

const flush = function () {
  let shadyDOM, debouncers;
  do {
    shadyDOM = window.ShadyDOM && ShadyDOM.flush();
    if (window.ShadyCSS && window.ShadyCSS.ScopingShim) {
      window.ShadyCSS.ScopingShim.flush();
    }
    debouncers = flushDebouncers();
  } while (shadyDOM || debouncers);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = flush;


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map