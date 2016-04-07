"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

exports["default"] = _postcss2["default"].plugin("cssnext", function () {
  var cs = "@custom-selector";

  return function (styles, result) {
    var alert = false;
    styles.eachAtRule("custom-selector", function (rule) {
      if (rule.params.indexOf("--") === 0) {

        // display big warning once
        if (!alert) {
          alert = true;
          result.warn("Previously " + cs + " were working with and without pseudo " + ("syntax ':'. Now you must use '" + cs + " :--{name}' syntax ") + ("instead of '" + cs + " --{name}'. The support of ") + "syntax without ':' and this warning will be remove in the " + "next major release.");
        }

        result.warn(["Incorrect syntax for " + cs + ".", "  " + cs + " " + rule.params, "Should be:", "  " + cs + " :" + rule.params].join("\n\n"), { node: rule });

        // fix for postcss-custom-selectors 2.x
        rule.params = ":" + rule.params;
      }
    });
  };
});
module.exports = exports["default"];