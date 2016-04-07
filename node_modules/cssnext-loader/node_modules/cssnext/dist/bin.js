#!/usr/bin/env node
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

// until this land in a stable version of node (for a while)
// https://github.com/joyent/node/commit/20176a
// we will this instead of process.exit()

var _exit = require("exit");

var _exit2 = _interopRequireDefault(_exit);

var _mkdirp = require("mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _ = require("..");

var _2 = _interopRequireDefault(_);

var _package = require("../package");

var _package2 = _interopRequireDefault(_package);

_commander2["default"].version(_package2["default"].version).usage("[options] [<input> [<output>]]").option("-C, --config <file>", "use the config file").option("-b, --browsers <items>", "browsers list (comma separated)").option("-I, --no-import", "do not inline @import").option("-U, --no-url", "do not adjust url()").option("-c, --compress", "compress output").option("-s, --sourcemap", "add sourcemap").option("-w, --watch", "watch the input file for changes").option("-v, --verbose", "verbose output");

// register features as flag
var format = require("util").format;
var toSlug = require("to-slug-case");
var toSpace = require("to-space-case");
Object.keys(_2["default"].features).forEach(function (feature) {
  var flag = format("--no-%s", toSlug(feature));
  var desc = format("disable %s support", toSpace(feature));
  _commander2["default"].option(flag, desc);
});

/* eslint-disable no-multiple-empty-lines */
_commander2["default"].on("--help", function () {
  console.log((function () {/*
                            Examples:
                            # pass an input and output file
                            $ cssnext input.css output.css
                            # start cssnext watcher (need input & output)
                            $ cssnext --watch input.css output.css
                            # using stdin and stdout
                            $ cat input.css | cssnext > output.css
                            */
  }).toString().split("\n").slice(1, -2).join("\n"));
});
/* eslint-enable no-multiple-empty-lines */

_commander2["default"].parse(process.argv);

var config = _commander2["default"].config ? require(_path2["default"].resolve(_commander2["default"].config)) : {};
if (!config.features) {
  config.features = {};
}
// command line flags override config file
Object.keys(_2["default"].features).forEach(function (feature) {
  if (_commander2["default"][feature] === false) {
    config.features[feature] = false;
  }
});
if ("browsers" in _commander2["default"]) {
  config.browsers = _commander2["default"].browsers;
}
if ("import" in _commander2["default"]) {
  config["import"] = _commander2["default"]["import"];
}
if ("url" in _commander2["default"]) {
  config.url = _commander2["default"].url;
}
if ("sourcemap" in _commander2["default"]) {
  config.sourcemap = _commander2["default"].sourcemap;
}
if ("compress" in _commander2["default"]) {
  config.compress = _commander2["default"].compress;
}
if ("watch" in _commander2["default"]) {
  config.watch = _commander2["default"].watch;
}

var input = _commander2["default"].args[0] ? _path2["default"].resolve(_commander2["default"].args[0]) : null;
var output = _commander2["default"].args[1] ? _path2["default"].resolve(_commander2["default"].args[1]) : null;
var verbose = _commander2["default"].verbose;

if (input && !_fs2["default"].existsSync(input)) {
  console.error(_chalk2["default"].red("Unable to read file"), input);
  (0, _exit2["default"])(1);
}

config.from = input;
config.to = output;

if (output) {
  _mkdirp2["default"].sync(_path2["default"].dirname(output));
}

// init & adjust watcher with postcss-import dependencies
var watcher = undefined;
if (config.watch) {
  if (!input || !output) {
    console.error(_chalk2["default"].red("--watch option need both <input> & <output> files to work"));
    (0, _exit2["default"])(3);
  }

  watcher = require("chokidar").watch(input, { ignoreInitial: true });

  if (verbose) {
    log(_chalk2["default"].cyan("Watching"), input);
  }

  // https://github.com/paulmillr/chokidar/issues/288
  // ready event might not be triggered at all
  // watcher.on("ready", function() {
  //   if (verbose) {
  //     log(color.cyan("Watcher ready"), input)
  //   }
  // })

  watcher.on("change", transform);

  // watch `@import`ed files
  if (config["import"]) {
    (function () {
      // keep a up to date list of imported files
      var importedFiles = [input];
      var arrayDiff = function arrayDiff(array, array2) {
        return array.filter(function (i) {
          return array2.indexOf(i) < 0;
        });
      };

      var rebaseFile = function rebaseFile(file) {
        return _path2["default"].relative(process.cwd(), file);
      };

      var watcherOnImport = function watcherOnImport(imported) {
        var toUnwatch = arrayDiff(importedFiles, imported);
        var toWatch = arrayDiff(imported, importedFiles);
        toUnwatch.forEach(function (file) {
          watcher.unwatch(rebaseFile(file));
        });
        toWatch.forEach(function (file) {
          watcher.add(rebaseFile(file));
        });
        importedFiles = imported;
      };

      // import need an object so we can pass onImport() cb
      if (typeof config["import"] !== "object") {
        config["import"] = {};
      }

      // keep the existing onImport callback if any
      if (config["import"].onImport) {
        config["import"].onImport = function (files) {
          var originalOnImport = config["import"].onImport;
          watcherOnImport(files);
          originalOnImport(files);
        };
      }
      // or just add the watcher updater onImport() cb
      else {
          config["import"].onImport = watcherOnImport;
        }
    })();
  }
}

function transform() {
  require("read-file-stdin")(input, function (err, buffer) {
    if (err) {
      throw err;
    }

    try {
      var css = (0, _2["default"])(buffer.toString(), config);

      require("write-file-stdout")(output, css);
      if (verbose && output) {
        log(_chalk2["default"].cyan("Output written"), output);
      }
    } catch (e) {
      console.error();
      console.error(_chalk2["default"].bold("cssnext encounters an error:"));
      console.error();
      console.error(_chalk2["default"].red(e.message));
      if (e.stack) {
        console.error(e.stack.split("\n").slice(1).join("\n").grey);
        console.error();
      }
      console.error("If this error looks like a bug, please report it here:");
      console.error(_chalk2["default"].grey("❯ ") + _chalk2["default"].cyan(_package2["default"].bugs.url));
      console.error();
      if (!config.watch) {
        (0, _exit2["default"])(2);
      }
    }
  });
}

transform();

/**
 * log content prefixed by time
 *
 * @return {String} output all given parameters prefixed by the current locale
 * time
 */
function log() {
  var args = [].slice.call(arguments);
  args.unshift("[" + _chalk2["default"].grey(new Date().toLocaleTimeString()) + "]");
  console.log.apply(console.log, args);
}