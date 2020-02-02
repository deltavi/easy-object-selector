'use strict';
const assert = require('assert');
const selector = require('../index');
const obj = {
  a: {
    b: {
      c: "val1"
    }
  }
};
suite('easy-object-selector', function () {
  suite('#select()', function () {
    test('select(obj, "a.b.c"); // => "val1"', function () {
      const res = selector.select(obj, "a.b.c");
      //console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "val1");
    });
  });
  suite('#has()', function () {
    test('has(obj, "a.b.c"); // => true', function () {
      const res = selector.has(obj, "a.b.c");
      //console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, true);
    });
  });
});