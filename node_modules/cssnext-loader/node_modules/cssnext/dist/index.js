"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _caniuseApi = require("caniuse-api");

var _fixes = require("./fixes");

var _fixes2 = _interopRequireDefault(_fixes);

var _features = require("./features");

var _features2 = _interopRequireDefault(_features);

var _featuresActivationMap = require("./features-activation-map");

var _featuresActivationMap2 = _interopRequireDefault(_featuresActivationMap);

var _optionMessages = require("./option.messages");

var _optionMessages2 = _interopRequireDefault(_optionMessages);

/**
 * Process a CSS `string`
 *
 * @param {String} string (optional)
 * @param {Object} options (optional)
 * @return {String} if string is given, or {Object} (postcss instance)
 */
function cssnext(string, options) {
  // prevent usage as a webpack loader
  // webpack run loader as function with an object as context
  // this object contains a "webpack" key set to true if used as a loader
  // https://github.com/cssnext/cssnext/issues/61
  if (typeof this === "object" && this.webpack === true) {
    throw new Error("⚠︎ Don't use directly cssnext as a webpack loader. " + "Please use `cssnext-loader` instead: " + "https://github.com/cssnext/cssnext-loader");
  }

  if (arguments.length === 0) {
    options = {};
  }
  if (arguments.length === 1 && typeof string === "object") {
    options = string;
    string = undefined;
  } else {
    options = options || {};
  }

  options = _extends({
    features: {},
    // options.browsers is deliberately undefined by defaut to inherit
    // browserslist default behavior
    // default sourcemap
    // if `map` option is passed, `sourcemap` option is ignored
    // if `sourcemap` option is passed, a inline map is used
    map: options.sourcemap ? true : null,
    messages: true
  }, options);

  var features = options.features;

  // propagate browsers option to autoprefixer
  if (features.autoprefixer !== false) {
    features.autoprefixer = _extends({
      browsers: features.autoprefixer && features.autoprefixer.browsers ? features.autoprefixer.browsers : options.browsers
    }, features.autoprefixer || {});

    // autoprefixer doesn't like an "undefined" value. Related to coffee ?
    if (features.autoprefixer.browsers === undefined) {
      delete features.autoprefixer.browsers;
    }
  }

  var postcss = (0, _postcss2["default"])();

  // only enable import & url if fs module is available
  if (_fs2["default"] && _fs2["default"].readFile) {
    // @import
    if (options["import"] !== false) {
      var plugin = require("postcss-import")(typeof options["import"] === "object" ? _extends({}, options["import"]) : undefined);
      postcss.use(plugin);
    }

    // url() adjustements
    if (options.url !== false) {
      var plugin = require("postcss-url")(typeof options.url === "object" ? _extends({}, options.url) : undefined);
      postcss.use(plugin);
    }
  }

  // tmp fixes
  Object.keys(_fixes2["default"]).forEach(function (key) {
    return postcss.use(_fixes2["default"][key]);
  });

  // features
  Object.keys(cssnext.features).forEach(function (key) {
    // feature is auto enabled if: not disable && (enabled || no data yet ||
    // !supported yet)
    if (
    // feature is not disabled
    features[key] !== false && (
    // feature is enabled
    features[key] === true ||

    // feature don't have any browsers data (yet)
    _featuresActivationMap2["default"][key] === undefined ||

    // feature is not yet supported by the browsers scope
    _featuresActivationMap2["default"][key] && _featuresActivationMap2["default"][key][0] && !(0, _caniuseApi.isSupported)(_featuresActivationMap2["default"][key][0], options.browsers))) {
      var plugin = cssnext.features[key](typeof features[key] === "object" ? _extends({}, features[key]) : undefined);
      postcss.use(plugin);
    }
  });

  if (options.plugins) {
    if (!Array.isArray(options.plugins)) {
      throw new Error("cssnext 'plugins' option expect an array of PostCSS plugins. " + "You provided " + typeof options.plugins);
    }

    options.plugins.forEach(function (plugin) {
      return postcss.use(plugin);
    });
  }

  // minification
  if (options.compress) {
    postcss.use(require("cssnano")(typeof options.compress === "object" ? options.compress : {}));
  }

  // console plugins MUST be called after others because
  // by default it remove messages from the registry
  // (which make sense)
  if (options.messages) {
    (0, _optionMessages2["default"])(options).forEach(function (plugin) {
      postcss.use(plugin);
    });
  }

  // classic API if string is passed
  if (typeof string === "string") {
    var result = postcss.process(string, options);

    // default behavior, cssnext returns a css string if no or inline sourcemap
    if (options.map === null || (options.map === true || options.map.inline)) {
      return result.css;
    }

    // if a specific map has been asked, we are returning css + map
    return result;
  }
  // or return the postcss instance that can be consumed as a postcss plugin
  else {
      return postcss;
    }
}

/**
 * Expose cssnext features
 *
 * @type {Object}
 */
cssnext.features = _features2["default"];

/**
 * Expose cssnext
 *
 * @type {Function}
 */
module.exports = cssnext;