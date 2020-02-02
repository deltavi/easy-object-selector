'use strict';

/**
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
	var parts = selector.split(".");
	var n;
	for (var i = 0; i < parts.length; i++) {
		part = parts[i];
		tmpObj = obj[part];
		//console.log("tmpObj: ", tmpObj);
		if (!tmpObj) {
			objType = Object.prototype.toString.call(obj);
			if (objType == "[object Array]") {
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
							selector = parts.join(".");
							for (n = 0; n < obj.length; n++) {
								tmpObj2 = exports.select(obj[n], selector, defValue);
								if (tmpObj2 || tmpObj2 == 0) {
									tmpObj.push(tmpObj2);
								}
							}
							return tmpObj;
						}
						return obj;
					}
				}
			} else if (objType == "[object Object]") {
				switch (part) {
					case "*": {
						tmpObj = [];
						parts = parts.slice(i + 1);
						if (parts.length > 0) {
							selector = parts.join(".");
							objKeys = Object.keys(obj);
							for (n = 0; n < objKeys.length; n++) {
								tmpObj2 = exports.select(obj[objKeys[n]], selector, defValue);
								if (tmpObj2 || tmpObj2 == 0) {
									tmpObj.push(tmpObj2);
								}
							}
							return tmpObj;
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
 */
exports.has = function (obj, selector) {
    var res = exports.select(obj, selector);
    if(res && Object.prototype.toString.call(res) == "[object Array]"){
        return res.length > 0;
    }
	return !!res;
};
