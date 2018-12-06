# code-points

[![npm version](https://img.shields.io/npm/v/code-points.svg)](https://www.npmjs.com/package/code-points)
[![Build Status](https://travis-ci.com/shinnn/code-points.js.svg?branch=master)](https://travis-ci.com/shinnn/code-points.js)
[![Build status](https://ci.appveyor.com/api/projects/status/rojbdyosyc3055ct?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/code-points-js)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/code-points.js.svg)](https://coveralls.io/github/shinnn/code-points.js)

Get the [UTF-16](https://wikipedia.org/wiki/UTF-16)-encoded code points of each character in the string

```javascript
codePoints('Hello, 世界\n'); //=> [72, 101, 108, 108, 111, 44, 32, 19990, 30028]
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install code-points
```

## API

### codePoints(*str*, *option*)

*str*: `string`  
*option*: `Object`  
Return: `Array<integer>`

It returns the [code point](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)s of each character in the string as an array.

```javascript
codePoints('\udada'); //=> [56026]
codePoints('\udfdf\udada\udada'); //=> [57311, 56026, 56026]
codePoints('\udada\udfdf\udada'); //=> [814047, 56026]
```

#### option.unique

Type: `boolean`  
Default: `false`

Removes duplicates from result.

```javascript
codePoints('banana'); //=> [98, 97, 110, 97, 110, 97]
codePoints('banana', {unique: true}); //=> [98,97,110]
```

## CLI

You can use this module as a CLI tool by installing it [globally](https://docs.npmjs.com/files/folders#global-installation).

```
npm install -g code-points
```

### Usage

```
Usage1: code-points <string>
Usage2: code-points --file <file path>
Usage3: cat <file path> | code-points

Options:
--unique, --uniq, -u  Remove duplicates from result
--file,           -f  Use a file as an input
--help,           -h  Print usage information
--version,        -v  Print version
```

It print the code points splitted by commas.

### Example

```
code-points "0123 abcd"
```

yields:

```
48,49,50,51,32,97,98,99,100
```

## License

Copyright (c) 2014 - 2018 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](https://github.com/shinnn/code-points/blob/master/LICENSE).
