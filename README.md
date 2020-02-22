# ![easy-object-selector](docs/easy-object-selector.png) Easy Object Selector [![Build Status](https://travis-ci.org/deltavi/easy-object-selector.svg?branch=master)](https://travis-ci.org/deltavi/easy-object-selector)

![easy-object-selector](http://www.vincenzodevivo.com/lab/npm-badges/npm-badge.php?name=easy-object-selector)

Utility to manage an object property using simple 'a.b.c' paths (with dot–notation).

## Install

    npm install easy-object-selector

## Paths

| Path            | Description             |
| :-------------- | :---------------------- |
| a.b.c           | The value of 'c'        |
| ["a", "b", "c"] | The value of 'c'        |
| a.d.1.e         | The second value of 'e' |
| a.d.\*.e        | All values of 'e'       |
| a.d.first().e   | The first value of 'e'  |
| a.d.last().e    | The last value of 'e'   |

## Examples

```javascript
const selector = require("easy-object-selector");
const obj = {
     a: {
         b: {
             c: "val1"
         },
         d: [
                 {
                     e: "val2"
                 },
                 {
                     e: "val3"
                 }
         ]
     }
};
const select = selector.select;
select(obj, "a.b.c"); // => "val1"
select(obj, ["a", "b", "c"]); // => "val1"
select(obj, "a.b.x", "defValue"); // => "defValue"
select(obj, "a.d.0.e"); // => "val2"
select(obj, "a.d.*.e"); // => ["val2", "val3"]
select(obj, "a.d.first().e"); // => "val2"
select(obj, "a.d.last().e"); // => "val3"

const has = selector.has;
has(obj, "a.b.c"); // => true

const put = selector.put;
put({}, "a.b.c", "val1") // => {a:{b:{c:"val1"}}}

const wrapper = selector.wrap(obj);
wrapper.get("a.b.c"); // => "val1"
wrapper.has("a.b.c"); // => true

const wrapper2 = selector.wrap({});
wrapper2.put("a.b.c", "val1"); // => {a:{b:{c:"val1"}}}
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [select](#select)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
-   [has](#has)
    -   [Parameters](#parameters-1)
    -   [Examples](#examples-1)
-   [put](#put)
    -   [Parameters](#parameters-2)
    -   [Examples](#examples-2)
-   [wrap](#wrap)
    -   [Parameters](#parameters-3)
    -   [Examples](#examples-3)
-   [ObjectWrapper](#objectwrapper)
    -   [Parameters](#parameters-4)
    -   [get](#get)
        -   [Parameters](#parameters-5)
        -   [Examples](#examples-4)
    -   [has](#has-1)
        -   [Parameters](#parameters-6)
        -   [Examples](#examples-5)
    -   [put](#put-1)
        -   [Parameters](#parameters-7)
        -   [Examples](#examples-6)

## select

Get the value of the selected property if it exists.

### Parameters

-   `obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** source object
-   `selector` **([String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array))** selector
-   `defValue` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean))** default value

### Examples

```javascript
const selector = require("easy-object-selector");
const select = selector.select;
const obj = {
     a: {
         b: {
             c: "val1"
         },
         d: [
                 {
                     e: "val2"
                 },
                 {
                     e: "val3"
                 }
         ]
     }
};
select(obj, "a.b.c"); // => "val1"
select(obj, ["a", "b", "c"]); // => "val1"
select(obj, "a.b.x"); // => undefined
select(obj, "a.b.x", "defValue"); // => "defValue"
select(obj, "a.d.0.e"); // => "val2"
select(obj, "a.d.1.e"); // => "val3"
select(obj, "a.d.*.e"); // => ["val2", "val3"]
select(obj, "a.d.first().e"); // => "val2"
select(obj, "a.d.last().e"); // => "val3"
```

Returns **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))** 

## has

Check if the selected property exists.

### Parameters

-   `obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** source object
-   `selector` **([String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array))** selector

### Examples

```javascript
const selector = require("easy-object-selector");
const has = selector.has;
const obj = {
     a : {
         b : {
             c: "val1"
         }
     }
};
has(obj, "a.b.c"); // => true
has(obj, ["a", "b", "c"]); // => true
has(obj, "a.b.x"); // => false
```

Returns **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## put

Put the value in the object property.

### Parameters

-   `obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** source object
-   `selector` **([String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array))** selector
-   `value` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean))** value

### Examples

```javascript
const selector = require("easy-object-selector");
const put = selector.put;
put({}, "a.b.c", "val1") // => {a:{b:{c:"val1"}}}
put({}, ["a", "b", "c"], "val1") // => {a:{b:{c:"val1"}}}
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## wrap

Creates a new [ObjectWrapper](#objectwrapper)

### Parameters

-   `obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object to wrap

### Examples

```javascript
const selector = require("easy-object-selector");
const obj = {
     a: {
         b: {
             c: "val1"
         }
     }
};
const wrapper = selector.wrap(obj);
wrapper.get("a.b.c"); // => "val1"
wrapper.get(["a", "b", "c"]); // => "val1"
```

Returns **[ObjectWrapper](#objectwrapper)** wrapper

## ObjectWrapper

Object wrapper

### Parameters

-   `obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object to wrap

### get

Get the value of the selected property if it exists.

#### Parameters

-   `selector` **([String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array))** selector
-   `defValue` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean))** default value

#### Examples

```javascript
const selector = require("easy-object-selector");
const obj = {
     a: {
         b: {
             c: "val1"
         },
         d: [
                 {
                     e: "val2"
                 },
                 {
                     e: "val3"
                 }
         ]
     }
};
const wrapper = selector.wrap(obj);
wrapper.get("a.b.c"); // => "val1"
wrapper.get(["a", "b", "c"]); // => "val1"
wrapper.get("a.b.x"); // => undefined
wrapper.get("a.b.x", "defValue"); // => "defValue"
wrapper.get("a.d.0.e"); // => "val2"
wrapper.get("a.d.1.e"); // => "val3"
wrapper.get("a.d.*.e"); // => ["val2", "val3"]
wrapper.get("a.d.first().e"); // => "val2"
wrapper.get("a.d.last().e"); // => "val3"
```

Returns **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))** 

### has

Check if the selected property exists.

#### Parameters

-   `selector` **([String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array))** selector

#### Examples

```javascript
const selector = require("easy-object-selector");
const obj = {
     a : {
         b : {
             c: "val1"
         }
     }
};
const wrapper = selector.wrap(obj);
wrapper.has("a.b.c"); // => true
wrapper.has(["a", "b", "c"]); // => true
wrapper.has("a.b.x"); // => false
```

Returns **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### put

Put the value in the object property

#### Parameters

-   `selector` **([String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array))** selector
-   `value` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean))** value

#### Examples

```javascript
const selector = require("easy-object-selector");
const wrapper = selector.wrap({});
wrapper.put("a.b.c", "val1") // => {a:{b:{c:"val1"}}}
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
