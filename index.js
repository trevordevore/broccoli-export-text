'use strict';

var jsesc = require('jsesc');
var Filter = require('broccoli-filter');

function BrocText (inputTree, options) {
  if (!(this instanceof BrocText)) { return new BrocText(inputTree, options); }
  
  options = options || {};
  this.jsescOptions = options.jsesc || {};
  this.jsescOptions.quotes = this.jsescOptions.quotes || 'single';
  this.jsescOptions.wrap = this.jsescOptions.wrap || 'wrap';
  
  if (options.extensions) {
    options.extensions = [].concat(options.extensions);
  } else {
    console.log('No "extensions" option defined for Broccoli Text. Defaulting to "txt" extensions.');
    options.extensions = ['txt'];
  }
  
  Filter.call(this, inputTree, options);
}

BrocText.prototype = Object.create(Filter.prototype);

BrocText.prototype.constructor = BrocText;

BrocText.prototype.targetExtension = 'js';
  
BrocText.prototype.processString = function (string) {
  var escapedfileContents = jsesc(string, this.jsescOptions);
  return 'export default ' + escapedfileContents + ';';
};

module.exports = BrocText;