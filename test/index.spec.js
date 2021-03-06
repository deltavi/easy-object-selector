'use strict';
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const selector = require('../index');
const obj = {
  a: "a",
  b: [
    {
      v: 1
    }
  ],
  c: {
    a: {
      b: {
        c: "ccc"
      },
      0: 0
    }
  },
  t1: {
    "first()": "f1",
    "last()": "l1"
  },
  t2: [0, 1, 2, 3, 4],
  t3: [
    { a: 1 },
    { a: 2 }
  ],
  t4: [
    { a: { b: 1 } },
    { a: 2 }
  ],
  t5: {
    a1: {
      b: 1
    },
    a2: {
      b: 2
    }
  },
  t6: {
    a1: {
      b1: {
        c: 1
      }
    },
    a2: {
      b2: {
        c: 2
      }
    }
  }
};
suite('easy-object-selector', function () {
  suite('#select()', function () {
    test('select(null, "a.b") should return undefined', function () {
      const res = selector.select(null, "a.b");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, undefined);
    });
    test('select(null, "a.b", "defValue") should return "defValue"', function () {
      const res = selector.select(null, "a.b", "defValue");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "defValue");
    });
    test('select(obj, "a") should return "a"', function () {
      const res = selector.select(obj, "a");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, 'a');
    });
    test('select(obj, "b.0.v") should return "1"', function () {
      const res = selector.select(obj, "b.0.v");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, 1);
    });
    test('select(obj, "b.1.v") should return undefined', function () {
      const res = selector.select(obj, "b.1.v");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, undefined);
    });
    test('select(obj, "b.100.v", "defValue") should return "defValue"', function () {
      const res = selector.select(obj, "b.100.v", "defValue");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "defValue");
    });
    test('select(obj, "c.a.b.c") should return "ccc"', function () {
      const res = selector.select(obj, "c.a.b.c");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "ccc");
    });
    test('select(obj, ["c", "a", "b", "c"]) should return "ccc"', function () {
      const res = selector.select(obj, ["c", "a", "b", "c"]);
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "ccc");
    });
    test('select(obj, "c.z.b.c") should return undefined', function () {
      const res = selector.select(obj, "c.z.b.c");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, undefined);
    });
    test('select(obj, "c.z.b.c", "def") should return "def"', function () {
      const res = selector.select(obj, "c.z.b.c", "def");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "def");
    });
    test('select(obj, "c.a.0") should return 0', function () {
      const res = selector.select(obj, "c.a.0");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, 0);
    });
    test('select(obj, "c.a.0.a") should return undefined', function () {
      const res = selector.select(obj, "c.a.0.a");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, undefined);
    });
    test('select(obj, "c.a.0.a", "def") should return "def"', function () {
      const res = selector.select(obj, "c.a.0.a", "def");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "def");
    });
    test('select(obj, "b.0") should return {v: 1}', function () {
      const res = selector.select(obj, "b.0");
      const exRes = expect(res);
      console.info("=>" + JSON.stringify(res, null, 4));
      exRes.to.have.property('v').to.be.a('number');
      assert.equal(res.v, 1);
    });
    test('select(obj, "t1.last()") should return "l1"', function () {
      const res = selector.select(obj, "t1.last()");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "l1");
    });
    test('select(obj, "t2.last()") should return 4', function () {
      const res = selector.select(obj, "t2.last()");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, 4);
    });
    test('select(obj, "t1.first()") should return "f1"', function () {
      const res = selector.select(obj, "t1.first()");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "f1");
    });
    test('select(obj, "t2.first()") should return 0', function () {
      const res = selector.select(obj, "t2.first()");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, 0);
    });
    test('select(obj, "t3.first().a") should return 1', function () {
      const res = selector.select(obj, "t3.first().a");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, 1);
    });
    test('select(obj, "t3.last().a") should return 2', function () {
      const res = selector.select(obj, "t3.last().a");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, 2);
    });
    test('select(obj, "t3.*.a") should return [1,2]', function () {
      const res = selector.select(obj, "t3.*.a");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res[0], 1);
      assert.equal(res[1], 2);
    });
    test('select(obj, "t2.*") should return [0,1,2,3,4]', function () {
      const res = selector.select(obj, "t2.*");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 5);
      assert.equal(res[0], 0);
      assert.equal(res[1], 1);
      assert.equal(res[2], 2);
      assert.equal(res[3], 3);
      assert.equal(res[4], 4);
    });
    test('select(obj, "t0.*") should return "def"', function () {
      const res = selector.select(obj, "t0.*", "def");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "def");
    });
    test('select(obj, "t1.*") should return { "first()": "f1", "last()": "l1" }', function () {
      const res = selector.select(obj, "t1.*");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res["first()"], "f1");
      assert.equal(res["last()"], "l1");
    });
    test('select(obj, "t4.*.a.b") should return [1]', function () {
      const res = selector.select(obj, "t4.*.a.b");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 1);
      assert.equal(res[0], 1);
    });
    test('select(obj, "t4.*.a") should return [{ b : 1}, 2]', function () {
      const res = selector.select(obj, "t4.*.a");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 2);
      assert.equal(res[0].b, 1);
      assert.equal(res[1], 2);
    });
    test('select(obj, "t5.*.b") should return [1, 2]', function () {
      const res = selector.select(obj, "t5.*.b");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 2);
      assert.equal(res[0], 1);
      assert.equal(res[1], 2);
    });
    test('select(obj, "t6.*.b1.c") should return [1]', function () {
      const res = selector.select(obj, "t6.*.b1.c");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 1);
      assert.equal(res[0], 1);
    });
    test('select(obj, "t6.*.*.c") should return [1, 2]', function () {
      const res = selector.select(obj, "t6.*.*.c");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 2);
      assert.equal(res[0], 1);
      assert.equal(res[1], 2);
    });
    test('select(obj,  "a.*.b.a") should return []', function () {
      const res = selector.select({ a: [{ b: 1 }] }, "a.*.b.a");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 0);
    });
  });
  suite('#has()', function () {
    test('has(obj, "b.0.v") should return true', function () {
      const res = selector.has(obj, "b.0.v");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, true);
    });
    test('has(obj, ["b", 0, "v"]) should return true', function () {
      const res = selector.has(obj, ["b", 0, "v"]);
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, true);
    });
    test('has(obj, "b.1.v") should return false', function () {
      const res = selector.has(obj, "b.1.v");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, false);
    });
    test('has(obj, "b.*.x") should return false', function () {
      const res = selector.has(obj, "b.*.x");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, false);
    });
    test('has(obj,  "a.*.b.a") should return false', function () {
      const res = selector.has({ a: [{ b: 1 }] }, "a.*.b.a");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, false);
    });
  });
  suite('#keys()', function () {
    test('keys(obj, "t6") should return ["a1", "a2"]', function () {
      const res = selector.keys(obj, "t6");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 2);
      assert.equal(res[0], "a1");
      assert.equal(res[1], "a2");
    });
    test('keys(obj, "tz") should return []', function () {
      const res = selector.keys(obj, "tz");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 0);
    });
    test('keys(null, "tz") should return []', function () {
      const res = selector.keys(null, "tz");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 0);
    });
    test('keys(obj, "tz") should return ["a", "b"]', function () {
      const res = selector.keys(obj, "tz", ["a", "b"]);
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 2);
      assert.equal(res[0], "a");
      assert.equal(res[1], "b");
    });
  });
  suite('#put()', function () {
    test('put({}, "a.b.c", "val1") should return {a:{b:{c:"val1"}}}', function () {
      const res = selector.put({}, "a.b.c", "val1");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.a.b.c, "val1");
    });
    test('put({}, ["a", "b", "c"], "val1") should return {a:{b:{c:"val1"}}}', function () {
      const res = selector.put({}, ["a", "b", "c"], "val1");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.a.b.c, "val1");
    });
    test('put({a:1}, "a.b.c", "val1") should return an exception', function () {
      expect(function () {
        const res = selector.put({ a: 1 }, "a.b.c", "val1");
        console.info("=>" + JSON.stringify(res, null, 4));
        assert.equal(res.a.b.c, "val1");
      }).throw("Cannot create property 'b' on number '1'");
    });
    test('put({z:1}, "a.b.c", "val1") should return {a:{b:{c:"val1"}}, z:1}', function () {
      const res = selector.put({ z: 1 }, "a.b.c", "val1");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.a.b.c, "val1");
      assert.equal(res.z, 1);
    });
    test('const o = {}; put(o, "a.b.c", "val1"); put(o, "a.d.f", "val2"); should return {a:{b:{c:"val1"}, d:{f:"val2"}}}', function () {
      const o = {};
      selector.put(o, "a.b.c", "val1");
      const res = selector.put(o, "a.d.f", "val2");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.a.b.c, "val1");
      assert.equal(res.a.d.f, "val2");
    });
  });
  const wrapper = selector.wrap(obj);
  suite('#wrap(obj)', function () {
    test('wrapper.get("b.0.v") should return 1', function () {
      const res = wrapper.get("b.0.v");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, 1);
    });
    test('wrapper.get("b.0.x") should return undefined', function () {
      const res = wrapper.get("b.0.x");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, undefined);
    });
    test('wrapper.get("b.0.x", "def") should return "def"', function () {
      const res = wrapper.get("b.0.x", "def");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, "def");
    });
    test('wrapper.has("b.0.v") should return true', function () {
      const res = wrapper.has("b.0.v");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, true);
    });
    test('wrapper.has("b.0.x") should return false', function () {
      const res = wrapper.has("b.0.x");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res, false);
    });
    test('wrapper.keys("t6") should return ["a1", "a2"]', function () {
      const res = wrapper.keys("t6");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.length, 2);
      assert.equal(res[0], "a1");
      assert.equal(res[1], "a2");
    });
    test('wrapper.put("a.b.c", "val1") should return {a:{b:{c:"val1"}}}', function () {
      const wrapper = selector.wrap({});
      const res = wrapper.put("a.b.c", "val1");
      console.info("=>" + JSON.stringify(res, null, 4));
      assert.equal(res.a.b.c, "val1");
    });
  });
});
