/**
 * User: jchionh
 * Date: 2/20/13
 * Time: 11:40 PM
 */
// create namespace
wa01.utils = wa01.utils || {};

/**
 * implement the extend using prototype inheritance extend method
 * @param {Object} newObject the derived object
 * @param {Onject} baseObject the base object to derive from
 */
wa01.utils.extend = function(newObject, baseObject) {
    newObject.prototype = new baseObject();
    newObject.prototype.constructor = newObject;
};
