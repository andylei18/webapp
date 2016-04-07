"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _postcssReporter = require("postcss-reporter");

var _postcssReporter2 = _interopRequireDefault(_postcssReporter);

// https://github.com/postcss/postcss-messages/issues/16
// import postcssMessagesCSS from "postcss-messages"

var _pluginsMessages = require("./plugins/messages");

var _pluginsMessages2 = _interopRequireDefault(_pluginsMessages);

var _optionMessagesBrowserStylesJs = require("./option.messages.browser.styles.js");

var _optionMessagesBrowserStylesJs2 = _interopRequireDefault(_optionMessagesBrowserStylesJs);

exports["default"] = function (options) {
  // true === all interfaces
  if (options.messages === true) {
    return [(0, _pluginsMessages2["default"])({ styles: _optionMessagesBrowserStylesJs2["default"] }), _postcssReporter2["default"]];
  }

  // object: only the one you want
  if (typeof options.messages === "object") {
    return [].concat(_toConsumableArray(options.messages.browser ? [(0, _pluginsMessages2["default"])(_extends({
      styles: _optionMessagesBrowserStylesJs2["default"]
    }, typeof options.messages.browser === "object" ? options.messages.browser : {}))] : []), _toConsumableArray(options.messages.console ? [(0, _postcssReporter2["default"])(_extends({}, typeof options.messages.console === "object" ? options.messages.console : {}))] : []));
  }

  // otherwise nothing :)
  return [];
};

module.exports = exports["default"];