'use strict';

/**
 * Get the value of the selected property if it exists.
 * @param {Object} obj source object
 * @param {String|Array} selector selector
 * @param {Object|Array|String|Number|Boolean} defValue default value
 * @returns {Object|Array|String|Number|Boolean|undefined}
 * @example
 * const selector = require("easy-object-selector");
 * const select = selector.select;
 * const obj = {
 *      a: {
 *          b: {
 *              c: "val1"
 *          },
 *          d: [
 *                  {
 *                      e: "val2"
 *                  },
 *                  {
 *                      e: "val3"
 *                  }
 *          ]
 *      }
 * };
 * select(obj, "a.b.c"); // => "val1"
 * select(obj, ["a", "b", "c"]); // => "val1"
 * select(obj, "a.b.x"); // => undefined
 * select(obj, "a.b.x", "defValue"); // => "defValue"
 * select(obj, "a.d.0.e"); // => "val2"
 * select(obj, "a.d.1.e"); // => "val3"
 * select(obj, "a.d.*.e"); // => ["val2", "val3"]
 * select(obj, "a.d.first().e"); // => "val2"
 * select(obj, "a.d.last().e"); // => "val3"
 */
exports.select = function (obj, selector, defValue) {
	//console.log("selector: " + selector);
	if (!obj && obj != 0) {
		return defValue;
	}
	var tmpObj;
	var tmpObj2;
	var objType;
	var objKeys;
	var part;
	var parts = Array.isArray(selector) ? selector : selector.split(".");
	var n;
	for (var i = 0; i < parts.length; i++) {
		part = parts[i];
		tmpObj = obj[part];
		//console.log("tmpObj: ", tmpObj);
		if (!tmpObj) {
			objType = Object.prototype.toString.call(obj);
			if (objType === "[object Array]") {
				switch (part) {
					// last
					case "last()": {
						tmpObj = obj[obj.length - 1];
						break;
					}
					case "first()": {
						tmpObj = obj[0];
						break;
					}
					case "*": {
						tmpObj = [];
						parts = parts.slice(i + 1);
						if (parts.length > 0) {
							for (n = 0; n < obj.length; n++) {
								tmpObj2 = exports.select(obj[n], parts, defValue);
								if (tmpObj2 || tmpObj2 === 0) {
									tmpObj.push(tmpObj2);
								}
							}
							return tmpObj;
						}
						return obj;
					}
				}
			} else if (objType === "[object Object]") {
				switch (part) {
					case "*": {
						tmpObj = [];
						parts = parts.slice(i + 1);
						if (parts.length > 0) {
							objKeys = Object.keys(obj);
							for (n = 0; n < objKeys.length; n++) {
								tmpObj2 = exports.select(obj[objKeys[n]], parts, defValue);
								if (tmpObj2 || tmpObj2 === 0) {
									tmpObj.push(tmpObj2);
								}
							}
							return tmpObj.length > 0 ? tmpObj : defValue;
						}
						return obj;
					}
				}
			}
		}
		obj = tmpObj;
		//console.log(i, parts[i], o)
		if (!obj && obj != 0) {
			return defValue;
		}
	}
	return obj;
};

/**
 * Check if the selected property exists.
 * @param {Object} obj source object
 * @param {String|Array} selector selector
 * @returns {Boolean}
 * @example
 * const selector = require("easy-object-selector");
 * const has = selector.has;
 * const obj = {
 *      a : {
 *          b : {
 *              c: "val1"
 *          }
 *      }
 * };
 * has(obj, "a.b.c"); // => true
 * has(obj, ["a", "b", "c"]); // => true
 * has(obj, "a.b.x"); // => false
 */
exports.has = function (obj, selector) {
	var res = exports.select(obj, selector);
	if (res && Array.isArray(res)) {
		return res.length > 0;
	}
	return !!res;
};

/**
 * Returns an array of keys.
 * @param {Object} obj source object
 * @param {String|Array} selector selector
 * @param {Array} defKeys default keys array
 * @returns {Array}
 * @example
 * const selector = require("easy-object-selector");
 * const keys = selector.keys;
 * const obj = {
 *      a : {
 *          b : {
 *              c: "val1",
 *              d: "val2",
 *              e: "val3",
 *          }
 *      }
 * };
 * keys(obj, "a.b"); // => ["c", "d", "e"]
 * keys(obj, ["a", "b"]); // => ["c", "d", "e"]
 * keys(obj, "a.b.x"); // => []
 * keys(obj, "a.b.x", ["a", "b"]); // => ["a", "b"]
 */
exports.keys = function (obj, selector, defKeys) {
	var res = exports.select(obj, selector);
	if (!res) {
		return defKeys || [];
	}
	return Object.keys(res);
};

