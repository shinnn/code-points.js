# code-points.js

[![Build Status](https://travis-ci.org/shinnn/code-points.js.svg?branch=master)](https://travis-ci.org/shinnn/code-points.js)
[![Build status](https://ci.appveyor.com/api/projects/status/rojbdyosyc3055ct?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/code-points-js)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/code-points.js.svg)](https://coveralls.io/r/shinnn/code-points.js)
[![Dependency Status](https://david-dm.org/shinnn/code-points.js.svg)](https://david-dm.org/shinnn/code-points.js)
[![devDependency Status](https://david-dm.org/shinnn/code-points.js/dev-status.svg)](https://david-dm.org/shinnn/code-points.js#info=devDependencies)

Get the [UTF-16](http://wikipedia.org/wiki/UTF-16)-encoded code points of each character in the string

```javascript
codePoints('Hello, 世界\n'); //=> [72, 101, 108, 108, 111, 44, 32, 19990, 30028]
```

## Installation

### Package managers

#### [npm](https://www.npmjs.org/) [![NPM version](https://badge.fury.io/js/code-points.svg)](https://www.npmjs.org/package/code-points)

```sh
npm i --save code-points
```

#### [Bower](http://bower.io/) [![Bower version](https://badge.fury.io/bo/code-points.svg)](https://github.com/shinnn/code-points.js/releases)

```sh
bower i --save code-points
```

#### [Duo](http://duojs.org/)

```javascript
var codePoints = require('shinnn/code-points.js');
```

### Standalone

[Download the script file directly](https://raw.githubusercontent.com/shinnn/code-points.js/master/dist/code-points.js) and install the dependency.

#### Dependency

* [code-point.js](https://github.com/shinnn/code-point.js)

## API

### codePoints(*str*)

*str*: `String`  
Return: `Array` of `Number`

It returns the code points of each character in the string as an array.

*See [the document of `String.prototype.codePointAt()`]() for the details about code point.*

```javascript
codePoints('\udada'); //=> [56026]
codePoints('\udfdf\udada\udada'); //=> [57311, 56026, 56026]
codePoints('\udada\udfdf\udada'); //=> [814047, 56026]
```

## CLI

You can use this module as a CLI tool by installing it [globally](https://www.npmjs.org/doc/files/npm-folders.html#global-installation).

```sh
npm install -g code-points
```

### Usage

```sh
Usage1: code-points <string>
Usage2: code-points --file <file path>
Usage3: cat <file path> | code-points

Options:
--file,    -f    Use a file as an input
--help,    -h    Print usage information
--version, -v    Print version
```

It print the code points splitted by commas.

### Example

```sh
code-points "0123 abcd"
```

yields:

```sh
48,49,50,51,32,97,98,99,100
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](https://github.com/shinnn/code-points/blob/master/LICENSE).
