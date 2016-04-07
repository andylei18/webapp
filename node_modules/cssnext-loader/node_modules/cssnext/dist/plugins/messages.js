// why this plugin ?
// https://github.com/postcss/postcss-messages/issues/16

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

// http://www.w3.org/TR/CSS2/syndata.html#characters
// tl;dr: escape as utf-16 all non ascii chars + new lines & quotes
function escapeForCSS(string) {
  var newString = "";
  for (var i = 0; i < string.length; i++) {
    var ch = string.charAt(i);
    switch (ch) {
      case "\n":
      case "\r":
        newString += "\\A ";
        break;

      case "\\":
      case "\'":
      case "\"":
        newString += "\\" + ch;
        break;

      default:
        // non ascii
        if (!ch.match(/^[\x00-\x7F]*$/)) {
          var hexCh = string.charCodeAt(i).toString(16);
          while (hexCh.length < 4) {
            hexCh = "0" + hexCh;
          }
          // space at the end is required
          newString += "\\" + hexCh + " ";
          continue;
        }
        newString += string[i];
    }
  }

  return newString;
}

exports["default"] = _postcss2["default"].plugin("postcss-messages", function (options) {
  options = _extends({}, options);

  if (options.disabled) {
    return function () {};
  }

  var defaultStyles = {
    // ...
  };
  var styles = options.styles ? options.styles : defaultStyles;

  return function (css, result) {
    var messages = result.warnings();
    if (messages.length === 0) {
      return;
    }

    var selector = "html::before";
    if (options.selector) {
      selector = options.selector;
    } else {
      css.eachRule(function (rule) {
        if (rule.selector === "html::before" || rule.selector === "html:before") {
          selector = "html::after";
        }
      });
    }

    css.append({ selector: selector });
    Object.keys(styles).forEach(function (key) {
      css.last.append({
        prop: key,
        value: styles[key]
      });
    });

    var bullet = "›";
    var content = messages.map(function (message) {
      return message.toString();
    }).join("\n\n\n" + bullet + " ");

    css.last.append({
      prop: "content",
      value: "\"" + escapeForCSS(bullet + " " + _chalk2["default"].stripColor(content)) + "\""
    });
  };
});
module.exports = exports["default"];