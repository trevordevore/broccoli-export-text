# Broccoli Export Text
Broccoli Export Text is a plugin that converts any files of a specified type
into JavaScript files with ES6 module syntax and exports the original file's
contents as a string.  This can be helpful when JavaScript in the browser
needs to manipulate the contents of a large string stored in a separate file,
such as `.html`, `.txt`, or `.whatever` files.

## Install

```sh
$ npm install --save-dev broccoli-export-text
```

## Usage
Given the following directory structure:
```shell
├── Brocfile.js
└── app/
    ├── index.html
    ├── app.js
    ├── foo.bar
    └── baz.bar
```
...to convert the `.bar` files into `.js` files that export the original file's
contents as a string, in your `Brocfile.js` file add:
```js
var exportText = require('broccoli-export-text');
tree = exportText(tree, {
  extensions: 'bar'
});
```

Now the tree will be modified accordingly:
```shell
├── Brocfile.js
└── app/
    ├── index.html
    ├── app.js
    ├── foo.js  <-- previously foo.bar
    └── baz.js  <-- previously baz.bar
```

The new `foo.js` and `baz.js` files can be used as follows:
```js
// foo.bar (original)
this is foo.bar!

// foo.js
export default 'this is foo.bar!';

// app.js
import foo from './foo';
console.log(foo); // this is foo.bar!
```

#### Options

`extensions` *{String | Array of Strings}*

A string (or array of strings) with the extension(s) for the type of files
that should be converted to JavaScript files.

Default: `'txt'`.

`jsesc` *{Object}*

Any options to be passed to `jsesc`, a library for escaping JavaScript Strings.
Read more about the `jsesc` options at https://www.npmjs.com/package/jsesc.

Default: `{quotes: 'single', wrap: true }`

## License

This project is distributed under the MIT license.