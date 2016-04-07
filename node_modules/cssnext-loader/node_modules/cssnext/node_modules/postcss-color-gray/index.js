/*!
 * postcss-color-gray | MIT (c) Shinnosuke Watanabe
 * https://github.com/postcss/postcss-color-gray
*/

'use strict';

var color = require('color');
var helpers = require('postcss-message-helpers');
var reduceFunctionCall = require('reduce-function-call');

function parseGray(value) {
  return reduceFunctionCall(value, 'gray', function(argString) {
    var args = argString.split(',');

    var rgb = args[0] + ',' + args[0] + ',' + args[0];
    var alpha = args[1];
    if (alpha) {
      alpha = alpha.trim();
      var match = alpha.match(/^[0-9](\d|\.)+?%$/);
      if (match && match[0] === alpha) {
        alpha = parseFloat(alpha) * 0.01;
      }
    }

    var parsedColor;

    try {
      if (alpha === undefined) {
        parsedColor = color('rgb' + '(' + rgb + ')');
      } else {
        parsedColor = color('rgba' + '(' + rgb + ',' + alpha + ')');
      }
      return parsedColor.rgbString();

    } catch (e) {
      e.message = e.message.replace(/rgba?\(.*\)/, 'gray(' + args + ')');
      throw e;
    }
  });
}

function transformDecl(decl) {
  if (decl.value && decl.value.indexOf('gray(') !== -1) {
    decl.value = helpers.try(function transformGrayValue() {
      return parseGray(decl.value);
    }, decl.source);
  }
}

module.exports = function pluginColorGray() {
  return function(style) {
    style.eachDecl(transformDecl);
  };
};