/**
 * Put the value in the object property.
 * @param {Object} obj source object
 * @param {String|Array} selector selector
 * @param {Object|Array|String|Number|Boolean} value value
 * @returns {Object}
 * @example
 * const selector = require("easy-object-selector");
 * const put = selector.put;
 * const o = {};
 * put(o, "a.b.c", "val1") // => {a:{b:{c:"val1"}}}
 * const o2 = {};
 * put(o2, ["a", "b", "c"], "val1") // => {a:{b:{c:"val1"}}}
 */
exports.put = function (obj, selector, value) {
	if (!obj) {
		return;
	}
	var tmpObj = obj;
	var part;
	var parts = Array.isArray(selector) ? selector : selector.split(".");
	for (var i = 0; i < parts.length; i++) {
		part = parts[i];
		if (i === parts.length - 1) {
			obj[part] = value;
		} else if (!obj[part]) {
			obj[part] = {};
		}
		obj = obj[part];
	}
	return tmpObj;
};

//TODO: https://github.com/documentationjs/documentation/blob/068005eeba3093515aaa1536e4e43b0139f24b4a/__tests__/fixture/html/nested.input.js

/**
 * @description Object wrapper
 * @class
 * @param {Object} obj object to wrap
 */
function ObjectWrapper(obj) {
	this.obj = obj;
}

/**
 * Get the value of the selected property if it exists.
 * @param {String|Array} selector selector
 * @param {Object|Array|String|Number|Boolean} defValue default value
 * @returns {Object|Array|String|Number|Boolean|undefined}
 * @example
 * const selector = require("easy-object-selector");
 * const obj = {
 *      a: {
 *          b: {
 *              c: "val1"
 *          },
 *          d: [
 *                  {
 *                      e: "val2"
 *                  },
 *                  {
 *                      e: "val3"
 *                  }
 *          ]
 *      }
 * };
 * const wrapper = selector.wrap(obj);
 * wrapper.get("a.b.c"); // => "val1"
 * wrapper.get(["a", "b", "c"]); // => "val1"
 * wrapper.get("a.b.x"); // => undefined
 * wrapper.get("a.b.x", "defValue"); // => "defValue"
 * wrapper.get("a.d.0.e"); // => "val2"
 * wrapper.get("a.d.1.e"); // => "val3"
 * wrapper.get("a.d.*.e"); // => ["val2", "val3"]
 * wrapper.get("a.d.first().e"); // => "val2"
 * wrapper.get("a.d.last().e"); // => "val3"
 */
ObjectWrapper.prototype.get = function (selector, defValue) {
	return exports.select(this.obj, selector, defValue);
};

/**
 * Check if the selected property exists.
 * @param {String|Array} selector selector
 * @returns {Boolean}
 * @example
 * const selector = require("easy-object-selector");
 * const obj = {
 *      a : {
 *          b : {
 *              c: "val1"
 *          }
 *      }
 * };
 * const wrapper = selector.wrap(obj);
 * wrapper.has("a.b.c"); // => true
 * wrapper.has(["a", "b", "c"]); // => true
 * wrapper.has("a.b.x"); // => false
 */
ObjectWrapper.prototype.has = function (selector) {
	return exports.has(this.obj, selector);
};

/**
 * Returns an array of keys.
 * @param {String|Array} selector selector
 * @param {Array} defKeys default keys array
 * @returns {Array}
 * @example
 * const selector = require("easy-object-selector");
 * const obj = {
 *      a : {
 *          b : {
 *              c: "val1",
 *              d: "val2",
 *              e: "val3",
 *          }
 *      }
 * };
 * const wrapper = selector.wrap(obj);
 * wrapper.keys("a.b"); // => ["c", "d", "e"]
 * wrapper.keys(["a", "b"]); // => ["c", "d", "e"]
 * wrapper.keys("a.b.x"); // => []
 * wrapper.keys("a.b.x", ["a", "b"]); // => ["a", "b"]
 */
ObjectWrapper.prototype.keys = function (selector, defKeys) {
	return exports.keys(this.obj, selector, defKeys);
};

/**
 * Put the value in the object property.
 * @param {String|Array} selector selector
 * @param {Object|Array|String|Number|Boolean} value value
 * @returns {Object}
 * @example
 * const selector = require("easy-object-selector");
 * const o = {};
 * const wrapper = selector.wrap(o);
 * wrapper.put("a.b.c", "val1") // => {a:{b:{c:"val1"}}}
 */
ObjectWrapper.prototype.put = function (selector, value) {
	return exports.put(this.obj, selector, value);
};

/**
 * Creates a new {@link ObjectWrapper}
 * @param {Object} obj object to wrap
 * @returns {ObjectWrapper} wrapper
 * @example
 * const selector = require("easy-object-selector");
 * const obj = {
 *      a: {
 *          b: {
 *              c: "val1"
 *          }
 *      }
 * };
 * const wrapper = selector.wrap(obj);
 * wrapper.get("a.b.c"); // => "val1"
 * wrapper.get(["a", "b", "c"]); // => "val1"
 */
exports.wrap = function (obj) {
	return new ObjectWrapper(obj);
};
