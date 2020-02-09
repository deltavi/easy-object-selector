'use strict';
const _s = require("easy-object-selector");
const obj = {
     a: {
         b: {
             c: "val1"
         }
     }
};
const value = _s.select(obj, "a.b.c"); // => "val1"
console.log(value);
