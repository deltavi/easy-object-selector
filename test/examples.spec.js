'use strict';
const assert = require('assert');
const selector = require('../index');
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
const select = selector.select;
const has = selector.has;
suite('easy-object-selector', function () {
  suite('#select()', function () {
    test('select(obj, "a.b.c"); // => "val1"', function () {
      const res = select(obj, "a.b.c");
      //console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "val1");
    });
    test('select(obj, "a.b.x"); // => undefined', function () {
      const res = select(obj, "a.b.x");
      //console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, undefined);
    });
    test('select(obj, "a.b.x", "defValue"); // => "defValue"', function () {
      const res = select(obj, "a.b.x", "defValue");
      //console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "defValue");
    });
    test('select(obj, "a.d.0.e"); // => "val2"', function () {
      const res = select(obj, "a.d.0.e");
      //console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, 'val2');
    });
    test('select(obj, "a.d.1.e"); // => "val3"', function () {
      const res = select(obj, "a.d.1.e");
      //console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, 'val3');
    });
    test('select(obj, "a.d.*.e"); // => ["val2", "val3"]', function () {
      const res = select(obj, "a.d.*.e");
      //console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 2);
      assert.equal(res[0], 'val2');
      assert.equal(res[1], 'val3');
     });

    // wrapper
    test('wrapper.get("a.b.c"); // => "val1"', function () {
       const res = wrapper.get("a.b.c");
       //console.info("=>" + JSON.stringify(res, null, 4));
       assert.equal(res, "val1");
    });
  });
  suite('#has()', function () {
    test('has(obj, "a.b.c"); // => true', function () {
      const res = has(obj, "a.b.c");
      //console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, true);
    });
     test('has(obj, "a.b.x"); // => false', function () {
      const res = has(obj, "a.b.x");
      //console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, false);
    });
    // wrapper
    test('wrapper.has("a.b.x"); // => false', function () {
      const res = wrapper.has("a.b.x");
      //console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, false);
    });
  });
});
