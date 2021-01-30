'use strict';

var Plugin = require('broccoli-plugin');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var jsesc = require('jsesc');
var mkdirp = require('mkdirp');

module.exports = class BrocText extends Plugin {
  targetExtension = 'js';

  constructor(node, _options = {}) {
    super([node], {
      name: _options.name,
      annotation: _options.annotation,
      persistentOutput: true
    });

    let options = _options || {};

    this.options = options;
    this.jsescOptions = options.jsesc || {};
    this.jsescOptions.quotes = this.jsescOptions.quotes || 'single';
    this.jsescOptions.wrap = this.jsescOptions.wrap || 'wrap';

    if (options.extensions) {
      options.extensions = [].concat(options.extensions);
    } else {
      console.log('No "extensions" option defined for Broccoli Text. Defaulting to "txt" extensions.');
      options.extensions = ['txt'];
    }
  }

  build() {
    return new Promise((resolve, reject) => {
      glob("**/*."+this.options.extensions, {cwd: this.inputPaths[0]}, (err, files) => {

        if (err) { return reject(err); }

        files.forEach((file) => {
          var inputBuffer = fs.readFileSync(path.join(this.inputPaths[0], file)).toString('utf8');
          var out = jsesc(inputBuffer, this.jsescOptions);
          mkdirp.sync(path.dirname(path.join(this.outputPath, file)));
          fs.writeFileSync(path.join(this.outputPath, file).replace('.'+this.options.extensions, '.js'), 'export default ' + out + ';');
        });

        resolve()
      });
    });
  }
}
